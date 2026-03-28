"use client";

import Link from "next/link";
import Hero from "./components/Hero";
import ProjectsGrid from "./components/ProjectsGrid";
import NewsletterForm from "./components/NewsletterForm";
import Impact from "./components/Impact";

export default function Home() {
  return (
    <div id="page-home" className="page active">

      <Hero />
      <ProjectsGrid />
      <NewsletterForm />
      <Impact />

      <section
        style={{
          background: "var(--purple-dark)",
          padding: "5rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Rubik', cursive",
              fontSize: "clamp(2rem,4vw,3rem)",
              color: "var(--white)",
              marginBottom: "1rem",
            }}
          >
            Be the change you wish
            <br />
            to see in the world
          </h2>
          <p
            style={{
              color: "color-mix(in srgb, var(--white) 65%, transparent)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            Your donation, no matter how small, can transform a life.
            <br />
            Start today.
          </p>
          <Link
            href="/donate"
            className="btn btn-yellow"
          >
            Make a Donation
          </Link>
        </div>
      </section>
    </div>
  );
}
