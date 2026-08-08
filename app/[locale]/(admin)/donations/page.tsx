import { getDonations } from "./actions";
import DonationsClient from "./DonationsClient";

export default async function DonationsPage() {
  const donations = await getDonations();
  return <DonationsClient donations={donations} />;
}