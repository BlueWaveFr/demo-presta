import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'presta-api.bluewave.fr',
      },
    ],
  },
};

export default nextConfig;
