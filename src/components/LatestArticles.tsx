import React from 'react';
import {
  PUBLISHED_POSTS,
  type ArticlePost,
  type AllowedLocationSlug,
} from '../data/posts.generated.ts';
import { formatTanggalIndonesia } from '../utils/formatDate';

export interface LatestArticlesProps {
  count?: number;
  heading?: string;
  headingLevel?: 'h2' | 'h3';
  category?: string;
  location?: AllowedLocationSlug;
  variant?: 'featured' | 'list';
  bgClass?: string;
  id?: string;
}

const ArticleCard: React.FC<{
  post: ArticlePost;
  cardHeadingLevel: 'h3' | 'h4';
  large?: boolean;
}> = ({ post, cardHeadingLevel, large = false }) => {
  const CardHeading = cardHeadingLevel;

  return (
    <article className="group relative bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11] hover:shadow-[6px_6px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all overflow-hidden flex flex-col justify-between min-w-0 w-full max-w-full">
      <div className="min-w-0">
        <div
          className={`w-full overflow-hidden bg-[#f6eddc] border-b-2 border-[#1f1b11] ${
            large ? 'h-56 sm:h-72' : 'h-44 sm:h-48'
          }`}
        >
          <img
            src={post.image}
            alt={post.imageAlt}
            width={post.imageWidth}
            height={post.imageHeight}
            loading="lazy"
            fetchPriority="low"
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

          <CardHeading
            className={`font-headline-md text-[#1f1b11] font-black leading-snug break-words ${
              large ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
            }`}
          >
            <a
              href={`/artikel/${post.slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#960011] group-hover:text-[#960011] transition-colors"
            >
              {post.title}
            </a>
          </CardHeading>

          <p className="font-body-sm text-xs sm:text-sm text-[#5c403d] mt-2 leading-relaxed line-clamp-2 break-words">
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
  );
};

export const LatestArticles: React.FC<LatestArticlesProps> = ({
  count = 3,
  heading = 'Artikel Terbaru',
  headingLevel = 'h2',
  category,
  location,
  variant = 'list',
  bgClass = 'bg-[#fcf3e2]',
  id = 'artikel-terbaru',
}) => {
  const filtered = PUBLISHED_POSTS.filter((post) => {
    if (category && post.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    if (location && !post.locations.includes(location)) {
      return false;
    }
    return true;
  }).slice(0, count);

  if (filtered.length === 0) {
    return null;
  }

  const SectionHeading = headingLevel;
  const cardHeadingLevel: 'h3' | 'h4' = headingLevel === 'h2' ? 'h3' : 'h4';

  return (
    <section
      id={id}
      className={`w-full ${bgClass} py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]`}
    >
      <div className="max-w-[1240px] mx-auto min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl min-w-0">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              PANDUAN &amp; CERITA BOOTH
            </span>
            <SectionHeading className="font-headline-lg text-2xl sm:text-4xl text-[#1f1b11] font-black break-words">
              {heading}
            </SectionHeading>
          </div>

          <a
            href="/artikel"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#fff8f0] hover:bg-[#f6eddc] text-[#1f1b11] font-label-board text-xs uppercase tracking-wider rounded-xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all font-bold shrink-0 self-start sm:self-auto"
          >
            <span>Lihat semua artikel</span>
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              arrow_forward
            </span>
          </a>
        </div>

        {variant === 'featured' ? (
          filtered.length === 1 ? (
            <div className="max-w-2xl mx-auto min-w-0">
              <ArticleCard
                post={filtered[0]}
                cardHeadingLevel={cardHeadingLevel}
                large
              />
            </div>
          ) : filtered.length === 2 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
              {filtered.map((post) => (
                <ArticleCard
                  key={post.slug}
                  post={post}
                  cardHeadingLevel={cardHeadingLevel}
                  large
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch min-w-0">
              <div className="md:col-span-7 flex min-w-0">
                <ArticleCard
                  post={filtered[0]}
                  cardHeadingLevel={cardHeadingLevel}
                  large
                />
              </div>
              <div className="md:col-span-5 flex flex-col gap-6 min-w-0">
                {filtered.slice(1, 3).map((post) => (
                  <ArticleCard
                    key={post.slug}
                    post={post}
                    cardHeadingLevel={cardHeadingLevel}
                  />
                ))}
              </div>
            </div>
          )
        ) : filtered.length === 1 ? (
          <div className="max-w-2xl mx-auto min-w-0">
            <ArticleCard
              post={filtered[0]}
              cardHeadingLevel={cardHeadingLevel}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
            {filtered.map((post) => (
              <ArticleCard
                key={post.slug}
                post={post}
                cardHeadingLevel={cardHeadingLevel}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
