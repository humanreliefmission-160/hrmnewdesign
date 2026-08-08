/**
 * JSON-LD structured data builders for humanreliefmission.com
 *
 * All builders return plain objects — no runtime dependency.
 * Use with <JsonLd data={...} /> in any Server Component.
 */

export const BASE_URL = "https://humanreliefmission.com";

// ─── Shared Organisation identity ───────────────────────────────────────────

const ORG_ID = `${BASE_URL}/#organization`;

export const ORGANIZATION = {
  "@type": ["NGO", "Organization"],
  "@id": ORG_ID,
  name: "Human Relief Mission",
  legalName: "HUMAN RELIEF MISSION",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo-white.svg`,
  },
  description:
    "Human Relief Mission is a UK-registered charity delivering humanitarian aid, sustainable development programmes and emergency relief to communities in need worldwide.",
  foundingDate: "2015",
  nonprofitStatus: "Registered Charity",
  taxID: "1160380",
  identifier: {
    "@type": "PropertyValue",
    name: "UK Charity Number",
    value: "1160380",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "160 Harehills Lane",
    addressLocality: "Leeds",
    postalCode: "LS8 5JP",
    addressCountry: "GB",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+443000300160",
      contactType: "customer service",
      availableLanguage: "English",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "18:00",
      },
    },
    {
      "@type": "ContactPoint",
      email: "info@humanreliefmission.com",
      contactType: "customer support",
    },
  ],
  sameAs: [
    "https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5051625",
  ],
};

// ─── Builder functions ───────────────────────────────────────────────────────

/** Organization schema — inject once in the site layout */
export function buildOrganization() {
  return {
    "@context": "https://schema.org",
    ...ORGANIZATION,
  };
}

/** WebSite schema with sitelinks SearchAction */
export function buildWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Human Relief Mission",
    description: "Helping Humanity Through Welfare",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Generic WebPage schema */
export function buildWebPage(opts: {
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.imageUrl
      ? { image: { "@type": "ImageObject", url: opts.imageUrl } }
      : {}),
    isPartOf: { "@id": `${BASE_URL}/#website` },
    publisher: { "@id": ORG_ID },
  };
}

/** BreadcrumbList schema */
export function buildBreadcrumb(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** ItemList of projects — used on the /projects listing page */
export function buildItemList(
  items: Array<{ name: string; url: string; description?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Our Projects",
    description:
      "Humanitarian and development projects run by Human Relief Mission.",
    url: `${BASE_URL}/projects`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

/** FAQPage schema */
export function buildFAQ(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** DonateAction schema */
export function buildDonateAction(opts: {
  name: string;
  url: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: opts.name,
    url: opts.url,
    ...(opts.description ? { description: opts.description } : {}),
    recipient: { "@id": ORG_ID },
  };
}

/** ContactPage schema */
export function buildContactPage() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE_URL}/contact#webpage`,
    url: `${BASE_URL}/contact`,
    name: "Contact Human Relief Mission",
    description:
      "Get in touch with Human Relief Mission — whether you have a donation query, want to volunteer, or need to reach our team.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    publisher: { "@id": ORG_ID },
  };
}
