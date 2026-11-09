import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, INDEXED_ROUTES, ALL_ROUTES, ROUTES } from '../src/routes.ts';

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
// 1. Sitemap Index & Child Sitemaps Verification (Yoast / WordPress Style)
// -----------------------------------------------------------------------------
const sitemapIndexPath = path.resolve(distDir, 'sitemap_index.xml');
let allChildLocs = [];

// Stale single sitemap.xml check
const legacySitemapPath = path.resolve(distDir, 'sitemap.xml');
if (fs.existsSync(legacySitemapPath)) {
  errors.push(`dist/sitemap.xml lama masih ditemukan di dist/! Harus dihapus karena sekarang menggunakan sitemap_index.xml dan redirect 301.`);
}

if (!fs.existsSync(sitemapIndexPath)) {
  errors.push(`dist/sitemap_index.xml tidak ditemukan!`);
} else {
  const indexContent = fs.readFileSync(sitemapIndexPath, 'utf-8');

  // XML Header & Namespace
  if (!indexContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    errors.push('dist/sitemap_index.xml tidak memiliki deklarasi <?xml version="1.0" encoding="UTF-8"?> di awal file');
  }
  if (!indexContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    errors.push('dist/sitemap_index.xml tidak memiliki namespace http://www.sitemaps.org/schemas/sitemap/0.9 yang valid');
  }
  if (!indexContent.includes('<sitemapindex') || !indexContent.includes('</sitemapindex>')) {
    errors.push('dist/sitemap_index.xml tidak memiliki root element <sitemapindex> yang valid');
  }

  // Extract <sitemap> entries
  const sitemapEntryMatches = [...indexContent.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)];
  if (sitemapEntryMatches.length === 0) {
    errors.push('dist/sitemap_index.xml tidak memuat satu pun elemen <sitemap>!');
  }

  const registeredSitemapFiles = new Set();

  for (const entryMatch of sitemapEntryMatches) {
    const entryBlock = entryMatch[1];
    const locMatch = entryBlock.match(/<loc>(.*?)<\/loc>/);
    const lastmodMatch = entryBlock.match(/<lastmod>(.*?)<\/lastmod>/);

    if (!locMatch) {
      errors.push('Terdapat elemen <sitemap> tanpa <loc> di dalam dist/sitemap_index.xml');
      continue;
    }

    const loc = locMatch[1].trim();

    if (!lastmodMatch || !/^\d{4}-\d{2}-\d{2}$/.test(lastmodMatch[1].trim())) {
      errors.push(`Format <lastmod> pada sitemap index (${loc}) tidak valid: "${lastmodMatch ? lastmodMatch[1] : 'kosong'}" (harus YYYY-MM-DD)`);
    }

    if (!loc.startsWith('https://tentotenphotobox.biz.id/')) {
      errors.push(`URL sitemap pada sitemap_index.xml tidak berawalan https://tentotenphotobox.biz.id/: "${loc}"`);
    }

    const sitemapUrlObj = new URL(loc);
    const fileName = sitemapUrlObj.pathname.replace(/^\/+/, '');
    registeredSitemapFiles.add(fileName);

    const childSitemapDistPath = path.resolve(distDir, fileName);
    if (!fs.existsSync(childSitemapDistPath)) {
      errors.push(`Sitemap anak yang terdaftar di index tidak ditemukan di dist/: ${fileName} (target: ${childSitemapDistPath})`);
    }
  }

  // Find all child sitemap files in dist/
  const distFiles = fs.readdirSync(distDir);
  const childSitemapFilesOnDisk = distFiles.filter(
    (f) => f.endsWith('-sitemap.xml') || (f.endsWith('.xml') && f !== 'sitemap_index.xml')
  );

  // Check no unlisted child sitemap exists on disk
  for (const diskFile of childSitemapFilesOnDisk) {
    if (!registeredSitemapFiles.has(diskFile)) {
      errors.push(`Ditemukan file sitemap anak di dist/ yang tidak terdaftar di sitemap_index.xml: ${diskFile}`);
    }
  }

  // Verify post-sitemap.xml is NOT present when no post routes exist
  const postRoutesCount = ROUTES.filter((r) => r.type === 'post' && r.indexable).length;
  if (postRoutesCount === 0) {
    if (fs.existsSync(path.resolve(distDir, 'post-sitemap.xml'))) {
      errors.push(`dist/post-sitemap.xml tidak boleh dibuat karena tidak ada rute bertipe "post"!`);
    }
    if (registeredSitemapFiles.has('post-sitemap.xml')) {
      errors.push(`dist/sitemap_index.xml tidak boleh memuat "post-sitemap.xml" karena tidak ada rute bertipe "post"!`);
    }
  }

  // Inspect each child sitemap
  for (const childFileName of registeredSitemapFiles) {
    const childPath = path.resolve(distDir, childFileName);
    if (!fs.existsSync(childPath)) continue;

    const childContent = fs.readFileSync(childPath, 'utf-8');

    if (!childContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
      errors.push(`dist/${childFileName} tidak memiliki deklarasi <?xml version="1.0" encoding="UTF-8"?> di awal file`);
    }
    if (!childContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      errors.push(`dist/${childFileName} tidak memiliki namespace http://www.sitemaps.org/schemas/sitemap/0.9`);
    }
    if (!childContent.includes('<urlset') || !childContent.includes('</urlset>')) {
      errors.push(`dist/${childFileName} tidak memiliki root element <urlset> yang valid`);
    }

    const urlMatches = [...childContent.matchAll(/<url>([\s\S]*?)<\/url>/g)];
    if (urlMatches.length === 0) {
      errors.push(`Sitemap anak dist/${childFileName} kosong (tidak memiliki elemen <url>)!`);
    }

    for (const urlMatch of urlMatches) {
      const block = urlMatch[1];
      const locMatch = block.match(/<loc>(.*?)<\/loc>/);
      const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/);

      if (!locMatch) {
        errors.push(`Terdapat <url> tanpa <loc> di dalam dist/${childFileName}`);
        continue;
      }

      const loc = locMatch[1].trim();
      allChildLocs.push(loc);

      if (!lastmodMatch || !/^\d{4}-\d{2}-\d{2}$/.test(lastmodMatch[1].trim())) {
        errors.push(`Format <lastmod> pada ${childFileName} (${loc}) tidak valid: "${lastmodMatch ? lastmodMatch[1] : 'kosong'}"`);
      }
    }
  }

  // Check combined <loc> count across child sitemaps
  if (allChildLocs.length !== INDEXED_ROUTES.length) {
    errors.push(
      `Gabungan URL di seluruh sitemap anak harus tepat ${INDEXED_ROUTES.length} URL, ditemukan: ${allChildLocs.length}`
    );
  }

  // Check duplicates across child sitemaps
  const uniqueChildLocs = new Set(allChildLocs);
  if (uniqueChildLocs.size !== allChildLocs.length) {
    errors.push(`Terdapat URL duplikat di antara sitemap anak!`);
  }

  // Check /404 in sitemaps
  if (allChildLocs.some((loc) => loc.includes('/404'))) {
    errors.push(`Sitemap anak TIDAK BOLEH memuat rute /404!`);
  }

  // Check domain prefix, HTML existence, canonical parity, and noindex
  for (const loc of allChildLocs) {
    if (!loc.startsWith('https://tentotenphotobox.biz.id')) {
      errors.push(`URL di sitemap anak tidak berawalan https://tentotenphotobox.biz.id: "${loc}"`);
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
  if (!robotsContent.includes('Sitemap: https://tentotenphotobox.biz.id/sitemap_index.xml')) {
    errors.push('dist/robots.txt tidak memuat arahan "Sitemap: https://tentotenphotobox.biz.id/sitemap_index.xml"');
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
// 5. Assets Check (og-image.jpg) - Header SOF & Dimension Validation (Zero-Dependency)
// -----------------------------------------------------------------------------
const ogImagePath = path.resolve(distDir, 'og-image.svg');
if (!fs.existsSync(ogImagePath)) {
  errors.push(`dist/og-image.jpg tidak ditemukan!`);
} else {
  const stat = fs.statSync(ogImagePath);
  if (stat.size < 10 * 1024 || stat.size > 300 * 1024) {
    errors.push(`Ukuran dist/og-image.svg tidak valid: ${(stat.size / 1024).toFixed(1)} KB (harus antara 10 KB dan 300 KB)`);
  }

  const buffer = fs.readFileSync(ogImagePath);
  if (buffer.length < 2 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    errors.push(`Header dist/og-image.svg tidak valid JPEG (harus dimulai dengan svg)`);
  } else {
    let offset = 2;
    let dimensions = null;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buffer[offset + 1];
      if (
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf)
      ) {
        if (offset + 9 <= buffer.length) {
          const height = buffer.readUInt16BE(offset + 5);
          const width = buffer.readUInt16BE(offset + 7);
          dimensions = { width, height };
        }
        break;
      }
      if (marker === 0xd9 || marker === 0xda) break;
      if (offset + 4 > buffer.length) break;
      const length = buffer.readUInt16BE(offset + 2);
      offset += 2 + length;
    }

    if (!dimensions) {
      errors.push(`Gagal membaca dimensi SOF dari header dist/og-image.svg`);
    } else if (dimensions.width !== 1200 || dimensions.height !== 630) {
      errors.push(`Dimensi dist/og-image.svg bukan 1200x630, melainkan ${dimensions.width}x${dimensions.height}`);
    }
  }
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
  } else {
    // 120-150 character hard range check
    if (description.length < 120 || description.length > 150) {
      errors.push(
        `[${route}] Panjang meta description tidak valid: ${description.length} karakter (harus 120-150 karakter): "${description}"`
      );
    }

    if (route !== '/404') {
      if (descriptionsSeen.has(description)) {
        errors.push(`[${route}] Meta description duplikat dengan rute ${descriptionsSeen.get(description)}: "${description}"`);
      } else {
        descriptionsSeen.set(description, route);
      }
    }
  }

  // Location pages keyword check: must include "photobox", city name, and cafe name
  if (route.startsWith('/location/')) {
    const slug = route.replace('/location/', '');
    const locationCafeMap = {
      madiun: { city: 'madiun', cafe: 'sthana' },
      jombang: { city: 'jombang', cafe: 'ethereal' },
      ponorogo: { city: 'ponorogo', cafe: 'komahaus' },
      kertosono: { city: 'kertosono', cafe: 'keyf' },
    };
    const req = locationCafeMap[slug];
    if (req) {
      const lowerDesc = description.toLowerCase();
      if (!lowerDesc.includes('photobox')) {
        errors.push(`[${route}] Meta description tidak memuat kata "photobox": "${description}"`);
      }
      if (!lowerDesc.includes(req.city)) {
        errors.push(`[${route}] Meta description tidak memuat nama kota "${req.city}": "${description}"`);
      }
      if (!lowerDesc.includes(req.cafe)) {
        errors.push(`[${route}] Meta description tidak memuat nama kafe "${req.cafe}": "${description}"`);
      }
    }
  }

  // og:description and twitter:description consistency
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i);
  const ogDescription = ogDescMatch ? ogDescMatch[1].trim() : '';
  if (ogDescription !== description) {
    errors.push(`[${route}] og:description tidak identik dengan meta description: "${ogDescription}" !== "${description}"`);
  }

  const twitterDescMatch = html.match(/<meta\s+name=["']twitter:description["']\s+content=["']([\s\S]*?)["']/i);
  const twitterDescription = twitterDescMatch ? twitterDescMatch[1].trim() : '';
  if (twitterDescription !== description) {
    errors.push(`[${route}] twitter:description tidak identik dengan meta description: "${twitterDescription}" !== "${description}"`);
  }

  // OpenGraph Image & Twitter Image checks (must be absolute https://tentotenphotobox.biz.id/og-image.jpg)
  const ogImgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([\s\S]*?)["']/i);
  const ogImage = ogImgMatch ? ogImgMatch[1].trim() : '';
  if (ogImage !== 'https://tentotenphotobox.biz.id/og-image.svg') {
    errors.push(`[${route}] og:image bukan "https://tentotenphotobox.biz.id/og-image.svg", melainkan: "${ogImage}"`);
  }

  const twitterImgMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([\s\S]*?)["']/i);
  const twitterImage = twitterImgMatch ? twitterImgMatch[1].trim() : '';
  if (twitterImage !== 'https://tentotenphotobox.biz.id/og-image.svg') {
    errors.push(`[${route}] twitter:image bukan "https://tentotenphotobox.biz.id/og-image.svg", melainkan: "${twitterImage}"`);
  }

  const ogImgWidth = html.match(/<meta\s+property=["']og:image:width["']\s+content=["']([\s\S]*?)["']/i);
  if (!ogImgWidth || ogImgWidth[1].trim() !== '1200') {
    errors.push(`[${route}] og:image:width bukan 1200: "${ogImgWidth ? ogImgWidth[1] : 'kosong'}"`);
  }

  const ogImgHeight = html.match(/<meta\s+property=["']og:image:height["']\s+content=["']([\s\S]*?)["']/i);
  if (!ogImgHeight || ogImgHeight[1].trim() !== '630') {
    errors.push(`[${route}] og:image:height bukan 630: "${ogImgHeight ? ogImgHeight[1] : 'kosong'}"`);
  }

  const ogImgType = html.match(/<meta\s+property=["']og:image:type["']\s+content=["']([\s\S]*?)["']/i);
  if (!ogImgType || ogImgType[1].trim() !== 'image/jpeg') {
    errors.push(`[${route}] og:image:type bukan image/jpeg: "${ogImgType ? ogImgType[1] : 'kosong'}"`);
  }

  const ogImgAlt = html.match(/<meta\s+property=["']og:image:alt["']\s+content=["']([\s\S]*?)["']/i);
  if (!ogImgAlt || !ogImgAlt[1].trim()) {
    errors.push(`[${route}] og:image:alt kosong atau tidak ditemukan`);
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

// -----------------------------------------------------------------------------
// 11. Image Size & Asset Integrity Audit (< 150 KB and no Copy_of_*.png references)
// -----------------------------------------------------------------------------
function auditDistAssets(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      auditDistAssets(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      // Check image sizes in dist/ (all images must be <= 150 KB)
      if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
        const stat = fs.statSync(fullPath);
        const sizeKb = stat.size / 1024;
        if (sizeKb > 150) {
          errors.push(
            `Ukuran gambar di dist/ melebihi 150 KB: ${path.relative(rootDir, fullPath)} (${sizeKb.toFixed(1)} KB)`
          );
        }
      }
      // Check that no HTML, JS, CSS, JSON, or XML file references Copy_of_*.png
      if (['.html', '.js', '.css', '.json', '.xml'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (/Copy_of_[a-zA-Z0-9_]+\.png/i.test(content)) {
          errors.push(
            `Ditemukan referensi ke Copy_of_*.png di dalam: ${path.relative(rootDir, fullPath)}`
          );
        }
      }
    }
  }
}

if (fs.existsSync(distDir)) {
  auditDistAssets(distDir);
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
