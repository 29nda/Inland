/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  SELURUH TEKS HALAMAN ADA DI BERKAS INI                          ║
 * ║                                                                  ║
 * ║  ⚠  SEMUA ISI DI BAWAH MASIH TEKS SEMENTARA.                     ║
 * ║                                                                  ║
 * ║  Teks ini ditulis sebagai penahan tata letak, BUKAN sebagai      ║
 * ║  naskah final. Ganti seluruhnya dengan teks asli dari            ║
 * ║  inland.co.id sebelum situs dipublikasikan.                      ║
 * ║                                                                  ║
 * ║  Menukar teks di sini tidak menyentuh tata letak sama sekali.    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

export const isi = {
  id: {
    beranda: {
      metaDeskripsi:
        'Inland mengerjakan perencanaan arsitektur, pelaksanaan konstruksi, dan pemeliharaan bangunan.',
      kicker: 'Arsitek · Konstruksi · Pemeliharaan',
      judul: 'Merancang, membangun, dan merawat ruang yang bertahan.',
      timbal:
        'Kami menangani satu rangkaian penuh — dari gambar perencanaan, pelaksanaan di lapangan, sampai pemeliharaan setelah bangunan berdiri.',
      layananKicker: 'Yang Kami Kerjakan',
      layananJudul: 'Tiga tahap, satu tanggung jawab',
      proyekKicker: 'Portofolio',
      proyekJudul: 'Proyek terpilih',
      ctaJudul: 'Punya rencana yang ingin didiskusikan?',
      ctaTimbal: 'Ceritakan kebutuhan Anda lewat WhatsApp. Konsultasi awal tidak dipungut biaya.',
    },

    tentang: {
      metaDeskripsi: 'Profil Inland: latar belakang, cara kerja, dan cakupan layanan.',
      kicker: 'Tentang Kami',
      judul: 'Perusahaan arsitektur dan konstruksi',
      timbal:
        'Bagian ini menunggu profil perusahaan yang asli — latar belakang, nilai kerja, dan pengalaman yang ingin ditonjolkan.',
      isi: [
        'Paragraf pembuka tentang perusahaan ditulis di sini: kapan berdiri, apa yang dikerjakan, dan untuk siapa.',
        'Paragraf kedua biasanya berisi cara kerja — bagaimana proyek ditangani dari awal sampai serah terima.',
      ],
    },

    layanan: {
      metaDeskripsi: 'Layanan Inland: perencanaan arsitektur, konstruksi, renovasi, dan pemeliharaan bangunan.',
      kicker: 'Layanan',
      judul: 'Apa yang bisa kami kerjakan',
      timbal: 'Rincian tiap layanan menunggu teks asli dari situs lama.',
    },

    proyek: {
      metaDeskripsi: 'Kumpulan proyek arsitektur, konstruksi, dan renovasi yang dikerjakan Inland.',
      kicker: 'Portofolio',
      judul: 'Proyek',
      timbal: 'Daftar proyek akan terisi setelah data dan foto proyek dimasukkan.',
    },

    kontak: {
      metaDeskripsi: 'Hubungi Inland untuk konsultasi proyek arsitektur, konstruksi, dan pemeliharaan.',
      kicker: 'Kontak',
      judul: 'Mari bicarakan proyek Anda',
      timbal:
        'Cara tercepat menghubungi kami adalah lewat WhatsApp. Sampaikan gambaran proyeknya, kami balas dengan langkah berikutnya.',
    },

    /** Kartu layanan di beranda dan halaman layanan. */
    layananDaftar: [
      {
        nomor: '01',
        judul: 'Perencanaan & Desain',
        teks: 'Gambar kerja, perizinan, dan perhitungan anggaran sebelum pembangunan dimulai.',
      },
      {
        nomor: '02',
        judul: 'Pelaksanaan Konstruksi',
        teks: 'Pembangunan baru maupun renovasi, dengan pengawasan mutu dan jadwal di lapangan.',
      },
      {
        nomor: '03',
        judul: 'Pemeliharaan Bangunan',
        teks: 'Perawatan berkala dan perbaikan setelah bangunan digunakan.',
      },
    ],
  },

  en: {
    beranda: {
      metaDeskripsi:
        'Inland provides architectural planning, construction, and building maintenance services.',
      kicker: 'Architect · Build · Maintenance',
      judul: 'Designing, building, and maintaining spaces that last.',
      timbal:
        'We handle the full sequence — from drawings and planning, through construction on site, to maintenance once the building is in use.',
      layananKicker: 'What We Do',
      layananJudul: 'Three stages, one responsibility',
      proyekKicker: 'Portfolio',
      proyekJudul: 'Selected projects',
      ctaJudul: 'Have a project in mind?',
      ctaTimbal: 'Tell us about it on WhatsApp. The first consultation is free.',
    },

    tentang: {
      metaDeskripsi: 'About Inland: background, approach, and scope of work.',
      kicker: 'About Us',
      judul: 'An architecture and construction company',
      timbal: 'This section is waiting for the real company profile.',
      isi: [
        'Opening paragraph about the company goes here: when it started, what it does, and who it serves.',
        'The second paragraph usually covers the approach — how a project is handled from start to handover.',
      ],
    },

    layanan: {
      metaDeskripsi: 'Inland services: architectural planning, construction, renovation, and building maintenance.',
      kicker: 'Services',
      judul: 'What we can do',
      timbal: 'Detailed service copy is pending the original text.',
    },

    proyek: {
      metaDeskripsi: 'A collection of architecture, construction, and renovation projects by Inland.',
      kicker: 'Portfolio',
      judul: 'Projects',
      timbal: 'This list will fill in once project data and photos are added.',
    },

    kontak: {
      metaDeskripsi: 'Contact Inland for architecture, construction, and maintenance enquiries.',
      kicker: 'Contact',
      judul: "Let's talk about your project",
      timbal:
        'The fastest way to reach us is WhatsApp. Send an outline of your project and we will reply with the next step.',
    },

    layananDaftar: [
      {
        nomor: '01',
        judul: 'Planning & Design',
        teks: 'Working drawings, permits, and budgeting before construction begins.',
      },
      {
        nomor: '02',
        judul: 'Construction',
        teks: 'New builds and renovations, with quality and schedule supervised on site.',
      },
      {
        nomor: '03',
        judul: 'Building Maintenance',
        teks: 'Scheduled upkeep and repairs once the building is in use.',
      },
    ],
  },
} as const;
