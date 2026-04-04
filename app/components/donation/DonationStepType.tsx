import React from 'react';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';

interface DonationStepTypeProps {
  currentStep: number;
  donationState: DonationState;
  setDonationType: (type: string) => void;
  goStep: (step: number) => void;
}

export default function DonationStepType({ currentStep, donationState, setDonationType, goStep }: DonationStepTypeProps) {
  if (currentStep !== 1) return null;

  return (
    <div className="bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">How would you like to give?</h2>
      <p className="text-[0.95rem] text-brand-grey mb-8 font-medium">
        Choose a one-off donation or set up a recurring monthly gift.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          className={`flex items-center justify-center gap-3 p-4 rounded-sm border-2 font-bold transition-all hover:border-purple-faint ${donationState.type === "oneoff" ? "border-purple bg-purple-faint text-purple" : "border-brand-lgrey bg-brand-white text-brand-grey"}`}
          onClick={() => setDonationType("oneoff")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          One Off
        </button>
        <button
          className={`flex items-center justify-center gap-3 p-4 rounded-sm border-2 font-bold transition-all hover:border-purple-faint ${donationState.type === "monthly" ? "border-purple bg-purple-faint text-purple" : "border-brand-lgrey bg-brand-white text-brand-grey"}`}
          onClick={() => setDonationType("monthly")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Monthly
        </button>
      </div>
      {donationState.type === "monthly" && (
        <div className="bg-purple-faint border border-purple/20 rounded-lg p-4 mb-6 text-sm text-purple font-medium">
          💜 Monthly donors provide 3× more impact through consistent,
          predictable funding. You can cancel anytime.
        </div>
      )}
      <div className="bg-brand-white border-2 border-brand-lgrey rounded-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="text-3xl shrink-0">🕌</div>
          <div>
            <div className="font-bold mb-1 text-brand-black leading-tight">
              Schedule your Friday Giving
            </div>
            <p className="text-[0.875rem] text-brand-grey font-medium leading-relaxed">
              Set up automatic donations on Fridays — the blessed day — for
              maximum spiritual reward.
            </p>
          </div>
          <button className="hidden sm:inline-flex items-center gap-2 font-bold text-sm cursor-pointer transition-all duration-200 no-underline px-4 py-2 text-purple hover:text-purple-dark rounded-lg ml-auto whitespace-nowrap hover:decoration-1 hover:underline">
            Set Up →
          </button>
        </div>
      </div>
      <DonationStepFooter onNext={() => goStep(2)} />
    </div>
  );
}
