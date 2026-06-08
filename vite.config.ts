import { defineConfig } from "vite-plus";

const skillVendorIgnore = [
  "**/.agents/**",
  "**/.cursor/skills/**",
  "**/.kiro/**",
  "**/.claude/skills/**",
];

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["**/dist/**", "**/node_modules/**", "**/.astro/**", ...skillVendorIgnore],
  },
  lint: {
    ignorePatterns: skillVendorIgnore,
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./frontend/src/test/setup.ts"],
    include: ["frontend/src/**/*.{test,spec}.{ts,tsx}"],
    globals: true,
    passWithNoTests: true,
  },
  run: {
    tasks: {
      "frontend:dev": {
        command: "cd frontend && vp run dev",
      },
      "frontend:build": {
        command: "cd frontend && vp run build",
      },
      "frontend:preview": {
        command: "cd frontend && vp run preview",
      },
    },
  },
});
