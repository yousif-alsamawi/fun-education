import React from 'react';
import { StudioState } from '../../types/studio';
import { ArtworkPatterns } from './ArtworkPatterns';

interface SongWaveTagPieceProps {
  state: StudioState;
}

/**
 * Template 9: تاق الأغنية التفاعلي (Spotify/Song QR Cassette & Wave Tag)
 * - Modern gift tag with chamfered top corners and top ribbon punch hole.
 * - Dynamic SVG Soundwave Audio Frequency visualizer.
 * - Music player cassette interface with song title and custom QR code.
 */
export const SongWaveTagPiece: React.FC<SongWaveTagPieceProps> = ({ state }) => {
  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#8C5332';
  const textCol = state.textColor || '#2D1B14';

  const tagX = 145;
  const tagY = 120;
  const tagW = 310;
  const tagH = 580;
  const chamfer = 35;

  // Chamfered top tag path
  const songTagPath = `
    M ${tagX + chamfer}, ${tagY}
    L ${tagX + tagW - chamfer}, ${tagY}
    L ${tagX + tagW}, ${tagY + chamfer}
    L ${tagX + tagW}, ${tagY + tagH - 12}
    Q ${tagX + tagW}, ${tagY + tagH} ${tagX + tagW - 12}, ${tagY + tagH}
    L ${tagX + 12}, ${tagY + tagH}
    Q ${tagX}, ${tagY + tagH} ${tagX}, ${tagY + tagH - 12}
    L ${tagX}, ${tagY + chamfer}
    Z
  `;

  // Top eyelet hole
  const holeX = 300;
  const holeY = tagY + 32;
  const holeR = 5;

  // Soundwave bar heights (symmetric frequencies)
  const waveBars = [
    12, 22, 38, 55, 30, 68, 85, 45, 95, 110, 75, 40, 90, 60, 35, 70, 98, 48, 28, 14
  ];

  return (
    <g id="template-song-wave-tag" className="template-song-tag">
      {/* ====================================================================
          1. PAPER BACKDROP & REINFORCED EYELET
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="song-tag-backdrop">
          <path
            d={songTagPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path
              d={songTagPath}
              fill="url(#paper-texture-pattern)"
              opacity="0.35"
            />
          )}

          {/* Inset Border */}
          <path
            d={`
              M ${tagX + chamfer - 2}, ${tagY + 12}
              L ${tagX + tagW - chamfer + 2}, ${tagY + 12}
              L ${tagX + tagW - 12}, ${tagY + chamfer - 2}
              L ${tagX + tagW - 12}, ${tagY + tagH - 16}
              L ${tagX + 12}, ${tagY + tagH - 16}
              L ${tagX + 12}, ${tagY + chamfer - 2}
              Z
            `}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* Eyelet Ring */}
          <circle cx={holeX} cy={holeY} r={holeR + 3.5} fill="none" stroke={artworkCol} strokeWidth="1.5" />
          <circle cx={holeX} cy={holeY} r={holeR} fill="#FAF9F6" />
        </g>
      )}

      {/* ====================================================================
          2. ARTWORK & SOUNDWAVE AUDIO VISUALIZER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="song-tag-artwork">
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'soundwave-audio'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={artworkCol}
            templateId={state.activeTemplateId}
          />

          {/* DYNAMIC SOUNDWAVE BARS (x=175 to x=425, y=340) */}
          <g transform="translate(175, 340)">
            {waveBars.map((barHeight, i) => {
              const xPos = i * 13;
              return (
                <g key={`bar-${i}`}>
                  <line
                    x1={xPos}
                    y1={-barHeight / 2}
                    x2={xPos}
                    y2={barHeight / 2}
                    stroke={artworkCol}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    opacity={0.85 + (i % 3) * 0.05}
                  />
                  <circle cx={xPos} cy={-barHeight / 2 - 3} r="1.2" fill={artworkCol} opacity="0.6" />
                </g>
              );
            })}
          </g>

          {/* MUSIC PLAYER SCRUBBER & TIMELINE */}
          <g transform="translate(175, 415)">
            {/* Timeline track line */}
            <line x1="0" y1="0" x2="250" y2="0" stroke={artworkCol} strokeWidth="2" opacity="0.3" strokeLinecap="round" />
            {/* Progress line */}
            <line x1="0" y1="0" x2="165" y2="0" stroke={artworkCol} strokeWidth="2.5" strokeLinecap="round" />
            {/* Scrubber thumb */}
            <circle cx="165" cy="0" r="4.5" fill={artworkCol} />

            {/* Time labels */}
            <text x="0" y="16" fill={artworkCol} fontSize="9" fontFamily="Cairo, sans-serif" opacity="0.8">
              03:42
            </text>
            <text x="250" y="16" textAnchor="end" fill={artworkCol} fontSize="9" fontFamily="Cairo, sans-serif" opacity="0.8">
              ∞ / 05:20
            </text>
          </g>

          {/* MEDIA CONTROLS (Shuffle, Prev, Play, Next, Repeat) */}
          <g transform="translate(300, 460)">
            {/* Play Button Circle */}
            <circle cx="0" cy="0" r="16" fill={artworkCol} />
            <polygon points="-4,-7 7,0 -4,7" fill="#FAF9F6" />

            {/* Prev / Next Chevrons */}
            <path d="M -30,-6 L -37,0 L -30,6 M -37,-6 L -37,6" fill="none" stroke={artworkCol} strokeWidth="1.5" />
            <path d="M 30,-6 L 37,0 L 30,6 M 37,-6 L 37,6" fill="none" stroke={artworkCol} strokeWidth="1.5" />
          </g>
        </g>
      )}

      {/* ====================================================================
          3. TYPOGRAPHY LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="song-tag-text">
          {/* Couple Monogram Crest */}
          <text
            x="300"
            y={tagY + 80}
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.monogram.fontFamily}
            fontSize={state.monogram.fontSize * 0.8}
            fontWeight="bold"
          >
            {state.monogram.text}
          </text>

          {/* Subtitle / Cassette Tagline */}
          <text
            x="300"
            y={tagY + 115}
            textAnchor="middle"
            fill={artworkCol}
            fontFamily="Cairo, sans-serif"
            fontSize="10"
            letterSpacing="2"
          >
            ✦ WEDDING SOUNDTRACK ✦
          </text>

          {/* Main Couple Names */}
          <text
            x="300"
            y={tagY + 155}
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize * 0.85}
            fontWeight="bold"
          >
            {state.names.text}
          </text>

          {/* Song Name / Track Title */}
          <text
            x="300"
            y={245}
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.greeting.fontFamily}
            fontSize="13"
            fontWeight="bold"
          >
            {state.greeting.text}
          </text>

          {/* Date */}
          <text
            x="300"
            y={272}
            textAnchor="middle"
            fill={artworkCol}
            fontFamily={state.date.fontFamily}
            fontSize="11"
            opacity="0.9"
          >
            {state.date.text}
          </text>

          {/* Scan song label */}
          <text
            x="300"
            y={505}
            textAnchor="middle"
            fill={textCol}
            fontFamily="Cairo, sans-serif"
            fontSize="10"
            fontWeight="bold"
          >
            امسح الرمز للاستماع إلى أغنيتنا الخاصة 🎵
          </text>
        </g>
      )}

      {/* ====================================================================
          4. CUT / DIELINE LAYER
          ==================================================================== */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-song-tag" opacity={state.activeLayerMode === 'cut' ? 1 : 0.4}>
          <path
            d={songTagPath}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />

          {/* Ribbon punch hole */}
          <circle
            cx={holeX}
            cy={holeY}
            r={holeR}
            fill="none"
            stroke={state.dielineStrokeColor || '#FF0000'}
            strokeWidth="0.75"
          />

          {state.activeLayerMode === 'cut' && (
            <text
              x="300"
              y={tagY + tagH + 30}
              textAnchor="middle"
              fill="#FF0000"
              fontSize="11"
              fontFamily="Cairo, sans-serif"
            >
              تاق الأغنية التفاعلي (Song QR Cassette Tag + 10mm Hole) - 7×14 سم
            </text>
          )}
        </g>
      )}
    </g>
  );
};
