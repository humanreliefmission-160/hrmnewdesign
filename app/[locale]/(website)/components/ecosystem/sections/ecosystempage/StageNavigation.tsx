import { notFound } from "next/navigation";

import { EcosystemStage, allStages } from "../../data/ecosystemData";
import Link from "next/link";


type Props = {
  stage: EcosystemStage;
};

export default function StageNavigation({ stage }: Props) {
  const slug = stage.slug;
  const currentIndex = allStages.findIndex((s) => s.slug === slug);
  const prevStage = currentIndex > 0 ? allStages[currentIndex - 1] : null;
  const nextStage = currentIndex < allStages.length - 1 ? allStages[currentIndex + 1] : null;

  return (
    <>
      {/* Stage Navigation */}
      <section className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-400 text-xs uppercase tracking-widest font-semibold mb-8">
            Zakat Transformation Ecosystem
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {allStages.map((s, i) => {
              const isCurrent = s.slug === slug;
              const isPast = i < currentIndex;
              return (
                <Link
                  key={s.slug}
                  href={`/ecosystem/${s.slug}`}
                  className={`rounded-sm p-4 text-center border transition-all ${isCurrent
                    ? "bg-purple text-white border-purple"
                    : isPast
                      ? "bg-purple/20 border-purple text-purple hover:bg-purple-100"
                      : "bg-gray-50 border-gray-200 text-brand-black/50 hover:bg-brand-black/20"
                    }`}
                >
                  <p className="text-xs uppercase tracking-widest font-semibold mb-1">
                    Stage {s.stageNumber}
                  </p>
                  <p className="font-black text-lg">{s.name}</p>
                  <p className="text-xs font-semibold mt-1 uppercase tracking-wider">
                    {s.badge}
                  </p>
                </Link>
              );
            })}
          </div>
          {/* Prev / Next */}
          <div className="flex justify-between mt-10">
            <div>
              {prevStage && (
                <Link
                  href={`/ecosystem/${prevStage.slug}`}
                  className="inline-flex items-center gap-2 text-brand-black/60 hover:text-purple-light font-medium text-sm transition-colors group"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>
                    <span className="block text-xs text-gray-400">Previous Stage</span>
                    {prevStage.name}
                  </span>
                </Link>
              )}
            </div>
            <div>
              {nextStage && (
                <Link
                  href={`/ecosystem/${nextStage.slug}`}
                  className="inline-flex items-center gap-2 text-brand-black/60 hover:text-purple-light font-medium text-sm transition-colors group text-right"
                >
                  <span>
                    <span className="block text-xs text-brand-black/50">Next Stage</span>
                    {nextStage.name}
                  </span>
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
