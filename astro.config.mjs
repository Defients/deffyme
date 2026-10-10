import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://deffy.me',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  vite: { plugins: [tailwindcss()], build: { sourcemap: false } },
  devToolbar: { enabled: false },
  server: { host: '127.0.0.1', port: 4321 },
});
