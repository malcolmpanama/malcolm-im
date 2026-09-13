// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // `site` is required for canonical URLs, social card images and the sitemap.
  site: 'https://malcolm.im',
  build: {
    inlineStylesheets: 'always',
  },
});
