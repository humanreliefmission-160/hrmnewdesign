import {
  Heart,
  Utensils,
  Droplets,
  Building2,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import EcosystemDiagram from "./EcosystemDiagram";
import YellowCTA from "../../YellowCTA";
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";

const projects = [
  { icon: <Heart size={13} />, label: "Healthcare" },
  { icon: <Utensils size={13} />, label: "Food Aid" },
  { icon: <Droplets size={13} />, label: "Water Aid" },
  { icon: <Building2 size={13} />, label: "Infrastructure" },
  { icon: <GraduationCap size={13} />, label: "Sponsorships" },
  { icon: <TrendingUp size={13} />, label: "Income Generation" },
];

const ECOSYSTEM_STAGES_QUERY = `
  *[_type == "ecosystemStage"] | order(order asc) {
    _id,
    title,
    order,
    cardDescription,
    cardIcon,
    stageNumber,
    stageName,
    cardImage,
    "slug": slug.current,
    "projects": *[_type == "project" && ecosystemSection.stage._ref == ^._id] | order(name asc) {
      _id,
      name,
      icon,
      tagline,
      "slug": slug.current,
      projectCategory->{ name }
    }
  }
`;

export default async function Hero() {
  const stages = await sanityFetch<any[]>(ECOSYSTEM_STAGES_QUERY);

  return (
    <section className="relative overflow-hidden bg-purple-faint/50 py-12">
      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-4 py-12 md:py-12 lg:py-12 flex items-center">
        <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-20 w-full">

          {/* ══ LEFT — Text Column ══ */}
          <div className="flex-1 w-full max-w-xl lg:max-w-[500px]">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-8 bg-purple/5 border border-purple/20">
              <span className="text-[11px] font-bold tracking-widest uppercase text-purple">
                Zakat Transformation Ecosystem
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-[3.6rem] font-extrabold leading-[1.1] tracking-tight mb-6 text-brand-black">
              From{" "}
              <span className="text-purple">Receiving</span>
              <br />
              Zakat to{" "}
              <span className="relative inline-block">
                <span className="text-purple">Paying</span>
                <span className="absolute left-0 bottom-[-6px] h-[4px] w-full rounded-full origin-left block bg-purple/20" />
              </span>{" "}
              Zakat
            </h1>

            {/* Body */}
            <p className="text-base sm:text-lg leading-relaxed mb-9 text-brand-black/80">
              Our 4 phase ecosystem lifts the needy out of poverty, providing{" "}
              <strong className="text-purple">Essentials</strong>, building{" "}
              <strong className="text-purple">Stability</strong>, enabling{" "}
              <strong className="text-purple">Development</strong> and creating{" "}
              <strong className="text-brand-black">Sustainability</strong> so every recipient
              becomes a contributor.
            </p>

            {/* Project tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {projects.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] sm:text-xs font-semibold cursor-pointer select-none bg-purple/10 text-purple border border-purple/20 transition-colors hover:bg-purple hover:text-brand-white"
                >
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <YellowCTA
              text="Explore our projects"
              href="/projects"
            />
          </div>

          {/* ══ RIGHT — Ecosystem Diagram ══ */}
          <div className="flex-1 w-full flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[560px]">
              <EcosystemDiagram stages={stages} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}