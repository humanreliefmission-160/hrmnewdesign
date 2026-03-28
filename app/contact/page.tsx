"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [contactSuccess, setContactSuccess] = useState(false);

  const submitContact = () => {
    setContactSuccess(true);
    setTimeout(() => {
      const el = document.getElementById("contactSuccess");
      if (el) {
        window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div id="page-contact" className="page active">
      <div className="contact-hero">
        <div className="about-breadcrumb">
          <Link href="/" style={{ color: "color-mix(in srgb, var(--white) 50%, transparent)", textDecoration: "none" }}>
            Home
          </Link>{" "}
          / <span>Contact Us</span>
        </div>
        <h1>Get In Touch</h1>
        <p
          style={{
            color: "color-mix(in srgb, var(--white) 80%, transparent)",
            fontSize: "1.05rem",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Have a question, want to volunteer, or need to reach our team?
          {" We'd love to hear from you."}
        </p>
      </div>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <div className="contact-grid">
            <div>
              <div className="contact-info-card">
                <div
                  style={{
                    fontFamily: "'Rubik',sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: "1.5rem",
                    color: "var(--black)",
                  }}
                >
                  Contact Information
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">📍</div>
                  <div>
                    <div className="contact-info-label">Address</div>
                    <div className="contact-info-value">
                      Unit 12, Business Hub<br />
                      Leeds, LS1 2AB, UK
                    </div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">📞</div>
                  <div>
                    <div className="contact-info-label">Phone</div>
                    <div className="contact-info-value">+44 (0)113 000 0000</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">✉️</div>
                  <div>
                    <div className="contact-info-label">Email</div>
                    <div className="contact-info-value">
                      info@humanreliefmission.org
                    </div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">🕒</div>
                  <div>
                    <div className="contact-info-label">Office Hours</div>
                    <div className="contact-info-value">Mon–Fri: 9am – 5pm</div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1.5rem",
                  background: "var(--purple)",
                  borderRadius: "12px",
                  color: "var(--white)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Rubik',sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    marginBottom: "0.6rem",
                  }}
                >
                  Want to Volunteer?
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "color-mix(in srgb, var(--white) 80%, transparent)",
                    lineHeight: 1.6,
                    marginBottom: "1rem",
                  }}
                >
                  Join our global network of volunteers and help us deliver aid
                  to those who need it most.
                </p>
                <button
                  className="btn btn-yellow"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Apply to Volunteer
                </button>
              </div>
            </div>
            <div className="contact-form-card">
              <div
                style={{
                  fontFamily: "'Rubik',sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Send Us a Message
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--grey)",
                  marginBottom: "2rem",
                }}
              >
                We aim to respond within 1–2 business days.
              </p>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input className="form-field" type="text" placeholder="John" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    className="form-field"
                    type="text"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  className="form-field"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  className="form-field"
                  type="tel"
                  placeholder="+44 7700 000000"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Subject *</label>
                <select className="form-field">
                  <option value="">Select a subject...</option>
                  <option>General Enquiry</option>
                  <option>Donation Query</option>
                  <option>Volunteer Application</option>
                  <option>Partnership</option>
                  <option>Media &amp; Press</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-field"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                className="btn btn-purple"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "1rem",
                }}
                onClick={submitContact}
              >
                Send Message →
              </button>
              <div
                className="success-msg"
                id="contactSuccess"
                style={{ display: contactSuccess ? "block" : "none" }}
              >
                ✅ Thank you! Your message has been sent. {"We'll"} be in touch
                shortly.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
