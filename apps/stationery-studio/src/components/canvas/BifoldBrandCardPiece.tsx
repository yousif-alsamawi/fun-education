import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface BifoldBrandCardPieceProps {
  state: StudioState;
}

/**
 * Template 20: مطوية البراندات الفاخرة (Luxury Square Bi-Fold Brand Card)
 * - Horizontal double-square unfolded dieline with center vertical crease line.
 * - Cover Mode: Laser filigree frame with gold foil monogram.
 * - Open Spread Mode: 2-column luxury editorial layout with greeting, names, and date.
 */
export const BifoldBrandCardPiece: React.FC<BifoldBrandCardPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#D4AF37';
  const secondaryCol = state.secondaryPieceColor || '#113E21';
  const textCol = state.textColor || '#2D1B14';

  const isOpen = state.isBifoldOpen;

  // Unfolded Dimensions: 2 squares of 260 x 260 side-by-side (Total 520 x 360 with margins)
  const bifoldX = 50;
  const bifoldY = 240;
  const squareW = 250;
  const cardH = 340;
  const totalW = squareW * 2; // 500

  // Closed Single Square Dimensions (Centered)
  const closedX = 175;
  const closedY = 240;
  const closedW = 270;
  const closedH = 340;

  return (
    <g id="template-bifold-brand-card" className="template-bifold-card">
      {/* ====================================================================
          MODE 1: OPEN 2-PAGE SPREAD (or Cut/Print Mode)
          ==================================================================== */}
      {(isOpen || state.activeLayerMode === 'cut' || state.activeLayerMode === 'print') && (
        <g id="bifold-open-spread">
          {/* Unfolded Paper Backdrop */}
          {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
            <g id="bifold-backdrop">
              <rect
                x={bifoldX}
                y={bifoldY}
                width={totalW}
                height={cardH}
                rx="6"
                fill={cardBase}
                filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
              />
              {state.activeLayerMode === 'mockup' && (
                <rect x={bifoldX} y={bifoldY} width={totalW} height={cardH} rx="6" fill="url(#paper-texture-pattern)" opacity="0.35" />
              )}

              {/* Left Square Page Inset Border */}
              <rect x={bifoldX + 12} y={bifoldY + 12} width={squareW - 24} height={cardH - 24} rx="4" fill="none" stroke={artworkCol} strokeWidth="1" opacity="0.8" />
              {/* Right Square Page Inset Border */}
              <rect x={bifoldX + squareW + 12} y={bifoldY + 12} width={squareW - 24} height={cardH - 24} rx="4" fill="none" stroke={artworkCol} strokeWidth="1" opacity="0.8" />
            </g>
          )}

          {/* Left Page (Inside Page 1): Editorial Message & Monogram */}
          {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
            <g id="bifold-left-page">
              <g transform={`translate(${bifoldX + squareW / 2}, ${bifoldY + 80})`}>
                <polygon points="0,-24 24,0 0,24 -24,0" fill="none" stroke={artworkCol} strokeWidth="1" />
                <text x="0" y="6" textAnchor="middle" fill={artworkCol} fontFamily={state.monogram.fontFamily} fontSize="14" fontWeight="bold">
                  {state.monogram.text}
                </text>
              </g>

              <text x={bifoldX + squareW / 2} y={bifoldY + 145} textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="11" fontWeight="bold" letterSpacing="1">
                ✦ رسالة شكر وعرفان ✦
              </text>
              <text x={bifoldX + squareW / 2} y={bifoldY + 185} textAnchor="middle" fill={textCol} fontFamily="Cairo, sans-serif" fontSize="12" fontWeight="bold">
                حضوركم يكتمل به بهاء فرحتنا
              </text>
              <text x={bifoldX + squareW / 2} y={bifoldY + 220} textAnchor="middle" fill={textCol} fontFamily={state.greeting.fontFamily} fontSize="11" opacity="0.9">
                {state.greeting.text}
              </text>
              <text x={bifoldX + squareW / 2} y={bifoldY + 280} textAnchor="middle" fill={artworkCol} fontFamily="'Great Vibes', cursive" fontSize="20">
                Forever & Always
              </text>
            </g>
          )}

          {/* Right Page (Inside Page 2): Main Invitation Details */}
          {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
            <g id="bifold-right-page">
              <text x={bifoldX + squareW + squareW / 2} y={bifoldY + 60} textAnchor="middle" fill={artworkCol} fontFamily="'Playfair Display', serif" fontSize="11" letterSpacing="3">
                WEDDING CELEBRATION
              </text>
              <text x={bifoldX + squareW + squareW / 2} y={bifoldY + 115} textAnchor="middle" fill={textCol} fontFamily={state.names.fontFamily} fontSize={state.names.fontSize * 0.78} fontWeight="bold">
                {state.names.text}
              </text>
              <text x={bifoldX + squareW + squareW / 2} y={bifoldY + 165} textAnchor="middle" fill={textCol} fontFamily={state.date.fontFamily} fontSize="12" fontWeight="bold">
                {state.date.text}
              </text>
              <text x={bifoldX + squareW + squareW / 2} y={bifoldY + 200} textAnchor="middle" fill={artworkCol} fontFamily={state.location.fontFamily} fontSize="11">
                {state.location.text}
              </text>
              <text x={bifoldX + squareW + squareW / 2} y={bifoldY + 280} textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="9" letterSpacing="1">
                امسح الرمز أدناه للتفاصيل الكاملة
              </text>
            </g>
          )}

          {/* Cut & Crease Lines for Open Spread */}
          {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
            <g id="layer-cut-lines-bifold" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
              {/* Outer Perimeter Cut */}
              <rect
                x={bifoldX}
                y={bifoldY}
                width={totalW}
                height={cardH}
                rx="6"
                fill="none"
                stroke={state.dielineStrokeColor || '#FF0000'}
                strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
                strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
              />

              {/* CENTER VERTICAL SCORE LINE (Dashed Blue #2563EB) */}
              <line
                x1={bifoldX + squareW}
                y1={bifoldY}
                x2={bifoldX + squareW}
                y2={bifoldY + cardH}
                stroke={state.creaseStrokeColor || '#2563EB'}
                strokeWidth="0.75"
                strokeDasharray="4, 4"
              />

              {state.activeLayerMode === 'cut' && (
                <text x={bifoldX + squareW} y={bifoldY + cardH + 30} textAnchor="middle" fill="#FF0000" fontSize="11" fontFamily="Cairo, sans-serif">
                  مطوية البراندات المربعة المفتوحة (خط ريجة رأسي أزرق منقط بالمنتصف) - 30×15 سم مفتوح
                </text>
              )}
            </g>
          )}
        </g>
      )}

      {/* ====================================================================
          MODE 2: CLOSED COVER VIEW (Mockup Mode when !isBifoldOpen)
          ==================================================================== */}
      {!isOpen && state.activeLayerMode === 'mockup' && (
        <g id="bifold-closed-cover" filter="url(#card-drop-shadow)">
          <rect x={closedX} y={closedY} width={closedW} height={closedH} rx="8" fill={cardBase} />
          <rect x={closedX} y={closedY} width={closedW} height={closedH} rx="8" fill="url(#paper-texture-pattern)" opacity="0.35" />

          {/* Laser-style Filigree Inset Frame */}
          <rect x={closedX + 14} y={closedY + 14} width={closedW - 28} height={closedH - 28} rx="4" fill="none" stroke={artworkCol} strokeWidth="1.5" />
          <rect x={closedX + 18} y={closedY + 18} width={closedW - 36} height={closedH - 36} rx="2" fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="4, 3" />

          {/* Botanical Laser Flourishes */}
          <g transform={`translate(${closedX + closedW / 2}, ${closedY + 130})`}>
            <circle cx="0" cy="0" r="42" fill="none" stroke={artworkCol} strokeWidth="1.2" />
            <circle cx="0" cy="0" r="38" fill="none" stroke={artworkCol} strokeWidth="0.5" strokeDasharray="3, 2" />
            <text x="0" y="8" textAnchor="middle" fill={artworkCol} fontFamily={state.monogram.fontFamily} fontSize="20" fontWeight="bold">
              {state.monogram.text}
            </text>
          </g>

          {/* Cover Titles */}
          <text x={closedX + closedW / 2} y={closedY + 215} textAnchor="middle" fill={textCol} fontFamily={state.names.fontFamily} fontSize={state.names.fontSize * 0.85} fontWeight="bold">
            {state.names.text}
          </text>
          <text x={closedX + closedW / 2} y={closedY + 250} textAnchor="middle" fill={artworkCol} fontFamily="'Playfair Display', serif" fontSize="11" letterSpacing="4">
            WEDDING INVITATION
          </text>
          <text x={closedX + closedW / 2} y={closedY + 285} textAnchor="middle" fill={textCol} fontFamily={state.date.fontFamily} fontSize="11" opacity="0.9">
            {state.date.text}
          </text>
        </g>
      )}
    </g>
  );
};
