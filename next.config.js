/* @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: config.assetPrefix,
  isClient: !isServer,
  isServer,
  isDevelopment: dev,
  future: nextConfig.future || {},
  experimental: nextConfig.experimental || {},
};

module.exports = nextConfig;
