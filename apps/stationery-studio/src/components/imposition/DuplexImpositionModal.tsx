import React, { useState, useRef } from 'react';
import {
  Printer,
  Download,
  Scissors,
  Check,
  X,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  FileSpreadsheet,
  FileDown,
  Loader2
} from 'lucide-react';
import { StudioState } from '../../types/studio';
import { TEMPLATE_DIELINES } from '../../utils/templateDielines';
import { triggerDownload, exportDuplexImpositionPdf } from '../../utils/exportEngine';
import { FrontCardFacePiece } from '../canvas/FrontCardFacePiece';
import { BackCardFacePiece } from '../canvas/BackCardFacePiece';
import { StudioDefsLibrary } from '../canvas/StudioDefsLibrary';

interface DuplexImpositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: StudioState;
}

export type SheetSize = 'A4' | 'A3';
export type SheetOrientation = 'portrait' | 'landscape';
export type ActiveImpositionTab = 'front' | 'back' | 'cut' | 'specs';
export type PaperStockChoice = 'glossy' | 'cotton';
export type PackPresetChoice = 'auto' | 'standard' | 'medium' | 'economy' | 'tags' | '4' | '6' | '8' | '10';

export const DuplexImpositionModal: React.FC<DuplexImpositionModalProps> = ({
  isOpen,
  onClose,
  state
}) => {
  const [sheetSize, setSheetSize] = useState<SheetSize>('A4');
  const [orientation, setOrientation] = useState<SheetOrientation>('portrait');
  const [paperStock, setPaperStock] = useState<PaperStockChoice>('glossy');
  const [packPreset, setPackPreset] = useState<PackPresetChoice>('auto');
  const [activeTab, setActiveTab] = useState<ActiveImpositionTab>('front');
  const [zoom, setZoom] = useState(0.85);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  // Active Viewport Refs
  const frontSvgRef = useRef<SVGSVGElement>(null);
  const backSvgRef = useRef<SVGSVGElement>(null);
  const cutSvgRef = useRef<SVGSVGElement>(null);

  // Offscreen Hidden Refs (Always mounted for instantaneous multi-page PDF generation)
  const hiddenFrontSvgRef = useRef<SVGSVGElement>(null);
  const hiddenBackSvgRef = useRef<SVGSVGElement>(null);
  const hiddenCutSvgRef = useRef<SVGSVGElement>(null);

  if (!isOpen) return null;

  // 1. Physical Sheet Dimensions in Millimeters
  const baseWidthMM = sheetSize === 'A4' ? 210 : 297;
  const baseHeightMM = sheetSize === 'A4' ? 297 : 420;

  const sheetW = orientation === 'portrait' ? baseWidthMM : baseHeightMM;
  const sheetH = orientation === 'portrait' ? baseHeightMM : baseWidthMM;

  // 2. Dynamic Auto-Packing Math for A4 vs. A3 (Filling 88% - 94% of printable sheet)
  const marginMM = sheetSize === 'A3' ? 6 : 8; // Optical margin
  const bleedMM = 2.5; // 2.5mm bleed
  const gutterMM = 2.0; // 2mm cutting gutter

  let cardW = 95;
  let cardH = 135;
  let cols = 2;
  let rows = 2;

  const isA3 = sheetSize === 'A3';

  if (packPreset === 'auto') {
    // Smart Dynamic Best Fit: ALWAYS pack double on A3 (8 to 16 cards)
    if (isA3) {
      if (orientation === 'landscape') {
        // Landscape A3 (420 × 297 mm): 4 cols × 2 rows = 8 large cards (or 4x3 = 12)
        cardW = 92;
        cardH = 132;
        cols = 4;
        rows = 2; // 8 cards on A3
      } else {
        // Portrait A3 (297 × 420 mm): 3 cols × 3 rows = 9 cards
        cardW = 88;
        cardH = 125;
        cols = 3;
        rows = 3; // 9 cards on A3
      }
    } else {
      // A4: 4 cards (portrait) or 6 cards (landscape)
      if (orientation === 'landscape') {
        cardW = 85;
        cardH = 120;
        cols = 3;
        rows = 2; // 6 cards on A4 landscape
      } else {
        cardW = 95;
        cardH = 135;
        cols = 2;
        rows = 2; // 4 cards on A4 portrait
      }
    }
  } else if (packPreset === 'standard' || packPreset === '4') {
    if (isA3) {
      if (orientation === 'landscape') {
        cardW = 92;
        cardH = 132;
        cols = 4;
        rows = 2; // 8 cards on A3 landscape
      } else {
        cardW = 88;
        cardH = 125;
        cols = 3;
        rows = 3; // 9 cards on A3 portrait
      }
    } else {
      cardW = 95;
      cardH = 135;
      cols = 2;
      rows = 2; // 4 cards on A4
    }
  } else if (packPreset === 'medium' || packPreset === '6') {
    cardW = 85;
    cardH = 120;
    if (isA3) {
      if (orientation === 'landscape') {
        cols = 4;
        rows = 3; // 12 cards on A3 landscape
      } else {
        cols = 3;
        rows = 4; // 12 cards on A3 portrait
      }
    } else {
      if (orientation === 'landscape') {
        cols = 3;
        rows = 2; // 6 cards on A4 landscape
      } else {
        cols = 2;
        rows = 3; // 6 cards on A4 portrait
      }
    }
  } else if (packPreset === 'economy' || packPreset === '8') {
    cardW = 65;
    cardH = 95;
    if (isA3) {
      cols = 4;
      rows = 4; // 16 cards on A3
    } else {
      if (orientation === 'landscape') {
        cols = 4;
        rows = 2; // 8 cards on A4 landscape
      } else {
        cols = 2;
        rows = 4; // 8 cards on A4 portrait
      }
    }
  } else if (packPreset === 'tags' || packPreset === '10') {
    cardW = 50;
    cardH = 82;
    if (isA3) {
      if (orientation === 'landscape') {
        cols = 6;
        rows = 4; // 24 cards on A3 landscape
      } else {
        cols = 4;
        rows = 6; // 24 cards on A3 portrait
      }
    } else {
      if (orientation === 'landscape') {
        cols = 5;
        rows = 2; // 10 cards on A4 landscape
      } else {
        cols = 2;
        rows = 5; // 10 cards on A4 portrait
      }
    }
  }

  const cellW = cardW + 2 * bleedMM;
  const cellH = cardH + 2 * bleedMM;
  const totalCards = cols * rows;

  // Center the grid on the sheet
  const totalGridW = cols * cellW + (cols - 1) * gutterMM;
  const totalGridH = rows * cellH + (rows - 1) * gutterMM;
  const startX = Math.max(marginMM, (sheetW - totalGridW) / 2);
  const startY = Math.max(marginMM, (sheetH - totalGridH) / 2);

  // Efficiency calculation (percentage of sheet area utilized)
  const cardArea = cardW * cardH * totalCards;
  const sheetArea = sheetW * sheetH;
  const efficiency = Math.min(94, Math.round((cardArea / sheetArea) * 100));

  // Optical Registration L-Marks Dimensions (14mm × 14mm, 1mm thickness)
  const regSize = 14;
  const regThickness = 1.0;

  const geom = TEMPLATE_DIELINES[state.activeTemplateId] || TEMPLATE_DIELINES['royal-arch'];

  // Front card piece renderer (Unified 100% symmetric FrontCardFacePiece)
  const renderCardFront = () => <FrontCardFacePiece state={state} />;

  // Export handlers
  const handleDownloadSvg = (ref: React.RefObject<SVGSVGElement>, filename: string) => {
    if (!ref.current) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(ref.current);
    triggerDownload(svgStr, filename, 'image/svg+xml');
    setCopySuccess(filename);
    setTimeout(() => setCopySuccess(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Direct 3-Page Consolidated PDF Download
  const handleDirectPdfDownload = async () => {
    try {
      setIsExportingPdf(true);
      setExportStatus('جاري تهيئة محرك PDF المطبعي 300 DPI...');

      const frontSvg = hiddenFrontSvgRef.current || frontSvgRef.current;
      const backSvg = hiddenBackSvgRef.current || backSvgRef.current;
      const cutSvg = hiddenCutSvgRef.current || cutSvgRef.current;

      if (!frontSvg || !backSvg) {
        throw new Error('تعذر العثور على عناصر الطباعة المتجهية');
      }

      await exportDuplexImpositionPdf({
        frontSvg,
        backSvg,
        cutSvg,
        sheetW,
        sheetH,
        filename: `Huroof_Print_Sheet_${sheetSize}_${cols}x${rows}_${totalCards}Cards.pdf`,
        onProgress: (status) => setExportStatus(status)
      });

      setCopySuccess('تم تنزيل ملف PDF المطبعي الموحد بنجاح!');
      setTimeout(() => setCopySuccess(null), 3000);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('حدث خطأ أثناء تصدير ملف PDF. يرجى استخدام زر الطباعة المباشرة.');
    } finally {
      setIsExportingPdf(false);
      setExportStatus(null);
    }
  };

  // Auto-fit Whole Sheet in viewport
  const handleFitWholeSheet = () => {
    if (sheetSize === 'A3') {
      setZoom(orientation === 'portrait' ? 0.52 : 0.62);
    } else {
      setZoom(orientation === 'portrait' ? 0.78 : 0.88);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-black/90 backdrop-blur-2xl select-none animate-fadeIn">
      <div className="w-full max-w-[96vw] h-[96vh] bg-[#14131A] border border-gold-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100 font-cairo">
        {/* ====================================================================
            HEADER
            ==================================================================== */}
        <header className="px-6 py-3.5 bg-[#181720] border-b border-stone-800/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 via-amber-500 to-amber-700 flex items-center justify-center text-stone-950 shadow-gold-glow">
              <Printer className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-sm sm:text-base font-bold text-stone-100">
                  هندسة وتجهيز فرخ طباعة الدعوات المزدوج (A4 / A3 Duplex Imposition)
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  تطابق 0.0mm Shift
                </span>
                <span className="text-[10px] bg-gold-500/20 text-gold-300 border border-gold-500/30 px-2 py-0.5 rounded-full font-mono">
                  300 DPI Commercial
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                محرك التوزيع المطبعي المتجهي: فرخ الوجه، فرخ القفا المعكوس، ومسارات قص وتفريغ البلتر (Skycut C16 & Cameo 5)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* ====================================================================
            CONTROL BAR: Sheet Size, Orientation, Paper, Bleed Math
            ==================================================================== */}
        <div className="px-6 py-2.5 bg-[#1B1A24] border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left Controls: Sheet size & Orientation */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Sheet Size */}
            <div className="flex items-center bg-[#131218] p-1 rounded-xl border border-stone-800">
              <span className="text-stone-400 px-2 font-semibold">مقاس الفرخ:</span>
              <button
                onClick={() => setSheetSize('A4')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  sheetSize === 'A4'
                    ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                A4 (210×297 مم)
              </button>
              <button
                onClick={() => setSheetSize('A3')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  sheetSize === 'A3'
                    ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                A3 (297×420 مم)
              </button>
            </div>

            {/* Orientation */}
            <div className="flex items-center bg-[#131218] p-1 rounded-xl border border-stone-800">
              <button
                onClick={() => setOrientation('portrait')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                  orientation === 'portrait'
                    ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                طولي (Portrait)
              </button>
              <button
                onClick={() => setOrientation('landscape')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                  orientation === 'landscape'
                    ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                عرضي (Landscape)
              </button>
            </div>

            {/* Paper Stock Finish */}
            <div className="flex items-center bg-[#131218] p-1 rounded-xl border border-stone-800">
              <span className="text-stone-400 px-2 font-semibold">خامة الورق:</span>
              <button
                onClick={() => setPaperStock('glossy')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                  paperStock === 'glossy'
                    ? 'bg-amber-500/25 text-amber-300 border border-amber-400/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                كوشيه قلوسي وجهين
              </button>
              <button
                onClick={() => setPaperStock('cotton')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                  paperStock === 'cotton'
                    ? 'bg-amber-500/25 text-amber-300 border border-amber-400/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                قطني مطفي 350 GSM
              </button>
            </div>

            {/* Dynamic Density / Packing Preset Selector */}
            <div className="flex items-center bg-[#131218] p-1 rounded-xl border border-stone-800">
              <span className="text-stone-400 px-2 font-semibold">كثافة التوزيع:</span>
              <select
                value={packPreset}
                onChange={(e) => setPackPreset(e.target.value as PackPresetChoice)}
                className="bg-[#1B1A24] text-gold-300 font-bold px-3 py-1.5 rounded-lg border border-gold-500/40 text-xs focus:outline-none cursor-pointer"
              >
                <option value="auto">
                  ⚡ استغلال ذكي كامل ({isA3 ? (orientation === 'landscape' ? '8 دعوات - 92×132 مم' : '9 دعوات - 88×125 مم') : (orientation === 'landscape' ? '6 دعوات' : '4 دعوات')})
                </option>
                <option value="standard">
                  {isA3
                    ? orientation === 'landscape'
                      ? '8 دعوات فاخرة (4×2) - 92×132 مم'
                      : '9 دعوات فاخرة (3×3) - 88×125 مم'
                    : '4 دعوات فاخرة (2×2) - 95×135 مم'}
                </option>
                <option value="medium">
                  {isA3 ? '12 دعوة أنيقة (4×3 أو 3×4) - 85×120 مم' : '6 دعوات أنيقة (3×2) - 85×120 مم'}
                </option>
                <option value="economy">
                  {isA3 ? '16 دعوة مكثفة (4×4) - 65×95 مم' : '8 دعوات مكثفة (4×2) - 65×95 مم'}
                </option>
                <option value="tags">
                  {isA3 ? '24 تاق / ميني (6×4)' : '10 تاقات / ميني (5×2)'}
                </option>
              </select>
            </div>
          </div>

          {/* Right Metrics: Auto-Nesting Count & Efficiency Badges */}
          <div className="flex items-center gap-2 font-mono">
            <span className="bg-stone-800/80 px-2.5 py-1.5 rounded-xl border border-stone-700 text-stone-300">
              شبكة الفرخ: <span className="text-gold-300 font-bold">{cols} × {rows}</span>
            </span>
            <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-1.5 rounded-xl font-bold">
              {totalCards} دعوة / فرخ
            </span>
            <span className="bg-purple-500/15 text-purple-300 border border-purple-500/30 px-2 py-1.5 rounded-xl text-[11px]">
              استغلال الفرخ: {efficiency}%
            </span>
          </div>
        </div>

        {/* ====================================================================
            VIEW TABS: Front Sheet | Back Sheet | Plotter Cut | Machine Specs
            ==================================================================== */}
        <div className="px-6 py-2 bg-[#16151E] border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('front')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'front'
                  ? 'bg-gradient-to-r from-gold-500/20 to-amber-500/20 text-gold-300 border border-gold-400/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
              }`}
            >
              <span>📄</span>
              <span>1. فرخ الوجه الأمامي (Front Sheet)</span>
            </button>

            <button
              onClick={() => setActiveTab('back')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'back'
                  ? 'bg-gradient-to-r from-gold-500/20 to-amber-500/20 text-gold-300 border border-gold-400/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
              }`}
            >
              <span>🪞</span>
              <span>2. فرخ القفا المعكوس (Mirrored Back Sheet)</span>
            </button>

            <button
              onClick={() => setActiveTab('cut')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'cut'
                  ? 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 border border-rose-400/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
              }`}
            >
              <span>✂️</span>
              <span>3. مسارات قص وتفريغ البلتر (Cameo / Skycut Cut SVG)</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'specs'
                  ? 'bg-stone-800 text-stone-200 border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-gold-400" />
              <span>مواصفات المكائن والتشغيل</span>
            </button>
          </div>

          {/* Zoom controls & Fit-to-Sheet button */}
          <div className="flex items-center gap-1.5 bg-[#121118] p-1 rounded-xl border border-stone-800">
            <button
              onClick={handleFitWholeSheet}
              className="px-2.5 py-1 text-[11px] font-bold text-gold-300 hover:bg-gold-500/20 rounded-lg border border-gold-500/30 transition-colors flex items-center gap-1"
              title="تعديل نسبة العرض لرؤية الفرخ بالكامل بدون تمرير"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>احتواء كامل الفرخ</span>
            </button>

            <div className="h-4 w-px bg-stone-800 mx-1" />

            <button
              onClick={() => setZoom((z) => Math.max(0.4, +(z - 0.15).toFixed(2)))}
              className="p-1 text-stone-400 hover:text-white"
              title="تصغير"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs px-2 text-gold-400 min-w-[48px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2)))}
              className="p-1 text-stone-400 hover:text-white"
              title="تكبير"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ====================================================================
            MAIN VIEWPORT CANVAS
            ==================================================================== */}
        <div className="flex-1 bg-[#0F0E14] relative overflow-auto p-6 flex items-center justify-center">
          {activeTab === 'specs' ? (
            /* Machine Specs Tab */
            <div className="max-w-2xl bg-[#181720] border border-stone-800 rounded-3xl p-6 space-y-4 text-right">
              <div className="flex items-center gap-2 text-gold-400 font-bold border-b border-stone-800 pb-3">
                <Sparkles className="w-5 h-5" />
                <span>دليل التجهيز المطبعي وضبط ماكينات البلتر (Production Workflow)</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-900/80 rounded-2xl border border-stone-800 space-y-1">
                  <div className="font-bold text-stone-200">ماكينة Skycut C16 / C24:</div>
                  <div className="text-stone-400">حساس الكاميرا: Optical Registration Mode</div>
                  <div className="text-stone-400">قوة الشفرة: 28-30 gf (كرتون 350 جم)</div>
                  <div className="text-stone-400">السرعة: 4 (دقة فائقة للمنحنيات)</div>
                </div>

                <div className="p-3 bg-stone-900/80 rounded-2xl border border-stone-800 space-y-1">
                  <div className="font-bold text-stone-200">ماكينة Silhouette Cameo 5:</div>
                  <div className="text-stone-400">حساس التسجيل: Cameo Auto-Mark Sensor</div>
                  <div className="text-stone-400">عمق الشفرة: 3.5 إلى 4</div>
                  <div className="text-stone-400">قوة الضغط: 30 | مسار الطي: أداة التجعيد 18</div>
                </div>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs space-y-1.5 text-emerald-200">
                <div className="font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>قاعدة القلب في الطباعة على الوجهين (Duplex Flip on Long Edge):</span>
                </div>
                <p className="leading-relaxed text-emerald-300">
                  تمت هندسة فرخ القفا بعكس ترتيب الأعمدة أفقياً بدقة 0.0 مم. عند قلب الفرخ عبر الضلع الطويل في الطابعة الملونة، سيتطابق كل وجه مع قفاه بدقة مليمترية مطلقة بدون أي إزاحة.
                </p>
              </div>

              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs space-y-1.5 text-rose-200">
                <div className="font-bold">فصل خطوط القص والتفريغ للبلاتر:</div>
                <p className="leading-relaxed text-rose-300">
                  الخط الأحمر المتصل (#FF0000) يمثل سكين القص النهائي (Cut Contour).
                  الخط الأزرق المنقط (#0000FF) يمثل سكين التجعيد والريجة (Creasing & Scoring).
                  علامات الزوايا السوداء الأربع مخصصة لكاميرا المسح الضوئي لماكينة البلتر.
                </p>
              </div>
            </div>
          ) : (
            /* SVG Sheet Imposition Canvas */
            <div
              className="relative transition-transform duration-200 origin-center bg-white shadow-2xl rounded-sm"
              style={{
                width: `${sheetW * 2.8}px`,
                height: `${sheetH * 2.8}px`,
                transform: `scale(${zoom})`
              }}
            >
              {/* TAB 1: FRONT SHEET SVG */}
              {activeTab === 'front' && (
                <svg
                  ref={frontSvgRef}
                  id="duplex-front-sheet-svg"
                  viewBox={`0 0 ${sheetW} ${sheetH}`}
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <StudioDefsLibrary state={state} />

                  {/* Pure White Paper Surface */}
                  <rect width={sheetW} height={sheetH} fill="#FFFFFF" />

                  {/* Optical Registration Corner Marks (4 L-shapes, 14×14mm at 5-6mm inset) */}
                  <g id="optical-registration-marks" fill="#000000">
                    <path
                      d={`M ${marginMM},${marginMM} L ${marginMM + regSize},${marginMM} L ${marginMM + regSize},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regSize} L ${marginMM},${marginMM + regSize} Z`}
                    />
                    <path
                      d={`M ${sheetW - marginMM},${marginMM} L ${sheetW - marginMM - regSize},${marginMM} L ${sheetW - marginMM - regSize},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regSize} L ${sheetW - marginMM},${marginMM + regSize} Z`}
                    />
                    <path
                      d={`M ${marginMM},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regSize} L ${marginMM},${sheetH - marginMM - regSize} Z`}
                    />
                    <path
                      d={`M ${sheetW - marginMM},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regSize} L ${sheetW - marginMM},${sheetH - marginMM - regSize} Z`}
                    />
                  </g>

                  {/* Sheet Header Information Banner */}
                  <g transform={`translate(${sheetW / 2}, 6)`} textAnchor="middle">
                    <text
                      fontSize="3.2"
                      fontFamily="Cairo, sans-serif"
                      fill="#777777"
                      fontWeight="bold"
                    >
                      مكتبة الشعلة • فرخ طباعة الوجه الأمامي ({sheetSize} - {sheetW}×{sheetH} مم) • 300 DPI • {state.activeTemplateId}
                    </text>
                  </g>

                  {/* Cards Grid Loop */}
                  {Array.from({ length: rows }).map((_, r) =>
                    Array.from({ length: cols }).map((_, c) => {
                      const posX = startX + c * (cellW + gutterMM);
                      const posY = startY + r * (cellH + gutterMM);

                      return (
                        <g key={`front-cell-${r}-${c}`} transform={`translate(${posX}, ${posY})`}>
                          {/* 2.5mm Bleed Box */}
                          <rect
                            x={0}
                            y={0}
                            width={cellW}
                            height={cellH}
                            fill={state.cardBaseColor || '#FDFBF7'}
                            opacity="0.95"
                          />

                          {/* Inner Card SVG Content */}
                          <svg
                            x={bleedMM}
                            y={bleedMM}
                            width={cardW}
                            height={cardH}
                            viewBox="0 0 600 860"
                          >
                            {renderCardFront()}
                          </svg>

                          {/* Corner Crop Marks (hairline ticks) */}
                          <g stroke="#333333" strokeWidth="0.15" opacity="0.6">
                            <line x1={bleedMM} y1={0} x2={bleedMM} y2={bleedMM - 0.5} />
                            <line x1={0} y1={bleedMM} x2={bleedMM - 0.5} y2={bleedMM} />
                            <line x1={cellW - bleedMM} y1={0} x2={cellW - bleedMM} y2={bleedMM - 0.5} />
                            <line x1={cellW} y1={bleedMM} x2={cellW - bleedMM + 0.5} y2={bleedMM} />
                            <line x1={bleedMM} y1={cellH} x2={bleedMM} y2={cellH - bleedMM + 0.5} />
                            <line x1={0} y1={cellH - bleedMM} x2={bleedMM - 0.5} y2={cellH - bleedMM} />
                            <line x1={cellW - bleedMM} y1={cellH} x2={cellW - bleedMM} y2={cellH - bleedMM + 0.5} />
                            <line x1={cellW} y1={cellH - bleedMM} x2={cellW - bleedMM + 0.5} y2={cellH - bleedMM} />
                          </g>
                        </g>
                      );
                    })
                  )}
                </svg>
              )}

              {/* TAB 2: MIRRORED BACK SHEET SVG */}
              {activeTab === 'back' && (
                <svg
                  ref={backSvgRef}
                  id="duplex-back-sheet-svg"
                  viewBox={`0 0 ${sheetW} ${sheetH}`}
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <StudioDefsLibrary state={state} />

                  {/* Pure White Paper Surface */}
                  <rect width={sheetW} height={sheetH} fill="#FFFFFF" />

                  {/* Identical Optical Registration Corner Marks */}
                  <g id="optical-registration-marks-back" fill="#000000">
                    <path
                      d={`M ${marginMM},${marginMM} L ${marginMM + regSize},${marginMM} L ${marginMM + regSize},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regSize} L ${marginMM},${marginMM + regSize} Z`}
                    />
                    <path
                      d={`M ${sheetW - marginMM},${marginMM} L ${sheetW - marginMM - regSize},${marginMM} L ${sheetW - marginMM - regSize},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regSize} L ${sheetW - marginMM},${marginMM + regSize} Z`}
                    />
                    <path
                      d={`M ${marginMM},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regSize} L ${marginMM},${sheetH - marginMM - regSize} Z`}
                    />
                    <path
                      d={`M ${sheetW - marginMM},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regSize} L ${sheetW - marginMM},${sheetH - marginMM - regSize} Z`}
                    />
                  </g>

                  {/* Sheet Header Information Banner */}
                  <g transform={`translate(${sheetW / 2}, 6)`} textAnchor="middle">
                    <text
                      fontSize="3.2"
                      fontFamily="Cairo, sans-serif"
                      fill="#777777"
                      fontWeight="bold"
                    >
                      مكتبة الشعلة • فرخ طباعة القفا المعكوس (Mirrored Back Duplex - {sheetSize}) • تطابق 0.0 مم مع فرخ الوجه
                    </text>
                  </g>

                  {/* Cards Grid Loop: Note Horizontal Flip col = (cols - 1 - c) */}
                  {Array.from({ length: rows }).map((_, r) =>
                    Array.from({ length: cols }).map((_, c) => {
                      // DUPLEX HORIZONTAL FLIP: Mirror the column placement for long-edge duplex pass
                      const backColIndex = cols - 1 - c;
                      const posX = startX + backColIndex * (cellW + gutterMM);
                      const posY = startY + r * (cellH + gutterMM);

                      return (
                        <g key={`back-cell-${r}-${c}`} transform={`translate(${posX}, ${posY})`}>
                          {/* 2.5mm Bleed Box for Back Color */}
                          <rect
                            x={0}
                            y={0}
                            width={cellW}
                            height={cellH}
                            fill={state.backDesign.backgroundColor || '#58111A'}
                          />

                          {/* Inner Back Card SVG Content */}
                          <svg
                            x={bleedMM}
                            y={bleedMM}
                            width={cardW}
                            height={cardH}
                            viewBox="0 0 600 860"
                          >
                            <BackCardFacePiece state={state} isMirrored={true} />
                          </svg>

                          {/* Corner Crop Marks */}
                          <g stroke="#FFFFFF" strokeWidth="0.15" opacity="0.6">
                            <line x1={bleedMM} y1={0} x2={bleedMM} y2={bleedMM - 0.5} />
                            <line x1={0} y1={bleedMM} x2={bleedMM - 0.5} y2={bleedMM} />
                            <line x1={cellW - bleedMM} y1={0} x2={cellW - bleedMM} y2={bleedMM - 0.5} />
                            <line x1={cellW} y1={bleedMM} x2={cellW - bleedMM + 0.5} y2={bleedMM} />
                            <line x1={bleedMM} y1={cellH} x2={bleedMM} y2={cellH - bleedMM + 0.5} />
                            <line x1={0} y1={cellH - bleedMM} x2={bleedMM - 0.5} y2={cellH - bleedMM} />
                            <line x1={cellW - bleedMM} y1={cellH} x2={cellW - bleedMM} y2={cellH - bleedMM + 0.5} />
                            <line x1={cellW} y1={cellH - bleedMM} x2={cellW - bleedMM + 0.5} y2={cellH - bleedMM} />
                          </g>
                        </g>
                      );
                    })
                  )}
                </svg>
              )}

              {/* TAB 3: PLOTTER CUT & SCORE SVG */}
              {activeTab === 'cut' && (
                <svg
                  ref={cutSvgRef}
                  id="duplex-plotter-cut-svg"
                  viewBox={`0 0 ${sheetW} ${sheetH}`}
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Clean white background */}
                  <rect width={sheetW} height={sheetH} fill="#FFFFFF" />

                  {/* Optical Registration Corner Marks for Cutter Sensor */}
                  <g id="optical-registration-sensor-marks" fill="#000000">
                    <path
                      d={`M ${marginMM},${marginMM} L ${marginMM + regSize},${marginMM} L ${marginMM + regSize},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regSize} L ${marginMM},${marginMM + regSize} Z`}
                    />
                    <path
                      d={`M ${sheetW - marginMM},${marginMM} L ${sheetW - marginMM - regSize},${marginMM} L ${sheetW - marginMM - regSize},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regSize} L ${sheetW - marginMM},${marginMM + regSize} Z`}
                    />
                    <path
                      d={`M ${marginMM},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regSize} L ${marginMM},${sheetH - marginMM - regSize} Z`}
                    />
                    <path
                      d={`M ${sheetW - marginMM},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regSize} L ${sheetW - marginMM},${sheetH - marginMM - regSize} Z`}
                    />
                  </g>

                  {/* Header Title for Cameo / Skycut Operator */}
                  <g transform={`translate(${sheetW / 2}, 6)`} textAnchor="middle">
                    <text
                      fontSize="3.2"
                      fontFamily="Cairo, sans-serif"
                      fill="#FF0000"
                      fontWeight="bold"
                    >
                      ✂️ مسارات قص وتفريغ البلتر المتجهية (Cameo 5 / Skycut C16) • أحمر: قص (0.25mm) | أزرق: طي وريجة
                    </text>
                  </g>

                  {/* Vector Cut Paths Grid */}
                  {Array.from({ length: rows }).map((_, r) =>
                    Array.from({ length: cols }).map((_, c) => {
                      const posX = startX + c * (cellW + gutterMM) + bleedMM;
                      const posY = startY + r * (cellH + gutterMM) + bleedMM;

                      return (
                        <g key={`cut-cell-${r}-${c}`} transform={`translate(${posX}, ${posY})`}>
                          <svg
                            x={0}
                            y={0}
                            width={cardW}
                            height={cardH}
                            viewBox="0 0 600 860"
                          >
                            {/* Main Perimeter Cut Line (RED HAIRLINE) */}
                            <path
                              d={geom.path}
                              fill="none"
                              stroke="#FF0000"
                              strokeWidth="1.2"
                            />

                            {/* Score / Fold Lines (BLUE DASHED) if any */}
                            {geom.dielineScore &&
                              geom.dielineScore.map((scorePath, sIdx) => (
                                <path
                                  key={`score-${sIdx}`}
                                  d={scorePath}
                                  fill="none"
                                  stroke="#0000FF"
                                  strokeWidth="1.2"
                                  strokeDasharray="6, 4"
                                />
                              ))}

                            {/* Punch hole if any */}
                            {geom.hasPunchHole && geom.holeX && geom.holeY && (
                              <circle
                                cx={geom.holeX}
                                cy={geom.holeY}
                                r={geom.holeRadius || 4.5}
                                fill="none"
                                stroke="#FF0000"
                                strokeWidth="1.2"
                              />
                            )}

                            {/* Slit Cut if any (e.g. Lily clasp) */}
                            {geom.slitCut && (
                              <line
                                x1={geom.slitCut.x1}
                                y1={geom.slitCut.y1}
                                x2={geom.slitCut.x2}
                                y2={geom.slitCut.y2}
                                stroke="#FF0000"
                                strokeWidth="1.2"
                              />
                            )}
                          </svg>
                        </g>
                      );
                    })
                  )}
                </svg>
              )}
            </div>
          )}
        </div>

        {/* ====================================================================
            FOOTER ACTIONS: Direct PDF Download & Plotter / SVG Exports
            ==================================================================== */}
        <footer className="px-6 py-3.5 bg-[#181720] border-t border-stone-800 flex items-center justify-between flex-wrap gap-3">
          {/* Status info & Live Progress feedback */}
          <div className="flex items-center gap-2 text-xs text-stone-400">
            {isExportingPdf ? (
              <span className="flex items-center gap-2 text-gold-300 font-bold">
                <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
                <span>{exportStatus || 'جاري توليد ملف PDF...'}</span>
              </span>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  فرخ {sheetSize} جاهز: {totalCards} دعوة ({cardW}×{cardH} مم) • دماء 2.5 مم • علامات تسجيل بصرية
                </span>
                {copySuccess && (
                  <span className="text-emerald-400 font-bold flex items-center gap-1 mr-2">
                    <Check className="w-3.5 h-3.5" />
                    <span>{copySuccess}</span>
                  </span>
                )}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Download Front Sheet SVG */}
            <button
              onClick={() => handleDownloadSvg(frontSvgRef, `Imposition-Front-${sheetSize}.svg`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs border border-stone-700 transition-all active:scale-[0.98]"
              title="تحميل فرخ الوجه الأمامي كملف SVG متجهي"
            >
              <Download className="w-3.5 h-3.5 text-gold-400" />
              <span>فرخ الوجه (SVG)</span>
            </button>

            {/* Download Back Sheet SVG */}
            <button
              onClick={() => handleDownloadSvg(backSvgRef, `Imposition-Back-${sheetSize}.svg`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs border border-stone-700 transition-all active:scale-[0.98]"
              title="تحميل فرخ القفا المعكوس كملف SVG متجهي"
            >
              <Download className="w-3.5 h-3.5 text-gold-400" />
              <span>فرخ القفا (SVG)</span>
            </button>

            {/* Download Plotter Cut SVG */}
            <button
              onClick={() => handleDownloadSvg(cutSvgRef, `Plotter-Dielines-${sheetSize}.svg`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-bold text-xs border border-rose-500/50 transition-all active:scale-[0.98]"
              title="تحميل ملف سكاكين القص والتفريغ للبلاتر"
            >
              <Scissors className="w-3.5 h-3.5 text-rose-300" />
              <span>مسارات القص (Cut SVG)</span>
            </button>

            {/* DIRECT REAL .PDF DOWNLOAD BUTTON */}
            <button
              onClick={handleDirectPdfDownload}
              disabled={isExportingPdf}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-gold-glow transition-all active:scale-[0.98] border border-gold-300 disabled:opacity-50 cursor-pointer"
              title="تحميل ملف PDF حقيقي يحتوي على 3 صفحات: الوجه + القفا المعكوس + سكاكين القص بدقة 300 DPI"
            >
              {isExportingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4 stroke-[2.4]" />
              )}
              <span>📥 تحميل ملف الطباعة الموحد (.PDF وجهين معاً)</span>
            </button>

            {/* Direct Browser 1:1 Print Dialog Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all active:scale-[0.98] border border-emerald-400/30"
              title="إرسال أمر طباعة مباشر لطابعتك المكتبية"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة فورية</span>
            </button>
          </div>
        </footer>

        {/* ====================================================================
            OFFSCREEN HIDDEN SVGs: Always mounted for instantaneous Multi-Page PDF compilation
            and browser 2-page duplex print mode
            ==================================================================== */}
        <div
          id="print-duplex-container"
          className="fixed -left-[99999px] top-0 opacity-0 pointer-events-none w-[1200px] h-[1200px] overflow-hidden print:static print:left-0 print:opacity-100 print:w-auto print:h-auto print:block z-[99999]"
        >
          <style>{`
            @media screen {
              #print-duplex-container { display: none !important; }
            }
            @media print {
              @page {
                size: ${sheetW}mm ${sheetH}mm;
                margin: 0;
              }
              body * {
                visibility: hidden !important;
              }
              #print-duplex-container, #print-duplex-container * {
                visibility: visible !important;
              }
              #print-duplex-container {
                display: block !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #ffffff !important;
              }
              .print-sheet-page {
                width: ${sheetW}mm !important;
                height: ${sheetH}mm !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                overflow: hidden !important;
              }
              .print-page-front {
                page-break-after: always !important;
                break-after: page !important;
              }
              .print-page-back {
                page-break-before: always !important;
                break-before: page !important;
              }
            }
          `}</style>

          {/* PAGE 1: Front Sheet */}
          <div className="print-sheet-page print-page-front">
            <svg
              ref={hiddenFrontSvgRef}
              viewBox={`0 0 ${sheetW} ${sheetH}`}
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <StudioDefsLibrary state={state} />
              <rect width={sheetW} height={sheetH} fill="#FFFFFF" />

              {/* Optical Registration Corner Marks */}
              <g fill="#000000">
                <path d={`M ${marginMM},${marginMM} L ${marginMM + regSize},${marginMM} L ${marginMM + regSize},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regSize} L ${marginMM},${marginMM + regSize} Z`} />
                <path d={`M ${sheetW - marginMM},${marginMM} L ${sheetW - marginMM - regSize},${marginMM} L ${sheetW - marginMM - regSize},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regSize} L ${sheetW - marginMM},${marginMM + regSize} Z`} />
                <path d={`M ${marginMM},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regSize} L ${marginMM},${sheetH - marginMM - regSize} Z`} />
                <path d={`M ${sheetW - marginMM},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regSize} L ${sheetW - marginMM},${sheetH - marginMM - regSize} Z`} />
              </g>

              {/* Header Info */}
              <g transform={`translate(${sheetW / 2}, 5)`} textAnchor="middle">
                <text fontSize="2.8" fontFamily="Cairo, sans-serif" fill="#777777" fontWeight="bold">
                  مكتبة الشعلة • صفحة 1: فرخ طباعة الوجه الأمامي ({sheetSize} - {sheetW}×{sheetH} مم) • 300 DPI
                </text>
              </g>

              {/* Cards Grid */}
              {Array.from({ length: rows }).map((_, r) =>
                Array.from({ length: cols }).map((_, c) => {
                  const posX = startX + c * (cellW + gutterMM);
                  const posY = startY + r * (cellH + gutterMM);
                  return (
                    <g key={`print-p1-${r}-${c}`} transform={`translate(${posX}, ${posY})`}>
                      <rect x={0} y={0} width={cellW} height={cellH} fill={state.cardBaseColor || '#FAF7F2'} />
                      <svg x={bleedMM} y={bleedMM} width={cardW} height={cardH} viewBox="0 0 600 860">
                        {renderCardFront()}
                      </svg>
                      <g stroke="#333333" strokeWidth="0.15" opacity="0.6">
                        <line x1={bleedMM} y1={0} x2={bleedMM} y2={bleedMM - 0.5} />
                        <line x1={0} y1={bleedMM} x2={bleedMM - 0.5} y2={bleedMM} />
                        <line x1={cellW - bleedMM} y1={0} x2={cellW - bleedMM} y2={bleedMM - 0.5} />
                        <line x1={cellW} y1={bleedMM} x2={cellW - bleedMM + 0.5} y2={bleedMM} />
                        <line x1={bleedMM} y1={cellH} x2={bleedMM} y2={cellH - bleedMM + 0.5} />
                        <line x1={0} y1={cellH - bleedMM} x2={bleedMM - 0.5} y2={cellH - bleedMM} />
                        <line x1={cellW - bleedMM} y1={cellH} x2={cellW - bleedMM} y2={cellH - bleedMM + 0.5} />
                        <line x1={cellW} y1={cellH - bleedMM} x2={cellW - bleedMM + 0.5} y2={cellH - bleedMM} />
                      </g>
                    </g>
                  );
                })
              )}
            </svg>
          </div>

          {/* PAGE 2: Mirrored Back Sheet */}
          <div className="print-sheet-page print-page-back">
            <svg
              ref={hiddenBackSvgRef}
              viewBox={`0 0 ${sheetW} ${sheetH}`}
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <StudioDefsLibrary state={state} />
              <rect width={sheetW} height={sheetH} fill="#FFFFFF" />

              {/* Optical Registration Corner Marks */}
              <g fill="#000000">
                <path d={`M ${marginMM},${marginMM} L ${marginMM + regSize},${marginMM} L ${marginMM + regSize},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regSize} L ${marginMM},${marginMM + regSize} Z`} />
                <path d={`M ${sheetW - marginMM},${marginMM} L ${sheetW - marginMM - regSize},${marginMM} L ${sheetW - marginMM - regSize},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regSize} L ${sheetW - marginMM},${marginMM + regSize} Z`} />
                <path d={`M ${marginMM},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regSize} L ${marginMM},${sheetH - marginMM - regSize} Z`} />
                <path d={`M ${sheetW - marginMM},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regSize} L ${sheetW - marginMM},${sheetH - marginMM - regSize} Z`} />
              </g>

              {/* Header Info */}
              <g transform={`translate(${sheetW / 2}, 5)`} textAnchor="middle">
                <text fontSize="2.8" fontFamily="Cairo, sans-serif" fill="#777777" fontWeight="bold">
                  مكتبة الشعلة • صفحة 2: فرخ طباعة القفا المعكوس (Mirrored Back Duplex) • تطابق 0.0 مم
                </text>
              </g>

              {/* Cards Grid: Horizontal Flip */}
              {Array.from({ length: rows }).map((_, r) =>
                Array.from({ length: cols }).map((_, c) => {
                  const backColIndex = cols - 1 - c;
                  const posX = startX + backColIndex * (cellW + gutterMM);
                  const posY = startY + r * (cellH + gutterMM);
                  return (
                    <g key={`print-p2-${r}-${c}`} transform={`translate(${posX}, ${posY})`}>
                      <rect x={0} y={0} width={cellW} height={cellH} fill={state.backDesign.backgroundColor || '#0F291E'} />
                      <svg x={bleedMM} y={bleedMM} width={cardW} height={cardH} viewBox="0 0 600 860">
                        <BackCardFacePiece state={state} isMirrored={true} />
                      </svg>
                      <g stroke="#FFFFFF" strokeWidth="0.15" opacity="0.6">
                        <line x1={bleedMM} y1={0} x2={bleedMM} y2={bleedMM - 0.5} />
                        <line x1={0} y1={bleedMM} x2={bleedMM - 0.5} y2={bleedMM} />
                        <line x1={cellW - bleedMM} y1={0} x2={cellW - bleedMM} y2={bleedMM - 0.5} />
                        <line x1={cellW} y1={bleedMM} x2={cellW - bleedMM + 0.5} y2={bleedMM} />
                        <line x1={bleedMM} y1={cellH} x2={bleedMM} y2={cellH - bleedMM + 0.5} />
                        <line x1={0} y1={cellH - bleedMM} x2={bleedMM - 0.5} y2={cellH - bleedMM} />
                        <line x1={cellW - bleedMM} y1={cellH} x2={cellW - bleedMM} y2={cellH - bleedMM + 0.5} />
                        <line x1={cellW} y1={cellH - bleedMM} x2={cellW - bleedMM + 0.5} y2={cellH - bleedMM} />
                      </g>
                    </g>
                  );
                })
              )}
            </svg>
          </div>

          {/* PAGE 3: Cameo / Skycut Cut Sheet */}
          <div className="print-sheet-page print-page-cut">
            <svg
              ref={hiddenCutSvgRef}
              viewBox={`0 0 ${sheetW} ${sheetH}`}
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width={sheetW} height={sheetH} fill="#FFFFFF" />

              {/* Optical Registration Corner Marks */}
              <g fill="#000000">
                <path d={`M ${marginMM},${marginMM} L ${marginMM + regSize},${marginMM} L ${marginMM + regSize},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regThickness} L ${marginMM + regThickness},${marginMM + regSize} L ${marginMM},${marginMM + regSize} Z`} />
                <path d={`M ${sheetW - marginMM},${marginMM} L ${sheetW - marginMM - regSize},${marginMM} L ${sheetW - marginMM - regSize},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regThickness} L ${sheetW - marginMM - regThickness},${marginMM + regSize} L ${sheetW - marginMM},${marginMM + regSize} Z`} />
                <path d={`M ${marginMM},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM} L ${marginMM + regSize},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regThickness} L ${marginMM + regThickness},${sheetH - marginMM - regSize} L ${marginMM},${sheetH - marginMM - regSize} Z`} />
                <path d={`M ${sheetW - marginMM},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM} L ${sheetW - marginMM - regSize},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regThickness} L ${sheetW - marginMM - regThickness},${sheetH - marginMM - regSize} L ${sheetW - marginMM},${sheetH - marginMM - regSize} Z`} />
              </g>

              {/* Header Info */}
              <g transform={`translate(${sheetW / 2}, 5)`} textAnchor="middle">
                <text fontSize="2.8" fontFamily="Cairo, sans-serif" fill="#FF0000" fontWeight="bold">
                  مكتبة الشعلة • صفحة 3: سكاكين القص والتفريغ (Cameo 5 / Skycut C16)
                </text>
              </g>

              {/* Cut Paths Grid */}
              {Array.from({ length: rows }).map((_, r) =>
                Array.from({ length: cols }).map((_, c) => {
                  const posX = startX + c * (cellW + gutterMM) + bleedMM;
                  const posY = startY + r * (cellH + gutterMM) + bleedMM;
                  return (
                    <g key={`print-p3-${r}-${c}`} transform={`translate(${posX}, ${posY})`}>
                      <svg x={0} y={0} width={cardW} height={cardH} viewBox="0 0 600 860">
                        <path d={geom.path} fill="none" stroke="#FF0000" strokeWidth="1.2" />
                        {geom.dielineScore &&
                          geom.dielineScore.map((scorePath, sIdx) => (
                            <path
                              key={`score-p3-${sIdx}`}
                              d={scorePath}
                              fill="none"
                              stroke="#0000FF"
                              strokeWidth="1.2"
                              strokeDasharray="6, 4"
                            />
                          ))}
                        {geom.hasPunchHole && geom.holeX && geom.holeY && (
                          <circle
                            cx={geom.holeX}
                            cy={geom.holeY}
                            r={geom.holeRadius || 4.5}
                            fill="none"
                            stroke="#FF0000"
                            strokeWidth="1.2"
                          />
                        )}
                        {geom.slitCut && (
                          <line
                            x1={geom.slitCut.x1}
                            y1={geom.slitCut.y1}
                            x2={geom.slitCut.x2}
                            y2={geom.slitCut.y2}
                            stroke="#FF0000"
                            strokeWidth="1.2"
                          />
                        )}
                      </svg>
                    </g>
                  );
                })
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
