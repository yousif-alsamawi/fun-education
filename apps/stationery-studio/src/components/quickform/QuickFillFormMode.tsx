import React, { useState } from 'react';
import {
  Sparkles,
  Printer,
  Eye,
  FileDown,
  Wand2,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Palette,
  LayoutTemplate,
  ArrowRight,
  Check,
  Maximize2,
  Type
} from 'lucide-react';
import { StudioState, MasterTemplateId, CalligraphyHeaderType } from '../../types/studio';
import {
  MASTER_TEMPLATES,
  LUXURY_THEMES,
  FONT_OPTIONS,
  getRoyalClassicThemePreset,
  getFineArtBotanicalThemePreset,
  getModernMinimalistThemePreset
} from '../../data/templates';
import { ETSY_ASSET_GALLERY, EtsyAssetCategory } from '../../data/etsyAssetGallery';
import { FrontCardFacePiece } from '../canvas/FrontCardFacePiece';
import { BackCardFacePiece } from '../canvas/BackCardFacePiece';
import { StudioDefsLibrary } from '../canvas/StudioDefsLibrary';

interface QuickFillFormModeProps {
  state: StudioState;
  onUpdateState: (updates: Partial<StudioState>) => void;
  onOpenImpositionModal: () => void;
  onSwitchToProStudio: () => void;
}

