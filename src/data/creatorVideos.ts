/**
 * Single source of truth untuk Konten Video Kreator TikTok TentoTen Photobox.
 * Menyediakan URL video TikTok resmi, label netral, deskripsi generik,
 * serta berkas thumbnail WebP dan teks alt deskriptif.
 */

export interface CreatorVideoItem {
  id: string;
  url: string;
  title: string;
  creator: string;
  caption: string;
  thumbnail: string;
  thumbAlt: string;
}

export const CREATOR_VIDEOS: CreatorVideoItem[] = [
  {
    id: 'tiktok-kreator-1',
    url: 'https://vt.tiktok.com/ZSphUnKtm/',
    title: 'Video Kreator 1',
    creator: 'Kreator TentoTen',
    caption: 'Lihat keseruan sesi foto di bilik TentoTen bersama teman sambil menikmati waktu santai di kafe.',
    thumbnail: '/assets/creators/kreator-1.webp',
    thumbAlt: 'Cuplikan video kreator memegang hasil cetak foto strip TentoTen di kafe',
  },
  {
    id: 'tiktok-kreator-2',
    url: 'https://vt.tiktok.com/ZSphUgP8w/',
    title: 'Video Kreator 2',
    creator: 'Kreator TentoTen',
    caption: 'Pengalaman mencoba photobox otomatis di kafe favorit dengan hasil cetak fisik instan bergaya retro.',
    thumbnail: '/assets/creators/kreator-2.webp',
    thumbAlt: 'Cuplikan video bilik foto TentoTen di kafe KEYF Kertosono',
  },
  {
    id: 'tiktok-kreator-3',
    url: 'https://vt.tiktok.com/ZSphyrj9T/',
    title: 'Video Kreator 3',
    creator: 'Kreator TentoTen',
    caption: 'Momen mencoba beragam template frame foto analog 35mm langsung di bilik foto TentoTen.',
    thumbnail: '/assets/creators/kreator-3.webp',
    thumbAlt: 'Cuplikan video pengunjung mencoba bilik foto TentoTen bersama teman',
  },
  {
    id: 'tiktok-kreator-4',
    url: 'https://vt.tiktok.com/ZSphydC4v/',
    title: 'Video Kreator 4',
    creator: 'Kreator TentoTen',
    caption: 'Suasana nongkrong santai di kafe sekaligus mengabadikan kenangan cetak fisik dua lembar yang estetik.',
    thumbnail: '/assets/creators/kreator-4.webp',
    thumbAlt: 'Cuplikan video hasil cetak frame foto bertema theater di TentoTen',
  },
  {
    id: 'tiktok-kreator-5',
    url: 'https://vt.tiktok.com/ZSphyN3hA/',
    title: 'Video Kreator 5',
    creator: 'Kreator TentoTen',
    caption: 'Alur walk-in foto di bilik kafe yang praktis tanpa perlu registrasi aplikasi atau antrean berbelit.',
    thumbnail: '/assets/creators/kreator-5.webp',
    thumbAlt: 'Cuplikan video bilik photobox TentoTen di Sthana Coffee Madiun',
  },
  {
    id: 'tiktok-kreator-6',
    url: 'https://vt.tiktok.com/ZSphyUNVS/',
    title: 'Video Kreator 6',
    creator: 'Kreator TentoTen',
    caption: 'Koleksi hasil cetak foto strip tebal dan softfile digital yang mudah diunduh lewat pemindaian kode QR.',
    thumbnail: '/assets/creators/kreator-6.webp',
    thumbAlt: 'Cuplikan video suasana bilik TentoTen bernuansa merah di kafe Madiun',
  },
];
