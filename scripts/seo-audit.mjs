import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_URL,
  INDEXED_ROUTES,
  PAGINATION_PATHS,
  CRAWLABLE_ROUTES,
  ALL_ROUTES,
  ROUTES,
  POSTS_PER_PAGE,
} from '../src/routes.ts';
import { CREATOR_VIDEOS } from '../src/data/creatorVideos.ts';
import { loadPostsReport } from './load-posts.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

let errors = [];
let auditSummary = [];

const postsReport = loadPostsReport(rootDir);
const publishedPosts = postsReport.published;
const excludedPosts = postsReport.excluded;
const postsBySlug = new Map(publishedPosts.map((p) => [p.slug, p]));

console.log('=== STARTING PRODUCTION SEO AUDIT ===');
console.log(`Target Domain / SITE_URL: ${SITE_URL}`);
console.log(`Total Indexed (Sitemap) Routes expected: ${INDEXED_ROUTES.length}`);
console.log(`Published Articles: ${publishedPosts.length} (Excluded draft/scheduled: ${excludedPosts.length})`);

// Helper: Normalize internal path
function normalizePath(href) {
  if (!href) return '/';
  const withoutHash = href.split('#')[0].split('?')[0];
  const clean = withoutHash.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

// Helper: Resolve case-sensitive path on disk from distDir + webPath
function existsCaseSensitive(baseDir, webPath) {
  const clean = webPath.replace(/^\/+/, '');
  if (!clean) return false;
  const parts = clean.split('/').filter(Boolean);
  let cur = baseDir;
  for (const part of parts) {
    if (!fs.existsSync(cur) || !fs.statSync(cur).isDirectory()) return false;
    const entries = fs.readdirSync(cur);
    if (!entries.includes(part)) return false;
    cur = path.join(cur, part);
  }
  return fs.existsSync(cur) && fs.statSync(cur).isFile();
}

// Helper: Expected MIME type from image path
function expectedMimeForImage(imgPath) {
  const ext = path.extname(imgPath).toLowerCase();
  if (ext === '.webp') return 'image/webp';
  if (ext === '.png') return 'image/png';
  if (ext === '.avif') return 'image/avif';
  return 'image/jpeg';
}

// Helper: Word overlap similarity between two plain text strings (Sorensen-Dice / Jaccard over unique tokens & multiset)
function computeWordOverlapSimilarity(textA, textB) {
  const tokenize = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 2);
  const wordsA = tokenize(textA);
  const wordsB = tokenize(textB);
  if (wordsA.length === 0 || wordsB.length === 0) return 0;

  const freqA = new Map();
  for (const w of wordsA) freqA.set(w, (freqA.get(w) || 0) + 1);
  const freqB = new Map();
  for (const w of wordsB) freqB.set(w, (freqB.get(w) || 0) + 1);

  let intersection = 0;
  for (const [word, countA] of freqA.entries()) {
    const countB = freqB.get(word) || 0;
    intersection += Math.min(countA, countB);
  }
  return (2 * intersection) / (wordsA.length + wordsB.length);
}

// -----------------------------------------------------------------------------
// 1. Sitemap Index & Child Sitemaps Verification (Yoast / WordPress Style)
// -----------------------------------------------------------------------------
const sitemapIndexPath = path.resolve(distDir, 'sitemap_index.xml');
let allChildLocs = [];

const legacySitemapPath = path.resolve(distDir, 'sitemap.xml');
if (fs.existsSync(legacySitemapPath)) {
  errors.push(`dist/sitemap.xml lama masih ditemukan di dist/! Harus dihapus karena menggunakan sitemap_index.xml.`);
}

