import React, { useState } from 'react';

interface HeaderProps {
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'BERANDA' },
    { href: '/product', label: 'PRODUK' },
    { href: '/service', label: 'LAYANAN' },
    { href: '/location', label: 'LOKASI' },
    { href: '/kemitraan', label: 'KEMITRAAN' },
    { href: '/contact', label: 'HUBUNGI KAMI' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 md:px-8 lg:px-12 pt-3 pointer-events-none">
      <div className="max-w-[1240px] mx-auto pointer-events-auto">
        <div className="h-16 md:h-20 bg-[#fcf3e2] rounded-full px-4 md:px-6 flex items-center justify-between shadow-[4px_4px_0px_#1f1b11] border-2 border-[#1f1b11] transition-all">
          {/* Logo & Brand */}
          <a
            href="/"
            className="flex items-center gap-2 group shrink-0 text-left focus:outline-none"
            aria-label="TentoTen Photobox Beranda"
          >
            <img
              src="/assets/aistudio/tentotenred_2ac7af73.svg"
              alt="Logo Resmi TentoTen Photobox"
              width={140}
              height={36}
              className="h-8 md:h-9 w-auto object-contain mix-blend-multiply transition-transform group-hover:scale-105"
            />
            <span className="font-headline-sm uppercase tracking-tight text-[#960011] font-extrabold text-xl leading-none">
              TENTOTEN
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-label-board text-xs lg:text-[13px] uppercase tracking-wider transition-all inline-block ${
                    isActive
                      ? 'bg-[#960011] text-white font-extrabold rounded-full px-4 py-1.5 shadow-[2px_2px_0px_#1f1b11] border-2 border-[#1f1b11]'
                      : 'text-[#1f1b11] hover:text-[#960011] font-bold px-3 py-1.5 transition-colors'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Button: WhatsApp */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/6281330148068?text=Halo%20TentoTen%20Photobox,%20saya%20mau%20tanya%20info%20photobox"
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#960011] hover:bg-[#c0111e] text-white rounded-full font-label-board text-xs uppercase tracking-wider border border-[#1f1b11] shadow-[2px_2px_0px_#1f1b11] transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>CHAT WA</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full border border-[#1f1b11] bg-[#f6eddc] flex items-center justify-center text-[#1f1b11] shadow-[2px_2px_0px_#1f1b11] focus:outline-none"
              aria-label="Buka menu navigasi"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-[#fcf3e2] border-2 border-[#1f1b11] rounded-2xl p-4 shadow-[4px_4px_0px_#1f1b11] flex flex-col gap-2 pointer-events-auto">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-label-board text-sm uppercase tracking-wider py-2.5 px-4 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-[#960011] text-white font-extrabold border-[#1f1b11]'
                      : 'bg-[#f6eddc] text-[#1f1b11] border-transparent hover:border-[#1f1b11]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
