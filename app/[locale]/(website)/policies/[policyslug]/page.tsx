import { notFound } from 'next/navigation';
import { sanityFetch } from '@/app/[locale]/lib/sanity/client';
import PageHeader from '../../components/PageHeader';
import PortableTextRenderer from '../../components/PortableTextRenderer';
import YellowCTA from '../../components/YellowCTA';
import { Metadata } from 'next';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────────
interface PolicyPageProps {
  params: Promise<{ policyslug: string; locale: string }>;
}

interface PolicyData {
  title: string;
  slug: { current: string };
  pageHeader?: { title?: string; subtitle?: string };
  body?: any[];
  pdfFile?: { asset?: { url?: string } };
}

// ── Sanity Query ──────────────────────────────────────────────────────────────
const POLICY_QUERY = `
  *[_type == "policy" && slug.current == $slug][0] {
    title,
    slug,
    pageHeader {
      title,
      subtitle
    },
    body,
    "pdfUrl": pdfFile.asset->url
  }
`;

// ── Static Params (for build-time generation) ─────────────────────────────────
export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: { current: string } }[]>(`
    *[_type == "policy" && defined(slug.current)] { slug }
  `);
  return (slugs || []).map((item) => ({ policyslug: item.slug.current }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { policyslug } = await params;
  const data = await sanityFetch<any>(POLICY_QUERY, { slug: policyslug });
  if (!data) return { title: 'Policy | Human Relief Mission' };

  const headerTitle = data.pageHeader?.title || data.title;
  const headerSubtitle = data.pageHeader?.subtitle || '';

  return {
    title: `${headerTitle} | Human Relief Mission`,
    description: headerSubtitle,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function PolicyPage({ params }: PolicyPageProps) {
  const { policyslug } = await params;
  const data = await sanityFetch<any>(POLICY_QUERY, { slug: policyslug });

  if (!data) {
    notFound();
  }

  const headerTitle = data.pageHeader?.title || data.title;
  const headerSubtitle = data.pageHeader?.subtitle || '';
  const pdfUrl: string | undefined = data.pdfUrl;

  return (
    <main id="page-policy" className="block">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className='bg-purple-dark pt-24'>
        <PageHeader
          title={headerTitle}
          subtitle={headerSubtitle}
          breadcrumb={data.title}
          centered={false}
          logoOverlap
        />
      </div>

      {/* ── Policy Content ────────────────────────────────────── */}
      <section className="bg-brand-white py-16 px-4 sm:px-6">
        <div className="max-w-285 mx-auto">

          {/* Rich Text Body */}
          {data.body && data.body.length > 0 ? (
            <PortableTextRenderer value={data.body} />
          ) : (
            <p className="text-brand-grey italic">
              This policy document has not been published yet.
            </p>
          )}

          <div className="mt-12 pt-8 border-t border-brand-lgrey">
            <strong>Still have questions?</strong><br />
            Get in touch with our team: <Link href="mailto:info@humanreliefmission.com" className='text-purple underline'>info@humanreliefmission.com</Link>
          </div>

          {/* PDF Download (optional) */}
          {pdfUrl && (
            <div className="mt-12 pt-8 border-t border-brand-lgrey">
              <p className="text-sm text-brand-grey mb-4">
                Prefer a printable version?
              </p>
              <YellowCTA
                text="Download PDF"
                href={pdfUrl}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
