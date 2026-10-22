import React from 'react';
import { StudioState } from '../types/studio';

export interface BotanicalArtworkPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'watercolor' | 'botanical' | 'marble' | 'arabesque' | 'minimal';
  thumbGradient: string;
  primaryColor: string;
  cardBaseColor: string;
  textColor: string;
  description: string;
  renderSvg: (state: StudioState, width?: number, height?: number) => React.ReactNode;
}

export const BOTANICAL_ARTWORKS: BotanicalArtworkPreset[] = [
  // 1. بيوني أبيض وأوكالبتوس ناعم
  {
    id: 'white-peony-eucalyptus',
    nameAr: 'بيوني أبيض وأوكالبتوس ناعم',
    nameEn: 'White Peony & Soft Eucalyptus',
    category: 'watercolor',
    thumbGradient: 'from-[#FAF8F5] via-[#EAEFE9] to-[#DCE6DA]',
    primaryColor: '#526955',
    cardBaseColor: '#FAF8F5',
    textColor: '#2D3B30',
    description: 'باقة مائية من أزهار البيوني الأبيض العاجي مع أغصان الأوكالبتوس المخملية الرقيقة.',
    renderSvg: (state) => (
      <g id="artwork-white-peony-eucalyptus">
        {/* Soft Watercolor Radial Washes */}
        <circle cx="300" cy="220" r="320" fill="#526955" fillOpacity="0.06" />
        <circle cx="120" cy="140" r="180" fill="#B76E79" fillOpacity="0.04" />
        <circle cx="480" cy="140" r="180" fill="#B76E79" fillOpacity="0.04" />

        {/* Symmetrical Top Eucalyptus Foliage Arch */}
        <g stroke="#526955" fill="#526955" opacity="0.45" strokeLinecap="round">
          {/* Left Branch */}
          <path d="M 300,90 C 230,85 170,110 130,150" fill="none" strokeWidth="1.2" />
          <ellipse cx="230" cy="85" rx="14" ry="7" transform="rotate(-15 230 85)" fillOpacity="0.3" strokeWidth="0.6" />
          <ellipse cx="180" cy="108" rx="13" ry="6" transform="rotate(-30 180 108)" fillOpacity="0.3" strokeWidth="0.6" />
          <ellipse cx="140" cy="145" rx="12" ry="6" transform="rotate(-45 140 145)" fillOpacity="0.3" strokeWidth="0.6" />

          {/* Right Branch (Symmetric Mirror) */}
          <path d="M 300,90 C 370,85 430,110 470,150" fill="none" strokeWidth="1.2" />
          <ellipse cx="370" cy="85" rx="14" ry="7" transform="rotate(15 370 85)" fillOpacity="0.3" strokeWidth="0.6" />
          <ellipse cx="420" cy="108" rx="13" ry="6" transform="rotate(30 420 108)" fillOpacity="0.3" strokeWidth="0.6" />
          <ellipse cx="460" cy="145" rx="12" ry="6" transform="rotate(45 460 145)" fillOpacity="0.3" strokeWidth="0.6" />
        </g>

        {/* Botanical White Peony Flower Bud Center Crest */}
        <g transform="translate(300, 85)" fill="none" stroke="#D4AF37" strokeWidth="0.8">
          <circle cx="0" cy="0" r="12" fill="#FAF8F5" stroke="#D4AF37" strokeWidth="1" />
          <path d="M -8,0 C -4,-6 4,-6 8,0 C 4,6 -4,6 -8,0 Z" fill="#D4AF37" fillOpacity="0.25" />
          <circle cx="0" cy="0" r="3" fill="#D4AF37" />
        </g>
      </g>
    )
  },

  // 2. روز عنابي ملكي وأوراق الذهب
  {
    id: 'burgundy-rose-gold',
    nameAr: 'روز عنابي ملكي وأوراق الذهب',
    nameEn: 'Burgundy Rose & Gold Leaf',
    category: 'watercolor',
    thumbGradient: 'from-[#FAF6F6] via-[#F4E3E6] to-[#E9CCD2]',
    primaryColor: '#58111A',
    cardBaseColor: '#FAF7F7',
    textColor: '#3D0B12',
    description: 'تدرجات عنابية مخملية ملكية تلتف حول أوراق الذهب الخالص عيار 24K مع فخامة فائقة.',
    renderSvg: () => (
      <g id="artwork-burgundy-rose-gold">
        <circle cx="300" cy="430" r="380" fill="#58111A" fillOpacity="0.05" />
        <circle cx="300" cy="200" r="220" fill="#8B1E3F" fillOpacity="0.04" />

        {/* Symmetrical Gold Leaf Vine Scrollwork */}
        <g stroke="#D4AF37" fill="#D4AF37" opacity="0.65">
          <path d="M 200,100 Q 250,80 300,95 Q 350,80 400,100" fill="none" strokeWidth="1.2" />
          <circle cx="300" cy="95" r="3" />
          <circle cx="250" cy="88" r="2" />
          <circle cx="350" cy="88" r="2" />
          {/* Subtle Burgundy Bloom Petals */}
          <ellipse cx="300" cy="75" rx="10" ry="5" fill="#58111A" fillOpacity="0.3" stroke="none" />
          <ellipse cx="260" cy="80" rx="7" ry="4" transform="rotate(-20 260 80)" fill="#58111A" fillOpacity="0.2" stroke="none" />
          <ellipse cx="340" cy="80" rx="7" ry="4" transform="rotate(20 340 80)" fill="#58111A" fillOpacity="0.2" stroke="none" />
        </g>
      </g>
    )
  },

  // 3. أغصان الزيتون والزمرد الملكي
  {
    id: 'emerald-olive-wreath',
    nameAr: 'أغصان الزيتون والزمرد الملكي',
    nameEn: 'Royal Emerald & Wild Olive Wreath',
    category: 'botanical',
    thumbGradient: 'from-[#F9FAF8] via-[#EAF0E7] to-[#D7E3D2]',
    primaryColor: '#0F291E',
    cardBaseColor: '#FAFBF9',
    textColor: '#0B2017',
    description: 'إكليل أغصان زيتون بري متناظر هندسياً مع هالة خضراء زمردية ترمز للنقاء والبركة.',
    renderSvg: () => (
      <g id="artwork-emerald-olive-wreath">
        <circle cx="300" cy="380" r="360" fill="#0F291E" fillOpacity="0.05" />
        {/* Symmetrical Olive Leaves Wreath */}
        <g stroke="#2D5A42" fill="#2D5A42" strokeLinecap="round" opacity="0.5">
          {/* Left Wreath */}
          <path d="M 300,740 C 180,720 120,580 120,430 C 120,280 180,140 300,120" fill="none" strokeWidth="1" strokeDasharray="4, 4" />
          {/* Right Wreath */}
          <path d="M 300,740 C 420,720 480,580 480,430 C 480,280 420,140 300,120" fill="none" strokeWidth="1" strokeDasharray="4, 4" />

          {/* Olive Leaf Clusters */}
          <ellipse cx="140" cy="300" rx="10" ry="4" transform="rotate(-40 140 300)" fillOpacity="0.35" />
          <ellipse cx="130" cy="430" rx="10" ry="4" transform="rotate(10 130 430)" fillOpacity="0.35" />
          <ellipse cx="140" cy="560" rx="10" ry="4" transform="rotate(50 140 560)" fillOpacity="0.35" />

          <ellipse cx="460" cy="300" rx="10" ry="4" transform="rotate(40 460 300)" fillOpacity="0.35" />
          <ellipse cx="470" cy="430" rx="10" ry="4" transform="rotate(-10 470 430)" fillOpacity="0.35" />
          <ellipse cx="460" cy="560" rx="10" ry="4" transform="rotate(-50 460 560)" fillOpacity="0.35" />
        </g>
      </g>
    )
  },

  // 4. أوركيد كحلي لؤلؤي
  {
    id: 'navy-white-orchid',
    nameAr: 'أوركيد كحلي لؤلؤي',
    nameEn: 'Midnight Navy & Pearl Orchid',
    category: 'watercolor',
    thumbGradient: 'from-[#F8FAFC] via-[#E7ECF3] to-[#D3DDEB]',
    primaryColor: '#0F1E36',
    cardBaseColor: '#F8F9FA',
    textColor: '#0A1526',
    description: 'تموج أزرق ليلي ملكي مع خطوط بتلات أوركيد لؤلؤية ونقاط ذهبية لامعة.',
    renderSvg: () => (
      <g id="artwork-navy-white-orchid">
        <circle cx="300" cy="430" r="400" fill="#0F1E36" fillOpacity="0.05" />
        <g stroke="#D4AF37" fill="none" opacity="0.6">
          <circle cx="300" cy="110" r="18" strokeWidth="0.8" />
          <circle cx="300" cy="110" r="14" strokeWidth="0.5" strokeDasharray="2, 2" />
          <path d="M 260,110 L 340,110" strokeWidth="0.8" />
        </g>
      </g>
    )
  },

  // 5. إكليل الزهور الوردية والذهب
  {
    id: 'blush-floral-crest',
    nameAr: 'إكليل الزهور الوردية والذهب',
    nameEn: 'Blush Floral Cartouche & Crest',
    category: 'watercolor',
    thumbGradient: 'from-[#FDFBF7] via-[#F9ECE9] to-[#F3DDD8]',
    primaryColor: '#B76E79',
    cardBaseColor: '#FDFBF9',
    textColor: '#4A2A30',
    description: 'إكليل كارتوش وردي رومانسي يحيط بالشعار الملكي مع زخارف نباتية ذهبية رقيقة.',
    renderSvg: () => (
      <g id="artwork-blush-floral-crest">
        <circle cx="300" cy="270" r="260" fill="#B76E79" fillOpacity="0.07" />
        <circle cx="300" cy="270" r="160" fill="#D4AF37" fillOpacity="0.03" />
        <g stroke="#D4AF37" fill="none" strokeWidth="1" opacity="0.75">
          <circle cx="300" cy="270" r="75" strokeDasharray="3, 3" />
          <circle cx="300" cy="270" r="82" strokeWidth="0.7" />
        </g>
      </g>
    )
  },

  // 6. بامباس مجفف وتيراكوتا دافئ
  {
    id: 'desert-pampas-terracotta',
    nameAr: 'بامباس مجفف وتيراكوتا دافئ',
    nameEn: 'Boho Dried Pampas & Terracotta',
    category: 'botanical',
    thumbGradient: 'from-[#FAF7F2] via-[#F7EBE4] to-[#EED4C8]',
    primaryColor: '#C66B49',
    cardBaseColor: '#FAF7F3',
    textColor: '#3E1C12',
    description: 'طابع بوهيمي ترابي دافئ مع تموجات تيراكوتا مشمسة وأقواس شمسية معمارية.',
    renderSvg: () => (
      <g id="artwork-desert-pampas-terracotta">
        <circle cx="300" cy="300" r="320" fill="#C66B49" fillOpacity="0.06" />
        {/* Geometric Sunburst Arches */}
        <g stroke="#C66B49" fill="none" opacity="0.3" strokeWidth="0.8">
          <path d="M 200,240 A 100 100 0 0 1 400,240" />
          <path d="M 220,240 A 80 80 0 0 1 380,240" strokeDasharray="3, 3" />
          <path d="M 240,240 A 60 60 0 0 1 360,240" />
        </g>
      </g>
    )
  },

  // 7. لافندر فرنسي وأزهار بروفنس
  {
    id: 'french-lavender-botanical',
    nameAr: 'لافندر فرنسي وأزهار بروفنس',
    nameEn: 'French Lavender & Provence Florals',
    category: 'botanical',
    thumbGradient: 'from-[#FBFBFC] via-[#F2EEF7] to-[#E5DCF0]',
    primaryColor: '#6C5B7B',
    cardBaseColor: '#FAF8FC',
    textColor: '#2E2238',
    description: 'أزهار لافندر هادئة مع رقة الطراز الريفي الفرنسي في مقاطعة بروفنس.',
    renderSvg: () => (
      <g id="artwork-french-lavender-botanical">
        <circle cx="300" cy="400" r="340" fill="#6C5B7B" fillOpacity="0.05" />
        <g stroke="#6C5B7B" fill="#6C5B7B" opacity="0.4" strokeWidth="0.8">
          <line x1="280" y1="80" x2="280" y2="120" strokeWidth="1" />
          <circle cx="280" cy="85" r="3" fillOpacity="0.4" />
          <circle cx="280" cy="95" r="3" fillOpacity="0.4" />
          <line x1="320" y1="80" x2="320" y2="120" strokeWidth="1" />
          <circle cx="320" cy="85" r="3" fillOpacity="0.4" />
          <circle cx="320" cy="95" r="3" fillOpacity="0.4" />
        </g>
      </g>
    )
  },

  // 8. رخام كالاكاتا وعروق الذهب 24K
  {
    id: 'calacatta-gold-marble',
    nameAr: 'رخام كالاكاتا وعروق الذهب 24K',
    nameEn: 'Calacatta Gold Luxury Marble',
    category: 'marble',
    thumbGradient: 'from-[#FFFFFF] via-[#F8F6F0] to-[#EFE9DC]',
    primaryColor: '#D4AF37',
    cardBaseColor: '#FDFBF7',
    textColor: '#26221A',
    description: 'رخام إيطالي كالاكاتا ناصع البياض تتخلله عروق انسيابية مذهبة عيار 24 قيراط.',
    renderSvg: () => (
      <g id="artwork-calacatta-gold-marble">
        {/* Soft Marble Veins */}
        <path
          d="M 50,150 Q 180,220 280,180 T 450,260 T 550,200"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.2"
          opacity="0.35"
        />
        <path
          d="M 280,180 Q 320,290 260,420 T 380,580 T 500,720"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.8"
          opacity="0.25"
        />
        <path
          d="M 120,480 Q 200,530 240,640 T 150,780"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.8"
          opacity="0.25"
        />
      </g>
    )
  },

  // 9. إطار باروكي فيكتوري محفور بالذهب
  {
    id: 'vintage-baroque-gold-frame',
    nameAr: 'إطار باروكي محفور بالذهب',
    nameEn: 'Ornate Victorian Baroque Gold Frame',
    category: 'arabesque',
    thumbGradient: 'from-[#FAF7F2] via-[#F4E8D1] to-[#E7D2AC]',
    primaryColor: '#D4AF37',
    cardBaseColor: '#FAF7F2',
    textColor: '#261F14',
    description: 'زخارف أرستقراطية وتيجان باروكية متناظرة مأخوذة من قصور القرن الثامن عشر.',
    renderSvg: () => (
      <g id="artwork-vintage-baroque-gold-frame" stroke="#D4AF37" fill="none" opacity="0.7">
        {/* Top Baroque Coronet */}
        <g transform="translate(300, 90)">
          <path d="M -40,15 C -25,0 -15,10 0,0 C 15,10 25,0 40,15" strokeWidth="1.2" />
          <circle cx="0" cy="-2" r="3" fill="#D4AF37" />
          <circle cx="-25" cy="5" r="2" fill="#D4AF37" />
          <circle cx="25" cy="5" r="2" fill="#D4AF37" />
        </g>
        {/* Bottom Filigree Scroll */}
        <g transform="translate(300, 770)">
          <path d="M -50,-10 Q 0,10 50,-10" strokeWidth="1.2" />
          <circle cx="0" cy="5" r="3" fill="#D4AF37" />
        </g>
      </g>
    )
  },

  // 10. مقرنصات وزخرفة أندلسية موريسكية
  {
    id: 'andalusian-arabesque-stars',
    nameAr: 'زخرفة أندلسية ومقرنصات ذهبية',
    nameEn: 'Andalusian Arabesque Star Geometry',
    category: 'arabesque',
    thumbGradient: 'from-[#FAF8F5] via-[#EFEBE4] to-[#DFD8CC]',
    primaryColor: '#B8860B',
    cardBaseColor: '#FAF8F5',
    textColor: '#241E15',
    description: 'خطوط هندسية نجمية إسلامية ثمانية متقاطعة مستوحاة من قصر الحمراء بغرناطة.',
    renderSvg: () => (
      <g id="artwork-andalusian-arabesque-stars" stroke="#B8860B" fill="none" opacity="0.45" strokeWidth="0.8">
        {/* 8-Pointed Star Center Motif at Top */}
        <g transform="translate(300, 105)">
          <rect x="-18" y="-18" width="36" height="36" />
          <rect x="-18" y="-18" width="36" height="36" transform="rotate(45)" />
          <circle cx="0" cy="0" r="7" />
        </g>
        <line x1="160" y1="105" x2="260" y2="105" />
        <line x1="340" y1="105" x2="440" y2="105" />
      </g>
    )
  },

  // 11. قطن عاجي خام مع إطار ذهبي رفيع
  {
    id: 'pure-ivory-cotton-grain',
    nameAr: 'قطن عاجي وإطار ذهبي رفيع',
    nameEn: 'Pure Raw Cotton & Double Gold Hairline',
    category: 'minimal',
    thumbGradient: 'from-[#FFFFFF] via-[#FAF9F6] to-[#F2EFE9]',
    primaryColor: '#D4AF37',
    cardBaseColor: '#FAF9F6',
    textColor: '#1F1E22',
    description: 'قمة البساطة والهدوء الملكي: ورق قطني خام مع خطوط إطار ذهبي كلاسيكي مزدوج.',
    renderSvg: () => (
      <g id="artwork-pure-ivory-cotton-grain">
        <circle cx="300" cy="430" r="360" fill="#D4AF37" fillOpacity="0.03" />
        {/* Subtle corner ticks */}
        <g stroke="#D4AF37" strokeWidth="0.8" opacity="0.6">
          <line x1="80" y1="80" x2="110" y2="80" />
          <line x1="80" y1="80" x2="80" y2="110" />
          <line x1="520" y1="80" x2="490" y2="80" />
          <line x1="520" y1="80" x2="520" y2="110" />
          <line x1="80" y1="780" x2="110" y2="780" />
          <line x1="80" y1="780" x2="80" y2="750" />
          <line x1="520" y1="780" x2="490" y2="780" />
          <line x1="520" y1="780" x2="520" y2="750" />
        </g>
      </g>
    )
  },

  // 12. رسومات نباتية سوداء بوهيمية
  {
    id: 'monochrome-noir-botanical',
    nameAr: 'نباتي أسود مونوكروم مع غبار الذهب',
    nameEn: 'Noir Botanical & Gold Dust',
    category: 'minimal',
    thumbGradient: 'from-[#FDFBF7] via-[#EFECE6] to-[#DDD7CC]',
    primaryColor: '#2C2B30',
    cardBaseColor: '#FAF8F5',
    textColor: '#1A191D',
    description: 'خطوط نباتية سوداء رفيعة وناعمة مع لمسات غبار الذهب تعطي إحساساً عصرياً أنيقاً.',
    renderSvg: () => (
      <g id="artwork-monochrome-noir-botanical">
        <g stroke="#2C2B30" fill="none" opacity="0.35" strokeWidth="0.8">
          <path d="M 240,95 Q 300,75 360,95" />
          <circle cx="300" cy="80" r="2" fill="#D4AF37" stroke="none" opacity="0.8" />
          <circle cx="280" cy="82" r="1.5" fill="#D4AF37" stroke="none" opacity="0.8" />
          <circle cx="320" cy="82" r="1.5" fill="#D4AF37" stroke="none" opacity="0.8" />
        </g>
      </g>
    )
  }
];
