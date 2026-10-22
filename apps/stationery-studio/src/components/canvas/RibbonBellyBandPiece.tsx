import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface RibbonBellyBandPieceProps {
  state: StudioState;
}

/**
 * Template 6: بطاقة الشريط الملتف (3D Ribbon Belly-Band Suite)
 * - Main Card: Classic notched-corner card with embossed foil frame.
 * - Secondary Piece: 3D Curved Ribbon Banner across the center wrapping the card.
 * - Interactive: isRibbonWrapped toggles ribbon placement.
 */
export const RibbonBellyBandPiece: React.FC<RibbonBellyBandPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#D4AF37';
  const secondaryCol = state.secondaryPieceColor || '#5E6B38'; // Ribbon color
  const textCol = state.textColor || '#2D1B14';

  const cardX = 130;
  const cardY = 120;
  const cardW = 340;
  const cardH = 580;

  // Notched corner card path
  const notch = 18;
  const notchedCardPath = `
    M ${cardX + notch}, ${cardY}
    L ${cardX + cardW - notch}, ${cardY}
    L ${cardX + cardW}, ${cardY + notch}
    L ${cardX + cardW}, ${cardY + cardH - notch}
    L ${cardX + cardW - notch}, ${cardY + cardH}
    L ${cardX + notch}, ${cardY + cardH}
    L ${cardX}, ${cardY + cardH - notch}
    L ${cardX}, ${cardY + notch}
    Z
  `;

  // Ribbon Y position
  const ribbonCenterY = 410;
  const isRibbonActive = state.isRibbonWrapped;

  return (
    <g id="template-ribbon-belly-band" className="template-ribbon-band">
      <defs>
        {/* Ribbon 3D Volume Gradient */}
        <linearGradient id="ribbon-3d-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="30%" stopColor={secondaryCol} />
          <stop offset="85%" stopColor={secondaryCol} />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
        </linearGradient>

        {/* Ribbon Fold Shadow */}
        <linearGradient id="ribbon-fold-shadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ====================================================================
          1. MAIN CARD BACKDROP & FRAME
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="ribbon-card-backdrop">
          <path
            d={notchedCardPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path
              d={notchedCardPath}
              fill="url(#paper-texture-pattern)"
              opacity="0.35"
            />
          )}

          {/* Double Embossed Inset Foil Frame */}
          <path
            d={notchedCardPath}
            fill="none"
            stroke={artworkCol}
            strokeWidth="1.2"
            transform="scale(0.95) translate(15, 18)"
            opacity="0.8"
          />
          <path
            d={notchedCardPath}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.6"
            strokeDasharray="4, 3"
            transform="scale(0.92) translate(24, 29)"
            opacity="0.6"
          />
        </g>
      )}

      {/* ====================================================================
          2. ARTWORK & CORNER ORNAMENTS
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="ribbon-card-artwork">
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'vintage-baroque'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={artworkCol}
            templateId={state.activeTemplateId}
          />

          {/* Monogram Crest at Top (x=300, y=210) */}
          <g transform="translate(300, 215)">
            <circle cx="0" cy="0" r="32" fill="none" stroke={artworkCol} strokeWidth="1.2" />
            <circle cx="0" cy="0" r="28" fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="3, 2" />
            <path d="M -15, -34 Q 0, -42 15, -34" fill="none" stroke={artworkCol} strokeWidth="1" />
            <circle cx="0" cy="-42" r="3" fill={artworkCol} />
          </g>
        </g>
      )}

      {/* ====================================================================
          3. TYPOGRAPHY LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="ribbon-card-text">
          {/* Monogram inside top crest */}
          <text
            x="300"
            y="222"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.monogram.fontFamily}
            fontSize={state.monogram.fontSize * 0.85}
            fontWeight="bold"
            letterSpacing={state.monogram.letterSpacing}
          >
            {state.monogram.text}
          </text>

          {/* Greeting */}
          <text
            x="300"
            y="290"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.greeting.fontFamily}
            fontSize={Math.min(state.greeting.fontSize, 15)}
            fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
            letterSpacing={state.greeting.letterSpacing}
          >
            {state.greeting.text}
          </text>

          {/* When ribbon is not active, names render directly on card */}
          {!isRibbonActive && (
            <text
              x="300"
              y="410"
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.names.fontFamily}
              fontSize={state.names.fontSize}
              fontWeight="bold"
            >
              {state.names.text}
            </text>
          )}

          {/* Date */}
          <text
            x="300"
            y="520"
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
            x="300"
            y="555"
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
          4. SECONDARY PIECE: 3D CURVED RIBBON BELLY-BAND
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && isRibbonActive && (
        <g
          id="curved-ribbon-band"
          transform={`translate(300, ${ribbonCenterY})`}
          filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
        >
          {/* Back folded ends / tails */}
          <path
            d="M -180, 10 L -210, -5 L -205, 30 L -180, 45 Z"
            fill={secondaryCol}
            opacity="0.8"
          />
          <path
            d="M 180, 10 L 210, -5 L 205, 30 L 180, 45 Z"
            fill={secondaryCol}
            opacity="0.8"
          />

          {/* Back fold under-shadows */}
          <path d="M -180, 10 L -165, 35 L -180, 45 Z" fill="#000000" opacity="0.4" />
          <path d="M 180, 10 L 165, 35 L 180, 45 Z" fill="#000000" opacity="0.4" />

          {/* Main 3D Flowing Ribbon Body */}
          <path
            d="
              M -170, -25
              C -90, -40 90, -40 170, -25
              C 185, -20 185, 45 170, 50
              C 90, 35 -90, 35 -170, 50
              C -185, 45 -185, -20 -170, -25
              Z
            "
            fill="url(#ribbon-3d-gradient)"
            stroke={artworkCol}
            strokeWidth="0.8"
          />

          {/* Top and Bottom Gold Stitched Edge Lines on Ribbon */}
          <path
            d="M -165, -20 C -85, -35 85, -35 165, -20"
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            strokeDasharray="3, 2"
          />
          <path
            d="M -165, 45 C -85, 30 85, 30 165, 45"
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            strokeDasharray="3, 2"
          />

          {/* Couple Names in Gold Foil on Ribbon */}
          <text
            x="0"
            y="18"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize * 0.9}
            fontWeight="bold"
            letterSpacing={state.names.letterSpacing + 1}
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.4))"
          >
            {state.names.text}
          </text>
        </g>
      )}

      {/* ====================================================================
          5. CUT / DIELINE LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-ribbon-card" opacity={state.activeLayerMode === 'cut' ? 1 : 0.4}>
          {/* Card perimeter */}
          <path
            d={notchedCardPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* Ribbon Strip Flat Layout in Cut Mode */}
          {state.activeLayerMode === 'cut' && (
            <g transform="translate(420, 0)">
              {/* Flat Ribbon Strip (400 x 75 mm) */}
              <rect
                x="60"
                y="360"
                width="380"
                height="75"
                rx="3"
                fill="none"
                stroke={state.dielineStrokeColor || '#FF0000'}
                strokeWidth="0.75"
              />
              {/* Score lines where the ribbon wraps around the card */}
              <line
                x1="120"
                y1="360"
                x2="120"
                y2="435"
                stroke={state.creaseStrokeColor || '#2563EB'}
                strokeWidth="0.75"
                strokeDasharray="4, 4"
              />
              <line
                x1="380"
                y1="360"
                x2="380"
                y2="435"
                stroke={state.creaseStrokeColor || '#2563EB'}
                strokeWidth="0.75"
                strokeDasharray="4, 4"
              />
              <text
                x="250"
                y="460"
                textAnchor="middle"
                fill="#FF0000"
                fontSize="11"
                fontFamily="Cairo, sans-serif"
              >
                قطعة 2: شريط الحزام الورقي الملتف (Belly Band Strip)
              </text>
              <text
                x="250"
                y="478"
                textAnchor="middle"
                fill="#2563EB"
                fontSize="10"
                fontFamily="Cairo, sans-serif"
              >
                --- خطوط طي زرقاء منقطة للالتفاف حول حواف الكرت
              </text>
            </g>
          )}

          {state.activeLayerMode === 'cut' && (
            <text
              x={cardX + cardW / 2}
              y={cardY + cardH + 30}
              textAnchor="middle"
              fill="#FF0000"
              fontSize="11"
              fontFamily="Cairo, sans-serif"
            >
              قطعة 1: البطاقة المشطوفة الزوايا (Notched Frame Card) - 13×19 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
