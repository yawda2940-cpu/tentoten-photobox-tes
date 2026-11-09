import React, { useState } from 'react';
import { LOCATIONS } from '../site.config';

export const LocationPage: React.FC = () => {
  const [filterCity, setFilterCity] = useState<string>('all');
  const locationList = Object.values(LOCATIONS);

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
                Lokasi Photobox
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] text-xs font-bold tracking-widest uppercase mb-3">
              4 TITIK BOOTH RESMI JAWA TIMUR
            </div>
            {/* EXACT SINGLE H1 */}
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1f1b11] font-black tracking-tight leading-tight">
              Lokasi TentoTen Photobox di Jawa Timur
            </h1>
            <p className="font-body-lg text-base md:text-lg text-[#5c403d] mt-4 leading-relaxed">
              TentoTen Photobox ada di empat kafe di Jawa Timur: Sthana Coffee di Madiun, Ethereal Coffee di Jombang, Komahaus Coffee di Ponorogo, dan Keyf Coffee di Kertosono. Di halaman ini kamu bisa melihat alamat lengkap, jam buka, dan peta semua lokasi sekaligus, lalu membuka halaman detail tiap cabang untuk petunjuk arah dan informasi lebih lengkap. Photobox TentoTen bisa dipakai tanpa booking. Kamu datang saat kafe buka, foto, dan membayar di lokasi. Satu sesi Rp35.000, sedangkan custom frame Rp60.000.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Peta Semua Lokasi */}
      <section className="w-full bg-[#fcf3e2] py-10 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[6px_6px_0px_#1f1b11]">
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black mb-2">
              Peta semua lokasi
            </h2>
            <p className="font-body-sm text-xs sm:text-sm text-[#5c403d] mb-5">
              Peta gabungan di bagian ini menandai keempat kafe. Gunakan untuk melihat posisi tiap kota dan memilih cabang yang paling dekat. Setiap kartu lokasi di bawahnya juga punya tombol &quot;Buka di Google Maps&quot; supaya kamu bisa langsung mendapat rute dari lokasimu.
            </p>
            <div className="rounded-2xl overflow-hidden border border-[#1f1b11] bg-neutral-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d506086.27552553196!2d111.75!3d-7.65!3m2!1i1024!2i768!4f13.1!2m1!1sSthana%20Coffee%20Madiun%20Ethereal%20Coffee%20Jombang%20Komahaus%20Ponorogo%20Keyf%20Kertosono!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                title="Peta Semua Lokasi Photobox TentoTen Jawa Timur"
                width="100%"
                height="380"
                loading="lazy"
                className="w-full h-80 sm:h-96 border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Daftar Lokasi Photobox TentoTen (Filter & Cards) */}
      <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                KUNJUNGI SEKARANG
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
                Daftar lokasi photobox TentoTen
              </h2>
            </div>
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Semua Kota' },
                { id: 'madiun', label: 'Madiun' },
                { id: 'jombang', label: 'Jombang' },
                { id: 'ponorogo', label: 'Ponorogo' },
                { id: 'kertosono', label: 'Kertosono' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCity(tab.id)}
                  className={`px-3 py-1.5 rounded-full font-label-board text-xs uppercase tracking-wider transition-all border border-[#1f1b11] cursor-pointer ${
                    filterCity === tab.id
                      ? 'bg-[#960011] text-white shadow-[2px_2px_0px_#1f1b11]'
                      : 'bg-[#fcf3e2] text-[#1f1b11] hover:bg-[#eae2d1]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locationList.map((loc) => {
              const isHidden = filterCity !== 'all' && filterCity !== loc.slug;
              return (
                <article
                  key={loc.slug}
                  className={`bg-[#fcf3e2] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[6px_6px_0px_#1f1b11] flex flex-col justify-between transition-all ${
                    isHidden ? 'hidden md:hidden' : 'block'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#960011] font-bold">
                        {loc.regency.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-[#5c403d] flex items-center gap-1 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        BOOTH AKTIF
                      </span>
                    </div>

                    <h3 className="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black">
                      Photobox di {loc.name}: {loc.cafeName}
                    </h3>

                    {/* Image Preview */}
                    {loc.images[0] && (
                      <div className="mt-4 rounded-2xl overflow-hidden border border-[#1f1b11] shadow-sm bg-neutral-900">
                        <picture>
                          <source type="image/webp" srcSet={loc.images[0].webpUrl || `${loc.images[0].url}=rw`} />
                          <img
                            src={loc.images[0].url}
                            alt={loc.images[0].alt}
                            width={600}
                            height={400}
                            loading={loc.slug === 'madiun' ? 'eager' : 'lazy'}
                            fetchPriority={loc.slug === 'madiun' ? 'high' : 'low'}
                            decoding="async"
                            className="w-full h-48 sm:h-56 object-cover"
                          />
                        </picture>
                      </div>
                    )}

                    <div className="mt-5 space-y-2 font-body-sm text-xs text-[#1f1b11]">
                      <div className="p-3 bg-[#fff8f0] rounded-xl border border-[#1f1b11]/15">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#5c403d] block font-bold">
                          ALAMAT:
                        </span>
                        <p className="font-medium mt-0.5 text-neutral-900">
                          {loc.address}
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#fff8f0] rounded-xl border border-[#1f1b11]/15">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#5c403d] font-bold">
                          JAM BUKA:
                        </span>
                        <span className="font-mono font-bold text-[#960011]">
                          {loc.hours} WIB
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#1f1b11]/15 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={`/location/${loc.slug}`}
                      className="w-full sm:flex-1 py-3 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center block transition-colors shadow-[2px_2px_0px_#1f1b11] font-bold"
                    >
                      Buka Detail & Peta {loc.name}
                    </a>
                    <a
                      href={loc.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="google-maps"
                      className="w-full sm:w-auto px-4 py-3 bg-[#fff8f0] hover:bg-[#eae2d1] text-[#1f1b11] font-label-board text-xs uppercase tracking-wider rounded-xl text-center border border-[#1f1b11] flex items-center justify-center gap-1.5 transition-colors font-bold"
                    >
                      <span className="material-symbols-outlined text-sm">directions</span>
                      <span>Google Maps</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Panduan Memilih Lokasi & Yang Perlu Diketahui */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-[#fff8f0] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Cara memilih lokasi yang tepat
              </h2>
              <div className="text-xs sm:text-sm text-[#5c403d] space-y-3 leading-relaxed">
                <p>
                  Pilih berdasarkan kota yang paling dekat. Setiap cabang memiliki photobox yang sama dengan harga yang sama, yaitu Rp35.000 per sesi dan Rp60.000 untuk custom frame. Tidak ada perbedaan harga antar kota.
                </p>
                <p>
                  Pertimbangkan juga jam buka. Kalau kamu ingin foto pagi hari, Ponorogo mulai paling awal pukul 07.00, disusul Madiun dan Jombang pukul 08.00. Kalau kamu baru bisa datang larut malam, Madiun buka sampai 24.00 dan Ponorogo sampai 00.00. Cabang Kertosono buka pukul 10.00 sampai 22.00, jadi cocok untuk kunjungan siang dan sore.
                </p>
                <p>
                  Terakhir, pikirkan siapa yang ikut. Kalau kamu membawa rombongan dari beberapa kota, pilih lokasi yang paling mudah dijangkau semua orang.
                </p>
              </div>
            </div>

            <div className="bg-[#fff8f0] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Yang perlu kamu tahu sebelum datang
              </h2>
              <div className="text-xs sm:text-sm text-[#5c403d] space-y-2.5 leading-relaxed">
                <p><strong>Tidak perlu booking:</strong> Photobox TentoTen walk-in. Kamu datang, foto, dan membayar di lokasi.</p>
                <p><strong>Jam buka mengikuti kafe:</strong> Photobox tersedia selama kafe buka. Cek jam buka tiap cabang di atas sebelum berangkat.</p>
                <p><strong>Alamat dan jam buka adalah teks:</strong> Kamu bisa menyalinnya dan membagikannya ke teman. Setiap halaman lokasi juga punya tombol &quot;Buka di Google Maps&quot;.</p>
                <p><strong>Ada pertanyaan?</strong> Hubungi admin lewat WhatsApp untuk memastikan kondisi terbaru, misalnya jam buka di hari khusus atau ketersediaan tempat.</p>
              </div>
            </div>
          </div>

          {/* Custom Frame di Empat Lokasi */}
          <div className="mt-8 bg-[#fff8f0] p-6 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11]">
            <h3 className="font-headline-sm text-lg text-[#1f1b11] font-bold mb-2">
              Custom Frame di empat lokasi
            </h3>
            <p className="text-xs text-[#5c403d] leading-relaxed">
              Custom frame bisa dipakai di photobox cabang yang kamu pilih. Kamu menyiapkan file desainmu, mengirimkannya ke admin lewat WhatsApp, lalu admin men-setting frame agar siap dipakai. Biayanya Rp60.000. Saat memesan, kamu akan diminta memilih cabang tujuan, jadi tentukan lokasi lebih dulu sebelum mengisi form di halaman <a href="/product" className="text-[#960011] font-bold underline">Product</a>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FAQ Lokasi & Info Kemitraan */}
      <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[840px] mx-auto space-y-8">
          <div>
            <div className="text-center mb-8">
              <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                TANYA JAWAB
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
                Pertanyaan tentang lokasi
              </h2>
            </div>

            <div className="space-y-4">
              <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Di mana saja photobox TentoTen?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Di Madiun (Sthana Coffee), Jombang (Ethereal Coffee), Ponorogo (Komahaus Coffee), dan Kertosono (Keyf Coffee).
                </p>
              </details>

              <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah harga sama di semua lokasi?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Ya. Sesi photobox Rp35.000 dan custom frame Rp60.000 di semua cabang tanpa perbedaan.
                </p>
              </details>

              <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah ada lokasi baru?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Kabar lokasi baru diumumkan lewat Instagram dan TikTok @10to10.photobox.
                </p>
              </details>

              <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Bagaimana kalau kafe tutup lebih awal?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Jam buka mengikuti kafe. Untuk memastikan, chat admin lewat WhatsApp sebelum berangkat.
                </p>
              </details>

              <details className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah ada photobox di kota lain?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Saat ini hanya ada di empat kota di atas (Madiun, Jombang, Ponorogo, Kertosono Nganjuk).
                </p>
              </details>
            </div>
          </div>

          {/* Punya Kafe & Info Kemitraan */}
          <div className="p-6 rounded-2xl bg-[#fcf3e2] border-2 border-[#1f1b11] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold">
                Punya kafe dan ingin menghadirkan photobox?
              </h3>
              <p className="text-xs text-[#5c403d] mt-1">
                Kalau kamu pemilik kafe atau tempat usaha di Jawa Timur dan tertarik bekerja sama, lihat halaman kemitraan.
              </p>
            </div>
            <a
              href="/kemitraan"
              className="whitespace-nowrap px-5 py-2.5 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl font-bold shadow-[2px_2px_0px_#1f1b11]"
            >
              Halaman Kemitraan
            </a>
          </div>

          <div className="text-center text-xs text-[#5c403d]">
            Ada pertanyaan seputar lokasi dan jam buka? Tanyakan langsung ke tim TentoTen lewat <a href="https://wa.me/6281330148068" target="_blank" rel="noopener noreferrer" className="text-[#960011] font-bold underline">WhatsApp</a> sebelum mampir. Untuk pertanyaan umum, gunakan form di halaman <a href="/contact" className="text-[#960011] font-bold underline">Contact</a>.
          </div>
        </div>
      </section>
    </div>
  );
};
