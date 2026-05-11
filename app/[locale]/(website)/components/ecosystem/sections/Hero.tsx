"use client"

import { useState } from "react";
import { ecosystemStages, stageConfig } from "../data/ecosystemData";
import YellowCTA from "../../YellowCTA";


export default function EcosystemHero() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const activeStageData = activeStage !== null
    ? ecosystemStages.find((s) => s.stageNumber === activeStage)
    : null;

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <span className="inline-block bg-purple-faint text-purple text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm mb-8">
              Zakat Transformation Ecosystem
            </span>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-6">
              From{" "}
              <span className="text-purple underline decoration-purple-300 decoration-4 underline-offset-4">
                Receiving
              </span>{" "}
              Zakat to{" "}
              <span className="text-purple underline decoration-purple-300 decoration-4 underline-offset-4">
                Paying
              </span>{" "}
              Zakat
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-lg">
              Our 4 phase ecosystem lifts the needy out of poverty, providing{" "}
              <strong className="text-purple-700">Essentials</strong>, building{" "}
              <strong className="text-gray-900">Stability</strong>, enabling{" "}
              <strong className="text-purple-700">Development</strong> and creating{" "}
              <strong className="text-gray-900">Sustainability</strong> so every recipient becomes
              a contributor.
            </p>

          </div>

          {/* Right — Stage cards grid */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stageConfig.map((stage) => (
                <button
                  key={stage.stageNumber}
                  onClick={() =>
                    setActiveStage(activeStage === stage.stageNumber ? null : stage.stageNumber)
                  }
                  className={`text-left bg-white rounded-sm p-5 border-2 shadow-sm transition-all hover:shadow-md cursor-pointer ${activeStage === stage.stageNumber
                    ? "border-purple-700 shadow-purple/25"
                    : "border-transparent hover:border-purple/50"
                    } ${stage.stageNumber === 4 ? "ring-2 ring-purple" : ""}`}
                >
                  <div className="flex gap-4 items-center mb-1">
                    <p className="text-brand-grey text-sm font-semibold">
                      Stage {stage.stageNumber}
                    </p>
                    <span className={`text-[0.5em] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${stage.badgeBg}`}>
                      {stage.badge}
                    </span>
                  </div>
                  <p className="font-bold text-brand-black text-lg">{stage.name}</p>
                  <p className="text-brand-grey text-sm">
                    {stage.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Zakat Journey Bar */}
            <div className="mt-6 bg-white rounded-sm p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-brand-grey text-xs font-medium">Zakat Receiver</span>
                <span className="text-brand-black text-xs font-bold">Zakat Payer</span>
              </div>
              <div className="flex gap-1.5">
                {stageConfig.map((_s, i) => (
                  <div key={i} className="flex-1 h-2.5 rounded-full bg-purple opacity-[0.25] hover:opacity-100 transition-opacity" style={{ opacity: 0.25 + i * 0.25 }} />
                ))}
              </div>
              <div className="flex gap-1.5 mt-1">
                {stageConfig.map((s) => (
                  <p key={s.slug} className="flex-1 text-center text-gray-500 text-[10px] font-medium">{s.name}</p>
                ))}
              </div>
            </div>

            {/* Hint */}
            <p className="text-center font-medium text-brand-grey/75 text-xs mt-3 italic">
              Click on the cards above to see more detail
            </p>
          </div>
        </div>

        {/* Expanded Stage Detail Popup */}
        {activeStageData && (
          <div className="mt-8 bg-white rounded-sm border-2 border-purple-light p-6 shadow-lg max-w-2xl mx-auto lg:mx-0 lg:ml-auto lg:mr-0">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-brand-black text-brand-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                Stage {activeStageData.stageNumber} — {activeStageData.name.toUpperCase()}
              </span>
              <button
                onClick={() => setActiveStage(null)}
                className="w-7 h-7 rounded-full bg-brand-lgrey/75 hover:bg-brand-lgrey flex items-center justify-center text-brand-black/85 text-sm font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <p className="text-brand-black text-sm leading-relaxed mb-5">
              {activeStageData.shortDescription}
            </p>

            {/* Projects */}
            <div className="space-y-2 mb-5">
              {activeStageData.projects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <span className="text-xl">{p.icon}</span>
                  <div>
                    <p className="font-bold text-brand-black text-sm">{p.name}</p>
                    <p className="text-brand-grey text-xs">{p.tagline}</p>
                  </div>
                </div>
              ))}
            </div>

            <YellowCTA
              href={`/ecosystem/${activeStageData.slug}`}
              text={`Support ${activeStageData.name} Stage`}
            />
          </div>
        )}
      </div>
    </section>
  )
}