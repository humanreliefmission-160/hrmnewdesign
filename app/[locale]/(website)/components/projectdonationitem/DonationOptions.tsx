"use client";

import React, { useState } from "react";
import YellowCTA from "../YellowCTA";
import { FaInfoCircle } from "react-icons/fa";
import type { DonationItemData } from "../../types/donationItem";
import { useBasket } from "../../context/BasketContext";

const DEFAULT_AMOUNTS = [5, 10, 20, 50];

interface DonationOptionsProps {
  item: DonationItemData;
  projectName: string;
  projectSlug: string;
}

export default function DonationOptions({ item, projectName, projectSlug }: DonationOptionsProps) {
  const { addItem } = useBasket();

  const presetAmounts = item.amounts?.length
    ? item.amounts.map((a) => a.amount)
    : DEFAULT_AMOUNTS;

  const [amount, setAmount] = useState<number | null>(
    presetAmounts.length > 1 ? presetAmounts[1] : presetAmounts[0] ?? null
  );
  const [customAmount, setCustomAmount] = useState("");
  const [intention, setIntention] = useState("");

  const intentions = item.intentions?.length
    ? item.intentions.map((i) => i.title)
    : ["Zakat", "Sadaqah", "Lillah", "General"];

  const handleAddToBasket = () => {
    if (!isValid) return;
    addItem({
      projectName,
      projectSlug,
      projectItem: item.itemTitle,
      amount: amount!,
      intention,
      isZakat: intention.toLowerCase() === "zakat",
      frequency: "oneoff",
    });

    // Auto-open the basket panel
    setTimeout(() => {
      document.getElementById("donation-basket-trigger")?.click();
    }, 100);
  };


  const getImpactMessage = (amt: number | null) => {
    if (!amt) return null;
    const matched = item.amounts?.find((a) => a.amount === amt);
    if (matched?.label) return matched.label;
    const people = Math.floor(amt / 10);
    if (people >= 1) {
      return `£${amt} feeds ${people} person${people > 1 ? 's' : ''}.`;
    }
    return `£${amt} helps provide essential food support.`;
  };

  const handleAmountSelect = (val: string) => {
    setAmount(parseFloat(val));
    setCustomAmount("");
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setAmount(parseFloat(val) || 0);
  };

  const isValid = amount !== null && amount > 0 && intention !== "";

  return (
    <div className="">

      <div className="mb-4">
        {projectName && (
          <span className="inline-block bg-purple/10 text-purple text-xs font-semibold px-2.5 py-1 rounded-sm mb-2">
            {projectName}
          </span>
        )}
        <h2 className="text-3xl sm:text-6xl font-bold text-brand-black mb-2 font-body leading-tight">
          {item.itemTitle}
        </h2>
        {item.itemSubtext && (
          <p className="text-[0.95rem] text-brand-grey font-medium">
            {item.itemSubtext}
          </p>
        )}
      </div>

      <div className="flex">
        <div className="flex flex-row items-center gap-1 bg-purple-dark px-4 py-2 text-brand-white rounded-sm">
          {item.contactForPricing ? (
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Contact Us for Pricing
            </h2>
          ) : (
            <>
              <h2 className="text-xl font-bold">
                £{item.price}
              </h2>
              <span className="text-[10px] text-brand-white rounded-sm">per {item}</span>
              {/* <span className="text-[10px] text-brand-white rounded-sm">
                {(() => {
                  const freq = item.frequency;
                  if (Array.isArray(freq)) {
                    if (freq.length === 0) return "Monthly";
                    return freq.map(f => {
                      if (f === 'one-off') return 'One Off';
                      if (f === 'friday') return 'Friday Giving';
                      return f.charAt(0).toUpperCase() + f.slice(1);
                    }).join(', ');
                  }
                  const f = freq ?? item.donationType ?? 'monthly';
                  if (f === 'one-off') return 'One Off';
                  if (f === 'friday') return 'Friday Giving';
                  return f.charAt(0).toUpperCase() + f.slice(1);
                })()}
              </span> */}
            </>
          )}
        </div>
      </div>

      {item.info && (
        <p className="mt-4 text-sm text-brand-grey leading-relaxed">{item.info}</p>
      )}

      <div className="mt-10">
        <h3 className="text-lg font-bold text-brand-black mb-3">
          Choose an amount
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
          {presetAmounts.map((val) => (
            <button
              key={val}
              onClick={() => handleAmountSelect(String(val))}
              className={`px-4 py-2 rounded-sm text-sm font-bold border transition-all duration-200 ${amount === val && customAmount === ""
                ? "bg-purple text-white"
                : "bg-white/50 text-brand-black border-brand-lgrey hover:border-purple/50"
                }`}
            >
              £{val}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Enter custom amount (£)"
          value={customAmount}
          onChange={handleCustomAmount}
          className="w-full px-4 py-3 border-2 border-purple rounded-sm 
          focus:outline-none font-bold text-purple 
          placeholder:text-purple/50 bg-brand-white mb-2"
        />

        {amount && amount > 0 && (
          <div className="mb-5 bg-purple/5 border border-purple/20 p-3 rounded-sm flex items-center gap-2">
            <FaInfoCircle className="text-purple text-md" />
            <p className="text-purple font-medium text-sm">
              {getImpactMessage(amount)}
            </p>
          </div>
        )}

        {item.additionalFields && item.additionalFields.length > 0 && (
          <div className="my-10 space-y-4">
            {item.additionalFields.map((field) => (
              <div key={field.label}>
                <input
                  type="text"
                  placeholder={field.label}
                  className="w-full px-4 py-3 border border-brand-black/25 rounded-sm focus:outline-none font-bold bg-brand-white"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="my-10">
        <h3 className="text-lg font-bold text-brand-black mb-3">
          Select intention
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {intentions.map((label) => (
            <button
              key={label}
              onClick={() => setIntention(label)}
              className={`px-4 py-2 rounded-sm text-sm font-bold border transition-all duration-200 ${intention === label
                ? "bg-purple text-brand-white border-purple"
                : "bg-white/50 text-brand-black border-brand-lgrey hover:border-purple/50"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <YellowCTA
        text="Add to Donation Basket"
        onClick={handleAddToBasket}
        disabled={!isValid}
      />
    </div>
  );
}
