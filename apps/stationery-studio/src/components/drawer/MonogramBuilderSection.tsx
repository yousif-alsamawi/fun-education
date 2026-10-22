import React from 'react';
import {
  Crown,
  Sparkles,
  Sliders,
  Type,
  LayoutGrid
} from 'lucide-react';
import {
  InterlockingMonogramConfig,
  StudioState
} from '../../types/studio';

interface MonogramBuilderSectionProps {
  state: StudioState;
  onUpdateMonogramBuilder: (updates: Partial<InterlockingMonogramConfig>) => void;
  onUpdateState?: (updates: Partial<StudioState>) => void;
}

const MONOGRAM_FONTS = [
  { id: '"Cinzel Decorative", serif', nameAr: 'سينزل كلاسيك (Cinzel)', nameEn: 'Cinzel Decorative' },
  { id: '"Playfair Display", serif', nameAr: 'بلايفير رويال (Playfair)', nameEn: 'Playfair Display' },
  { id: '"Great Vibes", cursive', nameAr: 'غريت فايبز ديواني (Great Vibes)', nameEn: 'Great Vibes' },
  { id: '"Alex Brush", cursive', nameAr: 'أليكس براش فاخر (Alex Brush)', nameEn: 'Alex Brush' },
  { id: '"Aref Ruqaa", serif', nameAr: 'رقعة تراثية (Aref Ruqaa)', nameEn: 'Aref Ruqaa' },
  { id: '"Reem Kufi", sans-serif', nameAr: 'كوفي هندسي (Reem Kufi)', nameEn: 'Reem Kufi' },
  { id: 'Amiri, serif', nameAr: 'نسخ أميري قرآني (Amiri)', nameEn: 'Amiri' }
];

