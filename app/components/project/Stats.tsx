const impactStats = [
  { value: "94%", label: "Of enrolled children complete the programme" },
  { value: "3x", label: "More likely to attend secondary school" },
  { value: "£1 = 4hrs", label: "Of quality teaching time funded" },
  { value: "78%", label: "Improvement in literacy within 6 months" },
];

export default function Stats() {
  return (
    <section>
      <div className="bg-purple">

        {/* Impact of Donating */}
        <div className="px-8 py-14 text-brand-white text-center max-w-[1140px] mx-auto">
          <span className="inline-block bg-purple-light/75 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-4">
            Impact of Donating
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Donation by the Numbers</h2>
          <p className="text-purple-200 max-w-xl mx-auto text-base mb-12">
            Real, verifiable outcomes that show the power of your generosity — backed by our field data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-1 gap-6">
            {impactStats.map((s) => (
              <div key={s.label} className="bg-white/10 rounded-sm py-8 px-4">
                <p className="text-4xl font-extrabold text-brand-white mb-2">{s.value}</p>
                <p className="text-sm text-purple-100 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
