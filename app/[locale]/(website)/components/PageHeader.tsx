import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  breadcrumb?: string;
  centered?: boolean;
  display?: boolean;
  /** When true, reduces top padding so the purple bg sits flush under the navbar */
  logoOverlap?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  centered = true,
  display = true,
  logoOverlap = false,
}: PageHeaderProps) {
  return (
    <div className={`bg-purple-dark ${logoOverlap ? 'pt-6' : 'pt-16'} pb-16 px-4 md:px-8 text-brand-white ${display ? "" : "hidden"} ${centered ? 'text-center' : ''}`}>
      <div className="max-w-285 mx-auto">
        {display && <div className="text-[0.75rem] font-bold tracking-widest uppercase mb-4 text-brand-white hover:text-brand-lgrey/50">
          <Link href="/" className="transition-colors ">
            Home
          </Link>
          {breadcrumb && <> / <span className="text-white hover:text-brand-lgrey/50">{breadcrumb}</span></>}
        </div>}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-body leading-tight">
          {title}
        </h1>
        <p className={`leading-[1.7] ${centered ? 'text-brand-white/80 text-[1.1rem] mx-auto' : 'text-lg md:text-xl text-brand-white/85 max-w-150'}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}