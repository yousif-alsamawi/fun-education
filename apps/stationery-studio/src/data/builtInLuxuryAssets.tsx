import React from 'react';
import { StudioState, ImagePlacementMode, WaxSealStyle, RibbonColor, WeddingDingbatId } from '../types/studio';

/* ═══════════════════════════════════════════════════════════════════
   TAB A: 6+ Ready-to-Click Luxury Botanical Presets
   ═══════════════════════════════════════════════════════════════════ */
export interface BuiltInFloralPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'watercolor' | 'botanical' | 'gold-leaf' | 'meadow';
  thumbGradient: string;
  primaryColor: string;
  description: string;
  renderSvg: (placementMode: ImagePlacementMode, state: StudioState) => React.ReactNode;
}

export const BUILTIN_FLORAL_PRESETS: BuiltInFloralPreset[] = [
  // 1. شلال الجوري العنابي العمودي (Crimson Rose Cascade)
  {
    id: 'crimson-rose-cascade',
    nameAr: 'شلال الجوري العنابي الملكي',
    nameEn: 'Crimson Rose Cascade',
    category: 'watercolor',
    thumbGradient: 'from-[#58111A] via-[#8B1E3F] to-[#E9CCD2]',
    primaryColor: '#791E34',
    description: 'شلال متدرج من بتلات الجوري العنابي المخملي الغني مع لمسات أوراق الزيتون الداكنة.',
    renderSvg: (placement, state) => {
      const col = state.artworkColor || '#8B1E3F';
      const gradEnd = state.artworkGradientEnd || '#58111A';

      // Multi-petal rose blossom unit
      const RoseBlossom = ({ cx, cy, scale = 1, rot = 0 }: { cx: number; cy: number; scale?: number; rot?: number }) => (
        <g transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`}>
          {/* Outer dark wine petals */}
          <path d="M 0,-28 C 18,-28 32,-14 32,4 C 32,22 14,32 0,32 C -14,32 -32,22 -32,4 C -32,-14 -18,-28 0,-28 Z" fill={gradEnd} fillOpacity="0.85" />
          {/* Middle crimson petals */}
          <path d="M -18,-18 C -6,-28 18,-24 24,-10 C 30,4 18,22 4,24 C -10,26 -24,14 -24,-2 Z" fill={col} fillOpacity="0.95" />
          <path d="M 16,-16 C 26,-4 22,16 8,20 C -6,24 -20,12 -20,-4 C -20,-20 -2,-26 16,-16 Z" fill="#9B2242" />
          {/* Inner tight rose swirl */}
          <path d="M -8,-6 C -2,-14 12,-12 14,-2 C 16,8 6,14 -4,12 C -12,10 -12,2 -8,-6 Z" fill="#58111A" />
          <path d="M 0,-2 C 4,-6 8,0 4,4 C 0,8 -6,4 -4,0 Z" fill="#D4AF37" fillOpacity="0.9" />
          {/* Olive & Gold Leaf accents */}
          <path d="M 28,-18 Q 48,-24 44,-6 Q 32,2 26,-6 Z" fill="#3D4E2D" opacity="0.8" />
          <path d="M -26,16 Q -46,24 -42,6 Q -30,-2 -24,6 Z" fill="#2E3C22" opacity="0.8" />
          <path d="M 12,26 Q 22,44 6,42 Q -2,32 4,24 Z" fill="#D4AF37" opacity="0.6" />
        </g>
      );

      if (placement === 'right-edge') {
        return (
          <g id="floral-crimson-right-edge">
            <RoseBlossom cx={530} cy={160} scale={1.1} rot={15} />
            <RoseBlossom cx={545} cy={290} scale={0.9} rot={-25} />
            <RoseBlossom cx={525} cy={430} scale={1.2} rot={40} />
            <RoseBlossom cx={540} cy={570} scale={0.95} rot={-10} />
            <RoseBlossom cx={520} cy={700} scale={1.05} rot={30} />
          </g>
        );
      }

      if (placement === 'top-bottom') {
        return (
          <g id="floral-crimson-top-bottom">
            {/* Top Crown */}
            <RoseBlossom cx={300} cy={80} scale={1.15} rot={0} />
            <RoseBlossom cx={210} cy={95} scale={0.85} rot={-30} />
            <RoseBlossom cx={390} cy={95} scale={0.85} rot={30} />
            {/* Bottom Footer */}
            <RoseBlossom cx={300} cy={780} scale={1.1} rot={180} />
            <RoseBlossom cx={215} cy={765} scale={0.8} rot={150} />
            <RoseBlossom cx={385} cy={765} scale={0.8} rot={-150} />
          </g>
        );
      }

      if (placement === '4-corners' || placement === 'diagonal-corners') {
        return (
          <g id="floral-crimson-corners">
            {/* Top-Right */}
            <RoseBlossom cx={520} cy={95} scale={1.1} rot={25} />
            {/* Bottom-Left */}
            <RoseBlossom cx={80} cy={765} scale={1.1} rot={-155} />
            {placement === '4-corners' && (
              <>
                {/* Top-Left */}
                <RoseBlossom cx={80} cy={95} scale={1.0} rot={-25} />
                {/* Bottom-Right */}
                <RoseBlossom cx={520} cy={765} scale={1.0} rot={155} />
              </>
            )}
          </g>
        );
      }

      // Default: 4-Edges Border Frame
      return (
        <g id="floral-crimson-4edges">
          {/* Top Border */}
          <RoseBlossom cx={180} cy={65} scale={0.8} rot={-15} />
          <RoseBlossom cx={300} cy={60} scale={1.05} rot={0} />
          <RoseBlossom cx={420} cy={65} scale={0.8} rot={15} />
          {/* Bottom Border */}
          <RoseBlossom cx={180} cy={795} scale={0.8} rot={-165} />
          <RoseBlossom cx={300} cy={800} scale={1.05} rot={180} />
          <RoseBlossom cx={420} cy={795} scale={0.8} rot={165} />
          {/* Right Border */}
          <RoseBlossom cx={545} cy={280} scale={0.85} rot={45} />
          <RoseBlossom cx={550} cy={430} scale={0.95} rot={-30} />
          <RoseBlossom cx={545} cy={580} scale={0.85} rot={20} />
          {/* Left Border */}
          <RoseBlossom cx={55} cy={280} scale={0.85} rot={-45} />
          <RoseBlossom cx={50} cy={430} scale={0.95} rot={30} />
          <RoseBlossom cx={55} cy={580} scale={0.85} rot={-20} />
        </g>
      );
    }
  },

  // 2. أغصان الأوكالبتوس والزهور البرية (Eucalyptus & Botanical Meadow)
  {
    id: 'eucalyptus-meadow',
    nameAr: 'أغصان الأوكالبتوس والزهور البرية',
    nameEn: 'Eucalyptus & Botanical Meadow',
    category: 'botanical',
    thumbGradient: 'from-[#2D4530] via-[#5A7A5E] to-[#DCE6DA]',
    primaryColor: '#4A6B4F',
    description: 'أوراق أوكالبتوس فضية مائية مع زهور برية قطنية تعطي دفئاً طبيعياً ريفياً فاخراً.',
    renderSvg: (placement, state) => {
      const leafCol = state.artworkColor || '#4A6B4F';

      const EucalyptusBranch = ({ x, y, rot = 0, scale = 1 }: { x: number; y: number; rot?: number; scale?: number }) => (
        <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}>
          <path d="M 0,0 Q 40,-30 90,-40" fill="none" stroke="#2B3D2E" strokeWidth="1.5" />
          <ellipse cx="25" cy="-15" rx="14" ry="9" transform="rotate(-20 25 -15)" fill={leafCol} fillOpacity="0.75" />
          <ellipse cx="50" cy="-28" rx="16" ry="10" transform="rotate(-10 50 -28)" fill={leafCol} fillOpacity="0.85" />
          <ellipse cx="78" cy="-36" rx="13" ry="8" transform="rotate(5 78 -36)" fill={leafCol} fillOpacity="0.9" />
          <ellipse cx="92" cy="-40" rx="9" ry="6" fill="#8FA893" />
          {/* Baby's breath little white dots */}
          <circle cx="35" cy="-2" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="65" cy="-12" r="3.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="85" cy="-20" r="2.5" fill="#FAF6ED" opacity="0.9" />
        </g>
      );

      return (
        <g id="floral-eucalyptus-meadow">
          {/* Symmetrical Top Cascade */}
          <EucalyptusBranch x={300} y={70} rot={-15} scale={1.1} />
          <EucalyptusBranch x={300} y={70} rot={195} scale={1.1} />
          {/* Side accents */}
          <EucalyptusBranch x={540} y={320} rot={85} scale={0.9} />
          <EucalyptusBranch x={540} y={540} rot={95} scale={0.9} />
          <EucalyptusBranch x={60} y={320} rot={-85} scale={0.9} />
          <EucalyptusBranch x={60} y={540} rot={-95} scale={0.9} />
          {/* Bottom Cascade */}
          <EucalyptusBranch x={300} y={790} rot={165} scale={1.05} />
          <EucalyptusBranch x={300} y={790} rot={15} scale={1.05} />
        </g>
      );
    }
  },

  // 3. تاج الورد الملكي والسنابل (Burgundy Peony Crown & Wheat Sprigs)
  {
    id: 'peony-crown-wheat',
    nameAr: 'تاج الورد الملكي والسنابل المذهبة',
    nameEn: 'Burgundy Peony Crown & Wheat Sprigs',
    category: 'gold-leaf',
    thumbGradient: 'from-[#8B1E3F] via-[#D4AF37] to-[#FAF8F5]',
    primaryColor: '#8B1E3F',
    description: 'تاج مهيب من زهور البيوني الملكي في أعلى الكرت محاط بسنابل قمح ذهبية عيار 24K.',
    renderSvg: (_placement, state) => {
      const gold = '#D4AF37';
      const wine = state.artworkColor || '#791E34';

      return (
        <g id="floral-peony-crown-wheat">
          {/* Golden Wheat Stalks radiating */}
          <g stroke={gold} strokeWidth="1.2" opacity="0.85">
            <path d="M 300,110 Q 220,70 140,90" fill="none" />
            <path d="M 300,110 Q 380,70 460,90" fill="none" />
            {/* Wheat grains */}
            {[-60, -40, -20, 0, 20, 40, 60].map((offset, i) => (
              <ellipse
                key={`wheat-${i}`}
                cx={300 + offset * 2.2}
                cy={80 - Math.abs(offset) * 0.15}
                rx="6"
                ry="3"
                transform={`rotate(${offset * 0.7} ${300 + offset * 2.2} 80)`}
                fill={gold}
              />
            ))}
          </g>

          {/* Central Layered Peony Blossom */}
          <g transform="translate(300, 85)">
            <ellipse cx="0" cy="0" rx="36" ry="24" fill={wine} opacity="0.9" />
            <ellipse cx="-12" cy="-4" rx="22" ry="16" fill="#A82846" opacity="0.95" />
            <ellipse cx="12" cy="-4" rx="22" ry="16" fill="#A82846" opacity="0.95" />
            <circle cx="0" cy="2" r="14" fill="#58111A" />
            <circle cx="0" cy="2" r="6" fill={gold} />
          </g>
        </g>
      );
    }
  },

  // 4. زهور الزنبق الأبيض والذهب (White Royal Lilies & Gold Leaves)
  {
    id: 'white-lilies-gold',
    nameAr: 'زهور الزنبق الأبيض وأوراق الذهب',
    nameEn: 'White Royal Lilies & Gold Leaves',
    category: 'watercolor',
    thumbGradient: 'from-[#FAF8F5] via-[#EAEBE6] to-[#D4AF37]',
    primaryColor: '#D4AF37',
    description: 'بتلات زنبق ملكي بيضاء ناصعة مع تفاصيل مذهبة دقيقة ترمز للسمو والأناقة.',
    renderSvg: () => {
      const LilyFlower = ({ x, y, rot = 0, scale = 1 }: { x: number; y: number; rot?: number; scale?: number }) => (
        <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}>
          {/* White curved pointed petals */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={`petal-${deg}`}
              d="M 0,0 C 8,-20 12,-38 0,-50 C -12,-38 -8,-20 0,0 Z"
              fill="#FFFFFF"
              stroke="#E8E2D2"
              strokeWidth="0.8"
              transform={`rotate(${deg})`}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
            />
          ))}
          {/* Gold pistil & stamens */}
          <circle cx="0" cy="0" r="4" fill="#D4AF37" />
          {[30, 90, 150, 210, 270, 330].map((deg) => (
            <line
              key={`stamen-${deg}`}
              x1="0"
              y1="0"
              x2="0"
              y2="-22"
              stroke="#D4AF37"
              strokeWidth="1.2"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      );

      return (
        <g id="floral-white-lilies">
          <LilyFlower x={110} y={110} scale={0.7} rot={-20} />
          <LilyFlower x={490} y={110} scale={0.7} rot={20} />
          <LilyFlower x={110} y={750} scale={0.7} rot={-160} />
          <LilyFlower x={490} y={750} scale={0.7} rot={160} />
        </g>
      );
    }
  },

  // 5. ورود الباستيل الوردية الناعمة (Blush Pink Watercolor Roses)
  {
    id: 'blush-pink-roses',
    nameAr: 'ورود الباستيل الوردية الناعمة',
    nameEn: 'Blush Pink Watercolor Roses',
    category: 'watercolor',
    thumbGradient: 'from-[#FDFBF9] via-[#F9ECE9] to-[#E8B4B8]',
    primaryColor: '#B76E79',
    description: 'ورود باستيل ناعمة بلمسات ألوان مائية شيفون تمنح البطاقة رومانسية ساحرة.',
    renderSvg: () => {
      const BlushRose = ({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) => (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
          <circle cx="0" cy="0" r="28" fill="#F4D9DC" fillOpacity="0.8" />
          <ellipse cx="-4" cy="-3" rx="20" ry="15" fill="#E8B4B8" fillOpacity="0.9" />
          <ellipse cx="4" cy="2" rx="16" ry="12" fill="#D98A94" fillOpacity="0.9" />
          <path d="M -6,-4 Q 0,-10 6,-4 Q 10,4 0,6 Q -8,4 -6,-4 Z" fill="#B76E79" />
          <ellipse cx="20" cy="-14" rx="8" ry="4" transform="rotate(30 20 -14)" fill="#688062" opacity="0.75" />
          <ellipse cx="-20" cy="14" rx="8" ry="4" transform="rotate(-30 -20 14)" fill="#688062" opacity="0.75" />
        </g>
      );

      return (
        <g id="floral-blush-pink">
          <BlushRose x={100} y={100} scale={0.9} />
          <BlushRose x={500} y={100} scale={0.9} />
          <BlushRose x={100} y={760} scale={0.9} />
          <BlushRose x={500} y={760} scale={0.9} />
          <BlushRose x={300} y={65} scale={1.05} />
        </g>
      );
    }
  },

  // 6. إطار الأغصان الذهبية المحفورة (24K Gold Engraved Olive Wreath)
  {
    id: 'gold-olive-wreath',
    nameAr: 'إطار الأغصان الذهبية المحفورة 24K',
    nameEn: '24K Gold Engraved Olive Wreath',
    category: 'gold-leaf',
    thumbGradient: 'from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11]',
    primaryColor: '#D4AF37',
    description: 'إطار مذهب متصل يحاكي حفر الذهب الإيطالي على ورق القطن الملوكي.',
    renderSvg: () => (
      <g id="floral-gold-olive-wreath" stroke="#D4AF37" fill="#D4AF37">
        {/* Double perimeter engraved vine */}
        <rect x="75" y="75" width="450" height="710" rx="24" fill="none" strokeWidth="1.2" opacity="0.75" />
        <rect x="85" y="85" width="430" height="690" rx="18" fill="none" strokeWidth="0.6" strokeDasharray="4, 3" opacity="0.6" />
        {/* Corner Leaf Florets */}
        <g opacity="0.9">
          <circle cx="75" cy="75" r="4" />
          <circle cx="525" cy="75" r="4" />
          <circle cx="75" cy="785" r="4" />
          <circle cx="525" cy="785" r="4" />
        </g>
      </g>
    )
  }
];

/* ═══════════════════════════════════════════════════════════════════
   TAB B: Wedding Dingbats & Religious / Celebratory Emblems
   ═══════════════════════════════════════════════════════════════════ */
export interface WeddingDingbatOption {
  id: WeddingDingbatId;
  nameAr: string;
  nameEn: string;
  icon: string;
  renderSvg: (state: StudioState, x?: number, y?: number) => React.ReactNode;
}

export const WEDDING_DINGBATS: WeddingDingbatOption[] = [
  // 1. خواتم الزفاف الماسية المتداخلة
  {
    id: 'rings',
    nameAr: 'خواتم الزفاف الماسية المتداخلة',
    nameEn: 'Interlocking Diamond Rings',
    icon: '💍',
    renderSvg: (state, x = 300, y = 145) => {
      const gold = '#D4AF37';
      return (
        <g id="dingbat-rings" transform={`translate(${x}, ${y})`}>
          {/* Left Ring */}
          <circle cx="-14" cy="0" r="16" fill="none" stroke={gold} strokeWidth="2.8" filter="url(#gold-specular-24k)" />
          {/* Right Ring */}
          <circle cx="14" cy="0" r="16" fill="none" stroke={gold} strokeWidth="2.8" filter="url(#gold-specular-24k)" />
          {/* Solitaire Diamond on right ring */}
          <polygon points="14,-24 9,-16 19,-16" fill="#E8F4F8" stroke={gold} strokeWidth="0.8" />
          <polygon points="9,-16 14,-10 19,-16" fill="#C2E4EF" stroke={gold} strokeWidth="0.8" />
          {/* Sparkle star */}
          <path d="M 14,-28 Q 14,-24 18,-24 Q 14,-24 14,-20 Q 14,-24 10,-24 Q 14,-24 14,-28 Z" fill="#FFFFFF" />
        </g>
      );
    }
  },

  // 2. طيور الحمام الملكية
  {
    id: 'doves',
    nameAr: 'حمائم السلام والحب الملكية',
    nameEn: 'Love Doves with Olive Branch',
    icon: '🕊️',
    renderSvg: (state, x = 300, y = 145) => {
      const col = state.artworkColor || '#D4AF37';
      return (
        <g id="dingbat-doves" transform={`translate(${x}, ${y})`} stroke={col} fill={col}>
          {/* Left Dove */}
          <g transform="translate(-24, 0)">
            <path d="M 0,0 C -6,-10 -16,-8 -18,2 C -20,10 -10,14 4,10 C 14,8 20,-4 12,-10 C 6,-14 2,-6 0,0 Z" fill="#FFFFFF" strokeWidth="1" />
            <path d="M 12,-10 C 16,-16 26,-12 20,-4" fill="none" strokeWidth="1" />
            <circle cx="-12" cy="-2" r="1" fill={col} />
          </g>
          {/* Right Dove */}
          <g transform="translate(24, 0) scale(-1, 1)">
            <path d="M 0,0 C -6,-10 -16,-8 -18,2 C -20,10 -10,14 4,10 C 14,8 20,-4 12,-10 C 6,-14 2,-6 0,0 Z" fill="#FFFFFF" strokeWidth="1" />
            <path d="M 12,-10 C 16,-16 26,-12 20,-4" fill="none" strokeWidth="1" />
            <circle cx="-12" cy="-2" r="1" fill={col} />
          </g>
          {/* Center Olive Twig held in beaks */}
          <path d="M -12,2 Q 0,-4 12,2" fill="none" stroke="#3D5230" strokeWidth="1.2" />
          <ellipse cx="0" cy="-2" rx="4" ry="2" fill="#3D5230" />
        </g>
      );
    }
  },

  // 3. تقويم الشهر المصغر مع قلب أحمر على يوم العرس
  {
    id: 'calendar-heart',
    nameAr: 'تقويم الشهر المصغر مع قلب الزفاف',
    nameEn: 'Mini Wedding Calendar & Heart',
    icon: '📅',
    renderSvg: (state, x = 300, y = 620) => {
      const gold = '#D4AF37';
      return (
        <g id="dingbat-calendar" transform={`translate(${x - 85}, ${y})`}>
          {/* Calendar Plate Background */}
          <rect x="0" y="0" width="170" height="95" rx="14" fill="#FFFFFF" stroke={gold} strokeWidth="1" opacity="0.95" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.06))" />
          {/* Calendar Header */}
          <rect x="0" y="0" width="170" height="24" rx="14" fill={state.artworkColor || '#791E34'} />
          <text x="85" y="16" fill="#FFFFFF" fontSize="11" fontFamily="Cairo, sans-serif" fontWeight="bold" textAnchor="middle">
            {state.date?.text?.slice(0, 20) || 'سبتمبر 2026 • SEPTEMBER'}
          </text>
          {/* Days Grid Placeholder */}
          <g fill="#555555" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
            <text x="25" y="36">S</text><text x="45" y="36">M</text><text x="65" y="36">T</text>
            <text x="85" y="36">W</text><text x="105" y="36">T</text><text x="125" y="36">F</text><text x="145" y="36">S</text>
            {/* Days sample */}
            <text x="25" y="52">13</text><text x="45" y="52">14</text><text x="65" y="52">15</text>
            <text x="85" y="52">16</text><text x="105" y="52">17</text><text x="125" y="52">18</text>
            {/* Target Wedding Day (e.g. 19) highlighted with crimson heart */}
            <g transform="translate(145, 50)">
              <circle cx="0" cy="-2" r="9" fill="#E11D48" />
              <text x="0" y="1" fill="#FFFFFF" fontWeight="bold" fontSize="8" textAnchor="middle">19</text>
            </g>
            <text x="25" y="68">20</text><text x="45" y="68">21</text><text x="65" y="68">22</text>
            <text x="85" y="68">23</text><text x="105" y="68">24</text><text x="125" y="68">25</text><text x="145" y="68">26</text>
          </g>
        </g>
      );
    }
  },

  // 4. عقد اللؤلؤ الملكي المتدلي
  {
    id: 'pearl-necklace',
    nameAr: 'عقد اللؤلؤ الملكي المتدلي',
    nameEn: 'Royal Pearl Necklace Crest',
    icon: '📿',
    renderSvg: (_state, x = 300, y = 140) => (
      <g id="dingbat-pearls" transform={`translate(${x}, ${y})`}>
        {/* Draped pearls curve */}
        <path d="M -90,-20 Q 0,40 90,-20" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
        {[-80, -64, -48, -32, -16, 0, 16, 32, 48, 64, 80].map((px, i) => {
          const py = Math.pow(px / 90, 2) * -35 + 20;
          const r = 4.5 - Math.abs(px) * 0.02;
          return (
            <g key={`pearl-${i}`} transform={`translate(${px}, ${py})`}>
              <circle cx="0" cy="0" r={r} fill="#FAF9F6" stroke="#D4AF37" strokeWidth="0.6" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))" />
              <circle cx="-1" cy="-1" r={r * 0.35} fill="#FFFFFF" />
            </g>
          );
        })}
      </g>
    )
  },

  // 5. فاصل الزهور المذهب الكلاسيكي
  {
    id: 'floral-divider',
    nameAr: 'فاصل الزهور المذهب الكلاسيكي',
    nameEn: 'Ornate Vintage Floral Divider',
    icon: '⚜️',
    renderSvg: (state, x = 300, y = 470) => {
      const col = state.artworkColor || '#D4AF37';
      return (
        <g id="dingbat-divider" transform={`translate(${x}, ${y})`} stroke={col} fill={col}>
          <line x1="-140" y1="0" x2="-25" y2="0" strokeWidth="1" strokeDasharray="4, 3" />
          <line x1="25" y1="0" x2="140" y2="0" strokeWidth="1" strokeDasharray="4, 3" />
          {/* Center Fleur-de-lis / botanical rosette */}
          <circle cx="0" cy="0" r="4" />
          <path d="M 0,-14 C 4,-8 8,-4 0,0 C -8,-4 -4,-8 0,-14 Z" />
          <path d="M -14,0 C -8,4 -4,8 0,0 C -4,-8 -8,-4 -14,0 Z" />
          <path d="M 14,0 C 8,4 4,8 0,0 C 4,-8 8,-4 14,0 Z" />
          <circle cx="-18" cy="0" r="2" />
          <circle cx="18" cy="0" r="2" />
        </g>
      );
    }
  }
];

/* ═══════════════════════════════════════════════════════════════════
   TAB C: 3D Wax Seals, Satin Ribbons & Polaroid Frame
   ═══════════════════════════════════════════════════════════════════ */
export const WAX_SEAL_PRESETS: { id: WaxSealStyle; nameAr: string; colorHex: string; edgeHex: string }[] = [
  { id: 'crimson', nameAr: 'شمع قرمزي ملكي', colorHex: '#800A1F', edgeHex: '#520412' },
  { id: 'gold', nameAr: 'شمع ذهبي معتق 24K', colorHex: '#C59A3F', edgeHex: '#8C6718' },
  { id: 'emerald', nameAr: 'شمع زمردي داكن', colorHex: '#14462B', edgeHex: '#0A2718' },
  { id: 'pearl', nameAr: 'شمع لؤلؤي صدف', colorHex: '#F0ECE1', edgeHex: '#C8BEAA' }
];

export const RIBBON_PRESETS: { id: RibbonColor; nameAr: string; colorHex: string; shadeHex: string }[] = [
  { id: 'forest-green', nameAr: 'ساتان أخضر غابي ملكي', colorHex: '#2B4A33', shadeHex: '#1B2E20' },
  { id: 'burgundy', nameAr: 'ساتان عنابي مخملي', colorHex: '#6B1728', shadeHex: '#450D19' },
  { id: 'champagne-gold', nameAr: 'ساتان شامبين ذهبي', colorHex: '#CBB279', shadeHex: '#9E8549' }
];

/**
 * 3D WAX SEAL SVG RENDERER
 * Real drop shadows, spilled wax organic perimeter, beveled inner ring, embossed couple initials
 */
export function renderWaxSealSvg(style: WaxSealStyle = 'crimson', initials = 'S & K', cx = 300, cy = 110, scale = 1): React.ReactNode {
  if (style === 'none') return null;
  const preset = WAX_SEAL_PRESETS.find((p) => p.id === style) || WAX_SEAL_PRESETS[0];

  return (
    <g id="wax-seal-3d-overlay" transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      <defs>
        {/* Soft realistic drop shadow for the wax stamp */}
        <filter id="wax-drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
        </filter>
        {/* Surface specular lighting for liquid wax texture */}
        <radialGradient id={`wax-gradient-${style}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={style === 'pearl' ? '0.7' : '0.4'} />
          <stop offset="40%" stopColor={preset.colorHex} />
          <stop offset="100%" stopColor={preset.edgeHex} />
        </radialGradient>
      </defs>

      {/* 1. Organic Spilled Wax Edge Rim */}
      <path
        d="M 0,-42
           C 16,-43 32,-36 38,-24
           C 44,-12 45,6 40,20
           C 35,34 22,42 6,43
           C -12,44 -28,38 -36,26
           C -44,14 -43,-4 -38,-18
           C -33,-32 -18,-41 0,-42 Z"
        fill={`url(#wax-gradient-${style})`}
        filter="url(#wax-drop-shadow)"
      />

      {/* 2. Inner Recessed Bevel Ring */}
      <circle cx="0" cy="0" r="28" fill={preset.edgeHex} fillOpacity="0.35" />
      <circle cx="0" cy="0" r="26" fill={`url(#wax-gradient-${style})`} stroke={preset.edgeHex} strokeWidth="1.2" />
      <circle cx="0" cy="0" r="23" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="2, 2" opacity="0.4" />

      {/* 3. Embossed Couple Initials inside Wax Seal */}
      <text
        x="0"
        y="5"
        textAnchor="middle"
        fontSize="13"
        fontFamily='"Playfair Display", "Cinzel Decorative", serif'
        fontWeight="bold"
        letterSpacing="1"
        fill="#FFFFFF"
        opacity="0.9"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
      >
        {initials}
      </text>
    </g>
  );
}

/**
 * 3D SATIN RIBBON BOW SVG RENDERER
 * Real fabric folds, rich shading, and hanging draped tails
 */
export function renderRibbonBowSvg(color: RibbonColor = 'forest-green', cx = 300, cy = 110, scale = 1): React.ReactNode {
  if (color === 'none') return null;
  const preset = RIBBON_PRESETS.find((p) => p.id === color) || RIBBON_PRESETS[0];

  return (
    <g id="ribbon-bow-3d-overlay" transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      <defs>
        <radialGradient id={`ribbon-grad-${color}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="50%" stopColor={preset.colorHex} />
          <stop offset="100%" stopColor={preset.shadeHex} />
        </radialGradient>
      </defs>

      {/* Hanging Left Ribbon Tail */}
      <path
        d="M -10,10 C -25,40 -40,80 -50,110 L -30,105 C -20,75 -10,40 -5,12 Z"
        fill={`url(#ribbon-grad-${color})`}
        filter="drop-shadow(2px 5px 6px rgba(0,0,0,0.3))"
      />
      {/* Hanging Right Ribbon Tail */}
      <path
        d="M 10,10 C 25,40 40,80 50,110 L 30,105 C 20,75 10,40 5,12 Z"
        fill={`url(#ribbon-grad-${color})`}
        filter="drop-shadow(-2px 5px 6px rgba(0,0,0,0.3))"
      />

      {/* Left Loop */}
      <path
        d="M -5,-2 C -35,-25 -65,-5 -60,15 C -55,30 -25,20 -5,6 Z"
        fill={`url(#ribbon-grad-${color})`}
        stroke={preset.shadeHex}
        strokeWidth="0.8"
        filter="drop-shadow(0 4px 6px rgba(0,0,0,0.35))"
      />
      {/* Right Loop */}
      <path
        d="M 5,-2 C 35,-25 65,-5 60,15 C 55,30 25,20 5,6 Z"
        fill={`url(#ribbon-grad-${color})`}
        stroke={preset.shadeHex}
        strokeWidth="0.8"
        filter="drop-shadow(0 4px 6px rgba(0,0,0,0.35))"
      />

      {/* Center Ribbon Knot */}
      <ellipse cx="0" cy="2" rx="11" ry="9" fill={`url(#ribbon-grad-${color})`} stroke={preset.shadeHex} strokeWidth="1" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.4))" />
      <path d="M -5,-4 Q 0,-8 5,-4" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
    </g>
  );
}

/**
 * POLAROID PHOTO FRAME WITH TOP WAX STAMP SVG RENDERER
 * Real vintage cotton photo mat, centered photo aperture, and top wax seal anchor
 */
export function renderPolaroidFrameSvg(
  cx = 300,
  cy = 280,
  width = 240,
  height = 280,
  showTopWaxStamp = true,
  photoUrl?: string
): React.ReactNode {
  return (
    <g id="polaroid-photo-frame" transform={`translate(${cx - width / 2}, ${cy - height / 2})`}>
      {/* Outer Cotton Photo Mat Board */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="10"
        fill="#FAF9F6"
        stroke="#E6E2D8"
        strokeWidth="1.5"
        filter="drop-shadow(0 12px 24px rgba(0,0,0,0.18))"
      />

      {/* Inner Photo Aperture */}
      <rect
        x="18"
        y="18"
        width={width - 36}
        height={height - 70}
        rx="4"
        fill="#1E1D24"
        stroke="#D5D0C2"
        strokeWidth="0.8"
      />

      {/* Actual Photo Image or Aesthetic Placeholder */}
      {photoUrl ? (
        <image
          href={photoUrl}
          x="18"
          y="18"
          width={width - 36}
          height={height - 70}
          preserveAspectRatio="xMidYMid slice"
        />
      ) : (
        <g transform={`translate(${width / 2}, ${(height - 70) / 2 + 18})`} textAnchor="middle" fill="#888888">
          <text y="-8" fontSize="22">📸</text>
          <text y="14" fontSize="10" fontFamily="Cairo, sans-serif" fill="#A8A29E">صورة العروسين (Save The Date)</text>
        </g>
      )}

      {/* Polaroid Handwritten Style Caption at Bottom */}
      <text
        x={width / 2}
        y={height - 24}
        textAnchor="middle"
        fontSize="12"
        fontFamily='"Alex Brush", cursive, serif'
        fill="#4A453E"
      >
        Forever & Always ✦
      </text>

      {/* Top Wax Stamp Pinned at Header */}
      {showTopWaxStamp && (
        <g transform={`translate(${width / 2}, 4)`}>
          {renderWaxSealSvg('gold', '✦', 0, 0, 0.65)}
        </g>
      )}
    </g>
  );
}

/**
 * WEDDING DINGBAT SVG RENDERER HELPER
 */
export function renderWeddingDingbatSvg(
  id: WeddingDingbatId,
  state: StudioState,
  x = 300,
  y = 280
): React.ReactNode {
  if (id === 'none') return null;
  const d = WEDDING_DINGBATS.find((item) => item.id === id);
  return d ? d.renderSvg(state, x, y) : null;
}

