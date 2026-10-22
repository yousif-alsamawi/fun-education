import { StudioState } from '../types/studio';

export interface CuratedLuxurySuite {
  id: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  badge: string;
  thumbnailColor: string;
  thumbnailBorder: string;
  accentBadge: string;
  previewDescription: string;
  applyPreset: (currentState: StudioState) => Partial<StudioState>;
}

export const CURATED_LUXURY_SUITES: CuratedLuxurySuite[] = [
  // 1. سويت الزمرد الملكي والذهب الخالص
  {
    id: 'royal-emerald-gold',
    nameAr: 'سويت الزمرد الملكي والذهب الخالص',
    nameEn: 'Royal Emerald & 24K Gold Suite',
    taglineAr: 'تناغم أرستقراطي بين الأخضر الزمردي الداكن والذهب عيار 24 مع كرت قطني عاجي',
    badge: 'الأكثر طلباً 👑',
    thumbnailColor: 'from-[#0F291E] via-[#16382B] to-[#0A1F16]',
    thumbnailBorder: 'border-emerald-500/50',
    accentBadge: '#D4AF37',
    previewDescription: 'قالب القوس الملكي مع مونوغرام دائري مذهّب، ورق قطني بارز 350 GSM، وبصمة ذهب حارة للنصوص.',
    applyPreset: (state) => ({
      curatedSuiteId: 'royal-emerald-gold',
      activeTemplateId: 'royal-arch',
      designSchoolTheme: 'royal-classic',
      cardBaseColor: '#FAF7F2',
      artworkColor: '#D4AF37',
      artworkGradientEnd: '#B8860B',
      secondaryPieceColor: '#0F291E',
      textColor: '#1A2920',
      selectedPaletteId: 'emerald-luxury',
      paperStock: 'cotton-350',
      paperTexture: 'cotton',
      isFoilEnabled: true,
      hotFoilType: 'gold-24k',
      foilTargets: {
        monogram: true,
        names: true,
        frame: true,
        greeting: false
      },
      monogramCrestStyle: 'royal-circle',
      monogramBuilder: {
        ...state.monogramBuilder,
        enabled: true,
        layout: 'crest',
        initial1: 'S',
        initial2: 'K',
        showFloralWreath: true,
        useHotFoil: true,
        size: 52
      },
      waxSealConfig: {
        enabled: true,
        style: 'gold',
        initials: 'S & K',
        position: 'top',
        size: 50
      },
      names: {
        ...state.names,
        text: 'سارة & خالد',
        fontFamily: '"Aref Ruqaa", serif',
        color: '#1A2920',
        fontSize: 34
      },
      greeting: {
        ...state.greeting,
        text: 'بِكُلِّ حُبٍّ وَتَقْدِيرٍ، نَتَشَرَّفُ بِدَعْوَتِكُمْ لِحُضُورِ حَفْلِ زِفَافِنَا',
        color: '#D4AF37'
      },
      closingVerse: 'وَبِحُضُورِكُمْ يَتِمُّ لَنَا الفَرَحُ وَالسُّرُورُ',
      backDesign: {
        ...state.backDesign,
        backgroundColor: '#0F291E',
        artworkColor: '#D4AF37',
        monogramText: 'S & K'
      }
    })
  },

  // 2. سويت رومانسية الجوري العنابي المخملي
  {
    id: 'burgundy-rose-romance',
    nameAr: 'سويت رومانسية الجوري العنابي المخملي',
    nameEn: 'Burgundy Rose Botanical Suite',
    taglineAr: 'باقات الجوري المخملي مع الذهب الوردي وختم شمعي قرمزي فائق الدفء',
    badge: 'رومانسي فاخر 🌹',
    thumbnailColor: 'from-[#4A0E17] via-[#5C141F] to-[#2D080E]',
    thumbnailBorder: 'border-rose-500/50',
    accentBadge: '#E0A899',
    previewDescription: 'قالب السحب البيضاوي مع زهور مائية عنابية على الأطراف، ورق قطني ناعم وختم شمعي أحمر حقيقي.',
    applyPreset: (state) => ({
      curatedSuiteId: 'burgundy-rose-romance',
      activeTemplateId: 'pullout-oval',
      designSchoolTheme: 'fine-art-botanical',
      cardBaseColor: '#FFFDF9',
      artworkColor: '#8B1E3F',
      artworkGradientEnd: '#D9777F',
      secondaryPieceColor: '#4A0E17',
      textColor: '#360912',
      selectedPaletteId: 'burgundy-romance',
      paperStock: 'cotton-300',
      paperTexture: 'cotton',
      isFoilEnabled: true,
      hotFoilType: 'rose-gold',
      foilTargets: {
        monogram: true,
        names: true,
        frame: true,
        greeting: false
      },
      monogramCrestStyle: 'laurel-wreath',
      monogramBuilder: {
        ...state.monogramBuilder,
        enabled: true,
        layout: 'interlocking',
        initial1: 'M',
        initial2: 'N',
        showFloralWreath: true,
        useHotFoil: true,
        size: 50
      },
      waxSealConfig: {
        enabled: true,
        style: 'crimson',
        initials: 'M & N',
        position: 'top',
        size: 48
      },
      names: {
        ...state.names,
        text: 'مريم & ناصر',
        fontFamily: 'Amiri, serif',
        color: '#4A0E17',
        fontSize: 35
      },
      greeting: {
        ...state.greeting,
        text: 'فِي لَيْلَةٍ مِنْ لَيَالِي العُمْرِ، نَسْعَدُ بِمُشَارَكَتِكُم فَرْحَتَنَا',
        color: '#8B1E3F'
      },
      closingVerse: 'أَهْلاً وَسَهْلاً بِكُمْ فِي يَوْمِ فَرَحِنَا البَهِيج',
      backDesign: {
        ...state.backDesign,
        backgroundColor: '#4A0E17',
        artworkColor: '#E0A899',
        monogramText: 'M & N'
      }
    })
  },

  // 3. سويت الأوكالبتوس والزيتون المينيمال
  {
    id: 'fine-art-olive-sage',
    nameAr: 'سويت الأوكالبتوس والزيتون الهادئ',
    nameEn: 'Fine-Art Olive & Sage Suite',
    taglineAr: 'جمال الطبيعة المتوسطية وأغصان الزيتون الرقيقة مع ورق كتان مضلع',
    badge: 'طبيعي هادئ 🌿',
    thumbnailColor: 'from-[#2E4028] via-[#3C5334] to-[#1C2918]',
    thumbnailBorder: 'border-emerald-600/50',
    accentBadge: '#C2D1B8',
    previewDescription: 'مطوية غير متماثلة تفتح بنعومة مع كرت داخلي نقي، لمسات ذهبية هادئة وشريطة ستان زيتونية.',
    applyPreset: (state) => ({
      curatedSuiteId: 'fine-art-olive-sage',
      activeTemplateId: 'asymmetric-gatefold',
      designSchoolTheme: 'fine-art-botanical',
      cardBaseColor: '#FAFBF8',
      artworkColor: '#526A4A',
      artworkGradientEnd: '#879F7F',
      secondaryPieceColor: '#2E4028',
      textColor: '#1E2B1A',
      selectedPaletteId: 'olive-botanical',
      paperStock: 'linen-weave',
      paperTexture: 'linen',
      isFoilEnabled: true,
      hotFoilType: 'gold-24k',
      foilTargets: {
        monogram: true,
        names: true,
        frame: false,
        greeting: false
      },
      monogramCrestStyle: 'minimalist-oval',
      monogramBuilder: {
        ...state.monogramBuilder,
        enabled: true,
        layout: 'crest',
        initial1: 'L',
        initial2: 'Y',
        showFloralWreath: true,
        useHotFoil: true,
        size: 48
      },
      ribbonConfig: {
        enabled: true,
        color: 'forest-green',
        style: 'bow'
      },
      waxSealConfig: {
        enabled: false,
        style: 'pearl',
        initials: 'L & Y',
        position: 'bottom',
        size: 46
      },
      names: {
        ...state.names,
        text: 'ليلى & يوسف',
        fontFamily: '"Playfair Display", serif',
        color: '#1E2B1A',
        fontSize: 32
      },
      greeting: {
        ...state.greeting,
        text: 'يَسُرُّنَا دَعْوَتُكُم لِمُشَارَكَتِنَا أَجْمَلَ لَحَظَاتِ الحَيَاة',
        color: '#526A4A'
      },
      closingVerse: 'تَشْرِيفُكُم يَزِيدُ حَفْلَنَا بَهْجَةً وَسُرُوراً',
      backDesign: {
        ...state.backDesign,
        backgroundColor: '#2E4028',
        artworkColor: '#C2D1B8',
        monogramText: 'L & Y'
      }
    })
  },

  // 4. سويت الفخامة العاجية والشمبانيا الكلاسيكية
  {
    id: 'ivory-champagne-classic',
    nameAr: 'سويت الفخامة العاجية والشمبانيا الكلاسيكية',
    nameEn: 'Ivory & Champagne Elegance',
    taglineAr: 'ورق لؤلؤي صدف ببريق هادئ وتنسيق تايبوغرافي ملكي متوازن بنسب ذهبية',
    badge: 'كلاسيك ملكي 🥂',
    thumbnailColor: 'from-[#3A332B] via-[#4D4439] to-[#25201A]',
    thumbnailBorder: 'border-amber-400/50',
    accentBadge: '#E8D5B5',
    previewDescription: 'لوحة مشطوفة الزوايا بأناقة هندسية حادة، إطار ذهبي محفور، وخط عربي متداخل مع مونوغرام باروكي.',
    applyPreset: (state) => ({
      curatedSuiteId: 'ivory-champagne-classic',
      activeTemplateId: 'chamfered-plaque',
      designSchoolTheme: 'royal-classic',
      cardBaseColor: '#FDFBF7',
      artworkColor: '#C5A059',
      artworkGradientEnd: '#DFC693',
      secondaryPieceColor: '#3A332B',
      textColor: '#24201A',
      selectedPaletteId: 'champagne-cream',
      paperStock: 'pearl-shimmer',
      paperTexture: 'pearl',
      isFoilEnabled: true,
      hotFoilType: 'gold-24k',
      foilTargets: {
        monogram: true,
        names: true,
        frame: true,
        greeting: false
      },
      monogramCrestStyle: 'baroque-shield',
      monogramBuilder: {
        ...state.monogramBuilder,
        enabled: true,
        layout: 'crest',
        initial1: 'N',
        initial2: 'A',
        showFloralWreath: true,
        useHotFoil: true,
        size: 52
      },
      waxSealConfig: {
        enabled: true,
        style: 'pearl',
        initials: 'N & A',
        position: 'top',
        size: 48
      },
      names: {
        ...state.names,
        text: 'نور & عبد الرحمن',
        fontFamily: '"Aref Ruqaa", serif',
        color: '#24201A',
        fontSize: 34
      },
      greeting: {
        ...state.greeting,
        text: 'نَدْعُوكُمْ لِتَكُونُوا شُهُوداً عَلَى عَقْدِ قِرَانِنَا وَفَرْحَتِنَا',
        color: '#C5A059'
      },
      closingVerse: 'دَامَتْ دِيَارُكُمْ عَامِرَةً بِالأَفْرَاحِ وَالمَسَرَّات',
      backDesign: {
        ...state.backDesign,
        backgroundColor: '#24201A',
        artworkColor: '#DFC693',
        monogramText: 'N & A'
      }
    })
  },

  // 5. سويت السماء الليلية والكحلي الإمبراطوري
  {
    id: 'midnight-navy-starlight',
    nameAr: 'سويت السماء الليلية والكحلي الإمبراطوري',
    nameEn: 'Midnight Navy & Starlight Suite',
    taglineAr: 'عمق الكحلي الليلي الملكي مع لمعات الذهب الاستثنائية وتفاصيل القبة الإسلامية',
    badge: 'فخامة ليلية 🌙',
    thumbnailColor: 'from-[#0B132B] via-[#132047] to-[#070D1C]',
    thumbnailBorder: 'border-blue-500/50',
    accentBadge: '#FFD700',
    previewDescription: 'قالب القبة الإسلامية المعمارية، حفر ذهبي متألق، ورق قطني إيطالي فائق الفخامة والرزانة.',
    applyPreset: (state) => ({
      curatedSuiteId: 'midnight-navy-starlight',
      activeTemplateId: 'islamic-dome',
      designSchoolTheme: 'royal-classic',
      cardBaseColor: '#FAF9F6',
      artworkColor: '#D4AF37',
      artworkGradientEnd: '#FFDF73',
      secondaryPieceColor: '#0B132B',
      textColor: '#0B132B',
      selectedPaletteId: 'navy-gold',
      paperStock: 'cotton-350',
      paperTexture: 'cotton',
      isFoilEnabled: true,
      hotFoilType: 'gold-24k',
      foilTargets: {
        monogram: true,
        names: true,
        frame: true,
        greeting: true
      },
      monogramCrestStyle: 'royal-circle',
      monogramBuilder: {
        ...state.monogramBuilder,
        enabled: true,
        layout: 'crest',
        initial1: 'D',
        initial2: 'F',
        showFloralWreath: true,
        useHotFoil: true,
        size: 54
      },
      waxSealConfig: {
        enabled: true,
        style: 'gold',
        initials: 'D & F',
        position: 'top',
        size: 50
      },
      names: {
        ...state.names,
        text: 'دانة & فيصل',
        fontFamily: '"Aref Ruqaa", serif',
        color: '#0B132B',
        fontSize: 34
      },
      greeting: {
        ...state.greeting,
        text: 'بِاسْمِ الَّذِي جَمَعَ القُلُوبَ بِالمَحَبَّةِ، نَدْعُوكُمْ لِفَرْحَةِ العُمْر',
        color: '#D4AF37'
      },
      closingVerse: 'حُضُورُكُم تَاجُ فَرْحَتِنَا وَضِيَاءُ لَيْلَتِنَا',
      backDesign: {
        ...state.backDesign,
        backgroundColor: '#0B132B',
        artworkColor: '#FFDF73',
        monogramText: 'D & F'
      }
    })
  },

  // 6. سويت المودرن مينيماليزم العصري (Pill Capsule)
  {
    id: 'modern-noir-capsule',
    nameAr: 'سويت المودرن مينيماليزم العصري',
    nameEn: 'Modern Capsule Luxe Suite',
    taglineAr: 'بطاقة الكبسولة الطولية المنحنية مع تباين أسود وذهبي راقٍ وتنسيق تايبوغرافي فني',
    badge: 'تريند عصري 💊',
    thumbnailColor: 'from-[#18181B] via-[#27272A] to-[#09090B]',
    thumbnailBorder: 'border-zinc-500/50',
    accentBadge: '#D4AF37',
    previewDescription: 'تصميم الكبسولة الطولية الأكثر انتشاراً في أرقى حفلات الزفاف المعاصرة، خطوط نقية وأناقة مطلقة.',
    applyPreset: (state) => ({
      curatedSuiteId: 'modern-noir-capsule',
      activeTemplateId: 'vertical-capsule',
      designSchoolTheme: 'modern-minimalist',
      cardBaseColor: '#FCFCFC',
      artworkColor: '#D4AF37',
      artworkGradientEnd: '#E6C665',
      secondaryPieceColor: '#18181B',
      textColor: '#18181B',
      selectedPaletteId: 'noir-gold',
      paperStock: 'silk-matte',
      paperTexture: 'matte',
      isFoilEnabled: true,
      hotFoilType: 'gold-24k',
      foilTargets: {
        monogram: true,
        names: true,
        frame: false,
        greeting: false
      },
      monogramCrestStyle: 'geometric-hexagon',
      monogramBuilder: {
        ...state.monogramBuilder,
        enabled: true,
        layout: 'crest',
        initial1: 'R',
        initial2: 'T',
        showFloralWreath: false,
        useHotFoil: true,
        size: 50
      },
      waxSealConfig: {
        enabled: false,
        style: 'gold',
        initials: 'R & T',
        position: 'bottom',
        size: 46
      },
      names: {
        ...state.names,
        text: 'ريم & طارق',
        fontFamily: '"Playfair Display", serif',
        color: '#18181B',
        fontSize: 33
      },
      greeting: {
        ...state.greeting,
        text: 'TOGETHER WITH THEIR FAMILIES, INVITE YOU TO CELEBRATE THEIR WEDDING',
        color: '#D4AF37'
      },
      closingVerse: 'وَبِحُضُورِكُمْ تَكْتَمِلُ سَعَادَتُنَا',
      backDesign: {
        ...state.backDesign,
        backgroundColor: '#18181B',
        artworkColor: '#D4AF37',
        monogramText: 'R & T'
      }
    })
  }
];
