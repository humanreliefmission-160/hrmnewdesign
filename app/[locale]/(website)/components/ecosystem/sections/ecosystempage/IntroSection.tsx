import { EcosystemStage } from "../../data/ecosystemData";

type Props = {
	stage: EcosystemStage;
};

export default function IntroSection({ stage }: Props) {
	const { intro } = stage;

	return (
		<section className="bg-gray-50 py-20 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Eyebrow + Heading */}
				<div className="text-center mb-14">
					<span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
						{intro.eyebrow}
					</span>
					<h2 className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight max-w-3xl mx-auto">
						{intro.title}
					</h2>
				</div>

				{/* Stats Row */}
				<div className="grid grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
					{intro.stats.map((stat, i) => (
						<div
							key={i}
							className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100"
						>
							<p className="text-3xl font-black text-purple-700 mb-1">{stat.value}</p>
							<p className="text-gray-500 text-sm leading-tight">{stat.label}</p>
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
								<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
									<svg className="w-4 h-4 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h3 className="text-lg font-bold text-gray-900">Why This Stage Exists</h3>
							</div>
							<p className="text-gray-600 leading-relaxed pl-11">{intro.why}</p>
						</div>

						{/* How */}
						<div>
							<div className="flex items-center gap-3 mb-3">
								<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
									<svg className="w-4 h-4 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
									</svg>
								</div>
								<h3 className="text-lg font-bold text-gray-900">How We Do It</h3>
							</div>
							<p className="text-gray-600 leading-relaxed pl-11">{intro.how}</p>
						</div>
					</div>

					{/* Right column */}
					<div className="space-y-8">
						{/* Vision */}
						<div>
							<div className="flex items-center gap-3 mb-3">
								<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
									<svg className="w-4 h-4 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
								</div>
								<h3 className="text-lg font-bold text-gray-900">Long-Term Vision</h3>
							</div>
							<p className="text-gray-600 leading-relaxed pl-11">{intro.vision}</p>
						</div>

						{/* Donor CTA box */}
						<div className="bg-purple-700 rounded-xl p-6">
							<div className="flex items-center gap-3 mb-3">
								<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
									<svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
									</svg>
								</div>
								<h3 className="text-lg font-bold text-white">What You Can Do</h3>
							</div>
							<p className="text-purple-100 leading-relaxed pl-11">{intro.donorCta}</p>
							<div className="pl-11 mt-4">
								<button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm px-5 py-2.5 rounded transition-colors">
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
