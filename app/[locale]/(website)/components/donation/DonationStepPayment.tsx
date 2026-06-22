"use client";

import React, { useEffect, useMemo } from 'react';
import YellowCTA from '../YellowCTA';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';
import BasketItemCard from './BasketItemCard';
import { useBasket } from '../../context/BasketContext';
import { IoCardSharp, IoShieldCheckmark } from 'react-icons/io5';
import { BsBank2 } from 'react-icons/bs';
import { FaCcApplePay, FaGooglePay } from 'react-icons/fa';
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

const PAYMENT_METHODS = [
  { name: "Card", icon: <IoCardSharp fill="#650199" className="sm:w-7 w-7 h-auto" /> },
  { name: "Direct Debit", icon: <BsBank2 fill="#650199" className="sm:w-7 w-7 h-auto" /> },
  { name: "Apple Pay", icon: <FaCcApplePay fill="#650199" className="sm:w-7 w-7 h-auto" /> },
  { name: "Google Pay", icon: <FaGooglePay fill="#650199" className="sm:w-9 w-9 h-auto" /> },
  { name: "PayPal", icon: <GrPaypal fill="#650199" className="sm:w-7 w-7 h-auto" /> },
] as const;

export default function DonationStepPayment({
  currentStep,
  donationState,
  payMethod,
  setPayMethod,
  isProcessing,
  completeDonation,
  goStep,
}: DonationStepPaymentProps) {
  const { items, totalAmount: basketTotal, itemCount } = useBasket();

  const isOneOff = donationState.type === "oneoff";

  const availablePaymentMethods = useMemo(
    () =>
      PAYMENT_METHODS.filter(
        (method) => !isOneOff || method.name !== "Direct Debit"
      ),
    [isOneOff]
  );

  const [cardNumber, setCardNumber] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  useEffect(() => {
    if (isOneOff && payMethod === "Direct Debit") {
      setPayMethod("Card");
    }
  }, [isOneOff, payMethod, setPayMethod]);

  if (currentStep !== 5) return null;

  const donatedTotal =
    itemCount > 0 ? basketTotal : donationState.amount || 0;
  const giftAidAmt = donationState.giftAid ? donatedTotal * 0.25 : 0;
  const totalDonationValue = donatedTotal + giftAidAmt;
  const amountToPay = donatedTotal;

  const formatMoney = (value: number) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const isCardValid = payMethod === "Card"
    ? cardNumber.replace(/\s/g, "").length >= 16 && expiryDate.trim().length >= 5 && cvv.trim().length === 3
    : true;

  const isSubmitDisabled = isProcessing || !isCardValid;

  return (
    <div className="bg-brand-white/50 p-8 md:p-10 rounded-sm shadow-card border border-brand-lgrey">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8 font-body leading-tight">
        Complete your donation
      </h2>

      <div className="mb-8 flex flex-col gap-3">
        {itemCount > 0 ? (
          items.map((item) => <BasketItemCard key={item.id} item={item} />)
        ) : (
          <div className="bg-brand-lgrey/75 border border-brand-lgrey rounded-sm p-4 text-sm text-brand-grey">
            <p>
              <span className="font-bold text-brand-black">Type:</span>{" "}
              {donationState.type === "monthly" ? "Monthly" : "One-off"}
            </p>
            {donationState.projectName && (
              <p className="mt-2">
                <span className="font-bold text-brand-black">Project:</span>{" "}
                {donationState.projectName}
              </p>
            )}
            {donationState.donationItemTitle && (
              <p className="mt-1">
                <span className="font-bold text-brand-black">Item:</span>{" "}
                {donationState.donationItemTitle}
              </p>
            )}
            {donationState.intention && (
              <p className="mt-1">
                <span className="font-bold text-brand-black">Intention:</span>{" "}
                {donationState.intention || "Sadaqah"}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="bg-brand-lgrey/75 p-6 rounded-sm mb-8 space-y-3">
        <div className="flex justify-between items-center gap-4">
          <span className="text-sm font-bold text-brand-black">Total</span>
          <span className="font-bold text-brand-black">£{formatMoney(donatedTotal)}</span>
        </div>

        {donationState.giftAid && (
          <div className="flex justify-between items-center gap-4">
            <div>
              <span className="text-sm font-bold text-brand-black block">Gift Aid</span>
              <p className="text-xs italic text-purple mt-1">
                Total donation value £{formatMoney(totalDonationValue)}
              </p>
            </div>
            <span className="font-bold text-purple shrink-0">
              + £{formatMoney(giftAidAmt)}
            </span>
          </div>
        )}

        <hr className='text-brand-grey/50 mt-5' />

        <div className="border-t border-brand-lgrey pt-3 flex justify-between items-end">
          <span className="font-bold text-lg text-brand-black">Total  to donate</span>
          <span className="font-bold text-2xl text-brand-black">
            £{formatMoney(amountToPay)}
          </span>
        </div>
      </div>

      <h2 className="text-lg font-bold text-brand-black mb-4 font-body">Select payment method</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 items-center">
        {availablePaymentMethods.map((method) => (
          <div
            key={method.name}
            role="button"
            tabIndex={0}
            className={`p-3 rounded-sm border flex flex-col items-center gap-2 cursor-pointer transition-all font-bold text-[0.85rem] ${payMethod === method.name ? "border-purple bg-purple-faint text-purple scale-[1.02]" : "border-brand-lgrey bg-brand-white text-brand-black hover:border-purple/30"}`}
            onClick={() => setPayMethod(method.name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setPayMethod(method.name);
            }}
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
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
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
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-brand-black">CVV</label>
              <input
                className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium bg-brand-white"
                type="text"
                placeholder="123"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <YellowCTA
        text={isProcessing ? "Processing..." : `Donate Now — £${formatMoney(amountToPay)}`}
        onClick={completeDonation}
        disabled={isSubmitDisabled}
        className="w-full justify-center text-lg py-4"
      />

      <div className="grid grid-cols-1 gap-3 mt-8 sm:grid-cols-2">
        <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey flex items-center justify-center gap-2">
          <AiFillLock fill="#6B6B6B" className="sm:w-3 w-3 h-auto" /> SSL Secure
        </div>
        <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey flex items-center justify-center gap-2">
          <IoShieldCheckmark fill="#6B6B6B" className="sm:w-3 w-3 h-auto" />
          Regulated Charity
        </div>
        {!isOneOff && (
          <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey flex items-center justify-center gap-2">
            <BsBank2 fill="#6B6B6B" className="sm:w-3 w-3 h-auto" />
            Direct Debit Guarantee
          </div>
        )}
        <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey flex items-center justify-center gap-2">
          <IoIosCheckmarkCircle fill="#6B6B6B" className="sm:w-3 w-3 h-auto" />
          Gift Aid Registered
        </div>
      </div>

      <DonationStepFooter onBack={() => goStep(4)} />
    </div>
  );
}
