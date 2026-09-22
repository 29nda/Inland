# Inland

Situs company profile **Inland — Architect, Build and Maintenance**,
dibangun dengan [Astro](https://astro.build), dideploy dari GitHub ke Cloudflare Pages.

> **Status: pratinjau.** Teks dan foto di situs ini masih sementara.
> Situs WordPress di `inland.co.id` masih berjalan dan belum tersentuh.

## Jalankan di komputer

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # hasil build ke dist/
```

## Yang sudah jadi

- Dua bahasa: Indonesia di akar (`/layanan/`), Inggris di bawah `/en/` (`/en/services/`)
- URL berakhiran garis miring, mengikuti pola WordPress lama
- Tag `hreflang` antar versi bahasa, canonical, Open Graph
- Data terstruktur JSON-LD (`GeneralContractor`)
- Sitemap otomatis, `robots.txt` dan `_headers` yang menyesuaikan lingkungan
- Perlindungan `noindex` otomatis selama masih di subdomain pratinjau
- Gambar dioptimasi saat build (WebP/AVIF, beberapa ukuran)
- Font di-host sendiri, tanpa permintaan ke server luar

## Yang masih ditunggu

| Item | Berkas yang perlu diisi |
|---|---|
| Daftar URL asli dari sitemap situs lama | `src/i18n/rute.ts` |
| Teks asli tiap halaman | `src/config/isi.ts` |
| WhatsApp, email, alamat, fakta perusahaan | `src/config/site.ts` |
| Foto proyek | `src/assets/proyek/` |
| Logo versi vektor | `src/assets/`, `public/favicon.svg` |

## Dokumentasi

- [`docs/PANDUAN.md`](docs/PANDUAN.md) — cara mengubah isi dan menambah proyek
- [`docs/GO-LIVE.md`](docs/GO-LIVE.md) — checklist pindah ke `inland.co.id`

## Deploy

Cloudflare Pages, dihubungkan ke repo ini:

| Setelan | Nilai |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20 atau lebih baru |
| Env var (produksi saja) | `SITE_URL=https://inland.co.id` |

Selama `SITE_URL` belum diisi, build otomatis masuk mode pratinjau dan
tidak akan terindeks Google.
