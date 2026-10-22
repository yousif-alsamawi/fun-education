import React from 'react';
import { QrCode, Link, MapPin, Music, Image as ImageIcon, CheckCircle, Palette, Sparkles } from 'lucide-react';
import { ColorPalette, QrConfig, QrPosition, StudioState } from '../../types/studio';

interface SmartAddonsAccordionProps {
  state: StudioState;
  onUpdateQr: (updates: Partial<QrConfig>) => void;
}

export const SmartAddonsAccordion: React.FC<SmartAddonsAccordionProps> = ({
  state,
  onUpdateQr
}) => {
  const qr = state.qrCode;

  const quickLinks = [
    { label: 'موقع القاعة (خرائط)', url: 'https://maps.google.com/?q=Ritz-Carlton', icon: MapPin, text: 'امسح لموقع الحفل' },
    { label: 'أغنية الزفاف (Spotify)', url: 'https://open.spotify.com/track/wedding-song', icon: Music, text: 'استمع للزفة الملكية' },
    { label: 'ألبوم الصور والذكريات', url: 'https://photos.app.goo.gl/gallery', icon: ImageIcon, text: 'شاركنا صورك الجميلة' },
    { label: 'تأكيد الحضور (RSVP)', url: 'https://maktaba-invites.com/rsvp', icon: CheckCircle, text: 'تأكيد الحضور' }
  ];

  const positions: { id: QrPosition; label: string }[] = [
    { id: 'bottom-left', label: 'أسفل اليسار (الموصى به)' },
    { id: 'bottom-right', label: 'أسفل اليمين' },
    { id: 'center-bottom', label: 'أسفل المنتصف' },
    { id: 'top-left', label: 'أعلى اليسار' }
  ];

  return (
    <div className="space-y-4">
      {/* Enable / Disable Toggle */}
      <div className="flex items-center justify-between p-3 bg-[#191820] border border-stone-800 rounded-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-200">مولد الباركود الذكي (SVG QR Code)</div>
            <div className="text-[11px] text-stone-400">إضافة رمز تفاعلي مشفر بالمتجهات لموقع الحفل أو الأغنية</div>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={qr.enabled}
            onChange={(e) => onUpdateQr({ enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
        </label>
      </div>

      {qr.enabled && (
        <div className="bg-[#191820] border border-stone-800/80 rounded-2xl p-4 space-y-4">
          {/* Quick Preset Links */}
          <div>
            <label className="block text-xs font-medium text-stone-400 mb-1.5">
              نماذج جاهزة سريعة:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {quickLinks.map((ql, idx) => {
                const Icon = ql.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => onUpdateQr({ url: ql.url, label: ql.text })}
                    className="flex items-center gap-1.5 p-2 bg-[#141318] hover:bg-stone-800 border border-stone-800/90 rounded-xl text-right text-stone-300 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span className="text-[11px] truncate">{ql.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* URL Input */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-stone-300 mb-1.5">
              <Link className="w-3.5 h-3.5 text-gold-400" />
              <span>الرابط الإلكتروني (URL Target):</span>
            </label>
            <input
              type="url"
              value={qr.url}
              onChange={(e) => onUpdateQr({ url: e.target.value })}
              placeholder="https://maps.google.com/?q=..."
              dir="ltr"
              className="w-full bg-[#121115] border border-stone-700/80 rounded-xl px-3.5 py-2.5 text-xs font-mono text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-400 transition-all text-left"
            />
          </div>

          {/* QR Label text */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              النص التوضيحي أسفل الرمز:
            </label>
            <input
              type="text"
              value={qr.label}
              onChange={(e) => onUpdateQr({ label: e.target.value })}
              placeholder="مثال: امسح لموقع الحفل"
              className="w-full bg-[#121115] border border-stone-700/80 rounded-xl px-3.5 py-2 text-xs text-stone-100 focus:outline-none focus:border-gold-400"
            />
          </div>

          {/* Position Selector */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              موضع الرمز على البطاقة:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {positions.map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => onUpdateQr({ position: pos.id })}
                  className={`p-2 rounded-xl text-xs border text-right transition-all ${
                    qr.position === pos.id
                      ? 'bg-gold-500/20 text-gold-300 border-gold-400/50'
                      : 'bg-[#141318] text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* QR Color & Sync with Palette */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-stone-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-gold-400" />
                <span>لون الرمز:</span>
              </span>
              <button
                onClick={() => onUpdateQr({ color: state.textColor })}
                className="text-[10px] text-gold-400 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>مزامنة مع لون الثيم</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={qr.color || state.textColor}
                onChange={(e) => onUpdateQr({ color: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={qr.color || state.textColor}
                onChange={(e) => onUpdateQr({ color: e.target.value })}
                className="flex-1 bg-[#121115] border border-stone-700/80 rounded-xl px-3 py-1.5 text-xs font-mono text-stone-200 uppercase"
              />
            </div>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-stone-300 mb-1.5">
              <span>حجم الرمز على البطاقة:</span>
              <span className="font-mono text-gold-400 font-semibold">{qr.size} px</span>
            </div>
            <input
              type="range"
              min="48"
              max="96"
              step="2"
              value={qr.size}
              onChange={(e) => onUpdateQr({ size: +e.target.value })}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};
