/** @type {import('next').NextConfig} */

const createMDX = require("@next/mdx");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const withMDX = createMDX({
  options: {
    // providerImportSource: "@mdx-js/react",
  },
});

const nextConfig = {
  swcMinify: true,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors:
      process.env.ENVIRONMENT === "production" ||
      process.env.ENVIRONMENT === "test",
  },
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/dates",
      "@mantine/form",
      "@mantine/carousel",
      "@mantine/dropzone",
      "@mantine/modals",
      "@tanstack/react-query",
      "@tanstack/react-query-devtools",
      "@tanstack/react-virtual",
      "@react-google-maps/api",
      "react-leaflet",
      "react-leaflet-cluster",
      "react-pdf",
      "react-player",
      "react-share",
      "react-zoom-pan-pinch",
    ],
    mdxRs: true,
    optimizeCss: true,
    // legacyBrowsers is not needed
  },
  images: {
    unoptimized: true,
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { hostname: "d2sa15fzpcbn0k.cloudfront.net" },
      { hostname: "daxv8eiot4y5y.cloudfront.net" },
      { hostname: "media.getrightproperty.com" },
      { hostname: "img.youtube.com" },
      { hostname: "images.unsplash.com" },
      {
        hostname:
          "getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com",
      },
      {
        hostname: "getrightproperty-prod-bucket.s3.ap-south-1.amazonaws.com",
      },
      {
        hostname: "d24ksaw8earfo7.cloudfront.net",
      },
    ],
  },
  env: {
    APP_ENV: process.env.APP_ENV || process.env.NODE_ENV || "development",
  },
  staticPageGenerationTimeout: 180,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    if (!isServer) {
      config.resolve.fallback = {
        dns: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
};

module.exports = withBundleAnalyzer(withMDX(nextConfig));
