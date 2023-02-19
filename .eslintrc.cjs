/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ["testing-library"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      extends: ["plugin:astro/recommended", "prettier"],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    {
      files: ["*.ts", "*.tsx", "*.mjs"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:jest-dom/recommended",
        "prettier",
      ],
    },
  ],
};
