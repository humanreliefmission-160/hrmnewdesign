import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import Link from "next/link";
import DownloadCard from "./DownloadCard";

// ─── Default/Fallback Annual Reports Data ────────────────────────────────────────────────────
const defaultAnnualReports = [
  {
    id: "ar-2023",
    title: "2023",
    subtext: "Annual report covering all programmes, financials and impact for the year 2023.",
    href: "#",
  },
  {
    id: "ar-2022",
    title: "2022",
    subtext: "Annual report covering all programmes, financials and impact for the year 2022.",
    href: "#",
  },
  {
    id: "ar-2021",
    title: "2021",
    subtext: "Annual report covering all programmes, financials and impact for the year 2021.",
    href: "#",
  },
];

// ─── Default/Fallback Policies Data ──────────────────────────────────────────────────────────
const defaultPolicies = [
  {
    id: "policy-social",
    title: "Social Media Policy",
    subtext:
      "Guidelines governing the responsible use of social media platforms by staff, volunteers and representatives of the organisation.",
    href: "#",
  },
  {
    id: "policy-islamic",
    title: "Islamic Policy",
    subtext:
      "Our commitment to Islamic principles and values that underpin the work and governance of the charity.",
    href: "#",
  },
  {
    id: "policy-data",
    title: "Data Protection Policy",
    subtext:
      "How we collect, store and protect personal data in accordance with UK GDPR and the Data Protection Act 2018.",
    href: "#",
  },
  {
    id: "policy-safeguarding",
    title: "Safeguarding Policy",
    subtext:
      "Our approach to keeping vulnerable adults and children safe across all our programmes and activities.",
    href: "#",
  },
];

const POLICIES_REPORTS_QUERY = `
  *[_type == "aboutUs" ][0] {
    fileCards[]-> {
      _id,
      type,
      title,
      body,
      "fileUrl": file.asset->url
    }
  }
`;

export default async function PoliciesReports() {
  const data = await sanityFetch<any>(POLICIES_REPORTS_QUERY);
  const fetchedCards = data?.fileCards || [];

  const annualReports = fetchedCards
    .filter((card: any) => card && card.type === 'annual-report')
    .map((card: any) => ({
      id: card._id,
      title: card.title,
      subtext: card.body,
      href: card.fileUrl || '#',
    }));

  const policies = fetchedCards
    .filter((card: any) => card && card.type === 'policies')
    .map((card: any) => ({
      id: card._id,
      title: card.title,
      subtext: card.body,
      href: card.fileUrl || '#',
    }));

  const displayAnnualReports = annualReports.length > 0 ? annualReports : defaultAnnualReports;
  const displayPolicies = policies.length > 0 ? policies : defaultPolicies;

  return (
    <section className="bg-purple w-full py-16 px-4 sm:px-6">
      <div className="max-w-285 mx-auto">

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-white mb-10">
          Downloadables
        </h1>

        {/* ANNUAL REPORTS */}
        <div className="mb-12">
          <h2 className="text-xl font-medium text-brand-white mb-5">
            Annual Reports
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {displayAnnualReports.map((report: any) => (
              <DownloadCard
                key={report.id}
                title={report.title}
                subtext={report.subtext}
                buttonLabel="Download"
                href={report.href}
                size="sm"
              />
            ))}
          </div>
        </div>

        <hr className="h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-brand-purple to-transparent dark:via-brand-white my-12" />


        {/* POLICIES */}
        <div className="mb-12">
          <h2 className="text-xl font-medium text-brand-white mb-5">
            Policies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {displayPolicies.map((policy: any) => (
              <DownloadCard
                key={policy.id}
                title={policy.title}
                subtext={policy.subtext}
                buttonLabel="Download"
                href={policy.href}
                size="md"
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-brand-white text-sm">
            Still have questions?
            <br />
            Get in touch with our team: {" "}
            <Link
              href="mailto:info@humanreliefmission.com"
              className="text-brand-white underline underline-offset-2 transition-colors"
            >
              info@humanreliefmission.com
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
