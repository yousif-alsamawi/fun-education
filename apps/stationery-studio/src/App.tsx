import React, { useRef, useState } from 'react';
import {
  ArtworkPatternStyle,
  BackDesignConfig,
  FoilTargets,
  InterlockingMonogramConfig,
  LuxuryTheme,
  MasterTemplateId,
  PrintBleedConfig,
  QrConfig,
  StudioState,
  StudioUIMode,
  TextElementConfig
} from './types/studio';
import { INITIAL_STUDIO_STATE, LUXURY_THEMES, MASTER_TEMPLATES } from './data/templates';
import { StudioHeader } from './components/layout/StudioHeader';
import { LiveCanvasArea } from './components/canvas/LiveCanvasArea';
import { CustomizationDrawer } from './components/drawer/CustomizationDrawer';
import { ExportEngineBar } from './components/layout/ExportEngineBar';
import { AssemblyGuideModal } from './components/layout/AssemblyGuideModal';
import { DuplexImpositionModal } from './components/imposition/DuplexImpositionModal';
import { QuickFillFormMode } from './components/quickform/QuickFillFormMode';
import { generateProceduralDesign } from './utils/proceduralGenerator';

export const App: React.FC = () => {
  const [state, setState] = useState<StudioState>(INITIAL_STUDIO_STATE);
  const [studioUIMode, setStudioUIMode] = useState<StudioUIMode>('quick-fill');
  const [isAssemblyGuideOpen, setIsAssemblyGuideOpen] = useState(false);
  const [isImpositionModalOpen, setIsImpositionModalOpen] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Active theme object from the 12 themes
  const activeTheme = LUXURY_THEMES.find((t) => t.id === state.selectedPaletteId) || LUXURY_THEMES[0];

  // Update top-level state fields
  const handleUpdateState = (updates: Partial<StudioState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  // Switch Master Template
  const handleSelectTemplate = (templateId: MasterTemplateId) => {
    const tmplInfo = MASTER_TEMPLATES.find((t) => t.id === templateId) || MASTER_TEMPLATES[0];
    setState((prev) => ({
      ...prev,
      activeTemplateId: templateId,
      selectedSizeId: tmplInfo.defaultSizeId,
      templateType: templateId === 'floral-fan' ? 'composite' : 'flat',
      isAssemblyMode: true
    }));
  };

  // Toggle Template 2 Flower Slit-Lock Insertion
  const handleToggleFlowerInserted = () => {
    setState((prev) => ({
      ...prev,
      isFlowerInserted: !prev.isFlowerInserted
    }));
  };

  // Multi-Layer Color Updates
  const handleUpdateColors = (updates: {
    cardBaseColor?: string;
    artworkColor?: string;
    artworkGradientEnd?: string;
    secondaryPieceColor?: string;
    textColor?: string;
    artworkPatternStyle?: ArtworkPatternStyle;
  }) => {
    setState((prev) => {
      const nextState = { ...prev, ...updates };

      // If text color changed, sync it to text elements
      if (updates.textColor) {
        nextState.names = { ...prev.names, color: updates.textColor };
        nextState.greeting = { ...prev.greeting, color: updates.textColor };
        nextState.date = { ...prev.date, color: updates.textColor };
        nextState.location = { ...prev.location, color: updates.textColor };
        nextState.ringDate = { ...prev.ringDate, color: updates.textColor };
        nextState.qrCode = { ...prev.qrCode, color: updates.textColor };
      }

      // If artwork color changed, sync monogram
      if (updates.artworkColor) {
        nextState.monogram = { ...prev.monogram, color: updates.artworkColor };
      }

      return nextState;
    });
  };

  // Select a theme from the 12 curated Etsy-style themes
  const handleSelectTheme = (theme: LuxuryTheme) => {
    setState((prev) => ({
      ...prev,
      selectedPaletteId: theme.id,
      activeAiThemeName: theme.nameAr,
      cardBaseColor: theme.cardBaseColor,
      artworkColor: theme.artworkColor,
      artworkGradientEnd: theme.artworkGradientEnd || theme.artworkColor,
      secondaryPieceColor: theme.secondaryPieceColor,
      textColor: theme.textColor,
      artworkPatternStyle: theme.patternStyle,
      foilEffect: theme.foil,
      paperTexture: theme.paperTexture,

      // Synchronize back colors with the selected luxury theme
      backDesign: {
        ...prev.backDesign,
        backgroundColor: theme.backBackgroundColor || prev.backDesign.backgroundColor,
        artworkColor: theme.backArtworkColor || prev.backDesign.artworkColor
      },

      // Synchronize text elements harmoniously
      names: { ...prev.names, color: theme.textColor },
      greeting: { ...prev.greeting, color: theme.textColor },
      monogram: { ...prev.monogram, color: theme.artworkColor },
      date: { ...prev.date, color: theme.textColor },
      location: { ...prev.location, color: theme.artworkColor },
      ringDate: { ...prev.ringDate, color: theme.textColor },
      qrCode: { ...prev.qrCode, color: theme.textColor }
    }));
  };

  // Update back card design
  const handleUpdateBackDesign = (updates: Partial<BackDesignConfig>) => {
    setState((prev) => ({
      ...prev,
      backDesign: {
        ...prev.backDesign,
        ...updates
      }
    }));
  };

  // Update specific text element configs
  const handleUpdateText = (
    key: keyof Pick<StudioState, 'names' | 'greeting' | 'monogram' | 'date' | 'location' | 'ringDate'>,
    config: Partial<TextElementConfig>
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...config
      }
    }));
  };

  // Update ISO date
  const handleUpdateIsoDate = (isoDate: string) => {
    setState((prev) => ({
      ...prev,
      selectedIsoDate: isoDate
    }));
  };

  // Update QR configuration
  const handleUpdateQr = (updates: Partial<QrConfig>) => {
    setState((prev) => ({
      ...prev,
      qrCode: {
        ...prev.qrCode,
        ...updates
      }
    }));
  };

  // Update Hot-Foil targets
  const handleUpdateFoilTargets = (targets: Partial<FoilTargets>) => {
    setState((prev) => ({
      ...prev,
      foilTargets: {
        ...prev.foilTargets,
        ...targets
      }
    }));
  };

  // Update Interlocking Monogram Builder
  const handleUpdateMonogramBuilder = (updates: Partial<InterlockingMonogramConfig>) => {
    setState((prev) => ({
      ...prev,
      monogramBuilder: {
        ...prev.monogramBuilder,
        ...updates
      }
    }));
  };

  // Update 300 DPI Print & Bleed Configuration
  const handleUpdatePrintBleed = (updates: Partial<PrintBleedConfig>) => {
    setState((prev) => ({
      ...prev,
      printBleedConfig: {
        ...prev.printBleedConfig,
        ...updates
      }
    }));
  };

  // 1. SMART PRESET BUTTON: "✨ توصية الموقع (ضبط مثالي)"
  const handleApplySmartPreset = () => {
    const defaultTheme = LUXURY_THEMES[0]; // Crimson Rose
    handleSelectTheme(defaultTheme);

    setState((prev) => ({
      ...prev,
      // Golden ratio typography scaling & pairing
      names: {
        text: prev.names.text || 'سارة & خالد',
        fontFamily: '"Aref Ruqaa", serif',
        fontSize: 34,
        color: defaultTheme.textColor,
        letterSpacing: 2,
        lineHeight: 1.3,
        isBold: true
      },

      greeting: {
        text: prev.greeting.text || 'يسرنا دعوتكم لمشاركتنا فرحة العمر',
        fontFamily: 'Amiri, serif',
        fontSize: 18,
        color: defaultTheme.textColor,
        letterSpacing: 1,
        lineHeight: 1.5,
        isItalic: false
      },

      monogram: {
        text: prev.monogram.text || 'S & K',
        fontFamily: '"Playfair Display", serif',
        fontSize: 44,
        color: defaultTheme.artworkColor,
        letterSpacing: 4,
        lineHeight: 1.0,
        isBold: true
      },

      date: {
        text: prev.date.text || 'السبت، ١٩ سبتمبر ٢٠٢٦ م',
        fontFamily: 'Cairo, sans-serif',
        fontSize: 14,
        color: defaultTheme.textColor,
        letterSpacing: 1,
        lineHeight: 1.4
      },

      location: {
        text: prev.location.text || 'فندق الريتز كارلتون - قاعة الثريا الكبرى',
        fontFamily: 'Tajawal, sans-serif',
        fontSize: 13,
        color: defaultTheme.artworkColor,
        letterSpacing: 1,
        lineHeight: 1.4
      },

      ringDate: {
        text: prev.ringDate.text || '✦ 19.09.2026 ✦ THE ROYAL WEDDING ✦',
        fontFamily: '"Playfair Display", serif',
        fontSize: 11,
        color: defaultTheme.textColor,
        letterSpacing: 3,
        lineHeight: 1.0,
        isBold: true
      }
    }));
  };

  // 2. PROCEDURAL GENERATION ENGINE: "🎨 ابتكار تصميم جديد كلياً (توليد ذكي بضغطة زر)"
  // Procedurally randomizes dieline structure, inner artwork, secondary piece, and luxury theme
  const handleGenerateAiTheme = () => {
    setState((prev) => {
      const proceduralUpdates = generateProceduralDesign(prev);
      return {
        ...prev,
        ...proceduralUpdates
      };
    });
  };

  // Reset to original defaults
  const handleReset = () => {
    setState(INITIAL_STUDIO_STATE);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0D0C10] font-cairo text-stone-100">
      {/* 1. TOP STUDIO HEADER */}
      <StudioHeader
        onReset={handleReset}
        onOpenAssemblyGuide={() => setIsAssemblyGuideOpen(true)}
        onOpenImpositionModal={() => setIsImpositionModalOpen(true)}
        isFullSuiteMode={state.isFullSuiteMode}
        onToggleFullSuiteMode={() => handleUpdateState({ isFullSuiteMode: !state.isFullSuiteMode })}
        studioUIMode={studioUIMode}
        onToggleStudioUIMode={setStudioUIMode}
      />

      {/* 2. SPLIT-SCREEN WORKSPACE OR QUICK-FILL FORM MODE */}
      {studioUIMode === 'quick-fill' ? (
        <div className="flex-1 overflow-y-auto">
          <QuickFillFormMode
            state={state}
            onUpdateState={handleUpdateState}
            onOpenImpositionModal={() => setIsImpositionModalOpen(true)}
            onSwitchToProStudio={() => setStudioUIMode('pro')}
          />
        </div>
      ) : (
        <>
          <main className="flex-1 flex flex-col-reverse lg:flex-row overflow-hidden relative">
            {/* Left Side: Interactive Live Canvas Studio (مساحة العرض الحية) */}
            <LiveCanvasArea
              state={state}
              onUpdateState={handleUpdateState}
              onOpenAssemblyGuide={() => setIsAssemblyGuideOpen(true)}
              svgRef={svgRef}
            />

            {/* Right Side: Customization Drawer (درج التخصيص والتحكم الذكي) */}
            <CustomizationDrawer
              state={state}
              onUpdateState={handleUpdateState}
              onSelectTemplate={handleSelectTemplate}
              onToggleFlowerInserted={handleToggleFlowerInserted}
              onUpdateColors={handleUpdateColors}
              onSelectTheme={handleSelectTheme}
              onUpdateText={handleUpdateText}
              onUpdateIsoDate={handleUpdateIsoDate}
              onUpdateQr={handleUpdateQr}
              onApplyPreset={handleApplySmartPreset}
              onGenerateAiTheme={handleGenerateAiTheme}
              onUpdateBackDesign={handleUpdateBackDesign}
              onUpdateFoilTargets={handleUpdateFoilTargets}
              onUpdateMonogramBuilder={handleUpdateMonogramBuilder}
              onUpdatePrintBleed={handleUpdatePrintBleed}
            />
          </main>

          {/* 3. PRODUCTION EXPORT BAR */}
          <ExportEngineBar
            svgRef={svgRef}
            onOpenAssemblyGuide={() => setIsAssemblyGuideOpen(true)}
            onOpenImpositionModal={() => setIsImpositionModalOpen(true)}
          />
        </>
      )}

      {/* 4. ASSEMBLY GUIDE MODAL */}
      <AssemblyGuideModal
        isOpen={isAssemblyGuideOpen}
        onClose={() => setIsAssemblyGuideOpen(false)}
        activeTemplateId={state.activeTemplateId}
      />

      {/* 5. A4 / A3 DUPLEX SHEET IMPOSITION ENGINE MODAL */}
      <DuplexImpositionModal
        isOpen={isImpositionModalOpen}
        onClose={() => setIsImpositionModalOpen(false)}
        state={state}
      />
    </div>
  );
};

export default App;
