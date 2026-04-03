"use client";

import Link from "next/link";
import YellowCTA from "./YellowCTA";

export default function ProjectsGrid() {
  return (
    <section className="py-20 px-4 md:px-8 bg-brand-white">
      <div className="max-w-[1140px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <div className="inline-block bg-purple-faint text-purple font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4">How To Help</div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-[1.2rem]">Our Projects</h2>
            <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
              From emergency food aid to long term education, our projects create lasting change.
            </p>
          </div>
          <YellowCTA text="Support a Project" href="/donate" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* Card 1 */}
          <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
            <div className="aspect-4/3 relative overflow-hidden">
              <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline" >Infrastructure</Link>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
              <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                Providing school bags, stationery, and supplies so children
                can focus on learning and achieving their dreams.
              </p>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                <Link href="/donate" className="text-purple font-bold text-sm hover:underline">
                  Find out More
                </Link>
                <Link href="/about" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
            <div className="aspect-4/3 relative overflow-hidden">
              <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline" >Infrastructure</Link>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
              <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                Providing school bags, stationery, and supplies so children
                can focus on learning and achieving their dreams.
              </p>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                <Link href="/donate" className="text-purple font-bold text-sm hover:underline">
                  Find out More
                </Link>
                <Link href="/about" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
            <div className="aspect-4/3 relative overflow-hidden">
              <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline" >Infrastructure</Link>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
              <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                Providing school bags, stationery, and supplies so children
                can focus on learning and achieving their dreams.
              </p>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                <Link href="/donate" className="text-purple font-bold text-sm hover:underline">
                  Find out More
                </Link>
                <Link href="/about" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
