import React, { useState } from 'react';
import { Sparkles, Check, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SmartPresetButtonProps {
  onApplyPreset: () => void;
}

export const SmartPresetButton: React.FC<SmartPresetButtonProps> = ({ onApplyPreset }) => {
  const [justApplied, setJustApplied] = useState(false);

  const handleClick = () => {
    // Fire festive luxury gold confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.2, x: 0.8 },
        colors: ['#D4AF37', '#791E34', '#FAF6EE', '#EBD8AE']
      });
    } catch {
      // ignore
    }

    onApplyPreset();
    setJustApplied(true);
    setTimeout(() => setJustApplied(false), 2400);
  };

  return (
    <div className="relative group">
      {/* Outer ambient glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-400 via-amber-300 to-gold-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse pointer-events-none" />

      {/* Main glowing button */}
      <button
        onClick={handleClick}
        className="relative w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#21151A] via-[#2F1D23] to-[#25181F] border border-gold-400/60 hover:border-gold-300 rounded-2xl shadow-luxury transition-all duration-300 group-hover:scale-[1.01] active:scale-[0.99] text-right"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-stone-900 shadow-md">
            {justApplied ? (
              <Check className="w-5 h-5 text-stone-900 stroke-[2.5]" />
            ) : (
              <Crown className="w-5 h-5 text-stone-900 fill-stone-900" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-200 to-gold-400">
                ✨ تطبيق الإعدادات المفضلة للموقع
              </span>
              <span className="text-[10px] bg-gold-400/20 text-gold-300 border border-gold-400/30 px-1.5 py-0.5 rounded-full font-mono">
                توصية الخبراء
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              تناغم النسبة الذهبية للخطوط + باليت العنابي والذهب الملكي
            </p>
          </div>
        </div>

        <div className="text-gold-400 group-hover:translate-x-[-3px] transition-transform">
          <Sparkles className="w-5 h-5" />
        </div>
      </button>
    </div>
  );
};
