import React from 'react';

interface BotanicalProps {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  opacity?: number;
  primaryColor?: string;
}

/**
 * 3D-Shaded Hand-Painted Watercolor Blush Rose
 * Features multi-layered petals, translucent overlap, and delicate petal veins
 */
export const WatercolorBlushRose: React.FC<BotanicalProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  opacity = 0.95,
  primaryColor = '#EAA5AF'
}) => {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}
      opacity={opacity}
      className="watercolor-blush-rose select-none"
    >
      {/* Outer Calyx Sepals (Soft Sage Green) */}
      <path d="M 0,0 C -35,-25 -60,-10 -75,20 C -50,15 -25,12 0,0 Z" fill="#6B8572" opacity="0.6" />
      <path d="M 0,0 C 35,-25 60,-10 75,20 C 50,15 25,12 0,0 Z" fill="#6B8572" opacity="0.6" />
      <path d="M 0,0 C -15,35 -10,65 5,80 C 5,50 3,25 0,0 Z" fill="#586E5E" opacity="0.55" />

      {/* Layer 1: Outer Petals (Softest Blush Pink Wash) */}
      <path
        d="M -50,-10 C -70,-45 -40,-75 0,-80 C 40,-75 70,-45 50,-10 C 65,30 35,65 0,70 C -35,65 -65,30 -50,-10 Z"
        fill="url(#watercolor-blush-rose)"
        opacity="0.85"
      />
      {/* Outer Petal Delicate Veins */}
      <path d="M 0,-75 C 5,-50 15,-25 0,0" stroke={primaryColor} strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M -45,-30 C -25,-20 -10,-10 0,0" stroke={primaryColor} strokeWidth="0.5" fill="none" opacity="0.35" />
      <path d="M 45,-30 C 25,-20 10,-10 0,0" stroke={primaryColor} strokeWidth="0.5" fill="none" opacity="0.35" />

      {/* Layer 2: Mid Petals (Contoured Depth) */}
      <path
        d="M -35,-5 C -55,-30 -25,-55 5,-60 C 35,-55 55,-30 35,-5 C 45,25 20,45 0,50 C -20,45 -45,25 -35,-5 Z"
        fill="url(#watercolor-blush-rose)"
        opacity="0.9"
        transform="rotate(35)"
      />

      {/* Layer 3: Inner Curled Petals */}
      <path
        d="M -25,0 C -40,-20 -15,-40 5,-42 C 25,-40 40,-20 25,0 C 30,20 15,32 0,35 C -15,32 -30,20 -25,0 Z"
        fill="url(#watercolor-blush-rose)"
        opacity="0.95"
        transform="rotate(-20)"
      />

      {/* Layer 4: Tight Center Rosebud Vortex */}
      <path
        d="M -12,-3 C -20,-15 -5,-25 3,-26 C 15,-25 20,-15 12,-3 C 15,10 5,18 0,20 C -5,18 -15,10 -12,-3 Z"
        fill={primaryColor}
        opacity="0.9"
      />
      <path
        d="M -4,-8 C 4,-18 12,-10 8,-2 C 5,4 -4,6 -4,-8 Z"
        fill="#FFFFFF"
        opacity="0.65"
      />
    </g>
  );
};

/**
 * 3D-Shaded Watercolor White Lily
 * Features hand-painted bezier petals, realistic stamens, and delicate green throat
 */
