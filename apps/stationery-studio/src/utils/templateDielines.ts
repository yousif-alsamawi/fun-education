import { MasterTemplateId } from '../types/studio';

export interface TemplateDielineGeometry {
  id: MasterTemplateId;
  nameAr: string;
  nameEn: string;
  path: string;
  widthMM: number;
  heightMM: number;
  hasPunchHole?: boolean;
  holeX?: number;
  holeY?: number;
  holeRadius?: number;
  isAsymmetricDuplex?: boolean;
  dielineScore?: string[];
  slitCut?: { x1: number; y1: number; x2: number; y2: number };
}

/**
 * MASTER SINGLE FUNCTION FOR CARD SILHOUETTES
 * Returns the exact outer cut path for both Front and Back cards.
 * Standard viewBox: 0 0 600 860. Center: (300, 430).
 */
export function getOuterCutPath(templateId: MasterTemplateId, _width = 600, _height = 860): string {
  switch (templateId) {
    // 1. القوس الملكي المتماثل (Royal Arch Card)
    case 'royal-arch':
      return `
        M 50, 290
        A 250 250 0 0 1 550, 290
        L 550, 795
        A 25 25 0 0 1 525, 820
        L 75, 820
        A 25 25 0 0 1 50, 795
        Z
      `.trim().replace(/\s+/g, ' ');

    // 2. مروحة البتلات الفرنسية المموجة (French Scalloped Fan)
    case 'french-scallop':
    case 'scalloped-badge':
      return `
        M 300, 40
        C 340, 40 370, 55 400, 50
        C 430, 45 460, 65 480, 85
        C 515, 105 540, 140 545, 180
        C 555, 230 540, 280 545, 330
        C 555, 380 555, 480 545, 530
        C 540, 580 555, 630 545, 680
        C 540, 720 515, 755 480, 775
        C 460, 795 430, 815 400, 810
        C 370, 805 340, 820 300, 820
        C 260, 820 230, 805 200, 810
        C 170, 815 140, 795 120, 775
        C 85, 755 60, 720 55, 680
        C 45, 630 60, 580 55, 530
        C 45, 480 45, 380 55, 330
        C 60, 280 45, 230 55, 180
        C 60, 140 85, 105 120, 85
        C 140, 65 170, 45 200, 50
        C 230, 55 260, 40 300, 40
        Z
      `.trim().replace(/\s+/g, ' ');

    // 3. مروحة البتلة الكلاسيكية (Symmetric Scalloped Fan)
    case 'floral-fan':
      return `
        M 300, 40
        C 335, 40 370, 50 400, 75
        C 435, 100 470, 140 495, 190
        C 525, 245 545, 310 535, 380
        C 525, 450 480, 520 440, 590
        C 400, 660 365, 730 350, 785
        C 340, 815 315, 825 300, 825
        C 285, 825 260, 815 250, 785
        C 235, 730 200, 660 160, 590
        C 120, 520 75, 450 65, 380
        C 55, 310 75, 245 105, 190
        C 130, 140 165, 100 200, 75
        C 230, 50 265, 40 300, 40
        Z
      `.trim().replace(/\s+/g, ' ');

    // 4. بطاقة القبة الإسلامية (Islamic Dome Arch)
    case 'islamic-dome':
      return `
        M 300, 35
        C 315, 65 345, 110 380, 150
        C 430, 200 490, 235 535, 280
        C 550, 295 550, 320 550, 345
        L 550, 795
        A 25 25 0 0 1 525, 820
        L 75, 820
        A 25 25 0 0 1 50, 795
        L 50, 345
        C 50, 320 50, 295 65, 280
        C 110, 235 170, 200 220, 150
        C 255, 110 285, 65 300, 35
        Z
      `.trim().replace(/\s+/g, ' ');

    // 5. البطاقة المستطيلة المشطوفة الزوايا (Chamfered Luxury Plaque)
    case 'chamfered-plaque':
      return `
        M 130, 45
        L 470, 45
        C 490, 45 505, 50 515, 60
        L 540, 85
        C 550, 95 555, 110 555, 130
        L 555, 730
        C 555, 750 550, 765 540, 775
        L 515, 800
        C 505, 810 490, 815 470, 815
        L 130, 815
        C 110, 815 95, 810 85, 800
        L 60, 775
        C 50, 765 45, 750 45, 730
        L 45, 130
        C 45, 110 50, 95 60, 85
        L 85, 60
        C 95, 50 110, 45 130, 45
        Z
      `.trim().replace(/\s+/g, ' ');

    // 6. بطاقة الكبسولة الطولية (Vertical Pill / Capsule Suite)
    case 'vertical-capsule':
    case 'capsule-suite':
      return `
        M 60, 280
        A 240 240 0 0 1 540, 280
        L 540, 580
        A 240 240 0 0 1 60, 580
        L 60, 280
        Z
      `.trim().replace(/\s+/g, ' ');

    // 7. بطاقة القفل بالوردة البارزة / قفل الشق الأوسط (Slit-Lock Gatefold)
    case 'slit-lock-gatefold':
    case 'arch-gatefold-lily':
      return `
        M 50, 290
        A 250 250 0 0 1 550, 290
        L 550, 795
        A 25 25 0 0 1 525, 820
        L 75, 820
        A 25 25 0 0 1 50, 795
        Z
      `.trim().replace(/\s+/g, ' ');

    // 8. جيب القصر المعماري ذو النافذة والختم (Arch Window Pocket)
    case 'arch-window-pocket':
      return `
        M 50, 290
        A 250 250 0 0 1 550, 290
        L 550, 810
        L 50, 810
        Z
      `.trim().replace(/\s+/g, ' ');

    // 9. طقم الإطار الفيكتوري والشرابة (Baroque Tassel Tag)
    case 'baroque-tassel-tag':
      return `
        M 300, 60
        C 330, 60 360, 70 380, 95
        C 410, 130 430, 180 430, 240
        L 430, 730
        C 430, 765 400, 795 360, 795
        L 240, 795
        C 200, 795 170, 765 170, 730
        L 170, 240
        C 170, 180 190, 130 220, 95
        C 240, 70 270, 60 300, 60
        Z
      `.trim().replace(/\s+/g, ' ');

    // 10. علبة التوزيعات الهندسية (Favor Box Dieline)
    case 'favor-box-dieline':
    case 'dome-favor-box':
      return `
        M 200, 100
        L 400, 100
        L 480, 240
        L 540, 430
        L 480, 620
        L 400, 760
        L 200, 760
        L 120, 620
        L 60, 430
        L 120, 240
        Z
      `.trim().replace(/\s+/g, ' ');

    // 11. بطاقة حزام الستان (Ribbon Belly Band Card)
    case 'ribbon-belly-band':
      return `
        M 70, 65
        L 530, 65
        A 25 25 0 0 1 555, 90
        L 555, 770
        A 25 25 0 0 1 530, 795
        L 70, 795
        A 25 25 0 0 1 45, 770
        L 45, 90
        A 25 25 0 0 1 70, 65
        Z
      `.trim().replace(/\s+/g, ' ');

    // 12. طقم القوس المزدوج المتداخل (Double Half Arch)
    case 'double-half-arch':
      return `
        M 60, 320
        A 240 240 0 0 1 540, 320
        L 540, 800
        A 20 20 0 0 1 520, 820
        L 80, 820
        A 20 20 0 0 1 60, 800
        Z
      `.trim().replace(/\s+/g, ' ');

    // 13. لوحة البجع الملكي (Twin Swans Vista)
    case 'twin-swans-vista':
      return `
        M 50, 280
        A 250 250 0 0 1 550, 280
        L 550, 800
        L 50, 800
        Z
      `.trim().replace(/\s+/g, ' ');

    // 14. بطاقة القفص الهندسي السداسي (Hexagon Terrarium)
    case 'hexagon-terrarium':
      return `
        M 300, 50
        L 540, 240
        L 540, 620
        L 300, 810
        L 60, 620
        L 60, 240
        Z
      `.trim().replace(/\s+/g, ' ');

    // 15. تاق التقويم المصغر (Calendar Date Tag)
    case 'calendar-tag':
    case 'song-wave-tag':
      return `
        M 180, 50
        L 420, 50
        A 30 30 0 0 1 450, 80
        L 450, 780
        A 30 30 0 0 1 420, 810
        L 180, 810
        A 30 30 0 0 1 150, 780
        L 150, 80
        A 30 30 0 0 1 180, 50
        Z
      `.trim().replace(/\s+/g, ' ');

    // 17. بطاقة عود الثقاب والفتيل (Matchstick Candle Card)
    case 'matchstick-candle':
      return `
        M 100, 60
        L 500, 60
        A 40 40 0 0 1 540, 100
        L 540, 760
        A 40 40 0 0 1 500, 800
        L 100, 800
        A 40 40 0 0 1 60, 760
        L 60, 100
        A 40 40 0 0 1 100, 60
        Z
      `.trim().replace(/\s+/g, ' ');

    // 18. مروحة البتلة ذات المقبض المدمج (Integrated Handle Fan)
    case 'integrated-handle-fan':
      return `
        M 300, 40
        C 350, 40 400, 65 440, 110
        C 480, 160 510, 230 500, 310
        C 490, 390 440, 460 390, 530
        C 370, 560 350, 600 345, 670
        L 345, 780
        C 345, 805 325, 820 300, 820
        C 275, 820 255, 805 255, 780
        L 255, 670
        C 250, 600 230, 560 210, 530
        C 160, 460 110, 390 100, 310
        C 90, 230 120, 160 160, 110
        C 200, 65 250, 40 300, 40
        Z
      `.trim().replace(/\s+/g, ' ');

    // 19. بطاقة الطاولة الهرمية (Tent Table Stand)
    case 'tent-table-stand':
      return `
        M 80, 120
        L 520, 120
        A 30 30 0 0 1 550, 150
        L 550, 710
        A 30 30 0 0 1 520, 740
        L 80, 740
        A 30 30 0 0 1 50, 710
        L 50, 150
        A 30 30 0 0 1 80, 120
        Z
      `.trim().replace(/\s+/g, ' ');

    // 21. دعوة السحب البيضاوية بتاج الورد وجيب الإبهام (Pull-Out Oval + Pocket)
    case 'pullout-oval':
    case 'pullout-floral-oval':
      return `
        M 300, 45
        C 360, 45 420, 70 470, 120
        C 520, 180 545, 270 545, 430
        C 545, 590 520, 680 470, 740
        C 420, 790 360, 815 300, 815
        C 240, 815 180, 790 130, 740
        C 80, 680 55, 590 55, 430
        C 55, 270 80, 180 130, 120
        C 180, 70 240, 45 300, 45
        Z
      `.trim().replace(/\s+/g, ' ');

    // 22. البطاقة الدائرية بشلال الورد الجانبي (Circular Right-Edge Cascade)
    case 'circular-cascade':
    case 'circular-rose-cascade':
      return `
        M 300, 60
        A 230 230 0 0 1 490, 180
        C 525, 220 540, 260 515, 310
        C 540, 360 545, 420 520, 470
        C 545, 520 535, 580 510, 630
        C 525, 680 505, 730 455, 770
        A 230 230 0 0 1 150, 730
        A 230 230 0 0 1 150, 140
        A 230 230 0 0 1 300, 60
        Z
      `.trim().replace(/\s+/g, ' ');

    // 23. المطوية غير المتماثلة (Asymmetric Gatefold)
    case 'asymmetric-gatefold':
    case 'asymmetric-olive-gatefold':
    case 'asymmetric-forest-gatefold-suite':
      return `
        M 65, 60
        L 515, 60
        A 20 20 0 0 1 535, 80
        L 535, 780
        A 20 20 0 0 1 515, 800
        L 65, 800
        A 20 20 0 0 1 45, 780
        L 45, 80
        A 20 20 0 0 1 65, 60
        Z
      `.trim().replace(/\s+/g, ' ');

    // 24. بطاقة إثراء العربية الكلاسيكية المذهبة (Classic Arabic Royal Geometric Card)
    case 'classic-ithra-gold-card':
      return `
        M 300, 50
        C 390, 50 470, 90 510, 150
        L 510, 190
        L 535, 215
        L 535, 785
        A 20 20 0 0 1 515, 805
        L 85, 805
        A 20 20 0 0 1 65, 785
        L 65, 215
        L 90, 190
        L 90, 150
        C 130, 90 210, 50 300, 50
        Z
      `.trim().replace(/\s+/g, ' ');

    // 25. بطانة الظرف الداخلية المقوسة (Geometric Envelope Liner)
    case 'geometric-envelope-liner':
    case 'architectural-lined-envelope-suite':
      return `
        M 70, 240
        L 300, 70
        L 530, 240
        L 530, 785
        A 20 20 0 0 1 510, 805
        L 90, 805
        A 20 20 0 0 1 70, 785
        Z
      `.trim().replace(/\s+/g, ' ');

    // 26. طقم جيب السحب بأخدود الإبهام والختم الشمعي (Thumb-Notch Sleeve Suite)
    case 'thumb-notch-sleeve-suite':
      return `
        M 70, 70
        L 240, 70
        A 60 60 0 0 0 360, 70
        L 530, 70
        A 20 20 0 0 1 550, 90
        L 550, 785
        A 20 20 0 0 1 530, 805
        L 70, 805
        A 20 20 0 0 1 50, 785
        L 50, 90
        A 20 20 0 0 1 70, 70
        Z
      `.trim().replace(/\s+/g, ' ');

    // 20. بطاقة الطي المزدوج المفتوحة (Bifold Brand Card)
    case 'bifold-brand-card':
    case 'french-envelope-suite':
    case 'interactive-quiz-props':
    case 'petal-cone-sparkler':
    default:
      return `
        M 70, 65
        L 530, 65
        A 25 25 0 0 1 555, 90
        L 555, 770
        A 25 25 0 0 1 530, 795
        L 70, 795
        A 25 25 0 0 1 45, 770
        L 45, 90
        A 25 25 0 0 1 70, 65
        Z
      `.trim().replace(/\s+/g, ' ');
  }
}

