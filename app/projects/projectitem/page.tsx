"use client";

import Intro from "@/app/components/project/Intro";
import ProjectsPageHeader from "../../components/ProjectsPageHeader";
import CaseStudy from "@/app/components/project/CaseStudy";
import DonationItems from "@/app/components/project/DonationItems";
import Impact from "@/app/components/project/Impact";
import ImageCarousel from "@/app/components/project/ImageCarousel";
import Stats from "@/app/components/project/Stats";
import HowItHelps from "@/app/components/project/HowItHelps";
import FAQ from "@/app/components/project/faq";

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
          <Stats />
          <HowItHelps />
          <FAQ />
          <ImageCarousel />
        </div>
      </section>

    </>
  );
}
