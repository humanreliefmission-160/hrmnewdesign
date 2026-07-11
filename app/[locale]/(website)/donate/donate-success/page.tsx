"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";
import YellowCTA from "../../components/YellowCTA";
import { DONATION_SESSION_KEY } from "../DonateClient";

interface LineItem {
  projectName: string;
  projectItem: string;
  intention: string;
  amount: number;
}

interface DonationResult {
  firstName: string;
  lastName: string;
  email: string;
  total: number;
  giftAidAmount: number;
  totalWithGiftAid: number;
  giftAid: boolean | null;
  type: string;
  lineItems: LineItem[];
  reference: string;
  date: string;
  success: boolean;
  stripeFeeApplied?: boolean;
  stripeFeeAmount?: number;
  adminFeeApplied?: boolean;
  adminFeeAmount?: number;
  totalCharged?: number;
}

function fmt(value: number) {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function DonationSuccess() {
  const [data, setData] = useState<DonationResult | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DONATION_SESSION_KEY);
      if (raw) {
        const parsed: DonationResult = JSON.parse(raw);
        if (parsed.success) setData(parsed);
      }
    } catch { }
  }, []);

  const donorName = data
    ? [data.firstName, data.lastName].filter(Boolean).join(" ")
    : "";

  const donationDate = data
    ? new Date(data.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        {/* Card */}
        <div className="bg-white rounded-sm shadow-xl overflow-hidden w-full max-w-2xl">
          {/* Purple top banner */}
          <div className="bg-purple px-8 py-10 text-center relative overflow-hidden">
            {/* Checkmark circle */}
            <div className="relative mx-auto mb-5 w-24 h-24 rounded-full bg-brand-white/75 flex items-center justify-center">
              <IoIosCheckmarkCircle size={100} fill="#650199" />
            </div>

            <h1 className="relative text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Thank You{donorName ? `, ${donorName}` : ""}
            </h1>
            <p className="relative text-white/80 text-base font-medium">
              Your donation was successful
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-10">
            {/* Donation summary box */}
            <div className="bg-purple-faint rounded-sm p-6 mb-8 border border-purple/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple/50 text-xs mb-0.5">Donation Reference</p>
                  <p className="text-purple text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    {data?.reference ?? "—"}
                  </p>
                </div>
                <p className="text-brand-black font-semibold">{donationDate}</p>
              </div>
              <hr className="h-0.25 border-t-0 bg-transparent bg-linear-to-r from-transparent via-purple to-transparent dark:via-purple/50 my-6" />

              {/* Line items */}
              <div className="bg-white/75 flex flex-col">
                {data && data.lineItems.length > 0 ? (
                  data.lineItems.map((item, i) => (
                    <div key={i}>
                      <div className="px-3 py-3 rounded-sm">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-brand-black font-semibold text-sm">
                              {item.projectName}
                            </p>
                            <p className="text-brand-black text-sm">
                              {[item.projectItem, item.intention]
                                .filter(Boolean)
                                .join(" | ")}
                            </p>
                          </div>
                          <p className="text-purple font-semibold text-sm">
                            £{fmt(item.amount)}
                          </p>
                        </div>
                      </div>
                      {i < (data?.lineItems.length ?? 0) - 1 && (
                        <hr className="h-0.25 border-t-0 bg-purple/25 mx-3" />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-brand-black/60 text-sm">No items</p>
                )}
              </div>

              {/* Gift Aid line */}
              {data?.giftAid && (
                <div className="flex justify-between items-center mt-4 px-3">
                  <p className="text-brand-black/70 text-sm italic">Gift Aid (+25%)</p>
                  <p className="text-purple font-semibold text-sm">
                    + £{fmt(data.giftAidAmount)}
                  </p>
                </div>
              )}

              {/* Fee breakdown */}
              {data?.stripeFeeApplied && (
                <div className="flex justify-between items-center mt-2 px-3">
                  <p className="text-brand-black/60 text-sm">Stripe Processing Fee</p>
                  <p className="text-brand-black/80 font-medium text-sm">+ £{fmt(data.stripeFeeAmount ?? 0)}</p>
                </div>
              )}
              {data?.adminFeeApplied && (
                <div className="flex justify-between items-center mt-2 px-3">
                  <p className="text-brand-black/60 text-sm">Admin / Platform Fee</p>
                  <p className="text-brand-black/80 font-medium text-sm">+ £{fmt(data.adminFeeAmount ?? 0)}</p>
                </div>
              )}

              <div className="flex justify-between items-end mt-6">
                <p className="text-brand-black text-xl font-bold">
                  {(data?.stripeFeeApplied || data?.adminFeeApplied) ? 'Total Charged' : 'Total'}
                </p>
                <p className="text-purple text-4xl font-bold">
                  £{fmt(data?.totalCharged ?? data?.total ?? 0)}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="text-center mb-8">
              <h2 className="text-brand-black text-xl font-bold mb-3">
                Your generosity makes a difference
              </h2>
              <p className="text-brand-black text-sm leading-relaxed max-w-md mx-auto">
                A confirmation email has been sent
                {data?.email ? ` to ${data.email}` : " to your inbox"} with
                your donation receipt. Your support helps us continue our vital
                work in communities that need it most.
              </p>
              <br />
              <span className="italic text-xs mt-4">
                Check the junk folder if you don&apos;t see your receipt in your inbox
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4">
              <div className="mx-auto">
                <YellowCTA text="Donate Again" href="/donate" />
              </div>
              <Link
                href="/"
                className="flex-1 text-purple font-bold text-center text-sm transition-colors duration-200 underline self-center"
              >
                Back to Homepage
              </Link>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-brand-grey text-xs mb-6">
            {`Registered charity No. `}
            <a href="https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5051625" className="text-purple hover:underline">{process.env.NEXT_PUBLIC_CHARITY_NO ?? process.env.CHARITY_NO ?? "1160380"}</a>
            {` | All donations are securely processed`}
          </p>
        </div>
      </main>
    </div>
  );
}
