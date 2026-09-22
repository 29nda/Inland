import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Proyek portofolio.
 *
 * Menambah proyek baru = menambah satu berkas .md di src/content/proyek/
 * dan satu folder foto di src/assets/proyek/<slug>/.
 * Tidak ada langkah lain; Cloudflare membangun ulang situs setelah commit.
 */
const proyek = defineCollection({
  loader: glob({ base: './src/content/proyek', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      judul: z.string(),
      judulEn: z.string().optional(),
      ringkasan: z.string(),
      ringkasanEn: z.string().optional(),
      kategori: z.enum(['residensial', 'komersial', 'interior', 'renovasi', 'pemeliharaan']),
      lokasi: z.string(),
      tahun: z.number().int().min(1990).max(2100),
      /** Foto utama. Boleh dikosongkan selama foto asli belum tersedia. */
      sampul: image().optional(),
      galeri: z.array(image()).default([]),
      /** Tampilkan di beranda. */
      unggulan: z.boolean().default(false),
      urutan: z.number().default(0),
    }),
});

export const collections = { proyek };
