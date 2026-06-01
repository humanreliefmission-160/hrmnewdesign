"use client"

import { useState } from "react";

import type { GalleryImage } from "../../types/donationItem";

export type { GalleryImage };

interface Props {
	images: GalleryImage[];
}

export default function ImageGallery({ images }: Props) {
	const [active, setActive] = useState(0);

	if (!images.length) return null;

	const current = images[active] ?? images[0];

	const prev = () => setActive((p) => (p - 1 + images.length) % images.length);
	const next = () => setActive((p) => (p + 1) % images.length);

	return (
		<div className="flex flex-col gap-3">
			<div className="relative overflow-hidden bg-brand-lgrey aspect-4/3 select-none">
				{current.link ? (
					<a href={current.link} target="_blank" rel="noopener noreferrer">
						<img
							src={current.src}
							alt={current.altText}
							className="h-full w-full object-cover transition-opacity duration-300"
						/>
					</a>
				) : (
					<img
						src={current.src}
						alt={current.altText}
						className="h-full w-full object-cover transition-opacity duration-300"
					/>
				)}

				{images.length > 1 && (
					<>
						<button
							onClick={prev}
							aria-label="Previous image"
							className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-white/90 shadow-md hover:bg-white transition-colors"
						>
							<svg className="h-4 w-4 text-brand-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
							</svg>
						</button>

						<button
							onClick={next}
							aria-label="Next image"
							className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-white/90 shadow-md hover:bg-white transition-colors"
						>
							<svg className="h-4 w-4 text-brand-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</button>

						<div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-black/40 px-3 py-1 text-xs text-brand-white font-medium tracking-wide">
							{active + 1} / {images.length}
						</div>
					</>
				)}
			</div>

			{current.caption && (
				<p className="text-sm text-brand-grey text-center">{current.caption}</p>
			)}

			{images.length > 1 && (
				<div className="grid grid-cols-6 gap-2">
					{images.map((img, i) => (
						<button
							key={`${img.src}-${i}`}
							onClick={() => setActive(i)}
							className={`overflow-hidden border-2 aspect-square transition-all ${i === active ? "border-purple" : "border-purple-faint hover:border-purple/10"}`}
						>
							<img src={img.src} alt={img.altText} className="h-full w-full object-cover" />
						</button>
					))}
				</div>
			)}
		</div>
	);
}
