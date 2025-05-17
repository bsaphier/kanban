/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/kanban/',
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.ts', '**/*.test.tsx'],
    setupFiles: 'src/setupTests.js',
  },
  resolve: {
    alias: {
      helpers: '/src/helpers',
      store: '/src/store',
      screens: '/src/screens',
      components: '/src/components',
    },
  },
});
