import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface TentTableStandPieceProps {
  state: StudioState;
}

/**
 * Template 16: ستاند الطاولة ثلاثي الأبعاد (3D Tent Table Stand + Pop-up Circle)
 * Supports 2 Sub-Styles:
 * - Sub-style A ('arch-tent'): Arch-shaped table stand with folding tent gusset base & 3D monogram badge.
 * - Sub-style B ('popup-circle'): Circular fold-up pop-up table stand where back circle stands vertically.
 */
export const TentTableStandPiece: React.FC<TentTableStandPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#D4AF37';
  const secondaryCol = state.secondaryPieceColor || '#58111A';
  const textCol = state.textColor || '#2D1B14';

  const subStyle = state.tableStandSubStyle || 'arch-tent';

  // Arch Tent Coordinates (280 x 520)
  const standX = 160;
  const standY = 130;
  const standW = 280;
  const standH = 460;
  const gussetH = 80; // Bottom folding base

  // Arch stand dieline path
  const archStandPath = `
    M ${standX}, ${standY + 110}
    C ${standX}, ${standY + 25} ${standX + 35}, ${standY} ${standX + standW / 2}, ${standY}
    C ${standX + standW - 35}, ${standY} ${standX + standW}, ${standY + 25} ${standX + standW}, ${standY + 110}
    L ${standX + standW}, ${standY + standH + gussetH}
    L ${standX}, ${standY + standH + gussetH}
    Z
  `;

  // Popup Circle Coordinates
  const circleCX = 300;
  const circleCY = 410;
  const circleR = 190;

  return (
    <g id="template-tent-table-stand" className="template-table-stand">
      {/* ====================================================================
          SUB-STYLE A: ARCH TENT TABLE STAND
          ==================================================================== */}
      {subStyle === 'arch-tent' && (
        <g id="substyle-arch-tent">
          {/* Paper Backdrop */}
          {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
            <g id="arch-tent-backdrop">
              <path
                d={archStandPath}
                fill={cardBase}
                filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
              />
              {state.activeLayerMode === 'mockup' && (
                <path d={archStandPath} fill="url(#paper-texture-pattern)" opacity="0.35" />
              )}

              {/* Inset Gold Arch Border */}
              <path
                d={`
                  M ${standX + 12}, ${standY + 110}
                  C ${standX + 12}, ${standY + 35} ${standX + 42}, ${standY + 12} ${standX + standW / 2}, ${standY + 12}
                  C ${standX + standW - 42}, ${standY + 12} ${standX + standW - 12}, ${standY + 35} ${standX + standW - 12}, ${standY + 110}
                  L ${standX + standW - 12}, ${standY + standH - 12}
                  L ${standX + 12}, ${standY + standH - 12}
                  Z
                `}
                fill="none"
                stroke={artworkCol}
                strokeWidth="1.2"
                opacity="0.8"
              />
            </g>
          )}

          {/* Artwork Layer */}
          {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
            <g id="arch-tent-artwork">
              <ArtworkPatterns
                patternStyle={state.artworkPatternStyle || 'vintage-baroque'}
                artworkColor={artworkCol}
                artworkGradientEnd={state.artworkGradientEnd}
                accentColor={secondaryCol}
                templateId={state.activeTemplateId}
              />

              {/* Central Table Number Oval Frame */}
              <g transform={`translate(${standX + standW / 2}, ${standY + 190})`}>
                <ellipse rx="58" ry="68" fill="none" stroke={artworkCol} strokeWidth="1.5" />
                <ellipse rx="52" ry="62" fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="3, 2" />
                <circle cx="0" cy="-68" r="3" fill={artworkCol} />
                <circle cx="0" cy="68" r="3" fill={artworkCol} />
              </g>
            </g>
          )}

          {/* Typography Layer: Table Number, Guest Names, Date */}
          {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
            <g id="arch-tent-text">
              {/* Table Number Title */}
              <text
                x={standX + standW / 2}
                y={standY + 160}
                textAnchor="middle"
                fill={artworkCol}
                fontFamily="Cairo, sans-serif"
                fontSize="12"
                fontWeight="bold"
                letterSpacing="2"
              >
                طاولة رقم
              </text>

              {/* Big Table Number Display */}
              <text
                x={standX + standW / 2}
                y={standY + 215}
                textAnchor="middle"
                fill={textCol}
                fontFamily="'Playfair Display', serif"
                fontSize="48"
                fontWeight="bold"
              >
                05
              </text>

              {/* English Subtitle */}
              <text
                x={standX + standW / 2}
                y={standY + 238}
                textAnchor="middle"
                fill={artworkCol}
                fontFamily="'Playfair Display', serif"
                fontSize="10"
                letterSpacing="3"
              >
                TABLE FIVE
              </text>

              {/* Couple Welcome Tagline */}
              <text
                x={standX + standW / 2}
                y={standY + 310}
                textAnchor="middle"
                fill={textCol}
                fontFamily={state.names.fontFamily}
                fontSize={state.names.fontSize * 0.78}
                fontWeight="bold"
              >
                {state.names.text}
              </text>

              {/* Greeting */}
              <text
                x={standX + standW / 2}
                y={standY + 345}
                textAnchor="middle"
                fill={artworkCol}
                fontFamily={state.greeting.fontFamily}
                fontSize="12"
              >
                {state.greeting.text}
              </text>

              {/* Date */}
              <text
                x={standX + standW / 2}
                y={standY + 380}
                textAnchor="middle"
                fill={textCol}
                fontFamily={state.date.fontFamily}
                fontSize="11"
                opacity="0.9"
              >
                {state.date.text}
              </text>
            </g>
          )}

          {/* Side-Mounted 3D Monogram Badge */}
          {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
            <g
              id="side-monogram-badge"
              transform={`translate(${standX + standW - 15}, ${standY + 75})`}
              filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
            >
              <circle cx="0" cy="0" r="32" fill={secondaryCol} stroke={artworkCol} strokeWidth="1" />
              <circle cx="0" cy="0" r="28" fill="none" stroke={artworkCol} strokeWidth="0.8" strokeDasharray="3, 2" />
              <text
                x="0"
                y="6"
                textAnchor="middle"
                fill={artworkCol}
                fontFamily={state.monogram.fontFamily}
                fontSize="14"
                fontWeight="bold"
              >
                {state.monogram.text}
              </text>
            </g>
          )}

          {/* Cut & Crease Lines for Arch Stand */}
          {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
            <g id="layer-cut-lines-arch-stand" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
              <path
                d={archStandPath}
                fill="none"
                stroke={state.dielineStrokeColor || '#FF0000'}
                strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
                strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
              />

              {/* Dashed Blue Score Lines at Bottom Gusset Base */}
              <line
                x1={standX}
                y1={standY + standH}
                x2={standX + standW}
                y2={standY + standH}
                stroke={state.creaseStrokeColor || '#2563EB'}
                strokeWidth="0.75"
                strokeDasharray="4, 4"
              />
              <line
                x1={standX}
                y1={standY + standH + gussetH * 0.5}
                x2={standX + standW}
                y2={standY + standH + gussetH * 0.5}
                stroke={state.creaseStrokeColor || '#2563EB'}
                strokeWidth="0.75"
                strokeDasharray="4, 4"
              />

              {state.activeLayerMode === 'cut' && (
                <text
                  x={standX + standW / 2}
                  y={standY + standH + gussetH + 30}
                  textAnchor="middle"
                  fill="#FF0000"
                  fontSize="11"
                  fontFamily="Cairo, sans-serif"
                >
                  ستاند الطاولة المقوس (قاعدة خيمة ثلاثية الطي زرقاء منقطة) - 12×18 سم
                </text>
              )}
            </g>
          )}
        </g>
      )}

      {/* ====================================================================
          SUB-STYLE B: CIRCULAR POP-UP TABLE STAND
          ==================================================================== */}
      {subStyle === 'popup-circle' && (
        <g id="substyle-popup-circle">
          {/* Circular Backdrop */}
          {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
            <g id="popup-circle-backdrop">
              <circle
                cx={circleCX}
                cy={circleCY}
                r={circleR}
                fill={cardBase}
                filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
              />
              {state.activeLayerMode === 'mockup' && (
                <circle cx={circleCX} cy={circleCY} r={circleR} fill="url(#paper-texture-pattern)" opacity="0.35" />
              )}

              {/* Double Inset Gold Circular Frame */}
              <circle cx={circleCX} cy={circleCY} r={circleR - 12} fill="none" stroke={artworkCol} strokeWidth="1.2" opacity="0.8" />
              <circle cx={circleCX} cy={circleCY} r={circleR - 16} fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="4, 3" opacity="0.6" />
            </g>
          )}

          {/* Pop-up Center Artwork & Table Details */}
          {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
            <g id="popup-circle-content">
              {/* Center Monogram Cartouche */}
              <g transform={`translate(${circleCX}, ${circleCY - 65})`}>
                <polygon points="0,-25 25,0 0,25 -25,0" fill="none" stroke={artworkCol} strokeWidth="1" />
                <text x="0" y="5" textAnchor="middle" fill={artworkCol} fontFamily={state.monogram.fontFamily} fontSize="14" fontWeight="bold">
                  {state.monogram.text}
                </text>
              </g>

              {/* Big Table Number */}
              <text x={circleCX} y={circleCY + 15} textAnchor="middle" fill={textCol} fontFamily="'Playfair Display', serif" fontSize="52" fontWeight="bold">
                05
              </text>
              <text x={circleCX} y={circleCY + 40} textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="12" fontWeight="bold">
                طاولة رقم 05
              </text>

              {/* Couple Names */}
              <text x={circleCX} y={circleCY + 85} textAnchor="middle" fill={textCol} fontFamily={state.names.fontFamily} fontSize="16" fontWeight="bold">
                {state.names.text}
              </text>
              <text x={circleCX} y={circleCY + 115} textAnchor="middle" fill={artworkCol} fontFamily={state.date.fontFamily} fontSize="11">
                {state.date.text}
              </text>
            </g>
          )}

          {/* Cut & Crease Lines for Pop-up Circle */}
          {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
            <g id="layer-cut-lines-popup-circle" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
              <circle
                cx={circleCX}
                cy={circleCY}
                r={circleR}
                fill="none"
                stroke={state.dielineStrokeColor || '#FF0000'}
                strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
                strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
              />

              {/* Horizontal Center Crease Line where front half folds flat */}
              <line
                x1={circleCX - circleR}
                y1={circleCY}
                x2={circleCX + circleR}
                y2={circleCY}
                stroke={state.creaseStrokeColor || '#2563EB'}
                strokeWidth="0.75"
                strokeDasharray="4, 4"
              />

              {state.activeLayerMode === 'cut' && (
                <text x={circleCX} y={circleCY + circleR + 30} textAnchor="middle" fill="#FF0000" fontSize="11" fontFamily="Cairo, sans-serif">
                  ستاند البوب-أب الدائري (خط طي أزرق أفقي ينصف الدائرة) - قطر 19 سم
                </text>
              )}
            </g>
          )}
        </g>
      )}
    </g>
  );
};
