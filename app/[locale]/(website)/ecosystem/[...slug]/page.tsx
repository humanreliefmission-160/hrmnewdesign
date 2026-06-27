import { notFound } from "next/navigation";
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import ProjectsPageHeader from "../../components/ProjectsPageHeader";
import IntroSection from "../../components/ecosystem/sections/ecosystempage/IntroSection";
import CaseStudySection from "../../components/ecosystem/sections/ecosystempage/CaseStudySection";
import FAQSection from "../../components/ecosystem/sections/ecosystempage/FAQSection";
import StageNavigation from "../../components/ecosystem/sections/ecosystempage/StageNavigation";
import {
  type SanityEcosystemStage,
  type SanityEcosystemStageNav,
  type StageProject,
} from "../../components/ecosystem/data/sanityTypes";
import DonateSection from "../../components/ecosystem/sections/ecosystempage/DonateSection";

// ─── GROQ queries ────────────────────────────────────────────────────────────

/** Fetch one stage by slug — full detail */

const STAGE_QUERY = `
*[_type == "ecosystemStage" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  order,
  stageNumber,
  stageName,
  headerImage,
  headerDescription,
  donationPrices,
  cardImage,
  cardIcon,
  cardDescription,
  introTitle,
  impactCards,
  whyThisStageExists,
  howThisStageWorks,
  longTermVision,
  howYouCanHelp,
  caseStudy,
  faqs
}
`;

/** Fetch all stages (lightweight) for static params + navigation */
// const ALL_STAGES_QUERY = `
//   *[_type == "ecosystemStage"] | order(order asc) {
//     _id,
//     title,
//     slug,
//     order,
//     stageNumber,
//     stageName
//   }
// `;
// const ALL_STAGES_QUERY = `
//   *[_type == "ecosystemStage"] | order(sortOrder asc) {
//     "slug": slug.current,
//   }
// `
const ALL_STAGES_QUERY = `
  *[_type == "ecosystemStage" && defined(slug.current)] | order(order asc) {
    _id,
    title,
    slug,
    order,
    stageNumber,
    stageName
  }
`

/** Fetch all projects that reference this stage — for DonateSection cards */
const STAGE_PROJECTS_QUERY = `
  *[_type == "project" && ecosystemSection.stage._ref == $stageId] | order(name asc) {
    _id,
    name,
    "cardIcon": icon,
    "slug": slug.current,
    heroAmounts[] {
      _key,
      amount,
      impactLabel
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
        donationType,
        frequency,
        amounts[] {
          _key,
          amount,
          "impactLabel": label
        }
      }
    }
  }
`

// ─── Static params (build-time slug list) ────────────────────────────────────

// export async function generateStaticParams() {
//   const stages = await sanityFetch<SanityEcosystemStageNav[]>(ALL_STAGES_QUERY);
//   return stages.map((stage) => ({
//     slug: [stage.slug.current],
//   }));
// }

export async function generateStaticParams() {
  const stages = await sanityFetch<SanityEcosystemStageNav[]>(ALL_STAGES_QUERY)

  return stages
    .filter((stage) => stage.slug?.current)   // skip any null slugs
    .map((stage) => ({
      slug: [stage.slug.current],
    }))
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EcosystemStagePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = slugParts[0];

  // Fetch stage detail, navigation stages, and linked projects in parallel
  const [stage, allStages] = await Promise.all([
    sanityFetch<SanityEcosystemStage | null>(STAGE_QUERY, { slug }),
    sanityFetch<SanityEcosystemStageNav[]>(ALL_STAGES_QUERY),
  ]);

  if (!stage) notFound();

  // Now we have the stage _id, fetch the linked projects
  const stageProjects = await sanityFetch<StageProject[]>(
    STAGE_PROJECTS_QUERY,
    { stageId: stage._id }
  );

  // DEBUG — remove once verified
  console.log("[EcosystemPage] stage._id:", stage._id);
  console.log("[EcosystemPage] stageProjects:", JSON.stringify(stageProjects, null, 2));

  // Resolve hero image — prefer headerImage, fall back to cardImage
  const heroImageSrc =
    stage.headerImage?.asset
      ? urlFor(stage.headerImage.asset).width(1400).height(900).fit("crop").url()
      : stage.cardImage?.asset
        ? urlFor(stage.cardImage.asset).width(1400).height(900).fit("crop").url()
        : "/img-placeholder.JPG";

  // Map donationPrices from Sanity → heroAmounts expected by ProjectsPageHeader
  const heroAmounts =
    stage.donationPrices && stage.donationPrices.length > 0
      ? stage.donationPrices
      : undefined;

  const pageTitle = stage.stageName || stage.title;
  const pageSubtitle = stage.headerDescription || stage.cardDescription || "";

  return (
    <>
      {/* Page Header with donation widget */}
      <ProjectsPageHeader
        title={pageTitle}
        subtitle={pageSubtitle}
        breadcrumb="ECOSYSTEM"
        display={true}
        image={heroImageSrc}
        heroAmounts={heroAmounts}
        projectName={pageTitle}
      />

      <section>
        <div className="mx-auto">
          {/* Intro — why / how / vision / help */}
          <IntroSection stage={stage} />

          {/* Case Study */}
          {stage.caseStudy?.title && <CaseStudySection stage={stage} />}

          {/* How to Donate — per-project cards, or stage fallback */}
          <DonateSection stage={stage} stageProjects={stageProjects} />

          {/* FAQ */}
          {stage.faqs && stage.faqs.length > 0 && (
            <FAQSection stage={stage} allStages={allStages} />
          )}

          {/* Stage navigation */}
          <StageNavigation stage={stage} allStages={allStages} />
        </div>
      </section>
    </>
  );
}
