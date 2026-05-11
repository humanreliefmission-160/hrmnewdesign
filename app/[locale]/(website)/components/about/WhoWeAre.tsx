
import { useEffect, useState } from 'react';
import YellowCTA from '../YellowCTA'
import Image from 'next/image'

export default function WhoWeAre() {
  const slides = [
    { id: 1, src: "/img-placeholder.JPG", alt: "Children with school backpacks" },
    { id: 2, src: "/img-placeholder.JPG", alt: "Children with school backpacks" },
    { id: 3, src: "/img-placeholder.JPG", alt: "Children with school backpacks" },
  ];

  const INTERVAL_MS = 3000;

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 0); // fade-out duration before swap
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    if (index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };
  return (
    <section className="px-6 md:px-12 lg:px-4 py-12 md:py-12 lg:py-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24 items-center">
          <div>
            <div className="inline-block bg-purple text-white font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4 rounded-sm">Our Story</div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-black mb-6 leading-tight">Who We Are</h2>
            <p className="text-[1.05rem] text-brand-black leading-[1.8] mb-6">
              Founded in 2003, Human Relief Mission has grown into a trusted international charity operating in over 45 countries. We respond to emergencies with speed and care, while also investing in long term development programmes that build sustainable futures.
            </p>
            <YellowCTA
              text='Support our Mission'
              href='/projects'
            />
          </div>
          <div className="flex items-center justify-center text-[5rem] aspect-square order-1 lg:order-2 flex-col gap-4">
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

            {/* Dot indicators */}
            {/* <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`rounded-full transition-all duration-500 ${index === current
                    ? "bg-purple-dark w-6 h-2.5"
                    : "bg-brand-white/30 hover:bg-white/60 w-2.5 h-2.5"
                    }`}
                />
              ))}
            </div> */}
          </div>

        </div>
      </div>
    </section>
  )
}
