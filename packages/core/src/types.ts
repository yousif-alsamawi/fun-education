export type ArtStyle = 
  | '3d-pixar' 
  | 'anime' 
  | 'comic-book' 
  | 'classic-cartoon';

export type BehaviorIssue = 
  | 'study-neglect'       // إهمال المذاكرة والواجبات
  | 'lying'               // الكذب وعدم قول الحقيقة
  | 'stubbornness'        // العناد وعدم سماع كلام الوالدين
  | 'bullying'            // التنمر أو العنف في المدرسة
  | 'screen-addiction'    // الإفراط في الشاشات والألعاب
  | 'eating-junk-food'    // رفض الأكل الصحي
  | 'fear-anxiety'        // الخوف الزائد أو القلق
  | 'sibling-rivalry'     // الغيرة والشجار مع الإخوة
  | 'custom';             // سلوك آخر مخصص

export interface FaceSubjectReference {
  role: 'child' | 'father' | 'mother' | 'hero';
  name: string;
  photoUrl?: string;
  description: string;
}

export interface ChildProfile {
  name: string;
  age: number;
  gender: 'boy' | 'girl';
  photoUrl?: string;           // صورة الطفل المرجعية (FaceID بطل القصة)
  fatherPhotoUrl?: string;     // صورة الأب لدمجه كشخصية في القصة
  motherPhotoUrl?: string;     // صورة الأم لدمجها كشخصية في القصة
  includeParentsInStory: boolean; // تفعيل دمج الوالدين في المشاهد
  behaviorIssue: BehaviorIssue;
  behaviorDescription: string;
  positiveAlternative: string; // السلوك البديل الإيجابي بدون تشكيل
  favoriteHero: string;        // البطل المفضل (سبايدرمان، سونيك، باتمان...)
  parentName: string;          // اسم الأب أو الأم
  parentDedication: string;    // كلمة إهداء خاصة للطفل في الصفحة الثانية
  artStyle: ArtStyle;
}

export type PageType = 
  | 'cover'         // الغلاف الأمامي الرئيسي
  | 'dedication'    // إهداء الأهل وصورة الطفل
  | 'story'         // صفحة قصة مصورة (4 إلى 6 أسطر بدون تشكيل)
  | 'coloring'      // صفحة تلوين تفاعلية مفرغة
  | 'certificate';  // شهادة بطل السلوك الإيجابي

export interface MagazinePage {
  pageNumber: number;          // 1-indexed (1 to 12)
  type: PageType;
  title: string;
  textArabic: string;          // نص عربي بدون تشكيل نهائياً (4 إلى 6 أسطر مليئة بالأحداث)
  imagePromptEnglish: string;  // أمر توليد الصورة مع FaceID Multi-Subject
  imagePromptArabic?: string;  // شرح المشهد بالعربي للمراجعة
  faceSubjects?: FaceSubjectReference[]; // مراجع الوجوه المتعددة
  imageUrl?: string;           // رابط الصورة الحقيقية المولدة (بدون مربعات ملونة)
  coloringImageUrl?: string;   // رابط رسمة التلوين المفرغة
  dialogueBubble?: {
    speaker: string;
    text: string;
  };
}

export type PrintPreset = 
  | 'a5-booklet'    // ورق A4 يطوى من المنتصف ليصبح مجلة A5 (الافتراضي للتدبيس)
  | 'a4-magazine'   // ورق A3 يطوى من المنتصف ليصبح مجلة A4 كبيرة
  | 'a4-single';    // صفحات A4 مستقلة للتدبيس الجانبي أو السلك الحلزوني

export interface ImpositionSpread {
  sheetNumber: number;         // رقم ورقة الطباعة (1, 2, 3...)
  side: 'front' | 'back';      // الوجه الأمامي أو الخلفي للورقة
  leftPageNumber: number;      // رقم الصفحة على اليسار
  rightPageNumber: number;     // رقم الصفحة على اليمين
}

export interface MagazineProject {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  child: ChildProfile;
  preset: PrintPreset;
  pages: MagazinePage[];
  status: 'draft' | 'story-generated' | 'images-generating' | 'ready-to-print' | 'printed';
  exportPaths?: {
    digitalReadingPdf?: string;
    impositionPrintPdf?: string;
  };
}
