import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing.ts';

// Next.js 16 renamed the `middleware` file convention to `proxy`. The exported
// function must be named `proxy` (or be the default export). next-intl's
// `createMiddleware` helper returns a `(request) => NextResponse` handler that
// performs the locale detection and redirect of locale-less URLs to `/fr/...`.
// eslint-disable-next-line import/no-default-export
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - `/api` (API routes)
  // - `/_next` (Next.js internals)
  // - `/events/...` (event images served from `public/events`)
  // - anything containing a dot (static assets such as `favicon.ico`, images)
  matcher: ['/((?!api|_next|events|.*\\..*).*)'],
};
