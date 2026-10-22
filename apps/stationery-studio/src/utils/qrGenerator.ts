import QRCode from 'qrcode';

/**
 * Generates an SVG string representation of a QR code with custom colors.
 */
export async function generateQrSvgString(
  text: string,
  color: string = '#791E34',
  bgColor: string = 'transparent'
): Promise<string> {
  try {
    const svg = await QRCode.toString(text || 'https://maps.google.com', {
      type: 'svg',
      margin: 1,
      color: {
        dark: color,
        light: bgColor === 'transparent' ? '#00000000' : bgColor
      },
      errorCorrectionLevel: 'M'
    });
    return svg;
  } catch (err) {
    console.error('Error generating QR SVG:', err);
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="none" stroke="${color}" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="${color}" font-size="12">QR Code</text></svg>`;
  }
}

/**
 * Generates QR Code SVG paths or matrix data for direct SVG element rendering
 */
export async function getQrMatrixPaths(
  text: string
): Promise<{ size: number; paths: string }> {
  try {
    const qrData = QRCode.create(text || 'https://maps.google.com', {
      errorCorrectionLevel: 'M'
    });

    const modules = qrData.modules;
    const size = modules.size;
    let pathString = '';

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (modules.get(row, col)) {
          // Add 1x1 square to path
          pathString += `M${col},${row}h1v1h-1z `;
        }
      }
    }

    return {
      size,
      paths: pathString
    };
  } catch (err) {
    console.error('QR Matrix path generation failed:', err);
    return {
      size: 25,
      paths: 'M5,5h15v15h-15z'
    };
  }
}
