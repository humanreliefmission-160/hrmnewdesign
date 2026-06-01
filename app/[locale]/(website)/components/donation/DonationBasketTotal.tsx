"use client";

import Link from "next/link";
import { useBasket } from "../../context/BasketContext";
import DonationBasketButton from "../DonationBasketButton";

export default function DonationBasketTotal() {
  const { totalAmount, itemCount } = useBasket();

  if (itemCount === 0) return null;

  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-sm border border-purple/20 bg-purple-faint px-4 py-3">
      <span className="text-sm font-semibold text-brand-black">
        Basket total ({itemCount} {itemCount === 1 ? "item" : "items"})
      </span>
      <span className="text-lg font-bold text-purple">
        {/* <Link> */}
          £
          {totalAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        {/* </Link> */}
      </span>
    </div>
  );
}
