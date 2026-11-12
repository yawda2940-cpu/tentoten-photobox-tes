/**
 * Format tanggal artikel (YYYY-MM-DD) ke bahasa Indonesia, mis. "20 November 2026".
 * Memakai penguraian manual, bukan new Date() atau Intl, supaya hasilnya sama
 * di server (prerender), browser, dan zona waktu mana pun (tidak bergeser sehari).
 */
const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
] as const;

interface DateParts {
  year: number;
  month: number; // 1-12
  day: number;
}

function parseIsoDate(iso: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  // Tolak tanggal yang tidak ada (mis. 2026-02-31)
  const check = new Date(Date.UTC(year, month - 1, day));
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) {
    return null;
  }
  return { year, month, day };
}

/** "2026-11-20" -> "20 November 2026". Jika tidak valid, kembalikan teks asli. */
export function formatIndonesianDate(iso: string): string {
  const parts = parseIsoDate(iso);
  if (!parts) return iso;
  return `${parts.day} ${MONTHS_ID[parts.month - 1]} ${parts.year}`;
}

/** Nilai untuk atribut <time dateTime="...">: selalu "YYYY-MM-DD". */
export function toIsoDate(iso: string): string {
  const parts = parseIsoDate(iso);
  if (!parts) return iso;
  const mm = String(parts.month).padStart(2, '0');
  const dd = String(parts.day).padStart(2, '0');
  return `${parts.year}-${mm}-${dd}`;
}

// Alias supaya cocok dengan nama yang mungkin dipakai halaman.
export const formatDate = formatIndonesianDate;
export const formatDateID = formatIndonesianDate;
export const formatTanggalIndonesia = formatIndonesianDate;