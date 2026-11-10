import React, { useState } from 'react';
import { CreatorVideos } from '../components/CreatorVideos';

export const ServicePage: React.FC = () => {
  const [customForm, setCustomForm] = useState({
    name: '',
    branch: 'Madiun',
    notes: ''
  });

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin TentoTen Photobox, saya mau pesan Custom Frame:
- Nama/Komunitas: ${customForm.name || '-'}
- Cabang Tujuan: ${customForm.branch}
- Catatan: ${customForm.notes || '-'}
Saya akan mengirimkan file desain langsung di chat ini.`;

    const waUrl = `https://wa.me/6281330148068?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col w-full pt-20">
      {/* 1. Header & Breadcrumb */}
      <section className="w-full max-w-full min-w-0 bg-[#fff8f0] py-10 md:py-16 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="w-full max-w-[1240px] min-w-0 mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5c403d]">
              <li>
                <a href="/" className="hover:text-[#960011] transition-colors">
                  Beranda
                </a>
              </li>
              <li>/</li>
              <li className="text-[#960011] font-bold" aria-current="page">
                Layanan TentoTen Photobox
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase mb-3 max-w-full text-center">
              <span>ALUR PENGGUNAAN BOOTH &amp; FRAME KHUSUS</span>
            </div>
            {/* EXACT SINGLE H1 */}
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1f1b11] font-black tracking-tight leading-tight break-words max-w-full">
              Layanan TentoTen Photobox: Photobox di Kafe dan Custom Frame
            </h1>
            <p className="font-body-lg text-base md:text-lg text-[#5c403d] mt-4 leading-relaxed break-words">
              TentoTen Photobox punya dua layanan. Pertama, photobox di tempat: kamu datang ke kafe dan langsung foto. Kedua, custom frame: bingkai foto dengan desain buatanmu sendiri. Keduanya berjalan di lokasi, tanpa booking dan tanpa pembayaran online. Halaman ini menjelaskan cara kerja kedua layanan, apa yang kamu perlu siapkan, dan bagaimana mendapat bantuan bila diperlukan.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Photobox di Tempat (#photobox-di-tempat) */}
      <section id="photobox-di-tempat" className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-5 sm:p-10 shadow-[4px_4px_0px_#1f1b11] sm:shadow-[6px_6px_0px_#1f1b11]">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              LAYANAN 1 (WALK-IN)
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-4xl text-[#1f1b11] font-black">
              Photobox di tempat
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#5c403d] mt-3 leading-relaxed">
              Photobox TentoTen ditempatkan di dalam kafe, sehingga kamu bisa foto di sela waktu nongkrong. Layanan ini berjalan secara walk-in. Artinya kamu tidak perlu membuat janji, tidak perlu mendaftar, dan tidak perlu memesan jam tertentu. Selama kafe buka, photobox bisa dipakai.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#1f1b11]/15">
              <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15">
                <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold mb-2">
                  Bagaimana alurnya di lokasi
                </h3>
                <p className="text-xs text-[#5c403d] leading-relaxed">
                  Pertama, datang ke salah satu dari empat kafe: Sthana Coffee di Madiun, Ethereal Coffee di Jombang, Komahaus Coffee di Ponorogo, atau Keyf Coffee di Kertosono. Kedua, temukan photobox di dalam kafe dan pilih frame yang tersedia. Ketiga, lakukan sesi foto dan bayar Rp35.000 di lokasi. Keempat, ambil hasilnya.
                </p>
              </div>

              <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15">
                <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold mb-2">
                  Apa yang kamu dapat
                </h3>
                <p className="text-xs text-[#5c403d] leading-relaxed">
                  Dari satu sesi Rp35.000, kamu mendapat satu sesi foto dan hasil cetak yang langsung jadi (2 lembar photostrip tebal). Frame yang tersedia di photobox ikut dalam harga sesi. Softfile foto JPG dan video animasi GIF juga bisa kamu unduh langsung via scan QR code.
                </p>
              </div>

              <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15">
                <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold mb-2">
                  Siapa yang cocok memakainya
                </h3>
                <p className="text-xs text-[#5c403d] leading-relaxed">
                  Layanan ini cocok untuk pasangan yang ingin punya kenang-kenangan, sahabat yang sedang nongkrong, keluarga yang jalan bareng, atau siapa saja yang penasaran. Karena harganya satu angka yang jelas (Rp35.000), kamu bisa memutuskan dengan cepat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Custom Frame (#custom-frame) */}
      <section id="custom-frame" className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="bg-[#fcf3e2] rounded-3xl border-2 border-[#960011] p-5 sm:p-10 shadow-[4px_4px_0px_#960011] sm:shadow-[6px_6px_0px_#960011]">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              LAYANAN 2 (DESAIN SENDIRI)
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-4xl text-[#1f1b11] font-black">
              Custom Frame
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#5c403d] mt-3 leading-relaxed">
              Custom frame itu bingkai foto dengan desain buatan kamu sendiri, dipasang khusus untuk sesi photobox kamu. Cocok untuk ulang tahun, gathering kantor, acara komunitas, atau momen lainnya. Beda dari frame biasa yang sudah tersedia, desainnya kamu yang tentukan. Selama sesi berlangsung, semua hasil cetak otomatis memakai frame itu. Biaya custom frame Rp60.000, terpisah dari harga sesi photobox Rp35.000.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-[#1f1b11]/15">
              <div className="p-5 bg-[#fff8f0] rounded-2xl border border-[#1f1b11]/15">
                <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold mb-3">
                  Tiga langkah custom frame
                </h3>
                <ul className="space-y-3 text-xs text-[#5c403d] leading-relaxed">
                  <li>
                    <strong className="text-[#1f1b11] block">Langkah 1: hubungi admin lewat WhatsApp.</strong>
                    Gunakan form di bawah atau chat langsung. Sebutkan cabang tujuan dan, kalau ada, tema atau jumlah frame yang kamu perlukan.
                  </li>
                  <li>
                    <strong className="text-[#1f1b11] block">Langkah 2: kirim file desain di chat.</strong>
                    Setelah admin membalas, kirim file desainmu langsung di percakapan WhatsApp itu. Tidak ada unggah file di website ini.
                  </li>
                  <li>
                    <strong className="text-[#1f1b11] block">Langkah 3: admin mengatur frame.</strong>
                    Admin akan men-setting frame supaya siap dipakai di photobox cabang yang kamu pilih.
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-[#fff8f0] rounded-2xl border border-[#1f1b11]/15">
                <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold mb-3">
                  Yang perlu kamu siapkan
                </h3>
                <p className="text-xs text-[#5c403d] leading-relaxed">
                  Siapkan desain lebih dulu. Putuskan tema, warna, dan tulisan yang ingin muncul. Tentukan cabang yang akan kamu datangi dan perkiraan hari kunjunganmu. Lalu tanyakan ke admin format file yang bisa diterima dan lama waktu pengaturan, karena informasi teknis ini dikelola admin dan bisa berubah. Hubungi admin dengan jarak waktu yang cukup sebelum hari acara. Itu memberi ruang kalau ada penyesuaian desain yang perlu dibahas.
                </p>
              </div>
            </div>

            {/* Form Custom Frame di Halaman Service */}
            <div className="mt-8 bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11] p-4 sm:p-6 max-w-2xl mx-auto">
              <h3 className="font-headline-sm text-lg text-[#1f1b11] font-black mb-3 text-center">
                Form Custom Frame
              </h3>
              <p className="text-xs text-[#5c403d] text-center mb-5">
                Isi tiga kolom singkat: nama kamu atau komunitas (opsional), cabang tujuan (wajib), dan catatan singkat (opsional). Tekan tombol dan WhatsApp akan terbuka dengan pesan yang sudah terisi.
              </p>

              <form onSubmit={handleCustomSubmit} className="space-y-4">
                <div>
                  <label htmlFor="service-custom-name" className="block text-xs font-mono font-bold uppercase text-[#1f1b11] mb-1">
                    Nama / Komunitas (Opsional)
                  </label>
                  <input
                    id="service-custom-name"
                    type="text"
                    value={customForm.name}
                    onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                    placeholder="Nama kamu atau nama komunitas"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#1f1b11] text-xs text-[#1f1b11] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="service-custom-branch" className="block text-xs font-mono font-bold uppercase text-[#1f1b11] mb-1">
                    Cabang Tujuan *
                  </label>
                  <select
                    id="service-custom-branch"
                    value={customForm.branch}
                    onChange={(e) => setCustomForm({ ...customForm, branch: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#1f1b11] text-xs text-[#1f1b11] focus:outline-none"
                  >
                    <option value="Madiun">Madiun - Sthana Coffee</option>
                    <option value="Jombang">Jombang - Ethereal Coffee</option>
                    <option value="Ponorogo">Ponorogo - Komahaus Coffee</option>
                    <option value="Kertosono">Kertosono - Keyf Coffee</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="service-custom-notes" className="block text-xs font-mono font-bold uppercase text-[#1f1b11] mb-1">
                    Catatan Singkat (Opsional)
                  </label>
                  <input
                    id="service-custom-notes"
                    type="text"
                    value={customForm.notes}
                    onChange={(e) => setCustomForm({ ...customForm, notes: e.target.value })}
                    placeholder="Misal: Ulang tahun tanggal 20, tema retro"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#1f1b11] text-xs text-[#1f1b11] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  data-track="whatsapp"
                  className="w-full py-3 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center font-bold shadow-[2px_2px_0px_#1f1b11] cursor-pointer"
                >
                  Chat Admin buat Custom Frame
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Cara Memilih Layanan yang Tepat & Lokasi Layanan */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#fff8f0] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Cara memilih layanan yang tepat
              </h2>
              <div className="text-xs sm:text-sm text-[#5c403d] space-y-3 leading-relaxed">
                <p>
                  Kalau kamu hanya ingin foto cepat tanpa tema, pilih sesi photobox biasa. Kamu cukup datang dan langsung mencoba.
                </p>
                <p>
                  Kalau kamu punya acara dengan tema tertentu, atau ingin hasil foto yang membawa identitas kelompokmu, pilih custom frame. Ia membutuhkan sedikit persiapan, tapi hasilnya terasa lebih personal.
                </p>
                <p>
                  Kalau kamu ragu, tanyakan ke admin. Ceritakan acaranya, dan admin bisa membantu menjelaskan opsi yang tersedia.
                </p>
              </div>
            </div>

            <div className="bg-[#fff8f0] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Lokasi layanan
              </h2>
              <p className="text-xs text-[#5c403d] mb-4">
                Layanan TentoTen tersedia di empat kafe. Setiap lokasi punya halaman sendiri dengan alamat lengkap, jam buka, peta, dan petunjuk arah:
              </p>
              <ul className="space-y-2 text-xs font-body-sm text-[#1f1b11]">
                <li><a href="/location/madiun" className="text-[#960011] font-bold underline">Photobox di Madiun</a>: Sthana Coffee, 08.00 sampai 24.00.</li>
                <li><a href="/location/jombang" className="text-[#960011] font-bold underline">Photobox di Jombang</a>: Ethereal Coffee, 08.00 sampai 23.00.</li>
                <li><a href="/location/ponorogo" className="text-[#960011] font-bold underline">Photobox di Ponorogo</a>: Komahaus Coffee, 07.00 sampai 00.00.</li>
                <li><a href="/location/kertosono" className="text-[#960011] font-bold underline">Photobox di Kertosono</a>: Keyf Coffee, 10.00 sampai 22.00.</li>
              </ul>
              <p className="text-xs text-[#5c403d] mt-3">
                Kamu bisa membandingkan semuanya di halaman <a href="/location" className="text-[#960011] font-bold underline">Location</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Konten Kreator (#konten-kreator) */}
      <section className="w-full max-w-full overflow-hidden bg-[#fff8f0] py-12 border-b-2 border-[#1f1b11]">
        <div className="w-full min-w-0">
          <CreatorVideos variant="full" />
        </div>
      </section>

      {/* 6. FAQ Layanan & Tips Memaksimalkan */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[840px] mx-auto space-y-8">
          <div>
            <div className="text-center mb-8">
              <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                TANYA JAWAB
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
                Pertanyaan tentang layanan
              </h2>
            </div>

            <div className="space-y-4">
              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah harus reservasi sebelum datang?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Tidak. Photobox TentoTen berjalan walk-in. Kamu cukup datang saat kafe buka.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Berapa biaya per sesi?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Rp35.000 per sesi photobox, dibayar di lokasi via QRIS.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Berapa biaya custom frame?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Rp60.000, terpisah dari harga sesi.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah TentoTen mendesainkan frame untuk custom frame?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Tidak. Desain dibuat oleh kamu sendiri.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Bagaimana cara mengirim file desain?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Lewat chat WhatsApp dengan admin. Website tidak menerima unggahan file.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Berapa lama pengaturan custom frame?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Waktunya dikonfirmasi admin saat kamu menghubungi lewat WhatsApp (disarankan koordinasi minimal H-3).
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Metode pembayaran apa saja yang bisa dipakai?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Pembayaran dilakukan di lokasi dengan QRIS. Untuk memastikan metode yang tersedia, tanyakan ke admin.
                </p>
              </details>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#fff8f0] border-2 border-[#1f1b11] space-y-4">
            <div>
              <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold">
                Tips memaksimalkan kunjunganmu
              </h3>
              <p className="text-xs text-[#5c403d] mt-1 leading-relaxed">
                Datang dengan rencana sederhana membuat pengalaman lebih menyenangkan. Pilih cabang terdekat dan cek jam bukanya. Ajak satu atau dua orang supaya pose lebih mudah. Siapkan beberapa gaya, misalnya tenang, lucu, dan bebas. Bawa properti kecil kalau ingin hasil lebih berkarakter. Pesan minuman lebih dulu supaya kamu rileks saat berfoto. Kalau kamu memakai custom frame, pastikan semua urusan file sudah selesai bersama admin sebelum hari kunjungan.
              </p>
            </div>

            <div className="pt-3 border-t border-[#1f1b11]/10">
              <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold">
                Perbedaan walk-in dan custom frame dari sisi persiapan
              </h3>
              <p className="text-xs text-[#5c403d] mt-1 leading-relaxed">
                Photobox walk-in tidak butuh persiapan apa pun. Kamu hanya perlu datang. Custom frame butuh beberapa langkah kecil: menyiapkan desain, menghubungi admin, mengirim file, lalu menunggu konfirmasi bahwa frame siap. Karena itu, custom frame cocok untuk acara yang sudah direncanakan. Photobox biasa cocok untuk rencana dadakan. Keduanya memakai harga yang sudah tertulis jelas: Rp35.000 untuk sesi dan Rp60.000 untuk custom frame.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
