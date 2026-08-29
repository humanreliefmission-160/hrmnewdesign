import { redirect } from "next/navigation";
import { isAuthenticated } from "../auth-actions";
import { getDonations } from "./actions";
import DonationsClient from "./DonationsClient";

export default async function DonationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Guard: redirect to login if not authenticated
  if (!(await isAuthenticated())) {
    redirect(`/${locale}/Agf8vPMDf7/login`);
  }

  const donations = await getDonations();
  return <DonationsClient donations={donations} />;
}