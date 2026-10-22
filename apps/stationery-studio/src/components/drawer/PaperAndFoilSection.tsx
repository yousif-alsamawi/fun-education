import React from 'react';
import {
  Sparkles,
  Layers,
  Sun,
  ShieldCheck,
  Check
} from 'lucide-react';
import {
  FoilTargets,
  HotFoilType,
  PaperStockType,
  StudioState
} from '../../types/studio';

interface PaperAndFoilSectionProps {
  state: StudioState;
  onUpdateState: (updates: Partial<StudioState>) => void;
  onUpdateFoilTargets: (targets: Partial<FoilTargets>) => void;
}

const PAPER_STOCKS: {
  id: PaperStockType;
  nameAr: string;
  nameEn: string;
  badge: string;
  desc: string;
  colorSwatch: string;
}[] = [
  {
    id: 'cotton-300',
    nameAr: 'قطني بارز 300gsm',
    nameEn: 'Cold-Press Cotton Rag',
    badge: 'الأكثر طلباً',
    desc: 'ملمس ناعم بألياف خشنة طبيعية تحاكي الورق المصنوع يدوياً',
    colorSwatch: 'bg-[#FAF7F2] border-[#E8E2D8]'
  },
  {
    id: 'linen-weave',
    nameAr: 'كتان ملكي مضلع',
    nameEn: 'Linen Weave Stock',
    badge: 'كلاسيكي راقي',
    desc: 'نسيج خطوط متعامدة فخم يمنح الفخامة لحفلات الزفاف الملكية',
    colorSwatch: 'bg-[#F5F2EB] border-[#D9D3C7]'
  },
  {
    id: 'pearl-shimmer',
    nameAr: 'صدف لؤلؤي لامع',
    nameEn: 'Stardream Pearl',
    badge: 'بريق عاكس',
    desc: 'طبقة ميكرو-صدفية تعكس الإضاءة بنعومة عند تحريك الكرت',
    colorSwatch: 'bg-[#FFFDF7] border-[#EFE8D6]'
  },
  {
    id: 'silk-matte',
    nameAr: 'حريري ناعم مطفي',
    nameEn: 'Silk Matte 350gsm',
    badge: 'مظهر عصري',
    desc: 'سطح مخملي غير لامع مانع للبصمات مع ثبات ألوان فائق',
    colorSwatch: 'bg-[#F8F8FA] border-[#DDDDE5]'
  },
  {
    id: 'rustic-kraft',
    nameAr: 'كرافت طبيعي بري',
    nameEn: 'Rustic Earth Kraft',
    badge: 'طبيعي وبيئي',
    desc: 'ألياف خشبية دافئة بلون البني الطبيعي لتصاميم البوهو',
    colorSwatch: 'bg-[#D2B48C] border-[#B59872]'
  },
  {
    id: 'translucent-vellum',
    nameAr: 'فيلوم شفاف ناعم',
    nameEn: 'Translucent Vellum',
    badge: 'طبقة تغليف',
    desc: 'ورق شبه شفاف يوضع كغلاف ساحر أو بطاقة تفاصيل علوية',
    colorSwatch: 'bg-[#FFFFFF]/60 border-white/40'
  }
];

const FOIL_TYPES: {
  id: HotFoilType;
  nameAr: string;
  nameEn: string;
  gradientClass: string;
  borderColor: string;
}[] = [
  {
    id: 'gold-24k',
    nameAr: 'ذهب عيار 24 مرآة',
    nameEn: '24K Mirror Gold',
    gradientClass: 'from-[#BF953F] via-[#FCF6BA] to-[#AA771C]',
    borderColor: '#D4AF37'
  },
  {
    id: 'rose-gold',
    nameAr: 'ذهب وردي فاخر',
    nameEn: 'Brushed Rose Gold',
    gradientClass: 'from-[#B76E79] via-[#FADCE1] to-[#84434D]',
    borderColor: '#B76E79'
  },
  {
    id: 'platinum-silver',
    nameAr: 'فضة بلاتينية',
    nameEn: 'Platinum Silver',
    gradientClass: 'from-[#8E9BAE] via-[#FFFFFF] to-[#525F70]',
    borderColor: '#A1ACB9'
  },
  {
    id: 'antique-copper',
    nameAr: 'نحاس عتيق معتق',
    nameEn: 'Antique Copper',
    gradientClass: 'from-[#783F19] via-[#F0BD97] to-[#421E08]',
    borderColor: '#C88A5B'
  }
];

