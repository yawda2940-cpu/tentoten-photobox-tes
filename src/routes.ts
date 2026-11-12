/**
 * Single source of truth for Application Routes and Domain Configuration
 * TentoTen Photobox
 */
import { PUBLISHED_POSTS } from './data/posts.generated.ts';

export const SITE_URL = (
  (typeof process !== 'undefined' && (process.env.VITE_SITE_URL || process.env.SITE_URL)) ||
  'https://tentotenphotobox.biz.id'
).replace(/\/+$/, '');

export const POSTS_PER_PAGE = 12;

export type RouteType = 'page' | 'location' | 'post';

export interface RouteItem {
  path: string;
  indexable: boolean;
  type: RouteType;
  inSitemap?: boolean;
  lastmod?: string;
}

const STATIC_ROUTES: RouteItem[] = [
  { path: '/', indexable: true, type: 'page', inSitemap: true },
  { path: '/product', indexable: true, type: 'page', inSitemap: true },
  { path: '/service', indexable: true, type: 'page', inSitemap: true },
  { path: '/location', indexable: true, type: 'page', inSitemap: true },
  { path: '/location/madiun', indexable: true, type: 'location', inSitemap: true },
  { path: '/location/jombang', indexable: true, type: 'location', inSitemap: true },
  { path: '/location/ponorogo', indexable: true, type: 'location', inSitemap: true },
  { path: '/location/kertosono', indexable: true, type: 'location', inSitemap: true },
  { path: '/kemitraan', indexable: true, type: 'page', inSitemap: true },
  { path: '/contact', indexable: true, type: 'page', inSitemap: true },
  { path: '/kebijakan-privasi', indexable: true, type: 'page', inSitemap: true },
  { path: '/artikel', indexable: true, type: 'page', inSitemap: true },
];

const POST_ROUTES: RouteItem[] = PUBLISHED_POSTS.map((post) => ({
  path: `/artikel/${post.slug}`,
  indexable: true,
  type: 'post',
  inSitemap: true,
  lastmod: post.updated || post.date,
}));

export const TOTAL_ARTICLE_PAGES: number =
  PUBLISHED_POSTS.length > POSTS_PER_PAGE
    ? Math.ceil(PUBLISHED_POSTS.length / POSTS_PER_PAGE)
    : 1;

const PAGINATION_ROUTES: RouteItem[] = [];
for (let pageNum = 2; pageNum <= TOTAL_ARTICLE_PAGES; pageNum++) {
  PAGINATION_ROUTES.push({
    path: `/artikel/halaman/${pageNum}`,
    indexable: true,
    type: 'page',
    inSitemap: false,
  });
}

const NOT_FOUND_ROUTE: RouteItem = {
  path: '/404',
  indexable: false,
  type: 'page',
  inSitemap: false,
};

export const ROUTES: RouteItem[] = [
  ...STATIC_ROUTES,
  ...POST_ROUTES,
  ...PAGINATION_ROUTES,
  NOT_FOUND_ROUTE,
];

export const SITEMAP_TYPE_MAP: Record<RouteType, string> = {
  page: 'page-sitemap.xml',
  location: 'location-sitemap.xml',
  post: 'post-sitemap.xml',
};

export const INDEXED_ROUTES: string[] = ROUTES
  .filter((r) => r.indexable && r.inSitemap !== false)
  .map((r) => r.path);

export const PAGINATION_PATHS: string[] = PAGINATION_ROUTES.map((r) => r.path);

export const CRAWLABLE_ROUTES: string[] = ROUTES
  .filter((r) => r.indexable)
  .map((r) => r.path);

export const ALL_ROUTES: string[] = ROUTES.map((r) => r.path);
