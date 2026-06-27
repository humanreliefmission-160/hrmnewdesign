"use client";

import { useState } from "react";
import YellowCTA from "../YellowCTA";
import Link from "next/link";
import { PortableText } from "next-sanity";
import DynamicIcon from "../DynamicIcon";
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

interface DonationItemData {
  _key: string;
  icon?: string;
  itemTitle?: string;
  itemSubtext?: string;
  price?: number;
  donationType?: 'one-off' | 'monthly';
  frequency?: string | string[];
  amounts?: DonationAmount[];
  donationItemBody?: any[];
  intentions?: any[];
  slug?: string;
}

interface DonationSectionData {
  sectionTag?: string;
  donationTitle?: string;
  donationSubtext?: string;
  donationItems?: DonationItemData[];
}

function DonationCard({
  item,
  projectSlug,
  projectName,
}: {
  item: DonationItemData;
  projectSlug: string;
  projectName: string;
}) {
  const { addItem } = useBasket();
  const defaultAmount = item.amounts && item.amounts.length > 1 ? item.amounts[1].amount : (item.amounts?.[0]?.amount || 10);
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
      amount: effectiveAmount,
      intention: intentionFromZakat(isZakat),
      isZakat,
      frequency: 'oneoff',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const amountsToRender = item.amounts ? item.amounts.map(a => a.amount) : [5, 10, 20];

  return (
    <div className="shadow-md bg-brand-white rounded-sm border border-gray-100 p-7 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300 justify-between w-full max-w-[23em]">
      <div className="flex gap-4 items-center">
        <div className="bg-purple-faint p-3 rounded-sm">
          <span className="text-4xl">
            <DynamicIcon name={item.icon || ''} size={30} color="#650199" />
          </span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.itemTitle}</h3>
          {/* {item.itemSubtext && <p className="text-xs text-purple mt-1">{item.itemSubtext}</p>} */}
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-row items-end gap-1 bg-purple-dark px-4 py-2 text-brand-white rounded-sm">
          <h2 className="text-2xl font-bold">
            £{item.price || 0}
          </h2>
          <span className="text-[10px] text-brand-white rounded-sm capitalize">
            per {item.itemTitle}
          </span>
          {/* <span className="text-[10px] text-brand-white rounded-sm capitalize">
            {(() => {
              const freq = item.frequency;
              if (Array.isArray(freq)) {
                if (freq.length === 0) return "Monthly";
                return freq.map(f => {
                  if (f === 'one-off') return 'One Off';
                  if (f === 'friday') return 'Friday Giving';
                  return f.charAt(0).toUpperCase() + f.slice(1);
                }).join(', ');
              }
              const f = freq ?? item.donationType ?? 'monthly';
              if (f === 'one-off') return 'One Off';
              if (f === 'friday') return 'Friday Giving';
              return f.charAt(0).toUpperCase() + f.slice(1);
            })()}
          </span> */}
        </div>
      </div>

      {item.donationItemBody && (
        <div className="text-sm text-brand-black/75 leading-relaxed portable-text space-y-2">
          {/* <PortableText value={item.donationItemBody} /> */}
          {item.itemSubtext}
        </div>
      )}

      {/* Amount selector */}
      <div className="flex flex-wrap gap-2 mt-1">
        {amountsToRender.map((amt) => (
          <button
            key={amt}
            onClick={() => { setSelected(amt); setCustom(""); }}
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
          onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
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
        <label htmlFor={`di-zakat-checkbox-${item._key}`} className="italic text-xs font-medium text-brand-grey">I want this to be treated as Zakat</label>
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
            href={`/projects/${projectSlug}/${item.slug}`}
          >
            Find out more
          </Link>
        )}
      </div>
    </div>
  );
}

export default function DonationItems({
  data,
  projectSlug,
  projectName,
}: {
  data?: DonationSectionData;
  projectSlug: string;
  projectName: string;
}) {
  if (!data || !data.donationItems || data.donationItems.length === 0) return null;

  return (
    <section className="bg-purple-dark py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
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
            <p className="text-brand-white max-w-2xl mx-auto text-base">
              {data.donationSubtext}
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-6 items-center justify-center">
          {data.donationItems.map((item) => (
            <DonationCard
              key={item._key}
              item={item}
              projectSlug={projectSlug}
              projectName={projectName}
            />

          ))}
        </div>
      </div>
    </section>
  );
}
