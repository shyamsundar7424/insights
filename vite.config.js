import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const pages = ['index', 'editor', 'index10', 'newcode', 'phone-dashboard', 'tablet-reels'];

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(process.cwd(), `${page}.html`)])),
    },
  },
  optimizeDeps: {
    entries: ['index.html'],
  },
});
