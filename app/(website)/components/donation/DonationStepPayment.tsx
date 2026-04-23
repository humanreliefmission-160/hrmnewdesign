import React from 'react';
import YellowCTA from '../YellowCTA';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';
import { IoCardSharp, IoShieldCheckmark } from 'react-icons/io5';
import { BsBank2 } from 'react-icons/bs';
import { FaCcApplePay } from 'react-icons/fa';
import { GrPaypal } from 'react-icons/gr';
import { AiFillLock } from 'react-icons/ai';
import { IoIosCheckmarkCircle } from 'react-icons/io';

interface DonationStepPaymentProps {
  currentStep: number;
  donationState: DonationState;
  payMethod: string;
  setPayMethod: (method: string) => void;
  isProcessing: boolean;
  completeDonation: () => void;
  goStep: (step: number) => void;
}

export default function DonationStepPayment({
  currentStep,
  donationState,
  payMethod,
  setPayMethod,
  isProcessing,
  completeDonation,
  goStep
}: DonationStepPaymentProps) {
  if (currentStep !== 5) return null;

  const amt = donationState.amount || 0;
  const giftAidAmt = donationState.giftAid ? amt * 0.25 : 0;
  const total = amt + giftAidAmt;

  return (
    <div className="bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8 font-body leading-tight">Complete your donation</h2>

      <div className="bg-brand-lgrey/30 p-6 rounded-xl mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[0.85rem] font-bold text-brand-grey uppercase tracking-widest">Fund</span>
          <span className="font-bold text-brand-black">{donationState.fund}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[0.85rem] font-bold text-brand-grey uppercase tracking-widest">Type</span>
          <span className="font-bold text-brand-black">
            {donationState.type === "monthly" ? "Monthly" : "One-off"}
          </span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[0.85rem] font-bold text-brand-grey uppercase tracking-widest">Amount</span>
          <span className="font-bold text-brand-black">£{amt.toFixed(2)}</span>
        </div>
        {donationState.giftAid && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-[0.85rem] font-bold text-brand-grey uppercase tracking-widest">Gift Aid</span>
            <span className="font-bold text-purple">
              + £{giftAidAmt.toFixed(2)}
            </span>
          </div>
        )}
        <div className="border-t border-brand-lgrey pt-3 mt-3 flex justify-between items-center">
          <span className="font-bold text-lg text-brand-black">Total Value</span>
          <span className="font-bold text-2xl text-brand-black">£{total.toFixed(2)}</span>
        </div>
      </div>

      <h2 className="text-lg font-bold text-brand-black mb-4 font-body">Select payment method</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 items-center">
        {[
          {
            name: "Card",
            icon: <IoCardSharp fill='#650199' className='sm:w-7 w-7 h-auto' />
          },
          {
            name: "Direct Debit",
            icon: <BsBank2 fill='#650199' className='sm:w-7 w-7 h-auto' />
          },
          {
            name: "Apple Pay",
            icon: <FaCcApplePay fill='#650199' className='sm:w-7 w-7 h-auto' />
          },
          {
            name: "PayPal",
            icon: <GrPaypal fill='#650199' className='sm:w-7 w-7 h-auto' />
          },
        ].map((method) => (
          <div
            key={method.name}
            className={`p-3 rounded-sm border flex flex-col items-center gap-2 cursor-pointer transition-all font-bold text-[0.85rem] ${payMethod === method.name ? "border-purple bg-purple-faint text-purple scale-[1.02]" : "border-brand-lgrey bg-brand-white text-brand-black hover:border-purple/30"}`}
            onClick={() => setPayMethod(method.name)}
          >
            <span className="text-2xl">{method.icon}</span>
            {method.name}
          </div>
        ))}
      </div>

      {payMethod === "Card" && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="block text-sm font-bold text-brand-black">Card Number</label>
            <input
              className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white"
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-brand-black">Expiry Date</label>
              <input
                className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white"
                type="text"
                placeholder="MM / YY"
                maxLength={7}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-brand-black">CVV</label>
              <input
                className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white"
                type="text"
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>
        </div>
      )}

      <YellowCTA
        text={isProcessing ? "Processing..." : `Donate Now — £${amt.toFixed(2)}`}
        onClick={completeDonation}
        disabled={isProcessing}
        className="w-full justify-center text-lg py-4"
      />

      <div className="grid grid-cols-1 gap-3 mt-8 sm:grid-cols-2">
        <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey flex items-center justify-center gap-2">
          <AiFillLock fill='#6B6B6B' className='sm:w-3 w-3 h-auto' /> SSL Secure
        </div>
        <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey flex items-center justify-center gap-2">
          <IoShieldCheckmark fill='#6B6B6B' className='sm:w-3 w-3 h-auto' />
          Regulated Charity
        </div>
        <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey flex items-center justify-center gap-2">
          <BsBank2 fill='#6B6B6B' className='sm:w-3 w-3 h-auto' />
          Direct Debit Guarantee
        </div>
        <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey flex items-center justify-center gap-2">
          <IoIosCheckmarkCircle fill='#6B6B6B' className='sm:w-3 w-3 h-auto' />
          Gift Aid Registered
        </div>
      </div>

      <DonationStepFooter onBack={() => goStep(4)} />
    </div>
  );
}