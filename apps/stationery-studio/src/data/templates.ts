import {
  ArtworkPatternStyle,
  CardSize,
  DesignSchoolTheme,
  FontOption,
  LuxuryTheme,
  MasterTemplateId,
  MasterTemplateInfo,
  StudioState
} from '../types/studio';

export const MASTER_TEMPLATES: MasterTemplateInfo[] = [
  // ═════════════════════════════════════════════════════════════════════
  // THE 10 MASTER STRUCTURAL SVG TEMPLATES (قوالب القص المتجهي الفاخرة)
  // ═════════════════════════════════════════════════════════════════════

  // 1. القوس الملكي الكلاسيكي (Royal Arch)
  {
    id: 'royal-arch',
    nameAr: 'القوس الملكي الكلاسيكي',
    nameEn: 'Royal Arch Card',
    tagline: 'قوس معماري ملوكي بانحناء هندسي نصف دائري متماثل 100%',
    description: 'بطاقة زفاف بقوس هندسي متماثل كلاسيكي مع إطار فيكتوري مزدوج من رقائق الذهب وخلفية كريمية ناعمة.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'الأكثر طلباً 👑',
    hasSecondaryPiece: false
  },

  // 2. بطاقة بيضاوية داخل جيب سحب (Pull-Out Oval + Thumb-Notch Pocket)
  {
    id: 'pullout-oval',
    nameAr: 'بطاقة بيضاوية داخل جيب سحب',
    nameEn: 'Pull-Out Oval + Thumb-Notch Pocket',
    tagline: 'بطاقة بيضاوية تخرج عمودياً من جيب سحب مع أخدود إبهام',
    description: 'بطاقة زفاف بيضاوية ناعمة تنزلق بسلاسة من مغلف جيب بأخدود إبهام علوي نصف دائري.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'سحب تفاعلي 🌟',
    hasSecondaryPiece: true
  },

  // 3. بطاقة دائرية ببروز جانبي للورد (Circular Right-Edge Cascade)
  {
    id: 'circular-cascade',
    nameAr: 'بطاقة دائرية ببروز جانبي للورد',
    nameEn: 'Circular Right-Edge Cascade',
    tagline: 'دائرة عاجية مفرغة الجانب الأيمن على حدود باقة الورد الكونتورية',
    description: 'قص كونتوري عضوي يتتبع بتلات الورود على الطرف الأيمن مع بقاء 70% من المساحة نقية للنص.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'قص كونتوري 🌹',
    hasSecondaryPiece: false
  },

  // 4. مطوية غير متماثلة تفتح من الجانب (Asymmetric Gatefold)
  {
    id: 'asymmetric-gatefold',
    nameAr: 'مطوية غير متماثلة تفتح من الجانب',
    nameEn: 'Asymmetric Gatefold Suite',
    tagline: 'مجلد فاخر غير متناظر يترك مسافة تكشف إطار الكرت الداخلي المذهب',
    description: 'مطوية زفاف غير متناظرة الأطراف تبرز الزخارف الداخلية مع شريطة ستان أنيقة.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'مطوية فاخرة 🎀',
    hasSecondaryPiece: true
  },

  // 5. مروحة البتلات الفرنسية المتموجة (French Scalloped Fan)
  {
    id: 'french-scallop',
    nameAr: 'مروحة البتلات الفرنسية المتموجة',
    nameEn: 'French Scalloped Fan',
    tagline: 'إطار مموج متناظر الحواف بـ 18 بتلة فرنسية متناسقة',
    description: 'شكل نخبوي بتموجات بتلات متناظرة على كامل المحيط تعطي طابع المطبوعات الأوروبية الراقية لدور الأزياء.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'طابع فرنسي 🌸',
    hasSecondaryPiece: false
  },

  // 6. بطاقة القبة المعمارية الإسلامية (Islamic Dome)
  {
    id: 'islamic-dome',
    nameAr: 'بطاقة القبة المعمارية الإسلامية',
    nameEn: 'Islamic Dome Arch Card',
    tagline: 'قوس قبة إسلامية بقمة مدببة وانسياب موريسكي أصيل',
    description: 'بطاقة مستوحاة من عمارة القصور الأندلسية والمساجد الكبرى بقوس قبة متماثل وزخارف هندسية دقيقة.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'طابع أندلسي 🕌',
    hasSecondaryPiece: false
  },

  // 7. مطوية البوابة ذات قفل الشق الأوسط (Slit-Lock Gatefold)
  {
    id: 'slit-lock-gatefold',
    nameAr: 'مطوية البوابة ذات قفل الشق الأوسط',
    nameEn: 'Slit-Lock Gatefold Card',
    tagline: 'بوابة مقوسة تغلق بقفل شق هندسي ميكانيكي مفرغ بدقة',
    description: 'كرت زفاف ملكي بدرفتين تنغلقان بقفل لسان هندسي ميكانيكي يضمن ثبات الكرت وفخامة تقديمه.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'قفل ميكانيكي 🔐',
    hasSecondaryPiece: true
  },

  // 8. بطاقة الكبسولة الطولية المنحنية (Vertical Capsule / Pill)
  {
    id: 'vertical-capsule',
    nameAr: 'بطاقة الكبسولة الطولية المنحنية',
    nameEn: 'Vertical Capsule / Pill Card',
    tagline: 'نصفا دائرة متناظران بالأعلى والأسفل بانسياب مودرن 100%',
    description: 'نمط الكبسولة (Pill Shape) العالمي المفضل في كروت زفاف بنترست واستوديوهات التصميم العالمية.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'تريند مودرن 💊',
    hasSecondaryPiece: false
  },

  // 9. بطاقة اللوحة مشطوفة الزوايا (Chamfered Luxury Plaque)
  {
    id: 'chamfered-plaque',
    nameAr: 'بطاقة اللوحة مشطوفة الزوايا',
    nameEn: 'Chamfered Luxury Plaque',
    tagline: 'زوايا مشطوفة بزاوية 45 درجة مع إطارات حفر ملكية',
    description: 'تصميم بلورة مستطيلة بزوايا مشطوفة هندسياً تمنح الكرت مظهراً معمارياً عصرياً رصيناً وبصمة ذهب براقة.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'هندسي عصري 📐',
    hasSecondaryPiece: false
  },

  // 10. بطانة الظرف الداخلية المقوسة (Geometric Envelope Liner)
  {
    id: 'geometric-envelope-liner',
    nameAr: 'بطانة الظرف الداخلية المقوسة',
    nameEn: 'Geometric Envelope Liner',
    tagline: 'بطانة داخلية بفلاب مقوس هندسي يورو-فلاب مع طباعة موردة',
    description: 'بطانة مخصصة لتزيين الوجه الداخلي لغطاء المظروف بنقوش مائية وفويل مذهب فائق الفخامة.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'بطانة مظروف ✉️',
    hasSecondaryPiece: true
  },

  // Legacy & Alias Definitions:
  {
    id: 'scalloped-badge',
    nameAr: 'البطاقة الفيكتورية المموجة (بديل)',
    nameEn: 'Symmetric Scalloped Badge',
    tagline: 'إطار مموج متناظر الحواف بنقوش أرستقراطية فاخرة',
    description: 'شكل نخبوي بتموجات بتلات متناظرة.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'فيكتوري',
    hasSecondaryPiece: false
  },
  {
    id: 'capsule-suite',
    nameAr: 'طقم الكبسولة المودرن (بديل)',
    nameEn: 'Pill Suite',
    tagline: 'نصفا دائرة متناظران بالأعلى والأسفل',
    description: 'نمط الكبسولة العالمي.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'مودرن',
    hasSecondaryPiece: false
  },
  // 7. بطاقة القفل بالوردة البارزة
  {
    id: 'arch-gatefold-lily',
    nameAr: 'بطاقة القفل بالوردة البارزة',
    nameEn: 'Slit-Lock Lily Gatefold Card',
    tagline: 'بوابة مقوسة تغلق بشق أفقي ينزلق فيه ساق زهرة ليلي ثلاثية الأبعاد',
    description: 'كرت زفاف زيتي ملكي مقوس ينغلق درفتاه بقفل زهرة ميكانيكي مفرغ بالليزر.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'قفل ميكانيكي',
    hasSecondaryPiece: true
  },
  // 8. جيب القصر المعماري ذو النافذة
  {
    id: 'arch-window-pocket',
    nameAr: 'جيب القصر المعماري والختم الشمعي',
    nameEn: 'Arch Window Pocket Suite',
    tagline: 'جيب خمري بنافذة مقوسة تكشف تفاصيل الكرت الداخلي مع ختم شمعي',
    description: 'طقم جيب فاخر بنافذة مقوسة تكشف مشهد الكرت الداخلي ومثبت بختم شمعي أحمر عتيق.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'جيب ونافذة',
    hasSecondaryPiece: true
  },
  // 9. طقم الإطار الفيكتوري والشرابة
  {
    id: 'baroque-tassel-tag',
    nameAr: 'طقم الإطار الفيكتوري والشرابة الحريرية',
    nameEn: 'Baroque Frame Tag + Tassel',
    tagline: 'تاق كروكي مفرغ بشرابة حريرية وثقب علوي معالج',
    description: 'تاق ملكي فيكتوري بتموجات باروكية دقيقة وشرابة حريرية ذهبية.',
    category: 'tags',
    defaultSizeId: 'size-economy-8up',
    badge: 'شرابة حرير',
    hasSecondaryPiece: true
  },
  // 10. علبة التوزيعات الهندسية
  {
    id: 'favor-box-dieline',
    nameAr: 'علبة التوزيعات الهندسية هرمية الإغلاق',
    nameEn: 'Pyramid Favor Box Dieline Suite',
    tagline: 'شيت قص وتكسير لعلبة هدايا وتوزيعات بنمط تداخل ألسنة ميكانيكي',
    description: 'شيت بلتر مفرغ لعلبة توزيعات كرتونية بألسنة قفل ذاتية وخطوط ريجة للتثنية.',
    category: 'packaging',
    defaultSizeId: 'size-standard-4up',
    badge: 'علبة توزيعات',
    hasSecondaryPiece: false
  },
  // 11. بطاقة حزام الستان المطبوع
  {
    id: 'ribbon-belly-band',
    nameAr: 'بطاقة حزام الستان المطبوع (Belly Band)',
    nameEn: 'Ribbon Belly Band Card',
    tagline: 'حزام ستان ذهبي عريض يحيط بمنتصف الدعوة مع ختم مونوغرام',
    description: 'دعوة مستطيلة رصينة بحواف ناعمة يلفها حزام كرتوني/ستان مطبوع ومذهب.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'حزام ستان',
    hasSecondaryPiece: true
  },
  // 12. طقم القوس المزدوج المتداخل
  {
    id: 'double-half-arch',
    nameAr: 'طقم القوس المزدوج المتداخل (Double Arch)',
    nameEn: 'Double Half-Arch Suite',
    tagline: 'بطاقتان متداخلتان بنصف قوس متدرج يجمعهما حزام تثبيت',
    description: 'طقم دعوة مزدوج بنصفي قوس عصريين متكاملين متراكبين.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'قوس مزدوج',
    hasSecondaryPiece: true
  },
  // 13. لوحة البجع الملكي وقصر البحيرة
  {
    id: 'twin-swans-vista',
    nameAr: 'لوحة البجع الملكي وقصر البحيرة',
    nameEn: 'Twin Swans Vista Card',
    tagline: 'مشهد مائي هادئ لبجعتين متقابلتين وقباب قصر كلاسيكي',
    description: 'كرت زفاف رومانسي أسطوري بمشهد بحيرة البجع وقباب القصر المعماري.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'بحيرة البجع',
    hasSecondaryPiece: false
  },
  // 14. بطاقة القفص الهندسي السداسي
  {
    id: 'hexagon-terrarium',
    nameAr: 'بطاقة القفص الهندسي السداسي',
    nameEn: 'Hexagon Terrarium Card',
    tagline: 'إطار سداسي هندسي محاط بأكاليل الأوكالبتوس',
    description: 'تصميم بوهيمي سداسي الأضلاع مع بصمة الذهب الحار وأوراق الكينا المائية.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'سداسي مودرن',
    hasSecondaryPiece: false
  },
  // 15. تاق التقويم المصغر
  {
    id: 'calendar-tag',
    nameAr: 'تاق التقويم المصغر المزدوج',
    nameEn: 'Mini Calendar Date Tag',
    tagline: 'تاق طولي مصغر مخصص لشبكة التقويم وتحديد يوم الفرح',
    description: 'تاق أنيق مستطيل نحيف مع تثقيب علوي وسفلي لتثبيته فوق كرت الدعوة الرئيسي.',
    category: 'tags',
    defaultSizeId: 'size-tag-10up',
    badge: 'تاق تقويم',
    hasSecondaryPiece: false
  },
  // 16. تاق النبض الصوتي والباركود
  {
    id: 'song-wave-tag',
    nameAr: 'تاق النبض الصوتي والباركود الموسيقي',
    nameEn: 'Songwave Audio Frequency Tag',
    tagline: 'موجات صوتية مذهبة محفورة مع باركود استماع مباشر للأغنية',
    description: 'تاق تذكاري فريد يتضمن المقطع الصوتي للزفة محفوراً كتردد صوتي ذهبي.',
    category: 'tags',
    defaultSizeId: 'size-tag-10up',
    badge: 'نبض صوتي',
    hasSecondaryPiece: false
  },
  // 17. بطاقة الاحتفال بعود الثقاب والفتيل
  {
    id: 'matchstick-candle',
    nameAr: 'بطاقة الشمعة وعود الثقاب التفاعلية',
    nameEn: 'Matchstick & Candle Card',
    tagline: 'بطاقة احتفال بثقب لفتيل الشمعة وتثبيت عود ثقاب بشريطة ستان',
    description: 'بطاقة مناسبات تفاعلية تتضمن شريط كبريت حقيقي وثقب لتثبيت شمعة أعياد ميلاد.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'تفاعلي شمعة',
    hasSecondaryPiece: true
  },
  // 18. مروحة البتلة ذات المقبض المدمج
  {
    id: 'integrated-handle-fan',
    nameAr: 'مروحة البتلة ذات المقبض المدمج',
    nameEn: 'Integrated Handle Scalloped Fan',
    tagline: 'مروحة قطعة واحدة تمتد لتشكل مقبض يد مريح للحمل في القاعة',
    description: 'مروحة زفاف بقطعة واحدة مع مقبض متكامل مريح وثقب شرابة في الطرف السفلي.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'مقبض مدمج',
    hasSecondaryPiece: false
  },
  // 19. بطاقة الطاولة الهرمية ذات القوس
  {
    id: 'tent-table-stand',
    nameAr: 'بطاقة الطاولة الهرمية المقوسة (Table Tent)',
    nameEn: 'Arched Table Tent Stand',
    tagline: 'ستاند طاولة هرمي يقف ذاتياً مع قوس علوي لأرقام الطاولات',
    description: 'ستاند كرتوني مطوي هرمياً مخصص لأرقام طاولات الضيوف وقائمة الطعام.',
    category: 'tableware',
    defaultSizeId: 'size-medium-6up',
    badge: 'ستاند طاولة',
    hasSecondaryPiece: false
  },
  // 20. بطاقة الطي المزدوج المفتوحة
  {
    id: 'bifold-brand-card',
    nameAr: 'بطاقة الطي المزدوج المفتوحة (Bifold Suite)',
    nameEn: 'Bifold Brand Card',
    tagline: 'بطاقة كلاسيكية تطوى من المنتصف ككتيب دعوة راقٍ',
    description: 'كتيب دعوة بطيتين متقابلتين يفتح ليكشف تفاصيل الحفل وبرنامج الزفاف.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'كتيب مطوي',
    hasSecondaryPiece: false
  },
  // 21. قمع البتلات لمفرقعات الشرر
  {
    id: 'petal-cone-sparkler',
    nameAr: 'قمع البتلات لمفرقعات الشرر (Petal Cone)',
    nameEn: 'Petal Cone Sparkler Holder',
    tagline: 'قمع ورقي مقوس يلتف لاحتواء بتلات الورد أو شعلات الشرر',
    description: 'مجسم قمعي مفرغ بالليزر لتوزيع الورد المجفف على الضيوف لحظة الزفة.',
    category: 'packaging',
    defaultSizeId: 'size-economy-8up',
    badge: 'قمع ورد',
    hasSecondaryPiece: false
  },
  // 22. علبة القبة المعمارية للمسك
  {
    id: 'dome-favor-box',
    nameAr: 'علبة القبة المعمارية للمسك والعود',
    nameEn: 'Dome Favor Box',
    tagline: 'علبة هدايا مقوسة بقفل بتلات ملوكي للأطياب والمسك',
    description: 'علبة هدايا وتوزيعات فاخرة تغلق أطرافها على شكل قبة أندلسية.',
    category: 'packaging',
    defaultSizeId: 'size-standard-4up',
    badge: 'علبة قبة',
    hasSecondaryPiece: false
  },
  // 23. طقم المظروف الفرنسي الملكي
  {
    id: 'french-envelope-suite',
    nameAr: 'طقم المظروف الفرنسي الملكي خماسي القطع',
    nameEn: 'French Envelope 5-Piece Suite',
    tagline: 'طقم ملكي متكامل: مظروف فيكتوري، بطانة مذهبة، بطاقة رئيسية، وتاغ',
    description: 'أرقى أطقم الزفاف الأوروبية بمظروف بطانة موردة وبطاقات تفاصيل متناسقة.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'طقم 5 قطع',
    hasSecondaryPiece: true
  },
  // 24. كروت الألعاب التفاعلية
  {
    id: 'interactive-quiz-props',
    nameAr: 'بطاقات الألعاب والمسابقات التفاعلية',
    nameEn: 'Interactive Event Quiz Cards',
    tagline: 'كروت مصقولة الزوايا لأسئلة الحفل وتفاعل المدعوين والعروسين',
    description: 'طقم كروت مسابقات وتفاعل لطيف للضيوف أثناء فقرات العشاء والزفة.',
    category: 'invitations',
    defaultSizeId: 'size-economy-8up',
    badge: 'كروت تفاعلية',
    hasSecondaryPiece: false
  },
  // 25. دعوة السحب البيضاوية بتاج الورد والجيب
  {
    id: 'pullout-floral-oval',
    nameAr: 'دعوة السحب البيضاوية بتاج الورد والجيب',
    nameEn: 'Pull-Out Floral Crown Oval + Pocket',
    tagline: 'بطاقة بيضاوية تخرج عمودياً من جيب نصف دائري بتاج ورد كونتوري',
    description: 'بطاقة زفاف بيضاوية تخرج بسلاسة من مغلف جيب بأخدود إبهام علوي، متوجة بزهور قرمزية مجسمة.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'تاج وسحب',
    hasSecondaryPiece: true
  },
  // 26. البطاقة الدائرية بشلال الورد الجانبي
  {
    id: 'circular-rose-cascade',
    nameAr: 'البطاقة الدائرية بشلال الورد الجانبي',
    nameEn: 'Circular Card with Right-Edge Rose Cascade',
    tagline: 'دائرة عاجية مفرغة الجانب الأيمن على حدود باقة 5 وردات جوري متتالية',
    description: 'قص كونتوري عضوي يتتبع بتلات الورود الحمراء على الطرف الأيمن، مع مونوغرام ذهبي في المنتصف.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'قص كونتوري',
    hasSecondaryPiece: false
  },
  // 27. المطوية الخضراء غير المتماثلة بالشريطة
  {
    id: 'asymmetric-olive-gatefold',
    nameAr: 'المطوية الخضراء غير المتماثلة بالشريطة',
    nameEn: 'Asymmetric Olive Gatefold Suite',
    tagline: 'مجلد زيتي فاخر غير متناظر يترك مسافة تكشف إطار الكرت الداخلي مع شريطة',
    description: 'مطوية زفاف ملكية باللون الزيتي الداكن مقطوعة بشكل غير متناظر لتبرز الزخارف الداخلية مع فيونكة ستان.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'مطوية شريطة',
    hasSecondaryPiece: true
  },
  // 28. بطاقة "إثراء" العربية الكلاسيكية المذهبة
  {
    id: 'classic-ithra-gold-card',
    nameAr: 'بطاقة "إثراء" العربية الكلاسيكية المذهبة',
    nameEn: 'Classic Arabic Royal Geometric Card',
    tagline: 'قمة الفخامة العربية بختم "دَعْوَة" الدائري وشريط الأيقونات الثلاثي',
    description: 'بطاقة ملكية متكاملة تتضمن ختم دعوة الدائري المذهب، وشريط مواعيد ثلاثي، وعبارة وبحضوركم يتم الفرح.',
    category: 'wedding',
    defaultSizeId: 'size-standard-4up',
    badge: 'ختم دعوة',
    hasSecondaryPiece: false
  },
  // 29. طقم المظروف المعماري والبطانة الموردة (Lined Envelope Suite)
  {
    id: 'architectural-lined-envelope-suite',
    nameAr: 'طقم المظروف المعماري والبطانة الموردة',
    nameEn: 'Architectural Lined Envelope Suite',
    tagline: 'طقم ملكي ثلاثي القطع: بطاقة بولارويد، مظروف يورو-فلاب مقوس، وبطانة موردة ملكية',
    description: 'طقم زفاف متكامل ثلاثي القطع مع مظروف بفلاب هندسي، بطانة زهور ناعمة، وبطاقة صور بولارويد مع ختم شمعي.',
    category: 'suites',
    defaultSizeId: 'size-standard-4up',
    badge: 'طقم متعدد القطع',
    hasSecondaryPiece: true,
    isMultiPiece: true,
    piecesCount: 3,
    piecesNames: ['كرت البولارويد (Invite)', 'مظروف يورو-فلاب (Envelope)', 'بطانة المظروف (Liner)']
  },
  // 30. طقم جيب السحب بأخدود الإبهام والختم الشمعي
  {
    id: 'thumb-notch-sleeve-suite',
    nameAr: 'طقم جيب السحب بأخدود الإبهام والختم الشمعي',
    nameEn: 'Thumb-Notch Sleeve Suite',
    tagline: 'طقم ثنائي القطع: جيب خارجي بأخدود إبهام وختم شمعي مع بطاقة بيضاوية مسحوبة',
    description: 'جيب فاخر ينزلق منه كرت الدعوة البيضاوي بسلاسة مع ختم شمعي نافر وشريطة ستان.',
    category: 'suites',
    defaultSizeId: 'size-standard-4up',
    badge: 'طقم متعدد القطع',
    hasSecondaryPiece: true,
    isMultiPiece: true,
    piecesCount: 2,
    piecesNames: ['جيب السحب (Sleeve)', 'كرت الدعوة البيضاوي (Insert Card)']
  },
  // 31. طقم البوابة غير المتماثلة وشريطة الستان
  {
    id: 'asymmetric-forest-gatefold-suite',
    nameAr: 'طقم البوابة غير المتماثلة وشريطة الستان',
    nameEn: 'Asymmetric Forest Gatefold Suite',
    tagline: 'طقم ثنائي القطع: مطوية زيتونية غير متناظرة تكشف الإطار الداخلي مع كرت الورد',
    description: 'مطوية زيتونية داكنة مطوية بخطوط ريجة غير متماثلة ومربوطة بشريطة ستان خضراء مع كرت دعوة داخلي مورد.',
    category: 'suites',
    defaultSizeId: 'size-standard-4up',
    badge: 'طقم متعدد القطع',
    hasSecondaryPiece: true,
    isMultiPiece: true,
    piecesCount: 2,
    piecesNames: ['المطوية الخارجية (Gatefold Jacket)', 'الكرت الداخلي المورد (Inner Card)']
  }
];

