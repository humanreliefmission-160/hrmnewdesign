import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ar', 'fr', 'ur'],
  defaultLocale: 'en',
})

export const config = {
  // Only run on actual page routes — skip API, _next internals, studio,
  // and any path that looks like a static file (has a dot-extension).
  // This prevents ~157 ms of middleware overhead on font/icon/image fetches.
  matcher: '/((?!api|_next|studio|.*\\..*).*)',
}
