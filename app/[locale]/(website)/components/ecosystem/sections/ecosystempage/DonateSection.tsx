"use client";

import { useState } from "react";
import Link from "next/link";
import YellowCTA from "../../../YellowCTA";
import DynamicIcon from "../../../DynamicIcon";
import { useBasket } from "../../../../context/BasketContext";
import {
  intentionFromZakat,
  resolveSelectedAmount,
} from "../../../../lib/donation/basketHelpers";
import type {
  SanityEcosystemStage,
  StageProject,
  StageProjectDonationAmount,
} from "../../data/sanityTypes";

type Props = {
  stage: SanityEcosystemStage;
  stageProjects: StageProject[];
};

// ── Fallback amounts when a project has none configured ──────────────────────
const FALLBACK_AMOUNTS: StageProjectDonationAmount[] = [
  { _key: "a", amount: 10, impactLabel: "" },
  { _key: "b", amount: 25, impactLabel: "" },
  { _key: "c", amount: 50, impactLabel: "" },
];

interface StageDonationItemInfo {
  _key: string;
  icon?: string;
  itemTitle: string;
  itemSubtext?: string;
  price?: number;
  contactForPricing?: boolean;
  slug?: string;
  amounts?: StageProjectDonationAmount[];
  projectName: string;
  projectSlug: string;
  projectIcon?: string;
}

