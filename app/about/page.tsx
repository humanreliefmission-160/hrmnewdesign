"use client";

import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div id="page-about" className="page active">
      <div className="about-hero">
        <div className="about-breadcrumb">
          <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
            Home
          </Link>{" "}
          / <span>About Us</span>
        </div>
        <h1>
          About Human Relief
          <br />
          Mission
        </h1>
        <p>
          We are a UK-based international humanitarian charity, delivering
          relief and development aid to communities facing crisis, poverty, and
          inequality.
        </p>
      </div>

      <section className="section" style={{ background: "#fff" }}>
        <div className="section-inner">
          <div className="mission-grid">
            <div>
              <div className="section-tag">Our Story</div>
              <h2 className="section-title">Who We Are</h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--grey)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                Founded in 2003, Human Relief Mission has grown into a trusted
                international charity operating in over 45 countries. We respond
                to emergencies with speed and care, while also investing in
                long-term development programmes that build sustainable futures.
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--grey)",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                Our dedicated team of volunteers and staff are driven by a
                belief that every person — regardless of where they were born —
                deserves dignity, safety, and opportunity.
              </p>
              <Link href="/donate" className="btn btn-purple">
                Support Our Mission
              </Link>
            </div>
            <div className="mission-img">🌍</div>
          </div>
        </div>
      </section>

      <section className="section-purple">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              className="section-tag"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
            >
              Our Numbers
            </div>
            <h2 className="section-title" style={{ color: "#fff" }}>
              {"The Impact We've Made"}
            </h2>
          </div>
          <div className="impact-grid">
            <div
              className="impact-card"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="impact-icon">🌍</div>
              <div className="impact-num" style={{ color: "var(--yellow)" }}>
                45+
              </div>
              <div
                className="impact-label"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Countries
              </div>
            </div>
            <div
              className="impact-card"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="impact-icon">👥</div>
              <div className="impact-num" style={{ color: "var(--yellow)" }}>
                2M+
              </div>
              <div
                className="impact-label"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Beneficiaries
              </div>
            </div>
            <div
              className="impact-card"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="impact-icon">🏗️</div>
              <div className="impact-num" style={{ color: "var(--yellow)" }}>
                500+
              </div>
              <div
                className="impact-label"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Projects Completed
              </div>
            </div>
            <div
              className="impact-card"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="impact-icon">❤️</div>
              <div className="impact-num" style={{ color: "var(--yellow)" }}>
                20+
              </div>
              <div
                className="impact-label"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Years of Service
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <div className="section-tag">What Drives Us</div>
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">
            Every action we take is guided by these principles.
          </p>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <div className="value-title">Compassion</div>
              <p className="value-text">
                We approach every beneficiary with empathy and dignity,
                recognising their humanity above all else.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔍</div>
              <div className="value-title">Transparency</div>
              <p className="value-text">
                We publish detailed annual reports and maintain full
                accountability to our donors and the communities we serve.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <div className="value-title">Rapid Response</div>
              <p className="value-text">
                When disasters strike, we mobilise quickly. Speed saves lives,
                and our teams are always ready to deploy.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <div className="value-title">Sustainability</div>
              <p className="value-text">
                Beyond emergency relief, we build lasting infrastructure and
                skills that empower communities for generations.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌐</div>
              <div className="value-title">Inclusivity</div>
              <p className="value-text">
                We serve all people regardless of religion, ethnicity, gender, or
                nationality. Humanity is our only criterion.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🏆</div>
              <div className="value-title">Excellence</div>
              <p className="value-text">
                We hold ourselves to the highest professional standards because
                the people we serve deserve nothing less.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div className="section-inner">
          <div className="section-tag">The People Behind It</div>
          <h2 className="section-title">Our Leadership Team</h2>
          <p className="section-subtitle">
            Dedicated professionals committed to making a difference every single
            day.
          </p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">👨‍💼</div>
              <div className="team-info">
                <div className="team-name">Ahmed Hassan</div>
                <div className="team-role">Chief Executive Officer</div>
              </div>
            </div>
            <div className="team-card">
              <div className="team-avatar">👩‍💼</div>
              <div className="team-info">
                <div className="team-name">Sarah Mitchell</div>
                <div className="team-role">Director of Operations</div>
              </div>
            </div>
            <div className="team-card">
              <div className="team-avatar">👨‍⚕️</div>
              <div className="team-info">
                <div className="team-name">Dr. Yusuf Ali</div>
                <div className="team-role">Head of Programmes</div>
              </div>
            </div>
            <div className="team-card">
              <div className="team-avatar">👩‍🔬</div>
              <div className="team-info">
                <div className="team-name">Fatima Khan</div>
                <div className="team-role">Head of Fundraising</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
