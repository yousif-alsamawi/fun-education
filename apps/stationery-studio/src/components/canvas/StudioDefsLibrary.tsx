import React from 'react';
import { StudioState } from '../../types/studio';

interface StudioDefsLibraryProps {
  state: StudioState;
  ringTextArcPath?: string;
}

export const StudioDefsLibrary: React.FC<StudioDefsLibraryProps> = ({
  state,
  ringTextArcPath
}) => {
  const artworkCol = state.artworkColor || '#8B1E3F';
  const artworkGradEnd = state.artworkGradientEnd || artworkCol;
  const cardBase = state.cardBaseColor || '#FDFBF7';
  const elevation = state.lightingElevation || 60;

  return (
    <defs>
      {/* Card Silhouette Clip for Artwork Bleed */}
      <clipPath id="petal-card-clip">
        <path
          d={`
            M 300, 30
            C 370, 30 430, 45 490, 85
            C 545, 125 575, 195 570, 275
            C 565, 345 535, 400 550, 480
            C 565, 560 555, 640 500, 710
            C 455, 770 385, 810 300, 810
            C 215, 810 145, 770 100, 710
            C 45, 640 35, 560 50, 480
            C 65, 400 35, 345 30, 275
            C 25, 195 55, 125 110, 85
            C 170, 45 230, 30 300, 30
            Z
          `}
        />
      </clipPath>
      {/* ====================================================================
          1. PHYSICAL PAPER MICRO-TEXTURE & 3D LIGHTING ENGINE
          ==================================================================== */}
      {/* A. 350gsm Bridal Cold-Press Cotton Rag (Tactile fibrous surface) */}
      <filter
        id="paper-stock-cotton"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="5" result="cottonNoise" />
        <feDiffuseLighting in="cottonNoise" lightingColor="#FFFFFF" surfaceScale="2" result="cottonLight">
          <feDistantLight azimuth="45" elevation={elevation || 55} />
        </feDiffuseLighting>
        <feBlend mode="multiply" in="SourceGraphic" in2="cottonLight" result="cottonComposite" />
      </filter>

      {/* A2. Pearl Glossy Bridal Stock (ورق قلوسي لامع للدعوات مع لميع قطري عاكس) */}
      <filter
        id="paper-stock-pearl-glossy"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="glossyNoise" />
        <feSpecularLighting
          in="glossyNoise"
          surfaceScale="3"
          specularConstant="1.6"
          specularExponent="45"
          lightingColor="#FFFFFF"
          result="glossySpecular"
        >
          <feDistantLight azimuth="135" elevation="65" />
        </feSpecularLighting>
        <feComposite in="SourceGraphic" in2="glossySpecular" operator="arithmetic" k1="0" k2="1" k3="0.45" k4="0" />
      </filter>

      {/* B. Linen Weave Paper (Crossed textile threads) */}
      <filter
        id="paper-stock-linen"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence type="fractalNoise" baseFrequency="0.09 0.02" numOctaves="3" result="linenH" />
        <feTurbulence type="fractalNoise" baseFrequency="0.02 0.09" numOctaves="3" result="linenV" />
        <feComposite in="linenH" in2="linenV" operator="arithmetic" k2="0.5" k3="0.5" result="linenMesh" />
        <feDiffuseLighting in="linenMesh" lightingColor="#FFFFFF" surfaceScale="1.4" result="linenLight">
          <feDistantLight azimuth="50" elevation={elevation} />
        </feDiffuseLighting>
        <feBlend mode="multiply" in="SourceGraphic" in2="linenLight" />
      </filter>

      {/* C. Shimmering Pearl Stardream (Reflective micro-sheen) */}
      <filter
        id="paper-stock-pearl"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="2" result="pearlNoise" />
        <feSpecularLighting
          in="pearlNoise"
          surfaceScale="1.2"
          specularConstant="0.65"
          specularExponent="35"
          lightingColor="#FFFDF0"
          result="pearlSpecular"
        >
          <feDistantLight azimuth="45" elevation={elevation} />
        </feSpecularLighting>
        <feComposite in="SourceGraphic" in2="pearlSpecular" operator="arithmetic" k1="0" k2="1" k3="0.35" k4="0" />
      </filter>

      {/* D. Rustic Kraft Cardstock (Coarse natural fibers) */}
      <filter
        id="paper-stock-kraft"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="kraftNoise" />
        <feDiffuseLighting in="kraftNoise" lightingColor="#F5D7B0" surfaceScale="2.2" result="kraftLight">
          <feDistantLight azimuth="45" elevation={elevation} />
        </feDiffuseLighting>
        <feBlend mode="multiply" in="SourceGraphic" in2="kraftLight" />
      </filter>

      {/* E. Translucent Vellum / Frosted Sheen */}
      <filter
        id="paper-stock-vellum"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" result="vellumNoise" />
        <feDiffuseLighting in="vellumNoise" lightingColor="#FFFFFF" surfaceScale="0.8" result="vellumLight">
          <feDistantLight azimuth="45" elevation={elevation} />
        </feDiffuseLighting>
        <feBlend mode="screen" in="SourceGraphic" in2="vellumLight" opacity="0.6" />
      </filter>

      {/* F. Silk Matte Finish (Ultra-fine smooth texture) */}
      <filter
        id="paper-stock-matte"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence type="fractalNoise" baseFrequency="0.18" numOctaves="1" result="matteNoise" />
        <feDiffuseLighting in="matteNoise" lightingColor="#FFFFFF" surfaceScale="0.6" result="matteLight">
          <feDistantLight azimuth="45" elevation={elevation} />
        </feDiffuseLighting>
        <feBlend mode="multiply" in="SourceGraphic" in2="matteLight" />
      </filter>

      {/* D. Blind Letterpress & Embossing (Deep pressed relief filter) */}
      <filter id="letterpress-emboss" x="-20%" y="-20%" width="140%" height="140%">
        {/* Deep pressed shadow inside top-left */}
        <feOffset dx="-1" dy="-1.2" in="SourceAlpha" result="offset-tl" />
        <feGaussianBlur stdDeviation="1" in="offset-tl" result="blur-tl" />
        {/* Soft highlight reflection on bottom-right edge */}
        <feOffset dx="1" dy="1.2" in="SourceAlpha" result="offset-br" />
        <feGaussianBlur stdDeviation="1" in="offset-br" result="blur-br" />
        <feComposite in="blur-tl" in2="SourceAlpha" operator="out" result="inner-shadow" />
        <feFlood floodColor="#000000" floodOpacity="0.45" result="shadow-color" />
        <feComposite in="shadow-color" in2="inner-shadow" operator="in" result="colored-shadow" />
        <feMerge>
          <feMergeNode in="colored-shadow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* E. Multi-Layer Studio Ambient Occlusion Drop Shadows */}
      <filter id="studio-ambient-shadow" x="-35%" y="-35%" width="170%" height="170%">
        {/* Layer 1: Soft broad diffuse ambient occlusion (Floor bounce shadow) */}
        <feDropShadow dx="0" dy="32" stdDeviation="36" floodColor="#060508" floodOpacity="0.45" />
        {/* Layer 2: Mid-level soft directional sunlight shadow */}
        <feDropShadow dx="8" dy="16" stdDeviation="18" floodColor="#0A0812" floodOpacity="0.28" />
        {/* Layer 3: Crisp sharp contact edge shadow */}
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.35" />
        {/* Layer 4: Luxury paper edge bevel highlight */}
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#FFFFFF" floodOpacity="0.15" />
      </filter>

      {/* Photorealistic Master Studio Shadow (For Mockup Mode) */}
      <filter id="photorealistic-mockup-shadow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="6" dy="28" stdDeviation="30" floodColor="#050308" floodOpacity="0.42" />
        <feDropShadow dx="2" dy="10" stdDeviation="12" floodColor="#0D0914" floodOpacity="0.25" />
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
      </filter>

      {/* Realistic Natural Sunlight & Botanical Window Shadow Filter */}
      <filter id="natural-window-light" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.004" numOctaves="3" result="sunlightNoise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" in="sunlightNoise" result="lightSoft" />
        <feBlend mode="overlay" in="SourceGraphic" in2="lightSoft" />
      </filter>

      <filter id="card-drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="20" stdDeviation="24" floodColor="#0D0A10" floodOpacity="0.28" />
        <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor={artworkCol} floodOpacity="0.15" />
      </filter>

      {/* Glossy Card Crisp Ambient Drop-Shadow */}
      <filter id="glossy-card-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#0A0910" floodOpacity="0.38" />
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={artworkCol} floodOpacity="0.2" />
      </filter>

      <filter id="ring-drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#0D0A10" floodOpacity="0.35" />
      </filter>

      <filter id="wax-seal-3d-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#14080B" floodOpacity="0.45" />
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
      </filter>

      {/* ====================================================================
          2. 7-STOP SPECULAR HOT-FOIL STAMPING GRADIENTS & BEVEL
          ==================================================================== */}
      {/* A. 24K Mirror Gold Foil (7-Stop Hyper-Realistic Metallic Shimmer) */}
      <linearGradient id="foil-mirror-gold-24k" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BF953F" />
        <stop offset="18%" stopColor="#FCF6BA" />
        <stop offset="36%" stopColor="#B38728" />
        <stop offset="54%" stopColor="#FBF5B7" />
        <stop offset="72%" stopColor="#AA771C" />
        <stop offset="88%" stopColor="#DFC066" />
        <stop offset="100%" stopColor="#8C5A14" />
      </linearGradient>

      {/* B. Brushed Rose Gold Foil */}
      <linearGradient id="foil-rose-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B76E79" />
        <stop offset="20%" stopColor="#F7D1D7" />
        <stop offset="40%" stopColor="#9E5863" />
        <stop offset="60%" stopColor="#FADCE1" />
        <stop offset="75%" stopColor="#84434D" />
        <stop offset="90%" stopColor="#F2BAC2" />
        <stop offset="100%" stopColor="#6B323B" />
      </linearGradient>

      {/* C. Platinum Silver Foil */}
      <linearGradient id="foil-platinum-silver" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8E9BAE" />
        <stop offset="20%" stopColor="#F5F7FA" />
        <stop offset="40%" stopColor="#68768A" />
        <stop offset="60%" stopColor="#FFFFFF" />
        <stop offset="75%" stopColor="#A1ACB9" />
        <stop offset="90%" stopColor="#D8DFE8" />
        <stop offset="100%" stopColor="#525F70" />
      </linearGradient>

      {/* D. Antique Copper Foil */}
      <linearGradient id="foil-antique-copper" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#783F19" />
        <stop offset="18%" stopColor="#E3A87B" />
        <stop offset="38%" stopColor="#592B0D" />
        <stop offset="58%" stopColor="#C88A5B" />
        <stop offset="75%" stopColor="#421E08" />
        <stop offset="90%" stopColor="#F0BD97" />
        <stop offset="100%" stopColor="#633112" />
      </linearGradient>

      {/* E. 1px Hot-Foil Bevel Filter (Simulating physical press indentation) */}
      <filter id="foil-emboss-bevel" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.45" />
        <feDropShadow dx="-0.5" dy="-0.5" stdDeviation="0.4" floodColor="#FFFFFF" floodOpacity="0.4" />
      </filter>

      {/* ====================================================================
          3. DYNAMIC ARTWORK GRADIENTS & WATERCOLOR SHADERS
          ==================================================================== */}
      <linearGradient id="dynamic-artwork-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={artworkCol} stopOpacity="0.95" />
        <stop offset="100%" stopColor={artworkGradEnd} stopOpacity="0.85" />
      </linearGradient>

      {/* Radial soft glow for artwork */}
      <radialGradient id="botanical-radial-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={artworkCol} stopOpacity="0.18" />
        <stop offset="60%" stopColor={artworkGradEnd} stopOpacity="0.08" />
        <stop offset="100%" stopColor={cardBase} stopOpacity="0" />
      </radialGradient>

      {/* Watercolor White Lily Petal Shader */}
      <linearGradient id="watercolor-lily-petal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
        <stop offset="65%" stopColor="#FAF7F2" stopOpacity="0.95" />
        <stop offset="90%" stopColor="#E5E0D5" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#A8B998" stopOpacity="0.85" />
      </linearGradient>

      {/* Watercolor Blush Rose Shader */}
      <radialGradient id="watercolor-blush-rose" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="45%" stopColor="#F9E2E5" stopOpacity="0.9" />
        <stop offset="80%" stopColor="#EAA5AF" stopOpacity="0.85" />
        <stop offset="100%" stopColor={artworkCol} stopOpacity="0.75" />
      </radialGradient>

      {/* Silver-Dollar Eucalyptus Leaf Shader */}
      <linearGradient id="eucalyptus-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8DA399" />
        <stop offset="50%" stopColor="#6C8379" />
        <stop offset="100%" stopColor="#4A6056" />
      </linearGradient>

      {/* Realistic 3D Wax Seal Dome Gradient */}
      <radialGradient id="wax-seal-dome-gradient" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#B32438" />
        <stop offset="45%" stopColor="#7E1524" />
        <stop offset="85%" stopColor="#4A0A14" />
        <stop offset="100%" stopColor="#250409" />
      </radialGradient>

      {/* Physical Paper Texture Pattern (Micro-grain overlay) */}
      <pattern id="paper-texture-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="transparent" />
        <circle cx="20" cy="20" r="0.8" fill="#5F4412" opacity="0.04" />
        <circle cx="70" cy="40" r="0.6" fill="#5F4412" opacity="0.05" />
        <circle cx="40" cy="80" r="0.7" fill="#5F4412" opacity="0.03" />
        <circle cx="85" cy="85" r="0.8" fill="#5F4412" opacity="0.04" />
        <path d="M 10,50 Q 30,52 50,49 T 90,51" stroke="#5F4412" strokeWidth="0.4" fill="none" opacity="0.02" />
      </pattern>

      {/* SVG TextPath Definition for Circular Ring Date if present */}
      {ringTextArcPath && (
        <path id="ring-curved-text-path" d={ringTextArcPath} fill="none" />
      )}
    </defs>
  );
};
