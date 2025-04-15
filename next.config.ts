import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.wixstatic.com", "wellfound.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "photos.wellfound.com",
        pathname: "/startups/i/**",
      },
    ],
  },
};

export default nextConfig;