/**
 * Returns inner offset gold foil filigree border path string
 * Uses concentric scaling centered at (300, 430)
 */
export function getInnerOffsetTransform(scale = 0.94): string {
  return `translate(300, 430) scale(${scale}) translate(-300, -430)`;
}

export const TEMPLATE_DIELINES: Record<MasterTemplateId, TemplateDielineGeometry> = {
  // 10 MASTER STRUCTURAL SVG TEMPLATES (ETSY BEST-SELLERS):
  'royal-arch': {
    id: 'royal-arch',
    nameAr: 'القوس الملكي الكلاسيكي',
    nameEn: 'Symmetric Royal Arch Card',
    path: getOuterCutPath('royal-arch'),
    widthMM: 95,
    heightMM: 135
  },
  'pullout-oval': {
    id: 'pullout-oval',
    nameAr: 'بطاقة بيضاوية داخل جيب سحب',
    nameEn: 'Pull-Out Oval + Thumb-Notch Pocket',
    path: getOuterCutPath('pullout-oval'),
    widthMM: 95,
    heightMM: 135
  },
  'circular-cascade': {
    id: 'circular-cascade',
    nameAr: 'بطاقة دائرية ببروز جانبي للورد',
    nameEn: 'Circular Right-Edge Cascade',
    path: getOuterCutPath('circular-cascade'),
    widthMM: 95,
    heightMM: 135
  },
  'asymmetric-gatefold': {
    id: 'asymmetric-gatefold',
    nameAr: 'مطوية غير متماثلة تفتح من الجانب',
    nameEn: 'Asymmetric Gatefold',
    path: getOuterCutPath('asymmetric-gatefold'),
    widthMM: 95,
    heightMM: 135
  },
  'french-scallop': {
    id: 'french-scallop',
    nameAr: 'مروحة البتلات الفرنسية المتموجة',
    nameEn: 'French Scalloped Fan',
    path: getOuterCutPath('french-scallop'),
    widthMM: 95,
    heightMM: 135
  },
  'slit-lock-gatefold': {
    id: 'slit-lock-gatefold',
    nameAr: 'مطوية البوابة ذات قفل الشق الأوسط',
    nameEn: 'Slit-Lock Gatefold Card',
    path: getOuterCutPath('slit-lock-gatefold'),
    widthMM: 95,
    heightMM: 135
  },
  'vertical-capsule': {
    id: 'vertical-capsule',
    nameAr: 'بطاقة الكبسولة الطولية المنحنية',
    nameEn: 'Vertical Capsule / Pill',
    path: getOuterCutPath('vertical-capsule'),
    widthMM: 95,
    heightMM: 135
  },
  'geometric-envelope-liner': {
    id: 'geometric-envelope-liner',
    nameAr: 'بطانة الظرف الداخلية المقوسة',
    nameEn: 'Geometric Envelope Liner',
    path: getOuterCutPath('geometric-envelope-liner'),
    widthMM: 95,
    heightMM: 135
  },

  // 2. البطاقة الفيكتورية المموجة (Legacy)
  'scalloped-badge': {
    id: 'scalloped-badge',
    nameAr: 'البطاقة الفيكتورية المموجة',
    nameEn: 'Symmetric Scalloped Badge',
    path: getOuterCutPath('scalloped-badge'),
    widthMM: 95,
    heightMM: 135
  },

  // 3. مروحة البتلة الكلاسيكية
  'floral-fan': {
    id: 'floral-fan',
    nameAr: 'مروحة البتلة الكلاسيكية',
    nameEn: 'Symmetric Scalloped Fan',
    path: getOuterCutPath('floral-fan'),
    widthMM: 95,
    heightMM: 135,
    hasPunchHole: true,
    holeX: 300,
    holeY: 785,
    holeRadius: 4.5
  },

  // 4. بطاقة القبة الإسلامية
  'islamic-dome': {
    id: 'islamic-dome',
    nameAr: 'بطاقة القبة الإسلامية الأندلسية',
    nameEn: 'Islamic Dome Arch Card',
    path: getOuterCutPath('islamic-dome'),
    widthMM: 95,
    heightMM: 135
  },

  // 5. البطاقة المستطيلة المشطوفة الزوايا
  'chamfered-plaque': {
    id: 'chamfered-plaque',
    nameAr: 'البطاقة المشطوفة الزوايا',
    nameEn: 'Chamfered Luxury Plaque',
    path: getOuterCutPath('chamfered-plaque'),
    widthMM: 95,
    heightMM: 135
  },

  // 6. بطاقة الكبسولة الطولية
  'capsule-suite': {
    id: 'capsule-suite',
    nameAr: 'بطاقة الكبسولة الطولية',
    nameEn: 'Vertical Pill / Capsule Suite',
    path: getOuterCutPath('capsule-suite'),
    widthMM: 95,
    heightMM: 135
  },

  // 7. بطاقة القفل بالوردة البارزة
  'arch-gatefold-lily': {
    id: 'arch-gatefold-lily',
    nameAr: 'بطاقة القفل بالوردة البارزة',
    nameEn: 'Slit-Lock Lily Gatefold Card',
    path: getOuterCutPath('arch-gatefold-lily'),
    widthMM: 95,
    heightMM: 135,
    slitCut: { x1: 220, y1: 430, x2: 380, y2: 430 }
  },

  // 8. جيب القصر المعماري ذو النافذة والختم
  'arch-window-pocket': {
    id: 'arch-window-pocket',
    nameAr: 'جيب القصر المعماري ذو النافذة',
    nameEn: 'Arch Window Pocket Suite',
    path: getOuterCutPath('arch-window-pocket'),
    widthMM: 95,
    heightMM: 135
  },

  // 9. طقم الإطار الفيكتوري والشرابة الحريرية
  'baroque-tassel-tag': {
    id: 'baroque-tassel-tag',
    nameAr: 'طقم الإطار الفيكتوري والشرابة',
    nameEn: 'Baroque Frame Tag + Tassel',
    path: getOuterCutPath('baroque-tassel-tag'),
    widthMM: 65,
    heightMM: 120,
    hasPunchHole: true,
    holeX: 300,
    holeY: 90,
    holeRadius: 4.0
  },

  // 10. علبة التوزيعات الهندسية هرمية الإغلاق
  'favor-box-dieline': {
    id: 'favor-box-dieline',
    nameAr: 'علبة التوزيعات الهندسية',
    nameEn: 'Favor Box Dieline Suite',
    path: getOuterCutPath('favor-box-dieline'),
    widthMM: 100,
    heightMM: 140
  },

  // 11. بطاقة حزام الستان المطبوع
  'ribbon-belly-band': {
    id: 'ribbon-belly-band',
    nameAr: 'بطاقة حزام الستان المطبوع',
    nameEn: 'Ribbon Belly Band Card',
    path: getOuterCutPath('ribbon-belly-band'),
    widthMM: 95,
    heightMM: 135
  },

  // 12. طقم القوس المزدوج المتداخل
  'double-half-arch': {
    id: 'double-half-arch',
    nameAr: 'طقم القوس المزدوج المتداخل',
    nameEn: 'Double Half-Arch Suite',
    path: getOuterCutPath('double-half-arch'),
    widthMM: 95,
    heightMM: 135
  },

  // 13. لوحة البجع الملكي وقصر البحيرة
  'twin-swans-vista': {
    id: 'twin-swans-vista',
    nameAr: 'لوحة البجع الملكي وقصر البحيرة',
    nameEn: 'Twin Swans Vista Card',
    path: getOuterCutPath('twin-swans-vista'),
    widthMM: 95,
    heightMM: 135
  },

  // 14. بطاقة القفص الهندسي السداسي
  'hexagon-terrarium': {
    id: 'hexagon-terrarium',
    nameAr: 'بطاقة القفص الهندسي السداسي',
    nameEn: 'Hexagon Terrarium Card',
    path: getOuterCutPath('hexagon-terrarium'),
    widthMM: 95,
    heightMM: 135
  },

  // 15. تاق التقويم المصغر ذو التثقيب المزدوج
  'calendar-tag': {
    id: 'calendar-tag',
    nameAr: 'تاق التقويم المصغر المزدوج',
    nameEn: 'Mini Calendar Date Tag',
    path: getOuterCutPath('calendar-tag'),
    widthMM: 50,
    heightMM: 85,
    hasPunchHole: true,
    holeX: 300,
    holeY: 75,
    holeRadius: 3.5
  },

  // 16. تاق النبض الصوتي والباركود الموسيقي
  'song-wave-tag': {
    id: 'song-wave-tag',
    nameAr: 'تاق النبض الصوتي والباركود',
    nameEn: 'Songwave Audio Frequency Tag',
    path: getOuterCutPath('song-wave-tag'),
    widthMM: 50,
    heightMM: 85,
    hasPunchHole: true,
    holeX: 300,
    holeY: 75,
    holeRadius: 3.5
  },

  // 17. بطاقة الاحتفال بعود الثقاب والفتيل
  'matchstick-candle': {
    id: 'matchstick-candle',
    nameAr: 'بطاقة الشمعة وعود الثقاب',
    nameEn: 'Matchstick & Candle Card',
    path: getOuterCutPath('matchstick-candle'),
    widthMM: 85,
    heightMM: 125,
    hasPunchHole: true,
    holeX: 300,
    holeY: 280,
    holeRadius: 3.0
  },

  // 18. مروحة البتلة ذات المقبض المدمج
  'integrated-handle-fan': {
    id: 'integrated-handle-fan',
    nameAr: 'مروحة البتلة ذات المقبض المدمج',
    nameEn: 'Integrated Handle Scalloped Fan',
    path: getOuterCutPath('integrated-handle-fan'),
    widthMM: 95,
    heightMM: 140,
    hasPunchHole: true,
    holeX: 300,
    holeY: 795,
    holeRadius: 4.0
  },

  // 19. بطاقة الطاولة الهرمية ذات القوس
  'tent-table-stand': {
    id: 'tent-table-stand',
    nameAr: 'بطاقة الطاولة الهرمية المقوسة',
    nameEn: 'Arched Table Tent Stand',
    path: getOuterCutPath('tent-table-stand'),
    widthMM: 85,
    heightMM: 120
  },

  // 20. بطاقة الطي المزدوج المفتوحة
  'bifold-brand-card': {
    id: 'bifold-brand-card',
    nameAr: 'بطاقة الطي المزدوج المفتوحة',
    nameEn: 'Bifold Brand Card',
    path: getOuterCutPath('bifold-brand-card'),
    widthMM: 95,
    heightMM: 135
  },

  // Extended specialty suites
  'petal-cone-sparkler': {
    id: 'petal-cone-sparkler',
    nameAr: 'قمع البتلات لمفرقعات الشرر',
    nameEn: 'Petal Cone Sparkler Holder',
    path: getOuterCutPath('petal-cone-sparkler'),
    widthMM: 80,
    heightMM: 130
  },
  'dome-favor-box': {
    id: 'dome-favor-box',
    nameAr: 'علبة القبة المعمارية للمسك',
    nameEn: 'Dome Favor Box',
    path: getOuterCutPath('dome-favor-box'),
    widthMM: 95,
    heightMM: 135
  },
  'french-envelope-suite': {
    id: 'french-envelope-suite',
    nameAr: 'طقم المظروف الفرنسي الملكي',
    nameEn: 'French Envelope 5-Piece Suite',
    path: getOuterCutPath('french-envelope-suite'),
    widthMM: 95,
    heightMM: 135
  },
  'interactive-quiz-props': {
    id: 'interactive-quiz-props',
    nameAr: 'بطاقات الألعاب التفاعلية',
    nameEn: 'Interactive Event Quiz Cards',
    path: getOuterCutPath('interactive-quiz-props'),
    widthMM: 65,
    heightMM: 95
  },

  // 4 Top Arabic & Etsy Best-Selling Structural Templates
  'pullout-floral-oval': {
    id: 'pullout-floral-oval',
    nameAr: 'دعوة السحب البيضاوية بتاج الورد',
    nameEn: 'Pull-Out Floral Crown Oval',
    path: getOuterCutPath('pullout-floral-oval'),
    widthMM: 95,
    heightMM: 135
  },
  'circular-rose-cascade': {
    id: 'circular-rose-cascade',
    nameAr: 'البطاقة الدائرية بشلال الورد الجانبي',
    nameEn: 'Circular Card with Right-Edge Rose Cascade',
    path: getOuterCutPath('circular-rose-cascade'),
    widthMM: 120,
    heightMM: 120
  },
  'asymmetric-olive-gatefold': {
    id: 'asymmetric-olive-gatefold',
    nameAr: 'المطوية الخضراء غير المتماثلة بالشريطة',
    nameEn: 'Asymmetric Olive Gatefold',
    path: getOuterCutPath('asymmetric-olive-gatefold'),
    widthMM: 95,
    heightMM: 135
  },
  'classic-ithra-gold-card': {
    id: 'classic-ithra-gold-card',
    nameAr: 'بطاقة إثراء العربية الكلاسيكية المذهبة',
    nameEn: 'Classic Arabic Royal Geometric Card',
    path: getOuterCutPath('classic-ithra-gold-card'),
    widthMM: 95,
    heightMM: 135
  },
  'architectural-lined-envelope-suite': {
    id: 'architectural-lined-envelope-suite',
    nameAr: 'طقم المظروف المعماري والبطانة الموردة',
    nameEn: 'Architectural Lined Envelope Suite',
    path: getOuterCutPath('architectural-lined-envelope-suite'),
    widthMM: 95,
    heightMM: 135
  },
  'thumb-notch-sleeve-suite': {
    id: 'thumb-notch-sleeve-suite',
    nameAr: 'طقم جيب السحب بأخدود الإبهام',
    nameEn: 'Thumb-Notch Sleeve Suite',
    path: getOuterCutPath('thumb-notch-sleeve-suite'),
    widthMM: 95,
    heightMM: 135
  },
  'asymmetric-forest-gatefold-suite': {
    id: 'asymmetric-forest-gatefold-suite',
    nameAr: 'طقم البوابة غير المتماثلة وشريطة الستان',
    nameEn: 'Asymmetric Forest Gatefold Suite',
    path: getOuterCutPath('asymmetric-forest-gatefold-suite'),
    widthMM: 95,
    heightMM: 135
  }
};
