import React from 'react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full pt-20">
      <section className="w-full bg-[#fff8f0] py-20 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11] text-center">
        <div className="max-w-[720px] mx-auto flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-[#ffdad6] text-[#960011] flex items-center justify-center border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11] mb-6">
            <span className="material-symbols-outlined text-4xl">search_off</span>
          </div>

          <span className="font-mono text-xs uppercase tracking-wider text-[#960011] font-bold block mb-2">
            STATUS KODE 404
          </span>

          <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1f1b11] font-black tracking-tight leading-tight mb-4">
            404 - Halaman Tidak Ditemukan
          </h1>

          <p className="font-body-lg text-base text-[#5c403d] max-w-lg mx-auto leading-relaxed mb-8">
            Halaman yang Anda cari tidak dapat ditemukan atau alamat URL telah dipindahkan. Silakan kembali ke beranda atau temukan cabang photobox kami di kafe terdekat.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center justify-center bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider px-6 py-3.5 rounded-full border border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] transition-transform active:translate-x-0.5 active:translate-y-0.5 font-bold"
            >
              Kembali ke Beranda
            </a>
            <a
              href="/location"
              className="inline-flex items-center justify-center bg-[#f6eddc] hover:bg-[#eae2d1] text-[#1f1b11] font-label-board text-xs uppercase tracking-wider px-6 py-3.5 rounded-full border border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] transition-transform active:translate-x-0.5 active:translate-y-0.5 font-bold"
            >
              Lihat 4 Lokasi Kafe
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
