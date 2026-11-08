import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { INDEXED_ROUTES } from '../src/routes.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const HOST = 'tentotenphotobox.biz.id';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const indexNowKey = process.env.INDEXNOW_KEY;

async function submitIndexNow() {
  console.log('=== IndexNow Ping & Key Generation ===');

  if (!indexNowKey) {
    console.log('[IndexNow] INDEXNOW_KEY environment variable tidak diset. Melewati pengiriman IndexNow.');
    process.exit(0);
  }

  // Generate key file in dist/
  if (fs.existsSync(distDir)) {
    const keyFilePath = path.resolve(distDir, `${indexNowKey}.txt`);
    fs.writeFileSync(keyFilePath, indexNowKey, 'utf-8');
    console.log(`[IndexNow] File kunci berhasil dibuat: ${keyFilePath}`);
  }

  const urlList = INDEXED_ROUTES.map((p) => `https://${HOST}${p === '/' ? '' : p}`);

  const payload = {
    host: HOST,
    key: indexNowKey,
    keyLocation: `https://${HOST}/${indexNowKey}.txt`,
    urlList
  };

  console.log(`[IndexNow] Mengirimkan ${urlList.length} URL ke ${INDEXNOW_ENDPOINT}...`);

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`[IndexNow] Berhasil dikirim! Status: ${response.status} ${response.statusText}`);
    } else {
      const text = await response.text();
      console.warn(`[IndexNow] Respons API (${response.status}): ${text}`);
    }
  } catch (error) {
    console.error('[IndexNow] Gagal mengirim ke IndexNow:', error.message);
  }
}

submitIndexNow();
