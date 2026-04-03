"use client";

import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div id="page-about" className="block min-h-screen">
      <div className="bg-purple pt-32 pb-16 px-4 md:px-8 text-brand-white">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-[0.75rem] font-bold tracking-widest uppercase mb-4 text-brand-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>{" "}
            / <span className="text-white">About Us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-body leading-tight">
            About Human Relief
            <br />
            Mission
          </h1>
          <p className="text-lg md:text-xl text-brand-white/85 max-w-[600px] leading-[1.7]">
            We are a UK-based international humanitarian charity, delivering
            relief and development aid to communities facing crisis, poverty, and
            inequality.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 md:px-8 bg-brand-white">
        <div className="max-w-[1140px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-purple-faint text-purple font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4">Our Story</div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-6 leading-tight">Who We Are</h2>
              <p className="text-[1.05rem] text-brand-grey leading-[1.8] mb-6">
                Founded in 2003, Human Relief Mission has grown into a trusted
                international charity operating in over 45 countries. We respond
                to emergencies with speed and care, while also investing in
                long-term development programmes that build sustainable futures.
              </p>
              <p className="text-[1rem] text-brand-grey leading-[1.8] mb-8">
                Our dedicated team of volunteers and staff are driven by a
                belief that every person — regardless of where they were born —
                deserves dignity, safety, and opportunity.
              </p>
              <Link href="/donate" className="inline-flex items-center gap-2 font-bold text-base cursor-pointer transition-all duration-200 no-underline px-6 py-3.5 bg-purple text-brand-white hover:bg-purple-dark hover:-translate-y-0.5 hover:shadow-btn-purple">
                Support Our Mission
              </Link>
            </div>
            <div className="bg-brand-lgrey rounded-2xl flex items-center justify-center text-[5rem] aspect-square">🌍</div>
          </div>
        </div>
      </section>

      <section className="bg-purple py-20 px-4 md:px-8">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block bg-brand-white/15 text-brand-white font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4"
            >
              Our Numbers
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-white leading-tight">
              {"The Impact We've Made"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-brand-white/12 border border-brand-white/20 p-8 rounded-xl text-center shadow-card backdrop-blur-sm">
              <div className="text-4xl mb-4">🌍</div>
              <div className="text-4xl font-bold text-yellow leading-none mb-2">45+</div>
              <div className="text-[0.875rem] text-brand-white/70 font-medium">Countries</div>
            </div>
            <div className="bg-brand-white/12 border border-brand-white/20 p-8 rounded-xl text-center shadow-card backdrop-blur-sm">
              <div className="text-4xl mb-4">👥</div>
              <div className="text-4xl font-bold text-yellow leading-none mb-2">2M+</div>
              <div className="text-[0.875rem] text-brand-white/70 font-medium">Beneficiaries</div>
            </div>
            <div className="bg-brand-white/12 border border-brand-white/20 p-8 rounded-xl text-center shadow-card backdrop-blur-sm">
              <div className="text-4xl mb-4">🏗️</div>
              <div className="text-4xl font-bold text-yellow leading-none mb-2">500+</div>
              <div className="text-[0.875rem] text-brand-white/70 font-medium">Projects Completed</div>
            </div>
            <div className="bg-brand-white/12 border border-brand-white/20 p-8 rounded-xl text-center shadow-card backdrop-blur-sm">
              <div className="text-4xl mb-4">❤️</div>
              <div className="text-4xl font-bold text-yellow leading-none mb-2">20+</div>
              <div className="text-[0.875rem] text-brand-white/70 font-medium">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-brand-white">
        <div className="max-w-[1140px] mx-auto">
          <div className="inline-block bg-purple-faint text-purple font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4">What Drives Us</div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-4 leading-tight">Our Core Values</h2>
          <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px] mb-12">
            Every action we take is guided by these principles.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-brand-white p-8 rounded-xl shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
              <div className="text-3xl mb-4">🤝</div>
              <div className="font-bold text-lg mb-2 text-brand-black">Compassion</div>
              <p className="text-brand-grey text-[0.95rem] leading-[1.6]">
                We approach every beneficiary with empathy and dignity,
                recognising their humanity above all else.
              </p>
            </div>
            <div className="bg-brand-white p-8 rounded-xl shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
              <div className="text-3xl mb-4">🔍</div>
              <div className="font-bold text-lg mb-2 text-brand-black">Transparency</div>
              <p className="text-brand-grey text-[0.95rem] leading-[1.6]">
                We publish detailed annual reports and maintain full
                accountability to our donors and the communities we serve.
              </p>
            </div>
            <div className="bg-brand-white p-8 rounded-xl shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
              <div className="text-3xl mb-4">⚡</div>
              <div className="font-bold text-lg mb-2 text-brand-black">Rapid Response</div>
              <p className="text-brand-grey text-[0.95rem] leading-[1.6]">
                When disasters strike, we mobilise quickly. Speed saves lives,
                and our teams are always ready to deploy.
              </p>
            </div>
            <div className="bg-brand-white p-8 rounded-xl shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
              <div className="text-3xl mb-4">🌱</div>
              <div className="font-bold text-lg mb-2 text-brand-black">Sustainability</div>
              <p className="text-brand-grey text-[0.95rem] leading-[1.6]">
                Beyond emergency relief, we build lasting infrastructure and
                skills that empower communities for generations.
              </p>
            </div>
            <div className="bg-brand-white p-8 rounded-xl shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
              <div className="text-3xl mb-4">🌐</div>
              <div className="font-bold text-lg mb-2 text-brand-black">Inclusivity</div>
              <p className="text-brand-grey text-[0.95rem] leading-[1.6]">
                We serve all people regardless of religion, ethnicity, gender, or
                nationality. Humanity is our only criterion.
              </p>
            </div>
            <div className="bg-brand-white p-8 rounded-xl shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
              <div className="text-3xl mb-4">🏆</div>
              <div className="font-bold text-lg mb-2 text-brand-black">Excellence</div>
              <p className="text-brand-grey text-[0.95rem] leading-[1.6]">
                We hold ourselves to the highest professional standards because
                the people we serve deserve nothing less.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-brand-white">
        <div className="max-w-[1140px] mx-auto">
          <div className="inline-block bg-purple-faint text-purple font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4">The People Behind It</div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-4 leading-tight">Our Leadership Team</h2>
          <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px] mb-12">
            Dedicated professionals committed to making a difference every single
            day.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-brand-white p-6 rounded-xl border border-brand-lgrey shadow-card text-center hover:shadow-card-hover transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👨‍💼</div>
              <div className="font-bold text-lg text-brand-black">Ahmed Hassan</div>
              <div className="text-[0.85rem] text-brand-grey font-medium">Chief Executive Officer</div>
            </div>
            <div className="bg-brand-white p-6 rounded-xl border border-brand-lgrey shadow-card text-center hover:shadow-card-hover transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👩‍💼</div>
              <div className="font-bold text-lg text-brand-black">Sarah Mitchell</div>
              <div className="text-[0.85rem] text-brand-grey font-medium">Director of Operations</div>
            </div>
            <div className="bg-brand-white p-6 rounded-xl border border-brand-lgrey shadow-card text-center hover:shadow-card-hover transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👨‍⚕️</div>
              <div className="font-bold text-lg text-brand-black">Dr. Yusuf Ali</div>
              <div className="text-[0.85rem] text-brand-grey font-medium">Head of Programmes</div>
            </div>
            <div className="bg-brand-white p-6 rounded-xl border border-brand-lgrey shadow-card text-center hover:shadow-card-hover transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👩‍🔬</div>
              <div className="font-bold text-lg text-brand-black">Fatima Khan</div>
              <div className="text-[0.85rem] text-brand-grey font-medium">Head of Fundraising</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

