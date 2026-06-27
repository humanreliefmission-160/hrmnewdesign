"use client"

import { useState } from 'react';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';
import DonationBasketTotal from './DonationBasketTotal';
import { BsCalendar2DayFill } from 'react-icons/bs';
import { FaClock, FaCalendarDay, FaCalendarWeek } from 'react-icons/fa';
import { MdEventRepeat } from 'react-icons/md';
import { useBasket } from '../../context/BasketContext';

interface DonationStepTypeProps {
  currentStep: number;
  donationState: DonationState;
  setDonationType: (type: string) => void;
  goStep: (step: number) => void;
}

export default function DonationStepType({ currentStep, donationState, setDonationType, goStep }: DonationStepTypeProps) {
  const { items } = useBasket();
  const hasItems = items.length > 0;

  if (currentStep !== 1) return null;

  const getFrequencyLabel = (type: string) => {
    if (type === "oneoff") return "One Off";
    if (type === "friday") return "Friday Giving";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey">
      <DonationBasketTotal />
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">How would you like to give?</h2>
      <p className="text-[0.95rem] text-brand-grey mb-8 font-medium">
        Choose a one off donation or set up recurring payments (daily, weekly, monthly, or Friday giving).
      </p>

      {hasItems && (
        <div className="bg-[#B60000]/10 border border-[#B60000]/50 text-[#B60000] rounded-sm p-4 mb-6 text-sm font-medium text-center animate-in fade-in duration-300">
          Your donation basket contains items with a '{getFrequencyLabel(donationState.type)}' frequency.
          To change this, please empty your basket.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
        <button
          className={`flex items-center justify-center gap-3 p-4 rounded-sm border-2 font-bold transition-all hover:border-purple-faint ${donationState.type === "oneoff" ? "border-purple bg-purple-faint text-purple" : "border-brand-lgrey bg-brand-white text-brand-grey"} ${hasItems && donationState.type !== "oneoff" ? "opacity-50 cursor-not-allowed hover:border-brand-lgrey" : ""}`}
          onClick={() => setDonationType("oneoff")}
          disabled={hasItems && donationState.type !== "oneoff"}
        >
          <FaClock size={20} />
          One Off
        </button>
        <button
          className={`flex items-center justify-center gap-3 p-4 rounded-sm border-2 font-bold transition-all hover:border-purple-faint ${donationState.type === "daily" ? "border-purple bg-purple-faint text-purple" : "border-brand-lgrey bg-brand-white text-brand-grey"} ${hasItems && donationState.type !== "daily" ? "opacity-50 cursor-not-allowed hover:border-brand-lgrey" : ""}`}
          onClick={() => setDonationType("daily")}
          disabled={hasItems && donationState.type !== "daily"}
        >
          <FaCalendarDay size={20} />
          Daily
        </button>
        <button
          className={`flex items-center justify-center gap-3 p-4 rounded-sm border-2 font-bold transition-all hover:border-purple-faint ${donationState.type === "weekly" ? "border-purple bg-purple-faint text-purple" : "border-brand-lgrey bg-brand-white text-brand-grey"} ${hasItems && donationState.type !== "weekly" ? "opacity-50 cursor-not-allowed hover:border-brand-lgrey" : ""}`}
          onClick={() => setDonationType("weekly")}
          disabled={hasItems && donationState.type !== "weekly"}
        >
          <FaCalendarWeek size={20} />
          Weekly
        </button>
        <button
          className={`flex items-center justify-center gap-3 p-4 rounded-sm border-2 font-bold transition-all hover:border-purple-faint ${donationState.type === "monthly" ? "border-purple bg-purple-faint text-purple" : "border-brand-lgrey bg-brand-white text-brand-grey"} ${hasItems && donationState.type !== "monthly" ? "opacity-50 cursor-not-allowed hover:border-brand-lgrey" : ""}`}
          onClick={() => setDonationType("monthly")}
          disabled={hasItems && donationState.type !== "monthly"}
        >
          <MdEventRepeat size={20} />
          Monthly
        </button>
      </div>

      {donationState.type === "daily" && (
        <div className="bg-purple-faint border border-purple/20 rounded-sm p-4 mb-6 text-sm text-purple font-medium animate-in fade-in duration-300">
          Daily donors provide continuous, steady support to help those in need every day. You can cancel anytime.
        </div>
      )}
      {donationState.type === "weekly" && (
        <div className="bg-purple-faint border border-purple/20 rounded-sm p-4 mb-6 text-sm text-purple font-medium animate-in fade-in duration-300">
          Weekly donors sustain our projects week by week, ensuring stable resources. You can cancel anytime.
        </div>
      )}
      {donationState.type === "monthly" && (
        <div className="bg-purple-faint border border-purple/20 rounded-sm p-4 mb-6 text-sm text-purple font-medium animate-in fade-in duration-300">
          Monthly donors provide 3× more impact through consistent, predictable funding. You can cancel anytime.
        </div>
      )}
      {donationState.type === "friday" && (
        <div className="bg-purple-faint border border-purple/20 rounded-sm p-4 mb-6 text-sm text-purple font-medium animate-in fade-in duration-300">
          Friday giving donors schedule their automatic donations on the blessed day of Friday for maximum reward. You can cancel anytime.
        </div>
      )}

      <div className={`bg-brand-white border-2 border-brand-lgrey rounded-sm p-6 mb-8 transition-opacity ${hasItems && donationState.type !== 'friday' ? 'opacity-60' : ''}`}>
        <div className="flex items-center gap-5 sm:flex-row flex-col">
          <BsCalendar2DayFill fill={hasItems && donationState.type !== 'friday' ? '#999' : '#650199'} className='sm:w-25 w-20 h-auto' />
          <div>
            <div className="font-bold mb-1 text-brand-black leading-tight">
              Schedule your Friday Giving
            </div>
            <p className="text-[0.875rem] text-brand-grey font-medium leading-relaxed">
              Set up automatic donations on Fridays — the blessed day — for maximum spiritual reward.
            </p>
          </div>
          <button
            onClick={() => {
              setDonationType("friday");
              goStep(2);
            }}
            disabled={hasItems && donationState.type !== 'friday'}
            className="sm:inline-flex items-center gap-2 font-bold text-sm cursor-pointer transition-all duration-200 no-underline px-4 py-2 text-purple hover:text-purple-dark rounded-lg whitespace-nowrap hover:decoration-1 hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Set Up →
          </button>
        </div>
      </div>
      <DonationBasketTotal />
      <DonationStepFooter onNext={() => goStep(2)} />
    </div>
  );
}