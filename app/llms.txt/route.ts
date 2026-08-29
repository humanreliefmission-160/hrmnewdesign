import { sanityFetch } from "@/app/[locale]/lib/sanity/client";

export const revalidate = 60; // Revalidate dynamic llms.txt every 60 seconds

const BASE_URL = "https://humanreliefmission.com";

// GROQ Queries
const PROJECTS_QUERY = `
  *[_type == "project" && defined(slug.current)] | order(name asc) {
    name,
    "slug": slug.current,
    llmsSummary,
    cardSummary,
    tagline,
    "seoDescription": seo.metaDescription
  }
`;

const ECOSYSTEM_STAGES_QUERY = `
  *[_type == "ecosystemStage" && defined(slug.current)] | order(order asc) {
    title,
    "slug": slug.current,
    stageNumber,
    stageName,
    cardDescription,
    headerDescription,
    "seoDescription": seo.metaDescription
  }
`;

const POLICIES_QUERY = `
  *[_type == "policy" && defined(slug.current)] | order(title asc) {
    title,
    "slug": slug.current,
    "subtitle": pageHeader.subtitle
  }
`;

export async function GET() {
  const [projects, stages, policies] = await Promise.all([
    sanityFetch<any[]>(PROJECTS_QUERY).catch(() => []),
    sanityFetch<any[]>(ECOSYSTEM_STAGES_QUERY).catch(() => []),
    sanityFetch<any[]>(POLICIES_QUERY).catch(() => []),
  ]);

  let markdown = `# Human Relief Mission\n\n`;
  markdown += `> Human Relief Mission is a UK-registered charity (No. 1160380) delivering emergency relief, clean water, healthcare, education, and sustainable development programmes to communities in Afghanistan, Pakistan, and Nigeria.\n\n`;

  // Core Static Pages
  markdown += `## Core Pages\n\n`;
  markdown += `- [Homepage](${BASE_URL}): Official website of Human Relief Mission, providing humanitarian aid and emergency relief.\n`;
  markdown += `- [About Us](${BASE_URL}/about): Human Relief Mission's mission, core values, 100% donation policy and governance structure.\n`;
  markdown += `- [Our Projects](${BASE_URL}/projects): Browse active humanitarian and development projects.\n`;
  markdown += `- [4 Phase Ecosystem](${BASE_URL}/ecosystem): This model lifting families out of poverty from receiving Zakat to paying Zakat.\n`;
  markdown += `- [Donate](${BASE_URL}/donate): Donate online securely with Gift Aid, Zakat, and Sadaqah options.\n`;
  markdown += `- [Contact Us](${BASE_URL}/contact): Get in touch with our team in Leeds, UK, or submit a volunteer application.\n`;
  markdown += `- [Annual Reports](${BASE_URL}/annual-reports): Financial transparency, audited accounts and annual impact overviews.\n`;
  markdown += `- [Policies & Governance](${BASE_URL}/policies): Safeguarding, data protection, and operational policy standards.\n\n`;

  // Dynamic Sanity Projects
  if (projects && projects.length > 0) {
    markdown += `## Active Projects\n\n`;
    projects.forEach((p) => {
      const summary = p.llmsSummary || p.seoDescription || p.tagline || p.cardSummary || "Humanitarian project by Human Relief Mission.";
      const cleanSummary = summary.replace(/\s+/g, " ").trim();
      markdown += `- [${p.name}](${BASE_URL}/projects/${p.slug}): ${cleanSummary}\n`;
    });
    markdown += `\n`;
  }

  // Dynamic Ecosystem Stages
  if (stages && stages.length > 0) {
    markdown += `## 4-Phase Ecosystem Stages\n\n`;
    stages.forEach((s) => {
      const name = s.stageName || s.title;
      const stageLabel = s.stageNumber ? `Stage ${s.stageNumber}: ${name}` : name;
      const desc = s.seoDescription || s.cardDescription || s.headerDescription || "Ecosystem stage for long-term community development.";
      const cleanDesc = desc.replace(/\s+/g, " ").trim();
      markdown += `- [${stageLabel}](${BASE_URL}/ecosystem/${s.slug}): ${cleanDesc}\n`;
    });
    markdown += `\n`;
  }

  // Dynamic Sanity Policies
  if (policies && policies.length > 0) {
    markdown += `## Policies & Governance Documents\n\n`;
    policies.forEach((pol) => {
      const desc = pol.subtitle || `Official organizational policy for ${pol.title}.`;
      const cleanDesc = desc.replace(/\s+/g, " ").trim();
      markdown += `- [${pol.title}](${BASE_URL}/policies/${pol.slug}): ${cleanDesc}\n`;
    });
    markdown += `\n`;
  }



  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
