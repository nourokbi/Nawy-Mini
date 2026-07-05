import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a minimal, self-contained server bundle for Docker (.next/standalone).
  output: "standalone",
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
