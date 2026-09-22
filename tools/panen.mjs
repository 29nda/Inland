#!/usr/bin/env node
/**
 * Pemanen isi situs WordPress — dijalankan dari komputer Anda.
 *
 *   node tools/panen.mjs https://inland.co.id
 *
 * Menghasilkan satu berkas `panen.json` berisi:
 *   - daftar URL lengkap dari sitemap
 *   - judul, meta description, dan seluruh teks tiap halaman
 *   - struktur heading (H1/H2/H3) tiap halaman
 *   - daftar tautan gambar beserta ukuran aslinya
 *   - warna dan font yang dipakai tema
 *
 * Berkas itu kecil (biasanya di bawah 1 MB) dan cukup untuk membangun
 * ulang seluruh situs. Commit berkasnya, sisanya saya kerjakan.
 *
 * Butuh Node 18 atau lebih baru. Tidak perlu install apa pun.
 */

import { writeFile } from 'node:fs/promises';

const base = (process.argv[2] || 'https://inland.co.id').replace(/\/+$/, '');
const UA = 'Mozilla/5.0 (compatible; inland-site-owner-harvest/1.0)';

const hasil = {
  sumber: base,
  dipanenPada: new Date().toISOString(),
  urlDitemukan: [],
  halaman: [],
  media: [],
  tema: {},
  catatan: [],
};

const log = (...m) => console.log(...m);
const warn = (m) => { hasil.catatan.push(m); console.warn('  ! ' + m); };

async function ambil(url, tipe = 'text') {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return tipe === 'json' ? res.json() : res.text();
}

/* ---------- 1. Kumpulkan seluruh URL dari sitemap ---------- */

async function dariSitemap() {
  const kandidat = ['/sitemap_index.xml', '/wp-sitemap.xml', '/sitemap.xml'];
  const urls = new Set();

  for (const jalur of kandidat) {
    let xml;
    try { xml = await ambil(base + jalur); } catch { continue; }
    log(`  sitemap ditemukan: ${jalur}`);

    const loc = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    // Sitemap induk menunjuk ke sitemap lain; ikuti satu tingkat.
    for (const l of loc) {
      if (/\.xml$/i.test(l)) {
        try {
          const anak = await ambil(l);
          [...anak.matchAll(/<loc>([^<]+)<\/loc>/g)].forEach((m) => urls.add(m[1].trim()));
        } catch { warn(`sitemap anak gagal: ${l}`); }
      } else {
        urls.add(l);
      }
    }
    if (urls.size) break;
  }
  return [...urls].filter((u) => u.startsWith(base) && !/\.(jpg|jpeg|png|webp|gif|pdf)$/i.test(u));
}

/* ---------- 2. Ambil isi tiap halaman ---------- */

const bersihkan = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .join('\n');

const cocok = (html, re) => [...html.matchAll(re)].map((m) => bersihkan(m[1]).trim()).filter(Boolean);

async function halaman(url) {
  const html = await ambil(url);
  const ambilAtribut = (re) => (html.match(re) || [, ''])[1];

  return {
    url,
    jalur: new URL(url).pathname,
    judul: bersihkan(ambilAtribut(/<title[^>]*>([\s\S]*?)<\/title>/i) || ''),
    deskripsi: ambilAtribut(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i),
    h1: cocok(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi),
    h2: cocok(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi),
    h3: cocok(html, /<h3[^>]*>([\s\S]*?)<\/h3>/gi),
    teks: bersihkan(html).slice(0, 20000),
    gambar: [...new Set(
      [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) => new URL(m[1], url).href),
    )],
  };
}

/* ---------- 3. Media ukuran penuh lewat REST API ---------- */

