import { EcosystemStage } from "../../data/ecosystemData";

type Props = {
	stage: EcosystemStage;
};

export default function IntroSection({ stage }: Props) {
	const { intro } = stage;

	return (
		<section className="pt-16 pb-0 sm:py-16 px-6 md:px-12 lg:px-24">
			<div className="max-w-5xl mx-auto">
				{/* Eyebrow + Heading */}
				<div className="text-center mb-14">
					<span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-4">
						{intro.eyebrow}
					</span>
					<h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6 leading-tight max-w-3xl mx-auto">
						{intro.title}
					</h2>
				</div>

				{/* Stats Row */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto align-middle">
					{intro.stats.map((stat, i) => (
						<div
							key={i}
							className="bg-purple/5 rounded-sm py-6 px-4 border border-purple-100 flex flex-col items-center justify-center text-center"
						>
							<p className="text-2xl font-bold text-purple sm:text-3xl mb-1">{stat.value}</p>
							<p className="text-sm text-brand-black mt-1 font-medium leading-tight">{stat.label}</p>
						</div>
					))}
				</div>

				{/* Content Grid */}
				<div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
					{/* Left column */}
					<div className="space-y-8">
						{/* Why */}
						<div>
							<div className="flex items-center gap-3 mb-3">
								<div className="w-8 h-8 rounded-sm bg-purple/10 flex items-center justify-center shrink-0">
									<svg className="w-4 h-4 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h3 className="text-lg font-bold text-brand-black">Why This Stage Exists</h3>
							</div>
							<p className="text-brand-black text-base leading-relaxed pl-11">{intro.why}</p>
						</div>

						{/* How */}
						<div>
							<div className="flex items-center gap-3 mb-3">
								<div className="w-8 h-8 rounded-sm bg-purple/10 flex items-center justify-center shrink-0">
									<svg className="w-4 h-4 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
									</svg>
								</div>
								<h3 className="text-lg font-bold text-brand-black">How We Do It</h3>
							</div>
							<p className="text-brand-black text-base leading-relaxed pl-11">{intro.how}</p>
						</div>
					</div>

					{/* Right column */}
					<div className="space-y-8">
						{/* Vision */}
						<div>
							<div className="flex items-center gap-3 mb-3">
								<div className="w-8 h-8 rounded-sm bg-purple/10 flex items-center justify-center shrink-0">
									<svg className="w-4 h-4 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
								</div>
								<h3 className="text-lg font-bold text-brand-black">Long-Term Vision</h3>
							</div>
							<p className="text-brand-black text-base leading-relaxed pl-11">{intro.vision}</p>
						</div>

						{/* Donor CTA box */}
						<div className="bg-purple-dark rounded-sm p-6">
							<div className="flex items-center gap-3 mb-3">
								<div className="w-8 h-8 rounded-sm bg-brand-white/20 flex items-center justify-center shrink-0">
									<svg className="w-4 h-4 text-brand-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
									</svg>
								</div>
								<h3 className="text-lg font-bold text-brand-white">What You Can Do</h3>
							</div>
							<p className="text-brand-white/85 leading-relaxed pl-11">{intro.donorCta}</p>
							<div className="pl-11 mt-4">
								<button className="bg-brand-yellow hover:bg-yellow-500 text-brand-black font-bold uppercase tracking-widest text-sm px-5 py-2.5 rounded-sm transition-colors">
									Donate to {stage.name}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
