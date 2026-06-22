"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosCloseCircle } from "react-icons/io";
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
}

function fmt(value: number) {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function DonationFail() {
  const [data, setData] = useState<DonationResult | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DONATION_SESSION_KEY);
      if (raw) {
        const parsed: DonationResult = JSON.parse(raw);
        // Show on fail page even if success=true (they may have been redirected here)
        setData(parsed);
      }
    } catch { }
  }, []);

  const failDate = data
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
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white rounded-sm shadow-xl overflow-hidden">
            {/* Red-tinted top banner */}
            <div className="px-8 py-10 text-center relative overflow-hidden bg-[#B60000]">
              {/* X circle */}
              <div className="relative mx-auto mb-5 w-24 h-24 rounded-full bg-brand-white/50 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <IoIosCloseCircle size={100} fill="#B60000" />
                </div>
              </div>

              <h1 className="relative text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                Payment Failed
              </h1>
              <p className="relative text-white/80 text-base font-medium">
                We were unable to process your donation
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-10">
              {/* Error info box */}
              <div className="rounded-sm p-6 mb-8 border border-[#B60000]/15 bg-[#b60000]/5">
                <p className="text-brand-black font-bold mb-1 text-sm">What went wrong?</p>
                <p className="text-brand-grey text-sm leading-relaxed">
                  Your payment could not be completed. This may be due to
                  insufficient funds, an incorrect card number, or your bank
                  declining the transaction.{" "}
                  <strong className="text-brand-black">
                    No money has been taken from your account.
                  </strong>
                </p>
              </div>

              {/* Attempted summary */}
              <div className="bg-brand-white rounded-sm p-6 mb-8 border border-brand-lgrey text-center">
                <p className="text-brand-black text-xs font-bold uppercase mb-4">
                  Attempted Donation
                </p>
                <div>
                  <p className="text-brand-grey text-sm mb-1">Amount</p>
                  <p className="text-brand-black text-4xl font-bold">
                    £{fmt(data?.total ?? 0)}
                  </p>
                </div>

                {data?.reference && (
                  <div className="mt-4 pt-4 border-t border-brand-lgrey/50">
                    <p className="text-brand-grey text-xs mb-1">Attempt Reference</p>
                    <p className="text-brand-black text-sm font-bold tracking-tight">
                      {data.reference}
                    </p>
                  </div>
                )}

                {/* Line items */}
                <div className="flex flex-col gap-2 mt-4 bg-white/75 text-center">
                  {data && data.lineItems.length > 0 ? (
                    data.lineItems.map((item, i) => (
                      <div>
                        <div key={i} className="px-3 py-3 rounded-sm">
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
                            <p className="text-[#B60000] font-semibold text-sm">
                              £{fmt(item.amount)}
                            </p>
                          </div>
                        </div>
                        {i < (data?.lineItems.length ?? 0) - 1 && (
                          <hr className="h-0.25 border-t-0 bg-[#B60000]/25 mt-2 mx-3" />
                        )}
                      </div>
                    ))
                  ) : null}
                </div>

                <div className="flex items-center gap-2 mt-6 align-center justify-center">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: "rgba(185,28,28,0.1)", color: "#b91c1c" }}
                  >
                    Payment declined on <span className="text-[#B60000]">{failDate}</span>
                  </div>
                </div>
              </div>

              {/* Common reasons */}
              <div className="mb-1 rounded-sm p-6 border border-[#B60000]/15 bg-[#b60000]/5">
                <h3 className="text-brand-black font-bold text-sm align-center justify-center text-center mb-3">
                  Common reasons for failure:
                </h3>
                <ul className="space-y-2">
                  {[
                    "Insufficient funds in your account",
                    "Incorrect card details entered",
                    "Card expired or not activated for online payments",
                    "Bank security block on the transaction",
                  ].map((reason, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-brand-black/75 text-sm align-center justify-center text-center"
                    >
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 mt-10">
                <div className="mx-auto">
                  <YellowCTA text="Try Again" href="/donate?step=5" />
                </div>
                <Link
                  href="/"
                  className="text-[#B60000] font-bold underline text-center text-sm self-center"
                >
                  Return to Homepage
                </Link>
              </div>

              {/* Support */}
              <div className="mt-6 p-4 bg-[#B60000]/5 rounded-sm border border-[#B60000]/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-brand-black font-semibold text-sm">Need help?</p>
                  <p className="text-brand-grey text-xs mt-0.5">
                    Contact our support team and we&apos;ll assist you.
                  </p>
                </div>
                <a
                  href="mailto:info@humanreliefmission.com"
                  className="shrink-0 bg-[#B60000] hover:opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-sm transition-opacity"
                >
                  Get Support
                </a>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-brand-grey text-xs mt-6">
            {`Registered charity No. `}
            <a href="https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5051625" className="text-purple hover:underline">{process.env.NEXT_PUBLIC_CHARITY_NO ?? process.env.CHARITY_NO ?? "1160380"}</a>
            {` | All donations are securely processed`}
          </p>
        </div>
      </main>
    </div>
  );
}
