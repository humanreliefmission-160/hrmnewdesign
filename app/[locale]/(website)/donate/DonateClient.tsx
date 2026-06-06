"use client";

import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import DonationProgress from "../components/donation/DonationProgress";
import DonationStepType from "../components/donation/DonationStepType";
import DonationStepFundAmount from "../components/donation/DonationStepFundAmount";
import DonationStepGiftAid from "../components/donation/DonationStepGiftAid";
import DonationStepDetails from "../components/donation/DonationStepDetails";
import DonationStepPayment from "../components/donation/DonationStepPayment";
import DonationSuccess from "../components/donation/DonationSuccess";
import { DonationState, initialDonationState } from "../components/donation/types";
import type { DonationPortalProject } from "../lib/sanity/donationProjects";
import { useBasket } from "../context/BasketContext";
import { buildDonationStateFromBasket } from "../lib/donation/syncBasketToDonationState";

interface DonateClientProps {
  projects: DonationPortalProject[];
  /** From `/donate?project={slug}` — one-off giving, pre-selected project, step 2 */
  initialProjectSlug?: string;
  /** From `/donate?step=3` — open Gift Aid step (e.g. basket checkout) */
  initialStep?: number;
}

function resolveInitialStep(
  initialStep: number | undefined,
  initialProjectSlug: string | undefined
): number {
  if (initialStep && initialStep >= 1 && initialStep <= 5) {
    return initialStep;
  }
  if (initialProjectSlug) return 2;
  return 1;
}

export default function DonateClient({
  projects,
  initialProjectSlug,
  initialStep,
}: DonateClientProps) {
  const { items } = useBasket();
  const [donationState, setDonationState] = useState<DonationState>(() => ({
    ...initialDonationState,
    type:
      initialProjectSlug || initialStep === 3
        ? "oneoff"
        : initialDonationState.type,
  }));
  const [customAmount, setCustomAmount] = useState("");
  const [currentStep, setCurrentStep] = useState(() =>
    resolveInitialStep(initialStep, initialProjectSlug)
  );
  const appliedInitialProject = useRef(false);
  const syncedBasket = useRef(false);
  const [payMethod, setPayMethod] = useState("Card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const setDonationType = (type: string) =>
    setDonationState({
      ...initialDonationState,
      type,
    });

  const applyProjectById = (projectId: string) => {
    const project = projects.find((p) => p._id === projectId);
    if (!project) return false;

    setDonationState((prev) => ({
      ...prev,
      projectId,
      projectName: project.name,
      projectSlug: project.slug,
      fund: project.name,
      donationItemKey: "",
      donationItemTitle: "",
      label: "",
      intention: "",
      amount: null,
      additionalFieldValues: {},
    }));
    setCustomAmount("");
    return true;
  };

  const selectProject = (projectId: string) => {
    applyProjectById(projectId);
  };

  useEffect(() => {
    if (syncedBasket.current || items.length === 0) return;
    syncedBasket.current = true;
    setDonationState((prev) => buildDonationStateFromBasket(items, projects, prev));
  }, [items, projects]);

  useEffect(() => {
    if (appliedInitialProject.current || !initialProjectSlug || projects.length === 0) {
      return;
    }

    const project = projects.find((p) => p.slug === initialProjectSlug);
    if (!project) return;

    appliedInitialProject.current = true;
    setDonationState((prev) => ({
      ...prev,
      type: "oneoff",
      projectId: project._id,
      projectName: project.name,
      projectSlug: project.slug,
      fund: project.name,
      donationItemKey: "",
      donationItemTitle: "",
      label: "",
      intention: "",
      amount: null,
      additionalFieldValues: {},
    }));
    setCustomAmount("");
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [initialProjectSlug, projects]);

  const selectDonationItem = (itemKey: string) => {
    const project = projects.find((p) => p._id === donationState.projectId);
    const item = project?.donationSection?.donationItems?.find((i) => i._key === itemKey);
    if (!item) return;

    setDonationState((prev) => ({
      ...prev,
      donationItemKey: itemKey,
      donationItemTitle: item.itemTitle,
      label: item.itemTitle,
      intention: "",
      amount: null,
      additionalFieldValues: {},
    }));
    setCustomAmount("");
  };

  const selectIntention = (intention: string) =>
    setDonationState((prev) => ({ ...prev, intention }));

  const selectAmount = (val: string) => {
    if (val === "other") {
      setDonationState((prev) => ({ ...prev, amount: null }));
      setTimeout(() => document.getElementById("customAmount")?.focus(), 10);
    } else {
      setDonationState((prev) => ({ ...prev, amount: parseFloat(val) }));
      setCustomAmount("");
    }
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setDonationState((prev) => ({ ...prev, amount: parseFloat(val) || 0 }));
  };

  const updateAdditionalField = (label: string, value: string) => {
    setDonationState((prev) => ({
      ...prev,
      additionalFieldValues: { ...prev.additionalFieldValues, [label]: value },
    }));
  };

  const setGiftAid = (giftAid: boolean) =>
    setDonationState((prev) => ({ ...prev, giftAid }));

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
    setDonationState(initialDonationState);
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
              projects={projects}
              customAmount={customAmount}
              selectProject={selectProject}
              selectDonationItem={selectDonationItem}
              selectAmount={selectAmount}
              selectIntention={selectIntention}
              handleCustomAmount={handleCustomAmount}
              updateAdditionalField={updateAdditionalField}
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
