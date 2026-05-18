"use client"

import YellowCTA from "../../YellowCTA";
import { ecosystemStages } from "../data/ecosystemData";
import Link from "next/link";

export default function BottomCTA() {

  return (
    <section className="bg-purple-dark py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to Change a Life?
        </h2>
        <p className="text-brand-white/75 text-lg mb-8 leading-relaxed">
          Every donation — no matter the size — moves someone one step closer to becoming a Zakat payer
          themselves. Start with Stage 1 or support any stage of the journey.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {ecosystemStages.map((stage) => (
            <Link
              key={stage.slug}
              href={`/ecosystem/${stage.slug}`}
              className="border border-brand-white/50 text-brand-white hover:bg-brand-white hover:text-purple-dark font-bold text-sm px-5 py-2.5 rounded-sm transition-all self-center"
            >
              {stage.name}
            </Link>
          ))}
          <YellowCTA
            href="/ecosystem/essentials"
            text="Donate Now"
          />
        </div>
      </div>
    </section>
  )
}