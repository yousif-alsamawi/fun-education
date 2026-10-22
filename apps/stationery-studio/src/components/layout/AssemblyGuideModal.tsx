import React, { useState } from 'react';
import { X, Sparkles, Layers, Wrench, CircleDot, Printer, Scissors, FoldHorizontal, ShieldCheck } from 'lucide-react';
import { MasterTemplateId } from '../../types/studio';
import { TEMPLATE_ASSEMBLY_GUIDES, MASTER_TEMPLATES } from '../../data/templates';

interface AssemblyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTemplateId: MasterTemplateId;
}

export const AssemblyGuideModal: React.FC<AssemblyGuideModalProps> = ({
  isOpen,
  onClose,
  activeTemplateId
}) => {
  const [selectedTemplateTab, setSelectedTemplateTab] = useState<MasterTemplateId>(activeTemplateId);
  const [explodeDistance, setExplodeDistance] = useState<number>(45);

  if (!isOpen) return null;

  const defaultGuide = {
    subtitle: 'دليل قص وتجهيز بطاقات ودعوات استوديو حروف الفاخرة',
    diagramPieces: [
      { name: 'القطعة الأساسية: كرت الدعوة', desc: 'بطاقة المناسبة الرئيسية مقصوصة بدقة مليمترية متطابقة', color: 'border-gold-500/40 bg-gold-500/10' },
      { name: 'إطار الفويل المذهب', desc: 'إطار بارز بالبصمة الذهبية الحارة يحاكي أسلوب دور الطباعة الإيطالية', color: 'border-amber-500/40 bg-amber-500/10' },
      { name: 'الختم والشعار الملكي', desc: 'شعار العروسين المحفور في ظهر الكرت أو ختم الشمع', color: 'border-emerald-500/40 bg-emerald-500/10' }
    ],
    steps: [
      { step: 1, title: 'طباعة الوجهين بدقة 300 DPI', description: 'اطبع الوجه الأمامي والقفا على ورق كوشيه قلوسي أو كوتون 350 GSM.', tip: 'تطابق 0.0 مم عبر مسار الفرخ المزدوج يضمن تمركز القوس تماماً.' },
      { step: 2, title: 'القص الكونتوري المتجهي', description: 'أرسل مسار القص الأحمر 0.75pt للبلاتر ليتتبع انحناء المحيط بدون تعرجات.', tip: 'اضبط البلتر على سرعة مناسبة لتفادي تشريف الزوايا.' },
      { step: 3, title: 'ريجة وتجعيد خطوط الطي', description: 'نفذ خطوط الريجة الزرقاء باستخدام عجلة التجعيد لمنع تشقق الورق المقوى.', tip: 'استخدم خط الريجة المنقط بضغط متوسط.' },
      { step: 4, title: 'التجميع النهائي والختم الشمعي', description: 'ثبت البطاقات وأغلق المظروف أو المطوية بشريطة ستان وختم شمعي نافر.', tip: 'جاهز لوضعه في المغلف الملكي أو تقديمه للمدعوين.' }
    ],
    machineSpecs: [
      { label: 'عمق الشفرة (Blade)', val: '3 - 3.5' },
      { label: 'قوة القص (Force)', val: '28' },
      { label: 'السرعة (Speed)', val: '5' },
      { label: 'الورق الموصى به', val: 'قطني 300-350 GSM' }
    ]
  };

  const currentGuide = TEMPLATE_ASSEMBLY_GUIDES[selectedTemplateTab] || TEMPLATE_ASSEMBLY_GUIDES['royal-arch'] || defaultGuide;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#16151C] border border-stone-800 rounded-3xl shadow-luxury-lg overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-stone-800 bg-gradient-to-r from-[#21151A] via-[#1B1922] to-[#16151C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-stone-900 shadow-md">
              <Sparkles className="w-5 h-5 fill-stone-900" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <span>دليل التجميع ثلاثي الأبعاد والإنتاج (3D Interactive Assembly Guide)</span>
                <span className="text-[10px] bg-gold-400/20 text-gold-300 border border-gold-400/30 px-2 py-0.5 rounded-full font-mono">
                  معايير استوديو حروف
                </span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {currentGuide.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Selector Tabs in Modal */}
        <div className="px-6 py-2.5 bg-[#121117] border-b border-stone-800 flex items-center gap-2 overflow-x-auto">
          {MASTER_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setSelectedTemplateTab(tmpl.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedTemplateTab === tmpl.id
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
              }`}
            >
              {tmpl.isMultiPiece && <span>📦</span>}
              <span>{tmpl.nameAr}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* ====================================================================
              1. INTERACTIVE 3D EXPLODED ISOMETRIC DIAGRAM
              ==================================================================== */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-gold-400" />
                <span>المجسم التفكيكي ثلاثي الأبعاد (3D Exploded Isometric View):</span>
              </h4>
              <span className="text-[10px] bg-gold-500/15 text-gold-300 border border-gold-500/30 px-2 py-0.5 rounded-full font-mono">
                محاكاة فيزيائية واقعية ✦
              </span>
            </div>

            <div
              className="relative h-64 w-full bg-[#111016] rounded-3xl border border-stone-800/80 overflow-hidden flex items-center justify-center select-none"
              style={{ perspective: '1200px' }}
            >
              {/* Radial backdrop glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, #D4AF3720 0%, transparent 70%)'
                }}
              />

              {/* 3D Isometric Rotating Group */}
              <div
                className="relative transition-transform duration-300 ease-out"
                style={{
                  width: '210px',
                  height: '270px',
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(55deg) rotateZ(-35deg)'
                }}
              >
                {/* Layer 1: Base Jacket / Euro Envelope / Pocket */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1B291E] via-[#101D14] to-[#0A130C] border border-[#2D5A36] flex flex-col justify-between p-4 transition-transform duration-300"
                  style={{
                    transform: `translateZ(${explodeDistance * -0.7}px)`,
                    boxShadow: `0 ${explodeDistance * 0.4 + 10}px ${explodeDistance * 0.8 + 25}px rgba(0,0,0,0.65)`
                  }}
                >
                  <div className="flex justify-between items-center text-[10px] font-bold text-emerald-300">
                    <span>الطبقة 1: الغلاف / المظروف</span>
                    <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500/20 rounded">خارجي</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono text-center">
                    Euro-Flap Envelope Jacket
                  </div>
                  <div className="text-[8px] text-emerald-600 font-mono text-center">
                    350 GSM Dark Green Stock
                  </div>
                </div>

                {/* Layer 2: Main Arched Invitation Card with Gold Foil */}
                <div
                  className="absolute inset-2 rounded-xl bg-gradient-to-br from-[#FAF8F5] to-[#EAE5DA] border-2 border-[#D4AF37] flex flex-col justify-between p-3.5 transition-transform duration-300"
                  style={{
                    transform: `translateZ(${explodeDistance * 0.8}px)`,
                    boxShadow: `0 ${explodeDistance * 0.4 + 8}px ${explodeDistance * 0.8 + 18}px rgba(0,0,0,0.4)`
                  }}
                >
                  <div className="flex justify-between items-center text-[9px] font-bold text-stone-800">
                    <span>الطبقة 2: كرت التفاصيل</span>
                    <span className="text-gold-700 font-bold">24K FOIL</span>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="w-8 h-8 rounded-full border border-gold-500/50 mx-auto flex items-center justify-center text-[9px] text-gold-700 font-serif font-bold">
                      S & K
                    </div>
                    <div className="font-serif text-stone-900 font-bold text-xs tracking-wider">
                      سارة & خالد
                    </div>
                  </div>

                  <div className="text-[8px] text-stone-500 text-center font-mono">
                    Cotton Rag 300 GSM • Double-Sided
                  </div>
                </div>

                {/* Layer 3: Floating 3D Wax Seal & Satin Ribbon */}
                <div
                  className="absolute inset-x-8 top-10 h-16 rounded-xl flex items-center justify-center transition-transform duration-300 pointer-events-none"
                  style={{
                    transform: `translateZ(${explodeDistance * 2.2}px)`
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B1E3F] to-[#58111A] border-2 border-[#D4AF37] flex items-center justify-center text-gold-300 font-serif font-bold text-xs shadow-2xl">
                    S & K
                  </div>
                </div>
              </div>

              {/* Floating Interactive Explode Slider Controller */}
              <div className="absolute bottom-3 left-4 right-4 bg-[#181720]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-800 flex items-center justify-between gap-4 shadow-xl">
                <span className="text-xs font-bold text-gold-300 flex items-center gap-1.5 shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>حرك لدمج وتفكيك الطبقات 3D:</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={explodeDistance}
                  onChange={(e) => setExplodeDistance(parseInt(e.target.value))}
                  className="w-full accent-gold-400 cursor-pointer h-1.5 bg-stone-700 rounded-lg"
                />
                <span className="text-xs font-mono text-stone-200 font-bold shrink-0">
                  {explodeDistance === 0 ? 'مدمجة 100%' : `${explodeDistance}mm فراغ`}
                </span>
              </div>
            </div>
          </div>

          {/* ====================================================================
              2. PIECE-BY-PIECE SCHEMATIC BREAKDOWN
              ==================================================================== */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1E1C26] to-[#121117] border border-stone-800">
            <h4 className="text-xs font-bold text-stone-300 mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              <span>العناصر والقطع المكونة للنموذج:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentGuide.diagramPieces.map((piece, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border text-right space-y-1.5 ${piece.color}`}
                >
                  <div className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono">
                      {i + 1}
                    </span>
                    <span>{piece.name}</span>
                  </div>
                  <div className="text-[11px] text-stone-400 leading-relaxed">{piece.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ====================================================================
              3. ILLUSTRATED STEP-BY-STEP PRODUCTION PHASES
              ==================================================================== */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5 text-gold-400" />
              <span>المراحل الفنية الأربع للتنفيذ في المطبعة:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  step: 1,
                  title: 'الطباعة المزدوجة المتطابقة (300 DPI Duplex)',
                  desc: 'اطبع الوجه الأمامي والقفا على ورق كوشيه عالي الكثافة أو كوتون 350 GSM بتطابق تام لعلامات التسجيل.',
                  icon: <Printer className="w-4 h-4 text-emerald-400" />,
                  tip: 'استخدم خط الفرخ المزدوج 1:1 لضمان عدم إزاحة القوس الخلفي عن الأمامي.'
                },
                {
                  step: 2,
                  title: 'القص الكونتوري الآلي (Cameo / Skycut / Laser)',
                  desc: 'أرسل مسار القص الأحمر 0.75pt لبلاتر القص مع تشغيل الكاميرا البصرية لقراءة علامات التسجيل الأربع.',
                  icon: <Scissors className="w-4 h-4 text-rose-400" />,
                  tip: 'شفرة حادة جديدة تضمن دوران القمة بدون أي تشريف أو نتف للألياف.'
                },
                {
                  step: 3,
                  title: 'التجعيد والريجة على الخطوط الزرقاء (Creasing & Scoring)',
                  desc: 'استخدم أداة التجعيد لعصر خطوط الطي المنقطة الزرقاء قبل الثني لحماية ألياف الورق من التشقق.',
                  icon: <FoldHorizontal className="w-4 h-4 text-blue-400" />,
                  tip: 'ضغط التجعيد المزدوج 02 يمنح الطي انسيابية تضاهي المنتجات الأوروبية.'
                },
                {
                  step: 4,
                  title: 'التجميع النهائي والختم الشمعي (Finishing & Wax Seal)',
                  desc: 'ثبت البطاقات مع شريطة الستان وصُب الختم الشمعي الملكي بقطر 25-30 مم في الموضع المخصص.',
                  icon: <ShieldCheck className="w-4 h-4 text-gold-400" />,
                  tip: 'صب الشمع بدرجة حرارة معتدلة للحصول على حافة شمعية متموجة منتفخة ومتقنة.'
                }
              ].map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-2xl bg-[#191821] border border-stone-800 space-y-2.5 hover:border-gold-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 text-xs font-bold flex items-center justify-center font-mono">
                        {step.step}
                      </span>
                      <h5 className="text-xs font-bold text-stone-200">{step.title}</h5>
                    </div>
                    {step.icon}
                  </div>

                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="p-2 rounded-xl bg-gold-500/10 border border-gold-500/20 text-[10px] text-gold-300 flex items-start gap-1.5">
                    <Sparkles className="w-3 h-3 text-gold-400 shrink-0 mt-0.5" />
                    <span>{step.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ====================================================================
              4. MACHINE CUTTER SPECIFICATIONS
              ==================================================================== */}
          <div className="p-4 rounded-2xl bg-[#131218] border border-stone-800 space-y-2.5">
            <div className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
              <CircleDot className="w-3.5 h-3.5 text-emerald-400" />
              <span>معايير ضبط ماكينات القص المتجهي (Cameo / Skycut / Cricut Specs):</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              {currentGuide.machineSpecs.map((spec, i) => (
                <div key={i} className="p-2.5 bg-[#1A1922] rounded-xl border border-stone-800">
                  <div className="text-stone-400">{spec.label}</div>
                  <div className="text-stone-200 font-bold font-mono">{spec.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#17161D] flex items-center justify-between">
          <span className="text-xs text-stone-400">
            يمكنك تحميل ملفات القص والطباعة مباشرة من زر تصدير PDF في الشريط السفلي
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-stone-900 font-bold text-xs transition-all shadow-md"
          >
            فهمت، متابعة التصميم
          </button>
        </div>
      </div>
    </div>
  );
};
