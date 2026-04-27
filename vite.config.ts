import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
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
