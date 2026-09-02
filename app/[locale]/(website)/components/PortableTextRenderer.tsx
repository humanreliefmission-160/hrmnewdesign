'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import { getYouTubeVideoId, getYouTubeEmbedUrl } from '@/app/[locale]/lib/youtubeHelpers';

export const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      try {
        const imageUrl = urlFor(value).width(1200).auto('format').fit('max').quality(85).url();
        return (
          <figure className="my-6">
            <img
              src={imageUrl}
              alt={value.alt || value.caption || ''}
              className="w-full h-auto rounded-sm object-cover max-h-125"
              loading="lazy"
            />
            {value.caption && (
              <figcaption className="mt-2 text-center text-xs text-brand-grey italic font-body">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      } catch (err) {
        console.error('Failed to render PortableText image:', err);
        return null;
      }
    },
    imageWithAlt: ({ value }) => {
      const asset = value?.image?.asset || value?.asset;
      if (!asset) return null;
      try {
        const imageUrl = urlFor(asset).width(1200).auto('format').fit('max').quality(85).url();
        return (
          <figure className="my-6">
            <img
              src={imageUrl}
              alt={value.altText || value.alt || value.caption || ''}
              className="w-full h-auto rounded-sm object-cover max-h-125"
              loading="lazy"
            />
            {value.caption && (
              <figcaption className="mt-2 text-center text-xs text-brand-grey italic font-body">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      } catch (err) {
        console.error('Failed to render PortableText imageWithAlt:', err);
        return null;
      }
    },
    youtube: ({ value }) => {
      const url = value?.url || value?.videoUrl;
      const videoId = getYouTubeVideoId(url);
      if (!videoId) return null;
      const embedUrl = getYouTubeEmbedUrl(videoId, { mute: false });
      return (
        <div className="my-6 aspect-video w-full overflow-hidden rounded-sm">
          <iframe
            src={embedUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-brand-black/80 leading-[1.8] mb-5 text-[1.05rem] font-body">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold text-brand-black font-body mt-10 mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black font-body mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-brand-black font-body mt-8 mb-3 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-brand-black font-body mt-6 mb-2 leading-tight">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple pl-4 my-5 italic text-brand-black/70 font-body">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-brand-black font-body">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-purple underline underline-offset-2 hover:text-purple-dark transition-colors font-body"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-1.5 text-brand-black/80 text-[1.05rem] font-body">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-brand-black/80 text-[1.05rem] font-body">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.7] font-body">{children}</li>,
    number: ({ children }) => <li className="leading-[1.7] font-body">{children}</li>,
  },
};

interface PortableTextRendererProps {
  value?: any[] | null;
  className?: string;
}

export default function PortableTextRenderer({ value, className = '' }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null;
  return (
    <div className={`font-body ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
