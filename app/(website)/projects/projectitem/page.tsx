"use client";

import ProjectsPageHeader from "../../components/ProjectsPageHeader";

import Intro from "../../components/project/Intro";
import DonationItems from "../../components/project/DonationItems";
import Impact from "../../components/project/Impact";
import ImageCarousel from "../../components/project/ImageCarousel";
import Stats from "../../components/project/Stats";
import HowItHelps from "../../components/project/HowItHelps";
import FAQ from "../../components/project/faq";
import CaseStudy from "../../components/project/CaseStudy";

export default function ProjectItem() {
  return (
    <>
      <ProjectsPageHeader
        title="Projects Name"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat semper feugiat. Lorem ipsum dolor."
        breadcrumb="HOME"
        display={true}
        image="/img-placeholder.JPG"
      />

      <section>
        <div className="mx-auto">
          <Intro />
          <CaseStudy />
          <DonationItems />
          <Impact />
          <ImageCarousel />
          <Stats />
          <HowItHelps />
          <FAQ />
        </div>
      </section>

    </>
  );
}
