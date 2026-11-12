import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { Marked } from 'marked';

export const ALLOWED_LOCATION_SLUGS = ['madiun', 'jombang', 'ponorogo', 'kertosono'] as const;
export type AllowedLocationSlug = (typeof ALLOWED_LOCATION_SLUGS)[number];

export interface ArticleFaqItem {
  q: string;
  a: string;
}

export interface ArticleTocItem {
  id: string;
  text: string;
}

export interface ArticlePost {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  locations: AllowedLocationSlug[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  faq: ArticleFaqItem[];
  draft: boolean;
  html: string;
  toc: ArticleTocItem[];
  wordCount: number;
  internalLinks: string[];
}

export interface LoadPostsResult {
  published: ArticlePost[];
  excluded: {
    file: string;
    slug: string;
    title: string;
    date: string;
    draft: boolean;
    reason: 'draft' | 'scheduled';
  }[];
  todayWib: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_ROOT_DIR = path.resolve(__dirname, '..');

const SLUG_REGEX = /^[a-z0-9-]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Mengembalikan tanggal hari ini (YYYY-MM-DD) menurut zona waktu Asia/Jakarta (WIB).
 */
export function getTodayJakarta(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeDateField(value: unknown, fieldName: string, fileName: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!DATE_REGEX.test(trimmed)) {
      throw new Error(`[load-posts] ${fileName}: field "${fieldName}" harus berformat YYYY-MM-DD (ditemukan: "${trimmed}").`);
    }
    const [yStr, mStr, dStr] = trimmed.split('-');
    const year = Number(yStr);
    const month = Number(mStr);
    const day = Number(dStr);
    const check = new Date(Date.UTC(year, month - 1, day));
    if (
      check.getUTCFullYear() !== year ||
      check.getUTCMonth() + 1 !== month ||
      check.getUTCDate() !== day
    ) {
      throw new Error(`[load-posts] ${fileName}: tanggal "${fieldName}" tidak valid di kalender ("${trimmed}").`);
    }
    return trimmed;
  }
  throw new Error(`[load-posts] ${fileName}: field "${fieldName}" wajib ada dan berformat YYYY-MM-DD.`);
}

function verifyCaseSensitivePublicFile(publicDir: string, webPath: string, fileName: string): void {
  if (!webPath.startsWith('/')) {
    throw new Error(`[load-posts] ${fileName}: field "image" harus diawali "/" (ditemukan: "${webPath}").`);
  }
  const cleanRel = webPath.replace(/^\/+/, '');
  if (!cleanRel || cleanRel.includes('..')) {
    throw new Error(`[load-posts] ${fileName}: path "image" tidak valid ("${webPath}").`);
  }

  const parts = cleanRel.split('/').filter(Boolean);
  let currentDir = publicDir;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!fs.existsSync(currentDir) || !fs.statSync(currentDir).isDirectory()) {
      throw new Error(`[load-posts] ${fileName}: gambar sampul "${webPath}" tidak ditemukan di public/.`);
    }
    const entries = fs.readdirSync(currentDir);
    if (!entries.includes(part)) {
      throw new Error(`[load-posts] ${fileName}: gambar sampul "${webPath}" tidak ditemukan di public/ (periksa path dan huruf besar/kecil).`);
    }
    currentDir = path.join(currentDir, part);
  }

  if (!fs.statSync(currentDir).isFile()) {
    throw new Error(`[load-posts] ${fileName}: target "image" bukan file ("${webPath}").`);
  }
}

function slugifyHeading(text: string): string {
  const plain = text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return plain || 'bagian';
}

