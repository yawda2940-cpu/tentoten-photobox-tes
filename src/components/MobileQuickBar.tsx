import React from 'react';

export const MobileQuickBar: React.FC = () => {
  return (
    <aside className="md:hidden fixed bottom-0 left-0 right-0 z-98 w-full max-w-full bg-[#fcf3e2] border-t-2 border-[#1f1b11] p-3 px-4 flex items-center gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <a
        href="/location"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#eae2d1] hover:bg-[#e2d9c9] text-[#1f1b11] font-label-board text-xs uppercase tracking-wider rounded-full border-2 border-[#1f1b11] shadow-[2px_2px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center"
      >
        <span className="material-symbols-outlined text-[18px]">storefront</span>
        <span>LOKASI</span>
      </a>

      <a
        href="https://wa.me/6281330148068?text=Halo%20TentoTen%20Photobox,%20saya%20mau%20tanya%20info%20photobox"
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#c0111e] hover:bg-[#960011] text-white font-label-board text-xs uppercase tracking-wider rounded-full border-2 border-[#1f1b11] shadow-[2px_2px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center"
      >
        <span className="material-symbols-outlined text-[18px]">chat</span>
        <span>WHATSAPP</span>
      </a>
    </aside>
  );
};
