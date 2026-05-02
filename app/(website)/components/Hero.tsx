"use client";

import YellowCTA from "./YellowCTA";

export default function HeroTwo() {
  return (
    <section className="relative w-full lg:h-[92vh] flex flex-col md:h-[84vh] sm:h-[70vh] h-[75vh] lg:px-20 lg:py-20 sm:px-5 sm:py-10 px-5 py-10">
      <div className="absolute inset-0 z-0">
        <img
          src="/img-placeholder.JPG"
          alt="Humanitarian aid worker with beneficiaries at refugee camp"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay — stronger at bottom-left for text readability */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,26,26,0.75)_10%,rgba(26,26,26,0.45)_40%,rgba(26,26,26,0.25)_60%,rgba(26,26,26,0.35)_100%)]" />
        {/* Left-side gradient for text area */}
        {/* <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,26,26,0.5)_0%,rgba(26,26,26,0.15)_70%,transparent_100%)]"
        /> */}
      </div>

      <div className="flex-1 flex items-end text-white relative z-10 justify-items-start">
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 font-body">Donate your Zakat today</h1>
          <p className="text-xl md:text-2xl text-white/90">Content goes here...</p>
          <YellowCTA text="Donate Now" href="/donate" className="mt-8" />
        </div>
      </div>
    </section>
  );
}
