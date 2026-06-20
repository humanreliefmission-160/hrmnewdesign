import { MdChatBubble } from "react-icons/md";
import { ecosystemStages } from "../ecosystem/data/ecosystemData";
import Link from "next/link";
import YellowCTA from "../YellowCTA";
import DynamicIcon from "../DynamicIcon";

// ── Types ────────────────────────────────────────────────────────────────────

/** Matches sanity/schemaTypes/objects/ecosystemCardRef.ts */
interface EcosystemCard {
  _key: string;
  icon?: string;
  cardTitle?: string;
  customSummary?: string;
}

/** Matches sanity/schemaTypes/objects/ecosystemQuoteCard.ts */
interface QuoteCard {
  quote?: string;
  reference?: string;
}

interface CallToAction {
  title?: string;
  body?: string;
  text?: string;
}

interface EcosystemStageRef {
  title?: string;
  slug?: { current?: string };
}

/** Matches project.ts → ecosystemSection */
interface EcosystemSection {
  title?: string;
  bodyText?: any[];
  stage?: EcosystemStageRef;
  ecosystemCards?: EcosystemCard[];
  quoteCard?: QuoteCard;
  callToAction?: CallToAction;
}

/** Still accepted for the section heading subtext (from benefits.subtext) */
interface BenefitsData {
  title?: string;
  subtext?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function HowItHelps({
  data,
  ecosystemSection,
}: {
  data?: BenefitsData;
  ecosystemSection?: EcosystemSection;
}) {
  const cards = ecosystemSection?.ecosystemCards ?? [];
  const quoteCard = ecosystemSection?.quoteCard;
  const cta = ecosystemSection?.callToAction;
  const stage = ecosystemSection?.stage;
  const stageSlug = stage?.slug?.current;

  return (
    <section className="bg-brand-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-3">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            {ecosystemSection?.title ?? data?.title ?? "How the Project Helps Beneficiaries"}
          </h2>
          <p className="text-brand-black max-w-2xl mx-auto text-base">
            {data?.subtext ??
              "From identification to long-term integration, here's exactly how your donation creates real, sustained change in the lives of people who need it most."}
          </p>

          {/* Stage link — only rendered if a stage is set in Sanity */}
          {stageSlug && (
            <div className="flex justify-center mt-4">
              <Link
                href={`/ecosystem/${stageSlug}`}
                className="text-brand-white bg-purple px-6 py-2 hover:bg-purple-dark font-bold text-sm rounded-sm transition-all self-center"
              >
                {stage?.title ?? "View Ecosystem Stage"}
              </Link>
            </div>
          )}
        </div>

        {/* Ecosystem Cards — ecosystemCardRef fields: icon, cardTitle, customSummary */}
        {cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <div
                key={card._key}
                className="relative group bg-white/50 rounded-sm p-7 border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-lg"
              >
                {/* Step number */}
                <span className="absolute top-6 right-6 text-5xl font-black text-purple/10 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-14 h-14 bg-purple-faint/50 rounded-sm flex items-center justify-center text-3xl mb-5 border border-gray-100">
                  <DynamicIcon name={card.icon || ""} size={30} color="#650199" />
                </div>

                <h3 className="text-lg font-bold text-brand-black mb-3 leading-snug">
                  {card.cardTitle}
                </h3>
                <p className="text-sm text-brand-black/75 leading-relaxed">
                  {card.customSummary}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Quote strip — ecosystemQuoteCard fields: quote, reference */}
        {(quoteCard?.quote) && (
          <div className="mt-16 bg-purple rounded-sm p-10 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl shrink-0">
              <MdChatBubble fill="#f5f5f5" size={70} />
            </div>
            <div>
              <p className="text-xl font-semibold italic leading-relaxed mb-4">
                &ldquo;{quoteCard.quote}&rdquo;
              </p>
              {quoteCard.reference && (
                <p className="text-brand-white text-sm">— {quoteCard.reference}</p>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Ecosystem CTA — callToAction fields: title, body, text */}
      <div className="max-w-3xl mx-auto text-center my-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-4 leading-tight">
          {cta?.title ?? "This project is part of a Larger Ecosystem that creates sustainable change"}
        </h2>
        <p className="text-brand-black/75 text-lg mb-8 leading-relaxed">
          {cta?.body ?? "Every donation moves someone one step closer to becoming self-reliant."}
        </p>
        {cta?.text && stageSlug && (
          <YellowCTA href={`/ecosystem/${stageSlug}`} text={cta.text} />
        )}
        <div className="mt-20">
          <small>
            <em>Explore the stages of our Ecosystem</em>
          </small>
          <div className="flex flex-wrap gap-10 justify-center mt-4">
            {ecosystemStages.map((s) => (
              <Link
                key={s.slug}
                href={`/ecosystem/${s.slug}`}
                className="text-brand-white bg-purple px-6 py-2 hover:bg-purple-dark font-bold text-sm rounded-sm transition-all self-center"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
