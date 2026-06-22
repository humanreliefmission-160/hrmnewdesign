import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import YellowCTA from '../YellowCTA';
import WhoWeAreSlideshow from './WhoWeAreSlideshow';

// Sanity Schema Query
const ABOUT_QUERY = `
  *[_type == "aboutUs" ][0] {
    whoWeAre {
      title,
      body,
      images[] {
        image {
          asset
        },
        altText
      }
    }
  }
`;

export default async function WhoWeAre() {
  const data = await sanityFetch<any>(ABOUT_QUERY);
  const whoWeAreData = data?.whoWeAre;

  const rawImages = whoWeAreData?.images || [];
  const slides = rawImages.length > 0
    ? rawImages.map((img: any, index: number) => ({
        id: index,
        src: img.image?.asset ? urlFor(img.image.asset).width(1080).height(1080).fit('crop').url() : '/img-placeholder.JPG',
        alt: img.altText || 'Slideshow image',
      }))
    : [
        { id: 1, src: "/img-placeholder.JPG", alt: "Children with school backpacks" },
        { id: 2, src: "/img-placeholder.JPG", alt: "Children with school backpacks" },
        { id: 3, src: "/img-placeholder.JPG", alt: "Children with school backpacks" },
      ];

  return (
    <section className="px-6 md:px-12 lg:px-4 py-12 md:py-12 lg:py-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24 items-center">
          <div>
            <div className="inline-block bg-purple text-white font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4 rounded-sm">Our Story</div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-black mb-6 leading-tight">
              {whoWeAreData?.title || 'Who We Are'}
            </h2>
            {whoWeAreData?.body ? (
              <div className="text-[1.05rem] text-brand-black leading-[1.8] mb-6 space-y-4">
                <PortableText value={whoWeAreData.body} />
              </div>
            ) : (
              <p className="text-[1.05rem] text-brand-black leading-[1.8] mb-6">
                Founded in 2003, Human Relief Mission has grown into a trusted international charity operating in over 45 countries. We respond to emergencies with speed and care, while also investing in long term development programmes that build sustainable futures.
              </p>
            )}
            <YellowCTA
              text='Support our Mission'
              href='/projects'
            />
          </div>
          <div className="flex items-center justify-center text-[5rem] aspect-square order-1 lg:order-2 flex-col gap-4">
            <WhoWeAreSlideshow slides={slides} />
          </div>
        </div>
      </div>
    </section>
  );
}
