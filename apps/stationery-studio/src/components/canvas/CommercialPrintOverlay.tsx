import React from 'react';
import { StudioState } from '../../types/studio';

interface CommercialPrintOverlayProps {
  state: StudioState;
  width: number;
  height: number;
}

export const CommercialPrintOverlay: React.FC<CommercialPrintOverlayProps> = ({
  state,
  width,
  height
}) => {
  const bleedCfg = state.printBleedConfig;
  const showBleed = bleedCfg.showBleed;
  const showSafeZone = bleedCfg.showSafeZone;
  const showRegMarks = bleedCfg.showRegistrationMarks;

  if (!showBleed && !showSafeZone && !showRegMarks) return null;

  const marginX = 25;
  const marginY = 25;
  const markSize = 24;

  return (
    <g id="commercial-print-overlay" className="commercial-print-overlay select-none" pointerEvents="none">
      {/* 1. 3mm Bleed Boundary Line (Red/Magenta dashed) */}
      {showBleed && (
        <g id="bleed-boundary">
          <rect
            x={10}
            y={10}
            width={width - 20}
            height={height - 20}
            fill="none"
            stroke="#EC4899"
            strokeWidth="1.2"
            strokeDasharray="6, 4"
            opacity="0.85"
          />
          <text
            x={16}
            y={24}
            fill="#EC4899"
            fontSize="10"
            fontFamily="Cairo, sans-serif"
            fontWeight="bold"
          >
            📐 حدود تسييل الطباعة التجارية (3mm Bleed Limit)
          </text>
        </g>
      )}

      {/* 2. Inner Safe Zone Line (Cyan dashed) */}
      {showSafeZone && (
        <g id="safe-zone-boundary">
          <rect
            x={marginX + 20}
            y={marginY + 20}
            width={width - (marginX + 20) * 2}
            height={height - (marginY + 20) * 2}
            fill="none"
            stroke="#06B6D4"
            strokeWidth="1.2"
            strokeDasharray="4, 4"
            opacity="0.75"
          />
          <text
            x={width - marginX - 25}
            y={height - marginY - 26}
            textAnchor="end"
            fill="#06B6D4"
            fontSize="10"
            fontFamily="Cairo, sans-serif"
            fontWeight="bold"
          >
            🛡️ منطقة الأمان للنصوص (Safe Zone - 3mm Inset)
          </text>
        </g>
      )}

      {/* 3. Optical Registration Marks for Cutters & Plotters (Silhouette Cameo / Graphtec / Laser) */}
      {showRegMarks && (
        <g id="optical-registration-marks" fill="#000000" stroke="#000000" strokeWidth="1.5">
          {/* Top-Left: Solid Registration Square (Silhouette Standard) */}
          <rect x={marginX} y={marginY} width={markSize} height={markSize} rx="1" fill="#000000" />
          <line x1={marginX + markSize + 4} y1={marginY} x2={marginX + markSize + 30} y2={marginY} strokeWidth="2" />
          <line x1={marginX} y1={marginY + markSize + 4} x2={marginX} y2={marginY + markSize + 30} strokeWidth="2" />

          {/* Top-Right: L-Bracket Optical Mark */}
          <path
            d={`M ${width - marginX - markSize - 20}, ${marginY} L ${width - marginX}, ${marginY} L ${width - marginX}, ${marginY + markSize + 20}`}
            fill="none"
            strokeWidth="2.5"
          />
          {/* Crosshair Tick */}
          <circle cx={width - marginX - 12} cy={marginY + 12} r="3" fill="#000000" />

          {/* Bottom-Left: L-Bracket Optical Mark */}
          <path
            d={`M ${marginX}, ${height - marginY - markSize - 20} L ${marginX}, ${height - marginY} L ${marginX + markSize + 20}, ${height - marginY}`}
            fill="none"
            strokeWidth="2.5"
          />
          <circle cx={marginX + 12} cy={height - marginY - 12} r="3" fill="#000000" />

          {/* Bottom-Right: L-Bracket Optical Mark */}
          <path
            d={`M ${width - marginX - markSize - 20}, ${height - marginY} L ${width - marginX}, ${height - marginY} L ${width - marginX}, ${height - marginY - markSize - 20}`}
            fill="none"
            strokeWidth="2.5"
          />
          <circle cx={width - marginX - 12} cy={height - marginY - 12} r="3" fill="#000000" />

          {/* Plotter Alignment Caption */}
          <text
            x={width / 2}
            y={height - 8}
            textAnchor="middle"
            fill="#64748B"
            fontSize="9"
            fontFamily="monospace"
          >
            [Cameo 4 / Graphtec CE7000 / Skycut Optical Alignment Marks • 300 DPI 1:1 Scale]
          </text>
        </g>
      )}
    </g>
  );
};
