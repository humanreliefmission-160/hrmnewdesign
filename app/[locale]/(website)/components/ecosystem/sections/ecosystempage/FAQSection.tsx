"use client"

import { useState } from "react";
import { EcosystemStage } from "../../data/ecosystemData";

type Props = {
	stage: EcosystemStage;
};

export default function FAQSection({ stage }: Props) {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section className="bg-brand-white py-16 px-6 md:px-12 lg:px-24">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-4">
						FAQ
					</span>
					<h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-brand-grey text-base max-w-lg mx-auto">
						Everything you need to know about the {stage.name} stage, your impact, and how to get involved.
					</p>
				</div>

				{/* Accordion */}
				<div className="space-y-3">
					{stage.faqs.map((faq, i) => {
						const isOpen = openIndex === i;
						return (
							<div
								key={i}
								className={`bg-brand-white rounded-sm border transition-all duration-200 ${isOpen ? "border-purple shadow-sm" : "border-gray-200"
									}`}
							>
								<button
									onClick={() => setOpenIndex(isOpen ? null : i)}
									className="w-full flex items-center justify-between px-6 py-5 text-left"
								>
									<span
										className={`font-semibold text-base pr-4 ${isOpen ? "text-purple" : "text-brand-black"
											}`}
									>
										{faq.question}
									</span>
									<div
										className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-purple" : "bg-purple"
											}`}
									>
										{isOpen ? (
											<svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
											</svg>
										) : (
											<svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
											</svg>
										)}
									</div>
								</button>

								{isOpen && (
									<div className="px-6 pb-5 border-t border-brand-lgrey">
										<p className="text-brand-black/75 leading-relaxed text-sm pt-4">{faq.answer}</p>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Footer */}
				<div className="text-center mt-10">
					<p className="text-brand-grey text-sm">Still have questions?</p>
					<p className="text-brand-black text-sm mt-1">
						Get in touch with our team:{" "}
						<a
							href="mailto:info@humanreliefmission.com"
							className="text-purple font-medium hover:underline"
						>
							info@humanreliefmission.com
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