export const WatercolorWhiteLily: React.FC<BotanicalProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  opacity = 1
}) => {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}
      opacity={opacity}
      className="watercolor-white-lily select-none"
    >
      {/* 6 Majestic Flared Lily Petals */}
      {/* Top Petal */}
      <path
        d="M 0,0 C -20,-30 -35,-80 0,-130 C 35,-80 20,-30 0,0 Z"
        fill="url(#watercolor-lily-petal)"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
      />
      <path d="M 0,-10 C -2,-45 -4,-90 0,-125" stroke="#90A584" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Top Right Petal */}
      <path
        d="M 0,0 C 10,-35 45,-75 95,-85 C 80,-40 40,-15 0,0 Z"
        fill="url(#watercolor-lily-petal)"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
      />
      <path d="M 0,-5 C 25,-25 55,-50 90,-80" stroke="#90A584" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Bottom Right Petal */}
      <path
        d="M 0,0 C 25,-10 75,5 110,40 C 70,55 30,30 0,0 Z"
        fill="url(#watercolor-lily-petal)"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
      />

      {/* Bottom Petal */}
      <path
        d="M 0,0 C 20,25 30,70 0,115 C -30,70 -20,25 0,0 Z"
        fill="url(#watercolor-lily-petal)"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
      />

      {/* Bottom Left Petal */}
      <path
        d="M 0,0 C -30,30 -70,55 -110,40 C -75,5 -25,-10 0,0 Z"
        fill="url(#watercolor-lily-petal)"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
      />

      {/* Top Left Petal */}
      <path
        d="M 0,0 C -40,-15 -80,-40 -95,-85 C -45,-75 -10,-35 0,0 Z"
        fill="url(#watercolor-lily-petal)"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
      />
      <path d="M 0,-5 C -25,-25 -55,-50 -90,-80" stroke="#90A584" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Center Floral Throat (Soft Olive Wash) */}
      <circle cx="0" cy="0" r="14" fill="#889E78" opacity="0.75" />

      {/* Stamens with Pollen Anthers */}
      <g stroke="#566E46" strokeWidth="1.2" fill="none">
        <path d="M 0,0 Q 8,-25 18,-45" />
        <path d="M 0,0 Q -8,-25 -18,-45" />
        <path d="M 0,0 Q 20,-10 38,-15" />
        <path d="M 0,0 Q -20,-10 -38,-15" />
        <path d="M 0,0 Q 0,20 0,40" />
      </g>
      {/* Pollen Anthers (Golden Amber) */}
      <ellipse cx="18" cy="-45" rx="4" ry="2" fill="#D4AF37" transform="rotate(25 18 -45)" />
      <ellipse cx="-18" cy="-45" rx="4" ry="2" fill="#D4AF37" transform="rotate(-25 -18 -45)" />
      <ellipse cx="38" cy="-15" rx="4" ry="2" fill="#D4AF37" transform="rotate(75 38 -15)" />
      <ellipse cx="-38" cy="-15" rx="4" ry="2" fill="#D4AF37" transform="rotate(-75 -38 -15)" />
      <ellipse cx="0" cy="40" rx="4" ry="2" fill="#D4AF37" />
    </g>
  );
};

/**
 * Silver-Dollar Eucalyptus Garland Branch
 * Organic rounded leaves along a natural stem
 */
export const EucalyptusGarland: React.FC<BotanicalProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  opacity = 0.9
}) => {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}
      opacity={opacity}
      className="eucalyptus-garland select-none"
    >
      {/* Curved Stem */}
      <path
        d="M 0,160 Q 15,80 5,0 Q -5,-80 15,-160"
        stroke="#4E6157"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Leaf 1 (Top Left) */}
      <ellipse cx="-18" cy="-140" rx="22" ry="16" fill="url(#eucalyptus-leaf-grad)" transform="rotate(-30 -18 -140)" />
      <path d="M 5,-145 Q -10,-140 -25,-138" stroke="#3D4F46" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* Leaf 2 (Top Right) */}
      <ellipse cx="26" cy="-115" rx="24" ry="18" fill="url(#eucalyptus-leaf-grad)" transform="rotate(25 26 -115)" />
      <path d="M 8,-110 Q 20,-115 35,-118" stroke="#3D4F46" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* Leaf 3 (Mid Left) */}
      <ellipse cx="-28" cy="-60" rx="28" ry="20" fill="url(#eucalyptus-leaf-grad)" transform="rotate(-20 -28 -60)" />
      <path d="M 2,-62 Q -15,-60 -38,-58" stroke="#3D4F46" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* Leaf 4 (Mid Right) */}
      <ellipse cx="32" cy="-20" rx="26" ry="19" fill="url(#eucalyptus-leaf-grad)" transform="rotate(35 32 -20)" />

      {/* Leaf 5 (Lower Left) */}
      <ellipse cx="-26" cy="40" rx="26" ry="18" fill="url(#eucalyptus-leaf-grad)" transform="rotate(-25 -26 40)" />

      {/* Leaf 6 (Lower Right) */}
      <ellipse cx="28" cy="90" rx="25" ry="18" fill="url(#eucalyptus-leaf-grad)" transform="rotate(20 28 90)" />
    </g>
  );
};

/**
 * Hyper-Realistic 3D Poured Wax Seal SVG
 * Features organic poured rim with irregular ripples, dome specular highlight, and letterpress monogram
 */
