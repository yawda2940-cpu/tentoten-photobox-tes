import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { securityHeaders } from './src/server/securityHeaders';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, 'dist');
const publicDir = path.resolve(__dirname, 'public');

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(path.resolve(distDir, 'index.html'));

// Enable trust proxy for reverse proxies (Cloud Run, load balancers, Cloudflare, Nginx)
app.set('trust proxy', 1);

// Remove default X-Powered-By header
app.disable('x-powered-by');

// Canonical Domain & HTTPS 301 Redirect Middleware
// Redirects http -> https and www.tentotenphotobox.biz.id -> tentotenphotobox.biz.id
app.use((req: Request, res: Response, next: NextFunction) => {
  const host = (req.headers['x-forwarded-host'] as string) || req.headers.host || '';
  const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol;
  const hostWithoutPort = host.split(':')[0].toLowerCase();

  // Redirect www to apex domain
  if (hostWithoutPort === 'www.tentotenphotobox.biz.id') {
    return res.redirect(301, `https://tentotenphotobox.biz.id${req.originalUrl}`);
  }

  // Redirect HTTP to HTTPS in production behind reverse proxies
  if (
    process.env.NODE_ENV === 'production' &&
    proto === 'http' &&
    hostWithoutPort !== 'localhost' &&
    hostWithoutPort !== '127.0.0.1'
  ) {
    return res.redirect(301, `https://${host}${req.originalUrl}`);
  }

  next();
});

// Trailing Slash Canonical Redirect: redirect /path/ to /path (301)
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length);
    const safePath = req.path.slice(0, -1);
    return res.redirect(301, safePath + query);
  }
  next();
});

// Production Security Headers Middleware (Active when NODE_ENV=production)
// Positioned before static file handlers and 404 handler
app.use(securityHeaders);

// Dedicated robots.txt route (HTTP 200, text/plain; charset=utf-8, without noindex)
app.get('/robots.txt', (_req: Request, res: Response) => {
  const candidates = [
    path.resolve(distDir, 'robots.txt'),
    path.resolve(publicDir, 'robots.txt'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.status(200).sendFile(p);
    }
  }
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  return res.status(200).send("User-agent: *\nAllow: /\n\nSitemap: https://tentotenphotobox.biz.id/sitemap.xml\n");
});

// Dedicated sitemap.xml route (HTTP 200, application/xml; charset=utf-8, without noindex)
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const candidates = [
    path.resolve(distDir, 'sitemap.xml'),
    path.resolve(publicDir, 'sitemap.xml'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.status(200).sendFile(p);
    }
  }
  return res.status(404).send('Sitemap not found');
});

async function startServer() {
  if (!isProduction) {
    // Development mode with Vite dev middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve pre-rendered static assets
    // Long-lived immutable cache for assets (/assets/*)
    app.use(
      '/assets',
      express.static(path.resolve(distDir, 'assets'), {
        maxAge: '1y',
        immutable: true,
        redirect: false,
        setHeaders: (res) => {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        },
      })
    );

    // Static files (favicon, fonts, og-image.jpg, manifest, etc.)
    app.use(
      express.static(distDir, {
        index: false,
        redirect: false,
        maxAge: '1h',
      })
    );

    // Static HTML route resolution (Cache-Control: no-cache)
    app.use((req: Request, res: Response) => {
      const cleanPath = req.path === '/' ? 'index' : req.path.replace(/^\/+/, '');

      // Check candidate HTML files
      const candidatePaths = [
        path.resolve(distDir, `${cleanPath}.html`),
        path.resolve(distDir, cleanPath, 'index.html'),
        path.resolve(distDir, `${cleanPath}/index.html`),
      ];

      for (const p of candidatePaths) {
        if (fs.existsSync(p) && fs.statSync(p).isFile()) {
          res.setHeader('Content-Type', 'text/html; charset=UTF-8');
          res.setHeader('Cache-Control', 'no-cache');
          return res.status(200).sendFile(p);
        }
      }

      // If route not found, return true HTTP 404 status and serve 404.html with noindex, nofollow
      const notFoundFile = path.resolve(distDir, '404.html');
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

      if (fs.existsSync(notFoundFile)) {
        return res.status(404).sendFile(notFoundFile);
      }

      return res.status(404).send('404 Not Found');
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (production: ${isProduction})`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
