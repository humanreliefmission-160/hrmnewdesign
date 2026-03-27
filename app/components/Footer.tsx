"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">Human Relief Mission</div>
          <div className="footer-desc">
            Delivering emergency relief, education, and sustainable development
            aid to communities in need across the world since 2003.
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
          <div className="helping-box" style={{ marginTop: "1.5rem" }}>
            HELPING
            <br />
            HUMANITY
            <br />
            THROUGH
            <br />
            WELFARE.
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © Human Relief Mission 2025. All Rights Reserved</p>
        <p className="footer-charity">Charity No. 1160380</p>
      </div>
    </footer>
  );
}
