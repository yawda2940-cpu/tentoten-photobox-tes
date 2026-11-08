import { Request, Response, NextFunction } from 'express';

/**
 * Production Security Headers Middleware for TentoTen Photobox
 * Active ONLY in production mode (NODE_ENV=production).
 * Zero third-party dependencies (native Express implementation).
 */
export function securityHeaders(req: Request, res: Response, next: NextFunction): void {
  // Only active when running in production
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  // Content-Security-Policy directives
  const cspDirectives = [
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
  ].join('; ');

  // Support CSP_REPORT_ONLY environment toggle
  const isReportOnly = process.env.CSP_REPORT_ONLY === 'true';
  const cspHeaderName = isReportOnly
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy';

  res.setHeader(cspHeaderName, cspDirectives);

  // Strict-Transport-Security: send ONLY if connection is secure (req.secure via trust proxy 1)
  if (req.secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  // Additional Security & Isolation Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  );
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');

  // Explicitly remove X-Powered-By
  res.removeHeader('X-Powered-By');

  next();
}
