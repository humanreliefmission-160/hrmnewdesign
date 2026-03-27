"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div id="page-home" className="page active">
      <section className="hero">
        <div className="hero-circle-1"></div>
        <div className="hero-circle-2"></div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-tag">
              <span className="hero-tag-dot"></span>
              Making a difference worldwide
            </div>
            <h1>
              Helping Humanity
              <br />
              Through <em>Welfare</em>
            </h1>
            <p>
              Human Relief Mission delivers life-saving aid, education, and
              hope to communities in need across the globe. Together, we change
              lives.
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
                <div className="hero-img-bg">🎒</div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "var(--purple)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "0.8rem 1.2rem",
                    textAlign: "center",
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
      </section>

      <div className="impact-ticker">
        <div className="ticker-track">
          <div className="ticker-item">
            <span className="ticker-dot"></span>500,000,000 Hot Meals Served
          </div>
          <div className="ticker-item">
            <span className="ticker-dot"></span>Education for 50,000+ Children
          </div>
          <div className="ticker-item">
            <span className="ticker-dot"></span>Clean Water for 200,000 Families
          </div>
          <div className="ticker-item">
            <span className="ticker-dot"></span>Medical Aid in 45 Countries
          </div>
          <div className="ticker-item">
            <span className="ticker-dot"></span>Emergency Relief Deployed Worldwide
          </div>
          <div className="ticker-item">
            <span className="ticker-dot"></span>500,000,000 Hot Meals Served
          </div>
          <div className="ticker-item">
            <span className="ticker-dot"></span>Education for 50,000+ Children
          </div>
          <div className="ticker-item">
            <span className="ticker-dot"></span>Clean Water for 200,000 Families
          </div>
          <div className="ticker-item">
            <span className="ticker-dot"></span>Medical Aid in 45 Countries
          </div>
          <div className="ticker-item">
            <span className="ticker-dot"></span>Emergency Relief Deployed Worldwide
          </div>
        </div>
      </div>

      <section className="section" style={{ background: "#fff" }}>
        <div className="section-inner">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <div className="section-tag">What We Do</div>
              <h2 className="section-title">Our Projects</h2>
              <p className="section-subtitle">
                From emergency food aid to long-term education, our projects
                create lasting change.
              </p>
            </div>
            <Link href="/donate" className="btn btn-outline-purple">
              Support a Project
            </Link>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-img">
                <div className="project-img-bg">🎒</div>
                <div className="project-img-label">Bags for Students</div>
              </div>
              <div className="project-body">
                <div className="project-category">Education</div>
                <div className="project-title">Bags For Students</div>
                <p className="project-desc">
                  Providing school bags, stationery, and supplies so children
                  can focus on learning and achieving their dreams.
                </p>
              </div>
              <div className="project-footer">
                <div className="progress-wrap">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: "72%" }}></div>
                  </div>
                  <div className="progress-text">£72,450 of £100,000 raised</div>
                </div>
                <div className="project-pct">72%</div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img">
                <div className="project-img-bg">🍲</div>
                <div className="project-img-label">Food Relief</div>
              </div>
              <div className="project-body">
                <div className="project-category">Food Security</div>
                <div className="project-title">Emergency Food Parcels</div>
                <p className="project-desc">
                  Delivering nutritious hot meals and food parcels to families
                  facing hunger across conflict zones and disaster areas.
                </p>
              </div>
              <div className="project-footer">
                <div className="progress-wrap">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: "89%" }}></div>
                  </div>
                  <div className="progress-text">£178,000 of £200,000 raised</div>
                </div>
                <div className="project-pct">89%</div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img">
                <div className="project-img-bg">💧</div>
                <div className="project-img-label">Clean Water</div>
              </div>
              <div className="project-body">
                <div className="project-category">Water &amp; Sanitation</div>
                <div className="project-title">Water For Life</div>
                <p className="project-desc">
                  Building wells, water pumps, and sanitation systems in
                  water-scarce communities across Africa and South Asia.
                </p>
              </div>
              <div className="project-footer">
                <div className="progress-wrap">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: "61%" }}></div>
                  </div>
                  <div className="progress-text">£48,800 of £80,000 raised</div>
                </div>
                <div className="project-pct">61%</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/donate" className="btn btn-yellow">
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      <section className="section-purple">
        <div className="section-inner">
          <div
            className="section-tag"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            Stay Connected
          </div>
          <h2 className="section-title">Keep In Touch</h2>
          <p className="section-subtitle">
            Get updates about our lifesaving work around the world. Join over
            50,000 supporters.
          </p>
          <div className="form-row">
            <input
              className="form-input"
              type="text"
              placeholder="First Name"
              style={{ maxWidth: "200px" }}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Last Name"
              style={{ maxWidth: "200px" }}
            />
          </div>
          <div className="newsletter-form">
            <input
              className="form-input"
              type="email"
              placeholder="Email Address"
              style={{ flex: 1 }}
            />
            <button className="btn btn-yellow">Subscribe</button>
          </div>
        </div>
      </section>

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

      <section
        style={{
          background: "var(--black)",
          padding: "5rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Rubik Dirt', cursive",
              fontSize: "clamp(2rem,4vw,3rem)",
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Be the change you wish
            <br />
            to see in the world
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            Your donation — no matter how small — can transform a life. Start
            today.
          </p>
          <Link
            href="/donate"
            className="btn btn-yellow"
            style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}
          >
            Make a Donation
          </Link>
        </div>
      </section>
    </div>
  );
}
