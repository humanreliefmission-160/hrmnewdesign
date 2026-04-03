"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-purple text-brand-white/70 py-16 px-4 md:px-8">
      <div className="max-w-[1140px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 py-12 border-b border-brand-white/10">
        <div>
          <div>
            <Link href="/" >
              <Image src="/hhtw.svg" alt="Helping Box" width={200} height={200} />
            </Link>
            <div className="text-[0.875rem] leading-[1.7] my-6">
              Delivering emergency relief, education, and sustainable development
              aid to communities in need across the world since 2016.
            </div>
          </div>
          <div className="flex gap-3">
            <a className="w-9 h-9 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">f</a>
            <a className="w-9 h-9 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">in</a>
            <a className="w-9 h-9 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">yt</a>
            <a className="w-9 h-9 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">𝕏</a>
            <a className="w-9 h-9 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">tt</a>
          </div>
        </div>
        <div>
          <div className="text-brand-white font-bold text-[0.875rem] tracking-widest uppercase mb-6">Quick Links</div>
          <ul className="list-none flex flex-col gap-2.5">
            <li>
              <Link href="/about" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">About Us</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Projects</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Locations</Link>
            </li>
            <li>
              <Link href="/contact" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Contact Us</Link>
            </li>
            <li>
              <Link href="/donate" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Donate</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-brand-white font-bold text-[0.875rem] tracking-widest uppercase mb-6">Our Work</div>
          <ul className="list-none flex flex-col gap-2.5">
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Food Relief</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Education</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Water & Sanitation</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Emergency Aid</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Orphan Support</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-brand-white font-bold text-[0.875rem] tracking-widest uppercase mb-6">Giving</div>
          <ul className="list-none flex flex-col gap-2.5">
            <li>
              <Link href="/donate" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">One-Off Donation</Link>
            </li>
            <li>
              <Link href="/donate" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Monthly Giving</Link>
            </li>
            <li>
              <Link href="/donate" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Zakat</Link>
            </li>
            <li>
              <Link href="/donate" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-yellow">Sadaqah</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1140px] mx-auto pt-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[0.8rem] text-brand-white">Copyright &copy; Human Relief Mission 2026. All Rights Reserved</p>
          <p className="text-[0.8rem] text-brand-white opacity-80">Charity No. 1160380</p>
        </div>
        <Image src="/donation-policy-icon.svg" alt="Helping Box" width={75} height={75} />
      </div>
    </footer>
  );
}

