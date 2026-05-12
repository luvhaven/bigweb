import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 90, 100],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'prngeuaxahrnuqniueld.supabase.co' },
    ],
  },
  turbopack: {},
};

export default nextConfig;
