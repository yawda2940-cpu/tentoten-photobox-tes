import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import {
  SITE_URL,
  getRouteMeta,
  ALL_PATHS,
  ROUTES,
  SITEMAP_TYPE_MAP,
  type RouteType,
  GA_ID,
  GOOGLE_SITE_VERIFICATION,
  BING_SITE_VERIFICATION,
} from '../src/site.config';
import { getPageSchemas } from '../src/seo.schema';
import { loadPublishedPosts, getTodayJakarta, type ArticlePost } from './load-posts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

function getImageMimeType(imagePath: string): string {
  const ext = path.extname(imagePath).toLowerCase();
  if (ext === '.webp') return 'image/webp';
  if (ext === '.png') return 'image/png';
  if (ext === '.avif') return 'image/avif';
  return 'image/jpeg';
}

function formatRfc822Wib(dateStr: string): string {
  // dateStr format: YYYY-MM-DD -> 00:00:00 +0700
  const dateObj = new Date(`${dateStr}T00:00:00+07:00`);
  if (Number.isNaN(dateObj.getTime())) {
    return new Date().toUTCString();
  }
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // Shift +7h to format exact WIB calendar day
  const wibDate = new Date(dateObj.getTime() + 7 * 60 * 60 * 1000);
  const dayName = days[wibDate.getUTCDay()];
  const dayNum = String(wibDate.getUTCDate()).padStart(2, '0');
  const monthName = months[wibDate.getUTCMonth()];
  const year = wibDate.getUTCFullYear();
  return `${dayName}, ${dayNum} ${monthName} ${year} 00:00:00 +0700`;
}

