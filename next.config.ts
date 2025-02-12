import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"], // Allow Google-hosted images
  },
  reactStrictMode: true
};

export default nextConfig;
