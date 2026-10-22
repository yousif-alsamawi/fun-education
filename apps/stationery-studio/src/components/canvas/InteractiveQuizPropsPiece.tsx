import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface InteractiveQuizPropsPieceProps {
  state: StudioState;
}

/**
 * Template 19: بوكس العريس/التخرج التفاعلي وكروت الأسئلة (Interactive Quiz & Props Kit)
 * Multi-item event activity kit:
 * 1. "مين يعرف العريس/العروس أكثر؟" (Who Knows the Couple Best?) quiz card with checkboxes.
 * 2. Polaroid-style photo-booth prop frame with 14x14 cm cutout window.
 * 3. Curved cup wrap sleeve.
 */
export const InteractiveQuizPropsPiece: React.FC<InteractiveQuizPropsPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#8B1E3F';
  const secondaryCol = state.secondaryPieceColor || '#5E6B38';
  const textCol = state.textColor || '#2D1B14';

  // 1. Quiz Card Dimensions (Left, x=50, y=140, w=230, h=450)
  const quizX = 50;
  const quizY = 140;
  const quizW = 230;
  const quizH = 450;

  // 2. Polaroid Prop Frame Dimensions (Right, x=305, y=140, w=265, h=330)
  const propX = 305;
  const propY = 140;
  const propW = 265;
  const propH = 330;

  // Prop Inner Window Cutout (195 x 195)
  const winX = propX + 35;
  const winY = propY + 30;
  const winW = 195;
  const winH = 195;

  // 3. Cup Wrap Sleeve Dimensions (Bottom-Right, x=305, y=500, w=265, h=90)
  const cupX = 305;
  const cupY = 500;
  const cupW = 265;
  const cupH = 85;

  return (
    <g id="template-interactive-quiz-props" className="template-quiz-props">
      {/* ====================================================================
          ITEM 1: "مين يعرف العريس أكثر؟" QUIZ CARD
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="quiz-card-group" filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}>
          <rect x={quizX} y={quizY} width={quizW} height={quizH} rx="12" fill={cardBase} />
          {state.activeLayerMode === 'mockup' && (
            <rect x={quizX} y={quizY} width={quizW} height={quizH} rx="12" fill="url(#paper-texture-pattern)" opacity="0.35" />
          )}

          {/* Inset Border */}
          <rect x={quizX + 8} y={quizY + 8} width={quizW - 16} height={quizH - 16} rx="8" fill="none" stroke={artworkCol} strokeWidth="1" opacity="0.8" />

          {/* Quiz Header */}
          <text x={quizX + quizW / 2} y={quizY + 38} textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="13" fontWeight="bold">
            مين يعرف العريس أكثر؟ 🤔
          </text>
          <text x={quizX + quizW / 2} y={quizY + 58} textAnchor="middle" fill={textCol} fontFamily={state.names.fontFamily} fontSize="12" fontWeight="bold">
            {state.names.text}
          </text>

          {/* Divider */}
          <line x1={quizX + 25} y1={quizY + 70} x2={quizX + quizW - 25} y2={quizY + 70} stroke={artworkCol} strokeWidth="0.8" strokeDasharray="3, 3" />

          {/* 4 Interactive Questions with check circles */}
          {[
            { q: '١. أين كان اللقاء الأول؟', a1: 'الجامعة 🎓', a2: 'مقهى ☕', y: quizY + 105 },
            { q: '٢. من قال أحبك أولاً؟', a1: 'العريس 🤵', a2: 'العروس 👰', y: quizY + 175 },
            { q: '٣. ما هي وجبته المفضلة؟', a1: 'ستيك 🥩', a2: 'كاري 🍛', y: quizY + 245 },
            { q: '٤. إلى أين شهر العسل؟', a1: 'إيطاليا 🇮🇹', a2: 'المالديف 🏝️', y: quizY + 315 }
          ].map((item, idx) => (
            <g key={`quiz-q-${idx}`}>
              <text x={quizX + 20} y={item.y} fill={textCol} fontFamily="Cairo, sans-serif" fontSize="11" fontWeight="bold">
                {item.q}
              </text>
              {/* Option 1 */}
              <circle cx={quizX + 30} cy={item.y + 22} r="6" fill="none" stroke={artworkCol} strokeWidth="1" strokeDasharray="2, 2" />
              <text x={quizX + 45} y={item.y + 26} fill={textCol} fontFamily="Cairo, sans-serif" fontSize="10">
                {item.a1}
              </text>
              {/* Option 2 */}
              <circle cx={quizX + 130} cy={item.y + 22} r="6" fill="none" stroke={artworkCol} strokeWidth="1" strokeDasharray="2, 2" />
              <text x={quizX + 145} y={item.y + 26} fill={textCol} fontFamily="Cairo, sans-serif" fontSize="10">
                {item.a2}
              </text>
            </g>
          ))}

          {/* Bottom Score & Date */}
          <text x={quizX + quizW / 2} y={quizY + 400} textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="10" fontWeight="bold">
            درجتك: ____ من ٤ 🏆
          </text>
          <text x={quizX + quizW / 2} y={quizY + 425} textAnchor="middle" fill={textCol} fontFamily={state.date.fontFamily} fontSize="9">
            {state.date.text}
          </text>
        </g>
      )}

      {/* ====================================================================
          ITEM 2: POLAROID PHOTO-BOOTH PROP FRAME (14×14 cm Window Cutout)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="polaroid-frame-group" filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}>
          {/* Polaroid Card Body */}
          <rect x={propX} y={propY} width={propW} height={propH} rx="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />

          {/* Cutout Window in Mockup: Shows subtle photo grid or camera lens icon */}
          <rect x={winX} y={winY} width={winW} height={winH} rx="4" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
          <g transform={`translate(${winX + winW / 2}, ${winY + winH / 2})`}>
            <circle cx="0" cy="0" r="28" fill="#E5E7EB" />
            <circle cx="0" cy="0" r="18" fill="#D1D5DB" />
            <text x="0" y="5" textAnchor="middle" fill="#9CA3AF" fontSize="16">📷</text>
            <text x="0" y="45" textAnchor="middle" fill="#9CA3AF" fontFamily="Cairo, sans-serif" fontSize="10" fontWeight="bold">
              نافذة تصوير مفرغة (PHOTO PROP)
            </text>
          </g>

          {/* Bottom Polaroid Caption */}
          <text x={propX + propW / 2} y={propY + propH - 60} textAnchor="middle" fill={artworkCol} fontFamily="'Great Vibes', cursive" fontSize="22">
            Best Day Ever
          </text>
          <text x={propX + propW / 2} y={propY + propH - 35} textAnchor="middle" fill="#374151" fontFamily="Cairo, sans-serif" fontSize="11" fontWeight="bold">
            #عرس_{state.names.text.replace(/\s+/g, '_')}
          </text>
          <text x={propX + propW / 2} y={propY + propH - 18} textAnchor="middle" fill="#6B7280" fontFamily="Cairo, sans-serif" fontSize="9">
            التقط صورتك وشاركنا اللحظة! ✨
          </text>
        </g>
      )}

      {/* ====================================================================
          ITEM 3: CURVED CUP WRAP SLEEVE
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="cup-sleeve-group" filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}>
          <rect x={cupX} y={cupY} width={cupW} height={cupH} rx="8" fill={secondaryCol} />
          <rect x={cupX + 6} y={cupY + 6} width={cupW - 12} height={cupH - 12} rx="6" fill="none" stroke={artworkCol} strokeWidth="0.8" strokeDasharray="3, 3" />

          {/* Cup Monogram */}
          <circle cx={cupX + 45} cy={cupY + cupH / 2} r="20" fill={cardBase} stroke={artworkCol} strokeWidth="1" />
          <text x={cupX + 45} y={cupY + cupH / 2 + 5} textAnchor="middle" fill={artworkCol} fontFamily={state.monogram.fontFamily} fontSize="11" fontWeight="bold">
            {state.monogram.text}
          </text>

          {/* Cup Text */}
          <text x={cupX + 80} y={cupY + 36} fill="#FFFFFF" fontFamily="Cairo, sans-serif" fontSize="11" fontWeight="bold">
            قهوة الزفاف الملكية ☕
          </text>
          <text x={cupX + 80} y={cupY + 56} fill={artworkCol} fontFamily={state.names.fontFamily} fontSize="12" fontWeight="bold">
            {state.names.text}
          </text>
        </g>
      )}

      {/* ====================================================================
          CUT / DIELINE LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-quiz-props" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          {/* Quiz Card Cut */}
          <rect x={quizX} y={quizY} width={quizW} height={quizH} rx="12" fill="none" stroke={state.dielineStrokeColor || '#FF0000'} strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'} strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'} />

          {/* Polaroid Outer Cut */}
          <rect x={propX} y={propY} width={propW} height={propH} rx="14" fill="none" stroke={state.dielineStrokeColor || '#FF0000'} strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'} strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'} />
          {/* Polaroid Inner Window Cutout (19.5 x 19.5 cm) */}
          <rect x={winX} y={winY} width={winW} height={winH} rx="4" fill="none" stroke={state.dielineStrokeColor || '#FF0000'} strokeWidth="0.75" />

          {/* Cup Sleeve Cut */}
          <rect x={cupX} y={cupY} width={cupW} height={cupH} rx="8" fill="none" stroke={state.dielineStrokeColor || '#FF0000'} strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'} strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'} />

          {state.activeLayerMode === 'cut' && (
            <text x="300" y="650" textAnchor="middle" fill="#FF0000" fontSize="11" fontFamily="Cairo, sans-serif">
              بوكس كروت الأنشطة وإطار تصوير الفوتوبوث المفرغ (نافذة 14×14 سم) - 20×30 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
