import type { NextConfig } from "next";

/**
 * GitHub Pages requires assets under "/global-3d-landing/".
 * We keep env override, but always fall back to the repo path in production
 * to prevent "no CSS" / missing _next assets.
 */
const envBase = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath =
  envBase && envBase.length > 0
    ? envBase
    : (process.env.NODE_ENV === "production" ? "/global-3d-landing" : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
};

export default nextConfig;