function renderArticleMarkdown(
  markdownBody: string,
  fileName: string
): { html: string; toc: ArticleTocItem[]; wordCount: number; internalLinks: string[] } {
  const toc: ArticleTocItem[] = [];
  const usedIds = new Map<string, number>();
  const internalLinks: string[] = [];

  const marked = new Marked({
    gfm: true,
    breaks: false,
  });

  // Validasi hierarki heading H2 -> H3 tanpa H1 dan tanpa melompati level
  const tokens = marked.lexer(markdownBody);
  let seenH2 = false;
  let lastDepth = 2;

  for (const token of tokens) {
    if (token.type === 'heading') {
      const depth = token.depth;
      if (depth === 1) {
        throw new Error(
          `[load-posts] ${fileName}: isi artikel dilarang menggunakan heading H1 (#). Gunakan H2 (##) dan H3 (###) agar halaman tetap memiliki tepat satu H1.`
        );
      }
      if (depth > 3) {
        throw new Error(
          `[load-posts] ${fileName}: gunakan hanya heading H2 (##) dan H3 (###) secara berurutan (ditemukan H${depth}).`
        );
      }
      if (depth === 3 && !seenH2) {
        throw new Error(
          `[load-posts] ${fileName}: heading H3 (###) tidak boleh muncul sebelum heading H2 (##) pertama.`
        );
      }
      if (depth - lastDepth > 1) {
        throw new Error(
          `[load-posts] ${fileName}: hierarki heading melompat dari H${lastDepth} ke H${depth}.`
        );
      }
      if (depth === 2) seenH2 = true;
      lastDepth = depth;
    }
  }

  marked.use({
    renderer: {
      // Escape seluruh HTML mentah (script, iframe, tag HTML manual apa pun)
      html(token) {
        return escapeHtml(token.raw);
      },
      // Isi artikel hanya mendukung gambar sampul
      image(token) {
        const label = token.text ? `[Gambar: ${escapeHtml(token.text)}]` : '';
        return label;
      },
      heading(token) {
        const depth = token.depth;
        const innerHtml = this.parser.parseInline(token.tokens);
        const plainText = innerHtml.replace(/<[^>]+>/g, '').trim();
        const baseId = slugifyHeading(plainText);
        const count = usedIds.get(baseId) || 0;
        usedIds.set(baseId, count + 1);
        const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

        if (depth === 2) {
          toc.push({ id, text: plainText });
          return `<h2 id="${escapeHtml(id)}" class="font-headline-lg text-2xl sm:text-3xl text-[#1f1b11] font-black mt-8 mb-3 pt-2 scroll-mt-28 break-words">${innerHtml}</h2>\n`;
        }
        return `<h3 id="${escapeHtml(id)}" class="font-headline-sm text-lg sm:text-xl text-[#1f1b11] font-bold mt-6 mb-2 scroll-mt-28 break-words">${innerHtml}</h3>\n`;
      },
      paragraph(token) {
        const innerHtml = this.parser.parseInline(token.tokens);
        return `<p class="font-body-md text-sm sm:text-base text-[#5c403d] leading-relaxed mb-4 break-words">${innerHtml}</p>\n`;
      },
      list(token) {
        const tag = token.ordered ? 'ol' : 'ul';
        const listStyle = token.ordered ? 'list-decimal' : 'list-disc';
        const itemsHtml = token.items
          .map((item) => {
            const content = this.parser.parse(item.tokens).replace(/^<p[^>]*>([\s\S]*)<\/p>\s*$/i, '$1');
            return `<li class="font-body-md text-sm sm:text-base text-[#5c403d] leading-relaxed break-words">${content}</li>`;
          })
          .join('\n');
        return `<${tag} class="${listStyle} pl-5 sm:pl-6 mb-5 space-y-2 marker:text-[#960011] marker:font-bold">${itemsHtml}</${tag}>\n`;
      },
      blockquote(token) {
        const body = this.parser.parse(token.tokens);
        return `<blockquote class="my-5 p-4 sm:p-5 rounded-2xl bg-[#fcf3e2] border-2 border-[#1f1b11] border-l-4 border-l-[#960011] text-sm text-[#1f1b11] break-words">${body}</blockquote>\n`;
      },
      table(token) {
        const headerCells = token.header
          .map(
            (cell) =>
              `<th class="px-3 py-2.5 bg-[#fcf3e2] border-b-2 border-[#1f1b11] font-headline-sm text-xs sm:text-sm font-bold text-[#1f1b11] whitespace-nowrap">${this.parser.parseInline(cell.tokens)}</th>`
          )
          .join('');
        const bodyRows = token.rows
          .map((row) => {
            const cols = row
              .map(
                (cell) =>
                  `<td class="px-3 py-2.5 border-t border-[#1f1b11]/15 text-xs sm:text-sm text-[#5c403d] align-top break-words">${this.parser.parseInline(cell.tokens)}</td>`
              )
              .join('');
            return `<tr class="even:bg-[#fcf3e2]/40">${cols}</tr>`;
          })
          .join('\n');
        return `<div class="w-full max-w-full overflow-x-auto my-6 rounded-xl border-2 border-[#1f1b11] bg-[#fff8f0]"><table class="w-full text-left border-collapse min-w-[420px]"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>\n`;
      },
      code(token) {
        return `<div class="w-full max-w-full overflow-x-auto my-5 rounded-xl border-2 border-[#1f1b11] bg-[#1f1b11] text-[#fff8f0] p-4"><pre class="text-xs font-mono leading-relaxed"><code>${escapeHtml(token.text)}</code></pre></div>\n`;
      },
      codespan(token) {
        return `<code class="px-1.5 py-0.5 rounded bg-[#f6eddc] border border-[#1f1b11]/20 text-xs font-mono text-[#960011] break-words">${escapeHtml(token.text)}</code>`;
      },
      hr() {
        return `<hr class="my-8 border-t-2 border-[#1f1b11]/20" />\n`;
      },
      link(token) {
        const rawHref = (token.href || '').trim();
        const text = this.parser.parseInline(token.tokens);
        const titleAttr = token.title ? ` title="${escapeHtml(token.title)}"` : '';

        // Tolak skema berbahaya seperti javascript:, data:, vbscript:
        if (/^(javascript|data|vbscript):/i.test(rawHref)) {
          return text;
        }

        const isHttpExternal =
          (rawHref.startsWith('http://') || rawHref.startsWith('https://')) &&
          !rawHref.startsWith('https://tentotenphotobox.biz.id');

        if (isHttpExternal) {
          return `<a href="${escapeHtml(rawHref)}"${titleAttr} target="_blank" rel="noopener noreferrer" class="text-[#960011] font-bold underline hover:text-[#c0111e] break-words">${text}</a>`;
        }

        if (rawHref.startsWith('/')) {
          internalLinks.push(rawHref);
        } else if (rawHref.startsWith('https://tentotenphotobox.biz.id/')) {
          internalLinks.push(rawHref.replace('https://tentotenphotobox.biz.id', ''));
        }

        return `<a href="${escapeHtml(rawHref)}"${titleAttr} class="text-[#960011] font-bold underline hover:text-[#c0111e] break-words">${text}</a>`;
      },
    },
  });

  const html = marked.parse(markdownBody) as string;
  const plainText = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = plainText ? plainText.split(' ').filter(Boolean).length : 0;

  return { html, toc, wordCount, internalLinks };
}

