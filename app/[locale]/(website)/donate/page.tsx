import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import {
  DONATION_PROJECTS_QUERY,
  type DonationPortalProject,
} from "../lib/sanity/donationProjects";
import DonateClient from "./DonateClient";

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; step?: string }>;
}) {
  const { project: initialProjectSlug, step: initialStep } = await searchParams;
  const projects = await sanityFetch<DonationPortalProject[]>(DONATION_PROJECTS_QUERY);

  const parsedStep = initialStep ? Number.parseInt(initialStep, 10) : undefined;

  return (
    <DonateClient
      projects={projects ?? []}
      initialProjectSlug={initialProjectSlug}
      initialStep={Number.isFinite(parsedStep) ? parsedStep : undefined}
    />
  );
}
