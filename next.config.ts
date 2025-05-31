import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'se-images.campuslabs.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