export const ARTWORK_PATTERNS: { id: ArtworkPatternStyle; nameAr: string; nameEn: string; desc: string }[] = [
  {
    id: 'petal-veins',
    nameAr: 'عروق الورد المتفرعة',
    nameEn: 'Flowing Organic Petal Veins',
    desc: 'خطوط انسيابية مروحية ناعمة تحاكي بتلات الزهور المتفتحة'
  },
  {
    id: 'vintage-baroque',
    nameAr: 'إطار فيكتوري كلاسيكي',
    nameEn: 'Ornate Vintage Baroque Frame',
    desc: 'نقوش وتيجان باروكية كلاسيكية ملكية عريقة'
  },
  {
    id: 'moroccan-geometric',
    nameAr: 'زخرفة هندسية أندلسية',
    nameEn: 'Islamic/Moroccan Geometric Lines',
    desc: 'خطوط هندسية نجمية موريسكية دقيقة ومتقاطعة'
  },
  {
    id: 'olive-lily-branches',
    nameAr: 'أغصان الزيتون والزنبق',
    nameEn: 'Botanical Lily & Olive Branches',
    desc: 'توريقات نباتية ناعمة مع أغصان زيتون وزنبق رومانسية'
  },
  {
    id: 'watercolor-swan-palace',
    nameAr: 'مشهد البجعة وقصر البحيرة',
    nameEn: 'Watercolor Swan Palace Vista',
    desc: 'مشهد مائي هادئ لبجع وقباب قصور كلاسيكية رقيقة'
  },
  {
    id: 'eucalyptus-terrarium',
    nameAr: 'أغصان الكينا والأوكالبتوس',
    nameEn: 'Geometric Eucalyptus Garland',
    desc: 'أكاليل أوكالبتوس مائية تلتف حول الإطارات الهندسية'
  },
  {
    id: 'soundwave-audio',
    nameAr: 'موجات التردد الصوتي الفيكتورية',
    nameEn: 'Soundwave Audio Frequency',
    desc: 'تجسيد بصري دقيق للمقاطع الموسيقية بنمط خطي فاخر'
  },
  {
    id: 'laser-lace',
    nameAr: 'دانتيل ليزري مفرغ',
    nameEn: 'Intricate Laser-Cut Floral Lace',
    desc: 'شبكة دانتيل حريرية مفرغة تحاكي فساتين الزفاف الراقية'
  }
];