export const HyperRealisticWaxSeal: React.FC<{
  x: number;
  y: number;
  radius?: number;
  initials?: string;
  sealColor?: string;
  foilEffect?: boolean;
}> = ({
  x,
  y,
  radius = 42,
  initials = 'S & K',
  sealColor = '#7E1524',
  foilEffect = false
}) => {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="hyper-realistic-wax-seal select-none"
      filter="url(#wax-seal-3d-shadow)"
    >
      {/* 1. Organic Poured Wax Irregular Base (Irregular ripples around edge) */}
      <path
        d={`
          M 0, -${radius + 4}
          C ${radius * 0.4}, -${radius + 7} ${radius * 0.8}, -${radius + 2} ${radius + 3}, -${radius * 0.4}
          C ${radius + 8}, -${radius * 0.1} ${radius + 6}, ${radius * 0.5} ${radius + 1}, ${radius * 0.8}
          C ${radius * 0.6}, ${radius + 6} ${radius * 0.2}, ${radius + 7} -${radius * 0.3}, ${radius + 5}
          C -${radius * 0.7}, ${radius + 4} -${radius + 5}, ${radius * 0.5} -${radius + 3}, -${radius * 0.1}
          C -${radius + 7}, -${radius * 0.5} -${radius * 0.6}, -${radius + 6} 0, -${radius + 4}
          Z
        `}
        fill={sealColor}
      />

      {/* 2. Realistic 3D Wax Dome Layer */}
      <circle cx="0" cy="0" r={radius} fill="url(#wax-seal-dome-gradient)" />

      {/* 3. Raised Inner Ring Stamp Ridge */}
      <circle
        cx="0"
        cy="0"
        r={radius * 0.76}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        opacity="0.32"
        filter="url(#foil-emboss-bevel)"
      />
      <circle
        cx="0"
        cy="0"
        r={radius * 0.74}
        fill="none"
        stroke="#000000"
        strokeWidth="1.2"
        opacity="0.45"
      />

      {/* 4. Specular Curved Light Reflection at Top-Left */}
      <path
        d={`M -${radius * 0.5}, -${radius * 0.5} Q 0, -${radius * 0.75} ${radius * 0.5}, -${radius * 0.5}`}
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />

      {/* 5. Debossed Seal Monogram in Center */}
      <text
        x="0"
        y="4"
        textAnchor="middle"
        dominantBaseline="central"
        fill={foilEffect ? 'url(#foil-mirror-gold-24k)' : '#F5D061'}
        fontSize={radius * 0.55}
        fontFamily='"Cinzel Decorative", "Playfair Display", serif'
        fontWeight="bold"
        letterSpacing="2"
        style={{
          filter: 'drop-shadow(0 -1px 1px rgba(255,255,255,0.4)) drop-shadow(0 1px 2px rgba(0,0,0,0.7))'
        }}
      >
        {initials}
      </text>
    </g>
  );
};

/**
 * Hyper-Realistic Silk Tassel SVG
 * Features hanging silk loop, metallic coil band, and flowing multi-strand individual threads
 */
export const HyperRealisticSilkTassel: React.FC<{
  x: number;
  y: number;
  length?: number;
  color?: string;
  metallicColor?: string;
}> = ({
  x,
  y,
  length = 130,
  color = '#8B1E3F',
  metallicColor = 'url(#foil-mirror-gold-24k)'
}) => {
  return (
    <g transform={`translate(${x}, ${y})`} className="hyper-realistic-silk-tassel select-none">
      {/* 1. Hanging Silk Loop at the Top */}
      <path
        d="M 0,-40 C -8,-25 -6,-8 0,0 C 6,-8 8,-25 0,-40 Z"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />

      {/* 2. Top Tassel Dome Bulb */}
      <ellipse cx="0" cy="8" rx="10" ry="8" fill={color} filter="drop-shadow(0 3px 5px rgba(0,0,0,0.35))" />
      <ellipse cx="-2" cy="6" rx="6" ry="4" fill="#FFFFFF" opacity="0.3" />

      {/* 3. Metallic Gold Binding Coil Band */}
      <rect x="-8" y="14" width="16" height="7" rx="2" fill={metallicColor} filter="url(#foil-emboss-bevel)" />

      {/* 4. Flowing Silk Threads (Multi-Strand Gradient Mesh) */}
      <g opacity="0.95">
        {/* Main Silk Body */}
        <path
          d={`M -7,21 L -16,${length} Q 0,${length + 6} 16,${length} L 7,21 Z`}
          fill={color}
          filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
        />
        {/* Individual Thread Highlight Strands */}
        <line x1="-12" y1={length - 2} x2="-5" y2="21" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.35" />
        <line x1="-6" y1={length} x2="-2" y2="21" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.45" />
        <line x1="0" y1={length + 2} x2="0" y2="21" stroke="#000000" strokeWidth="0.8" opacity="0.25" />
        <line x1="6" y1={length} x2="2" y2="21" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.45" />
        <line x1="12" y1={length - 2} x2="5" y2="21" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.35" />
      </g>
    </g>
  );
};
