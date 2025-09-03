/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    outputFileTracingExcludes: {
      "**": [
        "./node_modules/@prisma/client",
        "./node_modules/.prisma",
      ],
    },
  },
};

module.exports = nextConfig;