export const LUXURY_THEMES: LuxuryTheme[] = [
  {
    id: 'crimson-rose',
    nameAr: 'ثيم الوردة القرمزية',
    nameEn: 'Crimson Rose Gradient',
    cardBaseColor: '#FDFBF7',
    artworkColor: '#8B1E3F',
    artworkGradientEnd: '#D9534F',
    secondaryPieceColor: '#F4F1EA',
    textColor: '#6B0F2B',
    accentColor: '#D4AF37',
    patternStyle: 'petal-veins',
    foil: 'gold',
    paperTexture: 'cotton',
    description: 'قاعدة كريمية نقية مع عروق قرمزية تتدرج للمرجاني وتاريخ عاجي',
    tags: ['أعراس', 'رومانسي', 'بصمة ذهبية'],
    backBackgroundColor: '#58111A',
    backArtworkColor: '#D4AF37'
  },
  {
    id: 'swan-lake',
    nameAr: 'ثيم بحيرة البجع الملكي',
    nameEn: 'Swan Lake Burgundy & Olive',
    cardBaseColor: '#5E6B38',
    artworkColor: '#58111A',
    artworkGradientEnd: '#8B1E3F',
    secondaryPieceColor: '#FAFAFA',
    textColor: '#F5E6C8',
    accentColor: '#D4AF37',
    patternStyle: 'olive-lily-branches',
    foil: 'gold',
    paperTexture: 'linen',
    description: 'قاعدة زيتونية ملكية مع زهور عنابية وقطعة إضافية ناصعة البياض',
    tags: ['ملكي', 'طبيعي', 'أعراس خريفية'],
    backBackgroundColor: '#3B4620',
    backArtworkColor: '#F5E6C8'
  },
  {
    id: 'royal-navy-gold',
    nameAr: 'الفخامة الملكية الكحلية',
    nameEn: 'Royal Navy & Champagne Gold',
    cardBaseColor: '#0F1E36',
    artworkColor: '#D4AF37',
    artworkGradientEnd: '#F3E5AB',
    secondaryPieceColor: '#F9F6F0',
    textColor: '#E5C158',
    accentColor: '#F5C542',
    patternStyle: 'vintage-baroque',
    foil: 'gold',
    paperTexture: 'pearl',
    description: 'كحلي ليل فاحم مع زخارف وأوردة ذهب معدني خالص 24K وحلقة لؤلؤية',
    tags: ['أرستقراطي', 'ليلي', 'ذهب 24K'],
    backBackgroundColor: '#0A1424',
    backArtworkColor: '#F5C542'
  },
  {
    id: 'emerald-palace',
    nameAr: 'الزمرد الكلاسيكي',
    nameEn: 'Emerald Palace',
    cardBaseColor: '#113E21',
    artworkColor: '#C5A059',
    artworkGradientEnd: '#EAD8AE',
    secondaryPieceColor: '#FBF9F5',
    textColor: '#F3E5AB',
    accentColor: '#D4AF37',
    patternStyle: 'moroccan-geometric',
    foil: 'gold',
    paperTexture: 'cotton',
    description: 'أخضر زمردي داكن مع زخارف أندلسية ذهبية خافتة ونص شامبين',
    tags: ['أندلسي', 'تراثي', 'قصور'],
    backBackgroundColor: '#0B2916',
    backArtworkColor: '#EAD8AE'
  },
  {
    id: 'blush-rose-gold',
    nameAr: 'الرخام الوردي الناعم',
    nameEn: 'Blush & Rose Gold',
    cardBaseColor: '#F9EBE8',
    artworkColor: '#B76E79',
    artworkGradientEnd: '#E297A2',
    secondaryPieceColor: '#FFFFFF',
    textColor: '#5A383E',
    accentColor: '#FB7185',
    patternStyle: 'petal-veins',
    foil: 'rose-gold',
    paperTexture: 'cotton',
    description: 'وردي باودر ناعم مع عروق بصمة الذهب الوردي ونص بلون التوت المجفف',
    tags: ['ناعم', 'بناتي', 'ذهب وردي'],
    backBackgroundColor: '#4A232E',
    backArtworkColor: '#FB7185'
  },
  {
    id: 'velvet-noir-gold',
    nameAr: 'الكلاسيك المخملي الأسود',
    nameEn: 'Velvet Noir & Gold',
    cardBaseColor: '#181818',
    artworkColor: '#D4AF37',
    artworkGradientEnd: '#F5D061',
    secondaryPieceColor: '#282828',
    textColor: '#F5D061',
    accentColor: '#FBBF24',
    patternStyle: 'vintage-baroque',
    foil: 'gold',
    paperTexture: 'matte',
    description: 'أسود مطفي ملوكي مع إطار باروكي مشع ببريق الذهب العتيق',
    tags: ['مودرن', 'جريء', 'حفلات كبرى'],
    backBackgroundColor: '#101010',
    backArtworkColor: '#D4AF37'
  },
  {
    id: 'french-lavender',
    nameAr: 'اللافندر الفرنسي',
    nameEn: 'French Lavender & Silver',
    cardBaseColor: '#EAE6F0',
    artworkColor: '#6C5B7B',
    artworkGradientEnd: '#9B8CA8',
    secondaryPieceColor: '#FFFFFF',
    textColor: '#352940',
    accentColor: '#CBD5E1',
    patternStyle: 'petal-veins',
    foil: 'silver',
    paperTexture: 'linen',
    description: 'بنفسجي لافندر هادئ مع نقوش برقوقية عميقة ولمسات فضة بلاتين',
    tags: ['بروفنس', 'أوروبي', 'فضي'],
    backBackgroundColor: '#2B1B38',
    backArtworkColor: '#E0D6EB'
  },
  {
    id: 'rustic-kraft',
    nameAr: 'طابع الكرافت الريفي',
    nameEn: 'Rustic Kraft & Botanical White',
    cardBaseColor: '#C8AD8D',
    artworkColor: '#FFFFFF',
    artworkGradientEnd: '#F5F5F5',
    secondaryPieceColor: '#4A5D23',
    textColor: '#2C1E14',
    accentColor: '#D4AF37',
    patternStyle: 'olive-lily-branches',
    foil: 'gold',
    paperTexture: 'kraft',
    description: 'ورق كرافت بني دافئ مع رسومات حبر أبيض ناصع وحلقة زيتونية',
    tags: ['بوهيمي', 'ريفي', 'أعراس مزارع'],
    backBackgroundColor: '#3D2817',
    backArtworkColor: '#FFFFFF'
  },
  {
    id: 'boho-terracotta',
    nameAr: 'التيراكوتا الدافئ',
    nameEn: 'Boho Terracotta & Sage',
    cardBaseColor: '#C66B49',
    artworkColor: '#E8DFD5',
    artworkGradientEnd: '#FFFFFF',
    secondaryPieceColor: '#8A9A86',
    textColor: '#FFFDF9',
    accentColor: '#E0A96D',
    patternStyle: 'moroccan-geometric',
    foil: 'bronze',
    paperTexture: 'cotton',
    description: 'طين تيراكوتا مشرق مع زخارف كريمية عاجية وتفاصيل خضراء ناعمة',
    tags: ['بوهيمي', 'ترابي', 'صحراوي'],
    backBackgroundColor: '#5E2614',
    backArtworkColor: '#E8DFD5'
  },
  {
    id: 'tiffany-silver',
    nameAr: 'الأزرق السماوي الفيروزي',
    nameEn: 'Tiffany & Silver Elegance',
    cardBaseColor: '#E0F2F1',
    artworkColor: '#00695C',
    artworkGradientEnd: '#26A69A',
    secondaryPieceColor: '#FFFFFF',
    textColor: '#004D40',
    accentColor: '#CBD5E1',
    patternStyle: 'petal-veins',
    foil: 'silver',
    paperTexture: 'pearl',
    description: 'فيروزي تيفاني رقيق مع عروق زمردية بحرية ولمعان فضي ساطع',
    tags: ['تيفاني', 'صيفي', 'مبهج'],
    backBackgroundColor: '#00332C',
    backArtworkColor: '#80CBC4'
  },
  {
    id: 'desert-amber',
    nameAr: 'العنبر الصحراوي',
    nameEn: 'Desert Amber & Espresso',
    cardBaseColor: '#F2E8DC',
    artworkColor: '#8C5332',
    artworkGradientEnd: '#BA7A56',
    secondaryPieceColor: '#3E2723',
    textColor: '#2D1B14',
    accentColor: '#D4AF37',
    patternStyle: 'moroccan-geometric',
    foil: 'bronze',
    paperTexture: 'cotton',
    description: 'رمال صحراوية كهرمانية مع خطوط قرفة وبرونز وحلقة إسبريسو داكنة',
    tags: ['صحراوي', 'عنبر', 'أصيل'],
    backBackgroundColor: '#2E190E',
    backArtworkColor: '#E0A96D'
  },
  {
    id: 'pure-pearl',
    nameAr: 'الصفاء الملائكي اللؤلؤي',
    nameEn: 'Pure Minimalist Pearl',
    cardBaseColor: '#FAF9F6',
    artworkColor: '#A89F91',
    artworkGradientEnd: '#C5BEB3',
    secondaryPieceColor: '#EFECE6',
    textColor: '#333333',
    accentColor: '#D4AF37',
    patternStyle: 'vintage-baroque',
    foil: 'gold',
    paperTexture: 'pearl',
    description: 'أبيض لؤلؤي مينيمالي مع خطوط رمادية عاجية دافئة وتطريز كلاسيكي ناعم',
    tags: ['مينيمال', 'هادئ', 'لؤلؤي'],
    backBackgroundColor: '#1F1E22',
    backArtworkColor: '#D4AF37'
  }
];

