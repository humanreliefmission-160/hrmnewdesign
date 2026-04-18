export default function CaseStudy() {
  return (
    <section className="bg-white/50 py-16 px-6 md:px-12 lg:px-24 shadow-lg my-12 max-w-[1140px] mx-auto">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="text-center mb-12">
          <span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
            Case Study
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black">
            Overcoming Hardship: A Journey from Loss to Hope
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Image */}
          <div className="w-full lg:w-1/2 shrink-0">
            <div className="relative overflow-hidden shadow-md">
              <img
                src="/almas.jpg"
                alt="Case study – Orphan receiving support"
                className="w-full h-[400px] object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-sm px-4 py-3 shadow-lg">
                <p className="text-xs text-purple font-semibold uppercase tracking-wide">Almas Enrolled in Herat Orphanage</p>
              </div>
            </div>
            <blockquote className="text-xl font-semibold text-purple italic border-l-4 border-purple pl-5 leading-snug mt-4">
              "Before being enrolled in the orphanage, I used to sleep in the park."
            </blockquote>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 space-y-5">

            <p className="text-brand-black leading-relaxed">
              Almas, 10, lives in a rural district of Herat where school attendance is critically low.
              His family, displaced by flooding, had lost everything — including any hope of Almas receiving a formal education.
              <br /><br />
              Through the Human Relief Mission's Education for All project, Almas was enrolled in a temporary learning
              centre. He received a school bag, stationery, uniform, and access to a trained teacher six days a week.
              Within eight months, Almas could read and write, and had become one of the top students in his class.
              <br /><br />
              Almas' story is not unique — it is repeated thousands of times across the communities we serve. Every
              donation, however small, makes this possible.
            </p>
            <hr className="h-px border-0.5 border-purple opacity-25" />
            <div>
              <p className="text-sm font-bold text-gray-800">Interview with Almas</p>
              <p className="text-xs text-gray-500">Human Relief Mission Field Team, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
