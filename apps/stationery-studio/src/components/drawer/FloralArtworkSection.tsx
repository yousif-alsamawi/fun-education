import React, { useRef, useState } from 'react';
import {
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Check,
  Sparkles,
  Sliders,
  Flower2,
  Bookmark,
  Stamp,
  Camera
} from 'lucide-react';
import {
  CuratedBgStyle,
  StudioState,
  ImagePlacementMode,
  WaxSealStyle,
  RibbonColor,
  WeddingDingbatId
} from '../../types/studio';
import { BOTANICAL_ARTWORKS } from '../../data/botanicalArtworks';
import {
  BUILTIN_FLORAL_PRESETS,
  WEDDING_DINGBATS,
  WAX_SEAL_PRESETS,
  RIBBON_PRESETS
} from '../../data/builtInLuxuryAssets';
import { ETSY_ASSET_GALLERY, EtsyAssetCategory } from '../../data/etsyAssetGallery';

interface FloralArtworkSectionProps {
  state: StudioState;
  onUpdateState: (updates: Partial<StudioState>) => void;
}

const CURATED_STYLES: {
  id: CuratedBgStyle;
  nameAr: string;
  nameEn: string;
  gradient: string;
  borderColor: string;
}[] = [
  {
    id: 'blush-rose',
    nameAr: 'زهر الورد والباودر الناعم',
    nameEn: 'Blush Rose & Gold Wash',
    gradient: 'from-[#FDFBF7] via-[#F9EBE8] to-[#F4E1DD]',
    borderColor: '#B76E79'
  },
  {
    id: 'royal-emerald',
    nameAr: 'الزمرد الإمبراطوري الخافت',
    nameEn: 'Imperial Emerald Haze',
    gradient: 'from-[#FDFBF7] via-[#EAEFE9] to-[#D5E2D4]',
    borderColor: '#0F291E'
  },
  {
    id: 'soft-sage',
    nameAr: 'الميرمية الهادئة والنعناع',
    nameEn: 'Soft Sage Botanical Haze',
    gradient: 'from-[#FDFBF7] via-[#F1F5E8] to-[#E3EBD7]',
    borderColor: '#4A5D23'
  },
  {
    id: 'champagne-gold',
    nameAr: 'العاج الملكي وهالة الذهب 24K',
    nameEn: 'Pure Ivory & Gold Aura',
    gradient: 'from-[#FFFFFF] via-[#FAF6ED] to-[#F3E8CE]',
    borderColor: '#D4AF37'
  }
];

