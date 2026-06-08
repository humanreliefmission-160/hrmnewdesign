"use client";

import { useState } from "react";
import YellowCTA from "./YellowCTA";

export default function NewsletterForm() {
  const [isPending, setIsPending] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState("");
  const [subscribeError, setSubscribeError] = useState("");


  return (
    <section className="bg-purple py-20 px-4 md:px-8">
      <div className="max-w-[1140px] mx-auto">
        <div
          className="inline-block bg-brand-white/15 text-brand-white font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4"
        >
          Stay Connected
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-[1.2rem]">Keep In Touch</h2>
        <p className="text-[1.05rem] text-brand-white/75 leading-[1.7] max-w-[600px]">
          Get updates about our lifesaving work around the world. Join over
          50,000 supporters.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <input
            className="flex-1 max-w-[200px] min-w-[150px] px-5 py-3.5 border-2 border-brand-white/25 bg-brand-white/10 text-brand-white font-body text-[0.9rem] outline-none transition-colors focus:border-purple-light placeholder:text-brand-white/50 rounded-sm"
            type="text"
            placeholder="First Name"
          />
          <input
            className="flex-1 max-w-[200px] min-w-[150px] px-5 py-3.5 border-2 border-brand-white/25 bg-brand-white/10 text-brand-white font-body text-[0.9rem] outline-none transition-colors focus:border-purple-light placeholder:text-brand-white/50 rounded-sm"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-wrap gap-4 mt-8 max-w-[560px]">
          <input
            className="flex-1 px-5 py-3.5 border-2 border-brand-white/25 bg-brand-white/10 text-brand-white font-body text-[0.9rem] outline-none transition-colors focus:border-purple-light placeholder:text-brand-white/50 rounded-sm"
            type="email"
            placeholder="Email Address"
          />
          <YellowCTA text="Subscribe" />
        </div>
      </div>
    </section>
  );
}
