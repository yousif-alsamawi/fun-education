import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';
import { QrCodeSvg } from './QrCodeSvg';

interface FullSuiteViewPieceProps {
  state: StudioState;
}

/**
 * 📦 Full Suite Synchronization Mode ("عرض البكج المتكامل")
 * Displays a cohesive flat-lay preview of 4 matching items simultaneously:
 * 1. Main Luxury Invitation Card (Top-Left)
 * 2. 3D Favor Box (Top-Right)
 * 3. 3D Arch Table Stand (Bottom-Left)
 * 4. Celebration Sparkler & QR Tag (Bottom-Right)
 * All dynamically sharing the same Names, Monogram, Date, Font, and 4-Layer Colors!
 */
export const FullSuiteViewPiece: React.FC<FullSuiteViewPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#8B1E3F';
  const secondaryCol = state.secondaryPieceColor || '#5E6B38';
  const textCol = state.textColor || '#2D1B14';

  return (
    <g id="full-suite-synchronized-view" className="suite-view-canvas">
      {/* ====================================================================
          SUITE HEADER BANNER & WATERMARK
          ==================================================================== */}
      <g id="suite-header-banner" transform="translate(510, 45)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill={artworkCol}
          fontFamily="'Playfair Display', serif"
          fontSize="13"
          letterSpacing="4"
          fontWeight="bold"
        >
          ✦ THE ROYAL EVENT SUITE COLLECTION ✦
        </text>
        <text
          x="0"
          y="22"
          textAnchor="middle"
          fill={textCol}
          fontFamily={state.names.fontFamily}
          fontSize="18"
          fontWeight="bold"
        >
          طقم المناسبة الملكي المتكامل: {state.names.text}
        </text>
      </g>

      {/* ====================================================================
          ITEM 1: MAIN LUXURY INVITATION (Top-Left: x=60, y=90, w=380, h=520)
          ==================================================================== */}
      <g
        id="suite-item-main-invitation"
        filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
      >
        {/* Arch Card Body */}
        <path
          d={`
            M 60, 200
            C 60, 110 110, 90 250, 90
            C 390, 90 440, 110 440, 200
            L 440, 600
            L 60, 600
            Z
          `}
          fill={cardBase}
        />
        {state.activeLayerMode === 'mockup' && (
          <path
            d={`
              M 60, 200
              C 60, 110 110, 90 250, 90
              C 390, 90 440, 110 440, 200
              L 440, 600
              L 60, 600
              Z
            `}
            fill="url(#paper-texture-pattern)"
            opacity="0.35"
          />
        )}

        {/* Inset Gold Arch Border */}
        <path
          d={`
            M 74, 200
            C 74, 120 120, 104 250, 104
            C 380, 104 426, 120 426, 200
            L 426, 586
            L 74, 586
            Z
          `}
          fill="none"
          stroke={artworkCol}
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* Botanical Flourishes */}
        <g transform="translate(150, 100)">
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'petal-veins'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={secondaryCol}
            templateId="arch-window-pocket"
          />
        </g>

        {/* Top Monogram Cartouche */}
        <g transform="translate(250, 185)">
          <ellipse rx="36" ry="42" fill="none" stroke={artworkCol} strokeWidth="1.2" />
          <text
            x="0"
            y="7"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.monogram.fontFamily}
            fontSize="16"
            fontWeight="bold"
          >
            {state.monogram.text}
          </text>
        </g>

        {/* Greeting & Names */}
        <text
          x="250"
          y="255"
          textAnchor="middle"
          fill={artworkCol}
          fontFamily={state.greeting.fontFamily}
          fontSize="13"
          fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
        >
          {state.greeting.text}
        </text>

        <text
          x="250"
          y="310"
          textAnchor="middle"
          fill={textCol}
          fontFamily={state.names.fontFamily}
          fontSize={state.names.fontSize * 0.9}
          fontWeight="bold"
        >
          {state.names.text}
        </text>

        <text
          x="250"
          y="360"
          textAnchor="middle"
          fill={textCol}
          fontFamily={state.date.fontFamily}
          fontSize="12"
          fontWeight="bold"
        >
          {state.date.text}
        </text>

        <text
          x="250"
          y="390"
          textAnchor="middle"
          fill={artworkCol}
          fontFamily={state.location.fontFamily}
          fontSize="11"
        >
          {state.location.text}
        </text>

        {/* Item Label Badge */}
        <rect x="75" y="555" width="130" height="22" rx="6" fill={artworkCol} opacity="0.15" />
        <text x="140" y="570" textAnchor="middle" fill={artworkCol} fontSize="10" fontFamily="Cairo, sans-serif" fontWeight="bold">
          ١. كرت الدعوة الملكي
        </text>
      </g>

      {/* ====================================================================
          ITEM 2: DOME / PYRAMID FAVOR BOX (Top-Right: x=510, y=90, w=220, h=250)
          ==================================================================== */}
      <g
        id="suite-item-favor-box"
        filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
      >
        {/* Box Body Perspective */}
        <polygon points="530,220 710,220 740,340 500,340" fill={cardBase} stroke={artworkCol} strokeWidth="1" />
        {/* Box Pyramid / Dome Top */}
        <polygon points="620,120 710,220 530,220" fill={secondaryCol} stroke={artworkCol} strokeWidth="1" />

        {/* Gold Ribbon & Bow */}
        <line x1="620" y1="120" x2="620" y2="340" stroke={artworkCol} strokeWidth="4" />
        <circle cx="620" cy="120" r="12" fill={artworkCol} />
        <circle cx="620" cy="120" r="8" fill={cardBase} />

        {/* Oval Closure Tag */}
        <g transform="translate(620, 245)">
          <ellipse rx="36" ry="22" fill={artworkCol} stroke="#1A0D11" strokeWidth="0.5" />
          <ellipse rx="33" ry="19" fill={cardBase} />
          <text x="0" y="-1" textAnchor="middle" fill={artworkCol} fontSize="9" fontFamily="Cairo, sans-serif" fontWeight="bold">
            هني وعافيه
          </text>
          <text x="0" y="11" textAnchor="middle" fill={textCol} fontSize="9" fontFamily={state.monogram.fontFamily} fontWeight="bold">
            {state.monogram.text}
          </text>
        </g>

        {/* Item Label Badge */}
        <rect x="555" y="305" width="130" height="22" rx="6" fill={artworkCol} opacity="0.15" />
        <text x="620" y="320" textAnchor="middle" fill={artworkCol} fontSize="10" fontFamily="Cairo, sans-serif" fontWeight="bold">
          ٢. علبة التوزيعات والهدايا
        </text>
      </g>

      {/* ====================================================================
          ITEM 3: 3D TENT TABLE STAND (Bottom-Right: x=490, y=380, w=230, h=350)
          ==================================================================== */}
      <g
        id="suite-item-table-stand"
        filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
      >
        <rect x="490" y="380" width="220" height="340" rx="14" fill={cardBase} stroke={artworkCol} strokeWidth="1" />
        <rect x="500" y="390" width="200" height="320" rx="10" fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="3, 2" />

        {/* Table Number Display */}
        <text x="600" y="430" textAnchor="middle" fill={artworkCol} fontSize="11" fontFamily="Cairo, sans-serif" fontWeight="bold" letterSpacing="1">
          طاولة رقم
        </text>
        <text x="600" y="490" textAnchor="middle" fill={textCol} fontSize="54" fontFamily="'Playfair Display', serif" fontWeight="bold">
          05
        </text>
        <text x="600" y="515" textAnchor="middle" fill={artworkCol} fontSize="10" fontFamily="'Playfair Display', serif" letterSpacing="3">
          TABLE FIVE
        </text>

        {/* Couple names on stand */}
        <text x="600" y="565" textAnchor="middle" fill={textCol} fontFamily={state.names.fontFamily} fontSize="13" fontWeight="bold">
          {state.names.text}
        </text>
        <text x="600" y="595" textAnchor="middle" fill={artworkCol} fontFamily={state.date.fontFamily} fontSize="10">
          {state.date.text}
        </text>

        {/* Item Label Badge */}
        <rect x="535" y="685" width="130" height="22" rx="6" fill={artworkCol} opacity="0.15" />
        <text x="600" y="700" textAnchor="middle" fill={artworkCol} fontSize="10" fontFamily="Cairo, sans-serif" fontWeight="bold">
          ٣. ستاند الطاولة والترحيب
        </text>
      </g>

      {/* ====================================================================
          ITEM 4: CELEBRATION SPARKLER / SONG TAG (Far-Right: x=760, y=90, w=200, h=630)
          ==================================================================== */}
      <g
        id="suite-item-sparkler-tag"
        filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
      >
        {/* Card Body */}
        <rect x="760" y="90" width="190" height="630" rx="16" fill={cardBase} stroke={artworkCol} strokeWidth="1" />
        <rect x="770" y="100" width="170" height="610" rx="12" fill="none" stroke={artworkCol} strokeWidth="0.6" strokeDasharray="3, 3" />

        {/* Sparkler starbursts */}
        <g transform="translate(855, 140)">
          <path d="M 0,-14 L 0,14 M -14,0 L 14,0 M -9,-9 L 9,9 M -9,9 L 9,-9" stroke={secondaryCol} strokeWidth="1.2" />
          <circle cx="0" cy="0" r="3" fill={secondaryCol} />
        </g>

        <text x="855" y="175" textAnchor="middle" fill={artworkCol} fontFamily="'Playfair Display', serif" fontSize="11" fontWeight="bold" letterSpacing="2">
          LET LOVE SPARKLE
        </text>
        <text x="855" y="195" textAnchor="middle" fill={textCol} fontFamily="Cairo, sans-serif" fontSize="11" fontWeight="bold">
          دع حبنا يضيء ليلتنا ✨
        </text>

        {/* Slits & Metal Sparkler Preview */}
        <line x1="840" y1="225" x2="870" y2="225" stroke={artworkCol} strokeWidth="2" />
        <line x1="855" y1="210" x2="855" y2="440" stroke="#9E9E9E" strokeWidth="2.5" />
        <line x1="855" y1="230" x2="855" y2="360" stroke="#5D4037" strokeWidth="5.5" strokeDasharray="2, 1" />
        <line x1="840" y1="420" x2="870" y2="420" stroke={artworkCol} strokeWidth="2" />

        {/* Couple names on tag */}
        <text x="855" y="475" textAnchor="middle" fill={textCol} fontFamily={state.names.fontFamily} fontSize="13" fontWeight="bold">
          {state.names.text}
        </text>
        <text x="855" y="500" textAnchor="middle" fill={artworkCol} fontFamily="Cairo, sans-serif" fontSize="10">
          إشعال الشرر عند الزفة: ١٠:٠٠ م
        </text>

        {/* QR Code on Tag */}
        <g transform="translate(823, 530)">
          <QrCodeSvg
            config={{ ...state.qrCode, size: 64 }}
            primaryColor={textCol}
            accentColor={artworkCol}
            x={0}
            y={0}
          />
        </g>

        {/* Item Label Badge */}
        <rect x="790" y="685" width="130" height="22" rx="6" fill={artworkCol} opacity="0.15" />
        <text x="855" y="700" textAnchor="middle" fill={artworkCol} fontSize="10" fontFamily="Cairo, sans-serif" fontWeight="bold">
          ٤. تاق الألعاب النارية وQR
        </text>
      </g>

      {/* ====================================================================
          CUT / PRODUCTION SHEET OVERLAY (Cut Mode)
          ==================================================================== */}
      {state.activeLayerMode === 'cut' && (
        <g id="suite-cut-overlay">
          <rect x="5" y="5" width="1010" height="850" fill="none" stroke="#FF0000" strokeWidth="0.75" strokeDasharray="6, 6" />
          <text x="510" y="830" textAnchor="middle" fill="#FF0000" fontSize="12" fontFamily="Cairo, sans-serif" fontWeight="bold">
            ✂️ مخطط قص وتجميع البكج المتكامل الكامل (4 قطع متناسقة على لوح SRA3+)
          </text>
        </g>
      )}
    </g>
  );
};