export function loadPostsReport(rootDir: string = DEFAULT_ROOT_DIR, now: Date = new Date()): LoadPostsResult {
  const postsDir = path.resolve(rootDir, 'content', 'posts');
  const publicDir = path.resolve(rootDir, 'public');
  const todayWib = getTodayJakarta(now);

  if (!fs.existsSync(postsDir)) {
    return { published: [], excluded: [], todayWib };
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort();

  const seenSlugs = new Set<string>();
  const published: ArticlePost[] = [];
  const excluded: LoadPostsResult['excluded'] = [];

  for (const fileName of files) {
    const filePath = path.resolve(postsDir, fileName);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(rawContent);
    const data = parsed.data as Record<string, unknown>;

    // Validasi title (30 - 60 karakter)
    const title = typeof data.title === 'string' ? data.title.trim() : '';
    if (!title || title.length < 30 || title.length > 60) {
      throw new Error(
        `[load-posts] ${fileName}: panjang "title" harus 30-60 karakter (ditemukan ${title.length} karakter: "${title}").`
      );
    }

    // Validasi slug (^[a-z0-9-]+$ & unik)
    const slug = typeof data.slug === 'string' ? data.slug.trim() : '';
    if (!slug || !SLUG_REGEX.test(slug)) {
      throw new Error(
        `[load-posts] ${fileName}: "slug" harus cocok dengan pola ^[a-z0-9-]+$ (ditemukan: "${slug}").`
      );
    }
    if (seenSlugs.has(slug)) {
      throw new Error(`[load-posts] ${fileName}: ditemukan "slug" duplikat "${slug}".`);
    }
    seenSlugs.add(slug);

    // Validasi description (120 - 150 karakter)
    const description = typeof data.description === 'string' ? data.description.trim() : '';
    if (!description || description.length < 120 || description.length > 150) {
      throw new Error(
        `[load-posts] ${fileName}: panjang "description" harus 120-150 karakter (ditemukan ${description.length} karakter: "${description}").`
      );
    }

    // Validasi date & updated
    const date = normalizeDateField(data.date, 'date', fileName);
    let updated: string | undefined;
    if (data.updated !== undefined && data.updated !== null && data.updated !== '') {
      updated = normalizeDateField(data.updated, 'updated', fileName);
      if (updated < date) {
        throw new Error(
          `[load-posts] ${fileName}: tanggal "updated" (${updated}) tidak boleh lebih awal dari "date" (${date}).`
        );
      }
    }

    // Author opsional (default: Tim TentoTen Photobox)
    const author =
      typeof data.author === 'string' && data.author.trim()
        ? data.author.trim()
        : 'Tim TentoTen Photobox';

    // Category wajib
    const category = typeof data.category === 'string' ? data.category.trim() : '';
    if (!category) {
      throw new Error(`[load-posts] ${fileName}: field "category" tidak boleh kosong.`);
    }

    // Locations opsional (daftar madiun|jombang|ponorogo|kertosono)
    let locations: AllowedLocationSlug[] = [];
    if (data.locations !== undefined && data.locations !== null) {
      if (!Array.isArray(data.locations)) {
        throw new Error(`[load-posts] ${fileName}: field "locations" harus berupa array daftar slug lokasi.`);
      }
      locations = data.locations.map((item) => {
        if (typeof item !== 'string' || !ALLOWED_LOCATION_SLUGS.includes(item as AllowedLocationSlug)) {
          throw new Error(
            `[load-posts] ${fileName}: nilai "locations" tidak dikenal ("${String(item)}"). Nilai yang diizinkan: ${ALLOWED_LOCATION_SLUGS.join(', ')}.`
          );
        }
        return item as AllowedLocationSlug;
      });
    }

    // Validasi gambar sampul lokal di public/
    const image = typeof data.image === 'string' ? data.image.trim() : '';
    if (!image) {
      throw new Error(`[load-posts] ${fileName}: field "image" wajib diisi path lokal di public/.`);
    }
    verifyCaseSensitivePublicFile(publicDir, image, fileName);

    const imageAlt = typeof data.imageAlt === 'string' ? data.imageAlt.trim() : '';
    if (!imageAlt) {
      throw new Error(`[load-posts] ${fileName}: field "imageAlt" tidak boleh kosong.`);
    }

    const imageWidth = Number(data.imageWidth);
    const imageHeight = Number(data.imageHeight);
    if (!Number.isInteger(imageWidth) || imageWidth <= 0 || !Number.isInteger(imageHeight) || imageHeight <= 0) {
      throw new Error(
        `[load-posts] ${fileName}: "imageWidth" dan "imageHeight" wajib berupa bilangan bulat positif.`
      );
    }

    // Validasi FAQ opsional
    const faq: ArticleFaqItem[] = [];
    if (data.faq !== undefined && data.faq !== null) {
      if (!Array.isArray(data.faq)) {
        throw new Error(`[load-posts] ${fileName}: field "faq" harus berupa array {q, a}.`);
      }
      for (const entry of data.faq) {
        if (
          typeof entry !== 'object' ||
          entry === null ||
          typeof (entry as { q?: unknown }).q !== 'string' ||
          typeof (entry as { a?: unknown }).a !== 'string' ||
          !(entry as { q: string }).q.trim() ||
          !(entry as { a: string }).a.trim()
        ) {
          throw new Error(`[load-posts] ${fileName}: setiap item "faq" harus memiliki "q" dan "a" non-kosong.`);
        }
        faq.push({
          q: (entry as { q: string }).q.trim(),
          a: (entry as { a: string }).a.trim(),
        });
      }
    }

    // Validasi draft boolean
    if (typeof data.draft !== 'boolean') {
      throw new Error(`[load-posts] ${fileName}: field "draft" wajib bertipe boolean (true atau false).`);
    }
    const draft = data.draft;

    // Penerbitan: draft atau date > today (Asia/Jakarta) TIDAK ikut build
    if (draft) {
      excluded.push({ file: fileName, slug, title, date, draft, reason: 'draft' });
      continue;
    }
    if (date > todayWib) {
      excluded.push({ file: fileName, slug, title, date, draft, reason: 'scheduled' });
      continue;
    }

    const rendered = renderArticleMarkdown(parsed.content, fileName);

    published.push({
      title,
      slug,
      description,
      date,
      updated,
      author,
      category,
      locations,
      image,
      imageAlt,
      imageWidth,
      imageHeight,
      faq,
      draft,
      html: rendered.html,
      toc: rendered.toc,
      wordCount: rendered.wordCount,
      internalLinks: rendered.internalLinks,
    });
  }

  // Urutkan dari terbaru (descending berdasarkan date, lalu slug agar deterministik)
  published.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return a.slug.localeCompare(b.slug);
  });

  return { published, excluded, todayWib };
}

