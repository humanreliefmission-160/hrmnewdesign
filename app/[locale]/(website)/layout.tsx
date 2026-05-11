import type { Metadata } from "next";
import Footer from "./components/Footer";
import ImpactTicker from "./components/ImpactTicker";
import Navbar from "./components/Navbar";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'


export const metadata: Metadata = {
  title: "Human Relief Mission",
  description: "Helping Humanity Through Welfare",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik+Dirt&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ImpactTicker />
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
