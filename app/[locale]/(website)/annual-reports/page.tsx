import { sanityFetch } from '@/app/[locale]/lib/sanity/client';
import PageHeader from '../components/PageHeader';
import AnnualReportCard from '../components/about/AnnualReportCard';
import { Metadata } from 'next';
import JsonLd from '../components/JsonLd';
import { BASE_URL, buildWebPage, buildBreadcrumb } from '../lib/jsonld';

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Annual Reports | Human Relief Mission',
  description:
    'Read our annual reports — a comprehensive overview of our programmes, financials and the impact your donations have had on communities in Afghanistan.',
  alternates: {
    canonical: `${BASE_URL}/annual-reports`,
  },
  openGraph: {
    title: 'Annual Reports | Human Relief Mission',
    description:
      'Read our annual reports — a comprehensive overview of our programmes, financials and the impact your donations have had on communities in Afghanistan.',
    url: `${BASE_URL}/annual-reports`,
    siteName: 'Human Relief Mission',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annual Reports | Human Relief Mission',
    description: 'Read our annual reports and financial transparency overviews.',
  },
};

// ── Sanity Queries ────────────────────────────────────────────────────────────
const PAGE_QUERY = `
  *[_type == "annualReportsPage"][0] {
    pageHeaderTitle,
    pageHeaderSubtitle,
    introText
  }
`;

const REPORTS_QUERY = `
  *[_type == "fileCard" && type == "annual-report"] | order(_createdAt desc) {
    _id,
    title,
    body,
    "fileUrl": file.asset->url,
    "coverImageUrl": select(defined(coverImage.asset) => coverImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=80", null),
    "coverImageAlt": coverImage.alt
  }
`;

// ── Fallback data (shown if Sanity is empty) ──────────────────────────────────
const FALLBACK_PAGE = {
  pageHeaderTitle: 'Annual Reports',
  pageHeaderSubtitle: 'Transparency and accountability at the heart of everything we do.',
  introText:
    'We believe in full transparency. Our annual reports give a comprehensive overview of our programmes, financials and the impact your donations have had on communities around the world.',
};

const FALLBACK_REPORTS = [
  {
    _id: 'ar-2023',
    title: '2023 Annual Report',
    body: 'Annual report covering all programmes, financials and impact for the year 2023.',
    fileUrl: '#',
    coverImageUrl: null,
    coverImageAlt: null,
  },
  {
    _id: 'ar-2022',
    title: '2022 Annual Report',
    body: 'Annual report covering all programmes, financials and impact for the year 2022.',
    fileUrl: '#',
    coverImageUrl: null,
    coverImageAlt: null,
  },
  {
    _id: 'ar-2021',
    title: '2021 Annual Report',
    body: 'Annual report covering all programmes, financials and impact for the year 2021.',
    fileUrl: '#',
    coverImageUrl: null,
    coverImageAlt: null,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function AnnualReportsPage() {
  const [pageData, reportsData] = await Promise.all([
    sanityFetch<any>(PAGE_QUERY),
    sanityFetch<any[]>(REPORTS_QUERY),
  ]);

  const page = pageData || FALLBACK_PAGE;
  const reports = reportsData && reportsData.length > 0 ? reportsData : FALLBACK_REPORTS;

  return (
    <main id="page-annual-reports" className="block">
      <JsonLd data={[
        buildWebPage({ title: "Annual Reports | Human Relief Mission", description: "Read our annual reports — a comprehensive overview of our programmes, financials and the impact your donations have had on communities around the world.", url: `${BASE_URL}/annual-reports` }),
        buildBreadcrumb([{ name: "Home", url: BASE_URL }, { name: "Annual Reports", url: `${BASE_URL}/annual-reports` }]),
      ]} />
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className='bg-purple-dark pt-24'>
        <PageHeader
          title={page.pageHeaderTitle}
          subtitle={page.pageHeaderSubtitle}
          breadcrumb="Annual Reports"
          centered={false}
          logoOverlap
        />
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <section className="bg-brand-white py-16 px-4 sm:px-6">
        <div className="max-w-285 mx-auto">

          {/* Intro paragraph */}
          {page.introText && (
            <p className="text-brand-grey text-lg leading-[1.8] mb-14">
              {page.introText}
            </p>
          )}

          {/* Reports grid */}
          {reports.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {reports.map((report: any) => (
                <AnnualReportCard
                  key={report._id}
                  title={report.title}
                  subtext={report.body}
                  fileUrl={report.fileUrl}
                  coverImageUrl={report.coverImageUrl}
                  coverImageAlt={report.coverImageAlt}
                />
              ))}
            </div>
          ) : (
            <p className="text-brand-grey text-center py-16">
              No annual reports available yet. Please check back soon.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