export const QuickFillFormMode: React.FC<QuickFillFormModeProps> = ({
  state,
  onUpdateState,
  onOpenImpositionModal,
  onSwitchToProStudio
}) => {
  const [activeFace, setActiveFace] = useState<'front' | 'back'>('front');
  const [previewZoom, setPreviewZoom] = useState(1.0);
  const [showLivePreviewModal, setShowLivePreviewModal] = useState(false);
  const [assetCategoryFilter, setAssetCategoryFilter] = useState<'all' | EtsyAssetCategory>('all');

  // The 10 Master Structural SVG Templates (Etsy Best-Sellers)
  const quickTemplates = MASTER_TEMPLATES.slice(0, 10);

  const filteredAssets = assetCategoryFilter === 'all'
    ? ETSY_ASSET_GALLERY
    : ETSY_ASSET_GALLERY.filter((a) => a.category === assetCategoryFilter);

  // Quick 6 luxury color themes
  const quickThemes = LUXURY_THEMES.slice(0, 6);

  // Arabic wedding fonts for selection
  const arabicFonts = FONT_OPTIONS.filter((f) => f.lang === 'ar');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-cairo">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-gold-950/40 via-stone-900/60 to-gold-950/40 border border-gold-500/30 rounded-3xl p-6 mb-8 text-center relative overflow-hidden shadow-luxury">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>الوضع السهل السريع • صمم بطاقتك خلال 60 ثانية</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-black text-stone-100 mb-2">
          تعبئة بيانات كرت المناسبة والطباعة المباشرة
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto">
          اختر القالب واملأ البيانات في الحقول المرتبة أدناه، وستظهر بطاقتك فوراً بتنسيق طباعة متطابق 100% وجاهز للتنزيل كملف PDF على الوجهين.
        </p>

        <button
          onClick={onSwitchToProStudio}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-gold-300 text-xs font-bold border border-gold-500/30 transition-all hover:scale-105"
        >
          <span>🎨 الانتقال للاستوديو المتقدم (تحكم كامل بالطبقات والمسارات)</span>
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
        </button>
      </div>

      {/* Main Grid: Wide Interactive Canvas on the RIGHT (7 cols), Form on the LEFT (5 cols) in Arabic RTL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ═══════════════════════════════════════════════════════════════════
            RIGHT COLUMN: Wide Interactive Preview (7 cols)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7 sticky top-6 space-y-4">
          <div className="bg-[#181720] border border-stone-800 rounded-3xl p-5 shadow-2xl space-y-4">
            {/* Top Preview Controls */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-stone-200">
                  المعاينة الحية الفورية (Live Preview)
                </span>
              </div>

              {/* Front vs Back Face Switcher */}
              <div className="flex items-center bg-[#121118] p-1 rounded-xl border border-stone-800 text-xs">
                <button
                  onClick={() => setActiveFace('front')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    activeFace === 'front'
                      ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  الوجه الأمامي
                </button>
                <button
                  onClick={() => setActiveFace('back')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    activeFace === 'back'
                      ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  الوجه الخلفي
                </button>
              </div>
            </div>

            {/* Floating Zoom & Full-Screen Toolbar right above the canvas */}
            <div className="flex items-center justify-between bg-[#121118] px-3.5 py-2 rounded-2xl border border-stone-800/80">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPreviewZoom(1.0)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    previewZoom === 1.0
                      ? 'bg-gold-500/25 text-gold-300 border border-gold-400/50'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="قياس حقيقي 1:1"
                >
                  <span>📏 1:1</span>
                </button>
                <button
                  onClick={() => setPreviewZoom(1.5)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    previewZoom === 1.5
                      ? 'bg-gold-500/25 text-gold-300 border border-gold-400/50'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="تكبير 150%"
                >
                  <span>🔍 150%</span>
                </button>
                <button
                  onClick={() => setPreviewZoom(2.0)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    previewZoom === 2.0
                      ? 'bg-gold-500/25 text-gold-300 border border-gold-400/50'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="تكبير 200%"
                >
                  <span>🔍 200%</span>
                </button>
              </div>

              <button
                onClick={() => setShowLivePreviewModal(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-gold-500/20 to-amber-500/20 text-gold-300 hover:from-gold-500/30 hover:to-amber-500/30 border border-gold-400/40 transition-all shadow-sm"
                title="عرض ملء الشاشة للتفتيش والمعاينة الدقيقة"
              >
                <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
                <span>🔲 عرض ملء الشاشة</span>
              </button>
            </div>

            {/* Enlarged SVG Live Canvas Container (min-h-[70vh] w-full) */}
            <div className="relative min-h-[70vh] w-full flex items-center justify-center bg-[#0F0E14] rounded-2xl overflow-hidden border border-stone-800/80 p-6 shadow-inner">
              <div
                className="relative transition-transform duration-200 ease-out origin-center flex items-center justify-center max-w-full max-h-[70vh] aspect-[600/860]"
                style={{ transform: `scale(${previewZoom})` }}
              >
                <svg
                  viewBox="0 0 600 860"
                  className="w-full h-full drop-shadow-2xl transition-all duration-300"
                >
                  <StudioDefsLibrary state={state} />
                  {activeFace === 'front' ? (
                    <FrontCardFacePiece state={state} />
                  ) : (
                    <BackCardFacePiece state={state} />
                  )}
                </svg>
              </div>
            </div>

            {/* Quick Metrics Bar & Action Button */}
            <div className="flex items-center justify-between text-xs text-stone-400 bg-[#121118] px-4 py-2.5 rounded-2xl border border-stone-800">
              <span className="font-semibold text-stone-300">
                القالب: <strong className="text-gold-300">{MASTER_TEMPLATES.find((t) => t.id === state.activeTemplateId)?.nameAr}</strong>
              </span>
              <span className="text-emerald-400 font-bold font-mono">300 DPI جاهز للطباعة</span>
            </div>

            {/* Direct Imposition Export Trigger */}
            <button
              onClick={onOpenImpositionModal}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] border border-emerald-400/40"
            >
              <FileDown className="w-5 h-5 stroke-[2.4]" />
              <span>📥 تحميل PDF جاهز للطباعة (A4 / A3 وجهين معاً)</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            LEFT COLUMN: Clean Stacked Text Inputs & Controls (5 cols)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 space-y-6">
          {/* STEP 0: Master Design Theme Engine (المدرسة الملكية الكلاسيكية | المدرسة النباتية الشفافة | مدرسة المجلات المودرن) */}
          <div className="bg-gradient-to-b from-[#1E1B26] via-[#16151D] to-[#131218] border border-gold-500/30 rounded-3xl p-5 space-y-3 shadow-luxury">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-stone-100">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>المدرسة الفنية للمناسبة (Design Theme Engine):</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-gold-500/15 text-gold-300 border border-gold-400/30">
                3 مدارس فنية ✦
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Theme A: Royal Classic */}
              <button
                type="button"
                onClick={() => {
                  const preset = getRoyalClassicThemePreset(state);
                  onUpdateState(preset);
                }}
                className={`p-2.5 rounded-2xl border text-right transition-all flex flex-col justify-between relative overflow-hidden ${
                  (state.designSchoolTheme || 'royal-classic') === 'royal-classic'
                    ? 'border-gold-400 bg-gradient-to-br from-[#292215] via-[#201A26] to-[#16141D] shadow-luxury ring-1 ring-gold-400/50 text-white'
                    : 'border-stone-800 bg-[#16151C] hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1 text-gold-300">
                    <span>👑</span>
                    <span>الملكية</span>
                  </span>
                  {(state.designSchoolTheme || 'royal-classic') === 'royal-classic' && (
                    <div className="w-3.5 h-3.5 rounded-full bg-gold-400 text-black flex items-center justify-center shrink-0">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-[9px] text-stone-400 mt-1 line-clamp-2 leading-tight">
                  أطر 24K مذهبة، ختم "دعوة" وخطوط ثلث ومشرق.
                </p>
              </button>

              {/* Theme B: Fine-Art Botanical */}
              <button
                type="button"
                onClick={() => {
                  const preset = getFineArtBotanicalThemePreset(state);
                  onUpdateState(preset);
                }}
                className={`p-2.5 rounded-2xl border text-right transition-all flex flex-col justify-between relative overflow-hidden ${
                  state.designSchoolTheme === 'fine-art-botanical'
                    ? 'border-emerald-400 bg-gradient-to-br from-[#1B291F] via-[#16211C] to-[#14161C] shadow-luxury ring-1 ring-emerald-400/50 text-white'
                    : 'border-stone-800 bg-[#16151C] hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1 text-emerald-300">
                    <span>🌿</span>
                    <span>النباتية</span>
                  </span>
                  {state.designSchoolTheme === 'fine-art-botanical' && (
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 text-black flex items-center justify-center shrink-0">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-[9px] text-stone-400 mt-1 line-clamp-2 leading-tight">
                  ورق قطني عاجي 350 GSM، ورود بالأطراف ونصوص فحمية.
                </p>
              </button>

              {/* Theme C: Modern Minimalist */}
              <button
                type="button"
                onClick={() => {
                  const preset = getModernMinimalistThemePreset(state);
                  onUpdateState(preset);
                }}
                className={`p-2.5 rounded-2xl border text-right transition-all flex flex-col justify-between relative overflow-hidden ${
                  state.designSchoolTheme === 'modern-minimalist'
                    ? 'border-white bg-gradient-to-br from-[#27272A] via-[#18181B] to-[#09090B] shadow-luxury ring-1 ring-white/50 text-white'
                    : 'border-stone-800 bg-[#16151C] hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1 text-stone-100">
                    <span>🖤</span>
                    <span>المودرن</span>
                  </span>
                  {state.designSchoolTheme === 'modern-minimalist' && (
                    <div className="w-3.5 h-3.5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-[9px] text-stone-400 mt-1 line-clamp-2 leading-tight">
                  بدون ورود، سواد نقي، وأسماء ضخمة جريئة.
                </p>
              </button>
            </div>
          </div>

          {/* STEP 1: The 10 Master Structural SVG Templates */}
          <div className="bg-[#181720] border border-stone-800 rounded-3xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-stone-200">
                <LayoutTemplate className="w-4 h-4 text-gold-400" />
                <span>1. اختر قالب القص الفاخر (The 10 Master Templates):</span>
              </span>
              <span className="text-[11px] text-stone-400 font-mono">
                {MASTER_TEMPLATES.find((t) => t.id === state.activeTemplateId)?.nameAr}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {quickTemplates.map((tpl) => {
                const isSelected = state.activeTemplateId === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => onUpdateState({ activeTemplateId: tpl.id })}
                    className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-between min-h-[90px] ${
                      isSelected
                        ? 'border-gold-400 bg-gold-500/15 shadow-gold-glow ring-1 ring-gold-400/50'
                        : 'border-stone-800 bg-[#131218] hover:border-stone-700 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-xl">
                      {tpl.id === 'royal-arch'
                        ? '👑'
                        : tpl.id === 'pullout-oval'
                        ? '💌'
                        : tpl.id === 'circular-cascade'
                        ? '🌹'
                        : tpl.id === 'asymmetric-gatefold'
                        ? '🎀'
                        : tpl.id === 'french-scallop'
                        ? '🌸'
                        : tpl.id === 'islamic-dome'
                        ? '🕌'
                        : tpl.id === 'slit-lock-gatefold'
                        ? '🔐'
                        : tpl.id === 'vertical-capsule'
                        ? '💊'
                        : tpl.id === 'chamfered-plaque'
                        ? '📐'
                        : '✉️'}
                    </span>
                    <span className="text-[10px] font-bold line-clamp-2 text-stone-200 mt-1 leading-tight">
                      {tpl.nameAr}
                    </span>
                    {isSelected && (
                      <span className="w-3.5 h-3.5 rounded-full bg-gold-400 text-black flex items-center justify-center text-[9px] font-bold mt-1">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Built-in Etsy Asset Gallery */}
          <div className="bg-[#181720] border border-stone-800 rounded-3xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-2 text-sm font-bold text-stone-200">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>2. معرض الأصول والصور الحقيقية (Etsy Asset Gallery):</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">15 صورة عالية الدقة ✦</span>
            </div>

            {state.designSchoolTheme === 'modern-minimalist' ? (
              <div className="p-3.5 rounded-2xl bg-[#141418] border border-stone-800 text-stone-300 text-xs flex items-center gap-2">
                <span>🖤</span>
                <span>المدرسة المودرن مفعلة: تصميم خالٍ من الزهور مع تركيز كامل على هندسة الحروف العصرية.</span>
              </div>
            ) : (
              <>
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: 'all' as const, label: 'الكل (15)' },
                    { id: 'florals' as const, label: '🌸 ورود مائية' },
                    { id: 'foil-frames' as const, label: '✨ إطارات ذهب' },
                    { id: 'textures' as const, label: '📜 خامات الورق' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setAssetCategoryFilter(cat.id)}
                      className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
                        assetCategoryFilter === cat.id
                          ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40'
                          : 'bg-[#131218] text-stone-400 border border-stone-800 hover:text-stone-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Grid of Real Asset Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto p-1 bg-[#121118] rounded-2xl border border-stone-800">
                  {filteredAssets.map((asset) => {
                    const isSelected = state.activeFloralArtworkId === asset.id || state.customBackgroundImage === asset.imageUrl;
                    return (
                      <button
                        key={asset.id}
                        type="button"
                        onClick={() => {
                          onUpdateState({
                            activeFloralArtworkId: asset.id,
                            customBackgroundImage: asset.imageUrl,
                            imagePlacementMode: asset.recommendedPlacement,
                            bgImageOpacity: asset.defaultOpacity
                          });
                        }}
                        className={`p-2 rounded-xl border text-right transition-all flex flex-col justify-between h-24 relative overflow-hidden group ${
                          isSelected
                            ? 'border-gold-400 bg-gold-500/15 shadow-gold-glow ring-1 ring-gold-400/50'
                            : 'border-stone-800 bg-[#15141C] hover:border-stone-700 text-stone-300'
                        }`}
                      >
                        <div className="w-full h-8 rounded-lg overflow-hidden relative mb-1 shrink-0">
                          <img
                            src={asset.thumbnailUrl}
                            alt={asset.nameAr}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="truncate">
                          <span className="text-[11px] font-bold text-stone-100 block truncate">
                            {asset.nameAr}
                          </span>
                          <span className="text-[9px] text-stone-400 font-mono block truncate">
                            {asset.nameEn}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 rounded-full bg-gold-400 text-black flex items-center justify-center text-[9px] font-bold">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* STEP 3: Quick Theme & Color Palette */}
          <div className="bg-[#181720] border border-stone-800 rounded-3xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-stone-200">
                <Palette className="w-4 h-4 text-gold-400" />
                <span>2. ألوان وثيم المناسبة (Theme):</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {quickThemes.map((thm) => {
                const isSelected = state.selectedPaletteId === thm.id;
                return (
                  <button
                    key={thm.id}
                    onClick={() =>
                      onUpdateState({
                        selectedPaletteId: thm.id,
                        cardBaseColor: thm.cardBaseColor,
                        artworkColor: thm.artworkColor,
                        secondaryPieceColor: thm.secondaryPieceColor,
                        textColor: thm.textColor,
                        backDesign: {
                          ...state.backDesign,
                          backgroundColor: thm.backBackgroundColor || thm.cardBaseColor,
                          artworkColor: thm.backArtworkColor || thm.artworkColor
                        }
                      })
                    }
                    className={`p-2.5 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'border-gold-400 bg-gold-500/15 shadow-gold-glow ring-1 ring-gold-400/50'
                        : 'border-stone-800 bg-[#131218] hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="flex -space-x-1 shrink-0">
                      <div
                        className="w-5 h-5 rounded-full border border-stone-700 shadow-sm"
                        style={{ backgroundColor: thm.cardBaseColor }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border border-stone-700 shadow-sm"
                        style={{ backgroundColor: thm.artworkColor }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border border-stone-700 shadow-sm"
                        style={{ backgroundColor: thm.textColor }}
                      />
                    </div>
                    <div className="truncate">
                      <span className="text-xs font-bold text-stone-100 block truncate">
                        {thm.nameAr}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Arabic Wedding Fonts Suite */}
          <div className="bg-[#181720] border border-stone-800 rounded-3xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-stone-200">
                <Type className="w-4 h-4 text-gold-400" />
                <span>3. خط الأسماء والكاليغرافي العربي (Font):</span>
              </span>
            </div>

            <select
              value={state.names.fontFamily}
              onChange={(e) =>
                onUpdateState({
                  names: { ...state.names, fontFamily: e.target.value }
                })
              }
              className="w-full bg-[#131218] text-gold-300 font-bold px-3.5 py-2.5 rounded-2xl border border-gold-500/40 text-xs focus:outline-none cursor-pointer"
            >
              {arabicFonts.map((f) => (
                <option key={f.id} value={f.fontFamily}>
                  {f.nameAr} ({f.nameEn})
                </option>
              ))}
            </select>
          </div>

          {/* STEP 4: Top Calligraphic Header Emblem */}
          <div className="bg-[#181720] border border-stone-800 rounded-3xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-stone-200">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>4. ختم وترويسة الدعوة العلوية:</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'dawah-circle' as CalligraphyHeaderType, title: 'ختم "دَعْوَة" الدائري', icon: '⭕' },
                { id: 'basmala' as CalligraphyHeaderType, title: 'البسملة المذهبة', icon: '✨' },
                { id: 'monogram' as CalligraphyHeaderType, title: 'مونوغرام الحروف', icon: '👑' },
                { id: 'none' as CalligraphyHeaderType, title: 'بدون ترويسة', icon: '➖' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onUpdateState({ calligraphyHeaderType: item.id })}
                  className={`p-2.5 rounded-2xl border text-right transition-all flex items-center gap-2 ${
                    state.calligraphyHeaderType === item.id
                      ? 'border-gold-400 bg-gold-500/15 text-gold-300 ring-1 ring-gold-400/50'
                      : 'border-stone-800 bg-[#131218] text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="text-xs font-bold">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 5: Stacked Line-by-Line Invitation Details */}
          <div className="bg-[#181720] border border-stone-800 rounded-3xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-sm font-bold text-gold-300 border-b border-stone-800 pb-3">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>5. نصوص وتفاصيل الدعوة:</span>
            </div>

            {/* 1. عبارة الترحيب */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-300 block">
                1. عبارة الترحيب والاستهلال:
              </label>
              <input
                type="text"
                value={state.greeting.text || 'بكل الحب والتقدير نتشرف بدعوتكم لحضور حفل زفاف'}
                onChange={(e) =>
                  onUpdateState({
                    greeting: { ...state.greeting, text: e.target.value }
                  })
                }
                placeholder="مثال: بكل الحب والتقدير نتشرف بدعوتكم..."
                className="w-full bg-[#131218] border border-stone-700 rounded-2xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition-all font-semibold"
              />
            </div>

            {/* 2. اسم العريس والعروسين */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gold-300 block">
                2. اسم العريس / العروسين (الخط البارز):
              </label>
              <input
                type="text"
                value={state.names.text || 'سراج & بركات'}
                onChange={(e) =>
                  onUpdateState({
                    names: { ...state.names, text: e.target.value }
                  })
                }
                placeholder="مثال: سراج & بركات"
                className="w-full bg-[#131218] border border-gold-500/60 rounded-2xl px-4 py-2.5 text-sm font-bold text-gold-200 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/40 transition-all"
              />
            </div>

            {/* 3. نص الدعوة السردي */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-300 block">
                3. نص صلب الدعوة:
              </label>
              <textarea
                rows={2}
                value={
                  state.invitationParagraph ||
                  'وذلك بمشيئة الله تعالى وتوفيقه، لتكتمل فرحتنا بلقياكم وسماع أصدق دعواتكم'
                }
                onChange={(e) => onUpdateState({ invitationParagraph: e.target.value })}
                placeholder="مثال: وذلك بمشيئة الله تعالى وتوفيقه..."
                className="w-full bg-[#131218] border border-stone-700 rounded-2xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition-all resize-none"
              />
            </div>

            {/* 4. اليوم والتاريخ */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>4. اليوم والتاريخ:</span>
              </label>
              <input
                type="text"
                value={state.eventDayAndDate || state.date.text || 'يوم السبت | 01.08.2026'}
                onChange={(e) =>
                  onUpdateState({
                    eventDayAndDate: e.target.value,
                    date: { ...state.date, text: e.target.value }
                  })
                }
                placeholder="مثال: يوم السبت 01.08.2026"
                className="w-full bg-[#131218] border border-stone-700 rounded-2xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            {/* 5. اسم القاعة والعنوان */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>5. القاعة والمكان:</span>
              </label>
              <input
                type="text"
                value={state.eventVenue || state.location.text || 'قاعة فرح - شارع الجامعة'}
                onChange={(e) =>
                  onUpdateState({
                    eventVenue: e.target.value,
                    location: { ...state.location, text: e.target.value }
                  })
                }
                placeholder="مثال: قاعة فرح - شارع الجامعة"
                className="w-full bg-[#131218] border border-stone-700 rounded-2xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            {/* 6. الساعة والموعد */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>6. موعد الحضور:</span>
              </label>
              <input
                type="text"
                value={state.eventTime || 'الساعة 8:00 مساءً'}
                onChange={(e) => onUpdateState({ eventTime: e.target.value })}
                placeholder="مثال: الثامنة مساءً"
                className="w-full bg-[#131218] border border-stone-700 rounded-2xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            {/* 7. الداعي / محبكم */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-300 block">
                7. اسم الداعي / المضيف:
              </label>
              <input
                type="text"
                value={state.hostName || 'الداعي: الحاج زياد قاسم خطيب / محبكم'}
                onChange={(e) => onUpdateState({ hostName: e.target.value })}
                placeholder="مثال: الداعي: الحاج زياد قاسم خطيب / محبكم"
                className="w-full bg-[#131218] border border-stone-700 rounded-2xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Live Preview Modal */}
      {showLivePreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn">
          <div className="bg-[#16151C] border border-gold-500/40 rounded-3xl p-6 max-w-4xl w-full flex flex-col items-center space-y-4 shadow-2xl">
            <div className="w-full flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100">
                معاينة الكرت بالحجم الطبيعي المكبر • {activeFace === 'front' ? 'الوجه الأمامي' : 'الوجه الخلفي'}
              </h3>
              <button
                onClick={() => setShowLivePreviewModal(false)}
                className="text-stone-400 hover:text-white px-3.5 py-1.5 rounded-xl bg-stone-800 text-xs font-bold"
              >
                إغلاق (Esc)
              </button>
            </div>

            <div className="w-full max-w-md aspect-[600/860] flex items-center justify-center p-2">
              <svg viewBox="0 0 600 860" className="w-full h-full drop-shadow-2xl">
                <StudioDefsLibrary state={state} />
                {activeFace === 'front' ? (
                  <FrontCardFacePiece state={state} />
                ) : (
                  <BackCardFacePiece state={state} />
                )}
              </svg>
            </div>

            <button
              onClick={() => {
                setShowLivePreviewModal(false);
                onOpenImpositionModal();
              }}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg"
            >
              الانتقال لتجهيز فرخ الطباعة PDF (A4 / A3)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickFillFormMode;
