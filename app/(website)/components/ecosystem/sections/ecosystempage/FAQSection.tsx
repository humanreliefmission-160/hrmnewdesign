"use client"

import { useState } from "react";
import { EcosystemStage } from "../../data/ecosystemData";

type Props = {
	stage: EcosystemStage;
};

export default function FAQSection({ stage }: Props) {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section className="bg-gray-50 py-20 px-4">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
						FAQ
					</span>
					<h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-gray-500 text-base max-w-lg mx-auto">
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
								className={`bg-white rounded-xl border transition-all duration-200 ${isOpen ? "border-purple-300 shadow-sm" : "border-gray-200"
									}`}
							>
								<button
									onClick={() => setOpenIndex(isOpen ? null : i)}
									className="w-full flex items-center justify-between px-6 py-5 text-left"
								>
									<span
										className={`font-semibold text-base pr-4 ${isOpen ? "text-purple-700" : "text-gray-900"
											}`}
									>
										{faq.question}
									</span>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-purple-700" : "bg-purple-700"
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
									<div className="px-6 pb-5 border-t border-purple-100">
										<p className="text-gray-600 leading-relaxed text-sm pt-4">{faq.answer}</p>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Footer */}
				<div className="text-center mt-10">
					<p className="text-gray-500 text-sm">Still have questions?</p>
					<p className="text-gray-600 text-sm mt-1">
						Get in touch with our team:{" "}
						<a
							href="mailto:info@humanreliefmission.com"
							className="text-purple-700 font-medium hover:underline"
						>
							info@humanreliefmission.com
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
