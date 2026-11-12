import React from 'react';
import { LOCATIONS, LocationDetail } from '../site.config';
import { LatestArticles } from '../components/LatestArticles';
import type { AllowedLocationSlug } from '../data/posts.generated';

interface CityContent {
  headlineWhy: string;
  whyText: string[];
  scheduleAdvice: { title: string; desc: string }[];
  customFrameExamples: string;
  tips: { title: string; desc: string }[];
  scenarios: { title: string; desc: string }[];
  practicalAdvice: string[];
  faqs: { q: string; a: string }[];
}

const CITY_CONTENTS: Record<string, CityContent> = {
  madiun: {
    headlineWhy: 'Kenapa foto di photobox Madiun',
    whyText: [
      'Madiun sering disebut Kota Gadis, dan Kota Madiun punya banyak tempat nongkrong yang ramai oleh anak muda, mahasiswa, dan keluarga. Photobox di kafe cocok untuk suasana seperti itu. Kamu tidak perlu mengatur acara khusus. Kamu sudah akan nongkrong, dan foto menjadi bagian kecil dari hari itu.',
      'Sthana Coffee berjam buka panjang, dari pagi sampai tengah malam (08.00 - 24.00 WIB). Artinya kamu punya banyak pilihan waktu: datang pagi untuk suasana lebih tenang, datang sore untuk bertemu teman sepulang aktivitas, atau datang malam untuk menutup hari dengan foto bareng.'
    ],
    scheduleAdvice: [
      { title: 'Pagi, sekitar jam buka 08.00', desc: 'Suasana biasanya lebih lega. Cocok kalau kamu ingin foto tanpa terburu-buru.' },
      { title: 'Siang sampai sore', desc: 'Cocok untuk janjian santai bersama teman atau rekan kerja.' },
      { title: 'Malam, mendekati 24.00', desc: 'Cocok untuk menutup hari. Sebaiknya jangan terlalu dekat jam tutup agar sesi tidak terburu-buru.' }
    ],
    customFrameExamples: 'Contoh pemakaian: ulang tahun teman yang dirayakan di kafe, reuni kecil, arisan, atau gathering komunitas di Kota Madiun.',
    tips: [
      { title: 'Ajak satu atau dua orang', desc: 'Pose jadi lebih mudah dan ekspresi lebih natural.' },
      { title: 'Siapkan ide pose', desc: 'Misalnya satu pose tenang, satu pose lucu, satu pose bergaya, dan satu pose bebas.' },
      { title: 'Bawa properti kecil', desc: 'Kacamata, topi, atau minuman dari kafe bisa membuat hasil lebih berkarakter.' },
      { title: 'Pesan minuman dulu', desc: 'Kamu sedang berada di kafe, jadi nikmati dulu suasananya sebelum masuk photobox.' },
      { title: 'Santai saja', desc: 'Hasil terbaik biasanya muncul saat kamu tertawa, bukan saat berpose kaku.' }
    ],
    scenarios: [
      { title: 'Sepulang kerja atau kuliah', desc: 'Karena kafe buka sampai 24.00, kamu tidak perlu terburu-buru. Mampir, pesan minuman, ngobrol dengan teman, lalu tutup dengan sesi foto.' },
      { title: 'Bersama keluarga', desc: 'Photobox bisa dipakai berdua, bertiga, atau lebih. Ajak anggota keluarga bergantian kalau tidak muat dalam satu sesi, lalu kumpulkan hasil cetaknya.' },
      { title: 'Bersama pasangan', desc: 'Pilih waktu yang tidak terburu-buru, misalnya sore menjelang malam. Tidak ada aturan pose, nikmati momen berdua.' },
      { title: 'Bersama komunitas atau teman kampus', desc: 'Kalau kalian berencana datang ramai-ramai, kabari admin via WhatsApp atau gunakan custom frame untuk menandai acara kalian.' },
      { title: 'Sendirian', desc: 'Foto sendiri sama sahnya dengan foto berkelompok. Banyak orang memakai photobox untuk mengabadikan momen kecil.' }
    ],
    practicalAdvice: [
      'Simpan alamat lengkap supaya mudah dibagikan ke teman.',
      'Bawa dompet untuk pembayaran QRIS di mesin dan ponsel untuk navigasi.',
      'Untuk pembayaran atau jam buka di hari libur khusus, konfirmasi ke admin via WhatsApp.'
    ],
    faqs: [
      { q: 'Di mana photobox TentoTen di Madiun?', a: 'Di Sthana Coffee, Jl. Setiaki No. 27, Kota Madiun.' },
      { q: 'Jam berapa photobox Madiun buka?', a: 'Mengikuti jam buka kafe, yaitu 08.00 sampai 24.00 WIB setiap hari.' },
      { q: 'Berapa harga photobox di Madiun?', a: 'Rp35.000 per sesi (2 lembar cetak fisik + softfile). Custom frame Rp60.000.' },
      { q: 'Apakah harus booking?', a: 'Tidak. Photobox TentoTen walk-in, dibayar di lokasi.' },
      { q: 'Bagaimana cara memesan custom frame di Madiun?', a: 'Hubungi admin lewat WhatsApp, kirim file desain di chat, lalu admin mengatur frame agar aktif di mesin Sthana Coffee.' },
      { q: 'Bisakah saya datang sendirian?', a: 'Bisa. Banyak orang suka foto sendiri di photobox.' }
    ]
  },
  jombang: {
    headlineWhy: 'Kenapa foto di photobox Jombang',
    whyText: [
      'Jombang dikenal sebagai Kota Santri, dengan suasana yang hangat dan banyak aktivitas komunitas. Kamu bisa merasakan kebiasaan itu juga di tempat nongkrong: orang datang berkelompok, ngobrol lama, dan merayakan hal kecil. Photobox di kafe cocok untuk kebiasaan semacam itu. Foto menjadi bagian dari pertemuan, bukan acara tersendiri.',
      'Ethereal Coffee berjam buka dari pagi sampai pukul 23.00, sehingga kamu punya waktu yang lebar untuk memilih kapan datang. Bagi yang tinggal di Kabupaten Jombang, ini cabang TentoTen terdekat. Kamu tidak perlu menempuh perjalanan ke kota lain hanya untuk mencoba photobox.'
    ],
    scheduleAdvice: [
      { title: 'Pagi sampai siang', desc: 'Kafe buka pukul 08.00. Cocok untuk kamu yang suka suasana lebih santai.' },
      { title: 'Sore', desc: 'Waktu yang pas untuk bertemu teman setelah kuliah atau kerja.' },
      { title: 'Malam sebelum 23.00', desc: 'Cocok untuk mampir setelah acara lain. Rencanakan kedatanganmu agar tidak mepet jam tutup.' }
    ],
    customFrameExamples: 'Cocok untuk ulang tahun, syukuran kecil, acara kelas, reuni, atau kegiatan organisasi di Jombang.',
    tips: [
      { title: 'Datang berkelompok kecil', desc: 'Dua sampai tiga orang biasanya paling nyaman di dalam booth.' },
      { title: 'Rencanakan variasi gaya', desc: 'Satu pose santai, satu pose lucu, satu pose serius, dan satu pose bebas.' },
      { title: 'Gunakan properti sederhana', desc: 'Kacamata, topi, atau cangkir dari kafe bisa jadi pelengkap alami.' },
      { title: 'Foto setelah minuman datang', desc: 'Kamu lebih rileks dan ada properti alami di tanganmu.' },
      { title: 'Jangan terlalu memikirkan hasil', desc: 'Tertawa saat berfoto biasanya menghasilkan foto yang paling enak dilihat.' }
    ],
    scenarios: [
      { title: 'Datang dari luar Jombang', desc: 'Banyak pengunjung datang dari kecamatan sekitar atau kabupaten tetangga. Gunakan alamat lengkap Jl. Kusuma Bangsa No. 23 Pulo Lor di Google Maps dan gabungkan dengan agenda ngopi santai.' },
      { title: 'Acara komunitas atau sekolah', desc: 'Untuk acara yang direncanakan jauh hari, siapkan custom frame H-3 via WhatsApp agar hasil cetak membawa identitas acaramu.' },
      { title: 'Etika bersama di kafe', desc: 'Tunggu giliran dengan tertib bila sedang ramai, rapikan properti yang dibawa, dan jaga kenyamanan area nongkrong.' }
    ],
    practicalAdvice: [
      'Gunakan alamat lengkap: Jl. Kusuma Bangsa No. 23, Pulo Lor, Jombang.',
      'Ethereal Coffee tutup pukul 23.00, sisakan waktu cukup agar sesi fotomu tidak terburu-buru.',
      'Pembayaran dilakukan di lokasi menggunakan sensor QRIS.'
    ],
    faqs: [
      { q: 'Di mana photobox TentoTen di Jombang?', a: 'Di Ethereal Coffee, Jl. Kusuma Bangsa No. 23, Pulo Lor, Kec. Jombang.' },
      { q: 'Jam berapa buka?', a: 'Mengikuti jam kafe, yaitu 08.00 sampai 23.00 WIB setiap hari.' },
      { q: 'Berapa harganya?', a: 'Rp35.000 per sesi photobox standar. Custom frame Rp60.000.' },
      { q: 'Apakah perlu reservasi?', a: 'Tidak. Photobox TentoTen walk-in.' },
      { q: 'Bagaimana memesan custom frame?', a: 'Hubungi admin via WhatsApp, kirim file desain di chat, lalu admin mengatur frame di mesin Ethereal Coffee.' },
      { q: 'Apakah pembayaran bisa di tempat?', a: 'Ya, pembayaran langsung di lokasi lewat QRIS di mesin.' }
    ]
  },
  ponorogo: {
    headlineWhy: 'Kenapa foto di photobox Ponorogo',
    whyText: [
      'Ponorogo dikenal dengan kesenian Reog, dan masyarakatnya punya kebanggaan kuat pada budaya lokal. Photobox bisa menjadi cara baru untuk menyimpan kenangan di kota yang akrab dengan tradisi. Kamu bisa foto bersama keluarga setelah menonton acara budaya, atau bersama teman setelah kegiatan kampus, lalu membawa pulang hasil cetaknya.',
      'Komahaus Coffee membuka pintu paling pagi di antara cabang TentoTen, yaitu pukul 07.00 sampai 00.00 WIB (17 jam). Itu berarti kamu bisa mampir sarapan, ngopi sebelum aktivitas, atau memulai akhir pekan dengan foto bareng, hingga larut malam.'
    ],
    scheduleAdvice: [
      { title: '07.00 sampai 10.00', desc: 'Suasana pagi yang tenang. Cocok kalau kamu ingin menikmati kafe sebelum aktivitas padat.' },
      { title: '10.00 sampai 16.00', desc: 'Waktu santai untuk janjian siang bersama teman atau kerabat.' },
      { title: '16.00 sampai 21.00', desc: 'Waktu pulang kerja atau kuliah. Cocok untuk bertemu dan ngobrol panjang.' },
      { title: '21.00 sampai 00.00', desc: 'Cocok untuk kamu yang baru bisa keluar larut malam.' }
    ],
    customFrameExamples: 'Cocok untuk ulang tahun, wisuda kecil, kegiatan komunitas, acara sanggar atau organisasi budaya, dan reuni di Ponorogo.',
    tips: [
      { title: 'Mulai dengan pose sederhana', desc: 'Pose pertama biasanya masih adaptasi, rileks saja mengikuti timer.' },
      { title: 'Ajak teman yang suka tertawa', desc: 'Ekspresi spontan sering menghasilkan foto paling hidup.' },
      { title: 'Bawa sesuatu yang bermakna', desc: 'Boneka kecil, syal komunitas, atau aksesori favorit bisa membuat foto lebih personal.' },
      { title: 'Pikirkan hasil cetak', desc: 'Kamu akan memegang 2 lembar fisiknya, pilih pose yang ingin kamu lihat lagi bertahun-tahun kemudian.' }
    ],
    scenarios: [
      { title: 'Sarapan dan ngopi pagi', desc: 'Karena kafe buka pukul 07.00, kamu bisa memulai hari di sana dengan ritme tenang.' },
      { title: 'Janjian sepulang kegiatan', desc: 'Pilih sore menjelang malam. Pesan minuman, ngobrol dulu, lalu foto saat suasana sudah cair.' },
      { title: 'Perayaan kecil malam hari', desc: 'Buka sampai pukul 00.00, memberi ruang merayakan ulang tahun atau kabar baik tanpa mengejar jam tutup.' }
    ],
    practicalAdvice: [
      'Alamat: Jl. Semeru No. 52, Kelurahan Nologaten, Ponorogo.',
      'Simpan hasil cetak di tempat rata dan kering (dompet, jurnal, atau amplop) agar tidak kusut.',
      'Untuk custom frame Rp60.000, selesaikan urusan file dengan admin via WhatsApp sebelum hari kunjungan.'
    ],
    faqs: [
      { q: 'Di mana photobox TentoTen di Ponorogo?', a: 'Di Komahaus Coffee, Jl. Semeru No. 52, Nologaten, Kec. Ponorogo.' },
      { q: 'Jam berapa buka?', a: 'Mengikuti jam kafe, yaitu 07.00 sampai 00.00 WIB setiap hari.' },
      { q: 'Berapa harga photobox di Ponorogo?', a: 'Rp35.000 per sesi. Custom frame Rp60.000.' },
      { q: 'Apakah harus booking?', a: 'Tidak. Photobox TentoTen walk-in.' },
      { q: 'Bagaimana cara memesan custom frame?', a: 'Hubungi admin lewat WhatsApp, kirim file desain di chat, lalu admin men-setting frame di Komahaus.' },
      { q: 'Apakah bisa foto sendirian?', a: 'Bisa. Photobox bisa dipakai satu orang atau lebih.' }
    ]
  },
  kertosono: {
    headlineWhy: 'Kenapa foto di photobox Kertosono',
    whyText: [
      'Kertosono berada di wilayah Kabupaten Nganjuk dan dikenal sebagai salah satu titik yang ramai dilalui orang yang bepergian antarkota di Jawa Timur. Orang datang dari berbagai tempat, sehingga kafe di kota ini sering menjadi titik temu. Photobox di Keyf Coffee mengisi peran itu dengan cara sederhana: setelah bertemu dan ngobrol, kalian punya hasil cetak untuk dibawa pulang.',
      'Kalau kamu tinggal di Nganjuk dan sekitarnya, Kertosono adalah cabang TentoTen yang paling dekat untukmu. Kamu tidak perlu pergi jauh ke kota lain untuk mencoba photobox berkualitas analog 35mm.'
    ],
    scheduleAdvice: [
      { title: 'Siang, 10.00 sampai 15.00', desc: 'Cocok untuk janjian santai. Kafe baru buka, sehingga suasana masih lega.' },
      { title: 'Sore, 15.00 sampai 19.00', desc: 'Waktu yang pas setelah pulang kerja atau sekolah.' },
      { title: 'Malam, 19.00 sampai 22.00', desc: 'Datanglah sebelum mendekati jam tutup 22.00 supaya sesi fotomu tidak terburu-buru.' }
    ],
    customFrameExamples: 'Cocok untuk ulang tahun, kumpul komunitas, acara kantor kecil, atau reuni antarkota di Kertosono Nganjuk.',
    tips: [
      { title: 'Datang bersama teman', desc: 'Pose lebih mudah dan ekspresi lebih santai.' },
      { title: 'Siapkan tiga atau empat gaya', desc: 'Misalnya tenang, lucu, bergaya, dan bebas.' },
      { title: 'Bawa properti ringan', desc: 'Kacamata, topi, atau minuman segar dari Keyf Coffee.' },
      { title: 'Pesan minuman lebih dulu', desc: 'Kamu lebih rileks dan ada waktu santai menunggu bila bilik sedang dipakai.' },
      { title: 'Foto dengan tertawa', desc: 'Hasil terbaik biasanya muncul dari ekspresi spontan dan tawa lepas.' }
    ],
    scenarios: [
      { title: 'Titik temu antarkota', desc: 'Kalau kamu dan temanmu datang dari kota berbeda, sepakati Keyf Coffee sebagai tempat bertemu lalu tutup pertemuan dengan sesi foto.' },
      { title: 'Ngopi siang santai', desc: 'Datang setelah jam 10.00 agar suasana masih lega dan nyaman.' },
      { title: 'Navigasi ke lokasi gang', desc: 'Alamat berada di Jl. Apel Gg. I Pelem Kutorejo, gunakan Google Maps agar langsung terarah ke gang yang benar.' }
    ],
    practicalAdvice: [
      'Alamat: Jl. Apel Gg. I, Pelem, Kutorejo, Kec. Kertosono, Kab. Nganjuk 64314.',
      'Buka mulai pukul 10.00 sampai 22.00 WIB.',
      'Hasil cetak sebaiknya disimpan di tempat yang rata dan kering agar tidak melipat.'
    ],
    faqs: [
      { q: 'Di mana photobox TentoTen di Kertosono?', a: 'Di Keyf Coffee, Jl. Apel Gg. I, Pelem, Kutorejo, Kec. Kertosono, Kab. Nganjuk.' },
      { q: 'Jam berapa buka?', a: 'Mengikuti jam kafe, yaitu 10.00 sampai 22.00 WIB setiap hari.' },
      { q: 'Berapa harga photobox di Kertosono?', a: 'Rp35.000 per sesi. Custom frame Rp60.000.' },
      { q: 'Apakah photobox ini juga melayani warga Nganjuk?', a: 'Bisa. Kertosono termasuk wilayah Kabupaten Nganjuk dan siapa pun boleh datang.' },
      { q: 'Apakah harus booking?', a: 'Tidak. Photobox TentoTen walk-in.' },
      { q: 'Bagaimana cara memesan custom frame?', a: 'Hubungi admin lewat WhatsApp, kirim file desain di chat, lalu admin mengatur frame di mesin Keyf Coffee.' }
    ]
  }
};

