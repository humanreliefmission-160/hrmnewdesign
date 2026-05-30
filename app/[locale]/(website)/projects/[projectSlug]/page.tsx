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
  *[_type == "project" && slug.current == $projectSlug][0] {
    name,
    tagline,
    headerImage,
    introSection,
    caseStudies,
    donationSection,
    benefits {
      title,
      subtext,
      cards[] {
        _key,
        icon,
        title,
        subtext,
        slug,
      },
      "imageGallery": imageGallery[] {
        "_type": image._type,
        "asset": image.asset,
        "alt": altText
      }
    },
    impactSection,

    faq {
      title,
      cards[] {
        _key,
        question,
        answerText
      }
    },
    heroAmounts[] {
      amount,
      impactLabel
    }
  }
`;

interface HeroAmount {
  amount: number;
  impactLabel: string;
}

interface HeroAmountProps {
  heroAmounts: HeroAmount[];
}


export default async function ProjectItem({
  params,
}: {
  params: Promise<{ projectSlug: string }>
}) {
  // export default async function ProjectItem({ params }: { params: Promise<{ slug: string }>, heroAmounts: HeroAmount[] }) {
  const { projectSlug } = await params;
  const project = await sanityFetch(PROJECT_QUERY, { projectSlug });

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
      // heroAmounts={project.heroAmounts}
      />

      <section>
        <div className="mx-auto">
          <Intro data={project.introSection} />
          <CaseStudy data={project.caseStudies} />
          <DonationItems
            data={project.donationSection}
            projectSlug={projectSlug}
          />
          <Impact data={project.impactSection} />
          <ImageCarousel images={project.benefits?.imageGallery} />
          <HowItHelps data={project.benefits} />
          <FAQ data={project.faq} />
        </div>
      </section >

    </>
  );
}
