import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a minimal, self-contained server bundle for Docker (.next/standalone).
  output: "standalone",
  // Pin the project root to THIS folder so Turbopack doesn't walk up and pick a
  // stray lockfile (e.g. in the home directory). `import.meta.dirname` resolves
  // correctly both locally (Windows) and inside the container (/app).
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
