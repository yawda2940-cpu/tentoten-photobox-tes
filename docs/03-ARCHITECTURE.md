# System Architecture & Technical Specifications — TentoTen Photobox

## 1. Fondasi Teknologi & Runtime

Aplikasi ini dibangun menggunakan arsitektur modern full-stack TypeScript dengan konfigurasi:

- **Frontend Core**: React 19 (`react` & `react-dom` v19.0.1)
- **Language**: TypeScript 5.8+ (Strict Type Checking)
- **Build Tool & Bundler**: Vite 6+ (`@vitejs/plugin-react`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) via `@import "tailwindcss";`
- **Server Runtime**: Express 4.21+ dijalankan melalui Node.js / `tsx` (TypeScript Execute)
- **Static Generation Engine**: Custom React SSR Prerenderer (`react-dom/server`)

---

## 2. Arsitektur Prerender Statis (Jalur 2 SSG)

Untuk memenuhi standar bot mesin pencari Google dan Bing (yang tidak selalu mengeksekusi skrip JavaScript client-side), aplikasi menerapkan strategi **Jalur 2: Static Site Generation (SSG)** pada saat kompilasi build:

```
[Kompilasi Sumber Daya]
      │
      ▼
1. Vite Build (Client Assets) ───────► Output: dist/assets/ (JS, CSS ter-bundle)
      │
      ▼
2. Prerenderer (scripts/prerender.tsx)
      │
      ├─► Memuat dist/index.html sebagai template dasar
      ├─► Iterasi 12 rute halaman (11 rute terindeks + 1 rute 404)
      ├─► Eksekusi renderToString(<App initialPath={route} />)
      ├─► Injeksi tag <head> (Title, Meta Description, Canonical, OG, Twitter, JSON-LD)
      └─► Menghasilkan file index.html statis per direktori rute
      │
      ▼
3. SEO Audit Automation (scripts/seo-audit.mjs)
      │
      └─► Memeriksa integritas HTML, H1 tunggal, alt/dimensi gambar, dan validitas JSON-LD
```

### Struktur File Keluaran Prerender (`dist/`):
Setiap rute memiliki berkas `index.html` fisik tersendiri:
```
dist/
├── index.html                 -> Menangani rute "/"
├── 404.html                   -> Menangani rute "/404" (HTTP 404 murni)
├── product/
│   └── index.html             -> Menangani rute "/product"
├── service/
│   └── index.html             -> Menangani rute "/service"
├── location/
│   ├── index.html             -> Menangani rute "/location"
│   ├── madiun/
│   │   └── index.html         -> Menangani rute "/location/madiun"
│   ├── jombang/
│   │   └── index.html         -> Menangani rute "/location/jombang"
│   ├── ponorogo/
│   │   └── index.html         -> Menangani rute "/location/ponorogo"
│   └── kertosono/
│       └── index.html         -> Menangani rute "/location/kertosono"
├── kemitraan/
│   └── index.html             -> Menangani rute "/kemitraan"
├── contact/
│   └── index.html             -> Menangani rute "/contact"
└── kebijakan-privasi/
    └── index.html             -> Menangani rute "/kebijakan-privasi"
```

---

## 3. Sistem Routing & Navigasi Bersih (Clean URLs)

Situs tidak menggunakan hash routing (`/#/`) ataupun navigasi berbasis `onClick` pada elemen `<div>`.
- **Navigasi HTML Asli**: Semua tautan menggunakan elemen `<a href="...">` standar sehingga crawler mesin pencari dapat menelusuri seluruh hierarki situs secara alami.
- **Client-Side Navigation Enhancer**: Saat JavaScript aktif di peramban, event click pada tautan internal diintersepsi secara halus menggunakan History API (`window.history.pushState`) untuk transisi instan tanpa *full page reload*.
- **Initial Path Hydration**: Komponen root `App.tsx` menerima prop `initialPath` saat prerendering dan memanfaatkan `window.location.pathname` saat dijalankan di browser.

---

## 4. Lapisan Server (`server.ts`) & Penanganan HTTP 404 Murni

Server Express (`server.ts`) dikonfigurasi untuk menangani dua lingkungan operasi:

### Mode Pengembangan (Development)
Mengintegrasikan `vite.middlewares` sehingga pengembang menikmati kecepatan Vite dev server dengan kompilasi on-demand.

### Mode Produksi (Production)
Melayani aset dari folder `dist/` dengan aturan ketat:
1. **Pemeriksaan Berkas Statis**: Jika rute cocok dengan berkas fisik (misalnya `/location/madiun/index.html`), server menyajikan berkas tersebut dengan status `200 OK`.
2. **Pemberantasan Soft-404**: Jika URL yang diminta tidak terdaftar dalam rute yang valid, server **TIDAK** mengalihkan ke `index.html` (kebiasaan buruk SPA konvensional yang menghasilkan *soft-404*), melainkan menyajikan berkas `dist/404.html` dengan kode status HTTP `404 Not Found` resmi dan header `X-Robots-Tag: noindex, nofollow`.

---

## 5. Arsitektur Gambar & Optimasi Core Web Vitals

Untuk mencapai skor performa sempurna pada Google PageSpeed dan Bing Webmaster:

### A. Format Gambar WebP Native
Gambar bilik foto dan kafe yang dihosting di Google UserContent mendukung transformasi WebP secara dinamis melalui parameter query `=rw`. Seluruh gambar dibungkus menggunakan tag `<picture>`:
```html
<picture>
  <source type="image/webp" srcset="https://lh3.googleusercontent.com/...=rw" />
  <img src="https://lh3.googleusercontent.com/..." 
       alt="Deskripsi deskriptif foto bilik TentoTen" 
       width="600" height="450" 
       loading="lazy" fetchpriority="low" decoding="async" />
</picture>
```

### B. Optimasi LCP & CLS
1. **LCP Hero Image**: Gambar pertama pada viewport utama diberi atribut `fetchpriority="high"`, `loading="eager"`, dan `decoding="async"` agar langsung diunduh pada prioritas tertinggi jaringan browser.
2. **Zero Layout Shifts (CLS = 0)**: Setiap tag `<img>` wajib memiliki atribut numerik `width` dan `height` eksplisit untuk mengunci rasio aspek ruang sebelum gambar selesai dimuat.
