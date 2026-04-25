"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import YellowCTA from "@/app/(website)/components/YellowCTA";
import { FaChevronDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const donations = [
  {
    id: "DON-2024-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    amount: 500.0,
    project: "Education Fund",
    type: "Monthly",
    intention: "General Support",
    country: "United Kingdom",
    phone: "+44 20 7946 0958",
    address: "123 Oxford Street",
    city: "London",
    postcode: "W1D 1BS",
    giftAid: true,
  },
  {
    id: "DON-2024-002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    amount: 1000.0,
    project: "Healthcare Initiative",
    type: "One-Off",
    intention: "Medical Equipment",
    country: "United States",
    phone: "+1 555 123 4567",
    address: "456 Park Avenue",
    city: "New York",
    postcode: "10022",
    giftAid: false,
  },
  {
    id: "DON-2024-003",
    name: "Emma Williams",
    email: "emma.williams@email.com",
    amount: 250.0,
    project: "Water Projects",
    type: "Monthly",
    intention: "Clean Water Access",
    country: "Australia",
    phone: "+61 2 9876 5432",
    address: "789 George Street",
    city: "Sydney",
    postcode: "2000",
    giftAid: true,
  },
  {
    id: "DON-2024-004",
    name: "James Smith",
    email: "james.smith@email.com",
    amount: 750.0,
    project: "Education Fund",
    type: "One-Off",
    intention: "Scholarships",
    country: "Canada",
    phone: "+1 416 555 9876",
    address: "321 Queen Street",
    city: "Toronto",
    postcode: "M5H 2N2",
    giftAid: false,
  },
  {
    id: "DON-2024-005",
    name: "Olivia Brown",
    email: "olivia.brown@email.com",
    amount: 2000.0,
    project: "Emergency Relief",
    type: "One-Off",
    intention: "Disaster Response",
    country: "United Kingdom",
    phone: "+44 161 496 0777",
    address: "567 Market Street",
    city: "Manchester",
    postcode: "M1 1AD",
    giftAid: true,
  },
  {
    id: "DON-2024-006",
    name: "David Martinez",
    email: "david.martinez@email.com",
    amount: 350.0,
    project: "Community Development",
    type: "Monthly",
    intention: "Infrastructure",
    country: "Spain",
    phone: "+34 91 123 4567",
    address: "890 Gran Via",
    city: "Madrid",
    postcode: "28013",
    giftAid: false,
  },
  {
    id: "DON-2024-007",
    name: "Sophie Anderson",
    email: "sophie.anderson@email.com",
    amount: 500.0,
    project: "Healthcare Initiative",
    type: "Monthly",
    intention: "General Support",
    country: "Sweden",
    phone: "+46 8 123 456 78",
    address: "234 Drottninggatan",
    city: "Stockholm",
    postcode: "111 21",
    giftAid: true,
  },
  {
    id: "DON-2024-008",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    amount: 1500.0,
    project: "Education Fund",
    type: "One-Off",
    intention: "Building Construction",
    country: "United States",
    phone: "+1 415 555 8765",
    address: "678 Market Street",
    city: "San Francisco",
    postcode: "94102",
    giftAid: false,
  },
];

const allProjects = ["All Projects", "Education Fund", "Healthcare Initiative", "Water Projects", "Emergency Relief", "Community Development"];
const allTypes = ["All Types", "Monthly", "One-Off"];
const allGiftAid = ["All Gift Aid", "Gift Aid Yes", "Gift Aid No"];
const allIntention = ["All Intention", "General Support", "Infrastructure", "Disaster Response", "Building Construction"];
const allCountry = ["All Country", "United Kingdom", "United States", "Pakistan", "Spain", "Sweden"];

export default function Donations() {
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [giftAidFilter, setGiftAidFilter] = useState("All Gift Aid");

  const filtered = useMemo(() => {
    return donations.filter((d) => {
      const matchSearch =
        search === "" ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.email.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase());
      const matchProject = projectFilter === "All Projects" || d.project === projectFilter;
      const matchType = typeFilter === "All Types" || d.type === typeFilter;
      const matchGiftAid =
        giftAidFilter === "All Gift Aid" ||
        (giftAidFilter === "Gift Aid Yes" && d.giftAid) ||
        (giftAidFilter === "Gift Aid No" && !d.giftAid);
      return matchSearch && matchProject && matchType && matchGiftAid;
    });
  }, [search, projectFilter, typeFilter, giftAidFilter]);

  const handleExportCSV = () => {
    const headers = ["Donation ID", "Donor Name", "Email", "Amount", "Project", "Type", "Intention", "Country", "Phone", "Address", "City", "Postcode", "Gift Aid"];
    const rows = filtered.map((d) => [
      d.id, d.name, d.email, `£${d.amount.toFixed(2)}`, d.project, d.type, d.intention, d.country, d.phone, d.address, d.city, d.postcode, d.giftAid ? "Yes" : "No",
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "donations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-white text-brand-black font-body">
      {/* Top Nav */}
      <nav
        className="flex items-center justify-between px-6 py-3 bg-purple border border-b-brand-black/25"

      >
        <div className="flex items-center gap-3">
          <div>
            <Link href="/" className="cursor-pointer">
              <Image src="/logo-white.svg" alt="Logo" width={50} height={50} />
            </Link>
          </div>
        </div>

        <YellowCTA
          href="#"
          text="Logout"
        />
      </nav>

      {/* Main content */}
      <main className="flex-1 px-8 py-8 max-w-screen-2xl mx-auto w-full">
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
              <div className="flex items-center pointer-events-none gap-2 border-gray-200 px-3 py-2 text-sm border rounded bg-white">
                <IoIosSearch className="w-4 h-4 text-brand-black/50" />
                <input
                  type="text"
                  placeholder="Search by name, email, or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="focus:outline-none focus:ring-1 focus:border-gray-400 text-brand-black"
                />
              </div>
            </div>

            {/* Project Filter */}
            <div className="relative">
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-1 focus:border-gray-400 cursor-pointer text-brand-black"
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
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-1 focus:border-gray-400 cursor-pointer text-brand-black"
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
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-1 focus:border-gray-400 cursor-pointer text-brand-black"
              >
                {allGiftAid.map((g) => (
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
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 border border-brand-white rounded bg-brand-white hover:bg-brand-white transition-colors text-brand-black"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="lg:bg-brand-white lg:rounded lg:border lg:border-brand-white lg:overflow-hidden">
          <div className="overflow-x-auto lg:overflow-visible">
            <table className="w-full text-sm block lg:table lg:min-w-[1100px]">
              <thead className="hidden lg:table-header-group">
                <tr className="border-b border-brand-white">
                  {[
                    "Donation ID",
                    "Donor Name",
                    "Email",
                    "Amount",
                    "Project",
                    "Frequency",
                    "Intention",
                    "Gift Aid",
                    "Country",
                    "Phone",
                    "Address",
                    "City",
                    "Postcode",
                  ].map((col) => (
                    <th
                      key={col}
                      className="text-left px-4 py-3 text-xs font-semibold whitespace-nowrap text-brand-black bg-purple-faint/50"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="block lg:table-row-group">
                {filtered.length === 0 ? (
                  <tr className="block lg:table-row">
                    <td colSpan={13} className="block lg:table-cell text-center py-12 text-sm text-gray-400">
                      No donations found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((donation) => (
                    <tr
                      key={donation.id}
                      className="block lg:table-row border border-gray-200 lg:border-b lg:border-x-0 lg:border-t-0 lg:border-gray-100 hover:bg-gray-50 transition-colors mb-4 lg:mb-0 p-4 lg:p-0 bg-white rounded-sm lg:rounded-none shadow-sm lg:shadow-none"
                    >
                      {/* Mobile Combined: Name, Email, ID */}
                      <td className="block lg:hidden pb-3 mb-3 border-b border-gray-100">
                        <div className="flex justify-between items-center align-bottom ">
                          <div>
                            <div className="font-bold text-lg text-brand-black leading-tight mb-1">{donation.name}</div>
                            <div className="text-sm text-brand-grey">
                              <Link href={`mailto:${donation.email}`} className="text-purple hover:underline">{donation.email}</Link>
                            </div>
                          </div>
                          <div className="text-xs font-bold text-brand-black bg-brand-lgrey px-2 py-1 rounded">{donation.id}</div>
                        </div>
                      </td>

                      {/* Desktop: Donation ID */}
                      <td className="hidden lg:table-cell lg:px-4 lg:py-3 font-medium text-xs lg:whitespace-nowrap text-brand-black border-b border-gray-100 lg:border-none">
                        {donation.id}
                      </td>

                      {/* Desktop: Donor Name */}
                      <td className="hidden lg:table-cell lg:px-4 lg:py-3 font-medium lg:whitespace-nowrap text-brand-black border-b border-gray-100 lg:border-none">
                        {donation.name}
                      </td>

                      {/* Desktop: Email */}
                      <td className="hidden lg:table-cell lg:px-4 lg:py-3 lg:whitespace-nowrap text-brand-grey border-b border-gray-100 lg:border-none">
                        <Link href={`mailto:${donation.email}`} className="text-purple font-semibold hover:underline">{donation.email}</Link>
                      </td>

                      {/* Amount */}
                      <td className="flex lg:table-cell justify-between items-center lg:px-4 lg:py-3 py-2 border-b-[0.5px] lg:border-none font-semibold lg:whitespace-nowrap text-brand-black">
                        <span className="lg:hidden font-bold text-brand-black text-sm">Amount</span>
                        <span className="text-right lg:text-left">£{donation.amount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
                      </td>

                      {/* Project */}
                      <td className="flex lg:table-cell justify-between items-center lg:px-4 lg:py-3 py-2 border-b-[0.5px] lg:border-none lg:whitespace-nowrap">
                        <span className="lg:hidden font-bold text-brand-black text-sm">Project</span>
                        <span
                          className="inline-block px-2.5 py-1 rounded text-xs font-medium border text-right lg:text-left bg-purple-light/90 text-brand-white">
                          {donation.project}
                        </span>
                      </td>

                      {/* Frequency */}
                      <td className="flex lg:table-cell justify-between items-center lg:px-4 lg:py-3 py-2 border-b-[0.5px] lg:border-none lg:whitespace-nowrap">
                        <span className="lg:hidden font-bold text-brand-black text-sm">Frequency</span>
                        <span className="text-right lg:text-left">
                          {donation.type === "Monthly" ? (
                            <span
                              className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-purple-dark text-brand-white"
                            >
                              Monthly
                            </span>
                          ) : (
                            <span
                              className="inline-block px-2.5 py-1 rounded text-xs font-medium border bg-white text-gray-700 border-gray-300"
                            >
                              One-Off
                            </span>
                          )}
                        </span>
                      </td>

                      {/* Intention */}
                      <td className="flex lg:table-cell justify-between items-center lg:px-4 lg:py-3 py-2 border-b-[0.5px] lg:border-none lg:whitespace-nowrap">
                        <span className="lg:hidden font-bold text-brand-black text-sm">Intention</span>
                        <span className="text-right lg:text-left text-brand-black font-semibold">{donation.intention}</span>
                      </td>

                      {/* Gift Aid */}
                      <td className="flex lg:table-cell justify-between items-center lg:px-4 lg:py-3 py-2 border-b-[0.5px] lg:border-none lg:whitespace-nowrap">
                        <span className="lg:hidden font-bold text-brand-black text-sm">Gift Aid</span>
                        <span className="text-right lg:text-left">
                          {donation.giftAid ? (
                            <span
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-purple-faint text-brand-black">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Yes
                            </span>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-brand-white text-brand-black">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                              No
                            </span>
                          )}
                        </span>
                      </td>

                      {/* Country */}
                      <td className="flex lg:table-cell justify-between items-center lg:px-4 lg:py-3 py-2 border-b-[0.5px] lg:border-none font-medium lg:whitespace-nowrap text-brand-black">
                        <span className="lg:hidden font-bold text-brand-black text-sm">Country</span>
                        <span className="text-right lg:text-left">{donation.country}</span>
                      </td>

                      {/* Phone */}
                      <td className="flex lg:table-cell justify-between items-center lg:px-4 lg:py-3 py-2 border-b-[0.5px] lg:border-none lg:whitespace-nowrap text-brand-black">
                        <span className="lg:hidden font-bold text-brand-black text-sm">Phone</span>
                        <span className="text-right lg:text-left">
                          <Link href={`tel:${donation.phone}`} className="text-purple hover:underline font-semibold">
                            {donation.phone}
                          </Link>
                        </span>
                      </td>

                      {/* Address */}
                      <td className="flex lg:table-cell justify-between items-center lg:px-4 lg:py-3 py-2 border-b-[0.5px] lg:border-none lg:whitespace-nowrap text-brand-black">
                        <span className="lg:hidden font-bold text-brand-black text-sm">Address</span>
                        <span className="text-right lg:text-left font-semibold">{donation.address}</span>
                      </td>

                      {/* City */}
                      <td className="flex lg:table-cell justify-between items-center lg:px-4 lg:py-3 py-2 border-b-[0.5px] lg:border-none lg:whitespace-nowrap text-brand-black">
                        <span className="lg:hidden font-bold text-brand-black text-sm">City</span>
                        <span className="text-right lg:text-left font-semibold">{donation.city}</span>
                      </td>

                      {/* Postcode */}
                      <td className="flex lg:table-cell justify-between items-center lg:px-4 lg:py-3 py-2 lg:border-none lg:whitespace-nowrap text-brand-black">
                        <span className="lg:hidden font-bold text-brand-black text-sm">Postcode</span>
                        <span className="text-right lg:text-left font-semibold">{donation.postcode}</span>
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