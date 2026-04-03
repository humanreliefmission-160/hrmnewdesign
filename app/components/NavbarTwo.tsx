import { useState } from "react";

const NAV_ITEMS = [
  { label: "Giving", hasDropdown: true },
  { label: "Get Involved", hasDropdown: true },
  { label: "Our work", hasDropdown: true },
  { label: "Where we work", hasDropdown: true },
  { label: "Who we are", hasDropdown: true },
];

function MosqueIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="4" fill="#650199" />
      <g transform="translate(8, 6)">
        {/* Minaret left */}
        <rect x="2" y="20" width="6" height="22" fill="white" opacity="0.9" />
        <rect x="1" y="16" width="8" height="5" rx="1" fill="white" opacity="0.9" />
        <polygon points="5,8 1,16 9,16" fill="white" opacity="0.9" />
        {/* Minaret right */}
        <rect x="36" y="20" width="6" height="22" fill="white" opacity="0.9" />
        <rect x="35" y="16" width="8" height="5" rx="1" fill="white" opacity="0.9" />
        <polygon points="39,8 35,16 43,16" fill="white" opacity="0.9" />
        {/* Main dome */}
        <ellipse cx="22" cy="18" rx="13" ry="10" fill="white" opacity="0.95" />
        <rect x="9" y="18" width="26" height="24" fill="white" opacity="0.95" />
        {/* Door */}
        <rect x="18" y="28" width="8" height="14" rx="4" fill="#650199" />
        {/* Crescent */}
        <path d="M22 6 Q26 9 22 13 Q28 11 22 6Z" fill="#650199" />
        {/* Windows */}
        <rect x="12" y="22" width="5" height="6" rx="2.5" fill="#650199" opacity="0.8" />
        <rect x="27" y="22" width="5" height="6" rx="2.5" fill="#650199" opacity="0.8" />
      </g>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function BasketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default function NavbarTwo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section
        className="relative w-full min-h-screen flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        {/* Background Image with dark overlay */}
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
                "linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.35) 100%)",
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

        {/* ── NAVBAR ── */}
        <nav className="relative z-20 w-full flex items-center px-0">
          {/* Logo block with purple background */}
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "#650199",
              width: "72px",
              height: "72px",
              minWidth: "72px",
            }}
          >
            <MosqueIcon />
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1 ml-4 flex-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                className="flex items-center text-white text-sm font-medium px-3 py-2 hover:text-gray-200 transition-colors whitespace-nowrap focus:outline-none"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown />}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3 ml-auto pr-5">
            <button className="text-white hover:text-gray-200 transition-colors p-1">
              <SearchIcon />
            </button>
            <button className="text-white hover:text-gray-200 transition-colors p-1">
              <BasketIcon />
            </button>
            {/* Donate button */}
            <button
              className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: "#c0392b",
              }}
              onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#a93226")
              }
              onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#c0392b")
              }
            >
              Donate <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto mr-4 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="relative z-20 md:hidden bg-black bg-opacity-80 px-6 py-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <button key={item.label} className="block w-full text-left text-white text-sm font-medium py-2 border-b border-white border-opacity-10">
                {item.label}
              </button>
            ))}
            <button
              className="mt-3 flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded"
              style={{ backgroundColor: "#c0392b" }}
            >
              Donate <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── HERO CONTENT ── */}
        <div className="relative z-10 flex flex-col justify-end flex-1 px-6 md:px-12 lg:px-16 pb-16 md:pb-20" style={{ minHeight: "calc(100vh - 72px)" }}>
          {/* Slide indicators (dots) */}
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block rounded-full transition-all"
                style={{
                  width: i === 0 ? "10px" : "8px",
                  height: i === 0 ? "10px" : "8px",
                  backgroundColor: i === 0 ? "#ffffff" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>

          {/* Headline */}
          <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl leading-tight max-w-lg mb-6 drop-shadow-lg">
            Zakat is our sacred duty
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary button */}
            <button
              className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg"
              style={{ backgroundColor: "#650199" }}
              onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#4e0178")
              }
              onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#650199")
              }
            >
              Give Zakat now <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary / ghost button */}
            <button className="flex items-center gap-1.5 text-white text-sm font-semibold px-2 py-3 hover:underline underline-offset-2 transition-all focus:outline-none">
              Zakat calculator <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}