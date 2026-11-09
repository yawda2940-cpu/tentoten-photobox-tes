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

## 2. Struktur Rute & Sitemap Index (WordPress / Yoast Style)

Daftar rute tunggal didefinisikan secara terpusat di `src/routes.ts` dengan klasifikasi `type` dan `indexable`:

### A. Rincian Tipe Rute
1. **Tipe `page` (7 URL)**:
   - `/` — Beranda
   - `/product` — Harga Sesi Photobox & Custom Frame
   - `/service` — Panduan Alur Layanan Booth
   - `/location` — Indeks Semua Cabang Kafe
   - `/kemitraan` — Kemitraan Kafe & Pengadaan Booth
   - `/contact` — Pusat Bantuan & Kontak WhatsApp
   - `/kebijakan-privasi` — Kebijakan Privasi
2. **Tipe `location` (4 URL)**:
   - `/location/madiun` — Sthana Coffee Madiun
   - `/location/jombang` — Ethereal Coffee Jombang
   - `/location/ponorogo` — Komahaus Coffee Ponorogo
   - `/location/kertosono` — Keyf Coffee Kertosono (Nganjuk)
3. **Tipe `post` (0 URL saat ini)**:
   - Khusus artikel/konten dinamis masa depan. File `post-sitemap.xml` **tidak akan dibuat** dan tidak dicantumkan di index bila belum ada rute bertipe ini.
4. **Non-Indexable (`indexable: false`)**:
   - `/404` — Halaman kesalahan dengan HTTP 404 murni dan `noindex, nofollow` (tidak dicantumkan di sitemap).

### B. Output Sitemap di `dist/`
- **`sitemap_index.xml`**: Root `<sitemapindex>` yang mereferensikan semua sitemap anak aktif (`page-sitemap.xml`, `location-sitemap.xml`) lengkap dengan `<lastmod>` YYYY-MM-DD.
- **`page-sitemap.xml`**: Root `<urlset>` berisi 7 URL bertipe `page`.
- **`location-sitemap.xml`**: Root `<urlset>` berisi 4 URL bertipe `location`.
- **`post-sitemap.xml`**: HANYA dibuat otomatis ketika ada rute bertipe `post`.
- **Legacy `sitemap.xml`**: Mengembalikan redirect 301 ke `/sitemap_index.xml` (tidak menyajikan isi sitemap terpisah).

### C. Cara Menambah Rute Bertipe "post" di Masa Depan
Untuk mempublikasikan artikel atau post baru, cukup daftarkan rute ke dalam array `ROUTES` di `src/routes.ts`:
```typescript
{ path: '/blog/judul-artikel', indexable: true, type: 'post' },
```
Saat menjalankan `npm run build`:
1. Skrip SSG secara otomatis mengelompokkan rute dan menulis `dist/post-sitemap.xml`.
2. `dist/sitemap_index.xml` secara otomatis menambahkan entri `<sitemap><loc>https://tentotenphotobox.biz.id/post-sitemap.xml</loc><lastmod>YYYY-MM-DD</lastmod></sitemap>`.
3. Server Express di `server.ts` langsung melayani endpoint `/post-sitemap.xml` dengan status 200 dan header `application/xml`.
4. Audit SEO otomatis memvalidasi keberadaan file serta kecocokan canonical tanpa perlu konfigurasi manual tambahan.

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
2. `tsx scripts/prerender.tsx` — Menghasilkan HTML statis untuk 11 rute terindeks + `404.html`, serta membuat `dist/sitemap_index.xml`, `dist/page-sitemap.xml`, `dist/location-sitemap.xml`, dan `dist/robots.txt`.
3. `node scripts/seo-audit.mjs` — Menguji 100% kepatuhan SEO (validitas sitemap index, ketiadaan sitemap anak kosong/tak terdaftar, tepat 11 URL tanpa duplikat, kecocokan persis canonical, ketiadaan halaman yatim, validitas JSON-LD, keunikan metadata, dan ketiadaan residu domain lama).

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

# 3. Uji respons sitemap index (wajib 200 OK + application/xml)
curl -I http://localhost:3000/sitemap_index.xml

# 4. Uji respons child sitemaps (wajib 200 OK + application/xml)
curl -I http://localhost:3000/page-sitemap.xml
curl -I http://localhost:3000/location-sitemap.xml

