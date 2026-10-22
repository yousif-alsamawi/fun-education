import React from 'react';
import {
  Printer,
  Crosshair,
  Maximize,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import {
  PrintBleedConfig,
  StudioState
} from '../../types/studio';

interface PrintBleedSectionProps {
  state: StudioState;
  onUpdatePrintBleed: (updates: Partial<PrintBleedConfig>) => void;
}

export const PrintBleedSection: React.FC<PrintBleedSectionProps> = ({
  state,
  onUpdatePrintBleed
}) => {
  const cfg = state.printBleedConfig;

  return (
    <div className="space-y-4 text-right font-cairo">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20 font-mono">
          معايير المطابع 300 DPI
        </span>
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-200">
          <span>هندسة الطباعة والتسييل (Print & Bleed 3mm)</span>
          <Printer className="w-3.5 h-3.5 text-pink-400" />
        </div>
      </div>

      {/* 1. Toggles for Bleed, Safe Zone, and Registration Marks */}
      <div className="p-3 bg-[#191820] rounded-xl border border-stone-800 space-y-3">
        {/* Toggle 3mm Bleed */}
        <label className="flex items-center justify-between cursor-pointer">
          <input
            type="checkbox"
            checked={cfg.showBleed}
            onChange={(e) => onUpdatePrintBleed({ showBleed: e.target.checked })}
            className="rounded bg-stone-800 border-stone-700 text-pink-500 focus:ring-0"
          />
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-stone-200">
              <span>حدود التسييل التجاري (3mm Bleed Boundary)</span>
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            </div>
            <span className="text-[10px] text-stone-400">
              خط وردي متقطع يضمن عدم ظهور حواف بيضاء غير مرغوبة بعد القص
            </span>
          </div>
        </label>

        {/* Toggle Safe Zone */}
        <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-stone-800/80">
          <input
            type="checkbox"
            checked={cfg.showSafeZone}
            onChange={(e) => onUpdatePrintBleed({ showSafeZone: e.target.checked })}
            className="rounded bg-stone-800 border-stone-700 text-cyan-500 focus:ring-0"
          />
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-stone-200">
              <span>منطقة الأمان الداخلية (Safe Zone Margin)</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <span className="text-[10px] text-stone-400">
              خط سماوي متقطع يحدد مسافة أمان النصوص بعيداً عن حافة شفرة المقصلة
            </span>
          </div>
        </label>

        {/* Toggle Optical Registration Marks */}
        <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-stone-800/80">
          <input
            type="checkbox"
            checked={cfg.showRegistrationMarks}
            onChange={(e) => onUpdatePrintBleed({ showRegistrationMarks: e.target.checked })}
            className="rounded bg-stone-800 border-stone-700 text-amber-500 focus:ring-0"
          />
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-stone-200">
              <span>علامات المحاذاة البصرية (Optical Registration Marks)</span>
              <Crosshair className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="text-[10px] text-stone-400">
              أهداف بصرية في الزوايا الأربع لكاميرات بلوترات Cameo و Skycut و Graphtec
            </span>
          </div>
        </label>
      </div>

      {/* 2. Commercial Print Spec Summary Card */}
      <div className="p-3 bg-[#131218] rounded-xl border border-stone-800/80 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-300">
          <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>مواصفات التصدير الجاهز للإنتاج:</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-300 pt-1">
          <div className="bg-[#1A1922] p-2 rounded-lg border border-stone-800">
            <span className="text-stone-400 block text-[10px]">دقة الطباعة الورقية</span>
            <span className="font-bold font-mono text-emerald-400">300 DPI Vector</span>
          </div>
          <div className="bg-[#1A1922] p-2 rounded-lg border border-stone-800">
            <span className="text-stone-400 block text-[10px]">سماكة خط القص</span>
            <span className="font-bold font-mono text-rose-400">0.1mm Hairline (#FF0000)</span>
          </div>
          <div className="bg-[#1A1922] p-2 rounded-lg border border-stone-800">
            <span className="text-stone-400 block text-[10px]">سماكة خط الطي والتجعيد</span>
            <span className="font-bold font-mono text-blue-400">0.2mm Dashed (#2563EB)</span>
          </div>
          <div className="bg-[#1A1922] p-2 rounded-lg border border-stone-800">
            <span className="text-stone-400 block text-[10px]">معايرة ألوان الطباعة</span>
            <span className="font-bold font-mono text-amber-300">CMYK FOGRA39 Emulated</span>
          </div>
        </div>

        <div className="flex items-start gap-1.5 pt-1.5 text-[10px] text-stone-400">
          <AlertCircle className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
          <p>
            عند التصدير بصيغة PDF للطباعة، سيتم تضمين علامات التسجيل وحفظ ملف منفصل لمسار القص المتجهي DXF/SVG.
          </p>
        </div>
      </div>
    </div>
  );
};
