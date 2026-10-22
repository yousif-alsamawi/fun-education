import React, { forwardRef } from 'react';
import { StudioState } from '../../types/studio';
import { FrontCardFacePiece } from './FrontCardFacePiece';
import { FloralCardPiece } from './FloralCardPiece';
import { DetachedRingPiece } from './DetachedRingPiece';
import { FrenchEnvelopeSuitePiece } from './FrenchEnvelopeSuitePiece';
import { ArchGatefoldLilyPiece } from './ArchGatefoldLilyPiece';
import { ArchWindowPocketPiece } from './ArchWindowPocketPiece';
import { IntegratedHandleFanPiece } from './IntegratedHandleFanPiece';
import { DoubleHalfArchPiece } from './DoubleHalfArchPiece';
import { FullSuiteViewPiece } from './FullSuiteViewPiece';
import { BackCardFacePiece } from './BackCardFacePiece';
import { QrCodeSvg } from './QrCodeSvg';
import { StudioDefsLibrary } from './StudioDefsLibrary';
import { CommercialPrintOverlay } from './CommercialPrintOverlay';

interface SvgRendererProps {
  state: StudioState;
}

export const SvgRenderer = forwardRef<SVGSVGElement, SvgRendererProps>(
  ({ state }, ref) => {
    const isSuite = state.isFullSuiteMode;
    const isSideBySide = !isSuite && state.activeCardFace === 'both';

    // Determine canvas dimensions based on mode and template
    const isExplodedFan = !state.isAssemblyMode && state.activeTemplateId === 'floral-fan' && !isSideBySide;
    const isExplodedDoubleArch = !state.isAssemblyMode && state.activeTemplateId === 'double-half-arch' && !isSideBySide;
    const isGatefoldOpenWide = state.activeTemplateId === 'arch-gatefold-lily' && state.isGatefoldOpen && !isSideBySide;
    const isFrenchSuiteWide = state.activeTemplateId === 'french-envelope-suite' && !isSideBySide;

    const isWideCut =
      state.activeLayerMode === 'cut' &&
      !isSideBySide &&
      (state.activeTemplateId === 'arch-window-pocket' ||
        state.activeTemplateId === 'double-half-arch' ||
        state.activeTemplateId === 'arch-gatefold-lily');

    const isWideCanvas = isSuite || isExplodedFan || isExplodedDoubleArch || isGatefoldOpenWide || isFrenchSuiteWide || isWideCut;
    const viewBoxWidth = isSideBySide ? 1340 : isSuite ? 1020 : isWideCanvas ? 920 : 620;
    const viewBoxHeight = isSideBySide ? 900 : 860;

    // Piece 1 position offset for floral fan
    const piece1OffsetX = isExplodedFan ? 40 : 10;
    const piece1OffsetY = 15;

    // Piece 2 (Donut Ring) position
    const ringCenterX = isExplodedFan ? 750 : 470;
    const ringCenterY = isExplodedFan ? 400 : 700;
    const ringOuterR = 85;
    const ringInnerR = 45;
    const ringTextR = (ringOuterR + ringInnerR) / 2;

    // Path for SVG <textPath> along the ring
    const ringTextArcPath = `
      M ${ringCenterX - ringTextR}, ${ringCenterY}
      A ${ringTextR} ${ringTextR} 0 1,1 ${ringCenterX + ringTextR}, ${ringCenterY}
      A ${ringTextR} ${ringTextR} 0 0,1 ${ringCenterX - ringTextR}, ${ringCenterY}
    `;

    // Smart default QR Code Positioning on Card per template
    let qrX = piece1OffsetX + 65;
    let qrY = piece1OffsetY + 660;

    switch (state.activeTemplateId) {
      case 'floral-fan':
        qrX = piece1OffsetX + 65;
        qrY = piece1OffsetY + 660;
        break;
      case 'french-envelope-suite':
        qrX = 165;
        qrY = 460;
        break;
      case 'arch-gatefold-lily':
        qrX = 268;
        qrY = 660;
        break;
      case 'arch-window-pocket':
        qrX = 268;
        qrY = 560;
        break;
      case 'integrated-handle-fan':
        qrX = 268;
        qrY = 500;
        break;
      case 'double-half-arch':
        qrX = 308;
        qrY = 575;
        break;
      default:
        break;
    }

    if (state.qrCode.position === 'bottom-right') {
      qrX = 430;
    } else if (state.qrCode.position === 'top-left') {
      qrX = 75;
      qrY = 85;
    } else if (state.qrCode.position === 'center-bottom') {
      qrX = 268;
    }

    const artworkCol = state.artworkColor || '#8B1E3F';
    const textCol = state.textColor || '#6B0F2B';

    return (
      <svg
        ref={ref}
        id="master-invitation-svg"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-full max-h-[82vh] transition-all duration-300 select-none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        {/* ====================================================================
            DEFS: Photorealistic Paper Micro-Textures, 7-Stop Foils, Botanical & Wax Shaders
            ==================================================================== */}
        <StudioDefsLibrary state={state} ringTextArcPath={ringTextArcPath} />

        {/* ====================================================================
            CANVAS GRID & RULER (Engineering Guides)
            ==================================================================== */}
        {state.showGrid && (
          <g id="engineering-grid" opacity="0.15">
            {Array.from({ length: 52 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2={viewBoxHeight} stroke={artworkCol} strokeWidth="0.5" />
            ))}
            {Array.from({ length: 52 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 20} x2={viewBoxWidth} y2={i * 20} stroke={artworkCol} strokeWidth="0.5" />
            ))}
          </g>
        )}

        {/* ====================================================================
            FEATURE: "📦 وضع البكج المتكامل" OR "🎴 نظام الوجه والقفا (FRONT vs. BACK vs. BOTH)"
            ==================================================================== */}
        {(() => {
          // 1. Full Suite Synchronization Mode
          if (isSuite) {
            return <FullSuiteViewPiece state={state} />;
          }

          // Front card content renderer for the 6 exclusive luxury wedding templates
          const renderFrontCard = () => (
            <>
              <FrontCardFacePiece state={state} />

              {/* Template 3: Floral Fan secondary date ring when exploded and not in side-by-side */}
              {isExplodedFan && (
                <DetachedRingPiece
                  state={state}
                  centerX={ringCenterX}
                  centerY={ringCenterY}
                  outerRadius={ringOuterR}
                  innerRadius={ringInnerR}
                />
              )}
            </>
          );

          // 2. BACK FACE ONLY VIEW
          if (state.activeCardFace === 'back') {
            return (
              <g id="single-back-card-view" transform="translate(10, 15)">
                <BackCardFacePiece state={state} isMirrored={true} />
              </g>
            );
          }

          // 3. SIDE-BY-SIDE DUPLEX VIEW: FRONT ON RIGHT, BACK ON LEFT (100% 1:1 Scale Parity)
          if (state.activeCardFace === 'both') {
            return (
              <g id="side-by-side-duplex-view">
                {/* LEFT SIDE: THE BACK CARD (القفا والشعار الملكي الفاخر) */}
                <g id="side-by-side-back-card" transform="translate(40, 50)">
                  {/* Luxury Header Indicator Badge */}
                  <g transform="translate(300, -18)">
                    <rect
                      x="-140"
                      y="-14"
                      width="280"
                      height="28"
                      rx="14"
                      fill="#18171E"
                      stroke="#D4AF37"
                      strokeWidth="1"
                      opacity="0.95"
                    />
                    <circle cx="-110" cy="0" r="4" fill="#D4AF37" />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill="#E2B874"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="Cairo, sans-serif"
                    >
                      الوجه الخلفي • القفا والشعار الملكي
                    </text>
                  </g>

                  <BackCardFacePiece state={state} isMirrored={true} />
                </g>

                {/* Elegant Vertical Divider Line */}
                <line
                  x1="670"
                  y1="40"
                  x2="670"
                  y2="860"
                  stroke="#383644"
                  strokeDasharray="6, 6"
                  strokeWidth="1.2"
                  opacity="0.6"
                />

                {/* RIGHT SIDE: THE FRONT CARD (تفاصيل الدعوة والنصوص الكاملة) */}
                <g id="side-by-side-front-card" transform="translate(700, 50)">
                  {/* Luxury Header Indicator Badge */}
                  <g transform="translate(300, -18)">
                    <rect
                      x="-140"
                      y="-14"
                      width="280"
                      height="28"
                      rx="14"
                      fill="#18171E"
                      stroke="#D4AF37"
                      strokeWidth="1"
                      opacity="0.95"
                    />
                    <circle cx="-110" cy="0" r="4" fill="#E2B874" />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill="#E2B874"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="Cairo, sans-serif"
                    >
                      الوجه الأمامي • بطاقة التفاصيل والنصوص
                    </text>
                  </g>

                  {renderFrontCard()}
                </g>
              </g>
            );
          }

          // 4. FRONT FACE ONLY VIEW (Default)
          return (
            <g id="single-front-card-view" transform="translate(10, 15)">
              {renderFrontCard()}
            </g>
          );
        })()}

        {/* ====================================================================
            SHEET CUT MARKS & PRODUCTION ANNOTATIONS (Cut Mode Only)
            ==================================================================== */}
        {state.activeLayerMode === 'cut' && !isSuite && (
          <g id="layer-assembly-guides">
            <rect
              x="5"
              y="5"
              width={viewBoxWidth - 10}
              height={viewBoxHeight - 10}
              fill="none"
              stroke="#E11D48"
              strokeWidth="0.5"
              strokeDasharray="6, 6"
              opacity="0.6"
            />
            <text
              x="20"
              y="25"
              fill="#E11D48"
              fontSize="11"
              fontFamily="Cairo, sans-serif"
              fontWeight="bold"
            >
              ✂️ مسار قطع بلاتر متجهي (Cameo / Skycut / Laser Dieline) - مقاس A4 / SRA4
            </text>
            <text
              x={viewBoxWidth - 20}
              y="25"
              textAnchor="end"
              fill="#E11D48"
              fontSize="10"
              fontFamily="Cairo, sans-serif"
            >
              شفرة سكايكت: 0.75pt Hairline | خطوط القص: أحمر مصمت | خطوط الطي: أزرق منقط
            </text>
          </g>
        )}

        {/* ====================================================================
            COMMERCIAL 300 DPI PRINT BLEED & REGISTRATION MARKS OVERLAY
            ==================================================================== */}
        <CommercialPrintOverlay state={state} width={viewBoxWidth} height={viewBoxHeight} />
      </svg>
    );
  }
);

SvgRenderer.displayName = 'SvgRenderer';
