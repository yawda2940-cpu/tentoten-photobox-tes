# Product Requirements Document (PRD) — TentoTen Photobox

## 1. Ringkasan Eksekutif & Visi Produk

**TentoTen Photobox** adalah jaringan bilik foto (*photobox*) otomatis bernuansa analog 35mm yang ditempatkan secara terintegrasi di dalam kafe-kafe populer di wilayah Jawa Timur (saat ini aktif di Kota Madiun, Kabupaten Jombang, Kabupaten Ponorogo, dan Kecamatan Kertosono/Nganjuk).

Situs web `tentotenphotobox.biz.id` dirancang bukan sebagai portal e-commerce transaksional yang rumit, melainkan sebagai **pusat informasi resmi, panduan lokasi, katalog frame interaktif, dan kanal konversi langsung ke WhatsApp**. Visi produk ini adalah memberikan pengalaman informatif yang jujur, transparan, cepat, dan mudah diakses tanpa memerlukan pendaftaran akun, aplikasi khusus, atau proses booking online yang merepotkan.

---

## 2. Problem Statement & Nilai Tambah (Value Proposition)

### Masalah yang Dihadapi Pengguna:
1. **Photobox konvensional di mall sering membutuhkan antrean panjang**, pemesanan jam tertentu, atau instalasi aplikasi pihak ketiga.
2. **Ketidakjelasan harga**: Banyak studio foto photobox mengenakan biaya cetak tambahan, biaya softfile terpisah, atau paket bertingkat yang membingungkan.
3. **Ketiadaan momen spontan**: Orang yang berkumpul atau nongkrong di kafe sering kehilangan kesempatan mengabadikan momen cetak fisik secara langsung di lokasi tempat mereka bersantai.

### Solusi TentoTen:
1. **Konsep Walk-in di Kafe**: Photobox berada di dalam kafe tempat anak muda dan keluarga berkumpul. Pengunjung bisa ngopi, memesan makanan, lalu foto kapan saja selama jam operasional kafe tanpa perlu booking.
2. **Transparansi Harga Tanpa Trik**:
   - **Sesi Reguler: Rp35.000 per sesi**. Termasuk 2 lembar cetak fisik foto strip 4 pose dan unduhan file digital JPG/GIF melalui QR code.
   - **Custom Frame: Rp60.000**. Pengunjung mendesain frame sendiri untuk acara ulang tahun, anniversary, atau komunitas, lalu admin TentoTen memasangkannya ke booth tujuan.
3. **Pembayaran Langsung di Lokasi**: Menggunakan sensor QRIS otomatis di mesin tanpa transaksi kartu atau uang tunai repot.

---

## 3. Profil Pengguna (Target Persona)

| Persona | Profil & Kebutuhan | Perilaku Penggunaan Situs |
|:---|:---|:---|
| **Pasangan Muda & Sahabat Nongkrong** | Usia 16–28 tahun, sering ngopi sore/malam di kafe Madiun, Jombang, Ponorogo, atau Kertosono. | Mencari info jam buka kafe, alamat rute Google Maps, serta katalog inspirasi template frame sebelum foto. |
| **Penyelenggara Acara / Komunitas** | Panitia ulang tahun, komunitas motor/kopi, perkumpulan kampus yang ingin kenang-kenangan bertema. | Mengakses panduan Custom Frame (Rp60.000), membaca spesifikasi ukuran frame, dan mengisi form order WhatsApp ke admin. |
| **Pemilik Kafe / Pebisnis Ruang Usaha** | Pemilik coffee shop atau tempat berkumpul di kota-kota Jawa Timur yang ingin meningkatkan *foot traffic* dan *dwell time* pengunjung. | Membaca syarat kemitraan penempatan booth, membandingkan opsi kemitraan vs pengadaan mandiri, lalu mengajukan diskusi via form kemitraan. |

---

## 4. Struktur Halaman & Cakupan Rute

Situs web memiliki tepat 11 URL terindeks dan 1 URL penanganan error 404:

