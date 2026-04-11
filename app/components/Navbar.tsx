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

          <ul className="hidden md:flex items-center gap-8 list-none">
            <li>
              <Link href="/about" className="text-[0.875rem] font-semibold text-brand-white no-underline cursor-pointer transition-colors duration-500 tracking-wide hover:font-bold">About Us</Link>
            </li>
            <li>
              <Link href="/projects" className="text-[0.875rem] font-semibold text-brand-white no-underline cursor-pointer transition-colors duration-500 tracking-wide hover:font-bold">Projects</Link>
            </li>
            <li>
              <Link href="/about" className="text-[0.875rem] font-semibold text-brand-white no-underline cursor-pointer transition-colors duration-500 tracking-wide hover:font-bold">About</Link>
            </li>
            <li>
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
