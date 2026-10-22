import React from 'react';
import {
  Crown,
  Sparkles,
  QrCode,
  Palette,
  Type,
  Maximize2,
  Calendar,
  Layers,
  Wand2
} from 'lucide-react';
import { BackDesignConfig, BackMinimalistStyle, StudioState } from '../../types/studio';
import { FONT_OPTIONS, LUXURY_THEMES } from '../../data/templates';

interface BackDesignSectionProps {
  state: StudioState;
  onUpdateBackDesign: (updates: Partial<BackDesignConfig>) => void;
  onSyncWithActiveTheme: () => void;
}

const LUXURY_BACK_BG_SWATCHES = [
  { name: 'عنابي ملوكي', hex: '#58111A' },
  { name: 'أخضر زمردي', hex: '#0B2916' },
  { name: 'زيتوني عميق', hex: '#3B4620' },
  { name: 'كحلي ليلي', hex: '#0A1424' },
  { name: 'أسود مطفي', hex: '#121214' },
  { name: 'شوكولاتة داكنة', hex: '#331B10' },
  { name: 'وردي توتي', hex: '#4A232E' },
  { name: 'بنفسجي مخملي', hex: '#2B163B' },
  { name: 'طين تيراكوتا', hex: '#5E2614' },
  { name: 'عاجي كريمي', hex: '#FDFBF7' }
];

const LUXURY_EMBLEM_SWATCHES = [
  { name: 'ذهب إمبراطوري', hex: '#D4AF37' },
  { name: 'شامبين لامع', hex: '#F5D061' },
  { name: 'ذهب وردي', hex: '#FB7185' },
  { name: 'بلاتين فضي', hex: '#E2E6ED' },
  { name: 'أبيض عاجي نقي', hex: '#FFFFFF' },
  { name: 'برونز عتيق', hex: '#E0A96D' }
];

