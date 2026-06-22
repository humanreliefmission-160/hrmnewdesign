"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Slide {
  id: number | string;
  src: string;
  alt: string;
}

interface WhoWeAreSlideshowProps {
  slides: Slide[];
}

export default function WhoWeAreSlideshow({ slides }: WhoWeAreSlideshowProps) {
  const INTERVAL_MS = 3000;

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 0); // fade-out duration before swap
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-[540px] overflow-hidden shadow-2xl shadow-brand-black/40"
      style={{ aspectRatio: "1/1" }}
    >
      {slides.map((slide, index) => (
        <Image
          key={slide.id}
          src={slide.src}
          alt={slide.alt}
          width={1080}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
          style={{
            opacity: index === current ? (animating ? 0 : 1) : 0,
            zIndex: index === current ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}
