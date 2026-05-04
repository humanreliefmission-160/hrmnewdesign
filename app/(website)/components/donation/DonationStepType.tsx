"use client"

import { useState } from 'react';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';
import { BsCalendar2DayFill } from 'react-icons/bs';
import { FaClock } from 'react-icons/fa';
import { MdEventRepeat } from 'react-icons/md';

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
        Choose a one off donation or set up a recurring monthly gift.
      </p>
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
        <button
          className={`flex items-center justify-center gap-3 p-4 rounded-sm border-2 font-bold transition-all hover:border-purple-faint ${donationState.type === "oneoff" ? "border-purple bg-purple-faint text-purple" : "border-brand-lgrey bg-brand-white text-brand-grey"}`}
          onClick={() => setDonationType("oneoff")}
        >
          <FaClock size={20} />
          One Off
        </button>
        <button
          className={`flex items-center justify-center gap-3 p-4 rounded-sm border-2 font-bold transition-all hover:border-purple-faint ${donationState.type === "monthly" ? "border-purple bg-purple-faint text-purple" : "border-brand-lgrey bg-brand-white text-brand-grey"}`}
          onClick={() => setDonationType("monthly")}

        >
          <MdEventRepeat size={20} />
          Monthly
        </button>
      </div>
      {donationState.type === "monthly" && (
        <div className="bg-purple-faint border border-purple/20 rounded-sm p-4 mb-6 text-sm text-purple font-medium">
          Monthly donors provide 3× more impact through consistent, predictable funding. You can cancel anytime.
        </div>
      )}
      <div className="bg-brand-white border-2 border-brand-lgrey rounded-sm p-6 mb-8">
        <div className="flex items-center gap-5 sm:flex-row flex-col">
          <BsCalendar2DayFill fill='#650199' className='sm:w-25 w-20 h-auto' />
          <div>
            <div className="font-bold mb-1 text-brand-black leading-tight">
              Schedule your Friday Giving
            </div>
            <p className="text-[0.875rem] text-brand-grey font-medium leading-relaxed">
              Set up automatic donations on Fridays — the blessed day — for maximum spiritual reward.
            </p>
          </div>
          <button className="sm:inline-flex items-center gap-2 font-bold text-sm cursor-pointer transition-all duration-200 no-underline px-4 py-2 text-purple hover:text-purple-dark rounded-lg whitespace-nowrap hover:decoration-1 hover:underline">
            Set Up →
          </button>
        </div>
      </div>
      <DonationStepFooter onNext={() => goStep(2)} />
    </div>
  );
}
