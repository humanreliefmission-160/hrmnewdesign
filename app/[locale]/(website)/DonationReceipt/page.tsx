"use client";

import { useEffect, useState } from "react";
import { DONATION_SESSION_KEY } from "../donate/DonateClient";
import { IoIosCheckmarkCircle } from "react-icons/io";

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

export default function DonationReceiptPage() {
  const [data, setData] = useState<DonationResult | null>(null);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DONATION_SESSION_KEY);
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  const donorName = data ? [data.firstName, data.lastName].filter(Boolean).join(" ") : "—";

  const donationDate = data
    ? new Date(data.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const handleSendEmail = async () => {
    if (!data) return;
    setSending(true);
    setEmailSent(null);
    try {
      const res = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setEmailSent(res.ok);
    } catch {
      setEmailSent(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-white flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <span className="inline-block bg-purple/10 text-purple text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            QA / Dev Tool
          </span>
          <h1 className="text-3xl font-extrabold text-brand-black">Donation Receipt Preview</h1>
          <p className="text-brand-grey text-sm mt-1">
            Reads the last donation from sessionStorage and shows the full receipt summary.
          </p>
        </div>

        {data ? (
          <div className="bg-white rounded-sm shadow-xl overflow-hidden">
            <div className="bg-purple px-8 py-10 text-center">
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <IoIosCheckmarkCircle size={80} fill="#fff" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-1">
                Thank you{donorName !== "—" ? `, ${donorName}` : ""}
              </h2>
              <p className="text-white/70 text-sm">{data.email}</p>
            </div>

            <div className="px-8 py-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-brand-grey text-xs uppercase tracking-wide mb-0.5">Reference</p>
                  <p className="text-purple text-xl font-bold">{data.reference}</p>
                </div>
                <div className="text-right">
                  <p className="text-brand-grey text-xs uppercase tracking-wide mb-0.5">Date</p>
                  <p className="text-brand-black font-semibold text-sm">{donationDate}</p>
                </div>
              </div>

              <hr className="border-brand-lgrey mb-6" />

              <div className="flex flex-col gap-2 mb-4">
                {data.lineItems.length > 0 ? (
                  data.lineItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-end px-3 py-2 bg-brand-white/70 rounded-sm">
                      <div>
                        <p className="text-brand-black font-semibold text-sm">{item.projectName}</p>
                        <p className="text-brand-grey text-xs">
                          {[item.projectItem, item.intention].filter(Boolean).join(" | ")}
                        </p>
                      </div>
                      <p className="text-purple font-bold text-sm">£{fmt(item.amount)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-brand-grey text-sm px-3">No line items</p>
                )}
              </div>

              {data.giftAid && (
                <div className="flex justify-between items-center px-3 py-1.5">
                  <p className="text-brand-black/70 text-sm italic">Gift Aid (+25%)</p>
                  <p className="text-purple font-semibold text-sm">+ £{fmt(data.giftAidAmount)}</p>
                </div>
              )}

              {data.stripeFeeApplied && (
                <div className="flex justify-between items-center px-3 py-1.5">
                  <p className="text-brand-black/60 text-sm">Stripe Processing Fee</p>
                  <p className="text-brand-black/80 font-medium text-sm">+ £{fmt(data.stripeFeeAmount ?? 0)}</p>
                </div>
              )}

              {data.adminFeeApplied && (
                <div className="flex justify-between items-center px-3 py-1.5">
                  <p className="text-brand-black/60 text-sm">Admin / Platform Fee</p>
                  <p className="text-brand-black/80 font-medium text-sm">+ £{fmt(data.adminFeeAmount ?? 0)}</p>
                </div>
              )}

              <hr className="border-brand-lgrey my-4" />

              <div className="flex justify-between items-end px-3">
                <p className="text-brand-black text-xl font-bold">
                  {data.stripeFeeApplied || data.adminFeeApplied ? "Total Charged" : "Total"}
                </p>
                <p className="text-purple text-4xl font-bold">
                  £{fmt(data.totalCharged ?? data.total)}
                </p>
              </div>

              <div className="mt-4 px-3">
                <span className="inline-block bg-purple/10 text-purple text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                  {data.type === "oneoff" || data.type === "one_off" ? "One-off" : data.type}
                </span>
                {data.success ? (
                  <span className="ml-2 inline-block bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Success
                  </span>
                ) : (
                  <span className="ml-2 inline-block bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Failed
                  </span>
                )}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3">
                <button
                  onClick={handleSendEmail}
                  disabled={sending}
                  className="bg-purple text-white px-6 py-3 rounded-sm font-bold text-sm hover:bg-purple-dark transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {sending ? "Sending..." : "Send Confirmation Email"}
                </button>
                {emailSent === true && (
                  <p className="text-green-600 text-sm font-medium">Email sent successfully</p>
                )}
                {emailSent === false && (
                  <p className="text-red-600 text-sm font-medium">Failed to send email — check server logs</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-sm shadow-xl p-10 text-center">
            <p className="text-brand-grey text-sm mb-2">No donation data found in sessionStorage.</p>
            <p className="text-brand-grey text-xs">
              Complete a donation first, then revisit this page to see the receipt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}