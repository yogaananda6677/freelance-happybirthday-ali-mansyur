import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Listen on all network addresses (0.0.0.0)
    allowedHosts: true, // Allow all hosts through Cloudflare Tunnel (apaya.buildwithyoga.my.id)
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
});
