import React, { useState } from 'react';
import { Type, Sliders, Palette, Bold, Italic, Calendar, Sparkles, Clock, MapPin, Feather } from 'lucide-react';
import { StudioState, TextElementConfig, CalligraphyHeaderType } from '../../types/studio';
import { FONT_OPTIONS } from '../../data/templates';
import { formatArabicDateText } from '../../utils/calendarUtils';

interface TextControlsAccordionProps {
  state: StudioState;
  onUpdateText: (key: keyof Pick<StudioState, 'names' | 'greeting' | 'monogram' | 'date' | 'location' | 'ringDate'>, config: Partial<TextElementConfig>) => void;
  onUpdateIsoDate: (isoDate: string) => void;
  onUpdateState?: (updates: Partial<StudioState>) => void;
}

const LUXURY_SWATCHES = [
  { name: 'ذهب ملكي', value: '#D4AF37' },
  { name: 'عنابي فاخر', value: '#791E34' },
  { name: 'زيتوني هادئ', value: '#4A5320' },
  { name: 'زمردي عميق', value: '#1B4332' },
  { name: 'كحلي ليل', value: '#1A2942' },
  { name: 'أسود فاحم', value: '#18181B' },
  { name: 'أبيض ناصع', value: '#FFFFFF' },
  { name: 'وردي باودر', value: '#E8B4B8' }
];

