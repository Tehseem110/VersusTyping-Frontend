// vite.config.js

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  base: '/', // Add the base option to specify the base URL
});
