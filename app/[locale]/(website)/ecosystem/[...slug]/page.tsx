import { notFound } from "next/navigation";
import { ecosystemStages, allStages } from "../../components/ecosystem/data/ecosystemData";
import Link from "next/link";
import FAQSection from "../../components/ecosystem/sections/ecosystempage/FAQSection";
import ProjectsPageHeader from "../../components/ProjectsPageHeader";
import IntroSection from "../../components/ecosystem/sections/ecosystempage/IntroSection";
import CaseStudySection from "../../components/ecosystem/sections/ecosystempage/CaseStudySection";
import DonateSection from "../../components/ecosystem/sections/ecosystempage/DonateSection";
import Image from "next/image";

export async function generateStaticParams() {
  return ecosystemStages.map((stage) => ({
    slug: [stage.slug],
  }));
}

export default async function Ecosystem({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug[0];

  const stage = ecosystemStages.find((s) => s.slug === slug);

  if (!stage) {
    notFound();
  }

  const currentIndex = allStages.findIndex((s) => s.slug === slug);
  const prevStage = currentIndex > 0 ? allStages[currentIndex - 1] : null;
  const nextStage = currentIndex < allStages.length - 1 ? allStages[currentIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <ProjectsPageHeader
        title={stage.name}
        subtitle={stage.shortDescription}
        breadcrumb="ECOSYSTEM"
        display={true}
        image={stage.heroImage || "/img-placeholder.JPG"}
      />

      <section>
        <div className="mx-auto">
          {/* Intro */}
          <IntroSection stage={stage} />

          {/* Case Study */}
          <CaseStudySection stage={stage} />

          {/* How to Donate */}
          <DonateSection stage={stage} />

          {/* FAQ */}
          <FAQSection stage={stage} />

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
                      className={`rounded-xl p-4 text-center border transition-all ${isCurrent
                        ? "bg-purple-800 text-white border-purple-800"
                        : isPast
                          ? "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                          : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                        }`}
                    >
                      <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-1">
                        Stage {s.stageNumber}
                      </p>
                      <p className="font-black text-lg">{s.name}</p>
                      <p className="text-xs font-semibold mt-1 opacity-60 uppercase tracking-wider">
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
                      className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-700 font-medium text-sm transition-colors group"
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
                      className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-700 font-medium text-sm transition-colors group text-right"
                    >
                      <span>
                        <span className="block text-xs text-gray-400">Next Stage</span>
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
        </div>
      </section>
    </>
  );
}

