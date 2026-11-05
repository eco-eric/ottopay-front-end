import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ottopay.pro',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
