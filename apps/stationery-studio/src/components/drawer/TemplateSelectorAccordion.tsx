import React from 'react';
import {
  Layers,
  Flower2,
  Castle,
  Wind,
  Mail,
  Sparkles,
  Check,
  ArrowRightLeft,
  DoorOpen,
  DoorClosed
} from 'lucide-react';
import { MasterTemplateId, StudioState } from '../../types/studio';
import { MASTER_TEMPLATES } from '../../data/templates';

interface TemplateSelectorAccordionProps {
  state: StudioState;
  onSelectTemplate: (templateId: MasterTemplateId) => void;
  onToggleFlowerInserted: () => void;
  onUpdateState?: (updates: Partial<StudioState>) => void;
}

export const TemplateSelectorAccordion: React.FC<TemplateSelectorAccordionProps> = ({
  state,
  onSelectTemplate,
  onToggleFlowerInserted,
  onUpdateState
}) => {
  const getIcon = (id: MasterTemplateId) => {
    switch (id) {
      case 'royal-arch':
        return Castle;
      case 'scalloped-badge':
        return Flower2;
      case 'floral-fan':
        return Wind;
      case 'islamic-dome':
        return Castle;
      case 'chamfered-plaque':
        return Layers;
      case 'capsule-suite':
        return Layers;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-3.5">
      {/* Category Header Badge */}
      <div className="flex items-center justify-between p-2 bg-[#121117] rounded-xl border border-stone-800 text-xs">
        <span className="font-bold text-gold-300 flex items-center gap-1.5">
          <span>👑</span>
          <span>مكتبة كروت وأطقم الزفاف الملكية الفاخرة (6 أطقم حصرية)</span>
        </span>
        <span className="text-[10px] bg-gold-500/20 text-gold-300 border border-gold-400/30 px-2 py-0.5 rounded-full font-mono">
          300 DPI
        </span>
      </div>

      {/* 6 Luxury Wedding Template Cards */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {MASTER_TEMPLATES.map((tmpl) => {
          const isSelected = state.activeTemplateId === tmpl.id;
          const Icon = getIcon(tmpl.id);

          return (
            <button
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`w-full p-2.5 rounded-2xl border text-right transition-all flex items-start gap-2.5 relative ${
                isSelected
                  ? 'bg-gradient-to-r from-gold-500/15 via-[#231E29] to-[#1C1822] border-gold-400/70 shadow-luxury'
                  : 'bg-[#18171E] border-stone-800 hover:border-stone-700 text-stone-300'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected
                    ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-stone-900 shadow-md'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5">
                  <div className="text-xs font-bold text-stone-100 truncate">
                    <span>{tmpl.nameAr}</span>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-md font-mono shrink-0 ${
                      isSelected
                        ? 'bg-gold-500/20 text-gold-300 border border-gold-400/30'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {tmpl.badge}
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5 leading-relaxed line-clamp-1">
                  {tmpl.tagline}
                </div>
              </div>

              {isSelected && (
                <div className="w-4 h-4 rounded-full bg-gold-400 text-black flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* ====================================================================
          SPECIAL MECHANICAL CONTROLS FOR ACTIVE WEDDING TEMPLATES
          ==================================================================== */}

      {/* TEMPLATE 1: Floral Fan (Assembled vs Exploded View) */}
      {state.activeTemplateId === 'floral-fan' && (
        <div className="p-3 bg-gradient-to-r from-[#1B1822] to-[#131119] border border-gold-600/40 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-200 font-semibold">
            <span className="flex items-center gap-1.5 text-gold-300">
              <Layers className="w-4 h-4" />
              <span>محاكاة تركيب حلقة التاريخ (Date Ring Assembly):</span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
              {state.isAssemblyMode ? 'مجمعة بالبرشام ✦' : 'مفككة للإنتاج ✂️'}
            </span>
          </div>

          <button
            onClick={() => onUpdateState?.({ isAssemblyMode: !state.isAssemblyMode })}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all bg-gold-500/20 hover:bg-gold-500/30 text-gold-200 border border-gold-500/50"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>
              {state.isAssemblyMode
                ? 'تفكيك القطع لشيت القص والطباعة (Exploded View)'
                : 'تجميع المروحة مع حلقة التاريخ (Assembled Mockup)'}
            </span>
          </button>
        </div>
      )}

      {/* TEMPLATE 3: Arch Gatefold Lily (Door Swing & Clasp In/Out) */}
      {state.activeTemplateId === 'arch-gatefold-lily' && (
        <div className="p-3 bg-gradient-to-r from-[#17221A] to-[#131B16] border border-emerald-600/40 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between text-xs text-stone-200 font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-300">
              <Flower2 className="w-4 h-4" />
              <span>آلية بوابة القوس وزهرة الليلي (Slit-Lock Gate):</span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
              {state.isGatefoldOpen ? 'البوابة مفتوحة 🔓' : 'مقفلة بالزهرة 🔒'}
            </span>
          </div>

          {/* Toggle Doors Open/Close */}
          <button
            onClick={() => onUpdateState?.({ isGatefoldOpen: !state.isGatefoldOpen })}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/50"
          >
            {state.isGatefoldOpen ? (
              <DoorClosed className="w-3.5 h-3.5" />
            ) : (
              <DoorOpen className="w-3.5 h-3.5" />
            )}
            <span>
              {state.isGatefoldOpen
                ? 'إغلاق درفتي البوابة المقوسة'
                : 'فتح درفتي البوابة لكشف كرت الدعوة الداخلي'}
            </span>
          </button>

          {/* Toggle Flower Clasp In/Out */}
          <button
            onClick={onToggleFlowerInserted}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              state.isFlowerInserted
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/50'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>
              {state.isFlowerInserted
                ? 'سحب زهرة الليلي من الشق (فك القفل)'
                : 'إدخال ساق زهرة الليلي في الشق (قفل البوابة)'}
            </span>
          </button>
        </div>
      )}

      {/* TEMPLATE 4: Arch Window Pocket Slide Card Out */}
      {state.activeTemplateId === 'arch-window-pocket' && (
        <div className="p-3 bg-gradient-to-r from-[#201518] to-[#171013] border border-rose-600/40 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-200 font-semibold">
            <span className="flex items-center gap-1.5 text-rose-300">
              <Castle className="w-4 h-4" />
              <span>محاكاة سحب البطاقة من الجيب (Pocket Slide):</span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
              {state.isPocketOpen ? 'مسحوبة لأعلى 📤' : 'داخل الجيب 📥'}
            </span>
          </div>

          <button
            onClick={() => onUpdateState?.({ isPocketOpen: !state.isPocketOpen })}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/50"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>
              {state.isPocketOpen
                ? 'إعادة البطاقة داخل الجيب'
                : 'سحب البطاقة لأعلى لمعاينتها كاملة'}
            </span>
          </button>
        </div>
      )}

      {/* TEMPLATE 6: Double Half Arch Suite */}
      {state.activeTemplateId === 'double-half-arch' && (
        <div className="p-3 bg-gradient-to-r from-[#1B1922] to-[#141219] border border-purple-600/40 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-200 font-semibold">
            <span className="flex items-center gap-1.5 text-purple-300">
              <Layers className="w-4 h-4" />
              <span>طقم القوس المزدوج وحزام التثبيت:</span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
              {state.isRibbonWrapped ? 'الحزام مثبت 🎀' : 'مفكك'}
            </span>
          </div>

          <button
            onClick={() => onUpdateState?.({ isRibbonWrapped: !state.isRibbonWrapped })}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/50"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>
              {state.isRibbonWrapped
                ? 'إزالة الحزام لمعاينة البطاقتين'
                : 'تطبيق الحزام الملتف حول القوسين'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
