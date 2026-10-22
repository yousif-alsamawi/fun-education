import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface SlitLockCardPieceProps {
  state: StudioState;
}

/**
 * Template 2: بطاقة القفل بالوردة البارزة (Updated with Multi-Layer Colors & Patterns)
 * - Card Base Color: state.cardBaseColor
 * - Artwork Pattern: state.artworkColor / state.artworkGradientEnd
 * - Lily Flower / Secondary Insert: state.secondaryPieceColor
 * - Typography & Names: state.textColor
 */
export const SlitLockCardPiece: React.FC<SlitLockCardPieceProps> = ({ state }) => {
  // Scalloped Vertical Oval Dieline Path
  const ovalCardPath = `
    M 300, 60
    C 410, 60 500, 150 510, 260
    C 515, 330 495, 370 510, 430
    C 525, 490 510, 570 480, 630
    C 435, 715 375, 760 300, 760
    C 225, 760 165, 715 120, 630
    C 90, 570 75, 490 90, 430
    C 105, 370 85, 330 90, 260
    C 100, 150 190, 60 300, 60
    Z
  `;

  // Horizontal Slit coordinates
  const slitX1 = 210;
  const slitX2 = 390;
  const slitY = 480;

  // Flower insertion offsets
  const flowerInsertedY = 410;
  const flowerExtractedY = 250;
  const flowerY = state.isFlowerInserted ? flowerInsertedY : flowerExtractedY;
  const flowerX = 300;

  const cardBase = state.cardBaseColor || '#5E6B38';
  const artworkCol = state.artworkColor || '#58111A';
  const secondaryCol = state.secondaryPieceColor || '#FAFAFA';
  const textCol = state.textColor || '#F5E6C8';

  return (
    <g id="template-slit-lock-tag" className="template-slit-lock">
      <defs>
        {/* Realistic White Lily Petal Gradient */}
        <linearGradient id="lily-petal-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor={secondaryCol} />
          <stop offset="100%" stopColor="#DDD5C7" />
        </linearGradient>

        {/* Lily Stem Gradient */}
        <linearGradient id="lily-stem-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A6B3D" />
          <stop offset="50%" stopColor="#6C8F5B" />
          <stop offset="100%" stopColor="#3B5730" />
        </linearGradient>
      </defs>

      {/* 
        ========================================================================
        LAYER 0: Base Card Paper Silhouette (Mockup & Print)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-paper-backdrop">
          {/* Main Oval Card Base Fill (Layer 1: Card Base Color) */}
          <path
            d={ovalCardPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path
              d={ovalCardPath}
              fill="url(#paper-texture-pattern)"
              opacity="0.4"
            />
          )}
          {/* Scalloped inner border */}
          <path
            d={ovalCardPath}
            fill="none"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1.2"
            transform="scale(0.96) translate(12, 16)"
            opacity="0.8"
          />
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 1: Artwork Layer (Artwork Patterns & Slit Guides)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-artwork">
          {/* DYNAMIC PATTERN STYLE */}
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'olive-lily-branches'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={artworkCol}
            templateId={state.activeTemplateId}
          />

          {/* Luxury Monogram Cartouche at top (x=300, y=160) */}
          <g id="monogram-oval-crest" transform="translate(300, 160)">
            <ellipse rx="42" ry="48" fill="none" stroke="url(#dynamic-artwork-gradient)" strokeWidth="1.2" />
            <ellipse rx="38" ry="44" fill="none" stroke="url(#dynamic-artwork-gradient)" strokeWidth="0.6" strokeDasharray="2, 3" />
            <circle cx="0" cy="-48" r="3" fill={artworkCol} />
            <circle cx="0" cy="48" r="3" fill={artworkCol} />
          </g>

          {/* Slit Guide Highlight Line */}
          <line
            x1={slitX1 - 10}
            y1={slitY}
            x2={slitX2 + 10}
            y2={slitY}
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1"
            strokeDasharray="4, 4"
            opacity="0.6"
          />
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 2: Text Layer (Monogram, Greeting, Names, Venue)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-text">
          {/* Monogram inside oval crest */}
          <text
            x="300"
            y="168"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.monogram.fontFamily}
            fontSize={state.monogram.fontSize}
            fontWeight={state.monogram.isBold ? 'bold' : 'normal'}
            letterSpacing={state.monogram.letterSpacing}
          >
            {state.monogram.text}
          </text>

          {/* Main Greeting / Quote */}
          <text
            x="300"
            y="260"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.greeting.fontFamily}
            fontSize={state.greeting.fontSize}
            fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
            letterSpacing={state.greeting.letterSpacing}
          >
            {state.greeting.text}
          </text>

          {/* MAIN NAMES - Below the slit */}
          <text
            x="300"
            y="565"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize}
            fontWeight={state.names.isBold ? 'bold' : 'normal'}
            letterSpacing={state.names.letterSpacing}
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
          >
            {state.names.text}
          </text>

          {/* Date Text */}
          <text
            x="300"
            y="615"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.date.fontFamily}
            fontSize={state.date.fontSize}
            letterSpacing={state.date.letterSpacing}
            opacity="0.95"
          >
            {state.date.text}
          </text>

          {/* Location Text */}
          <text
            x="300"
            y="650"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.location.fontFamily}
            fontSize={state.location.fontSize}
            letterSpacing={state.location.letterSpacing}
          >
            {state.location.text}
          </text>
        </g>
      )}

      {/* 
        ========================================================================
        DIE-CUT WHITE LILY FLOWER WITH STEM (Animated Slit-Lock Insertion)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g
          id="flower-insert-piece"
          className="transition-transform duration-500 ease-out"
          transform={`translate(${flowerX}, ${flowerY})`}
        >
          {state.activeLayerMode === 'mockup' && (
            <filter id="lily-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.35" />
            </filter>
          )}

          {/* STEM (Slides into the horizontal slit) */}
          <g id="lily-stem">
            <path
              d="M -6, 20 C -4, 60 -5, 110 -6, 170 L 6, 170 C 5, 110 4, 60 6, 20 Z"
              fill="url(#lily-stem-gradient)"
              stroke="#2E4A25"
              strokeWidth="0.8"
              filter={state.activeLayerMode === 'mockup' ? 'url(#lily-shadow)' : undefined}
            />
            <path
              d="M -5, 60 C -30, 40 -50, 50 -60, 70 C -45, 75 -25, 70 -5, 68 Z"
              fill="url(#lily-stem-gradient)"
              stroke="#2E4A25"
              strokeWidth="0.6"
            />
            <path
              d="M 5, 85 C 30, 65 50, 75 60, 95 C 45, 100 25, 95 5, 93 Z"
              fill="url(#lily-stem-gradient)"
              stroke="#2E4A25"
              strokeWidth="0.6"
            />
          </g>

          {/* WHITE LILY BLOOM */}
          <g id="lily-bloom" filter={state.activeLayerMode === 'mockup' ? 'url(#lily-shadow)' : undefined}>
            {/* Back petals */}
            <path
              d="M 0,0 C -30,-40 -55,-90 0,-130 C 55,-90 30,-40 0,0 Z"
              fill="url(#lily-petal-gradient)"
              stroke="#C4BAA9"
              strokeWidth="0.7"
            />
            <path
              d="M 0,0 C -50,-20 -110,-40 -120,5 C -90,30 -40,15 0,0 Z"
              fill="url(#lily-petal-gradient)"
              stroke="#C4BAA9"
              strokeWidth="0.7"
            />
            <path
              d="M 0,0 C 50,-20 110,-40 120,5 C 90,30 40,15 0,0 Z"
              fill="url(#lily-petal-gradient)"
              stroke="#C4BAA9"
              strokeWidth="0.7"
            />

            {/* Front Petals */}
            <path
              d="M 0,0 C -35,-10 -75,30 -60,70 C -30,55 -15,25 0,0 Z"
              fill="url(#lily-petal-gradient)"
              stroke="#C4BAA9"
              strokeWidth="0.7"
            />
            <path
              d="M 0,0 C 35,-10 75,30 60,70 C 30,55 15,25 0,0 Z"
              fill="url(#lily-petal-gradient)"
              stroke="#C4BAA9"
              strokeWidth="0.7"
            />
            <path
              d="M 0,0 C -20,20 -25,60 0,90 C 25,60 20,20 0,0 Z"
              fill="url(#lily-petal-gradient)"
              stroke="#C4BAA9"
              strokeWidth="0.7"
            />

            {/* Golden Pistils & Stamens */}
            <g stroke={artworkCol} strokeWidth="1.2" fill="none">
              <path d="M 0,0 Q -10,-25 -15,-45" />
              <path d="M 0,0 Q 0,-30 0,-50" />
              <path d="M 0,0 Q 10,-25 15,-45" />
              <circle cx="-15" cy="-45" r="2.5" fill={artworkCol} />
              <circle cx="0" cy="-50" r="2.5" fill={artworkCol} />
              <circle cx="15" cy="-45" r="2.5" fill={artworkCol} />
            </g>
          </g>

          {state.activeLayerMode === 'mockup' && (
            <g opacity={state.isFlowerInserted ? 1 : 0}>
              <rect x="-80" y="70" width="160" height="4" rx="2" fill="#000" opacity="0.4" />
            </g>
          )}
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 4: Cut Lines / Dieline Layer (Plotter Cameo/Skycut Hairline)
        ========================================================================
      */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-slit-lock" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          <path
            d={ovalCardPath}
            fill="none"
            stroke={state.dielineStrokeColor}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* THE HORIZONTAL PRECISION CUT-SLIT */}
          <line
            x1={slitX1}
            y1={slitY}
            x2={slitX2}
            y2={slitY}
            stroke={state.dielineStrokeColor}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1.5'}
          />
          <circle cx={slitX1} cy={slitY} r="1.5" fill="none" stroke={state.dielineStrokeColor} strokeWidth="0.75" />
          <circle cx={slitX2} cy={slitY} r="1.5" fill="none" stroke={state.dielineStrokeColor} strokeWidth="0.75" />

          {state.activeLayerMode === 'cut' && (
            <g transform="translate(680, 410)">
              <path
                d="
                  M 0,-130
                  C 45,-90 30,-40 50,-20
                  C 110,-40 120,5 90,30
                  C 75,30 60,70 25,60
                  C 20,20 6,20 6,170
                  L -6,170
                  C -6,20 -20,20 -25,60
                  C -60,70 -75,30 -90,30
                  C -120,5 -110,-40 -50,-20
                  C -30,-40 -45,-90 0,-130
                  Z
                "
                fill="none"
                stroke={state.dielineStrokeColor}
                strokeWidth="0.75"
              />
              <text x="0" y="200" textAnchor="middle" fill="#E11D48" fontSize="10" fontFamily="Cairo, sans-serif">
                قطعة 2: زهرة الليلي المجسمة والساق (Die-cut Insert)
              </text>
            </g>
          )}

          {state.activeLayerMode === 'cut' && (
            <text x="300" y="785" textAnchor="middle" fill="#E11D48" fontSize="10" fontFamily="Cairo, sans-serif">
              قطعة 1: البطاقة البيضاوية مع الشق الأفقي (Horizontal Slit) - 10×17 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