export const FloralArtworkSection: React.FC<FloralArtworkSectionProps> = ({
  state,
  onUpdateState
}) => {
  type ActiveAssetTab = 'florals' | 'dingbats' | 'wax-ribbon' | 'upload';
  const [activeTab, setActiveTab] = useState<ActiveAssetTab>('florals');
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [assetCategoryFilter, setAssetCategoryFilter] = useState<'all' | EtsyAssetCategory>('all');

  const frontFileInputRef = useRef<HTMLInputElement>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);
  const polaroidPhotoInputRef = useRef<HTMLInputElement>(null);

  // Front file upload
  const handleFrontFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onUpdateState({
          customBackgroundImage: dataUrl,
          bgImageOpacity: state.bgImageOpacity ?? 0.85
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFrontImage = () => {
    onUpdateState({ customBackgroundImage: undefined });
    if (frontFileInputRef.current) {
      frontFileInputRef.current.value = '';
    }
  };

  // Back file upload
  const handleBackFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onUpdateState({
          customBackBackgroundImage: dataUrl,
          backBgImageOpacity: state.backBgImageOpacity ?? 0.85
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBackImage = () => {
    onUpdateState({ customBackBackgroundImage: undefined });
    if (backFileInputRef.current) {
      backFileInputRef.current.value = '';
    }
  };

  // Polaroid Photo upload
  const handlePolaroidPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onUpdateState({
          polaroidConfig: {
            enabled: true,
            showTopWaxStamp: state.polaroidConfig?.showTopWaxStamp ?? true,
            photoUrl: dataUrl,
            caption: state.polaroidConfig?.caption || 'Forever & Always ✦'
          }
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const activeArtworkId = state.activeFloralArtworkId || 'crimson-rose-cascade';

  return (
    <div className="space-y-4">
      {/* 4-Tab Luxury Elements Studio Navigation */}
      <div className="grid grid-cols-4 gap-1 bg-[#14131A] p-1.5 rounded-2xl border border-stone-800 shadow-md">
        <button
          onClick={() => setActiveTab('florals')}
          className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-1 ${
            activeTab === 'florals'
              ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          title="باقات الورود والزهور المائية الجاهزة"
        >
          <Flower2 className="w-3.5 h-3.5" />
          <span>الورود 🌸</span>
        </button>

        <button
          onClick={() => setActiveTab('dingbats')}
          className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-1 ${
            activeTab === 'dingbats'
              ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          title="رموز وزخارف زفاف النقاء"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>الرموز 🕊️</span>
        </button>

        <button
          onClick={() => setActiveTab('wax-ribbon')}
          className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-1 ${
            activeTab === 'wax-ribbon'
              ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          title="الأختام الشمعية وشرائط الستان 3D وبولارويد"
        >
          <Stamp className="w-3.5 h-3.5" />
          <span>أختام وشريط 👑</span>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-1 ${
            activeTab === 'upload'
              ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          title="رفع رسمة أو صورة خاصة من جهازك"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>رفع خاص 📤</span>
        </button>
      </div>

      {/* ====================================================================
          TAB A: باقات الورود المائية الجاهزة (Built-in Floral Presets)
          ==================================================================== */}
      {activeTab === 'florals' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Smart Placement Mode Selector */}
          <div className="space-y-2 bg-[#14131A] p-3 rounded-2xl border border-stone-800">
            <label className="text-xs font-bold text-stone-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gold-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>موضع وتوزيع الورد داخل الكرت (Placement Mode):</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">تفريغ ذكي للنص</span>
            </label>

            <div className="grid grid-cols-2 gap-1.5">
              {[
                {
                  id: '4-edges-frame',
                  title: 'أطراف الورقة الأربعة',
                  desc: 'تفريغ كامل للوسط لمنع تغطية الكلام',
                  icon: '🔲'
                },
                {
                  id: 'right-edge',
                  title: 'شلال الورد الأيمن',
                  desc: 'توزيع عمودي على الحافة اليمنى فقط',
                  icon: '▶️'
                },
                {
                  id: 'top-bottom',
                  title: 'التاج العلوي والأسفل',
                  desc: 'أكاليل بالأعلى وفاصل بالأسفل',
                  icon: '⏸️'
                },
                {
                  id: '4-corners',
                  title: 'الزوايا الأربع فقط',
                  desc: 'باقات صغيرة رقيقة في الزوايا',
                  icon: '⛶'
                },
                {
                  id: 'diagonal-corners',
                  title: 'زاويتان متقابلتان قُطرياً',
                  desc: 'يمين أعلى + يسار أسفل ناعم',
                  icon: '⧄'
                },
                {
                  id: 'full-card',
                  title: 'خلفية كاملة خافتة',
                  desc: 'تغطي كامل الكرت بنعومة',
                  icon: '🖼️'
                }
              ].map((mode) => {
                const isSelected = (state.imagePlacementMode || '4-edges-frame') === mode.id;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() =>
                      onUpdateState({
                        imagePlacementMode: mode.id as ImagePlacementMode
                      })
                    }
                    className={`p-2 rounded-xl text-right transition-all border flex flex-col justify-between ${
                      isSelected
                        ? 'border-gold-400 bg-[#25222E] shadow-sm ring-1 ring-gold-400/40 text-white'
                        : 'border-stone-800 bg-[#16151C] hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold flex items-center gap-1.5">
                        <span>{mode.icon}</span>
                        <span>{mode.title}</span>
                      </span>
                      {isSelected && (
                        <div className="w-3.5 h-3.5 rounded-full bg-gold-400 text-black flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 leading-tight line-clamp-1">
                      {mode.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Built-in Etsy Asset Gallery (15 Real High-Res Presets) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="text-xs font-bold text-stone-200 flex items-center gap-1.5 text-gold-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>معرض أصول Etsy للورود والإطارات (15 High-Res Assets):</span>
              </label>
              <span className="text-[10px] text-emerald-400 font-mono">صور حقيقية بدقة عالية ✦</span>
            </div>

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
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    assetCategoryFilter === cat.id
                      ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40'
                      : 'bg-[#131218] text-stone-400 border border-stone-800 hover:text-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 15 Real High-Resolution Image Cards */}
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-1.5 bg-[#121118] rounded-2xl border border-stone-800">
              {ETSY_ASSET_GALLERY.filter(
                (a) => assetCategoryFilter === 'all' || a.category === assetCategoryFilter
              ).map((asset) => {
                const isSelected =
                  state.activeFloralArtworkId === asset.id ||
                  state.customBackgroundImage === asset.imageUrl;

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
                    className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between h-28 relative overflow-hidden group ${
                      isSelected
                        ? 'border-gold-400 bg-[#211E28] shadow-luxury ring-1 ring-gold-400/50'
                        : 'border-stone-800/90 bg-[#16151C] hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="w-full h-11 rounded-lg overflow-hidden relative mb-1 shrink-0 bg-stone-900 border border-stone-800">
                      <img
                        src={asset.thumbnailUrl}
                        alt={asset.nameAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    <div className="truncate">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-100 truncate block">
                          {asset.nameAr}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-gold-400 text-black flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-stone-400 font-mono truncate block mt-0.5">
                        {asset.nameEn}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1 text-[9px] text-stone-400">
                      <span className="px-1.5 py-0.5 rounded bg-stone-800 font-mono">
                        {asset.category === 'florals' ? '🌸 ورود' : asset.category === 'foil-frames' ? '✨ إطار' : '📜 خامة'}
                      </span>
                      <span className="text-gold-400 font-bold">
                        {asset.recommendedPlacement === '4-edges-frame' ? 'أطراف 4' : asset.recommendedPlacement === '4-corners' ? '4 أركان' : asset.recommendedPlacement === 'right-edge' ? 'يمين' : 'كامل'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Curated Soft Watercolor Washes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gold-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>هالات التموج المائي بالخلفية (Watercolor Washes):</span>
              </span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {CURATED_STYLES.map((style) => {
                const isSelected = (state.curatedBgStyle || 'blush-rose') === style.id;

                return (
                  <button
                    key={style.id}
                    onClick={() => onUpdateState({ curatedBgStyle: style.id })}
                    className={`p-2 rounded-xl border text-right transition-all flex flex-col justify-between h-16 relative overflow-hidden ${
                      isSelected
                        ? 'border-gold-400 bg-[#211E28] shadow-luxury'
                        : 'border-stone-800 bg-[#16151C] hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div
                      className={`w-full h-2.5 rounded-md bg-gradient-to-r ${style.gradient} border border-stone-700/50 mb-1`}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-100 truncate">{style.nameAr}</span>
                      {isSelected && (
                        <div className="w-3.5 h-3.5 rounded-full bg-gold-400 text-black flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB B: رموز وزخارف زفاف النقاء (Wedding Dingbats & Emblems)
          ==================================================================== */}
      {activeTab === 'dingbats' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3 bg-[#181720] border border-stone-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-200 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-gold-400" />
                <span>اختر رمز الزفاف الملكي في صدر الدعوة:</span>
              </span>
              <span className="text-[10px] text-gold-300 font-mono">تذهيب فوري ✦</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              توضع هذه الرموز الملكية الدقيقة في قلب بطاقة الدعوة فوق أسماء العروسين لإضفاء لمسة رومانسية مقدسة.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {WEDDING_DINGBATS.map((dingbat) => {
                const isSelected = (state.weddingDingbatId || 'none') === dingbat.id;

                return (
                  <button
                    key={dingbat.id}
                    onClick={() => onUpdateState({ weddingDingbatId: dingbat.id as WeddingDingbatId })}
                    className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between h-24 ${
                      isSelected
                        ? 'border-gold-400 bg-[#25222E] shadow-luxury ring-1 ring-gold-400/50 text-white'
                        : 'border-stone-800 bg-[#16151C] hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{dingbat.icon}</span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-gold-400 text-black flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-100">{dingbat.nameAr}</div>
                      <div className="text-[10px] text-stone-400 font-mono">{dingbat.nameEn}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB C: الأختام الشمعية والشرائط 3D والبولارويد (Wax Seals & Ribbons)
          ==================================================================== */}
      {activeTab === 'wax-ribbon' && (
        <div className="space-y-4 animate-fadeIn">
          {/* 1. 3D Wax Seal Stamp Customization */}
          <div className="p-3.5 bg-[#181720] border border-stone-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-200 flex items-center gap-2">
                <Stamp className="w-4 h-4 text-gold-400" />
                <span>الختم الشمعي الملكي ثلاثي الأبعاد (3D Wax Seal):</span>
              </span>
              <button
                type="button"
                onClick={() =>
                  onUpdateState({
                    waxSealConfig: {
                      enabled: !state.waxSealConfig?.enabled,
                      initials: state.waxSealConfig?.initials || 'S & K',
                      style: state.waxSealConfig?.style || 'crimson',
                      position: state.waxSealConfig?.position || 'top',
                      size: state.waxSealConfig?.size || 48
                    }
                  })
                }
                className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                  state.waxSealConfig?.enabled
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {state.waxSealConfig?.enabled ? 'مفعل ✓' : 'معطل ✕'}
              </button>
            </div>

            {state.waxSealConfig?.enabled && (
              <div className="space-y-3 pt-2 border-t border-stone-800">
                {/* Wax Color Style Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-300">لون الشمع الملكي:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {WAX_SEAL_PRESETS.map((preset) => {
                      const isSel = (state.waxSealConfig?.style || 'crimson') === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() =>
                            onUpdateState({
                              waxSealConfig: {
                                ...state.waxSealConfig!,
                                style: preset.id as WaxSealStyle
                              }
                            })
                          }
                          className={`p-2 rounded-xl border text-right transition-all flex items-center gap-2 ${
                            isSel
                              ? 'border-gold-400 bg-[#25222E] shadow-sm text-white'
                              : 'border-stone-800 bg-[#14131A] text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          <div
                            className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: preset.colorHex }}
                          />
                          <div className="truncate">
                            <span className="text-xs font-bold block">{preset.nameAr}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Seal Initials & Position */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-300">أحرف الختم (Initials):</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={state.waxSealConfig?.initials || 'S & K'}
                      onChange={(e) =>
                        onUpdateState({
                          waxSealConfig: {
                            ...state.waxSealConfig!,
                            initials: e.target.value
                          }
                        })
                      }
                      className="w-full bg-[#14131A] border border-stone-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-300">موضع الختم:</label>
                    <select
                      value={state.waxSealConfig?.position || 'top'}
                      onChange={(e) =>
                        onUpdateState({
                          waxSealConfig: {
                            ...state.waxSealConfig!,
                            position: e.target.value as 'top' | 'center' | 'bottom'
                          }
                        })
                      }
                      className="w-full bg-[#14131A] border border-stone-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                    >
                      <option value="top">أعلى الكرت (Top)</option>
                      <option value="center">وسط الكرت (Center)</option>
                      <option value="bottom">أسفل الكرت (Bottom)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. 3D Satin Ribbon Bow Customization */}
          <div className="p-3.5 bg-[#181720] border border-stone-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-200 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-emerald-400" />
                <span>فيونكة الستان الحريرية المجسمة (Satin Ribbon Bow):</span>
              </span>
              <button
                type="button"
                onClick={() =>
                  onUpdateState({
                    ribbonConfig: {
                      enabled: !state.ribbonConfig?.enabled,
                      color: state.ribbonConfig?.color || 'forest-green',
                      style: 'bow'
                    }
                  })
                }
                className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                  state.ribbonConfig?.enabled
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {state.ribbonConfig?.enabled ? 'مفعل ✓' : 'معطل ✕'}
              </button>
            </div>

            {state.ribbonConfig?.enabled && (
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <label className="text-[11px] font-bold text-stone-300">لون شريطة الستان:</label>
                <div className="grid grid-cols-2 gap-2">
                  {RIBBON_PRESETS.map((preset) => {
                    const isSel = (state.ribbonConfig?.color || 'forest-green') === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() =>
                          onUpdateState({
                            ribbonConfig: {
                              ...state.ribbonConfig!,
                              color: preset.id as RibbonColor
                            }
                          })
                        }
                        className={`p-2 rounded-xl border text-right transition-all flex items-center gap-2 ${
                          isSel
                            ? 'border-gold-400 bg-[#25222E] shadow-sm text-white'
                            : 'border-stone-800 bg-[#14131A] text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: preset.colorHex }}
                        />
                        <div className="truncate">
                          <span className="text-xs font-bold block">{preset.nameAr}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 3. Polaroid Save-The-Date Frame Customization */}
          <div className="p-3.5 bg-[#181720] border border-stone-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-200 flex items-center gap-2">
                <Camera className="w-4 h-4 text-purple-400" />
                <span>إطار صورة البولارويد (Save-The-Date Polaroid):</span>
              </span>
              <button
                type="button"
                onClick={() =>
                  onUpdateState({
                    polaroidConfig: {
                      enabled: !state.polaroidConfig?.enabled,
                      showTopWaxStamp: state.polaroidConfig?.showTopWaxStamp ?? true,
                      photoUrl: state.polaroidConfig?.photoUrl || '',
                      caption: state.polaroidConfig?.caption || 'Forever & Always ✦'
                    }
                  })
                }
                className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                  state.polaroidConfig?.enabled
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {state.polaroidConfig?.enabled ? 'مفعل ✓' : 'معطل ✕'}
              </button>
            </div>

            {state.polaroidConfig?.enabled && (
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <input
                  ref={polaroidPhotoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePolaroidPhotoUpload}
                  className="hidden"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => polaroidPhotoInputRef.current?.click()}
                    className="flex-1 py-2 px-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>{state.polaroidConfig?.photoUrl ? 'تغيير صورة العروسين' : 'رفع صورة العروسين'}</span>
                  </button>

                  {state.polaroidConfig?.photoUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateState({
                          polaroidConfig: {
                            ...state.polaroidConfig!,
                            photoUrl: ''
                          }
                        })
                      }
                      className="p-2 rounded-xl bg-stone-800 hover:bg-rose-900/50 text-rose-300 border border-stone-700"
                      title="إزالة الصورة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-300">عبارة أسفل الصورة:</label>
                  <input
                    type="text"
                    value={state.polaroidConfig?.caption || 'Forever & Always ✦'}
                    onChange={(e) =>
                      onUpdateState({
                        polaroidConfig: {
                          ...state.polaroidConfig!,
                          caption: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#14131A] border border-stone-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB D: رفع رسمة أو صورة خاصة (Bonus Custom Upload)
          ==================================================================== */}
      {activeTab === 'upload' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Front vs Back Face Switcher for Upload */}
          <div className="flex items-center bg-[#14131A] p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => setActiveSide('front')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeSide === 'front'
                  ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>📄</span>
              <span>الوجه الأمامي</span>
            </button>
            <button
              onClick={() => setActiveSide('back')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeSide === 'back'
                  ? 'bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>🪞</span>
              <span>خلفية القفا</span>
            </button>
          </div>

          {activeSide === 'front' ? (
            /* FRONT UPLOAD CONTROLS */
            <div className="p-3.5 bg-[#181720] border border-stone-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-stone-200">
                  <ImageIcon className="w-4 h-4 text-gold-400" />
                  <span>رفع رسمة أو صورة خاصة للوجه الأمامي:</span>
                </span>
                {state.customBackgroundImage && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                    صورة نشطة ✦
                  </span>
                )}
              </div>

              <input
                ref={frontFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFrontFileUpload}
                className="hidden"
                id="front-custom-bg-input"
              />

              {state.customBackgroundImage ? (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden border border-gold-500/40 h-28 bg-[#0F0E14] flex items-center justify-center">
                    <img
                      src={state.customBackgroundImage}
                      alt="خلفية الوجه المخصصة"
                      className="w-full h-full object-cover"
                      style={{ opacity: state.bgImageOpacity ?? 0.85 }}
                    />
                    <button
                      onClick={handleRemoveFrontImage}
                      className="absolute top-2 left-2 p-1.5 rounded-lg bg-black/75 hover:bg-rose-900/80 text-rose-300 border border-rose-500/40 transition-colors shadow-md flex items-center gap-1 text-[11px] font-bold"
                      title="إزالة الصورة المخصصة والرجوع للمكتبة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف</span>
                    </button>
                  </div>

                  {/* Opacity Slider */}
                  <div className="space-y-1.5 bg-[#14131A] p-2.5 rounded-xl border border-stone-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-300 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-gold-400" />
                        <span>شفافية الصورة بالوجه (Opacity):</span>
                      </span>
                      <span className="text-gold-400 font-mono font-bold">
                        {Math.round((state.bgImageOpacity ?? 0.85) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={state.bgImageOpacity ?? 0.85}
                      onChange={(e) => onUpdateState({ bgImageOpacity: parseFloat(e.target.value) })}
                      className="w-full accent-gold-400 cursor-pointer h-1.5 bg-stone-700 rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="front-custom-bg-input"
                  className="w-full border-2 border-dashed border-stone-700 hover:border-gold-500/60 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-[#14131A]/60 hover:bg-[#14131A]"
                >
                  <div className="w-9 h-9 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-bold text-stone-200 block">انقر لرفع رسمة زهور مخصصة للوجه</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">PNG, JPG, WEBP • تٌقص آلياً بشكل الكرت</span>
                  </div>
                </label>
              )}
            </div>
          ) : (
            /* BACK UPLOAD CONTROLS */
            <div className="p-3.5 bg-[#181720] border border-stone-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-stone-200">
                  <ImageIcon className="w-4 h-4 text-gold-400" />
                  <span>رفع خلفية أو نسيج خاص لظهر الكرت (Back Texture):</span>
                </span>
                {state.customBackBackgroundImage && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                    صورة الظهر نشطة ✦
                  </span>
                )}
              </div>

              <input
                ref={backFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleBackFileUpload}
                className="hidden"
                id="back-custom-bg-input"
              />

              {state.customBackBackgroundImage ? (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden border border-gold-500/40 h-28 bg-[#0F0E14] flex items-center justify-center">
                    <img
                      src={state.customBackBackgroundImage}
                      alt="خلفية الظهر المخصصة"
                      className="w-full h-full object-cover"
                      style={{ opacity: state.backBgImageOpacity ?? 0.85 }}
                    />
                    <button
                      onClick={handleRemoveBackImage}
                      className="absolute top-2 left-2 p-1.5 rounded-lg bg-black/75 hover:bg-rose-900/80 text-rose-300 border border-rose-500/40 transition-colors shadow-md flex items-center gap-1 text-[11px] font-bold"
                      title="إزالة صورة الظهر"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف</span>
                    </button>
                  </div>

                  {/* Opacity Slider for Back */}
                  <div className="space-y-1.5 bg-[#14131A] p-2.5 rounded-xl border border-stone-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-300 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-gold-400" />
                        <span>شفافية خلفية القفا (Opacity):</span>
                      </span>
                      <span className="text-gold-400 font-mono font-bold">
                        {Math.round((state.backBgImageOpacity ?? 0.85) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={state.backBgImageOpacity ?? 0.85}
                      onChange={(e) => onUpdateState({ backBgImageOpacity: parseFloat(e.target.value) })}
                      className="w-full accent-gold-400 cursor-pointer h-1.5 bg-stone-700 rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="back-custom-bg-input"
                  className="w-full border-2 border-dashed border-stone-700 hover:border-gold-500/60 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-[#14131A]/60 hover:bg-[#14131A]"
                >
                  <div className="w-9 h-9 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-bold text-stone-200 block">انقر لرفع صورة أو خامة خاصة بظهر الكرت</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">PNG, JPG, WEBP • تغطي ظهر الكرت بانسيابية</span>
                  </div>
                </label>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
