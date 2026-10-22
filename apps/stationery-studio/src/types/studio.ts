export type LayerMode = 'mockup' | 'print' | 'cut';

export type DisplayMode = 'photorealistic-mockup' | 'print-canvas';

export type MockupBackdrop = 'linen-table' | 'carrara-marble' | 'dark-slate' | 'warm-wood' | 'studio-shadow';

export type MonogramCrestStyle =
  | 'royal-circle'
  | 'laurel-wreath'
  | 'geometric-hexagon'
  | 'baroque-shield'
  | 'minimalist-oval'
  | 'custom-svg';

export interface ElementTransformOffset {
  x: number;
  y: number;
  scale: number;
  rotation?: number;
}

export type TemplateType = 'composite' | 'flat' | 'packaging';

export type MasterTemplateId =
  // 10 Master Structural SVG Die-Cut Templates (Etsy Best-Sellers):
  | 'royal-arch'              // 1. القوس الملكي الكلاسيكي
  | 'pullout-oval'            // 2. بطاقة بيضاوية داخل جيب سحب مع حزة الإبهام
  | 'circular-cascade'        // 3. بطاقة دائرية ببروز جانبي للورد
  | 'asymmetric-gatefold'     // 4. مطوية غير متماثلة تفتح من الجانب
  | 'french-scallop'          // 5. مروحة البتلات الفرنسية المتموجة
  | 'islamic-dome'            // 6. بطاقة القبة المعمارية الإسلامية
  | 'slit-lock-gatefold'      // 7. مطوية البوابة ذات قفل الشق الأوسط
  | 'vertical-capsule'        // 8. بطاقة الكبسولة الطولية المنحنية
  | 'chamfered-plaque'        // 9. بطاقة اللوحة مشطوفة الزوايا
  | 'geometric-envelope-liner'// 10. بطانة الظرف الداخلية المقوسة
  // Aliases & Legacy IDs for backward compatibility:
  | 'scalloped-badge'
  | 'floral-fan'
  | 'capsule-suite'
  | 'arch-gatefold-lily'
  | 'arch-window-pocket'
  | 'baroque-tassel-tag'
  | 'favor-box-dieline'
  | 'ribbon-belly-band'
  | 'double-half-arch'
  | 'twin-swans-vista'
  | 'hexagon-terrarium'
  | 'calendar-tag'
  | 'song-wave-tag'
  | 'matchstick-candle'
  | 'integrated-handle-fan'
  | 'tent-table-stand'
  | 'bifold-brand-card'
  | 'petal-cone-sparkler'
  | 'dome-favor-box'
  | 'french-envelope-suite'
  | 'interactive-quiz-props'
  | 'pullout-floral-oval'
  | 'circular-rose-cascade'
  | 'asymmetric-olive-gatefold'
  | 'classic-ithra-gold-card'
  | 'architectural-lined-envelope-suite'
  | 'thumb-notch-sleeve-suite'
  | 'asymmetric-forest-gatefold-suite';

export type ActivePieceView = 'all' | 'piece-1' | 'piece-2' | 'piece-3';

export type DesignSchoolTheme = 'royal-classic' | 'fine-art-botanical' | 'modern-minimalist';

export type WeddingDingbatId = 'rings' | 'doves' | 'calendar-heart' | 'pearl-necklace' | 'floral-divider' | 'none';

export type WaxSealStyle = 'crimson' | 'gold' | 'emerald' | 'pearl' | 'none';

export type RibbonColor = 'forest-green' | 'burgundy' | 'champagne-gold' | 'none';

export interface WaxSealConfig {
  enabled: boolean;
  style: WaxSealStyle;
  initials: string;
  position: 'top' | 'center' | 'bottom';
  size?: number;
}

export interface RibbonConfig {
  enabled: boolean;
  color: RibbonColor;
  style: 'bow' | 'horizontal-band';
}

export interface PolaroidConfig {
  enabled: boolean;
  showTopWaxStamp: boolean;
  photoUrl?: string;
  caption?: string;
}

