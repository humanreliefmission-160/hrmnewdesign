"use client"

import { ecosystemStages } from "../data/ecosystemData";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function StagesCard() {


  return (
    <section className="bg-purple-faint/50 py-16 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-purple-faint text-purple text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm mb-4">
            Explore All Stages
          </span>
          <h2 className="text-3xl font-black text-gray-900">
            Four Stages. One Transformation.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ecosystemStages.map((stage) => (
            <Link
              key={stage.slug}
              href={`/ecosystem/${stage.slug}`}
              className="group rounded-sm overflow-hidden border border-brand-lgrey shadow-sm hover:shadow-lg transition-all bg-brand-white/50"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={stage.heroImage}
                  alt={stage.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-brand-grey font-semibold uppercase tracking-wider">
                    Stage {stage.stageNumber}
                  </span>
                  <span className="text-xs bg-purple-100 text-purple font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                    {stage.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{stage.name}</h3>
                <p className="text-brand-black/75 text-sm leading-snug mb-4">{stage.tagline}</p>
                <div className="flex items-center gap-1 text-purple-light text-sm font-semibold group-hover:gap-2 transition-all">
                  <span>Explore stage</span>
                  <FaChevronRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}