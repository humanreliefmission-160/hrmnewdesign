import React from 'react';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';

interface DonationStepDetailsProps {
  currentStep: number;
  donationState: DonationState;
  goStep: (step: number) => void;
}

export default function DonationStepDetails({ currentStep, donationState, goStep }: DonationStepDetailsProps) {
  if (currentStep !== 4) return null;

  return (
    <div className="bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">Your details</h2>
      <p className="text-[0.95rem] text-brand-grey mb-8 font-medium">
        So we can send your donation receipt and keep you updated on the
        impact of your gift.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col gap-1.5">
          <label className="block text-sm font-bold text-brand-black">First Name *</label>
          <input className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white" type="text" placeholder="John" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="block text-sm font-bold text-brand-black">Last Name *</label>
          <input className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white" type="text" placeholder="Smith" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 mb-4">
        <label className="block text-sm font-bold text-brand-black">Email Address *</label>
        <input
          className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white"
          type="email"
          placeholder="john@example.com"
        />
      </div>
      <div className="flex flex-col gap-1.5 mb-6">
        <label className="block text-sm font-bold text-brand-black">Phone Number</label>
        <input
          className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white"
          type="tel"
          placeholder="+44 7700 000000"
        />
      </div>
      {donationState.giftAid && (
        <div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="block text-sm font-bold text-brand-black">
              Address (required for Gift Aid) *
            </label>
            <input
              className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white"
              type="text"
              placeholder="123 Example Street"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-brand-black">City *</label>
              <input className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white" type="text" placeholder="Leeds" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-brand-black">Postcode *</label>
              <input
                className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white"
                type="text"
                placeholder="LS1 2AB"
              />
            </div>
          </div>
        </div>
      )}
      <div className="p-4 bg-white border border-brand-lgrey rounded-lg mb-8 flex gap-3 items-start">
        <input
          type="checkbox"
          className="mt-1 w-4 h-4 cursor-pointer accent-purple"
          id="optIn"
        />
        <label
          htmlFor="optIn"
          className="text-[0.875rem] text-brand-grey cursor-pointer font-medium leading-relaxed"
        >
          {"I'd like to receive updates about Human Relief Mission's work and how my donation is making a difference."}
        </label>
      </div>

      <DonationStepFooter onBack={() => goStep(3)} onNext={() => goStep(5)} />
    </div>
  );
}
