import { ImagePlacementMode } from '../types/studio';

export type EtsyAssetCategory = 'florals' | 'foil-frames' | 'textures';

export interface EtsyAssetItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: EtsyAssetCategory;
  imageUrl: string;
  thumbnailUrl: string;
  recommendedPlacement: ImagePlacementMode;
  defaultOpacity: number;
  previewGradient: string;
  description: string;
}

export const ETSY_ASSET_GALLERY: EtsyAssetItem[] = [
  // ═════════════════════════════════════════════════════════════════════
  // 0. LOCAL MASTER ASSETS (أصول مائية محلية فائقة الدقة والسرعة 100%)
  // ═════════════════════════════════════════════════════════════════════
  {
    id: 'local-burgundy-roses',
    nameAr: 'أطراف الجوري العنابي الملكي المائي (محلي فائقة الدقة)',
    nameEn: 'Master Burgundy Rose Frame (Vector High-DPI)',
    category: 'florals',
    imageUrl: '/assets/florals/burgundy_rose_frame.svg',
    thumbnailUrl: '/assets/florals/burgundy_rose_frame.svg',
    recommendedPlacement: '4-edges-frame',
    defaultOpacity: 0.95,
    previewGradient: 'from-[#4A0E17] via-[#8B1E3F] to-[#FFE599]',
    description: 'باقة جوري عنابي ووردي مائية نقية مفرغة شفافة مع لمسات غبار الذهب، بدون إنترنت وسرعة لحظية.'
  },
  {
    id: 'local-olive-sage',
    nameAr: 'شلال أغصان الزيتون والأوكالبتوس (محلي نقي)',
    nameEn: 'Master Olive & Sage Cascade (Vector High-DPI)',
    category: 'florals',
    imageUrl: '/assets/florals/olive_sage_frame.svg',
    thumbnailUrl: '/assets/florals/olive_sage_frame.svg',
    recommendedPlacement: 'right-edge',
    defaultOpacity: 0.95,
    previewGradient: 'from-[#2A3D22] via-[#68825D] to-[#DFC693]',
    description: 'أغصان زيتون متوسطية ناعمة مع حبات زيتون مذهبة، مفرغة بأعلى درجات النقاء الطبيعي.'
  },

  // ═════════════════════════════════════════════════════════════════════
  // 1. WATERCOLOR FLORALS (ورود وأغصان مائية فائقة الدقة)
  // ═════════════════════════════════════════════════════════════════════
  {
    id: 'burgundy-rose-cascade',
    nameAr: 'شلال الجوري العنابي الملكي',
    nameEn: 'Burgundy Rose Cascade',
    category: 'florals',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: '4-edges-frame',
    defaultOpacity: 0.9,
    previewGradient: 'from-[#58111A] via-[#8B1E3F] to-[#FDF8F9]',
    description: 'شلال جوري عنابي مخملي بألوان مائية عميقة مع أوراق زيتون داكنة على أطراف الكرت.'
  },
  {
    id: 'eucalyptus-sage-garland',
    nameAr: 'إكليل الكينا والميرمية العطري',
    nameEn: 'Eucalyptus & Sage Garland',
    category: 'florals',
    imageUrl: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: '4-edges-frame',
    defaultOpacity: 0.88,
    previewGradient: 'from-[#2F3E2B] via-[#4A5D23] to-[#EAEFE9]',
    description: 'أغصان أوكالبتوس وميرمية برية عطرية تلتف حول زوايا الكرت بانسيابية رومانسية هادئة.'
  },
  {
    id: 'blush-peonies-bouquet',
    nameAr: 'باقة البيوني الوردي الناعم',
    nameEn: 'Blush Peonies & White Ranunculus',
    category: 'florals',
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: '4-corners',
    defaultOpacity: 0.92,
    previewGradient: 'from-[#FDFBF9] via-[#F8E7E9] to-[#D98A94]',
    description: 'بتلات بيوني زهري ناعم شيفون مع زهور رانونكولوس بيضاء للأعراس الصيفية والربيعية.'
  },
  {
    id: 'white-orchids-royal',
    nameAr: 'أغصان الأوركيد الملكي والياسمين',
    nameEn: 'Royal White Orchids & Jasmine',
    category: 'florals',
    imageUrl: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: 'top-bottom',
    defaultOpacity: 0.9,
    previewGradient: 'from-[#FFFFFF] via-[#F4F4F0] to-[#D4AF37]',
    description: 'أوركيد أبيض ناصع مع تفرعات ياسمين ملكية تعطي شعوراً بالنقاء الملكي الأرستقراطي.'
  },
  {
    id: 'dusty-blue-hydrangea',
    nameAr: 'هيدرانجيا زرقاء ولافندر فرنسي',
    nameEn: 'Dusty Blue Hydrangea & French Lavender',
    category: 'florals',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: 'right-edge',
    defaultOpacity: 0.88,
    previewGradient: 'from-[#2C3E50] via-[#5B7996] to-[#E8EDF2]',
    description: 'أزهار هيدرانجيا بلون الكحلي الضبابي Dusty Blue مع لافندر بروفنس الهادئ.'
  },

  // ═════════════════════════════════════════════════════════════════════
  // 2. FOIL FRAMES & BORDERS (إطارات الفويل الذهبي 24K والأركان الفيكتورية)
  // ═════════════════════════════════════════════════════════════════════
  {
    id: 'geometric-gold-frame',
    nameAr: 'إطار هندسي مذهب 24K مزدوج',
    nameEn: '24K Geometric Mirror Gold Frame',
    category: 'foil-frames',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: '4-edges-frame',
    defaultOpacity: 0.95,
    previewGradient: 'from-[#AA7C11] via-[#D4AF37] to-[#FFF3C4]',
    description: 'إطار هندسي متناظر بخطوط مزدوجة من رقائق الذهب اللامع 24K مع زوايا مقصوصة 45 درجة.'
  },
  {
    id: 'vintage-baroque-corners',
    nameAr: 'أركان فيكتورية باروكية مذهبة',
    nameEn: 'Vintage Baroque Gold Corners',
    category: 'foil-frames',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: '4-corners',
    defaultOpacity: 0.9,
    previewGradient: 'from-[#8A6715] via-[#C5A059] to-[#FBF8EF]',
    description: 'زخارف روكوكو أوروبية كلاسيكية محفورة على الأركان الأربعة تمنح الكرت هيبة الملوك.'
  },
  {
    id: 'minimalist-hairline-frame',
    nameAr: 'إطار الخط النحيف المودرن 0.5pt',
    nameEn: 'Minimalist Modern Hairline Frame',
    category: 'foil-frames',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: '4-edges-frame',
    defaultOpacity: 0.85,
    previewGradient: 'from-[#4A4A4A] via-[#8C8C8C] to-[#EAEAEA]',
    description: 'إطار عصري رفيع جداً يبرز جمال الفراغ وبساطة التصميم النخبوي.'
  },
  {
    id: 'art-deco-arch-crest',
    nameAr: 'قوس آرت ديكو الهندسي المذهب',
    nameEn: 'Art Deco Architectural Crest',
    category: 'foil-frames',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: 'top-bottom',
    defaultOpacity: 0.92,
    previewGradient: 'from-[#6E4F08] via-[#B8860B] to-[#FFE277]',
    description: 'أقواس إشعاعية متدرجة مستوحاة من عمارة العشرينات الذهبية والقصور التاريخية.'
  },
  {
    id: 'moroccan-filigree-border',
    nameAr: 'إطار مشربية أندلسي مخرم',
    nameEn: 'Andalusian Moroccan Filigree Border',
    category: 'foil-frames',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: '4-edges-frame',
    defaultOpacity: 0.88,
    previewGradient: 'from-[#0F291E] via-[#2A4736] to-[#D4AF37]',
    description: 'توريقات نجمية وهندسية إسلامية دقيقة محفورة بذهب بارز تليق بالأعراس العربية الكبرى.'
  },

  // ═════════════════════════════════════════════════════════════════════
  // 3. PHYSICAL TEXTURES (خامات وألياف الورق الطبيعي 350 GSM)
  // ═════════════════════════════════════════════════════════════════════
  {
    id: 'cotton-rag-350',
    nameAr: 'ورق قطني بارز الألياف 350 GSM',
    nameEn: '350gsm Cold-Press Cotton Rag',
    category: 'textures',
    imageUrl: 'https://images.unsplash.com/photo-1603484477859-abe6a73f9366?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1603484477859-abe6a73f9366?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: 'full-card',
    defaultOpacity: 0.9,
    previewGradient: 'from-[#FCFBF7] via-[#F4EFE6] to-[#EAE4D7]',
    description: 'ملمس ألياف قطنية طبيعية نقية بوزن ثقيل تعطي إحساس الفخامة عند الملامسة.'
  },
  {
    id: 'emerald-linen-weave',
    nameAr: 'كتان زمردي إمبراطوري مضلع',
    nameEn: 'Imperial Emerald Linen Weave',
    category: 'textures',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: 'full-card',
    defaultOpacity: 0.95,
    previewGradient: 'from-[#06140D] via-[#0F291E] to-[#1C4533]',
    description: 'نسيج كتان نافر باللون الأخضر الزمردي الداكن مع تموجات قماشية ملوكية.'
  },
  {
    id: 'ivory-pearl-stardream',
    nameAr: 'ورق لؤلؤي صدف عاجي Stardream',
    nameEn: 'Ivory Pearl Shimmer Stardream',
    category: 'textures',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: 'full-card',
    defaultOpacity: 0.85,
    previewGradient: 'from-[#FFFDF9] via-[#F9F5EC] to-[#ECE5D8]',
    description: 'لمعان لؤلؤي صدفي ناعم يتلألأ تحت أضواء القاعة ليعكس أرقى مستويات الرقي.'
  },
  {
    id: 'deckle-edge-handmade',
    nameAr: 'ورق يدوي بحواف ممزقة عتيقة',
    nameEn: 'Handmade Deckle Edge Rough Cotton',
    category: 'textures',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: 'full-card',
    defaultOpacity: 0.9,
    previewGradient: 'from-[#FAF8F5] via-[#EFEBE4] to-[#DDD7CD]',
    description: 'طابع الورق التراثي المصنوع يدوياً مع مسامية خشنة وعمق مادي واقعي.'
  },
  {
    id: 'terracotta-mineral-board',
    nameAr: 'كرتون التيراكوتا الفخاري الدافئ',
    nameEn: 'Artisanal Terracotta Mineral Board',
    category: 'textures',
    imageUrl: 'https://images.unsplash.com/photo-1596265371388-43edbaadab94?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596265371388-43edbaadab94?auto=format&fit=crop&w=300&q=70',
    recommendedPlacement: 'full-card',
    defaultOpacity: 0.92,
    previewGradient: 'from-[#5E2614] via-[#A85133] to-[#C66B49]',
    description: 'لون طيني صحراوي دافئ مستوحى من رمال وتراث الجزيرة مع خشونة معدنية جذابة.'
  }
];

export function getEtsyAssetById(id?: string): EtsyAssetItem | undefined {
  if (!id || id === 'none') return undefined;
  return ETSY_ASSET_GALLERY.find((item) => item.id === id);
}
