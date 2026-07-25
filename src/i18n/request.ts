import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import type { Messages } from './messages.ts';
import { routing } from './routing.ts';

// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` typically corresponds to the `[locale]` segment, but it can
  // be `undefined` or an invalid value (the segment acts like a catch-all), so
  // fall back to the default locale in those cases.
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages: Messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
