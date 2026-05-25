import ProjectsPageHeader from "../../components/ProjectsPageHeader";

import Intro from "../../components/project/Intro";
import DonationItems from "../../components/project/DonationItems";
import Impact from "../../components/project/Impact";
import ImageCarousel from "../../components/project/ImageCarousel";
import Stats from "../../components/project/Stats";
import HowItHelps from "../../components/project/HowItHelps";
import FAQ from "../../components/project/faq";
import CaseStudy from "../../components/project/CaseStudy";
import { notFound } from "next/navigation";
import { sanityFetch } from "../../../lib/sanity/client";
import { urlFor } from "@/sanity/lib/image";

const PROJECT_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    name,
    tagline,
    headerImage,
    introSection,
    caseStudies,
    donationSection,
    benefits,
    impactSection,
    imageGallery,
    faq,
  }
`;

export default async function ProjectItem({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const project = await sanityFetch(PROJECT_QUERY, { slug });

  if (!project) {
    notFound();
  }

  const headerImageUrl = project.headerImage?.asset
    ? urlFor(project.headerImage.asset).url()
    : "/img-placeholder.JPG";

  return (
    <>
      <ProjectsPageHeader
        title={project.name}
        subtitle={project.tagline}
        breadcrumb="PROJECTS"
        display={true}
        image={headerImageUrl}
      />

      <section>
        <div className="mx-auto">
          <Intro data={project.introSection} />
          <CaseStudy data={project.caseStudies} />
          <DonationItems data={project.donationSection} />
          <Impact data={project.impactSection} />
          {/* Need to do */}
          <ImageCarousel images={project.imageGallery} />
          <HowItHelps data={project.benefits} />
          <FAQ data={project.faq} />
        </div>
      </section>

    </>
  );
}
