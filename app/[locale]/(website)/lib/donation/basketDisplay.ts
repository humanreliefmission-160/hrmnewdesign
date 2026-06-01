import type { BasketItem } from "../../context/BasketContext";

/** Hero/header gifts use an empty `projectItem`. */
export function isHeroBasketItem(item: BasketItem): boolean {
  return !item.projectItem;
}

/** Primary line in basket UI — hero: "Project - Sadaqah|Zakat". */
export function getBasketLineTitle(item: BasketItem): string {
  if (isHeroBasketItem(item)) {
    const intentionLabel = item.isZakat ? "Zakat" : "Sadaqah";
    return `${item.projectName} - ${intentionLabel}`;
  }
  return item.projectName;
}

/** Secondary line (donation item title); hidden for hero gifts. */
export function getBasketLineSubtitle(item: BasketItem): string | null {
  if (isHeroBasketItem(item)) return null;
  return item.projectItem;
}

export function shouldShowIntentionBadge(item: BasketItem): boolean {
  return !isHeroBasketItem(item);
}
