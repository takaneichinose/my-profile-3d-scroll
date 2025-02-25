import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { myProfile } from './vite_plugins/vite-plugin-my-profile';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), myProfile()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});
