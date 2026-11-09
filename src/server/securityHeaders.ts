import { Request, Response, NextFunction } from 'express';
import {
  BASE_SECURITY_HEADERS,
  HSTS_HEADER,
  getCspDirectives,
  getCspHeaderName,
  isCspReportOnly,
} from './securityHeaderList';

/**
 * Production Security Headers Middleware for TentoTen Photobox
 * Active ONLY in production mode (NODE_ENV=production).
 * Zero third-party dependencies (native Express implementation).
 * Driven by src/server/securityHeaderList.ts as single source of truth.
 */
export function securityHeaders(req: Request, res: Response, next: NextFunction): void {
  // Only active when running in production
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  // Base security headers
  for (const item of BASE_SECURITY_HEADERS) {
    res.setHeader(item.key, item.value);
  }

  // Strict-Transport-Security: send ONLY if connection is secure (req.secure via trust proxy 1)
  if (req.secure) {
    res.setHeader(HSTS_HEADER.key, HSTS_HEADER.value);
  }

  // Content-Security-Policy (defaults to Report-Only unless CSP_REPORT_ONLY === 'false')
  const reportOnly = isCspReportOnly();
  const cspHeaderName = getCspHeaderName(reportOnly);
  const cspDirectives = getCspDirectives();
  res.setHeader(cspHeaderName, cspDirectives);

  // Explicitly remove X-Powered-By
  res.removeHeader('X-Powered-By');

  next();
}
