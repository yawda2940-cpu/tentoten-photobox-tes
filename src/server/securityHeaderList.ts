/**
 * Production Security Headers Configuration
 * Single Source of Truth for Express server and Vercel static deployments.
 * Zero third-party dependencies.
 */

export interface HeaderItem {
  key: string;
  value: string;
}

export interface VercelHeaderRule {
  source: string;
  headers: HeaderItem[];
}

/**
 * Standard Security Headers (Cross-Origin isolation, sniffing protection, clickjacking protection)
 */
export const BASE_SECURITY_HEADERS: HeaderItem[] = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
];

/**
 * Strict-Transport-Security (HSTS)
 * Only sent over secure connections (HTTPS / Vercel Edge).
 */
export const HSTS_HEADER: HeaderItem = {
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains',
};

/**
 * Content-Security-Policy (CSP) Directives list
 * Does NOT contain 'unsafe-eval' or wildcards (*).
 */
export const CSP_DIRECTIVES: string[] = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://*.googleusercontent.com",
  "frame-src https://www.google.com https://maps.google.com https://www.tiktok.com",
  "connect-src 'self'",
  "media-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
];

/**
 * Formatted string of CSP directives
 */
export function getCspDirectives(): string {
  return CSP_DIRECTIVES.join('; ');
}

/**
 * Resolves whether CSP is in Report-Only mode or Blocking mode.
 * Default is Report-Only unless explicitly configured to 'false'.
 */
export function isCspReportOnly(explicitFlag?: boolean): boolean {
  if (typeof explicitFlag === 'boolean') {
    return explicitFlag;
  }
  if (typeof process !== 'undefined' && process.env && process.env.CSP_REPORT_ONLY !== undefined) {
    return process.env.CSP_REPORT_ONLY !== 'false';
  }
  return true; // Default Report-Only
}

/**
 * Returns the appropriate header name ('Content-Security-Policy' or 'Content-Security-Policy-Report-Only')
 */
export function getCspHeaderName(reportOnly?: boolean): string {
  return isCspReportOnly(reportOnly)
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy';
}

/**
 * Returns all security headers for response injection
 */
export function getAllSecurityHeaders(options?: {
  isHttps?: boolean;
  isReportOnly?: boolean;
}): HeaderItem[] {
  const isHttps = options?.isHttps ?? true;
  const reportOnly = isCspReportOnly(options?.isReportOnly);
  const headerName = getCspHeaderName(reportOnly);

  const list: HeaderItem[] = [...BASE_SECURITY_HEADERS];

  if (isHttps) {
    list.push(HSTS_HEADER);
  }

  list.push({
    key: headerName,
    value: getCspDirectives(),
  });

  return list;
}

/**
 * Generates the headers array for vercel.json
 */
export function getVercelHeadersConfig(options?: { isReportOnly?: boolean }): VercelHeaderRule[] {
  const securityHeaderItems = getAllSecurityHeaders({
    isHttps: true,
    isReportOnly: options?.isReportOnly,
  });

  return [
    {
      source: '/(.*)',
      headers: securityHeaderItems,
    },
    {
      source: '/assets/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/(.*)\\.html',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, must-revalidate',
        },
      ],
    },
  ];
}
