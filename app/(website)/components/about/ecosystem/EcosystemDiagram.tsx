"use client";

import { useState } from "react";
import {
  Droplets,
  Building2,
  GraduationCap,
  TrendingUp,
  X,
  Utensils,
} from "lucide-react";
import YellowCTA from "../../YellowCTA";
import { FaAmbulance, FaChevronRight, FaClinicMedical } from "react-icons/fa";
import { PiSprayBottleFill } from "react-icons/pi";
import { BiSolidDonateBlood } from "react-icons/bi";
import { TbBreadFilled } from "react-icons/tb";
import { FaBottleWater } from "react-icons/fa6";
import { GiWaterTank } from "react-icons/gi";


interface Project {
  icon: React.ReactNode;
  name: string;
  category: string;
  desc: string;
  link: string;
  projectType: "normal" | "emergency";
}

interface Phase {
  id: number;
  label: string;
  subtitle: string;
  projects: Project[];
  description: string;
  badge: string;
}

const phases: Phase[] = [
  {
    /*
    Water tankers
    */
    id: 1,
    label: "Essentials",
    subtitle: "Stage 1",
    badge: "Urgency",
    description: "Provide the bare necessities to keep people alive and safe — immediate relief before anything else can begin.",
    projects: [
      { icon: <FaAmbulance size={13} />, name: "Ambulance Service", desc: "Providing immediate emergency medical care & transport", link: "/projects/projectitem", projectType: "emergency", category: "Healthcare" },
      { icon: <PiSprayBottleFill size={13} />, name: "Hygiene Kits", desc: "Preventing disease & restoring dignity", link: "/projects/projectitem", projectType: "normal", category: "Healthcare" },
      { icon: <FaClinicMedical size={13} />, name: "Medical Camps", desc: "Providing accessible healthcare, diagnosis and essential treatment", link: "/projects/projectitem", projectType: "normal", category: "Healthcare" },
      { icon: <BiSolidDonateBlood size={13} />, name: "Blood Donation Awareness", desc: "Saving lives by tackling blood shortages", link: "/projects/projectitem", projectType: "normal", category: "Healthcare" },
      { icon: <Utensils size={13} />, name: "Hot Meals", desc: "Providing essential nourishment for families", link: "/projects/projectitem", projectType: "normal", category: "Food Aid" },
      { icon: <TbBreadFilled size={13} />, name: "Fresh Bread", desc: "Providing bread for families facing hunger", link: "/projects/projectitem", projectType: "normal", category: "Food Aid" },
      { icon: <FaBottleWater size={13} />, name: "Water Bottles", desc: "Providing safe Hydration for Families", link: "/projects/projectitem", projectType: "normal", category: "Water Aid" },
      { icon: <GiWaterTank size={13} />, name: "Water Tankers", desc: "Providing immediate water For Families", link: "/projects/projectitem", projectType: "normal", category: "Water Aid" },
    ],
  },
  {
    id: 2,
    label: "Stability",
    subtitle: "Stage 2",
    badge: "Stabilise",
    description: "Build stable foundations so families can live safely with clean water and proper infrastructure in place.",
    projects: [
      { icon: <Droplets size={13} />, name: "Water Aid", desc: "Clean water access & sanitation", link: "/projects/projectitem", projectType: "normal", category: "" },
      { icon: <Building2 size={13} />, name: "Infrastructure", desc: "Housing, roads & community assets", link: "/projects/projectitem", projectType: "normal", category: "" },
    ],
  },
  {
    id: 3,
    label: "Development",
    subtitle: "Stage 3",
    badge: "Grow",
    description: "Invest in people through education and sponsorships to unlock their potential, skills, and capabilities.",
    projects: [
      { icon: <GraduationCap size={13} />, name: "Sponsorships", desc: "Education & vocational training", link: "/projects/projectitem", projectType: "normal", category: "" },
    ],
  },
  {
    id: 4,
    label: "Sustainability",
    subtitle: "Stage 4",
    badge: "Thrive",
    description: "Generate sustainable income so individuals become self-sufficient — and eventually Zakat payers themselves.",
    projects: [
      { icon: <TrendingUp size={13} />, name: "Income Generation", desc: "Businesses, jobs & financial growth", link: "/projects/projectitem", projectType: "normal", category: "" },
    ],
  },
];

// SVG Centers
const CARD_CENTERS = [
  { cx: 130, cy: 130 },
  { cx: 390, cy: 130 },
  { cx: 130, cy: 390 },
  { cx: 390, cy: 390 },
];
const HUB_CENTER = { cx: 260, cy: 260 };

