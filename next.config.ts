import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // microCMS にアップロードした画像
    remotePatterns: [new URL("https://images.microcms-assets.io/**")],
  },
};

export default nextConfig;
