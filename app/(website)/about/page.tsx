"use client";

import Hero from "../components/about/ecosystem/Hero";
import WhoWeAre from "../components/about/WhoWeAre";
import Impact from "../components/about/Impact";
import Values from "../components/about/values";
import FinalCTA from "../components/FinalCTA";
import PoliciesReports from "../components/about/PoliciesReports";

export default function About() {
  return (
    <div id="page-about" className="block mt-8 sm:mt-24">
      <WhoWeAre />
      <Hero />
      <Impact />
      <Values />
      <PoliciesReports />
      <FinalCTA />
    </div>
  );
}

