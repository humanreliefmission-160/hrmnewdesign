import YellowCTA from "./YellowCTA";

const impactCards = [
	{
		id: 1,
		stat: "500",
		unit: "homes",
		label: "Home Construction",
		description: "Families sheltered through emergency housing builds across affected regions.",
		tag: "Infrastructure",
		tagColor: "bg-purple-600",
		image: "/img-placeholder.jpg",
		link: "#",
		accentColor: "from-purple-900/90",
	},
	{
		id: 2,
		stat: "300",
		unit: "bags",
		label: "Bags Distributed",
		description: "School bags packed with stationery handed to children in underserved communities.",
		tag: "Education",
		tagColor: "bg-yellow-400",
		tagTextColor: "text-black",
		image: "/img-placeholder.jpg",
		link: "#",
		accentColor: "from-yellow-900/90",
	},
	{
		id: 3,
		stat: "50",
		unit: "meals",
		label: "Hot Meals",
		description: "Nutritious hot meals served daily to vulnerable individuals and families.",
		tag: "Healthcare",
		tagColor: "bg-emerald-600",
		image: "/img-placeholder.jpg",
		link: "#",
		accentColor: "from-emerald-900/90",
	},
];

export default function LastMonthImpact() {
	return (
		<section className="bg-white w-full pt-16 pb-20 px-4 sm:px-8 lg:px-16">
			<div className="max-w-6xl mx-auto">

				{/* ── Header Block ── */}
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
					<div>
						{/* Eyebrow */}
						<span className="inline-flex items-center gap-2 text-xs font-bold text-purple bg-purple-faint px-3 py-2 rounded-sm mb-3 ">
							Monthly Update
						</span>

						{/* Main heading */}
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-black tracking-tight leading-none">
							Last Months
							<br />
							<span className="text-[#6B00B6]">Impact</span>
						</h1>

						{/* Subheading */}
						<p className="text-brand-black/75 text-base mt-4 max-w-md">
							Check out how you helped in{" "}
							<span className="font-bold text-brand-black">March</span>. Every
							contribution made a real difference on the ground.
						</p>
					</div>

					{/* Desktop CTA top-right */}
					<div className="hidden sm:block shrink-0">
						<YellowCTA
							href="/projects"
							text="View All Projects"
						/>
					</div>
				</div>

				{/* ── Impact Cards ── */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					{impactCards.map((card, index) => (
						<div
							key={card.id}
							className="relative overflow-hidden rounded-lg group cursor-pointer"
							style={{ height: "440px" }}
						>
							{/* Background Image */}
							<img
								src={card.image}
								alt={card.label}
								className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
							/>

							{/* Layered gradients for depth */}
							<div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80" />
							<div className={`absolute inset-0 bg-linear-to-t ${card.accentColor} to-transparent opacity-40`} />

							{/* Top: Tag badge */}
							<div className="absolute top-4 left-4">
								<span
									className={`${card.tagColor} ${card.tagTextColor ?? "text-white"} text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm`}
								>
									{card.tag}
								</span>
							</div>

							{/* Bottom: Content */}
							<div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
								{/* Big stat */}
								<div className="flex items-baseline gap-1.5 mb-0.5">
									<span className="text-white font-bold text-6xl leading-none drop-shadow-xl">
										{card.stat}
									</span>
									<span className="text-brand-white font-semibold text-lg lowercase">
										{card.unit}
									</span>
								</div>

								{/* Label */}
								<p className={`text-brand-white font-bold text-sm mb-2 px-2 py-1`}>
									{card.label}
								</p>

								{/* Description — fades in on hover */}
								<p className="text-brand-white/75 text-xs leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
									{card.description}
								</p>

								{/* Bottom row */}
								<div className="flex items-center justify-between pt-3 border-t border-white/50">
									<a
										href={card.link}
										className="text-white text-[11px] font-bold italic underline underline-offset-2 hover:text-yellow-400 transition-colors uppercase tracking-wide"
									>
										How Can You Help
									</a>
									<span className="text-brand-white text-[10px] font-semibold uppercase tracking-widest">
										#{index + 1}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* ── Stats summary bar ── */}
				<div className="mt-8 grid grid-cols-3 divide-x divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
					{impactCards.map((card) => (
						<div key={card.id} className="flex flex-col items-center justify-center py-5 px-4 bg-gray-50 hover:bg-[#6B00B6] hover:text-white group/stat transition-colors duration-300">
							<span className="text-3xl font-black text-[#6B00B6] group-hover/stat:text-white transition-colors">
								{card.stat}
							</span>
							<span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover/stat:text-white/70 transition-colors mt-0.5">
								{card.label}
							</span>
						</div>
					))}
				</div>

				{/* ── Mobile CTA ── */}
				<div className="mt-8 sm:hidden">
					<a
						href="#"
						className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-sm px-7 py-3.5 rounded-sm transition-all duration-200 uppercase tracking-wide w-full justify-center"
					>
						View All Projects
						<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
				</div>

			</div>
		</section>
	);
}
