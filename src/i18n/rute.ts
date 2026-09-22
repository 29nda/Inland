/**
 * Peta halaman dan alamatnya dalam dua bahasa.
 *
 * INI BERKAS PALING PENTING UNTUK SEO.
 *
 * Kolom `id` harus sama persis dengan alamat di situs WordPress lama,
 * supaya peringkat Google yang sudah ada tidak hilang saat pindah.
 *
 * == MASIH SEMENTARA ==
 * Slug di bawah masih tebakan. Ganti dengan daftar URL asli dari
 * sitemap.xml situs lama sebelum situs ini dipublikasikan.
 */

export interface Rute {
  /** Kunci internal, tidak muncul di alamat. */
  kunci: string;
  /** Alamat versi Indonesia — WAJIB sama dengan situs lama. */
  id: string;
  /** Alamat versi Inggris, selalu di bawah /en/. */
  en: string;
  /** Tampil di menu utama? */
  menu: boolean;
}

export const rute: Rute[] = [
  { kunci: 'beranda', id: '/',              en: '/en/',            menu: true },
  { kunci: 'tentang', id: '/tentang-kami/', en: '/en/about-us/',   menu: true },
  { kunci: 'layanan', id: '/layanan/',      en: '/en/services/',   menu: true },
  { kunci: 'proyek',  id: '/proyek/',       en: '/en/projects/',   menu: true },
  { kunci: 'kontak',  id: '/kontak/',       en: '/en/contact/',    menu: true },
];

export type Bahasa = 'id' | 'en';

/** Alamat sebuah halaman dalam bahasa tertentu. */
export function jalur(kunci: string, bahasa: Bahasa): string {
  const r = rute.find((x) => x.kunci === kunci);
  if (!r) throw new Error(`Rute "${kunci}" tidak terdaftar di src/i18n/rute.ts`);
  return r[bahasa];
}

/** Pasangan terjemahan halaman ini — dipakai untuk tag hreflang. */
export function pasangan(kunci: string): Record<Bahasa, string> {
  const r = rute.find((x) => x.kunci === kunci);
  if (!r) throw new Error(`Rute "${kunci}" tidak terdaftar di src/i18n/rute.ts`);
  return { id: r.id, en: r.en };
}

export const menuUtama = rute.filter((r) => r.menu);
