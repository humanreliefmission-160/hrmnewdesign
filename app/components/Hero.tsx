"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-img">
      <div className="hero-overlay">
        <div className="hero-circle-1"></div>
        <div className="hero-circle-2"></div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-tag">
              <span className="hero-tag-dot"></span>
              Helping Humanity Through Welfare
            </div>
            <h1>Bags for Students</h1>
            <p>
              Human Relief Mission delivers life saving aid, education, and hope to communities in need across the globe. Together, we change lives.
            </p>
            <div className="hero-btns">
              <Link href="/donate" className="btn btn-yellow">
                Donate Now
              </Link>
              <Link href="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">500M+</div>
                <div className="hero-stat-label">Meals Delivered</div>
              </div>
              <div>
                <div className="hero-stat-num">45+</div>
                <div className="hero-stat-label">Countries</div>
              </div>
              <div>
                <div className="hero-stat-num">2M+</div>
                <div className="hero-stat-label">Lives Changed</div>
              </div>
            </div>
          </div>
          <div className="hero-image-side">
            <div className="hero-card-wrap">
              <div className="hero-img-placeholder">
                <div className="hero-img-bg">
                  <Image src="/img-placeholder.JPG" alt="img-placeholder" width={550} height={400} loading="eager" />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: "var(--white)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "0.8rem 1.75rem",
                    textAlign: "center",
                    background: "var(--purple-dark)",
                  }}
                >
                  Bags For Students Programme
                </div>
              </div>
              <div className="floating-badge">
                <span>10,000+</span>
                Students Supported
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}