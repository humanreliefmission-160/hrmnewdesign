import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Footer from "./components/Footer";
import ImpactTicker from "./components/ImpactTicker";
import NavbarWrapper from "./components/NavbarWrapper";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Providers from "./components/Providers";
import { sanityFetch } from "../lib/sanity/client";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  icons: {
    icon: '/favicon.ico',   // ← this line — path is relative to /public
  },
};

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

  const impactItems = await sanityFetch<string[] | null>(IMPACT_TICKER_QUERY);

  return (
    <html lang={locale} className={rubik.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ImpactTicker items={impactItems ?? []} />
            <NavbarWrapper />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
