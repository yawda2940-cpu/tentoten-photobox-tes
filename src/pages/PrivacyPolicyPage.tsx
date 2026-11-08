import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full pt-20">
      {/* 1. Header & Breadcrumb */}
      <section className="w-full bg-[#fff8f0] py-10 md:py-16 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          {/* Visible Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5c403d]">
              <li>
                <a href="/" className="hover:text-[#960011] transition-colors">
                  Beranda
                </a>
              </li>
              <li>/</li>
              <li className="text-[#960011] font-bold" aria-current="page">
                Kebijakan Privasi
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] text-xs font-bold tracking-widest uppercase mb-3">
              KEAMANAN DATA & PRIVASI PENGUNJUNG
            </div>
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1f1b11] font-black tracking-tight leading-tight">
              Kebijakan Privasi TentoTen Photobox
            </h1>
            <p className="font-body-lg text-base md:text-lg text-[#5c403d] mt-4 leading-relaxed">
              Kebijakan privasi TentoTen Photobox menjelaskan bagaimana data foto fisik, unduhan digital via QR code, dan informasi pengunjung dikelola dengan aman.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Isi Dokumen Kebijakan Privasi */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[840px] mx-auto bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-10 shadow-[6px_6px_0px_#1f1b11] space-y-8 font-body-sm text-xs sm:text-sm text-[#1f1b11] leading-relaxed">
          <div>
            <h2 className="font-headline-lg text-xl sm:text-2xl text-[#1f1b11] font-black mb-3">
              1. Komitmen Privasi Kami
            </h2>
            <p className="text-[#5c403d]">
              TentoTen Photobox menghargai setiap privasi dan kepercayaan pengunjung yang menggunakan fasilitas booth foto kami di seluruh kafe mitra Jawa Timur. Halaman ini menjelaskan ketentuan pengelolaan data hasil foto dan transaksi Anda.
            </p>
          </div>

          <div>
            <h2 className="font-headline-lg text-xl sm:text-2xl text-[#1f1b11] font-black mb-3">
              2. Pengambilan & Penyimpanan File Foto Digital
            </h2>
            <p className="text-[#5c403d]">
              Saat Anda berfoto di bilik mesin photobox, foto yang diambil akan langsung dicetak pada kertas foto fisik di lokasi. File digital (foto JPG dan animasi GIF) akan diunggah sementara ke server cloud yang aman agar dapat diunduh melalui pemindaian QR code yang tertera pada struk bukti foto Anda.
            </p>
            <p className="text-[#5c403d] mt-2">
              File digital ini disimpan maksimal selama <strong>48 jam</strong> sejak sesi pemotretan. Setelah 48 jam, file digital akan dihapus secara otomatis dan permanen dari server penyimpanan kami demi menjaga kerahasiaan foto Anda.
            </p>
          </div>

          <div>
            <h2 className="font-headline-lg text-xl sm:text-2xl text-[#1f1b11] font-black mb-3">
              3. Transaksi Pembayaran QRIS
            </h2>
            <p className="text-[#5c403d]">
              Semua transaksi pembayaran sesi foto dilakukan secara mandiri di mesin photobox menggunakan standar QRIS nasional. TentoTen Photobox tidak pernah meminta, mengakses, atau menyimpan data rahasia perbankan seperti nomor kartu debit/kredit, PIN, atau kata sandi dompet digital pengunjung.
            </p>
          </div>

          <div>
            <h2 className="font-headline-lg text-xl sm:text-2xl text-[#1f1b11] font-black mb-3">
              4. Perlindungan dan Penggunaan Foto
            </h2>
            <p className="text-[#5c403d]">
              TentoTen Photobox tidak akan pernah membagikan, mempublikasikan, atau menjual foto pribadi pengunjung ke pihak ketiga mana pun tanpa persetujuan tertulis eksplisit dari pengunjung yang bersangkutan.
            </p>
          </div>

          <div>
            <h2 className="font-headline-lg text-xl sm:text-2xl text-[#1f1b11] font-black mb-3">
              5. Hubungi Kami
            </h2>
            <p className="text-[#5c403d]">
              Jika Anda memiliki pertanyaan atau ingin mengajukan permohonan penghapusan file foto digital lebih cepat sebelum 48 jam, silakan hubungi Bento Admin kami melalui WhatsApp di <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-[#960011] underline font-bold">+62 812-3456-7890</a> atau kunjungi halaman <a href="/contact" className="text-[#960011] underline font-bold">Kontak Kami</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
