/**
 * Single source of truth for Application Routes and Domain Configuration
 * TentoTen Photobox
 */

export const SITE_URL = (
  (typeof process !== 'undefined' && (process.env.VITE_SITE_URL || process.env.SITE_URL)) ||
  'https://tentotenphotobox.biz.id'
).replace(/\/+$/, '');

export interface RouteItem {
  path: string;
  indexable: boolean;
}

export const ROUTES: RouteItem[] = [
  { path: '/', indexable: true },
  { path: '/product', indexable: true },
  { path: '/service', indexable: true },
  { path: '/location', indexable: true },
  { path: '/location/madiun', indexable: true },
  { path: '/location/jombang', indexable: true },
  { path: '/location/ponorogo', indexable: true },
  { path: '/location/kertosono', indexable: true },
  { path: '/kemitraan', indexable: true },
  { path: '/contact', indexable: true },
  { path: '/kebijakan-privasi', indexable: true },
  { path: '/404', indexable: false },
];

export const INDEXED_ROUTES: string[] = ROUTES.filter((r) => r.indexable).map((r) => r.path);
export const ALL_ROUTES: string[] = ROUTES.map((r) => r.path);