# 5. Uji respons redirect sitemap lama (wajib 301 Moved Permanently ke /sitemap_index.xml)
curl -I http://localhost:3000/sitemap.xml

# 6. Uji respons header robots.txt (wajib 200 OK + text/plain)
curl -I http://localhost:3000/robots.txt

# 7. Uji respons URL tidak dikenal (wajib 404 Not Found + X-Robots-Tag: noindex, nofollow)
curl -I http://localhost:3000/tidak-ada

# 8. Pastikan tidak ada residu domain lama di seluruh berkas dist
grep -r "tentoten.id" dist/
```

### Hasil yang Diharapkan:
- `curl -I /sitemap_index.xml` menghasilkan `HTTP/1.1 200 OK` dan `content-type: application/xml; charset=utf-8`.
- `curl -I /page-sitemap.xml` menghasilkan `HTTP/1.1 200 OK` dan `content-type: application/xml; charset=utf-8`.
- `curl -I /location-sitemap.xml` menghasilkan `HTTP/1.1 200 OK` dan `content-type: application/xml; charset=utf-8`.
- `curl -I /sitemap.xml` menghasilkan `HTTP/1.1 301 Moved Permanently` dan header `location: /sitemap_index.xml`.
- `curl -I /robots.txt` menghasilkan `HTTP/1.1 200 OK` dan `content-type: text/plain; charset=utf-8` dengan baris `Sitemap: https://tentotenphotobox.biz.id/sitemap_index.xml`.
- `curl -I /tidak-ada` menghasilkan `HTTP/1.1 404 Not Found` dan header `x-robots-tag: noindex, nofollow`.
- `grep -r "tentoten.id" dist/` menghasilkan output kosong (exit code 1).

---

## 5. Konfigurasi Redirect 301 & Proxy Hosting

Pada `server.ts` dan `vercel.json`, aturan pengalihan telah disiapkan secara terintegrasi:
1. **Redirect Sitemap Lama**: Permintaan ke `/sitemap.xml` dialihkan permanen (HTTP 301) ke `/sitemap_index.xml` via middleware Express di `server.ts` dan konfigurasi `redirects` di `vercel.json`.
2. **Redirect WWW ke Non-WWW**: Setiap akses ke `www.tentotenphotobox.biz.id` dialihkan dengan status HTTP 301 permanen ke `https://tentotenphotobox.biz.id`.
3. **Redirect HTTP ke HTTPS**: Akses protokol tidak aman di belakang reverse proxy (seperti Cloud Run, Nginx, Cloudflare, atau AWS ALB melalui header `x-forwarded-proto`) dialihkan ke `https://`.
4. **Trailing Slash Canonical**: URL berakhiran garis miring (misal `/product/`) dialihkan otomatis ke versi bersih (`/product`).

---

## 6. Langkah Submit ke Google Search Console & Bing Webmaster Tools

Hanya perlu mengirimkan satu URL sitemap index utama (`sitemap_index.xml`). Mesin pencari akan otomatis mem-parsing indeks dan mengindeks seluruh URL di sitemap anak (`page-sitemap.xml` dan `location-sitemap.xml`).