export function loadPublishedPosts(rootDir: string = DEFAULT_ROOT_DIR, now: Date = new Date()): ArticlePost[] {
  return loadPostsReport(rootDir, now).published;
}

export function syncGeneratedPostsModule(rootDir: string = DEFAULT_ROOT_DIR, now: Date = new Date()): ArticlePost[] {
  const posts = loadPublishedPosts(rootDir, now);
  const outPath = path.resolve(rootDir, 'src', 'data', 'posts.generated.ts');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const fileContent = `// AUTO-GENERATED BY scripts/load-posts.ts - DO NOT EDIT MANUALLY
export type AllowedLocationSlug = 'madiun' | 'jombang' | 'ponorogo' | 'kertosono';

export interface ArticleFaqItem {
  q: string;
  a: string;
}

export interface ArticleTocItem {
  id: string;
  text: string;
}

export interface ArticlePost {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  locations: AllowedLocationSlug[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  faq: ArticleFaqItem[];
  draft: boolean;
  html: string;
  toc: ArticleTocItem[];
  wordCount: number;
  internalLinks: string[];
}

export const PUBLISHED_POSTS: ArticlePost[] = ${JSON.stringify(posts, null, 2)};
`;

  const current = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf-8') : '';
  if (current !== fileContent) {
    fs.writeFileSync(outPath, fileContent, 'utf-8');
  }

  return posts;
}

const isDirectExecution =
  typeof process !== 'undefined' &&
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(__filename);

if (isDirectExecution) {
  const posts = syncGeneratedPostsModule();
  console.log(`[load-posts] Synced ${posts.length} published article(s) to src/data/posts.generated.ts (today WIB: ${getTodayJakarta()}).`);
}
