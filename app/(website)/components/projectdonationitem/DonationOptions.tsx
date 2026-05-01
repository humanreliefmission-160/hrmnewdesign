import React from "react";
import YellowCTA from "../YellowCTA";

export default function DonationOptions() {
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
              className="p-3 rounded-sm border font-bold text-center text-sm 
              border-brand-lgrey bg-brand-white text-brand-black 
              hover:bg-brand-lgrey/30 transition-all"
            >
              £{val}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <input
          type="number"
          placeholder="Enter custom amount (£)"
          className="w-full px-4 py-3 border-2 border-purple rounded-sm 
          focus:outline-none font-bold text-purple 
          placeholder:text-purple/50 bg-brand-white mb-5"
        />

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
              className="p-3 rounded-sm border text-sm font-bold text-center 
              border-brand-lgrey bg-brand-white text-brand-black 
              hover:bg-brand-lgrey/30 transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <YellowCTA
        text="Donate Now"
        href="/donate"
      />
    </div>

  );
}