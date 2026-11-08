# Dokumentasi Lengkap Website TentoTen Photobox

Selamat datang di repositori dokumentasi teknis dan arsitektur produk **TentoTen Photobox** (`https://tentotenphotobox.biz.id`). Dokumen ini disusun untuk memberikan pemahaman menyeluruh mengenai visi produk, sistem desain visual, arsitektur perangkat lunak, struktur data terindeks (Schema.org), serta pedoman operasional dan SEO.

---

## Daftar Berkas Dokumentasi

Dokumentasi dibagi menjadi 5 bagian utama yang terstruktur secara modular:

| No | Dokumen | Berkas | Deskripsi Singkat |
|:---|:---|:---|:---|
| 1 | **Product Requirements Document (PRD)** | [`01-PRD.md`](./01-PRD.md) | Visi produk, tujuan bisnis, persona audiens, fitur utama, model harga transparan, dan alur konversi WhatsApp. |
| 2 | **Design System & Visual Guidelines** | [`02-DESIGN.md`](./02-DESIGN.md) | Filosofi estetika retro-analog 35mm, palet warna, tipografi, grid, komponen neo-brutalist, dan aset grafis. |
| 3 | **System Architecture & Technical Specs** | [`03-ARCHITECTURE.md`](./03-ARCHITECTURE.md) | Fondasi teknologi (React 19, Vite, Express), arsitektur prerender SSG (Jalur 2), Core Web Vitals, dan strategi WebP. |
| 4 | **Schema.org Structured Data & SEO** | [`04-SCHEMA.md`](./04-SCHEMA.md) | Spesifikasi lengkap JSON-LD (Organization, LocalBusiness, Service, OfferCatalog, Breadcrumb) dan strategi crawler Google/Bing. |
| 5 | **Rules & Quality Standards** | [`05-RULES.md`](./05-RULES.md) | Batasan konten, kata terlarang (*anti-slop*), uji tanpa JavaScript, standar H1 unik, dan mekanisme validasi `seo-audit.mjs`. |

---

## Ringkasan Eksekutif Platform

- **Nama Brand**: TentoTen Photobox (@10to10.photobox)
- **Kategori**: Photobox Analog 35mm Otomatis di Dalam Kafe
- **Jangkauan Wilayah**: Jawa Timur (Kota Madiun, Kab. Jombang, Kab. Ponorogo, Kab. Nganjuk/Kertosono)
- **Model Penjualan**: Walk-in di lokasi kafe (tanpa booking aplikasi) & konsultasi WhatsApp untuk Custom Frame dan Kemitraan.
- **Harga Resmi**:
  - **Sesi Photobox**: Rp35.000 / sesi (2 lembar cetak fisik + unduhan digital softfile JPG & animasi GIF via scan QR)
  - **Custom Frame**: Rp60.000 (desain dibuat sendiri oleh pelanggan, disiapkan admin ke mesin photobox)
- **Keunggulan Teknis**:
  - 100% pre-rendered HTML statis untuk seluruh rute terindeks.
  - Skor performa Core Web Vitals optimal dengan format gambar WebP dan atribut `fetchpriority`.
  - HTTP 404 murni (bukan soft-404 SPA fallback).
