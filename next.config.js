const path = require("path");

module.exports = {
  webpack: (config, options) => {
    // Add the raw-loader for binary files like .node
    config.module.rules.push({
      test: /\.(linux-x64-gnu\.node)$/, // Adjust the regex pattern to match your binary files
      use: {
        loader: "raw-loader",
        options: {
          esModule: false,
        },
      },
    });

    return config;
  },
};
