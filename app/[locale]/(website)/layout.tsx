import type { Metadata } from "next";
import Footer from "./components/Footer";
import ImpactTicker from "./components/ImpactTicker";
import Navbar from "./components/Navbar";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Providers from "./components/Providers";
import { sanityFetch } from "../lib/sanity/client";

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
      "slug": slug.current
    }
  }
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

  const [headerNav, projectCategories] = await Promise.all([
    sanityFetch<any>(HEADER_NAV_QUERY),
    sanityFetch<any[]>(PROJECT_CATEGORIES_QUERY),
  ]);

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik+Dirt&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ImpactTicker />
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
