// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE y BASE_PATH los fija el workflow de despliegue. En GitHub Pages sin
// dominio propio la web vive en /<repo>/; con verdadpolitica.es, en la raíz.
export default defineConfig({
  site: process.env.SITE ?? 'https://verdadpolitica.es',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
