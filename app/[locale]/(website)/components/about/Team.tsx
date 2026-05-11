export default function Team() {
	return (
		<section className="py-20 px-4 md:px-8 bg-brand-white">
			<div className="max-w-[1140px] mx-auto">
				<div className="inline-block bg-purple-faint text-purple font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4">The People Behind It</div>
				<h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-4 leading-tight">Our Leadership Team</h2>
				<p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px] mb-12">
					Dedicated professionals committed to making a difference every single
					day.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
					<div className="bg-brand-white p-6 rounded-sm border border-purple/10 shadow-card text-center hover:shadow-card-hover transition-all group">
						<div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👨‍💼</div>
						<div className="font-bold text-lg text-brand-black">Ahmed Hassan</div>
						<div className="text-[0.85rem] text-brand-black/75 font-medium">Chief Executive Officer</div>
					</div>
					<div className="bg-brand-white p-6 rounded-sm border border-purple/10 shadow-card text-center hover:shadow-card-hover transition-all group">
						<div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👩‍💼</div>
						<div className="font-bold text-lg text-brand-black">Sarah Mitchell</div>
						<div className="text-[0.85rem] text-brand-black/75 font-medium">Director of Operations</div>
					</div>
					<div className="bg-brand-white p-6 rounded-sm border border-purple/10 shadow-card text-center hover:shadow-card-hover transition-all group">
						<div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👨‍⚕️</div>
						<div className="font-bold text-lg text-brand-black">Dr. Yusuf Ali</div>
						<div className="text-[0.85rem] text-brand-black/75 font-medium">Head of Programmes</div>
					</div>
					<div className="bg-brand-white p-6 rounded-sm border border-purple/10 shadow-card text-center hover:shadow-card-hover transition-all group">
						<div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👩‍🔬</div>
						<div className="font-bold text-lg text-brand-black">Fatima Khan</div>
						<div className="text-[0.85rem] text-brand-black/75 font-medium">Head of Fundraising</div>
					</div>
				</div>
			</div>
		</section>
	)
}
