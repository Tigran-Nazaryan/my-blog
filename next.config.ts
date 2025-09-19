import type {NextConfig} from "next";

// next.config.js или next.config.ts

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/faker-js/assets-person-portrait/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    optimizePackageImports: ['antd'],
  },
};

export default nextConfig;

