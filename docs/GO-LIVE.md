# Checklist Pindah ke inland.co.id

Situs ini dibangun sebagai **salinan pratinjau** di `*.pages.dev`.
Situs WordPress lama tetap berjalan dan tidak tersentuh sampai langkah 3.

## Cara kerja saklar produksi

Satu environment variable menentukan semuanya:

```
SITE_URL = https://inland.co.id
```

Selama variabel ini **tidak** menunjuk ke `inland.co.id`, situs otomatis:

- menyisipkan `<meta name="robots" content="noindex, nofollow">` di setiap halaman
- menulis `_headers` berisi `X-Robots-Tag: noindex, nofollow`
- menulis `robots.txt` berisi `Disallow: /`
- menampilkan pita "Pratinjau" di bagian atas

Begitu variabel diarahkan ke domain asli, keempatnya hilang sendiri dan
`robots.txt` berganti jadi versi produksi. **Tidak ada yang perlu dihapus
manual** — ini sengaja dibuat begitu supaya tidak ada langkah yang terlupa.

Verifikasi lokal:

```bash
npm run build                                   # mode pratinjau
SITE_URL=https://inland.co.id npm run build     # mode produksi
cat dist/robots.txt
```

## Sebelum go-live

- [ ] **Ganti slug di `src/i18n/rute.ts`** dengan URL asli dari sitemap situs lama.
      Ini yang paling menentukan — slug yang meleset berarti peringkat Google hilang.
- [ ] Ganti seluruh isi `src/config/isi.ts` dengan teks asli (saat ini masih sementara).
- [ ] Isi semua `TODO` di `src/config/site.ts`: WhatsApp, email, alamat, fakta perusahaan.
- [ ] Masukkan foto proyek asli, ganti semua kotak "Foto menyusul".
- [ ] Ganti `public/favicon.svg` dengan versi dari logo asli.
- [ ] Siapkan `public/og-default.png` (1200×630) untuk pratinjau saat dibagikan.
- [ ] Bandingkan daftar URL lama dengan yang baru. Setiap URL lama yang
      berubah **wajib** dibuatkan 301 di `public/_redirects`:

      ```
      /alamat-lama/    /alamat-baru/    301
      ```

- [ ] Cek `npm run build` bersih tanpa peringatan.

## Saat go-live

1. Tambahkan custom domain `inland.co.id` di Cloudflare Pages.
2. Set environment variable `SITE_URL=https://inland.co.id` pada build produksi.
3. Jalankan ulang deploy, lalu periksa `https://inland.co.id/robots.txt`
   sudah berisi `Allow: /`, dan halaman tidak lagi memuat `noindex`.
4. Submit `https://inland.co.id/sitemap-index.xml` ke Google Search Console.

## Setelah go-live

- [ ] Biarkan situs WordPress lama hidup 2–4 minggu sebagai cadangan.
- [ ] Simpan backup penuh WordPress (berkas + database) sebelum apa pun dimatikan.
- [ ] Pantau Search Console selama dua minggu pertama untuk error crawl.
