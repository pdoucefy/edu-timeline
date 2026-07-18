import { getRequestConfig } from 'next-intl/server';

import type { Messages } from './messages.js';

export default getRequestConfig(async ({ locale = 'fr' }) => {
  const messages: Messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
