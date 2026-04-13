import React from 'react';
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
  breadcrumb = "HOME",
  image = "/img-placeholder.JPG", // default placeholder based on screenshot
  display = true
}: PageHeaderProps) {
  if (!display) return null;

  return (
    <div className="w-full flex flex-col md:flex-row bg-purple-dark text-brand-white shadow-xl relative z-10 w-full">
      {/* Left Content Half */}
      <div className="w-full md:w-[50%] flex justify-end">
        {/* Inner container to align with max-w grid, 570px + some padding */}
        <div className="w-full max-w-[600px] px-6 py-12 md:px-8 md:py-24 lg:py-32 xl:pl-0 flex flex-col justify-center items-start text-left">
          <div className="text-[0.75rem] font-bold tracking-widest uppercase mb-2 text-brand-white">
            <Link href="/" className="hover:text-brand-lgrey/50 transition-colors">
              {breadcrumb}
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-body leading-tight">
            {title}
          </h1>

          <p className="leading-[1.6] text-brand-white/85 text-[1.1rem] max-w-[500px] mb-8">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
            {['£1', '£5', '£10', 'Other Amount'].map((amount, idx) => (
              <button
                key={idx}
                className="border-2 border-purple-light/70 text-brand-white/90 px-4 py-1.5 md:py-2 text-[0.95rem] font-semibold hover:bg-purple hover:border-purple hover:text-white transition-all rounded-[2px]"
              >
                {amount}
              </button>
            ))}
          </div>

          <YellowCTA
            href='/donate'
            text='Add to Donation Basket'
          />
        </div>
      </div>

      {/* Right Image Half */}
      <div className="w-full md:w-[50%] relative min-h-[300px] sm:min-h-[400px] md:min-h-auto flex items-stretch">
        <img
          src={image}
          alt="Project header"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}