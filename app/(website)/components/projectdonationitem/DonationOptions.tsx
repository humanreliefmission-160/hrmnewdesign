"use client";

import React, { useState } from "react";
import YellowCTA from "../YellowCTA";

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
    <div className="p-8 md:p-10">

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">
          Support this project
        </h2>
        <p className="text-[0.95rem] text-brand-grey font-medium">
          Your donation will directly support this cause.
        </p>
      </div>

      {/* Amount Selection */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-brand-black mb-3">
          Choose an amount
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
          {["5", "10", "20", "50"].map((val) => (
            <button
              key={val}
              onClick={() => handleAmountSelect(val)}
              className={`p-3 rounded-sm border font-bold text-center text-sm transition-all ${
                amount === parseFloat(val) && customAmount === ""
                  ? "bg-purple text-brand-white border-purple"
                  : "border-brand-lgrey bg-brand-white text-brand-black hover:bg-brand-lgrey/30"
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
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            <p className="text-purple font-medium text-sm">
              {getImpactMessage(amount)}
            </p>
          </div>
        )}

        <div>
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
      <div className="mb-10">
        <h3 className="text-lg font-bold text-brand-black mb-3">
          Select intention
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Zakat", "Sadaqah", "Lillah", "General"].map((item) => (
            <button
              key={item}
              onClick={() => setIntention(item)}
              className={`p-3 rounded-sm border text-sm font-bold text-center transition-all ${
                intention === item
                  ? "bg-purple text-brand-white border-purple"
                  : "border-brand-lgrey bg-brand-white text-brand-black hover:bg-brand-lgrey/30"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <YellowCTA
        text="Donate Now"
        href={isValid ? "/donate" : undefined}
        disabled={!isValid}
      />
    </div>

  );
}