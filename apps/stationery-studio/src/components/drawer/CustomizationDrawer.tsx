import React, { useState } from 'react';
import {
  Type,
  Maximize2,
  QrCode,
  Palette,
  ChevronDown,
  SlidersHorizontal,
  LayoutTemplate,
  Sparkles,
  Crown,
  Printer,
  Layers,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import {
  ArtworkPatternStyle,
  BackDesignConfig,
  DesignSchoolTheme,
  FoilTargets,
  InterlockingMonogramConfig,
  LuxuryTheme,
  MasterTemplateId,
  PrintBleedConfig,
  QrConfig,
  StudioState,
  TextElementConfig
} from '../../types/studio';
import { SmartActionButtons } from './SmartActionButtons';
import { TemplateSelectorAccordion } from './TemplateSelectorAccordion';
import { CardArtworkColorsSection } from './CardArtworkColorsSection';
import { FloralArtworkSection } from './FloralArtworkSection';
import { TextControlsAccordion } from './TextControlsAccordion';
import { SizeStructureAccordion } from './SizeStructureAccordion';
import { SmartAddonsAccordion } from './SmartAddonsAccordion';
import { BackDesignSection } from './BackDesignSection';
import { PaperAndFoilSection } from './PaperAndFoilSection';
import { MonogramBuilderSection } from './MonogramBuilderSection';
import { PrintBleedSection } from './PrintBleedSection';
import { CURATED_LUXURY_SUITES } from '../../data/curatedSuites';
import {
  LUXURY_THEMES,
  getRoyalClassicThemePreset,
  getFineArtBotanicalThemePreset,
  getModernMinimalistThemePreset
} from '../../data/templates';

interface CustomizationDrawerProps {
  state: StudioState;
  onUpdateState: (updates: Partial<StudioState>) => void;
  onSelectTemplate: (templateId: MasterTemplateId) => void;
  onToggleFlowerInserted: () => void;
  onUpdateColors: (updates: {
    cardBaseColor?: string;
    artworkColor?: string;
    artworkGradientEnd?: string;
    secondaryPieceColor?: string;
    textColor?: string;
    artworkPatternStyle?: ArtworkPatternStyle;
  }) => void;
  onSelectTheme: (theme: LuxuryTheme) => void;
  onUpdateText: (key: keyof Pick<StudioState, 'names' | 'greeting' | 'monogram' | 'date' | 'location' | 'ringDate'>, config: Partial<TextElementConfig>) => void;
  onUpdateIsoDate: (isoDate: string) => void;
  onUpdateQr: (updates: Partial<QrConfig>) => void;
  onApplyPreset: () => void;
  onGenerateAiTheme: () => void;
  onUpdateBackDesign: (updates: Partial<BackDesignConfig>) => void;
  onUpdateFoilTargets: (targets: Partial<FoilTargets>) => void;
  onUpdateMonogramBuilder: (updates: Partial<InterlockingMonogramConfig>) => void;
  onUpdatePrintBleed: (updates: Partial<PrintBleedConfig>) => void;
}

export const CustomizationDrawer: React.FC<CustomizationDrawerProps> = ({
  state,
  onUpdateState,
  onSelectTemplate,
  onToggleFlowerInserted,
  onUpdateColors,
  onSelectTheme,
  onUpdateText,
  onUpdateIsoDate,
  onUpdateQr,
  onApplyPreset,
  onGenerateAiTheme,
  onUpdateBackDesign,
  onUpdateFoilTargets,
  onUpdateMonogramBuilder,
  onUpdatePrintBleed
}) => {
  // Top Face Tabs: Front vs. Back Controls
  const [activeTab, setActiveTab] = useState<'front' | 'back'>(
    state.activeCardFace === 'back' ? 'back' : 'front'
  );

  const handleTabChange = (tab: 'front' | 'back') => {
    setActiveTab(tab);
    if (state.activeCardFace !== 'both') {
      onUpdateState({ activeCardFace: tab });
    }
  };

  const handleSyncBackWithTheme = () => {
    const activeTheme =
      LUXURY_THEMES.find((t) => t.id === state.selectedPaletteId) || LUXURY_THEMES[0];
    onUpdateBackDesign({
      backgroundColor: activeTheme.backBackgroundColor || '#58111A',
      artworkColor: activeTheme.backArtworkColor || activeTheme.accentColor || '#D4AF37'
    });
  };

  // Accordion open states for Front controls
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    colors: false,
    paperFoil: true, // Opened by default for immediate photorealistic feedback!
    floralArt: true, // Opened by default for floral & watercolor artwork!
    monogramBuilder: false,
    templates: false,
    text: false,
    size: false,
    addons: false,
    printBleed: false
  });

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  return (
    <aside className="w-full lg:w-[440px] xl:w-[480px] h-full bg-[#141318] border-r border-stone-800/90 flex flex-col overflow-hidden select-none z-10">
      {/* Drawer Header */}
      <div className="p-4 border-b border-stone-800/80 bg-[#17161D] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-stone-100">درج التخصيص والتحكم الذكي</h2>
            <p className="text-[11px] text-stone-400">استوديو مكتبة حروف للتصميم والإنتاج</p>
          </div>
        </div>

        <span className="text-[10px] bg-gold-500/10 text-gold-300 px-2 py-0.5 rounded-full border border-gold-500/30 font-mono">
          إصدار الإنتاج 2026
        </span>
      </div>

      {/* 👑 MASTER DESIGN THEME ENGINE (المدرسة الملكية الكلاسيكية vs. المدرسة النباتية الشفافة) */}
      <div className="p-3.5 bg-gradient-to-b from-[#1C1A24] via-[#16151D] to-[#121116] border-b border-stone-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>المدرسة الفنية (Design Theme Engine):</span>
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-gold-500/15 text-gold-300 border border-gold-400/30">
            تحول جمالي شامل ✦
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Theme A: Royal Classic */}
          <button
            onClick={() => {
              const preset = getRoyalClassicThemePreset(state);
              onUpdateState(preset);
            }}
            className={`p-2 rounded-2xl border text-right transition-all flex flex-col justify-between relative overflow-hidden ${
              (state.designSchoolTheme || 'royal-classic') === 'royal-classic'
                ? 'border-gold-400 bg-gradient-to-br from-[#292215] via-[#201A26] to-[#16141D] shadow-luxury ring-1 ring-gold-400/50 text-white'
                : 'border-stone-800 bg-[#16151C] hover:border-stone-700 text-stone-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold flex items-center gap-1 text-gold-300">
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
              أطر 24K مذهبة، ختم "دعوة" وخطوط ثلث عريقة.
            </p>
          </button>

          {/* Theme B: Fine-Art Botanical */}
          <button
            onClick={() => {
              const preset = getFineArtBotanicalThemePreset(state);
              onUpdateState(preset);
            }}
            className={`p-2 rounded-2xl border text-right transition-all flex flex-col justify-between relative overflow-hidden ${
              state.designSchoolTheme === 'fine-art-botanical'
                ? 'border-emerald-400 bg-gradient-to-br from-[#1B291F] via-[#16211C] to-[#14161C] shadow-luxury ring-1 ring-emerald-400/50 text-white'
                : 'border-stone-800 bg-[#16151C] hover:border-stone-700 text-stone-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold flex items-center gap-1 text-emerald-300">
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
              ورق قطني عاجي 350 GSM، ورود مائية ونصوص فحمية.
            </p>
          </button>

          {/* Theme C: Modern Minimalist */}
          <button
            onClick={() => {
              const preset = getModernMinimalistThemePreset(state);
              onUpdateState(preset);
            }}
            className={`p-2 rounded-2xl border text-right transition-all flex flex-col justify-between relative overflow-hidden ${
              state.designSchoolTheme === 'modern-minimalist'
                ? 'border-white bg-gradient-to-br from-[#27272A] via-[#18181B] to-[#09090B] shadow-luxury ring-1 ring-white/50 text-white'
                : 'border-stone-800 bg-[#16151C] hover:border-stone-700 text-stone-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold flex items-center gap-1 text-stone-100">
                <span>🖤</span>
                <span>المجلات المودرن</span>
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

      {/* Front vs. Back Design Mode Segmented Switcher */}
      <div className="p-3 bg-[#17161D] border-b border-stone-800/80">
        <div className="grid grid-cols-2 p-1 bg-[#121116] rounded-2xl border border-stone-800/90 shadow-inner">
          <button
            onClick={() => handleTabChange('front')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'front'
                ? 'bg-gradient-to-r from-gold-500/20 via-gold-400/25 to-amber-500/20 text-gold-200 border border-gold-400/50 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>📄</span>
            <span>الوجه الأمامي (التفاصيل)</span>
          </button>
          <button
            onClick={() => handleTabChange('back')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'back'
                ? 'bg-gradient-to-r from-gold-500/20 via-gold-400/25 to-amber-500/20 text-gold-200 border border-gold-400/50 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>🎴</span>
            <span>الوجه الخلفي (القفا الملكي)</span>
          </button>
        </div>
      </div>

      {/* Scrollable Accordions Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'back' ? (
          /* BACK DESIGN CONTROLS (فصل تام عن الوجه الأمامي) */
          <BackDesignSection
            state={state}
            onUpdateBackDesign={onUpdateBackDesign}
            onSyncWithActiveTheme={handleSyncBackWithTheme}
          />
        ) : (
          /* FRONT DESIGN CONTROLS */
          <>
            {/* 👑 MASTER CURATED LUXURY SUITES (أطقم الأعراس الفاخرة الجاهزة بنقرة واحدة - Etsy Best-Sellers) */}
            <div className="p-3.5 bg-gradient-to-br from-[#1C1A24] via-[#16151D] to-[#121116] border border-gold-500/35 rounded-2xl space-y-2.5 shadow-luxury">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-gold-500/20 text-gold-300 border border-gold-400/40">
                  تنسيق متكامل 100% بنقرة واحدة ✨
                </span>
                <span className="text-xs font-bold text-stone-100 flex items-center gap-1.5">
                  <span>الأطقم الملكية الجاهزة (Curated Suites):</span>
                  <Crown className="w-4 h-4 text-gold-400" />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {CURATED_LUXURY_SUITES.map((suite) => {
                  const isActive = state.curatedSuiteId === suite.id;
                  return (
                    <button
                      key={suite.id}
                      onClick={() => {
                        const updates = suite.applyPreset(state);
                        onUpdateState(updates);
                      }}
                      className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between relative overflow-hidden group ${
                        isActive
                          ? `border-gold-400 bg-gradient-to-br ${suite.thumbnailColor} shadow-luxury ring-1 ring-gold-400/60 text-white`
                          : `border-stone-800 bg-gradient-to-br ${suite.thumbnailColor} opacity-75 hover:opacity-100 hover:border-stone-600 text-stone-200`
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/40 text-gold-300 border border-gold-500/30">
                          {suite.badge}
                        </span>
                        {isActive && (
                          <div className="w-4 h-4 rounded-full bg-gold-400 text-black flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-stone-100 leading-tight">
                        {suite.nameAr}
                      </h4>
                      <p className="text-[9px] text-stone-300/80 mt-1 line-clamp-2 leading-snug">
                        {suite.taglineAr}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1. TOP SMART AI & PRESET ACTION BUTTONS */}
            <section>
              <SmartActionButtons
                onApplyPreset={onApplyPreset}
                onGenerateAiTheme={onGenerateAiTheme}
                currentThemeName={state.activeAiThemeName}
              />
            </section>

        {/* 2. ACCORDION 1: "🎨 ألوان الكرت والتصميم (Card & Artwork Colors)" */}
        <div className="border border-stone-800/90 rounded-2xl overflow-hidden bg-[#16151B] transition-all">
          <button
            onClick={() => toggleSection('colors')}
            className="w-full flex items-center justify-between p-3.5 text-right hover:bg-stone-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-200">ألوان الكرت والتصميم (Card & Artwork Colors)</span>
                <span className="text-[10px] text-stone-400 block">الأرضية، الزخارف، القطعة الإضافية، و12 ثيماً جاهزاً</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                openSections.colors ? 'transform rotate-180 text-gold-400' : ''
              }`}
            />
          </button>

          {openSections.colors && (
            <div className="p-3.5 pt-0 border-t border-stone-800/60">
              <CardArtworkColorsSection
                state={state}
                onUpdateColors={onUpdateColors}
                onSelectTheme={onSelectTheme}
              />
            </div>
          )}
        </div>

        {/* 3. ACCORDION: "✨ خامة الورق والختم الحراري (Paper Stock & Hot-Foil)" */}
        <div className="border border-stone-800/90 rounded-2xl overflow-hidden bg-[#16151B] transition-all">
          <button
            onClick={() => toggleSection('paperFoil')}
            className="w-full flex items-center justify-between p-3.5 text-right hover:bg-stone-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-200">خامة الورق والختم الحراري (Paper & Hot-Foil)</span>
                <span className="text-[10px] text-stone-400 block">ورق قطني/كتان/صدفي، حفر بارز، وذهب عيار 24</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                openSections.paperFoil ? 'transform rotate-180 text-gold-400' : ''
              }`}
            />
          </button>

          {openSections.paperFoil && (
            <div className="p-3.5 pt-0 border-t border-stone-800/60">
              <PaperAndFoilSection
                state={state}
                onUpdateState={onUpdateState}
                onUpdateFoilTargets={onUpdateFoilTargets}
              />
            </div>
          )}
        </div>

        {/* ACCORDION: "🖼️ خلفيات ورسوم الزهور الفاخرة (Floral & Watercolor Artwork)" */}
        <div className="border border-stone-800/90 rounded-2xl overflow-hidden bg-[#16151B] transition-all">
          <button
            onClick={() => toggleSection('floralArt')}
            className="w-full flex items-center justify-between p-3.5 text-right hover:bg-stone-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-200">خلفيات ورسوم الزهور الفاخرة (Floral & Artwork)</span>
                <span className="text-[10px] text-stone-400 block">تموجات مائية ملكية، أو رفع لوحة زهور عالية الدقة</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                openSections.floralArt ? 'transform rotate-180 text-gold-400' : ''
              }`}
            />
          </button>

          {openSections.floralArt && (
            <div className="p-3.5 pt-0 border-t border-stone-800/60">
              <FloralArtworkSection
                state={state}
                onUpdateState={onUpdateState}
              />
            </div>
          )}
        </div>

        {/* 3. ACCORDION 2: MASTER TEMPLATES SELECTOR */}
        <div className="border border-stone-800/90 rounded-2xl overflow-hidden bg-[#16151B] transition-all">
          <button
            onClick={() => toggleSection('templates')}
            className="w-full flex items-center justify-between p-3.5 text-right hover:bg-stone-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center">
                <LayoutTemplate className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-200">مكتبة القوالب الهندسية (20 قالب احترافي)</span>
                <span className="text-[10px] text-stone-400 block">دعوات ملكية، أطقم متكاملة، تاغات، علب، وستاندات</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                openSections.templates ? 'transform rotate-180 text-gold-400' : ''
              }`}
            />
          </button>

          {openSections.templates && (
            <div className="p-3.5 pt-0 border-t border-stone-800/60">
              <TemplateSelectorAccordion
                state={state}
                onSelectTemplate={onSelectTemplate}
                onToggleFlowerInserted={onToggleFlowerInserted}
                onUpdateState={onUpdateState}
              />
            </div>
          )}
        </div>

        {/* 4. ACCORDION 3: TEXT CONTROLS */}
        <div className="border border-stone-800/90 rounded-2xl overflow-hidden bg-[#16151B] transition-all">
          <button
            onClick={() => toggleSection('text')}
            className="w-full flex items-center justify-between p-3.5 text-right hover:bg-stone-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center">
                <Type className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-200">تخصيص النصوص والخطوط</span>
                <span className="text-[10px] text-stone-400 block">الأسماء، الترحيب، المونوغرام، التاريخ والتقويم</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                openSections.text ? 'transform rotate-180 text-gold-400' : ''
              }`}
            />
          </button>

          {openSections.text && (
            <div className="p-3.5 pt-0 border-t border-stone-800/60">
              <TextControlsAccordion
                state={state}
                onUpdateText={onUpdateText}
                onUpdateIsoDate={onUpdateIsoDate}
                onUpdateState={onUpdateState}
              />
            </div>
          )}
        </div>

        {/* ACCORDION: "👑 مصمم الشعار الملكي المتداخل (Monogram Builder)" */}
        <div className="border border-stone-800/90 rounded-2xl overflow-hidden bg-[#16151B] transition-all">
          <button
            onClick={() => toggleSection('monogramBuilder')}
            className="w-full flex items-center justify-between p-3.5 text-right hover:bg-stone-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-200">مصمم الشعار الملكي المتداخل (Monogram Builder)</span>
                <span className="text-[10px] text-stone-400 block">تداخل الحروف، إكليل الغار، ودرع التتويج الملكي</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                openSections.monogramBuilder ? 'transform rotate-180 text-gold-400' : ''
              }`}
            />
          </button>

          {openSections.monogramBuilder && (
            <div className="p-3.5 pt-0 border-t border-stone-800/60">
              <MonogramBuilderSection
                state={state}
                onUpdateMonogramBuilder={onUpdateMonogramBuilder}
                onUpdateState={onUpdateState}
              />
            </div>
          )}
        </div>

        {/* 5. ACCORDION 4: SIZE & STRUCTURE */}
        <div className="border border-stone-800/90 rounded-2xl overflow-hidden bg-[#16151B] transition-all">
          <button
            onClick={() => toggleSection('size')}
            className="w-full flex items-center justify-between p-3.5 text-right hover:bg-stone-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-200">المقاس وهيكل التصميم</span>
                <span className="text-[10px] text-stone-400 block">المقاسات القياسية، متعدد القطع، ملمس الورق</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                openSections.size ? 'transform rotate-180 text-gold-400' : ''
              }`}
            />
          </button>

          {openSections.size && (
            <div className="p-3.5 pt-0 border-t border-stone-800/60">
              <SizeStructureAccordion state={state} onUpdateState={onUpdateState} />
            </div>
          )}
        </div>

        {/* 6. ACCORDION 5: SMART ADD-ONS (QR CODE) */}
        <div className="border border-stone-800/90 rounded-2xl overflow-hidden bg-[#16151B] transition-all">
          <button
            onClick={() => toggleSection('addons')}
            className="w-full flex items-center justify-between p-3.5 text-right hover:bg-stone-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-200">الإضافات الذكية (Smart Add-ons)</span>
                <span className="text-[10px] text-stone-400 block">رمز الاستجابة السريعة SVG QR Code التفاعلي</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                openSections.addons ? 'transform rotate-180 text-gold-400' : ''
              }`}
            />
          </button>

          {openSections.addons && (
            <div className="p-3.5 pt-0 border-t border-stone-800/60">
              <SmartAddonsAccordion
                state={state}
                onUpdateQr={onUpdateQr}
              />
            </div>
          )}
        </div>

        {/* 7. ACCORDION 6: COMMERCIAL PRINT BLEED & REGISTRATION MARKS */}
        <div className="border border-stone-800/90 rounded-2xl overflow-hidden bg-[#16151B] transition-all">
          <button
            onClick={() => toggleSection('printBleed')}
            className="w-full flex items-center justify-between p-3.5 text-right hover:bg-stone-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-pink-500/15 text-pink-400 flex items-center justify-center">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-200">هندسة الطباعة والتسييل (Print & 3mm Bleed)</span>
                <span className="text-[10px] text-stone-400 block">تسييل 3mm، منطقة الأمان، وعلامات المحاذاة البصرية</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                openSections.printBleed ? 'transform rotate-180 text-pink-400' : ''
              }`}
            />
          </button>

          {openSections.printBleed && (
            <div className="p-3.5 pt-0 border-t border-stone-800/60">
              <PrintBleedSection
                state={state}
                onUpdatePrintBleed={onUpdatePrintBleed}
              />
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </aside>
  );
};
