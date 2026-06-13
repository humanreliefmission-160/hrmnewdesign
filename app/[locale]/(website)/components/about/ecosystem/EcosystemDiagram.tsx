"use client";

import { useState } from "react";
import {
  TrendingUp,
  X,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import YellowCTA from "../../YellowCTA";
import { FaAmbulance, FaBuilding, FaChevronRight, FaChild, FaClinicMedical, FaGraduationCap, FaHome, FaMosque, FaQuran, FaTree } from "react-icons/fa";
import { PiSprayBottleFill } from "react-icons/pi";
import { BiSolidDonateBlood, BiSolidPackage } from "react-icons/bi";
import { TbBreadFilled } from "react-icons/tb";
import { FaArrowTrendUp, FaBottleWater } from "react-icons/fa6";
import { GiSewingMachine, GiWaterTank, GiWell } from "react-icons/gi";
import { RiCashFill } from "react-icons/ri";
import { MdBakeryDining, } from "react-icons/md";
import { IoWomanSharp } from "react-icons/io5";
import IconRenderer from "@/app/[locale]/lib/icons/IconRenderer";

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
    id: 1,
    label: "Essentials",
    subtitle: "Stage 1",
    badge: "Urgency",
    description: "Provide the bare necessities to keep people alive and safe — immediate relief before anything else can begin.",
    projects: [
      { icon: <FaAmbulance size={13} />, name: "Ambulance Service", desc: "Providing immediate emergency medical care & transport", link: "/projects/projectitem", projectType: "emergency", category: "Healthcare" },
      { icon: <BiSolidDonateBlood size={13} />, name: "Blood Donation Awareness", desc: "Saving lives by tackling blood shortages", link: "/projects/projectitem", projectType: "normal", category: "Healthcare" },
      { icon: <TbBreadFilled size={13} />, name: "Fresh Bread", desc: "Providing bread for families facing hunger", link: "/projects/projectitem", projectType: "normal", category: "Food Aid" },
      { icon: <Utensils size={13} />, name: "Hot Meals", desc: "Providing essential nourishment for families", link: "/projects/projectitem", projectType: "normal", category: "Food Aid" },
      { icon: <PiSprayBottleFill size={13} />, name: "Hygiene Kits", desc: "Preventing disease & restoring dignity", link: "/projects/projectitem", projectType: "normal", category: "Healthcare" },
      { icon: <FaClinicMedical size={13} />, name: "Medical Camps", desc: "Providing accessible healthcare, diagnosis and essential treatment", link: "/projects/projectitem", projectType: "normal", category: "Healthcare" },
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
      { icon: <RiCashFill size={13} />, name: "Cash Assistance", desc: "Providing cash to families to meet their basic needs", link: "/projects/projectitem", projectType: "normal", category: "Infrastructure" },
      { icon: <IoWomanSharp size={13} />, name: "Family Sponorship", desc: "Empowering families with monthly support", link: "/projects/projectitem", projectType: "normal", category: "Stability" },
      { icon: <BiSolidPackage size={13} />, name: "Food Packages", desc: "Providing  vital nutrition to families every month", link: "/projects/projectitem", projectType: "normal", category: "Food Aid" },
      { icon: <FaHome size={13} />, name: "Home Construction", desc: "Providing shelter to families in need", link: "/projects/projectitem", projectType: "normal", category: "Infrastructure" },
      { icon: <FaChild size={13} />, name: "Orphan Sponorship", desc: "Empowering orphans with monthly support", link: "/projects/projectitem", projectType: "normal", category: "Stability" },
    ],
  },
  {
    id: 3,
    label: "Development",
    subtitle: "Stage 3",
    badge: "Grow",
    description: "Invest in people through education and sponsorships to unlock their potential, skills, and capabilities.",
    projects: [
      { icon: <GiWell size={13} />, name: "Water Wells | Handpump", desc: "Providing clean drinking water to communities", link: "/projects/projectitem", projectType: "normal", category: "Development" },
      { icon: <MdBakeryDining size={13} />, name: "Bakery", desc: "Providing freshly baked bread to families on a daily basis", link: "/projects/projectitem", projectType: "normal", category: "Development" },
      { icon: <FaTree size={13} />, name: "Green Afghanistan", desc: "Planting trees to combat climate change and provide sustanance", link: "/projects/projectitem", projectType: "normal", category: "Development" },
      { icon: <FaMosque size={13} />, name: "Masjid Construction", desc: "Building places of worship and community gathering", link: "/projects/projectitem", projectType: "normal", category: "Development" },
      { icon: <FaBuilding size={13} />, name: "Orphanage", desc: "Providing shelter, care and education to orphans", link: "/projects/projectitem", projectType: "normal", category: "Development" },
      { icon: <FaQuran size={13} />, name: "Hifz Sponsorship", desc: "Providing Quranic education to orphans", link: "/projects/projectitem", projectType: "normal", category: "Development" },
      { icon: <FaGraduationCap size={13} />, name: "Student Sponsorship", desc: "Providing education to children", link: "/projects/projectitem", projectType: "normal", category: "Development" },
      { icon: <GiSewingMachine size={13} />, name: "Sewing Course", desc: "Providing the tools needed for women to make a living", link: "/projects/projectitem", projectType: "normal", category: "Development" },
    ],
  },
  {
    id: 4,
    label: "Sustainability",
    subtitle: "Stage 4",
    badge: "Thrive",
    description: "Generate sustainable income so individuals become self-sufficient — and eventually Zakat payers themselves.",
    projects: [
      { icon: <FaArrowTrendUp size={13} />, name: "Income Generation", desc: "Providing the means to make bread winners with various means", link: "/projects/projectitem", projectType: "normal", category: "Sustainability" },
      { icon: <GiSewingMachine size={13} />, name: "Sewing Course", desc: "Providing the tools needed for women to make a living", link: "/projects/projectitem", projectType: "normal", category: "Development" },
      { icon: <FaChild size={13} />, name: "Orphan Sponorship", desc: "Providing the orphans the ability to achieving their dreams", link: "/projects/projectitem", projectType: "normal", category: "Stability" },
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

export default function EcosystemDiagram({ stages }: { stages?: any[] }) {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const resolvedPhases = stages && stages.length > 0
    ? stages.map((stage) => ({
      id: stage.stageNumber || stage.order || 1,
      label: stage.stageName || stage.title || "",
      subtitle: `Stage ${stage.stageNumber || stage.order || 1}`,
      badge: stage.title || "",
      description: stage.cardDescription || "",
      projects: (stage.projects || []).map((p: any) => ({
        icon: <IconRenderer name={p.icon} size={13} />,
        name: p.name || "",
        category: p.projectCategory?.name || "",
        desc: p.tagline || "",
        link: p.slug ? `/projects/${p.slug}` : "/projects",
        projectType: "normal" as const,
      }))
    }))
    : phases;

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
            const phase = resolvedPhases[i];
            if (!phase) return null;
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
        {resolvedPhases.map((phase, idx) => (
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
          phase={resolvedPhases.find((p) => p.id === activePhase)}
          onClose={() => setActivePhase(null)}
        />
      )}

      <div className="flex flex-col items-center mt-4">
        <span className="font-medium italic text-xs items-center text-brand-grey">
          Click on the cards above to see more detail
        </span>
      </div>

      {/* Journey progression bar */}
      <div className="flex items-center justify-between mt-4 px-2">
        <span className="text-[11px] font-medium text-brand-black/60">
          Zakat Receiver
        </span>
        <div className="flex items-center gap-2 mx-3 flex-1">
          {resolvedPhases.map((ph) => {
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
              </div>
            );
          })}
        </div>
        <span className="text-[11px] font-bold whitespace-nowrap text-purple">
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
  const pos = CARD_POSITIONS[idx] || CARD_POSITIONS[0];
  const highlighted = isActive || isHovered;
  const dimmed = anyActive && !isActive && !isHovered;

  const lightBgClass = phase.id === 1 ? "bg-purple/10" : phase.id === 2 ? "bg-purple-light/10" : phase.id === 3 ? "bg-purple-dark/10" : "bg-brand-black/10";
  const badgeTextClass = phase.id === 1 ? "text-purple-light" : phase.id === 2 ? "text-purple" : phase.id === 3 ? "text-purple-dark" : "text-brand-black";

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
        {/* Phase Description */}
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
  if (!phase) return null;
  const bgClass = phase.id === 1 ? "bg-purple-light" : phase.id === 2 ? "bg-purple-light" : phase.id === 3 ? "bg-purple-dark" : "bg-brand-black";
  const textClass = "text-brand-white";
  const borderClass = phase.id === 1 ? "border-purple-light" : phase.id === 2 ? "border-purple" : phase.id === 3 ? "border-purple-dark" : "border-brand-black";
  const lightBgClass = phase.id === 1 ? "bg-purple/10" : phase.id === 2 ? "bg-purple-light/10" : phase.id === 3 ? "bg-purple-dark/10" : "bg-brand-black/10";
  const badgeTextClass = phase.id === 1 ? "text-purple-light" : phase.id === 2 ? "text-purple" : phase.id === 3 ? "text-purple-dark" : "text-brand-black";

  return (
    <div className={`relative mt-5 rounded-sm p-5 overflow-hidden bg-white border-2 ${borderClass}`}>
      <div className="relative flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest ${bgClass} ${textClass}`}>
              {phase.subtitle} - {phase.label}
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-4 text-brand-black">
            {phase.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {phase.projects.map((p: any) => (
              <Link
                key={p.name}
                href={p.link}
                className={`flex items-start gap-2 px-3 py-2 rounded-sm cursor-pointer transition-all hover:scale-105 border ${borderClass} ${lightBgClass}`}
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
                      <FaChevronRight className="opacity-0 hover:opacity-100 ml-1.5" size={10} color="#650199" />
                    </div>
                  </div>
                  <div className="text-[10px] mt-0.5 text-brand-grey">
                    {p.desc}
                  </div>
                </div>
              </Link>
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
