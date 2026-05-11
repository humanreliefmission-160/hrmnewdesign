"use client"

import { useState } from "react";
import Link from "next/link";
import { EcosystemStage } from "../../data/ecosystemData";

type Props = {
  stage: EcosystemStage;
};

const stageColors: Record<number, string> = {
  1: "bg-red-100 text-red-700",
  2: "bg-blue-100 text-blue-700",
  3: "bg-green-100 text-green-700",
  4: "bg-yellow-100 text-yellow-800",
};

export default function HeroSection({ stage }: Props) {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const presets = [5, 10, 25, 50];

  const handlePreset = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const displayAmount = customAmount
    ? `£${customAmount}`
    : amount
      ? `£${amount}`
      : "Select amount";

  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left: Content */}
        <div className="bg-purple-800 px-8 py-16 lg:px-16 lg:py-20 flex flex-col justify-center">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-purple-300 text-xs uppercase tracking-widest hover:text-white transition-colors">
              Ecosystem
            </Link>
            <span className="text-purple-400 text-xs">›</span>
            <span className="text-purple-200 text-xs uppercase tracking-widest">{stage.name}</span>
          </div>

          {/* Stage badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded ${stageColors[stage.stageNumber]}`}>
              Stage {stage.stageNumber}
            </span>
            <span className="text-purple-300 text-xs uppercase tracking-widest font-medium">
              {stage.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-4">
            {stage.name}
          </h1>
          <p className="text-purple-200 text-lg leading-relaxed mb-8 max-w-md">
            {stage.shortDescription}
          </p>

          {/* Donation widget */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-5 max-w-md">
            <p className="text-purple-200 text-xs uppercase tracking-widest font-semibold mb-3">
              Donate to this stage
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePreset(p)}
                  className={`px-4 py-2 rounded font-bold text-sm border transition-all ${amount === p && !customAmount
                    ? "bg-white text-purple-800 border-white"
                    : "border-white/40 text-white hover:border-white hover:bg-white/10"
                    }`}
                >
                  £{p}
                </button>
              ))}
              <input
                type="number"
                placeholder="Other"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount(null);
                }}
                className="px-3 py-2 rounded border border-white/40 bg-transparent text-white placeholder-purple-300 text-sm w-24 focus:outline-none focus:border-white"
              />
            </div>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded text-sm transition-colors">
              Add to Donation Basket — {displayAmount}
            </button>
          </div>

          {/* Project tags */}
          <div className="mt-6">
            <p className="text-purple-300 text-xs uppercase tracking-widest mb-3 font-medium">
              Projects in this stage
            </p>
            <div className="flex flex-wrap gap-2">
              {stage.projects.map((project) => (
                <span
                  key={project.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20"
                >
                  <span>{project.icon}</span>
                  {project.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative overflow-hidden min-h-[400px] lg:min-h-0">
          <img
            src={stage.heroImage}
            alt={`${stage.name} stage`}
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay with stage progress */}
          <div className="bg-linear-to-t from-black/60 via-transparent to-transparent h-full w-full flex items-end p-8">
            <div className="w-full">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-3 font-medium">
                Zakat Transformation Journey
              </p>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`h-1.5 flex-1 rounded-full transition-all ${n <= stage.stageNumber ? "bg-yellow-400" : "bg-white/30"
                      }`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                {["Essentials", "Stability", "Development", "Sustainability"].map((name, i) => (
                  <span
                    key={name}
                    className={`text-xs font-medium ${i + 1 <= stage.stageNumber ? "text-yellow-400" : "text-white/40"
                      }`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
