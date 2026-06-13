"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../components/PageHeader";
import DonationProgress from "../components/donation/DonationProgress";
import DonationStepType from "../components/donation/DonationStepType";
import DonationStepFundAmount from "../components/donation/DonationStepFundAmount";
import DonationStepGiftAid from "../components/donation/DonationStepGiftAid";
import DonationStepDetails from "../components/donation/DonationStepDetails";
import DonationStepPayment from "../components/donation/DonationStepPayment";
import { DonationState, initialDonationState } from "../components/donation/types";
import type { DonationPortalProject } from "../lib/sanity/donationProjects";
import { useBasket } from "../context/BasketContext";
import { buildDonationStateFromBasket } from "../lib/donation/syncBasketToDonationState";

export const DONATION_SESSION_KEY = "hrm_donation_result";

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
  const router = useRouter();
  const { items, totalAmount: basketTotal, itemCount, clearBasket } = useBasket();
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

  // Lifted from DonationStepDetails so we can read them in completeDonation
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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

    // Build the donation summary to pass to the result pages
    const donatedTotal = itemCount > 0 ? basketTotal : donationState.amount || 0;
    const giftAidAmt = donationState.giftAid ? donatedTotal * 0.25 : 0;

    // Build basket line items for the receipt
    const lineItems =
      itemCount > 0
        ? items.map((item) => ({
          projectName: item.projectName,
          projectItem: item.projectItem,
          intention: item.intention,
          amount: item.amount,
        }))
        : donationState.projectName
          ? [
            {
              projectName: donationState.projectName,
              projectItem: donationState.donationItemTitle || "",
              intention: donationState.intention || "",
              amount: donationState.amount || 0,
            },
          ]
          : [];

    const donationResult = {
      firstName,
      lastName,
      email,
      total: donatedTotal,
      giftAidAmount: giftAidAmt,
      totalWithGiftAid: donatedTotal + giftAidAmt,
      giftAid: donationState.giftAid,
      type: donationState.type,
      lineItems,
      reference: `DON-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      // Simulate success (swap to false to test failure page)
      success: true,
    };

    setTimeout(() => {
      setIsProcessing(false);
      try {
        sessionStorage.setItem(DONATION_SESSION_KEY, JSON.stringify(donationResult));
      } catch { }
      // Clear basket on success
      if (donationResult.success) {
        clearBasket();
        router.push("/donate/donate-success");
      } else {
        router.push("/donate/donate-fail");
      }
    }, 1800);
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
        <DonationProgress currentStep={currentStep} />

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
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
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
      </div>
    </div>
  );
}
