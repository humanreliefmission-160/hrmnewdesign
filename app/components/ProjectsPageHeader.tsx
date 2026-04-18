"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import YellowCTA from './YellowCTA';

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  breadcrumb?: string;
  image?: string;
  display?: boolean;
}

export default function ProjectsPageHeader({
  title,
  subtitle,
  breadcrumb = "PROJECTS",
  image = "/img-placeholder.JPG", // default placeholder based on screenshot
  display = true
}: PageHeaderProps) {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [isOtherAmount, setIsOtherAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  if (!display) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row bg-purple-dark text-brand-white lg:shadow-xl relative z-10 w-full sm:shadow-none sm:pt-0">
      {/* Left Content Half */}
      <div className="w-full md:w-[50%] flex justify-end">
        {/* Inner container to align with max-w grid, 570px + some padding */}
        <div className="w-full max-w-[600px] px-6 py-12 md:px-8 md:py-24 lg:py-32 xl:pl-0 flex flex-col items-start text-left">
          <div className="text-[0.75rem] font-bold tracking-widest uppercase mb-2 text-brand-white">
            <Link href="/projects" className="hover:text-brand-lgrey/50 transition-colors">
              {breadcrumb}
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-body leading-tight text-left">
            {title}
          </h1>

          <p className="leading-[1.6] text-brand-white/85 text-[1.1rem] max-w-[500px] mb-8 text-left">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 justify-center sm:justify-start">
            {['£1', '£5', '£10', 'Other Amount'].map((amount, idx) => {
              if (amount === 'Other Amount') {
                if (isOtherAmount) {
                  return (
                    <div key={idx} className="relative flex items-center">
                      <span className="absolute left-3 text-brand-white/90">
                        <strong>£</strong>
                      </span>
                      <input
                        type="number"
                        autoFocus
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="border-2 border-purple-light bg-transparent text-brand-white/90 px-4 py-1.5 md:py-2 pl-7 w-32 text-[0.95rem] font-semibold outline-none rounded-[2px] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Amount"
                      />
                      <button
                        onClick={() => setIsOtherAmount(false)}
                        className="absolute right-2 text-brand-white/50 hover:text-brand-white text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  );
                }
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsOtherAmount(true);
                      setSelectedAmount(null);
                    }}
                    className="border-2 border-purple-light/50 text-brand-white/90 px-4 py-1.5 md:py-2 text-[0.95rem] font-semibold hover:bg-purple hover:border-purple hover:text-white transition-all rounded-[2px]"
                  >
                    {amount}
                  </button>
                );
              }

              const isSelected = selectedAmount === amount && !isOtherAmount;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setIsOtherAmount(false);
                  }}
                  className={`border-2 px-4 py-1.5 md:py-2 text-[0.95rem] font-semibold transition-all rounded-[2px] ${isSelected
                    ? "border-purple text-white bg-purple"
                    : "border-purple-light/50 text-brand-white/90 hover:bg-purple hover:border-purple hover:text-white"
                    }`}
                >
                  {amount}
                </button>
              );
            })}
          </div>

          <YellowCTA
            href='/donate'
            text='Add to Donation Basket'
          />
        </div>
      </div>

      {/* Right Image Half */}
      <div className="w-full md:w-[50%] relative min-h-[300px] sm:min-h-[400px] md:min-h-auto flex items-stretch bg-brand-white">
        <img
          src={image}
          alt="Human Relief Mission Project header"
          className="absolute inset-0 w-full h-full object-cover object-center lg:p-0"
        />
      </div>
    </div>
  );
}