interface LocationDetailPageProps {
  slug: string;
}

export const LocationDetailPage: React.FC<LocationDetailPageProps> = ({ slug }) => {
  const location: LocationDetail = LOCATIONS[slug] || LOCATIONS.madiun;
  const content = CITY_CONTENTS[slug] || CITY_CONTENTS.madiun;
  const otherLocations = Object.values(LOCATIONS).filter((l) => l.slug !== location.slug);

  return (
    <div className="flex flex-col w-full pt-20">
      {/* 1. Header & Visible Breadcrumb */}
      <section className="w-full bg-[#fff8f0] py-10 md:py-16 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5c403d]">
              <li>
                <a href="/" className="hover:text-[#960011] transition-colors">
                  Beranda
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="/location" className="hover:text-[#960011] transition-colors">
                  Lokasi
                </a>
              </li>
              <li>/</li>
              <li className="text-[#960011] font-bold" aria-current="page">
                {location.name}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] text-xs font-bold tracking-widest uppercase mb-3">
              CABANG RESMI {location.regency.toUpperCase()}
            </div>
            {/* EXACT SINGLE H1 */}
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1f1b11] font-black tracking-tight leading-tight">
              {location.h1}
            </h1>
            <p className="font-body-lg text-base md:text-lg text-[#5c403d] mt-4 leading-relaxed">
              {location.introText}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Detail Informasi Booth (Alamat, Jam, Harga, Peta Embed) */}
      <section className="w-full bg-[#fcf3e2] py-12 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Informasi Teks (7 Kolom) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[6px_6px_0px_#1f1b11]">
                <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-4">
                  Alamat dan jam buka photobox {location.name}
                </h2>

                <div className="space-y-3 font-body-sm text-xs text-[#1f1b11]">
                  <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5c403d] block font-bold">
                      KAFE & ALAMAT LENGKAP:
                    </span>
                    <p className="font-bold text-sm text-[#1f1b11] mt-1">
                      {location.cafeName}
                    </p>
                    <p className="text-[#5c403d] mt-0.5">
                      {location.address}
                    </p>
                    {location.directions && (
                      <p className="text-[#960011] mt-1 text-[11px] font-medium">
                        Patokan: {location.directions}
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#5c403d] block font-bold">
                        JAM BUKA BOOTH:
                      </span>
                      <p className="font-bold text-sm text-[#1f1b11] mt-0.5">
                        {location.hours} WIB (Setiap Hari)
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-[#960011]">
                      schedule
                    </span>
                  </div>

                  <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#5c403d] block font-bold">
                        HARGA:
                      </span>
                      <p className="font-bold text-sm text-[#960011] mt-0.5 font-mono">
                        Rp35.000 per sesi &bull; Custom frame Rp60.000
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-[#960011]">
                      payments
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#1f1b11]/15 flex flex-wrap gap-4">
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="google-maps"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl border border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] font-bold"
                  >
                    <span className="material-symbols-outlined text-base">directions</span>
                    <span>Buka di Google Maps</span>
                  </a>

                  <a
                    href={`https://wa.me/6281330148068?text=Halo%20TentoTen%20Photobox,%20saya%20mau%20tanya%20status%20booth%20di%20${encodeURIComponent(location.cafeName)}%20${location.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="whatsapp"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#fff8f0] hover:bg-[#eae2d1] text-[#1f1b11] font-label-board text-xs uppercase tracking-wider rounded-xl border border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] font-bold"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Tanya Admin via WA</span>
                  </a>
                </div>
              </div>

              {/* Cara Menuju Kafe */}
              <div className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 shadow-[4px_4px_0px_#1f1b11]">
                <h3 className="font-headline-sm text-lg text-[#1f1b11] font-black mb-2">
                  Cara menuju {location.cafeName}
                </h3>
                <p className="text-xs text-[#5c403d] leading-relaxed">
                  Tombol &quot;Buka di Google Maps&quot; di atas membawamu langsung ke lokasi. Cara paling mudah adalah membukanya dari ponsel, lalu menyalakan navigasi dari posisimu sekarang. Simpan alamat lengkap supaya mudah dibagikan ke teman. Kalau kamu datang berkelompok, tentukan titik temu sebelum masuk.
                </p>
              </div>
            </div>

            {/* Kolom Peta Embed (5 Kolom) */}
            <div className="lg:col-span-5">
              <div className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-4 sm:p-5 shadow-[6px_6px_0px_#1f1b11]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#5c403d] block font-bold mb-2">
                  PETA LOKASI {location.cafeName.toUpperCase()}
                </span>
                <div className="rounded-2xl overflow-hidden border border-[#1f1b11] bg-neutral-100">
                  <iframe
                    src={location.embedMapUrl}
                    title={`Peta Lokasi ${location.cafeName} ${location.name}`}
                    width="100%"
                    height="320"
                    loading="lazy"
                    className="w-full h-80 border-0"
                    allowFullScreen={false}
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="font-body-sm text-[11px] text-[#5c403d] mt-3">
                  Photobox bisa dipakai selama kafe buka. Kalau kamu berencana datang di hari libur atau acara khusus, pastikan dulu lewat WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Kenapa Foto di Kota Ini & Cara Memakai */}
      <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-[#fcf3e2] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                {content.headlineWhy}
              </h2>
              <div className="text-xs sm:text-sm text-[#5c403d] space-y-3 leading-relaxed">
                {content.whyText.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="bg-[#fcf3e2] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Cara memakai photobox di {location.name}
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-[#5c403d] leading-relaxed">
                <li>
                  <strong className="text-[#1f1b11] block">Langkah 1: datang ke {location.cafeName}.</strong>
                  Tidak perlu booking. Photobox walk-in, jadi cukup datang saat kafe buka.
                </li>
                <li>
                  <strong className="text-[#1f1b11] block">Langkah 2: foto di photobox.</strong>
                  Masuk bersama temanmu, pilih frame yang tersedia, lalu mulai berfoto. Bayar Rp35.000 di lokasi.
                </li>
                <li>
                  <strong className="text-[#1f1b11] block">Langkah 3: ambil hasilnya.</strong>
                  Hasil cetak langsung jadi dan bisa kamu bawa pulang.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Waktu yang Enak / Cocok untuk Datang & Custom Frame */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-[#fff8f0] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Waktu yang cocok untuk datang
              </h2>
              <div className="space-y-3">
                {content.scheduleAdvice.map((sch, i) => (
                  <div key={i} className="p-3 bg-[#f6eddc] rounded-xl border border-[#1f1b11]/15">
                    <strong className="text-xs text-[#1f1b11] block">{sch.title}</strong>
                    <p className="text-xs text-[#5c403d] mt-0.5">{sch.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#fff8f0] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Custom Frame di {location.name}
              </h2>
              <div className="text-xs text-[#5c403d] space-y-3 leading-relaxed">
                <p>
                  Kalau kamu ingin hasil foto dengan desain sendiri, pakai custom frame. Biayanya Rp60.000 dan terpisah dari harga sesi. Kamu menyiapkan file desain, mengirimkannya ke admin lewat WhatsApp, lalu admin men-setting frame agar siap dipakai di {location.name}.
                </p>
                <p>
                  Saat mengisi form di halaman <a href="/product" className="text-[#960011] font-bold underline">Product</a>, pilih cabang {location.name}.
                </p>
                <p className="p-3 bg-[#ffdad6]/50 rounded-xl border border-[#960011]/20 text-[#1f1b11]">
                  {content.customFrameExamples}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Galeri Foto Lokasi */}
      {location.images && location.images.length > 0 && (
        <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
          <div className="max-w-[1240px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                GALERI FOTO LOKASI
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
                Suasana Photobox di {location.cafeName}
              </h2>
              <p className="font-body-md text-sm text-[#5c403d] mt-2">
                Dokumentasi bilik foto dan area santai kafe di {location.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {location.images.map((img, idx) => (
                <div
                  key={idx}
                  className="bg-[#f6eddc] rounded-2xl border-2 border-[#1f1b11] overflow-hidden shadow-[4px_4px_0px_#1f1b11]"
                >
                  <picture>
                    <source type="image/webp" srcSet={img.webpUrl || `${img.url}=rw`} />
                    <img
                      src={img.url}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      fetchPriority={idx === 0 ? 'high' : 'low'}
                      decoding="async"
                      className="w-full h-64 object-cover"
                    />
                  </picture>
                  <div className="p-4">
                    <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold">
                      {img.title}
                    </h3>
                    <p className="font-body-sm text-xs text-[#5c403d] mt-1">
                      {img.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Tips Foto & Rencana Kunjungan */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-[#fff8f0] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Tips foto di photobox untuk pertama kali
              </h2>
              <div className="space-y-2.5 text-xs text-[#5c403d]">
                {content.tips.map((t, i) => (
                  <p key={i}>
                    <strong className="text-[#1f1b11]">{t.title}:</strong> {t.desc}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-[#fff8f0] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Rencana kunjungan sesuai situasimu
              </h2>
              <div className="space-y-2.5 text-xs text-[#5c403d]">
                {content.scenarios.map((sc, i) => (
                  <p key={i}>
                    <strong className="text-[#1f1b11]">{sc.title}:</strong> {sc.desc}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Kota Ini */}
      <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[840px] mx-auto space-y-8">
          <div>
            <div className="text-center mb-8">
              <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                TANYA JAWAB
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
                Pertanyaan tentang photobox {location.name}
              </h2>
            </div>

            <div className="space-y-4">
              {content.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-[#fcf3e2] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer"
                >
                  <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                  </summary>
                  <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Info Kemitraan Lokal */}
          <div className="p-6 rounded-2xl bg-[#fcf3e2] border-2 border-[#1f1b11] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-headline-sm text-base text-[#1f1b11] font-bold">
                Punya kafe di sekitar {location.name}?
              </h3>
              <p className="text-xs text-[#5c403d] mt-1">
                Kalau kamu pemilik kafe atau tempat usaha dan ingin menghadirkan photobox, lihat halaman kemitraan.
              </p>
            </div>
            <a
              href="/kemitraan"
              className="whitespace-nowrap px-5 py-2.5 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl font-bold shadow-[2px_2px_0px_#1f1b11]"
            >
              Kemitraan Photobox
            </a>
          </div>
        </div>
      </section>

      {/* 7B. Artikel Terbaru untuk Lokasi Ini */}
      <LatestArticles
        location={location.slug as AllowedLocationSlug}
        count={2}
        bgClass="bg-[#fcf3e2]"
      />

      {/* 8. Tautan ke 3 Lokasi Lainnya */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              BANDINGKAN DENGAN CABANG LAIN
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
              Kunjungi Cabang Photobox di Kota Lain
            </h2>
            <p className="font-body-md text-sm text-[#5c403d] mt-2">
              Photobox TentoTen juga ada di kota-kota lain dengan harga seragam Rp35.000 per sesi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {otherLocations.map((other) => (
              <article
                key={other.slug}
                className="bg-[#fff8f0] rounded-2xl border-2 border-[#1f1b11] p-5 shadow-[4px_4px_0px_#1f1b11] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#ffdad6] text-[#960011] font-bold inline-block mb-2">
                    {other.regency.toUpperCase()}
                  </span>
                  <h3 className="font-headline-md text-xl text-[#1f1b11] font-bold">
                    {other.cafeName}
                  </h3>
                  <p className="font-body-sm text-xs text-[#5c403d] mt-1 leading-relaxed">
                    Jam buka {other.hours} WIB.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#1f1b11]/15">
                  <a
                    href={`/location/${other.slug}`}
                    className="font-label-board text-xs uppercase tracking-wider text-[#960011] hover:text-[#c0111e] font-bold inline-flex items-center gap-1.5"
                  >
                    <span>Photobox di {other.name}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