export const TextControlsAccordion: React.FC<TextControlsAccordionProps> = ({
  state,
  onUpdateText,
  onUpdateIsoDate,
  onUpdateState
}) => {
  const [activeTab, setActiveTab] = useState<'names' | 'greeting' | 'monogram' | 'date' | 'ringDate'>('names');

  const textSections = [
    { key: 'names' as const, label: 'الأسماء الرئيسية', config: state.names, placeholder: 'مثال: سارة & خالد' },
    { key: 'greeting' as const, label: 'عبارة الترحيب', config: state.greeting, placeholder: 'مثال: يسرنا دعوتكم...' },
    { key: 'monogram' as const, label: 'المونوغرام (الشعار)', config: state.monogram, placeholder: 'مثال: S & K أو E & M' },
    { key: 'date' as const, label: 'تاريخ المناسبة', config: state.date, placeholder: 'مثال: ١٩ سبتمبر ٢٠٢٦' },
    { key: 'ringDate' as const, label: 'نص الحلقة الدائرية', config: state.ringDate, placeholder: 'مثال: ✦ 19.09.2026 ✦' }
  ];

  const currentSection = textSections.find((s) => s.key === activeTab) || textSections[0];

  const handleDateChange = (newIsoDate: string) => {
    onUpdateIsoDate(newIsoDate);
    const formattedAr = formatArabicDateText(newIsoDate);
    onUpdateText('date', { text: formattedAr });
    // Also update ring date format
    const parts = newIsoDate.split('-');
    const ringFormatted = `✦ ${parts[2]}.${parts[1]}.${parts[0]} ✦ THE ROYAL WEDDING ✦`;
    onUpdateText('ringDate', { text: ringFormatted });
  };

  return (
    <div className="space-y-4">
      {/* 1. TOP CALLIGRAPHIC HEADER EMBLEM (ترويسة وختم الدعوة) */}
      <div className="p-3 bg-[#131218] border border-stone-800 rounded-2xl space-y-2.5">
        <label className="flex items-center justify-between text-xs font-semibold text-stone-300">
          <span className="flex items-center gap-1.5 text-gold-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ختم وترويسة الدعوة العلوية (Header Emblem):</span>
          </span>
          <span className="text-[10px] text-stone-400 font-mono">طراز مذهب فاخر</span>
        </label>

        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'dawah-circle' as CalligraphyHeaderType, title: 'ختم "دَعْوَة" الدائري', desc: 'ختم ذهبي كلاسيكي ملوكي', icon: '⭕' },
            { id: 'basmala' as CalligraphyHeaderType, title: 'البسملة المذهبة', desc: 'بسم الله الرحمن الرحيم', icon: '✨' },
            { id: 'monogram' as CalligraphyHeaderType, title: 'مونوغرام الحروف', desc: 'شعار الحرفين المتداخلين', icon: '👑' },
            { id: 'none' as CalligraphyHeaderType, title: 'بدون ترويسة', desc: 'البدء بالنص مباشرة', icon: '➖' }
          ].map((item) => {
            const isSelected = (state.calligraphyHeaderType || 'dawah-circle') === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onUpdateState?.({ calligraphyHeaderType: item.id })}
                className={`p-2 rounded-xl text-right border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gold-500/20 border-gold-400 text-gold-200 shadow-sm ring-1 ring-gold-400/40'
                    : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </span>
                  {isSelected && (
                    <div className="w-3.5 h-3.5 rounded-full bg-gold-400 text-black flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold">✓</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-stone-400 mt-0.5 truncate">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. STRUCTURED 3-COLUMN EVENT DETAILS (📅 التاريخ | 📍 القاعة | 🕗 الوقت) */}
      <div className="p-3 bg-[#131218] border border-stone-800 rounded-2xl space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gold-300">
            <Clock className="w-3.5 h-3.5" />
            <span>شريط تفاصيل الموعد والقاعة الثلاثي (3-Column Bar):</span>
          </span>
          <label className="flex items-center gap-1.5 text-xs text-stone-400 cursor-pointer">
            <input
              type="checkbox"
              checked={state.show3ColumnIconBar ?? true}
              onChange={(e) => onUpdateState?.({ show3ColumnIconBar: e.target.checked })}
              className="accent-gold-400 rounded cursor-pointer"
            />
            <span>تفعيل</span>
          </label>
        </div>

        {(state.show3ColumnIconBar ?? true) && (
          <div className="space-y-2 pt-1 border-t border-stone-800/80">
            {/* Day & Date */}
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">📅 اليوم والتاريخ:</label>
              <input
                type="text"
                value={state.eventDayAndDate || state.date.text || 'يوم السبت | 01.08.2026'}
                onChange={(e) => onUpdateState?.({ eventDayAndDate: e.target.value })}
                placeholder="مثال: يوم السبت | 01.08.2026"
                className="w-full bg-[#1A1922] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            {/* Venue & Location */}
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">📍 اسم القاعة والعنوان:</label>
              <input
                type="text"
                value={state.eventVenue || state.location.text || 'قاعة فرح - شارع الجامعة'}
                onChange={(e) => onUpdateState?.({ eventVenue: e.target.value })}
                placeholder="مثال: قاعة فرح - شارع الجامعة"
                className="w-full bg-[#1A1922] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            {/* Time */}
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">🕗 موعد الحضور والساعة:</label>
              <input
                type="text"
                value={state.eventTime || 'الساعة 8:00 مساءً'}
                onChange={(e) => onUpdateState?.({ eventTime: e.target.value })}
                placeholder="مثال: الساعة 8:00 مساءً"
                className="w-full bg-[#1A1922] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. INVITATION PARAGRAPH & CALLIGRAPHIC FOOTER */}
      <div className="p-3 bg-[#131218] border border-stone-800 rounded-2xl space-y-2.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-gold-300">
          <Feather className="w-3.5 h-3.5" />
          <span>نص الدعوة وعبارة الختام المذهبة:</span>
        </label>

        <div>
          <label className="text-[11px] text-stone-400 block mb-1">نص الدعوة السردي:</label>
          <textarea
            rows={2}
            value={state.invitationParagraph || 'وذلك بمشيئة الله تعالى وتوفيقه، لتكتمل فرحتنا بلقياكم وسماع أصدق دعواتكم'}
            onChange={(e) => onUpdateState?.({ invitationParagraph: e.target.value })}
            className="w-full bg-[#1A1922] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-gold-400 resize-none"
          />
        </div>

        <div>
          <label className="text-[11px] text-stone-400 block mb-1">عبارة الختام المذهبة (Footer Calligraphy):</label>
          <input
            type="text"
            value={state.closingVerse || 'وَبِحُضُورِكُمْ يَتِمُّ لَنَا الفَرَحُ وَالسُّرُورُ'}
            onChange={(e) => onUpdateState?.({ closingVerse: e.target.value })}
            className="w-full bg-[#1A1922] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs text-gold-300 font-bold focus:outline-none focus:border-gold-400 font-serif"
          />
        </div>

        <div>
          <label className="text-[11px] text-stone-400 block mb-1">اسم الداعي / المضيف:</label>
          <input
            type="text"
            value={state.hostName || 'الداعي: الحاج زياد قاسم خطيب / محبكم'}
            onChange={(e) => onUpdateState?.({ hostName: e.target.value })}
            className="w-full bg-[#1A1922] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Interactive Date Picker (Direct Sync with Calendar & Texts) */}
      <div className="p-3 bg-[#131218] border border-stone-800 rounded-2xl space-y-2">
        <label className="flex items-center justify-between text-xs font-semibold text-stone-300">
          <span className="flex items-center gap-1.5 text-gold-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>منتقي تاريخ المناسبة (مزامنة التقويم):</span>
          </span>
          <span className="text-[10px] text-stone-400 font-mono">مزامنة تلقائية</span>
        </label>
        <input
          type="date"
          value={state.selectedIsoDate || '2026-09-19'}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full bg-[#1A1922] border border-stone-700/80 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-gold-400 cursor-pointer"
        />
        <p className="text-[10px] text-stone-400">
          تغيير التاريخ يُحدّث تلقائياً شبكة تقويم كرت المناسبة والقلب الذهبي المحيط باليوم.
        </p>
      </div>

      {/* Sub-tabs for switching between text elements */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-900/80 rounded-xl border border-stone-800">
        {textSections.map((sec) => (
          <button
            key={sec.key}
            onClick={() => setActiveTab(sec.key)}
            className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all truncate text-center ${
              activeTab === sec.key
                ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Active Text Element Editor Card */}
      <div className="bg-[#191820] border border-stone-800/80 rounded-2xl p-4 space-y-4 shadow-sm">
        {/* Text Input */}
        <div>
          <label className="block text-xs font-medium text-stone-300 mb-1.5">
            محتوى النص ({currentSection.label}):
          </label>
          <input
            type="text"
            value={currentSection.config.text}
            onChange={(e) => onUpdateText(currentSection.key, { text: e.target.value })}
            placeholder={currentSection.placeholder}
            className="w-full bg-[#121115] border border-stone-700/80 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition-all"
          />
        </div>

        {/* Font Family Selector */}
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-stone-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-gold-400" />
              <span>نوع الخط (Typography):</span>
            </span>
            <span className="text-[10px] text-stone-400">عربي ولاتيني فاخر</span>
          </label>
          <select
            value={currentSection.config.fontFamily}
            onChange={(e) => onUpdateText(currentSection.key, { fontFamily: e.target.value })}
            className="w-full bg-[#121115] border border-stone-700/80 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-gold-400 transition-all cursor-pointer"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.fontFamily} style={{ fontFamily: f.fontFamily }}>
                {f.nameAr} ({f.nameEn})
              </option>
            ))}
          </select>
        </div>

        {/* Font Size Slider */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-stone-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-gold-400" />
              <span>حجم الخط:</span>
            </span>
            <span className="font-mono text-gold-400 font-semibold">{currentSection.config.fontSize} pt</span>
          </div>
          <input
            type="range"
            min="9"
            max="64"
            step="1"
            value={currentSection.config.fontSize}
            onChange={(e) => onUpdateText(currentSection.key, { fontSize: +e.target.value })}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
          />
        </div>

        {/* Letter Spacing Slider */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-stone-300 mb-1.5">
            <span>تباعد الحروف (Letter Spacing):</span>
            <span className="font-mono text-gold-400 font-semibold">{currentSection.config.letterSpacing} px</span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            step="0.5"
            value={currentSection.config.letterSpacing}
            onChange={(e) => onUpdateText(currentSection.key, { letterSpacing: +e.target.value })}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
          />
        </div>

        {/* Color Picker & Preset Swatches */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-stone-300 mb-2">
            <Palette className="w-3.5 h-3.5 text-gold-400" />
            <span>لون النص:</span>
          </label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="color"
              value={currentSection.config.color}
              onChange={(e) => onUpdateText(currentSection.key, { color: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={currentSection.config.color}
              onChange={(e) => onUpdateText(currentSection.key, { color: e.target.value })}
              className="flex-1 bg-[#121115] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs font-mono text-stone-200 uppercase"
            />
          </div>
          {/* Quick Swatches */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {LUXURY_SWATCHES.map((sw) => (
              <button
                key={sw.value}
                onClick={() => onUpdateText(currentSection.key, { color: sw.value })}
                className={`w-6 h-6 rounded-lg border transition-transform ${
                  currentSection.config.color.toLowerCase() === sw.value.toLowerCase()
                    ? 'scale-110 border-white ring-2 ring-gold-400'
                    : 'border-stone-700 hover:scale-105'
                }`}
                style={{ backgroundColor: sw.value }}
                title={sw.name}
              />
            ))}
          </div>
        </div>

        {/* Micro-Positioning Sliders for Bride & Groom Names */}
        {activeTab === 'names' && onUpdateState && (
          <div className="p-3 bg-[#131218] rounded-xl border border-gold-500/30 space-y-2.5 mt-2">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onUpdateState({ namesOffset: { x: 0, y: 0, scale: 1, rotation: 0 } })}
                className="text-[10px] text-stone-400 hover:text-gold-300 underline"
              >
                إعادة ضبط ↺
              </button>
              <div className="flex items-center gap-1 text-xs font-bold text-gold-300">
                <span>التحريك والضبط الدقيق لموقع الأسماء (Names Micro-Positioning)</span>
                <Sliders className="w-3.5 h-3.5 text-gold-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
                  <span className="font-mono text-gold-400">{state.namesOffset?.x || 0}px</span>
                  <span>إزاحة أفقية (X)</span>
                </div>
                <input
                  type="range"
                  min={-60}
                  max={60}
                  step={1}
                  value={state.namesOffset?.x || 0}
                  onChange={(e) =>
                    onUpdateState({
                      namesOffset: {
                        ...(state.namesOffset || { x: 0, y: 0, scale: 1, rotation: 0 }),
                        x: Number(e.target.value)
                      }
                    })
                  }
                  className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
                  <span className="font-mono text-gold-400">{state.namesOffset?.y || 0}px</span>
                  <span>إزاحة عمودية (Y)</span>
                </div>
                <input
                  type="range"
                  min={-60}
                  max={60}
                  step={1}
                  value={state.namesOffset?.y || 0}
                  onChange={(e) =>
                    onUpdateState({
                      namesOffset: {
                        ...(state.namesOffset || { x: 0, y: 0, scale: 1, rotation: 0 }),
                        y: Number(e.target.value)
                      }
                    })
                  }
                  className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
                  <span className="font-mono text-gold-400">{Math.round((state.namesOffset?.scale || 1) * 100)}%</span>
                  <span>الحجم (Scale)</span>
                </div>
                <input
                  type="range"
                  min={0.6}
                  max={1.6}
                  step={0.05}
                  value={state.namesOffset?.scale || 1}
                  onChange={(e) =>
                    onUpdateState({
                      namesOffset: {
                        ...(state.namesOffset || { x: 0, y: 0, scale: 1, rotation: 0 }),
                        scale: Number(e.target.value)
                      }
                    })
                  }
                  className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
                  <span className="font-mono text-gold-400">{state.namesOffset?.rotation || 0}°</span>
                  <span>تدوير (Rotation)</span>
                </div>
                <input
                  type="range"
                  min={-15}
                  max={15}
                  step={1}
                  value={state.namesOffset?.rotation || 0}
                  onChange={(e) =>
                    onUpdateState({
                      namesOffset: {
                        ...(state.namesOffset || { x: 0, y: 0, scale: 1, rotation: 0 }),
                        rotation: Number(e.target.value)
                      }
                    })
                  }
                  className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Text Style Modifiers (Bold / Italic) */}
        <div className="flex items-center gap-2 pt-1 border-t border-stone-800/60">
          <button
            onClick={() => onUpdateText(currentSection.key, { isBold: !currentSection.config.isBold })}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              currentSection.config.isBold
                ? 'bg-gold-500/20 text-gold-300 border-gold-500/40'
                : 'bg-stone-800/40 text-stone-400 border-stone-700/60 hover:text-stone-200'
            }`}
          >
            <Bold className="w-3.5 h-3.5" />
            <span>عريض (Bold)</span>
          </button>

          <button
            onClick={() => onUpdateText(currentSection.key, { isItalic: !currentSection.config.isItalic })}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              currentSection.config.isItalic
                ? 'bg-gold-500/20 text-gold-300 border-gold-500/40'
                : 'bg-stone-800/40 text-stone-400 border-stone-700/60 hover:text-stone-200'
            }`}
          >
            <Italic className="w-3.5 h-3.5" />
            <span>مائل (Italic)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
