"use client";

import React, { useEffect, useMemo, useState } from 'react';
import YellowCTA from '../YellowCTA';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';
import BasketItemCard from './BasketItemCard';
import { useBasket } from '../../context/BasketContext';
import { IoCardSharp, IoShieldCheckmark } from 'react-icons/io5';
import { GrPaypal } from 'react-icons/gr';
import { AiFillLock } from 'react-icons/ai';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import getStripe from '@/app/api/stripe/stripejs';

interface DonationStepPaymentProps {
  currentStep: number;
  donationState: DonationState;
  payMethod: string;
  setPayMethod: (method: string) => void;
  isProcessing: boolean;
  completeDonation: (reference: string, success: boolean) => void;
  goStep: (step: number) => void;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  country: string;
}

const PAYMENT_METHODS = [
  { name: "Card", icon: <IoCardSharp fill="#650199" className="sm:w-7 w-7 h-auto" /> },
  { name: "PayPal", icon: <GrPaypal fill="#650199" className="sm:w-7 w-7 h-auto" /> },
] as const;

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      color: '#1A1A1A',
      fontFamily: 'Outfit, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#9CA3AF',
      },
    },
    invalid: {
      color: '#B60000',
      iconColor: '#B60000',
    },
  },
};

function DonationStepPaymentForm({
  currentStep,
  donationState,
  payMethod,
  setPayMethod,
  isProcessing,
  completeDonation,
  goStep,
  firstName,
  lastName,
  email,
  address,
  city,
  postcode,
  phone,
  country,
}: DonationStepPaymentProps) {
  const { items, totalAmount: basketTotal, itemCount } = useBasket();
  const stripe = useStripe();
  const elements = useElements();

  const [localProcessing, setLocalProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCardComplete, setIsCardComplete] = useState(false);

  const donatedTotal = itemCount > 0 ? basketTotal : donationState.amount || 0;
  const giftAidAmt = donationState.giftAid ? donatedTotal * 0.25 : 0;
  const totalDonationValue = donatedTotal + giftAidAmt;
  const amountToPay = donatedTotal;

  const formatMoney = (value: number) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const isSubmitDisabled =
    isProcessing ||
    localProcessing ||
    (payMethod === "Card" && (!stripe || !elements || !isCardComplete));

  const handlePayment = async () => {
    // Generate donation reference up front
    const donationReference = `DON-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (payMethod !== "Card") {
      // Simulate non-card payment (e.g. PayPal)
      setLocalProcessing(true);
      setTimeout(() => {
        setLocalProcessing(false);
        completeDonation(donationReference, true);
      }, 1500);
      return;
    }

    if (!stripe || !elements) return;

    setLocalProcessing(true);
    setErrorMessage(null);

    // Build snake_case metadata summary of projects donated to
    const projectSummary = itemCount > 0
      ? items.map(item => `${item.projectName} (${item.projectItem || 'Donation'}) - £${item.amount}`).join(', ')
      : `${donationState.projectName || 'General'} (${donationState.donationItemTitle || 'Donation'}) - £${donationState.amount || 0}`;

    const metadata = {
      donation_reference: donationReference,
      donor_name: `${firstName} ${lastName}`,
      email: email,
      address: address || '',
      city: city || '',
      postcode: postcode || '',
      projects_donated_to: projectSummary,
    };

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setErrorMessage("Card element not loaded.");
        setLocalProcessing(false);
        return;
      }

      const isRecurring = donationState.type === 'monthly' || donationState.type === 'friday';
      const interval = donationState.type === 'friday' ? 'week' : 'month';

      if (isRecurring) {
        // Recurring subscription via Stripe
        const response = await fetch('/api/stripe/create-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountToPay,
            currency: 'gbp',
            email,
            name: `${firstName} ${lastName}`,
            address,
            city,
            postcode,
            phone,
            country,
            interval,
            durationMonths: donationState.type === 'monthly' ? donationState.durationMonths : null,
            metadata,
          }),
        });

        const data = await response.json();
        if (!response.ok || data.error) {
          setErrorMessage(data.error || 'Failed to create subscription.');
          setLocalProcessing(false);
          // Go to failure screen on api failure
          completeDonation(donationReference, false);
          return;
        }

        if (data.clientSecret) {
          const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: `${firstName} ${lastName}`,
                email,
              },
            },
          });

          if (confirmError) {
            setErrorMessage(confirmError.message || 'Subscription confirmation failed.');
            setLocalProcessing(false);
            // Go to failure screen on card failure
            completeDonation(donationReference, false);
            return;
          }
        }

        setLocalProcessing(false);
        completeDonation(donationReference, true);
      } else {
        // One-off donation via Stripe PaymentIntent
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountToPay,
            currency: 'gbp',
            email,
            name: `${firstName} ${lastName}`,
            address,
            city,
            postcode,
            phone,
            country,
            metadata,
          }),
        });

        const data = await response.json();
        if (!response.ok || data.error) {
          setErrorMessage(data.error || 'Failed to initialize payment.');
          setLocalProcessing(false);
          // Go to failure screen on api failure
          completeDonation(donationReference, false);
          return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${firstName} ${lastName}`,
              email,
            },
          },
        });

        if (confirmError) {
          setErrorMessage(confirmError.message || 'Payment confirmation failed.');
          setLocalProcessing(false);
          // Go to failure screen on card failure
          completeDonation(donationReference, false);
          return;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
          setLocalProcessing(false);
          completeDonation(donationReference, true);
        } else {
          setErrorMessage('Payment failed to authorize.');
          setLocalProcessing(false);
          completeDonation(donationReference, false);
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An unexpected error occurred during payment.');
      setLocalProcessing(false);
      completeDonation(donationReference, false);
    }
  };

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
              {donationState.type === "monthly" ? "Monthly" : donationState.type === "friday" ? "Friday Giving" : "One-off"}
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
            {donationState.type === "monthly" && donationState.durationMonths && (
              <p className="mt-1">
                <span className="font-bold text-brand-black">Duration:</span>{" "}
                {donationState.durationMonths} Months
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
          <span className="font-bold text-lg text-brand-black">Total to donate</span>
          <span className="font-bold text-2xl text-brand-black">
            £{formatMoney(amountToPay)}
          </span>
        </div>
      </div>

      <h2 className="text-lg font-bold text-brand-black mb-4 font-body">Select payment method</h2>
      <div className="grid grid-cols-2 gap-3 mb-8 items-center">
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.name}
            role="button"
            tabIndex={0}
            className={`p-4 rounded-sm border flex flex-col items-center gap-2 cursor-pointer transition-all font-bold text-[0.85rem] ${payMethod === method.name ? "border-purple bg-purple-faint text-purple scale-[1.02]" : "border-brand-lgrey bg-brand-white text-brand-black hover:border-purple/30"}`}
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
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-6">
          <div className="flex flex-col gap-1.5 p-4 border border-brand-lgrey rounded-sm bg-brand-white">
            <label className="block text-sm font-bold text-brand-black mb-2">Card Details</label>
            <div className="py-2.5">
              <CardElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={(e: any) => setIsCardComplete(e.complete)}
              />
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="text-[#B60000] text-sm font-semibold mb-6 bg-red-50 border border-red-200 p-3 rounded-sm animate-in fade-in duration-300">
          {errorMessage}
        </div>
      )}

      <YellowCTA
        text={isProcessing || localProcessing ? "Processing..." : `Donate Now — £${formatMoney(amountToPay)}`}
        onClick={handlePayment}
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
        <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey flex items-center justify-center gap-2">
          <IoIosCheckmarkCircle fill="#6B6B6B" className="sm:w-3 w-3 h-auto" />
          Gift Aid Registered
        </div>
      </div>

      <DonationStepFooter onBack={() => goStep(4)} />
    </div>
  );
}

export default function DonationStepPayment(props: DonationStepPaymentProps) {
  const stripePromise = useMemo(() => getStripe(), []);

  if (props.currentStep !== 5) return null;

  return (
    <Elements stripe={stripePromise}>
      <DonationStepPaymentForm {...props} />
    </Elements>
  );
}
