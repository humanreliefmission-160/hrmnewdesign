import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  type SanityEcosystemStage,
  type SanityEcosystemStageNav,
} from "../../data/sanityTypes";

type Props = {
  stage: SanityEcosystemStage;
  allStages: SanityEcosystemStageNav[];
};

export default function StageNavigation({ stage, allStages }: Props) {
  const currentSlug = stage.slug.current;
  const currentIndex = allStages.findIndex((s) => s.slug.current === currentSlug);
  const prevStage = currentIndex > 0 ? allStages[currentIndex - 1] : null;
  const nextStage = currentIndex < allStages.length - 1 ? allStages[currentIndex + 1] : null;

  return (
    <>
      {/* Stage Navigation */}
      <section className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-brand-grey text-xs uppercase tracking-widest font-semibold mb-8">
            Our Ecosystem
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {allStages.map((s, i) => {
              const isCurrent = s.slug.current === currentSlug;
              const isPast = i < currentIndex;
              console.log(allStages);
              return (
                <Link
                  key={s._id}
                  href={`/ecosystem/${s.slug.current}`}
                  className={`rounded-sm p-4 text-center border transition-all ${isCurrent
                    ? "bg-purple text-white border-purple"
                    : isPast
                      ? "bg-purple/20 border-purple text-purple hover:bg-purple-100"
                      : "bg-gray-50 border-gray-200 text-brand-black/50 hover:bg-brand-black/20"
                    }`}
                >
                  <p className="text-[0.65em] uppercase mb-1">
                    Stage {s.stageNumber ?? s.order}
                  </p>
                  <p className="font-bold text-lg">{s.stageName || s.title}</p>
                </Link>
              );
            })}
          </div>

          {/* Prev / Next */}
          <div className="flex justify-between items-center mt-10">
            <div>
              {prevStage && (
                <Link
                  href={`/ecosystem/${prevStage.slug.current}`}
                  className="inline-flex items-center gap-2 text-brand-black/60 hover:text-purple-light font-medium text-sm transition-colors group"
                >
                  <FaChevronLeft />
                  <span>
                    <span className="block text-xs text-brand-gray">Previous Stage</span>
                    {prevStage.stageName || prevStage.title}
                  </span>
                </Link>
              )}
            </div>
            <div>
              {nextStage && (
                <Link
                  href={`/ecosystem/${nextStage.slug.current}`}
                  className="inline-flex items-center gap-2 text-brand-black/60 hover:text-purple-light font-medium text-sm transition-colors group text-right"
                >
                  <span>
                    <span className="block text-xs text-brand-black/50">Next Stage</span>
                    {nextStage.stageName || nextStage.title}
                  </span>
                  <FaChevronRight />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
