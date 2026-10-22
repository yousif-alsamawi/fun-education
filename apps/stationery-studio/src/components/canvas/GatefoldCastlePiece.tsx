import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface GatefoldCastlePieceProps {
  state: StudioState;
}

/**
 * Template 12: البطاقة الملكية المطوية (Tri-Fold Gatefold Castle Invite)
 * - Symmetrical double gate doors with laser-cut lace filigree.
 * - Interactive isGatefoldOpen swings or slides the doors open to reveal the inner royal invite.
 * - Dashed blue vertical crease lines (#2563EB) at the left and right fold hinges.
 * - Center monogram wax/foil seal holding the gates closed.
 */
export const GatefoldCastlePiece: React.FC<GatefoldCastlePieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#D4AF37';
  const secondaryCol = state.secondaryPieceColor || '#0F1E36'; // Gate doors color
  const textCol = state.textColor || '#2D1B14';

  const isOpen = state.isGatefoldOpen;

  // Center panel coordinates (280 x 580)
  const centerW = 280;
  const cardH = 580;
  const cardY = 120;
  const centerX = 300 - centerW / 2; // 160

  // Gate doors width (140 each, meeting at x=300)
  const doorW = 140;

  // Door open offsets (slide outwards in 2D preview)
  const leftDoorTranslateX = isOpen ? -110 : 0;
  const rightDoorTranslateX = isOpen ? 110 : 0;

  return (
    <g id="template-gatefold-castle" className="template-gatefold">
      {/* ====================================================================
          1. INNER CARD (Revealed when gates are open or in print mode)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="gatefold-center-card">
          {/* Center Card Paper */}
          <rect
            x={centerX}
            y={cardY}
            width={centerW}
            height={cardH}
            rx="4"
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <rect
              x={centerX}
              y={cardY}
              width={centerW}
              height={cardH}
              rx="4"
              fill="url(#paper-texture-pattern)"
              opacity="0.35"
            />
          )}

          {/* Center Inset Gold Border */}
          <rect
            x={centerX + 12}
            y={cardY + 12}
            width={centerW - 24}
            height={cardH - 24}
            rx="2"
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* Center Castle / Damask Artwork */}
          <g transform={`translate(${centerX - 90}, ${cardY - 30})`}>
            <ArtworkPatterns
              patternStyle={state.artworkPatternStyle || 'watercolor-swan-palace'}
              artworkColor={artworkCol}
              artworkGradientEnd={state.artworkGradientEnd}
              accentColor={artworkCol}
              templateId={state.activeTemplateId}
            />
          </g>

          {/* Inner Typography */}
          <g id="gatefold-inner-text">
            {/* Top Monogram Crest */}
            <circle cx="300" cy={cardY + 70} r="28" fill="none" stroke={artworkCol} strokeWidth="1" />
            <circle cx="300" cy={cardY + 70} r="24" fill="none" stroke={artworkCol} strokeWidth="0.5" strokeDasharray="2, 2" />
            <text
              x="300"
              y={cardY + 76}
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
              x="300"
              y={cardY + 145}
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.greeting.fontFamily}
              fontSize={Math.min(state.greeting.fontSize, 15)}
              fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
            >
              {state.greeting.text}
            </text>

            {/* Main Names */}
            <text
              x="300"
              y={cardY + 215}
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.names.fontFamily}
              fontSize={state.names.fontSize * 0.88}
              fontWeight="bold"
            >
              {state.names.text}
            </text>

            {/* Date */}
            <text
              x="300"
              y={cardY + 280}
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
              x="300"
              y={cardY + 320}
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
          2. LASER-CUT LACE GATEFOLD DOORS (Left & Right)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="gatefold-doors-group">
          {/* LEFT GATE DOOR (Hinged at x=160, swings/slides left) */}
          <g
            id="left-gate-door"
            className="transition-transform duration-500 ease-out"
            transform={`translate(${leftDoorTranslateX}, 0)`}
            filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
          >
            <rect
              x={centerX - doorW}
              y={cardY}
              width={doorW}
              height={cardH}
              fill={secondaryCol}
              opacity={isOpen ? 0.9 : 0.98}
            />
            {/* Ornate Laser Lace Grid Patterns */}
            <g stroke={artworkCol} strokeWidth="0.8" fill="none" opacity="0.7">
              {Array.from({ length: 8 }).map((_, i) => (
                <path
                  key={`left-lace-${i}`}
                  d={`
                    M ${centerX - doorW + 15}, ${cardY + 40 + i * 65}
                    Q ${centerX - doorW / 2}, ${cardY + 20 + i * 65} ${centerX - 10}, ${cardY + 40 + i * 65}
                    Q ${centerX - doorW / 2}, ${cardY + 60 + i * 65} ${centerX - doorW + 15}, ${cardY + 40 + i * 65}
                  `}
                />
              ))}
              <line x1={centerX - 5} y1={cardY + 10} x2={centerX - 5} y2={cardY + cardH - 10} strokeWidth="1.2" />
            </g>
          </g>

          {/* RIGHT GATE DOOR (Hinged at x=440, swings/slides right) */}
          <g
            id="right-gate-door"
            className="transition-transform duration-500 ease-out"
            transform={`translate(${rightDoorTranslateX}, 0)`}
            filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
          >
            <rect
              x={centerX + centerW}
              y={cardY}
              width={doorW}
              height={cardH}
              fill={secondaryCol}
              opacity={isOpen ? 0.9 : 0.98}
            />
            {/* Ornate Laser Lace Grid Patterns */}
            <g stroke={artworkCol} strokeWidth="0.8" fill="none" opacity="0.7">
              {Array.from({ length: 8 }).map((_, i) => (
                <path
                  key={`right-lace-${i}`}
                  d={`
                    M ${centerX + centerW + 10}, ${cardY + 40 + i * 65}
                    Q ${centerX + centerW + doorW / 2}, ${cardY + 20 + i * 65} ${centerX + centerW + doorW - 15}, ${cardY + 40 + i * 65}
                    Q ${centerX + centerW + doorW / 2}, ${cardY + 60 + i * 65} ${centerX + centerW + 10}, ${cardY + 40 + i * 65}
                  `}
                />
              ))}
              <line x1={centerX + centerW + 5} y1={cardY + 10} x2={centerX + centerW + 5} y2={cardY + cardH - 10} strokeWidth="1.2" />
            </g>
          </g>
        </g>
      )}

      {/* ====================================================================
          3. CENTER MONOGRAM SEAL MEDALLION (Holds the gates closed)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g
          id="gatefold-center-seal"
          className="transition-opacity duration-300"
          opacity={isOpen ? 0 : 1}
          transform={`translate(300, ${cardY + cardH / 2})`}
          filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
        >
          <circle cx="0" cy="0" r="38" fill={artworkCol} stroke="#1A0D11" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="34" fill={cardBase} />
          <circle cx="0" cy="0" r="30" fill="none" stroke={artworkCol} strokeWidth="1" strokeDasharray="3, 2" />
          <text
            x="0"
            y="8"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.monogram.fontFamily}
            fontSize="18"
            fontWeight="bold"
          >
            {state.monogram.text}
          </text>
        </g>
      )}

      {/* ====================================================================
          4. CUT & CREASE LINES LAYER (Plotter Standard)
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-gatefold" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          {/* Outer Sheet Perimeter Cut (Solid Red, Hairline 0.75pt) */}
          <rect
            x={centerX - doorW}
            y={cardY}
            width={doorW + centerW + doorW} // 560 mm total
            height={cardH}
            rx="4"
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* DASHED BLUE CREASE LINES (Vertical Fold Hinges) */}
          {/* Left fold line */}
          <line
            x1={centerX}
            y1={cardY}
            x2={centerX}
            y2={cardY + cardH}
            stroke={state.creaseStrokeColor || '#2563EB'}
            strokeWidth="0.75"
            strokeDasharray="4, 4"
          />
          {/* Right fold line */}
          <line
            x1={centerX + centerW}
            y1={cardY}
            x2={centerX + centerW}
            y2={cardY + cardH}
            stroke={state.creaseStrokeColor || '#2563EB'}
            strokeWidth="0.75"
            strokeDasharray="4, 4"
          />

          {state.activeLayerMode === 'cut' && (
            <>
              <text
                x="300"
                y={cardY + cardH + 30}
                textAnchor="middle"
                fill="#FF0000"
                fontSize="11"
                fontFamily="Cairo, sans-serif"
                fontWeight="bold"
              >
                مخطط البطاقة الملكية المطوية ثلاثية الطيات (Tri-Fold Gatefold Sheet) - 15×20 سم
              </text>
              <text
                x="300"
                y={cardY + cardH + 48}
                textAnchor="middle"
                fill="#2563EB"
                fontSize="10"
                fontFamily="Cairo, sans-serif"
              >
                --- خطوط الطي الرأسية المنقطة باللون الأزرق (Vertical Score Lines)
              </text>
            </>
          )}
        </g>
      )}
    </g>
  );
};
