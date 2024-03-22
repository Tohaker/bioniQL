import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    name: "E2E",
    globalSetup: "./tests/setup.ts",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      graphql: "graphql/index.js",
    },
  },
});
