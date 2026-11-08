import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#960011] text-white pt-12 md:pt-16 pb-12 border-t-2 border-[#1f1b11]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#c0111e]">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="p-1 bg-white rounded shadow-sm border border-[#1f1b11] inline-flex items-center justify-center hover:opacity-95 transition-opacity"
                aria-label="TentoTen Beranda"
              >
                <img
                  alt="Logo Footer TentoTen Photobox"
                  className="h-8 w-auto object-contain"
                  width={120}
                  height={32}
                  loading="lazy"
                  src="/assets/aistudio/tentotenred_2ac7af73.svg"
                />
              </a>
              <span className="font-headline-md text-2xl uppercase text-white tracking-tight font-extrabold">
                TentoTen
              </span>
            </div>
            <p className="font-body-md text-sm text-[#ffd1cc] leading-relaxed">
              Cetak memori analog 35mm dengan sentuhan presisi mekanis. Hadir menyapa kamu di sudut-sudut kafe favorit Jawa Timur.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="https://instagram.com/10to10.photobox"
                target="_blank"
                rel="noopener noreferrer"
                data-track="instagram"
                className="inline-flex items-center gap-2 font-label-board text-xs uppercase tracking-wider text-white hover:text-[#ffd1cc] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                <span>@10TO10.PHOTOBOX</span>
              </a>
              <a
                href="https://tiktok.com/@tentoten"
                target="_blank"
                rel="noopener noreferrer"
                data-track="tiktok"
                className="inline-flex items-center gap-2 font-label-board text-xs uppercase tracking-wider text-white hover:text-[#ffd1cc] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">videocam</span>
                <span>@TENTOTEN (TIKTOK)</span>
              </a>
            </div>
          </div>

          {/* Branches Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <span className="font-headline-sm text-sm uppercase tracking-wider text-[#ffdad6] font-bold">
              CABANG & LOKASI BOOTH
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="/location/madiun"
                className="text-left p-3 bg-[#c0111e]/40 hover:bg-[#c0111e]/70 rounded-xl border border-[#c0111e] transition-colors block"
              >
                <span className="font-label-badge text-[10px] text-[#ffd1cc] uppercase tracking-wider block font-bold">
                  KOTA MADIUN
                </span>
                <span className="font-headline-sm text-sm text-white font-bold block mt-0.5">
                  Sthana Coffee
                </span>
                <span className="font-mono text-[11px] text-[#ffdad6] block mt-0.5">
                  08.00-24.00 WIB
                </span>
              </a>

              <a
                href="/location/jombang"
                className="text-left p-3 bg-[#c0111e]/40 hover:bg-[#c0111e]/70 rounded-xl border border-[#c0111e] transition-colors block"
              >
                <span className="font-label-badge text-[10px] text-[#ffd1cc] uppercase tracking-wider block font-bold">
                  KAB. JOMBANG
                </span>
                <span className="font-headline-sm text-sm text-white font-bold block mt-0.5">
                  Ethereal Coffee
                </span>
                <span className="font-mono text-[11px] text-[#ffdad6] block mt-0.5">
                  08.00-23.00 WIB
                </span>
              </a>

              <a
                href="/location/ponorogo"
                className="text-left p-3 bg-[#c0111e]/40 hover:bg-[#c0111e]/70 rounded-xl border border-[#c0111e] transition-colors block"
              >
                <span className="font-label-badge text-[10px] text-[#ffd1cc] uppercase tracking-wider block font-bold">
                  KAB. PONOROGO
                </span>
                <span className="font-headline-sm text-sm text-white font-bold block mt-0.5">
                  Komahaus Coffee
                </span>
                <span className="font-mono text-[11px] text-[#ffdad6] block mt-0.5">
                  07.00-24.00 WIB
                </span>
              </a>

              <a
                href="/location/kertosono"
                className="text-left p-3 bg-[#c0111e]/40 hover:bg-[#c0111e]/70 rounded-xl border border-[#c0111e] transition-colors block"
              >
                <span className="font-label-badge text-[10px] text-[#ffd1cc] uppercase tracking-wider block font-bold">
                  KAB. NGANJUK
                </span>
                <span className="font-headline-sm text-sm text-white font-bold block mt-0.5">
                  Keyf Coffee Kertosono
                </span>
                <span className="font-mono text-[11px] text-[#ffdad6] block mt-0.5">
                  10.00-22.00 WIB
                </span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-headline-sm text-sm uppercase tracking-wider text-[#ffdad6] font-bold">
              NAVIGASI & INFO
            </span>
            <ul className="flex flex-col gap-2.5 font-label-board text-xs uppercase tracking-wider text-[#ffd1cc]">
              <li>
                <a href="/product" className="hover:text-white transition-colors">
                  Harga & Custom Frame
                </a>
              </li>
              <li>
                <a href="/service" className="hover:text-white transition-colors">
                  Alur Layanan Booth
                </a>
              </li>
              <li>
                <a href="/location" className="hover:text-white transition-colors">
                  Daftar Semua Lokasi
                </a>
              </li>
              <li>
                <a href="/kemitraan" className="hover:text-white transition-colors">
                  Kemitraan & Pengadaan
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Pusat Bantuan & Kontak
                </a>
              </li>
              <li>
                <a href="/kebijakan-privasi" className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#ffd1cc]">
          <p>&copy; 2026 TentoTen Photobox. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <a href="/kebijakan-privasi" className="hover:text-white transition-colors">
              Kebijakan Privasi
            </a>
            <span>&bull;</span>
            <a
              href="https://wa.me/6281234567890?text=Halo%20TentoTen%20Photobox"
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp"
              className="hover:text-white transition-colors"
            >
              WhatsApp Bantuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