export default function EcosystemDiagram() {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const handlePhaseClick = (id: number) => {
    setActivePhase((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative w-full max-w-[640px]">
      {/* Main Diagram */}
      <div className="relative w-full flex flex-col md:block md:aspect-square">
        {/* SVG Connector Lines layer */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-1"
          viewBox="0 0 520 520"
          preserveAspectRatio="xMidYMid meet"
        >
          {CARD_CENTERS.map((pos, i) => {
            const phase = phases[i];
            const isActive = activePhase === phase.id || hovered === phase.id;

            const strokeClass =
              phase.id === 1 ? "stroke-purple-light" :
                phase.id === 2 ? "stroke-purple" :
                  phase.id === 3 ? "stroke-purple-dark" : "stroke-brand-black";

            return (
              <line
                key={`line-${phase.id}`}
                x1={pos.cx}
                y1={pos.cy}
                x2={HUB_CENTER.cx}
                y2={HUB_CENTER.cy}
                strokeWidth={isActive ? 3.5 : 2}
                strokeLinecap="round"
                strokeDasharray="2 6"
                className={`opacity-50 transition-opacity duration-300 ${strokeClass}`}
              />
            );
          })}
        </svg>

        {/* Center Hub */}
        <div
          className="relative mx-auto md:my-0 md:absolute items-center justify-center rounded-full cursor-pointer select-none md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 w-24 h-24 md:w-[16%] md:h-[16%] md:min-w-[64px] md:min-h-[64px] bg-purple shadow-xl hidden lg:flex"
          onClick={() => setActivePhase(null)}
        >
          <img src="/logo-white.svg" alt="Logo" width={45} height={45} />
        </div>

        {/* Phase Cards */}
        {phases.map((phase, idx) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            idx={idx}
            isActive={activePhase === phase.id}
            isHovered={hovered === phase.id}
            anyActive={activePhase !== null}
            onHover={setHovered}
            onClick={handlePhaseClick}
          />
        ))}
      </div>

      {/* Phase Detail Drawer */}
      {activePhase !== null && (
        <PhaseDetailPanel
          phase={phases[activePhase - 1]}
          onClose={() => setActivePhase(null)}
        />
      )}

      {/* Journey progression bar */}
      <div className="flex items-center justify-between mt-4 px-2">
        <span className="text-[11px] font-semibold text-brand-black/60">
          Zakat Receiver
        </span>
        <div className="flex items-center gap-2 mx-3 flex-1">
          {phases.map((ph, i) => {
            const bgClass =
              ph.id === 1 ? "bg-purple-light" :
                ph.id === 2 ? "bg-purple" :
                  ph.id === 3 ? "bg-purple-dark" : "bg-brand-black";

            return (
              <div key={ph.id} className="flex items-center flex-1" onClick={() => handlePhaseClick(ph.id)}>
                <div
                  className={`h-2 rounded-sm flex-1 cursor-pointer transition-transform hover:scale-y-150 ${bgClass}`}
                  title={ph.label}
                />
                {i < 3 && (
                  <div className="w-2 h-2 rounded-sm mx-1 shrink-0 bg-brand-black/20" />
                )}
              </div>
            );
          })}
        </div>
        <span className="text-[11px] font-extrabold whitespace-nowrap text-purple">
          Zakat Payer
        </span>
      </div>
    </div>
  );
}

const CARD_POSITIONS = [
  { className: "md:top-[1%] md:left-[1%] origin-top-left" },
  { className: "md:top-[1%] md:right-[1%] origin-top-right" },
  { className: "md:bottom-[1%] md:left-[1%] origin-bottom-left" },
  { className: "md:bottom-[1%] md:right-[1%] origin-bottom-right" },
];

function PhaseCard({ phase, idx, isActive, isHovered, anyActive, onHover, onClick }: any) {
  const pos = CARD_POSITIONS[idx];
  const highlighted = isActive || isHovered;
  const dimmed = anyActive && !isActive && !isHovered;

  const bgClass = phase.id === 1 ? "bg-purple" : phase.id === 2 ? "bg-purple-light" : phase.id === 3 ? "bg-purple-dark" : "bg-brand-black";
  const textClass = "text-brand-white";
  const borderClassBase = phase.id === 1 ? "border-purple-light" : phase.id === 2 ? "border-purple" : phase.id === 3 ? "border-purple-dark" : "border-brand-black";
  const lightBgClass = phase.id === 1 ? "bg-purple/10" : phase.id === 2 ? "bg-purple-light/10" : phase.id === 3 ? "bg-purple-dark/10" : "bg-brand-black/10";
  const shadowBase = phase.id === 1 ? "shadow-purple/50" : phase.id === 2 ? "shadow-purple-light/50" : phase.id === 3 ? "shadow-purple-dark/50" : "shadow-brand-black/40";
  const badgeTextClass = phase.id === 1 ? "text-purple-light" : phase.id === 2 ? "text-purple" : phase.id === 3 ? "text-purple-dark" : "text-brand-black";

  const borderClass = highlighted ? `border-2 ${borderClassBase}` : "border-2 border-brand-black/5";
  const shadowClass = highlighted ? `shadow-lg ${shadowBase}` : "shadow-md shadow-brand-black/5";

  return (
    <div
      className={`relative md:absolute p-4 rounded-sm z-5 w-full md:w-[35%] mb-4 md:mb-0 transition-all duration-300 hover:scale-[1.03] md:hover:scale-[1.07] md:hover:z-20 bg-white md:p-3 ${pos.className} ${dimmed ? "opacity-50" : "opacity-100"}`}
      onMouseEnter={() => onHover(phase.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(phase.id)}
    >
      <div className={`relative cursor-pointer overflow-hidden transition-all duration-300 select-none bg-white`}>
        {/* Phase subtitle */}
        <div className={`font-extrabold text-lg`}>
          {phase.subtitle}
        </div>
        {/* Phase Desscription */}
        <div className={`text-[0.75em]`}>
          {phase.description}
        </div>
      </div>

      {/* Title */}
      <div className="mt-3 mb-1.5 relative z-10">
        <h3 className="text-xs sm:text-sm font-bold leading-tight text-brand-black">
          {phase.label}
        </h3>
        <span className={`inline-block mt-1 px-1.5 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-wider ${lightBgClass} ${badgeTextClass}`}>
          {phase.badge}
        </span>
      </div>


    </div>
  );
}

function PhaseDetailPanel({ phase, onClose }: any) {
  const bgClass = phase.id === 1 ? "bg-purple" : phase.id === 2 ? "bg-purple-light" : phase.id === 3 ? "bg-purple-dark" : "bg-brand-black";
  const textClass = "text-brand-white";
  const borderClass = phase.id === 1 ? "border-purple-light" : phase.id === 2 ? "border-purple" : phase.id === 3 ? "border-purple-dark" : "border-brand-black";
  const lightBgClass = phase.id === 1 ? "bg-purple/10" : phase.id === 2 ? "bg-purple-light/10" : phase.id === 3 ? "bg-purple-dark/10" : "bg-brand-black/10";
  const shadowClass = phase.id === 1 ? "shadow-purple/50" : phase.id === 2 ? "shadow-purple-light/50" : phase.id === 3 ? "shadow-purple-dark/50" : "shadow-brand-black/40";
  const badgeTextClass = phase.id === 1 ? "text-purple-light" : phase.id === 2 ? "text-purple" : phase.id === 3 ? "text-purple-dark" : "text-brand-black";

  return (
    <div className={`relative mt-5 rounded-sm p-5 overflow-hidden bg-white border-2 ${borderClass}`}>
      <div className="relative flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest ${bgClass} ${textClass}`}>
              {phase.subtitle} - {phase.label}
            </span>
            <span className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${lightBgClass} ${badgeTextClass}`}>
              {phase.badge}
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-4 text-brand-black/80">
            {phase.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {phase.projects.map((p: any) => (
              <div
                key={p.name}
                className={`flex items-start gap-2 px-3 py-2 rounded-sm cursor-pointer transition-transform hover:scale-105 border ${borderClass} ${lightBgClass}`}
              >
                <span className={`mt-0.5 shrink-0 ${badgeTextClass}`}>
                  {p.icon}
                </span>
                <div>
                  <div className="flex flex-row justify-between items-center">
                    <div className={`text-xs font-bold ${badgeTextClass}`}>
                      {p.name}
                    </div>
                    <div>
                      <FaChevronRight className="opacity-0 hover:opacity-100" size={10} color="#650199" />
                    </div>
                  </div>
                  <div className="font-normal text-purple-dark text-[0.55em]">
                    <div>
                      {p.category}
                    </div>
                  </div>
                  <div className="text-[10px] mt-0.5 text-brand-black/70">
                    {p.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-4">
            <YellowCTA
              text="Support Phase"
              href="/donate"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="shrink-0 w-7 h-7 flex items-center justify-center transition-colors text-brand-black bg-brand-black/10 hover:bg-brand-black/20 rounded-full cursor-pointer border-0"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
