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
		<div className="bg-white rounded-2xl p-6 flex flex-col gap-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
			{/* Header */}
			<div className="flex items-start gap-4">
				<div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl shrink-0">
					{project.icon}
				</div>
				<div>
					<h3 className="font-bold text-gray-900 text-lg leading-tight">{project.name}</h3>
					<p className="text-purple-600 text-sm font-medium mt-0.5">{project.tagline}</p>
				</div>
			</div>

			{/* Price badge */}
			<div className="flex items-center gap-2">
				<span className="bg-purple-800 text-white text-sm font-bold px-3 py-1 rounded">
					£{project.suggestedAmount}
				</span>
				<span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
					{project.frequency}
				</span>
			</div>

			{/* Description */}
			<p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>

			{/* Amount selector */}
			<div className="flex flex-wrap gap-2 items-center">
				{project.amounts.map((a) => (
					<button
						key={a.value}
						onClick={() => {
							setSelectedAmount(a.value);
							setCustomAmount("");
						}}
						className={`px-3 py-1.5 rounded text-sm font-semibold border transition-all ${selectedAmount === a.value && !customAmount
							? "bg-purple-800 text-white border-purple-800"
							: "border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-700"
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
					}}
					className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 text-sm w-24 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
				/>
			</div>

			{/* Zakat checkbox */}
			<label className="flex items-center gap-2 cursor-pointer">
				<input
					type="checkbox"
					checked={isZakat}
					onChange={(e) => setIsZakat(e.target.checked)}
					className="w-4 h-4 accent-purple-700"
				/>
				<span className="text-gray-600 text-sm">I want this to be treated as Zakat</span>
			</label>

			{/* CTA */}
			<div className="flex flex-col gap-2 mt-auto">
				<button
					onClick={handleAdd}
					className={`w-full py-3 rounded font-bold text-sm transition-all ${added
						? "bg-green-500 text-white"
						: "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
						}`}
				>
					{added ? "✓ Added to Basket!" : `Add to Donation Basket — ${effectiveAmount}`}
				</button>
				<button className="w-full text-purple-700 text-sm font-medium hover:underline py-1 transition-colors">
					Find out more
				</button>
			</div>
		</div>
	);
}

export default function DonateSection({ stage }: Props) {
	return (
		<section className="bg-purple-800 py-20 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
						Donate Today
					</span>
					<h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
						Choose Your Donation
					</h2>
					<p className="text-purple-200 max-w-xl mx-auto text-base leading-relaxed">
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
