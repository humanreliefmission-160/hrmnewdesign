"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../components/PageHeader";
import DonationProgress from "../components/donation/DonationProgress";
import DonationStepType from "../components/donation/DonationStepType";
import DonationStepFundAmount from "../components/donation/DonationStepFundAmount";
import DonationStepGiftAid from "../components/donation/DonationStepGiftAid";
import DonationStepDetails from "../components/donation/DonationStepDetails";
import DonationStepPayment from "../components/donation/DonationStepPayment";
import DonationSuccess from "../components/donation/DonationSuccess";
import { DonationState } from "../components/donation/types";

export default function Donate() {
  const router = useRouter();

  const [donationState, setDonationState] = useState<DonationState>({
    type: "monthly",
    fund: "",
    label: "",
    amount: null as number | null,
    intention: "",
    giftAid: null,
  });
  const [customAmount, setCustomAmount] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [payMethod, setPayMethod] = useState("Card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const setDonationType = (type: string) => setDonationState({ ...donationState, type });
  const selectFund = (fund: string) => setDonationState({ ...donationState, fund });
  const selectIntention = (intention: string) => setDonationState({ ...donationState, intention });
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
  const setGiftAid = (giftAid: boolean) => setDonationState({ ...donationState, giftAid });

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
      type: "monthly",
      fund: "",
      label: "",
      amount: null,
      intention: "",
      giftAid: null,
    });
    setCustomAmount("");
    setCurrentStep(1);
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="page-donate" className="min-h-screen">
      <PageHeader
        title="Make a Donation"
        subtitle="Be a lifesaver. Your donation reaches those who need it most."
        breadcrumb="Donate"
        display={false}
      />

      <div className="max-w-[800px] mx-auto px-4 md:px-8 my-15 sm:my-20">
        {!showSuccess && <DonationProgress currentStep={currentStep} />}

        {!showSuccess && (
          <>
            <DonationStepType
              currentStep={currentStep}
              donationState={donationState}
              setDonationType={setDonationType}
              goStep={goStep}
            />

            <DonationStepFundAmount
              currentStep={currentStep}
              donationState={donationState}
              customAmount={customAmount}
              selectFund={selectFund}
              selectAmount={selectAmount}
              selectIntention={selectIntention}
              handleCustomAmount={handleCustomAmount}
              goStep={goStep}
            />

            <DonationStepGiftAid
              currentStep={currentStep}
              donationState={donationState}
              setGiftAid={setGiftAid}
              goStep={goStep}
            />

            <DonationStepDetails
              currentStep={currentStep}
              donationState={donationState}
              goStep={goStep}
            />

            <DonationStepPayment
              currentStep={currentStep}
              donationState={donationState}
              payMethod={payMethod}
              setPayMethod={setPayMethod}
              isProcessing={isProcessing}
              completeDonation={completeDonation}
              goStep={goStep}
            />
          </>
        )}

        <DonationSuccess showSuccess={showSuccess} resetDonation={resetDonation} />
      </div>
    </div>
  );
}