function ProjectDonationCard({ item, stageSlug }: { item: StageDonationItemInfo; stageSlug: string }) {
  const { addItem } = useBasket();

  const heroAmounts =
    item.amounts && item.amounts.length > 0
      ? item.amounts
      : FALLBACK_AMOUNTS;

  const defaultAmount = heroAmounts.length > 1 ? heroAmounts[1].amount : (heroAmounts[0]?.amount ?? 10);

  const [selectedAmount, setSelectedAmount] = useState<number | null>(defaultAmount);
  const [isOtherAmount, setIsOtherAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [isZakat, setIsZakat] = useState(false);
  const [added, setAdded] = useState(false);

  const effectiveAmount = resolveSelectedAmount(
    selectedAmount ?? 0,
    isOtherAmount ? customAmount : ""
  );

  const handleAdd = () => {
    if (!effectiveAmount || !item.itemTitle) return;
    addItem({
      projectName: item.projectName,
      projectSlug: item.projectSlug,
      projectItem: item.itemTitle,
      amount: effectiveAmount,
      intention: intentionFromZakat(isZakat),
      isZakat,
      frequency: "oneoff",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const amountsToRender = heroAmounts.map((a) => a.amount);

  return (
    <div className="shadow-md bg-brand-white rounded-sm border border-gray-100 p-7 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300 justify-between w-full max-w-[23.75em]">
      <div className="flex gap-4 items-center">
        <div className="bg-purple-faint p-3 rounded-sm flex items-center justify-center">
          <span className="text-4xl">
            <DynamicIcon name={item.icon || item.projectIcon || ''} size={30} color="#650199" />
          </span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {item.itemTitle}
          </h3>
          <span className="text-xs text-purple font-semibold">
            {item.projectName}
          </span>
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-row items-center gap-1 bg-purple-dark px-4 py-2 text-brand-white rounded-sm">
          {item.contactForPricing ? (
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Contact Us for Pricing
            </h2>
          ) : (
            <div className="flex items-baseline gap-1">
              <h2 className="text-2xl font-bold">
                £{item.price || 0}
              </h2>
              <span className="text-[10px] text-brand-white rounded-sm capitalize">
                per {item.itemTitle}
              </span>
            </div>
          )}
        </div>
      </div>

      {item.itemSubtext && (
        <div className="text-sm text-brand-black/75 leading-relaxed portable-text space-y-2">
          {item.itemSubtext}
        </div>
      )}

      {/* Amount selector */}
      <div className="flex flex-wrap gap-2 mt-1">
        {amountsToRender.map((amt) => (
          <button
            key={amt}
            onClick={() => {
              setSelectedAmount(amt);
              setIsOtherAmount(false);
              setCustomAmount("");
            }}
            className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-all duration-200 ${selectedAmount === amt && !isOtherAmount
              ? "bg-purple text-white"
              : "bg-white/50 text-brand-black/80 border-brand-lgrey hover:border-purple/50"
              }`}
          >
            £{amt}
          </button>
        ))}
        <input
          type="number"
          min="1"
          placeholder="£ Other"
          value={isOtherAmount ? customAmount : ""}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setIsOtherAmount(true);
            setSelectedAmount(null);
          }}
          className="px-3 py-2 rounded-sm text-sm border border-gray-300 w-24 focus:outline-none focus:border-purple/50 focus:ring-2 focus:ring-purple/50"
        />
      </div>

      {/* Zakat Donation Option */}
      <div className="flex gap-2">
        <input
          id={`eco-zakat-${item._key}`}
          name="zakat"
          type="checkbox"
          checked={isZakat}
          onChange={(e) => setIsZakat(e.target.checked)}
          className="accent-purple cursor-pointer"
        />
        <label
          htmlFor={`eco-zakat-${item._key}`}
          className="italic text-xs font-medium text-brand-grey cursor-pointer"
        >
          I want this to be treated as Zakat
        </label>
      </div>

      <div className="flex flex-col gap-4 justify-between items-left sm:flex sm:justify-between sm:gap-2 mt-4">
        <div>
          <YellowCTA
            text={added ? "Added to basket!" : "Add to Donation Basket"}
            onClick={handleAdd}
            disabled={!effectiveAmount}
          />
        </div>
        {item.slug && (
          <Link
            className="underline text-sm font-semibold text-purple mt-2"
            href={`/ecosystem/${stageSlug}/${item.slug}`}
          >
            Find out more
          </Link>
        )}
      </div>
    </div>
  );
}

// ── Fallback: single stage-level widget (when no projects linked) ─────────────

function StageFallbackDonate({ stage }: { stage: SanityEcosystemStage }) {
  const { addItem } = useBasket();
  const stageName = stage.stageName || stage.title;

  const amounts =
    stage.donationPrices && stage.donationPrices.length > 0
      ? stage.donationPrices.map((p) => p.amount)
      : [10, 25, 50, 100];

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isOtherAmount, setIsOtherAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [isZakat, setIsZakat] = useState(false);
  const [added, setAdded] = useState(false);

  const effectiveAmount = resolveSelectedAmount(
    selectedAmount ?? 0,
    isOtherAmount ? customAmount : ""
  );

  const handleAdd = () => {
    if (!effectiveAmount || !stageName) return;
    addItem({
      projectName: stageName,
      projectSlug: stage.slug.current,
      projectItem: "",
      amount: effectiveAmount,
      intention: intentionFromZakat(isZakat),
      isZakat,
      frequency: "oneoff",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-4">
        Donate to {stageName}
      </h2>
      <p className="text-brand-white/80 max-w-xl mx-auto text-base mb-10">
        Your donation directly supports people in the {stageName} stage of our
        Zakat Transformation Ecosystem. Every pound makes a difference.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {amounts.map((amt) => {
          const isSelected = selectedAmount === amt && !isOtherAmount;
          return (
            <button
              key={amt}
              type="button"
              onClick={() => {
                setSelectedAmount(amt);
                setIsOtherAmount(false);
                setCustomAmount("");
              }}
              className={`border-2 px-6 py-2.5 text-base font-semibold transition-all rounded-[2px] ${isSelected
                ? "border-purple text-white bg-purple"
                : "border-brand-white/40 text-brand-white hover:bg-purple hover:border-purple"
                }`}
            >
              £{amt}
            </button>
          );
        })}

        {isOtherAmount ? (
          <div className="relative flex items-center">
            <span className="absolute left-3 text-brand-white/80 font-bold">£</span>
            <input
              type="number"
              autoFocus
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="border-2 border-brand-white/40 bg-transparent text-brand-white px-4 py-2.5 pl-7 w-32 text-base font-semibold outline-none rounded-[2px] transition-all placeholder:text-brand-white/40 focus:border-brand-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Amount"
            />
            <button
              type="button"
              onClick={() => { setIsOtherAmount(false); setCustomAmount(""); }}
              className="absolute right-2 text-brand-white/50 hover:text-brand-white text-xs"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => { setIsOtherAmount(true); setSelectedAmount(null); }}
            className="border-2 border-brand-white/40 text-brand-white px-6 py-2.5 text-base font-semibold hover:bg-purple hover:border-purple transition-all rounded-[2px]"
          >
            Other Amount
          </button>
        )}
      </div>

      <div className="flex gap-2 justify-center mb-8">
        <input
          id="eco-fallback-zakat"
          type="checkbox"
          checked={isZakat}
          onChange={(e) => setIsZakat(e.target.checked)}
          className="accent-brand-yellow cursor-pointer mt-0.5"
        />
        <label htmlFor="eco-fallback-zakat" className="italic text-xs font-medium text-brand-white cursor-pointer">
          I want this to be treated as Zakat
        </label>
      </div>

      <div className="flex justify-center">
        <YellowCTA
          text={added ? "Added to basket!" : `Donate${effectiveAmount ? ` £${effectiveAmount}` : ""} to ${stageName}`}
          onClick={handleAdd}
          disabled={!effectiveAmount}
        />
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

export default function DonateSection({ stage, stageProjects }: Props) {
  const donationItems = stageProjects.flatMap((project) => {
    const items = project.donationSection?.donationItems || [];
    return items.map((item) => ({
      ...item,
      projectName: project.name,
      projectSlug: project.slug,
      projectIcon: project.cardIcon,
    }));
  });

  const hasItems = donationItems.length > 0;

  return (
    <section className="bg-purple-dark py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-light/50 text-brand-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-3">
            Support This Stage
          </span>
          {hasItems && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-4">
                Donate to a Project
              </h2>
              <p className="text-brand-white/80 max-w-2xl mx-auto text-base">
                Every project below is part of this stage of the Zakat
                Transformation Ecosystem. Your donation goes directly to the
                people who need it most.
              </p>
            </>
          )}
        </div>

        {hasItems ? (
          /* Per-item cards */
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 items-start justify-center">
            {donationItems.map((item) => (
              <ProjectDonationCard key={item._key} item={item as any} stageSlug={stage.slug.current} />
            ))}
          </div>
        ) : (
          /* Stage-level fallback */
          <StageFallbackDonate stage={stage} />
        )}
      </div>
    </section>
  );
}
