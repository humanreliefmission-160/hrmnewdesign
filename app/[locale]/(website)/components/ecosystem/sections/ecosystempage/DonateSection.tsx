"use client"

import { useState } from "react";
import { EcosystemStage, Project } from "../../data/ecosystemData";

type Props = {
	stage: EcosystemStage;
};

type ProjectCardProps = {
	project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
	const [selectedAmount, setSelectedAmount] = useState<number>(
		project.amounts.find((a) => a.isDefault)?.value ?? project.amounts[0].value
	);
	const [customAmount, setCustomAmount] = useState("");
	const [isZakat, setIsZakat] = useState(false);
	const [added, setAdded] = useState(false);

	const handleAdd = () => {
		setAdded(true);
		setTimeout(() => setAdded(false), 2000);
	};

	const effectiveAmount = customAmount ? `£${customAmount}` : `£${selectedAmount}`;

	return (
		<div className="bg-brand-white rounded-sm p-7 flex flex-col gap-5 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
			{/* Header */}
			<div className="flex items-start gap-4">
				<div className="w-12 h-12 rounded-sm bg-purple-faint flex items-center justify-center text-2xl shrink-0">
					{project.icon}
				</div>
				<div>
					<h3 className="font-bold text-gray-900 text-lg leading-tight">{project.name}</h3>
					<p className="text-purple text-xs mt-1">{project.tagline}</p>
				</div>
			</div>

			{/* Price badge */}
			<div className="flex flex-row items-end gap-1 bg-purple-dark px-4 py-2 text-brand-white rounded-sm w-max">
				<h2 className="text-2xl font-bold">
					£{project.suggestedAmount}
				</h2>
				<span className="text-[10px] text-brand-white rounded-sm uppercase">
					{project.frequency}
				</span>
			</div>

			{/* Description */}
			<p className="text-brand-black/75 text-sm leading-relaxed">{project.description}</p>

			{/* Amount selector */}
			<div className="flex flex-wrap gap-2 items-center">
				{project.amounts.map((a) => (
					<button
						key={a.value}
						onClick={() => {
							setSelectedAmount(a.value);
							setCustomAmount("");
						}}
						className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-all duration-200 ${selectedAmount === a.value && !customAmount
							? "bg-purple text-white border-purple"
							: "bg-white/50 text-brand-black/80 border-brand-lgrey hover:border-purple/50"
							}`}
					>
						{a.label}
					</button>
				))}
				<input
					type="number"
					placeholder="£ Other"
					value={customAmount}
					onChange={(e) => {
						setCustomAmount(e.target.value);
						setSelectedAmount(0);
					}}
					className="px-3 py-2 rounded-sm border border-gray-300 text-gray-700 text-sm w-24 focus:outline-none focus:border-purple/50 focus:ring-2 focus:ring-purple/50"
				/>
			</div>

			{/* Zakat checkbox */}
			<div className="flex gap-2 items-center">
				<input
					type="checkbox"
					checked={isZakat}
					onChange={(e) => setIsZakat(e.target.checked)}
					className="accent-purple cursor-pointer w-4 h-4"
				/>
				<span className="italic text-xs font-medium text-brand-grey">I want this to be treated as Zakat</span>
			</div>

			{/* CTA */}
			<div className="flex flex-col gap-4 justify-between items-left sm:flex sm:justify-between sm:gap-2 mt-auto">
				<button
					onClick={handleAdd}
					className={`w-full py-3 rounded-full font-bold text-sm transition-all duration-300 ${added
						? "bg-green-500 text-white"
						: "bg-brand-yellow hover:bg-yellow-500 text-brand-black"
						}`}
				>
					{added ? "Added to Basket!" : `Add to Donation Basket — ${effectiveAmount}`}
				</button>
				<button className="w-full underline text-sm font-semibold text-purple py-1 transition-colors">
					Find out more
				</button>
			</div>
		</div>
	);
}

export default function DonateSection({ stage }: Props) {
	return (
		<section className="bg-purple-dark py-16 px-6 md:px-12 lg:px-24">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<span className="inline-block bg-purple-light/50 text-brand-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-3">
						Donate Today
					</span>
					<h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-4">
						Choose Your Donation
					</h2>
					<p className="text-brand-white max-w-2xl mx-auto text-base">
						Every item below directly benefits someone in need. Select the amount that feels right for
						you — no donation is too small, and 100% of your Zakat gift reaches the project.
					</p>
				</div>

				{/* Project cards */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{stage.projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>

				{/* Bottom note */}
				<p className="text-center text-purple-300 text-sm mt-10">
					All donations are processed securely. Zakat-eligible projects are verified by our Sharia advisory team.
				</p>
			</div>
		</section>
	);
}
