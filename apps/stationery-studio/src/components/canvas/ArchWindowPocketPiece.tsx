import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface ArchWindowPocketPieceProps {
  state: StudioState;
}

/**
 * Template 3: جيب القصر المعماري ذو النافذة (Arch Window Pocket Suite)
 * - Outer Pocket Jacket: Architectural arch cutout window revealing the inner card.
 * - Inner Invitation Card: Slides out smoothly when isPocketOpen is true.
 * - Wax Seal: 3D wax seal medallion securing the base.
 * - Crease Lines: Dashed blue fold lines (#2563EB) for pocket flaps in cut mode.
 */
export const ArchWindowPocketPiece: React.FC<ArchWindowPocketPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#58111A'; // Burgundy pocket
  const artworkCol = state.artworkColor || '#D4AF37'; // Gold accents
  const secondaryCol = state.secondaryPieceColor || '#FDFBF7'; // Cream inner card
  const textCol = state.textColor || '#2C1E14'; // Dark text on inner card

  // Inner card slide offset when pocket is open
  const innerCardOffsetY = state.isPocketOpen ? -140 : 0;

  // Pocket outer dimensions (Centered in 600x860 canvas)
  const pocketX = 130;
  const pocketY = 120;
  const pocketW = 340;
  const pocketH = 580;

  // Arch cutout coordinates on pocket face
  const archX = pocketX + 45;
  const archY = pocketY + 50;
  const archW = pocketW - 90; // 250
  const archH = 340;
  const archR = archW / 2; // 125

  // Arch cutout path
  const archCutoutPath = `
    M ${archX}, ${archY + archR}
    A ${archR} ${archR} 0 0 1 ${archX + archW}, ${archY + archR}
    L ${archX + archW}, ${archY + archH}
    L ${archX}, ${archY + archH}
    Z
  `;

  // Inner card coordinates
  const innerCardX = pocketX + 20;
  const innerCardY = pocketY + 25 + innerCardOffsetY;
  const innerCardW = pocketW - 40; // 300
  const innerCardH = pocketH - 40; // 540

  return (
    <g id="template-arch-window-pocket" className="template-arch-pocket">
      <defs>
        {/* Clip for Pocket Arch Cutout in Mockup Mode */}
        <clipPath id="arch-pocket-clip">
          <path d={archCutoutPath} />
        </clipPath>

        {/* 3D Wax Seal Radial Gradient */}
        <radialGradient id="wax-seal-gradient" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#E25B6C" />
          <stop offset="40%" stopColor="#A82338" />
          <stop offset="85%" stopColor="#691120" />
          <stop offset="100%" stopColor="#400A13" />
        </radialGradient>
      </defs>

      {/* ====================================================================
          1. INNER INVITATION CARD (Visible through the arch window or pulled up)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g
          id="inner-invitation-card"
          className="transition-transform duration-500 ease-out"
        >
          {/* Inner Card Paper Backdrop */}
          <rect
            x={innerCardX}
            y={innerCardY}
            width={innerCardW}
            height={innerCardH}
            rx="12"
            fill={secondaryCol}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <rect
              x={innerCardX}
              y={innerCardY}
              width={innerCardW}
              height={innerCardH}
              rx="12"
              fill="url(#paper-texture-pattern)"
              opacity="0.3"
            />
          )}

          {/* Delicate inner gold foil border */}
          <rect
            x={innerCardX + 10}
            y={innerCardY + 10}
            width={innerCardW - 20}
            height={innerCardH - 20}
            rx="8"
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            strokeDasharray="4, 2"
            opacity="0.6"
          />

          {/* Inner Card Artwork */}
          <g transform={`translate(${innerCardX - 100}, ${innerCardY - 30})`}>
            <ArtworkPatterns
              patternStyle={state.artworkPatternStyle || 'watercolor-swan-palace'}
              artworkColor={artworkCol}
              artworkGradientEnd={state.artworkGradientEnd}
              accentColor={artworkCol}
              templateId={state.activeTemplateId}
            />
          </g>

          {/* Inner Card Texts */}
          <g id="inner-card-texts">
            {/* Monogram crest */}
            <circle
              cx={innerCardX + innerCardW / 2}
              cy={innerCardY + 70}
              r="28"
              fill="none"
              stroke={artworkCol}
              strokeWidth="1"
            />
            <circle
              cx={innerCardX + innerCardW / 2}
              cy={innerCardY + 70}
              r="24"
              fill="none"
              stroke={artworkCol}
              strokeWidth="0.5"
              strokeDasharray="2, 2"
            />
            <text
              x={innerCardX + innerCardW / 2}
              y={innerCardY + 76}
              textAnchor="middle"
              fill={artworkCol}
              fontFamily={state.monogram.fontFamily}
              fontSize={state.monogram.fontSize * 0.75}
              fontWeight="bold"
            >
              {state.monogram.text}
            </text>

            {/* Greeting */}
            <text
              x={innerCardX + innerCardW / 2}
              y={innerCardY + 140}
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.greeting.fontFamily}
              fontSize={Math.min(state.greeting.fontSize, 15)}
              fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
            >
              {state.greeting.text}
            </text>

            {/* Couple Names */}
            <text
              x={innerCardX + innerCardW / 2}
              y={innerCardY + 195}
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.names.fontFamily}
              fontSize={state.names.fontSize * 0.85}
              fontWeight="bold"
              filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
            >
              {state.names.text}
            </text>

            {/* Date */}
            <text
              x={innerCardX + innerCardW / 2}
              y={innerCardY + 245}
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.date.fontFamily}
              fontSize={Math.min(state.date.fontSize, 13)}
              opacity="0.9"
            >
              {state.date.text}
            </text>

            {/* Location */}
            <text
              x={innerCardX + innerCardW / 2}
              y={innerCardY + 280}
              textAnchor="middle"
              fill={artworkCol}
              fontFamily={state.location.fontFamily}
              fontSize={Math.min(state.location.fontSize, 12)}
            >
              {state.location.text}
            </text>
          </g>
        </g>
      )}

      {/* ====================================================================
          2. OUTER ARCH POCKET JACKET (With Arch Window Cutout)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="outer-pocket-jacket">
          {/* Base Pocket Shape (Masked with arch window in mockup) */}
          <path
            d={`
              M ${pocketX}, ${pocketY}
              L ${pocketX + pocketW}, ${pocketY}
              L ${pocketX + pocketW}, ${pocketY + pocketH}
              L ${pocketX}, ${pocketY + pocketH}
              Z
              ${archCutoutPath}
            `}
            fill={cardBase}
            fillRule="evenodd"
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />

          {/* Paper Texture on Pocket */}
          {state.activeLayerMode === 'mockup' && (
            <path
              d={`
                M ${pocketX}, ${pocketY}
                L ${pocketX + pocketW}, ${pocketY}
                L ${pocketX + pocketW}, ${pocketY + pocketH}
                L ${pocketX}, ${pocketY + pocketH}
                Z
                ${archCutoutPath}
              `}
              fill="url(#paper-texture-pattern)"
              fillRule="evenodd"
              opacity="0.35"
            />
          )}

          {/* Arch Window Outer Embossed Foil Trim */}
          <path
            d={`
              M ${archX - 5}, ${archY + archR}
              A ${archR + 5} ${archR + 5} 0 0 1 ${archX + archW + 5}, ${archY + archR}
              L ${archX + archW + 5}, ${archY + archH + 5}
              L ${archX - 5}, ${archY + archH + 5}
              Z
            `}
            fill="none"
            stroke={artworkCol}
            strokeWidth="1.2"
            opacity="0.8"
          />

          {/* Architectural flourishes around the arch peak */}
          <g transform={`translate(${pocketX + pocketW / 2}, ${archY - 10})`}>
            <circle cx="0" cy="0" r="4" fill={artworkCol} />
            <path d="M -25, 0 Q 0, -15 25, 0" fill="none" stroke={artworkCol} strokeWidth="1" />
            <path d="M -15, 5 Q 0, -5 15, 5" fill="none" stroke={artworkCol} strokeWidth="0.6" />
          </g>

          {/* Pocket Lower Flap Band Line */}
          <line
            x1={pocketX}
            y1={pocketY + pocketH - 120}
            x2={pocketX + pocketW}
            y2={pocketY + pocketH - 120}
            stroke={artworkCol}
            strokeWidth="0.8"
            strokeDasharray="4, 4"
            opacity="0.5"
          />

          {/* Gold text on pocket base flap */}
          <text
            x={pocketX + pocketW / 2}
            y={pocketY + pocketH - 75}
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.greeting.fontFamily}
            fontSize="13"
            letterSpacing="1"
          >
            دعوة زفاف ملكية
          </text>
        </g>
      )}

      {/* ====================================================================
          3. REALISTIC 3D WAX SEAL (Centered at base flap)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g
          id="pocket-wax-seal"
          transform={`translate(${pocketX + pocketW / 2}, ${pocketY + pocketH - 45})`}
          filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
        >
          {/* Irregular melted wax edges */}
          <path
            d="
              M 0, -32
              C 12, -33 24, -28 30, -18
              C 35, -9 36, 4 33, 16
              C 30, 26 21, 33 10, 34
              C -2, 35 -16, 32 -26, 22
              C -34, 13 -35, -2 -31, -14
              C -27, -26 -14, -31 0, -32
              Z
            "
            fill="url(#wax-seal-gradient)"
          />
          {/* Inner stamped rim */}
          <circle cx="0" cy="0" r="22" fill="#8B1E3F" opacity="0.6" stroke={artworkCol} strokeWidth="0.8" />
          <circle cx="0" cy="0" r="19" fill="none" stroke={artworkCol} strokeWidth="0.5" strokeDasharray="2, 2" />

          {/* Monogram inside wax seal */}
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.monogram.fontFamily}
            fontSize="14"
            fontWeight="bold"
          >
            {state.monogram.text.slice(0, 3)}
          </text>
        </g>
      )}

      {/* ====================================================================
          4. CUT & CREASE LINES LAYER (Strict Plotter Output)
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-arch-pocket" opacity={state.activeLayerMode === 'cut' ? 1 : 0.4}>
          {/* Solid Red Cut Line: Outer Pocket Rectangle */}
          <rect
            x={pocketX}
            y={pocketY}
            width={pocketW}
            height={pocketH}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* Solid Red Cut Line: The Arch Cutout Window */}
          <path
            d={archCutoutPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
          />

          {/* Dashed Blue Crease Line: Bottom Pocket Fold Line */}
          <line
            x1={pocketX}
            y1={pocketY + pocketH - 120}
            x2={pocketX + pocketW}
            y2={pocketY + pocketH - 120}
            stroke={state.creaseStrokeColor || '#2563EB'}
            strokeWidth="0.75"
            strokeDasharray="4, 4"
          />

          {/* Cut Mode Annotations & Flat Inner Card */}
          {state.activeLayerMode === 'cut' && (
            <>
              {/* Inner Card Cut Line (Shown side-by-side) */}
              <g transform="translate(420, 0)">
                <rect
                  x={pocketX}
                  y={pocketY}
                  width={innerCardW}
                  height={innerCardH}
                  rx="12"
                  fill="none"
                  stroke={state.dielineStrokeColor || '#FF0000'}
                  strokeWidth="0.75"
                />
                <text
                  x={pocketX + innerCardW / 2}
                  y={pocketY + innerCardH + 30}
                  textAnchor="middle"
                  fill="#FF0000"
                  fontSize="11"
                  fontFamily="Cairo, sans-serif"
                >
                  قطعة 2: البطاقة الداخلية (Inner Card) - 13×18 سم
                </text>
              </g>

              <text
                x={pocketX + pocketW / 2}
                y={pocketY + pocketH + 30}
                textAnchor="middle"
                fill="#FF0000"
                fontSize="11"
                fontFamily="Cairo, sans-serif"
              >
                قطعة 1: جيب القصر الخارجي مع نافذة القوس (Outer Arch Pocket)
              </text>
              <text
                x={pocketX + pocketW / 2}
                y={pocketY + pocketH + 50}
                textAnchor="middle"
                fill="#2563EB"
                fontSize="10"
                fontFamily="Cairo, sans-serif"
              >
                --- خط طي سفلي منقط أزرق (Crease/Score Line)
              </text>
            </>
          )}
        </g>
      )}
    </g>
  );
};
