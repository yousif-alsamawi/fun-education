import {
  ArtworkPatternStyle,
  CuratedBgStyle,
  MasterTemplateId,
  PaperTexture,
  SecondaryPieceType,
  StudioState,
  TypographyLayout
} from '../types/studio';
import { FONT_OPTIONS, LUXURY_THEMES, MASTER_TEMPLATES } from '../data/templates';

const TEMPLATE_IDS: MasterTemplateId[] = [
  'royal-arch',
  'scalloped-badge',
  'floral-fan',
  'islamic-dome',
  'chamfered-plaque',
  'capsule-suite'
];

const CURATED_BG_STYLES: CuratedBgStyle[] = [
  'blush-rose',
  'royal-emerald',
  'soft-sage',
  'champagne-gold'
];

const PATTERN_STYLES: ArtworkPatternStyle[] = [
  'vintage-baroque',
  'moroccan-geometric',
  'olive-lily-branches',
  'petal-veins'
];

const PAPER_TEXTURES: PaperTexture[] = ['cotton', 'linen', 'pearl', 'matte'];

/**
 * Procedural Design & Die-Cut Remix Engine
 * Combines dieline shapes, artwork patterns, luxury color palettes, typography, and accessories
 */
export function generateProceduralDesign(currentState: StudioState): Partial<StudioState> {
  // 1. Pick a different template from the 6 symmetric luxury wedding templates
  const availableTemplates = TEMPLATE_IDS.filter((id) => id !== currentState.activeTemplateId);
  const nextTemplateId = availableTemplates[Math.floor(Math.random() * availableTemplates.length)] || TEMPLATE_IDS[0];
  const templateInfo = MASTER_TEMPLATES.find((t) => t.id === nextTemplateId) || MASTER_TEMPLATES[0];

  // 2. Pick a harmonious luxury theme from the 12 Etsy themes
  const randomTheme = LUXURY_THEMES[Math.floor(Math.random() * LUXURY_THEMES.length)];
  const randomBgStyle = CURATED_BG_STYLES[Math.floor(Math.random() * CURATED_BG_STYLES.length)];

  // 3. Select matching secondary structural piece
  let secondaryPiece: SecondaryPieceType = 'none';
  if (nextTemplateId === 'floral-fan') secondaryPiece = 'date-ring';

  // 4. Select matching artwork pattern
  let pattern: ArtworkPatternStyle = randomTheme.patternStyle;

  // 5. Select typography font pairings
  const arabicFonts = FONT_OPTIONS.filter((f) => f.lang === 'ar');
  const latinFonts = FONT_OPTIONS.filter((f) => f.lang === 'en');
  const namesFont = arabicFonts[Math.floor(Math.random() * arabicFonts.length)].fontFamily;
  const greetingFont = arabicFonts[Math.floor(Math.random() * arabicFonts.length)].fontFamily;
  const monogramFont = latinFonts[Math.floor(Math.random() * latinFonts.length)].fontFamily;

  // 6. Paper texture
  const texture = randomTheme.paperTexture || PAPER_TEXTURES[Math.floor(Math.random() * PAPER_TEXTURES.length)];

  // 7. Typography Layout
  let typoLayout: TypographyLayout = 'centered-royal';
  if (nextTemplateId === 'floral-fan') typoLayout = 'curved-path';
  else if (nextTemplateId === 'double-half-arch') typoLayout = 'editorial-asymmetric';

  const generatedThemeName = `${templateInfo.nameAr} + ${randomTheme.nameAr}`;

  return {
    activeTemplateId: nextTemplateId,
    selectedSizeId: templateInfo.defaultSizeId,
    templateType: templateInfo.category === 'packaging' ? 'packaging' : templateInfo.hasSecondaryPiece ? 'composite' : 'flat',
    isAssemblyMode: true,

    // Colors
    selectedPaletteId: randomTheme.id,
    cardBaseColor: randomTheme.cardBaseColor,
    artworkColor: randomTheme.artworkColor,
    artworkGradientEnd: randomTheme.artworkGradientEnd || randomTheme.artworkColor,
    secondaryPieceColor: randomTheme.secondaryPieceColor,
    textColor: randomTheme.textColor,
    foilEffect: randomTheme.foil,
    paperTexture: texture,
    curatedBgStyle: randomBgStyle,
    customBackgroundImage: undefined,

    // Structural Accessories
    secondaryPieceType: secondaryPiece,
    artworkPatternStyle: pattern,
    typographyLayout: typoLayout,
    activeAiThemeName: generatedThemeName,

    // Text bindings
    names: {
      ...currentState.names,
      fontFamily: namesFont,
      color: randomTheme.textColor,
      fontSize: 32
    },
    greeting: {
      ...currentState.greeting,
      fontFamily: greetingFont,
      color: randomTheme.textColor
    },
    monogram: {
      ...currentState.monogram,
      fontFamily: monogramFont,
      color: randomTheme.artworkColor
    },
    date: {
      ...currentState.date,
      color: randomTheme.textColor
    },
    location: {
      ...currentState.location,
      color: randomTheme.artworkColor
    },
    ringDate: {
      ...currentState.ringDate,
      color: randomTheme.textColor
    },
    qrCode: {
      ...currentState.qrCode,
      color: randomTheme.textColor
    },

    // Dedicated Back Card Design (Synchronized with luxury theme)
    backDesign: {
      ...currentState.backDesign,
      backgroundColor: randomTheme.backBackgroundColor || randomTheme.secondaryPieceColor || '#58111A',
      artworkColor: randomTheme.backArtworkColor || randomTheme.accentColor || '#D4AF37'
    },

    // Interactive states
    isFlowerInserted: true,
    isGatefoldOpen: false,
    isPocketOpen: false,
    isRibbonWrapped: true,
    sparklerAttached: true,
    matchstickAttached: true,
    isBifoldOpen: true,
    tableStandSubStyle: 'arch-tent'
  };
}
