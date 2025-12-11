import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

export default [
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "dist/**",
      "**/*.config.js",
      "**/*.config.mjs",
      "next.config.js",
      "postcss.config.js",
      "tailwind.config.js"
    ]
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module", project: "./tsconfig.json" },
      globals: {
        ...js.configs.recommended.languageOptions?.globals,
        ...globals.browser
      }
    },
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/no-unescaped-entities": "off"
    }
  }
];
