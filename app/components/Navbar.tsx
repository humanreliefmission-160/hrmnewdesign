"use client";

import { useState } from "react";
import Link from "next/link";
import YellowCTA from "./YellowCTA";

export default function NavbarThree() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <nav className="border-none relative z-1000 h-full bg-purple">
        <div className="max-w-[1140px] mx-auto px-4 md:px-8 flex items-center justify-between h-[70px]">
          <Link href="/" className="flex items-start cursor-pointer no-underline relative w-[90px] h-[70px]" onClick={closeMenu}>
            <img src="/logo.svg" alt="Human Relief Mission" className="absolute top-0 left-0 h-[110px] w-auto z-1050 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]" />
          </Link>

          <ul className="hidden md:flex items-center gap-8 list-none h-full">
            <li className="h-full flex items-center">
              <Link href="/about" className="text-[0.875rem] font-semibold text-brand-white no-underline cursor-pointer transition-colors duration-500 tracking-wide hover:font-bold">About Us</Link>
            </li>
            <li className="group h-full flex items-center">
              <div className="flex items-center gap-1 cursor-pointer py-4">
                <Link href="/projects" className="text-[0.875rem] font-semibold text-brand-white no-underline transition-colors duration-500 tracking-wide group-hover:font-bold">Projects</Link>
                <svg className="w-4 h-4 text-brand-white transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Background Blur Overlay effect */}
              <div className="fixed inset-0 top-[70px] bg-brand-black/20 backdrop-blur-[2px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none -z-10"></div>

              {/* Mega Menu Sheet */}
              <div className="absolute left-0 top-[70px] w-full bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto border-t border-gray-100 mt-[px]">
                <div className="relative max-w-[1140px] mx-auto px-4 md:px-8 py-10">
                  <div className="grid grid-cols-4 gap-x-8 gap-y-12 my-12">
                    {/* Row 1 */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[1rem] font-bold text-brand-black tracking-wide uppercase mb-1">Food Aid</h3>
                      <ul className="flex flex-col gap-3">
                        <li><Link href="/projects/hot-meals" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Hot Meals</Link></li>
                        <li><Link href="/projects/fresh-bread" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Fresh Bread</Link></li>
                        <li><Link href="/projects/food-packages" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Food Packages</Link></li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[1rem] font-bold text-brand-black tracking-wide uppercase mb-1">Sponsorships</h3>
                      <ul className="flex flex-col gap-3">
                        <li><Link href="/projects/orphan" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Orphan</Link></li>
                        <li><Link href="/projects/student" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Student</Link></li>
                        <li><Link href="/projects/hifz" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Hifz</Link></li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[1rem] font-bold text-brand-black tracking-wide uppercase mb-1">Healthcare</h3>
                      <ul className="flex flex-col gap-3">
                        <li><Link href="/projects/ambulance-service" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Ambulance Service</Link></li>
                        <li><Link href="/projects/hygiene-kits" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Hygiene Kits</Link></li>
                        <li><Link href="/projects/free-medical-camp" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Free Medical Camp</Link></li>
                        <li><Link href="/projects/blood-donation-awareness" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Blood Donation Awareness</Link></li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[1rem] font-bold text-brand-black tracking-wide uppercase mb-1">Infrastructure</h3>
                      <ul className="flex flex-col gap-3">
                        <li><Link href="/projects/home-construction" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Home Construction</Link></li>
                        <li><Link href="/projects/masjid-construction" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Masjid Construction</Link></li>
                        <li><Link href="/projects/bakery" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Bakery</Link></li>
                        <li><Link href="/projects/green-afghanistan" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Green Afghanistan</Link></li>
                        <li><Link href="/projects/orphanage" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Orphanage</Link></li>
                      </ul>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[1rem] font-bold text-brand-black tracking-wide uppercase mb-1">Water Aid</h3>
                      <ul className="flex flex-col gap-3">
                        <li><Link href="/projects/water-bottles" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Water Bottles</Link></li>
                        <li><Link href="/projects/water-well" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Water Well</Link></li>
                        <li><Link href="/projects/water-tanker" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Water Tanker</Link></li>
                        <li><Link href="/projects/handpumps" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Handpumps</Link></li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[1rem] font-bold text-brand-black tracking-wide uppercase mb-1">Income Generating</h3>
                      <ul className="flex flex-col gap-3">
                        <li><Link href="/projects/income-generation" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Income Generation</Link></li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[1rem] font-bold text-brand-black tracking-wide uppercase mb-1">Islamic Projects</h3>
                      <ul className="flex flex-col gap-3">
                        <li><Link href="/projects/quran-distribution" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Qur'an Distribution</Link></li>
                        <li><Link href="/projects/animal-sacrifice" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Animal Sacrifice</Link></li>
                        <li><Link href="/projects/aqiqah" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Aqiqah</Link></li>
                        <li><Link href="/projects/walima-feast" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Walima Feast</Link></li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3 mt-10">
                      <ul className="flex flex-col gap-3">
                        <li><Link href="/projects/community-projects" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Community Projects</Link></li>
                        <li><Link href="/projects/emergency-relief" className="text-[0.9rem] text-gray-700 hover:text-purple transition-colors">Emergency Relief</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="h-full flex items-center">
              <Link href="/contact" className="text-[0.875rem] font-semibold text-brand-white no-underline cursor-pointer transition-colors duration-500 tracking-wide hover:font-bold">Contact Us</Link>
            </li>
          </ul>

          <div className="md:block">
            <YellowCTA text="Donate Now" href="/donate" />
          </div>

          <div className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1" onClick={toggleMobileMenu}>
            <span className={`block w-6 h-[2px] bg-brand-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}></span>
            <span className={`block w-6 h-[2px] bg-brand-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-[2px] bg-brand-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-purple p-8 transition-all duration-300 ${mobileOpen ? "block" : "hidden"}`}
      >

        <ul className="flex flex-col gap-4 list-none pt-7">
          <li>
            <Link
              href="/"
              onClick={closeMenu}
              className="cursor-pointer text-brand-white no-underline font-medium hover:font-black"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={closeMenu}
              className="cursor-pointer text-brand-white no-underline font-medium hover:font-bold"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="cursor-pointer text-brand-white no-underline font-medium hover:font-bold"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <YellowCTA text="Donate Now" href="/donate" />
          </li>
        </ul>
      </div>
    </>
  );
}
