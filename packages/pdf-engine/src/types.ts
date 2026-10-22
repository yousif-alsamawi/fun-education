import { PrintPreset } from '@maktaba/core';

export interface PDFGenerationOptions {
  preset: PrintPreset;
  dpi?: number;                 // الافتراضي 300 DPI للطباعة
  includeCropMarks?: boolean;   // علامات القص
  includeStapleGuides?: boolean;// علامات مكان الدبابيس في خط المنتصف
  authorOrShopName?: string;    // اسم المكتبة (مكتبة الشعلة)
}

export interface PDFExportResult {
  digitalReadingHtml: string;   // قالب HTML عالي الدقة لنسخة القراءة الرقمية (1 إلى 12)
  impositionPrintHtml: string;  // قالب HTML للملازم الجاهزة للطباعة المزدوجة والتدبيس
  totalPhysicalSheets: number;  // عدد الأوراق المطلوبة (مثلاً 3 أوراق لمجلة 12 صفحة)
  instructions: string[];       // تعليمات الطباعة والتدبيس للموظف
}
