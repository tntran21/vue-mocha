module.exports = {
  all: true,
  include: ["src/**/*.{ts,vue}"],
  exclude: ["src/*.ts", "src/router/*", "src/**/*.stories.ts"],
  reporter: ["lcov", "text", "text-summary"],
  extension: [".ts", ".vue"],
  //require: ["source-map-support/register"], // これを入れるとtsが全く表示されなくなる
  extends: ["@istanbuljs/nyc-config-typescript"], // これ外すとtsが全く表示されなくなる
};
