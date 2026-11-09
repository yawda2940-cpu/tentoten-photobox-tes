import { SITE_URL, LOCATIONS, LocationDetail } from './site.config';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TentoTen Photobox',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/aistudio/tentotenred_2ac7af73.svg`,
    sameAs: [
      'https://instagram.com/10to10.photobox',
      'https://tiktok.com/@tentoten'
    ]
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TentoTen Photobox',
    url: SITE_URL
  };
}

export function getLocalBusinessSchema(location: LocationDetail) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `TentoTen Photobox @ ${location.cafeName}`,
    url: `${SITE_URL}/location/${location.slug}`,
    parentOrganization: {
      '@type': 'Organization',
      name: 'TentoTen Photobox',
      url: SITE_URL
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.regency,
      addressRegion: 'Jawa Timur',
      addressCountry: 'ID'
    },
    openingHours: [location.openingHoursSchema],
    hasMap: location.googleMapsUrl
  };

  if (location.postalCode) {
    schema.address.postalCode = location.postalCode;
  }

  return schema;
}

export function getServicesSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Sesi Photobox',
      description: 'Sesi foto photobox analog di dalam kafe dengan 2 lembar hasil cetak fisik instan serta unduhan digital via QR code.',
      provider: {
        '@type': 'Organization',
        name: 'TentoTen Photobox',
        url: SITE_URL
      },
      offers: {
        '@type': 'Offer',
        price: '35000',
        priceCurrency: 'IDR'
      },
      areaServed: ['Madiun', 'Jombang', 'Ponorogo', 'Kertosono']
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Custom Frame',
      description: 'Layanan cetak frame foto khusus dengan file desain dari pelanggan sendiri.',
      provider: {
        '@type': 'Organization',
        name: 'TentoTen Photobox',
        url: SITE_URL
      },
      offers: {
        '@type': 'Offer',
        price: '60000',
        priceCurrency: 'IDR'
      },
      areaServed: ['Madiun', 'Jombang', 'Ponorogo', 'Kertosono']
    }
  ];
}