async function runPrerender() {
  console.log('--- Starting TentoTen Static Site Generation (SSG) ---');
  console.log(`Base SITE_URL: ${SITE_URL}`);

  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found! Run "vite build" first.');
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');
  const publishedPosts = loadPublishedPosts(rootDir);
  const postsBySlug = new Map<string, ArticlePost>(
    publishedPosts.map((post) => [post.slug, post])
  );

  // Bersihkan hasil build artikel sebelumnya agar draft/artikel terjadwal tidak tersisa di dist/
  const staleArtikelDir = path.resolve(distDir, 'artikel');
  if (fs.existsSync(staleArtikelDir)) {
    fs.rmSync(staleArtikelDir, { recursive: true, force: true });
  }
  const staleArtikelHtml = path.resolve(distDir, 'artikel.html');
  if (fs.existsSync(staleArtikelHtml)) {
    fs.unlinkSync(staleArtikelHtml);
  }

  for (const pagePath of ALL_PATHS) {
    const meta = getRouteMeta(pagePath);
    if (!meta) {
      console.warn(`No meta found for path: ${pagePath}`);
      continue;
    }

    const isPostPage =
      pagePath.startsWith('/artikel/') && !pagePath.startsWith('/artikel/halaman/');
    const postSlug = isPostPage ? pagePath.slice('/artikel/'.length) : '';
    const post = postSlug ? postsBySlug.get(postSlug) : undefined;

    const canonicalUrl = `${SITE_URL}${pagePath === '/' ? '' : pagePath}`;
    const ogImageUrl = post ? `${SITE_URL}${post.image}` : `${SITE_URL}/og-image.jpg`;
    const ogImageType = post ? getImageMimeType(post.image) : 'image/jpeg';
    const ogImageWidth = post ? String(post.imageWidth) : '1200';
    const ogImageHeight = post ? String(post.imageHeight) : '630';
    const ogImageAlt = post
      ? post.imageAlt
      : 'TentoTen Photobox - Booth photobox otomatis di kafe Jawa Timur';

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
    const safeTitle = escapeHtmlAttr(meta.title);
    const safeDescription = escapeHtmlAttr(meta.description);
    const safeImageAlt = escapeHtmlAttr(ogImageAlt);

    let headInject = '';

    // Title & Description
    headInject += `\n    <title>${escapeXml(meta.title)}</title>`;
    headInject += `\n    <meta name="description" content="${safeDescription}" />`;

    // Robots meta (noindex for 404, index,follow for others)
    if (meta.noindex) {
      headInject += `\n    <meta name="robots" content="noindex, nofollow" />`;
    } else {
      headInject += `\n    <meta name="robots" content="index, follow" />`;
    }

    // Canonical
    headInject += `\n    <link rel="canonical" href="${canonicalUrl}" />`;

    // OpenGraph
    headInject += `\n    <meta property="og:type" content="${post ? 'article' : 'website'}" />`;
    if (post) {
      headInject += `\n    <meta property="article:published_time" content="${post.date}T00:00:00+07:00" />`;
      headInject += `\n    <meta property="article:modified_time" content="${post.updated || post.date}T00:00:00+07:00" />`;
    }
    headInject += `\n    <meta property="og:locale" content="id_ID" />`;
    headInject += `\n    <meta property="og:site_name" content="TentoTen Photobox" />`;
    headInject += `\n    <meta property="og:title" content="${safeTitle}" />`;
    headInject += `\n    <meta property="og:description" content="${safeDescription}" />`;
    headInject += `\n    <meta property="og:url" content="${canonicalUrl}" />`;
    headInject += `\n    <meta property="og:image" content="${ogImageUrl}" />`;
    headInject += `\n    <meta property="og:image:type" content="${ogImageType}" />`;
    headInject += `\n    <meta property="og:image:width" content="${ogImageWidth}" />`;
    headInject += `\n    <meta property="og:image:height" content="${ogImageHeight}" />`;
    headInject += `\n    <meta property="og:image:alt" content="${safeImageAlt}" />`;

    // Twitter Card
    headInject += `\n    <meta name="twitter:card" content="summary_large_image" />`;
    headInject += `\n    <meta name="twitter:title" content="${safeTitle}" />`;
    headInject += `\n    <meta name="twitter:description" content="${safeDescription}" />`;
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
    finalHtml = finalHtml.replace(/<meta\s+property=["']article:[^"']+["'][^>]*>/gi, '');
    finalHtml = finalHtml.replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');
    finalHtml = finalHtml.replace(/<meta\s+name=["']robots["'][^>]*>/gi, '');

    // Ensure RSS <link rel="alternate"> exists
    if (!/rel=["']alternate["'][^>]*application\/rss\+xml/i.test(finalHtml)) {
      headInject += `\n    <link rel="alternate" type="application/rss+xml" title="TentoTen Photobox - Artikel" href="${SITE_URL}/feed.xml" />`;
    }

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

Sitemap: ${SITE_URL}/sitemap_index.xml
`;
  fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  const publicRobots = path.resolve(rootDir, 'public', 'robots.txt');
  if (fs.existsSync(path.dirname(publicRobots))) {
    fs.writeFileSync(publicRobots, robotsTxt, 'utf-8');
  }
  console.log('[SSG] Generated: robots.txt (pointing to sitemap_index.xml)');

  // 7. Generate Yoast-style Sitemap Index and Child Sitemaps
  const today = getTodayJakarta();

  // Group sitemap-eligible routes by type (exclude /404 and pagination inSitemap: false)
  const routesByType: Record<RouteType, typeof ROUTES> = {
    page: [],
    location: [],
    post: [],
  };

  for (const route of ROUTES) {
    if (route.indexable && route.inSitemap !== false && route.path !== '/404') {
      routesByType[route.type].push(route);
    }
  }

  // Ensure legacy sitemap.xml files are unlinked
  const legacyDistSitemap = path.resolve(distDir, 'sitemap.xml');
  if (fs.existsSync(legacyDistSitemap)) {
    fs.unlinkSync(legacyDistSitemap);
  }
  const legacyPublicSitemap = path.resolve(rootDir, 'public', 'sitemap.xml');
  if (fs.existsSync(legacyPublicSitemap)) {
    fs.unlinkSync(legacyPublicSitemap);
  }

  // Generate child sitemaps (page-sitemap.xml, location-sitemap.xml, post-sitemap.xml only if routes exist)
  const activeSitemaps: { fileName: string; loc: string; lastmod: string; count: number }[] = [];
  const typeOrder: RouteType[] = ['page', 'location', 'post'];

  for (const type of typeOrder) {
    const items = routesByType[type];
    const fileName = SITEMAP_TYPE_MAP[type];
    const targetDistPath = path.resolve(distDir, fileName);
    const targetPublicPath = path.resolve(rootDir, 'public', fileName);

    if (items.length > 0) {
      let childXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
      let maxLastmod = '';
      for (const item of items) {
        const rawLoc = `${SITE_URL}${item.path === '/' ? '' : item.path}`;
        const loc = escapeXml(rawLoc);
        const itemLastmod = item.lastmod || today;
        if (!maxLastmod || itemLastmod > maxLastmod) {
          maxLastmod = itemLastmod;
        }
        childXml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${itemLastmod}</lastmod>\n  </url>\n`;
      }
      childXml += `</urlset>\n`;

      fs.writeFileSync(targetDistPath, childXml, 'utf-8');
      if (fs.existsSync(path.dirname(targetPublicPath))) {
        fs.writeFileSync(targetPublicPath, childXml, 'utf-8');
      }

      activeSitemaps.push({
        fileName,
        loc: `${SITE_URL}/${fileName}`,
        lastmod: type === 'post' && maxLastmod ? maxLastmod : today,
        count: items.length,
      });

      console.log(`[SSG] Generated: ${fileName} with ${items.length} URLs`);
    } else {
      // Clean up stale file if 0 routes
      if (fs.existsSync(targetDistPath)) fs.unlinkSync(targetDistPath);
      if (fs.existsSync(targetPublicPath)) fs.unlinkSync(targetPublicPath);
    }
  }

  // Generate sitemap_index.xml
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const sitemap of activeSitemaps) {
    const loc = escapeXml(sitemap.loc);
    indexXml += `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${sitemap.lastmod}</lastmod>\n  </sitemap>\n`;
  }
  indexXml += `</sitemapindex>\n`;

  const distIndexSitemap = path.resolve(distDir, 'sitemap_index.xml');
  const publicIndexSitemap = path.resolve(rootDir, 'public', 'sitemap_index.xml');
  fs.writeFileSync(distIndexSitemap, indexXml, 'utf-8');
  if (fs.existsSync(path.dirname(publicIndexSitemap))) {
    fs.writeFileSync(publicIndexSitemap, indexXml, 'utf-8');
  }
  console.log(`[SSG] Generated: sitemap_index.xml with ${activeSitemaps.length} child sitemaps`);

  // 8. Generate RSS 2.0 Feed (dist/feed.xml & public/feed.xml)
  const latestPostDate =
    publishedPosts.length > 0 ? publishedPosts[0].date : today;
  const rssItemsXml = publishedPosts
    .slice(0, 20)
    .map((post) => {
      const link = escapeXml(`${SITE_URL}/artikel/${post.slug}`);
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${formatRfc822Wib(post.date)}</pubDate>`,
        `      <category>${escapeXml(post.category)}</category>`,
        `      <description>${escapeXml(post.description)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TentoTen Photobox - Artikel</title>
    <link>${SITE_URL}/artikel</link>
    <description>Panduan photobox walk-in, tips pose 35mm, custom frame, dan info lokasi kafe TentoTen di Jawa Timur.</description>
    <language>id</language>
    <lastBuildDate>${formatRfc822Wib(latestPostDate)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${rssItemsXml ? `${rssItemsXml}\n` : ''}  </channel>
</rss>
`;

  const distFeedPath = path.resolve(distDir, 'feed.xml');
  const publicFeedPath = path.resolve(rootDir, 'public', 'feed.xml');
  fs.writeFileSync(distFeedPath, feedXml, 'utf-8');
  if (fs.existsSync(path.dirname(publicFeedPath))) {
    fs.writeFileSync(publicFeedPath, feedXml, 'utf-8');
  }
  console.log(`[SSG] Generated: feed.xml with ${Math.min(publishedPosts.length, 20)} RSS item(s)`);

  console.log('--- SSG Prerendering Completed Successfully ---');
}

runPrerender().catch((err) => {
  console.error('SSG Prerendering Error:', err);
  process.exit(1);
});
