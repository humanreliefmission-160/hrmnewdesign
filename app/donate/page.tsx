"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div id="page-donate" className="page active">
      <div className="donation-hero">
        <div className="about-breadcrumb">
          <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
            Home
          </Link>{" "}
          / <span>Donate</span>
        </div>
        <h1>Make a Donation</h1>
        <p>Be a lifesaver. Your donation reaches those who need it most.</p>
      </div>

      <div className="donation-container">
        {/* Step progress */}
        {!showSuccess && (
          <div className="step-progress" id="stepProgress">
            <div
              className={`step-item ${currentStep === 1 ? "active" : ""} ${
                currentStep > 1 ? "done" : ""
              }`}
            >
              <div className="step-num">1</div>
              <div className="step-label">Start</div>
            </div>
            <div
              className={`step-item ${currentStep === 2 ? "active" : ""} ${
                currentStep > 2 ? "done" : ""
              }`}
            >
              <div className="step-num">2</div>
              <div className="step-label">Donation</div>
            </div>
            <div
              className={`step-item ${currentStep === 3 ? "active" : ""} ${
                currentStep > 3 ? "done" : ""
              }`}
            >
              <div className="step-num">3</div>
              <div className="step-label">Gift Aid</div>
            </div>
            <div
              className={`step-item ${currentStep === 4 ? "active" : ""} ${
                currentStep > 4 ? "done" : ""
              }`}
            >
              <div className="step-num">4</div>
              <div className="step-label">Details</div>
            </div>
            <div
              className={`step-item ${currentStep === 5 ? "active" : ""} ${
                currentStep > 5 ? "done" : ""
              }`}
            >
              <div className="step-num">5</div>
              <div className="step-label">Payment</div>
            </div>
          </div>
        )}

        {/* STEP 1: Type */}
        <div className={`step-panel ${currentStep === 1 && !showSuccess ? "active" : ""}`}>
          <h2 className="donation-section-title">How would you like to give?</h2>
          <p className="donation-section-subtitle">
            Choose a one-off donation or set up a recurring monthly gift.
          </p>
          <div className="donation-type-btns">
            <button
              className={`type-btn ${donationState.type === "oneoff" ? "active" : ""}`}
              onClick={() => setDonationType("oneoff")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              One Off
            </button>
            <button
              className={`type-btn ${donationState.type === "monthly" ? "active" : ""}`}
              onClick={() => setDonationType("monthly")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Monthly
            </button>
          </div>
          {donationState.type === "monthly" && (
            <div
              style={{
                background: "rgba(101,1,153,0.08)",
                border: "1px solid rgba(101,1,153,0.2)",
                borderRadius: "8px",
                padding: "1rem 1.2rem",
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
                color: "var(--purple)",
              }}
            >
              💜 Monthly donors provide 3× more impact through consistent,
              predictable funding. You can cancel anytime.
            </div>
          )}
          <div
            style={{
              background: "#fff",
              border: "2px solid var(--light-grey)",
              borderRadius: "12px",
              padding: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontSize: "2rem" }}>🕌</div>
              <div>
                <div
                  style={{
                    fontFamily: "'Rubik',sans-serif",
                    fontWeight: 700,
                    marginBottom: "0.3rem",
                  }}
                >
                  Schedule your Friday Giving
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--grey)" }}>
                  Set up automatic donations on Fridays — the blessed day — for
                  maximum spiritual reward.
                </p>
              </div>
              <button
                className="btn btn-outline-purple"
                style={{ marginLeft: "auto", whiteSpace: "nowrap" }}
              >
                Set Up →
              </button>
            </div>
          </div>
          <div className="step-nav">
            <div></div>
            <button className="btn btn-purple" onClick={() => goStep(2)}>
              Next →
            </button>
          </div>
        </div>

        {/* STEP 2: Fund + Amount */}
        <div className={`step-panel ${currentStep === 2 && !showSuccess ? "active" : ""}`}>
          <h2 className="donation-section-title">Select your fund(s)</h2>
          <p className="donation-section-subtitle">
            Where would you like your donation to go?
          </p>
          <div className="fund-grid">
            {[
              "Sadaqah",
              "Zakat",
              "Where Most Needed",
              "Fidyah",
              "Kaffarah",
              "Lebanon Emergency Appeal",
              "Palestine Emergency Appeal",
              "Zakat Palestine",
              "Sudan Emergency",
              "Zakat Sudan Emergency",
              "Sadaqah Jariyah",
              "Water For Life",
              "Orphans & Children",
              "UK Zakat Fund",
              "Bags For Students",
              "Fitrana (Zakat Ul Fitr) £5pp",
            ].map((fundObj) => (
              <button
                key={fundObj}
                className={`fund-btn ${
                  donationState.fund === fundObj ? "active" : ""
                }`}
                onClick={() => selectFund(fundObj)}
              >
                {fundObj}
              </button>
            ))}
          </div>

          <h2 className="donation-section-title" style={{ marginTop: "2rem" }}>
            Select amount
          </h2>
          <div className="amount-grid">
            {["5", "10", "20", "50", "100", "other"].map((val) => (
              <button
                key={val}
                className={`amount-btn ${
                  (val !== "other" && donationState.amount === parseFloat(val)) ||
                  (val === "other" && donationState.amount === null && customAmount !== "")
                    ? "active"
                    : ""
                }`}
                onClick={() => selectAmount(val)}
              >
                {val === "other" ? "Other" : `£${val}`}
              </button>
            ))}
          </div>
          {(donationState.amount === null || customAmount !== "") && (
            <input
              className="amount-custom"
              type="number"
              id="customAmount"
              placeholder="Enter custom amount (£)"
              value={customAmount}
              onChange={handleCustomAmount}
            />
          )}

          <div className="step-nav">
            <button className="btn btn-outline-purple" onClick={() => goStep(1)}>
              ← Back
            </button>
            <button className="btn btn-purple" onClick={() => goStep(3)}>
              Next →
            </button>
          </div>
        </div>

        {/* STEP 3: Gift Aid */}
        <div className={`step-panel ${currentStep === 3 && !showSuccess ? "active" : ""}`}>
          <h2 className="donation-section-title">
            Boost your donation with Gift Aid
          </h2>
          <p className="donation-section-subtitle">
            {"If you're a UK taxpayer, Gift Aid lets us reclaim 25p for every £1 you donate at no extra cost to you."}
          </p>

          <div className="gift-aid-box">
            <div className="gift-aid-icon">🎁</div>
            <div style={{ flex: 1 }}>
              <div className="gift-aid-title">Add Gift Aid to your donation</div>
              <p className="gift-aid-text">
                By confirming you are a UK taxpayer and understand that if you
                pay less Income Tax and/or Capital Gains Tax than the amount of
                Gift Aid claimed on all your donations in that tax year it is your
                responsibility to pay any difference.
              </p>
              <div className="toggle-wrap" onClick={toggleGiftAid}>
                <div className={`toggle ${donationState.giftAid ? "on" : ""}`}></div>
                <div className="toggle-label">
                  {donationState.giftAid
                    ? "Yes, I want to add Gift Aid"
                    : "No thanks"}
                </div>
              </div>
            </div>
          </div>

          {donationState.giftAid && (
            <div
              style={{
                background: "rgba(101,1,153,0.08)",
                borderLeft: "4px solid var(--purple)",
                padding: "1rem 1.2rem",
                borderRadius: "0 8px 8px 0",
                marginBottom: "1.5rem",
              }}
            >
              🎉 <strong>Great!</strong> Your donation will be worth{" "}
              <strong>25% more</strong> thanks to Gift Aid.
            </div>
          )}

          <div className="step-nav">
            <button className="btn btn-outline-purple" onClick={() => goStep(2)}>
              ← Back
            </button>
            <button className="btn btn-purple" onClick={() => goStep(4)}>
              Next →
            </button>
          </div>
        </div>

        {/* STEP 4: Personal Details */}
        <div className={`step-panel ${currentStep === 4 && !showSuccess ? "active" : ""}`}>
          <h2 className="donation-section-title">Your details</h2>
          <p className="donation-section-subtitle">
            So we can send your donation receipt and keep you updated on the
            impact of your gift.
          </p>

          <div className="form-row-2" style={{ marginBottom: "1.2rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">First Name *</label>
              <input className="form-field" type="text" placeholder="John" />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Last Name *</label>
              <input className="form-field" type="text" placeholder="Smith" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              className="form-field"
              type="email"
              placeholder="john@example.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              className="form-field"
              type="tel"
              placeholder="+44 7700 000000"
            />
          </div>
          {donationState.giftAid && (
            <div>
              <div className="form-group">
                <label className="form-label">
                  Address (required for Gift Aid) *
                </label>
                <input
                  className="form-field"
                  type="text"
                  placeholder="123 Example Street"
                />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input className="form-field" type="text" placeholder="Leeds" />
                </div>
                <div className="form-group">
                  <label className="form-label">Postcode *</label>
                  <input
                    className="form-field"
                    type="text"
                    placeholder="LS1 2AB"
                  />
                </div>
              </div>
            </div>
          )}
          <div
            style={{
              padding: "1rem 1.2rem",
              background: "#fff",
              border: "1px solid var(--light-grey)",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <input
              type="checkbox"
              style={{
                marginTop: "3px",
                cursor: "pointer",
                accentColor: "var(--purple)",
              }}
            />
            <label
              style={{
                fontSize: "0.875rem",
                color: "var(--grey)",
                cursor: "pointer",
                lineHeight: 1.6,
              }}
            >
              {"I'd like to receive updates about Human Relief Mission's work and how my donation is making a difference."}
            </label>
          </div>

          <div className="step-nav">
            <button className="btn btn-outline-purple" onClick={() => goStep(3)}>
              ← Back
            </button>
            <button className="btn btn-purple" onClick={() => goStep(5)}>
              Next →
            </button>
          </div>
        </div>

        {/* STEP 5: Payment */}
        <div className={`step-panel ${currentStep === 5 && !showSuccess ? "active" : ""}`}>
          <h2 className="donation-section-title">Complete your donation</h2>

          <div className="donation-summary">
            <div className="summary-row">
              <span className="summary-label">Fund</span>
              <span className="summary-value">{donationState.fund}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Donation type</span>
              <span className="summary-value">
                {donationState.type === "monthly" ? "Monthly" : "One-off"}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Amount</span>
              <span className="summary-value">£{amt.toFixed(2)}</span>
            </div>
            {donationState.giftAid && (
              <div className="summary-row">
                <span className="summary-label">Gift Aid</span>
                <span className="summary-value" style={{ color: "var(--purple)" }}>
                  + £{giftAidAmt.toFixed(2)}
                </span>
              </div>
            )}
            <div className="summary-row summary-total">
              <span className="summary-label">Total Value</span>
              <span className="summary-value">£{total.toFixed(2)}</span>
            </div>
          </div>

          <h2 className="donation-section-title" style={{ fontSize: "1.1rem" }}>
            Select payment method
          </h2>
          <div className="payment-methods">
            {[
              { name: "Card", icon: "💳" },
              { name: "Direct Debit", icon: "🏦" },
              { name: "Apple Pay", icon: "📱" },
              { name: "PayPal", icon: "🅿️" },
            ].map((method) => (
              <div
                key={method.name}
                className={`pay-method ${payMethod === method.name ? "active" : ""}`}
                onClick={() => setPayMethod(method.name)}
              >
                <span className="pay-method-icon">{method.icon}</span>
                {method.name}
              </div>
            ))}
          </div>

          {payMethod === "Card" && (
            <div>
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input
                  className="form-field"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Expiry Date</label>
                  <input
                    className="form-field"
                    type="text"
                    placeholder="MM / YY"
                    maxLength={7}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input
                    className="form-field"
                    type="text"
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            className="btn btn-yellow"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "1.1rem",
              fontSize: "1rem",
              opacity: isProcessing ? 0.7 : 1,
            }}
            onClick={completeDonation}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : `Donate Now — £${amt.toFixed(2)}`}
          </button>

          <div className="trust-badges">
            <div className="trust-badge">🔒 SSL Secure</div>
            <div className="trust-badge">✅ Regulated Charity</div>
            <div className="trust-badge">🏦 Direct Debit Guarantee</div>
            <div className="trust-badge">🎁 Gift Aid Registered</div>
          </div>

          <div className="step-nav" style={{ marginTop: "1.5rem" }}>
            <button className="btn btn-outline-purple" onClick={() => goStep(4)}>
              ← Back
            </button>
            <div></div>
          </div>
        </div>

        {/* SUCCESS */}
        {showSuccess && (
          <div className="step-panel active">
            <div className="success-screen">
              <div className="success-icon">🎉</div>
              <div className="success-title">Thank You!</div>
              <p className="success-text">
                Your donation has been received and will make a real difference to
                people in need.
                <br />A confirmation has been sent to your email address.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href="/"
                  className="btn btn-purple"
                >
                  Back to Home
                </Link>
                <button
                  className="btn btn-outline-purple"
                  onClick={resetDonation}
                >
                  Make Another Donation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
