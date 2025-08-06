import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'cdn.jsdelivr.net'],
  },
};

export default nextConfig;
