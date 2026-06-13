import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { type SanityEcosystemStage } from "../../data/sanityTypes";

type Props = {
  stage: SanityEcosystemStage;
};

export default function CaseStudySection({ stage }: Props) {
  const caseStudy = stage.caseStudy;
  if (!caseStudy?.title) return null;

  const imageUrl =
    caseStudy.image?.asset
      ? urlFor(caseStudy.image.asset).width(800).height(600).fit("crop").url()
      : null;

  return (
    <section className="bg-brand-white/50 py-8 sm:py-16 px-6 md:px-12 lg:px-24 shadow-lg my-12 max-w-[1140px] mx-3 sm:mx-auto rounded-sm">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-3">
            Case Study
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black leading-tight max-w-3xl mx-auto">
            {caseStudy.title}
          </h2>
        </div>

        {/* Content */}
        <div className="bg-transparent rounded-sm overflow-hidden border-none">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Image column */}
            {imageUrl && (
              <div className="w-full lg:w-1/2 shrink-0">
                <div className="relative overflow-hidden shadow-md">
                  <img
                    src={imageUrl}
                    alt={caseStudy.image?.caption || caseStudy.title || "Case Study"}
                    className="w-full h-[400px] object-cover"
                  />
                  {caseStudy.image?.caption && (
                    <div className="absolute bottom-4 left-4 bg-brand-white/90 backdrop-blur-sm px-4 py-2 rounded-sm shadow-lg">
                      <span className="text-purple font-semibold text-xs uppercase tracking-wide">
                        {caseStudy.image.caption}
                      </span>
                    </div>
                  )}
                </div>

                {/* Quote below image on mobile */}
                {caseStudy.quote && (
                  <blockquote className="lg:hidden text-xl font-semibold text-purple italic border-l-4 border-purple pl-4 mt-4">
                    &ldquo;{caseStudy.quote}&rdquo;
                  </blockquote>
                )}
              </div>
            )}

            {/* Text column */}
            <div className="w-full lg:w-1/2 space-y-5">
              {/* Desktop quote */}
              {caseStudy.quote && (
                <blockquote className="hidden lg:block text-xl font-semibold text-purple italic border-l-4 border-purple pl-4">
                  &ldquo;{caseStudy.quote}&rdquo;
                </blockquote>
              )}

              {/* Body text (Portable Text) */}
              {caseStudy.bodyText && caseStudy.bodyText.length > 0 && (
                <div className="space-y-4 text-brand-black leading-relaxed prose prose-sm max-w-none">
                  <PortableText value={caseStudy.bodyText} />
                </div>
              )}

              {caseStudy.reference && (
                <>
                  <hr className="h-px border-0.5 border-purple opacity-25" />
                  <div>
                    {caseStudy.reference.text && (
                      <p className="font-bold text-gray-800 text-sm">
                        {caseStudy.reference.text}
                      </p>
                    )}
                    {caseStudy.reference.dateAndInterviewer && (
                      <p className="text-gray-500 text-xs">
                        {caseStudy.reference.dateAndInterviewer}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
