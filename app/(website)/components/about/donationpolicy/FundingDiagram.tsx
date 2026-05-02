import { RiAdminFill } from "react-icons/ri";
import GiftAidIcon from "../../icons/GiftAid";
import { MdRecycling } from "react-icons/md";

const SOURCES = [
	{
		id: "admin",
		label: "Funds specified for administration",
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
			<div className="w-full grid grid-cols-1 sm:grid-cols-3 text-center">
				{SOURCES.map((src) => (
					<div key={src.id} className="flex flex-col items-center">
						{/* circle */}
						<div className="flex flex-col items-center justify-center w-38 h-38 rounded-full text-center px-3 bg-white/75 shadow-lg p-2 border border-purple-faint/50">
							<span>{src.icon}</span>
							<p className="text-[0.65rem] leading-snug text-brand-black/75 font-medium mt-1">
								{src.label}
							</p>
						</div>

						{/* vertical stem down */}
						<div className="flex flex-col items-center">
							<DashedLine vertical height={32} />
						</div>
					</div>
				))}
			</div>

			{/* ── Horizontal connector ───────────────────────────────────── */}
			<div className="w-full flex items-center">
				{/* left spacer = half a column width (≈ 72px on 4-col) */}
				<div className="flex-1 mx-0 sm:mx-37">
					<div style={{ borderTop: "2.5px dashed #650199", width: "100%" }} />
				</div>
			</div>

			{/* ── Central drop ──────────────────────────────────────────── */}
			<div className="opacity-0 sm:opacity-100">
				<DashedLine vertical height={32} />
			</div>

			{/* ── UK Administration box ─────────────────────────────────── */}
			<div className="w-full max-w-sm rounded-sm overflow-hidden shadow-md border-2 border-purple bg-purple">
				<div className="py-3 px-6 text-left">
					<h3 className="text-brand-white font-bold text-lg">
						UK Administration
					</h3>
				</div>
				<div className="bg-white py-5 px-6 space-y-2 text-left">
					{ADMIN_ITEMS.map((item) => (
						<p key={item} className="text-brand-black font-medium text-sm">
							{item}
						</p>
					))}
				</div>
			</div>

			{/* ── Legend ────────────────────────────────────────────────── */}
			<p className="mt-8 text-xs text-brand-grey text-left max-w-lg leading-relaxed">
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
