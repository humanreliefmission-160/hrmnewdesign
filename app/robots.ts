// app/robots.ts
// ─────────────────────────────────────────────────────────────────────────────
// Next.js App Router convention: a file named robots.ts at the app root
// automatically generates /robots.txt at build time — no manual .txt file needed.
//
// This blocks crawlers from indexing internal/admin routes (Studio, API routes,
// donation checkout steps) while allowing everything public to be crawled.
// ─────────────────────────────────────────────────────────────────────────────
import { MetadataRoute } from 'next'

const BASE_URL = 'https://humanreliefmission.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio',           // Sanity Studio — never index the CMS admin UI
          '/studio/*',
          '/api/*',            // all API routes — webhooks, payment intents, etc.
          '/donate/success',   // post-payment confirmation page — no SEO value,
                                // and shouldn't be indexed since it may contain
                                // donor-specific query params
          '/*?*',               // avoid indexing URL-parameter variants
                                // (e.g. /donate?item=...&amount=... from the
                                // donation item pre-fill links) as duplicate content
        ],
      },
      {
        // Explicitly allow major AI/search crawlers that respect this file
        // (kept generic — remove if you'd rather block AI training crawlers)
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/studio', '/studio/*', '/api/*'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
