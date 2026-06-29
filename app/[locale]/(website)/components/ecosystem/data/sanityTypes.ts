/**
 * TypeScript types that mirror the `ecosystemStage` Sanity document schema.
 * Used by the ecosystem [...slug] page and its child section components.
 */

export type SanityImageAsset = {
  _ref: string;
  _type: "reference";
};

export type SanityImage = {
  _type: "image";
  asset?: SanityImageAsset;
  hotspot?: { x: number; y: number; height: number; width: number };
  caption?: string;
};

export type SanityBlock = {
  _type: "block";
  [key: string]: unknown;
};

export type HeroAmount = {
  amount: number;
  impactLabel: string;
};

export type ImpactCard = {
  _key?: string;
  figure: string;
  subtext: string;
};

export type ContentSection = {
  title?: string;
  bodyText?: SanityBlock[];
};

export type CaseStudyReference = {
  text?: string;
  dateAndInterviewer?: string;
};

export type CaseStudy = {
  title?: string;
  image?: SanityImage & { caption?: string };
  quote?: string;
  bodyText?: SanityBlock[];
  reference?: CaseStudyReference;
};

export type FaqItem = {
  _key?: string;
  question: string;
  answer: string;
};

/** Full shape returned by the GROQ query in ecosystem/[...slug]/page.tsx */
export type SanityEcosystemStage = {
  _id: string;
  title: string;
  slug: { current: string };
  order: number;
  stageNumber?: number;
  stageName?: string;

  // Page Header
  headerImage?: SanityImage;
  headerDescription?: string;
  donationPrices?: HeroAmount[];

  // Card
  cardImage?: SanityImage;
  cardIcon?: string;
  cardDescription?: string;

  // Intro
  introTitle?: string;
  impactCards?: ImpactCard[];
  whyThisStageExists?: ContentSection;
  howThisStageWorks?: ContentSection;
  longTermVision?: ContentSection;
  howYouCanHelp?: ContentSection;

  // Case Study
  caseStudy?: CaseStudy;

  // FAQs
  faqs?: FaqItem[];
};

/** Lightweight type used for stage navigation (prev/next + grid) */
export type SanityEcosystemStageNav = {
  _id: string;
  title: string;
  slug: { current: string };
  order: number;
  stageNumber?: number;
  stageName?: string;
};

// ── Stage-linked projects (for DonateSection) ──────────────────────────────

export type StageProjectDonationAmount = {
  _key: string;
  amount: number;
  impactLabel?: string;
};

export type StageProjectDonationItem = {
  _key: string;
  icon?: string;
  itemTitle?: string;
  itemSubtext?: string;
  price?: number;
  contactForPricing?: boolean;
  slug?: string;
  donationType?: "one-off" | "monthly";
  frequency?: string | string[];
  amounts?: StageProjectDonationAmount[];
};

export type StageProjectDonationSection = {
  sectionTag?: string;
  donationTitle?: string;
  donationSubtext?: string;
  donationItems?: StageProjectDonationItem[];
};

/** A project linked to an ecosystem stage — used in DonateSection */
export type StageProject = {
  _id: string;
  cardIcon?: string;
  name: string;
  slug: string; // slug.current aliased in GROQ
  heroAmounts?: StageProjectDonationAmount[];
  donationSection?: StageProjectDonationSection;
  donationPrice?: number;
};
