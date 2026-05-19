import ProjectsGrid from "./components/ProjectsGrid";
import NewsletterForm from "./components/NewsletterForm";
import Impact from "./components/Impact";
import FinalCTA from "./components/FinalCTA";
import Hero from "./components/Hero";
import LastMonthImpact from "./components/LastMonthsImpact";

export default function Home() {
  return (
    <div id="page-home" className="page active">
      <Hero />
      <ProjectsGrid />
      <NewsletterForm />
      <Impact />
      <LastMonthImpact />
      <FinalCTA />
    </div>
  );
}
