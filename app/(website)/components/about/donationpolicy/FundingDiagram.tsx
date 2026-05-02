/* Recreates the funding-flow diagram from the image:
	 Four dashed-circle sources → connecting lines → UK Administration box */

import { RiAdminFill } from "react-icons/ri";
import GiftAidIcon from "../../icons/GiftAid";
import { FaShoppingBag } from "react-icons/fa";
import { MdRecycling } from "react-icons/md";

const SOURCES = [
	{
		id: "admin",
		label: "Donations specified for administration",
		icon: <RiAdminFill size={45} fill="#650199" />,
		isGiftAid: false,
	},
	{
		id: "giftaid",
		label: "Tax relief claimed on donations",
		icon: <GiftAidIcon fill="#650199" />,
		isGiftAid: true,
	},
	{
		id: "shops",
		label: "Profits from Charity Shops",
		icon: <FaShoppingBag size={45} fill="#650199" />,
		isGiftAid: false,
	},
	{
		id: "recycling",
		label: "Proceeds from recycled clothing",
		icon: <MdRecycling size={45} fill="#650199" />,
		isGiftAid: false,
	},
];

const ADMIN_ITEMS = [
	"UK and Overseas Salaries",
	"Buildings Maintenance and Vans",
	"Utility Bills",
	"Fundraising",
];

export default function FundingDiagram() {
	return (
		<div className="flex flex-col items-center gap-0 select-none w-full">

			{/* ── Source circles row ─────────────────────────────────────── */}
			<div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 justify-items-center">
				{SOURCES.map((src) => (
					<div key={src.id} className="flex flex-col items-center">
						{/* circle */}
						<div className="flex flex-col items-center justify-center w-36 h-36 rounded-full text-center px-3 gap-1 bg-white/75 shadow-lg">
							<span>{src.icon}</span>
							<p className="text-[0.65rem] leading-snug text-brand-black/75 font-medium mt-0.5">
								{src.label}
							</p>
						</div>

						{/* vertical stem down */}
						<div className="flex flex-col items-center mb-4">
							<DashedLine vertical height={32} />
						</div>
					</div>
				))}
			</div>

			{/* ── Horizontal connector ───────────────────────────────────── */}
			<div className="w-full flex items-center" style={{ marginTop: "1px" }}>
				{/* left spacer = half a column width (≈ 72px on 4-col) */}
				<div className="flex-1 mx-18 sm:mx-18">
					<div style={{ borderTop: "2.5px dashed #650199", width: "100%" }} />
				</div>
			</div>

			{/* ── Central drop ──────────────────────────────────────────── */}
			<DashedLine vertical height={32} />

			{/* ── UK Administration box ─────────────────────────────────── */}
			<div className="w-full max-w-sm rounded-sm overflow-hidden shadow-md border-2 border-purple bg-purple">
				<div className="py-3 px-6 text-center">
					<h3 className="text-brand-white font-bold text-lg">
						UK Administration
					</h3>
				</div>
				<div className="bg-white py-5 px-6 space-y-2 text-center">
					{ADMIN_ITEMS.map((item) => (
						<p key={item} className="text-brand-black font-medium text-sm">
							{item}
						</p>
					))}
				</div>
			</div>

			{/* ── Legend ────────────────────────────────────────────────── */}
			<p className="mt-8 text-xs text-brand-grey text-center max-w-lg leading-relaxed">
				All four funding streams above are exclusively for UK Administration costs, ensuring 100% of your donations go to the cause.
			</p>
		</div>
	);
}

/* ── Dashed line helper ─────────────────────────────────────────────────── */
function DashedLine({ vertical, height }: { vertical?: boolean; height?: number }) {
	if (vertical) {
		return (
			<div
				style={{
					width: 0,
					height: height ?? 32,
					borderLeft: "2.5px dashed #8b01cc",
				}}
			/>
		);
	}
	return (
		<div style={{ borderTop: "2.5px dashed #8b01cc", width: "100%" }} />
	);
}

/* ── Source icons (teal palette to match original) ──────────────────────── */

function ShopIcon() {
	return (
		<svg viewBox="0 0 52 46" className="w-11 h-10" xmlns="http://www.w3.org/2000/svg">
			{/* roof */}
			<polygon points="26,2 50,18 2,18" fill="#5aa7b8" />
			{/* walls */}
			<rect x="4" y="17" width="44" height="27" rx="2" fill="#5aa7b8" opacity=".8" />
			{/* awning */}
			<rect x="4" y="17" width="44" height="8" rx="2" fill="#5aa7b8" />
			{/* awning scallop */}
			{[0, 1, 2, 3].map((i) => (
				<path
					key={i}
					d={`M${4 + i * 11} 25 Q${9.5 + i * 11} 29 ${15 + i * 11} 25`}
					fill="white"
					opacity=".4"
				/>
			))}
			{/* door */}
			<rect x="20" y="30" width="12" height="14" rx="2" fill="white" opacity=".5" />
			{/* windows */}
			<rect x="6" y="26" width="10" height="8" rx="1" fill="white" opacity=".4" />
			<rect x="36" y="26" width="10" height="8" rx="1" fill="white" opacity=".4" />
		</svg>
	);
}

function RecycleIcon() {
	// Proper three-arrow recycling symbol built from path arcs
	return (
		<svg viewBox="0 0 50 50" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
			<g transform="translate(25,25)" fill="#5aa7b8">
				{/* Arrow 1 – pointing up-right */}
				<path d="
          M 0 -20
          L 5 -12
          L 2 -12
          A 13 13 0 0 1 11.26 6
          L 13 2
          A 16 16 0 0 0 2 -15
          L 2 -20
          Z
        " />
				{/* Arrow 2 – pointing down-right */}
				<path d="
          M 0 -20
          L 5 -12
          L 2 -12
          A 13 13 0 0 1 11.26 6
          L 13 2
          A 16 16 0 0 0 2 -15
          L 2 -20
          Z
        " transform="rotate(120)" />
				{/* Arrow 3 – pointing left */}
				<path d="
          M 0 -20
          L 5 -12
          L 2 -12
          A 13 13 0 0 1 11.26 6
          L 13 2
          A 16 16 0 0 0 2 -15
          L 2 -20
          Z
        " transform="rotate(240)" />
			</g>
		</svg>
	);
}
