# TentoTen Photobox — Production Web & Technical SEO

Repositori resmi website **TentoTen Photobox** (`https://tentotenphotobox.biz.id`): bilik foto analog di dalam kafe di Jawa Timur (Madiun, Jombang, Ponorogo, dan Kertosono) dengan harga transparan Rp35.000 per sesi, bayar di lokasi, tanpa reservasi.

---

## 1. Spesifikasi Teknis

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Bundler**: Vite 6
- **Server**: Express (Node.js 22)
- **SSG Engine**: Custom Prerenderer (`scripts/prerender.tsx`)
- **Audit Otomatis**: Production SEO Auditor (`scripts/seo-audit.mjs`)
- **Domain Resmi**: `https://tentotenphotobox.biz.id` (tanpa www)

---

## 2. 11 Rute Terindeks (Single Source of Truth)

Daftar rute didefinisikan secara terpusat di `src/routes.ts`:

1. `/` — Beranda
2. `/product` — Harga Sesi Photobox & Custom Frame
3. `/service` — Panduan Alur Layanan Booth
4. `/location` — Indeks Semua Cabang Kafe
5. `/location/madiun` — Sthana Coffee Madiun
6. `/location/jombang` — Ethereal Coffee Jombang
7. `/location/ponorogo` — Komahaus Coffee Ponorogo
8. `/location/kertosono` — Keyf Coffee Kertosono (Nganjuk)
9. `/kemitraan` — Kemitraan Kafe & Pengadaan Booth
10. `/contact` — Pusat Bantuan & Kontak WhatsApp
11. `/kebijakan-privasi` — Kebijakan Privasi

Rute ke-12 adalah `/404` yang membalas status HTTP 404 murni dan diberi tag `noindex, nofollow` (tidak dimasukkan ke dalam `sitemap.xml`).

---

## 3. Panduan Menjalankan & Membangun (Build)

### A. Prasyarat
- Node.js versi 20+ (direkomendasikan Node.js 22)
- npm versi 10+

### B. Menjalankan Mode Development
```bash
npm run dev
```
Aplikasi berjalan pada port 3000 dengan Vite dev server.

### C. Build Produksi (SSG Prerendering + SEO Audit)
```bash
npm run build
```
Perintah ini mengeksekusi tiga tahapan secara sekuensial:
1. `vite build` — Mengompilasi bundle JavaScript dan CSS ke folder `dist/`.
2. `tsx scripts/prerender.tsx` — Menghasilkan HTML statis untuk 11 rute terindeks + `404.html`, serta membuat `dist/sitemap.xml` dan `dist/robots.txt`.
3. `node scripts/seo-audit.mjs` — Menguji 100% kepatuhan SEO (keberadaan 11 URL sitemap, kecocokan persis canonical, ketiadaan halaman yatim, validitas JSON-LD, keunikan metadata, dan ketiadaan residu domain lama).

### D. Menjalankan Server Produksi
```bash
npm start
```
Server Express akan melayani file statis dari `dist/` pada port 3000 (atau sesuai environment variable `PORT`).

---

## 4. Perintah Verifikasi Lokal

Jalankan perintah berikut pada terminal setelah menjalankan server produksi:

```bash
# 1. Pastikan build berhasil tanpa error
npm run build

# 2. Jalankan server produksi di background atau terminal terpisah
npm start &

# 3. Uji respons header sitemap.xml (wajib 200 OK + application/xml)
curl -I http://localhost:3000/sitemap.xml

# 4. Uji respons header robots.txt (wajib 200 OK + text/plain)
curl -I http://localhost:3000/robots.txt

# 5. Uji respons URL tidak dikenal (wajib 404 Not Found + X-Robots-Tag: noindex, nofollow)
curl -I http://localhost:3000/tidak-ada

# 6. Pastikan tidak ada residu domain lama di seluruh berkas dist
grep -r "tentoten.id" dist/
```

### Hasil yang Diharapkan:
- `curl -I /sitemap.xml` menghasilkan `HTTP/1.1 200 OK` dan `content-type: application/xml; charset=utf-8`.
- `curl -I /robots.txt` menghasilkan `HTTP/1.1 200 OK` dan `content-type: text/plain; charset=utf-8`.
- `curl -I /tidak-ada` menghasilkan `HTTP/1.1 404 Not Found` dan header `x-robots-tag: noindex, nofollow`.
- `grep -r "tentoten.id" dist/` menghasilkan output kosong (exit code 1).

