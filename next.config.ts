// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qlbpliuyqlguhwhmfyxq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Add this if you need to use Edge Runtime
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;