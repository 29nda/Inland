# Panduan Merawat Situs

Catatan praktis untuk mengubah isi situs tanpa membongkar kodenya.

## Di mana mengubah apa

| Yang ingin diubah | Berkasnya |
|---|---|
| Nomor WhatsApp, email, alamat, sosial media | `src/config/site.ts` |
| Tahun berdiri, jumlah proyek, wilayah layanan | `src/config/site.ts` → `fakta` |
| **Seluruh teks halaman (ID & EN)** | `src/config/isi.ts` |
| Alamat/slug halaman | `src/i18n/rute.ts` |
| Label tombol dan menu | `src/i18n/teks.ts` |
| Warna, ukuran huruf, jarak | `src/styles/global.css` |
| Daftar proyek | `src/content/proyek/*.md` |

## Menambah proyek baru

1. Buat berkas `src/content/proyek/nama-proyek.md`:

```markdown
---
judul: "Rumah Tinggal Bintaro"
judulEn: "Bintaro Residence"
ringkasan: "Satu kalimat tentang proyek ini."
ringkasanEn: "One sentence about this project."
kategori: residensial      # residensial | komersial | interior | renovasi | pemeliharaan
lokasi: "Tangerang Selatan"
tahun: 2025
sampul: ../../assets/proyek/bintaro/depan.jpg
unggulan: true             # tampil di beranda
urutan: 1
---

Deskripsi lengkap proyek ditulis di sini.
```

2. Taruh fotonya di `src/assets/proyek/nama-proyek/`.
3. Commit dan push. Cloudflare membangun ulang situs secara otomatis.

Kalau `sampul` dikosongkan, situs menampilkan kotak "Foto menyusul" — tata
letaknya tetap rapi, jadi proyek boleh dimasukkan lebih dulu tanpa foto.

## Aturan gambar

Kompres **sebelum** commit. Git menyimpan setiap versi berkas selamanya,
jadi foto besar yang sering diganti akan menggelembungkan repo permanen.

- Lebar maksimum 2400 px
- JPEG kualitas 80 (biasanya jadi 300–600 KB)
- Jangan pakai Git LFS

Astro mengurus sisanya: saat build, tiap gambar dikonversi ke WebP/AVIF
dalam beberapa ukuran, lalu disajikan lewat CDN Cloudflare.

## Melihat hasil sebelum live

Tidak ada tombol pratinjau seperti WordPress. Alurnya:

1. Buat branch baru, lakukan perubahan, buka pull request.
2. Cloudflare Pages otomatis membuat URL pratinjau untuk PR itu.
3. Puas → merge ke `main` → situs utama ikut terbarui.

Untuk menjalankan di komputer sendiri:

```bash
npm install
npm run dev        # buka http://localhost:4321
```
