import React, { useEffect, useState } from 'react';
import { QrConfig } from '../../types/studio';
import { getQrMatrixPaths } from '../../utils/qrGenerator';

interface QrCodeSvgProps {
  config: QrConfig;
  primaryColor: string;
  accentColor: string;
  x: number;
  y: number;
}

export const QrCodeSvg: React.FC<QrCodeSvgProps> = ({
  config,
  primaryColor,
  accentColor,
  x,
  y
}) => {
  const [qrData, setQrData] = useState<{ size: number; paths: string }>({
    size: 25,
    paths: ''
  });

  useEffect(() => {
    let isMounted = true;
    getQrMatrixPaths(config.url).then((res) => {
      if (isMounted) {
        setQrData(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [config.url]);

  if (!config.enabled) return null;

  const targetSize = config.size || 70;
  const padding = 8;
  const totalBoxWidth = targetSize + padding * 2;
  const totalBoxHeight = targetSize + padding * 2 + 18; // 18px for label below
  const scale = targetSize / (qrData.size || 25);

  return (
    <g transform={`translate(${x}, ${y})`} className="qr-code-group select-none">
      {/* Decorative luxury background card */}
      <rect
        x="0"
        y="0"
        width={totalBoxWidth}
        height={totalBoxHeight}
        rx="6"
        ry="6"
        fill="#FFFFFF"
        stroke={accentColor}
        strokeWidth="1.2"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
      />

      {/* Elegant inner hairline border */}
      <rect
        x="3"
        y="3"
        width={totalBoxWidth - 6}
        height={totalBoxHeight - 6}
        rx="4"
        ry="4"
        fill="none"
        stroke={accentColor}
        strokeWidth="0.5"
        strokeDasharray="2, 2"
        opacity="0.7"
      />

      {/* QR Code Matrix Vector Paths */}
      <g transform={`translate(${padding}, ${padding}) scale(${scale})`}>
        <path d={qrData.paths} fill={config.color || primaryColor} />
      </g>

      {/* Label Text below QR */}
      {config.label && (
        <text
          x={totalBoxWidth / 2}
          y={targetSize + padding + 13}
          textAnchor="middle"
          fill={config.color || primaryColor}
          fontSize="9"
          fontFamily="Cairo, sans-serif"
          fontWeight="600"
          letterSpacing="0.5"
        >
          {config.label}
        </text>
      )}
    </g>
  );
};
