import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface PetalConeSparklerPieceProps {
  state: StudioState;
}

/**
 * Template 18: طقم قمع الورد وتاق الألعاب النارية (Petal Cone & Sparkler Holder Tag)
 * Dual Template:
 * 1. Quarter-circle fan cone for flower petals with glue tab and score line
 * 2. Vertical Sparkler holder card with top/bottom 12mm slits and matchstick slot
 */
export const PetalConeSparklerPiece: React.FC<PetalConeSparklerPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#8B1E3F';
  const secondaryCol = state.secondaryPieceColor || '#D4AF37';
  const textCol = state.textColor || '#2D1B14';

  // Sparkler Tag Dimensions (Left, x=65, y=140, w=170, h=520)
  const tagX = 65;
  const tagY = 140;
  const tagW = 170;
  const tagH = 520;

  // Slit cut coordinates on Sparkler Tag
  const slit1Y = tagY + 120;
  const slit2Y = tagY + 410;
  const slitW = 20; // 12-20mm slit to slide sparkler rod

  // Cone Dieline Coordinates (Right, center at coneApexX=520, coneApexY=580)
  const coneApexX = 490;
  const coneApexY = 620;
  const coneR = 300;

  // Quarter circle cone arc from -135 deg to -45 deg
  const conePath = `
    M ${coneApexX}, ${coneApexY}
    L ${coneApexX - 212}, ${coneApexY - 212}
    A ${coneR} ${coneR} 0 0 1 ${coneApexX + 212}, ${coneApexY - 212}
    L ${coneApexX}, ${coneApexY}
    Z
  `;

  return (
    <g id="template-petal-cone-sparkler" className="template-sparkler-cone">
      {/* ====================================================================
          PART 1: SPARKLER HOLDER TAG ("Let Love Sparkle / دع حبنا يضيء")
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="sparkler-tag-group" filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}>
          {/* Card Body */}
          <rect x={tagX} y={tagY} width={tagW} height={tagH} rx="16" fill={cardBase} />
          {state.activeLayerMode === 'mockup' && (
            <rect x={tagX} y={tagY} width={tagW} height={tagH} rx="16" fill="url(#paper-texture-pattern)" opacity="0.35" />
          )}

          {/* Inset Gold Foil Border */}
          <rect x={tagX + 8} y={tagY + 8} width={tagW - 16} height={tagH - 16} rx="10" fill="none" stroke={artworkCol} strokeWidth="1" opacity="0.8" />

          {/* Sparkler Tag Artwork */}
          <g transform={`translate(${tagX + tagW / 2}, ${tagY + 50})`}>
            {/* Sparkling star bursts */}
            <path d="M 0,-15 L 0,15 M -15,0 L 15,0 M -10,-10 L 10,10 M -10,10 L 10,-10" stroke={secondaryCol} strokeWidth="1.2" />
            <circle cx="0" cy="0" r="3" fill={secondaryCol} />
          </g>

          {/* Tag Texts */}
          <text x={tagX + tagW / 2} y={tagY + 85} textAnchor="middle" fill={artworkCol} fontFamily="'Playfair Display', serif" fontSize="13" fontWeight="bold" letterSpacing="2">
            LET LOVE SPARKLE
          </text>
          <text x={tagX + tagW / 2} y={tagY + 105} textAnchor="middle" fill={textCol} fontFamily="Cairo, sans-serif" fontSize="12" fontWeight="bold">
            دع حبنا يضيء ليلة العمر
          </text>

          {/* Slit labels */}
          <text x={tagX + tagW / 2} y={slit1Y - 8} textAnchor="middle" fill={artworkCol} fontSize="9" fontFamily="Cairo, sans-serif">
            مرر عصا الشرر هنا
          </text>
          <line x1={tagX + tagW / 2 - slitW / 2} y1={slit1Y} x2={tagX + tagW / 2 + slitW / 2} y2={slit1Y} stroke={artworkCol} strokeWidth="1.5" />

          {/* Couple Names */}
          <text x={tagX + tagW / 2} y={tagY + 230} textAnchor="middle" fill={textCol} fontFamily={state.names.fontFamily} fontSize={state.names.fontSize * 0.7} fontWeight="bold">
            {state.names.text}
          </text>
          {/* Instructions */}
          <text x={tagX + tagW / 2} y={tagY + 270} textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="10" fontWeight="bold">
            يرجى إشعال الشرر عند
          </text>
          <text x={tagX + tagW / 2} y={tagY + 290} textAnchor="middle" fill={textCol} fontFamily="Cairo, sans-serif" fontSize="13" fontWeight="bold">
            مراسم زفة العروسين ✨
          </text>
          <text x={tagX + tagW / 2} y={tagY + 315} textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="10">
            الساعة ١٠:٠٠ مساءً
          </text>

          {/* Bottom Slit */}
          <line x1={tagX + tagW / 2 - slitW / 2} y1={slit2Y} x2={tagX + tagW / 2 + slitW / 2} y2={slit2Y} stroke={artworkCol} strokeWidth="1.5" />

          {/* Date */}
          <text x={tagX + tagW / 2} y={tagY + 475} textAnchor="middle" fill={textCol} fontFamily={state.date.fontFamily} fontSize="10">
            {state.date.text}
          </text>
        </g>
      )}

      {/* Real Metal Sparkler Stick (Mockup Mode only) */}
      {state.activeLayerMode === 'mockup' && state.sparklerAttached && (
        <g id="sparkler-rod-preview" transform={`translate(${tagX + tagW / 2}, ${tagY})`}>
          {/* Metal Gray Wire Rod */}
          <line x1="0" y1="50" x2="0" y2="480" stroke="#9E9E9E" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sparkler Coated Texture part (top section) */}
          <line x1="0" y1="70" x2="0" y2="280" stroke="#5D4037" strokeWidth="5.5" strokeDasharray="3, 1" />
        </g>
      )}

      {/* ====================================================================
          PART 2: FLOWER PETAL CONE (Unfolded Quarter-Circle Sector)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="petal-cone-group" filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}>
          <path d={conePath} fill={cardBase} />
          {state.activeLayerMode === 'mockup' && (
            <path d={conePath} fill="url(#paper-texture-pattern)" opacity="0.35" />
          )}

          {/* Botanical Pattern on Cone Facet */}
          <g transform={`translate(${coneApexX - 100}, ${coneApexY - 260})`}>
            <ArtworkPatterns
              patternStyle={state.artworkPatternStyle || 'petal-veins'}
              artworkColor={artworkCol}
              artworkGradientEnd={state.artworkGradientEnd}
              accentColor={secondaryCol}
              templateId={state.activeTemplateId}
            />
          </g>

          {/* Inset Arc Border */}
          <path
            d={`
              M ${coneApexX}, ${coneApexY - 30}
              L ${coneApexX - 195}, ${coneApexY - 195}
              A ${coneR - 20} ${coneR - 20} 0 0 1 ${coneApexX + 195}, ${coneApexY - 195}
              Z
            `}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* Scalloped Lace Arc along outer perimeter */}
          <path
            d={`
              M ${coneApexX - 212}, ${coneApexY - 212}
              A ${coneR} ${coneR} 0 0 1 ${coneApexX + 212}, ${coneApexY - 212}
            `}
            fill="none"
            stroke={artworkCol}
            strokeWidth="1.5"
            strokeDasharray="6, 4"
          />

          {/* Monogram on Cone Body */}
          <g transform={`translate(${coneApexX}, ${coneApexY - 120})`}>
            <circle cx="0" cy="0" r="26" fill="none" stroke={artworkCol} strokeWidth="1" />
            <text x="0" y="6" textAnchor="middle" fill={artworkCol} fontFamily={state.monogram.fontFamily} fontSize="14" fontWeight="bold">
              {state.monogram.text}
            </text>
          </g>

          <text x={coneApexX} y={coneApexY - 165} textAnchor="middle" fill={textCol} fontFamily="Cairo, sans-serif" fontSize="11" fontWeight="bold">
            نثر بتلات الورد الطبيعي 🌸
          </text>
        </g>
      )}

      {/* ====================================================================
          CUT / DIELINE LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-sparkler-cone" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          {/* Sparkler Card Cut */}
          <rect
            x={tagX}
            y={tagY}
            width={tagW}
            height={tagH}
            rx="16"
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* Sparkler Slit Cut Lines (Solid Red Hairlines) */}
          <line
            x1={tagX + tagW / 2 - slitW / 2}
            y1={slit1Y}
            x2={tagX + tagW / 2 + slitW / 2}
            y2={slit1Y}
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />
          <line
            x1={tagX + tagW / 2 - slitW / 2}
            y1={slit2Y}
            x2={tagX + tagW / 2 + slitW / 2}
            y2={slit2Y}
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />

          {/* Cone Sector Cut */}
          <path
            d={conePath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* Glue Tab Score Line (Dashed Blue) on left cone edge */}
          <line
            x1={coneApexX}
            y1={coneApexY}
            x2={coneApexX - 195}
            y2={coneApexY - 212}
            stroke={state.creaseStrokeColor || '#2563EB'}
            strokeWidth="0.75"
            strokeDasharray="4, 4"
          />

          {state.activeLayerMode === 'cut' && (
            <text x="300" y="740" textAnchor="middle" fill="#FF0000" fontSize="11" fontFamily="Cairo, sans-serif">
              طقم قمع الورد المروحي + تاق الألعاب النارية بشقوق التمرير 15×20 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
