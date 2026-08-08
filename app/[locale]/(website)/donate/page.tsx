import type { Metadata } from "next";
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import {
  DONATION_PROJECTS_QUERY,
  type DonationPortalProject,
} from "../lib/sanity/donationProjects";
import DonateClient from "./DonateClient";
import JsonLd from "../components/JsonLd";
import { BASE_URL, buildDonateAction, buildBreadcrumb } from "../lib/jsonld";

export const metadata: Metadata = {
  title: "Donate Now | Human Relief Mission",
  description:
    "Donate online securely to support urgent humanitarian aid, water projects, healthcare, orphan sponsorship and income generation projects.",
  alternates: {
    canonical: `${BASE_URL}/donate`,
  },
  openGraph: {
    title: "Donate Now | Human Relief Mission",
    description:
      "Donate online securely to support urgent humanitarian aid, water projects, healthcare, orphan sponsorship and income generation projects.",
    url: `${BASE_URL}/donate`,
    siteName: "Human Relief Mission",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate Now | Human Relief Mission",
    description:
      "Donate online securely to support urgent humanitarian aid worldwide.",
  },
};

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; step?: string }>;
}) {
  const { project: initialProjectSlug, step: initialStep } = await searchParams;
  const projects = await sanityFetch<DonationPortalProject[]>(DONATION_PROJECTS_QUERY);

  const parsedStep = initialStep ? Number.parseInt(initialStep, 10) : undefined;

  return (
    <>
      <JsonLd data={[
        buildDonateAction({ name: "Donate to Human Relief Mission", url: `${BASE_URL}/donate`, description: "Support Human Relief Mission's humanitarian projects worldwide. Choose a project and donate online securely." }),
        buildBreadcrumb([{ name: "Home", url: BASE_URL }, { name: "Donate", url: `${BASE_URL}/donate` }]),
      ]} />
      <DonateClient
        projects={projects ?? []}
        initialProjectSlug={initialProjectSlug}
        initialStep={Number.isFinite(parsedStep) ? parsedStep : undefined}
      />
    </>
  );
}
