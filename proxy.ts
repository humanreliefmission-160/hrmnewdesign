import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ar', 'fr', 'ur'],
  defaultLocale: 'en',
})

export const config = {
  // Matcher ignores static files, API routes, studio, etc.
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)'],
}
