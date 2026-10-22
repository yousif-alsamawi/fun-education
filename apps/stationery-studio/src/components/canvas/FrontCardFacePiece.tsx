import React from 'react';
import { StudioState } from '../../types/studio';
import { getOuterCutPath, getInnerOffsetTransform, TEMPLATE_DIELINES } from '../../utils/templateDielines';
import { getEtsyAssetById } from '../../data/etsyAssetGallery';
import {
  renderWeddingDingbatSvg,
  renderWaxSealSvg,
  renderRibbonBowSvg,
  renderPolaroidFrameSvg
} from '../../data/builtInLuxuryAssets';
import { InterlockingMonogramSvg } from './InterlockingMonogramSvg';
import { QrCodeSvg } from './QrCodeSvg';

interface FrontCardFacePieceProps {
  state: StudioState;
}

export const FrontCardFacePiece: React.FC<FrontCardFacePieceProps> = ({ state }) => {
  const geom = TEMPLATE_DIELINES[state.activeTemplateId] || TEMPLATE_DIELINES['royal-arch'];
  const cutPath = getOuterCutPath(state.activeTemplateId, 600, 860);

  const cardBase = state.cardBaseColor || '#FAF7F2';
  const artworkCol = state.artworkColor || '#D4AF37';
  const textCol = state.textColor || '#2D1B22';

  const isFoil = state.isFoilEnabled;
  const foilGrad =
    state.hotFoilType === 'gold-24k'
      ? 'url(#foil-mirror-gold-24k)'
      : state.hotFoilType === 'rose-gold'
      ? 'url(#foil-rose-gold)'
      : state.hotFoilType === 'platinum-silver'
      ? 'url(#foil-platinum-silver)'
      : 'url(#foil-antique-copper)';

  const isBotanical = state.designSchoolTheme === 'fine-art-botanical';
  const isMinimalist = state.designSchoolTheme === 'modern-minimalist';

  // Resolve Real High-Resolution Etsy Gallery Asset
  const activeEtsyAsset = !isMinimalist ? getEtsyAssetById(state.activeFloralArtworkId) : undefined;
  const activeImageUrl = state.customBackgroundImage || activeEtsyAsset?.imageUrl;
  const imageOpacity = state.bgImageOpacity ?? (activeEtsyAsset?.defaultOpacity ?? 0.88);

  const namesFill = isMinimalist
    ? (isFoil && state.foilTargets?.names ? foilGrad : textCol)
    : isBotanical
    ? textCol
    : (isFoil && state.foilTargets?.names ? foilGrad : textCol);

  const namesFilter = isMinimalist && state.enableLetterpressEmboss
    ? 'url(#letterpress-emboss)'
    : !isBotanical && isFoil && state.foilTargets?.names
    ? 'url(#foil-emboss-bevel)'
    : undefined;

  const bordersStroke = isMinimalist
    ? artworkCol
    : !isBotanical && isFoil && state.foilTargets?.frame
    ? foilGrad
    : artworkCol;

  const bordersFilter = !isBotanical && !isMinimalist && isFoil && state.foilTargets?.frame ? 'url(#foil-emboss-bevel)' : undefined;

  const paperFilter =
    state.activeLayerMode === 'mockup'
      ? state.paperStock === 'linen-weave'
        ? 'url(#paper-stock-linen)'
        : state.paperStock === 'pearl-shimmer'
        ? 'url(#paper-stock-pearl)'
        : state.paperStock === 'rustic-kraft'
        ? 'url(#paper-stock-kraft)'
        : state.paperStock === 'translucent-vellum'
        ? 'url(#paper-stock-vellum)'
        : state.paperStock === 'silk-matte'
        ? 'url(#paper-stock-matte)'
        : 'url(#paper-stock-cotton)'
      : undefined;

  // Curated Watercolor Wash Gradient stops
  const bgStyle = state.curatedBgStyle || 'blush-rose';

  // Smart Image Placement & Masking Dimensions (10mm band / 70% center canvas)
  const placementMode = state.imagePlacementMode || 'full-card';
  const borderPct = Math.min(0.35, Math.max(0.10, (state.imageBorderThickness || 15) / 100));
  const insetX = Math.round(600 * borderPct);
  const insetY = Math.round(860 * borderPct);
  const centerW = 600 - 2 * insetX;
  const centerH = 860 - 2 * insetY;

  // Header type
  const headerType = state.calligraphyHeaderType || 'dawah-circle';

  // Micro-Positioning Transform Offsets
  const monoX = state.monogramOffset?.x || 0;
  const monoY = state.monogramOffset?.y || 0;
  const monoScale = state.monogramOffset?.scale || 1;
  const monoRot = state.monogramOffset?.rotation || 0;

  const namesX = state.namesOffset?.x || 0;
  const namesY = state.namesOffset?.y || 0;
  const namesScale = state.namesOffset?.scale || 1;
  const namesRot = state.namesOffset?.rotation || 0;

  const detailsX = state.detailsOffset?.x || 0;
  const detailsY = state.detailsOffset?.y || 0;
  const detailsScale = state.detailsOffset?.scale || 1;

  // Monogram Crest Styles Renderer
  const renderMonogramCrest = () => {
    const crestStyle = state.monogramCrestStyle || 'royal-circle';
    const initial1 = state.monogramBuilder?.initial1 || 'S';
    const initial2 = state.monogramBuilder?.initial2 || 'K';
    const ampersand = state.monogramBuilder?.ampersand || '&';

    if (crestStyle === 'custom-svg' && state.customMonogramSvg) {
      return <g dangerouslySetInnerHTML={{ __html: state.customMonogramSvg }} />;
    }

    if (crestStyle === 'laurel-wreath') {
      return (
        <g id="crest-laurel-wreath">
          <path d="M-5,32 C-28,26 -44,5 -42,-22 C-41,-32 -32,-42 -22,-46 C-20,-38 -24,-28 -28,-18 C-32,5 -18,22 -2,28 Z" fill={artworkCol} opacity="0.8" />
          <path d="M5,32 C28,26 44,5 42,-22 C41,-32 32,-42 22,-46 C20,-38 24,-28 28,-18 C32,5 18,22 2,28 Z" fill={artworkCol} opacity="0.8" />
          <circle cx="0" cy="33" r="2.5" fill={artworkCol} />
          <text x="0" y="8" textAnchor="middle" fill={isFoil ? foilGrad : artworkCol} filter={bordersFilter} fontFamily={state.monogram.fontFamily || '"Playfair Display", serif'} fontSize="26" fontWeight="bold">
            {headerType === 'dawah-circle' ? 'دَعْوَة' : `${initial1} ${ampersand} ${initial2}`}
          </text>
        </g>
      );
    }

    if (crestStyle === 'geometric-hexagon') {
      return (
        <g id="crest-geometric-hexagon">
          <polygon points="0,-45 39,-22.5 39,22.5 0,45 -39,22.5 -39,-22.5" fill={cardBase} stroke={bordersStroke} strokeWidth="1.4" filter={bordersFilter} />
          <polygon points="0,-39 34,-19.5 34,19.5 0,39 -34,19.5 -34,-19.5" fill="none" stroke={bordersStroke} strokeWidth="0.7" strokeDasharray="3, 2" opacity="0.8" />
          <text x="0" y="8" textAnchor="middle" fill={isFoil ? foilGrad : artworkCol} filter={bordersFilter} fontFamily={state.monogram.fontFamily || '"Playfair Display", serif'} fontSize="24" fontWeight="bold">
            {headerType === 'dawah-circle' ? 'دَعْوَة' : `${initial1}${initial2}`}
          </text>
        </g>
      );
    }

    if (crestStyle === 'baroque-shield') {
      return (
        <g id="crest-baroque-shield">
          <path d="M-36,-40 L36,-40 Q40,0 28,25 Q0,48 0,48 Q0,48 -28,25 Q-40,0 -36,-40 Z" fill={cardBase} stroke={bordersStroke} strokeWidth="1.4" filter={bordersFilter} />
          <path d="M-14,-42 L-10,-48 L0,-43 L10,-48 L14,-42 Z" fill={artworkCol} />
          <text x="0" y="6" textAnchor="middle" fill={isFoil ? foilGrad : artworkCol} filter={bordersFilter} fontFamily={state.monogram.fontFamily || '"Playfair Display", serif'} fontSize="24" fontWeight="bold">
            {headerType === 'dawah-circle' ? 'دَعْوَة' : `${initial1}${ampersand}${initial2}`}
          </text>
        </g>
      );
    }

    if (crestStyle === 'minimalist-oval') {
      return (
        <g id="crest-minimalist-oval">
          <ellipse cx="0" cy="0" rx="42" ry="34" fill={cardBase} stroke={bordersStroke} strokeWidth="0.9" />
          <text x="0" y="7" textAnchor="middle" fill={isFoil ? foilGrad : textCol} fontFamily={state.monogram.fontFamily || '"Playfair Display", serif'} fontSize="23" fontWeight="bold" letterSpacing="1">
            {headerType === 'dawah-circle' ? 'دَعْوَة' : `${initial1} & ${initial2}`}
          </text>
        </g>
      );
    }

    // Default: Royal Circle
    return (
      <g id="crest-royal-circle">
        <circle cx="0" cy="0" r="46" fill={cardBase} stroke={bordersStroke} strokeWidth="1.3" filter={bordersFilter} />
        <circle cx="0" cy="0" r="41" fill="none" stroke={bordersStroke} strokeWidth="0.8" strokeDasharray="3.5, 2.5" opacity="0.8" />
        <circle cx="0" cy="0" r="36" fill="none" stroke={bordersStroke} strokeWidth="0.6" opacity="0.5" />
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fill={isFoil ? foilGrad : artworkCol}
          filter={bordersFilter}
          fontFamily="'Aref Ruqaa', 'Amiri', serif"
          fontSize="30"
          fontWeight="bold"
          letterSpacing="2"
        >
          {headerType === 'dawah-circle' ? 'دَعْوَة' : `${initial1} & ${initial2}`}
        </text>
      </g>
    );
  };

  return (
    <g id="front-card-face-piece" className="front-card-face-piece">
      <defs>
        {/* Silhouette Clip for the Front Card */}
        <clipPath id="front-card-silhouette-clip">
          <path d={cutPath} />
        </clipPath>

        {/* 1. Mask: 4 Outer Edges Only (Center masked 100% clean for text) */}
        <mask id="smart-4edges-mask">
          <rect width="600" height="860" fill="#FFFFFF" />
          {/* Inner Clean Center Cutout with smooth rounded corners */}
          <rect
            x={insetX}
            y={insetY}
            width={centerW}
            height={centerH}
            rx="28"
            ry="28"
            fill="#000000"
          />
        </mask>

        {/* 2. Mask: 4 Corners Only */}
        <mask id="smart-4corners-mask">
          <rect width="600" height="860" fill="#000000" />
          <circle cx="0" cy="0" r="230" fill="#FFFFFF" />
          <circle cx="600" cy="0" r="230" fill="#FFFFFF" />
          <circle cx="0" cy="860" r="230" fill="#FFFFFF" />
          <circle cx="600" cy="860" r="230" fill="#FFFFFF" />
        </mask>

        {/* 3. Mask: Right Edge Cascade Only (Left 70% clean) */}
        <mask id="smart-right-edge-mask">
          <rect width="600" height="860" fill="#000000" />
          <rect x="370" y="0" width="230" height="860" fill="#FFFFFF" />
        </mask>

        {/* 4. Mask: Top Crown & Bottom Footer Only (Center clean) */}
        <mask id="smart-top-bottom-mask">
          <rect width="600" height="860" fill="#000000" />
          <rect x="0" y="0" width="600" height="230" fill="#FFFFFF" />
          <rect x="0" y="660" width="600" height="200" fill="#FFFFFF" />
        </mask>

        {/* 5. Mask: Diagonal Corners Only (Top-Right & Bottom-Left) */}
        <mask id="smart-diagonal-corners-mask">
          <rect width="600" height="860" fill="#000000" />
          <circle cx="600" cy="0" r="260" fill="#FFFFFF" />
          <circle cx="0" cy="860" r="260" fill="#FFFFFF" />
        </mask>

        {/* Curated Soft Watercolor Wash Gradients */}
        <radialGradient id="curated-wash-radial" cx="50%" cy="30%" r="65%">
          {bgStyle === 'royal-emerald' ? (
            <>
              <stop offset="0%" stopColor="#0F291E" stopOpacity="0.14" />
              <stop offset="50%" stopColor="#0F291E" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#0F291E" stopOpacity="0" />
            </>
          ) : bgStyle === 'soft-sage' ? (
            <>
              <stop offset="0%" stopColor="#4A5D23" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#4A5D23" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#4A5D23" stopOpacity="0" />
            </>
          ) : bgStyle === 'champagne-gold' ? (
            <>
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.16" />
              <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#B76E79" stopOpacity="0.14" />
              <stop offset="55%" stopColor="#B76E79" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#B76E79" stopOpacity="0" />
            </>
          )}
        </radialGradient>
      </defs>

      {/* ====================================================================
          LAYER 0: Paper Backdrop & Textured Fill (Mockup & Print)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="front-layer-backdrop">
          {/* Main Solid Paper Silhouette with Hyper-Realistic Studio Ambient Shadow */}
          <path
            d={cutPath}
            fill={cardBase}
            filter={
              state.displayMode !== 'print-canvas' && state.activeLayerMode === 'mockup'
                ? 'url(#photorealistic-mockup-shadow)'
                : state.activeLayerMode === 'mockup'
                ? 'url(#studio-ambient-shadow)'
                : undefined
            }
          />

          {/* Physical Tactile Paper Texture Filter */}
          {state.activeLayerMode === 'mockup' && paperFilter && (
            <path
              d={cutPath}
              fill={cardBase}
              filter={paperFilter}
              opacity="0.88"
            />
          )}

          {/* Micro-grain fiber texture pattern */}
          {state.activeLayerMode === 'mockup' && (
            <path
              d={cutPath}
              fill="url(#paper-texture-pattern)"
              opacity="0.32"
            />
          )}

          {/* Outer Borders: Minimalist hairline, Botanical delicate, or Royal double gold foil */}
          {isMinimalist ? (
            <path
              d={cutPath}
              fill="none"
              stroke={bordersStroke}
              strokeWidth="0.8"
              opacity="0.45"
              transform={getInnerOffsetTransform(0.96)}
            />
          ) : isBotanical ? (
            <path
              d={cutPath}
              fill="none"
              stroke={artworkCol}
              strokeWidth="0.5"
              opacity="0.32"
              transform={getInnerOffsetTransform(0.95)}
            />
          ) : (
            <>
              <path
                d={cutPath}
                fill="none"
                stroke={bordersStroke}
                strokeWidth="1.4"
                opacity="0.85"
                transform={getInnerOffsetTransform(0.94)}
                filter={bordersFilter}
              />
              <path
                d={cutPath}
                fill="none"
                stroke={bordersStroke}
                strokeWidth="0.75"
                strokeDasharray="4, 4"
                opacity="0.6"
                transform={getInnerOffsetTransform(0.92)}
                filter={bordersFilter}
              />
            </>
          )}
        </g>
      )}

      {/* ====================================================================
          LAYER 1: Artwork & Real Etsy Asset Gallery Image Layer with Smart Masking
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="front-layer-artwork" clipPath="url(#front-card-silhouette-clip)">
          {/* 1. Curated Soft Watercolor Wash (Non-minimalist) */}
          {!isMinimalist && (
            <circle cx="300" cy="350" r="420" fill="url(#curated-wash-radial)" />
          )}

          {/* 1.5. Polaroid Photo Frame (Save The Date photo & wax seal) */}
          {state.polaroidConfig?.enabled && (
            renderPolaroidFrameSvg(
              300,
              260,
              230,
              270,
              state.polaroidConfig.showTopWaxStamp,
              state.polaroidConfig.photoUrl
            )
          )}

          {/* 2. Real High-Resolution Image Overlay (Etsy Asset Gallery / Custom Upload) */}
          {!isMinimalist && activeImageUrl && (
            <g id="etsy-real-artwork-layer">
              <image
                href={activeImageUrl}
                x="0"
                y="0"
                width="600"
                height="860"
                preserveAspectRatio="xMidYMid slice"
                opacity={imageOpacity}
                mask={
                  placementMode === '4-edges-frame'
                    ? 'url(#smart-4edges-mask)'
                    : placementMode === '4-corners'
                    ? 'url(#smart-4corners-mask)'
                    : placementMode === 'right-edge'
                    ? 'url(#smart-right-edge-mask)'
                    : placementMode === 'top-bottom'
                    ? 'url(#smart-top-bottom-mask)'
                    : placementMode === 'diagonal-corners'
                    ? 'url(#smart-diagonal-corners-mask)'
                    : undefined
                }
              />

              {/* 4-Edges Mode: Inner pristine center panel to guarantee 100% text readability */}
              {placementMode === '4-edges-frame' && (
                <g id="smart-4edges-clean-center">
                  {/* 100% Opaque Solid Center Panel (Blocks all artwork/distractions) */}
                  <rect
                    x={insetX}
                    y={insetY}
                    width={centerW}
                    height={centerH}
                    rx="24"
                    ry="24"
                    fill={cardBase}
                    opacity="1.0"
                  />
                  {/* Outer Beveled Hairline */}
                  <rect
                    x={insetX}
                    y={insetY}
                    width={centerW}
                    height={centerH}
                    rx="24"
                    ry="24"
                    fill="none"
                    stroke={bordersStroke}
                    strokeWidth="1.2"
                    opacity="0.85"
                  />
                  {/* Inner Concentric Hairline */}
                  <rect
                    x={insetX + 6}
                    y={insetY + 6}
                    width={centerW - 12}
                    height={centerH - 12}
                    rx="18"
                    ry="18"
                    fill="none"
                    stroke={bordersStroke}
                    strokeWidth="0.6"
                    strokeDasharray="4, 3"
                    opacity="0.6"
                  />
                </g>
              )}
            </g>
          )}

          {/* Symmetrical Classical Corner Flourishes & Filigree (Gold Foil) - Royal Classic Only */}
          {!isBotanical && !isMinimalist && (
            <g id="classical-filigree-accents" stroke={bordersStroke} fill="none" opacity="0.65" filter={bordersFilter}>
              {/* Top Ornamental Cartouche Arch */}
              <path d="M 230, 95 Q 300, 70 370, 95" strokeWidth="1.2" />
              <circle cx="300" cy="80" r="3" fill={artworkCol} />
              <circle cx="280" cy="82" r="1.5" fill={artworkCol} />
              <circle cx="320" cy="82" r="1.5" fill={artworkCol} />

              {/* Bottom Ornamental Filigree Base */}
              <path d="M 220, 765 Q 300, 785 380, 765" strokeWidth="1.2" />
              <circle cx="300" cy="775" r="3" fill={artworkCol} />
            </g>
          )}
        </g>
      )}

      {/* ====================================================================
          LAYER 2: Authentic Arabic Wedding Typography Architecture
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="front-layer-text" className="front-layer-text select-none">
          {/* 1. TOP CALLIGRAPHIC HEADER / MONOGRAM CREST EMBLEM with Micro-Positioning */}
          {headerType !== 'none' && (
            <g
              id="top-crest-group"
              transform={`translate(${300 + monoX}, ${115 + monoY}) scale(${monoScale}) rotate(${monoRot})`}
            >
              {headerType === 'dawah-circle' ? (
                renderMonogramCrest()
              ) : headerType === 'basmala' ? (
                <text
                  x="0"
                  y="8"
                  textAnchor="middle"
                  fill={isFoil ? foilGrad : artworkCol}
                  filter={bordersFilter}
                  fontFamily="'Amiri', 'Aref Ruqaa', serif"
                  fontSize="24"
                  fontWeight="bold"
                  letterSpacing="1"
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </text>
              ) : (
                /* headerType === 'monogram' */
                renderMonogramCrest()
              )}
            </g>
          )}

          {/* 2. Welcome Line / Greeting */}
          <text
            x="300"
            y={headerType === 'none' ? 140 : 190}
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.greeting.fontFamily || 'Amiri, serif'}
            fontSize={state.greeting.fontSize || 17}
            fontWeight="bold"
            letterSpacing={state.greeting.letterSpacing || 1}
          >
            {state.greeting.text || 'بكل الحب والتقدير نتشرف بدعوتكم لحضور حفل زفاف'}
          </text>

          {/* 3. Quranic / Blessing Verse */}
          <text
            x="300"
            y={headerType === 'none' ? 175 : 225}
            textAnchor="middle"
            fill={textCol}
            fontFamily="'Amiri', 'Cairo', serif"
            fontSize="13"
            fontWeight="600"
            letterSpacing="1"
            opacity="0.85"
          >
            ✦ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ✦
          </text>

          {/* 4. Classical Gold Divider Flourish */}
          <g id="front-divider-flourish" transform={`translate(300, ${headerType === 'none' ? 215 : 265})`} filter={bordersFilter}>
            <path
              d="M -110,0 Q -55,-6 0,0 Q 55,-6 110,0"
              fill="none"
              stroke={bordersStroke}
              strokeWidth="1.2"
              opacity="0.8"
            />
            <circle cx="0" cy="0" r="3" fill={artworkCol} />
            <circle cx="-55" cy="-3" r="1.5" fill={artworkCol} />
            <circle cx="55" cy="-3" r="1.5" fill={artworkCol} />
          </g>

          {/* 4.5. Wedding Dingbats & Royal Emblems */}
          {state.weddingDingbatId && state.weddingDingbatId !== 'none' && (
            <g id="front-wedding-dingbat">
              {renderWeddingDingbatSvg(
                state.weddingDingbatId,
                state,
                300,
                headerType === 'none' ? 245 : 290
              )}
            </g>
          )}

          {/* 5. Bride & Groom Full Names (Primary Arabic Typography) with Micro-Positioning */}
          <g
            id="front-names-group"
            transform={`translate(${300 + namesX}, ${(headerType === 'none' ? 295 : 340) + namesY}) scale(${namesScale}) rotate(${namesRot})`}
          >
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill={namesFill}
              filter={namesFilter}
              fontFamily={state.names.fontFamily || '"Aref Ruqaa", serif'}
              fontSize={state.names.fontSize || 42}
              fontWeight={state.names.isBold ? 'bold' : 'normal'}
              letterSpacing={state.names.letterSpacing || 2}
            >
              {state.names.text || 'سراج & بركات'}
            </text>
          </g>

          {/* 6. Invitation Paragraph */}
          <text
            x="300"
            y={headerType === 'none' ? 350 : 395}
            textAnchor="middle"
            fill={textCol}
            fontFamily="Cairo, sans-serif"
            fontSize="12.5"
            fontWeight="500"
            letterSpacing="1"
            opacity="0.88"
          >
            {state.invitationParagraph || 'وذلك بمشيئة الله تعالى وتوفيقه، لتكتمل فرحتنا بلقياكم وسماع أصدق دعواتكم'}
          </text>

          {/* 7. STRUCTURED 3-COLUMN EVENT ICON GRID with Micro-Positioning */}
          {(state.show3ColumnIconBar ?? true) ? (
            <g id="arabic-3column-event-grid" transform={`translate(${300 + detailsX}, ${480 + detailsY}) scale(${detailsScale})`}>
              {/* Card Container */}
              <rect
                x="-245"
                y="-38"
                width="490"
                height="76"
                rx="16"
                fill={cardBase}
                stroke={bordersStroke}
                strokeWidth="0.9"
                opacity="0.92"
                filter={state.activeLayerMode === 'mockup' ? 'url(#studio-ambient-shadow)' : undefined}
              />

              {/* Vertical Dividers */}
              <line x1="-80" y1="-24" x2="-80" y2="24" stroke={bordersStroke} strokeWidth="0.8" strokeDasharray="2, 2" opacity="0.6" />
              <line x1="80" y1="-24" x2="80" y2="24" stroke={bordersStroke} strokeWidth="0.8" strokeDasharray="2, 2" opacity="0.6" />

              {/* RIGHT COLUMN: Calendar 📅 Day & Date */}
              <g transform="translate(162, 0)">
                <text y="-10" textAnchor="middle" fontSize="15">📅</text>
                <text y="7" textAnchor="middle" fill={textCol} fontSize="11" fontWeight="bold" fontFamily="Cairo, sans-serif">
                  {state.eventDayAndDate || state.date.text || 'يوم السبت | 01.08.2026'}
                </text>
                <text y="22" textAnchor="middle" fill={artworkCol} fontSize="9" fontWeight="bold" fontFamily="Cairo, sans-serif">
                  اليوم والتاريخ
                </text>
              </g>

              {/* CENTER COLUMN: Location Pin 📍 Venue */}
              <g transform="translate(0, 0)">
                <text y="-10" textAnchor="middle" fontSize="15">📍</text>
                <text y="7" textAnchor="middle" fill={textCol} fontSize="11" fontWeight="bold" fontFamily="Tajawal, sans-serif">
                  {state.eventVenue || state.location.text || 'قاعة فرح - شارع الجامعة'}
                </text>
                <text y="22" textAnchor="middle" fill={artworkCol} fontSize="9" fontWeight="bold" fontFamily="Cairo, sans-serif">
                  المكان والقاعة
                </text>
              </g>

              {/* LEFT COLUMN: Clock 🕗 Time */}
              <g transform="translate(-162, 0)">
                <text y="-10" textAnchor="middle" fontSize="15">🕗</text>
                <text y="7" textAnchor="middle" fill={textCol} fontSize="11" fontWeight="bold" fontFamily="Cairo, sans-serif">
                  {state.eventTime || 'الساعة 8:00 مساءً'}
                </text>
                <text y="22" textAnchor="middle" fill={artworkCol} fontSize="9" fontWeight="bold" fontFamily="Cairo, sans-serif">
                  الموعد المحدد
                </text>
              </g>
            </g>
          ) : (
            /* Fallback single date pill */
            <g id="front-event-date" transform="translate(300, 480)">
              <rect
                x="-140"
                y="-16"
                width="280"
                height="32"
                rx="16"
                fill={cardBase}
                stroke={bordersStroke}
                strokeWidth="0.8"
                opacity="0.85"
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fill={textCol}
                fontFamily={state.date.fontFamily || 'Cairo, sans-serif'}
                fontSize={state.date.fontSize || 14}
                fontWeight="bold"
                letterSpacing="1.5"
              >
                {state.date.text || 'السبت، ٠١ أغسطس ٢٠٢٦ م'}
              </text>
            </g>
          )}

          {/* 8. CLASSIC CALLIGRAPHIC FOOTER (وبحضوركم يتم لنا الفرح والسرور) */}
          <text
            x="300"
            y="600"
            textAnchor="middle"
            fill={isFoil ? foilGrad : artworkCol}
            filter={bordersFilter}
            fontFamily="'Aref Ruqaa', 'Amiri', serif"
            fontSize="18"
            fontWeight="bold"
            letterSpacing="1.5"
          >
            {state.closingVerse || 'وَبِحُضُورِكُمْ يَتِمُّ لَنَا الفَرَحُ وَالسُّرُورُ'}
          </text>

          {/* 9. Host / Caller Name */}
          <text
            x="300"
            y="640"
            textAnchor="middle"
            fill={textCol}
            fontFamily="Cairo, sans-serif"
            fontSize="13"
            fontWeight="bold"
            letterSpacing="1"
          >
            {state.hostName || 'الداعي: الحاج زياد قاسم خطيب / محبكم'}
          </text>

          {/* 10. QR Code (if enabled) */}
          {state.qrCode.enabled && (
            <g id="front-qr-code" transform="translate(0, 0)">
              <QrCodeSvg
                config={state.qrCode}
                primaryColor={artworkCol}
                accentColor={cardBase}
                x={state.qrCode.position === 'bottom-right' ? 440 : state.qrCode.position === 'top-left' ? 75 : 268}
                y={state.qrCode.position === 'top-left' ? 95 : 680}
              />
            </g>
          )}

          {/* 11. 3D Satin Ribbon Bow */}
          {state.ribbonConfig?.enabled && (
            <g id="front-ribbon-bow">
              {renderRibbonBowSvg(state.ribbonConfig.color, 300, 420, 1.05)}
            </g>
          )}

          {/* 12. 3D Wax Seal Stamp */}
          {state.waxSealConfig?.enabled && (
            <g id="front-wax-seal">
              {renderWaxSealSvg(
                state.waxSealConfig.style,
                state.waxSealConfig.initials || 'S & K',
                300,
                state.waxSealConfig.position === 'top' ? 115 : state.waxSealConfig.position === 'bottom' ? 735 : 430,
                (state.waxSealConfig.size || 48) / 48
              )}
            </g>
          )}
        </g>
      )}

      {/* ====================================================================
          LAYER 3: Precision Cut Dieline (LayerMode: 'cut' or overlay)
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g
          id="front-layer-cut"
          opacity={state.activeLayerMode === 'cut' ? 1 : 0.25}
          pointerEvents="none"
        >
          {/* Main Outer Perimeter Cut Line (Solid Red #FF0000) */}
          <path
            d={cutPath}
            fill="none"
            stroke="#FF0000"
            strokeWidth={state.activeLayerMode === 'cut' ? 1.5 : 0.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Punch Hole if template has one */}
          {geom.hasPunchHole && geom.holeX !== undefined && geom.holeY !== undefined && (
            <circle
              cx={geom.holeX}
              cy={geom.holeY}
              r={geom.holeRadius || 4.5}
              fill="none"
              stroke="#FF0000"
              strokeWidth={state.activeLayerMode === 'cut' ? 1.5 : 0.75}
            />
          )}
        </g>
      )}
    </g>
  );
};
