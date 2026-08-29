"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import YellowCTA from "../../../(website)/components/YellowCTA";
import { logoutAction } from "../auth-actions";
import type { DonationRow } from "./actions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatFrequency(freq: string) {
  if (!freq) return "—";
  const map: Record<string, string> = {
    one_off: "One-Off",
    monthly: "Monthly",
    "one-off": "One-Off",
    "one_time": "One-Off",
  };
  return map[freq.toLowerCase()] ?? freq;
}

function formatPaymentMethod(method: string | null) {
  if (!method) return "—";
  const map: Record<string, string> = {
    card: "Card",
    stripe: "Card",
    bank_transfer: "Bank Transfer",
    cash: "Cash",
    cheque: "Cheque",
    google_pay: "Google Pay",
    googlepay: "Google Pay",
    apple_pay: "Apple Pay",
    applepay: "Apple Pay",
  };
  const key = method.toLowerCase();
  return map[key] ?? "Other";
}

function formatAddress(d: DonationRow) {
  return [d.addressLine1, d.addressLine2, d.city, d.postcode]
    .filter(Boolean)
    .join(", ");
}

function formatPaymentId(paymentId: string | null) {
  if (!paymentId) return "—";
  return `#${paymentId} - Stripe`;
}

function formatSubscriptionId(subscriptionId: string | null) {
  if (!subscriptionId) return "—";
  const suffix = subscriptionId.slice(-4).toUpperCase();
  return `#${subscriptionId}-S${suffix} - Stripe`;
}

