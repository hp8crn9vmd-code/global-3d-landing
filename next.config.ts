import type { NextConfig } from "next";

// For GitHub Pages you need basePath & assetPrefix like "/REPO_NAME"
// We'll control it via env var so it works locally too.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // Important for GitHub Pages subpath hosting
  basePath,
  assetPrefix: basePath,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
