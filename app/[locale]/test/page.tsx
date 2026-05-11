import Image from 'next/image'
import { sanityFetch } from '../lib/sanity/client'

// GROQ query for the HomepageHero singleton
const HOMEPAGE_HERO_QUERY = `*[_type == "homepageHero"][0]{
  title,
  subtext,
  link,
  image {
    asset->{ url, metadata { lqip, dimensions } },
    alt,
    caption
  }
}`

interface HomepageHeroData {
  title: string
  subtext?: string
  link: string
  image: {
    asset: { url: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }
    alt: string
    caption?: string
  }
}

export default async function HomePage() {
  // Fetch the hero data — this runs on the server at request time or ISR revalidation
  const hero = await sanityFetch<HomepageHeroData | null>(HOMEPAGE_HERO_QUERY)

  if (!hero) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">No homepage hero found. Create one in Sanity Studio.</p>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen">
      {/* Hero image */}
      {hero.image?.asset?.url && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={hero.image.asset.url}
            alt={hero.image.alt}
            fill
            className="object-cover"
            priority
            placeholder={hero.image.asset.metadata?.lqip ? 'blur' : undefined}
            blurDataURL={hero.image.asset.metadata?.lqip ?? undefined}
          />
          <div className="absolute inset-0 bg-black/40" /> {/* dark overlay */}
        </div>
      )}

      {/* Hero content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {hero.title}
        </h1>
        {hero.subtext && (
          <p className="mt-4 max-w-2xl text-lg text-gray-200">
            {hero.subtext}
          </p>
        )}
        {hero.link && (
          <a
            href={hero.link}
            className="mt-8 inline-block rounded-md bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Donate Now
          </a>
        )}
      </div>
    </main>
  )
}

// Optional: Enable Incremental Static Regeneration to revalidate content
export const revalidate = 60 // seconds