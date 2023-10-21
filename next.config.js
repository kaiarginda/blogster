// // // Example config for adding a loader that depends on babel-loader
// // // This source was taken from the @next/mdx plugin source:
// // // https://github.com/vercel/next.js/tree/canary/packages/next-mdx
// // module.exports = {
// //   webpack: (config, options) => {
// //     config.module.rules.push({
// //       test: /\.mdx/,
// //       use: [
// //         options.defaultLoaders.babel,
// //         {
// //           loader: "@mdx-js/loader",
// //           options: {},
// //         },
// //       ],
// //     });

// //     return config;
// //   },
// // };
// const withMDX = require("@next/mdx")({
//   extension: /\.mdx$/,
// });

// module.exports = withMDX();

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(win32-x64-msvc\.node)$/, // Adjust the regex pattern to match your specific binary files
      use: "ignore-loader", // Use a custom loader (ignore-loader) to ignore the binary files
    });

    return config;
  },
};
