module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["@typescript-eslint", "react-refresh"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
};
