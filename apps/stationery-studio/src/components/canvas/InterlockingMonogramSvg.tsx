import React from 'react';
import { HotFoilType, InterlockingMonogramConfig } from '../../types/studio';

interface InterlockingMonogramSvgProps {
  config: InterlockingMonogramConfig;
  cx?: number;
  cy?: number;
  hotFoilType?: HotFoilType;
  primaryColor?: string;
}

export const InterlockingMonogramSvg: React.FC<InterlockingMonogramSvgProps> = ({
  config,
  cx = 300,
  cy = 380,
  hotFoilType = 'gold-24k',
  primaryColor = '#D4AF37'
}) => {
  const foilFill =
    config.useHotFoil && hotFoilType !== 'none'
      ? hotFoilType === 'gold-24k'
        ? 'url(#foil-mirror-gold-24k)'
        : hotFoilType === 'rose-gold'
        ? 'url(#foil-rose-gold)'
        : hotFoilType === 'platinum-silver'
        ? 'url(#foil-platinum-silver)'
        : 'url(#foil-antique-copper)'
      : primaryColor;

  const font = config.fontFamily || '"Cinzel Decorative", "Playfair Display", serif';
  const size = config.size || 52;
  const offset = config.interlockOffset || 8;

  const init1 = config.initial1 || 'S';
  const init2 = config.initial2 || 'K';
  const amp = config.ampersand || '&';

  return (
    <g transform={`translate(${cx}, ${cy})`} className="interlocking-monogram-builder select-none">
      {/* 1. Optional Botanical Floral Laurel Wreath Encirclement */}
      {config.showFloralWreath && (
        <g id="monogram-wreath" opacity="0.85">
          {/* Subtle Outer Beaded Halo */}
          <circle cx="0" cy="0" r={size * 1.6} fill="none" stroke={foilFill} strokeWidth="1" strokeDasharray="3, 4" opacity="0.6" />
          <circle cx="0" cy="0" r={size * 1.5} fill="none" stroke={foilFill} strokeWidth="1.2" />

          {/* Left Wreath Branch */}
          <path
            d={`M 0, ${size * 1.3} C -${size * 1.2}, ${size * 1.1} -${size * 1.4}, 0 -${size * 0.9}, -${size * 1.1} C -${size * 0.5}, -${size * 1.3} -${size * 0.2}, -${size * 1.4} 0, -${size * 1.4}`}
            fill="none"
            stroke={foilFill}
            strokeWidth="1.6"
          />
          {/* Left Wreath Olive Leaves */}
          <ellipse cx={-size * 0.9} cy={size * 0.6} rx={size * 0.18} ry={size * 0.08} fill={foilFill} transform="rotate(-35)" />
          <ellipse cx={-size * 1.2} cy={0} rx={size * 0.18} ry={size * 0.08} fill={foilFill} transform="rotate(10)" />
          <ellipse cx={-size * 0.9} cy={-size * 0.6} rx={size * 0.18} ry={size * 0.08} fill={foilFill} transform="rotate(45)" />

          {/* Right Wreath Branch */}
          <path
            d={`M 0, ${size * 1.3} C ${size * 1.2}, ${size * 1.1} ${size * 1.4}, 0 ${size * 0.9}, -${size * 1.1} C ${size * 0.5}, -${size * 1.3} ${size * 0.2}, -${size * 1.4} 0, -${size * 1.4}`}
            fill="none"
            stroke={foilFill}
            strokeWidth="1.6"
          />
          {/* Right Wreath Olive Leaves */}
          <ellipse cx={size * 0.9} cy={size * 0.6} rx={size * 0.18} ry={size * 0.08} fill={foilFill} transform="rotate(35)" />
          <ellipse cx={size * 1.2} cy={0} rx={size * 0.18} ry={size * 0.08} fill={foilFill} transform="rotate(-10)" />
          <ellipse cx={size * 0.9} cy={-size * 0.6} rx={size * 0.18} ry={size * 0.08} fill={foilFill} transform="rotate(-45)" />

          {/* Crown Peak on Top */}
          <g transform={`translate(-12, -${size * 1.55}) scale(0.8)`} fill={foilFill}>
            <path d="M 0,14 L 4,4 L 11,10 L 15,2 L 19,10 L 26,4 L 30,14 Z" />
            <circle cx="15" cy="0" r="1.8" />
          </g>
        </g>
      )}

      {/* 2. LAYOUT: INTERLOCKING INITIALS (Spatial Overlap & Depth) */}
      {config.layout === 'interlocking' && (
        <g id="interlocking-pair" filter={config.useHotFoil ? 'url(#foil-emboss-bevel)' : undefined}>
          {/* First Initial (Positioned slightly to the left and elevated) */}
          <text
            x={-offset}
            y={-4}
            textAnchor="middle"
            dominantBaseline="central"
            fill={foilFill}
            fontFamily={font}
            fontSize={size}
            fontWeight="bold"
            style={{
              filter: 'drop-shadow(2px 3px 4px rgba(0,0,0,0.35))'
            }}
          >
            {init1}
          </text>

          {/* Central Delicate Flourish / Ampersand */}
          {amp && (
            <text
              x="0"
              y="2"
              textAnchor="middle"
              dominantBaseline="central"
              fill={foilFill}
              fontFamily='"Great Vibes", cursive'
              fontSize={size * 0.55}
              opacity="0.9"
            >
              {amp}
            </text>
          )}

          {/* Second Initial (Positioned slightly to the right and lower, creating interlocking depth) */}
          <text
            x={offset + 6}
            y={8}
            textAnchor="middle"
            dominantBaseline="central"
            fill={foilFill}
            fontFamily={font}
            fontSize={size}
            fontWeight="bold"
            style={{
              filter: 'drop-shadow(1px 2px 5px rgba(0,0,0,0.4))'
            }}
          >
            {init2}
          </text>
        </g>
      )}

      {/* 3. LAYOUT: CLASSIC CENTERED */}
      {config.layout === 'classic' && (
        <g id="classic-monogram" filter={config.useHotFoil ? 'url(#foil-emboss-bevel)' : undefined}>
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="central"
            fill={foilFill}
            fontFamily={font}
            fontSize={size}
            fontWeight="bold"
            letterSpacing="6"
          >
            {`${init1} ${amp} ${init2}`}
          </text>
        </g>
      )}

      {/* 4. LAYOUT: ROYAL CREST WITH SHIELD */}
      {config.layout === 'crest' && (
        <g id="royal-crest" filter={config.useHotFoil ? 'url(#foil-emboss-bevel)' : undefined}>
          {/* Shield Outline */}
          <path
            d={`M 0,-${size} C ${size * 0.8},-${size} ${size * 0.8},0 0,${size * 0.9} C -${size * 0.8},0 -${size * 0.8},-${size} 0,-${size} Z`}
            fill="none"
            stroke={foilFill}
            strokeWidth="1.5"
            strokeDasharray="2, 2"
          />
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            dominantBaseline="central"
            fill={foilFill}
            fontFamily={font}
            fontSize={size * 0.9}
            fontWeight="bold"
          >
            {`${init1}${init2}`}
          </text>
        </g>
      )}

      {/* 5. LAYOUT: SHIELD */}
      {config.layout === 'shield' && (
        <g id="shield-layout" filter={config.useHotFoil ? 'url(#foil-emboss-bevel)' : undefined}>
          <polygon
            points={`0,-${size * 0.9} ${size * 0.8},-${size * 0.5} ${size * 0.6},${size * 0.8} 0,${size * 1.1} -${size * 0.6},${size * 0.8} -${size * 0.8},-${size * 0.5}`}
            fill="none"
            stroke={foilFill}
            strokeWidth="1.4"
          />
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="central"
            fill={foilFill}
            fontFamily={font}
            fontSize={size * 0.8}
            fontWeight="bold"
            letterSpacing="3"
          >
            {`${init1} ${amp} ${init2}`}
          </text>
        </g>
      )}
    </g>
  );
};
