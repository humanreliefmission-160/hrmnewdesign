"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import YellowCTA from './YellowCTA';
import { useBasket } from '../context/BasketContext';
import {
  intentionFromZakat,
  resolveSelectedAmount,
} from '../lib/donation/basketHelpers';

export type HeroAmount = {
  amount: number;
  impactLabel: string;
};

const FALLBACK_HERO_AMOUNTS: HeroAmount[] = [
  { amount: 1, impactLabel: "" },
  { amount: 5, impactLabel: "" },
  { amount: 10, impactLabel: "" },
];

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  /** Resolved from Sanity `projectCategory` reference (e.g. "Food Aid") */
  projectCategory?: string;
  breadcrumb?: string;
  image?: string;
  display?: boolean;
  heroAmounts?: HeroAmount[];
  projectName?: string;
  projectSlug?: string;
}

export default function ProjectsPageHeader({
  title,
  subtitle,
  projectCategory,
  breadcrumb = "PROJECTS",
  image = "/img-placeholder.JPG", // default placeholder based on screenshot
  display = true,
  heroAmounts,
  projectName,
  projectSlug,
}: PageHeaderProps) {
  const { addItem } = useBasket();
  const categoryLabel = projectCategory ?? breadcrumb;
  const amounts =
    heroAmounts?.length === 3 ? heroAmounts : FALLBACK_HERO_AMOUNTS;

  const isEcosystem = breadcrumb?.toUpperCase() === "ECOSYSTEM";
  const isProject = breadcrumb?.toUpperCase() === "PROJECTS" || !!projectSlug;

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
  ];

  if (isEcosystem) {
    breadcrumbLinks.push({ label: "Ecosystem", href: "/ecosystem" });
    if (typeof title === "string" && title !== "From Receiving Zakat to Paying Zakat") {
      breadcrumbLinks.push({ label: title, href: "" });
    }
  } else if (isProject) {
    breadcrumbLinks.push({ label: "Projects", href: "/projects" });
    if (projectName && projectSlug) {
      breadcrumbLinks.push({ label: projectName, href: `/projects/${projectSlug}` });
    }
  } else {
    breadcrumbLinks.push({ label: categoryLabel, href: "/projects" });
  }

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isOtherAmount, setIsOtherAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [isZakat, setIsZakat] = useState(false);
  const [added, setAdded] = useState(false);

  const selectedHero = amounts.find((a) => a.amount === selectedAmount);
  const effectiveAmount = resolveSelectedAmount(
    selectedAmount ?? 0,
    isOtherAmount ? customAmount : ""
  );

  const resolvedProjectName = projectName || (typeof title === "string" ? title : "");
  const resolvedProjectSlug = projectSlug || "";

  const handleAddToBasket = () => {
    if (!effectiveAmount || !resolvedProjectName) return;

    addItem({
      projectName: resolvedProjectName,
      projectSlug: resolvedProjectSlug,
      projectItem: "",
      amount: effectiveAmount,
      intention: intentionFromZakat(isZakat),
      isZakat,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  const showImpactMessage =
    !isEcosystem && !isOtherAmount && selectedAmount !== null && Boolean(selectedHero?.impactLabel);

  if (!display) return null;

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row bg-purple-dark text-brand-white lg:shadow-xl relative z-10 w-full sm:shadow-none sm:pt-0">
        {/* Left Content Half */}
        <div className="w-full md:w-[50%] flex justify-end">
          {/* Inner container to align with max-w grid, 570px + some padding */}
          <div className="w-full max-w-[600px] px-6 py-12 md:px-8 md:py-24 lg:py-32 xl:pl-0 flex flex-col items-start text-left">
            <div className="text-[0.75rem] font-bold tracking-widest uppercase mb-2 text-brand-white">
              <Link href="/projects" className="hover:text-brand-lgrey/50 transition-colors">
                {categoryLabel}
              </Link>
            </div>

            <h1 className="text-5xl font-display md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide text-left">
              {title}
            </h1>

            <p className="leading-[1.6] text-brand-white/85 text-[1.1rem] max-w-[500px] mb-8 text-left">
              {subtitle}
            </p>

            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 justify-center sm:justify-start">
              {amounts.map((hero) => {
                const isSelected = selectedAmount === hero.amount && !isOtherAmount;

                return (
                  <button
                    key={hero.amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(hero.amount);
                      setIsOtherAmount(false);
                    }}
                    className={`border-2 px-4 py-1.5 md:py-2 text-[0.95rem] font-semibold transition-all rounded-[2px] ${isSelected
                      ? "border-purple text-white bg-purple"
                      : "border-purple-light/50 text-brand-white/90 hover:bg-purple hover:border-purple hover:text-white"
                      }`}
                  >
                    £{hero.amount}
                  </button>
                );
              })}

              {isOtherAmount ? (
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-brand-white/90">
                    <strong>£</strong>
                  </span>
                  <input
                    type="number"
                    autoFocus
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="border-2 border-purple-light bg-transparent text-brand-white/90 px-4 py-1.5 md:py-2 pl-7 w-32 text-[0.95rem] font-semibold outline-none rounded-[2px] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Amount"
                  />
                  <button
                    type="button"
                    onClick={() => setIsOtherAmount(false)}
                    className="absolute right-2 text-brand-white/50 hover:text-brand-white text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsOtherAmount(true);
                    setSelectedAmount(null);
                  }}
                  className="border-2 border-purple-light/50 text-brand-white/90 px-4 py-1.5 md:py-2 text-[0.95rem] font-semibold hover:bg-purple hover:border-purple hover:text-white transition-all rounded-[2px]"
                >
                  Other Amount
                </button>
              )}
            </div>

            {showImpactMessage && selectedHero && (
              <div className="mb-4 w-full max-w-[500px] flex items-start gap-2">
                <p className="text-brand-white bg-purple-light/50 font-medium text-xs leading-relaxed px-2.5 py-0.5 rounded-sm">
                  {selectedHero.impactLabel}
                </p>
              </div>
            )}

            {/* Zakat checkbox */}
            <div className="flex gap-2 mb-6">
              <input
                id="hero-zakat-checkbox"
                name="zakat"
                type="checkbox"
                checked={isZakat}
                onChange={(e) => setIsZakat(e.target.checked)}
                className="accent-purple cursor-pointer mt-0.5 outline-purple-light"
              />
              <label
                htmlFor="hero-zakat-checkbox"
                className="italic text-xs font-medium text-brand-white cursor-pointer"
              >
                I want this to be treated as Zakat
              </label>
            </div>

            <YellowCTA
              text={added ? "Added to basket!" : "Add to Donation Basket"}
              onClick={handleAddToBasket}
              disabled={!effectiveAmount || !resolvedProjectName}
            />
          </div>
        </div>

        {/* Right Image Half */}
        <div className="w-full md:w-[50%] relative min-h-[300px] sm:min-h-[400px] md:min-h-auto flex items-stretch bg-brand-white">
          <img
            src={image}
            alt="Human Relief Mission Project header"
            className="absolute inset-0 w-full h-full object-cover object-center lg:p-0"
          />
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="bg-brand-white border-b border-purple-faint py-3.5">
        <div className="max-w-[1280px] mx-auto md:px-8 flex items-center justify-center md:justify-start gap-2 text-[0.75rem] font-bold tracking-widest uppercase text-purple-faint">
          {breadcrumbLinks.map((link, idx) => {
            const isLast = idx === breadcrumbLinks.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-purple font-normal">&gt;</span>}
                {isLast || !link.href ? (
                  <span className="text-brand-black font-bold">
                    {link.label}
                  </span>
                ) : (
                  <Link href={link.href} className="hover:text-purple transition-colors text-brand-black/60">
                    {link.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}