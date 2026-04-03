import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section
      style={{
        background: "var(--purple-dark)",
        padding: "5rem 2rem",
        textAlign: "start",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
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

  )
}