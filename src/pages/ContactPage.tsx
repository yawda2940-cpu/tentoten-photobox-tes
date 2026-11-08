import React, { useState } from 'react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Madiun');
  const [question, setQuestion] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin TentoTen Photobox, saya ingin bertanya:
- Nama: ${name || 'Pengunjung'}
- Cabang/Kota: ${city}
- Pertanyaan: ${question || 'Mohon informasi lebih lanjut.'}`;

    const waUrl = `https://wa.me/6281330148068?text=${encodeURIComponent(text)}`;
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
                Kontak
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] text-xs font-bold tracking-widest uppercase mb-3">
              PUSAT BANTUAN & MEDIA SOSIAL
            </div>
            {/* EXACT SINGLE H1 */}
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1f1b11] font-black tracking-tight leading-tight">
              Hubungi TentoTen Photobox
            </h1>
            <p className="font-body-lg text-base md:text-lg text-[#5c403d] mt-4 leading-relaxed">
              Punya pertanyaan soal photobox TentoTen? Admin kami siap membantu lewat WhatsApp. Kamu bisa bertanya tentang jam buka, alamat kafe, harga, cara kerja custom frame, sampai kerja sama untuk pemilik usaha. Halaman ini menjelaskan jalur kontak yang tersedia, apa yang sebaiknya kamu tulis di pesan, dan kapan kamu tidak perlu menghubungi siapa pun karena jawabannya sudah ada di website.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Cara Tercepat: Chat Admin Lewat WhatsApp & Form Pertanyaan Umum */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Info Text (5 Kolom) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[6px_6px_0px_#1f1b11]">
                <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                  JALUR UTAMA
                </span>
                <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                  Cara tercepat: chat admin lewat WhatsApp
                </h2>
                <div className="text-xs text-[#5c403d] space-y-3 leading-relaxed">
                  <p>
                    WhatsApp adalah jalur utama TentoTen. Tidak ada email resmi, tidak ada telepon kantor, dan tidak ada formulir yang dikirim ke server. Semua pertanyaan masuk lewat satu pintu supaya jawabannya cepat dan konsisten. Kalau kamu menekan tombol WhatsApp di halaman mana pun, kamu akan dibawa ke chat dengan admin.
                  </p>
                  <p>
                    Kalau kamu ingin pesanmu lebih rapi, pakai form di samping. Form ini tidak mengirim data ke website kami. Ia hanya menyusun pesan teks dari isian yang kamu tulis, lalu membuka WhatsApp dengan pesan yang sudah terisi. Kamu masih bisa mengubah isinya sebelum menekan kirim.
                  </p>
                </div>

                <div className="mt-5 p-3.5 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15 font-mono text-xs font-bold text-[#1f1b11] flex items-center justify-between">
                  <span>+62 813-3014-8068</span>
                  <span className="text-[#960011]">Setiap Hari</span>
                </div>
              </div>

              {/* Instagram & TikTok Box */}
              <div className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 shadow-[4px_4px_0px_#1f1b11]">
                <h3 className="font-headline-sm text-lg text-[#1f1b11] font-bold mb-2">
                  Instagram dan TikTok
                </h3>
                <p className="text-xs text-[#5c403d] leading-relaxed">
                  Akun resmi TentoTen adalah <strong>@10to10.photobox</strong> di Instagram dan TikTok. Di sana kamu bisa mengikuti kabar terbaru, melihat bagaimana orang memakai photobox, dan mengirim pesan langsung. Untuk pertanyaan yang butuh jawaban pasti seperti jam buka atau custom frame, WhatsApp tetap jalur yang paling disarankan.
                </p>
              </div>
            </div>

            {/* Form Pertanyaan Umum (7 Kolom) */}
            <div className="lg:col-span-7">
              <div className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[6px_6px_0px_#1f1b11]">
                <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                  CHAT INSTAN
                </span>
                <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-2">
                  Form pertanyaan umum
                </h2>
                <p className="font-body-sm text-xs text-[#5c403d] mb-6">
                  Setelah semua terisi, tekan tombol &quot;Chat Admin di WhatsApp&quot;. Website tidak menyimpan apa pun yang kamu tulis. Semua hanya diteruskan ke aplikasi WhatsApp di ponselmu.
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono font-bold uppercase text-[#1f1b11] mb-1">
                      Nama Kamu
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Supaya admin tahu cara menyapamu"
                      className="w-full px-4 py-3 rounded-xl bg-[#f6eddc] border-2 border-[#1f1b11] text-xs text-[#1f1b11] focus:outline-none focus:border-[#960011]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-city" className="block text-xs font-mono font-bold uppercase text-[#1f1b11] mb-1">
                      Kota atau Cabang yang Kamu Maksud *
                    </label>
                    <select
                      id="contact-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#f6eddc] border-2 border-[#1f1b11] text-xs text-[#1f1b11] focus:outline-none focus:border-[#960011]"
                    >
                      <option value="Madiun">Madiun - Sthana Coffee</option>
                      <option value="Jombang">Jombang - Ethereal Coffee</option>
                      <option value="Ponorogo">Ponorogo - Komahaus Coffee</option>
                      <option value="Kertosono">Kertosono - Keyf Coffee</option>
                      <option value="Umum">Pertanyaan Umum (Semua Cabang)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-question" className="block text-xs font-mono font-bold uppercase text-[#1f1b11] mb-1">
                      Pertanyaanmu (Ditulis dengan Kalimat Sendiri) *
                    </label>
                    <textarea
                      id="contact-question"
                      rows={4}
                      required
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Tuliskan pertanyaan seputar jam operasional khusus, custom frame, atau hal lain..."
                      className="w-full px-4 py-3 rounded-xl bg-[#f6eddc] border-2 border-[#1f1b11] text-xs text-[#1f1b11] focus:outline-none focus:border-[#960011]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    data-track="whatsapp"
                    className="w-full py-4 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center font-bold shadow-[3px_3px_0px_#1f1b11] flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Chat Admin di WhatsApp</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Panduan Pesan & Kontak Berdasarkan Keperluan */}
      <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-[#fcf3e2] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Apa yang sebaiknya ditulis di pesan
              </h2>
              <div className="text-xs text-[#5c403d] space-y-2.5 leading-relaxed">
                <p>Pesan yang jelas mendapat jawaban yang lebih cepat. Berikut beberapa kebiasaan sederhana yang membantu:</p>
                <p><strong>Sebutkan kotanya:</strong> TentoTen ada di empat kafe yang jam bukanya berbeda. Kalau kamu menyebut kota sejak awal, admin tidak perlu bertanya balik.</p>
                <p><strong>Tulis satu topik per pesan:</strong> Misalnya pertanyaan tentang jam buka dipisah dari pertanyaan tentang custom frame.</p>
                <p><strong>Sertakan tanggal kalau perlu:</strong> Untuk acara dengan hari yang sudah pasti, tulis tanggalnya supaya admin bisa menilai apakah persiapan sempat dilakukan.</p>
                <p><strong>Lampirkan file hanya bila diminta:</strong> Untuk custom frame, file desain dikirim lewat chat setelah admin membalas. Website tidak menerima unggahan file.</p>
              </div>
            </div>

            <div className="bg-[#fcf3e2] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Kontak berdasarkan keperluan
              </h2>
              <div className="text-xs text-[#5c403d] space-y-2.5 leading-relaxed">
                <p><strong>Pelanggan yang ingin berfoto:</strong> Kamu tidak perlu menghubungi siapa pun sebelum datang. TentoTen walk-in, tanpa booking dan tanpa reservasi.</p>
                <p><strong>Pelanggan yang ingin custom frame:</strong> Gunakan form di halaman <a href="/product" className="text-[#960011] font-bold underline">Product</a>. Form itu sudah disusun khusus untuk custom frame dan meminta cabang tujuan.</p>
                <p><strong>Pemilik kafe atau usaha:</strong> Kalau kamu tertarik menghadirkan photobox di tempatmu, buka halaman <a href="/kemitraan" className="text-[#960011] font-bold underline">Kemitraan photobox</a>.</p>
                <p><strong>Kreator, media, dan komunitas:</strong> Kirim pesan lewat WhatsApp atau Direct Message di Instagram dan TikTok. Jelaskan siapa kamu dan apa rencananya.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Jam Respons, Privasi, & FAQ Kontak */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[840px] mx-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11]">
              <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold mb-1">
                Jam respons admin
              </h3>
              <p className="text-xs text-[#5c403d] leading-relaxed">
                Admin membalas pesan sesuai ketersediaan. Kalau pesanmu belum dibalas, tunggu sebentar, lalu kirim satu pesan lanjutan saja. Untuk keperluan mendesak di hari kunjunganmu, kamu juga bisa menghubungi kafe tempat photobox berada.
              </p>
            </div>

            <div className="p-5 bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11]">
              <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold mb-1">
                Privasi pesanmu
              </h3>
              <p className="text-xs text-[#5c403d] leading-relaxed">
                Website ini tidak menyimpan nama, nomor, atau isi pesan yang kamu tulis di form. Semua data hanya dipakai untuk menyusun teks pesan di perangkatmu, lalu diserahkan ke WhatsApp. Penjelasan lengkapnya ada di halaman <a href="/kebijakan-privasi" className="text-[#960011] font-bold underline">Kebijakan Privasi</a>.
              </p>
            </div>
          </div>

          <div>
            <div className="text-center mb-8">
              <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                TANYA JAWAB
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
                Pertanyaan tentang kontak
              </h2>
            </div>

            <div className="space-y-4">
              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah ada email resmi TentoTen?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Saat ini jalur resmi adalah WhatsApp, Instagram, dan TikTok.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah harus menghubungi admin sebelum foto?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Tidak. Photobox TentoTen walk-in, jadi kamu bisa langsung datang saat kafe buka.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah form di website mengirim data ke server?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Tidak. Form hanya menyusun pesan dan membuka WhatsApp secara langsung.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Bagaimana cara memesan custom frame?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Hubungi admin lewat WhatsApp, kirim file desain di chat, lalu admin mengatur frame.
                </p>
              </details>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#fff8f0] border-2 border-[#1f1b11]">
            <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold mb-2">
              Kapan kamu tidak perlu menghubungi admin
            </h3>
            <p className="text-xs text-[#5c403d] leading-relaxed">
              Banyak pertanyaan sudah terjawab di website. Kalau kamu hanya ingin tahu apakah perlu booking, jawabannya tidak, TentoTen walk-in. Kalau kamu ingin tahu harga, sesi Rp35.000 dan custom frame Rp60.000. Kalau kamu ingin tahu jam buka, tiap halaman lokasi mencantumkannya. Menghubungi admin lebih berguna untuk hal yang memang perlu konfirmasi, seperti custom frame, jam buka di hari khusus, metode pembayaran, atau kerja sama usaha.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
