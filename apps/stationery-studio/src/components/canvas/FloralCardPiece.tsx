import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface FloralCardPieceProps {
  state: StudioState;
}

/**
 * Piece 1: Main Floral Card (Updated with Multi-Layer Colors & Dynamic Patterns)
 * - Card Base Color: state.cardBaseColor
 * - Artwork Pattern: ArtworkPatterns component with state.artworkColor / state.artworkGradientEnd
 * - Monogram, Greeting, Names, Dates: state.textColor / state.artworkColor
 * - Dielines: state.dielineStrokeColor
 */
export const FloralCardPiece: React.FC<FloralCardPieceProps> = ({ state }) => {
  // Scalloped floral fan dieline path (Width ~ 580, Height ~ 820)
  const petalDielinePath = `
    M 300, 30
    C 370, 30 430, 45 490, 85
    C 545, 125 575, 195 570, 275
    C 565, 345 535, 400 550, 480
    C 565, 560 555, 640 500, 710
    C 455, 770 385, 810 300, 810
    C 215, 810 145, 770 100, 710
    C 45, 640 35, 560 50, 480
    C 65, 400 35, 345 30, 275
    C 25, 195 55, 125 110, 85
    C 170, 45 230, 30 300, 30
    Z
  `;

  // Eyelet rivet hole mark at bottom right petal corner for Piece 2 assembly
  const eyeletX = 460;
  const eyeletY = 690;
  const eyeletRadius = 4;

  const cardBase = state.cardBaseColor || '#FDFBF7';
  const artworkCol = state.artworkColor || '#8B1E3F';
  const textCol = state.textColor || '#6B0F2B';

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

  const isFoil = state.isFoilEnabled;
  const foilGrad =
    state.hotFoilType === 'gold-24k'
      ? 'url(#foil-mirror-gold-24k)'
      : state.hotFoilType === 'rose-gold'
      ? 'url(#foil-rose-gold)'
      : state.hotFoilType === 'platinum-silver'
      ? 'url(#foil-platinum-silver)'
      : 'url(#foil-antique-copper)';

  const monogramFill = isFoil && state.foilTargets?.monogram ? foilGrad : artworkCol;
  const monogramFilter = isFoil && state.foilTargets?.monogram ? 'url(#foil-emboss-bevel)' : undefined;

  const namesFill = isFoil && state.foilTargets?.names ? foilGrad : textCol;
  const namesFilter = isFoil && state.foilTargets?.names ? 'url(#foil-emboss-bevel)' : undefined;

  const bordersStroke = isFoil && state.foilTargets?.frame ? foilGrad : 'url(#dynamic-artwork-gradient)';
  const bordersFilter = isFoil && state.foilTargets?.frame
    ? 'url(#foil-emboss-bevel)'
    : state.enableLetterpressEmboss
    ? 'url(#letterpress-emboss)'
    : undefined;

  return (
    <g id="piece-1-floral-card" className="piece-floral-card">
      {/* 
        ========================================================================
        LAYER 0: Paper Background (Rendered with physical micro-texture & lighting)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-paper-backdrop">
          {/* Main Card Silhouette Base Fill with Studio Drop Shadow */}
          <path
            d={petalDielinePath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#studio-ambient-shadow)' : undefined}
          />
          {/* Physical tactile paper stock texture filter in mockup */}
          {state.activeLayerMode === 'mockup' && paperFilter && (
            <path
              d={petalDielinePath}
              fill={cardBase}
              filter={paperFilter}
              opacity="0.9"
            />
          )}
          {/* Micro-grain fiber texture pattern */}
          {state.activeLayerMode === 'mockup' && (
            <path
              d={petalDielinePath}
              fill="url(#paper-texture-pattern)"
              opacity="0.35"
            />
          )}
          {/* Subtle perimeter embossed border line */}
          <path
            d={petalDielinePath}
            fill="none"
            stroke={artworkCol}
            strokeWidth="1.2"
            opacity="0.35"
            transform="scale(0.98) translate(6, 9)"
            filter={bordersFilter}
          />
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 1: Artwork Layer (Dynamic Artwork Patterns & Crests)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-artwork" clipPath="url(#petal-card-clip)">
          {/* Background subtle radial wash */}
          <circle
            cx="300"
            cy="420"
            r="380"
            fill="url(#botanical-radial-glow)"
            opacity="0.25"
          />

          {/* DYNAMIC PATTERN STYLE (Petal Veins, Baroque Frame, Moroccan Geometric, or Olive Branches) */}
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'petal-veins'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={artworkCol}
            templateId={state.activeTemplateId}
          />

          {/* Luxury Monogram Cartouche / Crest Frame */}
          <g id="monogram-crest" transform="translate(300, 170)" filter={bordersFilter}>
            <path
              d="M 0,-48 L 48,0 L 0,48 L -48,0 Z"
              fill="none"
              stroke={bordersStroke}
              strokeWidth="1.5"
            />
            <path
              d="M 0,-43 L 43,0 L 0,43 L -43,0 Z"
              fill="none"
              stroke={bordersStroke}
              strokeWidth="0.6"
              strokeDasharray="2, 3"
            />
            <circle cx="0" cy="-48" r="3" fill={artworkCol} />
            <circle cx="48" cy="0" r="3" fill={artworkCol} />
            <circle cx="0" cy="48" r="3" fill={artworkCol} />
            <circle cx="-48" cy="0" r="3" fill={artworkCol} />
          </g>

          {/* Decorative divider ribbons */}
          <g id="divider-flourish" transform="translate(300, 310)" filter={bordersFilter}>
            <path
              d="M -120,0 Q -60,-8 0,0 Q 60,-8 120,0"
              fill="none"
              stroke={bordersStroke}
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="2.5" fill={artworkCol} />
            <circle cx="-60" cy="-4" r="1.5" fill={artworkCol} />
            <circle cx="60" cy="-4" r="1.5" fill={artworkCol} />
          </g>
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 2: Text Layer (Monogram, Greeting, Names, Date, Venue)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-text" className="layer-text-group">
          {/* Monogram Initial */}
          <text
            x="300"
            y="178"
            textAnchor="middle"
            fill={monogramFill}
            filter={monogramFilter}
            fontFamily={state.monogram.fontFamily}
            fontSize={state.monogram.fontSize}
            fontWeight={state.monogram.isBold ? 'bold' : 'normal'}
            letterSpacing={state.monogram.letterSpacing}
            className="select-none"
          >
            {state.monogram.text}
          </text>

          {/* Main Greeting Quote */}
          <text
            x="300"
            y="265"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.greeting.fontFamily}
            fontSize={state.greeting.fontSize}
            fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
            letterSpacing={state.greeting.letterSpacing}
            className="select-none"
          >
            {state.greeting.text}
          </text>

          {/* Main Names */}
          <text
            x="300"
            y="395"
            textAnchor="middle"
            fill={namesFill}
            filter={namesFilter}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize}
            fontWeight={state.names.isBold ? 'bold' : 'normal'}
            letterSpacing={state.names.letterSpacing}
            className="select-none"
          >
            {state.names.text}
          </text>

          {/* Event Date */}
          <text
            x="300"
            y="525"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.date.fontFamily}
            fontSize={state.date.fontSize}
            letterSpacing={state.date.letterSpacing}
            className="select-none"
          >
            {state.date.text}
          </text>

          {/* Event Venue / Location */}
          <text
            x="300"
            y="565"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.location.fontFamily}
            fontSize={state.location.fontSize}
            letterSpacing={state.location.letterSpacing}
            opacity="0.95"
            className="select-none"
          >
            {state.location.text}
          </text>
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 4: Cut Lines / Dieline Layer (Plotter Cameo/Skycut Hairline)
        ========================================================================
      */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g
          id="layer-cut-lines-piece1"
          className="layer-cutline"
          opacity={state.activeLayerMode === 'cut' ? 1 : 0.4}
        >
          {/* Main Outer Petal Scalloped Cut Path */}
          <path
            d={petalDielinePath}
            fill="none"
            stroke={state.dielineStrokeColor}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* Eyelet Punch Hole for Piece 2 Mechanical Rivet */}
          <circle
            cx={eyeletX}
            cy={eyeletY}
            r={eyeletRadius}
            fill="none"
            stroke={state.dielineStrokeColor}
            strokeWidth="0.75"
          />

          {state.activeLayerMode === 'cut' && (
            <text x="300" y="835" textAnchor="middle" fill="#E11D48" fontSize="9" fontFamily="Cairo, sans-serif">
              مسار قص كاميو / سكايكت - القطعة 1 (البطاقة المروحية) - 14×20 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
