import type { NextConfig } from "next";

// ✅ GitHub Pages repo name
const repo = "/global-3d-landing";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // ✅ Critical for GitHub Pages: serve assets from /<repo>/_next/...
  basePath: repo,
  assetPrefix: repo,

  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
