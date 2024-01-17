const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "test") {
      const scssRule = config.module.rule("scss");
      scssRule.uses.clear();
      scssRule.use("null-loader").loader("null-loader");
    }
  },
  configureWebpack: {
    node: {
      global: true,
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
      new NodePolyfillPlugin(),
    ],
    resolve: {
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
      },
    },
  },
});
