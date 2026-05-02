import GiftAidIcon from "../../icons/GiftAid";
import FundingDiagram from "./FundingDiagram";

export default function DonationPolicySection() {
  return (
    <section className="w-full bg-purple py-12">
      {/* ── Hero banner ─────────────────────────────────────────────── */}
      <div className="bg-purple py-14 px-6 text-center relative overflow-hidden">


        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block text-brand-white text-sm font-semibold tracking-widest uppercase mb-3 rounded-sm bg-purple-light px-4 py-2">
            Our Commitment
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-white leading-tight mb-5">
            100% Donation Policy
          </h1>
          <p className="text-brand-white/90 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Human Relief Mission is aware of the significance of{" "}
            <em className="not-italic font-bold text-brand-white">Amanah</em> as
            well as the accountability and responsibility entrusted to us by
            every donor.
          </p>
        </div>
      </div>

      {/* ── Policy detail card ──────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-sm shadow-lg border border-brand-lgrey p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Icon column */}
            <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-faint">
              <HandHeartIcon className="w-9 h-9 text-purple" />
            </div>

            {/* Text column */}
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold text-purple">
                How We Use Your Donations
              </h2>
              <p className="text-brand-black/80 leading-relaxed text-[1.05rem]">
                Human Relief Mission operates on a{" "}
                <strong className="font-bold">100% Donation Policy</strong>.
                We operate under the direction of the Charity Commission and
                religious teachings to make sure that donations are made in
                accordance with both Islamic and UK charitable regulations.{" "}
                <strong>
                  All donations received are spent solely for what they were
                  intended for.
                </strong>
              </p>
              <p className="text-brand-grey text-sm leading-relaxed">
                Gift Aid, designated donations for administration and funds
                received through recycling clothes are excluded from the 100%
                policy — these streams fund our UK operational costs so your
                charitable donation goes even further.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <ShieldIcon />, label: "Charity Commission Regulated" },
              { icon: <ScaleIcon />, label: "Islamic & UK Law Compliant" },
              { icon: <LockIcon />, label: "Zero Donor Funds on Admin" },
              { icon: <CheckCircleIcon />, label: "Full Transparency & Amanah" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-2 rounded-xl bg-purple-faint p-4 text-center"
              >
                <span className="text-purple w-7 h-7">{badge.icon}</span>
                <span className="text-xs font-semibold text-brand-black leading-tight">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gift Aid explanation ─────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mt-10">
        <div className="rounded-sm border border-brand-lgrey bg-white p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-sm bg-purple-faint">
              <GiftAidIcon className="w-9 h-9 text-purple" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-purple mb-3">
                Gift Aid - Boosting Every Pound You Give
              </h2>
              <p className="text-brand-black/80 leading-relaxed mb-4">
                If you are a UK taxpayer, we can claim{" "}
                <strong className="text-purple">25p for every £1</strong> you
                donate through{" "}
                <span className="italic font-bold">
                  Gift Aid
                </span>{" "}
                — at no extra cost to you. This is tax relief reclaimed from
                HMRC and it goes directly towards covering our UK administration
                costs, meaning your original charitable donation remains{" "}
                <strong>100% intact for the cause</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    value: "+25%",
                    label: "Added to your donation at no cost to you",
                    color: "bg-purple",
                  },
                  {
                    value: "HMRC",
                    label: "Tax relief reclaimed directly from the government",
                    color: "bg-purple-dark",
                  },
                  {
                    value: "100%",
                    label: "Of your original gift reaches the cause",
                    color: "bg-purple-light",
                  },
                ].map((stat) => (
                  <div
                    key={stat.value}
                    className={`${stat.color} rounded-xl p-5 text-center text-brand-white`}
                  >
                    <div className="text-3xl font-extrabold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs leading-snug text-brand-white/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Funding Flow Diagram ─────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mt-10 mb-16">
        <div className="rounded-sm border border-brand-lgrey bg-white p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-purple text-center mb-2">
            How Administration Costs Are Funded
          </h2>
          <p className="text-brand-grey text-center text-sm mb-10">
            Four independent income streams cover all operational costs — so
            donor money never touches admin.
          </p>
          <FundingDiagram />
        </div>
      </div>
    </section>
  );
}

/* ── Small inline SVG icons ─────────────────────────────────────────────── */

function HandHeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 12H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
      <path d="M11 12V9a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
      <path d="M15 10V8a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v5" />
      <path d="M19 11v3a2 2 0 0 1-2 2h0" />
      <path d="M8 12v2" />
      <path d="M7 7c0-1.1.9-2 2-2a2 2 0 0 1 2 2c0 1.3-1.3 2.6-2 3-.7-.4-2-1.7-2-3Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M12 3v18M3 6l9-3 9 3M5 10l-2 5h4L5 10Zm14 0-2 5h4l-2-5ZM3 21h18" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
