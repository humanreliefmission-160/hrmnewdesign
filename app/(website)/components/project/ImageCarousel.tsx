import { useRef, useEffect } from "react";
import YellowCTA from "../YellowCTA";

const slides = [
	{
		src: "/img-placeholder.JPG",
		caption: "Kids in School",
	},
	{
		src: "/img-placeholder.JPG",
		caption: "Kids in School",
	},
	{
		src: "/img-placeholder.JPG",
		caption: "Kids in School",
	},
	{
		src: "/img-placeholder.JPG",
		caption: "Kids in School",
	},
];

// Triple slides for seamless infinite scroll
const allSlides = [...slides, ...slides, ...slides];

const SLIDE_WIDTH = 460;
const GAP = 32;
const STEP = SLIDE_WIDTH + GAP;
const SLIDE_HEIGHT = 280;
const SPEED = 0.65; // px per frame — smooth, never stopping

export default function ImageCarousel() {
	const trackRef = useRef<HTMLDivElement>(null);
	const animRef = useRef<number | null>(null);
	const posRef = useRef(0);
	const singleSetWidth = slides.length * STEP;

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		let last = performance.now();

		const animate = (now: number) => {
			const delta = now - last;
			last = now;

			// Move by speed * time delta for smooth animation independent of frame rate
			posRef.current -= SPEED * (delta / (1000 / 60));

			if (Math.abs(posRef.current) >= singleSetWidth) {
				posRef.current += singleSetWidth;
			}

			track.style.transform = `translateX(${posRef.current}px)`;
			animRef.current = requestAnimationFrame(animate);
		};

		animRef.current = requestAnimationFrame(animate);
		return () => {
			if (animRef.current) cancelAnimationFrame(animRef.current);
		};
	}, [singleSetWidth]);

	return (
		<section className="bg-purple w-full select-none py-10 sm:py-18 flex flex-col items-center gap-12">
			{/* ── Top black zone with centred motivational text ── */}
			<div className="flex items-center justify-center px-8">
				<h2 className="text-brand-white text-3xl md:text-4xl font-bold text-center">
					The impact of this project</h2>
			</div>

			{/* ── Continuously sliding image strip ── */}
			<div className="relative w-full overflow-hidden" >
				{/* Left / right fade masks to mimic the look where edge images are cut off */}
				<div
					className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
					style={{
						width: "60px",
						background: "linear-gradient(to right, #650199 0%, transparent 100%)",
					}}
				/>
				<div
					className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
					style={{
						width: "60px",
						background: "linear-gradient(to left, #650199 0%, transparent 100%)",
					}}
				/>

				<div
					ref={trackRef}
					className="flex"
					style={{
						gap: `${GAP}px`,
						width: `${allSlides.length * STEP}px`,
						willChange: "transform",
					}}
				>
					{allSlides.map((slide, i) => (
						<div
							key={i}
							className="shrink-0 overflow-hidden"
							style={{
								width: `${SLIDE_WIDTH}px`,
								height: `${SLIDE_HEIGHT}px`,
							}}
						>
							<img
								src={slide.src}
								alt={slide.caption}
								className="w-full h-full object-cover border border-brand-white/50"
								draggable={true}
							/>
						</div>
					))}
				</div>
			</div>

			<YellowCTA
				text="Start making an impact today"
				href="/donate"
			/>


		</section>
	);
}