export const COLOR_PALETTES = LUXURY_THEMES;

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'decotype-thuluth',
    nameAr: 'خط الثلث الملكي المتداخل',
    nameEn: 'DecoTypeThuluthII',
    fontFamily: '"DecoTypeThuluthII", "Aref Ruqaa", "Amiri", serif',
    lang: 'ar',
    category: 'calligraphy',
    sampleText: 'سارة & خالد'
  },
  {
    id: 'iran-nastaliq',
    nameAr: 'خط النستعليق الفارسي للأسماء',
    nameEn: 'IranNastaLiq3',
    fontFamily: '"IranNastaLiq3", "Noto Nastaliq Urdu", "Amiri", cursive, serif',
    lang: 'ar',
    category: 'calligraphy',
    sampleText: 'سارة وخالد'
  },
  {
    id: 'panorama-naskh',
    nameAr: 'خط النسخ الانسيابي المزخرف',
    nameEn: 'panoramaNaskhScribbleMobile',
    fontFamily: '"panoramaNaskhScribbleMobile", "Amiri", "Traditional Arabic", serif',
    lang: 'ar',
    category: 'classic',
    sampleText: 'وبحضوركم يتم لنا الفرح والسرور'
  },
  {
    id: 'moshref-naskh',
    nameAr: 'خط المشرف الكلاسيكي (مد طويل)',
    nameEn: 'AMoshref-Naskh',
    fontFamily: '"AMoshref-Naskh", "Amiri", "Noto Naskh Arabic", serif',
    lang: 'ar',
    category: 'classic',
    sampleText: 'يشرفنا حضوركم ومشاركتنا'
  },
  {
    id: 'tajawal-medium',
    nameAr: 'خط تجوال (للأيقونات والتفاصيل)',
    nameEn: 'Tajawal-Medium',
    fontFamily: '"Tajawal-Medium", "Tajawal", sans-serif',
    lang: 'ar',
    category: 'modern',
    sampleText: 'قاعة الثريا • ٨ مساءً'
  },
  {
    id: 'aref',
    nameAr: 'خط الرقعة الفاخر',
    nameEn: 'Aref Ruqaa',
    fontFamily: '"Aref Ruqaa", serif',
    lang: 'ar',
    category: 'calligraphy',
    sampleText: 'سارة وخالد'
  },
  {
    id: 'amiri',
    nameAr: 'خط الأميري الكلاسيكي',
    nameEn: 'Amiri',
    fontFamily: 'Amiri, serif',
    lang: 'ar',
    category: 'classic',
    sampleText: 'يشرفنا حضوركم'
  },
  {
    id: 'cairo',
    nameAr: 'خط كايرو العصري',
    nameEn: 'Cairo',
    fontFamily: 'Cairo, sans-serif',
    lang: 'ar',
    category: 'modern',
    sampleText: '١٩ سبتمبر ٢٠٢٦'
  },
  {
    id: 'tajawal',
    nameAr: 'خط تجوال الأنيق',
    nameEn: 'Tajawal',
    fontFamily: 'Tajawal, sans-serif',
    lang: 'ar',
    category: 'modern',
    sampleText: 'قاعة الثريا الكبرى'
  },
  {
    id: 'reemkufi',
    nameAr: 'خط ريم كوفي الهندسي الفخم',
    nameEn: 'Reem Kufi',
    fontFamily: '"Reem Kufi", sans-serif',
    lang: 'ar',
    category: 'modern',
    sampleText: 'سارة & خالد'
  },
  {
    id: 'greatvibes',
    nameAr: 'غريت فايبس (انسيابي توقيع)',
    nameEn: 'Great Vibes',
    fontFamily: '"Great Vibes", cursive',
    lang: 'en',
    category: 'script',
    sampleText: 'Thank You'
  },
  {
    id: 'alexbrush',
    nameAr: 'أليكس براش (ريشة كاليغرافي فاخرة)',
    nameEn: 'Alex Brush',
    fontFamily: '"Alex Brush", cursive',
    lang: 'en',
    category: 'script',
    sampleText: 'Wedding Invitation'
  },
  {
    id: 'playfair',
    nameAr: 'بلايفير ديسبلاي (لاتيني فخم)',
    nameEn: 'Playfair Display',
    fontFamily: '"Playfair Display", serif',
    lang: 'en',
    category: 'classic',
    sampleText: 'Save the Date'
  },
  {
    id: 'cinzel',
    nameAr: 'سينزل ديكوراتيف (نقوش ملكية رومانية)',
    nameEn: 'Cinzel Decorative',
    fontFamily: '"Cinzel Decorative", serif',
    lang: 'en',
    category: 'classic',
    sampleText: 'W & S'
  }
];

