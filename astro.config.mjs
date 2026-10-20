// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// La web se sirve en la raíz de https://verdadpolitica.es. SITE y BASE_PATH
// solo hacen falta para publicarla en otro sitio (p. ej. una copia en /<repo>/).
export default defineConfig({
  site: process.env.SITE || 'https://verdadpolitica.es',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
