import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  breadcrumb?: string;
  centered?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  centered = true
}: PageHeaderProps) {
  return (
    <div className={`bg-purple pt-32 pb-16 px-4 md:px-8 text-brand-white ${centered ? 'text-center' : ''}`}>
      <div className="max-w-[1140px] mx-auto">
        <div className="text-[0.75rem] font-bold tracking-widest uppercase mb-4 text-brand-white hover:text-brand-lgrey">
          <Link href="/" className="transition-colors ">
            Home
          </Link>
          {breadcrumb && <> / <span className="text-white">{breadcrumb}</span></>}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-body leading-tight">
          {title}
        </h1>
        <p className={`leading-[1.7] ${centered ? 'text-brand-white/80 text-[1.1rem] max-w-[500px] mx-auto' : 'text-lg md:text-xl text-brand-white/85 max-w-[600px]'}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
