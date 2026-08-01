import ProjectsPageHeader from "../../components/ProjectsPageHeader";

import Intro from "../../components/project/Intro";
import DonationItems from "../../components/project/DonationItems";
import Impact from "../../components/project/Impact";
import ImageCarousel from "../../components/project/ImageCarousel";
import HowItHelps from "../../components/project/HowItHelps";
import FAQ from "../../components/project/faq";
import CaseStudy from "../../components/project/CaseStudy";
import { notFound } from "next/navigation";
import { sanityFetch } from "../../../lib/sanity/client";
import { urlFor } from "@/sanity/lib/image";

// Cache each project page for 60 s with ISR
export const revalidate = 60;

const PROJECT_QUERY = `
  *[_type == "project" && slug.current == $projectSlug][0] {
    name,
    tagline,
    "projectCategory": projectCategory->{ name },
    "stageSlug": ecosystemSection.stage->slug.current,
    headerImage,
    headerVideoUrl,
    headerVideoMute,
    introSection,
    caseStudies[] {
      _key,
      title,
      image,
      videoUrl,
      muteVideo,
      quote,
      body,
      reference
    },
    donationSection {
      sectionTag,
      donationTitle,
      donationSubtext,
      donationItems[] {
        _key,
        icon,
        itemTitle,
        itemSubtext,
        price,
        contactForPricing,
        donationType,
        frequency,
        amounts[] {
          _key,
          amount,
          label
        },
        intentions[]->{
          title,
          description
        },
        additionalFields,
        "slug": slug.current
      }
    },
    benefits {
      title,
      subtext,
      cards[] {
        _key,
        icon,
        title,
        subtext,
      },
      "imageGallery": imageGallery[] {
        "_type": image._type,
        "asset": image.asset,
        "alt": altText,
        videoUrl,
        muteVideo
      }
    },
    impactSection,

    ecosystemSection {
      title,
      bodyText,
      "stage": stage->{ title, slug },
      ecosystemCards[] {
        _key,
        icon,
        cardTitle,
        customSummary
      },
      quoteCard {
        quote,
        reference
      },
      callToAction {
        title,
        body,
        text
      }
    },

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



export default async function ProjectItem({
  params,
}: {
  params: Promise<{ projectSlug: string }>
}) {
  const { projectSlug } = await params;
  const project = await sanityFetch(PROJECT_QUERY, { projectSlug });

  if (!project) {
    notFound();
  }

  const headerImageUrl = project.headerImage
    ? urlFor(project.headerImage).url()
    : "/img-placeholder.JPG";

  return (
    <>
      <ProjectsPageHeader
        projectCategory={project.projectCategory?.name}
        title={project.name}
        subtitle={project.tagline}
        breadcrumb="PROJECTS"
        display={true}
        image={headerImageUrl}
        videoUrl={project.headerVideoUrl}
        videoMute={project.headerVideoMute}
        heroAmounts={project.heroAmounts}
        projectName={project.name}
        projectSlug={projectSlug}
      />

      <section>
        <div className="mx-auto">
          <Intro data={project.introSection} />
          <CaseStudy data={project.caseStudies} />
          <DonationItems
            data={project.donationSection}
            projectSlug={projectSlug}
            projectName={project.name}
            stageSlug={project.stageSlug}
          />
          <Impact data={project.impactSection} />
          <ImageCarousel
            images={project.benefits?.imageGallery}
            projectSlug={projectSlug}
          />
          <HowItHelps data={project.benefits} ecosystemSection={project.ecosystemSection} />
          <FAQ data={project.faq} />
        </div>
      </section >

    </>
  );
}
