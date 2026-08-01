import YellowCTA from "./YellowCTA";
import { sanityFetch } from "../../lib/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import { resolveHeroSlideHref } from "../lib/resolveHeroSlideLink";
import { getYouTubeVideoId, getYouTubeEmbedUrl } from "@/app/[locale]/lib/youtubeHelpers";

const HOMEPAGE_HERO_QUERY = `
*[_type == "heroSlide"] | order(order asc)[0] {
  _id,
  slideName,
  title,
  subtext,
  link {
    label,
    linkType,
    internalDestination,
    internalPath,
    externalUrl,
    isExternal,
    "projectSlug": project->slug.current,
    url
  },
  image,
  mobileImage,
  desktopVideoUrl,
  desktopVideoMute,
  mobileVideoUrl,
  mobileVideoMute
}`;

export default async function Hero() {
  const slide = await sanityFetch(HOMEPAGE_HERO_QUERY);

  // If no slide is found in Sanity, hide the component entirely
  if (!slide || !slide.title) {
    return null;
  }

  const title = slide.title;
  const subtext = slide.subtext;

  // ── Image URLs ─────────────────────────────────────────────────────────────
  const desktopImageUrl = slide.image?.asset ? urlFor(slide.image.asset).url() : null;
  const mobileImageUrl = slide.mobileImage ? urlFor(slide.mobileImage).url() : null;

  // ── Video embed URLs ───────────────────────────────────────────────────────
  const desktopVideoId = getYouTubeVideoId(slide.desktopVideoUrl);
  const mobileVideoId = getYouTubeVideoId(slide.mobileVideoUrl);

  const desktopEmbedUrl = desktopVideoId
    ? getYouTubeEmbedUrl(desktopVideoId, { mute: slide.desktopVideoMute !== false })
    : null;
  const mobileEmbedUrl = mobileVideoId
    ? getYouTubeEmbedUrl(mobileVideoId, { mute: slide.mobileVideoMute !== false })
    : null;

  const ctaText = slide.link?.label;
  const ctaHref = resolveHeroSlideHref(slide.link);
  const altText = slide.image?.altText || "Human Relief Mission";

  // Fallback image when no video is configured
  const imageUrl = desktopImageUrl || mobileImageUrl;

  // Determine what to show on desktop / mobile
  const showDesktopVideo = !!desktopEmbedUrl;
  const showMobileVideo = !!mobileEmbedUrl;
  const showImage = !showDesktopVideo && imageUrl;

  return (
    <section className="relative w-full lg:h-[92vh] flex flex-col md:h-[84vh] sm:h-[70vh] h-[80vh] lg:px-20 lg:py-20 sm:px-5 sm:py-10 px-5 py-10">
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* ── Desktop video (hidden on mobile) ─────────────────────────────── */}
        {showDesktopVideo && (
          <iframe
            src={desktopEmbedUrl!}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Hero background video (desktop)"
            className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none"
            style={{ border: "none" }}
          />
        )}

        {/* ── Mobile video (hidden on sm+) ─────────────────────────────────── */}
        {showMobileVideo && (
          <iframe
            src={mobileEmbedUrl!}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Hero background video (mobile)"
            className="block sm:hidden absolute inset-0 w-full h-full pointer-events-none"
            style={{ border: "none" }}
          />
        )}

        {/* ── Fallback static image (when no desktop video) ─────────────────── */}
        {showImage && (
          <picture className="w-full h-full">
            {mobileImageUrl && !showMobileVideo && (
              <source media="(max-width: 639px)" srcSet={mobileImageUrl} />
            )}
            {desktopImageUrl && (
              <source media="(min-width: 640px)" srcSet={desktopImageUrl} />
            )}
            <img
              src={imageUrl!}
              alt={altText}
              fetchPriority="high"
              loading="eager"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        )}

        {/* ── Mobile image fallback (when desktop video exists but no mobile video) */}
        {showDesktopVideo && !showMobileVideo && mobileImageUrl && (
          <img
            src={mobileImageUrl}
            alt={altText}
            className="block sm:hidden absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,26,26,0.9)_10%,rgba(26,26,26,0.65)_40%,rgba(26,26,26,0.25)_60%,rgba(26,26,26,0.35)_100%)]" />
      </div>

      <div className="flex-1 flex items-end text-white relative z-10 justify-items-start">
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 font-body">{title}</h1>
          {subtext && <p className="text-xl md:text-2xl text-white/90">{subtext}</p>}
          {ctaText && ctaHref && (
            <YellowCTA text={ctaText} href={ctaHref} className="mt-8" />
          )}
        </div>
      </div>
    </section>
  );
}
