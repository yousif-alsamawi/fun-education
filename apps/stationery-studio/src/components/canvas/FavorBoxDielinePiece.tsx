import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface FavorBoxDielinePieceProps {
  state: StudioState;
}

/**
 * Template 8: علبة التوزيعات الهرمية المفرغة (Laser-Cut Favor Box Dieline)
 * - Packaging Template: Fully unfolded pyramid favor box dieline sheet.
 * - Solid Red Cuts (#FF0000, 0.75pt hairline) along outer perimeter and ribbon slots.
 * - Dashed Blue Creases (#2563EB, 4,4 dash) along all 4 base edges and tuck tabs.
 * - Printed panels with couple monogram, floral patterns, and thank-you text.
 */
export const FavorBoxDielinePiece: React.FC<FavorBoxDielinePieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#D4AF37';
  const textCol = state.textColor || '#2D1B14';

  // Central square base (130 x 130)
  const cx = 300;
  const cy = 430;
  const s = 65; // half-width of base

  // Triangular side heights
  const h = 180; // height of pyramid side
  const tabW = 20; // tuck tab width

  // Dieline perimeter coordinates
  // North apex
  const nApexX = cx;
  const nApexY = cy - s - h;

  // South apex
  const sApexX = cx;
  const sApexY = cy + s + h;

  // East apex
  const eApexX = cx + s + h;
  const eApexY = cy;

  // West apex
  const wApexX = cx - s - h;
  const wApexY = cy;

  // Full unfolded perimeter path (Solid Red Cut Line)
  const favorBoxPerimeterPath = `
    M ${cx - s}, ${cy - s}
    L ${nApexX - 15}, ${nApexY + 25}
    L ${nApexX - 15}, ${nApexY}
    L ${nApexX + 15}, ${nApexY}
    L ${nApexX + 15}, ${nApexY + 25}
    L ${cx + s}, ${cy - s}

    L ${cx + s + 15}, ${cy - s + 10}
    L ${eApexX - 25}, ${eApexY - 15}
    L ${eApexX}, ${eApexY - 15}
    L ${eApexX}, ${eApexY + 15}
    L ${eApexX - 25}, ${eApexY + 15}
    L ${cx + s}, ${cy + s}

    L ${cx + s - 10}, ${cy + s + 15}
    L ${sApexX + 15}, ${sApexY - 25}
    L ${sApexX + 15}, ${sApexY}
    L ${sApexX - 15}, ${sApexY}
    L ${sApexX - 15}, ${sApexY - 25}
    L ${cx - s}, ${cy + s}

    L ${cx - s - 15}, ${cy + s - 10}
    L ${wApexX + 25}, ${wApexY + 15}
    L ${wApexX}, ${wApexY + 15}
    L ${wApexX}, ${wApexY - 15}
    L ${wApexX + 25}, ${wApexY - 15}
    Z
  `;

  return (
    <g id="template-favor-box-dieline" className="template-favor-box">
      {/* ====================================================================
          1. PAPER BACKDROP (Mockup & Print)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="favor-box-backdrop">
          <path
            d={favorBoxPerimeterPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path
              d={favorBoxPerimeterPath}
              fill="url(#paper-texture-pattern)"
              opacity="0.35"
            />
          )}

          {/* Central Square Base Inset Border */}
          <rect
            x={cx - s + 6}
            y={cy - s + 6}
            width={(s - 6) * 2}
            height={(s - 6) * 2}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            strokeDasharray="3, 3"
            opacity="0.6"
          />
        </g>
      )}

      {/* ====================================================================
          2. PRINT LAYER: ARTWORK & FOIL PATTERNS ON FACETS
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="favor-box-artwork">
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'laser-lace'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={artworkCol}
            templateId={state.activeTemplateId}
          />

          {/* Laser-Cut / Foil Heart Window in North Flap */}
          <g transform={`translate(${cx}, ${cy - s - 80})`}>
            <path
              d="M 0, -15 C -20, -35 -40, 0 0, 30 C 40, 0 20, -35 0, -15 Z"
              fill={state.activeLayerMode === 'mockup' ? 'none' : 'none'}
              stroke={artworkCol}
              strokeWidth="1.2"
            />
            <circle cx="0" cy="5" r="4" fill={artworkCol} opacity="0.6" />
          </g>

          {/* Laser-Cut / Foil Flourish in South Flap */}
          <g transform={`translate(${cx}, ${cy + s + 80}) rotate(180)`}>
            <path
              d="M 0, -15 C -20, -35 -40, 0 0, 30 C 40, 0 20, -35 0, -15 Z"
              fill="none"
              stroke={artworkCol}
              strokeWidth="1.2"
            />
          </g>
        </g>
      )}

      {/* ====================================================================
          3. TYPOGRAPHY LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="favor-box-text">
          {/* Base Bottom Center (Monogram & Couple Initials) */}
          <g transform={`translate(${cx}, ${cy})`}>
            <circle cx="0" cy="0" r="28" fill="none" stroke={artworkCol} strokeWidth="1" />
            <circle cx="0" cy="0" r="25" fill="none" stroke={artworkCol} strokeWidth="0.5" strokeDasharray="2, 2" />
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fill={artworkCol}
              fontFamily={state.monogram.fontFamily}
              fontSize={state.monogram.fontSize * 0.7}
              fontWeight="bold"
            >
              {state.monogram.text}
            </text>
          </g>

          {/* North Triangle Text: Main Couple Names */}
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

          {/* South Triangle Text: Greeting / Thank You */}
          <text
            x={cx}
            y={cy + s + 35}
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.greeting.fontFamily}
            fontSize="12"
            fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
          >
            {state.greeting.text}
          </text>

          {/* East Triangle Text: Date (Rotated 90 deg) */}
          <g transform={`translate(${cx + s + 50}, ${cy}) rotate(90)`}>
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.date.fontFamily}
              fontSize="10"
            >
              {state.date.text}
            </text>
          </g>

          {/* West Triangle Text: Location / Tagline (Rotated -90 deg) */}
          <g transform={`translate(${cx - s - 50}, ${cy}) rotate(-90)`}>
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill={artworkCol}
              fontFamily={state.location.fontFamily}
              fontSize="9"
            >
              {state.location.text}
            </text>
          </g>
        </g>
      )}

      {/* ====================================================================
          4. CUT & CREASE LINES LAYER (Plotter Laser/Cameo Standard)
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-favor-box" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          {/* SOLID RED CUT PERIMETER */}
          <path
            d={favorBoxPerimeterPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* Top & Bottom Ribbon Threading Slots (Cut Lines) */}
          <rect
            x={nApexX - 8}
            y={nApexY + 12}
            width="16"
            height="3.5"
            rx="1.5"
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />
          <rect
            x={sApexX - 8}
            y={sApexY - 15}
            width="16"
            height="3.5"
            rx="1.5"
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />
          <rect
            x={eApexX - 15}
            y={eApexY - 8}
            width="3.5"
            height="16"
            rx="1.5"
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />
          <rect
            x={wApexX + 12}
            y={wApexY - 8}
            width="3.5"
            height="16"
            rx="1.5"
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />

          {/* DASHED BLUE SCORE / CREASE LINES (The 4 edges of the central base) */}
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

          {/* Crease lines for tuck tabs on East & West facets */}
          <line
            x1={cx + s}
            y1={cy - s}
            x2={eApexX - 25}
            y2={eApexY - 15}
            stroke={state.creaseStrokeColor || '#2563EB'}
            strokeWidth="0.75"
            strokeDasharray="4, 4"
          />
          <line
            x1={cx - s}
            y1={cy + s}
            x2={wApexX + 25}
            y2={wApexY + 15}
            stroke={state.creaseStrokeColor || '#2563EB'}
            strokeWidth="0.75"
            strokeDasharray="4, 4"
          />

          {state.activeLayerMode === 'cut' && (
            <g>
              <text
                x="300"
                y="810"
                textAnchor="middle"
                fill="#FF0000"
                fontSize="11"
                fontFamily="Cairo, sans-serif"
                fontWeight="bold"
              >
                مخطط علبة التوزيعات الهرمية الكامل (Pyramid Favor Box Dieline Sheet - A4)
              </text>
              <text
                x="300"
                y="828"
                textAnchor="middle"
                fill="#2563EB"
                fontSize="10"
                fontFamily="Cairo, sans-serif"
              >
                --- الخطوط الزرقاء المنقطة هي مسارات الطي والريجة (Creasing Lines) | الخط الأحمر هو القص (Cutting)
              </text>
            </g>
          )}
        </g>
      )}
    </g>
  );
};
