import { ImpositionSpread } from './types';

/**
 * دالة حساب ملازم الطباعة والتدبيس في المنتصف (Saddle-Stitch Booklet Imposition)
 * تقوم بترتيب الصفحات تلقائياً على وجهي الورقة للطباعة المزدوجة (Duplex Printing).
 * 
 * @param totalPages إجمالي عدد الصفحات (يجب أن يكون مضاعفاً للرقم 4، مثل: 8، 12، 16)
 * @returns مصفوفة بأوراق الطباعة بالترتيب الدقيق للطباعة على الوجهين
 */
export function calculateSaddleStitchImposition(totalPages: number = 12): ImpositionSpread[] {
  if (totalPages % 4 !== 0) {
    throw new Error(`عدد الصفحات يجب أن يكون مضاعفاً للرقم 4 للتدبيس من المنتصف. القيمة المدخلة: ${totalPages}`);
  }

  const spreads: ImpositionSpread[] = [];
  const totalSheets = totalPages / 4;

  for (let sheet = 1; sheet <= totalSheets; sheet++) {
    // 1. الوجه الأمامي للورقة (Front Side)
    // الغلاف أو الصفحة الخارجية على اليمين، والصفحة المقابلة على اليسار
    const frontLeft = totalPages - 2 * (sheet - 1);
    const frontRight = 2 * (sheet - 1) + 1;
    spreads.push({
      sheetNumber: sheet,
      side: 'front',
      leftPageNumber: frontLeft,
      rightPageNumber: frontRight
    });

    // 2. الوجه الخلفي للورقة (Back Side)
    // الصفحة الداخلية الأولى على اليسار، والصفحة المقابلة على اليمين
    const backLeft = 2 * (sheet - 1) + 2;
    const backRight = totalPages - 2 * (sheet - 1) - 1;
    spreads.push({
      sheetNumber: sheet,
      side: 'back',
      leftPageNumber: backLeft,
      rightPageNumber: backRight
    });
  }

  return spreads;
}

/**
 * دالة توضح للمشغل والموظف في المكتبة تعليمات طي وتدبيس الملازم بوضوح
 */
export function getPrintingInstructions(totalPages: number = 12): string[] {
  return [
    `إجمالي صفحات المجلة: ${totalPages} صفحة.`,
    `عدد أوراق الطباعة المطلوبة: ${totalPages / 4} ورقة.`,
    'اضبط الطابعة على خيار الطباعة على الوجهين (Duplex Printing - Flip on short edge / الالتفاف على الحافة القصيرة).',
    'بعد اكتمال طباعة الأوراق، رتبها فوق بعضها بنفس ترتيب خروجها من الطابعة (الورقة 1 بالأسفل ثم 2 ثم 3).',
    'اطوِ المجموعة كاملة من المنتصف بدقة.',
    'ضع دبوسين في خط المنتصف تماماً (Saddle Stitch)، وأصبحت المجلة جاهزة ولامعة للتسليم!'
  ];
}
