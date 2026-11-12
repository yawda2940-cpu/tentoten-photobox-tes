import React, { useState } from 'react';
import { getProductServicesSchema } from '../seo.schema';
import { LatestArticles } from '../components/LatestArticles';

interface FrameTemplate {
  id: string;
  name: string;
  category: 'vintage' | 'pop' | 'y2k' | 'aesthetic';
  categoryLabel: string;
  badge: string;
  image: string;
  description: string;
  cutoutInfo: string;
  vibe: string;
}

const FRAME_TEMPLATES: FrameTemplate[] = [
  {
    id: 'roll-of-memories',
    name: 'Roll of Memories 35mm',
    category: 'vintage',
    categoryLabel: 'Vintage Film',
    badge: '35mm Analog Roll',
    image: '/assets/aistudio/frame-custom-03.png',
    description:
      'Frame seluloid film hitam klasik dengan lubang gerigi sprocket roll 35mm otentik, penomoran frame film 3A dan 4, serta tipografi retro TentoTen. Memberikan sentuhan nostalgia kamera analog yang timeless.',
    cutoutInfo: '4 jendela foto vertikal 35mm per strip',
    vibe: 'Cocok untuk pose bergaya vintage, tone monokrom, dan foto nostalgia bersama pasangan.'
  },
  {
    id: 'theater-ticket',
    name: 'Theater Ticket Vintage',
    category: 'vintage',
    categoryLabel: 'Vintage Film',
    badge: 'Tiket Bioskop Retro',
    image: '/assets/aistudio/frame-custom-02.png',
    description:
      'Terinspirasi dari karcis masuk gedung bioskop jadul berwarna merah marun pekat. Lengkap dengan detail nomor kursi "Seat no. 12 Row 3", barcode otentik, dan frame foto rounded bertingkat layaknya potongan film bioskop.',
    cutoutInfo: '4 frame foto horizontal berurutan dengan ornamen tiket',
    vibe: 'Pilihan favorit untuk mengabadikan momen date night, nonton bareng kawan, atau perayaan anniversary.'
  },
  {
    id: 'kachi-say-cheese',
    name: 'Kachi! Say Cheese',
    category: 'pop',
    categoryLabel: 'Retro & Pop Art',
    badge: 'Pop Art Doodle',
    image: '/assets/aistudio/frame-custom-01.png',
    description:
      'Frame ceria dengan latar grid kuning hangat, stiker doodle awan bergelombang warna-warni, kelopak bunga mekar, dan tipografi balon ceria "Kachi! Say Cheese". Penuh energi positif dan warna ceria.',
    cutoutInfo: '4 jendela awan bergelombang warna-warni per strip',
    vibe: 'Sangat pas untuk foto bersama geng sahabat dengan pose ekspresif, ceria, dan penuh senyum.'
  },
  {
    id: 'always-fresh',
    name: 'Always Fresh Supermarket',
    category: 'pop',
    categoryLabel: 'Retro & Pop Art',
    badge: 'Diskon Pop Art',
    image: '/assets/aistudio/frame-custom-04.png',
    description:
      'Desain pop art ala selebaran diskon supermarket retro dengan warna biru cerah, badge ledakan "ALWAYS FRESH", label harga "$24 / $7.49", ilustrasi buah ceri manis, dan stempel jaminan kesegaran.',
    cutoutInfo: '4 jendela foto bernuansa banner promo toko kelontong',
    vibe: 'Ideal untuk pose santai, gaya kasual seru, dan potret seru-seruan tanpa jaim.'
  },
  {
    id: 'parajompo',
    name: 'Parajompo Obat Capek Hidup',
    category: 'pop',
    categoryLabel: 'Retro & Pop Art',
    badge: 'Parodi Resep Obat',
    image: '/assets/aistudio/frame-10to10-01.png',
    description:
      'Desain parodi kemasan obat farmasi bernuansa biru royal bertuliskan "Parajompo: 4 TABLET OBAT CAPEK HIDUP". Dilengkapi tabel takaran dosis tawa, komposisi kebahagiaan, dan indikasi penghilang penat rutinitas kerja atau kuliah.',
    cutoutInfo: '4 jendela pose berbingkai strip obat parodi',
    vibe: 'Pilihan paling viral dan humoris untuk foto pelepas penat bareng teman kuliah atau rekan kerja.'
  },
  {
    id: 'retro-blister-pack',
    name: 'Retro Blister Photo Pack',
    category: 'pop',
    categoryLabel: 'Retro & Pop Art',
    badge: 'Vintage Toy Pack',
    image: '/assets/aistudio/frame-10to10-10.png',
    description:
      'Konsep kemasan koleksi mainan gantung die-cast retro berwarna merah berani dengan tulisan "PHOTO PACK: FOR THE DAYS WE WANT TO REMEMBER", lubang gantungan blister pack atas, dan stempel collector edition.',
    cutoutInfo: '4 bingkai foto koleksi kartu mainan retro',
    vibe: 'Keren untuk gaya street style, streetwear outfit, dan potret estetik bernuansa urban.'
  },
  {
    id: 'digital-bliss',
    name: 'Digital Bliss Y2K',
    category: 'y2k',
    categoryLabel: 'Y2K & Cute',
    badge: 'Y2K Nostalgia',
    image: '/assets/aistudio/frame-custom-05.png',
    description:
      'Nuansa nostalgia awal era 2000-an dengan hamparan padang rumput hijau cerah, langit biru berawan tipis, pemutar kaset pita retro, konsol Tamagotchi virtual pet, dan pemutar musik MP3 player.',
    cutoutInfo: '4 jendela foto bertema antarmuka gadget Y2K',
    vibe: 'Paling pas untuk pecinta estetika Y2K, cyber-fairy, dan nostalgia gadget tahun 2000-an.'
  },
  {
    id: 'picnic-gingham',
    name: 'Rating 10/10 Picnic Gingham',
    category: 'y2k',
    categoryLabel: 'Y2K & Cute',
    badge: 'Picnic Checkers',
    image: '/assets/aistudio/frame-custom-06.png',
    description:
      'Pola taplak piknik kotak-kotak merah gingham dengan hiasan ilustrasi roti panggang mentega lumer, croissant renyah, dan stempel apresiasi "Rating 10/10". Memberikan rasa hangat, manis, dan akrab.',
    cutoutInfo: '4 jendela foto bergaris tepi merah hangat',
    vibe: 'Sempurna untuk foto santai saat nongkrong ngopi di kafe sambil menikmati pastry favorit.'
  },
  {
    id: 'memoria-bw',
    name: 'Memoria Minimalist B&W',
    category: 'aesthetic',
    categoryLabel: 'Aesthetic Editorial',
    badge: 'Editorial Monokrom',
    image: '/assets/aistudio/frame-custom-07.png',
    description:
      'Kombinasi kontras monokrom hitam pekat dengan strip putih elegan, tipografi kaligrafi kursif "Memoria", dan aksen bunga merah TentoTen. Menghadirkan kesan chic, timeless, dan berkelas tinggi.',
    cutoutInfo: '4 pose berjarak rapi dengan layout dual-tone tegas',
    vibe: 'Sangat cocok untuk gaya minimalis, potret busana monokrom, dan foto berdua yang anggun.'
  },
  {
    id: 'avenoir-editorial',
    name: 'Avenoir Editorial Cream',
    category: 'aesthetic',
    categoryLabel: 'Aesthetic Editorial',
    badge: 'Modern Lookbook',
    image: '/assets/aistudio/frame-custom-09.png',
    description:
      'Desain editorial majalah modern berwarna krem lembut dengan tipografi serif klasik "Avenoir. memories ahead of time", tata letak grid minimalis, dan barcode penanda tanggal memori.',
    cutoutInfo: '4 kotak foto presisi gaya lookbook majalah',
    vibe: 'Pilihan utama bagi pencinta gaya Korean aesthetic, earth tone, dan potret clean tanpa banyak elemen.'
  },
  {
    id: 'i-wish-a-rose',
    name: 'I Wish a Rose Pastel',
    category: 'aesthetic',
    categoryLabel: 'Aesthetic Editorial',
    badge: 'Pastel Romantic',
    image: '/assets/aistudio/frame-custom-08.png',
    description:
      'Palet warna pink pastel lembut berpadu dengan bingkai oval metalik futuristik, kelopak mawar mekar, dan tipografi manis "I wish a rose". Menghadirkan kesan romantis, manis, dan elegan.',
    cutoutInfo: '4 jendela oval estetik dengan aksen kilau mutiara',
    vibe: 'Sempurna untuk foto berdua dengan pasangan, momen wisuda, atau hari ulang tahun berkesan.'
  }
];

