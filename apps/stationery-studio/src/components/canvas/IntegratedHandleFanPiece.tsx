import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface IntegratedHandleFanPieceProps {
  state: StudioState;
}

/**
 * Template 14: مروحة البتلة ذات المقبض المدمج (Integrated Handle Scalloped Fan)
 * - Single-piece die-cut petal fan flowing into an integrated comfortable handle.
 * - Bilingual Arabic/English curved typography.
 * - 8mm tassel hole at handle base with luxury silk tassel.
 */
export const IntegratedHandleFanPiece: React.FC<IntegratedHandleFanPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#D4AF37';
  const secondaryCol = state.secondaryPieceColor || '#5E6B38';
  const textCol = state.textColor || '#2D1B14';

  const cx = 300;
  const topY = 90;

  // Integrated Handle Scalloped Fan Dieline Path
  // Top fan width ~380mm, narrows down at y=540 to a 38mm handle, ending at y=720 with rounded bottom
  const fanPath = `
    M ${cx}, ${topY}
    C ${cx + 70}, ${topY - 5} ${cx + 140}, ${topY + 30} ${cx + 175}, ${topY + 95}
    C ${cx + 200}, ${topY + 160} ${cx + 190}, ${topY + 240} ${cx + 170}, ${topY + 310}
    C ${cx + 150}, ${topY + 380} ${cx + 90}, ${topY + 440} ${cx + 22}, 550
    L ${cx + 20}, 690
    C ${cx + 20}, 725 ${cx - 20}, 725 ${cx - 20}, 690
    L ${cx - 22}, 550
    C ${cx - 90}, ${topY + 440} ${cx - 150}, ${topY + 380} ${cx - 170}, ${topY + 310}
    C ${cx - 190}, ${topY + 240} ${cx - 200}, ${topY + 160} ${cx - 175}, ${topY + 95}
    C ${cx - 140}, ${topY + 30} ${cx - 70}, ${topY - 5} ${cx}, ${topY}
    Z
  `;

  // Tassel hole at handle bottom
  const tasselHoleX = cx;
  const tasselHoleY = 690;
  const tasselHoleR = 5;

  return (
    <g id="template-integrated-handle-fan" className="template-handle-fan">
      {/* ====================================================================
          1. PAPER BACKDROP
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="handle-fan-backdrop">
          <path
            d={fanPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path d={fanPath} fill="url(#paper-texture-pattern)" opacity="0.35" />
          )}

          {/* Scalloped Inset Foil Border */}
          <path
            d={fanPath}
            fill="none"
            stroke={artworkCol}
            strokeWidth="1.2"
            transform="scale(0.96) translate(12, 18)"
            opacity="0.8"
          />

          {/* Reinforced Eyelet at Tassel Hole */}
          <circle cx={tasselHoleX} cy={tasselHoleY} r={tasselHoleR + 3} fill="none" stroke={artworkCol} strokeWidth="1.5" />
          <circle cx={tasselHoleX} cy={tasselHoleY} r={tasselHoleR} fill={cardBase} />
        </g>
      )}

      {/* ====================================================================
          2. ARTWORK & BOTANICAL FLOURISHES
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="handle-fan-artwork">
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'petal-veins'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={secondaryCol}
            templateId={state.activeTemplateId}
          />

          {/* Top Royal Monogram Cartouche (x=300, y=175) */}
          <g transform={`translate(${cx}, 180)`}>
            <ellipse rx="36" ry="42" fill="none" stroke={artworkCol} strokeWidth="1.2" />
            <ellipse rx="32" ry="38" fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="2, 2" />
            <circle cx="0" cy="-42" r="2.5" fill={artworkCol} />
            <circle cx="0" cy="42" r="2.5" fill={artworkCol} />
          </g>

          {/* Flowing Organic Fan Veins across upper fan */}
          <g stroke={artworkCol} strokeWidth="0.8" fill="none" opacity="0.45">
            <path d={`M ${cx}, 480 C ${cx - 50}, 380 ${cx - 120}, 280 ${cx - 140}, 180`} />
            <path d={`M ${cx}, 480 C ${cx + 50}, 380 ${cx + 120}, 280 ${cx + 140}, 180`} />
          </g>
        </g>
      )}

      {/* ====================================================================
          3. BILINGUAL TYPOGRAPHY LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="handle-fan-text">
          {/* Monogram inside cartouche */}
          <text
            x={cx}
            y="188"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.monogram.fontFamily}
            fontSize={state.monogram.fontSize * 0.75}
            fontWeight="bold"
            letterSpacing={state.monogram.letterSpacing}
          >
            {state.monogram.text}
          </text>

          {/* Arabic Greeting */}
          <text
            x={cx}
            y="260"
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
            x={cx}
            y="315"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize * 0.9}
            fontWeight="bold"
            letterSpacing={state.names.letterSpacing}
          >
            {state.names.text}
          </text>

          {/* Arabic Date */}
          <text
            x={cx}
            y="360"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.date.fontFamily}
            fontSize={Math.min(state.date.fontSize, 13)}
            letterSpacing={state.date.letterSpacing}
            opacity="0.9"
          >
            {state.date.text}
          </text>

          {/* Location */}
          <text
            x={cx}
            y="390"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.location.fontFamily}
            fontSize={Math.min(state.location.fontSize, 12)}
            letterSpacing={state.location.letterSpacing}
          >
            {state.location.text}
          </text>

          {/* English Bilingual Lower Fan Section */}
          <text
            x={cx}
            y="435"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily="'Playfair Display', serif"
            fontSize="11"
            letterSpacing="2"
          >
            TOGETHER WITH THEIR FAMILIES
          </text>
          <text
            x={cx}
            y="460"
            textAnchor="middle"
            fill={textCol}
            fontFamily="'Playfair Display', serif"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="3"
          >
            REQUEST THE HONOR OF YOUR PRESENCE
          </text>
        </g>
      )}

      {/* ====================================================================
          4. HANGING SILK TASSEL FROM INTEGRATED HANDLE
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g
          id="handle-fan-tassel"
          transform={`translate(${tasselHoleX}, ${tasselHoleY})`}
          filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
        >
          {/* Hanging Loop */}
          <path d="M 0,0 C -6,15 -4,25 0,35 C 4,25 6,15 0,0" fill="none" stroke={secondaryCol} strokeWidth="2.5" />
          <circle cx="0" cy="35" r="5" fill={artworkCol} />
          {/* Tassel strands */}
          <path d="M -5,38 L -15,85 L 15,85 L 5,38 Z" fill={secondaryCol} opacity="0.9" />
          {[-10, -5, 0, 5, 10].map((dx, i) => (
            <line key={`fan-tassel-${i}`} x1={dx * 0.4} y1="38" x2={dx * 1.3} y2="85" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.4" />
          ))}
        </g>
      )}

      {/* ====================================================================
          5. CUT / DIELINE LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-handle-fan" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          <path
            d={fanPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* Tassel Hole Punch (8mm) */}
          <circle
            cx={tasselHoleX}
            cy={tasselHoleY}
            r={tasselHoleR}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />

          {state.activeLayerMode === 'cut' && (
            <text
              x={cx}
              y="760"
              textAnchor="middle"
              fill="#FF0000"
              fontSize="11"
              fontFamily="Cairo, sans-serif"
            >
              مروحة البتلة ذات المقبض المدمج قطعة واحدة (ثقب شرابة 8 مم) - 15×22 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
