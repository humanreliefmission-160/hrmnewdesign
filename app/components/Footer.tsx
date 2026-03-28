"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div>
            <Link href="/" >
              <Image src="/hhtw.svg" alt="Helping Box" width={200} height={200} />
            </Link>
            <div className="footer-desc">
              Delivering emergency relief, education, and sustainable development
              aid to communities in need across the world since 2016.
            </div>
          </div>
          <div className="footer-socials">
            <a className="social-btn">f</a>
            <a className="social-btn">in</a>
            <a className="social-btn">yt</a>
            <a className="social-btn">𝕏</a>
            <a className="social-btn">tt</a>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Quick Links</div>
          <ul className="footer-links">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/">Projects</Link>
            </li>
            <li>
              <Link href="/">Locations</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/donate">Donate</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Our Work</div>
          <ul className="footer-links">
            <li>
              <Link href="/">Food Relief</Link>
            </li>
            <li>
              <Link href="/">Education</Link>
            </li>
            <li>
              <Link href="/">Water & Sanitation</Link>
            </li>
            <li>
              <Link href="/">Emergency Aid</Link>
            </li>
            <li>
              <Link href="/">Orphan Support</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Giving</div>
          <ul className="footer-links">
            <li>
              <Link href="/donate">One-Off Donation</Link>
            </li>
            <li>
              <Link href="/donate">Monthly Giving</Link>
            </li>
            <li>
              <Link href="/donate">Zakat</Link>
            </li>
            <li>
              <Link href="/donate">Sadaqah</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <p>Copyright &copy; Human Relief Mission 2026. All Rights Reserved</p>
          <p className="footer-charity">Charity No. 1160380</p>
        </div>
        <Image src="/donation-policy-icon.svg" alt="Helping Box" width={75} height={75} />
      </div>
    </footer>
  );
}
