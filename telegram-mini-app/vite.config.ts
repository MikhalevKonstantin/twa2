import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dns from 'dns';

// localhost part
dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/core'),
      '@core/*': path.resolve(__dirname, './src/core/*'),
      '@home': path.resolve(__dirname, './src/features/home'),
      '@home/*': path.resolve(__dirname, './src/features/home/*'),
      '@wallet': path.resolve(__dirname, './src/features/wallet'),
      '@wallet/*': path.resolve(__dirname, './src/features/wallet/*'),
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  base: './',
});
