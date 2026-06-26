import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import YellowCTA from "./YellowCTA";
import { urlFor } from "@/sanity/lib/image";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ImpactCard {
  category: string | null;
  image: { asset: { _ref: string } } | null;
  impactNumber: string;
  secondaryText: string;
  description?: string;
  pageLink: string;
}

interface LastMonthsImpactData {
  sectionMonth: string;
  impactCards: ImpactCard[];
}

interface Props {
  data?: LastMonthsImpactData | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Return a Sanity CDN URL or fall back to the placeholder. */
function resolveImage(image: ImpactCard["image"]): string {
  if (image?.asset) {
    try {
      return urlFor(image.asset).width(800).height(880).fit("crop").url();
    } catch {
      // fall through to placeholder
    }
  }
  return "/img-placeholder.JPG";
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function LastMonthImpact({ data }: Props) {
  const month = data?.sectionMonth ?? "Last Month";
  const cards = (data?.impactCards ?? []).slice(0, 6);

  // Determine grid columns based on card count
  const colClass =
    cards.length <= 1
      ? "grid-cols-1"
      : cards.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : cards.length === 4
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : cards.length === 5 || cards.length === 6
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : // 3 cards (default)
            "grid-cols-1 sm:grid-cols-3";

  return (
    <section className="bg-white w-full pt-16 pb-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* ── Header Block ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            {/* Section tag */}
            <span className="inline-flex items-center gap-2 text-xs font-bold text-purple tracking-widest uppercase bg-purple-faint px-3 py-1.5 rounded-sm mb-3">
              Our Impact
            </span>

            {/* Main heading */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-black tracking-tight leading-none">
              Last Months
              <br />
              <span className="text-purple font-extrabold">Impact</span>
            </h2>

            {/* Subheading */}
            <p className="text-brand-black/75 text-base mt-4 max-w-md">
              Check out how you helped in{" "}
              <span className="font-bold text-brand-black">{month}</span>. Every
              contribution made a real difference on the ground.
            </p>
          </div>

          {/* Desktop CTA top-right */}
          <div className="hidden sm:block shrink-0">
            <YellowCTA href="/projects" text="View All Projects" />
          </div>
        </div>

        {/* ── Impact Cards ── */}
        {cards.length > 0 ? (
          <div className={`grid ${colClass} gap-3`}>
            {cards.map((card, index) => {
              const imgSrc = resolveImage(card.image);

              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-sm group cursor-pointer"
                  style={{ height: "440px" }}
                >
                  {/* Background Image */}
                  <img
                    src={imgSrc}
                    alt={`${card.impactNumber} ${card.secondaryText}`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Layered gradients for depth */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-black/90 to-transparent opacity-40" />

                  {/* Top: Tag badge */}
                  {card.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple text-brand-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                        {card.category}
                      </span>
                    </div>
                  )}

                  {/* Bottom: Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Big stat */}
                    <div className="flex items-baseline gap-1.5 mb-0.5">
                      <span className="text-white font-bold text-6xl leading-none drop-shadow-xl">
                        {card.impactNumber}
                      </span>
                      <span className="text-brand-white font-semibold text-lg lowercase">
                        {card.secondaryText}
                      </span>
                    </div>

                    {/* Description — fades in on hover */}
                    {card.description && (
                      <p className="text-brand-white/75 text-xs leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                        {card.description}
                      </p>
                    )}

                    {/* Bottom row */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/50">
                      <Link
                        href={card.pageLink}
                        className="text-white text-[11px] font-semibold underline-offset-2 transition-colors uppercase tracking-wide flex items-center gap-2"
                      >
                        See How Your Support Can Help
                        <span>
                          <FaArrowRightLong />
                        </span>
                      </Link>
                      <span className="text-brand-white text-[10px] uppercase tracking-widest">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Empty state — no cards in Sanity yet
          <p className="text-brand-black/40 text-sm italic">
            No impact cards have been added yet.
          </p>
        )}

        {/* Mobile CTA */}
        <div className="sm:block lg:hidden shrink-0 mt-8">
          <YellowCTA href="/projects" text="View All Projects" />
        </div>

      </div>
    </section>
  );
}
