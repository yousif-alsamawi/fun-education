import React from 'react';
import { Eye, Printer, Scissors, Layers } from 'lucide-react';
import { LayerMode } from '../../types/studio';

interface LayerModeTabsProps {
  activeMode: LayerMode;
  onModeChange: (mode: LayerMode) => void;
}

export const LayerModeTabs: React.FC<LayerModeTabsProps> = ({
  activeMode,
  onModeChange
}) => {
  return (
    <div className="flex items-center justify-between bg-[#19181F]/90 backdrop-blur-md border border-stone-800/80 rounded-2xl p-1.5 shadow-2xl">
      <div className="flex items-center gap-1">
        {/* Final Mockup Tab */}
        <button
          onClick={() => onModeChange('mockup')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeMode === 'mockup'
              ? 'bg-gradient-to-r from-gold-500/20 via-gold-400/25 to-gold-600/20 text-gold-300 border border-gold-500/40 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
          }`}
          title="معاينة واقعية بملامس الورق واللمعات والظلال ثلاثية الأبعاد"
        >
          <Eye className={`w-4 h-4 ${activeMode === 'mockup' ? 'text-gold-400' : ''}`} />
          <span>المعاينة النهائية</span>
          <span className="text-[10px] bg-gold-500/20 text-gold-300 px-1.5 py-0.5 rounded-md font-mono mr-1">
            واقعي
          </span>
        </button>

        {/* Print Layer Tab */}
        <button
          onClick={() => onModeChange('print')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeMode === 'print'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
          }`}
          title="عرض طبقة الطباعة فقط بدون خطوط القص لتجهيز ماكينات الطباعة الملونة"
        >
          <Printer className={`w-4 h-4 ${activeMode === 'print' ? 'text-emerald-400' : ''}`} />
          <span>طبقة الطباعة</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md font-mono mr-1">
            ألوان فقط
          </span>
        </button>

        {/* Cut / Dieline Layer Tab */}
        <button
          onClick={() => onModeChange('cut')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeMode === 'cut'
              ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
          }`}
          title="عرض مسار سكين القص والشفرة لماكينات كاميو وسكايكت والليزر"
        >
          <Scissors className={`w-4 h-4 ${activeMode === 'cut' ? 'text-rose-400' : ''}`} />
          <span>مسارات القص</span>
          <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded-md font-mono mr-1">
            بلاتر Dieline
          </span>
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-400 px-3 py-1 bg-stone-900/60 rounded-xl border border-stone-800/60">
        <Layers className="w-3.5 h-3.5 text-gold-400" />
        <span>فصل الطبقات نشط في شجرة DOM</span>
      </div>
    </div>
  );
};
