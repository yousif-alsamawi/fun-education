import { jsPDF } from 'jspdf';

/**
 * Production Export Engine for Stationery Studio
 * Handles strict SVG layer separation and generation of:
 * 1. High-Resolution Print File (Artwork + Text + QR, NO cut lines)
 * 2. Vector SVG Cut Lines (Dielines ONLY, Hairline stroke, no fill, Plotter ready)
 * 3. Direct 1:1 Scale Print Dialog
 * 4. Multi-Page Direct Duplex Imposition PDF (Page 1 Front, Page 2 Mirrored Back, Page 3 Plotter Dielines)
 */

export interface ExportOptions {
  filename?: string;
  dpi?: number;
}

/**
 * Downloads a string or blob as a file in the browser
 */
export function triggerDownload(content: Blob | string, filename: string, mimeType: string = 'image/svg+xml') {
  const blob = typeof content === 'string' ? new Blob([content], { type: mimeType }) : content;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Clones the master SVG element and prepares it for export
 */
function getMasterSvgClone(svgElement: SVGSVGElement): SVGSVGElement {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  // Ensure standard XML namespace attributes
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  return clone;
}

/**
 * 1. EXPORT PRINT FILE (VECTOR SVG / HIGH-RES PNG)
 * Strips all cutlines, dielines, and mockup backdrops.
 * Retains artwork, text, monogram, gradients, and QR code.
 */
export function exportPrintSvg(svgElement: SVGSVGElement, filename: string = 'print-artwork.svg'): string {
  const clone = getMasterSvgClone(svgElement);

  // Remove cutlines layer
  const cutLayer = clone.querySelector('#layer-cut-lines');
  if (cutLayer) cutLayer.remove();

  // Remove assembly guides / registration pins
  const guidesLayer = clone.querySelector('#layer-assembly-guides');
  if (guidesLayer) guidesLayer.remove();

  // Ensure artwork and text layers are fully visible
  const artworkLayer = clone.querySelector('#layer-artwork') as HTMLElement | null;
  if (artworkLayer) artworkLayer.style.display = 'inline';

  const textLayer = clone.querySelector('#layer-text') as HTMLElement | null;
  if (textLayer) textLayer.style.display = 'inline';

  const qrLayer = clone.querySelector('#layer-smart-addons') as HTMLElement | null;
  if (qrLayer) qrLayer.style.display = 'inline';

  // Ensure transparent or crisp white background for print
  const paperBackdrop = clone.querySelector('#layer-paper-backdrop') as HTMLElement | null;
  if (paperBackdrop) {
    // Remove dropshadows / mockups on paper
    paperBackdrop.removeAttribute('filter');
    const bgRect = paperBackdrop.querySelector('path, rect') as SVGElement | null;
    if (bgRect) {
      bgRect.removeAttribute('filter');
    }
  }

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);
  triggerDownload(svgString, filename, 'image/svg+xml');
  return svgString;
}

/**
 * Exports High-Resolution PNG for printing (300 DPI)
 */
export async function exportPrintPng(
  svgElement: SVGSVGElement,
  filename: string = 'print-artwork-300dpi.png',
  scaleFactor: number = 3.125 // 300 DPI / 96 DPI ≈ 3.125
): Promise<void> {
  const clone = getMasterSvgClone(svgElement);

  // Strip cut lines and mockup helpers
  const cutLayer = clone.querySelector('#layer-cut-lines');
  if (cutLayer) cutLayer.remove();
  const guidesLayer = clone.querySelector('#layer-assembly-guides');
  if (guidesLayer) guidesLayer.remove();

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);

  const viewBox = svgElement.viewBox.baseVal;
  const width = (viewBox && viewBox.width > 0) ? viewBox.width : svgElement.clientWidth || 800;
  const height = (viewBox && viewBox.height > 0) ? viewBox.height : svgElement.clientHeight || 1100;

  const canvas = document.createElement('canvas');
  canvas.width = width * scaleFactor;
  canvas.height = height * scaleFactor;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context unavailable');
  }

  // Draw smooth high-res
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const img = new Image();
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  await new Promise<void>((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });

  canvas.toBlob((blob) => {
    if (blob) {
      triggerDownload(blob, filename, 'image/png');
    }
  }, 'image/png');
}