export const BackDesignSection: React.FC<BackDesignSectionProps> = ({
  state,
  onUpdateBackDesign,
  onSyncWithActiveTheme
}) => {
  const backCfg = state.backDesign;

  const currentTheme =
    LUXURY_THEMES.find((t) => t.id === state.selectedPaletteId) || LUXURY_THEMES[0];

  const styleOptions: {
    id: BackMinimalistStyle;
    title: string;
    desc: string;
    badge: string;
  }[] = [
    {
      id: 'monogram-centered',
      title: 'شعار ملكي بالمنتصف فقط',
      desc: 'إكليل غار نباتي مذهب يتوسطه المونوغرام الملكي مع تاج فيكتوري',
      badge: 'الأكثر طلباً'
    },
    {
      id: 'full-botanical-veins',
      title: 'لوحة عروق الورد الكاملة مع حرف واحد',
      desc: 'تغطية عروق زهرية كاملة على القفا مع ميدالية دائرية لحرف العروسين',
      badge: 'فني غني'
    },
    {
      id: 'solid-minimal-qr',
      title: 'خلفية سادة فاخرة مع باركود صغير',
      desc: 'أرضية مطفية ناعمة بإطار رفيع مع مونوغرام ناعم ورمز QR تفاعلي بالأسفل',
      badge: 'مينيمال معاصر'
    }
  ];

  return (
    <div className="space-y-5 text-right font-cairo">
      {/* Smart Sync Banner */}
      <div className="p-3 bg-gradient-to-r from-gold-500/10 via-amber-500/15 to-gold-600/10 border border-gold-500/30 rounded-2xl flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-gold-300 block">
            فصل تام بين الوجه والقفا (Duplex Engine)
          </span>
          <span className="text-[11px] text-stone-400">
            تصميم قفا نقي وفاخر بدون تكرار نصوص وتفاصيل الوجه
          </span>
        </div>
        <button
          onClick={onSyncWithActiveTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gold-500/20 text-gold-300 hover:bg-gold-500/30 border border-gold-500/40 transition-all shadow-sm"
          title="مطابقة ألوان القفا المتباينة مع الثيم المختار حالياً"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>مزامنة الألوان</span>
        </button>
      </div>

      {/* 1. Back Minimalist Style Selector (3 Curated Luxury Styles) */}
      <div>
        <label className="block text-xs font-bold text-stone-200 mb-2.5">
          نمط القفا البسيط (Back Minimalist Style):
        </label>
        <div className="space-y-2">
          {styleOptions.map((opt) => {
            const isSelected = backCfg.style === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onUpdateBackDesign({ style: opt.id })}
                className={`w-full p-3 rounded-2xl border text-right transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500/20 via-gold-400/20 to-amber-500/15 border-gold-400 text-stone-100 shadow-md ring-1 ring-gold-400/30'
                    : 'bg-[#191820] border-stone-800/90 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-100">{opt.title}</span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${
                        isSelected
                          ? 'bg-gold-400/25 text-gold-200 border border-gold-400/40'
                          : 'bg-stone-800 text-stone-500'
                      }`}
                    >
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">{opt.desc}</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full mt-1 border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-gold-400 bg-gold-400' : 'border-stone-700'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Back Monogram Text & Font Controls */}
      <div className="p-3.5 bg-[#191820] border border-stone-800/80 rounded-2xl space-y-3.5">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-200 border-b border-stone-800/60 pb-2">
          <Type className="w-4 h-4 text-gold-400" />
          <span>حروف الشعار الخلفي (Back Monogram Initials):</span>
        </div>

        {/* Monogram Text Input */}
        <div>
          <label className="block text-[11px] text-stone-400 mb-1">
            نص أو حروف الشعار (مثل: S & K أو حرف ع):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={backCfg.monogramText}
              onChange={(e) => onUpdateBackDesign({ monogramText: e.target.value })}
              className="flex-1 bg-[#121116] border border-stone-700 focus:border-gold-400 text-stone-100 px-3 py-2 rounded-xl text-center text-sm font-bold tracking-widest outline-none transition-colors"
              placeholder="S & K"
            />
            {/* Quick Presets */}
            <div className="flex items-center gap-1">
              {['S & K', 'W & S', 'ع & س', 'ع'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => onUpdateBackDesign({ monogramText: preset })}
                  className="px-2 py-1.5 bg-stone-800/80 hover:bg-stone-700 text-[10px] text-stone-300 rounded-lg transition-colors font-mono"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Font Family Selector */}
        <div>
          <label className="block text-[11px] text-stone-400 mb-1">نوع خط الشعار الخلفي:</label>
          <select
            value={backCfg.fontFamily}
            onChange={(e) => onUpdateBackDesign({ fontFamily: e.target.value })}
            className="w-full bg-[#121116] border border-stone-700 text-stone-200 px-3 py-2 rounded-xl text-xs outline-none focus:border-gold-400 transition-colors"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.fontFamily}>
                {f.nameAr} ({f.nameEn})
              </option>
            ))}
          </select>
        </div>

        {/* Monogram Size Slider */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
            <span>حجم الشعار الخلفي (Monogram Size):</span>
            <span className="font-mono text-gold-400 font-bold">{backCfg.monogramSize} بكسل</span>
          </div>
          <input
            type="range"
            min={32}
            max={88}
            step={2}
            value={backCfg.monogramSize}
            onChange={(e) => onUpdateBackDesign({ monogramSize: +e.target.value })}
            className="w-full accent-gold-400 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* 3. Back Background Color (Independent from Front) */}
      <div className="p-3.5 bg-[#191820] border border-stone-800/80 rounded-2xl space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-stone-200 border-b border-stone-800/60 pb-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-gold-400" />
            <span>لون أرضية القفا (Back Background Color):</span>
          </div>
          <span className="text-[10px] text-stone-400">مستقل عن لون الوجه</span>
        </div>

        {/* Color picker and hex input */}
        <div className="flex items-center gap-2.5">
          <input
            type="color"
            value={backCfg.backgroundColor}
            onChange={(e) => onUpdateBackDesign({ backgroundColor: e.target.value })}
            className="w-9 h-9 rounded-xl border border-stone-700 bg-transparent cursor-pointer p-0.5"
          />
          <input
            type="text"
            value={backCfg.backgroundColor}
            onChange={(e) => onUpdateBackDesign({ backgroundColor: e.target.value })}
            className="flex-1 bg-[#121116] border border-stone-700 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-mono uppercase"
          />
        </div>

        {/* Curated Dark/Rich Contrast Swatches */}
        <div>
          <span className="text-[10px] text-stone-400 block mb-1.5">ألوان خلفية غنية موصى بها:</span>
          <div className="grid grid-cols-5 gap-1.5">
            {LUXURY_BACK_BG_SWATCHES.map((swatch) => (
              <button
                key={swatch.hex}
                onClick={() => onUpdateBackDesign({ backgroundColor: swatch.hex })}
                className={`group relative h-8 rounded-lg border transition-transform hover:scale-105 flex items-center justify-center ${
                  backCfg.backgroundColor.toLowerCase() === swatch.hex.toLowerCase()
                    ? 'border-gold-400 ring-2 ring-gold-400/40 shadow-sm'
                    : 'border-stone-700'
                }`}
                style={{ backgroundColor: swatch.hex }}
                title={`${swatch.name} (${swatch.hex})`}
              >
                {backCfg.backgroundColor.toLowerCase() === swatch.hex.toLowerCase() && (
                  <div className="w-2 h-2 rounded-full bg-white shadow" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Back Monogram & Pattern Color */}
      <div className="p-3.5 bg-[#191820] border border-stone-800/80 rounded-2xl space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-stone-200 border-b border-stone-800/60 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>لون الشعار والنقش الخلفي (Emblem & Foil Color):</span>
          </div>
          <span className="text-[10px] text-gold-400">بصمة مذهبة</span>
        </div>

        {/* Color picker and hex input */}
        <div className="flex items-center gap-2.5">
          <input
            type="color"
            value={backCfg.artworkColor}
            onChange={(e) => onUpdateBackDesign({ artworkColor: e.target.value })}
            className="w-9 h-9 rounded-xl border border-stone-700 bg-transparent cursor-pointer p-0.5"
          />
          <input
            type="text"
            value={backCfg.artworkColor}
            onChange={(e) => onUpdateBackDesign({ artworkColor: e.target.value })}
            className="flex-1 bg-[#121116] border border-stone-700 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-mono uppercase"
          />
        </div>

        {/* Curated Metallic Foil Swatches */}
        <div>
          <span className="text-[10px] text-stone-400 block mb-1.5">بصمات معدنية فاخرة:</span>
          <div className="grid grid-cols-6 gap-1.5">
            {LUXURY_EMBLEM_SWATCHES.map((swatch) => (
              <button
                key={swatch.hex}
                onClick={() => onUpdateBackDesign({ artworkColor: swatch.hex })}
                className={`group relative h-8 rounded-lg border transition-transform hover:scale-105 flex items-center justify-center ${
                  backCfg.artworkColor.toLowerCase() === swatch.hex.toLowerCase()
                    ? 'border-white ring-2 ring-gold-400 shadow-sm'
                    : 'border-stone-700'
                }`}
                style={{ backgroundColor: swatch.hex }}
                title={`${swatch.name} (${swatch.hex})`}
              >
                {backCfg.artworkColor.toLowerCase() === swatch.hex.toLowerCase() && (
                  <div className="w-2 h-2 rounded-full bg-stone-950" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern Opacity Slider (Relevant when full-botanical-veins is selected) */}
        {backCfg.style === 'full-botanical-veins' && (
          <div className="pt-2 border-t border-stone-800/60">
            <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
              <span>شفافية النقش الزخرفي الخلفي:</span>
              <span className="font-mono text-gold-400 font-bold">
                {Math.round(backCfg.patternOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={0.65}
              step={0.05}
              value={backCfg.patternOpacity}
              onChange={(e) => onUpdateBackDesign({ patternOpacity: +e.target.value })}
              className="w-full accent-gold-400 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* 5. Minimal Footer Options (Toggles) */}
      <div className="p-3.5 bg-[#191820] border border-stone-800/80 rounded-2xl space-y-3">
        <span className="text-xs font-bold text-stone-200 block border-b border-stone-800/60 pb-2">
          عناصر الهامش السفلي المصغر (Minimal Footer):
        </span>

        {/* Toggle Small Date */}
        <label className="flex items-center justify-between p-2 rounded-xl bg-[#141318] hover:bg-[#1a1922] transition-colors cursor-pointer">
          <div>
            <span className="text-xs font-semibold text-stone-200 block">
              إظهار تاريخ الحفل المصغر بالأسفل
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
              ✦ {state.date?.text || '١٩ سبتمبر ٢٠٢٦'} ✦
            </span>
          </div>
          <input
            type="checkbox"
            checked={backCfg.showSmallDate}
            onChange={(e) => onUpdateBackDesign({ showSmallDate: e.target.checked })}
            className="w-4 h-4 accent-gold-400 rounded cursor-pointer"
          />
        </label>

        {/* Toggle Small QR Code (when in monogram style) */}
        {backCfg.style === 'monogram-centered' && (
          <label className="flex items-center justify-between p-2 rounded-xl bg-[#141318] hover:bg-[#1a1922] transition-colors cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-stone-200 block">
                إظهار باركود الحفل المصغر أسفل الشعار
              </span>
              <span className="text-[10px] text-stone-400">
                رمز QR ناعم بدون تشويش على الشعار
              </span>
            </div>
            <input
              type="checkbox"
              checked={backCfg.showSmallQr}
              onChange={(e) => onUpdateBackDesign({ showSmallQr: e.target.checked })}
              className="w-4 h-4 accent-gold-400 rounded cursor-pointer"
            />
          </label>
        )}
      </div>
    </div>
  );
};
