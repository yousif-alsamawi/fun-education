import React from 'react';
import { ArtworkPatternStyle, MasterTemplateId } from '../../types/studio';
import {
  WatercolorBlushRose,
  WatercolorWhiteLily,
  EucalyptusGarland
} from './BotanicalArtLibrary';

interface ArtworkPatternsProps {
  patternStyle: ArtworkPatternStyle;
  artworkColor: string;
  artworkGradientEnd?: string;
  accentColor: string;
  templateId: MasterTemplateId;
}

export const ArtworkPatterns: React.FC<ArtworkPatternsProps> = ({
  patternStyle,
  artworkColor,
  artworkGradientEnd,
  accentColor,
  templateId
}) => {
  return (
    <g id="artwork-pattern-layer" className="transition-all duration-300">
      {/* 
        ========================================================================
        PATTERN 1: عروق الورد المتفرعة مع وردة مائية بلش (Flowing Petal Veins & Blush Rose)
        ========================================================================
      */}
      {patternStyle === 'petal-veins' && (
        <g id="pattern-petal-veins" opacity="0.9">
          {/* Main central organic spine */}
          <path
            d="M 300, 810 Q 300, 520 300, 70"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Left Fan Branches */}
          <path
            d="M 300, 760 Q 220, 620 110, 480 Q 55, 390 40, 290"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1.8"
            fill="none"
          />
          <path
            d="M 300, 680 Q 200, 520 130, 360 Q 90, 270 120, 150"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M 300, 560 Q 210, 430 180, 270 Q 165, 170 210, 90"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Feathers */}
          <path d="M 230, 640 Q 180, 600 130, 640" stroke="url(#dynamic-artwork-gradient)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M 180, 530 Q 130, 480 80, 510" stroke="url(#dynamic-artwork-gradient)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M 160, 410 Q 100, 380 60, 420" stroke="url(#dynamic-artwork-gradient)" strokeWidth="0.8" fill="none" opacity="0.6" />

          {/* Right Fan Branches */}
          <path
            d="M 300, 760 Q 380, 620 490, 480 Q 545, 390 560, 290"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1.8"
            fill="none"
          />
          <path
            d="M 300, 680 Q 400, 520 470, 360 Q 510, 270 480, 150"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M 300, 560 Q 390, 430 420, 270 Q 435, 170 390, 90"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1.2"
            fill="none"
          />
          <path d="M 370, 640 Q 420, 600 470, 640" stroke="url(#dynamic-artwork-gradient)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M 420, 530 Q 470, 480 520, 510" stroke="url(#dynamic-artwork-gradient)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M 440, 410 Q 500, 380 540, 420" stroke="url(#dynamic-artwork-gradient)" strokeWidth="0.8" fill="none" opacity="0.6" />

          {/* High-Density 3D Watercolor Blush Rose Accent at Top-Center */}
          <WatercolorBlushRose x={300} y={115} scale={0.45} primaryColor={artworkColor} opacity={0.88} />
        </g>
      )}

      {/* 
        ========================================================================
        PATTERN 2: إطار فيكتوري كلاسيكي (Ornate Vintage Baroque Frame)
        ========================================================================
      */}
      {patternStyle === 'vintage-baroque' && (
        <g id="pattern-vintage-baroque" opacity="0.85">
          {/* Ornate corner acanthus flourishes */}
          <g stroke="url(#dynamic-artwork-gradient)" fill="none" strokeWidth="1.2">
            {/* Top Left Flourish */}
            <path d="M 120, 120 C 140, 80 180, 70 230, 80 C 190, 100 170, 140 180, 180 C 150, 160 130, 140 120, 120 Z" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.08" />
            <path d="M 140, 140 Q 180, 110 210, 130 T 230, 160" />

            {/* Top Right Flourish */}
            <path d="M 480, 120 C 460, 80 420, 70 370, 80 C 410, 100 430, 140 420, 180 C 450, 160 470, 140 480, 120 Z" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.08" />
            <path d="M 460, 140 Q 420, 110 390, 130 T 370, 160" />

            {/* Bottom Left Flourish */}
            <path d="M 120, 700 C 140, 740 180, 750 230, 740 C 190, 720 170, 680 180, 640 C 150, 660 130, 680 120, 700 Z" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.08" />
            <path d="M 140, 680 Q 180, 710 210, 690 T 230, 660" />

            {/* Bottom Right Flourish */}
            <path d="M 480, 700 C 460, 740 420, 750 370, 740 C 410, 720 430, 680 420, 640 C 450, 660 470, 680 480, 700 Z" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.08" />
            <path d="M 460, 680 Q 420, 710 390, 690 T 370, 660" />
          </g>

          {/* Central Baroque Crown Pediment */}
          <g transform="translate(300, 95)" stroke="url(#dynamic-artwork-gradient)" fill="none" strokeWidth="1.2">
            <path d="M -80, 10 Q -40, -15 0, 5 Q 40, -15 80, 10" />
            <path d="M -50, 5 Q 0, -25 50, 5" strokeWidth="0.8" />
            <circle cx="0" cy="-15" r="3.5" fill={accentColor} />
            <circle cx="-40" cy="-5" r="2" fill={accentColor} />
            <circle cx="40" cy="-5" r="2" fill={accentColor} />
          </g>

          {/* Side Border Ribbons */}
          <g stroke="url(#dynamic-artwork-gradient)" fill="none" strokeWidth="0.7" opacity="0.6">
            <line x1="140" y1="200" x2="140" y2="620" strokeDasharray="6, 4" />
            <line x1="460" y1="200" x2="460" y2="620" strokeDasharray="6, 4" />
          </g>
        </g>
      )}

      {/* 
        ========================================================================
        PATTERN 3: زخرفة هندسية أندلسية (Islamic/Moroccan Geometric Lines)
        ========================================================================
      */}
      {patternStyle === 'moroccan-geometric' && (
        <g id="pattern-moroccan-geometric" opacity="0.85">
          <g stroke="url(#dynamic-artwork-gradient)" fill="none" strokeWidth="1">
            {/* Top Star Emblem */}
            <g transform="translate(300, 100)">
              <rect x="-24" y="-24" width="48" height="48" rx="2" transform="rotate(0)" />
              <rect x="-24" y="-24" width="48" height="48" rx="2" transform="rotate(45)" stroke={accentColor} strokeWidth="1.2" />
              <circle cx="0" cy="0" r="14" strokeWidth="0.7" />
              <circle cx="0" cy="0" r="3" fill={accentColor} />
            </g>

            {/* Bottom Star Emblem */}
            <g transform="translate(300, 720)">
              <rect x="-20" y="-20" width="40" height="40" rx="2" transform="rotate(0)" />
              <rect x="-20" y="-20" width="40" height="40" rx="2" transform="rotate(45)" stroke={accentColor} />
              <circle cx="0" cy="0" r="10" strokeWidth="0.6" />
            </g>

            {/* Interlacing Islamic Geometric Diamond Grid */}
            <g opacity="0.4" strokeWidth="0.6">
              <path d="M 200, 250 L 300, 200 L 400, 250 L 300, 300 Z" />
              <path d="M 150, 350 L 250, 300 L 350, 350 L 250, 400 Z" />
              <path d="M 250, 350 L 350, 300 L 450, 350 L 350, 400 Z" />
              <path d="M 200, 450 L 300, 400 L 400, 450 L 300, 500 Z" />
              <path d="M 200, 550 L 300, 500 L 400, 550 L 300, 600 Z" />
              <path d="M 200, 650 L 300, 600 L 400, 650 L 300, 700 Z" />
            </g>
          </g>
        </g>
      )}

      {/* 
        ========================================================================
        PATTERN 4: أغصان الزيتون وزهرة الزنبق ثلاثية الأبعاد (3D Lily & Olive Wreaths)
        ========================================================================
      */}
      {patternStyle === 'olive-lily-branches' && (
        <g id="pattern-olive-lily" opacity="0.9">
          {/* Left Olive Branch Wreath */}
          <g stroke="url(#dynamic-artwork-gradient)" fill="none" strokeWidth="1.2">
            <path d="M 110, 650 C 90, 500 100, 350 140, 200" />
            <ellipse cx="98" cy="560" rx="14" ry="6" transform="rotate(-30, 98, 560)" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.12" />
            <ellipse cx="118" cy="500" rx="15" ry="6" transform="rotate(20, 118, 500)" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.12" />
            <ellipse cx="92" cy="430" rx="16" ry="6" transform="rotate(-35, 92, 430)" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.12" />
            <ellipse cx="114" cy="360" rx="15" ry="6" transform="rotate(25, 114, 360)" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.12" />
            <circle cx="105" cy="520" r="3.5" fill={accentColor} />
            <circle cx="102" cy="390" r="3.5" fill={accentColor} />

            {/* Right Olive Branch Wreath */}
            <path d="M 490, 650 C 510, 500 500, 350 460, 200" />
            <ellipse cx="502" cy="560" rx="14" ry="6" transform="rotate(30, 502, 560)" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.12" />
            <ellipse cx="482" cy="500" rx="15" ry="6" transform="rotate(-20, 482, 500)" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.12" />
            <ellipse cx="508" cy="430" rx="16" ry="6" transform="rotate(35, 508, 430)" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.12" />
            <ellipse cx="486" cy="360" rx="15" ry="6" transform="rotate(-25, 486, 360)" fill="url(#dynamic-artwork-gradient)" fillOpacity="0.12" />
            <circle cx="495" cy="520" r="3.5" fill={accentColor} />
            <circle cx="498" cy="390" r="3.5" fill={accentColor} />
          </g>

          {/* High-Precision 3D Watercolor White Lily Blossom at Top-Center */}
          <WatercolorWhiteLily x={300} y={110} scale={0.42} opacity={0.95} />
        </g>
      )}

      {/* 
        ========================================================================
        PATTERN 5: أغصان الكينا والأوكالبتوس (Eucalyptus Terrarium Garlands)
        ========================================================================
      */}
      {patternStyle === 'eucalyptus-terrarium' && (
        <g id="pattern-eucalyptus" opacity="0.9">
          {/* Left Eucalyptus Garland */}
          <EucalyptusGarland x={120} y={420} scale={0.7} rotation={12} opacity={0.85} />
          {/* Right Eucalyptus Garland */}
          <EucalyptusGarland x={480} y={420} scale={0.7} rotation={-12} opacity={0.85} />
        </g>
      )}
    </g>
  );
};

