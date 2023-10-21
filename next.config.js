const path = require("path");

module.exports = {
  webpack: (config, options) => {
    // Add the ignore-loader for binary files with .node extension
    config.module.rules.push({
      test: /\.(\.node)$/, // Match any file with a .node extension
      use: "ignore-loader",
    });

    return config;
  },
};
