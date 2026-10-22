import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface MatchstickCandleCardPieceProps {
  state: StudioState;
}

/**
 * Template 13: بطاقة الاحتفال التفاعلية بعود الثقاب والفتيل (Interactive Matchstick & Candle Card)
 * - Vintage scalloped badge card.
 * - Central celebratory cake illustration with real candle & cherry.
 * - 3mm circular punch hole right above the candle for real candle wick.
 * - Two parallel punch holes (3.5mm) on the left border for tying ribbon holding a matchstick.
 * - Textured striker strip at the bottom.
 */
export const MatchstickCandleCardPiece: React.FC<MatchstickCandleCardPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#8B1E3F';
  const secondaryCol = state.secondaryPieceColor || '#D4AF37';
  const textCol = state.textColor || '#2D1B14';

  const cardX = 135;
  const cardY = 120;
  const cardW = 330;
  const cardH = 580;

  // Punch hole coordinates
  const wickHoleX = 300;
  const wickHoleY = cardY + 205; // 3mm punch hole for candle wick
  const wickHoleR = 5;

  const ribbonHole1X = cardX + 32;
  const ribbonHole1Y = cardY + 280;
  const ribbonHole2X = cardX + 32;
  const ribbonHole2Y = cardY + 340;
  const ribbonHoleR = 4;

  // Striker strip rect coordinates at bottom
  const strikerX = cardX + 45;
  const strikerY = cardY + cardH - 65;
  const strikerW = cardW - 90;
  const strikerH = 22;

  // Scalloped perimeter path
  const scallopedPath = `
    M ${cardX + 25}, ${cardY}
    L ${cardX + cardW - 25}, ${cardY}
    Q ${cardX + cardW}, ${cardY} ${cardX + cardW}, ${cardY + 25}
    L ${cardX + cardW}, ${cardY + cardH - 25}
    Q ${cardX + cardW}, ${cardY + cardH} ${cardX + cardW - 25}, ${cardY + cardH}
    L ${cardX + 25}, ${cardY + cardH}
    Q ${cardX}, ${cardY + cardH} ${cardX}, ${cardY + cardH - 25}
    L ${cardX}, ${cardY + 25}
    Q ${cardX}, ${cardY} ${cardX + 25}, ${cardY}
    Z
  `;

  return (
    <g id="template-matchstick-candle-card" className="template-matchstick-card">
      <defs>
        {/* Striker Strip Texture Pattern */}
        <pattern id="striker-strip-texture" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#4A2810" />
          <circle cx="2" cy="2" r="1.2" fill="#2E1505" />
          <circle cx="5" cy="5" r="1" fill="#6B3A18" />
        </pattern>

        {/* Real Flame Glow */}
        <radialGradient id="flame-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="40%" stopColor="#FFAE34" />
          <stop offset="80%" stopColor="#FF4D4D" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF4D4D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ====================================================================
          1. PAPER BACKDROP
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="matchstick-card-backdrop">
          <path
            d={scallopedPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path d={scallopedPath} fill="url(#paper-texture-pattern)" opacity="0.35" />
          )}

          {/* Scalloped Inset Vintage Foil Border */}
          <rect
            x={cardX + 12}
            y={cardY + 12}
            width={cardW - 24}
            height={cardH - 24}
            rx="16"
            fill="none"
            stroke={artworkCol}
            strokeWidth="1.2"
            opacity="0.8"
          />
          <rect
            x={cardX + 16}
            y={cardY + 16}
            width={cardW - 32}
            height={cardH - 32}
            rx="12"
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.6"
            strokeDasharray="4, 3"
            opacity="0.6"
          />
        </g>
      )}

      {/* ====================================================================
          2. ARTWORK: CELEBRATORY CAKE & CHERRY ILLUSTRATION
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="matchstick-card-artwork">
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'petal-veins'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={secondaryCol}
            templateId={state.activeTemplateId}
          />

          {/* Celebratory Tiered Cake (Center x=300, y=280) */}
          <g id="celebratory-cake" transform="translate(300, 270)">
            {/* Cake Base Plate */}
            <ellipse rx="75" ry="14" fill={secondaryCol} opacity="0.3" stroke={artworkCol} strokeWidth="1" />

            {/* Cake Bottom Tier */}
            <path
              d="M -60,0 L -60,-45 C -60,-55 60,-55 60,-45 L 60,0 C 60,10 -60,10 -60,0 Z"
              fill={cardBase}
              stroke={artworkCol}
              strokeWidth="1.2"
            />
            {/* Frosting Drips */}
            <path
              d="M -60,-45 C -45,-35 -35,-48 -20,-40 C -5,-48 10,-38 25,-45 C 40,-35 50,-48 60,-45"
              fill="none"
              stroke={artworkCol}
              strokeWidth="1.5"
            />

            {/* Cake Top Tier */}
            <path
              d="M -40,-45 L -40,-80 C -40,-88 40,-88 40,-80 L 40,-45 Z"
              fill={cardBase}
              stroke={artworkCol}
              strokeWidth="1.2"
            />

            {/* Candle Body */}
            <rect x="-4" y="-115" width="8" height="35" rx="2" fill={secondaryCol} stroke={artworkCol} strokeWidth="0.8" />
            <line x1="-2" y1="-115" x2="2" y2="-90" stroke="#FFFFFF" strokeWidth="1" />

            {/* Real Flame in Mockup */}
            {state.activeLayerMode === 'mockup' && (
              <g transform="translate(0, -125)">
                <ellipse rx="8" ry="15" fill="url(#flame-glow)" />
                <path d="M 0, -14 C 5, -8 4, 0 0, 2 C -4, 0 -5, -8 0, -14 Z" fill="#FFEAA7" />
              </g>
            )}
          </g>

          {/* 3. MATCH STRIKER STRIP AT BOTTOM */}
          <g id="striker-strip-group">
            <rect
              x={strikerX}
              y={strikerY}
              width={strikerW}
              height={strikerH}
              rx="4"
              fill="url(#striker-strip-texture)"
              stroke="#2E1505"
              strokeWidth="0.8"
            />
            <text
              x={cardX + cardW / 2}
              y={strikerY + 15}
              textAnchor="middle"
              fill="#F5E6C8"
              fontSize="9"
              fontFamily="Cairo, sans-serif"
              fontWeight="bold"
              letterSpacing="1"
            >
              ✦ شريط إشعال كبريت حقيقي (STRIKER STRIP) ✦
            </text>
          </g>
        </g>
      )}

      {/* ====================================================================
          3. TYPOGRAPHY LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="matchstick-card-text">
          {/* Header Monogram / Occasion */}
          <text
            x={cardX + cardW / 2}
            y={cardY + 50}
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.monogram.fontFamily}
            fontSize="18"
            fontWeight="bold"
            letterSpacing="3"
          >
            ✦ MAKE A WISH ✦
          </text>

          {/* Main Couple Names / Celebrant */}
          <text
            x={cardX + cardW / 2}
            y={cardY + 85}
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize * 0.78}
            fontWeight="bold"
          >
            {state.names.text}
          </text>

          {/* Subtitle / Wish Quote */}
          <text
            x={cardX + cardW / 2}
            y={cardY + 115}
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.greeting.fontFamily}
            fontSize="12"
            fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
          >
            {state.greeting.text}
          </text>

          {/* Instructions near wick hole */}
          <text
            x={cardX + cardW / 2}
            y={wickHoleY - 18}
            textAnchor="middle"
            fill={artworkCol}
            fontSize="9"
            fontFamily="Cairo, sans-serif"
            fontWeight="bold"
          >
            مرر فتيل شمعتك هنا واشعلها بالثقاب 🔥
          </text>

          {/* Date & Location below cake */}
          <text
            x={cardX + cardW / 2}
            y={cardY + 420}
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.date.fontFamily}
            fontSize="11"
            fontWeight="bold"
          >
            {state.date.text}
          </text>
          <text
            x={cardX + cardW / 2}
            y={cardY + 445}
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.location.fontFamily}
            fontSize="10"
          >
            {state.location.text}
          </text>
        </g>
      )}

      {/* ====================================================================
          4. REAL MATCHSTICK & SATIN RIBBON ATTACHMENT (Mockup Mode)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && state.matchstickAttached && (
        <g id="attached-matchstick-ribbon" transform={`translate(${ribbonHole1X}, ${ribbonHole1Y + 30})`}>
          {/* Real Wooden Matchstick */}
          <rect x="-4" y="-55" width="8" height="110" rx="1.5" fill="#E6C89C" stroke="#B08D5B" strokeWidth="0.6" />
          {/* Red/Crimson Match Head */}
          <ellipse cx="0" cy="-55" rx="5.5" ry="8" fill={artworkCol} />

          {/* Satin Ribbon Bow tying matchstick through the two holes */}
          <g>
            <path d="M -12, -25 Q 0, -35 12, -25" stroke={secondaryCol} strokeWidth="3" fill="none" />
            <path d="M -12, 25 Q 0, 35 12, 25" stroke={secondaryCol} strokeWidth="3" fill="none" />
            {/* Ribbon Bow Center knot */}
            <circle cx="0" cy="0" r="5" fill={secondaryCol} stroke="#1A0D11" strokeWidth="0.5" />
            <path d="M 0,0 C -15,-10 -25,10 0,0" fill={secondaryCol} opacity="0.9" />
            <path d="M 0,0 C 15,-10 25,10 0,0" fill={secondaryCol} opacity="0.9" />
          </g>
        </g>
      )}

      {/* ====================================================================
          5. CUT / DIELINE LAYER (Solid Red Cuts #FF0000 Hairline)
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-matchstick" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          {/* Solid Red Perimeter Cut */}
          <path
            d={scallopedPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* 3mm Circular Punch Hole for Candle Wick */}
          <circle
            cx={wickHoleX}
            cy={wickHoleY}
            r={wickHoleR}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />

          {/* Left Ribbon Attachment Punch Holes (3.5mm) */}
          <circle
            cx={ribbonHole1X}
            cy={ribbonHole1Y}
            r={ribbonHoleR}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />
          <circle
            cx={ribbonHole2X}
            cy={ribbonHole2Y}
            r={ribbonHoleR}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />

          {/* Match Striker Placement Outline */}
          <rect
            x={strikerX}
            y={strikerY}
            width={strikerW}
            height={strikerH}
            rx="4"
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.5"
            strokeDasharray="2, 2"
          />

          {state.activeLayerMode === 'cut' && (
            <text
              x={cardX + cardW / 2}
              y={cardY + cardH + 30}
              textAnchor="middle"
              fill="#FF0000"
              fontSize="11"
              fontFamily="Cairo, sans-serif"
            >
              بطاقة عود الثقاب وشمعة الاحتفال (فتيل 3 مم + ثقبا شريطة 3.5 مم) - 10×15 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