export const MonogramBuilderSection: React.FC<MonogramBuilderSectionProps> = ({
  state,
  onUpdateMonogramBuilder,
  onUpdateState
}) => {
  const cfg = state.monogramBuilder;
  const crestStyle = state.monogramCrestStyle || 'royal-circle';
  const monoOffset = state.monogramOffset || { x: 0, y: 0, scale: 1, rotation: 0 };

  const handleSvgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateState) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        onUpdateState({
          monogramCrestStyle: 'custom-svg',
          customMonogramSvg: text
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4 text-right font-cairo">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">
          تداخل هيرالدي معقد
        </span>
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-200">
          <span>مصمم الشعار الملكي المتداخل (Monogram Builder)</span>
          <Crown className="w-3.5 h-3.5 text-gold-400" />
        </div>
      </div>

      {/* 0. Royal Monogram Crest Style Selector */}
      <div className="p-3 bg-[#191820] rounded-xl border border-stone-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-stone-400 font-mono">طراز الشعار الفاخر</span>
          <span className="text-xs font-bold text-stone-200">إطار ونمط المونوغرام الملكي:</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'royal-circle', name: 'دائري ملكي', icon: '👑' },
            { id: 'laurel-wreath', name: 'إكليل الغار', icon: '🌿' },
            { id: 'geometric-hexagon', name: 'سداسي عصري', icon: '📐' },
            { id: 'baroque-shield', name: 'درع باروكي', icon: '🛡️' },
            { id: 'minimalist-oval', name: 'بيضاوي ناعم', icon: '✨' },
            { id: 'custom-svg', name: 'رفع مخطوطة SVG', icon: '📎' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onUpdateState?.({ monogramCrestStyle: item.id as any })}
              className={`py-2 px-1.5 rounded-xl border text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 text-center ${
                crestStyle === item.id
                  ? 'border-gold-400 bg-gold-500/20 text-gold-200 ring-1 ring-gold-400/40 shadow-sm'
                  : 'border-stone-800 bg-[#14131A] text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>{item.icon}</span>
              <span className="truncate">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Custom SVG File Upload Input */}
        {crestStyle === 'custom-svg' && (
          <div className="pt-2 border-t border-stone-800/80 space-y-1.5">
            <label className="text-[10px] text-stone-300 block">
              اختر ملف مخطوطة فيكتور (.svg) مخصصة من الخطاط:
            </label>
            <input
              type="file"
              accept=".svg"
              onChange={handleSvgFileUpload}
              className="w-full text-xs text-stone-300 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:bg-gold-500/20 file:text-gold-300 file:font-bold hover:file:bg-gold-500/30 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* 0.5. Micro-Positioning Sliders (تحريك وتحجيم الشعار الدقيق) */}
      <div className="p-3 bg-[#191820] rounded-xl border border-gold-500/30 space-y-2.5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onUpdateState?.({ monogramOffset: { x: 0, y: 0, scale: 1, rotation: 0 } })}
            className="text-[10px] text-stone-400 hover:text-gold-300 underline"
          >
            إعادة ضبط ↺
          </button>
          <div className="flex items-center gap-1 text-xs font-bold text-gold-300">
            <span>التحريك والضبط الدقيق للشعار (Micro-Positioning)</span>
            <Sliders className="w-3.5 h-3.5 text-gold-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* X Offset */}
          <div>
            <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
              <span className="font-mono text-gold-400">{monoOffset.x}px</span>
              <span>إزاحة أفقية (X)</span>
            </div>
            <input
              type="range"
              min={-60}
              max={60}
              step={1}
              value={monoOffset.x}
              onChange={(e) =>
                onUpdateState?.({
                  monogramOffset: { ...monoOffset, x: Number(e.target.value) }
                })
              }
              className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>

          {/* Y Offset */}
          <div>
            <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
              <span className="font-mono text-gold-400">{monoOffset.y}px</span>
              <span>إزاحة عمودية (Y)</span>
            </div>
            <input
              type="range"
              min={-60}
              max={60}
              step={1}
              value={monoOffset.y}
              onChange={(e) =>
                onUpdateState?.({
                  monogramOffset: { ...monoOffset, y: Number(e.target.value) }
                })
              }
              className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>

          {/* Scale */}
          <div>
            <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
              <span className="font-mono text-gold-400">{Math.round(monoOffset.scale * 100)}%</span>
              <span>الحجم (Scale)</span>
            </div>
            <input
              type="range"
              min={0.6}
              max={1.6}
              step={0.05}
              value={monoOffset.scale}
              onChange={(e) =>
                onUpdateState?.({
                  monogramOffset: { ...monoOffset, scale: Number(e.target.value) }
                })
              }
              className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>

          {/* Rotation */}
          <div>
            <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
              <span className="font-mono text-gold-400">{monoOffset.rotation || 0}°</span>
              <span>تدوير (Rotation)</span>
            </div>
            <input
              type="range"
              min={-15}
              max={15}
              step={1}
              value={monoOffset.rotation || 0}
              onChange={(e) =>
                onUpdateState?.({
                  monogramOffset: { ...monoOffset, rotation: Number(e.target.value) }
                })
              }
              className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>
        </div>
      </div>

      {/* 1. Initials and Connector Input */}
      <div className="p-3 bg-[#191820] rounded-xl border border-stone-800 space-y-3">
        <span className="text-[11px] font-bold text-stone-300 block">
          أحرف الشعار ورمز الربط:
        </span>
        <div className="grid grid-cols-3 gap-2">
          {/* Initial 1 */}
          <div>
            <label className="text-[10px] text-stone-400 block mb-1">الحرف الأول</label>
            <input
              type="text"
              maxLength={3}
              value={cfg.initial1}
              onChange={(e) => onUpdateMonogramBuilder({ initial1: e.target.value })}
              className="w-full text-center py-1.5 bg-[#14131A] border border-stone-700/80 rounded-lg text-sm font-bold text-gold-300 uppercase focus:border-gold-500 focus:outline-none"
            />
          </div>

          {/* Ampersand */}
          <div>
            <label className="text-[10px] text-stone-400 block mb-1">رمز الربط</label>
            <input
              type="text"
              maxLength={3}
              value={cfg.ampersand}
              onChange={(e) => onUpdateMonogramBuilder({ ampersand: e.target.value })}
              className="w-full text-center py-1.5 bg-[#14131A] border border-stone-700/80 rounded-lg text-sm font-bold text-stone-200 focus:border-gold-500 focus:outline-none"
            />
          </div>

          {/* Initial 2 */}
          <div>
            <label className="text-[10px] text-stone-400 block mb-1">الحرف الثاني</label>
            <input
              type="text"
              maxLength={3}
              value={cfg.initial2}
              onChange={(e) => onUpdateMonogramBuilder({ initial2: e.target.value })}
              className="w-full text-center py-1.5 bg-[#14131A] border border-stone-700/80 rounded-lg text-sm font-bold text-gold-300 uppercase focus:border-gold-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Layout Structure Switcher */}
      <div className="p-3 bg-[#191820] rounded-xl border border-stone-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-stone-400">تنسيق وتداخل الحروف</span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-300">
            <span>نمط توزيع الشعار</span>
            <LayoutGrid className="w-3.5 h-3.5 text-gold-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onUpdateMonogramBuilder({ layout: 'interlocking' })}
            className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-all ${
              cfg.layout === 'interlocking'
                ? 'border-gold-400 bg-gold-500/20 text-gold-200'
                : 'border-stone-800 bg-[#14131A] text-stone-400 hover:text-stone-200'
            }`}
          >
            تداخل عميق (Interlocking)
          </button>

          <button
            onClick={() => onUpdateMonogramBuilder({ layout: 'crest' })}
            className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-all ${
              cfg.layout === 'crest'
                ? 'border-gold-400 bg-gold-500/20 text-gold-200'
                : 'border-stone-800 bg-[#14131A] text-stone-400 hover:text-stone-200'
            }`}
          >
            درع ملكي (Royal Crest)
          </button>

          <button
            onClick={() => onUpdateMonogramBuilder({ layout: 'shield' })}
            className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-all ${
              cfg.layout === 'shield'
                ? 'border-gold-400 bg-gold-500/20 text-gold-200'
                : 'border-stone-800 bg-[#14131A] text-stone-400 hover:text-stone-200'
            }`}
          >
            تاج وشارة (Shield Badge)
          </button>

          <button
            onClick={() => onUpdateMonogramBuilder({ layout: 'classic' })}
            className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-all ${
              cfg.layout === 'classic'
                ? 'border-gold-400 bg-gold-500/20 text-gold-200'
                : 'border-stone-800 bg-[#14131A] text-stone-400 hover:text-stone-200'
            }`}
          >
            خطي متجاور (Classic Side)
          </button>
        </div>
      </div>

      {/* 3. Typography & Size Controls */}
      <div className="p-3 bg-[#191820] rounded-xl border border-stone-800 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-stone-400 font-mono">عربي وإنجليزي</span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-300">
              <span>خط المونوغرام الملكي</span>
              <Type className="w-3.5 h-3.5 text-gold-400" />
            </div>
          </div>
          <select
            value={cfg.fontFamily}
            onChange={(e) => onUpdateMonogramBuilder({ fontFamily: e.target.value })}
            className="w-full bg-[#14131A] border border-stone-700/80 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 focus:border-gold-500 focus:outline-none"
          >
            {MONOGRAM_FONTS.map((font) => (
              <option key={font.id} value={font.id}>
                {font.nameAr}
              </option>
            ))}
          </select>
        </div>

        {/* Size Slider */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono text-gold-400">{cfg.size}px</span>
            <span className="text-xs text-stone-300">حجم الشعار</span>
          </div>
          <input
            type="range"
            min={36}
            max={78}
            step={2}
            value={cfg.size}
            onChange={(e) => onUpdateMonogramBuilder({ size: Number(e.target.value) })}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
        </div>

        {/* Interlock Offset Slider */}
        {cfg.layout === 'interlocking' && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-gold-400">{cfg.interlockOffset}px</span>
              <div className="flex items-center gap-1 text-xs text-stone-300">
                <span>مسافة التداخل بين الحرفين</span>
                <Sliders className="w-3 h-3 text-gold-400" />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={28}
              step={1}
              value={cfg.interlockOffset}
              onChange={(e) => onUpdateMonogramBuilder({ interlockOffset: Number(e.target.value) })}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
          </div>
        )}
      </div>

      {/* 4. Embellishments: Laurel Wreath & Hot-Foil */}
      <div className="p-3 bg-[#191820] rounded-xl border border-stone-800 space-y-2.5">
        <label className="flex items-center justify-between cursor-pointer">
          <input
            type="checkbox"
            checked={cfg.showFloralWreath}
            onChange={(e) => onUpdateMonogramBuilder({ showFloralWreath: e.target.checked })}
            className="rounded bg-stone-800 border-stone-700 text-gold-500 focus:ring-0"
          />
          <div className="text-right">
            <span className="text-xs font-bold text-stone-200 block">
              إكليل الغار النباتي الدائري (Botanical Laurel Wreath)
            </span>
            <span className="text-[10px] text-stone-400">
              تطويق الحروف بأغصان زيتون ملكية متوجة بالتاج
            </span>
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-stone-800/80">
          <input
            type="checkbox"
            checked={cfg.useHotFoil}
            onChange={(e) => onUpdateMonogramBuilder({ useHotFoil: e.target.checked })}
            className="rounded bg-stone-800 border-stone-700 text-gold-500 focus:ring-0"
          />
          <div className="text-right">
            <span className="text-xs font-bold text-stone-200 block">
              ربط الشعار بالختم الحراري (Foil Binding)
            </span>
            <span className="text-[10px] text-stone-400">
              إكساب حروف المونوغرام لمعان الذهب أو الروز غولد المشطوف
            </span>
          </div>
        </label>
      </div>
    </div>
  );
};
