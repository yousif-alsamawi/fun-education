import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Grid, Layers, Sparkles, Flower2, Maximize2, Camera, SlidersHorizontal, Palette } from 'lucide-react';
import { ColorPalette, LayerMode, StudioState, MockupBackdrop } from '../../types/studio';
import { LayerModeTabs } from './LayerModeTabs';
import { SvgRenderer } from './SvgRenderer';
import { CARD_SIZES, MASTER_TEMPLATES } from '../../data/templates';

interface LiveCanvasAreaProps {
  state: StudioState;
  onUpdateState: (updates: Partial<StudioState>) => void;
  onOpenAssemblyGuide: () => void;
  svgRef: React.RefObject<SVGSVGElement>;
}

export const LiveCanvasArea: React.FC<LiveCanvasAreaProps> = ({
  state,
  onUpdateState,
  onOpenAssemblyGuide,
  svgRef
}) => {
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const activeSize = CARD_SIZES.find((s) => s.id === state.selectedSizeId) || CARD_SIZES[0];
  const activeTemplate = MASTER_TEMPLATES.find((t) => t.id === state.activeTemplateId) || MASTER_TEMPLATES[0];

  const handleZoomIn = () => {
    onUpdateState({ zoomLevel: Math.min(2.5, +(state.zoomLevel + 0.15).toFixed(2)) });
  };

  const handleZoomOut = () => {
    onUpdateState({ zoomLevel: Math.max(0.5, +(state.zoomLevel - 0.15).toFixed(2)) });
  };

  const handleResetZoom = () => {
    onUpdateState({ zoomLevel: 1.0 });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#121116] border-l border-stone-800/80 relative overflow-hidden select-none">
      {/* Top Toolbar: View Switcher & Action Pills */}
      <div className="p-4 border-b border-stone-800/70 bg-[#16151B]/80 backdrop-blur-md z-20 flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Layer Mode Tabs + Display Mode + Card Face Selector (Front / Back / Both) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Master Display Mode Switcher: 📸 Photorealistic Mockup vs. 📐 Print Canvas */}
          <div className="flex items-center bg-[#19181F]/90 backdrop-blur-md border border-gold-500/35 rounded-2xl p-1 shadow-2xl">
            <button
              onClick={() => onUpdateState({ displayMode: 'photorealistic-mockup' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                state.displayMode !== 'print-canvas'
                  ? 'bg-gradient-to-r from-gold-500/25 via-amber-500/30 to-gold-500/25 text-gold-200 border border-gold-400/60 shadow-luxury'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="منصة التصوير الفاخرة (Photorealistic Mockup) مع ظلال طبيعية وورق قطني حقيقي"
            >
              <Camera className="w-3.5 h-3.5 text-gold-400" />
              <span>منصة التصوير 📸</span>
            </button>
            <button
              onClick={() => onUpdateState({ displayMode: 'print-canvas' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                state.displayMode === 'print-canvas'
                  ? 'bg-blue-500/25 text-blue-200 border border-blue-400/60 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="منصة الطباعة الصريحة (Print Canvas) مع شبكة المليمتر ومسارات القص"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
              <span>منصة الطباعة 📐</span>
            </button>
          </div>

          {/* Layer Mode Tabs (المعاينة النهائية، طبقة الطباعة، مسارات القص) */}
          <LayerModeTabs
            activeMode={state.activeLayerMode}
            onModeChange={(mode: LayerMode) => onUpdateState({ activeLayerMode: mode })}
          />

          {/* Duplex Card Face Selector (Front vs. Back vs. Side-by-Side) */}
          {!state.isFullSuiteMode && (
            <div className="flex items-center bg-[#19181F]/90 backdrop-blur-md border border-stone-800/80 rounded-2xl p-1 shadow-2xl">
              <button
                onClick={() => onUpdateState({ activeCardFace: 'front' })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  state.activeCardFace === 'front'
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="عرض الوجه الأمامي فقط (تفاصيل الدعوة والنصوص)"
              >
                الوجه الأمامي
              </button>
              <button
                onClick={() => onUpdateState({ activeCardFace: 'back' })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  state.activeCardFace === 'back'
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="عرض الوجه الخلفي فقط (القفا والشعار الملكي)"
              >
                الوجه الخلفي (القفا)
              </button>
              <button
                onClick={() => onUpdateState({ activeCardFace: 'both' })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  state.activeCardFace === 'both'
                    ? 'bg-gradient-to-r from-gold-500/25 to-amber-500/25 text-gold-200 border border-gold-400/50 shadow-luxury'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="عرض الوجهين جنباً إلى جنب (الوجه الأمامي يميناً والقفا يساراً)"
              >
                <span>🪞</span>
                <span>عرض الوجهين معاً</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Toolbar: Assembly Guide, Template Specific Controls, Grid */}
        <div className="flex items-center gap-2">
          {/* Full Suite Synchronization Mode Toggle */}
          <button
            onClick={() => onUpdateState({ isFullSuiteMode: !state.isFullSuiteMode })}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              state.isFullSuiteMode
                ? 'bg-gradient-to-r from-purple-500/25 via-gold-500/30 to-amber-500/25 text-gold-200 border-gold-400 shadow-luxury'
                : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:text-white'
            }`}
            title="عرض طقم المناسبة المتكامل (دعوة + علبة + ستاند + تاق)"
          >
            <span>📦</span>
            <span className="hidden sm:inline">{state.isFullSuiteMode ? 'البكج المتكامل ✨' : 'عرض كطقم متكامل'}</span>
          </button>

          {/* Template 3 Quick Toggle on Canvas: Arch Gatefold Doors & Lily Clasp */}
          {state.activeTemplateId === 'arch-gatefold-lily' && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onUpdateState({ isGatefoldOpen: !state.isGatefoldOpen })}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  state.isGatefoldOpen
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30'
                    : 'bg-stone-800/80 text-stone-300 border-stone-700/60'
                }`}
                title="معاينة فتح وإغلاق درفتي البوابة المقوسة"
              >
                <span>{state.isGatefoldOpen ? 'البوابة مفتوحة 🔓' : 'البوابة مقفلة 🔒'}</span>
              </button>
              <button
                onClick={() => onUpdateState({ isFlowerInserted: !state.isFlowerInserted })}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  state.isFlowerInserted
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-gold-500/20 text-gold-300 border-gold-500/40 hover:bg-gold-500/30'
                }`}
                title="معاينة انزلاق ساق زهرة الليلي في الشق الأفقي للبوابة"
              >
                <Flower2 className="w-3.5 h-3.5" />
                <span>{state.isFlowerInserted ? 'الزهرة مقفلة 🔒' : 'الزهرة مستخرجة 🔓'}</span>
              </button>
            </div>
          )}

          {/* Template 1 Toggle: Assembled Fan vs Exploded Production View */}
          {state.activeTemplateId === 'floral-fan' && (
            <button
              onClick={() => onUpdateState({ isAssemblyMode: !state.isAssemblyMode })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                state.isAssemblyMode
                  ? 'bg-stone-800/80 text-stone-300 border-stone-700/60 hover:text-white'
                  : 'bg-gold-500/20 text-gold-300 border-gold-500/40'
              }`}
              title="التبديل بين المعاينة المجمعة المتداخلة وتوزيع القطع للطباعة والقص"
            >
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              <span>{state.isAssemblyMode ? 'تفكيك القطع للإنتاج' : 'تجميع المروحة'}</span>
            </button>
          )}

          {/* Assembly Guide Button */}
          <button
            onClick={onOpenAssemblyGuide}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-gold-500/15 via-gold-400/20 to-gold-600/15 text-gold-300 border border-gold-500/40 hover:bg-gold-500/25 transition-all shadow-sm"
            title="دليل تجميع وتركيب أجزاء النموذج النشط"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>طريقة التركيب (Assembly Guide)</span>
          </button>

          {/* Grid Toggle */}
          <button
            onClick={() => onUpdateState({ showGrid: !state.showGrid })}
            className={`p-2 rounded-xl text-xs border transition-all ${
              state.showGrid
                ? 'bg-gold-500/20 text-gold-400 border-gold-500/40'
                : 'bg-stone-800/60 text-stone-400 border-stone-700/60 hover:text-stone-200'
            }`}
            title="إظهار / إخفاء شبكة الرسم الهندسي"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Multi-Piece Interactive Switcher Bar for multi-piece suites */}
      {(activeTemplate.isMultiPiece || activeTemplate.hasSecondaryPiece) && (
        <div className="px-4 py-2 border-b border-stone-800/60 bg-[#14131A]/90 backdrop-blur-md z-10 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs text-gold-300 font-bold shrink-0">
            <span>📦</span>
            <span>مكونات الطقم المتعدد ({activeTemplate.piecesCount || (activeTemplate.hasSecondaryPiece ? 2 : 1)} قطع):</span>
          </div>

          <div className="flex items-center bg-[#1B1A24] p-1 rounded-xl border border-stone-800 shrink-0">
            <button
              onClick={() => onUpdateState({ activePieceView: 'all' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                (state.activePieceView || 'all') === 'all'
                  ? 'bg-gradient-to-r from-gold-500/25 to-amber-500/25 text-gold-200 border border-gold-400/50 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="عرض الطقم كاملاً مجمعاً في مشهد واحد"
            >
              <span>🃏</span>
              <span>عرض الطقم كاملاً (Full Suite 3D Mockup)</span>
            </button>

            <button
              onClick={() => onUpdateState({ activePieceView: 'piece-1' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                state.activePieceView === 'piece-1'
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-400/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="عزل كرت الدعوة الرئيسي مع مسار القص"
            >
              <span>📄</span>
              <span>{activeTemplate.piecesNames?.[0] || 'القطعة 1: كرت الدعوة'}</span>
            </button>

            <button
              onClick={() => onUpdateState({ activePieceView: 'piece-2' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                state.activePieceView === 'piece-2'
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-400/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="عزل الجيب أو المطوية أو المظروف"
            >
              <span>✉️</span>
              <span>{activeTemplate.piecesNames?.[1] || 'القطعة 2: الجيب / المطوية'}</span>
            </button>

            {(activeTemplate.piecesCount || 1) >= 3 && (
              <button
                onClick={() => onUpdateState({ activePieceView: 'piece-3' })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  state.activePieceView === 'piece-3'
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-400/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="عزل بطانة المظروف أو البطاقات التكميلية"
              >
                <span>🎨</span>
                <span>{activeTemplate.piecesNames?.[2] || 'القطعة 3: بطانة المظروف'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <div
        className={`flex-1 min-h-[70vh] w-full relative overflow-auto flex items-center justify-center p-6 lg:p-10 transition-all duration-500 ${
          state.activeLayerMode === 'cut'
            ? 'canvas-checkerboard'
            : state.displayMode === 'print-canvas' || state.activeLayerMode === 'print'
            ? 'bg-[#1C1B22]'
            : state.mockupBackdrop === 'linen-table'
            ? 'bg-[#E7E1D8]'
            : state.mockupBackdrop === 'dark-slate'
            ? 'bg-[#121118]'
            : state.mockupBackdrop === 'warm-wood'
            ? 'bg-[#291F18]'
            : 'bg-[#F2F1ED]' // Carrara Marble Base
        }`}
        style={
          state.displayMode !== 'print-canvas' && state.activeLayerMode !== 'cut'
            ? {
                backgroundImage:
                  state.mockupBackdrop === 'carrara-marble' || !state.mockupBackdrop
                    ? 'url(/assets/textures/carrara_marble.svg)'
                    : state.mockupBackdrop === 'linen-table'
                    ? 'url(/assets/textures/luxury_linen.svg)'
                    : undefined,
                backgroundSize: '400px 400px',
                backgroundRepeat: 'repeat'
              }
            : undefined
        }
      >
        {/* Pinterest-style Natural Sunlight & Foliage Shadow Overlay in Mockup Mode */}
        {state.displayMode !== 'print-canvas' && state.activeLayerMode !== 'cut' && (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20 z-0 transition-opacity duration-300"
            style={{
              backgroundImage: `radial-gradient(ellipse 65% 55% at 20% 15%, transparent 30%, rgba(20,15,10,0.6) 100%),
                repeating-linear-gradient(42deg, transparent, transparent 55px, rgba(15,10,5,0.08) 55px, rgba(15,10,5,0.08) 110px)`
            }}
          />
        )}

        {/* Floating Toolbar: Zoom, Full-Screen, and Backdrop Selector */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center gap-1.5 bg-[#181722]/90 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-gold-500/30 shadow-2xl select-none">
          {/* Mockup Backdrop Switcher when in Mockup Mode */}
          {state.displayMode !== 'print-canvas' && (
            <div className="flex items-center gap-1 bg-[#100F15] p-1 rounded-xl border border-stone-800">
              <button
                onClick={() => onUpdateState({ mockupBackdrop: 'carrara-marble' })}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  (state.mockupBackdrop || 'carrara-marble') === 'carrara-marble'
                    ? 'bg-gold-500/25 text-gold-200 border border-gold-400/50'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="أرضية رخام كارارا الإيطالي الأبيض"
              >
                🏛️ رخام
              </button>
              <button
                onClick={() => onUpdateState({ mockupBackdrop: 'linen-table' })}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  state.mockupBackdrop === 'linen-table'
                    ? 'bg-gold-500/25 text-gold-200 border border-gold-400/50'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="أرضية مفرش الكتان المنسوج"
              >
                🧵 كتان
              </button>
              <button
                onClick={() => onUpdateState({ mockupBackdrop: 'dark-slate' })}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  state.mockupBackdrop === 'dark-slate'
                    ? 'bg-gold-500/25 text-gold-200 border border-gold-400/50'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="أرضية صخرية داكنة فخمة"
              >
                🖤 داكن
              </button>
            </div>
          )}

          <div className="w-[1px] h-4 bg-stone-700/80 mx-0.5" />

          <button
            onClick={() => onUpdateState({ zoomLevel: 1.0 })}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              state.zoomLevel === 1.0
                ? 'bg-gold-500/25 text-gold-300 border border-gold-400/50 shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
            title="قياس حقيقي بنسبة 1:1"
          >
            <span>📏 1:1</span>
          </button>
          <button
            onClick={() => onUpdateState({ zoomLevel: 1.5 })}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              state.zoomLevel === 1.5
                ? 'bg-gold-500/25 text-gold-300 border border-gold-400/50 shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
            title="تكبير 150%"
          >
            <span>🔍 150%</span>
          </button>
          <button
            onClick={() => onUpdateState({ zoomLevel: 2.0 })}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              state.zoomLevel === 2.0
                ? 'bg-gold-500/25 text-gold-300 border border-gold-400/50 shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
            title="تكبير 200%"
          >
            <span>🔍 200%</span>
          </button>
          <div className="w-[1px] h-4 bg-stone-700/80 mx-1" />
          <button
            onClick={() => setIsFullScreenModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-gold-500/20 to-amber-500/20 text-gold-300 hover:from-gold-500/30 hover:to-amber-500/30 border border-gold-400/40 transition-all shadow-sm"
            title="عرض ملء الشاشة للتفتيش والمعاينة الدقيقة"
          >
            <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
            <span>🔲 ملء الشاشة</span>
          </button>
        </div>

        {/* Dynamic Studio Vignette Glow in Mockup Mode */}
        {state.activeLayerMode === 'mockup' && (
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: `radial-gradient(circle at 50% 45%, ${state.artworkColor}15 0%, transparent 65%)`
            }}
          />
        )}

        {/* SVG Container with Scale Transform */}
        <div
          className="relative transition-transform duration-200 ease-out origin-center flex items-center justify-center"
          style={{
            transform: `scale(${state.zoomLevel})`
          }}
        >
          <SvgRenderer ref={svgRef} state={state} />
        </div>
      </div>

      {/* Bottom Floating Control Bar on Canvas: Zoom Controls & Dimensions Badge */}
      <div className="absolute bottom-4 left-6 z-20 flex items-center gap-3">
        {/* Dimensions & Template Badge */}
        <div className="flex items-center gap-2 bg-[#19181F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-800/80 text-xs text-stone-300 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="font-semibold text-stone-200">{activeTemplate.nameAr}</span>
          <span className="text-stone-500">|</span>
          <span className="font-mono text-gold-400/90">{activeSize.widthCm}×{activeSize.heightCm} سم</span>
          <span className="text-stone-500">|</span>
          <span className="text-stone-400 text-[11px]">300 DPI جاهز للإنتاج</span>
        </div>

        {/* Zoom Controls Pill */}
        <div className="flex items-center gap-1 bg-[#19181F]/90 backdrop-blur-md p-1 rounded-xl border border-stone-800/80 shadow-xl">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800/50 transition-colors"
            title="تصغير"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="px-2 py-1 text-xs font-mono text-gold-400 hover:bg-stone-800/50 rounded-md transition-colors"
            title="إعادة ضبط المقياس 100%"
          >
            {Math.round(state.zoomLevel * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800/50 transition-colors"
            title="تكبير"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full-Screen Inspection Modal */}
      {isFullScreenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn">
          <div className="bg-[#14131A] border border-gold-500/40 rounded-3xl p-6 max-w-5xl w-full max-h-[95vh] flex flex-col items-center space-y-4 shadow-2xl overflow-hidden">
            <div className="w-full flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
                <h3 className="text-sm sm:text-base font-bold text-stone-100">
                  معاينة الكرت بالحجم المكبر وملء الشاشة • {activeTemplate.nameAr}
                </h3>
              </div>
              <button
                onClick={() => setIsFullScreenModalOpen(false)}
                className="text-stone-300 hover:text-white px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold border border-stone-700 transition-colors"
              >
                إغلاق (Esc)
              </button>
            </div>

            <div className="flex-1 w-full flex items-center justify-center overflow-auto p-4">
              <div className="max-w-xl w-full aspect-[600/860] flex items-center justify-center drop-shadow-2xl">
                <SvgRenderer state={state} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
