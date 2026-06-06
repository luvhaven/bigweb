import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 85, 95],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'prngeuaxahrnuqniueld.supabase.co' },
      { protocol: 'https', hostname: 'daniel-orz.vercel.app' },
      { protocol: 'https', hostname: 'krstrtqdnvxzvmiphhwm.supabase.co' },
    ],
  },
  compress: true,
};

export default nextConfig;
