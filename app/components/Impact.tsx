"use client";

import Link from "next/link";

export default function Impact() {
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="section-inner">
        <div className="section-tag">Our Track Record</div>
        <h2 className="section-title">{`Last Year's Impact`}</h2>
        <p className="section-subtitle">
          Every pound donated creates real, measurable change in the lives of
          people who need it most.
        </p>
        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-icon">🍽️</div>
            <div className="impact-num">500M</div>
            <div className="impact-label">Hot Meals Served</div>
          </div>
          <div className="impact-card">
            <div className="impact-icon">🎒</div>
            <div className="impact-num">50K+</div>
            <div className="impact-label">Student Bags Delivered</div>
          </div>
          <div className="impact-card">
            <div className="impact-icon">💧</div>
            <div className="impact-num">200K</div>
            <div className="impact-label">Families with Clean Water</div>
          </div>
          <div className="impact-card">
            <div className="impact-icon">🏥</div>
            <div className="impact-num">150K</div>
            <div className="impact-label">Medical Treatments Given</div>
          </div>
        </div>
        <div style={{ marginTop: "2.5rem" }}>
          <Link href="/donate" className="btn btn-yellow">
            Donate Now
          </Link>
        </div>
      </div>
    </section>
  );
}