export const PaperAndFoilSection: React.FC<PaperAndFoilSectionProps> = ({
  state,
  onUpdateState,
  onUpdateFoilTargets
}) => {
  return (
    <div className="space-y-5 text-right font-cairo">
      {/* ====================================================================
          1. PHYSICAL PAPER STOCK & TACTILE TEXTURE SELECTOR
          ==================================================================== */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">
            محاكاة استوديو 300 DPI
          </span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-200">
            <span>نوع وخامة الورق الفاخر (Paper Stock)</span>
            <Layers className="w-3.5 h-3.5 text-gold-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {PAPER_STOCKS.map((stock) => {
            const isSelected = state.paperStock === stock.id;
            return (
              <button
                key={stock.id}
                onClick={() => onUpdateState({ paperStock: stock.id })}
                className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'border-gold-400 bg-gold-500/10 shadow-sm ring-1 ring-gold-400/30'
                    : 'border-stone-800 bg-[#191820] hover:border-stone-700'
                }`}
              >
                <div className="flex items-start justify-between w-full mb-1.5">
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                      isSelected ? 'bg-gold-500/25 text-gold-200' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {stock.badge}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border shadow-inner ${stock.colorSwatch} ${
                      isSelected ? 'scale-110 ring-2 ring-gold-400/40' : ''
                    }`}
                  />
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold transition-colors ${
                      isSelected ? 'text-gold-200' : 'text-stone-300'
                    }`}
                  >
                    {stock.nameAr}
                  </h4>
                  <p className="text-[10px] text-stone-400 leading-tight mt-0.5 line-clamp-2">
                    {stock.desc}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-gold-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ====================================================================
          2. BLIND LETTERPRESS & EMBOSSING + STUDIO LIGHTING
          ==================================================================== */}
      <div className="p-3 bg-[#191820] rounded-xl border border-stone-800 space-y-3">
        {/* Blind Letterpress Toggle */}
        <div className="flex items-center justify-between">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.enableLetterpressEmboss}
              onChange={(e) => onUpdateState({ enableLetterpressEmboss: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-gold-500"></div>
          </label>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-stone-200">
              <span>تأثير الحفر والبروز (Blind Letterpress)</span>
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            </div>
            <p className="text-[10px] text-stone-400 mt-0.5">
              محاكاة غائرة للإطارات والزخارف بدون حبر (حفر بارز 3D)
            </p>
          </div>
        </div>

        {/* 3D Lighting Angle Slider */}
        <div className="pt-2 border-t border-stone-800/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono text-gold-400">
              {state.lightingElevation || 60}° زاوية الضوء
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-300">
              <span>إضاءة الاستوديو وزاوية الظل</span>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
          <input
            type="range"
            min={30}
            max={85}
            step={5}
            value={state.lightingElevation || 60}
            onChange={(e) => onUpdateState({ lightingElevation: Number(e.target.value) })}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
        </div>
      </div>

      {/* ====================================================================
          3. 7-STOP SPECULAR HOT-FOIL STAMPING ENGINE
          ==================================================================== */}
      <div className="p-3 bg-[#191820] rounded-xl border border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.isFoilEnabled}
              onChange={(e) => onUpdateState({ isFoilEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-gold-500"></div>
          </label>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-stone-200">
              <span>البصمة والختم الحراري (Hot-Foil Stamping)</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-stone-400 mt-0.5">
              محرك تدرجات معدنية عاكسة بـ 7 محطات لونية وحواف مشطوفة
            </p>
          </div>
        </div>

        {state.isFoilEnabled && (
          <div className="space-y-3 pt-2 border-t border-stone-800/80 animate-in fade-in duration-200">
            {/* Metallic Foil Color Swatches */}
            <div>
              <span className="text-[11px] font-bold text-stone-300 block mb-1.5">
                لون ولمعان الفويل المعدني (7-Stop Shader):
              </span>
              <div className="grid grid-cols-2 gap-2">
                {FOIL_TYPES.map((foil) => {
                  const isSelected = state.hotFoilType === foil.id;
                  return (
                    <button
                      key={foil.id}
                      onClick={() => onUpdateState({ hotFoilType: foil.id })}
                      className={`p-2 rounded-xl border text-right transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-gold-400 bg-gold-500/15 shadow-sm'
                          : 'border-stone-800 bg-[#15141B] hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {isSelected && <Check className="w-3 h-3 text-gold-400" />}
                        <div
                          className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${foil.gradientClass} border shadow-sm`}
                          style={{ borderColor: foil.borderColor }}
                        />
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold block text-stone-200">
                          {foil.nameAr}
                        </span>
                        <span className="text-[9px] text-stone-400 font-mono">
                          {foil.nameEn}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selective Foil Targets */}
            <div>
              <span className="text-[11px] font-bold text-stone-300 block mb-1.5">
                تطبيق البصمة على العناصر (Foil Target Selective Layers):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center justify-between p-2 rounded-lg bg-[#15141B] border border-stone-800/80 cursor-pointer hover:border-stone-700">
                  <input
                    type="checkbox"
                    checked={state.foilTargets?.monogram ?? true}
                    onChange={(e) => onUpdateFoilTargets({ monogram: e.target.checked })}
                    className="rounded bg-stone-800 border-stone-700 text-gold-500 focus:ring-0"
                  />
                  <span className="text-[11px] text-stone-300">شعار المونوغرام</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-[#15141B] border border-stone-800/80 cursor-pointer hover:border-stone-700">
                  <input
                    type="checkbox"
                    checked={state.foilTargets?.names ?? true}
                    onChange={(e) => onUpdateFoilTargets({ names: e.target.checked })}
                    className="rounded bg-stone-800 border-stone-700 text-gold-500 focus:ring-0"
                  />
                  <span className="text-[11px] text-stone-300">أسماء العروسين</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-[#15141B] border border-stone-800/80 cursor-pointer hover:border-stone-700">
                  <input
                    type="checkbox"
                    checked={state.foilTargets?.frame ?? false}
                    onChange={(e) => onUpdateFoilTargets({ frame: e.target.checked })}
                    className="rounded bg-stone-800 border-stone-700 text-gold-500 focus:ring-0"
                  />
                  <span className="text-[11px] text-stone-300">الإطار والحدود</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-[#15141B] border border-stone-800/80 cursor-pointer hover:border-stone-700">
                  <input
                    type="checkbox"
                    checked={state.foilTargets?.greeting ?? false}
                    onChange={(e) => onUpdateFoilTargets({ greeting: e.target.checked })}
                    className="rounded bg-stone-800 border-stone-700 text-gold-500 focus:ring-0"
                  />
                  <span className="text-[11px] text-stone-300">عبارة الترحيب</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
