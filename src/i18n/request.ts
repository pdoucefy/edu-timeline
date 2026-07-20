import { getRequestConfig } from 'next-intl/server';

import type { Messages } from './messages.js';

// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async ({ locale = 'fr' }) => {
  const messages: Messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
