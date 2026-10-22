import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface BaroqueTasselTagPieceProps {
  state: StudioState;
}

/**
 * Template 4: طقم الإطار الفيكتوري والشرابة (Baroque Frame Tag + Tassel)
 * - Vintage scalloped baroque tag silhouette with punched ribbon/tassel eyelet.
 * - Ornate vintage cartouche frame and botanical swirls.
 * - Secondary Piece: Handcrafted Silk Tassel SVG with gradient sheen dangling from the top.
 */
export const BaroqueTasselTagPiece: React.FC<BaroqueTasselTagPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#D4AF37';
  const secondaryCol = state.secondaryPieceColor || '#8B1E3F'; // Silk tassel color
  const textCol = state.textColor || '#2D1B14';

  // Centered Tag Coordinates (320 x 580)
  const tagX = 140;
  const tagY = 120;
  const tagW = 320;
  const tagH = 580;

  // Punch hole coordinates at the top
  const holeX = 300;
  const holeY = tagY + 36;
  const holeR = 4.5;

  // Intricate Baroque Scalloped Tag Dieline Path
  const baroqueTagPath = `
    M ${holeX}, ${tagY}
    C ${holeX + 30}, ${tagY} ${holeX + 50}, ${tagY + 8} ${holeX + 70}, ${tagY + 20}
    C ${holeX + 90}, ${tagY + 32} ${tagX + tagW - 20}, ${tagY + 25} ${tagX + tagW}, ${tagY + 55}
    C ${tagX + tagW + 10}, ${tagY + 85} ${tagX + tagW - 8}, ${tagY + 120} ${tagX + tagW}, ${tagY + 160}
    C ${tagX + tagW + 5}, ${tagY + 220} ${tagX + tagW - 5}, ${tagY + 280} ${tagX + tagW}, ${tagY + 350}
    C ${tagX + tagW + 8}, ${tagY + 420} ${tagX + tagW - 10}, ${tagY + 490} ${tagX + tagW - 15}, ${tagY + 530}
    C ${tagX + tagW - 25}, ${tagY + 560} ${holeX + 60}, ${tagY + tagH} ${holeX}, ${tagY + tagH}
    C ${holeX - 60}, ${tagY + tagH} ${tagX + 25}, ${tagY + 560} ${tagX + 15}, ${tagY + 530}
    C ${tagX + 10}, ${tagY + 490} ${tagX - 8}, ${tagY + 420} ${tagX}, ${tagY + 350}
    C ${tagX + 5}, ${tagY + 280} ${tagX - 5}, ${tagY + 220} ${tagX}, ${tagY + 160}
    C ${tagX + 8}, ${tagY + 120} ${tagX - 10}, ${tagY + 85} ${tagX}, ${tagY + 55}
    C ${tagX + 20}, ${tagY + 25} ${holeX - 90}, ${tagY + 32} ${holeX - 70}, ${tagY + 20}
    C ${holeX - 50}, ${tagY + 8} ${holeX - 30}, ${tagY} ${holeX}, ${tagY}
    Z
  `;

  return (
    <g id="template-baroque-tassel-tag" className="template-baroque-tag">
      <defs>
        {/* Silk Tassel Sheen Gradient */}
        <linearGradient id="silk-tassel-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={secondaryCol} stopOpacity="0.8" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="70%" stopColor={secondaryCol} stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1A0D11" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="silk-tassel-strands" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondaryCol} />
          <stop offset="75%" stopColor={secondaryCol} />
          <stop offset="100%" stopColor="#15080C" />
        </linearGradient>
      </defs>

      {/* ====================================================================
          1. PAPER BACKDROP & TEXTURE
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="baroque-tag-backdrop">
          <path
            d={baroqueTagPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path
              d={baroqueTagPath}
              fill="url(#paper-texture-pattern)"
              opacity="0.35"
            />
          )}

          {/* Scalloped Inset Vintage Foil Border */}
          <path
            d={baroqueTagPath}
            fill="none"
            stroke={artworkCol}
            strokeWidth="1.2"
            transform="scale(0.94) translate(19, 24)"
            opacity="0.8"
          />
          <path
            d={baroqueTagPath}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.6"
            strokeDasharray="3, 2"
            transform="scale(0.91) translate(29, 36)"
            opacity="0.6"
          />

          {/* Reinforced Eyelet Ring at Top Hole */}
          <circle cx={holeX} cy={holeY} r={holeR + 3} fill="none" stroke={artworkCol} strokeWidth="1.5" />
          <circle cx={holeX} cy={holeY} r={holeR} fill="#FAF9F6" />
        </g>
      )}

      {/* ====================================================================
          2. ARTWORK & VINTAGE FRAMES
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="baroque-artwork">
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'vintage-baroque'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={artworkCol}
            templateId={state.activeTemplateId}
          />

          {/* Inner Oval Cartouche for Monogram (x=300, y=230) */}
          <g transform="translate(300, 235)">
            <ellipse rx="44" ry="50" fill="none" stroke={artworkCol} strokeWidth="1.4" />
            <ellipse rx="39" ry="45" fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="2, 2" />
            {/* Top & Bottom Crown Flourishes */}
            <path d="M -18, -50 Q 0, -62 18, -50" fill="none" stroke={artworkCol} strokeWidth="1.2" />
            <circle cx="0" cy="-62" r="3" fill={artworkCol} />
            <path d="M -18, 50 Q 0, 62 18, 50" fill="none" stroke={artworkCol} strokeWidth="1.2" />
            <circle cx="0" cy="62" r="3" fill={artworkCol} />
          </g>

          {/* Botanical Divider Vines */}
          <g transform="translate(300, 420)" stroke={artworkCol} strokeWidth="0.8" fill="none">
            <line x1="-70" y1="0" x2="-10" y2="0" />
            <circle cx="0" cy="0" r="3.5" fill={artworkCol} />
            <line x1="10" y1="0" x2="70" y2="0" />
            <path d="M -25, -5 Q 0, 5 25, -5" />
          </g>
        </g>
      )}

      {/* ====================================================================
          3. TYPOGRAPHY LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="baroque-text">
          {/* Monogram inside cartouche */}
          <text
            x="300"
            y="244"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.monogram.fontFamily}
            fontSize={state.monogram.fontSize}
            fontWeight="bold"
            letterSpacing={state.monogram.letterSpacing}
          >
            {state.monogram.text}
          </text>

          {/* Greeting / Subtitle */}
          <text
            x="300"
            y="320"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.greeting.fontFamily}
            fontSize={Math.min(state.greeting.fontSize, 15)}
            fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
            letterSpacing={state.greeting.letterSpacing}
          >
            {state.greeting.text}
          </text>

          {/* Couple Names */}
          <text
            x="300"
            y="380"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize * 0.9}
            fontWeight={state.names.isBold ? 'bold' : 'normal'}
            letterSpacing={state.names.letterSpacing}
            filter="drop-shadow(0 1px 3px rgba(0,0,0,0.15))"
          >
            {state.names.text}
          </text>

          {/* Date */}
          <text
            x="300"
            y="465"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.date.fontFamily}
            fontSize={Math.min(state.date.fontSize, 13)}
            letterSpacing={state.date.letterSpacing}
            opacity="0.9"
          >
            {state.date.text}
          </text>

          {/* Venue */}
          <text
            x="300"
            y="500"
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
          4. SECONDARY PIECE: LUXURY SILK TASSEL SVG
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g
          id="hanging-silk-tassel"
          transform={`translate(${holeX}, ${holeY})`}
          filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
        >
          {/* Cord loop through the eyelet */}
          <path
            d="M 0, 0 C -12, -25 -10, -55 0, -65 C 10, -55 12, -25 0, 0"
            fill="none"
            stroke={secondaryCol}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 0, 0 C -12, -25 -10, -55 0, -65 C 10, -55 12, -25 0, 0"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeDasharray="2, 3"
            opacity="0.4"
          />

          {/* Tassel Cap / Bead */}
          <circle cx="0" cy="-65" r="7" fill={artworkCol} stroke="#1A0D11" strokeWidth="0.5" />
          <ellipse cx="0" cy="-56" rx="9" ry="6" fill={secondaryCol} />
          <rect x="-9" y="-55" width="18" height="3" fill={artworkCol} />

          {/* Flowing Silk Strands */}
          <g>
            {/* Base gradient fan for silk volume */}
            <path
              d={`
                M -8, -52
                C -12, -30 -22, 10 -25, 45
                C -15, 48 15, 48 25, 45
                C 22, 10 12, -30 8, -52
                Z
              `}
              fill="url(#silk-tassel-gradient)"
            />

            {/* Individual silky strand lines for high realism */}
            {[-18, -14, -10, -6, -2, 2, 6, 10, 14, 18].map((offset, idx) => (
              <line
                key={`strand-${idx}`}
                x1={offset * 0.35}
                y1="-52"
                x2={offset * 1.3}
                y2="45"
                stroke="url(#silk-tassel-strands)"
                strokeWidth="1.2"
                opacity="0.75"
              />
            ))}
          </g>
        </g>
      )}

      {/* ====================================================================
          5. CUT / DIELINE LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-baroque-tag" opacity={state.activeLayerMode === 'cut' ? 1 : 0.4}>
          {/* Tag Outline */}
          <path
            d={baroqueTagPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* Ribbon Hole Punch */}
          <circle
            cx={holeX}
            cy={holeY}
            r={holeR}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />

          {state.activeLayerMode === 'cut' && (
            <text
              x="300"
              y={tagY + tagH + 30}
              textAnchor="middle"
              fill="#FF0000"
              fontSize="11"
              fontFamily="Cairo, sans-serif"
            >
              طقم التاغ الفيكتوري المحفور (Baroque Die-Cut Tag + Punch Hole 9mm) - 10×18 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
