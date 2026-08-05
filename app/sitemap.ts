// app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────
// Next.js App Router convention: a file named sitemap.ts at the app root
// automatically generates /sitemap.xml at build/request time.
//
// Because HRM's content is CMS-driven (projects, donation items, ecosystem
// stages all come from Sanity) and the site is localised (app/[locale]/...),
// this can't be a static file — it queries Sanity for every slug and expands
// each route across every supported locale.
// ─────────────────────────────────────────────────────────────────────────────
import { MetadataRoute } from 'next'
import { sanityFetch } from './lib/sanity/client'

const BASE_URL = 'https://humanreliefmission.com'

// Match whatever locales your next-intl / i18n config actually supports.
// Adjust this list to your real middleware.ts locales array.
const LOCALES = ['en'] // e.g. ['en', 'ar'] if Arabic is supported

// ── GROQ — every project slug ────────────────────────────────────────────────
const PROJECT_SLUGS_QUERY = `
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
  }
`

// ── GROQ — every donation item slug, nested inside its parent project ───────
const DONATION_ITEM_SLUGS_QUERY = `
  *[_type == "project" && defined(slug.current)] {
    "projectSlug": slug.current,
    "items": donationSection.items[defined(slug.current)] {
      "itemSlug": slug.current,
    },
    _updatedAt,
  }
`

// ── GROQ — every ecosystem stage slug ────────────────────────────────────────
const ECOSYSTEM_SLUGS_QUERY = `
  *[_type == "ecosystemStage" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
  }
`

type ProjectSlugResult = { slug: string; _updatedAt: string }
type DonationItemSlugResult = {
  projectSlug: string
  items: Array<{ itemSlug: string }>
  _updatedAt: string
}
type EcosystemSlugResult = { slug: string; _updatedAt: string }

// Helper: builds one sitemap entry per locale for a given path
function localisedEntries(
  path: string,
  lastModified: Date,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // ── Static routes — always present regardless of CMS content ─────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    ...localisedEntries('', now, 1.0, 'weekly'),           // homepage
    ...localisedEntries('/about', now, 0.8, 'monthly'),
    ...localisedEntries('/contact', now, 0.6, 'monthly'),
    ...localisedEntries('/donate', now, 0.9, 'weekly'),
    ...localisedEntries('/project', now, 0.9, 'weekly'),   // project listing page
  ]

  // ── Dynamic: project pages ────────────────────────────────────────────────
  const projects = await sanityFetch<ProjectSlugResult[]>(PROJECT_SLUGS_QUERY)

  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((p) =>
    localisedEntries(
      `/project/${p.slug}`,
      new Date(p._updatedAt),
      0.85,
      'weekly'
    )
  )

  // ── Dynamic: donation item pages (nested under project) ──────────────────
  const projectsWithItems = await sanityFetch<DonationItemSlugResult[]>(
    DONATION_ITEM_SLUGS_QUERY
  )

  const donationItemRoutes: MetadataRoute.Sitemap = projectsWithItems.flatMap(
    (p) =>
      (p.items ?? []).flatMap((item) =>
        localisedEntries(
          `/project/${p.projectSlug}/${item.itemSlug}`,
          new Date(p._updatedAt),
          0.7,
          'monthly'
        )
      )
  )

  // ── Dynamic: ecosystem stage pages ────────────────────────────────────────
  const ecosystemStages = await sanityFetch<EcosystemSlugResult[]>(
    ECOSYSTEM_SLUGS_QUERY
  )

  const ecosystemRoutes: MetadataRoute.Sitemap = ecosystemStages.flatMap((e) =>
    localisedEntries(`/ecosystem/${e.slug}`, new Date(e._updatedAt), 0.5, 'monthly')
  )

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...donationItemRoutes,
    ...ecosystemRoutes,
  ]
}
