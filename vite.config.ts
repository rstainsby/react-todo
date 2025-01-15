/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    viteTsconfigPaths(),
    TanStackRouterVite(),
    react(), 
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "src"),
    }
  },
  test: {
    coverage: {
      provider: 'v8'
    },
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    environment: 'happy-dom'
  }
})
