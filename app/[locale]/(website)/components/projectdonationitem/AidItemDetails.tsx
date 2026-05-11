"use client"

import { useState } from "react";

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
					className={`"h-4 w-4 shrink-0 transition-transform duration-200", ${open ? "rotate-180" : ""}`}
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

export default function AidItemDetails() {
	return (
		<div className="mt-10 border-t border-brand-lgrey pt-8">
			{/* Description */}
			<div className="mb-8">
				<p className="text-sm text-brand-grey leading-relaxed">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis imperdiet tortor, quis convallis dolor finibus a. Donec vestibulum eros massa, nec dictum orci ultrices id.
				</p>
			</div>

			{/* Key Features */}
			<div className="mb-8">
				<h3 className="mb-4 text-sm font-bold text-brand-black">Key Features:</h3>
				<ul className="space-y-2">
					{[
						{
							title: "Feature 1",
							desc: "Lorem Ipsum elit dolor",
						},
						{
							title: "Feature 2",
							desc: "Lorem Ipsum elit dolor",
						},
						{
							title: "Feature 3",
							desc: "Lorem Ipsum elit dolor",
						},
						{
							title: "Feature 4",
							desc: "Lorem Ipsum elit dolor",
						},
						{
							title: "Feature 5",
							desc: "Lorem Ipsum elit dolor",
						},
					].map(({ title, desc }) => (
						<li key={title} className="flex gap-2 text-sm text-brand-grey">
							<span className="mt-0.5 shrink-0 text-brand-black">•</span>
							<span>
								<span className="font-semibold text-brand-black underline">{title}:</span>{" "}
								{desc}
							</span>
						</li>
					))}
				</ul>
			</div>

			{/* Accordion Sections */}
			<div className="border-t border-brand-lgrey">

				<AccordionItem title="How it helps those in Afghanistan">
					<ul className="space-y-1.5">
						<li>• Spot clean fabric with a damp cloth — avoid harsh chemicals.</li>
						<li>• Rotate mattress every 3 months for even wear.</li>
						<li>• Do not place in direct sunlight for extended periods.</li>
						<li>• Vacuum upholstery gently with an upholstery attachment.</li>
					</ul>
				</AccordionItem>

				<AccordionItem title="End Goal">
					<p>
						Lorem ipsum elit dolor...
						The aim for this project is to help a family pay Zakat instead of receiving zakat.
					</p>
				</AccordionItem>

				{/* Charity Banner */}
				<div className="mb-8 rounded-sm border border-purple-light bg-purple-faint px-5 py-4 flex flex-col items-start text-sm font-semibold text-purple">
					<p className="">Your donation helps humanity through welfare</p>
					<p className="mt-1 text-xs text-purple/75 leading-relaxed">
						100% of the donation goes to helping families in Afghanistan become self sustainable.
					</p>
				</div>
			</div>
		</div>
	);
}
