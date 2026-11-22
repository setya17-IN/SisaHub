import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const featureNames = ["auth", "category", "material", "request", "favorite", "report", "review", "need", "notification", "profile", "matching", "scanner", "map", "impact", "admin"];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: ["@/features/*/*"], message: "App hanya boleh mengimpor public API fitur (@/features/<nama>)." }] }],
    },
  },
  {
    files: ["components/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: ["@/features/**"], message: "components/ui tidak boleh mengimpor features." }] }],
    },
  },
  ...featureNames.map((feature) => ({
    files: [`features/${feature}/**/*.{ts,tsx}`],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: featureNames.filter((name) => name !== feature).map((name) => `@/features/${name}/*`), message: "Fitur hanya boleh mengimpor public API fitur lain." }] }],
    },
  })),
]);

export default eslintConfig;
