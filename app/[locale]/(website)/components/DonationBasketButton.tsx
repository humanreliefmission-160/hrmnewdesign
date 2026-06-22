"use client";

import { useEffect, useRef, useState } from "react";
import { useBasket } from "../context/BasketContext";
import YellowCTA from "./YellowCTA";
import BasketItemCard from "./donation/BasketItemCard";

export default function DonationBasketButton() {
  const { items, removeItem, clearBasket, totalAmount, itemCount } = useBasket();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {itemCount > 0 && (
        <button
          id="donation-basket-trigger"
          aria-label={`Donation basket — ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
          onClick={() => setOpen(true)}
          className="relative flex items-center justify-center cursor-pointer focus:outline-none group"
        >
          <svg
            width="41"
            height="31"
            viewBox="0 0 41 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-200 group-hover:scale-110"
            aria-hidden
          >
            <path
              d="M41.0012 15.0613C41.0012 6.74314 34.3391 0 26.1207 0C25.2018 0 24.3025 0.0849138 23.4297 0.246241C30.3632 1.52836 35.6188 7.67331 35.6188 15.0613C35.6188 22.4494 30.3632 28.5943 23.4297 29.8764C24.3027 30.0377 25.2019 30.1226 26.1208 30.1226C34.339 30.1226 41.0012 23.3795 41.0012 15.0613Z"
              fill="#FED21C"
            />
            <path
              d="M30.9593 15.0612C30.9593 6.74306 24.0288 0 15.4794 0C6.93027 0 0 6.74306 0 15.0612C0 23.3795 6.93027 30.1226 15.4795 30.1226C24.0287 30.1226 30.9593 23.3796 30.9593 15.0612Z"
              fill="#FED21C"
            />
          </svg>

          <span
            id="basket-count-badge"
            className="absolute top-1.75 left-1.75 min-w-[18px] h-[18px] px-[4px] text-brand-black text-[12px] font-bold rounded-full flex items-center justify-center leading-none"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        </button>
      )}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-1100 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        ref={panelRef}
        id="donation-basket-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Donation basket"
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-1200 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-5 bg-purple">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-bold text-lg tracking-wide">
              Donation Basket
              {itemCount > 0 && (
                <span className="ml-2 text-sm font-normal text-brand-white">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            id="basket-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close basket"
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <svg width="56" height="42" viewBox="0 0 41 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                <path d="M41.0012 15.0613C41.0012 6.74314 34.3391 0 26.1207 0C25.2018 0 24.3025 0.0849138 23.4297 0.246241C30.3632 1.52836 35.6188 7.67331 35.6188 15.0613C35.6188 22.4494 30.3632 28.5943 23.4297 29.8764C24.3027 30.0377 25.2019 30.1226 26.1208 30.1226C34.339 30.1226 41.0012 23.3795 41.0012 15.0613Z" fill="#650199" />
                <path d="M30.9593 15.0612C30.9593 6.74306 24.0288 0 15.4794 0C6.93027 0 0 6.74306 0 15.0612C0 23.3795 6.93027 30.1226 15.4795 30.1226C24.0287 30.1226 30.9593 23.3796 30.9593 15.0612Z" fill="#650199" />
              </svg>
              <p className="text-brand-black font-semibold text-base">Your basket is empty</p>
              <p className="text-brand-black text-sm">Add donations from any project page.</p>
            </div>
          ) : (
            items.map((item) => (
              <BasketItemCard
                key={item.id}
                item={item}
                onRemove={removeItem}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 bg-white flex flex-col gap-3">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-brand-black uppercase tracking-wide">Total</span>
              <span className="text-2xl font-bold text-brand-black">
                £{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Actions */}
            <YellowCTA
              text="Proceed to Donate"
              href="/donate?step=3"
              onClick={() => setOpen(false)}
              className="w-full flex justify-center text-center"
            />

            <button
              id="basket-clear-btn"
              onClick={clearBasket}
              className="w-full text-xs font-semibold text-gray-400 hover:text-[#B60000] transition-colors py-1"
            >
              Clear basket
            </button>
          </div>
        )}
      </div>
    </>
  );
}