---

## 5. Konfigurasi Redirect 301 & Proxy Hosting

Pada `server.ts`, middleware canonical redirect telah disiapkan:
1. **Redirect WWW ke Non-WWW**: Setiap akses ke `www.tentotenphotobox.biz.id` dialihkan dengan status HTTP 301 permanen ke `https://tentotenphotobox.biz.id`.
2. **Redirect HTTP ke HTTPS**: Akses protokol tidak aman di belakang reverse proxy (seperti Cloud Run, Nginx, Cloudflare, atau AWS ALB melalui header `x-forwarded-proto`) dialihkan ke `https://`.
3. **Trailing Slash Canonical**: URL berakhiran garis miring (misal `/product/`) dialihkan otomatis ke versi bersih (`/product`).

*Catatan*: Jika aplikasi di-host di platform edge/CDN seperti Cloudflare, Vercel, atau Netlify, aturan redirect ini juga dapat diaktifkan di level DNS/Edge untuk performa respon yang lebih cepat sebelum mencapai server Express.

---

## 6. Langkah Submit ke Google Search Console & Bing Webmaster Tools

### A. Google Search Console (GSC)
1. Buka [Google Search Console](https://search.google.com/search-console).
2. Tambahkan properti baru dengan metode **URL prefix**: `https://tentotenphotobox.biz.id`.
3. Verifikasi kepemilikan menggunakan metode **HTML tag**. Salin kode verifikasi pada atribut `content`, lalu masukkan ke file `.env` pada variabel `GOOGLE_SITE_VERIFICATION="<KODE_GOOGLE>"`.
4. Jalankan `npm run build` kembali dan deploy.
5. Klik **Verify** pada Google Search Console.
6. Masuk ke menu **Sitemaps** pada panel navigasi kiri.
7. Masukkan URL: `sitemap.xml` (lengkapnya: `https://tentotenphotobox.biz.id/sitemap.xml`), lalu klik **Submit**.
8. Pastikan status menunjukkan **Success** dengan total 11 URL ditemukan.

### B. Bing Webmaster Tools
1. Buka [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Anda dapat mengimpor langsung properti yang telah terverifikasi dari Google Search Console, atau menambahkan URL secara manual: `https://tentotenphotobox.biz.id`.
3. Jika menggunakan verifikasi meta tag manual, salin kodenya ke `.env` pada variabel `BING_SITE_VERIFICATION="<KODE_BING>"`, kemudian build & deploy ulang.
4. Masuk ke menu **Sitemaps** pada Bing Webmaster Tools.
5. Masukkan URL sitemap: `https://tentotenphotobox.biz.id/sitemap.xml` dan klik **Submit**.
6. Status pemrosesan akan terverifikasi secara berkala.

### C. IndexNow (Instant Indexing untuk Bing & Yandex)
Untuk mempercepat proses crawling perubahan halaman, jalankan skrip IndexNow dengan menyediakan API key:
```bash
INDEXNOW_KEY="<KUNCI_INDEXNOW_ANDA>" npm run indexnow
```
Skrip ini akan secara otomatis menempatkan file verifikasi `<INDEXNOW_KEY>.txt` di `dist/` dan mengirimkan seluruh 11 URL ke endpoint `https://api.indexnow.org/indexnow`.

---

## 7. Security Headers & Kebijakan CSP (Content Security Policy)

Website dilengkapi dengan middleware `src/server/securityHeaders.ts` yang aktif pada mode produksi (`NODE_ENV=production`) tanpa ketergantungan library eksternal (zero-dependency).

### A. Rincian Header Keamanan
- **Content-Security-Policy**:
  `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://*.googleusercontent.com; frame-src https://www.google.com https://maps.google.com https://www.tiktok.com; connect-src 'self'; media-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests`
- **Strict-Transport-Security**: `max-age=31536000; includeSubDomains` (dikirimkan hanya saat koneksi aman / `req.secure` via `trust proxy 1`).
- **X-Content-Type-Options**: `nosniff`.
- **X-Frame-Options**: `DENY`.
- **Referrer-Policy**: `strict-origin-when-cross-origin`.
- **Permissions-Policy**: `camera=(), microphone=(), geolocation=(), payment=(), usb=()`.
- **Cross-Origin-Opener-Policy**: `same-origin`.
- **Cross-Origin-Resource-Policy**: `same-site`.
- **Cache-Control**:
  - `/assets/*` = `public, max-age=31536000, immutable`
  - Dokumen HTML = `no-cache`
  - Halaman 404 = `no-cache, no-store, must-revalidate`
- **X-Powered-By**: Dihapus secara eksplisit (`app.disable('x-powered-by')` dan `res.removeHeader`).
- **Cross-Origin-Embedder-Policy (COEP)**: Sengaja tidak dipasang agar embed peta interaktif Google Maps dan iframe TikTok dapat berjalan lancar.

### B. Cara Menguji Mode Report-Only
Sebelum menerapkan pemblokiran penuh di lingkungan baru, Anda dapat mengaktifkan mode pemantauan tanpa pemblokiran aset:
1. Set variabel lingkungan di file `.env` atau terminal:
   ```bash
   CSP_REPORT_ONLY="true"
   ```
2. Jalankan server produksi:
   ```bash
   NODE_ENV=production npm start
   ```
3. Header yang dikirimkan server akan berubah menjadi `Content-Security-Policy-Report-Only`. Pelanggaran (jika ada) hanya akan dicatat di console browser tanpa memblokir aset.

### C. Cara Beralih ke Mode Penuh (Enforcement)
1. Matikan atau hapus variabel `CSP_REPORT_ONLY` (atau set ke `"false"`):
   ```bash
   CSP_REPORT_ONLY="false"
   ```
2. Jalankan kembali server produksi:
   ```bash
   NODE_ENV=production npm start
   ```
3. Header `Content-Security-Policy` aktif memblokir sumber daya yang tidak diizinkan sesuai whitelist.

### D. Menjalankan Verifikasi Header Otomatis
Jalankan skrip pengujian terisolasi untuk memastikan kepatuhan header:
```bash
npm run check:headers
```
Skrip ini akan memvalidasi header pada `/`, `/sitemap.xml`, `/robots.txt`, `/404`, serta pengujian toggle Report-Only.

---

## 8. Embed TikTok & Kebijakan Zero-PII

Penyematan video kreator TikTok menggunakan pendekatan terarah untuk menyeimbangkan kebutuhan multimedia dengan standar privasi ketat (Zero-PII) dan performa:

1. **Dampak Pihak Ketiga (*Third-Party*)**:
   - Memuat konten dari `https://www.tiktok.com/embed/v2/{videoId}` memperkenalkan interaksi pihak ketiga ke dalam browser pengguna.
   - Di dalam lingkungan iframe tersebut, domain TikTok dapat mengeksekusi aset internal dan menyetel cookie pelacak sesi milik platform TikTok.
2. **Mitigasi Pola "Klik untuk Memuat" (*Click-to-Load Facade*)**:
   - Website **tidak memuat** iframe secara otomatis saat halaman dibuka.
   - Sebelum interaksi pengguna, kartu hanya menampilkan poster statis murni CSS 9:16 dan tombol putar lokal tanpa lalu lintas jaringan ke TikTok sama sekali.
   - Permintaan HTTP ke server TikTok baru diinisiasi jika pengguna secara sadar mengklik poster kartu.
3. **Tanpa Library Eksternal (*Zero External Script*)**:
   - Skrip `embed.js` resmi TikTok sengaja **tidak dipasang**, sehingga direktif CSP `script-src 'self'` tetap terjaga ketat tanpa eksekusi JavaScript pihak ketiga di level aplikasi host.
   - Domain `https://www.tiktok.com` hanya diizinkan secara eksklusif pada direktif `frame-src`.
4. **Cadangan Aksesibilitas & Non-JS**:
   - Setiap kartu selalu menyertakan tautan langsung `<a href={url} target="_blank" rel="noopener noreferrer nofollow sponsored">` sebagai alternatif tanpa JavaScript atau bagi pengguna yang memilih membuka aplikasi TikTok secara langsung.
