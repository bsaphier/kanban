import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      helpers: '/src/helpers',
      store: '/src/store',
      screens: '/src/screens',
      components: '/src/components',
    },
  },
});
