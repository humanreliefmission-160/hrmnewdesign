"use client";

import { useState } from "react";
import YellowCTA from "./YellowCTA";
import { subscribeNewsletter } from "@/app/actions";

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setSubscribeError("Email address is required.");
      return;
    }

    setIsPending(true);
    setSubscribeSuccess("");
    setSubscribeError("");

    try {
      const res = await subscribeNewsletter(firstName, lastName, email);
      if (res.success) {
        if (res.alreadyExists) {
          setSubscribeSuccess("You have already subscribed to our newsletter!");
        } else {
          setSubscribeSuccess("Thank you for subscribing to our newsletter!");
        }
        setFirstName("");
        setLastName("");
        setEmail("");
      } else {
        setSubscribeError(res.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setSubscribeError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

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
          Get updates about our lifesaving work around the world. Join our supporters.
        </p>

        <form onSubmit={handleSubscribe}>
          <div className="flex flex-wrap gap-4 mt-6">
            <input
              className="flex-1 max-w-[200px] min-w-[150px] px-5 py-3.5 border-2 border-brand-white/25 bg-brand-white/10 text-brand-white font-body text-[0.9rem] outline-none transition-colors focus:border-purple-light placeholder:text-brand-white/50 rounded-sm"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isPending}
            />
            <input
              className="flex-1 max-w-[200px] min-w-[150px] px-5 py-3.5 border-2 border-brand-white/25 bg-brand-white/10 text-brand-white font-body text-[0.9rem] outline-none transition-colors focus:border-purple-light placeholder:text-brand-white/50 rounded-sm"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-8 max-w-[560px]">
            <input
              className="flex-1 px-5 py-3.5 border-2 border-brand-white/25 bg-brand-white/10 text-brand-white font-body text-[0.9rem] outline-none transition-colors focus:border-purple-light placeholder:text-brand-white/50 rounded-sm"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
            />
            <YellowCTA
              text={isPending ? "Subscribing..." : "Subscribe"}
              disabled={isPending}
            />
          </div>
        </form>

        {/* Status Messages */}
        {subscribeSuccess && (
          <div className="mt-4 bg-[#139901] font-regular text-xs italic text-brand-white py-1.5 px-3 w-fit rounded-sm">
            {subscribeSuccess}
          </div>
        )}
        {subscribeError && (
          <div className="mt-4 bg-[#B60000] font-regular text-xs italic text-brand-white py-1.5 px-3 w-fit rounded-sm">
            {subscribeError}
          </div>
        )}
      </div>
    </section>
  );
}
