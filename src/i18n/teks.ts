/**
 * Teks antarmuka dalam dua bahasa.
 * Isi halaman ada di src/content/, berkas ini hanya untuk label dan tombol.
 */
import type { Bahasa } from './rute';

export const teks = {
  id: {
    'nav.beranda': 'Beranda',
    'nav.tentang': 'Tentang Kami',
    'nav.layanan': 'Layanan',
    'nav.proyek': 'Proyek',
    'nav.kontak': 'Kontak',
    'nav.buka': 'Buka menu',
    'nav.tutup': 'Tutup menu',

    'cta.whatsapp': 'Hubungi via WhatsApp',
    'cta.konsultasi': 'Konsultasi Gratis',
    'cta.lihatProyek': 'Lihat Proyek',
    'cta.semuaProyek': 'Lihat Semua Proyek',
    'cta.pelajari': 'Selengkapnya',

    'footer.layanan': 'Layanan',
    'footer.perusahaan': 'Perusahaan',
    'footer.kontak': 'Hubungi Kami',
    'footer.hak': 'Seluruh hak cipta dilindungi.',

    'proyek.lokasi': 'Lokasi',
    'proyek.tahun': 'Tahun',
    'proyek.kategori': 'Kategori',
    'proyek.kosong': 'Belum ada proyek yang ditampilkan.',

    'gambar.menyusul': 'Foto menyusul',
    'bahasa.ganti': 'English',
  },
  en: {
    'nav.beranda': 'Home',
    'nav.tentang': 'About Us',
    'nav.layanan': 'Services',
    'nav.proyek': 'Projects',
    'nav.kontak': 'Contact',
    'nav.buka': 'Open menu',
    'nav.tutup': 'Close menu',

    'cta.whatsapp': 'Chat on WhatsApp',
    'cta.konsultasi': 'Free Consultation',
    'cta.lihatProyek': 'View Projects',
    'cta.semuaProyek': 'View All Projects',
    'cta.pelajari': 'Learn more',

    'footer.layanan': 'Services',
    'footer.perusahaan': 'Company',
    'footer.kontak': 'Get in Touch',
    'footer.hak': 'All rights reserved.',

    'proyek.lokasi': 'Location',
    'proyek.tahun': 'Year',
    'proyek.kategori': 'Category',
    'proyek.kosong': 'No projects to show yet.',

    'gambar.menyusul': 'Photo pending',
    'bahasa.ganti': 'Bahasa Indonesia',
  },
} as const;

export type KunciTeks = keyof (typeof teks)['id'];

export function t(bahasa: Bahasa) {
  return (kunci: KunciTeks): string => teks[bahasa][kunci] ?? teks.id[kunci];
}
