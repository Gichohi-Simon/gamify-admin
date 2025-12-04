import nextConfig from "eslint-config-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  // Load Next.js flat config (already an array)
  ...nextConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "prettier/prettier": "warn",
    },
  },
  // Prettier must stay at the end
  prettierConfig,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/**",
      "package-lock.json",
    ],
  },
];
