import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface TwinSwansPieceProps {
  state: StudioState;
}

/**
 * Template 10: بطاقة البجعتين المتقابلتين (Twin Swans Emblem Card)
 * - Sculpted contour die-cut card: two facing royal swans forming a heart silhouette at the top.
 * - Intricate feather etching, crown medallion, and gold foil typography.
 */
export const TwinSwansPiece: React.FC<TwinSwansPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#5E6B38';
  const artworkCol = state.artworkColor || '#D4AF37';
  const secondaryCol = state.secondaryPieceColor || '#FAFAFA';
  const textCol = state.textColor || '#F5E6C8';

  // Swan Heart Contour Dieline Path
  // Width: 380, Height: 580, Centered around x=300, y=120
  const swanCardContourPath = `
    M 300, 155
    C 290, 140 270, 115 240, 115
    C 200, 115 175, 145 170, 185
    C 165, 225 185, 275 210, 315
    C 150, 310 115, 345 110, 395
    C 105, 450 110, 520 120, 600
    C 125, 645 155, 700 300, 700
    C 445, 700 475, 645 480, 600
    C 490, 520 495, 450 490, 395
    C 485, 345 450, 310 390, 315
    C 415, 275 435, 225 430, 185
    C 425, 145 400, 115 360, 115
    C 330, 115 310, 140 300, 155
    Z
  `;

  return (
    <g id="template-twin-swans" className="template-twin-swans">
      {/* ====================================================================
          1. PAPER BACKDROP
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="swans-backdrop">
          <path
            d={swanCardContourPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path
              d={swanCardContourPath}
              fill="url(#paper-texture-pattern)"
              opacity="0.35"
            />
          )}

          {/* Inner Contour Gold Line */}
          <path
            d={swanCardContourPath}
            fill="none"
            stroke={artworkCol}
            strokeWidth="1.2"
            transform="scale(0.96) translate(12, 22)"
            opacity="0.75"
          />
        </g>
      )}

      {/* ====================================================================
          2. SWANS DETAILED FEATHER LINE ART & WATER RIPPLES
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="swans-artwork">
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'watercolor-swan-palace'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={artworkCol}
            templateId={state.activeTemplateId}
          />

          {/* Royal Crown Resting at the Beak Meeting Point (x=300, y=140) */}
          <g transform="translate(300, 135)" fill={artworkCol} stroke={artworkCol}>
            <path
              d="M -16, 8 L -20, -6 L -10, 0 L 0, -10 L 10, 0 L 20, -6 L 16, 8 Z"
              fill={artworkCol}
              strokeWidth="0.8"
            />
            <circle cx="-20" cy="-7" r="1.5" />
            <circle cx="0" cy="-11" r="2" />
            <circle cx="20" cy="-7" r="1.5" />
          </g>

          {/* Left Swan Graceful Neck & Feathers */}
          <g stroke={artworkCol} strokeWidth="1.2" fill="none">
            {/* Neck inner curve */}
            <path d="M 292, 160 C 275, 135 240, 135 220, 175 C 205, 205 210, 250 235, 290" />
            {/* Wing feather arches */}
            <path d="M 235, 290 C 200, 295 160, 315 140, 360 C 130, 400 135, 450 145, 500" strokeWidth="0.8" />
            <path d="M 220, 310 C 185, 320 155, 350 150, 420" strokeWidth="0.6" strokeDasharray="3, 2" />
            <path d="M 205, 330 C 175, 345 165, 390 165, 450" strokeWidth="0.6" strokeDasharray="3, 2" />
          </g>

          {/* Right Swan Graceful Neck & Feathers */}
          <g stroke={artworkCol} strokeWidth="1.2" fill="none">
            {/* Neck inner curve */}
            <path d="M 308, 160 C 325, 135 360, 135 380, 175 C 395, 205 390, 250 365, 290" />
            {/* Wing feather arches */}
            <path d="M 365, 290 C 400, 295 440, 315 460, 360 C 470, 400 465, 450 455, 500" strokeWidth="0.8" />
            <path d="M 380, 310 C 415, 320 445, 350 450, 420" strokeWidth="0.6" strokeDasharray="3, 2" />
            <path d="M 395, 330 C 425, 345 435, 390 435, 450" strokeWidth="0.6" strokeDasharray="3, 2" />
          </g>

          {/* Base Water Ripples & Lily Pads (y=640~670) */}
          <g stroke={artworkCol} strokeWidth="0.8" fill="none" opacity="0.6">
            <path d="M 220, 650 Q 300, 660 380, 650" />
            <path d="M 250, 665 Q 300, 672 350, 665" strokeWidth="0.5" />
            <circle cx="300" cy="655" r="3" fill={artworkCol} />
          </g>
        </g>
      )}

      {/* ====================================================================
          3. TYPOGRAPHY LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="swans-text">
          {/* Central Monogram Crest between Swan Necks */}
          <g transform="translate(300, 245)">
            <circle cx="0" cy="0" r="34" fill="none" stroke={artworkCol} strokeWidth="1.2" />
            <circle cx="0" cy="0" r="30" fill="none" stroke={artworkCol} strokeWidth="0.5" strokeDasharray="2, 2" />
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fill={artworkCol}
              fontFamily={state.monogram.fontFamily}
              fontSize={state.monogram.fontSize * 0.85}
              fontWeight="bold"
            >
              {state.monogram.text}
            </text>
          </g>

          {/* Greeting */}
          <text
            x="300"
            y="330"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.greeting.fontFamily}
            fontSize={Math.min(state.greeting.fontSize, 15)}
            fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
            letterSpacing={state.greeting.letterSpacing}
          >
            {state.greeting.text}
          </text>

          {/* Main Couple Names */}
          <text
            x="300"
            y="395"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize * 0.95}
            fontWeight="bold"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
          >
            {state.names.text}
          </text>

          {/* Date */}
          <text
            x="300"
            y="450"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.date.fontFamily}
            fontSize={Math.min(state.date.fontSize, 13)}
            letterSpacing={state.date.letterSpacing}
            opacity="0.95"
          >
            {state.date.text}
          </text>

          {/* Location */}
          <text
            x="300"
            y="485"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.location.fontFamily}
            fontSize={Math.min(state.location.fontSize, 12)}
            letterSpacing={state.location.letterSpacing}
          >
            {state.location.text}
          </text>
        </g>
      )}

      {/* ====================================================================
          4. CUT / DIELINE LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-twin-swans" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          <path
            d={swanCardContourPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {state.activeLayerMode === 'cut' && (
            <text
              x="300"
              y="745"
              textAnchor="middle"
              fill="#FF0000"
              fontSize="11"
              fontFamily="Cairo, sans-serif"
            >
              بطاقة البجعتين المتقابلتين (Twin Swans Contour Dieline) - 14×19 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
