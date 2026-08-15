import type { Metadata } from "next";
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
import JsonLd from "../../components/JsonLd";
import { BASE_URL, buildWebPage, buildBreadcrumb, buildFAQ, buildDonateAction } from "../../lib/jsonld";

// Cache each project page for 60 s with ISR
export const revalidate = 60;

const PROJECT_QUERY = `
  *[_type == "project" && slug.current == $projectSlug][0] {
    name,
    tagline,
    seo {
      metaTitle,
      metaDescription,
      ogImage,
      keywords,
      canonicalUrl,
      noIndex
    },
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



export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}): Promise<Metadata> {
  const { projectSlug } = await params;
  const project = await sanityFetch(PROJECT_QUERY, { projectSlug });

  if (!project) return { title: "Project Not Found | Human Relief Mission" };

  const title = project.seo?.metaTitle || `${project.name} | Human Relief Mission`;
  const description =
    project.seo?.metaDescription ||
    project.tagline ||
    `Support ${project.name} through Human Relief Mission. Every donation brings vital assistance to vulnerable communities.`;

  const ogImageUrl = project.seo?.ogImage
    ? urlFor(project.seo.ogImage).width(1200).height(630).url()
    : project.headerImage
    ? urlFor(project.headerImage).width(1200).height(630).url()
    : undefined;

  const canonicalUrl = project.seo?.canonicalUrl || `${BASE_URL}/projects/${projectSlug}`;

  return {
    title,
    description,
    keywords: project.seo?.keywords || undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: project.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Human Relief Mission",
      locale: "en_GB",
      type: "website",
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function ProjectItem({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  const project = await sanityFetch(PROJECT_QUERY, { projectSlug });

  if (!project) {
    notFound();
  }

  const headerImageUrl = project.headerImage
    ? urlFor(project.headerImage).width(1440).height(900).fit("crop").auto("format").quality(85).url()
    : "/img-placeholder.JPG";

  const seoTitle = project.seo?.metaTitle || `${project.name} | Human Relief Mission`;
  const seoDescription = project.seo?.metaDescription || project.tagline || undefined;
  const seoOgImageUrl = project.seo?.ogImage
    ? urlFor(project.seo.ogImage).url()
    : headerImageUrl !== "/img-placeholder.JPG"
    ? headerImageUrl
    : undefined;
  const seoCanonicalUrl = project.seo?.canonicalUrl || `${BASE_URL}/projects/${projectSlug}`;

  // Build JSON-LD schemas connected with Sanity SEO values
  const schemas: object[] = [
    buildWebPage({
      title: seoTitle,
      description: seoDescription,
      url: seoCanonicalUrl,
      imageUrl: seoOgImageUrl,
    }),
    buildBreadcrumb([
      { name: "Home", url: BASE_URL },
      { name: "Projects", url: `${BASE_URL}/projects` },
      { name: project.name, url: `${BASE_URL}/projects/${projectSlug}` },
    ]),
  ];

  if (project.faq?.cards?.length) {
    schemas.push(
      buildFAQ(
        project.faq.cards.map((c: { question: string; answerText: string }) => ({
          question: c.question,
          answer: c.answerText,
        }))
      )
    );
  }

  if (project.donationSection) {
    schemas.push(
      buildDonateAction({
        name: `Donate to ${project.name}`,
        url: `${BASE_URL}/donate?project=${projectSlug}`,
        description: seoDescription || project.donationSection.donationSubtext || undefined,
      })
    );
  }

  return (
    <>
      <JsonLd data={schemas} />
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
