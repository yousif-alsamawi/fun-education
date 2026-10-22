import React from 'react';
import { StudioState } from '../../types/studio';
import { TEMPLATE_DIELINES, getInnerOffsetTransform } from '../../utils/templateDielines';
import { ArtworkPatterns } from './ArtworkPatterns';
import { QrCodeSvg } from './QrCodeSvg';
import { InterlockingMonogramSvg } from './InterlockingMonogramSvg';

interface BackCardFacePieceProps {
  state: StudioState;
  isMirrored?: boolean;
}

export const BackCardFacePiece: React.FC<BackCardFacePieceProps> = ({
  state,
  isMirrored = false
}) => {
  const geom = TEMPLATE_DIELINES[state.activeTemplateId] || TEMPLATE_DIELINES['royal-arch'];
  const backCfg = state.backDesign;

  const isBotanical = state.designSchoolTheme === 'fine-art-botanical';
  const isMinimalist = state.designSchoolTheme === 'modern-minimalist';
  const bgColor = backCfg.backgroundColor || (isMinimalist ? '#18181B' : isBotanical ? '#FAF8F5' : '#0F291E');
  const artworkCol = backCfg.artworkColor || (isMinimalist ? '#FFFFFF' : isBotanical ? '#4A5D23' : '#D4AF37');
  const style = backCfg.style || 'monogram-centered';

  const shouldMirrorDieline = isMirrored && geom.isAsymmetricDuplex;

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

  return (
    <g id="back-card-face-piece" className="back-card-face-piece">
      <defs>
        {/* Silhouette Clip for the Back Card */}
        <clipPath id="back-card-silhouette-clip">
          <path
            d={geom.path}
            transform={shouldMirrorDieline ? 'translate(600, 0) scale(-1, 1)' : undefined}
          />
        </clipPath>

        {/* Dynamic Radial Glow for Back Emblem */}
        <radialGradient id="back-emblem-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={artworkCol} stopOpacity="0.22" />
          <stop offset="60%" stopColor={artworkCol} stopOpacity="0.05" />
          <stop offset="100%" stopColor={bgColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ====================================================================
          LAYER 0: Paper Backdrop & Textured Fill (Mockup & Print)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="back-layer-backdrop">
          {/* Main Solid Contrasting Paper Silhouette */}
          <path
            d={geom.path}
            fill={bgColor}
            filter={
              state.displayMode !== 'print-canvas' && state.activeLayerMode === 'mockup'
                ? 'url(#photorealistic-mockup-shadow)'
                : state.activeLayerMode === 'mockup'
                ? 'url(#studio-ambient-shadow)'
                : undefined
            }
            transform={shouldMirrorDieline ? 'translate(600, 0) scale(-1, 1)' : undefined}
          />

          {/* Physical Tactile Paper Texture */}
          {state.activeLayerMode === 'mockup' && paperFilter && (
            <path
              d={geom.path}
              fill={bgColor}
              filter={paperFilter}
              opacity="0.85"
              transform={shouldMirrorDieline ? 'translate(600, 0) scale(-1, 1)' : undefined}
            />
          )}

          {/* Paper Texture Micro-Pattern Overlay */}
          {state.activeLayerMode === 'mockup' && (
            <path
              d={geom.path}
              fill="url(#paper-texture-pattern)"
              opacity="0.35"
              transform={shouldMirrorDieline ? 'translate(600, 0) scale(-1, 1)' : undefined}
            />
          )}

          {/* Outer Borders: Minimalist Hairline, Botanical Delicate, or Royal Double Gold */}
          {isMinimalist ? (
            <path
              d={geom.path}
              fill="none"
              stroke={artworkCol}
              strokeWidth="0.8"
              opacity="0.4"
              transform={getInnerOffsetTransform(0.96)}
            />
          ) : isBotanical ? (
            <path
              d={geom.path}
              fill="none"
              stroke={artworkCol}
              strokeWidth="0.5"
              opacity="0.32"
              transform={getInnerOffsetTransform(0.95)}
            />
          ) : (
            <>
              <path
                d={geom.path}
                fill="none"
                stroke={state.isFoilEnabled ? 'url(#foil-mirror-gold-24k)' : artworkCol}
                strokeWidth="1.4"
                opacity="0.85"
                transform={getInnerOffsetTransform(0.94)}
              />
              <path
                d={geom.path}
                fill="none"
                stroke={state.isFoilEnabled ? 'url(#foil-mirror-gold-24k)' : artworkCol}
                strokeWidth="0.75"
                strokeDasharray="4, 4"
                opacity="0.6"
                transform={getInnerOffsetTransform(0.92)}
              />
            </>
          )}
        </g>
      )}

      {/* ====================================================================
          LAYER 1: Artwork & Minimalist Emblem (Mockup & Print)
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="back-layer-artwork" clipPath="url(#back-card-silhouette-clip)">
          {/* Custom Uploaded Back Background Image */}
          {state.customBackBackgroundImage && (
            <image
              href={state.customBackBackgroundImage}
              x="0"
              y="0"
              width="600"
              height="860"
              preserveAspectRatio="xMidYMid slice"
              opacity={state.backBgImageOpacity ?? 0.85}
            />
          )}

          {/* STYLE 1: Centered Luxury Royal Monogram Emblem (Default) */}
          {style === 'monogram-centered' && (
            <g id="style-monogram-centered">
              {/* Radial Soft Gold Aura */}
              <circle cx="300" cy="410" r="220" fill="url(#back-emblem-glow)" />

              {state.monogramBuilder ? (
                <InterlockingMonogramSvg
                  config={{
                    ...state.monogramBuilder,
                    fontFamily: backCfg.fontFamily || state.monogramBuilder.fontFamily,
                    size: backCfg.monogramSize || state.monogramBuilder.size,
                    initial1: state.monogramBuilder.initial1 || (backCfg.monogramText ? backCfg.monogramText.split('&')[0]?.trim() : 'W'),
                    initial2: state.monogramBuilder.initial2 || (backCfg.monogramText ? backCfg.monogramText.split('&')[1]?.trim() : 'S'),
                    useHotFoil: state.isFoilEnabled && (state.foilTargets?.monogram ?? true)
                  }}
                  cx={300}
                  cy={410}
                  hotFoilType={state.isFoilEnabled ? state.hotFoilType : 'none'}
                  primaryColor={artworkCol}
                />
              ) : (
                <>
                  {/* Ornate Circular Botanical Laurel Wreath */}
                  <g
                    id="royal-laurel-wreath"
                    stroke={artworkCol}
                    fill="none"
                    strokeWidth="1.4"
                    opacity="0.85"
                  >
                    <circle cx="300" cy="410" r="105" strokeDasharray="3, 4" opacity="0.6" />
                    <circle cx="300" cy="410" r="98" strokeWidth="1.2" />
                  </g>
                  <text
                    x="300"
                    y="426"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={artworkCol}
                    fontFamily={backCfg.fontFamily || '"Playfair Display", serif'}
                    fontSize={backCfg.monogramSize || 56}
                    fontWeight="bold"
                    letterSpacing="4"
                  >
                    {backCfg.monogramText || 'W & S'}
                  </text>
                </>
              )}
            </g>
          )}

          {/* STYLE 2: Full-Bleed Botanical Veins + Single/Couple Initial */}
          {style === 'full-botanical-veins' && (
            <g id="style-full-botanical-veins">
              {/* Full-Bleed Pattern with Configurable Opacity */}
              <g opacity={backCfg.patternOpacity || 0.3}>
                <ArtworkPatterns
                  patternStyle={state.artworkPatternStyle || 'petal-veins'}
                  artworkColor={artworkCol}
                  artworkGradientEnd={artworkCol}
                  accentColor={artworkCol}
                  templateId={state.activeTemplateId}
                />
              </g>

              {/* Center Medallion Badge */}
              <circle
                cx="300"
                cy="410"
                r="72"
                fill={bgColor}
                stroke={artworkCol}
                strokeWidth="2"
                filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
              />
              <circle
                cx="300"
                cy="410"
                r="64"
                fill="none"
                stroke={artworkCol}
                strokeWidth="1"
                strokeDasharray="2, 3"
                opacity="0.8"
              />

              {/* Large Monogram Inside Medallion */}
              <text
                x="300"
                y="420"
                textAnchor="middle"
                dominantBaseline="central"
                fill={artworkCol}
                fontFamily={backCfg.fontFamily || '"Playfair Display", serif'}
                fontSize={(backCfg.monogramSize || 56) + 4}
                fontWeight="bold"
                letterSpacing="2"
              >
                {backCfg.monogramText || 'W'}
              </text>
            </g>
          )}

          {/* STYLE 3: Minimalist Solid + Mini QR Code */}
          {style === 'solid-minimal-qr' && (
            <g id="style-solid-minimal-qr">
              {/* Refined Double Hairline Inset */}
              <rect
                x="140"
                y="100"
                width="320"
                height="620"
                rx="16"
                fill="none"
                stroke={artworkCol}
                strokeWidth="1.2"
                opacity="0.4"
              />
              <rect
                x="146"
                y="106"
                width="308"
                height="608"
                rx="12"
                fill="none"
                stroke={artworkCol}
                strokeWidth="0.8"
                strokeDasharray="4, 4"
                opacity="0.3"
              />

              {/* Centered Modest Monogram */}
              <g transform="translate(0, -50)">
                <g
                  transform="translate(285, 340)"
                  fill={artworkCol}
                  stroke={artworkCol}
                  strokeWidth="0.6"
                >
                  <path d="M 0, 12 L 2, 4 L 7, 9 L 15, 1 L 23, 9 L 28, 4 L 30, 12 Z" />
                  <circle cx="15" cy="0" r="1.5" />
                </g>
                <text
                  x="300"
                  y="400"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={artworkCol}
                  fontFamily={backCfg.fontFamily || '"Playfair Display", serif'}
                  fontSize={Math.max(34, (backCfg.monogramSize || 56) - 12)}
                  fontWeight="bold"
                  letterSpacing="3"
                >
                  {backCfg.monogramText || 'W & S'}
                </text>
              </g>

              {/* Minimal SVG QR Code */}
              <QrCodeSvg
                config={{
                  enabled: true,
                  url: state.qrCode?.url || 'https://al-shouala.com/event',
                  label: 'مسار الحفل والموقع',
                  color: artworkCol,
                  position: 'center-bottom',
                  size: 65
                }}
                primaryColor={artworkCol}
                accentColor={bgColor}
                x={260}
                y={520}
              />
            </g>
          )}

          {/* ====================================================================
              MINIMAL FOOTER: Tiny Date & Optional Small QR
              ==================================================================== */}
          {/* 1. Tiny Refined Date at Bottom */}
          {backCfg.showSmallDate && style !== 'solid-minimal-qr' && (
            <g id="back-small-date" transform="translate(0, 680)">
              <text
                x="300"
                y="0"
                textAnchor="middle"
                fill={artworkCol}
                fontSize="12"
                fontFamily="Cairo, sans-serif"
                fontWeight="bold"
                letterSpacing="4"
                opacity="0.85"
              >
                {state.date?.text ? `✦ ${state.date.text} ✦` : '✦ ٢٤ . ١٠ . ٢٠٢٦ ✦'}
              </text>
            </g>
          )}

          {/* 2. Optional Tiny QR Code in Monogram Style */}
          {backCfg.showSmallQr && style === 'monogram-centered' && (
            <QrCodeSvg
              config={{
                enabled: true,
                url: state.qrCode?.url || 'https://al-shouala.com/event',
                label: '',
                color: artworkCol,
                position: 'center-bottom',
                size: 50
              }}
              primaryColor={artworkCol}
              accentColor={bgColor}
              x={268}
              y={560}
            />
          )}
        </g>
      )}

      {/* ====================================================================
          LAYER 2: Precision Cut Dieline (LayerMode: 'cut' or overlay)
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g
          id="back-layer-cut"
          opacity={state.activeLayerMode === 'cut' ? 1 : 0.25}
          pointerEvents="none"
        >
          {/* Outer Perimeter Cut Line (Solid Red #FF0000) */}
          <path
            d={geom.path}
            fill="none"
            stroke="#FF0000"
            strokeWidth={state.activeLayerMode === 'cut' ? 1.5 : 0.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            transform={shouldMirrorDieline ? 'translate(600, 0) scale(-1, 1)' : undefined}
          />

          {/* Punch Hole Cut Circles */}
          {geom.hasPunchHole && geom.holeX !== undefined && geom.holeY !== undefined && (
            <circle
              cx={shouldMirrorDieline ? 600 - geom.holeX : geom.holeX}
              cy={geom.holeY}
              r={geom.holeRadius || 4.5}
              fill="none"
              stroke="#FF0000"
              strokeWidth={state.activeLayerMode === 'cut' ? 1.5 : 0.75}
            />
          )}
        </g>
      )}
    </g>
  );
};
