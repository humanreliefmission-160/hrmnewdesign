"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link href="/" className="nav-logo" onClick={closeMenu}>
            <div className="nav-logo-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.24L20 8.5v7L12 19.76 4 15.5v-7L12 4.24z" />
                <path d="M12 6l-6 3v6l6 3 6-3V9l-6-3zm0 1.68L16.5 10v4L12 16.32 7.5 14V10L12 7.68z" />
              </svg>
            </div>
            <div className="nav-logo-text">
              Human Relief
              <br />
              <span>Mission</span>
            </div>
          </Link>
          <ul className="nav-links">
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
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/donate" className="btn-donate-nav">
                Donate Now
              </Link>
            </li>
          </ul>
          <div className="hamburger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        id="mobileMenu"
        style={{
          display: mobileOpen ? "block" : "none",
          background: "#fff",
          borderBottom: "1px solid var(--light-grey)",
          padding: "1rem 2rem",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <li>
            <Link
              href="/"
              onClick={closeMenu}
              style={{
                fontWeight: 600,
                cursor: "pointer",
                color: "var(--black)",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={closeMenu}
              style={{
                fontWeight: 600,
                cursor: "pointer",
                color: "var(--black)",
                textDecoration: "none",
              }}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={closeMenu}
              style={{
                fontWeight: 600,
                cursor: "pointer",
                color: "var(--black)",
                textDecoration: "none",
              }}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="/donate"
              onClick={closeMenu}
              style={{
                fontWeight: 700,
                color: "var(--purple)",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Donate Now →
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}