export const CARD_SIZES: CardSize[] = [
  {
    id: 'size-standard-4up',
    nameAr: 'مقاس قياسي فاخر (4 كروت / ورقة A4)',
    nameEn: 'Standard Luxury (4-up on A4: 9.5x13.5 cm)',
    widthCm: 9.5,
    heightCm: 13.5,
    widthMM: 95,
    heightMM: 135,
    aspectRatio: '95/135',
    category: 'wedding'
  },
  {
    id: 'size-economy-8up',
    nameAr: 'مقاس اقتصادي ممتاز (8 كروت / ورقة A4)',
    nameEn: 'Economy Multi-Pack (8-up on A4: 6.5x9.5 cm)',
    widthCm: 6.5,
    heightCm: 9.5,
    widthMM: 65,
    heightMM: 95,
    aspectRatio: '65/95',
    category: 'wedding'
  },
  {
    id: 'size-medium-6up',
    nameAr: 'مقاس متوسط أنيق (6 كروت / ورقة A4)',
    nameEn: 'Medium Elegant (6-up on A4: 8.8x12.5 cm)',
    widthCm: 8.8,
    heightCm: 12.5,
    widthMM: 88,
    heightMM: 125,
    aspectRatio: '88/125',
    category: 'wedding'
  },
  {
    id: 'size-tag-10up',
    nameAr: 'مقاس تاق وميني كرت (10 كروت / ورقة A4)',
    nameEn: 'Tag / Mini-Card (10-up on A4: 5x8.5 cm)',
    widthCm: 5,
    heightCm: 8.5,
    widthMM: 50,
    heightMM: 85,
    aspectRatio: '50/85',
    category: 'tag'
  },
  {
    id: 'size-large-13x18',
    nameAr: 'مقاس كبير فاخر فردي (13 × 18 سم)',
    nameEn: 'Large Single Luxury (13x18 cm)',
    widthCm: 13,
    heightCm: 18,
    widthMM: 130,
    heightMM: 180,
    aspectRatio: '13/18',
    category: 'wedding'
  }
];

