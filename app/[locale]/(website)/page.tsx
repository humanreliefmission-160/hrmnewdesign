import type { Metadata } from "next";
import ProjectsGrid from "./components/ProjectsGrid";
import NewsletterForm from "./components/NewsletterForm";
import Impact from "./components/Impact";
import FinalCTA from "./components/FinalCTA";
import Hero from "./components/Hero";
import LastMonthImpact from "./components/LastMonthsImpact";
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import BottomCTA from "./components/ecosystem/sections/BottomCTA";
import JsonLd from "./components/JsonLd";
import { BASE_URL, buildWebPage, buildBreadcrumb } from "./lib/jsonld";

export const metadata: Metadata = {
  title: "Human Relief Mission — Helping Humanity Through Welfare",
  description:
    "Human Relief Mission is a UK registered charity delivering emergency relief, food aid, healthcare, and sustainable development to communities in Afghanistan.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Human Relief Mission — Helping Humanity Through Welfare",
    description:
      "Human Relief Mission is a UK registered charity delivering emergency relief, food aid, healthcare, and sustainable development to communities in Afghanistan.",
    url: BASE_URL,
    siteName: "Human Relief Mission",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Human Relief Mission — Helping Humanity Through Welfare",
    description:
      "UK-registered charity delivering emergency relief and sustainable development worldwide.",
  },
};

// Cache this page for 60 seconds (ISR) — Sanity content rarely changes more
// frequently than this, so there's no need to hit the API on every request.
export const revalidate = 60;

const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    cardSummary,
    headerImage,
    "category": projectCategory->name
  }
`;

const ECOSYSTEM_STAGES_QUERY = `
  *[_type == "ecosystemStage" && defined(slug.current)] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    stageName
  }
`;

const LAST_MONTHS_IMPACT_QUERY = `
  *[_type == "lastMonthsImpact"][0] {
    sectionMonth,
    "impactCards": impactCards[] {
      "category": category->name,
      image,
      videoUrl,
      muteVideo,
      impactNumber,
      secondaryText,
      description,
      pageLink,
    }
  }
`;

export default async function Home() {
  const projects = await sanityFetch(ALL_PROJECTS_QUERY);
  const stages = await sanityFetch(ECOSYSTEM_STAGES_QUERY);
  const lastMonthsImpactData = await sanityFetch(LAST_MONTHS_IMPACT_QUERY);

  return (
    <div id="page-home" className="page active">
      <JsonLd data={[
        buildWebPage({ title: "Human Relief Mission — Helping Humanity Through Welfare", description: "Human Relief Mission is a UK registered charity delivering humanitarian aid, emergency relief and sustainable development to communities in Afghanistan.", url: BASE_URL }),
        buildBreadcrumb([{ name: "Home", url: BASE_URL }]),
      ]} />
      <Hero />
      <ProjectsGrid projects={projects} />
      <NewsletterForm />
      <Impact />
      <LastMonthImpact data={lastMonthsImpactData} />
      <BottomCTA stages={stages} />
      {/* <FinalCTA /> */}
    </div>
  );
}
