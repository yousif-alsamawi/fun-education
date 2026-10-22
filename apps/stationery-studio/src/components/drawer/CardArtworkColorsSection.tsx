import React from 'react';
import { Palette, Sparkles, Check, Brush, Layers, CircleDot, Type, Compass } from 'lucide-react';
import { ArtworkPatternStyle, LuxuryTheme, StudioState } from '../../types/studio';
import { ARTWORK_PATTERNS, LUXURY_THEMES } from '../../data/templates';

interface CardArtworkColorsSectionProps {
  state: StudioState;
  onUpdateColors: (updates: {
    cardBaseColor?: string;
    artworkColor?: string;
    artworkGradientEnd?: string;
    secondaryPieceColor?: string;
    textColor?: string;
    artworkPatternStyle?: ArtworkPatternStyle;
  }) => void;
  onSelectTheme: (theme: LuxuryTheme) => void;
}

const BASE_SWATCHES = [
  { name: 'كريمي فاخر', value: '#FDFBF7' },
  { name: 'زيتوني ملكي', value: '#5E6B38' },
  { name: 'كحلي ليل', value: '#0F1E36' },
  { name: 'زمردي غني', value: '#113E21' },
  { name: 'أسود مطفي', value: '#181818' },
  { name: 'كرافت ريفي', value: '#C8AD8D' },
  { name: 'تيراكوتا دافئ', value: '#C66B49' },
  { name: 'وردي باودر', value: '#F9EBE8' },
  { name: 'لافندر ناعم', value: '#EAE6F0' },
  { name: 'تيفاني هادئ', value: '#E0F2F1' },
  { name: 'أبيض لؤلؤي', value: '#FAF9F6' }
];

const ARTWORK_SWATCHES = [
  { name: 'قرمزي عميق', value: '#8B1E3F' },
  { name: 'ذهب ملكي 24K', value: '#D4AF37' },
  { name: 'عنابي داكن', value: '#58111A' },
  { name: 'ذهب ناعم', value: '#C5A059' },
  { name: 'ذهب وردي', value: '#B76E79' },
  { name: 'برقوقي عميق', value: '#6C5B7B' },
  { name: 'أبيض ناصع', value: '#FFFFFF' },
  { name: 'عاجي كريمي', value: '#E8DFD5' },
  { name: 'زمردي بحري', value: '#00695C' },
  { name: 'برونزي قرفة', value: '#8C5332' },
  { name: 'رمادي عاجي', value: '#A89F91' }
];

const SECONDARY_SWATCHES = [
  { name: 'عاجي فاتح', value: '#F4F1EA' },
  { name: 'أبيض صريح', value: '#FAFAFA' },
  { name: 'لؤلؤي كريمي', value: '#F9F6F0' },
  { name: 'كريمي مخملي', value: '#FBF9F5' },
  { name: 'فحم داكن', value: '#282828' },
  { name: 'زيتوني غامق', value: '#4A5D23' },
  { name: 'مرمية ناعم', value: '#8A9A86' },
  { name: 'بني إسبريسو', value: '#3E2723' },
  { name: 'بيج هادئ', value: '#EFECE6' }
];

const TEXT_SWATCHES = [
  { name: 'أحمر قرمزي', value: '#6B0F2B' },
  { name: 'شامبين ذهبي', value: '#F5E6C8' },
  { name: 'ذهب نقي', value: '#E5C158' },
  { name: 'شامبين فاتح', value: '#F3E5AB' },
  { name: 'توت مجفف', value: '#5A383E' },
  { name: 'ذهب مشرق', value: '#F5D061' },
  { name: 'برقوقي غامق', value: '#352940' },
  { name: 'إسبريسو غامق', value: '#2C1E14' },
  { name: 'كريمي ناصع', value: '#FFFDF9' },
  { name: 'تيل بحري', value: '#004D40' },
  { name: 'فحمي داكن', value: '#333333' }
];

