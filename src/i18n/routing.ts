import { defineRouting } from 'next-intl/routing';

// Single source of truth for supported locales and the default locale.
// Locale routing is mandatory: every route is prefixed (e.g. `/fr`).
export const routing = defineRouting({
  locales: ['fr'],
  defaultLocale: 'fr',
  // `always` guarantees the locale prefix is present on every URL, including
  // the home page (`/fr`). Locale-less URLs are redirected by the proxy.
  localePrefix: 'always',
});
