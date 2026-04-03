"use client";

import Hero from "./components/Hero";
import ProjectsGrid from "./components/ProjectsGrid";
import NewsletterForm from "./components/NewsletterForm";
import Impact from "./components/Impact";
import FinalCTA from "./components/FinalCTA";
import HeroTwo from "./components/HeroTwo";

export default function Home() {
  return (
    <div id="page-home" className="page active">
      <Hero />
      <ProjectsGrid />
      <NewsletterForm />
      <Impact />
      <FinalCTA />

      <HeroTwo />
    </div>
  );
}
