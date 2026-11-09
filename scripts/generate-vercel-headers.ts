import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getVercelHeadersConfig } from '../src/server/securityHeaderList.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const vercelConfigPath = path.resolve(rootDir, 'vercel.json');

console.log('--- Generating vercel.json Security & Cache Headers ---');

let currentConfig: Record<string, any> = {};
if (fs.existsSync(vercelConfigPath)) {
  try {
    currentConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'));
  } catch (err) {
    console.warn('Existing vercel.json could not be parsed, initializing fresh configuration.');
    currentConfig = {};
  }
}

// Preserve existing redirects (e.g. /sitemap.xml -> /sitemap_index.xml)
if (!currentConfig.redirects || !Array.isArray(currentConfig.redirects)) {
  currentConfig.redirects = [
    {
      source: '/sitemap.xml',
      destination: '/sitemap_index.xml',
      permanent: true,
    },
  ];
} else {
  // Ensure legacy sitemap.xml redirect is present
  const hasSitemapRedirect = currentConfig.redirects.some(
    (r: any) => r.source === '/sitemap.xml' && r.destination === '/sitemap_index.xml'
  );
  if (!hasSitemapRedirect) {
    currentConfig.redirects.push({
      source: '/sitemap.xml',
      destination: '/sitemap_index.xml',
      permanent: true,
    });
  }
}

// Generate headers configuration from securityHeaderList.ts
currentConfig.headers = getVercelHeadersConfig();

const outputJson = JSON.stringify(currentConfig, null, 2) + '\n';
fs.writeFileSync(vercelConfigPath, outputJson, 'utf-8');
console.log(`[Vercel] Successfully wrote updated security & caching headers to ${vercelConfigPath}`);

// If dist directory exists, write to dist/vercel.json as well
const distVercelConfigPath = path.resolve(rootDir, 'dist', 'vercel.json');
if (fs.existsSync(path.resolve(rootDir, 'dist'))) {
  fs.writeFileSync(distVercelConfigPath, outputJson, 'utf-8');
  console.log(`[Vercel] Synced vercel.json to dist/vercel.json`);
}