export default function DonationsClient({ donations }: { donations: DonationRow[] }) {
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [giftAidFilter, setGiftAidFilter] = useState("All Gift Aid");

  // Derive unique filter options from real data
  const allProjects = useMemo(() => {
    const projects = Array.from(
      new Set(donations.map((d) => d.projectName).filter(Boolean))
    ) as string[];
    return ["All Projects", ...projects.sort()];
  }, [donations]);

  const allTypes = useMemo(() => {
    const types = Array.from(
      new Set(donations.map((d) => formatFrequency(d.frequency)).filter(Boolean))
    );
    return ["All Types", ...types.sort()];
  }, [donations]);

  const filtered = useMemo(() => {
    return donations.filter((d) => {
      const matchSearch =
        search === "" ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.email.toLowerCase().includes(search.toLowerCase()) ||
        d.reference.toLowerCase().includes(search.toLowerCase()) ||
        (d.paymentId && d.paymentId.toLowerCase().includes(search.toLowerCase())) ||
        (d.subscriptionId && d.subscriptionId.toLowerCase().includes(search.toLowerCase()));
      const matchProject =
        projectFilter === "All Projects" || d.projectName === projectFilter;
      const matchType =
        typeFilter === "All Types" || formatFrequency(d.frequency) === typeFilter;
      const matchGiftAid =
        giftAidFilter === "All Gift Aid" ||
        (giftAidFilter === "Gift Aid Yes" && d.giftAid) ||
        (giftAidFilter === "Gift Aid No" && !d.giftAid);
      return matchSearch && matchProject && matchType && matchGiftAid;
    });
  }, [search, projectFilter, typeFilter, giftAidFilter, donations]);

  const handleExportCSV = () => {
    const headers = [
      "Donation Reference",
      "Name",
      "Email",
      "Phone",
      "Project",
      "Project Item",
      "Amount (GBP)",
      "Frequency",
      "Intention",
      "Gift Aid",
      "Country",
      "Address",
      "Payment ID",
      "Subscription ID",
      "Payment Method",
      "Date Donated",
    ];
    const rows = filtered.map((d) => [
      d.reference,
      d.name,
      d.email,
      d.phone ?? "",
      d.projectName ?? "",
      d.projectItemTitle ?? "",
      `£${d.amount.toFixed(2)}`,
      formatFrequency(d.frequency),
      d.intention ?? "",
      d.giftAid ? "Yes" : "No",
      d.country,
      formatAddress(d),
      d.paymentId ? formatPaymentId(d.paymentId) : "",
      d.subscriptionId ? formatSubscriptionId(d.subscriptionId) : "",
      formatPaymentMethod(d.paymentMethod),
      formatDate(d.createdAt),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "donations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const TABLE_COLS = [
    "Donation Ref #",
    "Donor Name",
    "Email",
    "Phone",
    "Project",
    "Amount",
    "Frequency",
    "Intention",
    "Gift Aid",
    "Country",
    "Address",
    "Payment ID",
    "Subscription ID",
    "Payment Method",
    "Date",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-white text-brand-black font-body">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-6 py-3 bg-purple border border-b-brand-black/25">
        <div className="max-w-285 mx-auto flex items-center justify-between gap-3 w-full">
          <div className="">
            <div>
              <Link href="/" className="cursor-pointer">
                <Image src="/logo-white.svg" alt="Logo" width={50} height={50} />
              </Link>
            </div>
          </div>
          <form action={logoutAction}>
            <YellowCTA text="Logout" />
          </form>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 px-8 py-8 max-w-285 mx-auto w-full">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2 text-brand-black">
            Donor Management
          </h1>
          <p className="text-sm text-brand-grey">
            View and manage all donor information and donations
          </p>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded border border-gray-200 p-4 mb-5">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="flex items-center gap-2 border-gray-200 px-3 py-2 text-sm border rounded bg-white">
                <IoIosSearch className="w-4 h-4 text-brand-black/50 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by name, email, or reference..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="focus:outline-none text-brand-black w-full"
                />
              </div>
            </div>

            {/* Project Filter */}
            <div className="relative">
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded bg-white focus:outline-none cursor-pointer text-brand-black"
              >
                {allProjects.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <FaChevronDown className="w-2 h-2 text-brand-black/50" />
              </div>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded bg-white focus:outline-none cursor-pointer text-brand-black"
              >
                {allTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <FaChevronDown className="w-2 h-2 text-brand-black/50" />
              </div>
            </div>
          </div>

          {/* Second row filters */}
          <div className="flex flex-wrap gap-3 mt-3">
            {/* Gift Aid Filter */}
            <div className="relative">
              <select
                value={giftAidFilter}
                onChange={(e) => setGiftAidFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded bg-white focus:outline-none cursor-pointer text-brand-black"
              >
                {["All Gift Aid", "Gift Aid Yes", "Gift Aid No"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <FaChevronDown className="w-2 h-2 text-brand-black/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Results bar */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-brand-grey">
            Showing 1 to {filtered.length} of {filtered.length} results
          </p>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded bg-purple-dark hover:bg-purple transition-colors text-brand-white"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        </div>

        {/* Mobile: Cards */}
        <div className="lg:hidden space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center py-12 text-sm text-gray-400">No donations found matching your filters.</p>
          ) : (
            filtered.map((donation) => (
              <div
                key={donation.id}
                className="border border-gray-200 bg-white rounded-sm shadow-sm p-4"
              >
                {/* Card header */}
                <div className="flex justify-between items-start pb-3 mb-3 border-b border-gray-100">
                  <div>
                    <div className="font-bold text-lg text-brand-black leading-tight mb-1">{donation.name}</div>
                    <div className="text-sm text-brand-grey">
                      <Link href={`mailto:${donation.email}`} className="text-purple hover:underline">{donation.email}</Link>
                    </div>
                  </div>
                  <div className="text-md font-bold text-brand-white bg-purple px-2 py-1 rounded shrink-0 my-auto">{donation.reference}</div>
                </div>

                {/* Card rows */}
                {[
                  ["Phone", donation.phone ? <Link href={`tel:${donation.phone}`} className="text-purple hover:underline font-semibold">{donation.phone}</Link> : <span className="text-brand-black/40">—</span>],
                  ["Project", donation.projectName ? (
                    <span className="inline-block text-right">
                      {donation.projectItemTitle && <span className="block font-bold text-brand-black">{donation.projectItemTitle}</span>}
                      <span className="text-xs text-brand-black/75">{donation.projectName}</span>
                    </span>
                  ) : <span className="text-brand-black/40 text-xs">—</span>],
                  ["Amount", <span className="font-semibold">£{donation.amount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>],
                  ["Frequency", formatFrequency(donation.frequency) === "Monthly" ? (
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-purple-faint text-brand-white">Monthly</span>
                  ) : (
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-medium bg-purple text-brand-white">{formatFrequency(donation.frequency)}</span>
                  )],
                  ["Intention", donation.intention ? <span className="font-semibold">{donation.intention}</span> : <span className="text-brand-black/40">—</span>],
                  ["Gift Aid", donation.giftAid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-purple-faint text-brand-black">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-brand-white text-brand-black">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      No
                    </span>
                  )],
                  ["Country", donation.country || <span className="text-brand-black/40">—</span>],
                  ["Address", <span className="text-xs font-semibold">{formatAddress(donation) || <span className="text-brand-black/40 font-normal">—</span>}</span>],
                  ["Payment ID", <span className="text-xs font-mono font-semibold">{formatPaymentId(donation.paymentId)}</span>],
                  ["Subscription ID", <span className="text-xs font-mono font-semibold text-purple">{formatSubscriptionId(donation.subscriptionId)}</span>],
                  ["Payment Method", <span className="font-semibold">{formatPaymentMethod(donation.paymentMethod)}</span>],
                  ["Date Donated", <span className="text-xs text-brand-black/70">{formatDate(donation.createdAt)}</span>],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="font-bold text-brand-black text-sm">{label}</span>
                    <span className="text-right ml-4">{value}</span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Desktop: Scrollable Table */}
        <div className="hidden lg:block bg-white rounded border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-225">
              <thead>
                <tr className="border-b border-brand-white">
                  {TABLE_COLS.map((col) => (
                    <th
                      key={col}
                      className="text-left px-4 py-3 text-xs font-semibold whitespace-nowrap text-brand-black bg-purple-faint/50"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={TABLE_COLS.length} className="text-center py-12 text-sm text-gray-400">
                      No donations found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((donation) => (
                    <tr
                      key={donation.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      {/* Reference */}
                      <td className="px-4 py-3 text-md font-bold whitespace-nowrap ">
                        <span className="px-2 py-1 bg-purple text-brand-white rounded-sm">{donation.reference}</span>
                      </td>

                      {/* Donor Name */}
                      <td className="px-4 py-3 font-medium whitespace-nowrap text-brand-black">
                        {donation.name}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Link href={`mailto:${donation.email}`} className="text-purple font-semibold hover:underline">{donation.email}</Link>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3 whitespace-nowrap text-brand-black">
                        {donation.phone ? (
                          <Link href={`tel:${donation.phone}`} className="text-purple hover:underline font-semibold">{donation.phone}</Link>
                        ) : (
                          <span className="text-brand-black/40">—</span>
                        )}
                      </td>

                      {/* Project */}
                      <td className="px-4 py-3">
                        {donation.projectName ? (
                          <span className="inline-block">
                            {donation.projectItemTitle && (
                              <span className="block font-bold text-brand-black mt-0.5">{donation.projectItemTitle}</span>
                            )}
                            <span className="inline-block text-xs text-brand-black/75 mb-1">{donation.projectName}</span>
                          </span>
                        ) : (
                          <span className="text-brand-black/40 text-xs">—</span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-3 font-semibold whitespace-nowrap text-brand-black">
                        £{donation.amount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                      </td>

                      {/* Frequency */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatFrequency(donation.frequency) === "Monthly" ? (
                          <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-purple-faint text-brand-white">Monthly</span>
                        ) : (
                          <span className="inline-block px-2.5 py-1 rounded text-xs font-medium border bg-purple text-brand-white">{formatFrequency(donation.frequency)}</span>
                        )}
                      </td>

                      {/* Intention */}
                      <td className="px-4 py-3 whitespace-nowrap text-brand-black font-semibold">
                        {donation.intention ?? <span className="text-brand-black/40 font-bold">—</span>}
                      </td>

                      {/* Gift Aid */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {donation.giftAid ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-purple-faint text-brand-black">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-brand-white text-brand-black">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            No
                          </span>
                        )}
                      </td>

                      {/* Country */}
                      <td className="px-4 py-3 font-medium whitespace-nowrap text-brand-black">
                        {donation.country || <span className="text-brand-black/40 font-normal">—</span>}
                      </td>

                      {/* Address */}
                      <td className="px-4 py-3 text-brand-black">
                        <span className="font-semibold text-xs">
                          {formatAddress(donation) || <span className="text-brand-black/40 font-normal">—</span>}
                        </span>
                      </td>

                      {/* Payment ID */}
                      <td className="px-4 py-3 whitespace-nowrap text-xs font-mono text-brand-black">
                        {formatPaymentId(donation.paymentId)}
                      </td>

                      {/* Subscription ID */}
                      <td className="px-4 py-3 whitespace-nowrap text-xs font-mono text-purple font-semibold">
                        {formatSubscriptionId(donation.subscriptionId)}
                      </td>

                      {/* Payment Method */}
                      <td className="px-4 py-3 whitespace-nowrap text-brand-black font-semibold">
                        {formatPaymentMethod(donation.paymentMethod)}
                      </td>

                      {/* Date Donated */}
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-brand-black/70">
                        {formatDate(donation.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer summary */}
        <div className="mt-4 flex items-center justify-between text-xs text-brand-black/50">
          <span>
            Total donations shown:{" "}
            <span className="font-semibold text-purple">
              £{filtered.reduce((sum, d) => sum + d.amount, 0).toLocaleString("en-GB", { minimumFractionDigits: 2 })}
            </span>
          </span>
          <span className="text-right">Human Relief Mission | Donor Management &copy; {new Date().getFullYear()}</span>
        </div>
      </main>
    </div>
  );
}
