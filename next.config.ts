import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },

  turbopack: {
    root: __dirname,
  },

  ...(isStaticExport
    ? {
        output: 'export' as const,
        basePath: '/test',
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

// eslint-disable-next-line import/no-default-export
export default withNextIntl(nextConfig);
