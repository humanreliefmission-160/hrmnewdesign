import { createServerClient } from "@/app/[locale]/lib/supabase/server";

export type DonationRow = {
  id: string;
  reference: string;
  amount: number;
  donationType: string;
  frequency: string;
  intention: string | null;
  giftAid: boolean;
  createdAt: string;
  // Donor
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string | null;
  // Address (primary)
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  postcode: string | null;
  country: string;
  // Project
  projectName: string | null;
  projectItemTitle: string | null;
  // Payment
  paymentMethod: string | null;
};

export async function getDonations(): Promise<DonationRow[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("donation")
    .select(`
      id,
      reference,
      amount_intended_gbp,
      donation_type,
      intention,
      gift_aid,
      created_at,
      donor:donor_id (
        first_name,
        last_name,
        email,
        phone,
        donor_address (
          line_1,
          line_2,
          city,
          postcode,
          country,
          is_primary
        )
      ),
      project_item:project_item_id (
        title,
        project:project_id (
          name
        )
      ),
      payment ( payment_method, frequency )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getDonations error:", error);
    return [];
  }

  return (data ?? []).map((d) => {
    const donor = Array.isArray(d.donor) ? d.donor[0] : d.donor;
    const addresses = donor?.donor_address ?? [];
    // Prefer the primary address, fall back to the first one
    const address =
      (Array.isArray(addresses)
        ? addresses.find((a: { is_primary: boolean }) => a.is_primary) ?? addresses[0]
        : addresses) ?? null;

    const projectItem = Array.isArray(d.project_item) ? d.project_item[0] : d.project_item;
    const project = projectItem
      ? Array.isArray(projectItem.project)
        ? projectItem.project[0]
        : projectItem.project
      : null;

    const payments = Array.isArray(d.payment) ? d.payment : d.payment ? [d.payment] : [];
    const payment = payments[0] ?? null;

    return {
      id: d.id,
      reference: d.reference,
      amount: d.amount_intended_gbp,
      donationType: d.donation_type,
      frequency: payment?.frequency ?? d.donation_type ?? "",
      intention: d.intention,
      giftAid: d.gift_aid,
      createdAt: d.created_at,
      firstName: donor?.first_name ?? "",
      lastName: donor?.last_name ?? "",
      name: `${donor?.first_name ?? ""} ${donor?.last_name ?? ""}`.trim(),
      email: donor?.email ?? "",
      phone: donor?.phone ?? null,
      addressLine1: address?.line_1 ?? "",
      addressLine2: address?.line_2 ?? null,
      city: address?.city ?? "",
      postcode: address?.postcode ?? null,
      country: address?.country ?? "",
      projectName: project?.name ?? null,
      projectItemTitle: projectItem?.title ?? null,
      paymentMethod: payment?.payment_method ?? null,
    };
  });
}
