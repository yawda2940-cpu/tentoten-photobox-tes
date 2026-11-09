import React from 'react';
import { PageId } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fff8f0] border-2 border-[#1f1b11] rounded-2xl max-w-md w-full p-6 shadow-[6px_6px_0px_#1f1b11] relative flex flex-col gap-5">
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#1f1b11] bg-[#f6eddc] flex items-center justify-center text-[#1f1b11] hover:bg-[#eae2d1] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b border-[#1f1b11]/20 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#960011] text-white flex items-center justify-center border-2 border-[#1f1b11] shadow-[2px_2px_0px_#1f1b11]">
            <span className="material-symbols-outlined text-3xl">photo_camera</span>
          </div>
          <div>
            <span className="font-label-badge text-[11px] uppercase tracking-wider text-[#960011] font-bold block">
              BENTO ADMIN RESMI
            </span>
            <h3 className="font-headline-sm text-lg uppercase font-bold text-[#1f1b11]">
              TentoTen Photobox
            </h3>
            <span className="font-mono text-xs text-[#5c403d]">
              #lintaswaktulintasruang
            </span>
          </div>
        </div>

        {/* Info Content */}
        <div className="flex flex-col gap-3 font-body-sm text-xs text-[#5c403d] leading-relaxed">
          <div className="p-3 bg-[#f6eddc] rounded-xl border border-[#1f1b11]/30">
            <strong className="text-[#1f1b11] block mb-1">
              Photobox Analog 35mm di Jawa Timur
            </strong>
            Layanan photobox mandiri terintegrasi di kafe pilihan (Madiun, Jombang, Ponorogo, Kertosono). Walk-in 100% tanpa reservasi tiket.
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 bg-[#fcf3e2] rounded-lg border border-[#1f1b11]/20">
              <span className="text-[10px] uppercase font-bold text-[#960011] block">Tarif Reguler</span>
              <span className="font-headline-sm text-base text-[#1f1b11] font-bold">Rp35.000</span>
              <span className="text-[10px] text-[#5c403d]">Cetak + QR softfile</span>
            </div>
            <div className="p-2.5 bg-[#fcf3e2] rounded-lg border border-[#1f1b11]/20">
              <span className="text-[10px] uppercase font-bold text-[#960011] block">Custom Frame</span>
              <span className="font-headline-sm text-base text-[#1f1b11] font-bold">Rp60.000</span>
              <span className="text-[10px] text-[#5c403d]">Event & komunitas</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <a
            href="https://wa.me/6281330148068?text=Halo%20Bento%20Admin%20TentoTen,%20saya%20mau%20tanya%20info%20photobox"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#960011] hover:bg-[#c0111e] text-white py-3 rounded-full font-label-board text-xs uppercase tracking-wider font-bold border-2 border-[#1f1b11] shadow-[2px_2px_0px_#1f1b11] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Chat Bento Admin di WhatsApp</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onNavigate('location');
            }}
            className="w-full py-2.5 bg-[#f6eddc] hover:bg-[#eae2d1] text-[#1f1b11] rounded-full font-label-board text-xs uppercase tracking-wider font-bold border border-[#1f1b11] transition-all cursor-pointer"
          >
            Lihat 4 Lokasi Kafe
          </button>
        </div>
      </div>
    </div>
  );
};
