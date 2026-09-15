import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
  async rewrites() {
    return [
      {
        source: '/portal',
        destination: '/portal/index.html',
      },
    ];
  },
};

export default nextConfig;
