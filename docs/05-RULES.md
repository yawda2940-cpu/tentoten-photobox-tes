# Rules & Quality Standards — TentoTen Photobox

## 1. Aturan Redaksional & Larangan Kata Layanan (Anti-Slop Rules)

Untuk menjaga akurasi representasi bisnis dan mencegah distorsi citra merek di mata konsumen serta mesin pencari, seluruh konten situs tunduk pada aturan redaksional ketat:

### A. Larangan Kata Layanan Tertentu
Website **DILARANG KERAS** menggunakan istilah-istilah berikut sebagai penawaran layanan TentoTen:
1. **`franchise`**: TentoTen tidak menjual skema waralaba (*franchise*). Model kemitraan yang dibuka adalah **kemitraan penempatan booth di kafe** (*revenue share/space collaboration*) dan **pengadaan mandiri**, yang dibahas langsung dengan admin.
2. **`rental`**: Mesin bilik foto TentoTen tidak disewakan secara lepas (*rental harian/mingguan*).
3. **`wedding`**: TentoTen tidak memasarkan layanan *photobooth party wedding organizer* keliling. Fokus produk adalah instalasi tetap di kafe dan pemesanan Custom Frame untuk pengunjung kafe.

### B. Larangan Konten Tiruan & Placeholder
- **Tidak ada kata "TODO"**: Dilarang meninggalkan catatan teknis yang belum selesai di dalam kode maupun teks halaman.
- **Tidak ada teks "Lorem Ipsum"**: Seluruh teks harus berupa salinan bahasa Indonesia yang autentik, jelas, dan informatif.
- **Transparansi Tanpa Gimmick**: Tidak ada klaim diskon palsu, hitung mundur palsu (*fake countdown timers*), atau pop-up yang mengganggu kenyamanan membaca pengguna.

---

## 2. Aturan Standar SEO & Struktur HTML

### A. Aturan H1 Tunggal (Exact Single H1 Rule)
Setiap halaman wajib memiliki **tepat SATU elemen `<h1>`**.
- H1 harus memuat kata kunci utama halaman secara kontekstual.
- Sub-bagian konten di bawah H1 wajib menggunakan hierarki semantik yang runut (`<h2>`, `<h3>`, `<h4>`) tanpa melompati tingkatan heading.

### B. Standar Atribut Tag Gambar (`<img>`)
Setiap elemen `<img>`, baik yang berdiri sendiri maupun di dalam elemen `<picture>`, wajib memiliki 3 atribut utama:
1. **`alt`**: Teks alternatif yang deskriptif dan menjelaskan isi foto secara akurat bagi pembaca tunanetra dan mesin pencari.
2. **`width`**: Nilai lebar intrinsik dalam format angka (misalnya `width={600}`).
3. **`height`**: Nilai tinggi intrinsik dalam format angka (misalnya `height={450}`).
*Pelanggaran terhadap ketiadaan dimensi gambar akan menyebabkan layout shift (CLS) dan ditolak oleh skrip audit produksi.*

### C. Navigasi & Tautan Bersih
- Tidak ada tautan kosong (`href="#"` atau `href="javascript:void(0)"`).
- Navigasi memakai tautan URL absolut atau relatif bersih (`<a href="/location/madiun">`).
- Tautan WhatsApp menggunakan format standar internasional `https://wa.me/62...` dengan teks awalan (*pre-filled message*) yang relevan.

---

## 3. Ketahanan Tanpa JavaScript (Zero-JavaScript Resilience)

Bot penjelajah web seperti Bingbot dan Googlebot tahap awal mengutamakan dokumen HTML mentah yang diterima pertama kali dari server. Karena itu, aplikasi mematuhi standar:

1. **Konten Utama Hadir Sejak Byte Pertama**: Seluruh deskripsi produk, jam buka, alamat kafe, rincian harga Rp35.000 / Rp60.000, serta tautan navigasi sudah terisi penuh di dalam HTML statis.
2. **FAQ Akordeon Native**: Tanya-jawab memanfaatkan elemen `<details>` dan `<summary>` bawaan browser tanpa skrip JS.
3. **Filter Lokasi Bersifat Peningkatan (Progressive Enhancement)**: Halaman `/location` memuat keempat kartu lokasi kafe secara lengkap di dalam HTML awal. Filter tab kota hanya menyembunyikan/menampilkan kartu untuk kenyamanan pengguna interaktif di browser, bukan satu-satunya cara melihat data.

---

## 4. Mekanisme Audit Otomatis (`scripts/seo-audit.mjs`)

Setiap kali perintah build `npm run build` dijalankan, skrip validator otomatis `seo-audit.mjs` akan menginspeksi seluruh berkas keluaran di folder `dist/` sebelum aplikasi diizinkan rilis:

| Pemeriksaan Audit | Kriteria Kelulusan | Dampak Jika Gagal |
|:---|:---|:---|
| **Jumlah H1** | Tepat 1 per file HTML | Build dibatalkan (Exit Code 1) |
| **Keunikan Title** | Title ada dan tidak boleh ada duplikat antar rute | Build dibatalkan (Exit Code 1) |
| **Keunikan Meta Description** | Description ada dan unik per halaman | Build dibatalkan (Exit Code 1) |
| **Kanonikal Absolut** | Menggunakan URL absolut `https://...` | Build dibatalkan (Exit Code 1) |
| **Atribut Gambar** | 100% tag `<img>` memiliki `alt`, `width`, `height` | Build dibatalkan (Exit Code 1) |
| **Validitas JSON-LD** | Semua tag `<script type="application/ld+json">` valid JSON | Build dibatalkan (Exit Code 1) |
| **Kata Terlarang** | Tidak mengandung *franchise*, *rental*, *wedding*, *TODO*, *lorem* | Build dibatalkan (Exit Code 1) |
| **Batas Minimum Teks** | Teks utama body minimal 50 kata riil | Build dibatalkan (Exit Code 1) |

---

## 5. Standar Keamanan & Perlindungan Privasi Data

1. **Zero-PII Storage di Server Web**: Situs tidak menyediakan basis data pengguna, cookie pelacak pihak ketiga, atau penyimpanan formulir.
2. **Kerahasiaan File Desain Custom Frame**: Pelanggan mengirimkan file desain kustom mereka secara *peer-to-peer* ke nomor WhatsApp resmi admin TentoTen. File tidak diunggah ke server publik.
3. **Privasi Foto Pengunjung Bilik**: Unduhan digital softfile hasil foto hanya dapat diakses melalui QR code unik yang dicetak pada strip fisik pengunjung dan dihapus secara otomatis dari cloud penyimpanan booth setelah melewati masa retensi aman.
