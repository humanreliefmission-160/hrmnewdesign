/**
 * youtubeHelpers.ts
 * Utilities for extracting YouTube video IDs and building embed URLs.
 */

/**
 * Extract a YouTube 11-character video ID from any common YouTube URL format:
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://www.youtube.com/shorts/VIDEO_ID
 */
export function getYouTubeVideoId(url?: string | null): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Build a YouTube embed URL with common autoplay/loop/mute flags.
 */
export function getYouTubeEmbedUrl(
  videoId: string,
  options: { mute?: boolean; autoplay?: boolean; loop?: boolean } = {}
): string {
  const { mute = true, autoplay = true, loop = true } = options;
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    loop: loop ? "1" : "0",
    playlist: videoId, // required for loop to work
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
