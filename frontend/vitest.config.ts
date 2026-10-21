import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Configuration séparée de vite.config.ts : les tests n'ont pas besoin du plugin
// React Router (génération de routes, pré-rendu).
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/test/**", "src/routes.ts", "src/root.tsx"],
    },
  },
});
