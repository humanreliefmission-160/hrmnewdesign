import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import ProjectsPageHeader from "../../components/ProjectsPageHeader";
import PageHeader from "../../components/PageHeader";
import IntroSection from "../../components/ecosystem/sections/ecosystempage/IntroSection";
import CaseStudySection from "../../components/ecosystem/sections/ecosystempage/CaseStudySection";
import FAQSection from "../../components/ecosystem/sections/ecosystempage/FAQSection";
import StageNavigation from "../../components/ecosystem/sections/ecosystempage/StageNavigation";
import DonateSection from "../../components/ecosystem/sections/ecosystempage/DonateSection";
import AidItemDetails from "../../components/projectdonationitem/AidItemDetails";
import DonationOptions from "../../components/projectdonationitem/DonationOptions";
import ImageGallery from "../../components/projectdonationitem/ImageGallary";
import JsonLd from "../../components/JsonLd";
import { BASE_URL, buildWebPage, buildBreadcrumb, buildFAQ, buildDonateAction } from "../../lib/jsonld";

import {
  type SanityEcosystemStage,
  type SanityEcosystemStageNav,
  type StageProject,
} from "../../components/ecosystem/data/sanityTypes";
import type { DonationItemData, DonationItemImage, GalleryImage } from "../../types/donationItem";

// ─── GROQ queries ────────────────────────────────────────────────────────────

/** Fetch one stage by slug — full detail */
const STAGE_QUERY = `
*[_type == "ecosystemStage" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  seo {
    metaTitle,
    metaDescription,
    ogImage,
    keywords,
    canonicalUrl,
    noIndex
  },
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
const ALL_STAGES_QUERY = `
  *[_type == "ecosystemStage" && defined(slug.current)] | order(order asc) {
    _id,
    title,
    slug,
    order,
    stageNumber,
    stageName
  }
