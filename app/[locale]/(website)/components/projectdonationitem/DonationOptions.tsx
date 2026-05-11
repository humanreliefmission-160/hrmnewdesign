"use client";

import React, { useState } from "react";
import YellowCTA from "../YellowCTA";
import { FaInfoCircle } from "react-icons/fa";

export default function DonationOptions() {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [intention, setIntention] = useState("");

  const getImpactMessage = (amt: number | null) => {
    if (!amt) return null;
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

      {/* Title */}
      <div className="mb-4">
        <h2 className="text-3xl sm:text-6xl font-bold text-brand-black mb-2 font-body leading-tight">
          Support this project
        </h2>
        <p className="text-[0.95rem] text-brand-grey font-medium">
          Your donation will directly support this cause.
        </p>
      </div>

      <div className="flex">
        <div className="flex flex-row items-end gap-1 bg-purple-dark px-4 py-2 text-brand-white rounded-sm">
          <h2 className="text-xl font-bold">
            £20
          </h2>
          <span className="text-[10px] text-brand-white rounded-sm">
            One Off
          </span>
        </div>
      </div>

      {/* Amount Selection */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-brand-black mb-3">
          Choose an amount
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
          {["5", "10", "20", "50"].map((val) => (
            <button
              key={val}
              onClick={() => handleAmountSelect(val)}
              className={`px-4 py-2 rounded-sm text-sm font-bold border transition-all duration-200 ${amount === parseFloat(val) && customAmount === ""
                ? "bg-purple text-white"
                : "bg-white/50 text-brand-black border-brand-lgrey hover:border-purple/50"
                }`}

            >
              £{val}
            </button>
          ))}
        </div>

        {/* Custom amount */}
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

        <div className="my-10">
          {/* Additional Options */}
          <input
            type="String"
            placeholder="Enter plaque name (optional)"
            className="w-full px-4 py-3 border border-brand-black/25 rounded-sm focus:outline-none font-bold bg-brand-white"
          />
          <p className="mt-1 text-xs italic text-brand-grey leading-relaxed">Can be for any project. Dynamic for any project</p>
        </div>
      </div>

      {/* Intention */}
      <div className="my-10">
        <h3 className="text-lg font-bold text-brand-black mb-3">
          Select intention
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Zakat", "Sadaqah", "Lillah", "General"].map((item) => (
            <button
              key={item}
              onClick={() => setIntention(item)}
              className={`px-4 py-2 rounded-sm text-sm font-bold border transition-all duration-200 ${intention === item
                ? "bg-purple text-brand-white border-purple"
                : "bg-white/50 text-brand-black border-brand-lgrey hover:border-purple/50"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <YellowCTA
        text="Add to Donation Basket"
        href={isValid ? "/donate" : undefined}
        disabled={!isValid}
      />
    </div>

  );
}