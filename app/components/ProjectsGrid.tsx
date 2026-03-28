"use client";

import Link from "next/link";

export default function ProjectsGrid() {
  return (
    <section className="section" style={{ background: "var(--white)" }}>
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
            <div className="section-tag">How To Help</div>
            <h2 className="section-title">Our Projects</h2>
            <p className="section-subtitle">
              From emergency food aid to long term education, our projects create lasting change.
            </p>
          </div>
          <Link href="/donate" className="btn btn-yellow">
            Support a Project
          </Link>
        </div>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-img">
              <img src="/img-placeholder.JPG" alt="Image" />
              <Link href="/infrastructure" className="project-img-label" >Infrastructure</Link>
            </div>
            <div className="project-body">
              <div className="project-title">Bags for Students</div>
              <p className="project-desc">
                Providing school bags, stationery, and supplies so children
                can focus on learning and achieving their dreams.
              </p>
              <div className="project-footer" style={{ marginTop: "1rem" }}>
                <Link href="/donate" className="btn btn-yellow" style={{ marginTop: "1rem" }}>
                  Find out More
                </Link>
                <Link href="/about" className="btn btn-outline-light">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="project-card">
            <div className="project-img">
              <img src="/img-placeholder.JPG" alt="Image" />
              <Link href="/infrastructure" className="project-img-label" >Infrastructure</Link>
            </div>
            <div className="project-body">
              <div className="project-title">Bags for Students</div>
              <p className="project-desc">
                Providing school bags, stationery, and supplies so children
                can focus on learning and achieving their dreams.
              </p>
              <div className="project-footer" style={{ marginTop: "1rem" }}>
                <Link href="/donate" className="btn btn-yellow" style={{ marginTop: "1rem" }}>
                  Find out More
                </Link>
                <Link href="/about" className="btn btn-outline-light">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="project-card">
            <div className="project-img">
              <img src="/img-placeholder.JPG" alt="Image" />
              <Link href="/infrastructure" className="project-img-label" >Infrastructure</Link>
            </div>
            <div className="project-body">
              <div className="project-title">Bags for Students</div>
              <p className="project-desc">
                Providing school bags, stationery, and supplies so children
                can focus on learning and achieving their dreams.
              </p>
              <div className="project-footer" style={{ marginTop: "1rem" }}>
                <Link href="/donate" className="btn btn-yellow" style={{ marginTop: "1rem" }}>
                  Find out More
                </Link>
                <Link href="/about" className="btn btn-outline-light">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >

  );
}