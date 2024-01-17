module.exports = {
  presets: ["@vue/app"],
  env: {
    test: {
      plugins: [
        [
          "istanbul",
          {
            useInlineSourceMaps: true,
            extension: [".ts", ".vue"],
          },
        ],
      ],
    },
  },
};
