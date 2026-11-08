import { BranchInfo } from '../types';

export const BRANCHES_DATA: Record<string, BranchInfo> = {
  madiun: {
    id: 'madiun',
    name: 'Madiun',
    cafeName: 'Sthana Coffee',
    tagline: 'KOTA GADIS / JAWA TIMUR',
    tag: 'CABANG RESMI MADIUN',
    code: 'STH-MDN-01',
    regency: 'KOTA MADIUN',
    address: 'Jl. Setiaki No. 27, kawasan Oro-oro Ombo, Kota Madiun, Jawa Timur',
    addressDirections: 'Patokan: Terletak strategis di pusat hangout anak muda Madiun dengan area parkir roda dua dan mobil luas.',
    hours: '08.00 - 24.00 WIB',
    hoursDetailed: 'Buka setiap hari (Senin - Minggu)',
    status: 'BOOTH READY & OPERASIONAL',
    googleMapsUrl: 'https://maps.google.com/?q=Sthana+Coffee+Madiun',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgM8fSNZGM9-jin6zYC0PvXhrDPOLEEDXixBSZzP6ixkBN1zXcuGE39QJNdZULlTBPRHKVehQirP11n8jsL9W99IZbdnMHDSYURPhX3cE5TTKFlbfXxz_NJIpKXc8WXti55qPNsZgJKKsFU9jMjA4w2mfKeo51fMbLGG6axQEhTygFQLOzdUQ9SDJvcyD4Y8Zmd7pvHjEEET_34azCf7xmRC5l5S6oZynr7WMqWF_No8bwSO9Womk3qw',
    indoorCornerText: 'TentoTen Photobox @ Sthana - Jl. Setiaki No. 27, Kota Madiun',
    priceStandard: 'Rp35.000',
    priceCustom: 'Rp60.000',
    images: [
      {
        title: 'Mesin Photobox TentoTen',
        description: 'Terletak di koridor dalam Sthana Coffee',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxWY9tynIhCj-mgfG_uTc9Vk-TMZFw1H7oOacMvswHOjGQI1O5p-3oVlQG6qMSQTLkuipKkaftvrtRRQn0fG0-HJ1vC6D8cczkJ4Yy7fd1e_99TEPR_--PT7MkHCrYvYLXEYTavLZ98c9at_-xWI-4NN-gB2uJiaLbK0tz9nRFMNRJ8q9sgB9fuHiaMr4MJo6930EFSO8bpBp-57YKefnyMwGWUb2RpJMa6r34AjkqxClrM7Q3ASZ2bw',
        alt: 'Vintage retro photobooth machine styled in warm cream and deep red accents located inside the cozy brick-and-wood interior of Sthana Coffee in Madiun.'
      },
      {
        title: 'Area Nongkrong Sthana',
        description: 'Suasana santai buat ngopi & ngobrol',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOGcxQCv_feHSx3DtY1nyGqtssQXbRc1VHykUXHQzsBt34jVks2I36tltd3FXWmgMJn5q3FNCzCBSGrFswQvGIqVid8_jHjtXfaAmSq1osMhDumdBpvpergKXPad-3C2Sww1JVxtNSkt7YvuijDOPdE546RjE_K6pW25azwk9YQV_U0XR4lXiH3Wx3dAgOtDOwatRr4bA9C1qRY3oXiZJNzuMh5D0KrrDiOADkolEdxsbwhCdZubtC7A',
        alt: 'Atmospheric indoor and semi-outdoor coffee shop seating area at Sthana Coffee Madiun.'
      },
      {
        title: 'Hasil Cetak Fisik',
        description: 'Langsung jadi dalam hitungan detik',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAxf3-lN_oY3hUNVL_5IG-nuuhAcfdt25SB6LHWz6vdFZHb2r81PvAUbuL0RXdNW8QHb8XiMDj7FM7q3ZX2S1y0iN-P1I8WoC7Iw2VG5JsiiR4GIp5BTLnDvjEZVy7o02zAiK_x3sO4VMM7_fOUxvCyUOHRJnJgMviHxXGWjm_oQXbOhBMrjh7WqpxBHXC24qdW3MWJOUfvssOzMwC_WHTOZDYHtyIMoIETdXzcgDTslW-epnIxysQ_g',
        alt: 'Close up shot of hands holding two freshly printed authentic 4-frame vertical 35mm style paper photostrips.'
      },
      {
        title: 'Momen Foto Bersama',
        description: 'Bebas ekspresi tanpa rasa canggung',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCltxkIOVmJEqz3znXtnrdX9JAwNuJmMf8EQ3-uu0jah4hQ386WnsBmPYye7ZqPPlgOxBixtUoZ1Z35ioM2Ud58PHFk1Wwb9aEK0Fx2HJBra4jd_XXHqWOSOi0T7hDW2PjQpQsgJiTjLU-XCSfarpran9F9YENuMO_JFfRlyNE4socXyDVpWUD80Egaq0un20uK6ZBenO2l5AgnKj-9GVW8SLTGK8O87wVhE9gq9NB-aNOeLV5PTW77YA',
        alt: 'Candid moment of two smiling university students posing inside TentoTen photobox booth.'
      }
    ]
  },
  jombang: {
    id: 'jombang',
    name: 'Jombang',
    cafeName: 'Ethereal Coffee',
    tagline: 'KOTA SANTRI - JAWA TIMUR',
    tag: 'BOOTH SIAP LAYANI FOTO',
    code: 'ETH-JBG-02',
    regency: 'KAB. JOMBANG',
    address: 'Jl. Kusuma Bangsa No. 23, Pulo Lor, Kec. Jombang, Kab. Jombang, Jawa Timur 61419',
    addressDirections: 'Patokan: Dekat pusat kota Jombang dengan area outdoor yang rindang dan ramah anak muda.',
    hours: '08.00 - 23.00 WIB',
    hoursDetailed: 'Buka setiap hari mengikuti jam buka kedai kopi.',
    status: 'PHOTOBOX AKTIF',
    googleMapsUrl: 'https://maps.google.com/?q=Ethereal+Coffee+Jombang',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ71a76mh-mRIoZWdGmpkcBl6wDJRL2pQGgNiLbBSahElVz4cdW1jWIeW-XDpNgJGIe1xpfyPZav6wnS-1y6cgvVwpjMg5OWMgF-jxm-295F5AHJSKA8wsESiaolKYZunlwxGKgJDKs98mNf32SCjlNkCuLpB_ODQyQB79OCsJMKbiXx7aEU0VdZL8KKMtAaHVu020oK_I7gyeZeDXc6-qJ7HNgHhzX8BH-eH9N28y8wldaBwqZtD26w',
    indoorCornerText: 'Ethereal Coffee - Jl. Kusuma Bangsa No. 23, Jombang',
    priceStandard: 'Rp35.000',
    priceCustom: 'Rp60.000',
    images: [
      {
        title: 'Area Photobox',
        description: 'Mesin Cetak Otomatis',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf_I5CeiNFgRPIdwcRmCrj2gz403aM6grvCXfl3Yb_SmGXf2Hxh0KJRmkcuMt9XC1_cYX1qCA3my6z3C1j95VvTxYrCknC7DSMHyZkaWuoJVsCCtazgPDgKZZR6Rs8eZDAXW3O6aj2KMoWs4Yava53XMl-CgM86iwgXZAWCyM0odcnphipJgCmHRCUCyYMg6B5vJxkxG6PmqDqWnv0MdONctoSMp5tZViyJsYnVhUPG1WIugtY5BmS_Q',
        alt: 'TentoTen photobox booth placed neatly inside the contemporary industrial Ethereal Coffee shop in Jombang.'
      },
      {
        title: 'Momen Nyata',
        description: 'Sesi Foto Seru',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs2JlDTn9yUrwBAmIGWA1xYhUAgL79qmmxK6KWzZz3nDU5LEqPtFFfBk8UWT5oJtVrlkH6kKJhIlPX3plNWi2RrdzD5ZZ4JqZDoHc_5_2UIk4nDQeyQYOOsfn2zmEh9bHA__qkAZIM466a_xUuybd7YblQv5uRx7W8-wzsRqrfi-d4PlSxtkQMEwrhd6Zx5bfvyVmJqqnNjsPqobcM62KjLHaH8WbiP0gVEQwRCU_mASoO9-E52_TxZw',
        alt: 'A candid photo of young Indonesian university friends posing cheerfully inside photobooth stall at Ethereal Coffee.'
      },
      {
        title: 'Interior Kafe',
        description: 'Suasana Ethereal',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaTk3FeWHiRVuRmAkn3xkpx29qlt97au4IpQpko5GhHL8IAzui-XK9SccvTUZDNGJzUoTioNv9rOXzhjvhR9JDFXvnOKQYXTrCRBIeQqMozcFMMPuuTl_YX4nTY4ec3JuPFTmWx9qcugrIHc5Ti5mbbkwrlSGyvNLDeBnef0kf-3kK18v3Q9alpesx6UP0Skr8ICU5ikDDKouQ_2E9SMxkUX1SREm5aaBwMSzRHSgkD7jwZCiQrvlFmA',
        alt: 'Interior dining and coffee table corner of Ethereal Coffee in Jombang with warm lights.'
      },
      {
        title: 'Hasil Cetak',
        description: 'Kualitas 35mm Analog',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkMgIsQo_tzkZOaoUIWuRSuR6oDAJGX4iagwCSHKC4Y8d3v7nmINdLhKP5nyrZzyiaHPXkvaHEtxty7lVZcaN_KU1PdqR7Rc5KLugCrfNKPEy7FY5yvkSmwbLDzm6X4Pko01A8mXIpqC6qSoktgyRxcL2IDCZuu9aVKdq4v3JHS4Hxob5iIL4OE6BpUrnuCIa-Sy5xULmVHWscBgG3_cqTEErX4rPPvX7QCBzV0U-7kDN2IjJQc4KY7Q',
        alt: 'A top-down view of freshly printed TentoTen 4-frame physical photostrip on a raw wooden cafe table at Ethereal Coffee.'
      }
    ]
  },
  ponorogo: {
    id: 'ponorogo',
    name: 'Ponorogo',
    cafeName: 'Komahaus Coffee',
    tagline: 'KOTA REOG - JAWA TIMUR',
    tag: 'BOOTH ACTIVE',
    code: 'KMH-PNG-03',
    regency: 'KAB. PONOROGO',
    address: 'Jl. Semeru No. 52, Nologaten, Kec. Ponorogo, Kab. Ponorogo, Jawa Timur',
    addressDirections: 'Patokan: Terletak di area indoor samping bar pemesanan kopi Komahaus Coffee.',
    hours: '07.00 - 00.00 WIB',
    hoursDetailed: 'Setiap hari tanpa libur (Senin - Minggu)',
    status: 'BOOTH ACTIVE',
    googleMapsUrl: 'https://maps.google.com/?q=Komahaus+Coffee+Ponorogo',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT-NdMi-mhF4iM6LMwPPKeDLonI67VmsIz2M_I9MqAGusvotWpeXvYnp-591qzTXTifnMWMFhYqp4P5Z-Po6ebCnZbsOaZ7cMyGiFlP8nus_P_66XNRagqIHKrQ02xFha9vjEHBrboN1IIabgLXpxSnsqQVhNSf53pwGLyHQpX9XHGm2ZKNYs-An_KIxlR5iV9gm7zwcSEn0jtfGChmoPzyRPVleJ5nGFT5ieh6b6ZwCT_ye7piEi_Ng',
    indoorCornerText: 'Posisi Booth: Samping bar pemesanan kopi Komahaus',
    priceStandard: 'Rp35.000',
    priceCustom: 'Rp60.000',
    images: [
      {
        title: 'Fisik Booth',
        description: 'Mesin photobox TentoTen siap pakai',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIspXd-bSk4SSZK_1yVy9VdEtEp7W8EtLrYsZh9R2NUbb2JuYm4GovLYQtMfTVs0WtofRT9J1t4d7bB7f05b8cdWPuO-rcWqN6T8OwFQeYXv0_uYmUDV4sFqJGXkXWTlpqnYlZezhxI3AGOOGw7_s1r6S5LlEA7O3--HEoSWzTbm6z6s2-k1r0nbuF_iH7iF29aqz30tRCCEIipm_Bt_ZqPvj-Q0uG-g6CgCBGjJvG627k917hNTNERw',
        alt: 'Vertical warm photo booth machine standing inside Komahaus Coffee Ponorogo with signature deep red wooden frame.'
      },
      {
        title: 'Area Duduk',
        description: 'Suasana indoor santai Komahaus',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7EbrubY6NbdvkDuUrTCspZkticm9Irf8Euym38cMcz2Of4fBypCSHBdYwZm8fWGyR74IikB4IY6fyoTxA0KdFmkbPS1Yipj1OdckP8_Qzi1dlR7YvBIDg6gVVdCStuAdRBpG11UNml_VVHOT9SFzsbAONFpvSCUCiAKqpRgqq_ocVynFpbgjleMMMyYpRB6i3uz4OmuW0rBL9SgnschUUPXoiYsjepDPjuuO5lcwMRM7mU1i3TH31OA',
        alt: 'Cozy interior seating area of Komahaus Coffee in Ponorogo showing young adults drinking iced coffee.'
      },
      {
        title: 'Nongkrong Malam',
        description: 'Buka sampai tengah malam pukul 00.00',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE2s20eeECl5I0NYNuhoCHlQ9M5NwlEv4PfClNrSOa14IZ3RP5-dziqhLg6KUyD7Y2mjLNan-sRPgp_qtWeVipRGfEBq5sxsGmh_fQntrmh9WqNxZOdzIr5RmDKu0V8xdkmtYYPSJwUmEn6ypTPx_zkgLWPJdKQLSnhzPuzA_7UJIxwUSl-6lk6lT3mNnJxfwhSBEuieZfWF82REd4aW6eaQEb7y602n8enN8aiKSbSd2CPxo96wu79w',
        alt: 'Night ambience at Komahaus Coffee courtyard in Ponorogo with string lights hanging overhead.'
      },
      {
        title: 'Hasil Cetak',
        description: 'Kertas tebal matte fisik berkualitas',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAZtl2e8AxZZktVKB1q_liVyqPYIPZyAFMk-TnKmFBFH10ApFPZaMgsTigtNn4if3Lvpu01dh73FTFvpDHR2Tf86QYYZp8DCGlTvTaYyLbbHkdePFSeNTBZlZI2Vv6a12egbjjYa5zBtK5t1u-TcJqn-e2uxGdsDXPhQKC7AIXaHoHA4uirhce47LrBg16_cOHsOpagAI2P_eJgkRA5IMS1NI7AA18kTeD66muKfXbCtBdTuYjCzrdLw',
        alt: 'Close up shot of authentic 35mm style paper photostrips held by two friends at a coffee shop table in Ponorogo.'
      }
    ]
  },
  kertosono: {
    id: 'kertosono',
    name: 'Kertosono',
    cafeName: 'Keyf Coffee',
    tagline: 'NGANJUK REGENCY - JAWA TIMUR',
    tag: 'STASIUN BOOTH AKTIF',
    code: 'KTS-01',
    regency: 'KAB. NGANJUK',
    address: 'Jl. Apel Gg. I, Pelem, Kutorejo, Kec. Kertosono, Kab. Nganjuk, Jawa Timur 64314',
    addressDirections: 'Patokan: Terletak di koridor utama area dalam Keyf Coffee, parkir motor dan mobil mudah di Jl. Apel Gg. I.',
    hours: '10.00 - 22.00 WIB',
    hoursDetailed: 'WIB SETIAP HARI',
    status: 'BOOTH SIAP PAKAI',
    googleMapsUrl: 'https://maps.google.com/?q=Keyf+Coffee+Kertosono',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7RWI5JHSkiFP9YsUvbJQFtjhQoz10ay5ywxrqcq-7yD5GcKka1A9_zyTfFDd58WvqmOPwvWY6pU9wIPjnQ4pHVwXY_tsp5EzLEMScoIjjOgiZiCP_V0dO6Zzd7KMrw06LRdlyQx0JVNIawRzRnhxh18MFYIjdC_MAUJ3gOtbSs04QtXrrOu316RRHs_NO4v4adD9TgCTWASkjNXtXpNX1BrZvGEjXFi-XmXby6XDsOyGLQY5gAM_k4w',
    indoorCornerText: 'Keyf Coffee Indoor Corner - Kertosono',
    priceStandard: 'Rp35.000',
    priceCustom: 'Rp60.000',
    images: [
      {
        title: 'Kiosk Booth TentoTen',
        description: 'Terletak di koridor utama area dalam kafe',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyzya4XFUGP311cW86GAWv3twlQ4ERJlySG5bGiUHr3D1YVonwmdybiCReGMnx_fPICPGWNkK2KFexervXU4I3A3Ta36nMr8z7eyCYPvSmAzEAd3if1GeTTJhWpsfJQIjVU14MFzoA6Eau4MqKlMbNZ8jGDv17FWVbpFN70ofSDS5Wa31p2AKPJLbYAs0Gehl_LEz1Q0c1iFXzkPwKjc2DA_PxGfZgGb0Vji5ZheksmOignxrISqGmUQ',
        alt: 'TentoTen photobox booth physical kiosk stationed inside Keyf Coffee Kertosono.'
      },
      {
        title: 'Interior Keyf Coffee',
        description: 'Tempat nongkrong santai sebelum atau sesudah foto',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADbu8YLSuAROVqw0v_eCY08bi1Pk2kqcA9llH4nRU9OCvFFn7xndANKtP6cgCQfzaGqlWgLJKok4_Lr0cHYoaRU27H7thMS0Pe-69_uQzGnWxynGB71vX4zM2mRRTFq1WD_VqkvxUNmH2fyryVF2Y9pYiQNIu7q7T_3Fn6HCe0PlGUEsqYwoU6P0-lJh4LVr2WpbErFSixzM1CvVbO-RQwLrzg-yX44pR_4TMJy3Zv0ewIaAGTGe8nmQ',
        alt: 'Interior scene of Keyf Coffee Kertosono with wooden seating, brick textural accent walls.'
      },
      {
        title: 'Hasil Cetak Langsung',
        description: 'Kertas foto analog tebal dengan tinta tajam',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4SFAJjTlxraaS8V4exv-pzK-rF-8MTwsLqZZR0j7F8Gmy9dZiZqYFyEUkNSZlqpITZI_T0dQZ0Wi16Pd6yH-5a9xBbS-im9fwQI6i_FdqA7gwpLfV7MDTYZ58bD8wjCXLC5yd33-LVL9Gpxmyf3evTNsWHkJbmyX2d8AuH5Z_PvSppWje32Ev8S5XkiqcY4RqJvM60pvh9iiVqcEmawSlwg5lvUk3-GjrhRLq-GeGUedqpqf6I03Ubg',
        alt: 'Two Indonesian youth smiling and checking printed 35mm style paper photostrips.'
      },
      {
        title: 'Fasad Depan Kafe',
        description: 'Parkir motor dan mobil mudah di Jl. Apel Gg. I',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFA1TBedWoPyWyFo7CdalkykC71BAyh5bIlns7ialhmkr0NK5rtFR6_dQvym7kMI_1Y4IKtSBOtTgplGX1fQ248JLKt7OCtz515nYH3BscIe5QE0_k47Ba7myDTIpVwf3Fmmu94KpCYlwIZ1F79wPb3wVvEwE3KEWjeNi6EgG63T_kosU5PCVLtU_yGS1_kwleLQyW_7mGxGp13Xtm8b5Z5ZrwVjFAgREhRTtriBE68XzQ6tA3Kgchag',
        alt: 'Exterior entrance sign and terrace of Keyf Coffee on Jalan Apel Kutorejo Kertosono.'
      }
    ]
  }
};
