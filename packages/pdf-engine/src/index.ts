import { MagazineProject, getPrintingInstructions } from '@maktaba/core';
import { PDFGenerationOptions, PDFExportResult } from './types';
import { generateDigitalReadingHtml } from './templates/magazineTemplate';
import { generateImpositionPrintHtml } from './templates/impositionTemplate';

export * from './types';
export * from './templates/magazineTemplate';
export * from './templates/impositionTemplate';

/**
 * محرك تصدير المجلات إلى HTML/PDF جاهز للطباعة الفورية
 */
export function exportMagazine(project: MagazineProject, options?: PDFGenerationOptions): PDFExportResult {
  const shopName = options?.authorOrShopName || 'مكتبة الشعلة';
  const totalPages = project.pages.length || 12;

  const digitalHtml = generateDigitalReadingHtml(project, shopName);
  const impositionHtml = generateImpositionPrintHtml(project, shopName);

  return {
    digitalReadingHtml: digitalHtml,
    impositionPrintHtml: impositionHtml,
    totalPhysicalSheets: totalPages / 4,
    instructions: getPrintingInstructions(totalPages)
  };
}
