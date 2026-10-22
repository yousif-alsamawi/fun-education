import { BehaviorIssue, ArtStyle } from './types';

export interface BehaviorDefinition {
  id: BehaviorIssue;
  titleArabic: string;
  defaultDescription: string;
  recommendedMoral: string;
  heroDialogueIdea: string;
}

export const BEHAVIOR_PRESETS: BehaviorDefinition[] = [
  {
    id: 'study-neglect',
    titleArabic: 'إهمال المذاكرة والواجبات المدرسية',
    defaultDescription: 'يقضي وقتاً طويلاً في اللعب ويهمل أداء واجباته المدرسية وتجهيز حقيبته.',
    recommendedMoral: 'العلم هو القوة الخارقة الحقيقية، والتنظيم يجعل البطل مستعداً لأي مهمة.',
    heroDialogueIdea: 'يا صديقي، حتى الأبطال الخارقون يقضون ساعات في التدريب والقراءة ليعرفوا أسرار العالم!'
  },
  {
    id: 'lying',
    titleArabic: 'عدم قول الحقيقة (الكذب أو إخفاء الأخطاء)',
    defaultDescription: 'يخاف من الاعتراف بالخطأ فيلجأ لاختلاق القصص وعدم قول الصدق لوالديه.',
    recommendedMoral: 'الصدق هو شجاعة الأبطال، والاعتراف بالخطأ هو أول خطوة لتصبح أقوى.',
    heroDialogueIdea: 'الدرع الحقيقي للبطل هو الصدق؛ فالكذب يضعف قوتنا، والشجاع فقط هو من يقول الحقيقة دائماً.'
  },
  {
    id: 'stubbornness',
    titleArabic: 'العناد وعدم الاستماع لتوجيهات الوالدين',
    defaultDescription: 'يرفض الاستماع لنصائح أمه وأبيه ويعاند في قراراته.',
    recommendedMoral: 'الاستماع لمن يحبوننا هو سر حكمة الأبطال ونجاتهم من المخاطر.',
    heroDialogueIdea: 'في فريقي الخارق، نستمع دائماً لتوجيهات قادتنا ومن يحبوننا لنحقق النصر معاً!'
  },
  {
    id: 'bullying',
    titleArabic: 'العنف مع الزملاء أو التنمر في المدرسة',
    defaultDescription: 'يستخدم القوة أو الكلمات القاسية مع زملائه في الصف أو الحديقة.',
    recommendedMoral: 'القوة الحقيقية خُلقت لحماية الضعفاء ونشر اللطف وليس لإيذاء الآخرين.',
    heroDialogueIdea: 'البطل لا يخيف أحداً بقوته، بل يجعل كل من حوله يشعرون بالأمان والمحبة!'
  },
  {
    id: 'screen-addiction',
    titleArabic: 'الإفراط في استخدام الأجهزة والشاشات',
    defaultDescription: 'يقضي ساعات طويلة جداً أمام الجوال أو التلفاز ويهمل الحركة والنشاط.',
    recommendedMoral: 'العالم الحقيقي مليء بالمغامرات التي تنتظر بطلاً حقيقياً يتحرك ويستكشف.',
    heroDialogueIdea: 'أجسامنا تحتاج للحركة وقوتنا تحتاج للطبيعة والرياضة لنكون أبطالاً خارقين!'
  }
];

export const ART_STYLE_PRESETS: { id: ArtStyle; nameArabic: string; promptModifier: string }[] = [
  {
    id: '3d-pixar',
    nameArabic: 'ثلاثي الأبعاد أسلوب بيكسار / ديزني (3D Pixar Style)',
    promptModifier: 'vibrant 3D animated film render, Pixar and Disney animation studio style, highly expressive face, beautiful lighting, cinematic colorful, octane render 8k'
  },
  {
    id: 'anime',
    nameArabic: 'أنمي ياباني كرتوني مشرق (Anime Style)',
    promptModifier: 'vibrant studio ghibli and shonen anime style, crisp lineart, colorful animated illustration, expressive anime eyes, cinematic composition'
  },
  {
    id: 'comic-book',
    nameArabic: 'مجلة كوميكس أبطال خارقين (Comic Book Style)',
    promptModifier: 'modern superhero comic book illustration, dynamic heroic pose, bold ink lines, vibrant comic halftone dots and vibrant coloring, Marvel DC comic style'
  },
  {
    id: 'classic-cartoon',
    nameArabic: 'رسوم كرتون أطفال كلاسيكية مبهجة (Classic Cartoon)',
    promptModifier: 'whimsical high quality children book illustration, soft painterly textures, warm joyful palette, delightful storybook character art'
  }
];

export const POPULAR_HEROES: string[] = [
  'سبايدرمان (Spider-Man)',
  'باتمان (Batman)',
  'سونيك (Sonic)',
  'سوبرمان (Superman)',
  'أيرون مان (Iron Man)',
  'غوكو (Goku)',
  'ناروتو (Naruto)',
  'إلسا (Elsa)',
  'كابتن أمريكا (Captain America)'
];
