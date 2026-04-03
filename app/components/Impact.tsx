"use client";

import Link from "next/link";
import YellowCTA from "./YellowCTA";

export default function Impact() {
  return (
    <section className="py-20 px-4 md:px-8 bg-brand-white">
      <div className="max-w-[1140px] mx-auto">
        <div className="inline-block bg-purple-faint text-purple font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4">Our Track Record</div>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-[1.2rem]">{`Last Year's Impact`}</h2>
        <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
          Every pound donated creates real, measurable change in the lives of
          people who need it most.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="bg-brand-white rounded-xl p-8 text-center shadow-card hover:-translate-y-1 transition-transform duration-300">
            <div className="text-[2.5rem] mb-4">🍽️</div>
            <div className="text-[2.2rem] font-bold text-purple leading-none">500M</div>
            <div className="text-[0.875rem] text-brand-grey mt-2 font-medium">Hot Meals Served</div>
          </div>
          <div className="bg-brand-white rounded-xl p-8 text-center shadow-card hover:-translate-y-1 transition-transform duration-300">
            <div className="text-[2.5rem] mb-4">🎒</div>
            <div className="text-[2.2rem] font-bold text-purple leading-none">50K+</div>
            <div className="text-[0.875rem] text-brand-grey mt-2 font-medium">Student Bags Delivered</div>
          </div>
          <div className="bg-brand-white rounded-xl p-8 text-center shadow-card hover:-translate-y-1 transition-transform duration-300">
            <div className="text-[2.5rem] mb-4">💧</div>
            <div className="text-[2.2rem] font-bold text-purple leading-none">200K</div>
            <div className="text-[0.875rem] text-brand-grey mt-2 font-medium">Families with Clean Water</div>
          </div>
          <div className="bg-brand-white rounded-xl p-8 text-center shadow-card hover:-translate-y-1 transition-transform duration-300">
            <div className="text-[2.5rem] mb-4">🏥</div>
            <div className="text-[2.2rem] font-bold text-purple leading-none">150K</div>
            <div className="text-[0.875rem] text-brand-grey mt-2 font-medium">Medical Treatments Given</div>
          </div>
        </div>
        <div className="mt-10">
          <YellowCTA text="Donate Now" href="/donate" />
        </div>
      </div>
    </section>
  );
}