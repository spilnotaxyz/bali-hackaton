/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./env.mjs");

import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import withBundleAnalyzerConstructor from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerConstructor({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  reactStrictMode: true,
  transpilePackages: ["@bali/api", "@bali/auth", "@bali/db", "@bali/contracts"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
});