`;

const STAGE_PROJECTS_QUERY = `
  *[_type == "project" && count(donationSection.donationItems[stage._ref == $stageId]) > 0] | order(name asc) {
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
      "donationItems": donationSection.donationItems[stage._ref == $stageId] {
        _key,
        icon,
        itemTitle,
        itemSubtext,
        price,
        contactForPricing,
        "slug": slug.current,
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
`;

const ECOSYSTEM_ITEM_QUERY = `
  *[_type == "project" && ecosystemSection.stage->slug.current == $stageSlug && count(donationSection.donationItems[slug.current == $donationitemSlug]) > 0][0] {
    name,
    "projectSlug": slug.current,
    "stageName": ecosystemSection.stage->stageName,
    "item": donationSection.donationItems[slug.current == $donationitemSlug][0] {
      icon,
      itemTitle,
      itemSubtext,
      price,
      contactForPricing,
      donationType,
      frequency,
      donationItemBody,
      amounts[] {
        _key,
        amount,
        label
      },
      intentions[]-> {
        title,
        description
      },
      images[] {
        altText,
        caption,
        link,
        asset
      },
      keyFeatures,
      howItHelps,
      endGoal,
      summarise,
      additionalFields,
      info
    }
  }
`;

const STATIC_PATHS_QUERY = `
  *[_type == "ecosystemStage" && defined(slug.current)] {
    "stageSlug": slug.current,
    "itemSlugs": *[_type == "project" && count(donationSection.donationItems[stage._ref == ^._id]) > 0].donationSection.donationItems[stage._ref == ^._id].slug.current
  }
`;

interface EcosystemItemResult {
  name: string;
  projectSlug: string;
  stageName: string;
  item: DonationItemData | null;
}

// ─── Static params (build-time slug list) ────────────────────────────────────

export async function generateStaticParams() {
  const data = await sanityFetch<Array<{ stageSlug: string; itemSlugs?: string[] }>>(STATIC_PATHS_QUERY);
  const paths: Array<{ slug: string[] }> = [];

  for (const stage of data) {
    if (stage.stageSlug) {
      // Stage route (length 1)
      paths.push({ slug: [stage.stageSlug] });

      // Item routes (length 2)
      if (stage.itemSlugs) {
        for (const itemSlug of stage.itemSlugs) {
          if (itemSlug) {
            paths.push({ slug: [stage.stageSlug, itemSlug] });
          }
        }
      }
    }
  }
  return paths;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug: slugParts } = await params;

  if (slugParts.length === 2) {
    const [stageSlug, donationitemSlug] = slugParts;
    const data = await sanityFetch<EcosystemItemResult | null>(
      ECOSYSTEM_ITEM_QUERY,
      { stageSlug, donationitemSlug }
    );

    if (!data?.item) return { title: "Item Not Found | Human Relief Mission" };

    const title = `${data.item.itemTitle} | Human Relief Mission`;
    const description = data.item.itemSubtext || `Donate ${data.item.itemTitle} through Human Relief Mission.`;
    const canonicalUrl = `${BASE_URL}/ecosystem/${stageSlug}/${donationitemSlug}`;

    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "Human Relief Mission",
        locale: "en_GB",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  const stageSlug = slugParts[0];
  const stage = await sanityFetch<SanityEcosystemStage | null>(STAGE_QUERY, {
    slug: stageSlug,
  });

  if (!stage) return { title: "Stage Not Found | Human Relief Mission" };

  const title = stage.seo?.metaTitle || `${stage.title} — Stage ${stage.stageNumber || ""} | Human Relief Mission`;
  const description =
    stage.seo?.metaDescription ||
    stage.headerDescription ||
    `Explore Stage ${stage.stageNumber || ""}: ${stage.title} in the Human Relief Mission 4-phase ecosystem model.`;

  const ogImageUrl = stage.seo?.ogImage
    ? urlFor(stage.seo.ogImage).width(1200).height(630).url()
    : stage.headerImage
    ? urlFor(stage.headerImage).width(1200).height(630).url()
    : undefined;

  const canonicalUrl = stage.seo?.canonicalUrl || `${BASE_URL}/ecosystem/${stageSlug}`;

  return {
    title,
    description,
    keywords: stage.seo?.keywords || undefined,
    alternates: { canonical: canonicalUrl },
    robots: stage.seo?.noIndex ? { index: false, follow: false } : undefined,
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EcosystemPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;

  if (slugParts.length === 2) {
    const [stageSlug, donationitemSlug] = slugParts;

    const data = await sanityFetch<EcosystemItemResult | null>(
      ECOSYSTEM_ITEM_QUERY,
      { stageSlug, donationitemSlug }
    );

    if (!data?.item) notFound();

    const { item, projectSlug } = data;

    const galleryImages: GalleryImage[] = (item.images ?? []).map((img: DonationItemImage) => ({
      src: img.asset
        ? urlFor(img.asset).width(1200).height(900).fit('crop').auto('format').quality(80).url()
        : '/img-placeholder.JPG',
      altText: img.altText,
      caption: img.caption,
      link: img.link,
    }));

    if (galleryImages.length === 0) {
      galleryImages.push({
        src: '/img-placeholder.JPG',
        altText: item.itemTitle,
      });
    }

    const itemUrl = `${BASE_URL}/ecosystem/${stageSlug}/${donationitemSlug}`;

    return (
      <div className="min-h-screen bg-brand-white font-sans antialiased">
        <JsonLd
          data={[
            buildWebPage({
              title: `${item.itemTitle} | Human Relief Mission`,
              description: item.itemSubtext || undefined,
              url: itemUrl,
              imageUrl: galleryImages[0]?.src !== '/img-placeholder.JPG' ? galleryImages[0].src : undefined,
            }),
            buildBreadcrumb([
              { name: "Home", url: BASE_URL },
              { name: "Ecosystem", url: `${BASE_URL}/ecosystem` },
              { name: stageSlug.toUpperCase(), url: `${BASE_URL}/ecosystem/${stageSlug}` },
              { name: item.itemTitle, url: itemUrl },
            ]),
            buildDonateAction({
              name: `Donate ${item.itemTitle}`,
              url: itemUrl,
              description: item.itemSubtext || undefined,
            }),
          ]}
        />
        <PageHeader
          title={item.itemTitle}
          subtitle={item.itemSubtext}
          display={false}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-24 mt-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14 xl:grid-cols-[55fr_45fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              {/* Breadcrumb Bar */}
              <div className="flex flex-wrap items-center gap-2 text-[0.75rem] font-bold uppercase mb-6 text-brand-black/60">
                <Link href="/" className="hover:text-purple transition-colors">
                  Home
                </Link>
                <span className="text-purple">&gt;</span>
                <Link href="/ecosystem" className="hover:text-purple transition-colors">
                  Ecosystem
                </Link>
                <span className="text-purple">&gt;</span>
                <Link href={`/ecosystem/${stageSlug}`} className="hover:text-purple transition-colors">
                  {data.stageName || stageSlug}
                </Link>
                <span className="text-purple">&gt;</span>
                <span className="text-brand-black font-bold">
                  {item.itemTitle}
                </span>
              </div>

              <ImageGallery images={galleryImages} />
            </div>
            <div>
              <DonationOptions item={item} projectName={data.name} projectSlug={projectSlug} />
            </div>
          </div>
          <AidItemDetails item={item} />
        </main>
      </div>
    );
  }

  // Length 1 or fallback: Ecosystem stage view
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

  // Resolve hero image — prefer headerImage, fall back to cardImage
  const heroImageSrc =
    stage.headerImage?.asset
      ? urlFor(stage.headerImage.asset).width(1400).height(900).fit("crop").auto("format").quality(80).url()
      : stage.cardImage?.asset
        ? urlFor(stage.cardImage.asset).width(1400).height(900).fit("crop").auto("format").quality(80).url()
        : "/img-placeholder.JPG";

  // Map donationPrices from Sanity → heroAmounts expected by ProjectsPageHeader
  const heroAmounts =
    stage.donationPrices && stage.donationPrices.length > 0
      ? stage.donationPrices
      : undefined;

  const pageTitle = stage.stageName || stage.title;
  const pageSubtitle = stage.headerDescription || stage.cardDescription || "";

  const stageSlug = slugParts[0];
  const seoTitle = stage.seo?.metaTitle || `${pageTitle} — Stage ${stage.stageNumber || ""} | Human Relief Mission`;
  const seoDesc = stage.seo?.metaDescription || pageSubtitle || undefined;
  const seoOgImage = stage.seo?.ogImage
    ? urlFor(stage.seo.ogImage).url()
    : heroImageSrc !== "/img-placeholder.JPG"
    ? heroImageSrc
    : undefined;
  const stageCanonicalUrl = stage.seo?.canonicalUrl || `${BASE_URL}/ecosystem/${stageSlug}`;

  const schemas: object[] = [
    buildWebPage({
      title: seoTitle,
      description: seoDesc,
      url: stageCanonicalUrl,
      imageUrl: seoOgImage,
    }),
    buildBreadcrumb([
      { name: "Home", url: BASE_URL },
      { name: "Ecosystem", url: `${BASE_URL}/ecosystem` },
      { name: pageTitle, url: stageCanonicalUrl },
    ]),
  ];

  if (stage.faqs?.length) {
    schemas.push(
      buildFAQ(
        stage.faqs.map((f: { question: string; answer: string }) => ({
          question: f.question,
          answer: f.answer,
        }))
      )
    );
  }

  return (
    <>
      <JsonLd data={schemas} />
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
