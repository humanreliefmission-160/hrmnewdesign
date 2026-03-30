"use client";

import NavbarThree from "./NavbarThree";

export default function HeroTwo() {
  return (
    <div className="min-h-screen bg-gray-950">
      <NavbarThree />
      <section
        className="relative w-full min-h-screen flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/img-placeholder.JPG"
            alt="Humanitarian aid worker with beneficiaries at refugee camp"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay — stronger at bottom-left for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.35) 100%)",
            }}
          />
          {/* Left-side gradient for text area */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
            }}
          />
        </div>

        <div className="flex-1 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Hero Section</h1>
            <p className="text-xl">Content goes here...</p>
          </div>
        </div>
      </section>
    </div>
  );
}