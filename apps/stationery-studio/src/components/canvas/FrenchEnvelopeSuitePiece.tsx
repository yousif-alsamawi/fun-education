import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface FrenchEnvelopeSuitePieceProps {
  state: StudioState;
}

/**
 * Template 17: بكج الدعوة الفرنسي (5-Piece French Luxury Suite)
 * Multi-piece coordinated Flat-Lay layout:
 * 1. Envelope with patterned floral inner liner
 * 2. Rectangular main card (13×18 cm)
 * 3. Circular monogram card
 * 4. Vertical Pill-shaped (capsule) Timeline/Programme card with mini event icons
 * 5. Scalloped vintage Dress-Code card
 */
export const FrenchEnvelopeSuitePiece: React.FC<FrenchEnvelopeSuitePieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#8B1E3F';
  const secondaryCol = state.secondaryPieceColor || '#5E6B38';
  const textCol = state.textColor || '#2D1B14';

  // 1. Envelope Dimensions (Backdrop Top-Right, x=220, y=80, w=340, h=240)
  const envX = 220;
  const envY = 80;
  const envW = 340;
  const envH = 240;

  // 2. Main Card Dimensions (Centered-Left, x=60, y=180, w=280, h=420)
  const mainX = 60;
  const mainY = 180;
  const mainW = 280;
  const mainH = 420;

  // 3. Circular Monogram Card (Top-Left, cx=110, cy=130, r=50)
  const circleCX = 110;
  const circleCY = 130;
  const circleR = 48;

  // 4. Pill / Capsule Timeline Card (Right, x=365, y=300, w=160, h=360, rx=80)
  const pillX = 365;
  const pillY = 300;
  const pillW = 160;
  const pillH = 360;

  // 5. Scalloped Dress-Code Card (Bottom-Left, x=70, y=625, w=260, h=130)
  const dressX = 70;
  const dressY = 625;
  const dressW = 260;
  const dressH = 130;

  return (
    <g id="template-french-envelope-suite" className="template-french-suite">
      {/* ====================================================================
          PIECE 1: LUXURY ENVELOPE WITH PATTERNED FLORAL LINER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="french-envelope-group" filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}>
          {/* Envelope Body */}
          <rect x={envX} y={envY + 60} width={envW} height={envH} rx="8" fill={secondaryCol} />
          {/* Open Triangular Flap pointing up */}
          <polygon points={`${envX},${envY + 60} ${envX + envW / 2},${envY - 40} ${envX + envW},${envY + 60}`} fill={secondaryCol} />

          {/* Patterned Floral Inner Liner inside flap */}
          <polygon
            points={`${envX + 12},${envY + 60} ${envX + envW / 2},${envY - 26} ${envX + envW - 12},${envY + 60}`}
            fill={cardBase}
          />
          <g transform={`translate(${envX - 80}, ${envY - 80})`}>
            <ArtworkPatterns
              patternStyle={state.artworkPatternStyle || 'watercolor-swan-palace'}
              artworkColor={artworkCol}
              artworkGradientEnd={state.artworkGradientEnd}
              accentColor={artworkCol}
              templateId={state.activeTemplateId}
            />
          </g>
          {/* Subtle gold foil border on flap */}
          <polygon
            points={`${envX + 14},${envY + 60} ${envX + envW / 2},${envY - 24} ${envX + envW - 14},${envY + 60}`}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            strokeDasharray="4, 3"
          />
        </g>
      )}

      {/* ====================================================================
          PIECE 2: RECTANGULAR MAIN INVITATION CARD (13 × 18 cm)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="french-main-card" filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}>
          <rect x={mainX} y={mainY} width={mainW} height={mainH} rx="8" fill={cardBase} />
          {state.activeLayerMode === 'mockup' && (
            <rect x={mainX} y={mainY} width={mainW} height={mainH} rx="8" fill="url(#paper-texture-pattern)" opacity="0.35" />
          )}

          {/* Inset Gold Foil Double Border */}
          <rect x={mainX + 10} y={mainY + 10} width={mainW - 20} height={mainH - 20} rx="4" fill="none" stroke={artworkCol} strokeWidth="1" opacity="0.8" />
          <rect x={mainX + 14} y={mainY + 14} width={mainW - 28} height={mainH - 28} rx="2" fill="none" stroke={artworkCol} strokeWidth="0.5" strokeDasharray="3, 2" opacity="0.6" />

          {/* Main Card Content */}
          <text x={mainX + mainW / 2} y={mainY + 50} textAnchor="middle" fill={artworkCol} fontFamily="'Playfair Display', serif" fontSize="11" letterSpacing="3">
            ROYAL WEDDING INVITATION
          </text>
          <text x={mainX + mainW / 2} y={mainY + 105} textAnchor="middle" fill={textCol} fontFamily={state.names.fontFamily} fontSize={state.names.fontSize * 0.8} fontWeight="bold">
            {state.names.text}
          </text>
          <text x={mainX + mainW / 2} y={mainY + 145} textAnchor="middle" fill={artworkCol} fontFamily={state.greeting.fontFamily} fontSize="12" fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}>
            {state.greeting.text}
          </text>
          <text x={mainX + mainW / 2} y={mainY + 200} textAnchor="middle" fill={textCol} fontFamily={state.date.fontFamily} fontSize="12" fontWeight="bold">
            {state.date.text}
          </text>
          <text x={mainX + mainW / 2} y={mainY + 230} textAnchor="middle" fill={artworkCol} fontFamily={state.location.fontFamily} fontSize="11">
            {state.location.text}
          </text>
        </g>
      )}

      {/* ====================================================================
          PIECE 3: CIRCULAR MONOGRAM CARD WITH FOIL CREST
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="french-circle-monogram" filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}>
          <circle cx={circleCX} cy={circleCY} r={circleR} fill={cardBase} stroke={artworkCol} strokeWidth="1.2" />
          <circle cx={circleCX} cy={circleCY} r={circleR - 5} fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="3, 2" />
          <text x={circleCX} y={circleCY + 7} textAnchor="middle" fill={artworkCol} fontFamily={state.monogram.fontFamily} fontSize="16" fontWeight="bold">
            {state.monogram.text}
          </text>
        </g>
      )}

      {/* ====================================================================
          PIECE 4: CAPSULE / PILL TIMELINE & PROGRAMME CARD
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="french-capsule-timeline" filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}>
          <rect x={pillX} y={pillY} width={pillW} height={pillH} rx="80" fill={cardBase} stroke={artworkCol} strokeWidth="1" />
          {/* Inset capsule border */}
          <rect x={pillX + 8} y={pillY + 8} width={pillW - 16} height={pillH - 16} rx="72" fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="3, 2" opacity="0.6" />

          {/* Timeline Header */}
          <text x={pillX + pillW / 2} y={pillY + 60} textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="11" fontWeight="bold" letterSpacing="1">
            ✦ برنامج الحفل ✦
          </text>

          {/* Event Milestones */}
          {[
            { time: '٠٨:٠٠ م', event: 'استقبال الضيوف', icon: '🥂', y: pillY + 115 },
            { time: '٠٩:٣٠ م', event: 'مراسم الزفة', icon: '✨', y: pillY + 180 },
            { time: '١٠:٣٠ م', event: 'تقطيع الكعكة', icon: '🎂', y: pillY + 245 },
            { time: '١١:٠٠ م', event: 'مأدبة العشاء', icon: '🍽️', y: pillY + 310 }
          ].map((item, idx) => (
            <g key={`timeline-${idx}`}>
              <circle cx={pillX + pillW / 2} cy={item.y - 12} r="14" fill={artworkCol} opacity="0.15" />
              <text x={pillX + pillW / 2} y={item.y - 7} textAnchor="middle" fontSize="12">{item.icon}</text>
              <text x={pillX + pillW / 2} y={item.y + 12} textAnchor="middle" fill={textCol} fontFamily="Cairo, sans-serif" fontSize="10" fontWeight="bold">
                {item.time}
              </text>
              <text x={pillX + pillW / 2} y={item.y + 26} textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="9">
                {item.event}
              </text>
            </g>
          ))}
        </g>
      )}

      {/* ====================================================================
          PIECE 5: SCALLOPED DRESS-CODE & ATTIRE CARD
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="french-dress-code-card" filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}>
          <rect x={dressX} y={dressY} width={dressW} height={dressH} rx="12" fill={secondaryCol} stroke={artworkCol} strokeWidth="1" />
          <rect x={dressX + 6} y={dressY + 6} width={dressW - 12} height={dressH - 12} rx="8" fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="3, 3" />

          <text x={dressX + dressW / 2} y={dressY + 38} textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="11" fontWeight="bold" letterSpacing="1">
            ✦ DRESS CODE ✦
          </text>
          <text x={dressX + dressW / 2} y={dressY + 68} textAnchor="middle" fill="#FFFFFF" fontFamily="Cairo, sans-serif" fontSize="12" fontWeight="bold">
            أزياء السهرة الرسمية (Black Tie)
          </text>
          <text x={dressX + dressW / 2} y={dressY + 95} textAnchor="middle" fill="#F5E6C8" fontFamily="Cairo, sans-serif" fontSize="10" opacity="0.9">
            نتطلع لرؤيتكم بأبهى حلة لمشاركتنا ليلة العمر
          </text>
        </g>
      )}

      {/* ====================================================================
          CUT / DIELINE LAYER (All 5 Pieces on Cutting Sheet)
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-french-suite" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          {/* Main Card Cut */}
          <rect x={mainX} y={mainY} width={mainW} height={mainH} rx="8" fill="none" stroke={state.dielineStrokeColor || '#FF0000'} strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'} strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'} />
          {/* Monogram Circle Cut */}
          <circle cx={circleCX} cy={circleCY} r={circleR} fill="none" stroke={state.dielineStrokeColor || '#FF0000'} strokeWidth="0.75" />
          {/* Capsule Timeline Cut */}
          <rect x={pillX} y={pillY} width={pillW} height={pillH} rx="80" fill="none" stroke={state.dielineStrokeColor || '#FF0000'} strokeWidth="0.75" />
          {/* Dress Code Card Cut */}
          <rect x={dressX} y={dressY} width={dressW} height={dressH} rx="12" fill="none" stroke={state.dielineStrokeColor || '#FF0000'} strokeWidth="0.75" />

          {state.activeLayerMode === 'cut' && (
            <text x="300" y="790" textAnchor="middle" fill="#FF0000" fontSize="11" fontFamily="Cairo, sans-serif">
              طقم بكج الدعوة الفرنسي (5 قطع متناسقة: مغلف، كرت، مونوغرام، كبسولة، ودريس كود)
            </text>
          )}
        </g>
      )}
    </g>
  );
};
