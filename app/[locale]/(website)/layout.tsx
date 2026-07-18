import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Footer from "./components/Footer";
import ImpactTicker from "./components/ImpactTicker";
import Navbar from "./components/Navbar";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Providers from "./components/Providers";
import { sanityFetch } from "../lib/sanity/client";

// Load Rubik via next/font — font-face is inlined at build time,
// eliminating the external Google Fonts round-trip and render-blocking stylesheet.
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-rubik',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Human Relief Mission",
  description: "Helping Humanity Through Welfare",
};

const HEADER_NAV_QUERY = `
  *[_type == "navigation" && placement == "header"][0] {
    navItems[] {
      label,
      linkType,
      internalLink,
      externalLink,
      isExternal,
      subItems[] {
        label,
        linkType,
        internalLink,
        externalLink,
        isExternal
      }
    }
  }
`;

const PROJECT_CATEGORIES_QUERY = `
  *[_type == "projectCategory"] {
    _id,
    name,
    "projects": *[_type == "project" && references(^._id)] | order(name asc) {
      name,
      "slug": slug.current,
      "donationItems": donationSection.donationItems[] {
        "slug": slug.current,
        itemTitle
      }
    }
  }
`;

const IMPACT_TICKER_QUERY = `
  *[_type == "impactTicker"][0].impactItems
`;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const messages = await getMessages()

  const [headerNav, projectCategories, impactItems] = await Promise.all([
    sanityFetch<any>(HEADER_NAV_QUERY),
    sanityFetch<any[]>(PROJECT_CATEGORIES_QUERY),
    sanityFetch<string[] | null>(IMPACT_TICKER_QUERY),
  ]);

  return (
    <html lang={locale} className={rubik.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ImpactTicker items={impactItems ?? []} />
            <Navbar
              navItems={headerNav?.navItems ?? []}
              projectCategories={projectCategories ?? []}
            />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
