import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import PageHeader from "../components/PageHeader";
import YellowCTA from "../components/YellowCTA";
import Link from "next/link";
import { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { BASE_URL, buildWebPage, buildBreadcrumb } from "../lib/jsonld";

export const metadata: Metadata = {
  title: "Policies | Human Relief Mission",
  description:
    "Explore our organisational policies, governance standards, safeguarding guidelines and operational procedures.",
  alternates: {
    canonical: `${BASE_URL}/policies`,
  },
  openGraph: {
    title: "Policies | Human Relief Mission",
    description:
      "Explore our organisational policies, governance standards, safeguarding guidelines and operational procedures.",
    url: `${BASE_URL}/policies`,
    siteName: "Human Relief Mission",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Policies | Human Relief Mission",
    description: "Explore our organisational policies and governance standards.",
  },
};

// ── Sanity Queries ────────────────────────────────────────────────────────────
const POLICIES_QUERY = `
  *[_type == "policy" && defined(slug.current)] {
    _id,
    title,
    "slug": slug.current,
    "subtitle": pageHeader.subtitle,
    "pdfUrl": pdfFile.asset->url
  }
`;

const FILE_CARDS_QUERY = `
  *[_type == "fileCard" && type == "policies"] {
    _id,
    title,
    body,
    "fileUrl": file.asset->url
  }
`;

// ── Default / Fallback Policies Data ──────────────────────────────────────────
const defaultPolicies = [
  {
    id: "policy-social",
    title: "Social Media Policy",
    subtext:
      "Guidelines governing the responsible use of social media platforms by staff, volunteers, and representatives of the organisation.",
    slug: "social-media-policy",
    fileUrl: "#",
  },
  {
    id: "policy-islamic",
    title: "Islamic Policy",
    subtext:
      "Our commitment to Islamic principles and values that underpin the work and governance of the charity.",
    slug: "islamic-policy",
    fileUrl: "#",
  },
  {
    id: "policy-data",
    title: "Data Protection Policy",
    subtext:
      "How we collect, store, and protect personal data in accordance with UK GDPR and the Data Protection Act 2018.",
    slug: "data-protection-policy",
    fileUrl: "#",
  },
  {
    id: "policy-safeguarding",
    title: "Safeguarding Policy",
    subtext:
      "Our approach to keeping vulnerable adults and children safe across all our programmes and activities.",
    slug: "safeguarding-policy",
    fileUrl: "#",
  },
];

interface PolicyItem {
  id: string;
  title: string;
  subtext?: string;
  slug?: string;
  fileUrl?: string;
}

export default async function PoliciesPage() {
  const [sanityPolicies, sanityFileCards] = await Promise.all([
    sanityFetch<any[]>(POLICIES_QUERY),
    sanityFetch<any[]>(FILE_CARDS_QUERY),
  ]);

  // Combine items from both Sanity queries (or fall back to defaultPolicies)
  const policyDocs: PolicyItem[] = (sanityPolicies || []).map((p) => ({
    id: p._id,
    title: p.title,
    subtext: p.subtitle,
    slug: p.slug,
    fileUrl: p.pdfUrl,
  }));

  const fileCards: PolicyItem[] = (sanityFileCards || []).map((c) => ({
    id: c._id,
    title: c.title,
    subtext: c.body,
    fileUrl: c.fileUrl,
  }));

  // Merge, avoiding duplicates by title if any
  const combinedMap = new Map<string, PolicyItem>();
  [...policyDocs, ...fileCards].forEach((item) => {
    const existing = combinedMap.get(item.title.toLowerCase());
    if (existing) {
      combinedMap.set(item.title.toLowerCase(), {
        ...existing,
        ...item,
        slug: item.slug || existing.slug,
        fileUrl: item.fileUrl || existing.fileUrl,
      });
    } else {
      combinedMap.set(item.title.toLowerCase(), item);
    }
  });

  const combinedPolicies = Array.from(combinedMap.values());
  const displayPolicies: PolicyItem[] =
    combinedPolicies.length > 0 ? combinedPolicies : defaultPolicies;

  return (
    <main id="page-policies" className="block">
      <JsonLd data={[
        buildWebPage({ title: "Policies | Human Relief Mission", description: "Explore our organisational policies, governance standards, safeguarding guidelines, and operational procedures.", url: `${BASE_URL}/policies` }),
        buildBreadcrumb([{ name: "Home", url: BASE_URL }, { name: "Policies", url: `${BASE_URL}/policies` }]),
      ]} />
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="bg-purple-dark pt-24">
        <PageHeader
          title="Policies & Governance"
          subtitle="Our commitment to transparency, ethical standards, safeguarding, and accountability across all operations."
          breadcrumb="Policies"
          centered={false}
          logoOverlap
        />
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <section className="bg-brand-white py-16 px-4 sm:px-6">
        <div className="max-w-285 mx-auto">
          {/* Policy Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPolicies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white rounded-sm p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold text-brand-black mb-3 font-body leading-tight">
                    {policy.title}
                  </h3>
                  {policy.subtext && (
                    <p className="text-sm text-brand-grey leading-relaxed mb-6">
                      {policy.subtext}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-brand-lgrey/50 flex flex-wrap items-center gap-3">
                  {policy.slug ? (
                    <YellowCTA
                      text="Read Policy"
                      href={`/policies/${policy.slug}`}
                    />
                  ) : (
                    policy.fileUrl && (
                      <YellowCTA
                        text="Download PDF"
                        href={policy.fileUrl}
                      />
                    )
                  )}

                  {policy.slug && policy.fileUrl && (
                    <Link
                      href={policy.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-purple hover:underline transition-colors"
                    >
                      Download PDF
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16 pt-10 border-t border-brand-lgrey">
            <p className="text-brand-black text-sm">
              Have questions about our policies or governance?
              <br />
              Get in touch with our compliance team:{" "}
              <Link
                href="mailto:info@humanreliefmission.com"
                className="text-purple underline font-semibold transition-colors hover:text-purple-dark"
              >
                info@humanreliefmission.com
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}