if (!fs.existsSync(sitemapIndexPath)) {
  errors.push(`dist/sitemap_index.xml tidak ditemukan!`);
} else {
  const indexContent = fs.readFileSync(sitemapIndexPath, 'utf-8');

  if (!indexContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    errors.push('dist/sitemap_index.xml tidak memiliki deklarasi <?xml version="1.0" encoding="UTF-8"?> di awal file');
  }
  if (!indexContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    errors.push('dist/sitemap_index.xml tidak memiliki namespace http://www.sitemaps.org/schemas/sitemap/0.9 yang valid');
  }
  if (!indexContent.includes('<sitemapindex') || !indexContent.includes('</sitemapindex>')) {
    errors.push('dist/sitemap_index.xml tidak memiliki root element <sitemapindex> yang valid');
  }

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
      errors.push(`Sitemap anak yang terdaftar di index tidak ditemukan di dist/: ${fileName}`);
    }
  }

  const distFiles = fs.readdirSync(distDir);
  const childSitemapFilesOnDisk = distFiles.filter((f) => f.endsWith('-sitemap.xml'));
  for (const diskFile of childSitemapFilesOnDisk) {
    if (!registeredSitemapFiles.has(diskFile)) {
      errors.push(`Ditemukan file sitemap anak di dist/ yang tidak terdaftar di sitemap_index.xml: ${diskFile}`);
    }
  }

  // Verify post-sitemap.xml rules cleanly based on published posts count
  const postRoutes = ROUTES.filter((r) => r.type === 'post' && r.indexable && r.inSitemap !== false);
  const postSitemapDistPath = path.resolve(distDir, 'post-sitemap.xml');
  if (postRoutes.length === 0) {
    if (fs.existsSync(postSitemapDistPath)) {
      errors.push(`dist/post-sitemap.xml tidak boleh dibuat karena belum ada artikel terbit!`);
    }
    if (registeredSitemapFiles.has('post-sitemap.xml')) {
      errors.push(`dist/sitemap_index.xml tidak boleh memuat "post-sitemap.xml" karena belum ada artikel terbit!`);
    }
  } else {
    if (!fs.existsSync(postSitemapDistPath)) {
      errors.push(`dist/post-sitemap.xml wajib dibuat karena terdapat ${postRoutes.length} artikel terbit!`);
    }
    if (!registeredSitemapFiles.has('post-sitemap.xml')) {
      errors.push(`dist/sitemap_index.xml wajib mendaftarkan "post-sitemap.xml" karena terdapat ${postRoutes.length} artikel terbit!`);
    }
  }

  const postLastmodInSitemap = new Map();

  for (const childFileName of registeredSitemapFiles) {
    const childPath = path.resolve(distDir, childFileName);
    if (!fs.existsSync(childPath)) continue;

    const childContent = fs.readFileSync(childPath, 'utf-8');
    if (!childContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
      errors.push(`dist/${childFileName} tidak memiliki deklarasi <?xml version="1.0" encoding="UTF-8"?>`);
    }
    if (!childContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      errors.push(`dist/${childFileName} tidak memiliki namespace http://www.sitemaps.org/schemas/sitemap/0.9`);
    }
    if (!childContent.includes('<urlset') || !childContent.includes('</urlset>')) {
      errors.push(`dist/${childFileName} tidak memiliki root element <urlset> yang valid`);
    }

    const urlMatches = [...childContent.matchAll(/<url>([\s\S]*?)<\/url>/g)];
    if (urlMatches.length === 0) {
      errors.push(`Sitemap anak dist/${childFileName} kosong!`);
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

      const lastmod = lastmodMatch ? lastmodMatch[1].trim() : '';
      if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
        errors.push(`Format <lastmod> pada ${childFileName} (${loc}) tidak valid: "${lastmod}"`);
      }

      if (childFileName === 'post-sitemap.xml') {
        postLastmodInSitemap.set(loc, lastmod);
      }

      if (loc.includes('/artikel/halaman/')) {
        errors.push(`Halaman paginasi tidak boleh masuk ke dalam ${childFileName}: "${loc}"`);
      }
    }
  }

  // Verify post-sitemap <lastmod> matches frontmatter updated || date
  for (const post of publishedPosts) {
    const expectedLoc = `${SITE_URL}/artikel/${post.slug}`;
    const expectedLastmod = post.updated || post.date;
    if (!postLastmodInSitemap.has(expectedLoc)) {
      errors.push(`Artikel terbit "${expectedLoc}" belum terdaftar di post-sitemap.xml`);
    } else if (postLastmodInSitemap.get(expectedLoc) !== expectedLastmod) {
      errors.push(
        `<lastmod> di post-sitemap.xml untuk ${expectedLoc} (${postLastmodInSitemap.get(expectedLoc)}) tidak cocok dengan frontmatter (${expectedLastmod})`
      );
    }
  }

  // Combined <loc> count must match INDEXED_ROUTES.length
  if (allChildLocs.length !== INDEXED_ROUTES.length) {
    errors.push(
      `Gabungan URL di seluruh sitemap anak harus tepat ${INDEXED_ROUTES.length} URL, ditemukan: ${allChildLocs.length}`
    );
  }

  const uniqueChildLocs = new Set(allChildLocs);
  if (uniqueChildLocs.size !== allChildLocs.length) {
    errors.push(`Terdapat URL duplikat di antara sitemap anak!`);
  }

  if (allChildLocs.some((loc) => loc.includes('/404'))) {
    errors.push(`Sitemap anak TIDAK BOLEH memuat rute /404!`);
  }

  // Domain prefix, HTML existence, canonical parity, and noindex
  for (const loc of allChildLocs) {
    if (!loc.startsWith('https://tentotenphotobox.biz.id')) {
      errors.push(`URL di sitemap anak tidak berawalan https://tentotenphotobox.biz.id: "${loc}"`);
    }

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
        errors.push(`URL sitemap (${loc}) TIDAK IDENTIK dengan canonical halaman (${canonical}) di ${candidateFile}`);
      }

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
// 5. Assets Check (og-image.jpg) - Header SOF & Dimension Validation
// -----------------------------------------------------------------------------
const ogImagePath = path.resolve(distDir, 'og-image.jpg');
if (!fs.existsSync(ogImagePath)) {
  errors.push(`dist/og-image.jpg tidak ditemukan!`);
} else {
  const stat = fs.statSync(ogImagePath);
  if (stat.size < 10 * 1024 || stat.size > 300 * 1024) {
    errors.push(`Ukuran dist/og-image.jpg tidak valid: ${(stat.size / 1024).toFixed(1)} KB (harus 10-300 KB)`);
  }
  const buffer = fs.readFileSync(ogImagePath);
  if (buffer.length < 2 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    errors.push(`Header dist/og-image.jpg tidak valid: byte awal bukan JPEG SOI FF D8`);
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
          dimensions = {
            height: buffer.readUInt16BE(offset + 5),
            width: buffer.readUInt16BE(offset + 7),
          };
        }
        break;
      }
      if (marker === 0xd9 || marker === 0xda) break;
      if (offset + 4 > buffer.length) break;
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
    if (!dimensions) {
      errors.push(`Gagal membaca dimensi SOF dari header dist/og-image.jpg`);
    } else if (dimensions.width !== 1200 || dimensions.height !== 630) {
      errors.push(`Dimensi dist/og-image.jpg bukan 1200x630, melainkan ${dimensions.width}x${dimensions.height}`);
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
// 7. Per-Route Page Checks (H1, Title, Description, Canonical, OG, JSON-LD, Words, Case-Sensitive Images, RSS Alt)
// -----------------------------------------------------------------------------
const titlesSeen = new Map();
const descriptionsSeen = new Map();
const articlePlainBodies = [];

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
  const isPostRoute = route.startsWith('/artikel/') && !route.startsWith('/artikel/halaman/');
  const postSlug = isPostRoute ? route.slice('/artikel/'.length) : '';
  const post = postSlug ? postsBySlug.get(postSlug) : undefined;

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
    if (description.length < 120 || description.length > 150) {
      errors.push(`[${route}] Panjang meta description tidak valid: ${description.length} karakter (harus 120-150): "${description}"`);
    }
    if (route !== '/404') {
      if (descriptionsSeen.has(description)) {
        errors.push(`[${route}] Meta description duplikat dengan rute ${descriptionsSeen.get(description)}: "${description}"`);
      } else {
        descriptionsSeen.set(description, route);
      }
    }
  }

  // Location keyword rule
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
      if (!lowerDesc.includes('photobox')) errors.push(`[${route}] Meta description tidak memuat "photobox"`);
      if (!lowerDesc.includes(req.city)) errors.push(`[${route}] Meta description tidak memuat nama kota "${req.city}"`);
      if (!lowerDesc.includes(req.cafe)) errors.push(`[${route}] Meta description tidak memuat nama kafe "${req.cafe}"`);
    }
  }

  // og:description & twitter:description parity
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i);
  const ogDescription = ogDescMatch ? ogDescMatch[1].trim() : '';
  if (ogDescription !== description) {
    errors.push(`[${route}] og:description tidak identik dengan meta description`);
  }

  const twitterDescMatch = html.match(/<meta\s+name=["']twitter:description["']\s+content=["']([\s\S]*?)["']/i);
  const twitterDescription = twitterDescMatch ? twitterDescMatch[1].trim() : '';
  if (twitterDescription !== description) {
    errors.push(`[${route}] twitter:description tidak identik dengan meta description`);
  }

  // OpenGraph Type, Image & Twitter Image checks
  const ogTypeMatch = html.match(/<meta\s+property=["']og:type["']\s+content=["']([\s\S]*?)["']/i);
  const ogType = ogTypeMatch ? ogTypeMatch[1].trim() : '';
  const expectedOgType = post ? 'article' : 'website';
  if (ogType !== expectedOgType) {
    errors.push(`[${route}] og:type harus "${expectedOgType}", ditemukan "${ogType}"`);
  }

  const expectedOgImgUrl = post ? `${SITE_URL}${post.image}` : 'https://tentotenphotobox.biz.id/og-image.jpg';
  const expectedOgImgWidth = post ? String(post.imageWidth) : '1200';
  const expectedOgImgHeight = post ? String(post.imageHeight) : '630';
  const expectedOgImgType = post ? expectedMimeForImage(post.image) : 'image/jpeg';

  const ogImgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([\s\S]*?)["']/i);
  const ogImage = ogImgMatch ? ogImgMatch[1].trim() : '';
  if (ogImage !== expectedOgImgUrl) {
    errors.push(`[${route}] og:image bukan "${expectedOgImgUrl}", melainkan: "${ogImage}"`);
  }

  const twitterImgMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([\s\S]*?)["']/i);
  const twitterImage = twitterImgMatch ? twitterImgMatch[1].trim() : '';
  if (twitterImage !== expectedOgImgUrl) {
    errors.push(`[${route}] twitter:image bukan "${expectedOgImgUrl}", melainkan: "${twitterImage}"`);
  }

  const ogImgWidth = html.match(/<meta\s+property=["']og:image:width["']\s+content=["']([\s\S]*?)["']/i);
  if (!ogImgWidth || ogImgWidth[1].trim() !== expectedOgImgWidth) {
    errors.push(`[${route}] og:image:width bukan ${expectedOgImgWidth}: "${ogImgWidth ? ogImgWidth[1] : 'kosong'}"`);
  }

  const ogImgHeight = html.match(/<meta\s+property=["']og:image:height["']\s+content=["']([\s\S]*?)["']/i);
  if (!ogImgHeight || ogImgHeight[1].trim() !== expectedOgImgHeight) {
    errors.push(`[${route}] og:image:height bukan ${expectedOgImgHeight}: "${ogImgHeight ? ogImgHeight[1] : 'kosong'}"`);
  }

  const ogImgType = html.match(/<meta\s+property=["']og:image:type["']\s+content=["']([\s\S]*?)["']/i);
  if (!ogImgType || ogImgType[1].trim() !== expectedOgImgType) {
    errors.push(`[${route}] og:image:type bukan ${expectedOgImgType}: "${ogImgType ? ogImgType[1] : 'kosong'}"`);
  }

  const ogImgAlt = html.match(/<meta\s+property=["']og:image:alt["']\s+content=["']([\s\S]*?)["']/i);
  if (!ogImgAlt || !ogImgAlt[1].trim()) {
    errors.push(`[${route}] og:image:alt kosong atau tidak ditemukan`);
  }

  // RSS alternate link check
  if (!/<link\s+[^>]*rel=["']alternate["'][^>]*type=["']application\/rss\+xml["'][^>]*\/?>/i.test(html)) {
    errors.push(`[${route}] Halaman tidak menyertakan <link rel="alternate" type="application/rss+xml"> di <head>`);
  }

  // 7c. Canonical absolut
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
  const expectedCanonical = `${SITE_URL}${route === '/' ? '' : route}`;
  if (route !== '/404') {
    if (!canonical) {
      errors.push(`[${route}] Canonical link tidak ditemukan!`);
    } else if (canonical !== expectedCanonical) {
      errors.push(`[${route}] Canonical tidak cocok (${canonical} !== ${expectedCanonical})`);
    }
  }

  // 7d. Semua <img> harus memiliki alt, width, height, dan file lokal valid (case-sensitive)
  const imgTags = html.match(/<img[\s\S]*?>/gi) || [];
  for (const img of imgTags) {
    const hasAlt = /alt=["'][^"']*["']/i.test(img);
    const hasWidth = /width=["']?\d+["']?/i.test(img);
    const hasHeight = /height=["']?\d+["']?/i.test(img);
    if (!hasAlt) errors.push(`[${route}] Tag <img> tanpa atribut alt: ${img.substring(0, 80)}`);
    if (!hasWidth || !hasHeight) errors.push(`[${route}] Tag <img> tanpa width/height eksplisit: ${img.substring(0, 80)}`);

    const srcMatch = img.match(/src=["'](\/[^"']+)["']/i);
    if (srcMatch) {
      const localSrc = srcMatch[1];
      if (!existsCaseSensitive(distDir, localSrc)) {
        errors.push(`[${route}] Gambar lokal tidak ditemukan di dist/ (case-sensitive): "${localSrc}"`);
      }
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

  // 7f. Tidak ada TODO, lorem, href="#", atau kata terlarang
  if (/TODO/i.test(html)) errors.push(`[${route}] Ditemukan kata "TODO" di HTML!`);
  if (/lorem\s+ipsum/i.test(html)) errors.push(`[${route}] Ditemukan teks "lorem ipsum" di HTML!`);
  if (/href=["']#["']/i.test(html) || /href=["']#\//i.test(html)) {
    errors.push(`[${route}] Ditemukan tautan href="#" atau hash routing di HTML!`);
  }

  for (const word of ['franchise', 'rental', 'wedding']) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(html)) {
      errors.push(`[${route}] Ditemukan kata terlarang "${word}" di dalam HTML statis!`);
    }
  }

  // Check zero "berita" word on article routes, index, and LatestArticles sections
  if (route.startsWith('/artikel') || html.includes('id="artikel-terbaru"')) {
    const artikelMatch = html.match(/<section[^>]*id="artikel-terbaru"[\s\S]*?<\/section>/i);
    const scopeToCheck = route.startsWith('/artikel') ? html : (artikelMatch ? artikelMatch[0] : '');
    if (/\bberita\b/i.test(scopeToCheck)) {
      errors.push(`[${route}] Ditemukan kata "berita" yang dilarang pada fitur artikel!`);
    }
  }

  // 7h. Footer menautkan /kebijakan-privasi
  if (!html.includes('href="/kebijakan-privasi"')) {
    errors.push(`[${route}] Halaman tidak memuat tautan ke /kebijakan-privasi di footer!`);
  }

  // 7i. Word count check
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const plainText = bodyContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText ? plainText.split(' ').filter(Boolean).length : 0;
  if (wordCount < 50) {
    errors.push(`[${route}] Teks utama terlalu sedikit di HTML statis! (${wordCount} kata)`);
  }

  // 7j. Extended per-article checks (/artikel/<slug>)
  if (isPostRoute) {
    if (!post) {
      errors.push(`[${route}] Rute artikel tidak terdaftar di PUBLISHED_POSTS`);
    } else {
      if (h1Text !== post.title) {
        errors.push(`[${route}] Teks H1 ("${h1Text}") tidak sama dengan judul artikel ("${post.title}")`);
      }
      if (!jsonLdTypes.includes('BlogPosting')) {
        errors.push(`[${route}] Artikel wajib memiliki JSON-LD @type "BlogPosting"`);
      }
      if (!jsonLdTypes.includes('BreadcrumbList')) {
        errors.push(`[${route}] Artikel wajib memiliki JSON-LD @type "BreadcrumbList"`);
      }
      if (jsonLdTypes.includes('NewsArticle')) {
        errors.push(`[${route}] Artikel DILARANG memakai schema "NewsArticle"`);
      }
      if (post.faq.length > 0 && !jsonLdTypes.includes('FAQPage')) {
        errors.push(`[${route}] Artikel memiliki FAQ di frontmatter tetapi schema "FAQPage" tidak ditemukan`);
      }
      if (post.wordCount < 300) {
        errors.push(`[${route}] Isi artikel kurang dari 300 kata (${post.wordCount} kata)`);
      }

      // Check internal links inside .artikel-prose
      const proseMatch = html.match(/<div[^>]*class="[^"]*artikel-prose[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i);
      const proseHtml = proseMatch ? proseMatch[1] : html;
      const internalProseLinks = [...proseHtml.matchAll(/<a\b[^>]*href=["'](\/[^"']*)["'][^>]*>/gi)]
        .map((m) => m[1])
        .filter((href) => !href.startsWith('//'));
      if (internalProseLinks.length < 2) {
        errors.push(`[${route}] Isi artikel harus memuat minimal 2 tautan internal ke halaman situs (ditemukan: ${internalProseLinks.length})`);
      }

      // Cover image size <= 150 KB
      const coverDiskPath = path.resolve(distDir, post.image.replace(/^\/+/, ''));
      if (!fs.existsSync(coverDiskPath)) {
        errors.push(`[${route}] Gambar sampul artikel tidak ditemukan di dist/: ${post.image}`);
      } else {
        const sizeKb = fs.statSync(coverDiskPath).size / 1024;
        if (sizeKb > 150) {
          errors.push(`[${route}] Ukuran gambar sampul melebihi 150 KB: ${post.image} (${sizeKb.toFixed(1)} KB)`);
        }
      }

      // Collect plain article body for cross-article similarity check
      const prosePlain = proseHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      articlePlainBodies.push({ slug: post.slug, text: prosePlain });
    }
  }

  auditSummary.push({
    route,
    title: title.length > 42 ? `${title.substring(0, 39)}...` : title,
    description: description.substring(0, 40) + '...',
    canonical: canonical.replace(SITE_URL, ''),
    h1: h1Text.length > 35 ? `${h1Text.substring(0, 32)}...` : h1Text,
    jsonLd: [...new Set(jsonLdTypes)].join(', ') || '-',
    words: wordCount,
  });
}

// -----------------------------------------------------------------------------
// 7k. Cross-Article Similarity Check (max 80% overlap)
// -----------------------------------------------------------------------------
for (let i = 0; i < articlePlainBodies.length; i++) {
  for (let j = i + 1; j < articlePlainBodies.length; j++) {
    const a = articlePlainBodies[i];
    const b = articlePlainBodies[j];
    const sim = computeWordOverlapSimilarity(a.text, b.text);
    if (sim > 0.8) {
      errors.push(
        `Kemiripan antar-artikel terlalu tinggi (${(sim * 100).toFixed(1)}% > 80%): /artikel/${a.slug} dan /artikel/${b.slug}`
      );
    }
  }
}

// -----------------------------------------------------------------------------
// 8. Crawlable Reachability Check (BFS from "/") + Direct Checks
// -----------------------------------------------------------------------------
const homeHtmlPath = path.resolve(distDir, 'index.html');
if (fs.existsSync(homeHtmlPath)) {
  const queue = ['/'];
  const visited = new Set(['/']);

  while (queue.length > 0) {
    const current = queue.shift();
    const fileForCurrent =
      current === '/'
        ? path.resolve(distDir, 'index.html')
        : path.resolve(distDir, current.replace(/^\/+/, ''), 'index.html');

    if (!fs.existsSync(fileForCurrent)) continue;
    const html = fs.readFileSync(fileForCurrent, 'utf-8');
    const hrefMatches = html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi);

    for (const m of hrefMatches) {
      let rawHref = m[1].trim();
      if (rawHref.startsWith(SITE_URL)) {
        rawHref = rawHref.slice(SITE_URL.length) || '/';
      }
      if (!rawHref.startsWith('/') || rawHref.startsWith('//')) continue;
      const target = normalizePath(rawHref);
      if (!visited.has(target)) {
        visited.add(target);
        queue.push(target);
      }
    }
  }

  for (const r of CRAWLABLE_ROUTES) {
    if (!visited.has(r)) {
      errors.push(`Halaman yatim (orphan page): rute "${r}" tidak terjangkau via tautan internal dari Beranda (/)`);
    }
  }
}

// -----------------------------------------------------------------------------
// 8b. Draft & Future-Dated Exclusion Check
// -----------------------------------------------------------------------------
const allDistHtmlFiles = [];
function collectHtmlFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.resolve(dir, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(fullPath);
    else if (entry.isFile() && entry.name.endsWith('.html')) allDistHtmlFiles.push(fullPath);
  }
}
if (fs.existsSync(distDir)) collectHtmlFiles(distDir);

for (const excl of excludedPosts) {
  const exclDistPath = path.resolve(distDir, 'artikel', excl.slug, 'index.html');
  if (fs.existsSync(exclDistPath)) {
    errors.push(`Artikel ${excl.reason} "${excl.slug}" tidak boleh menghasilkan HTML di ${path.relative(rootDir, exclDistPath)}`);
  }

  const postUrlSuffix = `/artikel/${excl.slug}`;
  for (const xmlName of ['sitemap_index.xml', 'page-sitemap.xml', 'post-sitemap.xml', 'feed.xml']) {
    const xmlPath = path.resolve(distDir, xmlName);
    if (fs.existsSync(xmlPath) && fs.readFileSync(xmlPath, 'utf-8').includes(postUrlSuffix)) {
      errors.push(`Artikel ${excl.reason} "${excl.slug}" bocor ke dalam dist/${xmlName}`);
    }
  }

  for (const htmlFile of allDistHtmlFiles) {
    const content = fs.readFileSync(htmlFile, 'utf-8');
    if (content.includes(postUrlSuffix)) {
      errors.push(`Artikel ${excl.reason} "${excl.slug}" tertaut di ${path.relative(rootDir, htmlFile)}`);
    }
  }
}

// -----------------------------------------------------------------------------
// 8c. Pagination Sanity Check
// -----------------------------------------------------------------------------
const halamanDir = path.resolve(distDir, 'artikel', 'halaman');
if (publishedPosts.length <= POSTS_PER_PAGE) {
  if (fs.existsSync(halamanDir)) {
    errors.push(`Folder dist/artikel/halaman/ tidak boleh ada ketika jumlah artikel terbit (${publishedPosts.length}) <= ${POSTS_PER_PAGE}`);
  }
} else {
  const expectedTotalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);
  for (let p = 2; p <= expectedTotalPages; p++) {
    const pagPath = `/artikel/halaman/${p}`;
    if (!PAGINATION_PATHS.includes(pagPath)) {
      errors.push(`PAGINATION_PATHS tidak menyertakan ${pagPath}`);
    }
    const pagHtmlPath = path.resolve(distDir, 'artikel', 'halaman', String(p), 'index.html');
    if (!fs.existsSync(pagHtmlPath)) {
      errors.push(`File paginasi tidak ditemukan: dist/artikel/halaman/${p}/index.html`);
    } else {
      const pagHtml = fs.readFileSync(pagHtmlPath, 'utf-8');
      const robots = pagHtml.match(/<meta\s+name=["']robots["']\s+content=["']([\s\S]*?)["']/i);
      if (robots && /noindex/i.test(robots[1])) {
        errors.push(`Halaman paginasi ${pagPath} tidak boleh mengandung noindex`);
      }
    }
  }
}

// -----------------------------------------------------------------------------
// 8d. LatestArticles Placements Check (/, /location/<slug>, /product)
// -----------------------------------------------------------------------------
const placementTargets = [
  { route: '/', filter: () => publishedPosts, limit: 3 },
  { route: '/product', filter: () => publishedPosts.filter((p) => p.category.toLowerCase() === 'panduan'), limit: 2 },
  ...locationSlugs.map((slug) => ({
    route: `/location/${slug}`,
    filter: () => publishedPosts.filter((p) => p.locations.includes(slug)),
    limit: 2,
  })),
];

for (const target of placementTargets) {
  const htmlPath =
    target.route === '/'
      ? path.resolve(distDir, 'index.html')
      : path.resolve(distDir, target.route.replace(/^\/+/, ''), 'index.html');
  if (!fs.existsSync(htmlPath)) continue;

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const matching = target.filter();
  const expectedCards = matching.slice(0, target.limit);
  const sectionMatch = html.match(/<section[^>]*id=["']artikel-terbaru["'][^>]*>([\s\S]*?)<\/section>/i);

  if (expectedCards.length === 0) {
    if (sectionMatch) {
      errors.push(`[${target.route}] Section #artikel-terbaru tidak boleh dirender saat artikel cocok berjumlah 0`);
    }
  } else {
    if (!sectionMatch) {
      errors.push(`[${target.route}] Section #artikel-terbaru tidak ditemukan padahal terdapat ${expectedCards.length} artikel cocok`);
    } else {
      const secHtml = sectionMatch[1];
      if (!/<h2[\s>]/i.test(secHtml)) {
        errors.push(`[${target.route}] Heading section #artikel-terbaru wajib menggunakan <h2>`);
      }
      const cardArticles = [...secHtml.matchAll(/<article[\s\S]*?<\/article>/gi)];
      if (cardArticles.length !== expectedCards.length) {
        errors.push(`[${target.route}] Jumlah kartu #artikel-terbaru (${cardArticles.length}) tidak sesuai harapan (${expectedCards.length})`);
      } else {
        cardArticles.forEach((m, idx) => {
          const cardHtml = m[0];
          const expectedSlugHref = `href="/artikel/${expectedCards[idx].slug}"`;
          if (!cardHtml.includes(expectedSlugHref)) {
            errors.push(`[${target.route}] Urutan/slug kartu #${idx + 1} di #artikel-terbaru harus mengarah ke ${expectedSlugHref}`);
          }
          if (!/<h3[\s>]/i.test(cardHtml)) {
            errors.push(`[${target.route}] Judul kartu #${idx + 1} di #artikel-terbaru harus memakai <h3> di bawah <h2>`);
          }
        });
      }
    }
  }
}

// -----------------------------------------------------------------------------
// 8e. RSS Feed Check (dist/feed.xml)
// -----------------------------------------------------------------------------
const feedPath = path.resolve(distDir, 'feed.xml');
if (!fs.existsSync(feedPath)) {
  errors.push('dist/feed.xml tidak ditemukan!');
} else {
  const feedContent = fs.readFileSync(feedPath, 'utf-8');
  if (!feedContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    errors.push('dist/feed.xml tidak diawali deklarasi <?xml version="1.0" encoding="UTF-8"?>');
  }
  if (!feedContent.includes('<rss version="2.0"') || !feedContent.includes('<channel>')) {
    errors.push('dist/feed.xml bukan dokumen RSS 2.0 yang valid');
  }
  const rssItems = [...feedContent.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  const expectedFeedCount = Math.min(publishedPosts.length, 20);
  if (rssItems.length !== expectedFeedCount) {
    errors.push(`Jumlah <item> di dist/feed.xml (${rssItems.length}) harus ${expectedFeedCount}`);
  }
  for (const post of publishedPosts.slice(0, 20)) {
    if (!feedContent.includes(`<link>${SITE_URL}/artikel/${post.slug}</link>`)) {
      errors.push(`Artikel terbit /artikel/${post.slug} tidak ditemukan di dist/feed.xml`);
    }
  }
}

// -----------------------------------------------------------------------------
// 9. TikTok Creator Videos & External Links Security Check
// -----------------------------------------------------------------------------
if (fs.existsSync(homeHtmlPath)) {
  const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');
  const homeTikTokMatches = (homeHtml.match(/https:\/\/vt\.tiktok\.com\/[a-zA-Z0-9_-]+\/?/g) || []).map((u) => u.replace(/\/+$/, ''));
  const uniqueHomeTikTok = new Set(homeTikTokMatches);
  if (uniqueHomeTikTok.size < 3) {
    errors.push(`dist/index.html harus memuat minimal 3 tautan video TikTok kreator (ditemukan: ${uniqueHomeTikTok.size})`);
  }
}

const serviceHtmlPath = path.resolve(distDir, 'service', 'index.html');
if (fs.existsSync(serviceHtmlPath)) {
  const serviceHtml = fs.readFileSync(serviceHtmlPath, 'utf-8');
  const serviceTikTokMatches = (serviceHtml.match(/https:\/\/vt\.tiktok\.com\/[a-zA-Z0-9_-]+\/?/g) || []).map((u) => u.replace(/\/+$/, ''));
  const uniqueServiceTikTok = new Set(serviceTikTokMatches);
  if (uniqueServiceTikTok.size !== 6) {
    errors.push(`dist/service/index.html harus memuat tepat 6 tautan video TikTok kreator (ditemukan: ${uniqueServiceTikTok.size})`);
  }

  const cardCount = (serviceHtml.match(/Tonton di TikTok/g) || []).length;
  if (cardCount !== CREATOR_VIDEOS.length) {
    errors.push(`Jumlah kartu kreator di HTML /service (${cardCount}) tidak sama dengan jumlah item di creatorVideos.ts (${CREATOR_VIDEOS.length})`);
  }

  for (const item of CREATOR_VIDEOS) {
    const cleanUrl = item.url.replace(/\/+$/, '');
    if (!serviceTikTokMatches.includes(cleanUrl)) {
      errors.push(`URL video kreator ${item.url} tidak ditemukan di dist/service/index.html`);
    }
  }
}

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
// 10. Creator Thumbnail Assets Verification
// -----------------------------------------------------------------------------
const creatorThumbnailDir = path.resolve(distDir, 'assets', 'creators');
for (let i = 1; i <= 6; i++) {
  const thumbPath = path.resolve(creatorThumbnailDir, `kreator-${i}.webp`);
  if (!fs.existsSync(thumbPath)) {
    errors.push(`File thumbnail kreator tidak ditemukan: dist/assets/creators/kreator-${i}.webp`);
  } else if (fs.statSync(thumbPath).size === 0) {
    errors.push(`File thumbnail kreator kosong (0 bytes): dist/assets/creators/kreator-${i}.webp`);
  }
}

// -----------------------------------------------------------------------------
// 11. Image Size & Asset Integrity Audit (<= 150 KB and no Copy_of_*.png references)
// -----------------------------------------------------------------------------
function auditDistAssets(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      auditDistAssets(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
        const stat = fs.statSync(fullPath);
        const sizeKb = stat.size / 1024;
        if (sizeKb > 150) {
          errors.push(`Ukuran gambar di dist/ melebihi 150 KB: ${path.relative(rootDir, fullPath)} (${sizeKb.toFixed(1)} KB)`);
        }
      }
      if (['.html', '.js', '.css', '.json', '.xml'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (/Copy_of_[a-zA-Z0-9_]+\.png/i.test(content)) {
          errors.push(`Ditemukan referensi ke Copy_of_*.png di dalam: ${path.relative(rootDir, fullPath)}`);
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
