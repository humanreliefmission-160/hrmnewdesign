import type { BasketItem } from "../../context/BasketContext";
import type { DonationState } from "../../components/donation/types";
import type { DonationPortalProject } from "../sanity/donationProjects";

/** Maps basket line items into donate-flow state (uses basket total as amount). */
export function buildDonationStateFromBasket(
  items: BasketItem[],
  projects: DonationPortalProject[],
  prev: DonationState
): DonationState {
  if (items.length === 0) return prev;

  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const primary = items[0];
  const project = projects.find(
    (p) =>
      (primary.projectSlug && p.slug === primary.projectSlug) ||
      p.name === primary.projectName
  );

  return {
    ...prev,
    type: primary.frequency ?? "oneoff",
    amount: total,
    projectId: project?._id ?? prev.projectId,
    projectName: primary.projectName,
    projectSlug: primary.projectSlug ?? project?.slug ?? prev.projectSlug,
    fund: primary.projectName,
    donationItemKey: primary.donationItemKey ?? "",
    donationItemTitle: primary.projectItem ?? "",
    label: primary.projectItem || primary.projectName,
    intention: primary.intention,
  };
}
