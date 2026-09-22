// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { berkasRobot } from './src/integrations/berkas-robot';

// Satu-satunya tempat URL dasar ditentukan.
// Staging  : SITE_URL tidak diisi -> pakai alamat pages.dev
// Produksi : set SITE_URL=https://inland.co.id di Cloudflare Pages
// Pindah domain nanti = ganti satu environment variable, tanpa sentuh kode.
const SITE = process.env.SITE_URL || 'https://inland.pages.dev';

export default defineConfig({
  site: SITE,

  // WordPress memakai URL berakhiran garis miring (/tentang-kami/).
  // Dua baris ini yang menjaga agar link di situs baru sama persis.
  trailingSlash: 'always',
  build: { format: 'directory' },

  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
    routing: {
      // Bahasa Indonesia tetap di akar tanpa awalan: /tentang-kami/
      // Bahasa Inggris memakai awalan:              /en/about-us/
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      i18n: { defaultLocale: 'id', locales: { id: 'id-ID', en: 'en-US' } },
    }),
    berkasRobot(),
  ],

  image: {
    // Batas ukuran layar yang dibuatkan varian gambarnya
    responsiveStyles: true,
  },
});
