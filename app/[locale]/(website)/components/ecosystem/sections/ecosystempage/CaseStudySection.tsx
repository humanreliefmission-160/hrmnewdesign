import { EcosystemStage } from "../../data/ecosystemData";

type Props = {
  stage: EcosystemStage;
};

export default function CaseStudySection({ stage }: Props) {
  const { caseStudy } = stage;

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Case Study
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight max-w-3xl mx-auto">
            {caseStudy.title}
          </h2>
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image column */}
            <div className="relative">
              <img
                src={caseStudy.image}
                alt={caseStudy.subjectName}
                className="w-full h-80 lg:h-full object-cover object-top"
              />
              {/* Label over image */}
              <div className="bg-white/90 backdrop-blur px-3 py-1.5 inline-flex items-center gap-2 m-4 rounded">
                <span className="text-purple-700 font-bold text-xs uppercase tracking-widest">
                  {caseStudy.subjectLabel}
                </span>
              </div>

              {/* Quote below image on mobile */}
              <div className="lg:hidden bg-purple-50 border-l-4 border-purple-700 mx-4 mb-4 p-4 rounded-r">
                <p className="text-purple-900 font-semibold italic text-base leading-relaxed">
                  "{caseStudy.quote}"
                </p>
              </div>
            </div>

            {/* Text column */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="space-y-4 mb-6">
                {caseStudy.story.map((paragraph, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>

              <hr className="border-gray-200 mb-5" />

              <div>
                <p className="font-bold text-gray-900 text-sm">
                  Interview with {caseStudy.subjectName}
                </p>
                <p className="text-gray-500 text-sm">
                  {caseStudy.interviewSource}, {caseStudy.interviewDate}
                </p>
              </div>
            </div>
          </div>

          {/* Quote — desktop, shown below the grid as a full-width banner */}
          <div className="hidden lg:block border-t border-gray-200 px-10 py-6 bg-purple-50">
            <div className="flex items-start gap-4">
              <div className="w-1 h-full bg-purple-700 rounded-full shrink-0 self-stretch min-h-[40px]" />
              <p className="text-purple-900 font-semibold italic text-lg leading-relaxed">
                "{caseStudy.quote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
