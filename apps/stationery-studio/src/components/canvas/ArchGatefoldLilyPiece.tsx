import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';
import { WatercolorWhiteLily } from './BotanicalArtLibrary';

interface ArchGatefoldLilyPieceProps {
  state: StudioState;
}

/**
 * Template 3: دعوة البوابة المقوسة بقفل زهرة الزنبق (Arch Gatefold Slit-Lock Lily Wedding Invite)
 * - Symmetrical two-door arch gatefold with embossed filigree borders
 * - Clasps shut in the center by sliding a die-cut 3D watercolor White Lily stem through a horizontal slit
 * - Dynamic interactive toggle for gate doors opening / closing
 */
export const ArchGatefoldLilyPiece: React.FC<ArchGatefoldLilyPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FDFBF7';
  const artworkCol = state.artworkColor || '#8B1E3F';
  const textCol = state.textColor || '#6B0F2B';
  const isOpen = state.isGatefoldOpen;
  const isLocked = state.isFlowerInserted;

  // Gatefold dimensions in viewBox coords (Width 600, Height 860)
  // Left door fold line at X = 150, Center seam at X = 300, Right door fold line at X = 450
  // Left door: 150 -> 300, Right door: 300 -> 450
  // Total closed card: 300px wide (X: 150..450), Height: 680px (Y: 90..770)
  // When opened, doors swing outward!
  const leftDoorAngle = isOpen ? -65 : 0;
  const rightDoorAngle = isOpen ? 65 : 0;

  // Central Horizontal Slit coordinates across the center seam
  const slitX1 = 240;
  const slitX2 = 360;
  const slitY = 470;

  // Lily vertical position: locked into slit or pulled out
  const lilyY = isLocked ? slitY - 60 : slitY - 180;

  // Arch path for the back inner invitation card (Revealed when open)
  const innerCardPath = `
    M 150, 240
    C 150, 90 450, 90 450, 240
    L 450, 770
    C 450, 785 435, 795 420, 795
    L 180, 795
    C 165, 795 150, 785 150, 770
    Z
  `;

  // Left Door Path (Half Arch)
  const leftDoorPath = `
    M 150, 240
    C 150, 90 300, 90 300, 110
    L 300, 795
    L 180, 795
    C 165, 795 150, 785 150, 770
    Z
  `;

  // Right Door Path (Half Arch)
  const rightDoorPath = `
    M 300, 110
    C 300, 90 450, 90 450, 240
    L 450, 770
    C 450, 785 435, 795 420, 795
    L 300, 795
    Z
  `;

  // Hot-Foil and Paper filters
  const paperFilter =
    state.activeLayerMode === 'mockup'
      ? state.paperStock === 'linen-weave'
        ? 'url(#paper-stock-linen)'
        : state.paperStock === 'pearl-shimmer'
        ? 'url(#paper-stock-pearl)'
        : state.paperStock === 'rustic-kraft'
        ? 'url(#paper-stock-kraft)'
        : state.paperStock === 'translucent-vellum'
        ? 'url(#paper-stock-vellum)'
        : state.paperStock === 'silk-matte'
        ? 'url(#paper-stock-matte)'
        : 'url(#paper-stock-cotton)'
      : undefined;

  const isFoil = state.isFoilEnabled;
  const foilGrad =
    state.hotFoilType === 'gold-24k'
      ? 'url(#foil-mirror-gold-24k)'
      : state.hotFoilType === 'rose-gold'
      ? 'url(#foil-rose-gold)'
      : state.hotFoilType === 'platinum-silver'
      ? 'url(#foil-platinum-silver)'
      : 'url(#foil-antique-copper)';

  const monogramFill = isFoil && state.foilTargets?.monogram ? foilGrad : artworkCol;
  const monogramFilter = isFoil && state.foilTargets?.monogram ? 'url(#foil-emboss-bevel)' : undefined;
  const namesFill = isFoil && state.foilTargets?.names ? foilGrad : textCol;
  const namesFilter = isFoil && state.foilTargets?.names ? 'url(#foil-emboss-bevel)' : undefined;
  const frameStroke = isFoil && state.foilTargets?.frame ? foilGrad : artworkCol;

  return (
    <g id="arch-gatefold-lily-piece" className="arch-gatefold-lily-piece select-none">
      {/* ====================================================================
          LAYER 0: Inner Invitation Card (Backing Plate)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="gatefold-inner-card">
          <path
            d={innerCardPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#studio-ambient-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && paperFilter && (
            <path d={innerCardPath} fill={cardBase} filter={paperFilter} opacity="0.9" />
          )}

          {/* Delicate Inner Arch Border */}
          <path
            d={innerCardPath}
            fill="none"
            stroke={frameStroke}
            strokeWidth="1.2"
            opacity="0.4"
            transform="translate(12, 12) scale(0.96)"
          />

          {/* Inner Botanical Watermark */}
          <g opacity="0.15">
            <ArtworkPatterns
              patternStyle={state.artworkPatternStyle || 'olive-lily-branches'}
              artworkColor={artworkCol}
              artworkGradientEnd={state.artworkGradientEnd}
              accentColor={artworkCol}
              templateId={state.activeTemplateId}
            />
          </g>

          {/* Inner Typography (Visible when doors open) */}
          <g id="inner-wedding-wording">
            <text
              x="300"
              y="220"
              textAnchor="middle"
              fill={monogramFill}
              filter={monogramFilter}
              fontFamily={state.monogram.fontFamily}
              fontSize={42}
              fontWeight="bold"
              letterSpacing="3"
            >
              {state.monogram.text}
            </text>

            <text
              x="300"
              y="290"
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.greeting.fontFamily}
              fontSize={state.greeting.fontSize}
              fontStyle={state.greeting.isItalic ? 'italic' : 'normal'}
            >
              {state.greeting.text}
            </text>

            <text
              x="300"
              y="380"
              textAnchor="middle"
              fill={namesFill}
              filter={namesFilter}
              fontFamily={state.names.fontFamily}
              fontSize={state.names.fontSize}
              fontWeight={state.names.isBold ? 'bold' : 'normal'}
              letterSpacing={state.names.letterSpacing}
            >
              {state.names.text}
            </text>

            <text
              x="300"
              y="530"
              textAnchor="middle"
              fill={textCol}
              fontFamily={state.date.fontFamily}
              fontSize={state.date.fontSize}
            >
              {state.date.text}
            </text>

            <text
              x="300"
              y="570"
              textAnchor="middle"
              fill={artworkCol}
              fontFamily={state.location.fontFamily}
              fontSize={state.location.fontSize}
            >
              {state.location.text}
            </text>
          </g>
        </g>
      )}

      {/* ====================================================================
          LAYER 1: Symmetrical Two-Door Arch Gatefold (Doors Swing on Fold Lines)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="gatefold-two-doors">
          {/* LEFT DOOR */}
          <g
            id="left-arch-door"
            style={{
              transformOrigin: '150px 450px',
              transform: `rotateY(${leftDoorAngle}deg)`,
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <path
              d={leftDoorPath}
              fill={cardBase}
              filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
            />
            {state.activeLayerMode === 'mockup' && paperFilter && (
              <path d={leftDoorPath} fill={cardBase} filter={paperFilter} opacity="0.9" />
            )}
            {/* Embossed Filigree Door Border */}
            <path
              d={leftDoorPath}
              fill="none"
              stroke={frameStroke}
              strokeWidth="1.4"
              opacity="0.85"
              filter={state.enableLetterpressEmboss ? 'url(#letterpress-emboss)' : undefined}
              transform="translate(155, 105) scale(0.93) translate(-150, -90)"
            />
            {/* Left Door Botanical Flourish */}
            <g transform="translate(225, 460) scale(0.6)" stroke={artworkCol} fill="none" opacity="0.7">
              <path d="M 0,-80 C -30,-40 -40,40 0,80" strokeWidth="1.5" />
              <path d="M -15,-30 Q -35,-20 -20,-5" fill={artworkCol} />
              <path d="M -22,10 Q -40,25 -20,35" fill={artworkCol} />
            </g>
          </g>

          {/* RIGHT DOOR */}
          <g
            id="right-arch-door"
            style={{
              transformOrigin: '450px 450px',
              transform: `rotateY(${rightDoorAngle}deg)`,
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <path
              d={rightDoorPath}
              fill={cardBase}
              filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
            />
            {state.activeLayerMode === 'mockup' && paperFilter && (
              <path d={rightDoorPath} fill={cardBase} filter={paperFilter} opacity="0.9" />
            )}
            {/* Embossed Filigree Door Border */}
            <path
              d={rightDoorPath}
              fill="none"
              stroke={frameStroke}
              strokeWidth="1.4"
              opacity="0.85"
              filter={state.enableLetterpressEmboss ? 'url(#letterpress-emboss)' : undefined}
              transform="translate(305, 105) scale(0.93) translate(-300, -90)"
            />
            {/* Right Door Botanical Flourish */}
            <g transform="translate(375, 460) scale(0.6)" stroke={artworkCol} fill="none" opacity="0.7">
              <path d="M 0,-80 C 30,-40 40,40 0,80" strokeWidth="1.5" />
              <path d="M 15,-30 Q 35,-20 20,-5" fill={artworkCol} />
              <path d="M 22,10 Q 40,25 20,35" fill={artworkCol} />
            </g>
          </g>

          {/* PRECISION HORIZONTAL SLIT ACROSS CENTER SEAM */}
          <g id="center-lock-slit" opacity={isOpen ? 0.3 : 1}>
            <rect
              x={slitX1}
              y={slitY - 1.5}
              width={slitX2 - slitX1}
              height="3"
              rx="1.5"
              fill="#18151D"
              stroke={artworkCol}
              strokeWidth="0.8"
            />
          </g>

          {/* 3D DIE-CUT WATERCOLOR WHITE LILY SLIDING LOCK STEM */}
          <g
            id="sliding-lily-clasp"
            style={{
              transform: `translate(0px, ${isOpen ? -120 : isLocked ? 0 : -80}px)`,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Lily Stem inserting through the slit */}
            <path
              d={`M 300, ${lilyY + 30} L 300, ${slitY + 70}`}
              stroke="#4E6845"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#card-drop-shadow)"
            />
            <path
              d={`M 300, ${lilyY + 50} Q 280, ${lilyY + 65} 270, ${lilyY + 80}`}
              stroke="#5D7E53"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d={`M 300, ${lilyY + 70} Q 320, ${lilyY + 85} 330, ${lilyY + 100}`}
              stroke="#5D7E53"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Realistic 3D Watercolor White Lily Blossom */}
            <g transform={`translate(300, ${lilyY}) scale(0.85)`}>
              <WatercolorWhiteLily x={0} y={0} scale={1.1} />
            </g>

            {/* Gold foil ribbon band around lily base */}
            <rect
              x="280"
              y={lilyY + 28}
              width="40"
              height="8"
              rx="3"
              fill={foilGrad}
              filter="url(#foil-emboss-bevel)"
            />
          </g>
        </g>
      )}

      {/* ====================================================================
          LAYER 4: Plotter Dielines & Fold Lines (Cameo 5 / Skycut Cut & Score)
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="arch-gatefold-cutlines" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          {/* Outer Arch Perimeter Cut (0.1mm Red Hairline) */}
          <path
            d={innerCardPath}
            fill="none"
            stroke="#FF0000"
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
          />

          {/* Left Door Score Line (Dashed Blue 0.2mm) */}
          <line
            x1="150"
            y1="90"
            x2="150"
            y2="795"
            stroke="#0000FF"
            strokeWidth="0.8"
            strokeDasharray="4, 4"
          />

          {/* Right Door Score Line (Dashed Blue 0.2mm) */}
          <line
            x1="450"
            y1="90"
            x2="450"
            y2="795"
            stroke="#0000FF"
            strokeWidth="0.8"
            strokeDasharray="4, 4"
          />

          {/* Precision Slit Cut Path */}
          <line
            x1={slitX1}
            y1={slitY}
            x2={slitX2}
            y2={slitY}
            stroke="#FF0000"
            strokeWidth="0.8"
          />

          {state.activeLayerMode === 'cut' && (
            <text x="300" y="825" textAnchor="middle" fill="#E11D48" fontSize="9" fontFamily="Cairo, sans-serif">
              مسار قص بوابة الزنبق المقوسة (أحمر = قص، أزرق منقط = طي/ريجة) - 14×19 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
