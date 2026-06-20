import { createClient, type QueryParams } from '@sanity/client'
import { cache } from 'react'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-05-11',        // today's date
  useCdn: true,                     // CDN for faster reads (cached, eventually consistent)
  // token: process.env.SANITY_API_READ_TOKEN,  // uncomment for drafts/preview
})

// Cached fetch helper — deduplicates queries during a single render pass
export const sanityFetch = cache(async <T = any>(
  query: string,
  params?: QueryParams
): Promise<T> => {
  return await sanityClient.fetch<T>(query, params ?? {}, {
    // Bypass Next.js data cache so Sanity content is always fresh
    next: { revalidate: 60 },
  })
})