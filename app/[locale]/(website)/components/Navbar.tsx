"use client";

import { useState } from "react";
import Link from "next/link";
import YellowCTA from "./YellowCTA";
import DonationBasketButton from "./DonationBasketButton";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────

interface NavSubItem {
  label: string;
  linkType: "internal" | "external";
  internalLink?: string;
  externalLink?: string;
  isExternal?: boolean;
}

interface NavItem {
  label: string;
  linkType: "internal" | "external";
  internalLink?: string;
  externalLink?: string;
  isExternal?: boolean;
  subItems?: NavSubItem[];
}

interface NavbarProps {
  navItems?: NavItem[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveHref(item: NavItem | NavSubItem): string {
  return item.linkType === "external"
    ? (item.externalLink ?? "#")
    : (item.internalLink ?? "#");
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Navbar({ navItems = [] }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedIdx, setMobileExpandedIdx] = useState<number | null>(null);

  const toggleMobileMenu = () => setMobileOpen((o) => !o);
  const closeMenu = () => {
    setMobileOpen(false);
    setMobileExpandedIdx(null);
  };

  return (
    <>
      <nav className="border-none relative z-1000 h-full bg-purple">
        <div className="max-w-285 lg:mx-auto px-4 flex items-center justify-between h-17.5">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-start cursor-pointer no-underline relative w-25 h-21.25 lg:w-28.75 lg:h-18.75"
            onClick={closeMenu}
          >
            <Image
              src="/logo.svg"
              alt="Human Relief Mission"
              className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
              width={220}
              height={120}
            />
          </Link>

          {/* ── Desktop Nav ──────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-8 list-none h-full">
            {navItems.map((item, idx) => {
              const href = resolveHref(item);
              const hasSubItems = item.subItems && item.subItems.length > 0;

              if (hasSubItems) {
                return (
                  <li key={idx} className="group relative h-full flex items-center">
                    <div className="flex items-center gap-1.5 cursor-pointer py-4">
                      <Link
                        href={href}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noopener noreferrer" : undefined}
                        className="text-[0.875rem] font-semibold text-brand-white no-underline transition-colors duration-300 tracking-wide group-hover:font-bold"
                      >
                        {item.label}
                      </Link>
                      <svg
                        className="w-4 h-4 text-brand-white transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Dropdown */}
                    <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-sm min-w-50 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 list-none">
                      {item.subItems!.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link
                            href={resolveHref(sub)}
                            target={sub.isExternal ? "_blank" : undefined}
                            rel={sub.isExternal ? "noopener noreferrer" : undefined}
                            className="block px-4 py-2 text-sm text-brand-black hover:text-purple hover:bg-purple/5 transition-colors no-underline"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              // Plain link
              return (
                <li key={idx} className="h-full flex items-center">
                  <Link
                    href={href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="text-[0.875rem] font-semibold text-brand-white no-underline cursor-pointer transition-colors duration-300 tracking-wide hover:font-bold"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side: basket + donate + hamburger */}
          <div className="flex items-center gap-3">
            <DonationBasketButton />
            <div>
              <YellowCTA text="Donate Now" href="/donate" />
            </div>
            {/* Hamburger */}
            <div
              className="md:hidden flex flex-col gap-1.25 cursor-pointer p-1 z-50"
              onClick={toggleMobileMenu}
            >
              <span className={`block w-6 h-0.5 bg-brand-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.75" : ""}`} />
              <span className={`block w-6 h-0.5 bg-brand-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-brand-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.75" : ""}`} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ───────────────────────────────────────────────── */}
      <div className={`md:hidden bg-purple transition-all duration-300 ${mobileOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col gap-1 list-none px-8 pt-20 pb-8">
          {navItems.map((item, idx) => {
            const href = resolveHref(item);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = mobileExpandedIdx === idx;

            if (hasSubItems) {
              return (
                <li key={idx}>
                  <button
                    onClick={() => setMobileExpandedIdx(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between py-3 text-brand-white font-medium text-left"
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <ul className="pl-4 flex flex-col gap-2 pb-3 list-none border-l-2 border-white/20 ml-2">
                      {item.subItems!.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link
                            href={resolveHref(sub)}
                            onClick={closeMenu}
                            target={sub.isExternal ? "_blank" : undefined}
                            rel={sub.isExternal ? "noopener noreferrer" : undefined}
                            className="block py-1 text-brand-white/80 text-sm no-underline hover:text-brand-white"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            // Plain link
            return (
              <li key={idx}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="block py-3 text-brand-white no-underline font-medium hover:font-bold"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* Donate always visible in mobile */}
          <li className="mt-4">
            <YellowCTA text="Donate Now" href="/donate" />
          </li>
        </ul>
      </div>
    </>
  );
}