export type ImagePlacementMode =
  | '4-edges-frame'       // أطراف الورقة الأربعة فقط - مع تفريغ الوسط للنص
  | '4-corners'           // الزوايا الأربع فقط
  | 'right-edge'          // الطرف الأيمن العمودي فقط
  | 'top-bottom'          // التاج العلوي والطرف السفلي
  | 'diagonal-corners'    // الزاويتان المتقابلتان قُطرياً
  | 'full-card';          // كامل مساحة البطاقة

export type CalligraphyHeaderType =
  | 'dawah-circle'        // دَعْوَة في ختم دائري مذهب فاخر
  | 'basmala'             // بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ مذهبة
  | 'monogram'            // شعار المونوغرام الملكي للعروسين
  | 'none';

export type StudioUIMode = 'pro' | 'quick-fill';

export type SecondaryPieceType =
  | 'none'
  | 'date-ring'
  | 'flower-stem'
  | 'wax-seal'
  | 'silk-tassel'
  | 'belly-band-ribbon'
  | 'rsvp-half-arch'
  | 'gatefold-doors'
  | 'candle-wick-match'
  | 'oval-closure-seal'
  | 'table-tent-gusset'
  | 'popup-circle'
  | 'sparkler-stick'
  | 'cone-petal-holder'
  | 'envelope-liner';

export type ArtworkPatternStyle =
  | 'petal-veins'
  | 'vintage-baroque'
  | 'moroccan-geometric'
  | 'olive-lily-branches'
  | 'watercolor-swan-palace'
  | 'eucalyptus-terrarium'
  | 'soundwave-audio'
  | 'laser-lace';

export type TypographyLayout =
  | 'centered-royal'
  | 'curved-path'
  | 'editorial-asymmetric'
  | 'calendar-grid'
  | 'music-track';

export type PaperTexture = 'cotton' | 'linen' | 'pearl' | 'matte' | 'vellum' | 'kraft';

export type PaperStockType =
  | 'cotton-350'          // ورق قطني عالي الكثافة 350gsm Bridal Cotton Rag
  | 'cotton-300'          // ورق قطني بارز الملمس 300gsm Cold-Press
  | 'pearl-glossy'        // ورق قلوسي لامع للدعوات Pearl Glossy Bridal Stock
  | 'linen-weave'         // ورق كتان مضلع Linen Weave
  | 'pearl-shimmer'       // ورق لؤلؤي صدف Shimmer Stardream
  | 'silk-matte'          // ورق حريري مطفي Silk Matte
  | 'rustic-kraft'        // ورق كرافت طبيعي بري
  | 'translucent-vellum'; // ورق شفاف فيلوم ناعم

export type FoilEffect = 'gold' | 'rose-gold' | 'silver' | 'bronze' | 'none';

export type HotFoilType =
  | 'gold-24k'           // الذهب الملكي اللامع 24K Mirror Gold Foil
  | 'rose-gold'          // الذهب الوردي الفرشاتي Brushed Rose Gold
  | 'platinum-silver'    // الفضة البلاتينية اللامعة Platinum Silver
  | 'antique-copper'     // البرونز والفسفور المعتق Antique Copper
  | 'none';

export interface FoilTargets {
  monogram: boolean;
  names: boolean;
  frame: boolean;
  greeting: boolean;
}

export interface InterlockingMonogramConfig {
  enabled: boolean;
  layout: 'interlocking' | 'crest' | 'shield' | 'classic';
  initial1: string;
  initial2: string;
  ampersand: string;
  interlockOffset: number;
  showFloralWreath: boolean;
  useHotFoil: boolean;
  fontFamily: string;
  size: number;
}

export interface PrintBleedConfig {
  showBleed: boolean;
  showSafeZone: boolean;
  showRegistrationMarks: boolean;
  bleedMm: number;
}

export type QrPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'center-bottom' | 'ring-attachment';

export interface CardSize {
  id: string;
  nameAr: string;
  nameEn: string;
  widthCm: number;
  heightCm: number;
  widthMM: number;
  heightMM: number;
  aspectRatio: string;
  category: 'wedding' | 'invitation' | 'card' | 'tag' | 'box';
}

export type CardFaceView = 'front' | 'back' | 'both';

