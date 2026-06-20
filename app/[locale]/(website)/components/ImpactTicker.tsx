"use client";

interface ImpactTickerProps {
  items: string[];
}

export default function ImpactTicker({ items }: ImpactTickerProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-brand-black py-2 overflow-hidden">
      <div className="flex gap-16 animate-ticker whitespace-nowrap">
        {/* First pass */}
        {items.map((item, i) => (
          <div
            key={`a-${i}`}
            className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0"
          >
            {item}
          </div>
        ))}
        {/* Duplicate for seamless infinite loop */}
        {items.map((item, i) => (
          <div
            key={`b-${i}`}
            className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
