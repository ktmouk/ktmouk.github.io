/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["./vitest/**/*.test.{ts,tsx}"],
    setupFiles: "./vitest/setup/index.ts",
    alias: {
      "@": "src/",
    },
  },
});