export type BackMinimalistStyle =
  | 'monogram-centered'    // 1. شعار ملكي بالمنتصف فقط
  | 'full-botanical-veins' // 2. لوحة عروق الورد الكاملة مع حرف واحد
  | 'solid-minimal-qr';    // 3. خلفية سادة فاخرة مع باركود صغير

export interface BackDesignConfig {
  style: BackMinimalistStyle;
  monogramText: string;
  monogramSize: number;
  fontFamily: string;
  backgroundColor: string;
  artworkColor: string;
  patternOpacity: number;
  showSmallDate: boolean;
  showSmallQr: boolean;
}

export interface LuxuryTheme {
  id: string;
  nameAr: string;
  nameEn: string;
  cardBaseColor: string;       // 1. لون أرضية الكرت الأساسي (الوجه الأمامي)
  artworkColor: string;        // 2. لون الزخارف والرسوم الفنية
  artworkGradientEnd?: string; // تدرج لوني إضافي للزخارف
  secondaryPieceColor: string; // 3. لون القطعة الإضافية / الحلقة
  textColor: string;           // 4. لون النصوص والشعار
  accentColor: string;         // لون اللمسة المعدنية / البصمة
  patternStyle: ArtworkPatternStyle;
  foil: FoilEffect;
  paperTexture: PaperTexture;
  description: string;
  tags: string[];
  // Back Face Contrasating Colors (فصل ألوان القفا)
  backBackgroundColor?: string;
  backArtworkColor?: string;
}

export type ColorPalette = LuxuryTheme;

export interface FontOption {
  id: string;
  nameAr: string;
  nameEn: string;
  fontFamily: string;
  lang: 'ar' | 'en' | 'bilingual';
  category: 'modern' | 'calligraphy' | 'classic' | 'script';
  sampleText: string;
}

export interface TextElementConfig {
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  letterSpacing: number;
  lineHeight: number;
  isBold?: boolean;
  isItalic?: boolean;
  rotation?: number;
}

export interface QrConfig {
  enabled: boolean;
  url: string;
  label: string;
  color: string;
  position: QrPosition;
  size: number;
}

export interface MasterTemplateInfo {
  id: MasterTemplateId;
  nameAr: string;
  nameEn: string;
  tagline: string;
  description: string;
  category: 'wedding' | 'invitations' | 'tags' | 'packaging' | 'suites' | 'tableware';
  defaultSizeId: string;
  badge: string;
  hasFoldLines?: boolean;
  hasSecondaryPiece?: boolean;
  isMultiPiece?: boolean;
  piecesCount?: number;
  piecesNames?: string[];
}

export type CuratedBgStyle = 'none' | 'blush-rose' | 'soft-sage' | 'champagne-gold' | 'royal-emerald';

export interface StudioState {
  // Active Template
  activeTemplateId: MasterTemplateId;

  // Multi-Piece Suite Piece Selector ('all' | 'piece-1' | 'piece-2' | 'piece-3')
  activePieceView?: ActivePieceView;

  // Master Design School Theme ('royal-classic' | 'fine-art-botanical')
  designSchoolTheme?: DesignSchoolTheme;

  // Full Suite Synchronization Mode ("📦 وضع البكج المتكامل")
  isFullSuiteMode: boolean;

  // Layer & View mode
  activeLayerMode: LayerMode;
  displayMode?: DisplayMode; // 'photorealistic-mockup' (منصة التصوير الفاخرة) vs 'print-canvas' (منصة الطباعة)
  mockupBackdrop?: MockupBackdrop;
  activeCardFace: CardFaceView; // 'front' | 'back' | 'both'
  isAssemblyMode: boolean; // True: assembled / closed mockup; False: exploded / flat cut sheet
  showGrid: boolean;
  showRuler: boolean;
  zoomLevel: number;

  // Structure & Size
  templateType: TemplateType;
  selectedSizeId: string;
  cardWidthMM: number;
  cardHeightMM: number;
  paperTexture: PaperTexture;
  foilEffect: FoilEffect;

  // Dedicated Back Design Configuration (فصل تام عن الوجه الأمامي)
  backDesign: BackDesignConfig;

  // Multi-Layer Color Control System
  cardBaseColor: string;
  artworkColor: string;
  artworkGradientEnd: string;
  secondaryPieceColor: string;
  textColor: string;
  artworkPatternStyle: ArtworkPatternStyle;
  secondaryPieceType: SecondaryPieceType;
  typographyLayout: TypographyLayout;

