export default function Intro() {
  return (
    <section className="py-4 sm:py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          Education Project
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6 leading-tight">
          Giving Every Child the Gift of Education
        </h2>
        <p className="text-brand-black text-base leading-relaxed max-w-2xl mx-auto">
          From remote villages in Pakistan to refugee settlements in East Africa, your donation funds life-changing
          opportunities for the most vulnerable children — giving them a foundation to thrive, contribute, and lead
          their communities into a brighter future.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 align-middle">
          {[
            { value: "50,000+", label: "Children Educated" },
            { value: "120+", label: "Schools Supported" },
            { value: "30+", label: "Countries Reached" },
            { value: "£2M+", label: "Raised to Date" },
          ].map((stat) => (
            <div key={stat.label} className="bg-purple/5 rounded-sm py-6 px-4 border border-purple-100 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-purple sm:text-3xl">{stat.value}</p>
              <p className="text-sm text-brand-black mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