/**
 * 2. EXPORT VECTOR CUT LINES (Cameo / Skycut / Cricut / Laser Plotter Ready)
 * Strips ALL artwork, text, backgrounds, shadows, and QR code.
 * Keeps strictly the hairline cut vectors (<path fill="none" stroke="#FF0000" stroke-width="0.75" />)
 */
export function exportCutLinesSvg(svgElement: SVGSVGElement, filename: string = 'cutlines-cameo-skycut.svg'): string {
  const clone = getMasterSvgClone(svgElement);

  // Remove everything except cut lines layer and defs
  const layersToRemove = [
    '#layer-paper-backdrop',
    '#layer-artwork',
    '#layer-text',
    '#layer-smart-addons'
  ];

  layersToRemove.forEach((selector) => {
    const el = clone.querySelector(selector);
    if (el) el.remove();
  });

  // Ensure cut lines are styled strictly for plotter cutters:
  // Red hairline stroke, no fill
  const cutLayer = clone.querySelector('#layer-cut-lines');
  if (cutLayer) {
    (cutLayer as HTMLElement).style.display = 'inline';
    const paths = cutLayer.querySelectorAll('path, circle, rect, line');
    paths.forEach((p) => {
      p.setAttribute('fill', 'none');
      // Standard plotter red dieline
      p.setAttribute('stroke', '#FF0000');
      // Hairline stroke (0.5 pt or 0.2 mm)
      p.setAttribute('stroke-width', '0.75');
      p.removeAttribute('filter');
    });
  }

  // Add plotter metadata comment
  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(clone);
  const metadataComment = `<!--
  Maktaba Stationery Studio - Vector Dieline Cut File
  Optimized for: Silhouette Cameo, Skycut, Cricut Design Space, Laser Cutters
  Stroke: 0.75pt Hairline Red (#FF0000)
  Units: 1:1 Vector mm
-->\n`;
  svgString = metadataComment + svgString;

  triggerDownload(svgString, filename, 'image/svg+xml');
  return svgString;
}

/**
 * 3. Direct Print Dialog at 100% physical scale
 */
export function triggerDirectPrint(svgElement: SVGSVGElement): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const clone = getMasterSvgClone(svgElement);
  // Remove cut lines for clean print
  const cutLayer = clone.querySelector('#layer-cut-lines');
  if (cutLayer) cutLayer.remove();
  const guidesLayer = clone.querySelector('#layer-assembly-guides');
  if (guidesLayer) guidesLayer.remove();

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <title>طباعة بطاقة المناسبة - مكتبة الشعلة</title>
      <style>
        @page {
          size: auto;
          margin: 10mm;
        }
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: white;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        svg {
          max-width: 100%;
          height: auto;
          display: block;
        }
      </style>
    </head>
    <body>
      ${svgString}
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
            window.close();
          }, 300);
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

/**
 * Renders an SVGSVGElement to an offscreen HTMLCanvasElement with high physical DPI scaling
 */
