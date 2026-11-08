import React, { useState } from 'react';

export const KemitraanPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    city: '',
    address: '',
    interest: 'Kemitraan',
    story: ''
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin TentoTen Photobox, saya tertarik konsultasi kerja sama:
- Nama: ${formData.name || '-'}
- Nama Usaha: ${formData.businessName || '-'}
- Kota: ${formData.city || '-'}
- Alamat: ${formData.address || '-'}
- Jenis Minat: ${formData.interest}
- Cerita/Kebutuhan: ${formData.story || '-'}`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col w-full pt-20">
      {/* 1. Header & Breadcrumb */}
      <section className="w-full bg-[#fff8f0] py-10 md:py-16 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5c403d]">
              <li>
                <a href="/" className="hover:text-[#960011] transition-colors">
                  Beranda
                </a>
              </li>
              <li>/</li>
              <li className="text-[#960011] font-bold" aria-current="page">
                Kemitraan
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] text-xs font-bold tracking-widest uppercase mb-3">
              KOLABORASI TEMPAT USAHA & PENGADAAN
            </div>
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1f1b11] font-black tracking-tight leading-tight">
              Kemitraan dan Pengadaan Photobox untuk Kafe dan Usahamu
            </h1>
            <p className="font-body-lg text-base md:text-lg text-[#5c403d] mt-4 leading-relaxed">
              TentoTen Photobox saat ini hadir di empat kafe di Jawa Timur. Kalau kamu punya kafe atau tempat usaha dan ingin photobox ada di tempatmu, ada dua jalur yang bisa kamu pilih: kemitraan dan pengadaan. Halaman ini menjelaskan perbedaan keduanya, cocok untuk siapa, apa yang perlu kamu siapkan, dan bagaimana memulai percakapan dengan admin.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Kenapa Photobox Cocok Untuk Kafe */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                NILAI TAMBAH RUANG KAFE
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black leading-tight">
                Kenapa photobox cocok untuk kafe
              </h2>
              <div className="mt-4 space-y-4 font-body-md text-sm text-[#5c403d] leading-relaxed">
                <p>
                  Orang datang ke kafe untuk bertemu, mengobrol, dan merayakan hal kecil. Photobox masuk ke momen itu dengan wajar. Pengunjung yang sudah duduk lama punya alasan untuk berdiri, mengajak teman, dan membawa pulang hasil cetak. Bagi pemilik kafe, photobox menjadi satu sudut yang membuat pengunjung berhenti sebentar, tertawa, lalu mungkin mengunggah ceritanya ke media sosial.
                </p>
                <p>
                  TentoTen sudah menjalankan model ini di Sthana Coffee di Madiun, Ethereal Coffee di Jombang, Komahaus Coffee di Ponorogo, dan Keyf Coffee di Kertosono. Kamu bisa melihat sendiri bagaimana setiap lokasi berjalan lewat halaman <a href="/location" className="text-[#960011] font-bold underline hover:text-[#c0111e]">Location</a>. Di sana ada alamat dan jam buka masing-masing kafe.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#fff8f0] p-6 rounded-3xl border-2 border-[#1f1b11] shadow-[6px_6px_0px_#1f1b11]">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="https://lh3.googleusercontent.com/aida-public/AB6AXuBxWY9tynIhCj-mgfG_uTc9Vk-TMZFw1H7oOacMvswHOjGQI1O5p-3oVlQG6qMSQTLkuipKkaftvrtRRQn0fG0-HJ1vC6D8cczkJ4Yy7fd1e_99TEPR_--PT7MkHCrYvYLXEYTavLZ98c9at_-xWI-4NN-gB2uJiaLbK0tz9nRFMNRJ8q9sgB9fuHiaMr4MJo6930EFSO8bpBp-57YKefnyMwGWUb2RpJMa6r34AjkqxClrM7Q3ASZ2bw=rw"
                  />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxWY9tynIhCj-mgfG_uTc9Vk-TMZFw1H7oOacMvswHOjGQI1O5p-3oVlQG6qMSQTLkuipKkaftvrtRRQn0fG0-HJ1vC6D8cczkJ4Yy7fd1e_99TEPR_--PT7MkHCrYvYLXEYTavLZ98c9at_-xWI-4NN-gB2uJiaLbK0tz9nRFMNRJ8q9sgB9fuHiaMr4MJo6930EFSO8bpBp-57YKefnyMwGWUb2RpJMa6r34AjkqxClrM7Q3ASZ2bw"
                    alt="Instalasi booth photobox TentoTen di dalam kafe mitra"
                    width={600}
                    height={450}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    className="w-full h-56 object-cover rounded-2xl border border-[#1f1b11]"
                  />
                </picture>
                <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#5c403d]">
                  <span>Unit Booth Ringkas & Rapi</span>
                  <span className="text-[#960011] font-bold">Plug & Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dua Jalur Kerja Sama */}
      <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              PILIHAN MODEL
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
              Dua Jalur Kerja Sama
            </h2>
            <p className="font-body-md text-sm text-[#5c403d] mt-2">
              Ada dua kebutuhan yang berbeda, jadi ada dua jalur yang berbeda pula.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Jalur 1 */}
            <article className="bg-[#fcf3e2] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[6px_6px_0px_#1f1b11] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#960011] font-bold inline-block mb-3">
                  JALUR 1
                </span>
                <h3 className="font-headline-lg text-2xl text-[#1f1b11] font-black">
                  Kemitraan Penempatan Booth
                </h3>
                <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed">
                  Kemitraan cocok kalau kamu ingin photobox TentoTen ditempatkan di kafe atau tempat usahamu. Kamu menyediakan tempat, dan TentoTen yang membawa photobox. Ini mirip dengan kondisi di empat kafe yang sudah berjalan sekarang. Pengunjung memakai photobox dengan harga sesi yang sama, yaitu Rp35.000.
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-[#fff8f0] border border-[#1f1b11]/15 text-xs text-[#5c403d]">
                  Ketentuan kerja sama seperti pembagian peran, durasi, dan syarat tempat tidak dituliskan di website, karena bisa berbeda untuk tiap lokasi. Semuanya dibahas langsung dengan admin setelah kamu menceritakan tempatmu.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1f1b11]/15">
                <a
                  href="#form-kerjasama"
                  className="w-full py-3 bg-[#1f1b11] hover:bg-[#343025] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center block transition-colors"
                >
                  Ajukan Minat Kemitraan
                </a>
              </div>
            </article>

            {/* Jalur 2 */}
            <article className="bg-[#fcf3e2] rounded-3xl border-2 border-[#960011] p-6 sm:p-8 shadow-[6px_6px_0px_#960011] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#960011] text-white font-bold inline-block mb-3">
                  JALUR 2
                </span>
                <h3 className="font-headline-lg text-2xl text-[#1f1b11] font-black">
                  Pengadaan Photobox Mandiri
                </h3>
                <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed">
                  Pengadaan cocok kalau kamu ingin memiliki photobox sendiri untuk usahamu atau acaramu, bukan sekadar menjadi tempat penempatan. Rincian pengadaan, termasuk jenis perangkat, spesifikasi, dan biaya, dibahas langsung dengan admin sesuai kebutuhanmu.
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-[#fff8f0] border border-[#960011]/20 text-xs text-[#5c403d]">
                  Website ini tidak mencantumkan harga pengadaan karena angkanya disesuaikan dengan konfigurasi hardware, software, dan printer yang kamu pilih bersama tim teknis TentoTen.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1f1b11]/15">
                <a
                  href="#form-kerjasama"
                  className="w-full py-3 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center block transition-colors"
                >
                  Konsultasi Pengadaan
                </a>
              </div>
            </article>
          </div>

          {/* Panduan Membandingkan */}
          <div className="mt-12 bg-[#f6eddc] rounded-2xl border-2 border-[#1f1b11] p-6 max-w-3xl mx-auto">
            <h3 className="font-headline-sm text-lg text-[#1f1b11] font-black mb-3">
              Membandingkan Kemitraan dan Pengadaan
            </h3>
            <ul className="space-y-2 text-xs font-body-sm text-[#1f1b11]">
              <li><strong>Apakah kamu ingin tempatmu menjadi lokasi photobox TentoTen?</strong> Pilih kemitraan.</li>
              <li><strong>Apakah kamu ingin memiliki dan mengelola photobox sendiri?</strong> Pilih pengadaan.</li>
              <li><strong>Apakah kamu belum yakin?</strong> Pilih &quot;Belum tahu&quot; di form. Admin akan membantu menjelaskan kedua jalur berdasarkan ceritamu.</li>
            </ul>
            <p className="text-[11px] text-[#5c403d] mt-3 italic">
              Pilihan di form tidak mengikat. Ia hanya membantu admin memahami arah percakapan sejak pesan pertama.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Siapa yang Cocok & Apa yang Perlu Disiapkan */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#fff8f0] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-4">
                Siapa yang cocok mengajukan
              </h2>
              <p className="text-xs text-[#5c403d] mb-4">
                Jalur ini terbuka untuk berbagai jenis tempat:
              </p>
              <ul className="space-y-3 text-xs text-[#1f1b11]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#960011] text-base shrink-0">check_circle</span>
                  <span><strong>Pemilik kafe dan kedai kopi:</strong> Ini kelompok yang paling dekat dengan model TentoTen sekarang.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#960011] text-base shrink-0">check_circle</span>
                  <span><strong>Pengelola ruang usaha lain:</strong> Tempat makan, ruang komunitas, atau ruang bersama yang sering dikunjungi orang bisa menanyakan kecocokannya.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#960011] text-base shrink-0">check_circle</span>
                  <span><strong>Penyelenggara acara atau komunitas:</strong> Kalau kamu butuh photobox untuk keperluan tertentu, ceritakan kebutuhannya, dan admin akan membantu mencarikan jalur yang sesuai.</span>
                </li>
              </ul>
              <p className="text-xs text-[#5c403d] mt-4">
                Kalau tempatmu berada di sekitar Madiun, Jombang, Ponorogo, atau Kertosono, ceritakan saja. Kalau di kota lain, tetap boleh bertanya, dan admin akan menjelaskan kemungkinannya.
              </p>
            </div>

            <div className="bg-[#fff8f0] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-4">
                Yang perlu kamu siapkan sebelum menghubungi admin
              </h2>
              <p className="text-xs text-[#5c403d] mb-4">
                Persiapan kecil membuat percakapan pertama lebih efektif:
              </p>
              <ul className="space-y-2.5 text-xs text-[#1f1b11]">
                <li><strong>Nama usaha dan kotanya:</strong> Ini dasar untuk menilai lokasi.</li>
                <li><strong>Alamat atau area tempatmu:</strong> Alamat lengkap boleh dikosongkan di form, tetapi bantu admin kalau kamu mau menyebutnya.</li>
                <li><strong>Perkiraan sudut atau ruang yang tersedia:</strong> Photobox butuh ruang yang cukup, jadi gambaran sudut tempatmu akan membantu. Foto ruangan bisa kamu kirim lewat chat WhatsApp setelah admin membalas.</li>
                <li><strong>Jam buka tempatmu:</strong> Photobox mengikuti jam buka tempat, jadi informasi ini membantu admin.</li>
                <li><strong>Alasan kamu tertarik:</strong> Ceritakan singkat apa yang kamu harapkan. Apakah untuk menambah daya tarik tempat, melengkapi acara, atau hal lain.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Form Kerja Sama (Client-Side WhatsApp Builder) */}
      <section id="form-kerjasama" className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[760px] mx-auto">
          <div className="text-center mb-8">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              FORMULIR DISKUSI
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
              Form Kerja Sama & Pengadaan
            </h2>
            <p className="font-body-md text-sm text-[#5c403d] mt-2">
              Website tidak menyimpan data ini. Form hanya menyusun pesan teks, lalu membuka WhatsApp di ponselmu.
            </p>
          </div>

          <form
            onSubmit={handleWhatsAppSubmit}
            className="bg-[#fcf3e2] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[6px_6px_0px_#1f1b11] space-y-5"
          >
            <div>
              <label htmlFor="kemitraan-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1f1b11] mb-1.5">
                Nama Kamu *
              </label>
              <input
                id="kemitraan-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Rian Pratama"
                className="w-full px-4 py-3 rounded-xl bg-[#fff8f0] border-2 border-[#1f1b11] text-sm text-[#1f1b11] focus:outline-none focus:border-[#960011]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="kemitraan-business" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1f1b11] mb-1.5">
                  Nama Usaha / Kafe *
                </label>
                <input
                  id="kemitraan-business"
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Contoh: Senja Kopi Space"
                  className="w-full px-4 py-3 rounded-xl bg-[#fff8f0] border-2 border-[#1f1b11] text-sm text-[#1f1b11] focus:outline-none focus:border-[#960011]"
                />
              </div>

              <div>
                <label htmlFor="kemitraan-city" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1f1b11] mb-1.5">
                  Kota / Wilayah *
                </label>
                <input
                  id="kemitraan-city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Contoh: Madiun / Ngawi / Kediri"
                  className="w-full px-4 py-3 rounded-xl bg-[#fff8f0] border-2 border-[#1f1b11] text-sm text-[#1f1b11] focus:outline-none focus:border-[#960011]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="kemitraan-address" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1f1b11] mb-1.5">
                Alamat Usaha (Boleh Dikosongkan)
              </label>
              <input
                id="kemitraan-address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Nama jalan atau patokan area kafe"
                className="w-full px-4 py-3 rounded-xl bg-[#fff8f0] border-2 border-[#1f1b11] text-sm text-[#1f1b11] focus:outline-none focus:border-[#960011]"
              />
            </div>

            <div>
              <label htmlFor="kemitraan-interest" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1f1b11] mb-1.5">
                Jenis Minat *
              </label>
              <select
                id="kemitraan-interest"
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#fff8f0] border-2 border-[#1f1b11] text-sm text-[#1f1b11] focus:outline-none focus:border-[#960011]"
              >
                <option value="Kemitraan">Kemitraan Penempatan Booth di Kafe</option>
                <option value="Pengadaan">Pengadaan Photobox Mandiri</option>
                <option value="Belum tahu">Belum tahu (Ingin Diskusi Dulu)</option>
              </select>
            </div>

            <div>
              <label htmlFor="kemitraan-story" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1f1b11] mb-1.5">
                Cerita Singkat Tempat Usaha / Harapan
              </label>
              <textarea
                id="kemitraan-story"
                rows={3}
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                placeholder="Ceritakan gambaran sudut ruangan, jam operasional kafe, atau tujuan kolaborasi"
                className="w-full px-4 py-3 rounded-xl bg-[#fff8f0] border-2 border-[#1f1b11] text-sm text-[#1f1b11] focus:outline-none focus:border-[#960011]"
              ></textarea>
            </div>

            <button
              type="submit"
              data-track="whatsapp"
              className="w-full py-4 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center font-bold shadow-[3px_3px_0px_#1f1b11] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>Chat Admin soal Kerja Sama</span>
            </button>
          </form>
        </div>
      </section>

      {/* 6. Hal Yang Belum Ditetapkan & Apa Yang Bisa Dilihat Lebih Dulu */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[840px] mx-auto space-y-8">
          <div>
            <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
              Hal yang belum ditetapkan di website
            </h2>
            <p className="text-xs text-[#5c403d] leading-relaxed">
              Supaya kamu tidak kecewa, ini bagian yang sengaja tidak dijanjikan di halaman ini. Website tidak mencantumkan biaya kemitraan atau harga pengadaan. Website tidak menjanjikan jangka waktu, target keuntungan, atau hasil tertentu. Semua hal itu dibahas satu per satu dengan admin karena tiap tempat punya kondisi berbeda. Kalau ada pihak lain yang menjanjikan angka atas nama TentoTen di luar percakapan resmi dengan admin, mohon konfirmasi dulu lewat akun resmi @10to10.photobox.
            </p>
          </div>

          <div>
            <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
              Apa yang bisa kamu lihat lebih dulu
            </h2>
            <p className="text-xs text-[#5c403d] leading-relaxed">
              Sebelum mengajukan, kamu bisa mempelajari bagaimana TentoTen berjalan sekarang. Lihat halaman <a href="/service" className="text-[#960011] font-bold underline">Service</a> untuk alur layanan, halaman <a href="/product" className="text-[#960011] font-bold underline">Product</a> untuk dua harga yang berlaku bagi pengunjung, dan halaman lokasi seperti <a href="/location/madiun" className="text-[#960011] font-bold underline">Photobox di Madiun</a> atau <a href="/location/ponorogo" className="text-[#960011] font-bold underline">Photobox di Ponorogo</a> untuk melihat contoh kafe yang sudah bekerja sama. Kamu juga bisa mengunjungi salah satu kafe dan mencoba photobox sebagai pengunjung biasa. Itu cara paling jujur untuk menilai apakah model ini cocok untuk tempatmu.
            </p>
          </div>

          {/* FAQ Kemitraan */}
          <div className="pt-4">
            <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-6">
              Pertanyaan tentang kemitraan dan pengadaan
            </h2>
            <div className="space-y-4">
              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apa bedanya kemitraan dan pengadaan?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Kemitraan berarti photobox TentoTen ditempatkan di tempatmu. Pengadaan berarti kamu mengadakan photobox untuk kebutuhanmu sendiri.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Berapa biayanya?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Biaya tidak dicantumkan di website. Admin menjelaskannya langsung sesuai jalur yang kamu pilih.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah harus punya kafe?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Tidak harus. Tempat usaha atau kebutuhan lain juga boleh ditanyakan.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah mengajukan berarti pasti disetujui?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Tidak. Pengajuan adalah awal percakapan. Admin menilai kecocokan lokasi dan kebutuhan.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah ada perbedaan harga sesi di tempat mitra?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Harga sesi pengunjung di lokasi TentoTen tetap seragam yaitu Rp35.000 per sesi.
                </p>
              </details>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#fff8f0] border-2 border-[#1f1b11] text-center">
            <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold">
              Catatan tentang cara TentoTen bekerja sama
            </h3>
            <p className="text-xs text-[#5c403d] mt-2 leading-relaxed">
              TentoTen berusaha menjaga percakapan kerja sama tetap terbuka dan jelas. Kamu berhak bertanya apa saja, membandingkan, dan mempertimbangkan sebelum memutuskan. Tidak ada tekanan untuk segera mengambil keputusan, dan tidak ada tanggal yang dikejar lewat website ini.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
