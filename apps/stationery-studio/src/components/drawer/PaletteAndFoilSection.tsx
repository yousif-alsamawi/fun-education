import React from 'react';
import { Palette, Sparkles, Check, Scissors } from 'lucide-react';
import { FoilEffect, StudioState } from '../../types/studio';
import { LUXURY_THEMES } from '../../data/templates';

interface PaletteAndFoilSectionProps {
  state: StudioState;
  onUpdateState: (updates: Partial<StudioState>) => void;
}

const FOIL_EFFECTS: { id: FoilEffect; nameAr: string; gradient: string }[] = [
  { id: 'gold', nameAr: 'بصمة ذهب ملكي عيار 24', gradient: 'from-[#DEC081] via-[#D4AF37] to-[#8C6514]' },
  { id: 'rose-gold', nameAr: 'بصمة ذهب وردي Rose Gold', gradient: 'from-[#FCE7F3] via-[#FB7185] to-[#BE185D]' },
  { id: 'silver', nameAr: 'بصمة فضة بلاتين Platinum', gradient: 'from-[#FFFFFF] via-[#CBD5E1] to-[#64748B]' },
  { id: 'bronze', nameAr: 'بصمة نحاس دافئ Copper', gradient: 'from-[#FED7AA] via-[#EA580C] to-[#7C2D12]' },
  { id: 'none', nameAr: 'طباعة عادية بدون بصمة معدنية', gradient: 'from-stone-700 to-stone-800' }
];

export const PaletteAndFoilSection: React.FC<PaletteAndFoilSectionProps> = ({
  state,
  onUpdateState
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Curated Luxury Color Palettes */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-2">
          <Palette className="w-3.5 h-3.5 text-gold-400" />
          <span>سمات الألوان الملكية المتناسقة:</span>
        </label>
        <div className="grid grid-cols-1 gap-2">
          {LUXURY_THEMES.map((pal) => {
            const isSelected = state.selectedPaletteId === pal.id;
            return (
              <button
                key={pal.id}
                onClick={() => {
                  onUpdateState({
                    selectedPaletteId: pal.id,
                    cardBaseColor: pal.cardBaseColor,
                    artworkColor: pal.artworkColor,
                    artworkGradientEnd: pal.artworkGradientEnd || pal.artworkColor,
                    secondaryPieceColor: pal.secondaryPieceColor,
                    textColor: pal.textColor,
                    artworkPatternStyle: pal.patternStyle,
                    names: { ...state.names, color: pal.textColor },
                    greeting: { ...state.greeting, color: pal.textColor },
                    monogram: { ...state.monogram, color: pal.artworkColor },
                    date: { ...state.date, color: pal.textColor },
                    location: { ...state.location, color: pal.textColor },
                    ringDate: { ...state.ringDate, color: pal.textColor },
                    qrCode: { ...state.qrCode, color: pal.textColor }
                  });
                }}
                className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-gold-500/15 border-gold-400/60 shadow-sm'
                    : 'bg-[#191820] border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>{pal.nameAr}</span>
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{pal.nameEn}</div>
                </div>

                {/* Color preview discs */}
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full border border-black/30 shadow-sm" style={{ backgroundColor: pal.cardBaseColor }} title="أرضية الكرت" />
                  <div className="w-4 h-4 rounded-full border border-black/30 shadow-sm" style={{ backgroundColor: pal.artworkColor }} title="الزخارف" />
                  <div className="w-4 h-4 rounded-full border border-black/30 shadow-sm" style={{ backgroundColor: pal.secondaryPieceColor }} title="القطعة الإضافية" />
                  <div className="w-4 h-4 rounded-full border border-black/30 shadow-sm" style={{ backgroundColor: pal.textColor }} title="النصوص" />
                  {isSelected && (
                    <div className="mr-1.5 w-4 h-4 rounded-full bg-gold-400 text-black flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Metallic Hot Foil Stamping Effect */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>تأثير البصمة الحرارية البارزة (Foil Stamping):</span>
        </label>
        <div className="space-y-1.5">
          {FOIL_EFFECTS.map((foil) => {
            const isSelected = state.foilEffect === foil.id;
            return (
              <button
                key={foil.id}
                onClick={() => onUpdateState({ foilEffect: foil.id })}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-right transition-all ${
                  isSelected
                    ? 'bg-stone-800/90 border-gold-400/60 text-gold-300'
                    : 'bg-[#15141A] border-stone-800/80 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${foil.gradient} shadow-sm`} />
                  <span className="text-xs font-medium">{foil.nameAr}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-gold-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Dieline & Cutting Settings */}
      <div className="p-3 bg-[#15141A] border border-stone-800/80 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-300 font-medium">
          <span className="flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5 text-rose-400" />
            <span>لون خط القص (Plotter Dieline):</span>
          </span>
          <span className="text-[10px] font-mono text-rose-400">#E11D48 (Cameo Red)</span>
        </div>
        <p className="text-[11px] text-stone-400">
          تُصدّر خطوط القص بسمك شعري 0.75pt بدون تعبئة (No Fill) متوافقة 100% مع برامج Silhouette Studio و Skycut SignMaster.
        </p>
      </div>
    </div>
  );
};
