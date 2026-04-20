"use client";

import Link from "next/link";
// import PageHeader from "../components/PageHeader";
import Hero from "../components/about/ecosystem/Hero";
import WhoWeAre from "../components/about/WhoWeAre";
import Impact from "../components/about/Impact";
import Values from "../components/about/values";
import Team from "../components/about/Team";

export default function About() {
  return (
    <div id="page-about" className="block mt-8 sm:mt-24">
      {/* <PageHeader
        title={<>About <br /> Human Relief Mission</>}
        subtitle="We are a UK-based international humanitarian charity, delivering relief and development aid to communities facing crisis, poverty, and inequality."
        breadcrumb="About Us"
        centered={true}
      /> */}

      <Hero />
      <WhoWeAre />
      <Impact />
      <Values />
      <Team />
    </div>
  );
}

