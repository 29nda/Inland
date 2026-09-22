/**
 * Pusat data situs.
 *
 * Hampir semua yang perlu diubah sehari-hari ada di berkas ini:
 * nama, kontak, WhatsApp, menu, dan fakta perusahaan.
 * Ubah di sini, seluruh halaman ikut berubah.
 *
 * Tanda TODO menandai data yang masih menunggu dari pemilik situs.
 */

export const site = {
  nama: 'Inland',
  namaLengkap: 'Inland — Architect, Build and Maintenance',
  tagline: {
    id: 'Arsitek, Konstruksi, dan Pemeliharaan',
    en: 'Architect, Build and Maintenance',
  },

  kontak: {
    // TODO: ganti dengan nomor WhatsApp resmi (format internasional, tanpa + dan spasi)
    whatsapp: '6281234567890',
    // TODO: ganti dengan email resmi
    email: 'info@inland.co.id',
    // TODO: alamat kantor lengkap — dipakai juga untuk data LocalBusiness
    alamat: {
      jalan: '',
      kota: '',
      provinsi: '',
      kodePos: '',
      negara: 'ID',
    },
    // TODO: koordinat kantor untuk Google Maps
    koordinat: { lat: null as number | null, lng: null as number | null },
  },

  sosial: {
    instagram: '',
    linkedin: '',
    facebook: '',
  },

  /**
   * Fakta yang bisa dikutip mesin pencari dan AI.
   * Angka konkret jauh lebih berguna daripada kalimat pemasaran —
   * ini bahan utama agar situs muncul di jawaban AI, bukan sekadar di daftar tautan.
   */
  fakta: {
    tahunBerdiri: null as number | null,   // TODO
    jumlahProyek: null as number | null,   // TODO
    wilayahLayanan: [] as string[],        // TODO, mis. ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi']
    sertifikasi: [] as string[],           // TODO
  },

  /** Warna diambil langsung dari berkas logo. */
  warna: {
    oranye: '#F08020',
    oranyeGelap: '#975122',
    oranyeTerang: '#FF9A3B',
    tinta: '#241A12',
  },
} as const;

/** Tautan WhatsApp dengan pesan yang sudah terisi. */
export function tautanWhatsApp(pesan?: string): string {
  const teks = pesan ?? 'Halo Inland, saya ingin berkonsultasi mengenai proyek saya.';
  return `https://wa.me/${site.kontak.whatsapp}?text=${encodeURIComponent(teks)}`;
}
