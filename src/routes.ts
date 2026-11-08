/**
 * Single source of truth for Application Routes and Domain Configuration
 * TentoTen Photobox
 */

export const SITE_URL = (
  (typeof process !== 'undefined' && (process.env.VITE_SITE_URL || process.env.SITE_URL)) ||
  'https://tentotenphotobox.biz.id'
).replace(/\/+$/, '');

export type RouteType = 'page' | 'location' | 'post';

export interface RouteItem {
  path: string;
  indexable: boolean;
  type: RouteType;
}

export const ROUTES: RouteItem[] = [
  { path: '/', indexable: true, type: 'page' },
  { path: '/product', indexable: true, type: 'page' },
  { path: '/service', indexable: true, type: 'page' },
  { path: '/location', indexable: true, type: 'page' },
  { path: '/location/madiun', indexable: true, type: 'location' },
  { path: '/location/jombang', indexable: true, type: 'location' },
  { path: '/location/ponorogo', indexable: true, type: 'location' },
  { path: '/location/kertosono', indexable: true, type: 'location' },
  { path: '/kemitraan', indexable: true, type: 'page' },
  { path: '/contact', indexable: true, type: 'page' },
  { path: '/kebijakan-privasi', indexable: true, type: 'page' },
  { path: '/404', indexable: false, type: 'page' },
];

export const SITEMAP_TYPE_MAP: Record<RouteType, string> = {
  page: 'page-sitemap.xml',
  location: 'location-sitemap.xml',
  post: 'post-sitemap.xml',
};

export const INDEXED_ROUTES: string[] = ROUTES.filter((r) => r.indexable).map((r) => r.path);
export const ALL_ROUTES: string[] = ROUTES.map((r) => r.path);
