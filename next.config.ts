import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The product was renamed from Dispatch/DishPatch to Dishigen.
      { source: "/dispatch", destination: "/dishigen", permanent: true },
      { source: "/dispatch/:path*", destination: "/dishigen/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
