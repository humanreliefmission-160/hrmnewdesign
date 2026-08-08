import type { Metadata } from "next";
import BottomCTA from "../components/ecosystem/sections/BottomCTA";
import StagesCard from "../components/ecosystem/sections/StagesCard";
import PageHeader from "../components/PageHeader";
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import JsonLd from "../components/JsonLd";
import { BASE_URL, buildWebPage, buildBreadcrumb } from "../lib/jsonld";

export const metadata: Metadata = {
  title: "The 4-Phase Ecosystem | Human Relief Mission",
  description:
    "From receiving Zakat to paying Zakat — our 4-phase ecosystem lifts families out of poverty through Essentials, Stability, Development, and Self-Sustainability.",
  alternates: {
    canonical: `${BASE_URL}/ecosystem`,
  },
  openGraph: {
    title: "The 4-Phase Ecosystem | Human Relief Mission",
    description:
      "From receiving Zakat to paying Zakat — our 4-phase ecosystem lifts families out of poverty through Essentials, Stability, Development, and Self-Sustainability.",
    url: `${BASE_URL}/ecosystem`,
    siteName: "Human Relief Mission",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 4-Phase Ecosystem | Human Relief Mission",
    description:
      "Our 4-phase ecosystem lifts families out of poverty toward self-sustainability.",
  },
};

const STAGES_QUERY = `
  *[_type == "ecosystemStage" && defined(slug.current)] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    order,
    stageNumber,
    stageName,
    cardImage {
      asset-> {
        _id,
        url
      }
    },
    cardDescription
  }
`;

export default async function Ecosystem() {
  const stages = await sanityFetch<any[]>(STAGES_QUERY);

  return (
    <>
      <JsonLd
        data={[
          buildWebPage({
            title: "The 4-Phase Ecosystem | Human Relief Mission",
            description:
              "From receiving Zakat to paying Zakat — our 4-phase ecosystem lifts families out of poverty through Essentials, Stability, Development, and Self-Sustainability.",
            url: `${BASE_URL}/ecosystem`,
          }),
          buildBreadcrumb([
            { name: "Home", url: BASE_URL },
            { name: "Ecosystem", url: `${BASE_URL}/ecosystem` },
          ]),
        ]}
      />
      <PageHeader
        title="From Receiving Zakat to Paying Zakat"
        subtitle="Our 4 phase ecosystem lifts the needy out of poverty, providing Essentials, building Stability, enabling Development and creating Sustainability so every recipient becomes a contributor."
        breadcrumb="ECOSYSTEM"
        display={true}
      />

      <section>
        <div className="mx-auto">
          <StagesCard stages={stages} />
          <BottomCTA stages={stages} />
        </div>
      </section>
    </>
  );
}
