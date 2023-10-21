const path = require("path");

module.exports = {
  webpack: (config, options) => {
    // Add the ignore-loader for binary files
    config.module.rules.push({
      test: /\.(linux-x64-musl\.node)$/, // Adjust the regex pattern to match your binary files
      use: "ignore-loader",
    });

    return config;
  },
};
