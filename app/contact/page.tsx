"use client";

import { useState } from "react";
import PageHeader from "../components/PageHeader";
import YellowCTA from "../components/YellowCTA";

export default function Contact() {
  const [contactSuccess, setContactSuccess] = useState(false);

  const submitContact = () => {
    setContactSuccess(true);
    setTimeout(() => {
      const el = document.getElementById("contactSuccess");
      if (el) {
        window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div id="page-contact" className="block min-h-screen">
      <PageHeader
        title="Get In Touch"
        subtitle={<>Have a question, want to volunteer, or need to reach our team? We'd love to hear from you.</>}
        breadcrumb="Contact Us"
        display={true}
      />

      <section className="py-20 px-4 md:px-8 bg-brand-white">
        <div className="max-w-[1140px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 mt-12 items-start">
            <div>
              <div className="bg-brand-white p-8 rounded-xl shadow-card border border-brand-lgrey">
                <div className="font-bold text-[1.1rem] mb-6 text-brand-black">
                  Contact Information
                </div>
                <div className="flex gap-4 mb-6 last:mb-0">
                  <div className="w-10 h-10 bg-purple-faint rounded-full flex items-center justify-center text-xl shrink-0">📍</div>
                  <div>
                    <div className="text-[0.75rem] font-bold text-purple uppercase tracking-widest mb-1">Address</div>
                    <div className="text-brand-black font-medium leading-relaxed">
                      Unit 12, Business Hub<br />
                      Leeds, LS1 2AB, UK
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mb-6 last:mb-0">
                  <div className="w-10 h-10 bg-purple-faint rounded-full flex items-center justify-center text-xl shrink-0">📞</div>
                  <div>
                    <div className="text-[0.75rem] font-bold text-purple uppercase tracking-widest mb-1">Phone</div>
                    <div className="text-brand-black font-medium leading-relaxed">+44 (0)113 000 0000</div>
                  </div>
                </div>
                <div className="flex gap-4 mb-6 last:mb-0">
                  <div className="w-10 h-10 bg-purple-faint rounded-full flex items-center justify-center text-xl shrink-0">✉️</div>
                  <div>
                    <div className="text-[0.75rem] font-bold text-purple uppercase tracking-widest mb-1">Email</div>
                    <div className="text-brand-black font-medium leading-relaxed">
                      info@humanreliefmission.org
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mb-6 last:mb-0">
                  <div className="w-10 h-10 bg-purple-faint rounded-full flex items-center justify-center text-xl shrink-0">🕒</div>
                  <div>
                    <div className="text-[0.75rem] font-bold text-purple uppercase tracking-widest mb-1">Office Hours</div>
                    <div className="text-brand-black font-medium leading-relaxed">Mon–Fri: 9am – 5pm</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-6 bg-purple rounded-xl text-brand-white">
                <div className="font-bold text-base mb-2 font-body">
                  Want to Volunteer?
                </div>
                <p className="text-sm text-brand-white/80 leading-[1.6] mb-4">
                  Join our global network of volunteers and help us deliver aid
                  to those who need it most.
                </p>
                <YellowCTA
                  text="Apply to Volunteer"
                  className="w-full justify-center py-3"
                />
              </div>
            </div>
            <div className="bg-brand-white p-8 md:p-10 rounded-xl shadow-card border border-brand-lgrey">
              <div className="font-bold text-[1.4rem] mb-2 font-body text-brand-black">
                Send Us a Message
              </div>
              <p className="text-sm text-brand-grey mb-8">
                We aim to respond within 1–2 business days.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="block text-sm font-bold text-brand-black">First Name *</label>
                  <input className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 bg-brand-white" type="text" placeholder="John" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="block text-sm font-bold text-brand-black">Last Name *</label>
                  <input
                    className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 bg-brand-white"
                    type="text"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="block text-sm font-bold text-brand-black">Email Address *</label>
                <input
                  className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 bg-brand-white"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="block text-sm font-bold text-brand-black">Phone Number</label>
                <input
                  className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 bg-brand-white"
                  type="tel"
                  placeholder="+44 7700 000000"
                />
              </div>
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="block text-sm font-bold text-brand-black">Subject *</label>
                <select className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all bg-brand-white">
                  <option value="">Select a subject...</option>
                  <option>General Enquiry</option>
                  <option>Donation Query</option>
                  <option>Volunteer Application</option>
                  <option>Partnership</option>
                  <option>Media &amp; Press</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 mb-6">
                <label className="block text-sm font-bold text-brand-black">Message *</label>
                <textarea
                  className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 min-h-[120px] bg-brand-white"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                className="w-full inline-flex items-center justify-center gap-2 font-bold text-base cursor-pointer transition-all duration-200 no-underline px-6 py-4 bg-purple text-brand-white hover:bg-purple-dark hover:-translate-y-0.5 hover:shadow-btn-purple leading-none"
                onClick={submitContact}
              >
                Send Message →
              </button>
              <div
                className={`mt-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-lg text-sm font-medium ${contactSuccess ? "block" : "hidden"}`}
                id="contactSuccess"
              >
                ✅ Thank you! Your message has been sent. {"We'll"} be in touch
                shortly.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

