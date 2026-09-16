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
      {
        source: '/downloads/:path*',
        destination: '/portal/downloads/:path*',
      },
    ];
  },
};

export default nextConfig;
