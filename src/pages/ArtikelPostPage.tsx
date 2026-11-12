import React from 'react';
import { PUBLISHED_POSTS } from '../data/posts.generated.ts';
import { LOCATIONS } from '../site.config';
import { formatTanggalIndonesia } from '../utils/formatDate';
import { NotFoundPage } from './NotFoundPage';

interface ArtikelPostPageProps {
  slug: string;
}

export const ArtikelPostPage: React.FC<ArtikelPostPageProps> = ({ slug }) => {
  const post = PUBLISHED_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return <NotFoundPage />;
  }

  // Rekomendasi artikel terkait: kategori sama lebih dulu, lalu terbaru, maks 3
  const relatedPosts = PUBLISHED_POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aSame = a.category.toLowerCase() === post.category.toLowerCase() ? 0 : 1;
      const bSame = b.category.toLowerCase() === post.category.toLowerCase() ? 0 : 1;
      if (aSame !== bSame) return aSame - bSame;
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return a.slug.localeCompare(b.slug);
    })
    .slice(0, 3);

  const showUpdated = Boolean(post.updated && post.updated !== post.date);

  return (
    <div className="flex flex-col w-full pt-20">
      {/* 1. Header Artikel & Breadcrumb */}
      <article className="w-full">
        <header className="w-full bg-[#fff8f0] py-10 md:py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
          <div className="max-w-[920px] mx-auto min-w-0">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5c403d]">
                <li>
                  <a href="/" className="hover:text-[#960011] transition-colors">
                    Beranda
                  </a>
                </li>
                <li>/</li>
                <li>
                  <a href="/artikel" className="hover:text-[#960011] transition-colors">
                    Artikel
                  </a>
                </li>
                <li>/</li>
                <li className="text-[#960011] font-bold break-words" aria-current="page">
                  {post.title}
                </li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] font-bold">
                {post.category}
              </span>
              {post.locations.map((locSlug) => {
                const loc = LOCATIONS[locSlug];
                if (!loc) return null;
                return (
                  <a
                    key={locSlug}
                    href={`/location/${locSlug}`}
                    className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#f6eddc] border border-[#1f1b11]/25 text-[#1f1b11] hover:bg-[#ffdad6] hover:text-[#960011] transition-colors font-bold"
                  >
                    {loc.name}
                  </a>
                );
              })}
            </div>

            {/* EXACT SINGLE H1 */}
            <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-5xl text-[#1f1b11] font-black tracking-tight leading-tight break-words">
              {post.title}
            </h1>

            <p className="font-body-lg text-base md:text-lg text-[#5c403d] mt-4 leading-relaxed break-words">
              {post.description}
            </p>

            <div className="mt-5 pt-4 border-t border-[#1f1b11]/15 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-[#5c403d]">
              <span>
                Oleh <strong className="text-[#1f1b11]">{post.author}</strong>
              </span>
              <span>&bull;</span>
              <span>
                Diterbitkan{' '}
                <time dateTime={post.date} className="text-[#1f1b11] font-bold">
                  {formatTanggalIndonesia(post.date)}
                </time>
              </span>
              {showUpdated && post.updated && (
                <>
                  <span>&bull;</span>
                  <span>
                    Diperbarui{' '}
                    <time dateTime={post.updated} className="text-[#1f1b11] font-bold">
                      {formatTanggalIndonesia(post.updated)}
                    </time>
                  </span>
                </>
              )}
              <span>&bull;</span>
              <span>{post.wordCount} kata</span>
            </div>
          </div>
        </header>

        {/* 2. Sampul, Daftar Isi, Isi Artikel, dan FAQ */}
        <section className="w-full bg-[#fcf3e2] py-10 md:py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
          <div className="max-w-[920px] mx-auto space-y-8 min-w-0">
            {/* Cover Image */}
            <figure className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-3 sm:p-4 shadow-[5px_5px_0px_#1f1b11] overflow-hidden">
              <div className="rounded-2xl overflow-hidden bg-[#f6eddc] border border-[#1f1b11]/20 flex justify-center">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  width={post.imageWidth}
                  height={post.imageHeight}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="max-w-full h-auto max-h-[520px] object-contain mx-auto"
                />
              </div>
              <figcaption className="text-xs font-body-sm text-[#5c403d] text-center mt-2.5 break-words">
                {post.imageAlt}
              </figcaption>
            </figure>

            {/* Daftar Isi otomatis dari H2 */}
            {post.toc.length > 0 && (
              <nav
                aria-label="Daftar isi artikel"
                className="bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11] p-5 sm:p-6 shadow-[4px_4px_0px_#1f1b11]"
              >
                <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-2">
                  DAFTAR ISI
                </span>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-[#1f1b11]">
                  {post.toc.map((item) => (
                    <li key={item.id} className="break-words">
                      <a
                        href={`#${item.id}`}
                        className="text-[#960011] hover:text-[#c0111e] font-bold underline"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Badan Artikel Prose */}
            <div className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-10 shadow-[5px_5px_0px_#1f1b11] min-w-0">
              <div
                className="artikel-prose w-full max-w-full min-w-0 break-words"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>

            {/* FAQ Opsional dari Frontmatter */}
            {post.faq && post.faq.length > 0 && (
              <div className="pt-2">
                <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                  TANYA JAWAB
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black mb-5">
                  Pertanyaan yang Sering Diajukan
                </h2>
                <div className="space-y-4">
                  {post.faq.map((item, idx) => (
                    <details
                      key={idx}
                      className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer"
                    >
                      <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between gap-3">
                        <span className="break-words">{item.q}</span>
                        <span className="material-symbols-outlined text-neutral-500 shrink-0" aria-hidden="true">
                          expand_more
                        </span>
                      </summary>
                      <p className="font-body-sm text-xs sm:text-sm text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed break-words">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Lokasi & WhatsApp */}
            <div className="bg-[#ffdad6]/50 rounded-3xl border-2 border-[#960011] p-6 sm:p-8 shadow-[5px_5px_0px_#960011] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#960011] text-white font-bold inline-block mb-2">
                  COBA LANGSUNG DI KAFE
                </span>
                <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black break-words">
                  Siap foto langsung tanpa booking?
                </h2>
                <p className="font-body-sm text-xs sm:text-sm text-[#5c403d] mt-2 leading-relaxed break-words">
                  Cek jam buka booth TentoTen terdekat di Madiun, Jombang, Ponorogo, dan Kertosono atau chat admin lewat WhatsApp untuk info custom frame Rp60.000.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <a
                  href="/location"
                  className="w-full sm:w-auto px-5 py-3 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all font-bold text-center"
                >
                  Lihat Lokasi Kafe
                </a>
                <a
                  href="https://wa.me/6281330148068?text=Halo%20TentoTen%20Photobox,%20saya%20mau%20tanya%20info%20photobox"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp"
                  className="w-full sm:w-auto px-5 py-3 bg-[#fff8f0] hover:bg-[#f6eddc] text-[#960011] font-label-board text-xs uppercase tracking-wider rounded-xl border-2 border-[#960011] shadow-[3px_3px_0px_#960011] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all font-bold text-center"
                >
                  Chat WhatsApp Admin
                </a>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* 3. Artikel Terkait (jika ada artikel lain) */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
          <div className="max-w-[1240px] mx-auto min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                  BACAAN LAINNYA
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black">
                  Artikel Terkait
                </h2>
              </div>
              <a
                href="/artikel"
                className="inline-flex items-center gap-1.5 text-xs font-label-board uppercase tracking-wider font-bold text-[#960011] hover:text-[#c0111e]"
              >
                <span>Semua artikel</span>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  arrow_forward
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <article
                  key={rel.slug}
                  className="group relative bg-[#fcf3e2] rounded-2xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11] hover:shadow-[6px_6px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all overflow-hidden flex flex-col justify-between min-w-0"
                >
                  <div className="min-w-0">
                    <div className="w-full h-44 overflow-hidden bg-[#f6eddc] border-b-2 border-[#1f1b11]">
                      <img
                        src={rel.image}
                        alt={rel.imageAlt}
                        width={rel.imageWidth}
                        height={rel.imageHeight}
                        loading="lazy"
                        fetchPriority="low"
                        decoding="async"
                        className="w-full h-full object-cover max-w-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#ffdad6] text-[#960011] font-bold">
                          {rel.category}
                        </span>
                        <time
                          dateTime={rel.date}
                          className="text-[11px] font-mono text-[#5c403d]"
                        >
                          {formatTanggalIndonesia(rel.date)}
                        </time>
                      </div>
                      <h3 className="font-headline-md text-lg text-[#1f1b11] font-black leading-snug break-words">
                        <a
                          href={`/artikel/${rel.slug}`}
                          className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#960011] group-hover:text-[#960011] transition-colors"
                        >
                          {rel.title}
                        </a>
                      </h3>
                      <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed line-clamp-2 break-words">
                        {rel.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-4 pt-3 border-t border-[#1f1b11]/15 flex items-center justify-between text-xs font-label-board uppercase tracking-wider font-bold text-[#960011]">
                    <span>Baca artikel</span>
                    <span className="material-symbols-outlined text-base" aria-hidden="true">
                      arrow_forward
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
