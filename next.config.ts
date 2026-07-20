import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

// eslint-disable-next-line import/no-default-export
export default nextConfig;
