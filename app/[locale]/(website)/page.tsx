import ProjectsGrid from "./components/ProjectsGrid";
import NewsletterForm from "./components/NewsletterForm";
import Impact from "./components/Impact";
import FinalCTA from "./components/FinalCTA";
import Hero from "./components/Hero";
import LastMonthImpact from "./components/LastMonthsImpact";
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";

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

export default async function Home() {
  const projects = await sanityFetch(ALL_PROJECTS_QUERY);

  return (
    <div id="page-home" className="page active">
      <Hero />
      <ProjectsGrid projects={projects} />
      <NewsletterForm />
      <Impact />
      <LastMonthImpact />
      <FinalCTA />
    </div>
  );
}