export const INITIAL_STUDIO_STATE: StudioState = {
  activeTemplateId: 'royal-arch',
  designSchoolTheme: 'royal-classic',
  isFullSuiteMode: false,
  activeLayerMode: 'mockup',
  displayMode: 'photorealistic-mockup', // Default: Luxury Realistic Mockup Stage
  mockupBackdrop: 'carrara-marble',
  activeCardFace: 'both', // Default: Side-by-Side (Front on right, Back on left)
  isAssemblyMode: true,
  showGrid: false,
  showRuler: true,
  zoomLevel: 1.0,

  templateType: 'flat',
  selectedSizeId: 'size-standard-4up',
  cardWidthMM: 95,
  cardHeightMM: 135,
  paperTexture: 'cotton',
  foilEffect: 'gold',

  // Curated Background & Botanical Artwork Layer
  curatedBgStyle: 'blush-rose',
  bgImageOpacity: 0.85,

  // Dedicated Back Design Configuration (فصل تام عن الوجه الأمامي)
  backDesign: {
    style: 'monogram-centered',
    monogramText: 'S & K',
    monogramSize: 58,
    fontFamily: '"Playfair Display", serif',
    backgroundColor: '#0F291E', // Rich Emerald Green
    artworkColor: '#D4AF37',    // Lustrous Gold Foil
    patternOpacity: 0.22,
    showSmallDate: true,
    showSmallQr: false
  },

  // Multi-Layer Colors (Default: Clean Ivory/Cream front with Gold accents)
  cardBaseColor: '#FAF7F2',
  artworkColor: '#D4AF37',
  artworkGradientEnd: '#B8860B',
  secondaryPieceColor: '#0F291E',
  textColor: '#2D1B22',
  artworkPatternStyle: 'vintage-baroque',
  secondaryPieceType: 'none',
  typographyLayout: 'centered-royal',

  selectedPaletteId: 'emerald-luxury',
  activeAiThemeName: 'القوس الملكي + الزمرد الإمبراطوري',

  names: {
    text: 'سارة & خالد',
    fontFamily: '"Aref Ruqaa", serif',
    fontSize: 34,
    color: '#2D1B22',
    letterSpacing: 2,
    lineHeight: 1.3,
    isBold: true
  },

  greeting: {
    text: 'يسرنا دعوتكم لمشاركتنا فرحة العمر',
    fontFamily: 'Amiri, serif',
    fontSize: 18,
    color: '#8B1E3F',
    letterSpacing: 1,
    lineHeight: 1.5,
    isItalic: false
  },

  monogram: {
    text: 'S & K',
    fontFamily: '"Playfair Display", serif',
    fontSize: 44,
    color: '#D4AF37',
    letterSpacing: 4,
    lineHeight: 1.0,
    isBold: true
  },

  date: {
    text: 'السبت، ١٩ سبتمبر ٢٠٢٦ م',
    fontFamily: 'Cairo, sans-serif',
    fontSize: 14,
    color: '#8B1E3F',
    letterSpacing: 1,
    lineHeight: 1.4
  },

  location: {
    text: 'فندق الريتز كارلتون - قاعة الثريا الكبرى',
    fontFamily: 'Tajawal, sans-serif',
    fontSize: 13,
    color: '#8B1E3F',
    letterSpacing: 1,
    lineHeight: 1.4
  },

  ringDate: {
    text: '✦ 19.09.2026 ✦ THE ROYAL WEDDING ✦',
    fontFamily: '"Playfair Display", serif',
    fontSize: 11,
    color: '#D4AF37',
    letterSpacing: 3,
    lineHeight: 1.0,
    isBold: true
  },

  selectedIsoDate: '2026-09-19',
  isFlowerInserted: true,
  isGatefoldOpen: false,
  isPocketOpen: false,
  isRibbonWrapped: true,
  tableStandSubStyle: 'arch-tent',
  isBifoldOpen: false,
  sparklerAttached: true,
  matchstickAttached: true,

  qrCode: {
    enabled: true,
    url: 'https://maps.google.com/?q=Ritz-Carlton',
    label: 'امسح لموقع الحفل',
    color: '#8B1E3F',
    position: 'bottom-left',
    size: 64
  },

  showCutMargins: true,
  bleedMm: 3.0,
  dielineStrokeColor: '#FF0000',
  creaseStrokeColor: '#2563EB',

  // 1. Physical Paper Stock & 3D Lighting Engine
  paperStock: 'cotton-300',
  enableLetterpressEmboss: true,
  lightingElevation: 60,

  // 2. 7-Stop Specular Hot-Foil Stamping Engine
  isFoilEnabled: true,
  hotFoilType: 'gold-24k',
  foilTargets: {
    monogram: true,
    names: true,
    frame: true,
    greeting: false
  },

  // 3. Interlocking Monogram Builder
  monogramBuilder: {
    enabled: true,
    layout: 'interlocking',
    initial1: 'S',
    initial2: 'K',
    ampersand: '&',
    interlockOffset: 6,
    showFloralWreath: true,
    useHotFoil: true,
    fontFamily: '"Cinzel Decorative", serif',
    size: 48
  },
  monogramCrestStyle: 'royal-circle',
  monogramOffset: { x: 0, y: 0, scale: 1, rotation: 0 },
  namesOffset: { x: 0, y: 0, scale: 1, rotation: 0 },
  detailsOffset: { x: 0, y: 0, scale: 1 },

  // 4. Commercial Print & 3mm Bleed Architecture
  printBleedConfig: {
    showBleed: false,
    showSafeZone: false,
    showRegistrationMarks: false,
    bleedMm: 3.0
  },

  // 5. Multi-Piece Suite View & Built-In Luxury Assets
  activePieceView: 'all',
  weddingDingbatId: 'none',
  waxSealConfig: {
    enabled: false,
    initials: 'S & K',
    style: 'crimson',
    position: 'top',
    size: 48
  },
  ribbonConfig: {
    enabled: false,
    color: 'forest-green',
    style: 'bow'
  },
  polaroidConfig: {
    enabled: false,
    showTopWaxStamp: true,
    photoUrl: '',
    caption: 'Forever & Always ✦'
  }
};

/**
 * 👑 THEME A: المدرسة الملكية الكلاسيكية (Royal Classic Theme)
 * Formal, majestic, high-contrast, symmetrical, 24K gold foil, classical calligraphy, emerald/burgundy/navy depth.
 */
export function getRoyalClassicThemePreset(currentState: StudioState): Partial<StudioState> {
  return {
    designSchoolTheme: 'royal-classic',
    cardBaseColor: '#FAF7F2',
    artworkColor: '#D4AF37',
    artworkGradientEnd: '#B8860B',
    secondaryPieceColor: '#0F291E',
    textColor: '#2D1B22',
    isFoilEnabled: true,
    hotFoilType: 'gold-24k',
    foilTargets: {
      monogram: true,
      names: true,
      frame: true,
      greeting: false
    },
    paperStock: 'cotton-300',
    paperTexture: 'cotton',
    enableLetterpressEmboss: true,
    calligraphyHeaderType: 'dawah-circle',
    typographyLayout: 'centered-royal',
    artworkPatternStyle: 'vintage-baroque',
    curatedBgStyle: 'champagne-gold',
    activeFloralArtworkId: 'gold-olive-wreath',
    imagePlacementMode: '4-edges-frame',
    imageBorderThickness: 15,
    names: {
      ...currentState.names,
      fontFamily: '"Aref Ruqaa", serif',
      fontSize: 40,
      color: '#2D1B22',
      isBold: true,
      letterSpacing: 2
    },
    greeting: {
      ...currentState.greeting,
      fontFamily: 'Amiri, serif',
      color: '#8B1E3F',
      fontSize: 18,
      isBold: true
    },
    closingVerse: 'وَبِحُضُورِكُمْ يَتِمُّ لَنَا الفَرَحُ وَالسُّرُورُ',
    weddingDingbatId: 'floral-divider',
    backDesign: {
      ...currentState.backDesign,
      style: 'monogram-centered',
      backgroundColor: '#0F291E', // Rich Emerald Green
      artworkColor: '#D4AF37',    // 24K Gold
      patternOpacity: 0.28,
      showSmallDate: true
    }
  };
}

/**
 * 🌿 THEME B: المدرسة النباتية الشفافة (Fine-Art Botanical Theme)
 * Romantic, airy, modern, asymmetric fine-art, cotton 350 GSM texture, watercolor botanicals on edges, charcoal text.
 */
export function getFineArtBotanicalThemePreset(currentState: StudioState): Partial<StudioState> {
  return {
    designSchoolTheme: 'fine-art-botanical',
    cardBaseColor: '#FCFBF7',    // Light Textured Ivory
    artworkColor: '#4A5D23',     // Soft Sage / Botanical Olive
    artworkGradientEnd: '#8B1E3F',
    secondaryPieceColor: '#FAF8F5',
    textColor: '#2A2A2A',        // Deep Charcoal for high readability
    isFoilEnabled: false,        // Focus on watercolor botanical transparency
    hotFoilType: 'rose-gold',
    foilTargets: {
      monogram: true,
      names: false,
      frame: false,
      greeting: false
    },
    paperStock: 'cotton-350',    // Heavy 350gsm Cotton Rag with tactile fibers
    paperTexture: 'cotton',
    enableLetterpressEmboss: false,
    calligraphyHeaderType: 'none', // Open whitespace, no heavy circular badge
    typographyLayout: 'centered-royal',
    artworkPatternStyle: 'olive-lily-branches',
    curatedBgStyle: 'soft-sage',
    activeFloralArtworkId: 'eucalyptus-meadow',
    imagePlacementMode: '4-edges-frame', // Outer edges only with massive clean whitespace in center
    imageBorderThickness: 22,
    names: {
      ...currentState.names,
      fontFamily: '"panoramaNaskhScribbleMobile", "Amiri", serif',
      fontSize: 34,
      color: '#2A2A2A',
      isBold: false,
      letterSpacing: 2.5
    },
    greeting: {
      ...currentState.greeting,
      fontFamily: '"Tajawal-Medium", sans-serif',
      color: '#4A5D23',
      fontSize: 16,
      isBold: false
    },
    closingVerse: 'وَبِحُضُورِكُمْ يَتِمُّ لَنَا الفَرَحُ وَالسُّرُورُ',
    weddingDingbatId: 'doves',
    backDesign: {
      ...currentState.backDesign,
      style: 'full-botanical-veins',
      backgroundColor: '#FAF8F5', // Soft Warm Cotton Cream
      artworkColor: '#4A5D23',    // Soft Botanical Olive
      patternOpacity: 0.14,
      showSmallDate: true
    }
  };
}

/**
 * 🖤 THEME C: مدرسة المجلات العصرية (Modern Minimalist Theme)
 * Pure crisp backgrounds (Black, White, or Terracotta), NO florals, massive bold typography, letterpress/debossed.
 */
