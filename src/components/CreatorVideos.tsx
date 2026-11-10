import React, { useState } from 'react';
import { CREATOR_VIDEOS } from '../data/creatorVideos';

interface CreatorVideosProps {
  variant?: 'preview' | 'full';
  id?: string;
}

export const CreatorVideos: React.FC<CreatorVideosProps> = ({
  variant = 'full',
  id = 'konten-kreator',
}) => {
  const [loadedIframes, setLoadedIframes] = useState<Record<string, boolean>>({});

  const displayVideos =
    variant === 'preview' ? CREATOR_VIDEOS.slice(0, 3) : CREATOR_VIDEOS;

  const handleLoadIframe = (videoId: string) => {
    setLoadedIframes((prev) => ({ ...prev, [videoId]: true }));
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="w-full max-w-full min-w-0 bg-[#fcf3e2] py-14 md:py-20 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11] overflow-hidden"
    >
      <div className="w-full max-w-[1240px] min-w-0 mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] text-xs font-bold tracking-widest uppercase mb-3">
            <span className="material-symbols-outlined text-[15px]">videocam</span>
            <span>KONTEN KREATOR & TIKTOK</span>
          </div>

          <h2
            id={`${id}-heading`}
            className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-[#1f1b11] font-black tracking-tight"
          >
            Intip Keseruan dari Kreator di TikTok
          </h2>

          <p className="font-body-md text-sm sm:text-base text-[#5c403d] mt-3 leading-relaxed">
            Sejumlah konten kreator lokal telah mencoba langsung bilik foto TentoTen saat menikmati waktu santai di kafe-kafe Jawa Timur. Ketuk kartu mana saja untuk memuat video atau tonton langsung di aplikasi TikTok.
          </p>
        </div>

        {/* Video Cards Grid / Mobile Swipe */}
        <div className="w-full max-w-full min-w-0 flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 sm:gap-6 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
          {displayVideos.map((video, index) => {
            const isIframeLoaded = !!loadedIframes[video.id];

            return (
              <div
                key={video.id}
                className="snap-center shrink-0 w-[82%] sm:w-[300px] md:w-auto md:max-w-none group bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11] hover:shadow-[6px_6px_0px_#1f1b11] hover:-translate-y-1 transition-all flex flex-col overflow-hidden text-left"
              >
                {/* Visual Panel bergaya Poster Film Analog 9:16 */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Muat video ${video.title}`}
                  onClick={() => handleLoadIframe(video.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLoadIframe(video.id);
                    }
                  }}
                  className="relative w-full aspect-[9/16] bg-[#f6eddc] border-b-2 border-[#1f1b11] p-3 flex flex-col justify-between overflow-hidden cursor-pointer select-none group/poster focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#960011]"
                >
                  {isIframeLoaded ? (
                    /* Setelah iframe dimuat, thumbnail diganti iframe */
                    <iframe
                      src={video.url}
                      title={video.title}
                      className="absolute inset-0 w-full h-full border-0 z-20"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      {/* Cover Thumbnail Image (540x960, decoding async, loading lazy) */}
                      <img
                        src={video.thumbnail}
                        alt={video.thumbAlt}
                        width={540}
                        height={960}
                        decoding="async"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/poster:scale-105"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />

                      {/* Dark overlay tipis agar tombol dan teks tetap terbaca jelas */}
                      <div className="absolute inset-0 bg-black/20 group-hover/poster:bg-black/30 transition-colors pointer-events-none z-10" />

                      {/* Sprocket Holes Film Strip (Kiri & Kanan) */}
                      <div className="absolute top-0 bottom-0 left-1 w-2 flex flex-col justify-between py-2 pointer-events-none z-15">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={`left-sprocket-${i}`}
                            className="w-1.5 h-2.5 bg-[#1f1b11] rounded-sm opacity-50 shadow-xs"
                          />
                        ))}
                      </div>
                      <div className="absolute top-0 bottom-0 right-1 w-2 flex flex-col justify-between py-2 pointer-events-none z-15">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={`right-sprocket-${i}`}
                            className="w-1.5 h-2.5 bg-[#1f1b11] rounded-sm opacity-50 shadow-xs"
                          />
                        ))}
                      </div>

                      {/* Film Top Bar */}
                      <div className="relative z-20 flex items-center justify-between px-3 text-[10px] font-mono tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-bold">
                        <span>FRAME #{index + 1}</span>
                        <span>35MM RETRO</span>
                      </div>

                      {/* Central Film Focus & Play Button */}
                      <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center px-4">
                        <div className="w-full max-w-[210px] bg-[#fff8f0]/95 backdrop-blur-xs rounded-xl border-2 border-[#1f1b11] p-4 shadow-[2px_2px_0px_#1f1b11] flex flex-col items-center gap-3">
                          <span className="font-headline-sm text-xs font-extrabold uppercase text-[#960011] tracking-wider">
                            TentoTen Photobox
                          </span>

                          {/* Play Button Pill */}
                          <div className="w-14 h-14 rounded-full bg-[#c0111e] group-hover/poster:bg-[#960011] border-2 border-[#1f1b11] shadow-[2px_2px_0px_#1f1b11] flex items-center justify-center text-white transition-transform group-hover/poster:scale-110">
                            <span className="material-symbols-outlined text-3xl">play_arrow</span>
                          </div>

                          <span className="text-[11px] font-mono font-bold text-[#1f1b11]">
                            KLIK UNTUK MEMUAT
                          </span>
                        </div>
                      </div>

                      {/* Film Bottom Metadata Bar */}
                      <div className="relative z-20 flex items-center justify-between px-3 text-[10px] font-mono uppercase tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-semibold">
                        <span>ISO 400</span>
                        <span>TIKTOK REEL</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Deskripsi & Tombol Aksi */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4 bg-[#fff8f0]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#ffdad6] text-[#960011] border border-[#960011]/30">
                        TIKTOK
                      </span>
                      <span className="text-[11px] font-mono text-[#906f6c]">
                        {video.creator}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1f1b11] leading-snug">
                      {video.title}
                    </h3>

                    <p className="font-body-sm text-xs sm:text-sm text-[#5c403d] leading-relaxed line-clamp-3">
                      {video.caption}
                    </p>
                  </div>

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    aria-label={`Tonton ${video.title} di TikTok (membuka tab baru)`}
                    className="pt-2 border-t border-[#906f6c]/20 flex items-center justify-between text-[#960011] hover:text-[#c0111e] font-label-board text-xs font-bold uppercase tracking-wider group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#960011]"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span>Tonton di TikTok</span>
                      <span className="material-symbols-outlined text-[16px] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        arrow_outward
                      </span>
                    </span>
                    <span className="sr-only">(membuka tab baru)</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Variant Preview: Navigasi ke Halaman Service */}
        {variant === 'preview' && (
          <div className="mt-10 text-center">
            <a
              href="/service#konten-kreator"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl font-bold border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <span>Lihat semua di Layanan</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
