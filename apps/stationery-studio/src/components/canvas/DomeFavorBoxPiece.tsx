import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface DomeFavorBoxPieceProps {
  state: StudioState;
}

/**
 * Template 15: علبة توزيعات القبة الرباعية (4-Flap Dome Favor Box + Oval Seal)
 * - Packaging Template: Unfolded square base with 4 dome-petal folding flaps.
 * - Solid Red Cuts (#FF0000, 0.75pt hairline) along outer curved perimeter.
 * - Dashed Blue Score Lines (#2563EB, 4,4 dash) along the 4 square base edges.
 * - Separate Oval Closure Sticker Seal ("هني وعافيه" + couple initials).
 */
export const DomeFavorBoxPiece: React.FC<DomeFavorBoxPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#D4AF37';
  const secondaryCol = state.secondaryPieceColor || '#5E6B38';
  const textCol = state.textColor || '#2D1B14';

  // Base coordinates (130 x 130)
  const cx = 300;
  const cy = 410;
  const s = 65; // half-width of base

  // Dome petal flap height
  const h = 135;

  // Unfolded Dome Box Outer Perimeter Path
  // 4 curved petals meeting at the outer tips
  const domeBoxPath = `
    M ${cx - s}, ${cy - s}
    C ${cx - s}, ${cy - s - h * 0.5} ${cx - 30}, ${cy - s - h} ${cx}, ${cy - s - h}
    C ${cx + 30}, ${cy - s - h} ${cx + s}, ${cy - s - h * 0.5} ${cx + s}, ${cy - s}

    C ${cx + s + h * 0.5}, ${cy - s} ${cx + s + h}, ${cy - 30} ${cx + s + h}, ${cy}
    C ${cx + s + h}, ${cy + 30} ${cx + s + h * 0.5}, ${cy + s} ${cx + s}, ${cy + s}

    C ${cx + s}, ${cy + s + h * 0.5} ${cx + 30}, ${cy + s + h} ${cx}, ${cy + s + h}
    C ${cx - 30}, ${cy + s + h} ${cx - s}, ${cy + s + h * 0.5} ${cx - s}, ${cy + s}

    C ${cx - s - h * 0.5}, ${cy + s} ${cx - s - h}, ${cy + 30} ${cx - s - h}, ${cy}
    C ${cx - s - h}, ${cy - 30} ${cx - s - h * 0.5}, ${cy - s} ${cx - s}, ${cy - s}
    Z
  `;

  return (
    <g id="template-dome-favor-box" className="template-dome-box">
      {/* ====================================================================
          1. PAPER BACKDROP (Mockup & Print)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="dome-box-backdrop">
          <path
            d={domeBoxPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path d={domeBoxPath} fill="url(#paper-texture-pattern)" opacity="0.35" />
          )}

          {/* Square Base Inset Border */}
          <rect
            x={cx - s + 6}
            y={cy - s + 6}
            width={(s - 6) * 2}
            height={(s - 6) * 2}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            strokeDasharray="4, 3"
            opacity="0.6"
          />
        </g>
      )}

      {/* ====================================================================
          2. ARTWORK: FLORAL ACCENTS ON DOME PETALS
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="dome-box-artwork">
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'petal-veins'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={secondaryCol}
            templateId={state.activeTemplateId}
          />

          {/* Botanical sprays on the 4 petals */}
          <g stroke={artworkCol} strokeWidth="1" fill="none" opacity="0.7">
            {/* North petal flourish */}
            <path d={`M ${cx}, ${cy - s - 20} Q ${cx - 20}, ${cy - s - 60} ${cx}, ${cy - s - 90} Q ${cx + 20}, ${cy - s - 60} ${cx}, ${cy - s - 20}`} />
            {/* South petal flourish */}
            <path d={`M ${cx}, ${cy + s + 20} Q ${cx - 20}, ${cy + s + 60} ${cx}, ${cy + s + 90} Q ${cx + 20}, ${cy + s + 60} ${cx}, ${cy + s + 20}`} />
            {/* East petal flourish */}
            <path d={`M ${cx + s + 20}, ${cy} Q ${cx + s + 60}, ${cy - 20} ${cx + s + 90}, ${cy} Q ${cx + s + 60}, ${cy + 20} ${cx + s + 20}, ${cy}`} />
            {/* West petal flourish */}
            <path d={`M ${cx - s - 20}, ${cy} Q ${cx - s - 60}, ${cy - 20} ${cx - s - 90}, ${cy} Q ${cx - s - 60}, ${cy + 20} ${cx - s - 20}, ${cy}`} />
          </g>
        </g>
      )}

      {/* ====================================================================
          3. TYPOGRAPHY LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="dome-box-text">
          {/* Base Center Monogram */}
          <g transform={`translate(${cx}, ${cy})`}>
            <circle cx="0" cy="0" r="26" fill="none" stroke={artworkCol} strokeWidth="1" />
            <circle cx="0" cy="0" r="23" fill="none" stroke={artworkCol} strokeWidth="0.5" strokeDasharray="2, 2" />
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fill={artworkCol}
              fontFamily={state.monogram.fontFamily}
              fontSize="16"
              fontWeight="bold"
            >
              {state.monogram.text}
            </text>
          </g>

          {/* North Petal Text: Couple Names */}
          <text
            x={cx}
            y={cy - s - 30}
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize * 0.65}
            fontWeight="bold"
          >
            {state.names.text}
          </text>

          {/* South Petal Text: Date */}
          <text
            x={cx}
            y={cy + s + 40}
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.date.fontFamily}
            fontSize="10"
            fontWeight="bold"
          >
            {state.date.text}
          </text>
        </g>
      )}

      {/* ====================================================================
          4. OVAL CLOSURE STICKER TAG (هني وعافيه + Couple Initials)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g
          id="oval-dome-seal"
          transform={`translate(${cx}, ${cy})`}
          filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
        >
          {/* Gold Oval Seal */}
          <ellipse rx="38" ry="24" fill={artworkCol} stroke="#1A0D11" strokeWidth="0.6" />
          <ellipse rx="35" ry="21" fill={cardBase} />
          <ellipse rx="32" ry="18" fill="none" stroke={artworkCol} strokeWidth="0.8" strokeDasharray="3, 2" />

          {/* Arabic Blessing on Seal */}
          <text
            x="0"
            y="-2"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily="Cairo, sans-serif"
            fontSize="9"
            fontWeight="bold"
          >
            هني وعافيه
          </text>
          <text
            x="0"
            y="11"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.monogram.fontFamily}
            fontSize="9"
            fontWeight="bold"
          >
            {state.monogram.text}
          </text>
        </g>
      )}

      {/* ====================================================================
          5. CUT & CREASE LINES LAYER (Plotter Laser/Cameo Standard)
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-dome-box" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          {/* SOLID RED CUT PERIMETER */}
          <path
            d={domeBoxPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* DASHED BLUE SCORE LINES AROUND SQUARE BASE */}
          <line
            x1={cx - s}
            y1={cy - s}
            x2={cx + s}
            y2={cy - s}
            stroke={state.creaseStrokeColor || '#2563EB'}
            strokeWidth="0.75"
            strokeDasharray="4, 4"
          />
          <line
            x1={cx + s}
            y1={cy - s}
            x2={cx + s}
            y2={cy + s}
            stroke={state.creaseStrokeColor || '#2563EB'}
            strokeWidth="0.75"
            strokeDasharray="4, 4"
          />
          <line
            x1={cx + s}
            y1={cy + s}
            x2={cx - s}
            y2={cy + s}
            stroke={state.creaseStrokeColor || '#2563EB'}
            strokeWidth="0.75"
            strokeDasharray="4, 4"
          />
          <line
            x1={cx - s}
            y1={cy + s}
            x2={cx - s}
            y2={cy - s}
            stroke={state.creaseStrokeColor || '#2563EB'}
            strokeWidth="0.75"
            strokeDasharray="4, 4"
          />

          {/* Separate Oval Closure Seal Cutline (Shown to the side in cut mode) */}
          {state.activeLayerMode === 'cut' && (
            <g transform="translate(680, 410)">
              <ellipse rx="38" ry="24" fill="none" stroke={state.dielineStrokeColor || '#FF0000'} strokeWidth="0.75" />
              <text x="0" y="45" textAnchor="middle" fill="#FF0000" fontSize="10" fontFamily="Cairo, sans-serif">
                ملصق الختم البيضاوي ("هني وعافيه")
              </text>
            </g>
          )}

          {state.activeLayerMode === 'cut' && (
            <text
              x={cx}
              y={cy + s + h + 35}
              textAnchor="middle"
              fill="#FF0000"
              fontSize="11"
              fontFamily="Cairo, sans-serif"
            >
              مخطط علبة القبة الرباعية (أحمر: قص خارجي | أزرق منقط: ريجة طي القاعدة) - 21×21 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
