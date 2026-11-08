# Design System & Visual Guidelines — TentoTen Photobox

## 1. Filosofi Desain: Nostalgia Analog 35mm & Neo-Brutalism Bersahabat

Identitas visual TentoTen Photobox dirancang untuk mencerminkan nuansa **kamera rol film 35mm vintage** yang dipadukan dengan kepraktisan antarmuka modern yang hangat (*warm, welcoming, and tangible*).

Berbeda dengan antarmuka korporat yang dingin atau flat design biasa, situs TentoTen menggunakan gaya **Neo-Brutalism Ramah**:
- Border tegas bernuansa tinta cetak pekat (`#1f1b11`).
- Bayangan datar kaku (*hard offset shadows*) tanpa blur (misalnya: `shadow-[4px_4px_0px_#1f1b11]`).
- Efek sentuhan mekanis: tombol tertekan secara fisik saat diklik (`active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`).
- Latar belakang kertas foto vintage berwarna krem hangat (*warm cream and vintage newsprint paper*).

---

## 2. Palet Warna (Color System)

| Token Warna | Nilai HEX | Peran & Penggunaan |
|:---|:---|:---|
| **Canvas Background** | `#fcf3e2` | Warna latar utama halaman; memberikan kesan kertas hangat yang tidak menyilaukan mata. |
| **Card / Surface Light** | `#fff8f0` | Warna permukaan kartu konten utama, bilik informasi, dan header navigasi. |
| **Card / Surface Muted** | `#f6eddc` | Warna permukaan kontras sekunder untuk kartu langkah, banner photostrip, dan area informasi tambahan. |
| **Brand Crimson** | `#960011` | Warna primer merek TentoTen. Digunakan untuk footer, aksen penting, badge utama, dan tautan aksi. |
| **Brand Crimson Hover** | `#c0111e` | Warna tombol aksi primer saat di-*hover* dan aksen gradasi dinamis. |
| **Badge Soft Tint** | `#ffdad6` | Warna latar belakang badge kategori atau status untuk memberi kontras lembut terhadap teks merah tua. |
| **Ink Dark Border & Head** | `#1f1b11` | Warna garis batas (*border*), bayangan solid, dan teks judul utama (*headline*). |
| **Earth Warm Body** | `#5c403d` | Warna teks paragraf (*body text*); kontras optimal (lolos uji aksesibilitas WCAG AAA) namun lebih bersahabat daripada hitam murni. |
| **Success Emerald** | `#10b981` | Indikator status mesin bilik aktif (*booth online*). |

---

## 3. Tipografi & Hierarki Teks

Hierarki tipografi dikonfigurasi melalui Tailwind CSS dengan kombinasi bobot tegas dan pelacakan huruf (*letter tracking*) yang presisi:

1. **Display Hero Heading (`font-display-hero`)**:
   - Bobot: `font-black` (900)
   - Karakter: Huruf besar dengan pelacakan rapat (`tracking-tight`), memancarkan kesan poster bioskop vintage.
   - Ukuran responsif: `text-3xl sm:text-5xl md:text-6xl lg:text-[70px]`, tinggi baris `leading-[1.05]`.
2. **Section Heading (`font-headline-lg` / `font-headline-md`)**:
   - Bobot: `font-extrabold` (800) hingga `font-black`
   - Ukuran: `text-2xl sm:text-3xl md:text-4xl`
   - Garis bawah halus atau badge pengantar di atas judul untuk mempertegas topik bahasan.
3. **Monospace & Metadata Labels (`font-mono` / `font-label-badge`)**:
   - Huruf kapital penuh (*uppercase*) dengan pelacakan renggang (`tracking-widest`).
   - Ukuran kecil: `text-[10px]` hingga `text-xs`.
   - Digunakan untuk status operasional, nomor urut langkah, badge kategori, dan detail frame film.
4. **Body Text (`font-body-lg` / `font-body-md` / `font-body-sm`)**:
   - Tinggi baris lapang (`leading-relaxed` atau `leading-normal`) untuk kenyamanan membaca artikel panjang.
   - Ukuran standar: `text-xs sm:text-sm md:text-base`.

---

## 4. Komponen Antarmuka (UI Components)

### A. Tombol Neo-Brutalist Interaktif
```html
<a href="/location" 
   class="inline-flex items-center justify-center bg-[#c0111e] hover:bg-[#960011] 
          text-white font-label-board text-xs uppercase tracking-wider px-8 py-3.5 
          rounded-full border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11] 
          active:translate-x-1 active:translate-y-1 active:shadow-none transition-all font-bold">
  Lihat Semua Lokasi Kafe
</a>
```
- **Karakteristik**: Memiliki border hitam tebal 2px, sudut melengkung penuh (*pill*) atau rounded 12px, bayangan solid sudut kanan bawah, dan umpan balik klik fisik (*physical tactile depression*).

### B. Akordeon Tanya Jawab (Native `<details>` & `<summary>`)
- Menggunakan elemen bawaan browser tanpa ketergantungan JavaScript.
- Ikon panah berputar secara murni melalui CSS saat status atribut `open` aktif.
- Menjamin bot mesin pencari mengindeks seluruh jawaban tanpa perlu mengeksekusi skrip.

### C. Pratinjau Modal Frame Interaktif (`/product`)
- Menampilkan tata letak 2 kolom pada desktop: kolom visual kartu frame asli di sebelah kiri, dan kolom spesifikasi cetak, palet warna, serta tombol pemesanan di sebelah kanan.
- Dilengkapi tombol penutup yang mudah dijangkau di perangkat layar sentuh serta penanganan *esc key* dan klik backdrop.

---

## 5. Sistem Logo & Ikonografi

Aset logo resmi tersimpan di direktori `/public/assets/aistudio/`:
1. **`tentotenred_2ac7af73.svg`**:
   - Logo utama berwarna merah TentoTen (`#960011`) dengan tipografi serif kursif retro.
   - Digunakan pada header desktop/mobile di atas latar belakang krem, serta di dalam kotak putih footer merah.
2. **`tentotenwhite_f9c004e1.svg`**:
   - Logo monokrom putih untuk kebutuhan media gelap atau banner promosi berlatar hitam/merah.
3. **`tentotenblack_6bc5967d.svg`**:
   - Logo monokrom hitam pekat untuk stempel dokumen cetak dan stiker merchandise.

**Ikonografi**: Menggunakan Google Material Symbols Outlined dengan ukuran konsisten 18px–24px untuk navigasi, tombol arah, status check, dan petunjuk peta.

---

## 6. Desain Navigasi Responsif (Mobile-First)

- **Desktop (Layar ≥ 768px)**:
  - Header melayang (*sticky header*) dengan latar krem semi-transparan (`backdrop-blur-md`).
  - Menu navigasi horizontal: Beranda, Produk & Harga, Layanan, Lokasi, Kemitraan, Kontak.
  - Tombol WhatsApp Call-to-Action di sudut kanan atas.
- **Mobile (Layar < 768px)**:
  - Header ringkas memuat logo resmi dan navigasi ringkas.
  - **Bottom Dock Bar Tetap**: Bilah aksi tetap di bagian bawah layar menampilkan dua tombol cepat:
    1. Tombol `LOKASI` (ikon toko/kafe terdekat).
    2. Tombol `WHATSAPP` berwarna merah kontras untuk chat bantuan langsung.
