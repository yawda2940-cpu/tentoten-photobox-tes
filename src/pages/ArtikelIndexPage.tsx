import React from 'react';
import { PUBLISHED_POSTS } from '../data/posts.generated';
import { POSTS_PER_PAGE } from '../routes';
import { formatTanggalIndonesia } from '../utils/formatDate';

interface ArtikelIndexPageProps {
  page?: number;
}

export const ArtikelIndexPage: React.FC<ArtikelIndexPageProps> = ({ page = 1 }) => {
  const totalPosts = PUBLISHED_POSTS.length;
  const totalPages = totalPosts > POSTS_PER_PAGE ? Math.ceil(totalPosts / POSTS_PER_PAGE) : 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = PUBLISHED_POSTS.slice(startIdx, startIdx + POSTS_PER_PAGE);

  const pageHref = (targetPage: number) =>
    targetPage <= 1 ? '/artikel' : `/artikel/halaman/${targetPage}`;

  return (
    <div className="flex flex-col w-full pt-20">
      {/* 1. Header & Breadcrumb */}
      <section className="w-full bg-[#fff8f0] py-10 md:py-16 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5c403d]">
              <li>
                <a href="/" className="hover:text-[#960011] transition-colors">
                  Beranda
                </a>
              </li>
              <li>/</li>
              {currentPage > 1 ? (
                <>
                  <li>
                    <a href="/artikel" className="hover:text-[#960011] transition-colors">
                      Artikel
                    </a>
                  </li>
                  <li>/</li>
                  <li className="text-[#960011] font-bold" aria-current="page">
                    Halaman {currentPage}
                  </li>
                </>
              ) : (
                <li className="text-[#960011] font-bold" aria-current="page">
                  Artikel
                </li>
              )}
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] text-xs font-bold tracking-widest uppercase mb-3">
              PANDUAN &amp; CERITA PHOTOBOX
            </div>
            {/* EXACT SINGLE H1 */}
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1f1b11] font-black tracking-tight leading-tight break-words">
              {currentPage > 1
                ? `Artikel TentoTen Photobox - Halaman ${currentPage}`
                : 'Artikel TentoTen Photobox'}
            </h1>
            <p className="font-body-lg text-base md:text-lg text-[#5c403d] mt-4 leading-relaxed break-words">
              Kumpulan panduan praktis, tips pose foto strip 35mm, cara menyiapkan custom frame Rp60.000, serta cerita seputar booth walk-in TentoTen di kafe Madiun, Jombang, Ponorogo, dan Kertosono.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Daftar Artikel */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto min-w-0">
          {pagePosts.length === 0 ? (
            <div className="max-w-2xl mx-auto bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-8 shadow-[5px_5px_0px_#1f1b11] text-center">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black">
                Belum ada artikel yang terbit
              </h2>
              <p className="font-body-md text-sm text-[#5c403d] mt-3 leading-relaxed">
                Panduan baru seputar cara memakai booth photobox Rp35.000 di kafe dan tips menyiapkan custom frame Rp60.000 sedang disiapkan. Sementara itu, kamu bisa langsung melihat daftar lokasi kafe atau rincian layanan kami.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/location"
                  className="w-full sm:w-auto px-6 py-3 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all font-bold text-center"
                >
                  Lihat Lokasi Kafe
                </a>
                <a
                  href="/product"
                  className="w-full sm:w-auto px-6 py-3 bg-[#fff8f0] hover:bg-[#f6eddc] text-[#1f1b11] font-label-board text-xs uppercase tracking-wider rounded-xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all font-bold text-center"
                >
                  Cek Harga &amp; Custom Frame
                </a>
              </div>
            </div>
          ) : (
            <>
              <div
                className={
                  pagePosts.length === 1
                    ? 'max-w-2xl mx-auto'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                }
              >
                {pagePosts.map((post, idx) => (
                  <article
                    key={post.slug}
                    className="group relative bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11] hover:shadow-[6px_6px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all overflow-hidden flex flex-col justify-between min-w-0"
                  >
                    <div className="min-w-0">
                      <div className="w-full h-52 overflow-hidden bg-[#f6eddc] border-b-2 border-[#1f1b11]">
                        <img
                          src={post.image}
                          alt={post.imageAlt}
                          width={post.imageWidth}
                          height={post.imageHeight}
                          loading={idx < 3 ? 'eager' : 'lazy'}
                          fetchPriority={idx === 0 ? 'high' : 'low'}
                          decoding="async"
                          className="w-full h-full object-cover max-w-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-5 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#ffdad6] text-[#960011] font-bold">
                            {post.category}
                          </span>
                          <time
                            dateTime={post.date}
                            className="text-[11px] font-mono text-[#5c403d]"
                          >
                            {formatTanggalIndonesia(post.date)}
                          </time>
                        </div>

                        <h2 className="font-headline-md text-xl text-[#1f1b11] font-black leading-snug break-words">
                          <a
                            href={`/artikel/${post.slug}`}
                            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#960011] group-hover:text-[#960011] transition-colors"
                          >
                            {post.title}
                          </a>
                        </h2>

                        <p className="font-body-sm text-xs sm:text-sm text-[#5c403d] mt-2 leading-relaxed line-clamp-3 break-words">
                          {post.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-4 pt-3 border-t border-[#1f1b11]/15 flex items-center justify-between text-xs font-label-board uppercase tracking-wider font-bold text-[#960011]">
                      <span>Baca artikel</span>
                      <span
                        className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      >
                        arrow_forward
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Paginasi hanya tampil jika total halaman > 1 */}
              {totalPages > 1 && (
                <nav
                  aria-label="Navigasi halaman artikel"
                  className="mt-12 flex flex-wrap items-center justify-center gap-2"
                >
                  {currentPage > 1 && (
                    <a
                      href={pageHref(currentPage - 1)}
                      className="px-4 py-2.5 bg-[#fff8f0] hover:bg-[#f6eddc] text-[#1f1b11] font-mono text-xs font-bold rounded-xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      Sebelumnya
                    </a>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === currentPage;
                    return (
                      <a
                        key={pageNum}
                        href={pageHref(pageNum)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`px-4 py-2.5 font-mono text-xs font-bold rounded-xl border-2 border-[#1f1b11] transition-all ${
                          isActive
                            ? 'bg-[#960011] text-white shadow-[3px_3px_0px_#1f1b11]'
                            : 'bg-[#fff8f0] text-[#1f1b11] hover:bg-[#f6eddc] shadow-[3px_3px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                        }`}
                      >
                        {pageNum}
                      </a>
                    );
                  })}

                  {currentPage < totalPages && (
                    <a
                      href={pageHref(currentPage + 1)}
                      className="px-4 py-2.5 bg-[#fff8f0] hover:bg-[#f6eddc] text-[#1f1b11] font-mono text-xs font-bold rounded-xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      Berikutnya
                    </a>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};
