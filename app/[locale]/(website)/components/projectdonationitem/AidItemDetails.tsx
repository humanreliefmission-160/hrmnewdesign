"use client"

import { useState } from "react";
import PortableTextRenderer from "../PortableTextRenderer";
import type { DonationItemData } from "../../types/donationItem";

interface AccordionItemProps {
	title: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<div className="border-b border-brand-lgrey">
			<button
				onClick={() => setOpen((o) => !o)}
				className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-brand-black hover:text-brand-grey transition-colors"
			>
				{title}
				<svg
					className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
					fill="none"
					stroke="currentColor"
					strokeWidth={2.5}
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
			{open && (
				<div className="pb-4 text-sm text-brand-grey leading-relaxed">
					{children}
				</div>
			)}
		</div>
	);
}

export default function AidItemDetails({ item }: { item: DonationItemData }) {
	const hasBody = item.donationItemBody && item.donationItemBody.length > 0;
	const hasFeatures = item.keyFeatures && item.keyFeatures.length > 0;
	const hasHowItHelps = item.howItHelps && item.howItHelps.length > 0;
	const hasEndGoal = Boolean(item.endGoal);
	const hasSummarise = Boolean(item.summarise);

	if (!hasBody && !hasFeatures && !hasHowItHelps && !hasEndGoal && !hasSummarise) {
		return null;
	}

	return (
		<div className="mt-10 border-t border-brand-lgrey pt-8">
			{hasBody && (
				<div className="mb-8 portable-text text-sm text-brand-grey leading-relaxed">
					<PortableTextRenderer value={item.donationItemBody} />
				</div>
			)}

			{hasFeatures && (
				<div className="mb-8">
					<h3 className="mb-4 text-sm font-bold text-brand-black">Key Features:</h3>
					<ul className="space-y-2">
						{item.keyFeatures!.map(({ title, text }) => (
							<li key={title} className="flex gap-2 text-sm text-brand-grey">
								<span className="mt-0.5 shrink-0 text-brand-black">•</span>
								<span>
									<span className="font-semibold text-brand-black underline">{title}:</span>{" "}
									{text}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}

			<div className="border-t border-brand-lgrey">
				{hasHowItHelps && (
					<AccordionItem title="How it helps">
						<ul className="space-y-1.5">
							{item.howItHelps!.map((entry) => (
								<li key={entry.text}>• {entry.text}</li>
							))}
						</ul>
					</AccordionItem>
				)}

				{hasEndGoal && (
					<AccordionItem title="End Goal">
						<p>{item.endGoal}</p>
					</AccordionItem>
				)}

				{hasSummarise && (
					<div className="mb-8 rounded-sm border border-purple-light bg-purple-faint px-5 py-4 flex flex-col items-start text-sm font-semibold text-purple">
						<p>{item.summarise}</p>
					</div>
				)}
			</div>
		</div>
	);
}
