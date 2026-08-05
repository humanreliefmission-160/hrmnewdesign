"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import YellowCTA from '../YellowCTA';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';
import BasketItemCard from './BasketItemCard';
import { useBasket } from '../../context/BasketContext';
import { IoCardSharp, IoShieldCheckmark } from 'react-icons/io5';
// ── PAYPAL DISABLED — icon import no longer needed while PayPal is hidden ──
// import { GrPaypal } from 'react-icons/gr';
import { AiFillLock } from 'react-icons/ai';
import { IoIosCheckmarkCircle } from 'react-icons/io';
// ── BANK TRANSFER DISABLED — icon import no longer needed while Bank Transfer/Standing Order is hidden ──
// import { BsBank2 } from 'react-icons/bs';
import { MdOutlineAccountBalance } from 'react-icons/md';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
// import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import getStripe from '@/app/api/stripe/stripejs';

interface DonationStepPaymentProps {
  currentStep: number;
  donationState: DonationState;
  payMethod: string;
  setPayMethod: (method: string) => void;
  isProcessing: boolean;
  completeDonation: (reference: string, success: boolean, bankDetails?: Record<string, string>, stripeFeeAmount?: number, adminFeeAmount?: number) => void;
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

// Fee info shown on each payment method button
// PayPal / BankTransfer labels kept here (harmless — unused data has no effect
// on the build) in case either method is re-enabled later.
const METHOD_FEE_LABELS: Record<string, string> = {
  Card: "Fee: 1.2% + 20p",
  PayPal: "Fee: 2.9% + 30p",
  BACS: "Fee: 1% (max £4)",
  BankTransfer: "No fee",
};

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
  const { items, totalAmount: basketTotal, itemCount, removeItem } = useBasket();
  const stripe = useStripe();
  const elements = useElements();
  const [localProcessing, setLocalProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const prInitialized = useRef(false);

  // Optional fee opt-ins
  const [coverStripeFee, setCoverStripeFee] = useState(false);
  const [coverAdminFee, setCoverAdminFee] = useState(false);

  // BACS Direct Debit form state
  const [bacsName, setBacsName] = useState('');
  const [bacsSortCode, setBacsSortCode] = useState('');
  const [bacsAccountNumber, setBacsAccountNumber] = useState('');
  const [bacsConsent, setBacsConsent] = useState(false);

  // ── BANK TRANSFER DISABLED — form state kept but unused while hidden.
  // Commented out (not deleted) so re-enabling only requires uncommenting
  // this block plus the matching JSX/logic blocks marked below.
  // const [btName, setBtName] = useState('');
  // const [btTransferDate, setBtTransferDate] = useState('');
  // const [btBankName, setBtBankName] = useState('');
  // const [btConfirm, setBtConfirm] = useState(false);

  // Detect recurring frequency
  const isRecurringFrequency =
    donationState.type === 'monthly' ||
    donationState.type === 'friday' ||
    donationState.type === 'weekly' ||
    donationState.type === 'daily';

  // Build payment method list dynamically
  const paymentMethods = useMemo(() => {
    const methods: { name: string; displayName: string; icon: React.ReactNode; fee: string; recommended?: boolean; comingSoon?: boolean }[] = [
      {
        name: 'Card',
        displayName: 'Card',
        icon: <IoCardSharp fill="#650199" className="sm:w-7 w-7 h-auto" />,
        fee: METHOD_FEE_LABELS.Card,
        recommended: !isRecurringFrequency,
      },
      // ── PAYPAL DISABLED — remove this comment block to bring PayPal back
      // as a selectable tile in the payment method grid.
      // {
      //   name: 'PayPal',
      //   displayName: 'PayPal',
      //   icon: <GrPaypal fill="#650199" className="sm:w-7 w-7 h-auto" />,
      //   fee: METHOD_FEE_LABELS.PayPal,
      //   comingSoon: true,
      // },
    ];
    if (isRecurringFrequency) {
      methods.push({
        name: 'BACS',
        displayName: 'BACS Direct Debit',
        icon: <MdOutlineAccountBalance fill="#650199" className="sm:w-7 w-7 h-auto" />,
        fee: METHOD_FEE_LABELS.BACS,
        recommended: true,
      });
    }
    // ── BANK TRANSFER DISABLED — remove this comment block to bring back
    // the Bank Transfer / Standing Order tile.
    // methods.push({
    //   name: 'BankTransfer',
    //   displayName: isRecurringFrequency ? 'Standing Order' : 'Bank Transfer',
    //   icon: <BsBank2 fill="#650199" className="sm:w-7 w-7 h-auto" />,
    //   fee: METHOD_FEE_LABELS.BankTransfer,
    // });
    return methods;
  }, [isRecurringFrequency]);

  const donatedTotal = itemCount > 0 ? basketTotal : donationState.amount || 0;
  const giftAidAmt = donationState.giftAid ? donatedTotal * 0.25 : 0;
  const totalDonationValue = donatedTotal + giftAidAmt;

  // Fee calculations
  const stripeFeeAmt = coverStripeFee ? parseFloat(((donatedTotal * 0.012) + 0.20).toFixed(2)) : 0;
  const adminFeeAmt = coverAdminFee ? 1 : 0;
  const amountToPay = parseFloat((donatedTotal + stripeFeeAmt + adminFeeAmt).toFixed(2));

  // Keep a ref of all values the PR event handler needs (avoids stale closures)
  const paymentValuesRef = useRef({
    amountToPay,
    donationState,
    email,
    firstName,
    lastName,
    address,
    city,
    postcode,
    phone,
    country,
    items,
    itemCount,
  });

  useEffect(() => {
    paymentValuesRef.current = {
      amountToPay,
      donationState,
      email,
      firstName,
      lastName,
      address,
      city,
      postcode,
      phone,
      country,
      items,
      itemCount,
    };
  });

  const formatMoney = (value: number) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // ─── Build metadata ──────────────────────────────────────────────────────────
  const buildMetadata = (ref: string, vals: typeof paymentValuesRef.current) => {
    const projectSummary =
      vals.itemCount > 0
        ? vals.items
          .map((i) => `${i.projectName} (${i.projectItem || 'Donation'}) - £${i.amount}`)
          .join(', ')
        : `${vals.donationState.projectName || 'General'} (${vals.donationState.donationItemTitle || 'Donation'
        }) - £${vals.donationState.amount || 0}`;
    return {
      donation_reference: ref,
      donor_name: `${vals.firstName} ${vals.lastName}`,
      email: vals.email,
      address: vals.address || '',
      city: vals.city || '',
      postcode: vals.postcode || '',
      projects_donated_to: projectSummary,
    };
  };

  // ─── Initialize Payment Request (Google Pay / Apple Pay) ─────────────────────
  useEffect(() => {
    if (!stripe || amountToPay <= 0 || prInitialized.current) return;
    prInitialized.current = true;
    const pr = stripe.paymentRequest({
      country: 'GB',
      currency: 'gbp',
      total: {
        label: 'Human Relief Mission Donation',
        amount: Math.round(amountToPay * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Handle the payment method from the wallet sheet
    pr.on('paymentmethod', async (ev) => {
      const vals = paymentValuesRef.current;
      const donationReference = `DON-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      const metadata = buildMetadata(donationReference, vals);

      const isRecurring =
        vals.donationState.type === 'monthly' ||
        vals.donationState.type === 'friday' ||
        vals.donationState.type === 'weekly' ||
        vals.donationState.type === 'daily';
      const interval =
        vals.donationState.type === 'daily'
          ? 'day'
          : vals.donationState.type === 'weekly' || vals.donationState.type === 'friday'
            ? 'week'
            : 'month';

      const donorEmail = ev.payerEmail || vals.email;
      const donorName = ev.payerName || `${vals.firstName} ${vals.lastName}`;

      try {
        let clientSecret: string;

        if (isRecurring) {
          const response = await fetch('/api/stripe/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: vals.amountToPay,
              currency: 'gbp',
              email: donorEmail,
              name: donorName,
              address: vals.address,
              city: vals.city,
              postcode: vals.postcode,
              phone: vals.phone,
              country: vals.country,
              interval,
              durationMonths:
                vals.donationState.type === 'monthly'
                  ? vals.donationState.durationMonths
                  : null,
              metadata,
            }),
          });
          const data = await response.json();
          if (!response.ok || data.error || !data.clientSecret) {
            ev.complete('fail');
            completeDonation(donationReference, false, undefined, stripeFeeAmt, adminFeeAmt);
            return;
          }
          clientSecret = data.clientSecret;
        } else {
          const response = await fetch('/api/stripe/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: vals.amountToPay,
              currency: 'gbp',
              email: donorEmail,
              name: donorName,
              address: vals.address,
              city: vals.city,
              postcode: vals.postcode,
              phone: vals.phone,
              country: vals.country,
              metadata,
            }),
          });
          const data = await response.json();
          if (!response.ok || data.error) {
            ev.complete('fail');
            completeDonation(donationReference, false, undefined, stripeFeeAmt, adminFeeAmt);
            return;
          }
          clientSecret = data.clientSecret;
        }

        // Confirm the payment using the wallet's payment method
        const { error: confirmError } = await stripe!.confirmCardPayment(
          clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false } // wallet handles its own auth
        );

        if (confirmError) {
          ev.complete('fail');
          completeDonation(donationReference, false, undefined, stripeFeeAmt, adminFeeAmt);
        } else {
          ev.complete('success');
          completeDonation(donationReference, true, undefined, stripeFeeAmt, adminFeeAmt);
        }
      } catch (err: any) {
        ev.complete('fail');
        completeDonation(donationReference, false, undefined, stripeFeeAmt, adminFeeAmt);
      }
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe, amountToPay]); // amountToPay needed for first-time init

  // Keep the payment request amount in sync when it changes
  useEffect(() => {
    if (!paymentRequest || amountToPay <= 0) return;
    try {
      paymentRequest.update({
        total: {
          label: 'Human Relief Mission Donation',
          amount: Math.round(amountToPay * 100),
        },
      });
    } catch (_) {
      // Can't update while the payment sheet is open — safe to ignore
    }
  }, [paymentRequest, amountToPay]);

  // ─── Validation helpers for offline methods ───
  const sortCodeClean = bacsSortCode.replace(/\D/g, '');
  const isBACSValid =
    bacsName.trim().length > 1 &&
    sortCodeClean.length === 6 &&
    bacsAccountNumber.replace(/\D/g, '').length === 8 &&
    bacsConsent;

  // ── BANK TRANSFER DISABLED — validation no longer needed while hidden.
  // const isBTValid =
  //   btName.trim().length > 1 &&
  //   btTransferDate !== '' &&
  //   btConfirm;

  // ─── Card / PayPal payment handler ───
  const isSubmitDisabled =
    isProcessing ||
    localProcessing ||
    (payMethod === 'Card' && (!stripe || !elements || !isCardComplete)) ||
    (payMethod === 'BACS' && !isBACSValid);
    // ── BANK TRANSFER DISABLED — condition removed from the disabled check
    // since BankTransfer can no longer be selected as payMethod.
    // || (payMethod === 'BankTransfer' && !isBTValid);

  const submitButtonLabel = (() => {
    if (isProcessing || localProcessing) return 'Processing...';
    if (payMethod === 'BACS') return `Confirm & Continue — £${formatMoney(amountToPay)}`;
    // ── BANK TRANSFER DISABLED ──
    // if (payMethod === 'BankTransfer') return `Confirm & Continue — £${formatMoney(amountToPay)}`;
    // ── PAYPAL DISABLED ──
    // if (payMethod === 'PayPal') return `Continue to PayPal — £${formatMoney(amountToPay)}`;
    return `Donate Now — £${formatMoney(amountToPay)}`;
  })();

  const handlePayment = async () => {
    const donationReference = `DON-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // ── PAYPAL DISABLED — this branch is now unreachable since 'PayPal' can
    // no longer be selected from the payment method grid above. Left in
    // place (commented) so the "coming soon" messaging is ready to restore.
    // if (payMethod === 'PayPal') {
    //   setErrorMessage('PayPal payments are coming soon. Please use another payment method for now.');
    //   return;
    // }

    if (payMethod === 'BACS') {
      setLocalProcessing(true);
      const bankDetails: Record<string, string> = {
        method: 'BACS Direct Debit',
        accountHolderName: bacsName.trim(),
        sortCode: bacsSortCode.trim(),
        accountNumber: bacsAccountNumber.trim(),
      };
      // ── BANK TRANSFER DISABLED — original code branched between BACS and
      // BankTransfer here using a ternary. Since BankTransfer can no longer
      // be selected, the ternary has been simplified to BACS only:
      //
      // const bankDetails: Record<string, string> =
      //   payMethod === 'BACS'
      //     ? { ...as above... }
      //     : {
      //         method: isRecurringFrequency ? 'Standing Order' : 'Bank Transfer',
      //         accountHolderName: btName.trim(),
      //         estimatedTransferDate: btTransferDate,
      //         bankName: btBankName.trim() || 'Not provided',
      //       };
      setTimeout(() => {
        setLocalProcessing(false);
        completeDonation(donationReference, true, bankDetails, stripeFeeAmt, adminFeeAmt);
      }, 800);
      return;
    }

    if (payMethod !== "Card") {
      setLocalProcessing(true);
      setTimeout(() => {
        setLocalProcessing(false);
        completeDonation(donationReference, true, undefined, stripeFeeAmt, adminFeeAmt);
      }, 1500);
      return;
    }

    if (!stripe || !elements) return;
    setLocalProcessing(true);
    setErrorMessage(null);

    const vals = paymentValuesRef.current;
    const metadata = buildMetadata(donationReference, vals);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setErrorMessage("Card element not loaded.");
        setLocalProcessing(false);
        return;
      }

      const isRecurring =
        donationState.type === 'monthly' ||
        donationState.type === 'friday' ||
        donationState.type === 'weekly' ||
        donationState.type === 'daily';
      const interval =
        donationState.type === 'daily'
          ? 'day'
          : donationState.type === 'weekly' || donationState.type === 'friday'
            ? 'week'
            : 'month';

      if (isRecurring) {
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
            durationMonths:
              donationState.type === 'monthly' ? donationState.durationMonths : null,
            metadata,
          }),
        });
        const data = await response.json();
        if (!response.ok || data.error) {
          setErrorMessage(data.error || 'Failed to create subscription.');
          setLocalProcessing(false);
          completeDonation(donationReference, false, undefined, stripeFeeAmt, adminFeeAmt);
          return;
        }
        if (data.clientSecret) {
          const { error: confirmError } = await stripe.confirmCardPayment(
            data.clientSecret,
            {
              payment_method: {
                card: cardElement,
                billing_details: { name: `${firstName} ${lastName}`, email },
              },
            }
          );
          if (confirmError) {
            setErrorMessage(
              confirmError.message || 'Subscription confirmation failed.'
            );
            setLocalProcessing(false);
            completeDonation(donationReference, false, undefined, stripeFeeAmt, adminFeeAmt);
            return;
          }
        }
        setLocalProcessing(false);
        completeDonation(donationReference, true, undefined, stripeFeeAmt, adminFeeAmt);
      } else {
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
          completeDonation(donationReference, false, undefined, stripeFeeAmt, adminFeeAmt);
          return;
        }
        const { error: confirmError, paymentIntent } =
          await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: { name: `${firstName} ${lastName}`, email },
            },
          });
        if (confirmError) {
          setErrorMessage(confirmError.message || 'Payment confirmation failed.');
          setLocalProcessing(false);
          completeDonation(donationReference, false, undefined, stripeFeeAmt, adminFeeAmt);
          return;
        }
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          setLocalProcessing(false);
          completeDonation(donationReference, true, undefined, stripeFeeAmt, adminFeeAmt);
        } else {
          setErrorMessage('Payment failed to authorize.');
          setLocalProcessing(false);
          completeDonation(donationReference, false, undefined, stripeFeeAmt, adminFeeAmt);
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'An unexpected error occurred during payment.'
      );
      setLocalProcessing(false);
      completeDonation(donationReference, false, undefined, stripeFeeAmt, adminFeeAmt);
    }
  };

  return (
    <div className="bg-brand-white/50 p-8 md:p-10 rounded-sm shadow-card border border-brand-lgrey">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8 font-body leading-tight">
        Complete your donation
      </h2>

      {/* Basket / summary */}
      <div className="mb-8 flex flex-col gap-3">
        {itemCount > 0 ? (
          items.map((item) => <BasketItemCard key={item.id} item={item} onRemove={removeItem} />)
        ) : (
          <div className="bg-brand-lgrey/75 border border-brand-lgrey rounded-sm p-4 text-sm text-brand-grey">
            <p>
              <span className="font-bold text-brand-black">Type:</span>{" "}
              {donationState.type === "monthly"
                ? "Monthly"
                : donationState.type === "friday"
                  ? "Friday Giving"
                  : donationState.type === "weekly"
                    ? "Weekly"
                    : donationState.type === "daily"
                      ? "Daily"
                      : "One-off"}
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

      {/* Optional fee checkboxes */}
      <div className="flex flex-col gap-3 mb-6">
        <label className="flex gap-3 items-start cursor-pointer group p-4 border border-brand-lgrey rounded-sm bg-brand-white hover:border-purple/40 transition-colors">
          <input
            type="checkbox"
            id="coverStripeFee"
            className="mt-0.5 w-4 h-4 accent-purple shrink-0 cursor-pointer"
            checked={coverStripeFee}
            onChange={(e) => setCoverStripeFee(e.target.checked)}
          />
          <span className="text-sm font-semibold text-brand-black leading-snug">
            We are charged a small fee of 1.2% + 20p on every transaction by our payment provider.
            Would you like to cover the transaction fee of{" "}
            <span className="text-purple">£{formatMoney((donatedTotal * 0.012) + 0.2)}</span> so that
            we receive your full donation?
          </span>
        </label>
        <label className="flex gap-3 items-start cursor-pointer group p-4 border border-brand-lgrey rounded-sm bg-brand-white hover:border-purple/40 transition-colors">
          <input
            type="checkbox"
            id="coverAdminFee"
            className="mt-0.5 w-4 h-4 accent-purple shrink-0 cursor-pointer"
            checked={coverAdminFee}
            onChange={(e) => setCoverAdminFee(e.target.checked)}
          />
          <span className="text-sm font-semibold text-brand-black leading-snug">
            Would you like to help with our Admin costs by donating just a{" "}
            <span className="text-purple">£1</span>? This will help the charity produce more
            projects that will help humanity!
          </span>
        </label>
      </div>

      {/* Totals */}
      <div className="bg-brand-lgrey/75 p-6 rounded-sm mb-8 space-y-3">
        <div className="flex justify-between items-center gap-4">
          <span className="text-sm font-bold text-brand-black">Donation</span>
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
        {coverStripeFee && (
          <div className="flex justify-between items-center gap-4">
            <span className="text-sm text-brand-grey">Transaction fee (1.2%)</span>
            <span className="text-sm font-semibold text-brand-black">+ £{formatMoney(stripeFeeAmt)}</span>
          </div>
        )}
        {coverAdminFee && (
          <div className="flex justify-between items-center gap-4">
            <span className="text-sm text-brand-grey">Admin fee</span>
            <span className="text-sm font-semibold text-brand-black">+ £1.00</span>
          </div>
        )}
        <hr className="text-brand-grey/50 mt-5" />
        <div className="border-t border-brand-lgrey pt-3 flex justify-between items-end">
          <span className="font-bold text-lg text-brand-black">Total to pay</span>
          <span className="font-bold text-2xl text-brand-black">
            £{formatMoney(amountToPay)}
          </span>
        </div>
      </div>

      {/* ── Google Pay / Apple Pay ── */}
      {paymentRequest && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-xs font-bold text-brand-grey uppercase tracking-wide mb-3">
            Pay instantly with
          </p>
          <PaymentRequestButtonElement
            options={{
              paymentRequest,
              style: {
                paymentRequestButton: {
                  type: 'donate',
                  theme: 'dark',
                  height: '52px',
                },
              },
            }}
          />
          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-brand-lgrey" />
            <span className="text-xs font-semibold text-brand-grey">or pay by card</span>
            <hr className="flex-1 border-brand-lgrey" />
          </div>
        </div>
      )}

      {/* ── Payment method selector ── */}
      <h2 className="text-lg font-bold text-brand-black mb-4 font-body">
        Select payment method
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-8 items-stretch">
        {paymentMethods.map((method) => {
          const isSelected = payMethod === method.name;
          return (
            <div
              key={method.name}
              role="button"
              tabIndex={0}
              className={`relative p-4 rounded-sm border flex flex-col items-center gap-2 cursor-pointer transition-all font-bold text-[0.85rem] ${
                isSelected
                  ? 'border-purple bg-purple-faint text-purple scale-[1.02] shadow-sm'
                  : 'border-brand-lgrey bg-brand-white text-brand-black hover:border-purple/30'
              }`}
              onClick={() => {
                setErrorMessage(null);
                setPayMethod(method.name);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setErrorMessage(null);
                  setPayMethod(method.name);
                }
              }}
            >
              {/* Recommended badge */}
              {method.recommended && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                  ★ Recommended
                </span>
              )}
              {/* Coming soon badge */}
              {method.comingSoon && !isSelected && (
                <span className="absolute -top-2.5 right-2 bg-amber-400 text-white text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                  Coming soon
                </span>
              )}
              <span className="text-2xl mt-2">{method.icon}</span>
              <span className="text-center leading-tight">{method.displayName}</span>
              <span
                className={`text-[0.65rem] font-semibold mt-0.5 ${
                  isSelected ? 'text-purple/70' : 'text-brand-grey'
                }`}
              >
                {method.fee}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Card input ── */}
      {payMethod === 'Card' && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-6">
          <div className="flex flex-col gap-1.5 p-4 border border-brand-lgrey rounded-sm bg-brand-white">
            <label className="block text-sm font-bold text-brand-black mb-2">
              Card Details
            </label>
            <div className="py-2.5">
              <CardElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={(e: any) => setIsCardComplete(e.complete)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── BACS Direct Debit form ── */}
      {payMethod === 'BACS' && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-6 space-y-4">
          <div className="p-4 border border-purple/30 bg-purple-faint rounded-sm">
            <p className="text-sm font-bold text-brand-black mb-1">BACS Direct Debit</p>
            <p className="text-xs text-brand-grey leading-relaxed">
              Enter your bank account details below. Your bank may take 3–5 working days to activate the mandate.
            </p>
          </div>
          {/* Account holder name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-brand-black" htmlFor="bacs-name">Account Holder Name *</label>
            <input
              id="bacs-name"
              type="text"
              placeholder="e.g. John Smith"
              value={bacsName}
              onChange={e => setBacsName(e.target.value)}
              className="w-full border border-brand-lgrey rounded-sm px-3 py-2.5 text-sm text-brand-black placeholder:text-brand-grey/60 focus:outline-none focus:border-purple transition-colors bg-brand-white"
            />
          </div>
          {/* Sort code */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-brand-black" htmlFor="bacs-sort">Sort Code * <span className="font-normal text-brand-grey">(e.g. 12-34-56)</span></label>
            <input
              id="bacs-sort"
              type="text"
              placeholder="12-34-56"
              value={bacsSortCode}
              maxLength={8}
              onChange={e => {
                // Auto-format as XX-XX-XX
                const raw = e.target.value.replace(/\D/g, '').slice(0, 6);
                const formatted = raw.replace(/(\d{2})(?=\d)/g, '$1-');
                setBacsSortCode(formatted);
              }}
              className="w-full border border-brand-lgrey rounded-sm px-3 py-2.5 text-sm text-brand-black placeholder:text-brand-grey/60 focus:outline-none focus:border-purple transition-colors bg-brand-white font-mono"
            />
          </div>
          {/* Account number */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-brand-black" htmlFor="bacs-acc">Account Number * <span className="font-normal text-brand-grey">(8 digits)</span></label>
            <input
              id="bacs-acc"
              type="text"
              placeholder="12345678"
              value={bacsAccountNumber}
              maxLength={8}
              onChange={e => setBacsAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 8))}
              className="w-full border border-brand-lgrey rounded-sm px-3 py-2.5 text-sm text-brand-black placeholder:text-brand-grey/60 focus:outline-none focus:border-purple transition-colors bg-brand-white font-mono"
            />
          </div>
          {/* Mandate consent */}
          <label className="flex gap-3 items-start cursor-pointer p-3 border border-brand-lgrey rounded-sm bg-brand-white hover:border-purple/40 transition-colors">
            <input
              type="checkbox"
              id="bacs-consent"
              className="mt-0.5 w-4 h-4 accent-purple shrink-0 cursor-pointer"
              checked={bacsConsent}
              onChange={e => setBacsConsent(e.target.checked)}
            />
            <span className="text-xs font-semibold text-brand-black leading-snug">
              I authorise Human Relief Mission to collect payments from my account via BACS Direct Debit, in accordance with the Direct Debit Guarantee.
            </span>
          </label>
        </div>
      )}

      {/* ── BANK TRANSFER DISABLED ──────────────────────────────────────────────
          The entire Bank Transfer / Standing Order form block is commented out
          below. It can never render anyway since 'BankTransfer' was removed
          from paymentMethods above (so payMethod can never equal
          'BankTransfer'), but it's kept here, fully intact, so restoring it is
          just a matter of uncommenting this block plus the matching entries
          in paymentMethods, isSubmitDisabled, submitButtonLabel, and
          handlePayment above.

      {payMethod === 'BankTransfer' && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-6 space-y-4">
          <div className="p-4 border border-purple/30 bg-purple-faint rounded-sm">
            <p className="text-sm font-bold text-brand-black mb-1">
              {isRecurringFrequency ? 'Standing Order' : 'Bank Transfer'}
            </p>
            <p className="text-xs text-brand-grey leading-relaxed">
              {isRecurringFrequency
                ? `Please set up a standing order from your bank to Human Relief Mission. Set the frequency to ${
                    donationState.type === 'daily' ? 'daily' :
                    donationState.type === 'weekly' || donationState.type === 'friday' ? 'weekly' : 'monthly'
                  }.`
                : 'Please make a one-off bank transfer to Human Relief Mission using your name as the payment reference.'}
            </p>
          </div>
          <div className="p-4 border border-brand-lgrey rounded-sm bg-brand-white space-y-2">
            <p className="text-xs font-bold text-brand-black mb-2">Transfer to:</p>
            {[
              ['Account Name', 'Human Relief Mission'],
              ['Sort Code', '30-00-00'],
              ['Account Number', '12345678'],
              ['Reference', `${firstName} ${lastName}`.trim() || 'Your full name'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-xs">
                <span className="text-brand-grey font-semibold">{label}</span>
                <span className={`font-bold ${label === 'Reference' ? 'text-purple' : 'text-brand-black'}`}>{value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-brand-black" htmlFor="bt-name">Your Full Name *</label>
            <input
              id="bt-name"
              type="text"
              placeholder="As it appears on your bank account"
              value={btName}
              onChange={e => setBtName(e.target.value)}
              className="w-full border border-brand-lgrey rounded-sm px-3 py-2.5 text-sm text-brand-black placeholder:text-brand-grey/60 focus:outline-none focus:border-purple transition-colors bg-brand-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-brand-black" htmlFor="bt-date">
              {isRecurringFrequency ? 'First Payment Date *' : 'Estimated Transfer Date *'}
            </label>
            <input
              id="bt-date"
              type="date"
              value={btTransferDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setBtTransferDate(e.target.value)}
              className="w-full border border-brand-lgrey rounded-sm px-3 py-2.5 text-sm text-brand-black focus:outline-none focus:border-purple transition-colors bg-brand-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-brand-black" htmlFor="bt-bank">Your Bank Name <span className="font-normal text-brand-grey">(optional)</span></label>
            <input
              id="bt-bank"
              type="text"
              placeholder="e.g. Barclays, Lloyds, NatWest"
              value={btBankName}
              onChange={e => setBtBankName(e.target.value)}
              className="w-full border border-brand-lgrey rounded-sm px-3 py-2.5 text-sm text-brand-black placeholder:text-brand-grey/60 focus:outline-none focus:border-purple transition-colors bg-brand-white"
            />
          </div>
          <label className="flex gap-3 items-start cursor-pointer p-3 border border-brand-lgrey rounded-sm bg-brand-white hover:border-purple/40 transition-colors">
            <input
              type="checkbox"
              id="bt-confirm"
              className="mt-0.5 w-4 h-4 accent-purple shrink-0 cursor-pointer"
              checked={btConfirm}
              onChange={e => setBtConfirm(e.target.checked)}
            />
            <span className="text-xs font-semibold text-brand-black leading-snug">
              I confirm I will {isRecurringFrequency ? 'set up this standing order' : 'make this bank transfer'} within 3 working days.
            </span>
          </label>
        </div>
      )}

      ── END BANK TRANSFER DISABLED ────────────────────────────────────────── */}

      {errorMessage && (
        <div className="text-[#B60000] text-sm font-semibold mb-6 bg-red-50 border border-red-200 p-3 rounded-sm animate-in fade-in duration-300">
          {errorMessage}
        </div>
      )}

      <YellowCTA
        text={submitButtonLabel}
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
