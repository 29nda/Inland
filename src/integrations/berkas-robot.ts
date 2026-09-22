import type { AstroIntegration } from 'astro';
import { writeFile } from 'node:fs/promises';

/**
 * Menulis robots.txt dan _headers saat build, menyesuaikan lingkungannya.
 *
 * Alasannya: salinan staging tidak boleh diindeks Google, karena teksnya
 * sama persis dengan situs asli dan akan bersaing sebagai konten duplikat.
 * Dengan dibangkitkan otomatis, tidak ada langkah manual yang bisa terlupa
 * saat go-live — cukup ubah SITE_URL, berkasnya ikut berubah sendiri.
 */
export function berkasRobot(): AstroIntegration {
  return {
    name: 'inland-berkas-robot',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const situs = new URL(process.env.SITE_URL ?? 'https://inland.pages.dev');
        const produksi = situs.hostname === 'inland.co.id' || situs.hostname === 'www.inland.co.id';

        const robots = produksi
          ? [
              'User-agent: *',
              'Allow: /',
              '',
              '# Perayap mesin pencari berbasis AI sengaja diizinkan,',
              '# supaya profil perusahaan ini bisa dikutip dalam jawaban mereka.',
              'User-agent: GPTBot',
              'Allow: /',
              '',
              'User-agent: ClaudeBot',
              'Allow: /',
              '',
              'User-agent: PerplexityBot',
              'Allow: /',
              '',
              `Sitemap: ${new URL('/sitemap-index.xml', situs).href}`,
              '',
            ].join('\n')
          : [
              '# Salinan pratinjau — tidak boleh diindeks.',
              '# Berkas ini berubah sendiri menjadi versi produksi',
              '# begitu SITE_URL diarahkan ke https://inland.co.id',
              'User-agent: *',
              'Disallow: /',
              '',
            ].join('\n');

        const headers = produksi
          ? [
              '/*',
              '  X-Content-Type-Options: nosniff',
              '  Referrer-Policy: strict-origin-when-cross-origin',
              '',
              '/_astro/*',
              '  Cache-Control: public, max-age=31536000, immutable',
              '',
            ].join('\n')
          : [
              '/*',
              '  X-Robots-Tag: noindex, nofollow',
              '  X-Content-Type-Options: nosniff',
              '',
            ].join('\n');

        await writeFile(new URL('robots.txt', dir), robots, 'utf8');
        await writeFile(new URL('_headers', dir), headers, 'utf8');

        logger.info(
          produksi
            ? 'robots.txt: mode produksi (boleh diindeks)'
            : 'robots.txt + _headers: mode pratinjau (noindex)',
        );
      },
    },
  };
}
