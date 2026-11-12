import React from 'react';
import { CreatorVideos } from '../components/CreatorVideos';
import { LatestArticles } from '../components/LatestArticles';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full pt-20">
      {/* 1. HERO SECTION */}
      <section className="w-full bg-[#fff8f0] py-12 md:py-20 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-8 md:gap-12">
          <div className="flex flex-col items-center text-center gap-5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase max-w-full text-center">
              <span className="w-2 h-2 rounded-full bg-[#960011] animate-pulse shrink-0"></span>
              <span>PHOTOBOX ANALOG 35MM DI KAFE JAWA TIMUR</span>
            </div>
            {/* EXACT SINGLE H1 */}
            <h1 className="font-display-hero text-3xl sm:text-5xl md:text-6xl lg:text-[70px] text-[#1f1b11] font-black tracking-tight leading-[1.08] break-words max-w-full">
              Photobox di Kafe Madiun, Jombang, Ponorogo, dan Kertosono
            </h1>
            <p className="font-body-lg text-base md:text-lg text-[#5c403d] max-w-2xl mx-auto leading-relaxed break-words">
              TentoTen Photobox adalah photobox yang ditempatkan di dalam kafe. Kamu datang, pesan minuman, lalu foto di photobox sambil nongkrong. Satu sesi Rp35.000, dibayar di lokasi, tanpa booking dan tanpa antre lewat aplikasi. Saat ini TentoTen ada di empat kafe: Sthana Coffee di Madiun, Ethereal Coffee di Jombang, Komahaus Coffee di Ponorogo, dan Keyf Coffee di Kertosono.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-full">
              <a
                href="/location"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#c0111e] hover:bg-[#960011] text-white font-label-board text-xs uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-full border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all font-bold text-center"
              >
                Lihat Semua Lokasi Kafe
              </a>

              <a
                href="https://wa.me/6281330148068?text=Halo%20TentoTen%20Photobox,%20saya%20mau%20tanya%20info%20photobox"
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent hover:bg-[#f6eddc] text-[#960011] font-label-board text-xs uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-full border-2 border-[#960011] shadow-[4px_4px_0px_#960011] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all font-bold text-center"
              >
                Chat WhatsApp Admin
              </a>
            </div>

            {/* Strip Statistik Responsif 3-Kolom */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 border-t border-[#906f6c]/30 w-full max-w-md mx-auto text-center min-w-0">
              <div className="min-w-0 px-1 border-r border-[#906f6c]/30">
                <div className="font-headline-md text-xl sm:text-2xl md:text-3xl text-[#960011] font-extrabold tracking-tight truncate">
                  4 Cabang
                </div>
                <div className="font-body-sm text-[11px] sm:text-xs text-[#5c403d] leading-tight break-words mt-0.5">
                  Kafe di Jawa Timur
                </div>
              </div>
              <div className="min-w-0 px-1 border-r border-[#906f6c]/30">
                <div className="font-headline-md text-xl sm:text-2xl md:text-3xl text-[#960011] font-extrabold tracking-tight truncate">
                  Rp35.000
                </div>
                <div className="font-body-sm text-[11px] sm:text-xs text-[#5c403d] leading-tight break-words mt-0.5">
                  Per Sesi (2 Lembar)
                </div>
              </div>
              <div className="min-w-0 px-1">
                <div className="font-headline-md text-xl sm:text-2xl md:text-3xl text-[#960011] font-extrabold tracking-tight truncate">
                  Tanpa Antri
                </div>
                <div className="font-body-sm text-[11px] sm:text-xs text-[#5c403d] leading-tight break-words mt-0.5">
                  Langsung Walk-In
                </div>
              </div>
            </div>
          </div>

          {/* Hero Photostrip Showcase Banner */}
          <div className="w-full max-w-4xl bg-[#f6eddc] rounded-2xl border-2 border-[#1f1b11] p-4 sm:p-6 shadow-[4px_4px_0px_#1f1b11] sm:shadow-[6px_6px_0px_#1f1b11]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <div className="rounded-xl overflow-hidden border border-[#1f1b11] shadow-sm bg-neutral-900">
                <picture className="block w-full max-w-full">
                  <source
                    type="image/webp"
                    srcSet="https://lh3.googleusercontent.com/aida-public/AB6AXuBxWY9tynIhCj-mgfG_uTc9Vk-TMZFw1H7oOacMvswHOjGQI1O5p-3oVlQG6qMSQTLkuipKkaftvrtRRQn0fG0-HJ1vC6D8cczkJ4Yy7fd1e_99TEPR_--PT7MkHCrYvYLXEYTavLZ98c9at_-xWI-4NN-gB2uJiaLbK0tz9nRFMNRJ8q9sgB9fuHiaMr4MJo6930EFSO8bpBp-57YKefnyMwGWUb2RpJMa6r34AjkqxClrM7Q3ASZ2bw=rw"
                  />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxWY9tynIhCj-mgfG_uTc9Vk-TMZFw1H7oOacMvswHOjGQI1O5p-3oVlQG6qMSQTLkuipKkaftvrtRRQn0fG0-HJ1vC6D8cczkJ4Yy7fd1e_99TEPR_--PT7MkHCrYvYLXEYTavLZ98c9at_-xWI-4NN-gB2uJiaLbK0tz9nRFMNRJ8q9sgB9fuHiaMr4MJo6930EFSO8bpBp-57YKefnyMwGWUb2RpJMa6r34AjkqxClrM7Q3ASZ2bw"
                    alt="Strip foto hasil photobox TentoTen di kafe"
                    width={600}
                    height={450}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                </picture>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#1f1b11] shadow-sm bg-neutral-900">
                <picture className="block w-full max-w-full">
                  <source
                    type="image/webp"
                    srcSet="https://lh3.googleusercontent.com/aida-public/AB6AXuBAxf3-lN_oY3hUNVL_5IG-nuuhAcfdt25SB6LHWz6vdFZHb2r81PvAUbuL0RXdNW8QHb8XiMDj7FM7q3ZX2S1y0iN-P1I8WoC7Iw2VG5JsiiR4GIp5BTLnDvjEZVy7o02zAiK_x3sO4VMM7_fOUxvCyUOHRJnJgMviHxXGWjm_oQXbOhBMrjh7WqpxBHXC24qdW3MWJOUfvssOzMwC_WHTOZDYHtyIMoIETdXzcgDTslW-epnIxysQ_g=rw"
                  />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAxf3-lN_oY3hUNVL_5IG-nuuhAcfdt25SB6LHWz6vdFZHb2r81PvAUbuL0RXdNW8QHb8XiMDj7FM7q3ZX2S1y0iN-P1I8WoC7Iw2VG5JsiiR4GIp5BTLnDvjEZVy7o02zAiK_x3sO4VMM7_fOUxvCyUOHRJnJgMviHxXGWjm_oQXbOhBMrjh7WqpxBHXC24qdW3MWJOUfvssOzMwC_WHTOZDYHtyIMoIETdXzcgDTslW-epnIxysQ_g"
                    alt="Dua lembar cetak fisik foto strip 4 pose gaya 35mm"
                    width={600}
                    height={450}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                </picture>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#1f1b11] shadow-sm bg-neutral-900 hidden md:block">
                <picture className="block w-full max-w-full">
                  <source
                    type="image/webp"
                    srcSet="https://lh3.googleusercontent.com/aida-public/AB6AXuCltxkIOVmJEqz3znXtnrdX9JAwNuJmMf8EQ3-uu0jah4hQ386WnsBmPYye7ZqPPlgOxBixtUoZ1Z35ioM2Ud58PHFk1Wwb9aEK0Fx2HJBra4jd_XXHqWOSOi0T7hDW2PjQpQsgJiTjLU-XCSfarpran9F9YENuMO_JFfRlyNE4socXyDVpWUD80Egaq0un20uK6ZBenO2l5AgnKj-9GVW8SLTGK8O87wVhE9gq9NB-aNOeLV5PTW77YA=rw"
                  />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCltxkIOVmJEqz3znXtnrdX9JAwNuJmMf8EQ3-uu0jah4hQ386WnsBmPYye7ZqPPlgOxBixtUoZ1Z35ioM2Ud58PHFk1Wwb9aEK0Fx2HJBra4jd_XXHqWOSOi0T7hDW2PjQpQsgJiTjLU-XCSfarpran9F9YENuMO_JFfRlyNE4socXyDVpWUD80Egaq0un20uK6ZBenO2l5AgnKj-9GVW8SLTGK8O87wVhE9gq9NB-aNOeLV5PTW77YA"
                    alt="Momen berfoto di bilik photobox TentoTen bareng teman"
                    width={600}
                    height={450}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                </picture>
              </div>
            </div>
            <p className="font-body-sm text-xs text-[#5c403d] text-center mt-3">
              Kalau kamu sedang mencari photobox di Madiun, Jombang, Ponorogo, atau Kertosono, halaman ini merangkum semuanya: apa itu TentoTen, berapa harganya, bagaimana cara memakainya, di mana lokasinya, dan apa yang perlu kamu siapkan sebelum datang.
            </p>
          </div>
        </div>
      </section>

      {/* 2. APA ITU TENTOTEN & BERAPA HARGANYA */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Apa itu TentoTen */}
            <article className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[5px_5px_0px_#1f1b11]">
              <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                TENTANG KAMI
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black">
                Apa itu TentoTen Photobox?
              </h2>
              <div className="font-body-md text-xs sm:text-sm text-[#5c403d] mt-4 space-y-3 leading-relaxed">
                <p>
                  TentoTen Photobox menaruh photobox di tempat orang memang sudah suka berkumpul, yaitu kafe. Idenya sederhana. Orang yang nongkrong bareng teman, pasangan, atau keluarga biasanya ingin punya kenangan dari hari itu. Photobox membuat kenangan itu jadi hasil cetak yang bisa dibawa pulang, bukan sekadar file di galeri ponsel.
                </p>
                <p>
                  Karena photobox ada di dalam kafe, kamu tidak perlu pergi ke tempat khusus. Kamu cukup datang ke kafe yang bekerja sama dengan TentoTen, menikmati kopi atau makanan, lalu mencoba photobox kapan saja selama kafe buka. Tidak ada jam sesi yang harus dipesan lebih dulu, dan tidak ada akun yang harus dibuat.
                </p>
                <p>
                  Brand ini juga dikenal dengan akun resmi <strong className="text-[#960011]">@10to10.photobox</strong> di Instagram dan TikTok. Di sana kamu bisa melihat kabar terbaru dan melihat bagaimana orang lain memakai photobox TentoTen.
                </p>
              </div>
            </article>

            {/* Berapa harga photobox TentoTen */}
            <article className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[5px_5px_0px_#1f1b11]">
              <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                TRANSPARAN
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black">
                Berapa harga photobox TentoTen?
              </h2>
              <div className="font-body-md text-xs sm:text-sm text-[#5c403d] mt-4 space-y-3 leading-relaxed">
                <p>TentoTen hanya punya dua harga, dan keduanya jelas dari awal:</p>
                <div className="p-3 bg-[#f6eddc] rounded-xl border border-[#1f1b11]/15">
                  <p className="font-bold text-[#1f1b11]">
                    Sesi Photobox: Rp35.000 per sesi.
                  </p>
                  <p className="text-xs text-[#5c403d] mt-1">
                    Ini harga untuk satu sesi foto di photobox TentoTen di salah satu dari empat kafe. Kamu membayar di lokasi (termasuk 2 lembar cetak fisik + softfile).
                  </p>
                </div>
                <div className="p-3 bg-[#ffdad6]/60 rounded-xl border border-[#960011]/30">
                  <p className="font-bold text-[#960011]">
                    Custom Frame: Rp60.000.
                  </p>
                  <p className="text-xs text-[#5c403d] mt-1">
                    Ini untuk kamu yang ingin bingkai foto dengan desain buatan sendiri. Desainnya kamu yang siapkan, lalu admin TentoTen yang mengatur agar frame itu siap dipakai di photobox. Biaya ini terpisah dari harga sesi biasa.
                  </p>
                </div>
                <p>
                  Tidak ada paket tersembunyi, tidak ada biaya pendaftaran, dan tidak ada pemesanan online. Rincian lengkap ada di halaman <a href="/product" className="text-[#960011] font-bold underline hover:text-[#c0111e]">Product</a>.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 3. CARA KERJA & CUSTOM FRAME */}
      <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          {/* Cara Kerja: Tiga Langkah */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              PANDUAN PRAKTIS
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
              Cara kerja: tiga langkah dari datang sampai pulang
            </h2>
            <p className="font-body-md text-sm text-[#5c403d] mt-2">
              Alurnya dibuat sependek mungkin supaya kamu tidak bingung saat pertama kali mencoba.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <div className="bg-[#f6eddc] p-6 rounded-2xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <div className="w-10 h-10 rounded-full bg-[#960011] text-white flex items-center justify-center font-bold text-sm mb-4 font-mono">
                1
              </div>
              <h3 className="font-headline-sm text-lg text-[#1f1b11] font-bold">
                Datang ke kafe
              </h3>
              <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed">
                Pilih salah satu dari empat lokasi TentoTen. Tidak perlu booking. Jam buka mengikuti kafe, jadi cek dulu jam buka di halaman lokasi.
              </p>
            </div>

            <div className="bg-[#f6eddc] p-6 rounded-2xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <div className="w-10 h-10 rounded-full bg-[#960011] text-white flex items-center justify-center font-bold text-sm mb-4 font-mono">
                2
              </div>
              <h3 className="font-headline-sm text-lg text-[#1f1b11] font-bold">
                Foto di photobox
              </h3>
              <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed">
                Masuk ke photobox bersama temanmu, pilih frame yang tersedia, lalu mulai berfoto. Bayar di lokasi sesuai harga sesi Rp35.000 via QRIS.
              </p>
            </div>

            <div className="bg-[#f6eddc] p-6 rounded-2xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <div className="w-10 h-10 rounded-full bg-[#960011] text-white flex items-center justify-center font-bold text-sm mb-4 font-mono">
                3
              </div>
              <h3 className="font-headline-sm text-lg text-[#1f1b11] font-bold">
                Ambil hasilnya
              </h3>
              <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed">
                Hasil foto langsung jadi dalam hitungan detik, tinggal kamu ambil 2 lembar cetak fisik dan scan QR untuk softfile digitalnya.
              </p>
            </div>
          </div>

          {/* Custom Frame */}
          <div className="bg-[#fcf3e2] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[6px_6px_0px_#1f1b11] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#960011] text-white font-bold inline-block mb-2">
                DESAIN PERSONAL
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black">
                Custom Frame: bingkai dengan desain buatan kamu sendiri
              </h2>
              <p className="font-body-sm text-xs sm:text-sm text-[#5c403d] mt-2 leading-relaxed">
                Custom frame itu bingkai foto dengan desain buatan kamu sendiri, dipasang khusus untuk sesi photobox kamu. Cocok untuk ulang tahun, gathering kantor, acara komunitas, atau momen lainnya. Bedanya dengan frame biasa, desainnya kamu yang tentukan. Selama sesi berlangsung, semua hasil cetak otomatis memakai frame itu.
              </p>
              <p className="font-body-sm text-xs sm:text-sm text-[#5c403d] mt-2 leading-relaxed">
                Cara memesannya ada tiga langkah: hubungi admin lewat WhatsApp, kirim file desainmu langsung di chat WhatsApp, dan admin akan mengatur frame agar siap dipakai. Tidak ada unggah file di website. Semuanya lewat chat.
              </p>
            </div>
            <a
              href="/product"
              className="w-full sm:w-auto shrink-0 px-6 py-3.5 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center font-bold shadow-[3px_3px_0px_#1f1b11] transition-colors"
            >
              Lihat Format Custom Frame
            </a>
          </div>
        </div>
      </section>

      {/* 4. EMPAT LOKASI KAFE (INITIAL HTML CONTAINS FULL CARDS WITH LINKS) */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              TITIK BOOTH OPERASIONAL
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
              Empat lokasi photobox TentoTen di Jawa Timur
            </h2>
            <p className="font-body-md text-sm text-[#5c403d] mt-2">
              Berikut daftar lokasi lengkap dengan alamat dan jam buka. Klik nama kota untuk melihat halaman detail dan petunjuk arah.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Madiun Card */}
            <article className="bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11] p-5 shadow-[4px_4px_0px_#1f1b11] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#ffdad6] text-[#960011] font-bold inline-block mb-3">
                  KOTA MADIUN
                </span>
                <h3 className="font-headline-md text-xl text-[#1f1b11] font-black">
                  Sthana Coffee
                </h3>
                <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed">
                  Jl. Setiaki No. 27, Kota Madiun. Jam buka 08.00 sampai 24.00.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#1f1b11]/15">
                <a
                  href="/location/madiun"
                  className="font-label-board text-xs uppercase tracking-wider text-[#960011] hover:text-[#c0111e] font-bold inline-flex items-center gap-1.5"
                >
                  <span>Photobox di Madiun</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </article>

            {/* Jombang Card */}
            <article className="bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11] p-5 shadow-[4px_4px_0px_#1f1b11] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#ffdad6] text-[#960011] font-bold inline-block mb-3">
                  KAB. JOMBANG
                </span>
                <h3 className="font-headline-md text-xl text-[#1f1b11] font-black">
                  Ethereal Coffee
                </h3>
                <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed">
                  Jl. Kusuma Bangsa No. 23, Pulo Lor, Kec. Jombang, Kab. Jombang, Jawa Timur 61419. Jam buka 08.00 sampai 23.00.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#1f1b11]/15">
                <a
                  href="/location/jombang"
                  className="font-label-board text-xs uppercase tracking-wider text-[#960011] hover:text-[#c0111e] font-bold inline-flex items-center gap-1.5"
                >
                  <span>Photobox di Jombang</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </article>

            {/* Ponorogo Card */}
            <article className="bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11] p-5 shadow-[4px_4px_0px_#1f1b11] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#ffdad6] text-[#960011] font-bold inline-block mb-3">
                  KAB. PONOROGO
                </span>
                <h3 className="font-headline-md text-xl text-[#1f1b11] font-black">
                  Komahaus Coffee
                </h3>
                <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed">
                  Jl. Semeru No. 52, Nologaten, Kec. Ponorogo, Kab. Ponorogo. Jam buka 07.00 sampai 00.00.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#1f1b11]/15">
                <a
                  href="/location/ponorogo"
                  className="font-label-board text-xs uppercase tracking-wider text-[#960011] hover:text-[#c0111e] font-bold inline-flex items-center gap-1.5"
                >
                  <span>Photobox di Ponorogo</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </article>

            {/* Kertosono Card */}
            <article className="bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11] p-5 shadow-[4px_4px_0px_#1f1b11] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#ffdad6] text-[#960011] font-bold inline-block mb-3">
                  KAB. NGANJUK
                </span>
                <h3 className="font-headline-md text-xl text-[#1f1b11] font-black">
                  Keyf Coffee Kertosono
                </h3>
                <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed">
                  Jl. Apel Gg. I, Pelem, Kutorejo, Kec. Kertosono, Kab. Nganjuk, Jawa Timur 64314. Jam buka 10.00 sampai 22.00.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#1f1b11]/15">
                <a
                  href="/location/kertosono"
                  className="font-label-board text-xs uppercase tracking-wider text-[#960011] hover:text-[#c0111e] font-bold inline-flex items-center gap-1.5"
                >
                  <span>Photobox di Kertosono</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </article>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-[#5c403d]">
              Jam buka photobox mengikuti jam buka kafe tempatnya berada. Seluruh lokasi bisa dilihat sekaligus di halaman <a href="/location" className="text-[#960011] font-bold underline hover:text-[#c0111e]">Location</a>, lengkap dengan peta gabungan.
            </p>
          </div>
        </div>
      </section>

      {/* 5. KENAPA MEMILIH PHOTOBOX DI KAFE & TIPS HASIL FOTO */}
      <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-[#fcf3e2] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black mb-4">
                Kenapa memilih photobox di kafe?
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-[#5c403d] leading-relaxed">
                <p>
                  Ada beberapa alasan orang suka foto di photobox yang ada di kafe dibanding tempat foto lain:
                </p>
                <p>
                  <strong>Pertama, kamu tidak perlu membuat rencana khusus.</strong> Kamu sudah akan ke kafe untuk nongkrong, jadi foto bisa jadi bagian dari acara yang sama.
                </p>
                <p>
                  <strong>Kedua, suasananya santai.</strong> Kamu foto di sela obrolan, tanpa ada yang mengatur pose kamu.
                </p>
                <p>
                  <strong>Ketiga, hasilnya bisa dipegang.</strong> Selembar hasil cetak gampang diselipkan di dompet, ditempel di jurnal, atau diberikan ke teman sebagai kenang-kenangan.
                </p>
                <p>
                  <strong>Keempat, harganya jelas.</strong> Dengan Rp35.000 per sesi, kamu tahu berapa yang akan dibayar sebelum masuk ke photobox. Dan kelima, kamu bisa datang tanpa janji. Kalau tiba-tiba ada waktu luang, tinggal mampir.
                </p>
              </div>
            </div>

            <div className="bg-[#fcf3e2] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black mb-4">
                Tips supaya hasil fotomu enak dilihat
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-[#5c403d] leading-relaxed">
                <p>
                  Beberapa kebiasaan kecil bisa membuat hasil photobox lebih memuaskan, dan semuanya tidak butuh persiapan khusus:
                </p>
                <p>
                  <strong>Datang berdua atau bertiga</strong> membuat pose lebih mudah dan ekspresi lebih natural. Kalau kamu datang sendiri, itu juga tidak masalah. Foto sendiri di photobox sudah jadi kebiasaan banyak orang.
                </p>
                <p>
                  <strong>Pikirkan dulu urutan gaya</strong> sebelum masuk. Misalnya satu pose tenang, satu pose lucu, satu pose bergaya, dan satu pose bebas. Dengan begitu kamu tidak kehabisan ide di tengah sesi.
                </p>
                <p>
                  <strong>Bawa properti kecil</strong> kalau mau, seperti kacamata, topi, atau minuman dari kafe. Properti sederhana sering membuat hasil foto lebih berkarakter.
                </p>
                <p>
                  <strong>Terakhir, santai saja.</strong> Hasil terbaik biasanya datang dari momen saat kamu tertawa, bukan saat berpose kaku.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. ARTIKEL TERBARU */}
      <LatestArticles
        count={3}
        variant="featured"
        bgClass="bg-[#fcf3e2]"
      />

      {/* 6. KONTEN KREATOR */}
      <CreatorVideos variant="preview" />

      {/* 6B. PUNYA KAFE / TEMPAT USAHA */}
      <section className="w-full bg-[#fcf3e2] py-12 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          {/* Punya Kafe atau Tempat Usaha */}
          <div className="bg-[#ffdad6]/40 rounded-3xl border-2 border-[#960011] p-6 sm:p-8 shadow-[5px_5px_0px_#960011] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#960011] text-white font-bold inline-block mb-2">
                KERJA SAMA BISNIS
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black">
                Punya kafe atau tempat usaha?
              </h2>
              <p className="font-body-sm text-xs sm:text-sm text-[#5c403d] mt-2 leading-relaxed">
                Kalau kamu pemilik kafe atau tempat usaha dan tertarik menghadirkan photobox di tempatmu, TentoTen membuka jalur kerja sama. Halaman <a href="/kemitraan" className="text-[#960011] font-bold underline">Kemitraan photobox</a> menjelaskan dua jalur yang tersedia (kemitraan penempatan booth & pengadaan mandiri) dan cara menghubungi admin.
              </p>
            </div>
            <a
              href="/kemitraan"
              className="w-full sm:w-auto shrink-0 px-6 py-3.5 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center font-bold shadow-[3px_3px_0px_#1f1b11] transition-colors"
            >
              Pelajari Kemitraan Photobox
            </a>
          </div>
        </div>
      </section>

      {/* 7. FAQ PERTANYAAN YANG SERING DITANYAKAN */}
      <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[840px] mx-auto">
          <div className="text-center mb-10">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              TANYA JAWAB
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
              Pertanyaan yang sering ditanyakan
            </h2>
            <p className="font-body-md text-sm text-[#5c403d] mt-2">
              Jawaban cepat seputar harga, alur, dan jam operasional.
            </p>
          </div>

          <div className="space-y-4">
            <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
              <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                <span>Apakah harus booking sebelum datang?</span>
                <span className="material-symbols-outlined text-neutral-500">expand_more</span>
              </summary>
              <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                Tidak. TentoTen berjalan tanpa booking dan tanpa reservasi. Kamu cukup datang ke salah satu kafe saat jam buka.
              </p>
            </details>

            <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
              <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                <span>Berapa harga satu sesi photobox?</span>
                <span className="material-symbols-outlined text-neutral-500">expand_more</span>
              </summary>
              <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                Rp35.000 per sesi. Pembayaran dilakukan di lokasi via sensor QRIS otomatis.
              </p>
            </details>

            <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
              <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                <span>Apa bedanya sesi biasa dan custom frame?</span>
                <span className="material-symbols-outlined text-neutral-500">expand_more</span>
              </summary>
              <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                Sesi biasa memakai frame yang sudah tersedia. Custom frame memakai desain buatan kamu sendiri dan biayanya Rp60.000, terpisah dari harga sesi.
              </p>
            </details>

            <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
              <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                <span>Bagaimana cara memesan custom frame?</span>
                <span className="material-symbols-outlined text-neutral-500">expand_more</span>
              </summary>
              <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                Hubungi admin lewat WhatsApp, kirim file desainmu di chat, lalu admin mengatur frame agar siap dipakai di mesin cabang kafe yang kamu tuju.
              </p>
            </details>

            <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
              <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                <span>Jam berapa photobox bisa dipakai?</span>
                <span className="material-symbols-outlined text-neutral-500">expand_more</span>
              </summary>
              <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                Mengikuti jam buka kafe. Madiun 08.00 sampai 24.00, Jombang 08.00 sampai 23.00, Ponorogo 07.00 sampai 00.00, dan Kertosono 10.00 sampai 22.00.
              </p>
            </details>

            <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
              <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                <span>Metode pembayaran apa yang bisa dipakai?</span>
                <span className="material-symbols-outlined text-neutral-500">expand_more</span>
              </summary>
              <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                Pembayaran dilakukan di lokasi dengan QRIS. Kalau kamu ingin memastikan metode pembayaran yang tersedia di kafe tertentu, tanyakan ke admin lewat WhatsApp.
              </p>
            </details>
          </div>

          {/* Mulai Dari Lokasi Terdekat */}
          <div className="mt-12 text-center p-6 rounded-2xl bg-[#f6eddc] border-2 border-[#1f1b11]">
            <h3 className="font-headline-sm text-lg text-[#1f1b11] font-bold">
              Mulai dari lokasi terdekat
            </h3>
            <p className="text-xs text-[#5c403d] mt-2 max-w-xl mx-auto leading-relaxed">
              Pilih kota yang paling dekat denganmu, cek jam buka, lalu datang. Kalau butuh bantuan memilih lokasi atau ingin bertanya soal custom frame, chat admin TentoTen lewat WhatsApp. Kamu juga bisa mengikuti kabar terbaru di Instagram dan TikTok @10to10.photobox.
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <a
                href="/location"
                className="px-6 py-2.5 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl font-bold shadow-[2px_2px_0px_#1f1b11]"
              >
                Pilih Lokasi Kafe
              </a>
              <a
                href="/contact"
                className="px-6 py-2.5 bg-[#fff8f0] hover:bg-[#eae2d1] text-[#1f1b11] font-label-board text-xs uppercase tracking-wider rounded-xl font-bold border border-[#1f1b11]"
              >
                Hubungi Kontak
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
