"use client";

import PageHeader from "../components/PageHeader";
import YellowCTA from "../components/YellowCTA";
import Link from "next/link";

export default function Contact() {

  return (
    <div id="page-projects" className="block min-h-screen">
      <PageHeader
        title="Projects"
        subtitle={<>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat semper feugiat. Lorem ipsum dolor.</>}
        breadcrumb="Projects"
        display={true}
      />

      <section className="py-20 px-4 md:px-8 bg-brand-white">
        <div className="max-w-[1140px] mx-auto">

          {/* Food Aid Section */}
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-[1.2rem]">Food Aid</h2>
            <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
              Providing food to those in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {/* Card 1 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-12 h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-brand-purple to-transparent opacity-50 dark:via-purple" />


          {/* Healthcare Section */}
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-[1.2rem]">Healthcare</h2>
            <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
              Providing healthcare to those in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {/* Card 1 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-12 h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-brand-purple to-transparent opacity-50 dark:via-purple" />


          {/* Water Aid Section */}
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-[1.2rem]">Water Aid</h2>
            <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
              Providing clean water to those in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {/* Card 1 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-12 h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-brand-purple to-transparent opacity-50 dark:via-purple" />

          {/* Infrastructure Section */}
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-[1.2rem]">Infrastructure</h2>
            <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
              Providing infrastructure to those in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {/* Card 1 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-12 h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-brand-purple to-transparent opacity-50 dark:via-purple" />

          {/* Sponsorships Section */}
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-[1.2rem]">Sponsorships</h2>
            <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
              Providing sponsorships to those in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {/* Card 1 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-12 h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-brand-purple to-transparent opacity-50 dark:via-purple" />

          {/* Income Generation Section */}
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-[1.2rem]">Income Generation</h2>
            <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
              Providing a means to generate income to those in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {/* Card 1 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-12 h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-brand-purple to-transparent opacity-50 dark:via-purple" />

          {/* Islamic Projects Section */}
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-[1.2rem]">Islamic Projects</h2>
            <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
              Promoting Islamic values and practices through various projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {/* Card 1 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group">
              <div className="aspect-4/3 relative overflow-hidden">
                <img src="/img-placeholder.JPG" alt="Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Link href="/infrastructure" className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline">Infrastructure</Link>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">Bags for Students</h3>
                <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                  Providing school bags, stationery, and supplies so children can focus on learning and achieving their dreams.
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                  <YellowCTA text="Find out more" />
                  <Link href="/donate" className="text-brand-black font-bold text-sm underline hover:text-brand-grey">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          </div>






        </div>
      </section>
    </div>
  );
}