### A. Google Search Console (GSC)
1. Buka [Google Search Console](https://search.google.com/search-console).
2. Tambahkan properti baru dengan metode **URL prefix**: `https://tentotenphotobox.biz.id`.
3. Verifikasi kepemilikan menggunakan metode **HTML tag**. Salin kode verifikasi pada atribut `content`, lalu masukkan ke file `.env` pada variabel `GOOGLE_SITE_VERIFICATION="<KODE_GOOGLE>"`.
4. Jalankan `npm run build` kembali dan deploy.
5. Klik **Verify** pada Google Search Console.
6. Masuk ke menu **Sitemaps** pada panel navigasi kiri.
7. Masukkan URL sitemap index: `sitemap_index.xml` (lengkapnya: `https://tentotenphotobox.biz.id/sitemap_index.xml`), lalu klik **Submit**.
8. Pastikan status menunjukkan **Success**. Google akan otomatis membaca sub-sitemap `page-sitemap.xml` (7 URL) dan `location-sitemap.xml` (4 URL) dengan total 11 URL terindeks.

### B. Bing Webmaster Tools
1. Buka [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Anda dapat mengimpor langsung properti yang telah terverifikasi dari Google Search Console, atau menambahkan URL secara manual: `https://tentotenphotobox.biz.id`.
3. Jika menggunakan verifikasi meta tag manual, salin kodenya ke `.env` pada variabel `BING_SITE_VERIFICATION="<KODE_BING>"`, kemudian build & deploy ulang.
4. Masuk ke menu **Sitemaps** pada Bing Webmaster Tools.
5. Masukkan URL sitemap index: `https://tentotenphotobox.biz.id/sitemap_index.xml` dan klik **Submit**.
6. Status pemrosesan akan terverifikasi secara berkala untuk seluruh sub-sitemap.

### C. IndexNow (Instant Indexing untuk Bing & Yandex)
Untuk mempercepat proses crawling perubahan halaman, jalankan skrip IndexNow dengan menyediakan API key:
```bash
INDEXNOW_KEY="<KUNCI_INDEXNOW_ANDA>" npm run indexnow
```
Skrip ini akan secara otomatis menempatkan file verifikasi `<INDEXNOW_KEY>.txt` di `dist/` dan mengirimkan seluruh 11 URL ke endpoint `https://api.indexnow.org/indexnow`.

---

## 7. Security Headers & Kebijakan CSP (Content Security Policy)

Website dilengkapi dengan konfigurasi keamanan terpusat di `src/server/securityHeaderList.ts` yang menjadi sumber tunggal kebenaran (*single source of truth*) untuk Express (`src/server/securityHeaders.ts`) dan deployment statis Vercel (`vercel.json` dihasilkan otomatis via `scripts/generate-vercel-headers.ts`). Implementasi ini murni native tanpa ketergantungan library eksternal (zero-dependency).

### A. Rincian Header Keamanan
- **Content-Security-Policy**:
  `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://*.googleusercontent.com; frame-src https://www.google.com https://maps.google.com https://www.tiktok.com; connect-src 'self'; media-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests`
  *(Bebas dari `'unsafe-eval'` dan wildcard `*` pada direktif script/default).*
- **Strict-Transport-Security**: `max-age=31536000; includeSubDomains` (dikirimkan saat koneksi aman HTTPS di Vercel Edge / via trust proxy Express).
- **X-Content-Type-Options**: `nosniff`.
- **X-Frame-Options**: `DENY`.
- **Referrer-Policy**: `strict-origin-when-cross-origin`.
- **Permissions-Policy**: `camera=(), microphone=(), geolocation=(), payment=(), usb=()`.
- **Cross-Origin-Opener-Policy**: `same-origin`.
- **Cross-Origin-Resource-Policy**: `same-site`.
- **Cache-Control**:
  - `/assets/*` = `public, max-age=31536000, immutable`
  - Dokumen HTML = `public, max-age=0, must-revalidate` (Vercel) / `no-cache` (Express)
  - Halaman 404 = `no-cache, no-store, must-revalidate`
- **X-Powered-By**: Dihapus secara eksplisit (`app.disable('x-powered-by')` dan `res.removeHeader`).
- **Cross-Origin-Embedder-Policy (COEP)**: Sengaja tidak dipasang agar embed peta interaktif Google Maps dan iframe TikTok dapat berjalan lancar.

### B. Mode Default Report-Only & Pengujian
Secara default, kebijakan CSP berjalan dalam mode Report-Only (`Content-Security-Policy-Report-Only`) agar pemantauan console browser berjalan aman tanpa memblokir aset yang sah (`CSP_REPORT_ONLY !== 'false'`).

### C. Cara Beralih ke Mode Penuh (Enforcement)
1. Set variabel lingkungan di file `.env` atau environment Vercel:
   ```bash
   CSP_REPORT_ONLY="false"
   ```
2. Jalankan build produksi:
   ```bash
   npm run build
   ```
3. Header `Content-Security-Policy` aktif memblokir sumber daya yang tidak diizinkan sesuai whitelist.

### D. Menjalankan Verifikasi Header Otomatis
Jalankan skrip pengujian terisolasi untuk memastikan kepatuhan header:
```bash
npm run check:headers
```
Skrip ini akan memvalidasi header pada `vercel.json` (Phase 0), server Express mode Full Enforcement (Phase 1), dan toggle Report-Only (Phase 2).

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
