"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import YellowCTA from "../components/YellowCTA";

export default function Donate() {
  const router = useRouter();
  
  const [donationState, setDonationState] = useState({
    type: "oneoff",
    fund: "Where Most Needed",
    amount: 20 as number | null,
    giftAid: false,
  });
  const [customAmount, setCustomAmount] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [payMethod, setPayMethod] = useState("Card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const setDonationType = (type: string) => {
    setDonationState({ ...donationState, type });
  };

  const selectFund = (fund: string) => {
    setDonationState({ ...donationState, fund });
  };

  const selectAmount = (val: string) => {
    if (val === "other") {
      setDonationState({ ...donationState, amount: null });
      setTimeout(() => document.getElementById("customAmount")?.focus(), 10);
    } else {
      setDonationState({ ...donationState, amount: parseFloat(val) });
      setCustomAmount("");
    }
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setDonationState({ ...donationState, amount: parseFloat(val) || 0 });
  };

  const toggleGiftAid = () => {
    setDonationState({ ...donationState, giftAid: !donationState.giftAid });
  };

  const goStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeDonation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 1800);
  };

  const resetDonation = () => {
    setDonationState({
      type: "oneoff",
      fund: "Where Most Needed",
      amount: 20,
      giftAid: false,
    });
    setCustomAmount("");
    setCurrentStep(1);
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const amt = donationState.amount || 0;
  const giftAidAmt = donationState.giftAid ? amt * 0.25 : 0;
  const total = amt + giftAidAmt;

  return (
    <div id="page-donate" className="block min-h-screen">
      <div className="bg-purple pt-32 pb-16 px-4 md:px-8 text-brand-white text-center">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-[0.75rem] font-bold tracking-widest uppercase mb-4 text-brand-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>{" "}
            / <span className="text-white">Donate</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-body leading-tight">Make a Donation</h1>
          <p className="text-brand-white/80 text-[1.1rem]">Be a lifesaver. Your donation reaches those who need it most.</p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 md:px-8 my-12">
        {/* Step progress */}
        {!showSuccess && (
          <div className="flex justify-between items-center mb-12 relative before:content-[''] before:absolute before:top-5 before:left-0 before:w-full before:h-0.5 before:bg-brand-lgrey before:z-0">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className="flex flex-col items-center gap-2 relative z-10"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 ${
                  currentStep === step 
                    ? "bg-purple border-purple text-brand-white" 
                    : currentStep > step 
                    ? "bg-purple border-purple text-brand-white"
                    : "bg-brand-white border-brand-lgrey text-brand-grey"
                }`}>
                  {step}
                </div>
                <div className={`text-[0.7rem] font-bold uppercase tracking-widest ${currentStep === step ? "text-purple" : "text-brand-grey"}`}>
                  {["Start", "Donation", "Gift Aid", "Details", "Payment"][step - 1]}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: Type */}
        <div className={`bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey ${currentStep === 1 && !showSuccess ? "block" : "hidden"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">How would you like to give?</h2>
          <p className="text-[0.95rem] text-brand-grey mb-8 font-medium">
            Choose a one-off donation or set up a recurring monthly gift.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 font-bold transition-all hover:border-purple-faint ${donationState.type === "oneoff" ? "border-purple bg-purple-faint text-purple" : "border-brand-lgrey bg-brand-white text-brand-grey"}`}
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
              className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 font-bold transition-all hover:border-purple-faint ${donationState.type === "monthly" ? "border-purple bg-purple-faint text-purple" : "border-brand-lgrey bg-brand-white text-brand-grey"}`}
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
          <div className="bg-brand-white border-2 border-brand-lgrey rounded-xl p-6 mb-8">
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
              <button className="hidden sm:inline-flex items-center gap-2 font-bold text-sm cursor-pointer transition-all duration-200 no-underline px-4 py-2 border-2 border-purple text-purple rounded-lg hover:bg-purple hover:text-brand-white ml-auto whitespace-nowrap">
                Set Up →
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-12 bg-gray-50 -mx-8 -mb-10 px-8 py-6 rounded-b-2xl border-t border-brand-lgrey">
            <div></div>
            <button className="inline-flex items-center gap-2 font-bold text-base cursor-pointer transition-all duration-200 no-underline px-6 py-3.5 bg-purple text-brand-white hover:bg-purple-dark hover:-translate-y-0.5 hover:shadow-btn-purple leading-none" onClick={() => goStep(2)}>
              Next →
            </button>
          </div>
        </div>

        {/* STEP 2: Fund + Amount */}
        <div className={`bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey ${currentStep === 2 && !showSuccess ? "block" : "hidden"}`}>
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
                className={`p-3 rounded-lg border text-[0.8rem] font-bold transition-all text-center leading-tight ${
                  donationState.fund === fundObj 
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
                className={`p-3 rounded-lg border font-bold transition-all text-center ${
                  (val !== "other" && donationState.amount === parseFloat(val)) ||
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
              className="w-full px-4 py-3 border-2 border-purple rounded-lg focus:outline-none text-lg font-bold text-purple mb-8 placeholder:text-purple/50"
              type="number"
              id="customAmount"
              placeholder="Enter custom amount (£)"
              value={customAmount}
              onChange={handleCustomAmount}
            />
          )}

          <div className="flex justify-between items-center mt-12 bg-gray-50 -mx-8 -mb-10 px-8 py-6 rounded-b-2xl border-t border-brand-lgrey">
            <button className="font-bold text-purple hover:underline" onClick={() => goStep(1)}>
              ← Back
            </button>
            <button className="inline-flex items-center gap-2 font-bold text-base cursor-pointer transition-all duration-200 no-underline px-6 py-3.5 bg-purple text-brand-white hover:bg-purple-dark hover:-translate-y-0.5 hover:shadow-btn-purple leading-none" onClick={() => goStep(3)}>
              Next →
            </button>
          </div>
        </div>

        {/* STEP 3: Gift Aid */}
        <div className={`bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey ${currentStep === 3 && !showSuccess ? "block" : "hidden"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">
            Boost your donation with Gift Aid
          </h2>
          <p className="text-[0.95rem] text-brand-grey mb-8 font-medium">
            {"If you're a UK taxpayer, Gift Aid lets us reclaim 25p for every £1 you donate at no extra cost to you."}
          </p>

          <div className="bg-purple-faint border border-purple/20 p-6 rounded-xl flex flex-col sm:flex-row gap-6 mb-8">
            <div className="text-4xl">🎁</div>
            <div className="flex-1">
              <div className="font-bold text-brand-black mb-2 leading-tight">Add Gift Aid to your donation</div>
              <p className="text-[0.875rem] text-brand-grey leading-relaxed mb-6 font-medium">
                By confirming you are a UK taxpayer and understand that if you
                pay less Income Tax and/or Capital Gains Tax than the amount of
                Gift Aid claimed on all your donations in that tax year it is your
                responsibility to pay any difference.
              </p>
              <div className="flex items-center gap-3 cursor-pointer group" onClick={toggleGiftAid}>
                <div className={`w-12 h-6 rounded-full relative transition-all before:content-[''] before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-brand-white before:rounded-full before:transition-all ${donationState.giftAid ? "bg-purple before:translate-x-6" : "bg-brand-lgrey"}`}></div>
                <div className="text-[0.95rem] font-bold text-brand-black group-hover:text-purple transition-colors">
                  {donationState.giftAid
                    ? "Yes, I want to add Gift Aid"
                    : "No thanks"}
                </div>
              </div>
            </div>
          </div>

          {donationState.giftAid && (
            <div className="bg-purple-faint border-l-4 border-purple p-4 rounded-r-lg mb-8 text-purple text-sm animate-pulse-2">
              🎉 <strong>Great!</strong> Your donation will be worth{" "}
              <strong>25% more</strong> thanks to Gift Aid.
            </div>
          )}

          <div className="flex justify-between items-center mt-12 bg-gray-50 -mx-8 -mb-10 px-8 py-6 rounded-b-2xl border-t border-brand-lgrey">
            <button className="font-bold text-purple hover:underline" onClick={() => goStep(2)}>
              ← Back
            </button>
            <button className="inline-flex items-center gap-2 font-bold text-base cursor-pointer transition-all duration-200 no-underline px-6 py-3.5 bg-purple text-brand-white hover:bg-purple-dark hover:-translate-y-0.5 hover:shadow-btn-purple leading-none" onClick={() => goStep(4)}>
              Next →
            </button>
          </div>
        </div>

        {/* STEP 4: Personal Details */}
        <div className={`bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey ${currentStep === 4 && !showSuccess ? "block" : "hidden"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">Your details</h2>
          <p className="text-[0.95rem] text-brand-grey mb-8 font-medium">
            So we can send your donation receipt and keep you updated on the
            impact of your gift.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-brand-black">First Name *</label>
              <input className="w-full px-4 py-3 border border-brand-lgrey rounded-lg focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium" type="text" placeholder="John" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-brand-black">Last Name *</label>
              <input className="w-full px-4 py-3 border border-brand-lgrey rounded-lg focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium" type="text" placeholder="Smith" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="block text-sm font-bold text-brand-black">Email Address *</label>
            <input
              className="w-full px-4 py-3 border border-brand-lgrey rounded-lg focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium"
              type="email"
              placeholder="john@example.com"
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="block text-sm font-bold text-brand-black">Phone Number</label>
            <input
              className="w-full px-4 py-3 border border-brand-lgrey rounded-lg focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium"
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
                  className="w-full px-4 py-3 border border-brand-lgrey rounded-lg focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium"
                  type="text"
                  placeholder="123 Example Street"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                  <label className="block text-sm font-bold text-brand-black">City *</label>
                  <input className="w-full px-4 py-3 border border-brand-lgrey rounded-lg focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium" type="text" placeholder="Leeds" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="block text-sm font-bold text-brand-black">Postcode *</label>
                  <input
                    className="w-full px-4 py-3 border border-brand-lgrey rounded-lg focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium"
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

          <div className="flex justify-between items-center mt-12 bg-gray-50 -mx-8 -mb-10 px-8 py-6 rounded-b-2xl border-t border-brand-lgrey">
            <button className="font-bold text-purple hover:underline" onClick={() => goStep(3)}>
              ← Back
            </button>
            <button className="inline-flex items-center gap-2 font-bold text-base cursor-pointer transition-all duration-200 no-underline px-6 py-3.5 bg-purple text-brand-white hover:bg-purple-dark hover:-translate-y-0.5 hover:shadow-btn-purple leading-none" onClick={() => goStep(5)}>
              Next →
            </button>
          </div>
        </div>

        {/* STEP 5: Payment */}
        <div className={`bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey ${currentStep === 5 && !showSuccess ? "block" : "hidden"}`}>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { name: "Card", icon: "💳" },
              { name: "Direct Debit", icon: "🏦" },
              { name: "Apple Pay", icon: "📱" },
              { name: "PayPal", icon: "🅿️" },
            ].map((method) => (
              <div
                key={method.name}
                className={`p-3 rounded-lg border flex flex-col items-center gap-2 cursor-pointer transition-all font-bold text-[0.85rem] ${payMethod === method.name ? "border-purple bg-purple-faint text-purple scale-[1.02]" : "border-brand-lgrey bg-brand-white text-brand-black hover:border-purple/30"}`}
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
                  className="w-full px-4 py-3 border border-brand-lgrey rounded-lg focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col gap-1.5">
                  <label className="block text-sm font-bold text-brand-black">Expiry Date</label>
                  <input
                    className="w-full px-4 py-3 border border-brand-lgrey rounded-lg focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium"
                    type="text"
                    placeholder="MM / YY"
                    maxLength={7}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="block text-sm font-bold text-brand-black">CVV</label>
                  <input
                    className="w-full px-4 py-3 border border-brand-lgrey rounded-lg focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 font-medium"
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

          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey">🔒 SSL Secure</div>
            <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey">✅ Regulated Charity</div>
            <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey">🏦 Direct Debit Guarantee</div>
            <div className="bg-gray-50 p-2 rounded text-[0.7rem] font-bold text-brand-grey text-center border border-brand-lgrey">🎁 Gift Aid Registered</div>
          </div>

          <div className="flex justify-between items-center mt-12 bg-gray-50 -mx-8 -mb-10 px-8 py-6 rounded-b-2xl border-t border-brand-lgrey">
            <button className="font-bold text-purple hover:underline" onClick={() => goStep(4)}>
              ← Back
            </button>
            <div></div>
          </div>
        </div>

        {/* SUCCESS */}
        {showSuccess && (
          <div className="bg-brand-white p-8 md:p-12 rounded-2xl shadow-card border border-brand-lgrey text-center animate-in zoom-in-95 duration-500">
            <div className="text-6xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 font-body">Thank You!</h2>
            <p className="text-[1.1rem] text-brand-grey leading-relaxed mb-8 font-medium">
              Your donation has been received and will make a real difference to
              people in need.
              <br />A confirmation has been sent to your email address.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-base cursor-pointer transition-all duration-200 no-underline px-8 py-4 bg-purple text-brand-white hover:bg-purple-dark hover:-translate-y-0.5 hover:shadow-btn-purple"
              >
                Back to Home
              </Link>
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-base cursor-pointer transition-all duration-200 no-underline px-8 py-4 border-2 border-purple text-purple rounded-lg hover:bg-purple hover:text-brand-white"
                onClick={resetDonation}
              >
                Make Another Donation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

