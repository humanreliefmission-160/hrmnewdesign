"use client";

export default function ImpactTicker() {
  return (
    <div className="bg-brand-black py-2 overflow-hidden">
      <div className="flex gap-16 animate-ticker whitespace-nowrap">
        <div className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0">500,000,000 Hot Meals Served</div>
        <div className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0">Education for 50,000+ Children</div>
        <div className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0">Clean Water for 200,000 Families</div>
        <div className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0">Medical Aid in 45 Countries</div>
        <div className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0">Emergency Relief Deployed Worldwide</div>
        
        {/* DUPLICATE FOR INFINITE LOOP */}
        <div className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0">500,000,000 Hot Meals Served</div>
        <div className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0">Education for 50,000+ Children</div>
        <div className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0">Clean Water for 200,000 Families</div>
        <div className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0">Medical Aid in 45 Countries</div>
        <div className="flex items-center gap-3 text-brand-white font-semibold text-[0.875rem] tracking-wide shrink-0">Emergency Relief Deployed Worldwide</div>
      </div>
    </div>
  );
}

