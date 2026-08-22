"use client";

import { useState } from "react";
import YellowCTA from "../YellowCTA";
import Link from "next/link";
import DynamicIcon from "../DynamicIcon";
import { FaInfoCircle } from "react-icons/fa";
import { useBasket } from "../../context/BasketContext";
import {
  intentionFromZakat,
  resolveSelectedAmount,
} from "../../lib/donation/basketHelpers";

interface DonationAmount {
  _key: string;
  amount: number;
  label?: string;
}

interface AdditionalField {
  label: string;
}

interface DonationItemData {
  _key: string;
  icon?: string;
  itemTitle?: string;
  itemSubtext?: string;
  price?: number;
  contactForPricing?: boolean;
  donationType?: 'one-off' | 'monthly';
  frequency?: string | string[];
  amounts?: DonationAmount[];
  donationItemBody?: any[];
  intentions?: any[];
  additionalFields?: AdditionalField[];
  slug?: string;
}

interface DonationSectionData {
  sectionTag?: string;
  donationTitle?: string;
  donationSubtext?: string;
  donationItems?: DonationItemData[];
}

// ── Single Donation Item View ──────────────────────────────────────────────────
function SingleDonationItemForm({
  item,
  projectSlug,
  projectName,
}: {
  item: DonationItemData;
  projectSlug: string;
  projectName: string;
}) {
  const { addItem } = useBasket();

  const DEFAULT_AMOUNTS = [5, 10, 20, 50];
  const presetAmounts = item.amounts?.length
    ? item.amounts.map((a) => a.amount)
    : DEFAULT_AMOUNTS;

  const [amount, setAmount] = useState<number | null>(
    presetAmounts.length > 1 ? presetAmounts[1] : presetAmounts[0] ?? null
  );
  const [customAmount, setCustomAmount] = useState("");
  const [intention, setIntention] = useState("");

  const intentions = item.intentions?.length
    ? item.intentions.map((i: any) => (typeof i === "string" ? i : i.title))
    : ["Zakat", "Sadaqah", "Lillah", "General"];

  const handleAmountSelect = (val: string) => {
    setAmount(parseFloat(val));
    setCustomAmount("");
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setAmount(parseFloat(val) || 0);
  };

  const getImpactMessage = (amt: number | null) => {
    if (!amt) return null;
    const matched = item.amounts?.find((a) => a.amount === amt);
    if (matched?.label) return matched.label;
    const people = Math.floor(amt / 10);

    return `£${amt} helps provide support for this project.`;
  };

  const isValid = amount !== null && amount > 0 && intention !== "";

  const handleAddToBasket = () => {
    if (!isValid || !item.itemTitle) return;
    addItem({
      projectName,
      projectSlug,
      projectItem: item.itemTitle,
      donationItemKey: item._key,
      donationItemSlug: item.slug,
      amount: amount!,
      intention,
      isZakat: intention.toLowerCase() === "zakat",
      frequency: "oneoff",
    });

    setTimeout(() => {
      document.getElementById("donation-basket-trigger")?.click();
    }, 100);
  };

  return (
    <div className="p-8 md:p-10 shadow-lg shadow-purple/25 bg-brand-white rounded-sm max-w-285 mx-auto text-brand-black w-full">
      {/* Title & Subtext */}
      <div className="mb-6">
        <h3 className="text-2xl sm:text-4xl font-bold text-brand-black mb-2 font-body leading-tight">
          {item.itemTitle}
        </h3>
        {item.itemSubtext && (
          <p className="text-[0.95rem] italic text-brand-grey font-normal">
            {item.itemSubtext}
          </p>
        )}
      </div>

      {/* Amount Selector */}
      <div className="mb-8">
        <h4 className="text-lg font-bold text-brand-black mb-3">
          Choose an amount
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {presetAmounts.map((val) => (
            <button
              key={val}
              onClick={() => handleAmountSelect(String(val))}
              className={`px-4 py-2.5 rounded-sm text-sm font-bold border transition-all duration-200 ${amount === val && customAmount === ""
                ? "bg-purple text-white border-purple"
                : "bg-white text-brand-black border-brand-lgrey hover:border-purple/50"
                }`}
            >
              £{val}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Enter custom amount (£)"
          value={customAmount}
          onChange={handleCustomAmount}
          className="w-full px-4 py-3 border-2 border-purple rounded-sm focus:outline-none font-bold text-purple placeholder:text-purple/50 bg-white mb-3"
        />

        {amount && amount > 0 && (
          <div className="mb-5 bg-purple/5 border border-purple/20 p-3.5 rounded-sm flex items-center gap-2.5">
            <FaInfoCircle className="text-purple text-lg shrink-0" />
            <p className="text-purple font-medium text-sm">
              {getImpactMessage(amount)}
            </p>
          </div>
        )}

        {/* Additional Fields */}
        {item.additionalFields && item.additionalFields.length > 0 && (
          <div className="my-6 space-y-4">
            {item.additionalFields.map((field, idx) => (
              <div key={field.label || idx}>
                <input
                  type="text"
                  placeholder={field.label}
                  className="w-full px-4 py-3 border border-brand-black/25 rounded-sm focus:outline-none font-bold bg-white"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Intention Selector */}
      <div className="mb-8">
        <h4 className="text-lg font-bold text-brand-black mb-3">
          Select intention
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {intentions.map((label: string) => (
            <button
              key={label}
              onClick={() => setIntention(label)}
              className={`px-4 py-2.5 rounded-sm text-sm font-bold border transition-all duration-200 ${intention === label
                ? "bg-purple text-brand-white border-purple"
                : "bg-white text-brand-black border-brand-lgrey hover:border-purple/50"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <YellowCTA
        text="Add to Donation Basket"
        onClick={handleAddToBasket}
        disabled={!isValid}
      />
    </div>
  );
}

// ── Multiple Items Card ───────────────────────────────────────────────────────
function DonationCard({
  item,
  projectSlug,
  projectName,
  stageSlug,
}: {
  item: DonationItemData;
  projectSlug: string;
  projectName: string;
  stageSlug?: string;
}) {
  const { addItem } = useBasket();
  const defaultAmount =
    item.amounts && item.amounts.length > 1
      ? item.amounts[1].amount
      : item.amounts?.[0]?.amount || 10;
  const [selected, setSelected] = useState<number>(defaultAmount);
  const [custom, setCustom] = useState("");
  const [isZakat, setIsZakat] = useState(false);
  const [added, setAdded] = useState(false);

  const effectiveAmount = resolveSelectedAmount(selected, custom);

  const handleAdd = () => {
    if (!effectiveAmount || !item.itemTitle) return;

    addItem({
      projectName,
      projectSlug,
      projectItem: item.itemTitle,
      donationItemKey: item._key,
      donationItemSlug: item.slug,
      amount: effectiveAmount,
      intention: intentionFromZakat(isZakat),
      isZakat,
      frequency: "oneoff",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const amountsToRender = item.amounts
    ? item.amounts.map((a) => a.amount)
    : [5, 10, 20];

  return (
    <div className="shadow-md bg-brand-white rounded-sm border border-gray-100 p-7 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300 justify-between w-full max-w-[23em]">
      <div className="flex gap-4 items-center">
        <div className="bg-purple-faint p-3 rounded-sm">
          <span className="text-4xl">
            <DynamicIcon name={item.icon || ""} size={30} color="#650199" />
          </span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {item.itemTitle}
          </h3>
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
              <h2 className="text-2xl font-bold">£{item.price || 0}</h2>
              <span className="text-[10px] text-brand-white rounded-sm capitalize">
                per {item.itemTitle}
              </span>
            </div>
          )}
        </div>
      </div>

      {item.donationItemBody && (
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
              setSelected(amt);
              setCustom("");
            }}
            className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-all duration-200 ${selected === amt && !custom
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
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            setSelected(0);
          }}
          className="px-3 py-2 rounded-sm text-sm border border-gray-300 w-24 focus:outline-none focus:border-purple/50 focus:ring-2 focus:ring-purple/50"
        />
      </div>

      {/* Zakat Donation Option */}
      <div className="flex gap-2">
        <input
          id={`di-zakat-checkbox-${item._key}`}
          name="zakat"
          type="checkbox"
          checked={isZakat}
          onChange={(e) => setIsZakat(e.target.checked)}
          className="accent-purple cursor-pointer"
        />
        <label
          htmlFor={`di-zakat-checkbox-${item._key}`}
          className="italic text-xs font-medium text-brand-grey"
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
        {item.slug && stageSlug && (
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

// ── Main Section ─────────────────────────────────────────────────────────────
export default function DonationItems({
  data,
  projectSlug,
  projectName,
  stageSlug,
}: {
  data?: DonationSectionData;
  projectSlug: string;
  projectName: string;
  stageSlug?: string;
}) {
  if (!data || !data.donationItems || data.donationItems.length === 0) return null;

  const isSingleItem = data.donationItems.length === 1;

  return (
    <section className="bg-purple-dark py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-285 mx-auto">
        <div className="text-center mb-12">
          {data.sectionTag && (
            <span className="inline-block bg-purple-light/50 text-brand-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-3">
              {data.sectionTag}
            </span>
          )}
          {data.donationTitle && (
            <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-4">
              {data.donationTitle}
            </h2>
          )}
          {data.donationSubtext && (
            <p className="text-brand-white mx-auto text-base">
              {data.donationSubtext}
            </p>
          )}
        </div>

        {isSingleItem ? (
          <SingleDonationItemForm
            item={data.donationItems[0]}
            projectSlug={projectSlug}
            projectName={projectName}
          />
        ) : (
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-6 items-center justify-center">
            {data.donationItems.map((item) => (
              <DonationCard
                key={item._key}
                item={item}
                projectSlug={projectSlug}
                projectName={projectName}
                stageSlug={stageSlug}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