```
/
├── /product               (Harga, Sesi Rp35rb, Custom Frame Rp60rb, 11 Katalog Frame)
├── /service               (Alur Operasional Booth, Panduan Walk-in, Video Kreator)
├── /location              (Indeks 4 Lokasi Kafe dengan Peta & Filter Interaktif)
│   ├── /location/madiun      (Sthana Coffee, Jl. Setiaki No. 27, Madiun)
│   ├── /location/jombang     (Ethereal Coffee, Jl. Kusuma Bangsa No. 23, Jombang)
│   ├── /location/ponorogo    (Komahaus Coffee, Jl. Semeru No. 52, Ponorogo)
│   └── /location/kertosono   (Keyf Coffee, Jl. Apel Gg. I, Kertosono, Nganjuk)
├── /kemitraan             (Jalur Penempatan Booth & Jalur Pengadaan Mandiri)
├── /contact               (Kanal WhatsApp Admin, Instagram, TikTok, Jam Operasional)
├── /kebijakan-privasi     (Penyimpanan Foto, Hak Cipta, Masa Unduhan QR Code)
└── /404                   (Halaman HTTP 404 Murni dengan Header Noindex)
```

---

## 5. Fitur Fungsional Utama

### A. Katalog Template Frame Interaktif (`/product`)
- Menampilkan 11 template frame bawaan TentoTen:
  1. *Roll of Memories 35mm* (Vintage Film)
  2. *Theater Ticket Vintage* (Vintage Film)
  3. *Kachi! Say Cheese* (Retro & Pop Art)
  4. *Always Fresh Supermarket* (Retro & Pop Art)
  5. *Parajompo: 4 Tablet Obat Capek Hidup* (Retro & Pop Art)
  6. *Retro Blister Photo Pack* (Retro & Pop Art)
  7. *Digital Bliss Y2K* (Y2K & Cute)
  8. *Rating 10/10 Picnic Gingham* (Y2K & Cute)
  9. *Memoria Minimalist B&W* (Aesthetic Editorial)
  10. *Avenoir Editorial Cream* (Aesthetic Editorial)
  11. *I Wish a Rose Pastel* (Aesthetic Editorial)
- Filter kategori dinamis: *All*, *Vintage Film*, *Retro & Pop*, *Y2K & Cute*, *Aesthetic Editorial*.
- Modal preview detail frame: Menampilkan pratinjau resolusi tinggi, jumlah jendela cutout, inspirasi gaya/vibe, dan palet warna.

### B. Direktori & Detail Lokasi Kafe (`/location` & `/location/[slug]`)
- Kartu lokasi komprehensif memuat nama kafe, alamat fisik lengkap, jam operasional hari ini, tombol buka di Google Maps, dan galeri foto booth.
- Peta interaktif tersemat (*Google Maps Embed*) yang responsif.
- Informasi patokan arah dan tips waktu kunjungan terbaik (menghindari jam sibuk kafe).

### C. Alur WhatsApp Builder Tanpa Penyimpanan Server
Situs mengutamakan privasi pengguna (*Zero-Data Retention*). Tidak ada formulir yang menyimpan data ke basis data perantara. Tiga formulir utama menyusun teks otomatis dan langsung membuka tautan `https://wa.me/...`:
1. **Formulir Custom Frame** (`/product#form-custom-frame` & `/service`): Mengirimkan nama pemesan, cabang kafe yang dituju, dan catatan tema. File desain dikirimkan langsung oleh pelanggan di obrolan WhatsApp.
2. **Formulir Kemitraan & Pengadaan** (`/kemitraan#form-kerjasama`): Mengirimkan nama calon mitra, nama usaha, kota/wilayah, alamat, jenis minat (Kemitraan/Pengadaan/Diskusi), dan cerita singkat ruang usaha.
3. **Formulir Bantuan & Kontak** (`/contact`): Mengirimkan nama dan topik pertanyaan umum seputar lokasi atau mesin photobox.

---

## 6. Persyaratan Non-Fungsional (NFR)

1. **Kecepatan & Core Web Vitals**:
   - Gambar berformat WebP dengan dimensi intrinsik (`width` & `height`) eksplisit untuk LCP dan CLS = 0.
   - Atribut `fetchPriority="high"` untuk aset LCP di atas lipatan layar (*above-the-fold*), dan `loading="lazy"` untuk aset sekunder.
2. **Keterbacaan Bot & Zero-JavaScript Resilience**:
   - Teks utama seluruh 11 halaman harus sudah ada di dalam kode HTML saat pertama kali dikirim dari server/build (tidak boleh hanya `<div id="root"></div>`).
   - FAQ menggunakan elemen native HTML `<details>` dan `<summary>`, sehingga isi tanya-jawab terbaca penuh oleh web crawler tanpa memerlukan eksekusi skrip JS.
3. **Keamanan & Respon Status HTTP**:
   - URL yang tidak terdaftar harus mengembalikan status respon HTTP `404 Not Found` murni dengan meta tag `noindex, nofollow`.
