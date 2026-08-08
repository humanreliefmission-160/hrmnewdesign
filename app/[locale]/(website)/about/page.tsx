import type { Metadata } from "next";
import Hero from "../components/about/ecosystem/Hero";
import WhoWeAre from "../components/about/WhoWeAre";
import Impact from "../components/about/Impact";
import Values from "../components/about/values";
import FinalCTA from "../components/FinalCTA";
import FundingDiagram from "../components/about/donationpolicy/FundingDiagram";
import DonationPolicySection from "../components/about/donationpolicy/DonationPolicy";
import JsonLd from "../components/JsonLd";
import { BASE_URL, buildWebPage, buildBreadcrumb } from "../lib/jsonld";

export const metadata: Metadata = {
  title: "About Us | Human Relief Mission",
  description:
    "Learn about Human Relief Mission. Who we are, core values, 100% donation policy, 4-stage ecosystem model and how we are transforming communities.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About Us | Human Relief Mission",
    description:
      "Learn about Human Relief Mission. Who we are, core values, 100% donation policy, 4-stage ecosystem model and how we are transforming communities.",
    url: `${BASE_URL}/about`,
    siteName: "Human Relief Mission",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Human Relief Mission",
    description:
      "Discover our mission, values, donation policy and 4-stage ecosystem model.",
  },
};

export default function About() {
  return (
    <div id="page-about" className="block mt-8 sm:mt-24">
      <JsonLd data={[
        buildWebPage({ title: "About Us | Human Relief Mission", description: "Learn about Human Relief Mission — who we are, our values, our donation policy and the impact we deliver for communities in Afghanistan.", url: `${BASE_URL}/about` }),
        buildBreadcrumb([{ name: "Home", url: BASE_URL }, { name: "About", url: `${BASE_URL}/about` }]),
      ]} />
      <WhoWeAre />
      <Hero />
      <DonationPolicySection />
      <Impact />
      <Values />
      <FinalCTA />
    </div>
  );
}
