import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "meltano.com" },
      { protocol: "https", hostname: "www.meltano.com" },
      { protocol: "https", hostname: "**.meltano.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
