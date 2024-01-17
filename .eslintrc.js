module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
  ],
  plugins: ["vue", "@typescript-eslint", "prettier", "filenames"],
  rules: {
    "no-duplicate-imports": "error",
    "no-alert": "error",
    "no-console": "warn",
    "no-debugger": "error",
    "no-unused-vars": "off",
    "no-throw-literal": "error",
    "no-irregular-whitespace": [
      "error",
      {
        skipStrings: true,
        skipComments: true,
        skipRegExps: true,
        skipTemplates: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "vue/attribute-hyphenation": "error",
    "vue/prop-name-casing": "error",
    "vue/no-v-html": "error",
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: false,
        ignores: ["/^router-/"],
      },
    ],
    "prettier/prettier": [
      "warn",
      {
        semi: true,
        printWidth: 120,
        tabWidth: 2,
        trailingComma: "all",
        htmlWhitespaceSensitivity: "ignore",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts"],
      env: {
        mocha: true,
      },
    },
    {
      files: ["tests/**/*.spec.ts"],
      env: {
        mocha: true,
      },
      rules: {
        strict: "off",
        "filenames/match-regex": ["error", /^([a-zA-Z][a-z0-9]+)+\.spec/],
        "filenames/match-exported": "off",
      },
    },
    {
      files: [
        ".eslintrc.js",
        "babel.config.js",
        "nyc.config.js",
        "**/vue.config.js",
        "src/shims-vue.d.ts",
        "tests/e2e/plugins/index.js",
        "tests/e2e/support/commands.js",
        "tests/e2e/support/index.js",
        "tests/e2e/specs/test.js",
      ],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "filenames/match-regex": "off",
      },
    },
  ],
};