async function media() {
  const daftar = [];
  let page = 1;
  for (;;) {
    let batch;
    try {
      batch = await ambil(`${base}/wp-json/wp/v2/media?per_page=100&page=${page}`, 'json');
    } catch (e) {
      if (page === 1) warn(`REST media tidak tersedia (${e.message}); daftar gambar diambil dari HTML saja`);
      break;
    }
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const m of batch) {
      daftar.push({
        id: m.id,
        url: m.source_url,
        judul: m.title?.rendered ?? '',
        alt: m.alt_text ?? '',
        lebar: m.media_details?.width ?? null,
        tinggi: m.media_details?.height ?? null,
      });
    }
    process.stdout.write(`\r  media: ${daftar.length} berkas   `);
    if (batch.length < 100) break;
    page += 1;
  }
  if (daftar.length) process.stdout.write('\n');
  return daftar;
}

/* ---------- 4. Warna & font tema ---------- */

async function tema() {
  try {
    const html = await ambil(base + '/');
    const css = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)]
      .map((m) => new URL(m[1], base).href)
      .filter((u) => u.includes('/wp-content/'))
      .slice(0, 6);

    const warna = new Map();
    const font = new Set();

    for (const u of css) {
      let isi;
      try { isi = await ambil(u); } catch { continue; }
      for (const m of isi.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)) {
        const h = '#' + m[1].toUpperCase();
        warna.set(h, (warna.get(h) || 0) + 1);
      }
      for (const m of isi.matchAll(/font-family\s*:\s*([^;}]+)/gi)) {
        font.add(m[1].trim().slice(0, 120));
      }
    }

    return {
      berkasCss: css,
      warnaTersering: [...warna.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)
        .map(([hex, n]) => ({ hex, dipakai: n })),
      font: [...font].slice(0, 15),
      generator: (html.match(/<meta name="generator"[^>]*content=["']([^"']+)["']/i) || [, ''])[1],
      plugin: [...new Set([...html.matchAll(/wp-content\/plugins\/([a-z0-9._-]+)/gi)].map((m) => m[1]))],
      temaAktif: [...new Set([...html.matchAll(/wp-content\/themes\/([a-z0-9._-]+)/gi)].map((m) => m[1]))],
    };
  } catch (e) {
    warn(`gagal membaca tema: ${e.message}`);
    return {};
  }
}

/* ---------- Jalankan ---------- */

log(`== Memanen ${base} ==\n`);

log('1/4  Mencari sitemap...');
hasil.urlDitemukan = await dariSitemap();
if (!hasil.urlDitemukan.length) {
  warn('sitemap tidak ditemukan; hanya beranda yang dipanen');
  hasil.urlDitemukan = [base + '/'];
}
log(`     ${hasil.urlDitemukan.length} URL ditemukan\n`);

log('2/4  Mengambil isi tiap halaman...');
for (const [i, u] of hasil.urlDitemukan.entries()) {
  try {
    hasil.halaman.push(await halaman(u));
  } catch (e) {
    warn(`halaman gagal: ${u} (${e.message})`);
  }
  process.stdout.write(`\r     ${i + 1}/${hasil.urlDitemukan.length}   `);
  await new Promise((r) => setTimeout(r, 400)); // jeda, jangan bebani server
}
log('\n');

log('3/4  Mendaftar media ukuran penuh...');
hasil.media = await media();
log(`     ${hasil.media.length} berkas terdaftar\n`);

log('4/4  Membaca warna dan font tema...');
hasil.tema = await tema();
log('     selesai\n');

await writeFile('panen.json', JSON.stringify(hasil, null, 2));

const mb = (JSON.stringify(hasil).length / 1024 / 1024).toFixed(2);
log('== Selesai ==');
log(`  halaman  : ${hasil.halaman.length}`);
log(`  media    : ${hasil.media.length}`);
log(`  peringatan: ${hasil.catatan.length}`);
log(`\nTersimpan sebagai panen.json (${mb} MB)`);
log('\nLangkah berikutnya:');
log('  git add panen.json && git commit -m "Tambah hasil panen situs lama" && git push');
