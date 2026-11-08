import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, INDEXED_ROUTES, ALL_ROUTES } from '../src/routes.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

let errors = [];
let auditSummary = [];

console.log('=== STARTING PRODUCTION SEO AUDIT ===');
console.log(`Target Domain / SITE_URL: ${SITE_URL}`);
console.log(`Total Indexed Routes expected: ${INDEXED_ROUTES.length}`);

// -----------------------------------------------------------------------------
// 1. Sitemap.xml Verification
// -----------------------------------------------------------------------------
const sitemapPath = path.resolve(distDir, 'sitemap.xml');
let sitemapLocs = [];

if (!fs.existsSync(sitemapPath)) {
  errors.push(`dist/sitemap.xml tidak ditemukan!`);
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

  // XML Header & Namespace
  if (!sitemapContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    errors.push('dist/sitemap.xml tidak memiliki deklarasi <?xml version="1.0" encoding="UTF-8"?> di awal file');
  }
  if (!sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    errors.push('dist/sitemap.xml tidak memiliki namespace http://www.sitemaps.org/schemas/sitemap/0.9 yang valid');
  }

  // Extract <loc> entries
  const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)];
  sitemapLocs = locMatches.map((m) => m[1].trim());

  if (sitemapLocs.length !== INDEXED_ROUTES.length) {
    errors.push(
      `dist/sitemap.xml harus berisi tepat ${INDEXED_ROUTES.length} URL, ditemukan: ${sitemapLocs.length}`
    );
  }

  // Check duplicates
  const uniqueLocs = new Set(sitemapLocs);
  if (uniqueLocs.size !== sitemapLocs.length) {
    errors.push(`dist/sitemap.xml memiliki URL duplikat!`);
  }

  // Check /404 in sitemap
  if (sitemapLocs.some((loc) => loc.includes('/404'))) {
    errors.push(`dist/sitemap.xml TIDAK BOLEH memuat rute /404!`);
  }

  // Check domain prefix & canonical mapping
  for (const loc of sitemapLocs) {
    if (!loc.startsWith('https://tentotenphotobox.biz.id')) {
      errors.push(`URL di sitemap.xml tidak berawalan https://tentotenphotobox.biz.id: "${loc}"`);
    }

    // Determine expected relative path
    const urlObj = new URL(loc);
    const pathname = urlObj.pathname.replace(/\/+$/, '') || '/';
    const cleanSubPath = pathname === '/' ? '' : pathname.replace(/^\/+/, '');
    const candidateFile = cleanSubPath
      ? path.resolve(distDir, cleanSubPath, 'index.html')
      : path.resolve(distDir, 'index.html');

    if (!fs.existsSync(candidateFile)) {
      errors.push(`File HTML padanan untuk URL sitemap ${loc} tidak ditemukan di: ${candidateFile}`);
    } else {
      const pageHtml = fs.readFileSync(candidateFile, 'utf-8');
      const canonicalMatch = pageHtml.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
      const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

      if (canonical !== loc) {
        errors.push(
          `URL sitemap (${loc}) TIDAK IDENTIK dengan canonical halaman (${canonical}) di ${candidateFile}`
        );
      }

      // Check noindex on sitemap pages
      const robotsMeta = pageHtml.match(/<meta\s+name=["']robots["']\s+content=["']([\s\S]*?)["']/i);
      if (robotsMeta && /noindex/i.test(robotsMeta[1])) {
        errors.push(`Halaman di sitemap ${loc} mengandung meta robots noindex: "${robotsMeta[1]}"`);
      }
    }
  }
}

// -----------------------------------------------------------------------------
// 2. Robots.txt Verification
// -----------------------------------------------------------------------------
const robotsPath = path.resolve(distDir, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  errors.push(`dist/robots.txt tidak ditemukan!`);
} else {
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
  if (!robotsContent.includes('Sitemap: https://tentotenphotobox.biz.id/sitemap.xml')) {
    errors.push('dist/robots.txt tidak memuat arahan "Sitemap: https://tentotenphotobox.biz.id/sitemap.xml"');
  }
  if (/Disallow:\s*\/\s*$/m.test(robotsContent)) {
    errors.push('dist/robots.txt memblokir seluruh situs dengan "Disallow: /"');
  }
  if (!/Allow:\s*\//.test(robotsContent)) {
    errors.push('dist/robots.txt tidak memiliki deklarasi "Allow: /"');
  }
}

// -----------------------------------------------------------------------------
// 3. 404.html Verification
// -----------------------------------------------------------------------------
const notFoundPath = path.resolve(distDir, '404.html');
if (!fs.existsSync(notFoundPath)) {
  errors.push(`dist/404.html tidak ditemukan!`);
} else {
  const notFoundHtml = fs.readFileSync(notFoundPath, 'utf-8');
  const robotsMatch = notFoundHtml.match(/<meta\s+name=["']robots["']\s+content=["']([\s\S]*?)["']/i);
  if (!robotsMatch || !/noindex/i.test(robotsMatch[1])) {
    errors.push(`dist/404.html harus memiliki tag <meta name="robots" content="noindex, nofollow" />`);
  }
}

// -----------------------------------------------------------------------------
// 4. Location Pages Check
// -----------------------------------------------------------------------------
const locationSlugs = ['madiun', 'jombang', 'ponorogo', 'kertosono'];
let foundLocationPages = 0;
for (const slug of locationSlugs) {
  const locPath = path.resolve(distDir, 'location', slug, 'index.html');
  if (fs.existsSync(locPath)) {
    foundLocationPages++;
  } else {
    errors.push(`Missing location detail file for: /location/${slug} at ${locPath}`);
  }
}

if (foundLocationPages < 4) {
  errors.push(`Rule violation: kurang dari 4 halaman /location/<slug> (ditemukan: ${foundLocationPages})`);
}

// -----------------------------------------------------------------------------
// 5. Assets Check (og-image.jpg)
// -----------------------------------------------------------------------------
const ogImagePath = path.resolve(distDir, 'og-image.jpg');
if (!fs.existsSync(ogImagePath)) {
  errors.push(`dist/og-image.jpg tidak ditemukan!`);
}

// -----------------------------------------------------------------------------
// 6. No Old Domain "tentoten.id" in entire dist/ directory
// -----------------------------------------------------------------------------
function checkNoOldDomainInDist(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      checkNoOldDomainInDist(fullPath);
    } else if (entry.isFile()) {
      // Check text-based files
      const ext = path.extname(entry.name).toLowerCase();
      if (['.html', '.xml', '.txt', '.json', '.js', '.css', '.svg'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes('tentoten.id')) {
          errors.push(`Ditemukan string domain lama "tentoten.id" di: ${path.relative(rootDir, fullPath)}`);
        }
      }
    }
  }
}

if (fs.existsSync(distDir)) {
  checkNoOldDomainInDist(distDir);
}

// -----------------------------------------------------------------------------
// 7. Per-Route Page Checks (H1, Title, Description, Canonical, Img, JSON-LD, Words)
// -----------------------------------------------------------------------------
const titlesSeen = new Map();
const descriptionsSeen = new Map();

for (const route of ALL_ROUTES) {
  let filePath = '';
  if (route === '/') {
    filePath = path.resolve(distDir, 'index.html');
  } else if (route === '/404') {
    filePath = path.resolve(distDir, '404.html');
  } else {
    const clean = route.replace(/^\/+/, '');
    filePath = path.resolve(distDir, clean, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    errors.push(`File tidak ditemukan untuk rute ${route}: ${filePath}`);
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  // 7a. Tepat SATU <h1>
  const h1Matches = html.match(/<h1[\s>][\s\S]*?<\/h1>/gi) || [];
  if (h1Matches.length !== 1) {
    errors.push(`[${route}] Pelanggaran H1: Harus memiliki tepat SATU <h1>, ditemukan: ${h1Matches.length}`);
  }
  const h1Text = h1Matches[0] ? h1Matches[0].replace(/<[^>]+>/g, '').trim() : '';

  // 7b. Title & Description
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) {
    errors.push(`[${route}] Title kosong!`);
  } else if (route !== '/404') {
    if (titlesSeen.has(title)) {
      errors.push(`[${route}] Title duplikat dengan rute ${titlesSeen.get(title)}: "${title}"`);
    } else {
      titlesSeen.set(title, route);
    }
  }

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const description = descMatch ? descMatch[1].trim() : '';
  if (!description) {
    errors.push(`[${route}] Meta description kosong!`);
  } else if (route !== '/404') {
    if (descriptionsSeen.has(description)) {
      errors.push(`[${route}] Meta description duplikat dengan rute ${descriptionsSeen.get(description)}`);
    } else {
      descriptionsSeen.set(description, route);
    }
  }

  // 7c. Canonical absolut
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
  if (route !== '/404') {
    if (!canonical) {
      errors.push(`[${route}] Canonical link tidak ditemukan!`);
    } else if (!canonical.startsWith('https://tentotenphotobox.biz.id')) {
      errors.push(`[${route}] Canonical tidak berawalan https://tentotenphotobox.biz.id: "${canonical}"`);
    }
  }

  // 7d. Semua <img> harus memiliki alt, width, dan height
  const imgTags = html.match(/<img[\s\S]*?>/gi) || [];
  for (const img of imgTags) {
    const hasAlt = /alt=["'][^"']*["']/i.test(img);
    const hasWidth = /width=["']?\d+["']?/i.test(img);
    const hasHeight = /height=["']?\d+["']?/i.test(img);
    if (!hasAlt) {
      errors.push(`[${route}] Tag <img> tanpa atribut alt: ${img.substring(0, 80)}`);
    }
    if (!hasWidth || !hasHeight) {
      errors.push(`[${route}] Tag <img> tanpa width/height eksplisit: ${img.substring(0, 80)}`);
    }
  }

  // 7e. JSON-LD valid JSON
  const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  let jsonLdTypes = [];
  for (const script of jsonLdMatches) {
    const jsonContent = script
      .replace(/<script type="application\/ld\+json">/i, '')
      .replace(/<\/script>/i, '')
      .trim();
    try {
      const parsed = JSON.parse(jsonContent);
      if (Array.isArray(parsed)) {
        parsed.forEach((p) => p['@type'] && jsonLdTypes.push(p['@type']));
      } else if (parsed['@type']) {
        jsonLdTypes.push(parsed['@type']);
      }
    } catch (e) {
      errors.push(`[${route}] JSON-LD tidak valid JSON: ${e.message}`);
    }
  }

  // 7f. Tidak ada TODO, lorem, atau href="#"
  if (/TODO/i.test(html)) {
    errors.push(`[${route}] Ditemukan kata "TODO" di dalam HTML!`);
  }
  if (/lorem\s+ipsum/i.test(html)) {
    errors.push(`[${route}] Ditemukan teks "lorem ipsum" di dalam HTML!`);
  }
  if (/href=["']#["']/i.test(html) || /href=["']#\//i.test(html)) {
    errors.push(`[${route}] Ditemukan tautan href="#" atau hash routing di dalam HTML!`);
  }

  // 7g. Tidak ada kata "franchise", "rental", "wedding"
  const forbiddenServiceWords = ['franchise', 'rental', 'wedding'];
  for (const word of forbiddenServiceWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(html)) {
      errors.push(`[${route}] Ditemukan kata terlarang "${word}" di dalam HTML statis!`);
    }
  }

  // 7h. Footer menautkan /kebijakan-privasi di semua halaman
  if (!html.includes('href="/kebijakan-privasi"')) {
    errors.push(`[${route}] Halaman tidak memuat tautan ke /kebijakan-privasi di footer/body!`);
  }

  // 7i. Teks utama ada di HTML statis (Word count text check)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  bodyContent = bodyContent.replace(/<style[\s\S]*?<\/style>/gi, '');
  const plainText = bodyContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText ? plainText.split(' ').filter(Boolean).length : 0;

  if (wordCount < 50) {
    errors.push(`[${route}] Teks utama tidak ada atau terlalu sedikit di HTML statis! (Ditemukan hanya ${wordCount} kata)`);
  }

  auditSummary.push({
    route,
    title,
    description: description.substring(0, 50) + '...',
    canonical,
    h1: h1Text,
    jsonLd: [...new Set(jsonLdTypes)].join(', ') || '-',
    words: wordCount
  });
}

// -----------------------------------------------------------------------------
// 8. Orphan Page Check: All 11 indexed routes reachable from Homepage (index.html)
// -----------------------------------------------------------------------------
const homeHtmlPath = path.resolve(distDir, 'index.html');
if (fs.existsSync(homeHtmlPath)) {
  const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');
  for (const r of INDEXED_ROUTES) {
    if (r === '/') continue;
    // Check if r is referenced in an href
    const escapedRoute = r.replace('/', '\\/');
    const linkRegex = new RegExp(`href=["']${escapedRoute}["']`, 'i');
    if (!linkRegex.test(homeHtml)) {
      errors.push(`Halaman yatim (orphan page): rute "${r}" tidak terjangkau via <a href> dari Beranda (/)`);
    }
  }
}

// -----------------------------------------------------------------------------
// 9. TikTok Creator Videos & External Links Security Check
// -----------------------------------------------------------------------------
if (fs.existsSync(homeHtmlPath)) {
  const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');
  const homeTikTokMatches = homeHtml.match(/https:\/\/vt\.tiktok\.com\/[a-zA-Z0-9_-]+\/?/g) || [];
  const uniqueHomeTikTok = new Set(homeTikTokMatches);
  if (uniqueHomeTikTok.size < 3) {
    errors.push(`dist/index.html harus memuat minimal 3 tautan video TikTok kreator (ditemukan: ${uniqueHomeTikTok.size})`);
  }
}

const serviceHtmlPath = path.resolve(distDir, 'service', 'index.html');
if (fs.existsSync(serviceHtmlPath)) {
  const serviceHtml = fs.readFileSync(serviceHtmlPath, 'utf-8');
  const serviceTikTokMatches = serviceHtml.match(/https:\/\/vt\.tiktok\.com\/[a-zA-Z0-9_-]+\/?/g) || [];
  const uniqueServiceTikTok = new Set(serviceTikTokMatches);
  if (uniqueServiceTikTok.size < 6) {
    errors.push(`dist/service/index.html harus memuat tepat 6 tautan video TikTok kreator (ditemukan: ${uniqueServiceTikTok.size})`);
  }
}

// Check target="_blank" safety (rel="noopener noreferrer") on all HTML files
function checkTargetBlankRel(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      checkTargetBlankRel(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const html = fs.readFileSync(fullPath, 'utf-8');
      const blankLinks = html.match(/<a\b[^>]*target=["']_blank["'][^>]*>/gi) || [];
      for (const link of blankLinks) {
        const hasNoopener = /rel=["'][^"']*noopener[^"']*["']/i.test(link);
        const hasNoreferrer = /rel=["'][^"']*noreferrer[^"']*["']/i.test(link);
        if (!hasNoopener || !hasNoreferrer) {
          errors.push(`Tautan target="_blank" tanpa rel="noopener noreferrer" di ${path.relative(rootDir, fullPath)}: ${link.substring(0, 100)}`);
        }
      }
    }
  }
}

if (fs.existsSync(distDir)) {
  checkTargetBlankRel(distDir);
}

// -----------------------------------------------------------------------------
// 10. Creator Thumbnail Assets Verification (dist/assets/creators/kreator-[1-6].webp)
// -----------------------------------------------------------------------------
const creatorThumbnailDir = path.resolve(distDir, 'assets', 'creators');
for (let i = 1; i <= 6; i++) {
  const thumbPath = path.resolve(creatorThumbnailDir, `kreator-${i}.webp`);
  if (!fs.existsSync(thumbPath)) {
    errors.push(`File thumbnail kreator tidak ditemukan: dist/assets/creators/kreator-${i}.webp`);
  } else {
    const stat = fs.statSync(thumbPath);
    if (stat.size === 0) {
      errors.push(`File thumbnail kreator kosong (0 bytes): dist/assets/creators/kreator-${i}.webp`);
    }
  }
}

console.log('\n--- RINGKASAN AUDIT PER RUTE ---');
console.table(auditSummary);

if (errors.length > 0) {
  console.error('\n❌ AUDIT SEO GAGAL! Ditemukan kesalahan:');
  errors.forEach((err, i) => console.error(`${i + 1}. ${err}`));
  process.exit(1);
} else {
  console.log('\n✅ SEMUA ATURAN AUDIT SEO LOLOS 100%! Tidak ada kesalahan.');
  process.exit(0);
}
