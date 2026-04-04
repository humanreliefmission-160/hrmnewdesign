import React from 'react';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';

interface DonationStepFundAmountProps {
  currentStep: number;
  donationState: DonationState;
  customAmount: string;
  selectFund: (fund: string) => void;
  selectAmount: (val: string) => void;
  handleCustomAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  goStep: (step: number) => void;
}

export default function DonationStepFundAmount({
  currentStep,
  donationState,
  customAmount,
  selectFund,
  selectAmount,
  handleCustomAmount,
  goStep
}: DonationStepFundAmountProps) {
  if (currentStep !== 2) return null;

  return (
    <div className="bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">Select your fund(s)</h2>
      <p className="text-[0.95rem] text-brand-grey mb-8 font-medium">
        Where would you like your donation to go?
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {[
          "Sadaqah",
          "Zakat",
          "Where Most Needed",
          "Fidyah",
          "Kaffarah",
          "Lebanon Emergency Appeal",
          "Palestine Emergency Appeal",
          "Sadaqah Jariyah",
          "Water For Life",
          "Orphans & Children",
          "UK Zakat Fund",
          "Bags For Students",
        ].map((fundObj) => (
          <button
            key={fundObj}
            className={`p-3 rounded-sm border text-[0.8rem] font-bold transition-all text-center leading-tight ${donationState.fund === fundObj
              ? "bg-purple text-brand-white border-purple"
              : "border-brand-lgrey bg-brand-white text-brand-black hover:bg-brand-lgrey/30"
              }`}
            onClick={() => selectFund(fundObj)}
          >
            {fundObj}
          </button>
        ))}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8 font-body leading-tight">
        Select amount
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
        {["5", "10", "20", "50", "100", "other"].map((val) => (
          <button
            key={val}
            className={`p-3 rounded-sm border font-bold transition-all text-center ${(val !== "other" && donationState.amount === parseFloat(val)) ||
              (val === "other" && donationState.amount === null && customAmount !== "")
              ? "bg-purple text-brand-white border-purple"
              : "border-brand-lgrey bg-brand-white text-brand-black hover:bg-brand-lgrey/30"
              }`}
            onClick={() => selectAmount(val)}
          >
            {val === "other" ? "Other" : `£${val}`}
          </button>
        ))}
      </div>
      {(donationState.amount === null || customAmount !== "") && (
        <input
          className="w-full px-4 py-3 border-2 border-purple rounded-sm focus:outline-none text-lg font-bold text-purple mb-8 placeholder:text-purple/50 bg-brand-white"
          type="number"
          id="customAmount"
          placeholder="Enter custom amount (£)"
          value={customAmount}
          onChange={handleCustomAmount}
        />
      )}

      <DonationStepFooter onBack={() => goStep(1)} onNext={() => goStep(3)} />
    </div>
  );
}
