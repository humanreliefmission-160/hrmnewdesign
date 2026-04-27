import { FaArrowRightLong } from "react-icons/fa6";
import YellowCTA from "./YellowCTA";

const impactCards = [
  {
    id: 1,
    stat: "500",
    unit: "homes",
    label: "Home Construction",
    description: "Families sheltered through emergency housing builds across affected regions.",
    tag: "Infrastructure",
    tagColor: "bg-purple",
    image: "/img-placeholder.jpg",
    link: "#",
    accentColor: "from-brand-black/90",
  },
  {
    id: 2,
    stat: "300",
    unit: "bags",
    label: "Bags Distributed",
    description: "School bags packed with stationery handed to children in underserved communities.",
    tag: "Education",
    tagColor: "bg-purple",
    image: "/img-placeholder.jpg",
    link: "#",
    accentColor: "from-brand-black/90",
  },
  {
    id: 3,
    stat: "50",
    unit: "meals",
    label: "Hot Meals",
    description: "Nutritious hot meals served daily to vulnerable individuals and families.",
    tag: "Healthcare",
    tagColor: "bg-purple",
    image: "/img-placeholder.jpg",
    link: "#",
    accentColor: "from-brand-black/90",
  },
];

export default function LastMonthImpact() {
  return (
    <section className="bg-white w-full pt-16 pb-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* ── Header Block ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            {/* Section tag */}
            <span className="inline-flex items-center gap-2 text-xs font-bold text-purple bg-purple-faint px-3 py-1.5 rounded-sm mb-3 ">
              Our Impact
            </span>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-black tracking-tight leading-none">
              Last Months
              <br />
              <span className="text-purple font-extrabold">Impact</span>
            </h1>

            {/* Subheading */}
            <p className="text-brand-black/75 text-base mt-4 max-w-md">
              Check out how you helped in{" "}
              <span className="font-bold text-brand-black">March</span>. Every
              contribution made a real difference on the ground.
            </p>
          </div>

          {/* Desktop CTA top-right */}
          <div className="hidden sm:block shrink-0">
            <YellowCTA
              href="/projects"
              text="View All Projects"
            />
          </div>
        </div>

        {/* ── Impact Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {impactCards.map((card, index) => (
            <div
              key={card.id}
              className="relative overflow-hidden rounded-sm group cursor-pointer"
              style={{ height: "440px" }}
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={`${card.stat} ${card.unit}`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Layered gradients for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80" />
              <div className={`absolute inset-0 bg-linear-to-t ${card.accentColor} to-transparent opacity-40`} />

              {/* Top: Tag badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`${card.tagColor} text-brand-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm`}
                >
                  {card.tag}
                </span>
              </div>

              {/* Bottom: Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {/* Big stat */}
                <div className="flex items-baseline gap-1.5 mb-0.5">
                  <span className="text-white font-bold text-6xl leading-none drop-shadow-xl">
                    {card.stat}
                  </span>
                  <span className="text-brand-white font-semibold text-lg lowercase">
                    {card.unit}
                  </span>
                </div>

                {/* Label */}
                {/* <p className={`text-brand-white font-bold text-sm mb-2 px-2 py-1`}>
                  {card.label}
                </p> */}

                {/* Description — fades in on hover */}
                <p className="text-brand-white/75 text-xs leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {card.description}
                </p>

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-3 border-t border-white/50">
                  <a
                    href={card.link}
                    className="text-white text-[11px] font-bold underline-offset-2 transition-colors uppercase tracking-wide flex items-center gap-2"
                  >
                    View How You Can Help
                    <span>
                      <FaArrowRightLong />
                    </span>
                  </a>
                  <span className="text-brand-white text-[10px] uppercase tracking-widest">
                    #{index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Desktop CTA top-right */}
        <div className="sm:block lg:hidden shrink-0 mt-8">
          <YellowCTA
            href="/projects"
            text="View All Projects"
          />
        </div>

      </div>
    </section>
  );
}
