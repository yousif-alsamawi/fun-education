import React, { useState } from 'react';
import { Sparkles, Wand2, Crown, Check, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SmartActionButtonsProps {
  onApplyPreset: () => void;
  onGenerateAiTheme: () => void;
  currentThemeName?: string;
}

export const SmartActionButtons: React.FC<SmartActionButtonsProps> = ({
  onApplyPreset,
  onGenerateAiTheme,
  currentThemeName
}) => {
  const [justAppliedPreset, setJustAppliedPreset] = useState(false);
  const [justGeneratedTheme, setJustGeneratedTheme] = useState(false);

  const handlePresetClick = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.25, x: 0.8 },
        colors: ['#D4AF37', '#791E34', '#FAF6EE', '#EBD8AE']
      });
    } catch {
      // ignore
    }
    onApplyPreset();
    setJustAppliedPreset(true);
    setTimeout(() => setJustAppliedPreset(false), 2400);
  };

  const handleAiThemeClick = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.28, x: 0.8 },
        colors: ['#D4AF37', '#1B4332', '#9C4124', '#1A2942', '#E8B4B8']
      });
    } catch {
      // ignore
    }
    onGenerateAiTheme();
    setJustGeneratedTheme(true);
    setTimeout(() => setJustGeneratedTheme(false), 2400);
  };

  return (
    <div className="space-y-2.5">
      {/* BUTTON 1: "✨ توصية الموقع (ضبط مثالي)" */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-400 via-amber-300 to-gold-600 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-300 pointer-events-none" />
        <button
          onClick={handlePresetClick}
          className="relative w-full flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#21151A] via-[#2F1D23] to-[#25181F] border border-gold-400/60 hover:border-gold-300 rounded-2xl shadow-luxury transition-all duration-300 group-hover:scale-[1.01] active:scale-[0.99] text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-stone-900 shadow-md shrink-0">
              {justAppliedPreset ? (
                <Check className="w-5 h-5 text-stone-900 stroke-[2.5]" />
              ) : (
                <Crown className="w-5 h-5 text-stone-900 fill-stone-900" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-200 to-gold-400">
                  ✨ توصية الموقع (ضبط مثالي)
                </span>
                <span className="text-[10px] bg-gold-400/20 text-gold-300 border border-gold-400/30 px-1.5 py-0.2 rounded-full font-mono">
                  النسبة الذهبية
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mt-0.5">
                إعادة ضبط الخطوط والأحجام والتناسق لأبعاد المصمم القياسية
              </p>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
        </button>
      </div>

      {/* BUTTON 2: "🎨 ابتكار ثيم جديد تلقائياً (توليد ذكي بضغطة زر)" */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-emerald-400 to-amber-500 rounded-2xl blur-md opacity-50 group-hover:opacity-90 transition duration-300 pointer-events-none" />
        <button
          onClick={handleAiThemeClick}
          className="relative w-full flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#171524] via-[#1F1C33] to-[#151D22] border border-stone-700 hover:border-gold-400/80 rounded-2xl shadow-luxury transition-all duration-300 group-hover:scale-[1.01] active:scale-[0.99] text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shrink-0">
              {justGeneratedTheme ? (
                <Check className="w-5 h-5 text-white stroke-[2.5]" />
              ) : (
                <Wand2 className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-emerald-200 to-amber-200">
                  🎨 ابتكار تصميم جديد كلياً (توليد ذكي)
                </span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-400/30 px-1.5 py-0.2 rounded-full font-mono">
                  Remix ذكي
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mt-0.5">
                توليد ومزامنة الهياكل الهندسية، باليتات الألوان، الخطوط والزخارف بنقرة واحدة
              </p>
            </div>
          </div>
          <Palette className="w-4 h-4 text-purple-400 shrink-0" />
        </button>
      </div>

      {/* Active AI Theme Indicator Badge */}
      {currentThemeName && (
        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-stone-900/80 border border-stone-800 text-[11px] text-stone-300">
          <span className="text-stone-400">السمة الفنية المطبقة:</span>
          <span className="text-gold-300 font-semibold truncate max-w-[200px]">{currentThemeName}</span>
        </div>
      )}
    </div>
  );
};
