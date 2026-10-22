import React, { useState } from 'react';
import { Download, Scissors, Printer, Check, ChevronUp, FileCode, Image as ImageIcon, BookOpen } from 'lucide-react';
import { exportCutLinesSvg, exportPrintPng, exportPrintSvg, triggerDirectPrint } from '../../utils/exportEngine';

interface ExportEngineBarProps {
  svgRef: React.RefObject<SVGSVGElement>;
  onOpenAssemblyGuide: () => void;
  onOpenImpositionModal?: () => void;
}

export const ExportEngineBar: React.FC<ExportEngineBarProps> = ({
  svgRef,
  onOpenAssemblyGuide,
  onOpenImpositionModal
}) => {
  const [isExportingPrint, setIsExportingPrint] = useState(false);
  const [isExportingCut, setIsExportingCut] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);
  const [cutSuccess, setCutSuccess] = useState(false);
  const [showPrintMenu, setShowPrintMenu] = useState(false);

  // 1. Export Print File (High-Res 300 DPI PNG)
  const handleExportPrintPng = async () => {
    if (!svgRef.current) return;
    setIsExportingPrint(true);
    setShowPrintMenu(false);
    try {
      await exportPrintPng(svgRef.current, 'Huroof-Studio-Print-300DPI.png');
      setPrintSuccess(true);
      setTimeout(() => setPrintSuccess(false), 2500);
    } catch (err) {
      console.error('Print export failed:', err);
    } finally {
      setIsExportingPrint(false);
    }
  };

  // Export Print Vector SVG
  const handleExportPrintSvg = () => {
    if (!svgRef.current) return;
    setShowPrintMenu(false);
    exportPrintSvg(svgRef.current, 'Huroof-Studio-VectorPrint.svg');
    setPrintSuccess(true);
    setTimeout(() => setPrintSuccess(false), 2500);
  };

  // Direct Browser Print
  const handleDirectPrint = () => {
    if (!svgRef.current) return;
    setShowPrintMenu(false);
    triggerDirectPrint(svgRef.current);
  };

  // 2. Export Cut Lines File (Cameo / Skycut / Cricut Hairline Vector SVG)
  const handleExportCutLines = () => {
    if (!svgRef.current) return;
    setIsExportingCut(true);
    try {
      exportCutLinesSvg(svgRef.current, 'Huroof-Studio-Plotter-Cutlines.svg');
      setCutSuccess(true);
      setTimeout(() => setCutSuccess(false), 2500);
    } catch (err) {
      console.error('Cut lines export failed:', err);
    } finally {
      setIsExportingCut(false);
    }
  };

  return (
    <footer className="h-20 bg-[#16151B]/95 backdrop-blur-md border-t border-stone-800/90 px-6 flex items-center justify-between z-30 select-none shadow-2xl">
      {/* Left info: Studio production engine status */}
      <div className="hidden lg:flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gold-500/15 text-gold-400 flex items-center justify-center border border-gold-500/30">
          <Download className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-200">محرك التصدير المطبعي المتجهي</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono">
              300 DPI جاهز للإنتاج
            </span>
          </div>
          <p className="text-[11px] text-stone-400">
            فصل تام بين طبقة الطباعة الملونة وطبقة شفرة القص لماكينات البلتر (Cameo / Skycut)
          </p>
        </div>
      </div>

      {/* Right side: 3 Distinct Production Action Buttons */}
      <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end flex-wrap sm:flex-nowrap">
        {/* BUTTON: DUPLEX IMPOSITION MODAL */}
        {onOpenImpositionModal && (
          <button
            onClick={onOpenImpositionModal}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gold-500/20 via-amber-500/25 to-gold-600/20 hover:from-gold-500/30 hover:to-amber-500/35 text-gold-200 border border-gold-400/50 font-bold text-xs sm:text-sm transition-all active:scale-[0.98] shadow-lg shadow-gold-500/10"
            title="تجهيز فرخ طباعة متطابق وجه وقفا A4 / A3 مع علامات الليزر"
          >
            <span>🖨️</span>
            <span>تجهيز فرخ الطباعة (A4 / A3 Duplex)</span>
          </button>
        )}

        {/* BUTTON 3: ASSEMBLY GUIDE MODAL */}
        <button
          onClick={onOpenAssemblyGuide}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-semibold text-xs border border-stone-700 transition-all active:scale-[0.98] shadow-md"
          title="عرض دليل التركيب والتجميع خطوة بخطوة للنموذج الحالي"
        >
          <BookOpen className="w-4 h-4 text-gold-400" />
          <span>طريقة التركيب</span>
        </button>

        {/* BUTTON 1: EXPORT PRINT FILE (NO CUT LINES) */}
        <div className="relative">
          <div className="flex items-center">
            <button
              onClick={handleExportPrintPng}
              disabled={isExportingPrint}
              className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-r-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-[0.98] border border-emerald-400/40"
              title="تحميل ملف الطباعة عالي الدقة بدون أي خطوط قص"
            >
              {printSuccess ? (
                <Check className="w-4 h-4 text-emerald-200 stroke-[3]" />
              ) : (
                <Printer className="w-4 h-4 text-emerald-200" />
              )}
              <span>تحميل ملف الطباعة (High-Res Print)</span>
              <span className="hidden sm:inline-block text-[10px] bg-black/25 text-emerald-200 px-1.5 py-0.5 rounded mr-1">
                بدون خطوط قص
              </span>
            </button>

            {/* Sub-menu trigger for SVG vector or direct print */}
            <button
              onClick={() => setShowPrintMenu(!showPrintMenu)}
              className="px-2.5 py-3 rounded-l-xl bg-emerald-800/90 hover:bg-emerald-700 text-emerald-200 border-y border-l border-emerald-400/40 transition-colors"
              title="خيارات تصدير الطباعة الإضافية"
            >
              <ChevronUp className={`w-4 h-4 transition-transform ${showPrintMenu ? '' : 'rotate-180'}`} />
            </button>
          </div>

          {/* Print options dropdown */}
          {showPrintMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-56 bg-[#1B1A22] border border-stone-700 rounded-xl shadow-2xl p-1.5 space-y-1 z-50">
              <button
                onClick={handleExportPrintPng}
                className="w-full flex items-center gap-2 p-2 rounded-lg text-xs text-stone-200 hover:bg-stone-800 transition-colors text-right"
              >
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <div className="text-right">
                  <div className="font-semibold">صورة PNG فائقة الدقة (300 DPI)</div>
                  <div className="text-[10px] text-stone-400">للأجهزة والمطابع الرقمية</div>
                </div>
              </button>
              <button
                onClick={handleExportPrintSvg}
                className="w-full flex items-center gap-2 p-2 rounded-lg text-xs text-stone-200 hover:bg-stone-800 transition-colors text-right"
              >
                <FileCode className="w-4 h-4 text-teal-400" />
                <div className="text-right">
                  <div className="font-semibold">ملف SVG المتجهي للطباعة</div>
                  <div className="text-[10px] text-stone-400">لبرامج Illustrator و InDesign</div>
                </div>
              </button>
              <button
                onClick={handleDirectPrint}
                className="w-full flex items-center gap-2 p-2 rounded-lg text-xs text-stone-200 hover:bg-stone-800 transition-colors text-right"
              >
                <Printer className="w-4 h-4 text-gold-400" />
                <div className="text-right">
                  <div className="font-semibold">طباعة مباشرة (Direct 1:1 Scale)</div>
                  <div className="text-[10px] text-stone-400">معاينة نافذة الطباعة بالحجم الحقيقي</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* BUTTON 2: EXPORT CUT LINES ONLY */}
        <button
          onClick={handleExportCutLines}
          disabled={isExportingCut}
          className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-gradient-to-r from-rose-700 via-pink-700 to-rose-800 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-[0.98] border border-rose-400/40"
          title="تحميل مسارات وسكاكين القص والتفريغ لماكينات البلتر"
        >
          {cutSuccess ? (
            <Check className="w-4 h-4 text-rose-200 stroke-[3]" />
          ) : (
            <Scissors className="w-4 h-4 text-rose-200" />
          )}
          <span>تحميل ملف القص والتفريغ (SVG Vector Cut Lines)</span>
          <span className="hidden sm:inline-block text-[10px] bg-black/25 text-rose-200 px-1.5 py-0.5 rounded mr-1 font-mono">
            Skycut/Cameo
          </span>
        </button>
      </div>
    </footer>
  );
};
