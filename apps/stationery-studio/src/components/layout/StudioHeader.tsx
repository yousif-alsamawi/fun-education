import React from 'react';
import { Crown, BookOpen, RotateCcw } from 'lucide-react';
import { StudioUIMode } from '../../types/studio';

interface StudioHeaderProps {
  onReset: () => void;
  onOpenAssemblyGuide: () => void;
  onOpenImpositionModal?: () => void;
  isFullSuiteMode?: boolean;
  onToggleFullSuiteMode?: () => void;
  studioUIMode?: StudioUIMode;
  onToggleStudioUIMode?: (mode: StudioUIMode) => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  onReset,
  onOpenAssemblyGuide,
  onOpenImpositionModal,
  isFullSuiteMode = false,
  onToggleFullSuiteMode,
  studioUIMode = 'pro',
  onToggleStudioUIMode
}) => {
  return (
    <header className="h-16 bg-[#16151B] border-b border-stone-800/90 px-6 flex items-center justify-between z-30 select-none shadow-md">
      {/* Brand Identity & Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 flex items-center justify-center text-stone-950 shadow-gold-glow">
          <Crown className="w-5 h-5 fill-stone-950" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-black text-stone-100 tracking-tight">
              استوديو مكتبة حروف للتصميم والإنتاج
            </h1>
            <span className="hidden sm:inline-block text-[10px] bg-gold-400/15 text-gold-300 border border-gold-400/30 px-2 py-0.5 rounded-full font-mono">
              إصدار الاستوديو الفاخر 2026
            </span>
          </div>
          <p className="text-[11px] text-stone-400 hidden sm:block">
            منظومة هندسية ذكية لتصميم بطاقات الدعوة والتوزيعات مع فصل طبقات الطباعة ومسارات قص البلتر
          </p>
        </div>
      </div>

      {/* Mode Switcher Toggle: Simple Quick-Fill vs Pro Studio */}
      <div className="flex items-center bg-[#100F15] p-1 rounded-2xl border border-gold-500/30 shadow-inner">
        <button
          onClick={() => onToggleStudioUIMode?.('quick-fill')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            studioUIMode === 'quick-fill'
              ? 'bg-gradient-to-r from-gold-500/25 to-amber-500/25 text-gold-300 border border-gold-400/50 shadow-gold-glow'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          title="الوضع السهل السريع لتعبئة البيانات وطباعة الكرت فوراً"
        >
          <span>📝</span>
          <span>الوضع السهل السريع</span>
        </button>
        <button
          onClick={() => onToggleStudioUIMode?.('pro')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            studioUIMode === 'pro' || !studioUIMode
              ? 'bg-gradient-to-r from-gold-500/25 to-amber-500/25 text-gold-300 border border-gold-400/50 shadow-gold-glow'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          title="الاستوديو المتقدم للتحكم بجميع الطبقات والمسارات والألوان"
        >
          <span>🎨</span>
          <span>الاستوديو المتقدم</span>
        </button>
      </div>

      {/* Top Header Actions */}
      <div className="flex items-center gap-2.5">
        {/* NEW FEATURE: Duplex Imposition Modal Button */}
        {onOpenImpositionModal && (
          <button
            onClick={onOpenImpositionModal}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600/30 via-teal-500/25 to-emerald-600/30 hover:from-emerald-500/40 hover:to-teal-500/40 text-emerald-300 border border-emerald-500/50 transition-all shadow-md active:scale-95"
            title="تجهيز فرخ طباعة الدعوات A4/A3 مع ضبط التطابق ومسارات البلتر"
          >
            <span>🖨️</span>
            <span>تجهيز فرخ طباعة الدعوات (A4 / A3 Duplex Imposition)</span>
          </button>
        )}

        {/* NEW FEATURE: Full Suite Synchronization Mode Toggle */}
        {onToggleFullSuiteMode && (
          <button
            onClick={onToggleFullSuiteMode}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isFullSuiteMode
                ? 'bg-gradient-to-r from-purple-500/25 via-gold-500/30 to-amber-500/25 text-gold-200 border border-gold-400 shadow-luxury'
                : 'bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 border border-stone-700'
            }`}
            title="عرض طقم المناسبة المتكامل (دعوة + علبة + ستاند + تاق) متزامنة الألوان والأسماء"
          >
            <span>📦</span>
            <span>{isFullSuiteMode ? 'وضع البكج المتكامل (مفعّل) ✨' : 'عرض كطقم متكامل (Full Suite)'}</span>
          </button>
        )}

        {/* Assembly Guide Link */}
        <button
          onClick={onOpenAssemblyGuide}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-700/80 transition-colors"
          title="دليل تجميع وتركيب أجزاء الدعوة"
        >
          <BookOpen className="w-3.5 h-3.5 text-gold-400" />
          <span className="hidden md:inline">طريقة التركيب والتجميع</span>
        </button>

        {/* Reset Configuration */}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-stone-800/80 transition-colors"
          title="إعادة ضبط الاستوديو إلى الإعدادات الأولية"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">إعادة ضبط</span>
        </button>
      </div>
    </header>
  );
};
