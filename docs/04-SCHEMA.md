# Schema.org Structured Data & SEO Engine — TentoTen Photobox

## 1. Ikhtisar Mesin SEO & Data Terstruktur

Situs TentoTen Photobox mengimplementasikan strategi SEO mutakhir (*advanced SEO*) yang menggabungkan metadata komprehensif, tag media sosial OpenGraph/Twitter, dan **Schema.org Structured Data (JSON-LD)** yang divalidasi ketat oleh Google Rich Results Test dan Schema Validator.

Data terstruktur diinjeksikan secara statis saat proses SSG di dalam tag `<head>` dan komponen halaman, memungkinkan mesin pencari memahami entitas bisnis, relasi cabang, katalog harga, dan hierarki navigasi tanpa keraguan.

---

## 2. Struktur Schema Global

### A. Schema Organisasi (`Organization`)
Diterapkan pada seluruh halaman untuk memperkuat identitas brand (*Brand Entity Graph*):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TentoTen Photobox",
  "url": "https://tentotenphotobox.biz.id",
  "logo": "https://tentotenphotobox.biz.id/assets/aistudio/tentotenred_2ac7af73.svg",
  "sameAs": [
    "https://instagram.com/10to10.photobox",
    "https://tiktok.com/@tentoten"
  ]
}
```

### B. Schema Situs Web (`WebSite`)
Diterapkan pada halaman Beranda (`/`) untuk mendefinisikan entitas situs utama.

---

## 3. Schema Bisnis Lokal Cabang (`LocalBusiness`)

Diterapkan pada masing-masing dari 4 rute detail lokasi (`/location/madiun`, `/location/jombang`, `/location/ponorogo`, `/location/kertosono`). Schema ini menghubungkan mesin bilik foto dengan kafe fisik tuan rumah:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TentoTen Photobox @ Sthana Coffee",
  "url": "https://tentotenphotobox.biz.id/location/madiun",
  "parentOrganization": {
    "@type": "Organization",
    "name": "TentoTen Photobox",
    "url": "https://tentotenphotobox.biz.id"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Setiaki No. 27, Kota Madiun, Jawa Timur",
    "addressLocality": "Kota Madiun",
    "addressRegion": "Jawa Timur",
    "addressCountry": "ID"
  },
  "openingHours": ["Mo-Su 08:00-24:00"],
  "hasMap": "https://maps.google.com/?q=Sthana+Coffee+Madiun"
}
```

---

## 4. Schema Layanan Spesifik & Penawaran (`Service` & `Offer`)

Diimplementasikan langsung pada halaman Produk (`/product`) dan Layanan (`/service`) untuk memberikan sinyal harga transparan kepada algoritma Google Shopping & Search.

### Layanan 1: Sesi Photobox Reguler (Walk-In)
- **`@type`**: `Service`
- **`@id`**: `https://tentotenphotobox.biz.id/product#sesi-photobox`
- **`name`**: "Sesi Photobox TentoTen (Walk-In Kafe)"
- **`serviceType`**: "Photobox Session"
- **`offers`**:
  - Harga: `35000`
  - Mata Uang: `IDR`
  - Ketersediaan: `https://schema.org/InStock`
- **`serviceOutput`**: "2 lembar cetak fisik foto strip 4 pose gaya 35mm tebal dan softfile digital JPG/GIF via scan QR code"
- **`areaServed`**: Kota Madiun, Kabupaten Jombang, Kabupaten Ponorogo, Kabupaten Nganjuk.
- **`hasOfferCatalog`**: Memuat daftar katalog 11 frame bawaan (`Roll of Memories 35mm`, `Theater Ticket Vintage`, `Kachi! Say Cheese`, `Always Fresh Supermarket`, `Parajompo`, `Retro Blister`, `Digital Bliss Y2K`, `Rating 10/10 Picnic Gingham`, `Memoria Minimalist B&W`, `Avenoir Editorial Cream`, `I Wish a Rose Pastel`) lengkap dengan gambar dan deskripsi artistik.

### Layanan 2: Custom Frame Desain Pelanggan
- **`@type`**: `Service`
- **`@id`**: `https://tentotenphotobox.biz.id/product#custom-frame`
- **`name`**: "Custom Frame TentoTen Photobox"
- **`serviceType`**: "Custom Photo Frame Design & Integration"
- **`offers`**:
  - Harga: `60000`
  - Mata Uang: `IDR`
  - Ketersediaan: `https://schema.org/InStock`
- **`serviceOutput`**: "Pemasangan file frame digital kustom pada perangkat bilik foto TentoTen cabang kafe yang dipilih"
- **`termsOfService`**: `https://tentotenphotobox.biz.id/kebijakan-privasi`

---

## 5. Schema Remah Roti Navigasi (`BreadcrumbList`)

Seluruh subhalaman memiliki skema remah roti navigasi berurutan dengan URL absolut dan posisi ListItem terurut:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Beranda",
      "item": "https://tentotenphotobox.biz.id"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Produk & Harga",
      "item": "https://tentotenphotobox.biz.id/product"
    }
  ]
}
```

---

## 6. Metadata Halaman, Canonical, & Social Cards

Setiap halaman memiliki pasangan metadata unik tanpa duplikasi:

1. **Title Tag**: Panjang 30–60 karakter, diawali topik spesifik halaman dan diakhiri pengenal brand (misalnya: `Harga Photobox dan Custom Frame | TentoTen Photobox`).
2. **Meta Description**: Panjang 120–160 karakter dengan kalimat informatif yang memuat harga dan lokasi kafe.
3. **Canonical Link Absolut**: Menggunakan format URL kanonikal mutlak (contoh: `<link rel="canonical" href="https://tentotenphotobox.biz.id/location/madiun" />`).
4. **OpenGraph & Twitter Cards**:
   - `og:type`: `website`
   - `og:locale`: `id_ID`
   - `og:site_name`: `TentoTen Photobox`
   - `og:image` & `twitter:image`: Mengarah ke banner visual 1200x630px (`/og-image.jpg`).
   - `twitter:card`: `summary_large_image`.

---

## 7. Verifikasi Search Console (Google & Bing)

Sistem siap menerima kode verifikasi kepemilikan situs tanpa perlu mengubah kode sumber aplikasi. Parameter diambil dari environment variables:
- `GOOGLE_SITE_VERIFICATION` / `VITE_GOOGLE_SITE_VERIFICATION` -> menghasilkan tag `<meta name="google-site-verification" content="..." />`.
- `BING_SITE_VERIFICATION` / `VITE_BING_SITE_VERIFICATION` -> menghasilkan tag `<meta name="msvalidate.01" content="..." />`.
