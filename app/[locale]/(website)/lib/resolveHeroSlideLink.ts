export type HeroSlideLink = {
  label?: string
  linkType?: 'internal' | 'external'
  internalDestination?: 'project' | 'path'
  projectSlug?: string | null
  internalPath?: string
  externalUrl?: string
  isExternal?: boolean
  /** @deprecated Legacy field — used when slides were saved with a plain URL string */
  url?: string
}

/** Resolves the CTA href from a hero slide link object (supports legacy `url`). */
export function resolveHeroSlideHref(link?: HeroSlideLink | null): string | null {
  if (!link) return null

  if (link.linkType === 'external' && link.externalUrl) {
    return link.externalUrl
  }

  if (link.linkType === 'internal') {
    if (link.internalDestination === 'project' && link.projectSlug) {
      return `/projects/${link.projectSlug}`
    }
    if (link.internalPath) {
      return link.internalPath.startsWith('/')
        ? link.internalPath
        : `/${link.internalPath}`
    }
  }

  return link.url ?? null
}
