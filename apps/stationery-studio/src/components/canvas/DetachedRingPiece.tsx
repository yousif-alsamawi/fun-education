import React from 'react';
import { StudioState } from '../../types/studio';

interface DetachedRingPieceProps {
  state: StudioState;
  centerX: number;
  centerY: number;
  outerRadius?: number;
  innerRadius?: number;
}

/**
 * Piece 2: Detached Circular Ring (Updated with Multi-Layer Colors)
 * - Donut Ring Base Color: state.secondaryPieceColor
 * - Border / Filigree: state.artworkColor
 * - Curved Date text: state.textColor
 */
export const DetachedRingPiece: React.FC<DetachedRingPieceProps> = ({
  state,
  centerX,
  centerY,
  outerRadius = 90,
  innerRadius = 45
}) => {
  const secondaryCol = state.secondaryPieceColor || '#F4F1EA';
  const artworkCol = state.artworkColor || '#8B1E3F';
  const textCol = state.textColor || '#6B0F2B';

  // Donut path for cutting & paper silhouette
  const donutPath = `
    M ${centerX}, ${centerY - outerRadius}
    A ${outerRadius} ${outerRadius} 0 1,0 ${centerX}, ${centerY + outerRadius}
    A ${outerRadius} ${outerRadius} 0 1,0 ${centerX}, ${centerY - outerRadius}
    Z
    M ${centerX}, ${centerY - innerRadius}
    A ${innerRadius} ${innerRadius} 0 1,1 ${centerX}, ${centerY + innerRadius}
    A ${innerRadius} ${innerRadius} 0 1,1 ${centerX}, ${centerY - innerRadius}
    Z
  `;

  // Rivet eyelet hole at the overlapping edge
  const rivetOffsetDist = (outerRadius + innerRadius) / 2;
  const rivetAngleRad = (210 * Math.PI) / 180;
  const rivetX = centerX + rivetOffsetDist * Math.cos(rivetAngleRad);
  const rivetY = centerY + rivetOffsetDist * Math.sin(rivetAngleRad);

  return (
    <g id="piece-2-detached-ring" className="piece-detached-ring">
      {/* 
        ========================================================================
        LAYER 0: Paper Background for the Donut Ring (Rendered in Mockup & Print)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-paper-ring-backdrop">
          {/* Ring Base Fill (Layer 3: Secondary Piece Color) */}
          <path
            d={donutPath}
            fill={secondaryCol}
            fillRule="evenodd"
            filter={state.activeLayerMode === 'mockup' ? 'url(#ring-drop-shadow)' : undefined}
          />
          {/* Paper texture overlay in mockup */}
          {state.activeLayerMode === 'mockup' && (
            <path
              d={donutPath}
              fill="url(#paper-texture-pattern)"
              fillRule="evenodd"
              opacity="0.4"
            />
          )}
          {/* Shimmer border ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={outerRadius - 3}
            fill="none"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1.2"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={innerRadius + 3}
            fill="none"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1"
          />
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 1: Artwork Layer (Ring Decorative Accents & Filigree)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-artwork-ring">
          <circle
            cx={centerX}
            cy={centerY}
            r={outerRadius - 6}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            strokeDasharray="2, 4"
            opacity="0.75"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={innerRadius + 6}
            fill="none"
            stroke={artworkCol}
            strokeWidth="0.8"
            strokeDasharray="2, 4"
            opacity="0.75"
          />

          <text
            x={centerX}
            y={centerY - outerRadius + 14}
            textAnchor="middle"
            fill={artworkCol}
            fontSize="10"
          >
            ✦
          </text>
          <text
            x={centerX}
            y={centerY + outerRadius - 8}
            textAnchor="middle"
            fill={artworkCol}
            fontSize="10"
          >
            ✦
          </text>
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 2: Text Layer (Curved Date using SVG <textPath>)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-text-ring">
          <text
            fill={textCol}
            fontFamily={state.ringDate.fontFamily}
            fontSize={state.ringDate.fontSize}
            fontWeight={state.ringDate.isBold ? 'bold' : 'normal'}
            letterSpacing={state.ringDate.letterSpacing}
            className="select-none"
          >
            <textPath
              href="#ring-curved-text-path"
              startOffset="50%"
              textAnchor="middle"
            >
              {state.ringDate.text}
            </textPath>
          </text>
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 4: Cut Lines / Dieline Layer (Cameo/Skycut Hairline)
        ========================================================================
      */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g
          id="layer-cut-lines-piece2"
          opacity={state.activeLayerMode === 'cut' ? 1 : 0.4}
        >
          <circle
            cx={centerX}
            cy={centerY}
            r={outerRadius}
            fill="none"
            stroke={state.dielineStrokeColor}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={innerRadius}
            fill="none"
            stroke={state.dielineStrokeColor}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />
          <circle
            cx={rivetX}
            cy={rivetY}
            r={3}
            fill="none"
            stroke={state.dielineStrokeColor}
            strokeWidth="0.75"
          />
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 5: Assembly Hardware Guide (Brass Rivet)
        ========================================================================
      */}
      {state.activeLayerMode === 'mockup' && (
        <g id="layer-assembly-hardware">
          <circle
            cx={rivetX}
            cy={rivetY}
            r={6}
            fill="url(#dynamic-artwork-gradient)"
            filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))"
          />
          <circle cx={rivetX} cy={rivetY} r={3} fill="#2A1B0E" />
          <circle cx={rivetX - 1.5} cy={rivetY - 1.5} r={1.2} fill="#FFF" opacity="0.8" />
        </g>
      )}
    </g>
  );
};
