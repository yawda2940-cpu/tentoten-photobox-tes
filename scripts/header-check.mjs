import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import net from 'node:net';
import { INDEXED_ROUTES } from '../src/routes.ts';

let errors = [];

function getFreePort() {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
  });
}

async function waitForServer(baseUrl, timeout = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await fetch(baseUrl);
      return true;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  return false;
}

function runServer(port, envExtra = {}) {
  const proc = spawn('npx', ['tsx', 'server.ts'], {
    env: {
      ...process.env,
      PORT: String(port),
      NODE_ENV: 'production',
      ...envExtra,
    },
    detached: true,
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  return proc;
}

function stopProcess(proc) {
  return new Promise((resolve) => {
    if (!proc || !proc.pid) return resolve();
    try {
      process.kill(-proc.pid, 'SIGKILL');
    } catch (_) {
      try {
        proc.kill('SIGKILL');
      } catch (_) {}
    }
    setTimeout(resolve, 300);
  });
}

function verifyCommonSecurityHeaders(route, headers, isHttps = true) {
  // 1. Verify absence of X-Powered-By
  if (headers.has('x-powered-by')) {
    errors.push(`[${route}] Pelanggaran: Header "X-Powered-By" masih ada (${headers.get('x-powered-by')})`);
  }

  // 2. Verify absence of Cross-Origin-Embedder-Policy (COEP)
  if (headers.has('cross-origin-embedder-policy')) {
    errors.push(`[${route}] Pelanggaran: Header "Cross-Origin-Embedder-Policy" TIDAK boleh dipasang`);
  }

  // 3. Strict-Transport-Security (only if HTTPS / req.secure)
  if (isHttps) {
    const hsts = headers.get('strict-transport-security');
    if (!hsts) {
      errors.push(`[${route}] Header Strict-Transport-Security tidak ditemukan pada HTTPS request`);
    } else if (hsts !== 'max-age=31536000; includeSubDomains') {
      errors.push(`[${route}] Strict-Transport-Security tidak valid: "${hsts}"`);
    }
  }

  // 4. X-Content-Type-Options
  if (headers.get('x-content-type-options') !== 'nosniff') {
    errors.push(`[${route}] Header X-Content-Type-Options bukan "nosniff"`);
  }

  // 5. X-Frame-Options
  if (headers.get('x-frame-options') !== 'DENY') {
    errors.push(`[${route}] Header X-Frame-Options bukan "DENY"`);
  }

  // 6. Referrer-Policy
  if (headers.get('referrer-policy') !== 'strict-origin-when-cross-origin') {
    errors.push(`[${route}] Header Referrer-Policy bukan "strict-origin-when-cross-origin"`);
  }

  // 7. Permissions-Policy
  const permissionsPolicy = headers.get('permissions-policy');
  if (
    !permissionsPolicy ||
    !permissionsPolicy.includes('camera=()') ||
    !permissionsPolicy.includes('microphone=()') ||
    !permissionsPolicy.includes('geolocation=()') ||
    !permissionsPolicy.includes('payment=()') ||
    !permissionsPolicy.includes('usb=()')
  ) {
    errors.push(`[${route}] Header Permissions-Policy tidak lengkap atau salah: "${permissionsPolicy}"`);
  }

  // 8. Cross-Origin Isolation Headers
  if (headers.get('cross-origin-opener-policy') !== 'same-origin') {
    errors.push(`[${route}] Header Cross-Origin-Opener-Policy bukan "same-origin"`);
  }
  if (headers.get('cross-origin-resource-policy') !== 'same-site') {
    errors.push(`[${route}] Header Cross-Origin-Resource-Policy bukan "same-site"`);
  }
}

function verifyCspDirectives(route, csp) {
  if (!csp) {
    errors.push(`[${route}] Header Content-Security-Policy kosong atau tidak ditemukan`);
    return;
  }

  const requiredDirectives = [
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

  for (const directive of requiredDirectives) {
    if (!csp.includes(directive)) {
      errors.push(`[${route}] CSP Directive hilang: "${directive}"`);
    }
  }
}

async function runHeaderChecks() {
  console.log('=== STARTING SECURITY HEADERS AUDIT ===');
  console.log(`Routes to verify: ${INDEXED_ROUTES.length} indexed routes + 404 + sitemap + robots`);

  let proc1 = null;
  let proc2 = null;

  try {
    // -------------------------------------------------------------------------
    // Phase 0: Validate vercel.json Static Security & Cache Headers
    // -------------------------------------------------------------------------
    console.log('[0/3] Validating vercel.json structure and security headers...');
    const vercelConfigPath = path.resolve(process.cwd(), 'vercel.json');
    if (!fs.existsSync(vercelConfigPath)) {
      errors.push('vercel.json tidak ditemukan di root directory!');
    } else {
      let vConfig;
      try {
        vConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'));
      } catch (e) {
        errors.push(`vercel.json bukan JSON valid: ${e.message}`);
      }

      if (vConfig) {
        // Check redirects
        if (!vConfig.redirects || !vConfig.redirects.some((r) => r.source === '/sitemap.xml' && r.destination === '/sitemap_index.xml')) {
          errors.push('vercel.json tidak memuat redirect permanent /sitemap.xml -> /sitemap_index.xml');
        }

        // Check headers
        if (!Array.isArray(vConfig.headers) || vConfig.headers.length === 0) {
          errors.push('vercel.json tidak memuat array "headers"');
        } else {
          // Check /(.*) security headers
          const rootHeaderRule = vConfig.headers.find((h) => h.source === '/(.*)');
          if (!rootHeaderRule) {
            errors.push('vercel.json tidak memuat header rule untuk source "/(.*)"');
          } else {
            const headerMap = new Map(rootHeaderRule.headers.map((h) => [h.key.toLowerCase(), h.value]));
            const requiredHeaders = [
              'x-content-type-options',
              'x-frame-options',
              'referrer-policy',
              'permissions-policy',
              'cross-origin-opener-policy',
              'cross-origin-resource-policy',
              'strict-transport-security',
            ];
            for (const reqH of requiredHeaders) {
              if (!headerMap.has(reqH)) {
                errors.push(`vercel.json [/(.*)] kehilangan header: ${reqH}`);
              }
            }

            const cspHeader = headerMap.get('content-security-policy-report-only') || headerMap.get('content-security-policy');
            if (!cspHeader) {
              errors.push('vercel.json [/(.*)] tidak memuat Content-Security-Policy atau Content-Security-Policy-Report-Only');
            } else {
              if (cspHeader.includes("'unsafe-eval'")) {
                errors.push("vercel.json CSP tidak boleh memuat 'unsafe-eval'!");
              }
              if (cspHeader.includes("default-src *") || cspHeader.includes("script-src *")) {
                errors.push('vercel.json CSP tidak boleh memuat wildcard * pada default-src atau script-src!');
              }
            }
          }

          // Check /assets/(.*) immutable cache
          const assetRule = vConfig.headers.find((h) => h.source === '/assets/(.*)');
          if (!assetRule) {
            errors.push('vercel.json tidak memuat header rule untuk source "/assets/(.*)"');
          } else {
            const cc = assetRule.headers.find((h) => h.key.toLowerCase() === 'cache-control');
            if (!cc || !cc.value.includes('immutable')) {
              errors.push('vercel.json [/assets/(.*)] tidak memuat Cache-Control immutable');
            }
          }
        }
      }
    }

    // -------------------------------------------------------------------------
    // Phase 1: Test Full Enforcement Mode across ALL routes
    // -------------------------------------------------------------------------
    const port1 = await getFreePort();
    const baseUrl1 = `http://127.0.0.1:${port1}`;
    console.log(`[1/2] Launching server in production mode (Full Enforcement on port ${port1})...`);
    proc1 = runServer(port1, { CSP_REPORT_ONLY: 'false' });
    const ready1 = await waitForServer(baseUrl1);
    if (!ready1) {
      throw new Error(`Server failed to start on port ${port1} within timeout`);
    }

    // 1. Test ALL 11 indexed routes
    console.log(`Verifying security headers on all ${INDEXED_ROUTES.length} indexed routes...`);
    for (const route of INDEXED_ROUTES) {
      const url = `${baseUrl1}${route === '/' ? '/' : route}`;
      const res = await fetch(url, {
        headers: {
          'X-Forwarded-Proto': 'https',
        },
      });

      if (res.status !== 200) {
        errors.push(`[${route}] Status tidak valid: ${res.status}, diharapkan 200`);
      }

      const headers = res.headers;
      verifyCommonSecurityHeaders(route, headers, true);

      // Verify Content-Security-Policy
      const csp = headers.get('content-security-policy');
      verifyCspDirectives(route, csp);

      // Verify HTML Cache-Control
      if (headers.get('cache-control') !== 'no-cache') {
        errors.push(`[${route}] Cache-Control bukan "no-cache", melainkan: "${headers.get('cache-control')}"`);
      }
    }

    // 2. Test non-existent routes (404 with security headers)
    const test404Routes = ['/tidak-ada-halaman-random-12345', '/halaman-palsu-404'];
    for (const route of test404Routes) {
      console.log(`Verifying non-existent route returns 404 with security headers (${route})...`);
      const notFoundRes = await fetch(`${baseUrl1}${route}`, {
        headers: {
          'X-Forwarded-Proto': 'https',
        },
      });

      if (notFoundRes.status !== 404) {
        errors.push(`[${route}] Status bukan 404, melainkan: ${notFoundRes.status}`);
      }

      const notFoundHeaders = notFoundRes.headers;
      verifyCommonSecurityHeaders(route, notFoundHeaders, true);

      const notFoundCsp = notFoundHeaders.get('content-security-policy');
      verifyCspDirectives(route, notFoundCsp);

      // Check X-Robots-Tag: noindex, nofollow on 404
      const robotsTag = notFoundHeaders.get('x-robots-tag') || '';
      if (!robotsTag.includes('noindex') || !robotsTag.includes('nofollow')) {
        errors.push(`[${route}] X-Robots-Tag pada 404 tidak memuat "noindex, nofollow": "${robotsTag}"`);
      }

      // Check Cache-Control on 404
      const cacheControl = notFoundHeaders.get('cache-control') || '';
      if (!cacheControl.includes('no-cache') && !cacheControl.includes('no-store')) {
        errors.push(`[${route}] Cache-Control pada 404 tidak memuat no-cache: "${cacheControl}"`);
      }
    }

    // 3. Test sitemaps and /robots.txt
    console.log('Verifying sitemap index, child sitemaps, redirect, and /robots.txt endpoints...');

    // 3a. Legacy /sitemap.xml 301 redirect check
    const legacySitemapRes = await fetch(`${baseUrl1}/sitemap.xml`, {
      headers: { 'X-Forwarded-Proto': 'https' },
      redirect: 'manual',
    });
    if (legacySitemapRes.status !== 301) {
      errors.push(`[/sitemap.xml] Status bukan 301, melainkan: ${legacySitemapRes.status}`);
    }
    const redirectLocation = legacySitemapRes.headers.get('location') || '';
    if (!redirectLocation.includes('/sitemap_index.xml')) {
      errors.push(`[/sitemap.xml] Redirect location bukan "/sitemap_index.xml": "${redirectLocation}"`);
    }

    // 3b. XML Sitemaps (sitemap_index.xml, page-sitemap.xml, location-sitemap.xml)
    const xmlEndpoints = ['/sitemap_index.xml', '/page-sitemap.xml', '/location-sitemap.xml'];
    for (const endpoint of xmlEndpoints) {
      const xmlRes = await fetch(`${baseUrl1}${endpoint}`, {
        headers: { 'X-Forwarded-Proto': 'https' },
      });
      if (xmlRes.status !== 200) {
        errors.push(`[${endpoint}] Status bukan 200, melainkan: ${xmlRes.status}`);
      }
      const contentType = xmlRes.headers.get('content-type') || '';
      if (!contentType.includes('application/xml')) {
        errors.push(`[${endpoint}] Content-Type bukan "application/xml": "${contentType}"`);
      }
      if (xmlRes.headers.has('x-powered-by')) {
        errors.push(`[${endpoint}] Header "X-Powered-By" masih ada`);
      }
      const robotsHeader = xmlRes.headers.get('x-robots-tag');
      if (robotsHeader && robotsHeader.includes('noindex')) {
        errors.push(`[${endpoint}] TIDAK boleh memiliki X-Robots-Tag: noindex`);
      }
    }

    // 3c. robots.txt
    const robotsRes = await fetch(`${baseUrl1}/robots.txt`, {
      headers: { 'X-Forwarded-Proto': 'https' },
    });
    if (robotsRes.status !== 200) {
      errors.push(`[/robots.txt] Status bukan 200, melainkan: ${robotsRes.status}`);
    }
    const robotsType = robotsRes.headers.get('content-type') || '';
    if (!robotsType.includes('text/plain')) {
      errors.push(`[/robots.txt] Content-Type bukan "text/plain": "${robotsType}"`);
    }
    if (robotsRes.headers.has('x-powered-by')) {
      errors.push('[/robots.txt] Header "X-Powered-By" masih ada');
    }
    const robotsTag = robotsRes.headers.get('x-robots-tag');
    if (robotsTag && robotsTag.includes('noindex')) {
      errors.push('[/robots.txt] TIDAK boleh memiliki X-Robots-Tag: noindex');
    }

    await stopProcess(proc1);
    proc1 = null;

    // -------------------------------------------------------------------------
    // Phase 2: Test Report-Only Mode Toggle (CSP_REPORT_ONLY=true)
    // -------------------------------------------------------------------------
    const port2 = await getFreePort();
    const baseUrl2 = `http://127.0.0.1:${port2}`;
    console.log(`[2/2] Launching server with CSP_REPORT_ONLY=true (port ${port2})...`);
    proc2 = runServer(port2, { CSP_REPORT_ONLY: 'true' });
    const ready2 = await waitForServer(baseUrl2);
    if (!ready2) {
      throw new Error(`Server failed to start in Report-Only mode on port ${port2} within timeout`);
    }

    const reportRes = await fetch(`${baseUrl2}/`, {
      headers: {
        'X-Forwarded-Proto': 'https',
      },
    });

    const reportHeaders = reportRes.headers;
    if (!reportHeaders.has('content-security-policy-report-only')) {
      errors.push('Header Content-Security-Policy-Report-Only tidak ditemukan saat CSP_REPORT_ONLY=true');
    }
    if (reportHeaders.has('content-security-policy')) {
      errors.push('Header Content-Security-Policy (blocking) seharusnya tidak aktif saat CSP_REPORT_ONLY=true');
    }

    await stopProcess(proc2);
    proc2 = null;
  } catch (err) {
    errors.push(`Eksepsi saat pengujian header: ${err.message}`);
  } finally {
    if (proc1) await stopProcess(proc1);
    if (proc2) await stopProcess(proc2);
  }

  // ---------------------------------------------------------------------------
  // Summary & Exit
  // ---------------------------------------------------------------------------
  console.log('\n--- RINGKASAN AUDIT SECURITY HEADERS ---');
  if (errors.length > 0) {
    console.error('❌ PENGUJIAN SECURITY HEADERS GAGAL:');
    errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
    process.exit(1);
  } else {
    console.log('✅ SEMUA SECURITY HEADERS SESUAI SPESIFIKASI 100%!');
    console.log(`  - 11 rute terindeks divalidasi memiliki security headers lengkap: PASSED`);
    console.log(`  - Rute tidak dikenal mengembalikan 404 dengan security headers lengkap: PASSED`);
    console.log(`  - Content-Security-Policy (Full Enforcement & Report-Only toggle): PASSED`);
    console.log(`  - Strict-Transport-Security (req.secure via trust proxy 1): PASSED`);
    console.log(`  - X-Content-Type-Options: nosniff: PASSED`);
    console.log(`  - X-Frame-Options: DENY: PASSED`);
    console.log(`  - Referrer-Policy: strict-origin-when-cross-origin: PASSED`);
    console.log(`  - Permissions-Policy (camera, mic, geo, payment, usb dimatikan): PASSED`);
    console.log(`  - COOP: same-origin & CORP: same-site: PASSED`);
    console.log(`  - Cache-Control: no-cache untuk HTML, immutable untuk /assets/*: PASSED`);
    console.log(`  - X-Powered-By dihapus di seluruh respon: PASSED`);
    console.log(`  - Sitemaps (200 application/xml), /sitemap.xml (301 redirect), & /robots.txt (200 text/plain) tanpa noindex: PASSED`);
    process.exit(0);
  }
}

runHeaderChecks();
