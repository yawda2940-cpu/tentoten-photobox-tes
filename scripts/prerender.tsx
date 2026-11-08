import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import {
  SITE_URL,
  PAGES_META,
  INDEXED_PATHS,
  ALL_PATHS,
  GA_ID,
  GOOGLE_SITE_VERIFICATION,
  BING_SITE_VERIFICATION
} from '../src/site.config';
import { getPageSchemas } from '../src/seo.schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

async function runPrerender() {
  console.log('--- Starting TentoTen Static Site Generation (SSG) ---');
  console.log(`Base SITE_URL: ${SITE_URL}`);

  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found! Run "vite build" first.');
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  for (const pagePath of ALL_PATHS) {
    const meta = PAGES_META[pagePath];
    if (!meta) {
      console.warn(`No meta found for path: ${pagePath}`);
      continue;
    }

    const canonicalUrl = `${SITE_URL}${pagePath === '/' ? '' : pagePath}`;
    const ogImageUrl = `${SITE_URL}/og-image.jpg`;

    // 1. Render App component to string
    const appHtml = renderToString(<App initialPath={pagePath} />);

    // 2. Build Structured Data JSON-LD
    const schemas = getPageSchemas(pagePath);
    const jsonLdHtml = schemas
      .map(
        (schema) =>
          `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>`
      )
      .join('\n    ');

    // 3. Build Head Tags
    let headInject = '';

    // Title & Description
    headInject += `\n    <title>${meta.title}</title>`;
    headInject += `\n    <meta name="description" content="${meta.description}" />`;

    // Robots meta (noindex for 404, index,follow for others)
    if (meta.noindex) {
      headInject += `\n    <meta name="robots" content="noindex, nofollow" />`;
    } else {
      headInject += `\n    <meta name="robots" content="index, follow" />`;
    }

    // Canonical
    headInject += `\n    <link rel="canonical" href="${canonicalUrl}" />`;

    // OpenGraph
    headInject += `\n    <meta property="og:type" content="website" />`;
    headInject += `\n    <meta property="og:locale" content="id_ID" />`;
    headInject += `\n    <meta property="og:site_name" content="TentoTen Photobox" />`;
    headInject += `\n    <meta property="og:title" content="${meta.title}" />`;
    headInject += `\n    <meta property="og:description" content="${meta.description}" />`;
    headInject += `\n    <meta property="og:url" content="${canonicalUrl}" />`;
    headInject += `\n    <meta property="og:image" content="${ogImageUrl}" />`;
    headInject += `\n    <meta property="og:image:width" content="1200" />`;
    headInject += `\n    <meta property="og:image:height" content="630" />`;

    // Twitter Card
    headInject += `\n    <meta name="twitter:card" content="summary_large_image" />`;
    headInject += `\n    <meta name="twitter:title" content="${meta.title}" />`;
    headInject += `\n    <meta name="twitter:description" content="${meta.description}" />`;
    headInject += `\n    <meta name="twitter:image" content="${ogImageUrl}" />`;

    // Google / Bing Search Console Verification (only if present)
    if (GOOGLE_SITE_VERIFICATION) {
      headInject += `\n    <meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}" />`;
    }
    if (BING_SITE_VERIFICATION) {
      headInject += `\n    <meta name="msvalidate.01" content="${BING_SITE_VERIFICATION}" />`;
    }

    // GA4 (non-blocking, no inline script)
    if (GA_ID) {
      headInject += `\n    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>`;
    }

    // JSON-LD Structured Data
    headInject += `\n    ${jsonLdHtml}\n  `;

    // 4. Assemble Full HTML
    let finalHtml = baseHtml;

    // Replace root content
    if (finalHtml.includes('<!--app-html-->')) {
      finalHtml = finalHtml.replace('<!--app-html-->', appHtml);
    } else if (finalHtml.includes('<div id="root"></div>')) {
      finalHtml = finalHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );
    }

    // Replace head tags: remove existing title/meta/canonical/og/twitter tags from template to avoid duplicates
    finalHtml = finalHtml.replace(/<title>.*?<\/title>/gi, '');
    finalHtml = finalHtml.replace(/<meta\s+name=["']description["'][^>]*>/gi, '');
    finalHtml = finalHtml.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
    finalHtml = finalHtml.replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '');
    finalHtml = finalHtml.replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');
    finalHtml = finalHtml.replace(/<meta\s+name=["']robots["'][^>]*>/gi, '');

    // Inject our freshly rendered tags right after <head>
    finalHtml = finalHtml.replace('<head>', `<head>${headInject}`);

    // 5. Determine Target File Path
    let targetFilePath = '';
    if (pagePath === '/') {
      targetFilePath = path.resolve(distDir, 'index.html');
    } else if (pagePath === '/404') {
      targetFilePath = path.resolve(distDir, '404.html');
    } else {
      const cleanSubPath = pagePath.replace(/^\/+/, '');
      const subDir = path.resolve(distDir, cleanSubPath);
      fs.mkdirSync(subDir, { recursive: true });
      targetFilePath = path.resolve(subDir, 'index.html');

      // Also create `subPath.html` for servers that check .html directly
      const flatHtmlPath = path.resolve(distDir, `${cleanSubPath}.html`);
      fs.mkdirSync(path.dirname(flatHtmlPath), { recursive: true });
      fs.writeFileSync(flatHtmlPath, finalHtml, 'utf-8');
    }

    fs.writeFileSync(targetFilePath, finalHtml, 'utf-8');
    console.log(`[SSG] Generated: ${pagePath} -> ${path.relative(rootDir, targetFilePath)}`);
  }

  // 6. Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  const publicRobots = path.resolve(rootDir, 'public', 'robots.txt');
  if (fs.existsSync(path.dirname(publicRobots))) {
    fs.writeFileSync(publicRobots, robotsTxt, 'utf-8');
  }
  console.log('[SSG] Generated: robots.txt');

  // 7. Generate sitemap.xml (exactly 11 indexed URLs from shared routes)
  const today = new Date().toISOString().split('T')[0];
  const escapeXml = (unsafe: string) =>
    unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  for (const p of INDEXED_PATHS) {
    const rawLoc = `${SITE_URL}${p === '/' ? '' : p}`;
    const loc = escapeXml(rawLoc);
    sitemapXml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
  </url>
`;
  }
  sitemapXml += `</urlset>\n`;

  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  const publicSitemap = path.resolve(rootDir, 'public', 'sitemap.xml');
  if (fs.existsSync(path.dirname(publicSitemap))) {
    fs.writeFileSync(publicSitemap, sitemapXml, 'utf-8');
  }
  console.log(`[SSG] Generated: sitemap.xml with ${INDEXED_PATHS.length} URLs`);

  console.log('--- SSG Prerendering Completed Successfully ---');
}

runPrerender().catch((err) => {
  console.error('SSG Prerendering Error:', err);
  process.exit(1);
});
