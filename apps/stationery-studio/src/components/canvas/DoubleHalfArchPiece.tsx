import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface DoubleHalfArchPieceProps {
  state: StudioState;
}

/**
 * Template 5: دعوة القوس العصري المتداخل (Modern Double Half-Arch Suite)
 * - Piece 1: Tall Main Half-Arch Card (Main wedding details)
 * - Piece 2: Smaller Nested Half-Arch RSVP Card (RSVP & details)
 * - Translucent Belly Band holding both cards together
 */
export const DoubleHalfArchPiece: React.FC<DoubleHalfArchPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#F9EBE8'; // Main arch
  const secondaryCol = state.secondaryPieceColor || '#FFFFFF'; // RSVP arch
  const artworkCol = state.artworkColor || '#B76E79';
  const textCol = state.textColor || '#5A383E';

  const isExploded = !state.isAssemblyMode || state.activeLayerMode === 'cut';

  // Card 1: Main Tall Half Arch (260 x 560)
  const mainX = isExploded ? 60 : 120;
  const mainY = 130;
  const mainW = 260;
  const mainH = 560;

  // Main Arch Path: Straight left, rounded top-left half arch, straight right and bottom
  const mainArchPath = `
    M ${mainX}, ${mainY + 120}
    C ${mainX}, ${mainY + 30} ${mainX + 40}, ${mainY} ${mainX + 130}, ${mainY}
    C ${mainX + 220}, ${mainY} ${mainX + mainW}, ${mainY + 40} ${mainX + mainW}, ${mainY + 120}
    L ${mainX + mainW}, ${mainY + mainH}
    L ${mainX}, ${mainY + mainH}
    Z
  `;

  // Card 2: Nested Small Half Arch (180 x 380)
  // Overlaps the right side of the main card, or sits side-by-side in exploded/cut mode
  const rsvpX = isExploded ? 350 : 250;
  const rsvpY = isExploded ? 200 : 310;
  const rsvpW = 180;
  const rsvpH = 380;

  const rsvpArchPath = `
    M ${rsvpX}, ${rsvpY + 90}
    C ${rsvpX}, ${rsvpY + 20} ${rsvpX + 30}, ${rsvpY} ${rsvpX + 90}, ${rsvpY}
    C ${rsvpX + 150}, ${rsvpY} ${rsvpX + rsvpW}, ${rsvpY + 30} ${rsvpX + rsvpW}, ${rsvpY + 90}
    L ${rsvpX + rsvpW}, ${rsvpY + rsvpH}
    L ${rsvpX}, ${rsvpY + rsvpH}
    Z
  `;

  return (
    <g id="template-double-half-arch" className="template-double-half-arch">
      {/* ====================================================================
          1. MAIN TALL HALF-ARCH INVITATION CARD (Piece 1)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="main-half-arch-card">
          <path
            d={mainArchPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path
              d={mainArchPath}
              fill="url(#paper-texture-pattern)"
              opacity="0.3"
            />
          )}

          {/* Minimalist Inset Foil Arc */}
          <path
            d={`
              M ${mainX + 14}, ${mainY + 120}
              C ${mainX + 14}, ${mainY + 40} ${mainX + 50}, ${mainY + 14} ${mainX + 130}, ${mainY + 14}
              C ${mainX + 210}, ${mainY + 14} ${mainX + mainW - 14}, ${mainY + 50} ${mainX + mainW - 14}, ${mainY + 120}
              L ${mainX + mainW - 14}, ${mainY + mainH - 14}
              L ${mainX + 14}, ${mainY + mainH - 14}
              Z
            `}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* Botanical accent in top arch */}
          <g transform={`translate(${mainX - 50}, ${mainY - 20})`}>
            <ArtworkPatterns
              patternStyle={state.artworkPatternStyle || 'petal-veins'}
              artworkColor={artworkCol}
              artworkGradientEnd={state.artworkGradientEnd}
              accentColor={artworkCol}
              templateId={state.activeTemplateId}
            />
          </g>

          {/* Main Card Typography */}
          <g id="main-arch-texts">
            {/* Monogram */}
            <text
              x={mainX + mainW / 2 - (isExploded ? 0 : 25)}
              y={mainY + 95}
              textAnchor="middle"
              fill={artworkCol}
              fontFamily={state.monogram.fontFamily}
              fontSize={state.monogram.fontSize * 0.85}
              fontWeight="bold"
            >
              {state.monogram.text}
            </text>

            {/* Greeting */}
            <text
              x={mainX + mainW / 2 - (isExploded ? 0 : 25)}
              y={mainY + 160}
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.greeting.fontFamily}
              fontSize={Math.min(state.greeting.fontSize, 14)}
              fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
            >
              {state.greeting.text}
            </text>

            {/* Couple Names */}
            <text
              x={mainX + mainW / 2 - (isExploded ? 0 : 25)}
              y={mainY + 220}
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.names.fontFamily}
              fontSize={state.names.fontSize * 0.85}
              fontWeight="bold"
            >
              {state.names.text}
            </text>

            {/* Date */}
            <text
              x={mainX + mainW / 2 - (isExploded ? 0 : 25)}
              y={mainY + 270}
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.date.fontFamily}
              fontSize={Math.min(state.date.fontSize, 12)}
              opacity="0.9"
            >
              {state.date.text}
            </text>

            {/* Location */}
            <text
              x={mainX + mainW / 2 - (isExploded ? 0 : 25)}
              y={mainY + 300}
              textAnchor="middle"
              fill={artworkCol}
              fontFamily={state.location.fontFamily}
              fontSize={Math.min(state.location.fontSize, 11)}
            >
              {state.location.text}
            </text>
          </g>
        </g>
      )}

      {/* ====================================================================
          2. SECONDARY NESTED RSVP HALF-ARCH CARD (Piece 2)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g
          id="secondary-rsvp-arch-card"
          filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
        >
          <path d={rsvpArchPath} fill={secondaryCol} />
          {state.activeLayerMode === 'mockup' && (
            <path d={rsvpArchPath} fill="url(#paper-texture-pattern)" opacity="0.3" />
          )}

          {/* Inset Border */}
          <path
            d={`
              M ${rsvpX + 10}, ${rsvpY + 90}
              C ${rsvpX + 10}, ${rsvpY + 30} ${rsvpX + 35}, ${rsvpY + 10} ${rsvpX + 90}, ${rsvpY + 10}
              C ${rsvpX + 145}, ${rsvpY + 10} ${rsvpX + rsvpW - 10}, ${rsvpY + 40} ${rsvpX + rsvpW - 10}, ${rsvpY + 90}
              L ${rsvpX + rsvpW - 10}, ${rsvpY + rsvpH - 10}
              L ${rsvpX + 10}, ${rsvpY + rsvpH - 10}
              Z
            `}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* RSVP Card Texts */}
          <g id="rsvp-texts">
            <text
              x={rsvpX + rsvpW / 2}
              y={rsvpY + 70}
              textAnchor="middle"
              fill={artworkCol}
              fontFamily="Cairo, sans-serif"
              fontSize="12"
              fontWeight="bold"
              letterSpacing="2"
            >
              ✦ RSVP ✦
            </text>
            <text
              x={rsvpX + rsvpW / 2}
              y={rsvpY + 105}
              textAnchor="middle"
              fill={textCol}
              fontFamily="Cairo, sans-serif"
              fontSize="11"
              fontWeight="bold"
            >
              تأكيد الحضور
            </text>
            <text
              x={rsvpX + rsvpW / 2}
              y={rsvpY + 130}
              textAnchor="middle"
              fill={artworkCol}
              fontFamily="Cairo, sans-serif"
              fontSize="10"
              opacity="0.8"
            >
              يسعدنا تأكيد حضوركم قبل
            </text>
            <text
              x={rsvpX + rsvpW / 2}
              y={rsvpY + 150}
              textAnchor="middle"
              fill={textCol}
              fontFamily="Cairo, sans-serif"
              fontSize="11"
              fontWeight="bold"
            >
              {state.date.text.split('،')[1] || state.date.text}
            </text>

            {/* Small floral divider */}
            <circle cx={rsvpX + rsvpW / 2} cy={rsvpY + 185} r="2.5" fill={artworkCol} />
            <line
              x1={rsvpX + rsvpW / 2 - 35}
              y1={rsvpY + 185}
              x2={rsvpX + rsvpW / 2 + 35}
              y2={rsvpY + 185}
              stroke={artworkCol}
              strokeWidth="0.5"
            />

            <text
              x={rsvpX + rsvpW / 2}
              y={rsvpY + 225}
              textAnchor="middle"
              fill={artworkCol}
              fontFamily="Cairo, sans-serif"
              fontSize="9"
              letterSpacing="1"
            >
              امسح الرمز أدناه للحفظ
            </text>
          </g>
        </g>
      )}

      {/* ====================================================================
          3. TRANSLUCENT / METALLIC BELLY BAND (Mockup Mode only)
          ==================================================================== */}
      {state.activeLayerMode === 'mockup' && !isExploded && (
        <g id="double-arch-belly-band">
          <rect
            x={mainX - 5}
            y={mainY + mainH - 140}
            width={rsvpX + rsvpW - mainX + 10}
            height="55"
            rx="4"
            fill="#FFFFFF"
            fillOpacity="0.75"
            stroke={artworkCol}
            strokeWidth="0.8"
            filter="url(#ring-drop-shadow)"
          />
          <line
            x1={mainX - 5}
            y1={mainY + mainH - 135}
            x2={rsvpX + rsvpW + 5}
            y2={mainY + mainH - 135}
            stroke={artworkCol}
            strokeWidth="0.6"
            strokeDasharray="3, 3"
          />
          <text
            x={(mainX + rsvpX + rsvpW) / 2}
            y={mainY + mainH - 105}
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.greeting.fontFamily}
            fontSize="12"
            letterSpacing="2"
            fontWeight="bold"
          >
            دعوة زفاف خاصة
          </text>
        </g>
      )}

      {/* ====================================================================
          4. CUT / DIELINE LAYER (Cameo/Skycut Hairline Output)
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-double-arch" opacity={state.activeLayerMode === 'cut' ? 1 : 0.4}>
          {/* Main Card Dieline */}
          <path
            d={mainArchPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* RSVP Card Dieline */}
          <path
            d={rsvpArchPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {state.activeLayerMode === 'cut' && (
            <>
              <text
                x={mainX + mainW / 2}
                y={mainY + mainH + 30}
                textAnchor="middle"
                fill="#FF0000"
                fontSize="11"
                fontFamily="Cairo, sans-serif"
              >
                قطعة 1: قوس الدعوة الرئيسي (12×18 سم)
              </text>
              <text
                x={rsvpX + rsvpW / 2}
                y={rsvpY + rsvpH + 30}
                textAnchor="middle"
                fill="#FF0000"
                fontSize="11"
                fontFamily="Cairo, sans-serif"
              >
                قطعة 2: بطاقة الحضور المتداخلة (RSVP Half-Arch)
              </text>
            </>
          )}
        </g>
      )}
    </g>
  );
};
