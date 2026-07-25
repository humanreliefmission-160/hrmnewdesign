// ── Documents ─────────────────────────────────────────────────
import { sliderHero } from './documents/sliderHero'
import { ecosystemStage } from './documents/ecosystemStage'
import { aboutUs } from './documents/aboutUs'
import { projectCategory } from './documents/projectCategory'
import { project } from './documents/project'
import { donationIntention } from './documents/donationIntention'
import { fileCard } from './documents/fileCard'

// ── Objects ───────────────────────────────────────────────────


import { imageWithAlt } from './objects/imageWithAlt'
import { heroAmount } from './objects/heroAmount'
import { stat } from './objects/stat'
import { caseStudy } from './objects/caseStudy'
import { donationItem } from './objects/donationItem'
import { donationAmount } from './objects/donationAmount'
import { additionalField } from './objects/additionalField'
import { keyFeature } from './objects/keyFeature'
import { howItHelps } from './objects/howItHelps'
import { benefitCard } from './objects/benefitCard'
import { imageGalleryItem } from './objects/imageGalleryItem'
import { impactCard } from './objects/impactCard'
import { aboutImpactItem } from './objects/aboutImpactItem'
import { ecosystemCardRef } from './objects/ecosystemCardRef'
import { ecosystemQuoteCard } from './objects/ecosystemQuoteCard'
import { faqCard } from './objects/faqCard'
import { navItem } from './objects/navItem'
import { navSubItem } from './objects/navSubItem'
import { SchemaTypeDefinition } from 'sanity'
import { navigation } from './documents/navigation'
import { headerNavigation } from './documents/headerNavigation'
import { footerNavigation } from './documents/footerNavigation'
import { lastMonthsImpact } from './documents/lastMonthsImpact'
import { impactTicker } from './documents/impactTicker'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    sliderHero,
    ecosystemStage,
    aboutUs,
    projectCategory,
    project,
    donationIntention,
    fileCard,
    headerNavigation,
    footerNavigation,
    lastMonthsImpact,
    impactTicker,

    // Objects
    imageWithAlt,
    heroAmount,
    stat,
    caseStudy,
    donationItem,
    donationAmount,
    additionalField,
    keyFeature,
    howItHelps,
    benefitCard,
    imageGalleryItem,
    impactCard,
    aboutImpactItem,
    ecosystemCardRef,
    ecosystemQuoteCard,
    faqCard,
    navItem,
    navSubItem
  ]
}