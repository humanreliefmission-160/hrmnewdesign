"use client";

import { useState } from "react";
import Link from "next/link";
import YellowCTA from "./YellowCTA";
import DonationBasketButton from "./DonationBasketButton";

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

interface Project {
  name: string;
  slug: string;
}

interface ProjectCategory {
  _id: string;
  name: string;
  projects: Project[];
}

interface NavbarProps {
  navItems?: NavItem[];
  projectCategories?: ProjectCategory[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveHref(item: NavItem | NavSubItem): string {
  return item.linkType === "external"
    ? (item.externalLink ?? "#")
    : (item.internalLink ?? "#");
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Navbar({
  navItems = [],
  projectCategories = [],
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedIdx, setMobileExpandedIdx] = useState<number | null>(null);

  // Filter out categories that have no projects
  const activeCategories = (projectCategories ?? []).filter(
    (cat) => cat.projects && cat.projects.length > 0
  );

  const toggleMobileMenu = () => setMobileOpen((o) => !o);
  const closeMenu = () => {
    setMobileOpen(false);
    setMobileExpandedIdx(null);
  };

  const isProjectsItem = (item: NavItem) =>
    item.internalLink === "/projects" || item.label?.toLowerCase() === "projects";

  return (
    <>
      <nav className="border-none relative z-1000 h-full bg-purple">
        <div className="max-w-[1140px] lg:mx-auto px-4 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-start cursor-pointer no-underline relative w-[90px] h-[70px]"
            onClick={closeMenu}
          >
            <img
              src="/logo.svg"
              alt="Human Relief Mission"
              className="absolute top-0 left-0 h-[110px] w-auto z-1050 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
            />
          </Link>

          {/* ── Desktop Nav ─────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-8 list-none h-full">
            {navItems.map((item, idx) => {
              const href = resolveHref(item);
              const hasProjects = isProjectsItem(item);

              if (hasProjects) {
                // Projects item with mega menu
                return (
                  <li key={idx} className="group h-full flex items-center">
                    <div className="flex items-center gap-2 cursor-pointer py-4">
                      <Link
                        href={href}
                        className="text-[0.875rem] font-semibold text-brand-white no-underline transition-colors duration-500 tracking-wide group-hover:font-bold"
                      >
                        {item.label}
                      </Link>
                      <svg
                        className="w-4 h-4 text-brand-white transition-transform group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Background blur overlay */}
                    <div className="fixed inset-0 top-[70px] bg-brand-black/20 backdrop-blur-[2px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none -z-10" />

                    {/* Mega Menu Sheet */}
                    <div className="absolute left-0 top-[70px] w-full bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto border-t border-gray-100">
                      <div className="relative max-w-[1140px] mx-auto px-4 md:px-8 py-10">

                        {/* Category grid — 4 columns */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 my-8">
                          {activeCategories.map((cat) => (
                            <div key={cat._id} className="flex flex-col gap-3">
                              {/* Category heading with red underline */}
                              <h3 className="text-[1rem] font-bold text-brand-black uppercase pb-1 w-fit">
                                {cat.name}
                              </h3>
                              <ul className="flex flex-col gap-3">
                                {cat.projects.map((project) => (
                                  <li key={project.slug}>
                                    <Link
                                      href={`/projects/${project.slug}`}
                                      className="text-[0.88rem] text-brand-black hover:text-purple transition-colors no-underline"
                                    >
                                      {project.name}
                                    </Link>
                                  </li>
                                ))}
                                {/* {cat.projects.length === 0 && (
                                  <li className="text-[0.8rem] text-gray-400 italic">No projects yet</li>
                                )} */}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* View All Projects button — bottom right */}
                        <div className="flex justify-end mt-2">
                          <Link
                            href="/projects"
                            className="text-purple font-semibold text-sm underline underline-offset-2 hover:text-purple-dark transition-colors"
                          >
                            View All Projects →
                          </Link>
                        </div>

                      </div>
                    </div>
                  </li>
                );
              }

              // Regular nav item (with optional simple sub-item dropdown)
              const hasSubItems = item.subItems && item.subItems.length > 0;
              return (
                <li key={idx} className={`h-full flex items-center ${hasSubItems ? "group relative" : ""}`}>
                  <Link
                    href={href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="text-[0.875rem] font-semibold text-brand-white no-underline cursor-pointer transition-colors duration-500 tracking-wide hover:font-bold"
                  >
                    {item.label}
                  </Link>
                  {hasSubItems && (
                    <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-sm min-w-[180px] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 list-none">
                      {item.subItems!.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link
                            href={resolveHref(sub)}
                            target={sub.isExternal ? "_blank" : undefined}
                            className="block px-4 py-2 text-sm text-brand-black hover:text-purple hover:bg-purple/5 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
              className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1 z-50"
              onClick={toggleMobileMenu}
            >
              <span className={`block w-6 h-[2px] bg-brand-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-6 h-[2px] bg-brand-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-[2px] bg-brand-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      <div className={`md:hidden bg-purple transition-all duration-300 ${mobileOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col gap-1 list-none px-8 pt-20 pb-8">

          {navItems.map((item, idx) => {
            const href = resolveHref(item);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const hasProjects = isProjectsItem(item);
            const isExpanded = mobileExpandedIdx === idx;

            // Items with sub-items or the Projects mega menu get an accordion
            if (hasSubItems || hasProjects) {
              const subLinks: { label: string; href: string }[] = hasProjects
                ? activeCategories.flatMap((cat) =>
                  cat.projects.map((p) => ({ label: p.name, href: `/projects/${p.slug}` }))
                )
                : item.subItems!.map((sub) => ({ label: sub.label, href: resolveHref(sub) }));

              return (
                <li key={idx}>
                  <button
                    onClick={() => setMobileExpandedIdx(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between py-3 text-brand-white font-medium text-left"
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <ul className="pl-4 flex flex-col gap-2 pb-3 list-none border-l-2 border-white/20 ml-2">

                      {subLinks.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link
                            href={sub.href}
                            onClick={closeMenu}
                            className="block py-1 text-brand-white/80 text-sm no-underline hover:text-brand-white"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                      {hasProjects && (
                        <li>
                          <Link
                            href="/projects"
                            onClick={closeMenu}
                            className="block py-1 text-brand-white text-sm font-semibold underline-offset-1"
                          >
                            View All Projects →
                          </Link>
                        </li>
                      )}
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
                  className="block py-3 cursor-pointer text-brand-white no-underline font-medium hover:font-bold"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* Donate button always visible in mobile */}
          <li className="mt-4">
            <YellowCTA text="Donate Now" href="/donate" />
          </li>
        </ul>
      </div>
    </>
  );
}