export const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalFrame, setActiveModalFrame] = useState<FrameTemplate | null>(null);

  // Form Custom Frame state
  const [customForm, setCustomForm] = useState({
    name: '',
    branch: 'Madiun',
    notes: ''
  });

  const handleCustomFrameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin TentoTen Photobox, saya mau pesan Custom Frame:
- Nama/Komunitas: ${customForm.name || '-'}
- Cabang Tujuan: ${customForm.branch}
- Catatan/Tema: ${customForm.notes || '-'}
Saya akan mengirimkan file desain langsung di chat ini.`;

    const waUrl = `https://wa.me/6281330148068?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const filteredFrames = selectedCategory === 'all'
    ? FRAME_TEMPLATES
    : FRAME_TEMPLATES.filter((frame) => frame.category === selectedCategory);

  const productServicesSchema = getProductServicesSchema();

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Service-Specific Schema.org Structured Data for Photo Sessions & Custom Frame */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productServicesSchema)
        }}
      />

      {/* 1. Header & Breadcrumb */}
      <section className="w-full bg-[#fff8f0] py-10 md:py-16 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          {/* Visible Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5c403d]">
              <li>
                <a href="/" className="hover:text-[#960011] transition-colors">
                  Beranda
                </a>
              </li>
              <li>/</li>
              <li className="text-[#960011] font-bold" aria-current="page">
                Harga Photobox dan Custom Frame TentoTen
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] border border-[#960011]/30 text-[#960011] text-xs font-bold tracking-widest uppercase mb-3">
              DAFTAR HARGA & FORMAT FOTO
            </div>
            {/* EXACT SINGLE H1 */}
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1f1b11] font-black tracking-tight leading-tight">
              Harga Photobox dan Custom Frame TentoTen
            </h1>
            <p className="font-body-lg text-base md:text-lg text-[#5c403d] mt-4 leading-relaxed">
              TentoTen Photobox hanya punya dua harga. Sesi photobox Rp35.000 dan custom frame Rp60.000. Tidak ada paket bertingkat, tidak ada biaya tambahan yang disembunyikan, dan tidak ada pemesanan online. Kamu datang ke kafe, foto, dan membayar di lokasi. Halaman ini menjelaskan apa yang kamu dapat dari tiap harga dan bagaimana cara memakainya.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Dua Layanan Utama (Sesi Photobox & Custom Frame) */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Sesi Photobox: Rp35.000 */}
            <article
              id="sesi-photobox"
              className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[6px_6px_0px_#1f1b11] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#960011] font-bold">
                    STANDAR BOOTH
                  </span>
                  <span className="text-xs font-mono text-[#5c403d]">BAYAR DI TEMPAT</span>
                </div>
                <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black">
                  Sesi Photobox: Rp35.000 per sesi
                </h2>
                <div className="font-body-sm text-xs text-[#5c403d] mt-3 space-y-3 leading-relaxed">
                  <p>
                    Ini adalah layanan utama TentoTen. Kamu masuk ke photobox di salah satu kafe, berfoto bersama teman atau pasangan, lalu mengambil hasil cetaknya. Satu sesi dihitung Rp35.000, dan pembayaran dilakukan langsung di lokasi.
                  </p>
                  <p className="font-bold text-[#1f1b11]">Yang kamu dapat dari sesi biasa:</p>
                  <ul className="space-y-2 text-[#1f1b11]">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#960011] text-base">check_circle</span>
                      <span>Satu sesi foto di photobox TentoTen di kafe pilihanmu</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#960011] text-base">check_circle</span>
                      <span>Pilihan 11 template frame yang sudah tersedia di photobox</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#960011] text-base">check_circle</span>
                      <span>2 lembar cetak fisik instan + unduhan digital softfile</span>
                    </li>
                  </ul>
                  <p>
                    Sesi ini cocok untuk pertama kali mencoba, untuk foto santai saat nongkrong, atau untuk kenang-kenangan kecil bareng orang terdekat. Kamu tidak perlu membawa apa pun selain diri sendiri.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1f1b11]/15">
                <a
                  href="/location"
                  className="w-full py-3.5 bg-[#1f1b11] hover:bg-[#343025] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center block transition-colors font-bold"
                >
                  Lihat Halaman Location
                </a>
              </div>
            </article>

            {/* Custom Frame: Rp60.000 */}
            <article
              id="custom-frame"
              className="bg-[#fff8f0] rounded-3xl border-2 border-[#960011] p-6 sm:p-8 shadow-[6px_6px_0px_#960011] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#960011] text-white font-bold">
                    FILE DARI PELANGGAN
                  </span>
                  <span className="text-xs font-mono text-[#960011]">REQUEST WA</span>
                </div>
                <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black">
                  Custom Frame: Rp60.000 dengan desain buatan kamu sendiri
                </h2>
                <div className="font-body-sm text-xs text-[#5c403d] mt-3 space-y-3 leading-relaxed">
                  <p>
                    Custom frame itu bingkai foto dengan desain buatan kamu sendiri, dipasang khusus untuk sesi photobox kamu. Cocok untuk ulang tahun, gathering kantor, acara komunitas, atau momen lainnya.
                  </p>
                  <p>
                    <strong>Desainnya dari kamu.</strong> TentoTen tidak membuatkan desain. Kamu menyiapkan file desainmu sendiri, bisa dengan tema, warna, atau tulisan yang kamu mau.
                  </p>
                  <p>
                    <strong>Frame dipakai selama sesi.</strong> Setelah frame siap, setiap hasil cetak di sesi itu otomatis memakai desainmu.
                  </p>
                  <p>
                    <strong>Biayanya terpisah.</strong> Custom frame Rp60.000, terpisah dari harga sesi photobox Rp35.000.
                  </p>
                  <p>
                    <strong>Format file dan lama pengaturan.</strong> Detail ini ditentukan admin. Tanyakan langsung saat kamu menghubungi lewat WhatsApp.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1f1b11]/15">
                <a
                  href="#form-custom-frame"
                  className="w-full py-3.5 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center block transition-colors font-bold"
                >
                  Isi Form Custom Frame di Bawah
                </a>
              </div>
            </article>
          </div>

          {/* Tiga Langkah Memesan Custom Frame */}
          <div className="mt-12 bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 max-w-4xl mx-auto shadow-[4px_4px_0px_#1f1b11]">
            <h3 className="font-headline-sm text-xl text-[#1f1b11] font-black mb-4 text-center">
              Tiga langkah memesan Custom Frame
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15">
                <span className="font-mono text-sm font-bold text-[#960011] block mb-1">1. Hubungi admin</span>
                <p className="text-xs text-[#5c403d] leading-relaxed">
                  Isi form di bawah. Pesan akan terbuka di WhatsApp dengan data yang sudah terisi rapi.
                </p>
              </div>
              <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15">
                <span className="font-mono text-sm font-bold text-[#960011] block mb-1">2. Kirim file di chat</span>
                <p className="text-xs text-[#5c403d] leading-relaxed">
                  Lampirkan file desainmu langsung di chat WhatsApp. Website ini tidak menerima unggahan file.
                </p>
              </div>
              <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15">
                <span className="font-mono text-sm font-bold text-[#960011] block mb-1">3. Admin mengatur frame</span>
                <p className="text-xs text-[#5c403d] leading-relaxed">
                  Admin men-setting frame supaya siap dipakai saat kamu datang ke lokasi pada hari yang disepakati.
                </p>
              </div>
            </div>
            <p className="text-xs text-[#5c403d] text-center mt-4 italic">
              Sebaiknya hubungi admin beberapa waktu sebelum kamu berencana datang, terutama untuk acara yang sudah punya tanggal.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORM CUSTOM FRAME (3 Field: Nama opsional, Cabang wajib, Catatan opsional) */}
      <section id="form-custom-frame" className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-8">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              PESAN FRAME KHUSUS
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
              Form Custom Frame
            </h2>
            <p className="font-body-md text-sm text-[#5c403d] mt-2 leading-relaxed">
              Isi form singkat ini untuk memulai chat dengan admin. Website tidak menyimpan data yang kamu isi. Semuanya hanya diteruskan ke WhatsApp.
            </p>
          </div>

          <form
            onSubmit={handleCustomFrameSubmit}
            className="bg-[#fcf3e2] rounded-3xl border-2 border-[#1f1b11] p-6 sm:p-8 shadow-[6px_6px_0px_#1f1b11] space-y-5"
          >
            <div>
              <label htmlFor="custom-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1f1b11] mb-1.5">
                Nama kamu atau nama komunitas (boleh dikosongkan)
              </label>
              <input
                id="custom-name"
                type="text"
                value={customForm.name}
                onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                placeholder="Contoh: Nadia & Dimas / BEM Fakultas"
                className="w-full px-4 py-3 rounded-xl bg-[#fff8f0] border-2 border-[#1f1b11] text-sm text-[#1f1b11] focus:outline-none focus:border-[#960011]"
              />
            </div>

            <div>
              <label htmlFor="custom-branch" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1f1b11] mb-1.5">
                Cabang tujuan (wajib dipilih) *
              </label>
              <select
                id="custom-branch"
                value={customForm.branch}
                onChange={(e) => setCustomForm({ ...customForm, branch: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#fff8f0] border-2 border-[#1f1b11] text-sm text-[#1f1b11] focus:outline-none focus:border-[#960011]"
              >
                <option value="Madiun">Madiun - Sthana Coffee (08.00 - 24.00)</option>
                <option value="Jombang">Jombang - Ethereal Coffee (08.00 - 23.00)</option>
                <option value="Ponorogo">Ponorogo - Komahaus Coffee (07.00 - 00.00)</option>
                <option value="Kertosono">Kertosono - Keyf Coffee (10.00 - 22.00)</option>
              </select>
            </div>

            <div>
              <label htmlFor="custom-notes" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1f1b11] mb-1.5">
                Catatan singkat seperti tema acara atau jumlah frame (boleh dikosongkan)
              </label>
              <textarea
                id="custom-notes"
                rows={3}
                value={customForm.notes}
                onChange={(e) => setCustomForm({ ...customForm, notes: e.target.value })}
                placeholder="Contoh: Acara wisuda tanggal 15 November, ada 2 desain frame"
                className="w-full px-4 py-3 rounded-xl bg-[#fff8f0] border-2 border-[#1f1b11] text-sm text-[#1f1b11] focus:outline-none focus:border-[#960011]"
              ></textarea>
            </div>

            <button
              type="submit"
              data-track="whatsapp"
              className="w-full py-4 bg-[#960011] hover:bg-[#c0111e] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center font-bold shadow-[3px_3px_0px_#1f1b11] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>Chat Admin buat Custom Frame</span>
            </button>
          </form>

          {/* Cabang & Ide Pemakaian */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body-sm text-[#5c403d]">
            <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15">
              <strong className="text-[#1f1b11] block mb-1">Memilih cabang untuk Custom Frame:</strong>
              Frame custom dipasang untuk photobox di cabang tertentu, jadi pastikan cabang yang kamu pilih adalah kafe yang akan kamu datangi: <a href="/location/madiun" className="text-[#960011] underline font-bold">Madiun</a>, <a href="/location/jombang" className="text-[#960011] underline font-bold">Jombang</a>, <a href="/location/ponorogo" className="text-[#960011] underline font-bold">Ponorogo</a>, atau <a href="/location/kertosono" className="text-[#960011] underline font-bold">Kertosono</a>.
            </div>
            <div className="p-4 bg-[#f6eddc] rounded-2xl border border-[#1f1b11]/15">
              <strong className="text-[#1f1b11] block mb-1">Ide pemakaian Custom Frame:</strong>
              Ulang tahun sahabat (suvenir kenang-kenangan), gathering kantor atau tim kerja, acara komunitas hobi atau organisasi kampus, serta kejutan anniversary berdua.
            </div>
          </div>
        </div>
      </section>

      {/* 4. KATALOG PILIHAN FRAME YANG SUDAH TERSEDIA (11 TEMPLATE RESMI) */}
      <section className="w-full bg-[#fcf3e2] py-16 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
              SUDAH TERMASUK DALAM SESI RP35.000
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-[#1f1b11] font-black">
              Pilihan frame yang sudah tersedia
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#5c403d] mt-3 leading-relaxed">
              Kalau kamu tidak ingin repot membuat desain, pakai saja frame yang sudah tersedia di photobox. Pilihan ini ikut dalam harga sesi Rp35.000, jadi tidak ada biaya tambahan. Berikut adalah 11 koleksi template frame resmi TentoTen yang langsung bisa kamu pilih di layar mesin:
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all border-2 border-[#1f1b11] cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#960011] text-white shadow-[3px_3px_0px_#1f1b11]'
                    : 'bg-[#fff8f0] text-[#1f1b11] hover:bg-[#f6eddc]'
                }`}
              >
                Semua Frame ({FRAME_TEMPLATES.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('vintage')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all border-2 border-[#1f1b11] cursor-pointer ${
                  selectedCategory === 'vintage'
                    ? 'bg-[#960011] text-white shadow-[3px_3px_0px_#1f1b11]'
                    : 'bg-[#fff8f0] text-[#1f1b11] hover:bg-[#f6eddc]'
                }`}
              >
                Vintage Film (2)
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('pop')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all border-2 border-[#1f1b11] cursor-pointer ${
                  selectedCategory === 'pop'
                    ? 'bg-[#960011] text-white shadow-[3px_3px_0px_#1f1b11]'
                    : 'bg-[#fff8f0] text-[#1f1b11] hover:bg-[#f6eddc]'
                }`}
              >
                Retro & Pop Art (4)
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('y2k')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all border-2 border-[#1f1b11] cursor-pointer ${
                  selectedCategory === 'y2k'
                    ? 'bg-[#960011] text-white shadow-[3px_3px_0px_#1f1b11]'
                    : 'bg-[#fff8f0] text-[#1f1b11] hover:bg-[#f6eddc]'
                }`}
              >
                Y2K & Cute (2)
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('aesthetic')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all border-2 border-[#1f1b11] cursor-pointer ${
                  selectedCategory === 'aesthetic'
                    ? 'bg-[#960011] text-white shadow-[3px_3px_0px_#1f1b11]'
                    : 'bg-[#fff8f0] text-[#1f1b11] hover:bg-[#f6eddc]'
                }`}
              >
                Aesthetic Editorial (3)
              </button>
            </div>
          </div>

          {/* Frame Grid: 11 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFrames.map((frame) => (
              <article
                key={frame.id}
                className="bg-[#fff8f0] rounded-3xl border-2 border-[#1f1b11] p-4 shadow-[5px_5px_0px_#1f1b11] hover:shadow-[7px_7px_0px_#960011] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full rounded-2xl bg-white border-2 border-[#1f1b11] overflow-hidden p-2 group">
                    <img
                      src={frame.image}
                      alt={`Template frame photobox TentoTen desain ${frame.name} tema ${frame.categoryLabel}`}
                      width={600}
                      height={900}
                      loading="lazy"
                      className="w-full h-72 sm:h-80 object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#1f1b11] text-white font-bold shadow-sm">
                        {frame.badge}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#960011] text-white font-bold shadow-sm">
                        2 Lembar Cetak
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5c403d] mb-1">
                      <span>{frame.categoryLabel}</span>
                      <span>4 Pose Vertikal</span>
                    </div>
                    <h3 className="font-headline-sm text-xl text-[#1f1b11] font-black">
                      {frame.name}
                    </h3>
                    <p className="font-body-sm text-xs text-[#5c403d] mt-2 leading-relaxed">
                      {frame.description}
                    </p>

                    <div className="mt-3 p-2.5 rounded-xl bg-[#f6eddc] border border-[#1f1b11]/15 text-[11px] text-[#1f1b11] space-y-1">
                      <p className="font-bold text-[#960011] flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">photo_size_select_actual</span>
                        <span>{frame.cutoutInfo}</span>
                      </p>
                      <p className="text-[#5c403d] leading-normal">
                        {frame.vibe}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1f1b11]/10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalFrame(frame)}
                    className="w-full py-2.5 px-3 bg-[#f6eddc] hover:bg-[#ffdad6] text-[#960011] border border-[#960011]/30 font-label-board text-xs uppercase tracking-wider rounded-xl text-center font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">zoom_in</span>
                    <span>Lihat Detail Frame</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PEMBAYARAN DI LOKASI & PERBANDINGAN LAYANAN */}
      <section className="w-full bg-[#fff8f0] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-[#fcf3e2] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Pembayaran dan layanan di lokasi
              </h2>
              <div className="text-xs sm:text-sm text-[#5c403d] space-y-3 leading-relaxed">
                <p>
                  Semua layanan TentoTen berjalan di lokasi. Tidak ada pemesanan online, tidak ada pembayaran lewat website, dan tidak ada akun yang harus dibuat. Kamu datang ke kafe, foto, dan membayar di sana.
                </p>
                <p>
                  Untuk custom frame, komunikasi dengan admin berlangsung lewat WhatsApp, dan pembayaran biayanya dibahas langsung dengan admin. Kalau kamu ingin memastikan metode pembayaran yang tersedia di cabang tertentu, tanyakan lewat WhatsApp sebelum berangkat.
                </p>
              </div>
            </div>

            <div className="bg-[#fcf3e2] p-6 sm:p-8 rounded-3xl border-2 border-[#1f1b11] shadow-[4px_4px_0px_#1f1b11]">
              <h2 className="font-headline-lg text-2xl text-[#1f1b11] font-black mb-3">
                Perbandingan singkat dua layanan
              </h2>
              <div className="text-xs sm:text-sm text-[#5c403d] space-y-3 leading-relaxed">
                <p>
                  <strong>Sesi Photobox</strong> cocok kalau kamu ingin langsung foto tanpa persiapan. Harganya Rp35.000, memakai frame yang sudah tersedia, dan tidak perlu menghubungi admin lebih dulu.
                </p>
                <p>
                  <strong>Custom Frame</strong> cocok kalau kamu ingin hasil foto dengan tema sendiri. Harganya Rp60.000, memakai file desain buatanmu, dan perlu dihubungkan lewat admin di WhatsApp.
                </p>
                <p>
                  Kamu bisa memilih salah satu atau memakai keduanya sesuai kebutuhan acara.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ HARGA & TIPS DESAIN */}
      <section className="w-full bg-[#fcf3e2] py-14 px-4 md:px-8 lg:px-12 border-b-2 border-[#1f1b11]">
        <div className="max-w-[840px] mx-auto space-y-8">
          <div>
            <div className="text-center mb-8">
              <span className="font-label-badge text-xs uppercase tracking-wider text-[#960011] font-bold block mb-1">
                TANYA JAWAB
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1f1b11] font-black">
                Pertanyaan yang sering ditanyakan tentang harga
              </h2>
            </div>

            <div className="space-y-4">
              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah ada biaya lain selain Rp35.000?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Untuk sesi photobox biasa, harga yang tertulis adalah Rp35.000 per sesi.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah custom frame sudah termasuk harga sesi?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Custom frame Rp60.000 terpisah dari harga sesi Rp35.000.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah TentoTen mendesainkan frame untuk saya?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Tidak. Desain berasal dari kamu. Admin hanya mengatur frame agar siap dipakai di mesin booth.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah ada pembayaran online?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Tidak ada. Pembayaran sesi dilakukan di lokasi, dan pembahasan biaya custom frame dilakukan dengan admin via WhatsApp.
                </p>
              </details>

              <details className="bg-[#fff8f0] p-5 rounded-2xl border-2 border-[#1f1b11] shadow-[3px_3px_0px_#1f1b11] cursor-pointer">
                <summary className="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b11] list-none flex items-center justify-between">
                  <span>Apakah ada diskon atau paket?</span>
                  <span className="material-symbols-outlined text-neutral-500">expand_more</span>
                </summary>
                <p className="font-body-sm text-xs text-[#5c403d] mt-3 pt-3 border-t border-[#1f1b11]/10 leading-relaxed">
                  Saat ini hanya ada dua harga tadi (Rp35.000 sesi biasa dan Rp60.000 custom frame). Masih ada yang ingin ditanyakan? Hubungi admin lewat WhatsApp atau lihat halaman <a href="/contact" className="text-[#960011] font-bold underline">Contact</a>.
                </p>
              </details>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#fff8f0] border-2 border-[#1f1b11]">
            <h3 className="font-headline-sm text-lg text-[#1f1b11] font-bold mb-2">
              Tips menyiapkan desain custom frame
            </h3>
            <p className="text-xs text-[#5c403d] leading-relaxed">
              Mulailah dari satu ide utama, misalnya nama acara atau nama komunitas. Pilih dua atau tiga warna saja supaya desain tidak terlalu ramai. Pastikan tulisan mudah dibaca. Siapkan file dengan resolusi tinggi. Setelah itu, tanyakan ke admin format file dan ukuran yang diterima sebelum kamu menyelesaikan desain, karena ketentuan teknis ditetapkan admin.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Artikel Panduan Terbaru */}
      <LatestArticles category="Panduan" count={2} bgClass="bg-[#fff8f0]" />


      {/* Lightbox Modal for Enlarge Frame Preview */}
      {activeModalFrame && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveModalFrame(null)}
        >
          <div
            className="relative bg-[#fff8f0] border-2 border-[#1f1b11] rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_#960011]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Tutup preview frame"
              onClick={() => setActiveModalFrame(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1f1b11] text-white flex items-center justify-center hover:bg-[#960011] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#960011] text-white font-bold">
                {activeModalFrame.badge}
              </span>
              <span className="text-xs font-mono text-[#5c403d]">
                {activeModalFrame.categoryLabel}
              </span>
            </div>

            <h3 className="font-headline-lg text-2xl text-[#1f1b11] font-black">
              {activeModalFrame.name}
            </h3>

            <div className="my-4 bg-white rounded-2xl border-2 border-[#1f1b11] p-3 flex justify-center">
              <img
                src={activeModalFrame.image}
                alt={`Detail lembar cetak template frame photobox ${activeModalFrame.name}`}
                width={600}
                height={900}
                className="max-h-[55vh] w-auto object-contain rounded-lg"
              />
            </div>

            <p className="font-body-sm text-xs sm:text-sm text-[#5c403d] leading-relaxed">
              {activeModalFrame.description}
            </p>

            <div className="mt-4 p-3 rounded-xl bg-[#f6eddc] border border-[#1f1b11]/15 text-xs text-[#1f1b11]">
              <p className="font-bold text-[#960011] mb-1">
                Format Cetak: {activeModalFrame.cutoutInfo}
              </p>
              <p className="text-[#5c403d]">
                {activeModalFrame.vibe}
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href="/location"
                className="flex-1 py-3 bg-[#1f1b11] hover:bg-[#343025] text-white font-label-board text-xs uppercase tracking-wider rounded-xl text-center font-bold transition-colors"
              >
                Cari Kafe & Foto Sekarang
              </a>
              <button
                type="button"
                onClick={() => setActiveModalFrame(null)}
                className="py-3 px-5 bg-neutral-200 hover:bg-neutral-300 text-[#1f1b11] font-label-board text-xs uppercase tracking-wider rounded-xl text-center font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
