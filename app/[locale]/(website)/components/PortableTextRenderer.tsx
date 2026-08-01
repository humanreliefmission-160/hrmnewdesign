'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-brand-black/80 leading-[1.8] mb-5 text-[1.05rem]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black font-body mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-brand-black font-body mt-8 mb-3 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-brand-black font-body mt-6 mb-2">
        {children}
      </h4>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-brand-black">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-purple underline underline-offset-2 hover:text-purple-dark transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-1.5 text-brand-black/80 text-[1.05rem]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-brand-black/80 text-[1.05rem]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.7]">{children}</li>,
    number: ({ children }) => <li className="leading-[1.7]">{children}</li>,
  },
};

interface PortableTextRendererProps {
  value: any[];
  className?: string;
}

export default function PortableTextRenderer({ value, className = '' }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null;
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