export function getModernMinimalistThemePreset(currentState: StudioState): Partial<StudioState> {
  return {
    designSchoolTheme: 'modern-minimalist',
    cardBaseColor: '#111114',        // Deep Obsidian / Onyx Black
    artworkColor: '#F4F4F5',         // Crisp Off-White / Platinum
    secondaryPieceColor: '#27272A',
    textColor: '#FFFFFF',            // Crisp White for high contrast
    isFoilEnabled: true,
    hotFoilType: 'platinum-silver',
    foilTargets: {
      monogram: true,
      names: true,
      frame: false,
      greeting: false
    },
    paperStock: 'silk-matte',
    paperTexture: 'matte',
    enableLetterpressEmboss: true,
    calligraphyHeaderType: 'none',   // Minimalist whitespace, no circular badge
    typographyLayout: 'centered-royal',
    artworkPatternStyle: 'petal-veins',
    curatedBgStyle: 'none',
    activeFloralArtworkId: 'none',   // STRICTLY NO FLORALS
    customBackgroundImage: '',
    imagePlacementMode: '4-edges-frame',
    names: {
      ...currentState.names,
      fontFamily: '"Cinzel Decorative", "Aref Ruqaa", sans-serif',
      fontSize: 44,                  // Massive bold typography dominating space
      color: '#FFFFFF',
      isBold: true,
      letterSpacing: 4
    },
    greeting: {
      ...currentState.greeting,
      fontFamily: 'Tajawal, sans-serif',
      fontSize: 13,
      color: '#A1A1AA',
      isBold: false,
      letterSpacing: 2
    },
    weddingDingbatId: 'none',
    show3ColumnIconBar: true,
    closingVerse: 'وَبِحُضُورِكُمْ يَكْتَمِلُ أُنْسُنَا وَفَرَحُنَا',
    backDesign: {
      ...currentState.backDesign,
      style: 'monogram-centered',
      monogramSize: 68,
      backgroundColor: '#18181B',
      artworkColor: '#FFFFFF',
      patternOpacity: 0.15,
      showSmallDate: true
    }
  };
}

export interface AssemblyGuideData {
  subtitle: string;
  diagramPieces: { name: string; desc: string; color: string }[];
  steps: { step: number; title: string; description: string; tip: string }[];
  machineSpecs: { label: string; val: string }[];
}

