import { MagazineProject, calculateSaddleStitchImposition } from '@maktaba/core';
import { renderSinglePageHtml } from './magazineTemplate';

/**
 * دالة توليد قالب HTML للملازم المفروشة للطباعة المزدوجة (Duplex Printing - Imposition)
 * يفرش صفحتين A5 متجاورتين على ورقة A4 أفقية (Landscape) مع علامة طي وتدبيس في المنتصف.
 */
export function generateImpositionPrintHtml(project: MagazineProject, shopName: string = 'مكتبة الشعلة'): string {
  const spreads = calculateSaddleStitchImposition(project.pages.length || 12);
  const pagesMap = new Map(project.pages.map(p => [p.pageNumber, p]));

  const sheetsHtml = spreads.map(spread => {
    const leftPage = pagesMap.get(spread.leftPageNumber);
    const rightPage = pagesMap.get(spread.rightPageNumber);

    return `
    <div class="spread-sheet">
      <!-- شريط معلومات ملازم الطباعة في الهامش العلوي خارج منطقة القص -->
      <div class="imposition-header">
        <span>ورقة رقم ${spread.sheetNumber} من ${spreads.length / 2} • ${spread.side === 'front' ? 'الوجه الأمامي (Front)' : 'الوجه الخلفي (Back)'}</span>
        <span>الجهة اليسرى: صفحة [${spread.leftPageNumber}] ⟵ خط الطي والتدبيس ⟶ الجهة اليمنى: صفحة [${spread.rightPageNumber}]</span>
        <span>${shopName} • مجلة البطل ${project.child.name}</span>
      </div>

      <!-- محتوى الورقة: صفحتان A5 متجاورتان -->
      <div class="pages-container">
        <!-- الصفحة اليسرى -->
        <div class="half-page left-page">
          ${leftPage ? renderSinglePageHtml(leftPage, project, shopName) : `<div>صفحة فارغة [${spread.leftPageNumber}]</div>`}
        </div>

        <!-- خط المنتصف للطي والتدبيس -->
        <div class="fold-line">
          <div class="staple-mark staple-top">📌 دبوس علوي</div>
          <div class="staple-mark staple-bottom">📌 دبوس سفلي</div>
        </div>

        <!-- الصفحة اليمنى -->
        <div class="half-page right-page">
          ${rightPage ? renderSinglePageHtml(rightPage, project, shopName) : `<div>صفحة فارغة [${spread.rightPageNumber}]</div>`}
        </div>
      </div>
    </div>
    `;
  }).join('\n');

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>نسخة الملازم المزدوجة للتدبيس النصفي - مجلة البطل ${project.child.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 0;
    }
    body {
      margin: 0;
      padding: 0;
      background: #334155;
      font-family: 'Cairo', sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .spread-sheet {
      width: 297mm;
      height: 210mm;
      page-break-after: always;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      position: relative;
      background: white;
      box-sizing: border-box;
      margin: 15px auto;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .imposition-header {
      height: 6mm;
      background: #0f172a;
      color: #94a3b8;
      font-size: 9px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10mm;
      box-sizing: border-box;
    }
    .pages-container {
      flex: 1;
      display: flex;
      position: relative;
      height: calc(210mm - 6mm);
    }
    .half-page {
      width: 50%;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    .left-page {
      border-left: 1px dashed #e2e8f0;
    }
    .right-page {
      border-right: 1px dashed #e2e8f0;
    }
    .fold-line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      background: rgba(0,0,0,0.1);
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 100;
    }
    .staple-mark {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(239, 68, 68, 0.85);
      color: white;
      font-size: 8px;
      padding: 1px 4px;
      border-radius: 4px;
      white-space: nowrap;
    }
    .staple-top {
      top: 35mm;
    }
    .staple-bottom {
      bottom: 35mm;
    }
    @media print {
      body {
        background: transparent;
      }
      .spread-sheet {
        margin: 0;
        box-shadow: none;
        width: 100vw;
        height: 100vh;
      }
      .imposition-header {
        background: #f1f5f9;
        color: #475569;
      }
    }
  </style>
</head>
<body onload="window.print()">
  ${sheetsHtml}
</body>
</html>
  `;
}
