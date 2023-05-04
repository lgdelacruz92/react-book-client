module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    indent: ["error", 2],
    "require-jsdoc": 0,
    "new-cap": 0,
    "object-curly-spacing": [
      "error",
      "always",
      {
        arraysInObjects: false,
        objectsInObjects: false,
        ImportDeclaration: true,
      },
    ],
  },
  plugins: ["@typescript-eslint", "import", "prettier"],
};
