// lib/sanityImage.ts
import { client } from '@/sanity/lib/client'
import imageUrlBuilder, { SanityImageSource } from '@sanity/image-url'



const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}