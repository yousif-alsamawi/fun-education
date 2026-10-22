import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface HexagonTerrariumPieceProps {
  state: StudioState;
}

/**
 * Template 11: الدعوة السداسية الهندسية (Hexagon Geometric Terrarium)
 * - Modern Geometric Hexagon Invitation silhouette.
 * - Double gold wireframe terrarium with lush eucalyptus & botanical garland.
 * - Minimalist, high-end editorial typography.
 */
export const HexagonTerrariumPiece: React.FC<HexagonTerrariumPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#D4AF37';
  const textCol = state.textColor || '#2D1B14';

  const cx = 300;
  const cy = 410;
  const rx = 185; // horizontal radius
  const ry = 280; // vertical radius

  // Hexagon 6 vertices (Pointy top / flat sides or pointy sides)
  // Standard vertical hexagon:
  // Top: (cx, cy - ry)
  // Top-Right: (cx + rx, cy - ry*0.5)
  // Bottom-Right: (cx + rx, cy + ry*0.5)
  // Bottom: (cx, cy + ry)
  // Bottom-Left: (cx - rx, cy + ry*0.5)
  // Top-Left: (cx - rx, cy - ry*0.5)
  const hexagonPath = `
    M ${cx}, ${cy - ry}
    L ${cx + rx}, ${cy - ry * 0.5}
    L ${cx + rx}, ${cy + ry * 0.5}
    L ${cx}, ${cy + ry}
    L ${cx - rx}, ${cy + ry * 0.5}
    L ${cx - rx}, ${cy - ry * 0.5}
    Z
  `;

  // Inner nested hexagon path (scale 0.93)
  const innerHexagonPath = `
    M ${cx}, ${cy - ry * 0.93}
    L ${cx + rx * 0.93}, ${cy - ry * 0.5 * 0.93}
    L ${cx + rx * 0.93}, ${cy + ry * 0.5 * 0.93}
    L ${cx}, ${cy + ry * 0.93}
    L ${cx - rx * 0.93}, ${cy + ry * 0.5 * 0.93}
    L ${cx - rx * 0.93}, ${cy - ry * 0.5 * 0.93}
    Z
  `;

  // Secondary wireframe line (scale 0.88)
  const wireHexagonPath = `
    M ${cx}, ${cy - ry * 0.88}
    L ${cx + rx * 0.88}, ${cy - ry * 0.5 * 0.88}
    L ${cx + rx * 0.88}, ${cy + ry * 0.5 * 0.88}
    L ${cx}, ${cy + ry * 0.88}
    L ${cx - rx * 0.88}, ${cy + ry * 0.5 * 0.88}
    L ${cx - rx * 0.88}, ${cy - ry * 0.5 * 0.88}
    Z
  `;

  return (
    <g id="template-hexagon-terrarium" className="template-hexagon">
      {/* ====================================================================
          1. PAPER BACKDROP & WIREFRAME
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="hexagon-backdrop">
          <path
            d={hexagonPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path
              d={hexagonPath}
              fill="url(#paper-texture-pattern)"
              opacity="0.35"
            />
          )}

          {/* Double Gold Terrarium Wireframe */}
          <path
            d={innerHexagonPath}
            fill="none"
            stroke={artworkCol}
            strokeWidth="1.5"
            opacity="0.85"
          />
          <path
            d={wireHexagonPath}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            strokeDasharray="4, 3"
            opacity="0.6"
          />

          {/* Geometric Corner Joint Dots */}
          {[
            [cx, cy - ry * 0.93],
            [cx + rx * 0.93, cy - ry * 0.5 * 0.93],
            [cx + rx * 0.93, cy + ry * 0.5 * 0.93],
            [cx, cy + ry * 0.93],
            [cx - rx * 0.93, cy + ry * 0.5 * 0.93],
            [cx - rx * 0.93, cy - ry * 0.5 * 0.93]
          ].map(([vx, vy], idx) => (
            <circle key={`joint-${idx}`} cx={vx} cy={vy} r="3" fill={artworkCol} />
          ))}
        </g>
      )}

      {/* ====================================================================
          2. ARTWORK: BOTANICAL EUCALYPTUS & ROSES OVERLAY
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="hexagon-artwork">
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'eucalyptus-terrarium'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={artworkCol}
            templateId={state.activeTemplateId}
          />

          {/* Lush Botanical Spray Draping Over Top-Left Corner */}
          <g transform={`translate(${cx - rx * 0.7}, ${cy - ry * 0.6})`}>
            {/* Eucalyptus branch */}
            <path d="M 0,0 Q -30,-40 -10,-80" fill="none" stroke={artworkCol} strokeWidth="1.2" />
            <ellipse cx="-20" cy="-30" rx="14" ry="9" transform="rotate(-25, -20, -30)" fill={artworkCol} opacity="0.25" stroke={artworkCol} strokeWidth="0.8" />
            <ellipse cx="-15" cy="-55" rx="12" ry="8" transform="rotate(35, -15, -55)" fill={artworkCol} opacity="0.3" stroke={artworkCol} strokeWidth="0.8" />
            <ellipse cx="-5" cy="-80" rx="10" ry="7" transform="rotate(-15, -5, -80)" fill={artworkCol} opacity="0.35" stroke={artworkCol} strokeWidth="0.8" />
          </g>

          {/* Botanical Spray Draping Over Bottom-Right Corner */}
          <g transform={`translate(${cx + rx * 0.7}, ${cy + ry * 0.6}) rotate(180)`}>
            <path d="M 0,0 Q -30,-40 -10,-80" fill="none" stroke={artworkCol} strokeWidth="1.2" />
            <ellipse cx="-20" cy="-30" rx="14" ry="9" transform="rotate(-25, -20, -30)" fill={artworkCol} opacity="0.25" stroke={artworkCol} strokeWidth="0.8" />
            <ellipse cx="-15" cy="-55" rx="12" ry="8" transform="rotate(35, -15, -55)" fill={artworkCol} opacity="0.3" stroke={artworkCol} strokeWidth="0.8" />
            <ellipse cx="-5" cy="-80" rx="10" ry="7" transform="rotate(-15, -5, -80)" fill={artworkCol} opacity="0.35" stroke={artworkCol} strokeWidth="0.8" />
          </g>
        </g>
      )}

      {/* ====================================================================
          3. TYPOGRAPHY LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="hexagon-text">
          {/* Monogram inside geometric wire diamond */}
          <g transform={`translate(${cx}, ${cy - 120})`}>
            <polygon points="0,-28 28,0 0,28 -28,0" fill="none" stroke={artworkCol} strokeWidth="1" />
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fill={artworkCol}
              fontFamily={state.monogram.fontFamily}
              fontSize={state.monogram.fontSize * 0.75}
              fontWeight="bold"
            >
              {state.monogram.text}
            </text>
          </g>

          {/* Subtitle / Greeting */}
          <text
            x={cx}
            y={cy - 45}
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
            y={cy + 15}
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize * 0.9}
            fontWeight="bold"
            letterSpacing={state.names.letterSpacing}
          >
            {state.names.text}
          </text>

          {/* Date */}
          <text
            x={cx}
            y={cy + 75}
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
            y={cy + 110}
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
        <g id="layer-cut-lines-hexagon" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          <path
            d={hexagonPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {state.activeLayerMode === 'cut' && (
            <text
              x={cx}
              y={cy + ry + 35}
              textAnchor="middle"
              fill="#FF0000"
              fontSize="11"
              fontFamily="Cairo, sans-serif"
            >
              الدعوة السداسية الهندسية (Hexagon Terrarium Dieline) - 15×15 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