  // Active Theme / AI Generation
  selectedPaletteId: string;
  activeAiThemeName?: string;

  // High-Resolution Botanical / Background Image Layer (طبقة إدراج الخلفيات والورود الحقيقية للوجه والقفا)
  customBackgroundImage?: string;
  bgImageOpacity?: number;
  imagePlacementMode?: ImagePlacementMode;
  imageBorderThickness?: number; // 10 to 40 (e.g. 25%)
  imageEdgeScale?: number;       // 0.5 to 2.0 (e.g. 1.0)
  customBackBackgroundImage?: string;
  backBgImageOpacity?: number;
  backImagePlacementMode?: ImagePlacementMode;
  backImageBorderThickness?: number;
  backImageEdgeScale?: number;
  curatedBgStyle?: CuratedBgStyle;
  activeFloralArtworkId?: string;

  // 3D Wax Seals, Satin Ribbons, Dingbats & Polaroid Photo Frame
  weddingDingbatId?: WeddingDingbatId;
  waxSealConfig?: WaxSealConfig;
  ribbonConfig?: RibbonConfig;
  polaroidConfig?: PolaroidConfig;

  // Authentic Arabic Wedding Typography Architecture (هندسة الدعوة العربية الكلاسيكية)
  calligraphyHeaderType?: CalligraphyHeaderType;
  eventTime?: string;          // e.g. 'الثامنة مساءً'
  eventDayAndDate?: string;    // e.g. 'يوم السبت | 01.08.2026'
  eventVenue?: string;         // e.g. 'قاعة فرح - شارع الجامعة'
  closingVerse?: string;       // e.g. 'وَبِحُضُورِكُمْ يَتِمُّ لَنَا الفَرَحُ وَالسُّرُورُ'
  hostName?: string;           // e.g. 'الداعي: الحاج زياد قاسم خطيب / محبكم'
  show3ColumnIconBar?: boolean;
  invitationParagraph?: string;
  studioUIMode?: StudioUIMode;

  // Texts
  names: TextElementConfig;
  greeting: TextElementConfig;
  monogram: TextElementConfig;
  date: TextElementConfig;
  location: TextElementConfig;
  ringDate: TextElementConfig;

  // Date selection
  selectedIsoDate: string;

  // Interactive template states
  isFlowerInserted: boolean;   // Template 2: Lily sliding into slit
  isGatefoldOpen: boolean;     // Template 12: Doors opening / closed
  isPocketOpen: boolean;       // Template 3: Card sliding out of pocket
  isRibbonWrapped: boolean;    // Template 6: Ribbon band wrapped
  tableStandSubStyle: 'arch-tent' | 'popup-circle'; // Template 16: Table Stand sub-style
  isBifoldOpen: boolean;       // Template 20: Bifold card open/closed
  sparklerAttached: boolean;   // Template 18: Sparkler stick attached
  matchstickAttached: boolean; // Template 13: Real matchstick attached

  // Smart Add-ons
  qrCode: QrConfig;

  // Production & Bleed settings
  showCutMargins: boolean;
  bleedMm: number;
  dielineStrokeColor: string;  // Red '#FF0000'
  creaseStrokeColor: string;   // Blue dashed '#2563EB'

  // 1. Physical Paper Stock & 3D Lighting Engine
  paperStock: PaperStockType;
  enableLetterpressEmboss: boolean;
  lightingElevation: number;

  // 2. 7-Stop Specular Hot-Foil Stamping Engine
  isFoilEnabled: boolean;
  hotFoilType: HotFoilType;
  foilTargets: FoilTargets;

  // 3. Interlocking Monogram Builder
  monogramBuilder: InterlockingMonogramConfig;
  monogramCrestStyle?: MonogramCrestStyle;
  customMonogramSvg?: string;
  monogramOffset?: ElementTransformOffset;
  namesOffset?: ElementTransformOffset;
  detailsOffset?: ElementTransformOffset;
  curatedSuiteId?: string;

  // 4. Commercial Print & 3mm Bleed Architecture
  printBleedConfig: PrintBleedConfig;
}