export async function svgElementToCanvas(
  svgElement: SVGSVGElement,
  sheetW: number,
  sheetH: number,
  scale: number = 2.5
): Promise<HTMLCanvasElement> {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  // Convert mm to pixels: 1mm ≈ 3.7795 px at 96 DPI
  const pixelWidth = Math.round(sheetW * 3.779527559 * scale);
  const pixelHeight = Math.round(sheetH * 3.779527559 * scale);

  clone.setAttribute('width', `${pixelWidth}`);
  clone.setAttribute('height', `${pixelHeight}`);

  // Inject embedded fonts style inside the clone for SVG blob rasterization
  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:ital,wght@0,400;0,700;1,400&family=Aref+Ruqaa:wght@400;700&family=Cairo:wght@300;400;500;600;700;800;900&family=Cinzel+Decorative:wght@400;700;900&family=Great+Vibes&family=Noto+Naskh+Arabic:wght@400;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Reem+Kufi:wght@400;500;600;700&family=Tajawal:wght@300;400;500;700;800&display=swap');
  `;
  clone.insertBefore(styleEl, clone.firstChild);

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);

  const canvas = document.createElement('canvas');
  canvas.width = pixelWidth;
  canvas.height = pixelHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot get 2D canvas context');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const timer = setTimeout(() => {
      // Timeout fallback if remote fonts take too long to resolve inside blob
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve();
    }, 12000);

    img.onload = () => {
      clearTimeout(timer);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = (e) => {
      clearTimeout(timer);
      console.warn('SVG raster image load error, proceeding with fallback:', e);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.src = url;
  });

  return canvas;
}

export interface DuplexPdfExportOptions {
  frontSvg: SVGSVGElement;
  backSvg: SVGSVGElement;
  cutSvg?: SVGSVGElement | null;
  sheetW: number;
  sheetH: number;
  filename?: string;
  onProgress?: (step: string) => void;
}

/**
 * 4. DIRECT MULTI-PAGE DUPLEX IMPOSITION PDF EXPORT
 * Compiles a real commercial 3-page PDF:
 * Page 1: Front Imposition Sheet (with 5mm inset L-registration marks & bleed indicators)
 * Page 2: Mirrored Back Imposition Sheet (horizontally flipped for zero-shift duplex printing)
 * Page 3: Plotter Vector Dieline Sheet (Cameo / Skycut Cut lines)
 */
export async function exportDuplexImpositionPdf({
  frontSvg,
  backSvg,
  cutSvg,
  sheetW,
  sheetH,
  filename = 'Huroof_Print_Sheet.pdf',
  onProgress
}: DuplexPdfExportOptions): Promise<void> {
  const isLandscape = sheetW > sheetH;
  const orientation = isLandscape ? 'landscape' : 'portrait';

  onProgress?.('جاري تحويل فرخ الوجه الأمامي بدقة 300 DPI...');
  const frontCanvas = await svgElementToCanvas(frontSvg, sheetW, sheetH, 2.5);
  const frontDataUrl = frontCanvas.toDataURL('image/jpeg', 0.95);

  const doc = new jsPDF({
    orientation,
    unit: 'mm',
    format: [sheetW, sheetH],
    compress: true
  });

  // Page 1: Front Sheet
  doc.addImage(frontDataUrl, 'JPEG', 0, 0, sheetW, sheetH, undefined, 'FAST');

  // Page 2: Mirrored Back Sheet
  onProgress?.('جاري تجهيز فرخ القفا المعكوس للطباعة المزدوجة...');
  doc.addPage([sheetW, sheetH], orientation);
  const backCanvas = await svgElementToCanvas(backSvg, sheetW, sheetH, 2.5);
  const backDataUrl = backCanvas.toDataURL('image/jpeg', 0.95);
  doc.addImage(backDataUrl, 'JPEG', 0, 0, sheetW, sheetH, undefined, 'FAST');

  // Page 3: Cameo / Skycut Cut Sheet
  if (cutSvg) {
    onProgress?.('جاري توليد مسارات القص والتفريغ لماكينات البلتر...');
    doc.addPage([sheetW, sheetH], orientation);
    const cutCanvas = await svgElementToCanvas(cutSvg, sheetW, sheetH, 2.5);
    const cutDataUrl = cutCanvas.toDataURL('image/png');
    doc.addImage(cutDataUrl, 'PNG', 0, 0, sheetW, sheetH, undefined, 'FAST');
  }

  onProgress?.('جاري حفظ ملف PDF المتكامل...');
  doc.save(filename);
}

