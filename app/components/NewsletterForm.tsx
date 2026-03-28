"use client";

export default function NewsletterForm() {
  return (
    <section className="section-purple">
      <div className="section-inner">
        <div
          className="section-tag"
          style={{ background: "color-mix(in srgb, var(--white) 15%, transparent)", color: "var(--white)" }}
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
  );
}