export const TEMPLATE_ASSEMBLY_GUIDES: Partial<Record<MasterTemplateId, AssemblyGuideData>> = {
  'royal-arch': {
    subtitle: 'دليل قص وتجهيز دعوة القوس الملكي المتماثل (Symmetric Royal Arch)',
    diagramPieces: [
      { name: 'قطعة 1: بطاقة القوس الملكي', desc: 'بطاقة مقوسة بقمة نصف دائرية متماثلة بدقة هندسية 100%', color: 'border-emerald-500/40 bg-emerald-500/10' },
      { name: 'قطعة 2: إطار الفويل الذهبي المزدوج', desc: 'خطوط إطار محفورة ببصمة الذهب الحار تبعد 6 مم من الحافة', color: 'border-gold-500/40 bg-gold-500/10' },
      { name: 'قطعة 3: مونوغرام القفا الملكي', desc: 'شعار العروسين بالخط الديواني في منتصف ظهر البطاقة', color: 'border-stone-500/40 bg-stone-500/10' }
    ],
    steps: [
      { step: 1, title: 'طباعة الوجهين بدقة 300 DPI', description: 'اطبع الوجه الأمامي والقفا على ورق كوشيه قلوسي أو كوتون 350 GSM.', tip: 'تطابق 0.0 مم عبر مسار الفرخ المزدوج يضمن تمركز القوس تماماً.' },
      { step: 2, title: 'القص الكونتوري المتجهي', description: 'أرسل مسار القص الأحمر 0.75pt للبلاتر ليتتبع انحناء القوس بدون تعرجات.', tip: 'اضبط البلتر على سرعة متوسطة لتفادي تشريف دوران القمة.' },
      { step: 3, title: 'المعاينة واللمسات التكميلية', description: 'تأكد من نظافة الحواف وتمركز النصوص داخل الإطار الذهبي.', tip: 'جاهز لوضعه في المغلف الملكي أو تقديمه مع شريطة شيفون.' }
    ],
    machineSpecs: [
      { label: 'عمق الشفرة (Blade)', val: '3' },
      { label: 'قوة القص (Force)', val: '28' },
      { label: 'السرعة', val: '5' },
      { label: 'الورق الموصى به', val: 'كوشيه 300-350 GSM' }
    ]
  },

  'scalloped-badge': {
    subtitle: 'دليل قص البطاقة الفيكتورية المموجة ذات التموجات المتناظرة',
    diagramPieces: [
      { name: 'قطعة 1: البطاقة الفيكتورية المموجة', desc: 'بطاقة ببتلات متناظرة على كامل المحيط بنمط أرستقراطي راقٍ', color: 'border-rose-500/40 bg-rose-500/10' },
      { name: 'قطعة 2: إطار الحفر الملكي', desc: 'إطار متتبع للتموجات بالذهب العتيق يبرز فخامة الكرت', color: 'border-gold-500/40 bg-gold-500/10' }
    ],
    steps: [
      { step: 1, title: 'الطباعة المزدوجة', description: 'اطبع الوجه العاجي والقفا الخمري/الزمردي بنظام الدوبلكس المتطابق.', tip: 'استخدم علامات التسجيل البصرية لضمان ضبط الماكينة.' },
      { step: 2, title: 'القص المتجهي للتموجات', description: 'أرسل مسار التموجات للبلاتر مع تشغيل حساس الكاميرا البصرية.', tip: 'حدة الشفرة ضرورية جداً لنظافة زوايا التموجات الداخلية.' }
    ],
    machineSpecs: [
      { label: 'عمق الشفرة', val: '3.5' },
      { label: 'قوة القص', val: '29' },
      { label: 'السرعة', val: '4 (دقة عالية)' }
    ]
  },

  'floral-fan': {
    subtitle: 'دليل قص وتجميع مروحة البتلة الكلاسيكية المتناظرة',
    diagramPieces: [
      { name: 'قطعة 1: كرت المروحة المتماثل', desc: 'كرت ببتلات مروحية عريضة متناسقة يميناً ويساراً', color: 'border-rose-500/40 bg-rose-500/10' },
      { name: 'قطعة 2: ثقب الشرابة السفلي', desc: 'ثقب دائري في قاعدة المقبض لتعليق شرابة حريرية', color: 'border-gold-500/40 bg-gold-500/10' }
    ],
    steps: [
      { step: 1, title: 'طباعة المروحة المزدوجة', description: 'اطبع الوجهين بتطابق تام على ورق مقوى متين 350 GSM.', tip: 'المتانة العالية تعطي المروحة صلابة عملية عند حملها باليد.' },
      { step: 2, title: 'قص الكونتور المتماثل', description: 'قص المحيط المتعرج المتناسق وثقب الشرابة بالبلاتر.', tip: 'قص الثقب في نفس مسار العمل بدون فك المات.' },
      { step: 3, title: 'تركيب الشرابة الملكية', description: 'مرر حبل الشرابة من الثقب واعقدها بإحكام.', tip: 'منتج فاخر جداً ومثالي للأعراس الملكية.' }
    ],
    machineSpecs: [
      { label: 'عمق الشفرة', val: '3 - 3.5' },
      { label: 'قوة الضغط', val: '28 - 30' },
      { label: 'السرعة', val: '4 - 5' }
    ]
  },

  'islamic-dome': {
    subtitle: 'دليل قص وتجهيز بطاقة القبة الإسلامية الأندلسية',
    diagramPieces: [
      { name: 'قطعة 1: كرت القبة الأندلسية', desc: 'قوس قبة إسلامية بقمة مدببة وزوايا معمارية متماثلة', color: 'border-emerald-500/40 bg-emerald-500/10' },
      { name: 'قطعة 2: الإطار الموريسكي الذهبي', desc: 'زخارف ونقوش أندلسية دقيقة تلتف حول قمة القوس', color: 'border-gold-500/40 bg-gold-500/10' }
    ],
    steps: [
      { step: 1, title: 'طباعة النقوش الأندلسية', description: 'اطبع التفاصيل بألوان السمة الزمردية مع تذهيب الإطار وقمة القوس.', tip: 'تأكد من تركيز الحبر الذهبي عند رأس القبة.' },
      { step: 2, title: 'قص القبة بالبلاتر', description: 'قص المحيط مع مراعاة دقة زاوية قمة القوس العلوية.', tip: 'سرعة بطيئة عند قمة القوس لمنع كسر زاوية القمة.' }
    ],
    machineSpecs: [
      { label: 'عمق الشفرة', val: '3' },
      { label: 'قوة الضغط', val: '27' },
      { label: 'السرعة', val: '4' }
    ]
  },

  'chamfered-plaque': {
    subtitle: 'دليل قص وتجهيز البطاقة المستطيلة المشطوفة الزوايا',
    diagramPieces: [
      { name: 'قطعة 1: البطاقة المشطوفة', desc: 'بطاقة بلورة مستطيلة بزوايا مشطوفة 45 درجة متناظرة', color: 'border-amber-500/40 bg-amber-500/10' },
      { name: 'قطعة 2: الإطار الهندسي المحفور', desc: 'إطار ذهبي متطابق يتتبع شطفات الزوايا الأربع بدقة', color: 'border-gold-500/40 bg-gold-500/10' }
    ],
    steps: [
      { step: 1, title: 'طباعة الكرت المشطوف', description: 'اطبع البطاقة على ورق كوشيه عالي الكثافة مع النص الداكن والفويل.', tip: 'الشطفات الهندسية تبرز جمال التصميم العصري.' },
      { step: 2, title: 'القص الآلي المتجهي', description: 'قص الأضلاع والشطفات الأربع بالشفرة الرفيعة للبلاتر.', tip: 'استقامة الخطوط تعطي مظهراً يضاهي قص المطابع الكبرى.' }
    ],
    machineSpecs: [
      { label: 'عمق الشفرة', val: '3' },
      { label: 'قوة الضغط', val: '26' },
      { label: 'السرعة', val: '6' }
    ]
  },

  'capsule-suite': {
    subtitle: 'دليل قص بطاقة الكبسولة الطولية (Pill Suite)',
    diagramPieces: [
      { name: 'قطعة 1: كرت الكبسولة المودرن', desc: 'بطاقة بنصفي دائرة متناظرين بالأعلى والأسفل بانسيابية تامة', color: 'border-purple-500/40 bg-purple-500/10' }
    ],
    steps: [
      { step: 1, title: 'الطباعة المزدوجة', description: 'اطبع الوجه والقفا مع المونوغرام المركز في القفا.', tip: 'نمط الكبسولة يتألق مع الخطوط الكلاسيكية والذهب.' },
      { step: 2, title: 'القص بالبلاتر', description: 'تتبع دوران القمتين بسلاسة مع استقامة الجانبين.', tip: 'نظافة الانحناء تضمن مظهراً عصرياً فائق الأناقة.' }
    ],
    machineSpecs: [
      { label: 'عمق الشفرة', val: '3' },
      { label: 'قوة الضغط', val: '27' },
      { label: 'السرعة', val: '5' }
    ]
  },

  // Aliases
  'arch-gatefold-lily': {
    subtitle: 'دليل القوس الملكي المتماثل',
    diagramPieces: [],
    steps: [],
    machineSpecs: []
  },
  'french-envelope-suite': {
    subtitle: 'دليل البطاقة الفيكتورية المموجة',
    diagramPieces: [],
    steps: [],
    machineSpecs: []
  },
  'arch-window-pocket': {
    subtitle: 'دليل بطاقة القبة الإسلامية',
    diagramPieces: [],
    steps: [],
    machineSpecs: []
  },
  'integrated-handle-fan': {
    subtitle: 'دليل البطاقة المشطوفة الزوايا',
    diagramPieces: [],
    steps: [],
    machineSpecs: []
  },
  'double-half-arch': {
    subtitle: 'دليل بطاقة الكبسولة الطولية',
    diagramPieces: [],
    steps: [],
    machineSpecs: []
  },
  'architectural-lined-envelope-suite': {
    subtitle: 'دليل تجميع طقم المظروف المعماري والبطانة الموردة (Lined Envelope Suite)',
    diagramPieces: [
      { name: 'قطعة 1: كرت البولارويد والصور', desc: 'بطاقة قطنية مع نافذة صورة العروسين وختم شمعي علوي', color: 'border-gold-500/40 bg-gold-500/10' },
      { name: 'قطعة 2: مظروف يورو-فلاب', desc: 'مظروف بقوس هندسي مدبب Euro-Flap مع خطوط ريجة للطي', color: 'border-emerald-500/40 bg-emerald-500/10' },
      { name: 'قطعة 3: بطانة المظروف الموردة', desc: 'بطانة داخلية بزخارف نباتية مائية مذهبة تلصق داخل الفلاب', color: 'border-rose-500/40 bg-rose-500/10' }
    ],
    steps: [
      { step: 1, title: 'طباعة البطانة والكرت', description: 'اطبع كرت البولارويد والبطانة الموردة على ورق قطني 300 GSM بدقة 300 DPI.', tip: 'تأكد من تشبع ألوان الورد والذهب في بطانة المظروف.' },
      { step: 2, title: 'قص الكونتور والريجة', description: 'قص مظروف اليورو-فلاب مع ريجة خطوط الطي الأفقية والجانبية.', tip: 'استخدم خط الريجة الأزرق المنقط 0.75pt لضمان طي سليم دون تشقق.' },
      { step: 3, title: 'لصق البطانة الداخلية', description: 'ضع شريط لاصق مزدوج دقيق على ظهر البطانة وثبتها أسفل حافة الفلاب بـ 3 مم.', tip: 'ثبت البطانة أثناء فتح الفلاب بالكامل لمنع التجعيد.' },
      { step: 4, title: 'الختم الشمعي والإغلاق', description: 'أدخل كرت البولارويد وأغلق الفلاب مع صب الختم الشمعي الملكي المركز.', tip: 'ختم الشمع العنابي يمنح الطقم مظهراً أسطورياً راقياً.' }
    ],
    machineSpecs: [
      { label: 'عمق شفرة القص', val: '3.5' },
      { label: 'أداة الريجة (Scoring)', val: 'عجلة التجعيد 01' },
      { label: 'ضغط القص', val: '29' },
      { label: 'الورق الموصى به', val: 'قطني 300-350 GSM' }
    ]
  },
  'thumb-notch-sleeve-suite': {
    subtitle: 'دليل تجميع طقم جيب السحب بأخدود الإبهام والختم الشمعي',
    diagramPieces: [
      { name: 'قطعة 1: جيب السحب بأخدود الإبهام', desc: 'غلاف جيب خارجي بأخدود نصف دائري علوي لسحب الكرت بسلاسة', color: 'border-emerald-500/40 bg-emerald-500/10' },
      { name: 'قطعة 2: كرت الدعوة البيضاوي', desc: 'بطاقة بيضاوية مقوسة تنزلق داخل الجيب وتحمل تفاصيل الحفل', color: 'border-gold-500/40 bg-gold-500/10' }
    ],
    steps: [
      { step: 1, title: 'طباعة الجيب والكرت البيضاوي', description: 'اطبع الجيب بلون داكن (زمردي أو كحلي) والكرت الداخلي بعاجي مذهب.', tip: 'التباين اللوني بين الجيب والكرت يعطي فخامة استثنائية.' },
      { step: 2, title: 'قص أخدود الإبهام وخطوط اللصق', description: 'قص تفريغ الإبهام العلوي بدقة بالبلاتر وقص جناح اللصق الجانبي.', tip: 'شفرة نظيفة تمنع أي خشونة في حافة أخدود الإبهام.' },
      { step: 3, title: 'لصق الجيب وتثبيت الختم', description: 'اطوِ الجناح الجانبي والصقه، ثم ثبت الختم الشمعي في الثلث السفلي للجيب.', tip: 'اترك 1-2 مم خلوص جانبي لضمان انزلاق الكرت البيضاوي بسلاسة.' }
    ],
    machineSpecs: [
      { label: 'عمق الشفرة', val: '3' },
      { label: 'ضغط القص', val: '28' },
      { label: 'السرعة', val: '5' },
      { label: 'شريط اللصق', val: 'دبل فيس أحمر قوي 6 مم' }
    ]
  },
  'asymmetric-forest-gatefold-suite': {
    subtitle: 'دليل تجميع طقم البوابة غير المتماثلة وشريطة الستان',
    diagramPieces: [
      { name: 'قطعة 1: المطوية الزيتونية غير المتماثلة', desc: 'غلاف بوابي بدرفتين غير متساويتين يترك مسافة لعرض إطار الكرت الداخلي', color: 'border-emerald-500/40 bg-emerald-500/10' },
      { name: 'قطعة 2: الكرت الداخلي المورد', desc: 'كرت زفاف بنقوش نباتية محفورة بالذهب يثبت داخل المطوية', color: 'border-gold-500/40 bg-gold-500/10' },
      { name: 'قطعة 3: شريطة الستان والفيونكة', desc: 'شريطة ستان حريرية خضراء تلف البوابة وتغلق بعقدة فيونكة فاخرة', color: 'border-amber-500/40 bg-amber-500/10' }
    ],
    steps: [
      { step: 1, title: 'طباعة الكرت والمطوية', description: 'اطبع الكرت الداخلي على ورق قطني أبيض والمطوية على كرتون زيتي داكن 350 GSM.', tip: 'المطوية الزيتونية لا تحتاج طباعة خلفية، تكفيها نقوش الذهب المحفورة.' },
      { step: 2, title: 'ريجة طي البوابة غير المتماثلة', description: 'نفذ خط الريجة الأيسر على بعد 30% وخط الريجة الأيمن على بعد 60%.', tip: 'عدم التماثل هو سر التصميم العصري الذي يكشف حافة الكرت الداخلي.' },
      { step: 3, title: 'لصق الكرت وربط شريطة الستان', description: 'ثبت الكرت الداخلي في منتصف المطوية، ولف شريطة الستان حول الخصر مع فيونكة بارزة.', tip: 'قص أطراف الشريطة بزاوية 45 درجة لمنع تنسل الخيوط.' }
    ],
    machineSpecs: [
      { label: 'عمق الشفرة', val: '3.5' },
      { label: 'أداة الريجة', val: 'عجلة التجعيد المزدوجة' },
      { label: 'قوة القص', val: '30' },
      { label: 'عرض الشريطة الموصى به', val: 'ستان حرير 15-20 مم' }
    ]
  }
};


