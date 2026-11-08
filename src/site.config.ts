/**
 * Single source of truth for Site Configuration and SEO Metadata
 * TentoTen Photobox
 */

export { SITE_URL, ROUTES, INDEXED_ROUTES, ALL_ROUTES, SITEMAP_TYPE_MAP, type RouteItem, type RouteType } from './routes';
import { SITE_URL, INDEXED_ROUTES, ALL_ROUTES } from './routes';

export const GA_ID = (typeof process !== 'undefined' && (process.env.GA_ID || process.env.VITE_GA_ID)) || '';
export const GOOGLE_SITE_VERIFICATION = (typeof process !== 'undefined' && (process.env.GOOGLE_SITE_VERIFICATION || process.env.VITE_GOOGLE_SITE_VERIFICATION)) || '';
export const BING_SITE_VERIFICATION = (typeof process !== 'undefined' && (process.env.BING_SITE_VERIFICATION || process.env.VITE_BING_SITE_VERIFICATION)) || '';

export interface LocationDetail {
  slug: string;
  name: string;
  cafeName: string;
  h1: string;
  introText: string;
  title: string;
  description: string;
  address: string;
  regency: string;
  hours: string;
  openingHoursSchema: string;
  googleMapsUrl: string;
  embedMapUrl: string;
  postalCode?: string;
  directions?: string;
  images: {
    title: string;
    description: string;
    url: string;
    webpUrl?: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

export const LOCATIONS: Record<string, LocationDetail> = {
  madiun: {
    slug: 'madiun',
    name: 'Madiun',
    cafeName: 'Sthana Coffee',
    h1: 'Photobox di Madiun: Sthana Coffee, Jl. Setiaki No. 27',
    introText:
      'Mencari photobox di Madiun? TentoTen Photobox ada di Sthana Coffee, Jl. Setiaki No. 27, Kota Madiun. Kamu datang, pesan minuman, lalu foto di photobox sambil nongkrong. Satu sesi Rp35.000, dibayar di lokasi, tanpa booking. Halaman ini merangkum alamat, jam buka, cara menuju lokasi, hal yang perlu disiapkan, dan jawaban dari pertanyaan yang sering muncul tentang photobox TentoTen di Madiun.',
    title: 'Photobox Madiun di Sthana Coffee | TentoTen Photobox',
    description:
      'Photobox di Madiun ada di Sthana Coffee, Jl. Setiaki No. 27. Rp35.000 per sesi, tanpa booking. Cek jam buka, petunjuk arah, dan custom frame Rp60.000.',
    address: 'Jl. Setiaki No. 27, Kota Madiun, Jawa Timur',
    regency: 'Kota Madiun',
    hours: '08.00-24.00',
    openingHoursSchema: 'Mo-Su 08:00-24:00',
    googleMapsUrl: 'https://maps.google.com/?q=Sthana+Coffee+Madiun',
    embedMapUrl: 'https://www.google.com/maps?q=Sthana+Coffee+Madiun&output=embed',
    directions: 'Kawasan Oro-oro Ombo Kota Madiun, terletak di area dalam Sthana Coffee.',
    images: [
      {
        title: 'Mesin Photobox TentoTen Sthana',
        description: 'Koridor dalam Sthana Coffee Madiun',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxWY9tynIhCj-mgfG_uTc9Vk-TMZFw1H7oOacMvswHOjGQI1O5p-3oVlQG6qMSQTLkuipKkaftvrtRRQn0fG0-HJ1vC6D8cczkJ4Yy7fd1e_99TEPR_--PT7MkHCrYvYLXEYTavLZ98c9at_-xWI-4NN-gB2uJiaLbK0tz9nRFMNRJ8q9sgB9fuHiaMr4MJo6930EFSO8bpBp-57YKefnyMwGWUb2RpJMa6r34AjkqxClrM7Q3ASZ2bw',
        webpUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxWY9tynIhCj-mgfG_uTc9Vk-TMZFw1H7oOacMvswHOjGQI1O5p-3oVlQG6qMSQTLkuipKkaftvrtRRQn0fG0-HJ1vC6D8cczkJ4Yy7fd1e_99TEPR_--PT7MkHCrYvYLXEYTavLZ98c9at_-xWI-4NN-gB2uJiaLbK0tz9nRFMNRJ8q9sgB9fuHiaMr4MJo6930EFSO8bpBp-57YKefnyMwGWUb2RpJMa6r34AjkqxClrM7Q3ASZ2bw=rw',
        alt: 'Mesin photobox TentoTen di dalam kedai kopi Sthana Coffee Madiun',
        width: 800,
        height: 600
      },
      {
        title: 'Area Nongkrong Sthana Coffee',
        description: 'Suasana ngopi santai di Sthana Madiun',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOGcxQCv_feHSx3DtY1nyGqtssQXbRc1VHykUXHQzsBt34jVks2I36tltd3FXWmgMJn5q3FNCzCBSGrFswQvGIqVid8_jHjtXfaAmSq1osMhDumdBpvpergKXPad-3C2Sww1JVxtNSkt7YvuijDOPdE546RjE_K6pW25azwk9YQV_U0XR4lXiH3Wx3dAgOtDOwatRr4bA9C1qRY3oXiZJNzuMh5D0KrrDiOADkolEdxsbwhCdZubtC7A',
        webpUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOGcxQCv_feHSx3DtY1nyGqtssQXbRc1VHykUXHQzsBt34jVks2I36tltd3FXWmgMJn5q3FNCzCBSGrFswQvGIqVid8_jHjtXfaAmSq1osMhDumdBpvpergKXPad-3C2Sww1JVxtNSkt7YvuijDOPdE546RjE_K6pW25azwk9YQV_U0XR4lXiH3Wx3dAgOtDOwatRr4bA9C1qRY3oXiZJNzuMh5D0KrrDiOADkolEdxsbwhCdZubtC7A=rw',
        alt: 'Suasana santai pengunjung di kafe Sthana Coffee Madiun',
        width: 800,
        height: 600
      }
    ]
  },
  jombang: {
    slug: 'jombang',
    name: 'Jombang',
    cafeName: 'Ethereal Coffee',
    h1: 'Photobox di Jombang: Ethereal Coffee, Jl. Kusuma Bangsa No. 23',
    introText:
      'Kalau kamu sedang mencari photobox di Jombang, TentoTen Photobox ada di Ethereal Coffee, Jl. Kusuma Bangsa No. 23, Pulo Lor, Kecamatan Jombang, Kabupaten Jombang, Jawa Timur 61419. Satu sesi Rp35.000, dibayar di lokasi, tanpa booking. Halaman ini berisi alamat lengkap, jam buka, petunjuk menuju lokasi, saran waktu datang, informasi custom frame, dan jawaban atas pertanyaan yang sering diajukan tentang photobox di Jombang.',
    title: 'Photobox Jombang di Ethereal Coffee | TentoTen Photobox',
    description:
      'Photobox di Jombang ada di Ethereal Coffee, Jl. Kusuma Bangsa No. 23, Pulo Lor. Rp35.000 per sesi, tanpa booking. Lihat jam buka, rute, dan custom frame.',
    address: 'Jl. Kusuma Bangsa No. 23, Pulo Lor, Kec. Jombang, Kab. Jombang, Jawa Timur 61419',
    regency: 'Kabupaten Jombang',
    postalCode: '61419',
    hours: '08.00-23.00',
    openingHoursSchema: 'Mo-Su 08:00-23:00',
    googleMapsUrl: 'https://maps.google.com/?q=Ethereal+Coffee+Jombang',
    embedMapUrl: 'https://www.google.com/maps?q=Ethereal+Coffee+Jombang&output=embed',
    directions: 'Pulo Lor Kecamatan Jombang, dekat pusat kota dengan area indoor nyaman.',
    images: [
      {
        title: 'Area Photobox Ethereal Coffee',
        description: 'Mesin foto otomatis di Ethereal Jombang',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf_I5CeiNFgRPIdwcRmCrj2gz403aM6grvCXfl3Yb_SmGXf2Hxh0KJRmkcuMt9XC1_cYX1qCA3my6z3C1j95VvTxYrCknC7DSMHyZkaWuoJVsCCtazgPDgKZZR6Rs8eZDAXW3O6aj2KMoWs4Yava53XMl-CgM86iwgXZAWCyM0odcnphipJgCmHRCUCyYMg6B5vJxkxG6PmqDqWnv0MdONctoSMp5tZViyJsYnVhUPG1WIugtY5BmS_Q',
        webpUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf_I5CeiNFgRPIdwcRmCrj2gz403aM6grvCXfl3Yb_SmGXf2Hxh0KJRmkcuMt9XC1_cYX1qCA3my6z3C1j95VvTxYrCknC7DSMHyZkaWuoJVsCCtazgPDgKZZR6Rs8eZDAXW3O6aj2KMoWs4Yava53XMl-CgM86iwgXZAWCyM0odcnphipJgCmHRCUCyYMg6B5vJxkxG6PmqDqWnv0MdONctoSMp5tZViyJsYnVhUPG1WIugtY5BmS_Q=rw',
        alt: 'Bilik photobox TentoTen di dalam Ethereal Coffee Jombang',
        width: 800,
        height: 600
      },
      {
        title: 'Suasana Ethereal Coffee Jombang',
        description: 'Interior santai buat ngopi dan foto',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaTk3FeWHiRVuRmAkn3xkpx29qlt97au4IpQko5GhHL8IAzui-XK9SccvTUZDNGJzUoTioNv9rOXzhjvhR9JDFXvnOKQYXTrCRBIeQqMozcFMMPuuTl_YX4nTY4ec3JuPFTmWx9qcugrIHc5Ti5mbbkwrlSGyvNLDeBnef0kf-3kK18v3Q9alpesx6UP0Skr8ICU5ikDDKouQ_2E9SMxkUX1SREm5aaBwMSzRHSgkD7jwZCiQrvlFmA',
        webpUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaTk3FeWHiRVuRmAkn3xkpx29qlt97au4IpQko5GhHL8IAzui-XK9SccvTUZDNGJzUoTioNv9rOXzhjvhR9JDFXvnOKQYXTrCRBIeQqMozcFMMPuuTl_YX4nTY4ec3JuPFTmWx9qcugrIHc5Ti5mbbkwrlSGyvNLDeBnef0kf-3kK18v3Q9alpesx6UP0Skr8ICU5ikDDKouQ_2E9SMxkUX1SREm5aaBwMSzRHSgkD7jwZCiQrvlFmA=rw',
        alt: 'Interior kafe Ethereal Coffee di Jombang',
        width: 800,
        height: 600
      }
    ]
  },
  ponorogo: {
    slug: 'ponorogo',
    name: 'Ponorogo',
    cafeName: 'Komahaus Coffee',
    h1: 'Photobox di Ponorogo: Komahaus Coffee, Jl. Semeru No. 52',
    introText:
      'TentoTen Photobox di Ponorogo ada di Komahaus Coffee, Jl. Semeru No. 52, Nologaten, Kecamatan Ponorogo, Kabupaten Ponorogo. Kafe ini buka dari pukul 07.00 sampai 00.00, jam buka terpanjang di antara empat cabang TentoTen. Satu sesi Rp35.000, dibayar di lokasi, tanpa booking. Halaman ini membahas alamat, jam buka, cara menuju lokasi, waktu datang yang cocok, custom frame, dan pertanyaan yang sering muncul seputar photobox di Ponorogo.',
    title: 'Photobox Ponorogo di Komahaus Coffee | TentoTen',
    description:
      'Photobox di Ponorogo ada di Komahaus Coffee, Jl. Semeru No. 52, Nologaten. Buka 07.00 sampai 00.00, Rp35.000 per sesi, tanpa booking. Cek rute dan custom frame.',
    address: 'Jl. Semeru No. 52, Nologaten, Kec. Ponorogo, Kab. Ponorogo, Jawa Timur',
    regency: 'Kabupaten Ponorogo',
    hours: '07.00-00.00',
    openingHoursSchema: 'Mo-Su 07:00-00:00',
    googleMapsUrl: 'https://maps.google.com/?q=Komahaus+Coffee+Ponorogo',
    embedMapUrl: 'https://www.google.com/maps?q=Komahaus+Coffee+Ponorogo&output=embed',
    directions: 'Samping bar pemesanan kopi Komahaus Coffee Nologaten Ponorogo.',
    images: [
      {
        title: 'Booth TentoTen Komahaus Ponorogo',
        description: 'Samping bar kopi Komahaus Ponorogo',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIspXd-bSk4SSZK_1yVy9VdEtEp7W8EtLrYsZh9R2NUbb2JuYm4GovLYQtMfTVs0WtofRT9J1t4d7bB7f05b8cdWPuO-rcWqN6T8OwFQeYXv0_uYmUDV4sFqJGXkXWTlpqnYlZezhxI3AGOOGw7_s1r6S5LlEA7O3--HEoSWzTbm6z6s2-k1r0nbuF_iH7iF29aqz30tRCCEIipm_Bt_ZqPvj-Q0uG-g6CgCBGjJvG627k917hNTNERw',
        webpUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIspXd-bSk4SSZK_1yVy9VdEtEp7W8EtLrYsZh9R2NUbb2JuYm4GovLYQtMfTVs0WtofRT9J1t4d7bB7f05b8cdWPuO-rcWqN6T8OwFQeYXv0_uYmUDV4sFqJGXkXWTlpqnYlZezhxI3AGOOGw7_s1r6S5LlEA7O3--HEoSWzTbm6z6s2-k1r0nbuF_iH7iF29aqz30tRCCEIipm_Bt_ZqPvj-Q0uG-g6CgCBGjJvG627k917hNTNERw=rw',
        alt: 'Bilik photobox TentoTen di Komahaus Coffee Ponorogo',
        width: 800,
        height: 600
      },
      {
        title: 'Suasana Nongkrong Komahaus',
        description: 'Tempat ngopi favorit anak muda Ponorogo',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7EbrubY6NbdvkDuUrTCspZkticm9Irf8Euym38cMcz2Of4fBypCSHBdYwZm8fWGyR74IikB4IY6fyoTxA0KdFmkbPS1Yipj1OdckP8_Qzi1dlR7YvBIDg6gVVdCStuAdRBpG11UNml_VVHOT9SFzsbAONFpvSCUCiAKqpRgqq_ocVynFpbgjleMMMyYpRB6i3uz4OmuW0rBL9SgnschUUPXoiYsjepDPjuuO5lcwMRM7mU1i3TH31OA',
        webpUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7EbrubY6NbdvkDuUrTCspZkticm9Irf8Euym38cMcz2Of4fBypCSHBdYwZm8fWGyR74IikB4IY6fyoTxA0KdFmkbPS1Yipj1OdckP8_Qzi1dlR7YvBIDg6gVVdCStuAdRBpG11UNml_VVHOT9SFzsbAONFpvSCUCiAKqpRgqq_ocVynFpbgjleMMMyYpRB6i3uz4OmuW0rBL9SgnschUUPXoiYsjepDPjuuO5lcwMRM7mU1i3TH31OA=rw',
        alt: 'Pengunjung nongkrong santai di Komahaus Coffee Ponorogo',
        width: 800,
        height: 600
      }
    ]
  },
  kertosono: {
    slug: 'kertosono',
    name: 'Kertosono',
    cafeName: 'Keyf Coffee',
    h1: 'Photobox di Kertosono: Keyf Coffee, Jl. Apel Gg. I',
    introText:
      'TentoTen Photobox di Kertosono ada di Keyf Coffee, Jl. Apel Gg. I, Pelem, Kutorejo, Kecamatan Kertosono, Kabupaten Nganjuk, Jawa Timur 64314. Kafe buka pukul 10.00 sampai 22.00. Satu sesi photobox Rp35.000, dibayar di lokasi, tanpa booking. Halaman ini memuat alamat lengkap, jam buka, cara menuju lokasi, saran waktu kunjungan, informasi custom frame, dan jawaban dari pertanyaan yang sering muncul tentang photobox di Kertosono dan sekitarnya, termasuk Nganjuk.',
    title: 'Photobox Kertosono di Keyf Coffee | TentoTen Photobox',
    description:
      'Photobox di Kertosono ada di Keyf Coffee, Jl. Apel Gg. I, Pelem, Kutorejo, Nganjuk. Buka 10.00 sampai 22.00, Rp35.000 per sesi, tanpa booking.',
    address: 'Jl. Apel Gg. I, Pelem, Kutorejo, Kec. Kertosono, Kab. Nganjuk, Jawa Timur 64314',
    regency: 'Kabupaten Nganjuk',
    postalCode: '64314',
    hours: '10.00-22.00',
    openingHoursSchema: 'Mo-Su 10:00-22:00',
    googleMapsUrl: 'https://maps.google.com/?q=Keyf+Coffee+Kertosono',
    embedMapUrl: 'https://www.google.com/maps?q=Keyf+Coffee+Kertosono&output=embed',
    directions: 'Jl. Apel Gg. I Pelem Kutorejo Kertosono, koridor utama Keyf Coffee.',
    images: [
      {
        title: 'Kiosk TentoTen Keyf Coffee',
        description: 'Koridor utama Keyf Coffee Kertosono',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyzya4XFUGP311cW86GAWv3twlQ4ERJlySG5bGiUHr3D1YVonwmdybiCReGMnx_fPICPGWNkK2KFexervXU4I3A3Ta36nMr8z7eyCYPvSmAzEAd3if1GeTTJhWpsfJQIjVU14MFzoA6Eau4MqKlMbNZ8jGDv17FWVbpFN70ofSDS5Wa31p2AKPJLbYAs0Gehl_LEz1Q0c1iFXzkPwKjc2DA_PxGfZgGb0Vji5ZheksmOignxrISqGmUQ',
        webpUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyzya4XFUGP311cW86GAWv3twlQ4ERJlySG5bGiUHr3D1YVonwmdybiCReGMnx_fPICPGWNkK2KFexervXU4I3A3Ta36nMr8z7eyCYPvSmAzEAd3if1GeTTJhWpsfJQIjVU14MFzoA6Eau4MqKlMbNZ8jGDv17FWVbpFN70ofSDS5Wa31p2AKPJLbYAs0Gehl_LEz1Q0c1iFXzkPwKjc2DA_PxGfZgGb0Vji5ZheksmOignxrISqGmUQ=rw',
        alt: 'Kiosk photobox TentoTen di dalam kafe Keyf Coffee Kertosono',
        width: 800,
        height: 600
      },
      {
        title: 'Interior Keyf Coffee Kertosono',
        description: 'Suasana santai kafe Keyf Kertosono',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADbu8YLSuAROVqw0v_eCY08bi1Pk2kqcA9llH4nRU9OCvFFn7xndANKtP6cgCQfzaGqlWgLJKok4_Lr0cHYoaRU27H7thMS0Pe-69_uQzGnWxynGB71vX4zM2mRRTFq1WD_VqkvxUNmH2fyryVF2Y9pYiQNIu7q7T_3Fn6HCe0PlGUEsqYwoU6P0-lJh4LVr2WpbErFSixzM1CvVbO-RQwLrzg-yX44pR_4TMJy3Zv0ewIaAGTGe8nmQ',
        webpUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADbu8YLSuAROVqw0v_eCY08bi1Pk2kqcA9llH4nRU9OCvFFn7xndANKtP6cgCQfzaGqlWgLJKok4_Lr0cHYoaRU27H7thMS0Pe-69_uQzGnWxynGB71vX4zM2mRRTFq1WD_VqkvxUNmH2fyryVF2Y9pYiQNIu7q7T_3Fn6HCe0PlGUEsqYwoU6P0-lJh4LVr2WpbErFSixzM1CvVbO-RQwLrzg-yX44pR_4TMJy3Zv0ewIaAGTGe8nmQ=rw',
        alt: 'Interior kafe Keyf Coffee di Kertosono Nganjuk',
        width: 800,
        height: 600
      }
    ]
  }
};

export interface PageMetaConfig {
  path: string;
  title: string;
  description: string;
  h1: string;
  noindex?: boolean;
}

export const PAGES_META: Record<string, PageMetaConfig> = {
  '/': {
    path: '/',
    title: 'TentoTen Photobox | Photobox di Kafe, Rp35.000 per Sesi',
    description:
      'Photobox di dalam kafe di Madiun, Jombang, Ponorogo, dan Kertosono. Rp35.000 per sesi, bayar di lokasi, tanpa booking. Cek alamat, jam buka, dan custom frame.',
    h1: 'Photobox di Kafe Madiun, Jombang, Ponorogo, dan Kertosono'
  },
  '/product': {
    path: '/product',
    title: 'Harga Photobox dan Custom Frame | TentoTen Photobox',
    description:
      'Sesi photobox Rp35.000. Custom frame Rp60.000 dengan file desain dari pelanggan sendiri. Bayar dan pakai langsung di lokasi, tanpa pemesanan online.',
    h1: 'Harga Photobox dan Custom Frame TentoTen'
  },
  '/service': {
    path: '/service',
    title: 'Layanan Photobox dan Custom Frame | TentoTen Photobox',
    description:
      'Photobox di dalam kafe dan custom frame Rp60.000 dengan file desain sendiri. Lihat cara kerja, ketentuan custom frame, dan tanya admin lewat WhatsApp.',
    h1: 'Layanan TentoTen Photobox: Photobox di Kafe dan Custom Frame'
  },
  '/location': {
    path: '/location',
    title: 'Lokasi Photobox di Madiun, Jombang, Ponorogo, Kertosono',
    description:
      'Empat lokasi TentoTen Photobox: Sthana Coffee Madiun, Ethereal Coffee Jombang, Komahaus Coffee Ponorogo, Keyf Coffee Kertosono. Lihat alamat, jam buka, dan peta.',
    h1: 'Lokasi TentoTen Photobox di Jawa Timur'
  },
  '/location/madiun': {
    path: '/location/madiun',
    title: LOCATIONS.madiun.title,
    description: LOCATIONS.madiun.description,
    h1: LOCATIONS.madiun.h1
  },
  '/location/jombang': {
    path: '/location/jombang',
    title: LOCATIONS.jombang.title,
    description: LOCATIONS.jombang.description,
    h1: LOCATIONS.jombang.h1
  },
  '/location/ponorogo': {
    path: '/location/ponorogo',
    title: LOCATIONS.ponorogo.title,
    description: LOCATIONS.ponorogo.description,
    h1: LOCATIONS.ponorogo.h1
  },
  '/location/kertosono': {
    path: '/location/kertosono',
    title: LOCATIONS.kertosono.title,
    description: LOCATIONS.kertosono.description,
    h1: LOCATIONS.kertosono.h1
  },
  '/kemitraan': {
    path: '/kemitraan',
    title: 'Kemitraan & Pengadaan Photobox | TentoTen Photobox',
    description:
      'Punya kafe atau usaha? TentoTen Photobox membuka dua jalur: kemitraan penempatan photobox dan pengadaan photobox. Isi form singkat dan chat admin via WhatsApp.',
    h1: 'Kemitraan dan Pengadaan Photobox untuk Kafe dan Usahamu'
  },
  '/contact': {
    path: '/contact',
    title: 'Hubungi TentoTen Photobox | Tanya Admin via WhatsApp',
    description:
      'Hubungi admin TentoTen Photobox lewat WhatsApp untuk tanya jam buka, lokasi, atau custom frame. Isi form singkat, pesan langsung terbuka di WhatsApp.',
    h1: 'Hubungi TentoTen Photobox'
  },
  '/kebijakan-privasi': {
    path: '/kebijakan-privasi',
    title: 'Kebijakan Privasi | TentoTen Photobox',
    description:
      'Kebijakan privasi TentoTen Photobox menjelaskan bagaimana data foto fisik, unduhan digital via QR code, dan informasi pengunjung dikelola dengan aman.',
    h1: 'Kebijakan Privasi TentoTen Photobox'
  },
  '/404': {
    path: '/404',
    title: 'Halaman Tidak Ditemukan | TentoTen Photobox',
    description:
      'Halaman yang Anda cari tidak dapat ditemukan di TentoTen Photobox. Silakan kembali ke beranda atau cek lokasi booth photobox terdekat.',
    h1: '404 - Halaman Tidak Ditemukan',
    noindex: true
  }
};

export const INDEXED_PATHS = INDEXED_ROUTES;
export const ALL_PATHS = ALL_ROUTES;
