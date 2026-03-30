"use client";

import { useState } from "react";
import Link from "next/link";
// import { usePathname } from "next/navigation";

export default function NavbarThree() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // const pathname = usePathname();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <nav className="nav-two">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" onClick={closeMenu}>
            <img src="/logo.svg" alt="Human Relief Mission" className="nav-logo-image" />
          </Link>
          <ul className="nav-links-two">
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
          </ul>

          <div>
            <Link href="/donate" className="btn btn-yellow">
              Donate Now
            </Link>
          </div>

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
          background: "var(--white)",
          borderBottom: "1px solid var(--light-grey)",
          padding: "3.5rem 2rem 2rem 2rem",
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