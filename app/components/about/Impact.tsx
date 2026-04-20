export default function Impact() {
  return (
    <section className="bg-brand-white py-20 px-4 md:px-8">
      <div className="max-w-[1140px] mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-block bg-purple/10 text-purple font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4"
          >
            Our Numbers
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-tight capitalize">
            {"The impact you have helped Make"}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-purple-light/5 border border-purple/20 p-8 rounded-sm text-center shadow-card backdrop-blur-sm">
            <div className="text-4xl mb-4">🌍</div>
            <div className="text-5xl font-bold text-purple leading-none mb-2">45+</div>
            <div className="text-lg sm:text-md text-brand-black font-medium">Countries</div>
          </div>
          <div className="bg-purple-light/5 border border-purple/20 p-8 rounded-sm text-center shadow-card backdrop-blur-sm">
            <div className="text-4xl mb-4">👥</div>
            <div className="text-5xl font-bold text-purple leading-none mb-2">2M+</div>
            <div className="text-lg sm:text-md text-brand-black font-medium">Beneficiaries</div>
          </div>
          <div className="bg-purple-light/5 border border-purple/20 p-8 rounded-sm text-center shadow-card backdrop-blur-sm">
            <div className="text-4xl mb-4">🏗️</div>
            <div className="text-5xl font-bold text-purple leading-none mb-2">500+</div>
            <div className="text-lg sm:text-md text-brand-black font-medium">Projects Completed</div>
          </div>
          <div className="bg-purple-light/5 border border-purple/20 p-8 rounded-sm text-center shadow-card backdrop-blur-sm">
            <div className="text-4xl mb-4">❤️</div>
            <div className="text-5xl font-bold text-purple leading-none mb-2">20+</div>
            <div className="text-lg sm:text-md text-brand-black font-medium">Years of Service</div>
          </div>
        </div>
      </div>
    </section>
  )
}
