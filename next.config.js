// // /**  @type {import('next').NextConfig} */
// // const nextConfig = {};

// module.exports = nextConfig;
module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config;
  },
};
