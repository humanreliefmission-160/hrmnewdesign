import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { getYouTubeVideoId, getYouTubeEmbedUrl } from "@/app/[locale]/lib/youtubeHelpers";

interface CaseStudyImage {
  asset: any;
  altText?: string;
  caption?: string;
}

interface CaseStudyItem {
  _key: string;
  title?: string;
  image?: CaseStudyImage;
  /** Optional YouTube URL — renders a video in the left panel instead of the image when set */
  videoUrl?: string | null;
  /** Whether the case study video is muted (defaults to true) */
  muteVideo?: boolean;
  quote?: string;
  body?: any[];
  reference?: {
    dateAndLocation?: string;
  };
}

export default function CaseStudy({ data }: { data?: CaseStudyItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <>
      {data.map((study) => {
        const videoId = getYouTubeVideoId(study.videoUrl);
        const embedUrl = videoId
          ? getYouTubeEmbedUrl(videoId, { mute: study.muteVideo !== false })
          : null;

        return (
          <section key={study._key} className="bg-white/50 py-8 sm:py-16 px-6 md:px-12 lg:px-24 shadow-lg my-12 max-w-285 mx-3 sm:mx-auto rounded-sm">
            <div className="max-w-6xl mx-auto">
              {/* Section Label */}
              <div className="text-center mb-12">
                <span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-3">
                  Case Study
                </span>
                {study.title && (
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-black">
                    {study.title}
                  </h2>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                {/* Left panel — video OR image */}
                <div className="w-full lg:w-1/2 shrink-0">
                  {embedUrl ? (
                    /* YouTube video */
                    <div className="relative overflow-hidden shadow-md aspect-4/3">
                      <iframe
                        src={embedUrl}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={study.title || "Case study video"}
                        className="absolute inset-0 w-full h-full"
                        style={{ border: "none" }}
                      />
                    </div>
                  ) : study.image?.asset ? (
                    /* Static image */
                    <div className="relative overflow-hidden shadow-md">
                      <img
                        src={urlFor(study.image.asset).width(800).height(600).fit("crop").auto("format").quality(80).url()}
                        alt={study.image.altText || "Case study"}
                        className="w-full h-100 object-cover"
                      />
                      {study.image.caption && (
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-sm px-4 py-2 shadow-lg">
                          <p className="text-xs text-purple font-semibold uppercase tracking-wide">
                            {study.image.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {study.quote && (
                    <blockquote className="text-xl font-semibold text-purple italic border-l-4 border-purple pl-4 mt-4">
                      "{study.quote}"
                    </blockquote>
                  )}
                </div>

                {/* Text */}
                <div className="w-full lg:w-1/2 space-y-5">
                  {study.body && (
                    <div className="text-brand-black leading-relaxed space-y-4 portable-text">
                      <PortableText value={study.body} />
                    </div>
                  )}
                  {study.reference?.dateAndLocation && (
                    <>
                      <hr className="h-px border-0.5 border-purple opacity-25" />
                      <div>
                        <p className="text-sm font-bold text-gray-800">Reference</p>
                        <p className="text-xs text-gray-500">{study.reference.dateAndLocation}</p>
                      </div>
                    </>
                  )}
                </div>

              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
