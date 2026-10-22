/**
 * Calendar utilities for Dynamic Save-the-Date Calendar Tag Template
 */

export interface MonthCalendarData {
  year: number;
  monthIndex: number; // 0-11
  monthNameAr: string;
  monthNameEn: string;
  selectedDay: number;
  daysInMonth: number;
  firstDayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  weeks: (number | null)[][];
}

const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const ENGLISH_MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const ARABIC_DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export const DAY_HEADERS_COMPACT = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
export const DAY_HEADERS_EN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * Computes calendar matrix from ISO date string (YYYY-MM-DD)
 */
export function getCalendarData(isoDate: string = '2026-09-19'): MonthCalendarData {
  const parts = isoDate.split('-').map(Number);
  const year = parts[0] || 2026;
  const month = (parts[1] || 9) - 1; // 0-indexed
  const selectedDay = parts[2] || 19;

  const firstDayDate = new Date(year, month, 1);
  const firstDayOfWeek = firstDayDate.getDay(); // 0 = Sunday

  // Days in month
  const lastDayDate = new Date(year, month + 1, 0);
  const daysInMonth = lastDayDate.getDate();

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  // Pad days before 1st of month
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  // Populate days
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Pad remaining days of last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return {
    year,
    monthIndex: month,
    monthNameAr: ARABIC_MONTHS[month] || 'سبتمبر',
    monthNameEn: ENGLISH_MONTHS[month] || 'SEPTEMBER',
    selectedDay,
    daysInMonth,
    firstDayOfWeek,
    weeks
  };
}

/**
 * Formats ISO date to Arabic textual representation
 */
export function formatArabicDateText(isoDate: string = '2026-09-19'): string {
  const parts = isoDate.split('-').map(Number);
  const year = parts[0] || 2026;
  const month = (parts[1] || 9) - 1;
  const day = parts[2] || 19;

  const dateObj = new Date(year, month, day);
  const dayName = ARABIC_DAYS[dateObj.getDay()] || 'السبت';
  const monthName = ARABIC_MONTHS[month] || 'سبتمبر';

  // Arabic-Indic numerals
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const toArabicNum = (n: number) => n.toString().split('').map(d => arabicNumerals[+d] || d).join('');

  return `${dayName}، ${toArabicNum(day)} ${monthName} ${toArabicNum(year)} م`;
}
