import React from 'react';
import { Maximize2, Layers, FileText, Check } from 'lucide-react';
import { PaperTexture, StudioState, TemplateType } from '../../types/studio';
import { CARD_SIZES } from '../../data/templates';

interface SizeStructureAccordionProps {
  state: StudioState;
  onUpdateState: (updates: Partial<StudioState>) => void;
}

const PAPER_TEXTURES: { id: PaperTexture; nameAr: string; desc: string }[] = [
  { id: 'cotton', nameAr: 'ورق قطني كوتون 350 جم', desc: 'ملمس ناعم مخملي فاخر مناسب للبصمة' },
  { id: 'linen', nameAr: 'ورق كتان مضلع Linen', desc: 'خطوط نسيجية راقية كلاسيكية' },
  { id: 'pearl', nameAr: 'ورق لؤلؤي صدف Shimmer', desc: 'بريق عاكس للضوء فائق النعومة' },
  { id: 'matte', nameAr: 'ورق حريري مطفي Silk Matte', desc: 'ألوان عميقة خالية من الانعكاس' },
  { id: 'vellum', nameAr: 'ورق شفاف فاخر Vellum', desc: 'شفافية عصرية جذابة للحلقات' }
];

export const SizeStructureAccordion: React.FC<SizeStructureAccordionProps> = ({
  state,
  onUpdateState
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Template Structure Type Toggle (Composite vs Flat) */}
      <div>
        <label className="block text-xs font-semibold text-stone-300 mb-2">
          هيكل وقوام التصميم (Template Architecture):
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onUpdateState({ templateType: 'composite' })}
            className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
              state.templateType === 'composite'
                ? 'bg-gradient-to-br from-gold-500/20 to-gold-600/10 border-gold-500/50 text-gold-300 shadow-sm'
                : 'bg-[#191820] border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold">تصميم مركب (متعدد القطع)</span>
              <Layers className="w-4 h-4 text-gold-400" />
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              بطاقة مروحية وردية + حلقة دائرية منفصلة مجمعة ببرشام معدني
            </p>
          </button>

          <button
            onClick={() => onUpdateState({ templateType: 'flat' })}
            className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
              state.templateType === 'flat'
                ? 'bg-gradient-to-br from-gold-500/20 to-gold-600/10 border-gold-500/50 text-gold-300 shadow-sm'
                : 'bg-[#191820] border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold">تصميم قطعة واحدة (مسطح)</span>
              <FileText className="w-4 h-4 text-stone-400" />
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              بطاقة فردية مسطحة مخصصة للطباعة والقص المباشر
            </p>
          </button>
        </div>
      </div>

      {/* 2. Preset Sizes Selector */}
      <div>
        <label className="flex items-center justify-between text-xs font-semibold text-stone-300 mb-2">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
            <span>المقاسات والأبعاد القياسية:</span>
          </span>
          <span className="text-[10px] text-stone-400">سنتيمتر (cm)</span>
        </label>
        <div className="space-y-2">
          {CARD_SIZES.map((size) => {
            const isSelected = state.selectedSizeId === size.id;
            return (
              <button
                key={size.id}
                onClick={() => onUpdateState({ selectedSizeId: size.id })}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-right transition-all ${
                  isSelected
                    ? 'bg-gold-500/15 border-gold-400/60 text-gold-200 shadow-sm'
                    : 'bg-[#191820] border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-2">
                    <span>{size.nameAr}</span>
                    {size.id === 'size-floral-fan-14x20' && (
                      <span className="text-[10px] bg-gold-400/20 text-gold-300 px-1.5 py-0.2 rounded font-mono">
                        القالب الرئيسي
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                    {size.widthCm} × {size.heightCm} سم
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-gold-400 bg-gold-400 text-black' : 'border-stone-700'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Paper Texture & Finish Selection */}
      <div>
        <label className="block text-xs font-semibold text-stone-300 mb-2">
          ملمس الورق والتشطيب (Paper Finish Mockup):
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {PAPER_TEXTURES.map((pt) => (
            <button
              key={pt.id}
              onClick={() => onUpdateState({ paperTexture: pt.id })}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-right transition-all ${
                state.paperTexture === pt.id
                  ? 'bg-stone-800/80 border-gold-400/50 text-gold-300'
                  : 'bg-[#15141A] border-stone-800/80 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div>
                <div className="text-xs font-semibold">{pt.nameAr}</div>
                <div className="text-[10px] text-stone-400">{pt.desc}</div>
              </div>
              {state.paperTexture === pt.id && (
                <div className="w-2 h-2 rounded-full bg-gold-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