export function getProductServicesSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE_URL}/product#sesi-photobox`,
      name: 'Sesi Photobox TentoTen (Walk-In Kafe)',
      serviceType: 'Photobox Session',
      category: 'Photography Service',
      description:
        'Sesi foto photobox analog 35mm di dalam kafe dengan 2 lembar hasil cetak fisik foto strip 4 pose instan, pilihan 11 template frame retro dan aesthetic, serta unduhan digital softfile foto JPG dan video animasi GIF melalui pemindaian QR code. Tanpa booking dan bayar di lokasi.',
      provider: {
        '@type': 'Organization',
        name: 'TentoTen Photobox',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/aistudio/tentotenred_2ac7af73.svg`,
        sameAs: [
          'https://instagram.com/10to10.photobox',
          'https://tiktok.com/@tentoten'
        ]
      },
      offers: {
        '@type': 'Offer',
        '@id': `${SITE_URL}/product#offer-sesi-photobox`,
        name: 'Sesi Photobox 2 Lembar Cetak Fisik',
        price: '35000',
        priceCurrency: 'IDR',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/product#sesi-photobox`,
        validFrom: '2024-01-01',
        itemOffered: {
          '@type': 'Service',
          name: 'Sesi Foto Photobox Kafe Walk-In'
        }
      },
      serviceOutput:
        '2 lembar cetak fisik foto strip 4 pose gaya 35mm tebal dan softfile digital JPG/GIF via scan QR code',
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Kota Madiun' },
        { '@type': 'AdministrativeArea', name: 'Kabupaten Jombang' },
        { '@type': 'AdministrativeArea', name: 'Kabupaten Ponorogo' },
        { '@type': 'AdministrativeArea', name: 'Kabupaten Nganjuk' }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Katalog Template Frame Photobox TentoTen',
        itemListElement: [
          {
            '@type': 'Offer',
            position: 1,
            itemOffered: {
              '@type': 'Product',
              name: 'Roll of Memories 35mm',
              category: 'Vintage Film',
              description:
                'Frame seluloid film hitam klasik dengan lubang gerigi sprocket roll 35mm otentik dan penomoran frame film.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_3_0955a4a7.webp`
            }
          },
          {
            '@type': 'Offer',
            position: 2,
            itemOffered: {
              '@type': 'Product',
              name: 'Theater Ticket Vintage',
              category: 'Vintage Film',
              description:
                'Terinspirasi dari karcis masuk gedung bioskop jadul berwarna merah marun pekat dengan detail barcode otentik.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_2_6201babe.webp`
            }
          },
          {
            '@type': 'Offer',
            position: 3,
            itemOffered: {
              '@type': 'Product',
              name: 'Kachi! Say Cheese',
              category: 'Retro & Pop Art',
              description:
                'Frame ceria latar grid kuning hangat, stiker doodle awan bergelombang, bunga mekar, dan tipografi balon ceria.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_1_1381c22b.webp`
            }
          },
          {
            '@type': 'Offer',
            position: 4,
            itemOffered: {
              '@type': 'Product',
              name: 'Always Fresh Supermarket',
              category: 'Retro & Pop Art',
              description:
                'Desain pop art ala selebaran diskon supermarket retro dengan badge ALWAYS FRESH dan buah ceri manis.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_4_7860c18e.webp`
            }
          },
          {
            '@type': 'Offer',
            position: 5,
            itemOffered: {
              '@type': 'Product',
              name: 'Parajompo Obat Capek Hidup',
              category: 'Retro & Pop Art',
              description:
                'Desain parodi kemasan obat farmasi bernuansa biru royal bertuliskan 4 TABLET OBAT CAPEK HIDUP.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_10to10__1_12f04381.webp`
            }
          },
          {
            '@type': 'Offer',
            position: 6,
            itemOffered: {
              '@type': 'Product',
              name: 'Retro Blister Photo Pack',
              category: 'Retro & Pop Art',
              description:
                'Konsep kemasan koleksi mainan gantung die-cast retro berwarna merah berani PHOTO PACK.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_10to10__10_870e8037.webp`
            }
          },
          {
            '@type': 'Offer',
            position: 7,
            itemOffered: {
              '@type': 'Product',
              name: 'Digital Bliss Y2K',
              category: 'Y2K & Cute',
              description:
                'Nostalgia era 2000-an padang rumput hijau, pemutar kaset pita, Tamagotchi, dan MP3 player.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_5_c2a18b89.webp`
            }
          },
          {
            '@type': 'Offer',
            position: 8,
            itemOffered: {
              '@type': 'Product',
              name: 'Rating 10/10 Picnic Gingham',
              category: 'Y2K & Cute',
              description:
                'Pola taplak piknik kotak-kotak merah gingham dengan ilustrasi roti panggang mentega dan croissant renyah.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_6_b8fdd549.webp`
            }
          },
          {
            '@type': 'Offer',
            position: 9,
            itemOffered: {
              '@type': 'Product',
              name: 'Memoria Minimalist B&W',
              category: 'Aesthetic Editorial',
              description:
                'Kontras monokrom hitam pekat strip putih elegan tipografi kaligrafi kursif Memoria dan aksen bunga merah.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_7_ba3b9613.webp`
            }
          },
          {
            '@type': 'Offer',
            position: 10,
            itemOffered: {
              '@type': 'Product',
              name: 'Avenoir Editorial Cream',
              category: 'Aesthetic Editorial',
              description:
                'Desain editorial majalah modern krem lembut serif klasik Avenoir memories ahead of time.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_9_c0fd1bb8.webp`
            }
          },
          {
            '@type': 'Offer',
            position: 11,
            itemOffered: {
              '@type': 'Product',
              name: 'I Wish a Rose Pastel',
              category: 'Aesthetic Editorial',
              description:
                'Palet warna pink pastel bingkai oval metalik futuristik mawar mekar dan tipografi I wish a rose.',
              image: `${SITE_URL}/assets/aistudio/Copy_of_8_9587329d.webp`
            }
          }
        ]
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE_URL}/product#custom-frame`,
      name: 'Custom Frame TentoTen Photobox',
      serviceType: 'Custom Photo Frame Design & Integration',
      category: 'Personalized Printing & Photography Service',
      description:
        'Layanan pemasangan bingkai foto kustom menggunakan file desain buatan pelanggan sendiri yang disiapkan untuk sesi photobox pada mesin TentoTen di cabang kafe pilihan untuk kebutuhan ulang tahun, gathering komunitas, atau acara khusus.',
      provider: {
        '@type': 'Organization',
        name: 'TentoTen Photobox',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/aistudio/tentotenred_2ac7af73.svg`
      },
      offers: {
        '@type': 'Offer',
        '@id': `${SITE_URL}/product#offer-custom-frame`,
        name: 'Paket Pengaturan Custom Frame Desain Sendiri',
        price: '60000',
        priceCurrency: 'IDR',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/product#custom-frame`,
        validFrom: '2024-01-01'
      },
      serviceOutput:
        'Pemasangan file frame digital kustom pada perangkat bilik foto TentoTen cabang kafe yang dipilih',
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Kota Madiun' },
        { '@type': 'AdministrativeArea', name: 'Kabupaten Jombang' },
        { '@type': 'AdministrativeArea', name: 'Kabupaten Ponorogo' },
        { '@type': 'AdministrativeArea', name: 'Kabupaten Nganjuk' }
      ],
      termsOfService: `${SITE_URL}/kebijakan-privasi`
    }
  ];
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function getPageSchemas(path: string): object[] {
  const schemas: object[] = [getOrganizationSchema()];

  if (path === '/') {
    schemas.push(getWebSiteSchema());
    return schemas;
  }

  // Breadcrumbs
  if (path.startsWith('/location/')) {
    const slug = path.replace('/location/', '');
    const loc = LOCATIONS[slug];
    if (loc) {
      schemas.push(getLocalBusinessSchema(loc));
      schemas.push(
        getBreadcrumbSchema([
          { name: 'Beranda', url: SITE_URL },
          { name: 'Lokasi', url: `${SITE_URL}/location` },
          { name: loc.name, url: `${SITE_URL}/location/${loc.slug}` }
        ])
      );
    }
  } else if (path === '/location') {
    schemas.push(
      getBreadcrumbSchema([
        { name: 'Beranda', url: SITE_URL },
        { name: 'Lokasi', url: `${SITE_URL}/location` }
      ])
    );
  } else if (path === '/product') {
    // Note: The comprehensive service-specific schema for Photo Sessions & Custom Frame
    // is rendered directly inside ProductPage, ensuring presence both during SSG and client-side navigation.
    schemas.push(
      getBreadcrumbSchema([
        { name: 'Beranda', url: SITE_URL },
        { name: 'Produk & Harga', url: `${SITE_URL}/product` }
      ])
    );
  } else if (path === '/service') {
    schemas.push(...getServicesSchema());
    schemas.push(
      getBreadcrumbSchema([
        { name: 'Beranda', url: SITE_URL },
        { name: 'Layanan', url: `${SITE_URL}/service` }
      ])
    );
  } else if (path === '/kemitraan') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Kemitraan dan Pengadaan Photobox',
      description: 'Layanan penempatan photobox kemitraan bagi kafe dan pengadaan photobox mandiri untuk tempat usaha di Jawa Timur.',
      provider: {
        '@type': 'Organization',
        name: 'TentoTen Photobox',
        url: SITE_URL
      }
    });
    schemas.push(
      getBreadcrumbSchema([
        { name: 'Beranda', url: SITE_URL },
        { name: 'Kemitraan', url: `${SITE_URL}/kemitraan` }
      ])
    );
  } else if (path === '/contact') {
    schemas.push(
      getBreadcrumbSchema([
        { name: 'Beranda', url: SITE_URL },
        { name: 'Kontak', url: `${SITE_URL}/contact` }
      ])
    );
  } else if (path === '/kebijakan-privasi') {
    schemas.push(
      getBreadcrumbSchema([
        { name: 'Beranda', url: SITE_URL },
        { name: 'Kebijakan Privasi', url: `${SITE_URL}/kebijakan-privasi` }
      ])
    );
  }

  return schemas;
}
