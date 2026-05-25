"use client";

import { useRef, useEffect } from "react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/lib/client"; // adjust to your Sanity client path
import YellowCTA from "../YellowCTA";


// ─────────────────────────────────────────────────────────────────────────────
//  Sanity image URL builder
//  urlFor(source) returns a builder you can call .url() on to get a string.
// ─────────────────────────────────────────────────────────────────────────────
const builder = createImageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

// ─────────────────────────────────────────────────────────────────────────────
//  Types
//
//  SanityImageSource matches whatever Sanity returns for an `image` field:
//  { _type: "image", asset: { _ref: string, _type: "reference" } }
//
//  GalleryImage is one entry from the Sanity `images` array on the project.
//  Each object has the asset reference Sanity needs to build a URL, plus the
//  alt text the editor entered in Studio.
// ─────────────────────────────────────────────────────────────────────────────
type SanityImageSource = {
	_type: "image";
	asset: { _ref: string; _type: "reference" };
	[key: string]: unknown;
};

type GalleryImage = SanityImageSource & {
	alt: string;       // Required alt text — validated in Sanity schema
	caption?: string;  // Optional caption (available but not used in this strip)
};

interface Props {
	// `images` is the resolved array from Sanity — e.g. data.benefitsGallery
	// or data.impactImages, depending on which Sanity field feeds this component.
	images: GalleryImage[];
}

// ─────────────────────────────────────────────────────────────────────────────
//  Layout constants
// ─────────────────────────────────────────────────────────────────────────────
const SLIDE_WIDTH = 320;  // px — width of each image card
const SLIDE_HEIGHT = 220;  // px — height of each image card
const GAP = 16;   // px — gap between cards
const SPEED = 0.5;  // px per frame-unit (frame-rate-independent via delta)
const STEP = SLIDE_WIDTH + GAP; // total horizontal space one slide occupies

// ─────────────────────────────────────────────────────────────────────────────
//  ProjectGalleryStrip
//
//  Displays a continuously scrolling strip of project images pulled from Sanity.
//  The `images` array is duplicated so the loop resets seamlessly.
//
//  HOW IMAGE RENDERING WORKS:
//  - `images` prop is GalleryImage[] from Sanity (asset reference objects)
//  - `allSlides` = [...images, ...images] — doubled for the infinite loop illusion
//  - Each `slide` in allSlides IS the Sanity image object for that slot
//  - urlFor(slide).width(SLIDE_WIDTH * 2).url() resolves the CDN URL at 2x
//    for retina displays, using Sanity's image pipeline
//  - slide.alt provides the alt text from Studio — never derived from index
// ─────────────────────────────────────────────────────────────────────────────
export default function ProjectGalleryStrip({ images }: Props) {
	const trackRef = useRef<HTMLDivElement>(null);
	const animRef = useRef<number | null>(null);
	const posRef = useRef(0);

	// Guard: render nothing if Sanity returned no images
	if (!images || images.length === 0) return null;

	// Duplicate the slides array so the strip loops seamlessly.
	// The animation resets posRef when it has scrolled exactly one full set width.
	const allSlides = [...images, ...images];
	const singleSetWidth = images.length * STEP;

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		let last = performance.now();

		const animate = (now: number) => {
			const delta = now - last;
			last = now;

			// Move left by SPEED pixels per 60fps frame-equivalent.
			// Multiplying by (delta / (1000/60)) makes the speed frame-rate independent:
			// on a 120fps screen delta ≈ 8ms → factor ≈ 0.97 (almost same as 60fps)
			// on a 30fps screen  delta ≈ 33ms → factor ≈ 1.98 (compensates for fewer frames)
			posRef.current -= SPEED * (delta / (1000 / 60));

			// When we have scrolled a full single-set width, jump back by that amount.
			// Because allSlides = [...images, ...images], the second set is visually
			// identical to the first, so the reset is invisible to the viewer.
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

			{/* ── Heading ── */}
			<div className="flex items-center justify-center px-8">
				<h2 className="text-brand-white text-3xl md:text-4xl font-bold text-center">
					The impact of this project
				</h2>
			</div>

			{/* ── Continuously sliding image strip ── */}
			<div className="relative w-full overflow-hidden">

				{/* Left fade mask — blends the leftmost image into the purple background */}
				<div
					className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
					style={{
						width: "60px",
						background: "linear-gradient(to right, #650199 0%, transparent 100%)",
					}}
				/>

				{/* Right fade mask */}
				<div
					className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
					style={{
						width: "60px",
						background: "linear-gradient(to left, #650199 0%, transparent 100%)",
					}}
				/>

				{/* ── Track ── */}
				<div
					ref={trackRef}
					className="flex"
					style={{
						gap: `${GAP}px`,
						// Total track width must accommodate all slides (original + duplicate set)
						width: `${allSlides.length * STEP}px`,
						willChange: "transform",
					}}
				>
					{allSlides.map((slide, i) => (
						<div
							// `i` is safe as a key here because allSlides is static for the
							// lifetime of this render — it never reorders.
							key={i}
							className="shrink-0 overflow-hidden"
							style={{
								width: `${SLIDE_WIDTH}px`,
								height: `${SLIDE_HEIGHT}px`,
							}}
						>
							<img
								/*
								 * FIX — was: src={data.image}
								 *
								 * data.image is the raw Sanity array — passing it as src gives
								 * "[object Object]" and breaks the image.
								 *
								 * CORRECT approach:
								 *   - `slide` is the GalleryImage object for THIS slot (already
								 *     the right item — no index arithmetic needed).
								 *   - urlFor(slide) calls Sanity's image-url builder with the
								 *     asset reference inside `slide`.
								 *   - .width(SLIDE_WIDTH * 2) requests a 2× wide image from
								 *     Sanity's CDN so it looks sharp on retina displays.
								 *   - .url() returns the final string URL.
								 */
								src={urlFor(slide).width(SLIDE_WIDTH * 2).height(SLIDE_HEIGHT * 2).fit("crop").url()}

								/*
								 * FIX — was: alt={data.image?.[i].altText}
								 *
								 * Two problems with the original:
								 *   1. `i` runs from 0 to allSlides.length-1, which is
								 *      images.length * 2 - 1. When i >= images.length the
								 *      index goes out of bounds → undefined alt text.
								 *   2. The field name was .altText but the Sanity altImage
								 *      object type uses .alt (as defined in the schema).
								 *
								 * CORRECT: read .alt directly from the current `slide` object.
								 * No index needed — slide already IS the image for this slot.
								 */
								alt={slide.alt}

								className="w-full h-full object-cover border border-brand-white/50"
								// draggable false prevents ghost image on accidental drag
								draggable={false}
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