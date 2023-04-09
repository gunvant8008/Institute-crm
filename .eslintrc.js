// module.exports = {
//   extends: [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:@typescript-eslint/recommended-requiring-type-checking",
//     "next",
//     "next/core-web-vitals"
//   ],
//   overrides: [],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     project: "./tsconfig.json",
//     ecmaVersion: "latest",
//     sourceType: "module"
//   },
//   rules: {}
// }
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:testing-library/react",
    "next",
    "next/core-web-vitals",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "testing-library/no-render-in-setup": "warn",
    // added this rule to solve this issue in details page- Invalid type "string | string[] | undefined" of template literal expression.
    // "@typescript-eslint/restrict-template-expressions": "error"
  },
};