export const CardArtworkColorsSection: React.FC<CardArtworkColorsSectionProps> = ({
  state,
  onUpdateColors,
  onSelectTheme
}) => {
  return (
    <div className="space-y-6">
      {/* 
        ========================================================================
        PART A: THE 4 GRANULAR DESIGN LAYERS
        ========================================================================
      */}
      <div className="space-y-4">
        {/* LAYER 1: Card Base Color */}
        <div className="p-3.5 bg-[#191821] border border-stone-800 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-stone-200">
              <span className="w-2.5 h-2.5 rounded-full border border-stone-700 shadow" style={{ backgroundColor: state.cardBaseColor }} />
              <span>1. لون أرضية الكرت الأساسي (Card Base):</span>
            </span>
            <span className="text-[10px] font-mono text-stone-400">{state.cardBaseColor.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={state.cardBaseColor}
              onChange={(e) => onUpdateColors({ cardBaseColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={state.cardBaseColor}
              onChange={(e) => onUpdateColors({ cardBaseColor: e.target.value })}
              className="flex-1 bg-[#121115] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs font-mono text-stone-200 uppercase"
            />
          </div>

          {/* Quick Swatches */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {BASE_SWATCHES.map((sw) => (
              <button
                key={sw.value}
                onClick={() => onUpdateColors({ cardBaseColor: sw.value })}
                className={`w-5 h-5 rounded-md border transition-transform ${
                  state.cardBaseColor.toLowerCase() === sw.value.toLowerCase()
                    ? 'scale-125 border-white ring-2 ring-gold-400'
                    : 'border-stone-700 hover:scale-110'
                }`}
                style={{ backgroundColor: sw.value }}
                title={sw.name}
              />
            ))}
          </div>
        </div>

        {/* LAYER 2: Artwork, Veins & Borders Color */}
        <div className="p-3.5 bg-[#191821] border border-stone-800 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-stone-200">
              <span className="w-2.5 h-2.5 rounded-full border border-stone-700 shadow" style={{ backgroundColor: state.artworkColor }} />
              <span>2. لون الزخارف والرسوم الفنية (Artwork & Veins):</span>
            </span>
            <span className="text-[10px] font-mono text-stone-400">{state.artworkColor.toUpperCase()}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-stone-400 block mb-1">اللون الأساسي:</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={state.artworkColor}
                  onChange={(e) => onUpdateColors({ artworkColor: e.target.value })}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={state.artworkColor}
                  onChange={(e) => onUpdateColors({ artworkColor: e.target.value })}
                  className="flex-1 bg-[#121115] border border-stone-700/80 rounded-xl px-2.5 py-1 text-[11px] font-mono text-stone-200 uppercase"
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-stone-400 block mb-1">نهاية التدرج (اختياري):</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={state.artworkGradientEnd || state.artworkColor}
                  onChange={(e) => onUpdateColors({ artworkGradientEnd: e.target.value })}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={state.artworkGradientEnd || state.artworkColor}
                  onChange={(e) => onUpdateColors({ artworkGradientEnd: e.target.value })}
                  className="flex-1 bg-[#121115] border border-stone-700/80 rounded-xl px-2.5 py-1 text-[11px] font-mono text-stone-200 uppercase"
                />
              </div>
            </div>
          </div>

          {/* Quick Swatches */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {ARTWORK_SWATCHES.map((sw) => (
              <button
                key={sw.value}
                onClick={() => onUpdateColors({ artworkColor: sw.value })}
                className={`w-5 h-5 rounded-md border transition-transform ${
                  state.artworkColor.toLowerCase() === sw.value.toLowerCase()
                    ? 'scale-125 border-white ring-2 ring-gold-400'
                    : 'border-stone-700 hover:scale-110'
                }`}
                style={{ backgroundColor: sw.value }}
                title={sw.name}
              />
            ))}
          </div>
        </div>

        {/* LAYER 3: Secondary Piece / Ring / Insert Color */}
        <div className="p-3.5 bg-[#191821] border border-stone-800 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-stone-200">
              <span className="w-2.5 h-2.5 rounded-full border border-stone-700 shadow" style={{ backgroundColor: state.secondaryPieceColor }} />
              <span>3. لون القطعة الإضافية / الحلقة (Secondary Piece / Ring):</span>
            </span>
            <span className="text-[10px] font-mono text-stone-400">{state.secondaryPieceColor.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={state.secondaryPieceColor}
              onChange={(e) => onUpdateColors({ secondaryPieceColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={state.secondaryPieceColor}
              onChange={(e) => onUpdateColors({ secondaryPieceColor: e.target.value })}
              className="flex-1 bg-[#121115] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs font-mono text-stone-200 uppercase"
            />
          </div>

          {/* Quick Swatches */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {SECONDARY_SWATCHES.map((sw) => (
              <button
                key={sw.value}
                onClick={() => onUpdateColors({ secondaryPieceColor: sw.value })}
                className={`w-5 h-5 rounded-md border transition-transform ${
                  state.secondaryPieceColor.toLowerCase() === sw.value.toLowerCase()
                    ? 'scale-125 border-white ring-2 ring-gold-400'
                    : 'border-stone-700 hover:scale-110'
                }`}
                style={{ backgroundColor: sw.value }}
                title={sw.name}
              />
            ))}
          </div>
        </div>

        {/* LAYER 4: Typography & Monogram Color */}
        <div className="p-3.5 bg-[#191821] border border-stone-800 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-stone-200">
              <span className="w-2.5 h-2.5 rounded-full border border-stone-700 shadow" style={{ backgroundColor: state.textColor }} />
              <span>4. لون النصوص والشعار (Typography & Monogram):</span>
            </span>
            <span className="text-[10px] font-mono text-stone-400">{state.textColor.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={state.textColor}
              onChange={(e) => onUpdateColors({ textColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={state.textColor}
              onChange={(e) => onUpdateColors({ textColor: e.target.value })}
              className="flex-1 bg-[#121115] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs font-mono text-stone-200 uppercase"
            />
          </div>

          {/* Quick Swatches */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {TEXT_SWATCHES.map((sw) => (
              <button
                key={sw.value}
                onClick={() => onUpdateColors({ textColor: sw.value })}
                className={`w-5 h-5 rounded-md border transition-transform ${
                  state.textColor.toLowerCase() === sw.value.toLowerCase()
                    ? 'scale-125 border-white ring-2 ring-gold-400'
                    : 'border-stone-700 hover:scale-110'
                }`}
                style={{ backgroundColor: sw.value }}
                title={sw.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        PART B: ARTWORK PATTERN STYLE SELECTOR
        ========================================================================
      */}
      <div className="pt-2 border-t border-stone-800">
        <label className="flex items-center gap-1.5 text-xs font-bold text-stone-200 mb-2.5">
          <Compass className="w-3.5 h-3.5 text-gold-400" />
          <span>نمط الزخرفة الداخلية (Artwork Pattern Style):</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ARTWORK_PATTERNS.map((pat) => {
            const isSelected = state.artworkPatternStyle === pat.id;
            return (
              <button
                key={pat.id}
                onClick={() => onUpdateColors({ artworkPatternStyle: pat.id })}
                className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-gold-500/20 to-gold-600/10 border-gold-400/80 text-gold-300 shadow-sm'
                    : 'bg-[#18171F] border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold truncate">{pat.nameAr}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />}
                </div>
                <p className="text-[10px] text-stone-400 line-clamp-2 leading-relaxed">
                  {pat.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        ========================================================================
        PART C: 12 CURATED ETSY-STYLE LUXURY THEMES GALLERY
        ========================================================================
      */}
      <div className="pt-3 border-t border-stone-800">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-1.5 text-xs font-bold text-stone-200">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>✨ مكتبة الثيمات الفاخرة (12 ثيم جاهز):</span>
          </label>
          <span className="text-[10px] text-stone-400 font-mono">12 ثيم مخصص</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {LUXURY_THEMES.map((theme) => {
            const isSelected = state.selectedPaletteId === theme.id;

            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme)}
                className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500/15 via-[#251E28] to-[#1C1822] border-gold-400/80 shadow-md'
                    : 'bg-[#18171E] border-stone-800 hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-stone-100 truncate">{theme.nameAr}</span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-gold-400 text-black flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* 4 Color Swatches Palette Preview */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div
                    className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                    style={{ backgroundColor: theme.cardBaseColor }}
                    title="أرضية الكرت"
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                    style={{ backgroundColor: theme.artworkColor }}
                    title="الزخارف"
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                    style={{ backgroundColor: theme.secondaryPieceColor }}
                    title="القطعة الإضافية"
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                    style={{ backgroundColor: theme.textColor }}
                    title="النصوص"
                  />
                  <span className="text-[10px] text-stone-500 mr-auto font-mono">{theme.nameEn}</span>
                </div>

                <p className="text-[10px] text-stone-400 line-clamp-1">
                  {theme.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
