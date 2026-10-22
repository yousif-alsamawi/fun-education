const http = require('http');
const fs = require('fs');
const path = require('path');

// منع توقف الخادم نهائياً تحت أي ظرف (Process Resilience Guards)
process.on('uncaughtException', (err) => {
  console.error('[Server UncaughtException Guard]:', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Server UnhandledRejection Guard]:', reason);
});

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'generated-images');
const CONFIG_FILE = path.join(__dirname, 'api-config.json');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// 1. إدارة الإعدادات وحفظها المستمر عبر ملف api-config.json
let API_CONFIG = {
  endpointUrl: process.env.IMAGE_GENERATION_API_URL || 'https://flow.google.com',
  apiType: process.env.IMAGE_API_TYPE || 'google-flow', // 'google-flow' | 'comfyui' | 'flow-api'
  customApiUrl: process.env.CUSTOM_API_URL || '',
  apiKey: process.env.IMAGE_API_KEY || '',
  customWorkflowJson: '',
  timeoutMs: 65000,
  maxRetries: 3
};

if (fs.existsSync(CONFIG_FILE)) {
  try {
    const savedConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    API_CONFIG = { ...API_CONFIG, ...savedConfig };
    console.log('[Config] تم تحميل إعدادات التوليد المحفوظة بنجاح من api-config.json');
  } catch (err) {
    console.warn('[Config Warn] تعذر قراءة api-config.json:', err.message);
  }
}

function saveConfigToFile() {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(API_CONFIG, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Config Warn] تعذر حفظ api-config.json:', err.message);
  }
}

// 2. خوارزمية حساب ملازم التدبيس النصفي A5
function calculateSaddleStitchImposition(totalPages = 12) {
  const spreads = [];
  const totalSheets = totalPages / 4;
  for (let sheet = 1; sheet <= totalSheets; sheet++) {
    const frontLeft = totalPages - 2 * (sheet - 1);
    const frontRight = 2 * (sheet - 1) + 1;
    spreads.push({ sheetNumber: sheet, side: 'front', leftPageNumber: frontLeft, rightPageNumber: frontRight });

    const backLeft = 2 * (sheet - 1) + 2;
    const backRight = totalPages - 2 * (sheet - 1) - 1;
    spreads.push({ sheetNumber: sheet, side: 'back', leftPageNumber: backLeft, rightPageNumber: backRight });
  }
  return spreads;
}

// دالة مساعدة لترجمة الأسماء العربية الشائعة لتعزيز استيعاب نماذج التوليد العالمية وخلو الأوامر من التداخل اللغوي
function formatChildNameForModel(arabicName, isGirl) {
  if (!arabicName || !arabicName.trim()) return isGirl ? 'Layla' : 'Omar';
  const trimmed = arabicName.trim();
  const map = {
    'عمر': 'Omar',
    'ليلى': 'Layla',
    'أحمد': 'Ahmed',
    'احمد': 'Ahmed',
    'علي': 'Ali',
    'فاطمة': 'Fatima',
    'سارة': 'Sara',
    'ساره': 'Sara',
    'يوسف': 'Youssef',
    'مريم': 'Mariam',
    'خالد': 'Khaled',
    'نور': 'Nour',
    'محمد': 'Mohammed',
    'زين': 'Zain',
    'زينة': 'Zeina',
    'سلمى': 'Salma',
    'كريم': 'Karim',
    'جود': 'Joud',
    'حمزة': 'Hamza',
    'ريان': 'Rayan',
    'آدم': 'Adam',
    'ادم': 'Adam',
    'تيا': 'Tia',
    'تيم': 'Taym',
    'سما': 'Sama',
    'إبراهيم': 'Ibrahim',
    'سلطان': 'Sultan',
    'فهد': 'Fahad',
    'سعود': 'Saud',
    'ريم': 'Reem',
    'جنى': 'Jana',
    'حلا': 'Hala',
    'شهد': 'Shahd',
    'لين': 'Leen',
    'يارا': 'Yara'
  };
  if (map[trimmed]) return map[trimmed];
  if (/^[a-zA-Z\s]+$/.test(trimmed)) return trimmed;
  return isGirl ? 'Layla' : 'Omar';
}

// دالة استخلاص اسم البطل بالإنجليزية لمنع التداخل اللغوي في أوامر التوليد
function getEnglishHeroName(heroStr) {
  if (!heroStr) return 'Spider-Man';
  const h = String(heroStr).toLowerCase();
  if (h.includes('سبايدر') || h.includes('spider')) return 'Spider-Man';
  if (h.includes('باتمان') || h.includes('batman')) return 'Batman';
  if (h.includes('سوبرمان') || h.includes('superman')) return 'Superman';
  if (h.includes('أيرون') || h.includes('ايرون') || h.includes('iron')) return 'Iron Man';
  if (h.includes('هالك') || h.includes('hulk')) return 'The Hulk';
  if (h.includes('كابتن أمريكا') || h.includes('captain')) return 'Captain America';
  if (h.includes('فلاش') || h.includes('flash')) return 'The Flash';
  if (h.includes('سونيك') || h.includes('sonic')) return 'Sonic the Hedgehog';
  const enMatch = heroStr.match(/[a-zA-Z\s-]+/);
  if (enMatch && enMatch[0].trim().length > 2) return enMatch[0].trim();
  return 'Spider-Man';
}

// دالة تحليل وترجمة المواصفات البصرية للطفل (الشعر، الملامح، اللباس) إلى مواصفات دقيقة لمحركات التوليد
function translateVisualTraits(traits = {}, isGirl = false) {
  let hair = (traits?.hairStyle || '').trim();
  let face = (traits?.faceFeatures || '').trim();
  let clothing = (traits?.clothingStyle || '').trim();

  // 1. ترجمة وتحسين وصف قصة ولون الشعر لتطابق صورة الطفل تماماً
  let hairEn = '';
  if (/كيرلي|مجعد|curly|fade|تدرج|تدريج|مموج|crop/i.test(hair)) {
    hairEn = isGirl
      ? 'long dark wavy hair styled in neat twin braids with soft front bangs'
      : 'short neat dark textured crop haircut with clean clipper fade on sides and temples, high forehead';
  } else if (/ناعم|أملس|straight/i.test(hair)) {
    hairEn = isGirl ? 'long smooth straight dark shiny hair with neat soft bangs' : 'neat short dark straight hair smoothly combed';
  } else if (/ضفائر|جدائل|braid/i.test(hair)) {
    hairEn = 'long dark wavy hair styled in neat twin braids with soft front bangs';
  } else if (/قصير|short/i.test(hair)) {
    hairEn = isGirl ? 'stylish shoulder-length dark bob haircut' : 'short dark textured crop haircut with neat clean edges';
  } else if (hair && /^[a-zA-Z\s,.-]+$/.test(hair)) {
    hairEn = hair;
  } else {
    hairEn = isGirl
      ? 'long silky dark wavy hair tied in neat twin braids with soft bangs'
      : 'short neat dark textured crop haircut with clean clipper fade on sides and temples';
  }

  // 2. ترجمة وتحسين وصف ملامح الوجه والعيون والبشرة
  let faceEn = '';
  if (/لوزية|almond|حنطية|قمحية|سمراء|olive/i.test(face)) {
    faceEn = 'large expressive dark brown almond eyes, arched neat dark eyebrows, slender oval face with gentle child cheeks, smooth warm light-olive skin tone, sweet gentle confident smile';
  } else if (face && /^[a-zA-Z\s,.-]+$/.test(face)) {
    faceEn = face;
  } else {
    faceEn = 'large expressive dark brown almond eyes, arched neat dark eyebrows, slender oval face with gentle child cheeks, smooth warm light-olive skin tone, sweet gentle confident smile';
  }

  // 3. ترجمة وتحسين وصف اللباس والمظهر المميز
  let clothingEn = '';
  if (/مخطط|مخططة|striped|كنزة|سويتر|sweater|أسود|black/i.test(clothing)) {
    clothingEn = 'smart black collared polo shirt with a black-and-white horizontally striped sweater tied neatly around neck and draped over shoulders, blue denim jeans';
  } else if (/بطل|superhero|درع|suit/i.test(clothing)) {
    clothingEn = 'sleek modern superhero adventurer suit with glowing chest emblem and fluttering cape';
  } else if (clothing && /^[a-zA-Z\s,.-]+$/.test(clothing)) {
    clothingEn = clothing;
  } else {
    clothingEn = isGirl
      ? 'stylish modern colorful adventurer jacket with pastel shirt and jeans'
      : 'smart black collared polo shirt with a black-and-white horizontally striped sweater tied neatly around neck and draped over shoulders, blue denim jeans';
  }

  return { hairEn, faceEn, clothingEn };
}

// 3. بناء بادئة الوصف الثابتة للطفل (Fixed Prompt Anchor) مع تثبيت الملامح بنسبة عالية للتوليد
function buildFixedChildAnchor(ageOrObj, gender, name, hasPhoto = false, visualTraits = {}, outfitMode = 'casual') {
  let safeAge, safeGender, safeName, safeHasPhoto, traits;
  if (typeof ageOrObj === 'object' && ageOrObj !== null) {
    safeAge = parseInt(ageOrObj.age || ageOrObj.childAge) || 7;
    safeGender = ageOrObj.gender || ageOrObj.childGender || 'boy';
    safeName = ageOrObj.name || ageOrObj.childName || 'عمر';
    safeHasPhoto = !!(ageOrObj.hasPhoto || ageOrObj.photoUrl || ageOrObj.childPhoto);
    traits = ageOrObj.visualTraits || ageOrObj;
  } else {
    safeAge = parseInt(ageOrObj) || 7;
    safeGender = gender || 'boy';
    safeName = name || 'عمر';
    safeHasPhoto = !!hasPhoto;
    traits = visualTraits || {};
  }

  const isGirl = String(safeGender).toLowerCase() === 'girl';
  const genderTerm = isGirl ? 'girl' : 'boy';
  const childName = formatChildNameForModel(safeName, isGirl);
  const { hairEn, faceEn, clothingEn } = translateVisualTraits(traits, isGirl);

  let outfitText = `signature clothes: ${clothingEn}`;
  if (outfitMode === 'hero') {
    outfitText = isGirl 
      ? 'wearing a sleek customized superhero adventurer suit with a glowing star emblem and fluttering heroic cape' 
      : 'wearing a customized modern superhero adventurer suit with a glowing chest emblem and fluttering heroic cape';
  } else if (outfitMode === 'safari') {
    outfitText = 'wearing a stylish khaki safari explorer jacket, multi-pocket utility belt, and sturdy adventurer boots';
  } else if (outfitMode === 'space') {
    outfitText = 'wearing a sleek futuristic high-tech cosmic astronaut suit with glowing visor and arm command screen';
  }

  let anchor = `an authentic ${safeAge}-year-old Arab ${genderTerm} named ${childName}, authentic child proportions, haircut: ${hairEn}, face & skin: ${faceEn}, ${outfitText}`;

  if (safeHasPhoto) {
    anchor += `, identical facial structure, eyes, eyebrows, nose, lips and haircut strictly matching character reference photo with authentic child identity preserved`;
  }
  return anchor;
}

// استخراج مخزن Base64 الثنائي النقي من Data URL
function extractBase64Buffer(dataUrlOrBase64) {
  if (!dataUrlOrBase64 || typeof dataUrlOrBase64 !== 'string') return null;
  const matches = dataUrlOrBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
  if (matches) {
    return {
      type: matches[1] === 'jpeg' ? 'jpg' : matches[1],
      buffer: Buffer.from(matches[2], 'base64'),
      base64: matches[2]
    };
  }
  try {
    return {
      type: 'png',
      buffer: Buffer.from(dataUrlOrBase64, 'base64'),
      base64: dataUrlOrBase64
    };
  } catch (e) {
    return null;
  }
}

// 4. إنشاء حمولة مسار عمل ComfyUI القياسية مع دمج الوجوه (FaceID / IP-Adapter 100%)
function createComfyUiWorkflowPayload({
  positivePrompt,
  negativePrompt,
  imageFileName = 'child_face_reference.png',
  hasFaceReference = false,
  seed = Math.floor(Math.random() * 1000000000),
  width = 1024,
  height = 768
}) {
  const promptNodes = {
    "1": {
      "inputs": { "ckpt_name": "sdxl_base.safetensors" },
      "class_type": "CheckpointLoaderSimple"
    },
    "2": {
      "inputs": {
        "text": positivePrompt,
        "clip": ["1", 1]
      },
      "class_type": "CLIPTextEncode"
    },
    "3": {
      "inputs": {
        "text": negativePrompt,
        "clip": ["1", 1]
      },
      "class_type": "CLIPTextEncode"
    },
    "4": {
      "inputs": {
        "width": width,
        "height": height,
        "batch_size": 1
      },
      "class_type": "EmptyLatentImage"
    },
    "5": {
      "inputs": {
        "image": imageFileName,
        "upload": "image"
      },
      "class_type": "LoadImage"
    },
    "6": {
      "inputs": {
        "weight": 1.0,
        "weight_type": "original",
        "start_at": 0.0,
        "end_at": 1.0,
        "model": ["1", 0],
        "image": ["5", 0]
      },
      "class_type": "IPAdapterFaceID"
    },
    "7": {
      "inputs": {
        "seed": seed,
        "steps": 25,
        "cfg": 7.5,
        "sampler_name": "euler_ancestral",
        "scheduler": "karras",
        "denoise": 1.0,
        "model": hasFaceReference ? ["6", 0] : ["1", 0],
        "positive": ["2", 0],
        "negative": ["3", 0],
        "latent_image": ["4", 0]
      },
      "class_type": "KSampler"
    },
    "8": {
      "inputs": {
        "samples": ["7", 0],
        "vae": ["1", 2]
      },
      "class_type": "VAEDecode"
    },
    "9": {
      "inputs": {
        "filename_prefix": "Maktaba_Shula",
        "images": ["8", 0]
      },
      "class_type": "SaveImage"
    }
  };

  return {
    client_id: `maktaba_client_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    prompt: promptNodes
  };
}

// تعديل وحقن الأوامر في أي مسار عمل ComfyUI مخصص يتم إدخاله في الإعدادات
function applyCustomWorkflow(customJsonStr, positivePrompt, negativePrompt, seed, imageFileName) {
  if (!customJsonStr || typeof customJsonStr !== 'string') return null;
  try {
    const parsed = JSON.parse(customJsonStr);
    const nodes = parsed.prompt || parsed;
    for (const id in nodes) {
      const node = nodes[id];
      if (node.class_type === 'CLIPTextEncode') {
        const textVal = String(node.inputs?.text || '').toLowerCase();
        if (textVal.includes('worst quality') || textVal.includes('negative') || textVal.includes('bad anatomy')) {
          node.inputs.text = negativePrompt;
        } else {
          node.inputs.text = positivePrompt;
        }
      }
      if (node.class_type === 'KSampler' && node.inputs) {
        node.inputs.seed = seed;
      }
      if (node.class_type === 'LoadImage' && imageFileName && node.inputs) {
        node.inputs.image = imageFileName;
      }
    }
    return {
      client_id: `maktaba_custom_${Date.now()}`,
      prompt: nodes
    };
  } catch (e) {
    console.warn('[Custom Workflow Warning] تعذر تفكيك JSON مسار العمل المخصص:', e.message);
    return null;
  }
}

// استطلاع نتيجة ComfyUI وتحميل الصورة وتخزينها محلياً
async function pollComfyUiHistory(baseUrl, promptId, timeoutMs = 70000, pageNumber = 1, authHeaders = {}) {
  const startTime = Date.now();
  console.log(`[ComfyUI] جاري استطلاع وتتبع حالة المهمة ${promptId}...`);

  while (Date.now() - startTime < timeoutMs) {
    try {
      const res = await fetch(`${baseUrl}/history/${promptId}`, { headers: authHeaders });
      if (res.ok) {
        const historyData = await res.json();
        const job = historyData[promptId];
        if (job) {
          if (job.status && job.status.status_str === 'error') {
            const errDetails = JSON.stringify(job.status.messages || 'ComfyUI Execution Error');
            throw new Error(`خطأ في معالجة مسار ComfyUI: ${errDetails}`);
          }
          if (job.outputs) {
            for (const nodeId in job.outputs) {
              const nodeOut = job.outputs[nodeId];
              if (nodeOut.images && nodeOut.images.length > 0) {
                const imgInfo = nodeOut.images[0];
                const viewUrl = `${baseUrl}/view?filename=${encodeURIComponent(imgInfo.filename)}&subfolder=${encodeURIComponent(imgInfo.subfolder || '')}&type=${encodeURIComponent(imgInfo.type || 'output')}`;
                console.log(`[ComfyUI] تم اكتمال رسم الصورة، جاري تنزيلها من: ${viewUrl}`);
                
                const imgRes = await fetch(viewUrl, { headers: authHeaders });
                if (imgRes.ok) {
                  const arrayBuf = await imgRes.arrayBuffer();
                  const buffer = Buffer.from(arrayBuf);
                  const fileName = `page-${pageNumber}-comfy-${Date.now()}.png`;
                  const filePath = path.join(IMAGES_DIR, fileName);
                  fs.writeFileSync(filePath, buffer);
                  return `/generated-images/${fileName}`;
                }
              }
            }
          }
        }
      }
    } catch (pollErr) {
      if (pollErr.message && pollErr.message.includes('خطأ في معالجة مسار ComfyUI')) {
        throw pollErr;
      }
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error(`انتهت مهلة انتظار خادم ComfyUI (${timeoutMs / 1000} ثانية) دون صدور الصورة.`);
}

// 5. طابور المعالجة المتسلسلة الصارم (Sequential Generation Queue)
class SequentialGenerationQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(taskFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ taskFn, resolve, reject });
      this.processNext();
    });
  }

  async processNext() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;
    const { taskFn, resolve, reject } = this.queue.shift();
    try {
      const result = await taskFn();
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      // فاصل زمني أمان (1.5 ثانية) بين الطلبات المتسلسلة لمنع Rate Limit
      await new Promise(r => setTimeout(r, 1500));
      this.isProcessing = false;
      this.processNext();
    }
  }
}

const generationQueue = new SequentialGenerationQueue();

// 5.5. استخلاص الحدث والسيناريو الدرامي ديناميكياً من النص السردي المولد لكل صفحة (Dynamic Context Matching)
function extractSceneActionFromText({
  pageNumber,
  title,
  sceneTextArabic,
  dialogueText,
  childName,
  childAge,
  childGender,
  favoriteHero,
  storySetting = 'crime-fighting',
  customStorySetting = '',
  isColoring
}) {
  const isGirl = String(childGender).toLowerCase() === 'girl';
  const name = childName || (isGirl ? 'Layla' : 'Omar');
  const hero = getEnglishHeroName(favoriteHero);
  const text = (sceneTextArabic || '').trim();
  const setting = storySetting || 'crime-fighting';

  // 1. إذا كانت صفحة غلاف (Cover - Page 1)
  if (pageNumber === 1 || title?.includes('غلاف') || title?.includes('مغامرات')) {
    if (setting === 'jungle-safari') {
      return `Epic exotic jungle explorer comic book cover composition. Front and center: the child hero in explorer safari adventurer jacket standing in a triumphant confident pose beside ${hero} on an emerald cliff summit overlooking a breathtaking tropical rainforest with ancient ruins and waterfalls, ${hero} gives an encouraging thumbs-up, cinematic volumetric sunlight, vibrant colors, 8k render`;
    }
    if (setting === 'space-odyssey') {
      return `Epic cosmic space odyssey comic book cover composition. Front and center: the child hero in a sleek high-tech futuristic astronaut adventurer suit standing proudly beside ${hero} on the flight deck of a star cruiser overlooking glowing galactic nebulas, ringed planets, and sparkling stars, cinematic sci-fi lighting, 8k render`;
    }
    if (setting === 'fantasy-magic') {
      return `Epic fantasy adventure comic book cover composition. Front and center: the child hero in a royal adventurer tunic and cape standing proudly beside ${hero} in gleaming knight armor before a majestic enchanted castle with towering crystal spires under an aurora borealis sky, cinematic fantasy lighting, 8k render`;
    }
    if (setting === 'realistic-daily') {
      return `Epic heartwarming children storybook cover. Front and center: the child hero in modern stylish clothes standing proudly in an iconic hero pose beside ${hero} with a friendly thumbs-up, bright morning light, inspiring city and school background, vibrant Disney Pixar style, 8k render`;
    }
    // Default: crime-fighting
    return `Epic heroic superhero comic book cover composition. Front and center: the child hero wearing a customized modern superhero adventurer suit and fluttering cape, standing in a triumphant confident superhero power stance side-by-side with ${hero} on a skyscraper rooftop overlooking a glittering metropolis skyline at dusk. ${hero} gives an encouraging thumbs-up with an iconic heroic smile, glowing searchlights, dynamic starburst explosion effects, spacious comic title banner area at top, bold dramatic cinematic lighting`;
  }

  // 2. إذا كانت صفحة إهداء عائلي (Dedication - Page 2)
  if (pageNumber === 2 || title?.includes('إهداء') || title?.includes('رسالة حب')) {
    if (setting === 'jungle-safari') {
      return `Heartwarming explorer family basecamp portrait. Child is sitting happily beside a cozy safari tent under lush green trees, studying an ancient golden treasure map with smiling proud parents, warm lantern glow, exotic jungle nature atmosphere`;
    }
    if (setting === 'space-odyssey') {
      return `Heartwarming family observation lounge portrait. Child standing happily beside proud mother and father looking through the panoramic glass of a space station at sparkling star constellations, warm golden cabin lighting`;
    }
    if (setting === 'fantasy-magic') {
      return `Heartwarming royal family library portrait. Child sitting cozily before an ornate stone fireplace in a grand castle room, reading an illuminated golden scroll between smiling proud parents, warm glowing candlelight`;
    }
    return `Heartwarming family portrait and storytelling moment. Child is sitting happily in a warm modern living room holding a glowing open golden adventure book, lovingly surrounded by smiling proud mother and father embracing their child, golden morning sunlight beams through sheer curtains, warm joyful home atmosphere, soft cinematic lighting, emotional family connection`;
  }

  // 3. صفحات التلوين التفاعلية (Pages 9, 10, 11)
  if (isColoring || (pageNumber >= 9 && pageNumber <= 11)) {
    if (pageNumber === 9 || title?.includes('لوّن') || title?.includes('استعراض القوة')) {
      return `Superhero duo power pose in ${setting} adventure: the child and ${hero} standing proudly side-by-side ready for heroic action, fists forward in a dynamic champion pose, clean bold black vector line art on pure white background, no shading, no colors, high-contrast outlines for children coloring`;
    }
    if (pageNumber === 10 || title?.includes('تحدي والانتصار') || title?.includes('مهام') || title?.includes('حل اللغز')) {
      return `Heroic achievement and victory scene: the child smiling triumphantly celebrating success and solving the grand challenge alongside ${hero}, clean crisp black outlines, pure white background, vector coloring book page for kids`;
    }
    if (pageNumber === 11 || title?.includes('درع') || title?.includes('وسام')) {
      return `Elaborate superhero crest and shield of courage: majestic royal shield and heraldic emblem boldly inscribed with the child's name "${name}", flanked by victory champion wings, laurel wreath, and golden stars, clean bold vector line art, pure white background, ready for coloring`;
    }
  }

  // 4. شهادة التكريم والبطولة (Certificate - Page 12)
  if (pageNumber === 12 || title?.includes('شهادة')) {
    return `Official decorative certificate of honor border and frame: ornate golden baroque filigree scrollwork, laurel wreath of educational excellence, sparkling victory medal with ribbon, seal of achievement, elegant award presentation`;
  }

  // 5. المشاهد السردية الستة (Story Scenes 1 to 6 - Pages 3 to 8)
  let sceneAction = '';

  if (setting === 'crime-fighting') {
    if (pageNumber === 3 || text.includes('استغاثة') || text.includes('إنذار') || text.includes('شوارع') || text.includes('مساء')) {
      sceneAction = `Superhero city twilight scene: the child in modern hero outfit stands alert in an observation command room overlooking the glittering metropolis. Outside the window, a dynamic glowing superhero distress signal illuminates the room and alarms echo across the night sky, creating thrilling suspense and anticipation`;
    } else if (pageNumber === 4 || text.includes('فخ') || text.includes('أشرار') || text.includes('حواجز') || text.includes('عقبة') || text.includes('متاهة')) {
      sceneAction = `Dramatic superhero confrontation obstacle: the child faces a glowing maze of villain barriers and tricky puzzles on a high-tech city walkway, looking determined and highly focused as digital countdown clock ticks, dynamic comic angles and neon city shadows`;
    } else if (pageNumber === 5 || text.includes('هبط') || text.includes('برج') || text.includes('صافح') || text.includes('بهلوانية') || text.includes('فجأة')) {
      sceneAction = `Epic superhero arrival splash scene: ${hero} leaps dynamically onto the skyscraper ledge in a breathtaking three-point superhero landing pose with sparkling electric comic energy swirls. The child looks up inspired and ready for action as ${hero} extends an inspiring fist-bump, unveiling the secret power of planning and discipline`;
    } else if (pageNumber === 6 || text.includes('نينجا') || text.includes('تكتيكية') || text.includes('خطة') || text.includes('تدريب') || text.includes('هولوغرام')) {
      sceneAction = `High-tech superhero tactical training: side-by-side in command room, ${hero} and the child lean over a glowing 3D holographic city tactical map, coordinating mission steps with laser focus and blazing speed like a master ninja team, surrounded by glowing strategy charts and achievement stars`;
    } else if (pageNumber === 7 || text.includes('انتصار') || text.includes('ضربة') || text.includes('فك شفرة') || text.includes('أمان')) {
      sceneAction = `Triumphant superhero victory scene: standing proudly on a safe city boulevard after foiling the villain traps, the child hero holds up the deactivated control module with victory confidence alongside ${hero}, cheering citizens and celebratory flares in the background`;
    } else if (pageNumber === 8 || text.includes('وسام') || text.includes('حامي المدينة') || text.includes('تتويج') || text.includes('احتفال')) {
      sceneAction = `Grand superhero rooftop awards celebration: under dazzling hero spotlights on a grand stage, ${hero} proudly places a radiant gleaming golden City Guardian medal of honor around the child's neck, glittering confetti bursts, golden stars, proud parents cheering beside them`;
    }
  } else if (setting === 'jungle-safari') {
    if (pageNumber === 3 || text.includes('وادي') || text.includes('استوائية') || text.includes('بوصلة') || text.includes('حقيبة')) {
      sceneAction = `Lush morning tropical rainforest trail: the child in safari explorer outfit sets out into the dense emerald jungle surrounded by giant ancient trees, exotic colorful birds, and playful monkeys on vines, excitedly packing explorer tools and compass with determination`;
    } else if (pageNumber === 4 || text.includes('جسر') || text.includes('نهر') || text.includes('رموز') || text.includes('وادي') || text.includes('صخور')) {
      sceneAction = `Dramatic jungle obstacle at a deep canyon: the child stands before a mossy wooden suspension bridge over a rushing river waterfall, studying ancient carved stone glyphs with thoughtful concentration and patience amidst tropical mist`;
    } else if (pageNumber === 5 || text.includes('أغصان') || text.includes('قفزة') || text.includes('أدغال') || text.includes('هبط')) {
      sceneAction = `Epic jungle superhero arrival: ${hero} swings gracefully from giant canopy vines, making a dynamic heroic landing on a mossy rock in front of the child, offering an encouraging hand and unveiling the explorer secret of patience and discipline`;
    } else if (pageNumber === 6 || text.includes('بوصلة') || text.includes('نبع') || text.includes('ملاحة') || text.includes('خريطة')) {
      sceneAction = `Jungle navigation training session: sitting beside a crystalline waterfall, ${hero} and the child study a glowing golden compass and detailed papyrus map together, learning to navigate the wild trail step-by-step with sharp focus, friendly jungle animals watching`;
    } else if (pageNumber === 7 || text.includes('معبد') || text.includes('حكمة') || text.includes('بوابة') || text.includes('جوهرة') || text.includes('كنز')) {
      sceneAction = `Triumphant ancient temple breakthrough: the giant carved stone doors of the ancient sanctuary swing open as golden radiant light pours out, the child holding up the legendary glowing wisdom gem in proud victory alongside cheering ${hero}`;
    } else if (pageNumber === 8 || text.includes('تتويج') || text.includes('مستكشف') || text.includes('وسام') || text.includes('غروب')) {
      sceneAction = `Sunset mountain summit ceremony: ${hero} proudly places an ornate golden leaf and compass Master Explorer medallion around the child's neck, golden hour sunset over emerald jungle canopy, soaring colorful birds, beaming proud parents`;
    }
  } else if (setting === 'space-odyssey') {
    if (pageNumber === 3 || text.includes('مركبة') || text.includes('كواكب') || text.includes('فضاء') || text.includes('مجرات')) {
      sceneAction = `Futuristic starship control cabin: the child in sleek sci-fi astronaut suit sits before interactive holographic screens and star-charts, preparing for a galactic journey, outside the window a distant sparkling galaxy shines brightly`;
    } else if (pageNumber === 4 || text.includes('كويكبات') || text.includes('طوارئ') || text.includes('إنذار') || text.includes('حزام')) {
      sceneAction = `Dramatic deep space alert: cosmic asteroid belt appears outside the spacecraft viewport with flashing blue navigation emergency lights, the child analyzes the flight course on glowing holographic consoles with steady courage and focus`;
    } else if (pageNumber === 5 || text.includes('هبط') || text.includes('مركبة') || text.includes('رسو') || text.includes('وصول')) {
      sceneAction = `Epic space hero arrival: ${hero} docks in a swift starfighter and steps onto the bridge in sparkling light energy, greeting the child with a confident fist-bump and revealing that order and discipline are the true navigational superpower`;
    } else if (pageNumber === 6 || text.includes('ملاحة') || text.includes('هولوغرام') || text.includes('مسار') || text.includes('تدريب')) {
      sceneAction = `High-tech spacecraft helm training: ${hero} guides the child at the holographic navigation helm, calculating orbital vectors with blazing precision and ninja focus, glowing star-charts and flight vectors`;
    } else if (pageNumber === 7 || text.includes('انتصار') || text.includes('سديم') || text.includes('كوكب') || text.includes('نجاح')) {
      sceneAction = `Triumphant galactic navigation victory: the child smoothly steers the star cruiser through the asteroid passage into a breathtaking crystal-clear nebula, cheering with arms raised in victory at the helm`;
    } else if (pageNumber === 8 || text.includes('وسام') || text.includes('فارس الفضاء') || text.includes('تتويج') || text.includes('تكريم')) {
      sceneAction = `Galactic Guardian honor coronation: on the grand observation deck overlooking a golden binary sunset and cosmic stars, ${hero} pins a radiant golden star-shaped Galactic Guardian medal onto the child's suit, celebration confetti and light sparks`;
    }
  } else if (setting === 'fantasy-magic') {
    if (pageNumber === 3 || text.includes('قلعة') || text.includes('برج') || text.includes('جوهرة النور') || text.includes('مملكة')) {
      sceneAction = `Enchanted castle tower chamber: the child in adventurer tunic stands near an ancient stained-glass window beside an ornate pedestal holding the Kingdom's glowing Light Gem, preparing for a noble quest with curiosity and courage`;
    } else if (pageNumber === 4 || text.includes('متاهة') || text.includes('أشواك') || text.includes('بوابة') || text.includes('لغز')) {
      sceneAction = `Mystical maze obstacle in the ancient forest: child stands before a gateway of glowing enchanted brambles and riddle stones, analyzing the magical pattern with patient focus and calm wisdom as mystical mist swirls`;
    } else if (pageNumber === 5 || text.includes('بوابة') || text.includes('فارس') || text.includes('درع') || text.includes('ظهور')) {
      sceneAction = `Epic magical entrance: ${hero} steps through a radiant portal of shimmering golden light in gleaming heroic knight armor, saluting the child with a proud smile, teaching that true magic flows from honesty, discipline, and courage`;
    } else if (pageNumber === 6 || text.includes('مخطوطات') || text.includes('مكتبة') || text.includes('حكمة') || text.includes('تدريب')) {
      sceneAction = `Enchanted library scroll study and virtue training: ${hero} and the child study ancient glowing wisdom scrolls together, mastering spells of focus and perseverance with floating golden glyphs and magical starlight`;
    } else if (pageNumber === 7 || text.includes('استعادة') || text.includes('نور') || text.includes('انتصار') || text.includes('مملكة')) {
      sceneAction = `Triumphant restoration of the Light Gem: the child places the restored radiant crystal on the central altar, sending brilliant waves of golden light dispelling darkness across the fantasy kingdom, joyful victory stance`;
    } else if (pageNumber === 8 || text.includes('تتويج') || text.includes('وسام') || text.includes('عرش') || text.includes('فارس الشرف')) {
      sceneAction = `Grand royal throne room coronation: amidst majestic velvet banners and royal fanfare, ${hero} places a radiant golden Knight of Honor medal and laurel around the child's neck, proud cheering parents and royal courtiers celebrating`;
    }
  }

  // Realistic daily default fallback
  if (!sceneAction) {
    if (pageNumber === 3 || text.includes('استيقظ') || text.includes('ألعاب') || text.includes('مبعثرة') || text.includes('صباح')) {
      sceneAction = `Morning bedroom storytelling scene: the child is sitting playfully on a colorful bedroom rug, delightfully distracted by toys and building blocks, while an open school backpack and textbooks wait on the study desk. Warm morning sunlight streams through the bedroom window, creating a playful narrative tension between fun and daily responsibilities`;
    } else if (pageNumber === 4 || text.includes('عقبة') || text.includes('ورطة') || text.includes('وميض') || text.includes('تحدي') || text.includes('ساعات')) {
      sceneAction = `Dramatic afternoon challenge at the study desk: the child sits facing a tall stack of homework and open notebooks, looking determined yet pressured as a wall clock ticks in the background. Outside the bedroom window, a mysterious and brilliant glowing blue electric superhero emblem illuminates the evening sky with glowing sparks`;
    } else if (pageNumber === 5 || text.includes('هبط') || text.includes('شرفة') || text.includes('صافح') || text.includes('لقاء') || text.includes('بهلوانية')) {
      sceneAction = `Epic superhero arrival splash scene: ${hero} leaps dynamically through the open balcony window in a breathtaking three-point superhero landing pose, surrounded by sparkling comic energy swirls. The child looks up with wide, ecstatic eyes as ${hero} extends an inspiring fist-bump, unveiling the secret power of courage and discipline`;
    } else if (pageNumber === 6 || text.includes('تدريب') || text.includes('خطة') || text.includes('نينجا') || text.includes('تركيز') || text.includes('جلسة')) {
      sceneAction = `Intense collaborative superhero training session: side-by-side at the study desk working like a focused ninja superhero team, ${hero} enthusiastically points at a colorful organized mission checklist while the child writes with intense focus and blazing speed in a workbook`;
    } else if (pageNumber === 7 || text.includes('انتصار') || text.includes('فرحة') || text.includes('نجاح') || text.includes('احتضنت') || text.includes('درجات')) {
      sceneAction = `Triumphant comic victory scene: standing proudly in the center of the room in an authentic superhero winner stance, the child holds up completed assignments stamped with gold stars and an organized backpack, golden rays of victory sunlight bursting through the window`;
    } else if (pageNumber === 8 || text.includes('وسام') || text.includes('تتويج') || text.includes('شرف') || text.includes('احتفال') || text.includes('ذهب')) {
      sceneAction = `Grand finale coronation ceremony: ${hero} stands proudly on a celebratory heroic stage and places a radiant, gleaming golden medal of honor around the child's neck, golden confetti bursts, sparkling stars, and celebratory comic banners`;
    } else {
      sceneAction = `Dynamic children storybook comic scene in ${setting} adventure: the child is engaged in an exciting educational quest, actively facing challenges and collaborating with ${hero} in a vivid environment`;
    }
  }

  if (customStorySetting && customStorySetting.trim()) {
    sceneAction += `. Special adventure theme: ${customStorySetting.trim()}`;
  }

  if (dialogueText && dialogueText.trim()) {
    sceneAction += `. Dialogue context: "${dialogueText.trim()}"`;
  }

  return sceneAction;
}

// 5.6. دمج بادئة الطفل الثابتة مع الحدث المستخلص وأسلوب الرسم المختار (Dynamic Prompt Builder)
function buildDynamicPagePrompt({
  pageNumber,
  pageType,
  title,
  sceneTextArabic,
  dialogueText,
  artStyle = '3d-pixar',
  storySetting = 'crime-fighting',
  customStorySetting = '',
  childName,
  childAge,
  childGender,
  favoriteHero,
  childPhoto,
  visualTraits,
  isColoring
}) {
  const safeAge = parseInt(childAge) || 5;
  const isGirl = String(childGender).toLowerCase() === 'girl';
  const name = childName || (isGirl ? 'Layla' : 'Omar');
  const hasPhoto = !!childPhoto;

  // 1. تثبيت مواصفات الطفل الإلزامية (معرف الشخصية الثابت لضمان تطابق الوجه 100%)
  const childAnchor = buildFixedChildAnchor({
    age: safeAge,
    gender: isGirl ? 'girl' : 'boy',
    name,
    hasPhoto,
    visualTraits
  });

  // 2. استخلاص الحدث ديناميكياً من النص السردي المولد للصفحة مع مراعاة بيئة المغامرة
  const dynamicAction = extractSceneActionFromText({
    pageNumber,
    title,
    sceneTextArabic,
    dialogueText,
    childName: name,
    childAge: safeAge,
    childGender: isGirl ? 'girl' : 'boy',
    favoriteHero,
    storySetting,
    customStorySetting,
    isColoring
  });

  // 3. أسلوب الرسم المعتمد
  let styleModifier = '';
  switch (artStyle) {
    case 'anime':
      styleModifier = 'Japanese anime cinematic aesthetic, clean expressive lines, Studio Ghibli inspired warmth, vibrant expressive eyes, colorful and bright atmosphere';
      break;
    case 'comic-book':
      styleModifier = 'dynamic superhero comic book page, Marvel DC comic style, bold ink lines, dramatic heroic lighting, vibrant comic colors';
      break;
    case 'storybook':
      styleModifier = 'delightful children storybook illustration, soft painterly textures, warm joyful color palette, gentle magical atmosphere';
      break;
    case '3d-pixar':
    default:
      styleModifier = 'vibrant 3D animated film render, Pixar and Disney modern animation aesthetic, highly detailed character modeling, octane render 8k, warm volumetric lighting';
      break;
  }

  const COMIC_PREFIX = "(Masterpiece, top quality, children's comic book illustration style, dynamic action scene, vibrant colors, expressive characters, storytelling art, detailed background, dynamic comic panel angle, cinematic lighting)";
  const COMIC_SUFFIX = "(children educational comic magazine page, bold clean ink lines, emotional facial expressions, rich storytelling environment, action-packed narrative, 8k resolution, octane render, Disney Pixar comic aesthetic)";

  const COLORING_PREFIX = "(Masterpiece, top quality, children's interactive coloring page, clean bold black vector line art, pure white background, no shading, no gradients, no colors, high contrast outlines, ready for kids coloring)";
  const COLORING_SUFFIX = "(crisp pure black and white contour lines, coloring book page for children, vector line drawing, printable coloring sheet)";

  if (isColoring) {
    return {
      positivePrompt: `${COLORING_PREFIX}, ${childAnchor}, ${dynamicAction}, ${COLORING_SUFFIX}`,
      negativePrompt: "(color, colored, shading, shadow, gradients, photographic, grayscale, messy lines, text, watermark, signature, realistic render, 3D)"
    };
  }

  return {
    positivePrompt: `${COMIC_PREFIX}, Character: ${childAnchor}, Scene Action: ${dynamicAction}, Art Style: ${styleModifier}, ${COMIC_SUFFIX}`,
    negativePrompt: "(worst quality, low quality, static pose, boring portrait, blank background, blurry, deformed limbs, extra fingers, ugly face, distorted features, bad anatomy, text, watermark, signature, adult face, teenager face, mature face, aged, wrinkled, elderly, wrong child face, altered face, double face, generic face, photorealistic adult)"
  };
}

// 6. تنفيذ محاولة توليد فردية مع دعم FaceID / IP-Adapter / ComfyUI / Cloud AI
async function executeSingleImageAttempt(promptData, attemptNumber = 1) {
  const {
    prompt,
    sceneTextArabic,
    dialogueText,
    artStyle,
    childName,
    childAge,
    childGender,
    favoriteHero,
    childPhoto,
    fatherPhoto,
    motherPhoto,
    isColoring,
    pageNumber,
    title
  } = promptData;

  // الربط الديناميكي بين الحدث والصورة مع تثبيت مواصفات الطفل
  const safeAge = childAge || activeProject.child.age || 5;
  const safeGender = childGender || activeProject.child.gender || 'boy';
  const safeName = childName || activeProject.child.name || 'عمر';
  const visualTraits = promptData.visualTraits || activeProject.child?.visualTraits || {
    hairStyle: 'شعر قصير كيرلي مموج داكن من الأعلى مع تدريج ناعم على الجانبين (Curly Fade)',
    faceFeatures: 'عيون لوزية داكنة واسعة، حواجب مقوسة، وجه بيضاوي ناعم، بشرة حنطية عربية، وابتسامة هادئة واثقة',
    clothingStyle: 'قميص أسود أنيق مع كنزة صوفية مخططة أفقياً بالأبيض والأسود معقودة فوق الكتفين وبنطال جينز أزرق'
  };

  const childAnchor = buildFixedChildAnchor({
    age: safeAge,
    gender: safeGender,
    name: safeName,
    hasPhoto: !!childPhoto,
    visualTraits
  });

  const storySetting = promptData.storySetting || activeProject.child?.storySetting || 'crime-fighting';
  const customStorySetting = promptData.customStorySetting || activeProject.child?.customStorySetting || '';

  const { positivePrompt: finalPositivePrompt, negativePrompt: finalNegativePrompt } = buildDynamicPagePrompt({
    pageNumber,
    pageType: isColoring ? 'coloring' : (pageNumber === 1 ? 'cover' : (pageNumber === 2 ? 'dedication' : (pageNumber === 12 ? 'certificate' : 'story'))),
    title,
    sceneTextArabic,
    dialogueText,
    artStyle: artStyle || activeProject.child.artStyle || '3d-pixar',
    storySetting,
    customStorySetting,
    childName: safeName,
    childAge: safeAge,
    childGender: safeGender,
    favoriteHero: favoriteHero || activeProject.child.favoriteHero || 'سبايدرمان',
    childPhoto,
    visualTraits,
    isColoring: !!isColoring
  });

  const targetUrl = (API_CONFIG.customApiUrl && API_CONFIG.customApiUrl.trim())
    ? API_CONFIG.customApiUrl.trim()
    : API_CONFIG.endpointUrl;

  const isGoogle = API_CONFIG.apiType === 'google-imagen' || API_CONFIG.apiType === 'flow-api' || targetUrl.includes('generativelanguage.googleapis.com');
  let isCloud = !isGoogle && (API_CONFIG.apiType === 'cloud-ai' || targetUrl.includes('pollinations.ai'));
  const isComfy = !isGoogle && !isCloud && (API_CONFIG.apiType === 'comfyui' || targetUrl.includes('/prompt') || targetUrl.includes(':8188'));

  console.log(`[Image API - Attempt ${attemptNumber}] توليد صفحة ${pageNumber} ("${title || ''}") عبر (${API_CONFIG.apiType}) إلى: ${targetUrl}`);
  console.log(`[Dynamic Prompt Preview]: ${finalPositivePrompt.slice(0, 180)}...`);

  // استخراج Base64 نقي وصحيح لصورة الطفل لدعم FaceID / IP-Adapter
  const extractedPhoto = extractBase64Buffer(childPhoto);
  const childBase64 = extractedPhoto ? extractedPhoto.base64 : (childPhoto && childPhoto.includes('base64,') ? childPhoto.split('base64,')[1] : childPhoto);
  const childDataUrl = childPhoto && childPhoto.startsWith('data:') ? childPhoto : (childBase64 ? `data:image/png;base64,${childBase64}` : null);

  // إعداد ترويسات المصادقة (API Key / Bearer Token)
  const authHeaders = {};
  if (API_CONFIG.apiKey && API_CONFIG.apiKey.trim()) {
    const key = API_CONFIG.apiKey.trim();
    authHeaders['Authorization'] = key.startsWith('Bearer ') ? key : `Bearer ${key}`;
    authHeaders['X-API-Key'] = key;
  }

  // المسار 0: محرك قوقل إيماجين الرسمي (Google Imagen 3 / Google Flow Engine)
  if (isGoogle) {
    const apiKey = (API_CONFIG.apiKey || '').trim();
    if (!apiKey) {
      console.warn('[Google Imagen] لا يوجد مفتاح Google AI Studio، التحويل التلقائي للتوليد السحابي الفوري...');
      isCloud = true;
    } else {
      const cleanUrl = targetUrl.split('?')[0];
      const googleEndpoint = cleanUrl.includes('predict')
        ? `${cleanUrl}?key=${apiKey}`
        : `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

      const googlePayload = {
        instances: [
          { prompt: finalPositivePrompt }
        ],
        parameters: {
          sampleCount: 1,
          aspectRatio: "4:3",
          outputMimeType: "image/png",
          personGeneration: "ALLOW_ADULT_AND_CHILD"
        }
      };

      console.log(`[Google Imagen 3 / Flow] إرسال طلب التوليد لصفحة ${pageNumber} إلى Google AI Studio...`);
      const googleController = new AbortController();
      const googleTimeout = setTimeout(() => googleController.abort(), 20000);

      try {
        const googleRes = await fetch(googleEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(googlePayload),
          signal: googleController.signal
        });
        clearTimeout(googleTimeout);

        if (!googleRes.ok) {
          const errJson = await googleRes.json().catch(() => ({}));
          const msg = errJson.error?.message || `رمز خطأ من قوقل: ${googleRes.status}`;
          console.warn(`[Google Imagen 3 Notice]: ${msg}`);
          console.log(`[Smart Fallback] تم التبديل التلقائي الذكي إلى التوليد السحابي الفوري لصفحة ${pageNumber} مع تثبيت هوية وملامح الطفل...`);
          isCloud = true;
        } else {
          const googleData = await googleRes.json();
          const b64 = googleData.predictions?.[0]?.bytesBase64Encoded;
          if (b64) {
            const buf = Buffer.from(b64, 'base64');
            const fileName = `page-${pageNumber}-google-${Date.now()}.png`;
            fs.writeFileSync(path.join(IMAGES_DIR, fileName), buf);

            return {
              success: true,
              imageUrl: `/generated-images/${fileName}`,
              status: 'completed',
              source: 'google-imagen-3',
              apiTarget: 'Google Imagen 3 (Official Google Flow Engine)'
            };
          } else {
            throw new Error('توليد مشاهد Google Flow يتطلب استوديو Google Flow الرسمي للحفاظ على أعلى جودة ومنع تشوه المشاهد.');
          }
        }
      } catch (err) {
        clearTimeout(googleTimeout);
        throw new Error(`Google Flow Studio Error: ${err.message}`);
      }
    }
  }

  // المسار الأول: مسار عمل ComfyUI / Google Colab (Workflow JSON Payload + FaceID)
  if (isComfy && !isCloud) {
    try {
      const baseUrl = targetUrl.replace(/\/prompt\/?$/, '');
      let uploadedImageName = 'child_face_reference.png';

      // رفع صورة الطفل كمرجع FaceID إلى ComfyUI input folder
      if (extractedPhoto) {
        try {
          console.log(`[FaceID] جاري إرسال صورة الطفل المرجعية إلى خادم ComfyUI (${baseUrl}/upload/image)...`);
          const formData = new FormData();
          formData.append('image', new Blob([extractedPhoto.buffer], { type: `image/${extractedPhoto.type}` }), `child_face_${pageNumber}.png`);
          formData.append('overwrite', 'true');
          formData.append('type', 'input');

          const uploadController = new AbortController();
          const uploadTimeout = setTimeout(() => uploadController.abort(), 20000);

          const upRes = await fetch(`${baseUrl}/upload/image`, {
            method: 'POST',
            headers: authHeaders,
            body: formData,
            signal: uploadController.signal
          });
          clearTimeout(uploadTimeout);

          if (upRes.ok) {
            const upJson = await upRes.json();
            if (upJson.name) {
              uploadedImageName = upJson.name;
              console.log(`[FaceID Success] تم استقبال وتثبيت وجه الطفل في ComfyUI بنجاح: ${uploadedImageName}`);
            }
          }
        } catch (uploadErr) {
          console.warn('[FaceID Upload Warning]', uploadErr.message);
        }
      }

      const seed = Math.floor(Math.random() * 1000000000);
      let comfyWorkflowPayload = null;

      if (API_CONFIG.customWorkflowJson && API_CONFIG.customWorkflowJson.trim()) {
        comfyWorkflowPayload = applyCustomWorkflow(
          API_CONFIG.customWorkflowJson,
          finalPositivePrompt,
          finalNegativePrompt,
          seed,
          uploadedImageName
        );
      }

      if (!comfyWorkflowPayload) {
        comfyWorkflowPayload = createComfyUiWorkflowPayload({
          positivePrompt: finalPositivePrompt,
          negativePrompt: finalNegativePrompt,
          imageFileName: uploadedImageName,
          hasFaceReference: !!extractedPhoto,
          seed
        });
      }

      // تجهيز الحمولة الكاملة الموحدة لدعم ComfyUI و Colab FastAPI/Flask endpoints مع FaceID
      const requestPayload = {
        client_id: comfyWorkflowPayload.client_id || `maktaba_client_${Date.now()}`,
        prompt: comfyWorkflowPayload.prompt,
        reference_image: childDataUrl || childBase64 || null,
        face_image: childDataUrl || childBase64 || null,
        child_face_base64: childBase64 || null,
        init_images: childDataUrl ? [childDataUrl] : (childBase64 ? [childBase64] : []),
        face_id: {
          enabled: true,
          weight: 1.0,
          reference_image: childDataUrl || childBase64 || null
        },
        prompt_text: finalPositivePrompt,
        negative_prompt_text: finalNegativePrompt,
        page_number: pageNumber
      };

      const postController = new AbortController();
      const postTimeout = setTimeout(() => postController.abort(), API_CONFIG.timeoutMs || 65000);

      const comfyRes = await fetch(`${baseUrl}/prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify(requestPayload),
        signal: postController.signal
      });
      clearTimeout(postTimeout);

      if (!comfyRes.ok) {
        const errTxt = await comfyRes.text();
        throw new Error(`استجاب خادم ComfyUI برمز (${comfyRes.status}): ${errTxt.slice(0, 180)}`);
      }

      const comfyJson = await comfyRes.json();

      // 1. إذا كان الرد هو prompt_id (طريقة ComfyUI القياسية)
      if (comfyJson.prompt_id) {
        const savedImageUrl = await pollComfyUiHistory(baseUrl, comfyJson.prompt_id, API_CONFIG.timeoutMs || 70000, pageNumber, authHeaders);
        return {
          success: true,
          imageUrl: savedImageUrl,
          status: 'completed',
          source: 'comfyui-faceid',
          apiTarget: targetUrl
        };
      }

      // 2. إذا كان الرد مباشراً بصيغة Base64 أو URL (سيرفرات Colab FastAPI / SD WebUI)
      let rawImg = comfyJson.image || (Array.isArray(comfyJson.images) ? comfyJson.images[0] : null) || comfyJson.image_url || comfyJson.url || comfyJson.output;
      if (rawImg && typeof rawImg === 'string') {
        if (rawImg.startsWith('http')) {
          const fetchedImg = await fetch(rawImg, { headers: authHeaders });
          const buf = Buffer.from(await fetchedImg.arrayBuffer());
          const fileName = `page-${pageNumber}-colab-${Date.now()}.png`;
          fs.writeFileSync(path.join(IMAGES_DIR, fileName), buf);
          return { success: true, imageUrl: `/generated-images/${fileName}`, status: 'completed', source: 'colab-api' };
        } else {
          const b64Data = rawImg.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');
          const buf = Buffer.from(b64Data, 'base64');
          const fileName = `page-${pageNumber}-colab-${Date.now()}.png`;
          fs.writeFileSync(path.join(IMAGES_DIR, fileName), buf);
          return { success: true, imageUrl: `/generated-images/${fileName}`, status: 'completed', source: 'colab-api' };
        }
      }

      throw new Error('لم يرجع خادم ComfyUI/Colab معرف مهمة أو صورة صالحة.');
    } catch (comfyErr) {
      console.warn(`[ComfyUI Unreachable / Error]: ${comfyErr.message}. التحويل التلقائي الذكي إلى التوليد السحابي الفوري لصفحة ${pageNumber} مع الحفاظ على كامل الملامح...`);
      isCloud = true;
    }
  }

  // المسار الثاني: Custom REST API / Fal.ai InstantID / IP-Adapter FaceID Endpoint
  if (!isGoogle && !isComfy && !isCloud) {
    try {
      const customController = new AbortController();
      const customTimeout = setTimeout(() => customController.abort(), API_CONFIG.timeoutMs || 75000);

      const isFalAi = targetUrl.includes('fal.run') || targetUrl.includes('fal.ai');
      let customPayload = {};

      if (isFalAi) {
        customPayload = {
          prompt: finalPositivePrompt,
          negative_prompt: finalNegativePrompt,
          face_image_url: childDataUrl || (childBase64 ? `data:image/jpeg;base64,${childBase64}` : null),
          image_size: { width: 1024, height: 768 }
        };
        if (API_CONFIG.apiKey && API_CONFIG.apiKey.trim()) {
          const key = API_CONFIG.apiKey.trim().replace(/^Key\s+/i, '').replace(/^Bearer\s+/i, '');
          authHeaders['Authorization'] = `Key ${key}`;
        }
      } else {
        // إرسال صورة الطفل بصيغة Base64 كمرجع إلزامي داخل الـ Payload مع بيانات الحدث الديناميكي
        customPayload = {
          prompt: finalPositivePrompt,
          negative_prompt: finalNegativePrompt,
          // معايير FaceID / IP-Adapter الحقيقية
          image: childDataUrl || childBase64,
          child_photo_base64: childBase64,
          child_image: childDataUrl || childBase64,
          reference_image: childDataUrl || childBase64,
          face_image: childDataUrl || childBase64,
          face_image_url: childDataUrl || childBase64,
          init_images: childDataUrl ? [childDataUrl] : (childBase64 ? [childBase64] : []),
          visual_traits: visualTraits,
          ip_adapter: {
            enabled: !!childBase64,
            image: childDataUrl || childBase64,
            weight: 1.0,
            model: "ip-adapter-faceid-plusv2_sdxl"
          },
          face_id: {
            enabled: !!childBase64,
            reference_image: childDataUrl || childBase64,
            weight: 1.0
          },
          // سياق الحدث الديناميكي المستخلص من نص الصفحة
          page_number: pageNumber,
          scene_title: title,
          scene_text: sceneTextArabic,
          dialogue: dialogueText,
          art_style: artStyle,
          child_profile: {
            name: childName,
            age: childAge,
            gender: childGender,
            favorite_hero: favoriteHero,
            visual_traits: visualTraits
          }
        };
      }

      const customRes = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify(customPayload),
        signal: customController.signal
      });
      clearTimeout(customTimeout);

      if (!customRes.ok) {
        const errText = await customRes.text();
        throw new Error(`أعاد الـ API المخصص رمز (${customRes.status}): ${errText.slice(0, 200)}`);
      }

      const customData = await customRes.json();

      // فحص واستخراج الصورة سواء كانت Base64 أو رابط URL أو مصفوفة صور
      let rawImg = customData.image ||
                   (Array.isArray(customData.images) ? customData.images[0] : null) ||
                   customData.image_url ||
                   customData.imageUrl ||
                   customData.url ||
                   customData.output ||
                   (Array.isArray(customData.data) ? (customData.data[0]?.b64_json || customData.data[0]?.url) : null) ||
                   customData.result;

      if (rawImg && typeof rawImg === 'string') {
        if (rawImg.startsWith('http://') || rawImg.startsWith('https://')) {
          // تنزيل الصورة وتخزينها محلياً لحفظها وضمان سرعة التصدير والطباعة
          const fetchImgRes = await fetch(rawImg, { headers: authHeaders });
          const buf = Buffer.from(await fetchImgRes.arrayBuffer());
          const fileName = `page-${pageNumber}-faceid-${Date.now()}.png`;
          fs.writeFileSync(path.join(IMAGES_DIR, fileName), buf);
          return {
            success: true,
            imageUrl: `/generated-images/${fileName}`,
            status: 'completed',
            source: 'custom-faceid-url',
            apiTarget: targetUrl
          };
        } else {
          // معالجة صورة Base64 وحفظها محلياً
          const cleanB64 = rawImg.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');
          const buf = Buffer.from(cleanB64, 'base64');
          const fileName = `page-${pageNumber}-faceid-${Date.now()}.png`;
          fs.writeFileSync(path.join(IMAGES_DIR, fileName), buf);
          return {
            success: true,
            imageUrl: `/generated-images/${fileName}`,
            status: 'completed',
            source: 'custom-faceid-base64',
            apiTarget: targetUrl
          };
        }
      }

      throw new Error('لم يرجع الـ API المخصص صورة صالحة.');
    } catch (customErr) {
      console.warn(`[Custom API Unreachable / Error]: ${customErr.message}. التحويل التلقائي الذكي إلى التوليد السحابي الفوري لصفحة ${pageNumber}...`);
      isCloud = true;
    }
  }

  // المسار الثالث: التوليد السحابي الفوري (Cloud AI مع تثبيت الملامح البصرية الدقيقة)
  // يعمل تلقائياً إذا كان مختاراً، أو كصمام أمان مضمون 100% عند تعثر أي سيرفر محلي أو خارجي
  const isGirl = safeGender === 'girl';
  const { hairEn, faceEn, clothingEn } = translateVisualTraits(visualTraits, isGirl);
  const heroEn = getEnglishHeroName(favoriteHero);
  const dynamicAction = extractSceneActionFromText({
    pageNumber,
    title,
    sceneTextArabic,
    dialogueText,
    childName: safeName,
    childAge: safeAge,
    childGender: safeGender,
    favoriteHero: heroEn,
    storySetting,
    customStorySetting,
    isColoring: !!isColoring
  });

  const selectedArtStyle = artStyle || activeProject.child.artStyle || '3d-pixar';
  let styleHeader = '3D Pixar animated film style, cinematic volumetric lighting, 8k octane render';
  if (selectedArtStyle === 'anime') {
    styleHeader = 'Japanese anime cinematic aesthetic, Studio Ghibli inspired, vibrant expressive eyes, clean lines, colorful bright lighting';
  } else if (selectedArtStyle === 'comic-book') {
    styleHeader = 'dynamic superhero comic book page style, bold ink lines, dramatic comic panel angle, cinematic superhero lighting';
  } else if (selectedArtStyle === 'storybook') {
    styleHeader = 'delightful children storybook illustration, soft painterly textures, warm joyful color palette, gentle fairytale lighting';
  }

  let promptForCloud = '';
  if (isColoring) {
    promptForCloud = `children interactive coloring book page, clean bold black vector line art on pure white background, no colors, no shading, no gradients, black contour outlines ready for kids coloring. ${dynamicAction}, a cute young Arab ${isGirl ? 'girl' : 'boy'} named ${safeName} with ${hairEn} and ${heroEn}, printable coloring sheet vector`;
  } else if (pageNumber === 12) {
    promptForCloud = `Ornate golden achievement certificate frame with glossy royal ribbon, golden starbursts, sparkling heroic trophy, elegant border, vibrant festive lighting, ${styleHeader}`;
  } else {
    promptForCloud = `${styleHeader}. Scene: ${dynamicAction}. Character: authentic ${safeAge}-year-old Arab ${isGirl ? 'girl' : 'boy'} named ${safeName} with ${hairEn}, ${faceEn}, wearing ${clothingEn}. High detail, expressive joyful facial features, dynamic composition`;
  }

  // تنظيف النص وإبقاء طول غني (650 حرفاً) لضمان تمرير كامل الملامح والحدث لموديل الانتشار
  const cleanPrompt = promptForCloud.replace(/[\(\)\[\]]/g, '').replace(/\s+/g, ' ').slice(0, 650).trim();

  const seed = Math.floor(100000 + (pageNumber * 888) + (attemptNumber * 15432) + Math.random() * 50000);
  const modelParam = attemptNumber === 1 ? '&model=turbo' : (attemptNumber === 2 ? '&model=flux' : '&model=turbo');
  const isGoogleKey = (API_CONFIG.apiKey || '').startsWith('AIzaSy');
  const keyParam = (API_CONFIG.apiKey && API_CONFIG.apiKey.trim() && !isGoogleKey) ? `&key=${encodeURIComponent(API_CONFIG.apiKey.trim())}` : '';
  const cloudUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=1024&height=768&seed=${seed}&nologo=true${modelParam}${keyParam}`;

  console.log(`[Cloud AI] جلب صورة المشهد لصفحة ${pageNumber} مع تثبيت الملامح البصرية (الشعر والكنزة المخططة) وتخزينها محلياً...`);
  const cloudController = new AbortController();
  const cloudTimeout = setTimeout(() => cloudController.abort(), 45000);

  const cloudHeaders = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MaktabaShula/2.0' };
  if (API_CONFIG.apiKey && API_CONFIG.apiKey.trim() && !isGoogleKey) {
    cloudHeaders['Authorization'] = `Bearer ${API_CONFIG.apiKey.trim()}`;
  }

  const cloudRes = await fetch(cloudUrl, {
    headers: cloudHeaders,
    signal: cloudController.signal
  });
  clearTimeout(cloudTimeout);

  if (cloudRes.status === 429 || cloudRes.status >= 500) {
    throw new Error(`وصل حد الاستخدام السحابي (${cloudRes.status}). سيتم إعادة المحاولة تلقائياً.`);
  }

  const arrayBuf = await cloudRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);

  if (buffer.length < 1500) {
    const textPreview = buffer.toString('utf8');
    if (textPreview.includes('FREE_LIMIT') || textPreview.includes('Free limit reached') || textPreview.includes('rate limit') || textPreview.includes('limit reached')) {
      const match = textPreview.match(/Retry after (\d+)s/i);
      const waitSec = match ? parseInt(match[1], 10) : 40;
      console.log(`[Rate Limit Auto-Wait] رصد حد الاستخدام السحابي: جاري الانتظار تلقائياً لمدة ${waitSec + 2} ثانية ثم جلب الصورة بنجاح...`);
      await new Promise(r => setTimeout(r, (waitSec + 2) * 1000));

      const retryRes = await fetch(cloudUrl, { headers: cloudHeaders });
      if (retryRes.ok) {
        const retryBuf = Buffer.from(await retryRes.arrayBuffer());
        if (retryBuf.length > 2000) {
          const fileName = `page-${pageNumber}-cloud-${Date.now()}.png`;
          fs.writeFileSync(path.join(IMAGES_DIR, fileName), retryBuf);
          console.log(`[Rate Limit Resolved] تم جلب وحفظ صفحة ${pageNumber} بنجاح بعد انقضاء فترة الانتظار!`);
          return {
            success: true,
            imageUrl: `/generated-images/${fileName}`,
            status: 'completed',
            source: 'cloud-ai-local-cached',
            apiTarget: 'https://image.pollinations.ai/prompt'
          };
        }
      }
      throw new Error(`وصل حد الاستخدام السحابي المجاني (${waitSec} ثانية).`);
    }
  }

  const fileName = `page-${pageNumber}-cloud-${Date.now()}.png`;
  fs.writeFileSync(path.join(IMAGES_DIR, fileName), buffer);

  return {
    success: true,
    imageUrl: `/generated-images/${fileName}`,
    status: 'completed',
    source: 'cloud-ai-local-cached',
    apiTarget: 'https://image.pollinations.ai/prompt'
  };
}

// 7. دالة التوليد الرئيسية مع مهلة صارمة وإعادة المحاولة التلقائية (Retry Mechanism)
async function callExternalImageApiWithRetry(promptData) {
  const maxRetries = API_CONFIG.maxRetries || 3;
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await executeSingleImageAttempt(promptData, attempt);
      if (result && result.success && result.imageUrl) {
        return result;
      }
      lastError = result?.error || 'تعذر استلام صورة صالحة من خادم التوليد.';
    } catch (err) {
      lastError = err.message;
      console.warn(`[Auto-Retry Warning] تعثر المحاولة (${attempt}/${maxRetries}) لصفحة ${promptData.pageNumber}: ${err.message}`);
    }

    if (attempt < maxRetries) {
      const isRateLimit = lastError && (lastError.includes('حد الاستخدام') || lastError.includes('FREE_LIMIT') || lastError.includes('402') || lastError.includes('429'));
      const waitMs = isRateLimit ? (30000 + (attempt * 10000)) : (attempt * 3000);
      console.log(`[Auto-Retry] انتظار لمدة ${Math.round(waitMs / 1000)} ثانية قبل المحاولة ${attempt + 1}...`);
      await new Promise(r => setTimeout(r, waitMs));
    }
  }

  return {
    success: false,
    imageUrl: null,
    status: 'error',
    error: `تعذر توليد لوحة صفحة ${promptData.pageNumber} بعد ${maxRetries} محاولات تلقائية. التفاصيل: ${lastError}`,
    apiTarget: API_CONFIG.customApiUrl || API_CONFIG.endpointUrl
  };
}

// 8. دالة توليد نصوص ومشاهد القصة التربوية المتكيفة لغوياً مع بيئة المغامرة وجنس الطفل (ولد / بنت)
function generateRichStoryScenes(childProfile) {
  const name = childProfile.name || 'عمر';
  const age = parseInt(childProfile.age) || 7;
  const isGirl = String(childProfile.gender).toLowerCase() === 'girl';
  const favoriteHero = childProfile.favoriteHero || 'سبايدرمان';
  const heroEn = getEnglishHeroName(favoriteHero);
  const positiveAlternative = childProfile.positiveAlternative || 'تنظيم الوقت والاجتهاد';
  const behaviorDescription = childProfile.behaviorDescription || 'تأجيل الواجبات';
  const storySetting = childProfile.storySetting || 'crime-fighting';
  const customStorySetting = childProfile.customStorySetting || '';
  const hasParents = !!(childProfile.includeParentsInStory && (childProfile.fatherPhotoUrl || childProfile.motherPhotoUrl));

  const childNameEn = formatChildNameForModel(name, isGirl);
  const fixedAnchorHero = buildFixedChildAnchor(childProfile, childProfile.gender, name, !!(childProfile.photoUrl), childProfile.visualTraits, 'hero');
  const fixedAnchorCasual = buildFixedChildAnchor(childProfile, childProfile.gender, name, !!(childProfile.photoUrl), childProfile.visualTraits, 'casual');
  const fixedAnchor = fixedAnchorHero;

  // توليد المشاهد بناءً على بيئة المغامرة المختارة
  let storyData = null;

  if (storySetting === 'crime-fighting') {
    storyData = {
      coverTitle: `مغامرات حماة المدينة: ${isGirl ? 'البطلة' : 'البطل'} ${name} مع ${favoriteHero}`,
      coverText: `إصدار خاص وبطولة حصرية لـ ${isGirl ? 'البطلة' : 'البطل'} ${name} برفقة ${favoriteHero} في مهمة إنقاذ المدينة التاريخية`,
      coverPrompt: `Epic superhero comic book cover composition. Front center: ${fixedAnchor} wearing a customized modern superhero adventurer suit and fluttering cape, standing in a triumphant confident superhero power stance side-by-side with ${heroEn} on a skyscraper rooftop overlooking a glittering metropolis skyline at dusk. ${heroEn} gives an encouraging thumbs-up with an iconic heroic smile. Vibrant heroic skyline in the background with glowing searchlights, dynamic comic starburst explosion effects, spacious comic title banner area at top, bold dramatic cinematic lighting, masterpiece.`,
      
      dedicationTitle: 'إهداء أبطال المدينة من الوالدين',
      dedicationText: childProfile.parentDedication || `يا ${isGirl ? 'بطلتنا الغالية' : 'بطلنا الغالي'} ${name}، نحن فخورون بشجاعتك وذكائك، وواثقون أنك ستكون حامي المدينة الحقيقي وقدوة لكل الأبطال دائما.`,
      dedicationPrompt: `Heartwarming family portrait and storytelling moment. Front center: ${fixedAnchor} sitting happily in a warm modern high-tech hero base room holding a glowing open golden adventure book, lovingly surrounded by smiling proud mother and father embracing their child, glowing city lights visible through the window, warm cozy lighting, soft cinematic lighting, emotional family connection.`,

      scene1Title: 'نداء الاستغاثة وسر التركيز',
      scene1Text: hasParents
        ? `في مساء هادئ فوق مدينة الأبطال كانت شوارع المدينة تترقب بطلا شجاعا. دخلت الأم بحنان لتتفقد ${name} بينما كان الأب في غرفة العمليات المنزلية يجهز خريطة المدينة ويناديها برفق. لكن ${name} كانت منشغلة بألعابها وتأجيل تجهيز معداتها، مما جعل والديها يذكرانها بأن سر حماة المدينة الحقيقي يبدأ من الاستعداد والانضباط. وفجأة دوى في الأفق صوت صفارات الإنذار وظهر شعار الأبطال متوهجا في السماء يطلب النجدة! أدرك الجميع أن الوقت قد حان لتثبت ${name} شجاعتها.`
        : `في مساء هادئ فوق مدينة الأبطال كانت شوارع المدينة تترقب بطلا شجاعا يمتلك روح المبادرة. كان ${isGirl ? 'بطلتنا' : 'بطلنا'} ${name} في غرفته يستعد، لكنه كان يواجه تحديا في ${behaviorDescription}. وفجأة دوى في الأفق صوت صفارات الإنذار وظهر شعار الأبطال متوهجا في السماء يطلب النجدة العاجلة! شعر ${name} بنبضات قلبه تتسارع وأدرك أن الأبطال الحقيقيين لا يترددون، وأن مدينته بحاجة إلى شجاعته وتنظيمه فورا لإنقاذ الموقف.`,
      scene1Dialogue: {
        speaker: name,
        text: `الأبطال لا يتأخرون! سأنظم مهامي وأكون ${isGirl ? 'مستعدة' : 'مستعدا'} لإنقاذ الموقف مع ${favoriteHero}!`
      },
      scene1Prompt: `Superhero city twilight scene: ${fixedAnchor} in modern hero outfit stands alert in an observation command room overlooking the glittering metropolis. Outside the window, a dynamic glowing superhero distress signal illuminates the room and alarms echo across the night sky, creating thrilling suspense and anticipation, dynamic comic angles.`,

      scene2Title: 'فخ الأشرار واختبار الإرادة',
      scene2Text: hasParents
        ? `هبت ريح باردة وظهرت عقبة صعبة في شوارع المدينة، حيث حاول الأشرار زرع الفوضى وتعطيل حركة المرور عبر متاهة من الحواجز المعقدة. وقف الأب بجانب ${name} مؤكدا أن الانضباط يحل أصعب المشكلات، بينما شجعتها الأم على التركيز خطوة بخطوة. شعرت ${name} بالمسؤولية الكبيرة، وتذكرت أن التراخي أو عدم التخطيط قد يمنح الأشرار فرصة للهروب، فأخذت نفسا عميقا متذكرة أن الانتصار يبدأ من ضبط النفس.`
        : `هبت ريح باردة وظهرت عقبة صعبة في شوارع المدينة، حيث حاول الأشرار زرع الفوضى وتعطيل حركة المرور عبر متاهة من الحواجز المعقدة. وجد ${name} نفسه أمام مهمة تتطلب تركيزا شديدا، وتذكر أن التراخي أو عدم التخطيط قد يمنح الأشرار فرصة للهروب. وقف ${isGirl ? 'بطلتنا' : 'بطلنا'} بكل عزيمة متذكرا أن الانتصار يبدأ من ضبط النفس وترتيب الخطوات بدقة قبل التحرك.`,
      scene2Dialogue: {
        speaker: name,
        text: `لن أسمح للفوضى أن تنتصر! بالتركيز والشجاعة سأحل شفرة هذا الفخ خطوة بخطوة!`
      },
      scene2Prompt: `Dramatic superhero confrontation obstacle: ${fixedAnchor} faces a glowing maze of villain barriers and tricky puzzles on a high-tech city walkway, looking determined and highly focused as digital countdown clock ticks, dynamic comic angles and neon city shadows.`,

      scene3Title: 'هبوط البطل الخارق وسر القوة الحقيقية',
      scene3Text: hasParents
        ? `انشق الظلام فجأة ودوّى صوت بطولي واثق، وهبط ${favoriteHero} من أعلى برج في حركة بهلوانية خارقة جعلت شرفة المنزل تهتز بحماس وسط دهشة الوالدين وتشجيعهما! صافح البطل الأب بحرارة وربت على كتف ${name} قائلا: "لقد رأيت ذكاءك يا ${name}، لكن سر قوة الأبطال لا يكمن فقط في القوة الجسدية، بل في ${positiveAlternative}!" اشتعل الحماس في عيني ${name} وشعرت بطاقتها تتضاعف.`
        : `انشق الظلام فجأة ودوّى صوت بطولي واثق، وهبط ${favoriteHero} من أعلى برج في حركة بهلوانية خارقة جعلت الأرض تهتز تحت قدميه! ربت البطل على كتف ${name} وقال بصوت دافئ وقوي: "يا بطلنا، لقد رأيت شجاعتك! لكن سر قوة الأبطال لا يكمن فقط في القوة الخارقة، بل في ${positiveAlternative}!" اشتعل الحماس في عيني ${name} وشعر أن طاقته تضاعفت بحضور بطله المفضل.`,
      scene3Dialogue: {
        speaker: favoriteHero,
        text: `مرحبا يا ${isGirl ? 'بطلتنا' : 'بطلنا'} ${name}! الشجاعة الحقيقية تبدأ من ${positiveAlternative}، هيا ننقذ مدينتنا معا!`
      },
      scene3Prompt: `Epic superhero arrival splash scene: ${heroEn} leaps dynamically onto the skyscraper ledge in a breathtaking three-point superhero landing pose with sparkling electric comic energy swirls. ${fixedAnchor} looks up inspired and ready for action as ${heroEn} extends an inspiring fist-bump, unveiling the secret power of planning and discipline.`,

      scene4Title: 'خطة النينجا التكتيكية والتنظيم المتقن',
      scene4Text: hasParents
        ? `اجتمع الفريق في غرفة العمليات المتقدمة، وشارك الأب والأم في ترتيب محطات المهمة بينما وقف ${favoriteHero} يشرح لـ ${name} كيف يضع خطة محكمة كفريق نينجا محترف. تدربت ${name} على سرعة البديهة والتركيز العالي، وتعلمت كيف تقسم مهمتها إلى خطوات دقيقة دون تشتت. أثبتت بطلتنا ذكاء مبهرا أدهش ${favoriteHero} الذي هتف قائلا: "أنت بطلة عبقرية وسلاحك الأقوى هو انضباطك المذهل!"`
        : `اجتمع الاثنان في مركز العمليات المتقدم فوق أحد الأبراج، وبدأ ${favoriteHero} يشرح لـ ${name} كيف يضع خطة محكمة كفريق نينجا محترف. تدرب ${name} على سرعة البديهة والتركيز العالي، وتعلم كيف يقسم مهمته إلى خطوات دقيقة دون تشتت تماما كترتيب المسؤوليات اليومية. أثبت بطلنا الصغير ذكاء مبهرا أدهش ${favoriteHero} الذي هتف قائلا: "أنت بطل عبقري وسلاحك الأقوى هو انضباطك!"`,
      scene4Dialogue: {
        speaker: favoriteHero,
        text: `الخطة متقنة يا ${name}! كل دقيقة محسوبة وكل خطوة بالتركيز تصنع نصرا عظيما!`
      },
      scene4Prompt: `High-tech superhero tactical training: side-by-side in command room, ${heroEn} and ${fixedAnchor} lean over a glowing 3D holographic city tactical map, coordinating mission steps with laser focus and blazing speed like a master ninja team, surrounded by glowing strategy charts and achievement stars.`,

      scene5Title: 'ضربة الانتصار وحماية المدينة',
      scene5Text: hasParents
        ? `دقت ساعة الصفر وانطلقت ${name} كالبرق برفقة ${favoriteHero} إلى موقع الخطر! بفضل تركيزها وانضباطها الجديد، تمكنت بطلتنا من فك شفرة فخ الأشرار في ثوان معدودة وحاصرت خطتهم بذكاء قبل أن تكتمل. استسلم الأشرار وعم الأمان شوارع المدينة، وعندما عادت إلى والديها احتضناها بفخر وسعادة غامرة معلنين أن شجاعتها وتنظيمها أنقذا الجميع.`
        : `دقت ساعة الصفر وانطلق ${name} كالبرق برفقة ${favoriteHero} إلى موقع الخطر! بفضل تركيزه وانضباطه الجديد، تمكن بطلنا من فك شفرة فخ الأشرار في ثوان معدودة وحاصر خطتهم بذكاء قبل أن تكتمل. استسلم الأشرار وعم الأمان شوارع المدينة، وهتفت الجماهير في الشوارع مشيدة بذكاء وشجاعة البطل الصغير الذي أنقذ الموقف بنفسه وتغلب على كل العقبات السابقة.`,
      scene5Dialogue: {
        speaker: name,
        text: `لقد نجحنا! بالانضباط والتركيز هزمنا الفوضى وحمينا مدينتنا الحبيبة!`
      },
      scene5Prompt: `Triumphant superhero victory scene: standing proudly on a safe city boulevard after foiling the villain traps, ${fixedAnchor} holds up the deactivated control module with victory confidence alongside ${heroEn}, cheering citizens and celebratory flares in the background.`,

      scene6Title: 'وسام حامي المدينة الذهبي',
      scene6Text: hasParents
        ? `في احتفال رسمي مهيب فوق قمة أعلى برج في المدينة ووسط وميض الأضواء الذهبية، وقف ${favoriteHero} وقدم لـ ${name} درع ووسام "حامي المدينة الذهبي" أمام والديها الفخورين. أعلن البطل أن ${name} هي بطلة الأخلاق والانضباط والذكاء، وعانق الوالدان ابنتهما مؤكدين أن أعظم بطولة هي أن تنتصر على عاداتك وتصنع مستقبلك المشرق.`
        : `في احتفال رسمي مهيب فوق قمة أعلى برج في المدينة ووسط وميض الأضواء الذهبية، وقف ${favoriteHero} أمام حشود المدينة وقدم لـ ${name} درع ووسام "حامي المدينة الذهبي". أعلن البطل أمام الجميع أن ${name} هو بطل الأخلاق والانضباط والذكاء، وأكد أن الأبواب أصبحت مفتوحة دائما أمامه لخوض أعظم البطولات.`
        ,
      scene6Dialogue: {
        speaker: favoriteHero,
        text: `فخور بك يا ${name}! ستبقى دائما رمزا للشجاعة والانضباط وقدوة لكل الأبطال!`
      },
      scene6Prompt: `Grand superhero rooftop awards celebration: under dazzling hero spotlights on a grand stage, ${heroEn} proudly places a radiant gleaming golden City Guardian medal of honor around the child's neck, glittering confetti bursts, golden stars, proud parents cheering beside them.`
    };
  } else if (storySetting === 'jungle-safari') {
    storyData = {
      coverTitle: `مغامرات مستكشف الغابة: ${isGirl ? 'البطلة' : 'البطل'} ${name} مع ${favoriteHero}`,
      coverText: `إصدار خاص وبطولة حصرية لـ ${isGirl ? 'البطلة' : 'البطل'} ${name} في أعماق الغابة العجيبة واكتشاف معبد الحكمة`,
      coverPrompt: `Epic exotic jungle explorer comic book cover. Front and center: ${fixedAnchor} wearing a safari adventurer jacket and utility belt standing side-by-side with ${heroEn} on an emerald cliff summit overlooking a breathtaking lush tropical rainforest with cascading waterfalls and ancient stone temple ruins, ${heroEn} giving a thumbs-up, golden sunbeams through canopy, cinematic 8k render.`,

      dedicationTitle: 'رسالة حب من قاعدة المستكشفين',
      dedicationText: childProfile.parentDedication || `يا ${isGirl ? 'بطلتنا الغالية' : 'بطلنا الغالي'} ${name}، رحلة الحياة كالغابة الواسعة، ونحن فخورون بذكائك وشجاعتك وواثقون أنك ستصل إلى قمة المجد دائما.`,
      dedicationPrompt: `Heartwarming explorer family basecamp portrait. ${fixedAnchor} sitting happily beside a cozy safari tent under lush green trees, studying an ancient golden treasure map with smiling proud parents, warm lantern glow, exotic jungle nature atmosphere.`,

      scene1Title: 'الدخول إلى وادي الأسرار العجيب',
      scene1Text: hasParents
        ? `مع شروق شمس ذهبية تخترق أشجار الغابة الاستوائية العملاقة، استيقظت بطلتنا ${name} في معسكر العائلة. جهز الوالدان حقائب الاستكشاف وناقشا معها خطة المسير، لكن ${name} كانت منشغلة بملاحقة الفراشات وتأجيل تجهيز بوصلتها. نصحها والداها برفق مؤكدين أن الغابة العجيبة تكافئ من يرتب أدواته ويستعد مبكرا. أدركت ${name} أن المغامرة الكبيرة تحتاج إلى نظام وتركيز لتجنب الضياع في وادي الأسرار.`
        : `مع شروق شمس ذهبية تخترق أشجار الغابة الاستوائية العملاقة، استيقظ ${isGirl ? 'بطلتنا' : 'بطلنا'} ${name} وسط أصوات الطيور الملونة والقرود العجيبة. كان عليه تجهيز حقيبة الاستكشاف وبوصلته، لكنه كان يواجه تحديا في ${behaviorDescription}. أدرك ${name} أن الغابة الكثيفة مليئة بالأسرار التي تتطلب نباهة وانتباها لكل خطوة، وأن التراخي قد يجعله يضل الطريق الموصل إلى معبد الحكمة القديم.`,
      scene1Dialogue: {
        speaker: name,
        text: `سأرتب أدواتي وأجهز حقيبتي جيدا لأكون مستكشفا حقيقيا لا يضل طريقه أبدا!`
      },
      scene1Prompt: `Lush morning tropical rainforest trail: ${fixedAnchor} sets out into the dense emerald jungle surrounded by giant ancient trees, exotic colorful birds, and playful monkeys on vines, excitedly packing explorer tools and compass with determination.`,

      scene2Title: 'لغز الجسر المعلق والنهر الهادر',
      scene2Text: hasParents
        ? `وصلت العائلة إلى واد سحيق يمر تحته نهر هادر، ولم يكن هناك سوى جسر خشبي معلق تتطلب عبوره حل شفرة الرموز المنقوشة على الصخور القديمة. شعر الجميع بصعوبة الموقف مع تساقط حبات المطر الاستوائية، ووضعت الأم يدها على كتف ${name} لتشجيعها، بينما راقب الأب الصخور بحرص. علمت ${name} أن التسرع لن ينفع، وأن الصبر والتركيز هما المفتاح الوحيد لفك الشفرة وتأمين عبور الجميع بسلام.`
        : `مع تقدم المسير وصل ${name} إلى واد سحيق يمر تحته نهر هادر، ولم يكن هناك سوى جسر خشبي قديم تتطلب عبوره حل شفرة الرموز المنقوشة على الصخور. شعر بطلنا الصغير بالحيرة والتردد مع تساقط حبات المطر الخفيفة، وأحس بأن التسرع أو التأجيل لن يحل المشكلة. وقف بثبات على حافة الوادي وهو يفكر كيف يجمع شجاعته وتركيزه لعبور هذا التحدي الكبير.`,
      scene2Dialogue: {
        speaker: name,
        text: `لا بد من حل لغز الرموز بالصبر والتركيز، فالشجاعة تصنع المعجزات!`
      },
      scene2Prompt: `Dramatic jungle obstacle at a deep canyon: ${fixedAnchor} stands before a mossy wooden suspension bridge over a rushing river waterfall, studying ancient carved stone glyphs with thoughtful concentration and patience amidst tropical mist.`,

      scene3Title: 'قفزة البطل بين الأغصان العملاقة',
      scene3Text: hasParents
        ? `فجأة ومن بين قمم الأشجار الشاهقة، هبط ${favoriteHero} بخفة ورشاقة استثنائية واستقر على صخرة كبيرة أمام الأسرة وهو يبتسم بحماس وسط دهشتهم وترحيبهم! صافح البطل الوالدين وقال لـ ${name}: "أهلا بك يا بطلة الأدغال! الغابة تكشف كنوزها فقط لمن يمتلك ${positiveAlternative}!" شعرت ${name} بارتياح كبير وأدركت أن هذه الرحلة ستغير عاداتها إلى الأفضل دائما.`
        : `فجأة ومن بين قمم الأشجار الشاهقة، هبط ${favoriteHero} بخفة ورشاقة استثنائية واستقر على صخرة كبيرة أمام ${name} وهو يبتسم بحماس! قال البطل لرفيقه الصغير: "أهلا بك يا بطل الأدغال! الغابة تكشف كنوزها فقط لمن يمتلك ${positiveAlternative}!" شعر ${name} بارتياح كبير وتجدد أمله، وعلم أن هذه المغامرة ستكون نقطة تحول في حياته كلها.`,
      scene3Dialogue: {
        speaker: favoriteHero,
        text: `مرحبا يا ${name}! المستكشف الحقيقي سر قوته في ${positiveAlternative}، هيا نكمل المسير معا!`
      },
      scene3Prompt: `Epic jungle superhero arrival: ${heroEn} swings gracefully from giant canopy vines, making a dynamic heroic landing on a mossy rock in front of ${fixedAnchor}, offering an encouraging hand and unveiling the explorer secret of patience and discipline.`,

      scene4Title: 'أسرار البوصلة وفنون المستكشف الشجاع',
      scene4Text: hasParents
        ? `جلس الفريق بجوار نبع ماء عذب، وبدأ ${favoriteHero} يعلم ${name} أسرار الملاحة البرية وكيف ترتب أولوياتها بدقة. شارك الوالدان في متابعة العلامات الإرشادية، بينما تعلمت ${name} كيف تركز نظرها على المسار الصحيح وتتجنب المشتتات. كانت عيناها تلمعان بالفطنة وسرعة التعلم، وأثبتت أنها قادرة على مواجهة أي عقبة في الأدغال بالانضباط والتخطيط السليم.`
        : `جلس ${favoriteHero} مع ${name} بجوار نبع ماء عذب، وبدأ يعلمه أسرار الملاحة البرية وكيف يرتب أولوياته تماما كترتيب خطوات التخييم. تعلم ${name} كيف يركز نظره على المسار الصحيح ويتجنب المشتتات، وكيف يحلل الخريطة خطوة بخطوة. كانت عينا الطفل تلمعان بالفطنة وسرعة التعلم، وأثبت أنه قادر على مواجهة أي عقبة بالانضباط والتخطيط السليم.`,
      scene4Dialogue: {
        speaker: favoriteHero,
        text: `البوصلة تشير إلى الأمام، وخريطة التركيز ترشدنا مباشرة نحو قمة النجاح!`
      },
      scene4Prompt: `Jungle navigation training session: sitting beside a crystalline waterfall, ${heroEn} and ${fixedAnchor} study a glowing golden compass and detailed papyrus map together, learning to navigate the wild trail step-by-step with sharp focus, friendly jungle animals watching.`,

      scene5Title: 'حل اللغز الكبير وفتح معبد الحكمة',
      scene5Text: hasParents
        ? `وصل الجميع إلى بوابة معبد الحكمة الحجري المهيب المغلق منذ قرون. وبفضل التركيز الشديد والهدوء الذي تدربت عليه، استطاعت ${name} تدوير الأقراص الحجرية بالترتيب الصحيح بدقة مذهلة، فانفتحت الأبواب الضخمة ببريق ذهبي دافئ معلنة العثور على جوهرة المعرفة التي تنير الغابة كلها! احتضن الوالدان ابنتهما بفرحة عارمة وصفق ${favoriteHero} بفخر.`
        : `وصل الفريق إلى بوابة معبد الحكمة الحجري المهيب المغلق منذ قرون. وبفضل التركيز الشديد والهدوء الذي تدرب عليه، استطاع ${name} تدوير الأقراص الحجرية بالترتيب الصحيح بدقة مذهلة، فانفتحت الأبواب الضخمة ببريق ذهبي دافئ معلنة العثور على جوهرة المعرفة التي تنير الغابة كلها! احتفل ${favoriteHero} بصديقه الصغير الذي أنجز المهمة بكل اقتدار.`,
      scene5Dialogue: {
        speaker: name,
        text: `لقد فُتحت البوابة بفضل التركيز والعمل الجاد! نحن أبطال الطبيعة الحقيقيون!`
      },
      scene5Prompt: `Triumphant ancient temple breakthrough: the giant carved stone doors of the ancient sanctuary swing open as golden radiant light pours out, ${fixedAnchor} holding up the legendary glowing wisdom gem in proud victory alongside cheering ${heroEn}.`,

      scene6Title: 'تتويج بطل الطبيعة ومستكشف الغابة الأعظم',
      scene6Text: hasParents
        ? `على قمة تلة خضراء تطل على الغابة الساحرة عند الغروب، أقام ${favoriteHero} احتفال التتويج، وعلق حول عنق ${name} وسام "مستكشف الغابة الأعظم" المنقوش عليه شارة الشجاعة والانضباط. عانق الوالدان ابنتهما بفخر وسعادة غامرة، وعلمت ${name} أن أعظم كنز في رحلتها كان اكتشافها لقدرتها على التحكم في عاداتها وتحقيق النجاح بتفوق.`
        : `على قمة تلة خضراء تطل على الغابة الساحرة عند الغروب، أقام ${favoriteHero} احتفال التتويج، وعلق حول عنق ${name} وسام "مستكشف الغابة الأعظم" المنقوش عليه شارة الشجاعة والانضباط. عانق الوالدان ابنهما بفخر وسعادة غامرة، وعلم ${name} أن أعظم اكتشاف في رحلته لم يكن المعبد، بل اكتشافه لقدرته على التحكم في عاداته وتحقيق النجاح بتفوق.`,
      scene6Dialogue: {
        speaker: favoriteHero,
        text: `هنيئا لك يا ${name}، وسام الشجاعة والانضباط يليق بك دائما!`
      },
      scene6Prompt: `Sunset mountain summit ceremony: ${heroEn} proudly places an ornate golden leaf and compass Master Explorer medallion around ${fixedAnchor}'s neck, golden hour sunset over emerald jungle canopy, soaring colorful birds, beaming proud parents.`
    };
  } else if (storySetting === 'space-odyssey') {
    storyData = {
      coverTitle: `مغامرات فارس المجرات: ${isGirl ? 'البطلة' : 'البطل'} ${name} مع ${favoriteHero}`,
      coverText: `إصدار خاص وبطولة حصرية لـ ${isGirl ? 'البطلة' : 'البطل'} ${name} في أعماق الفضاء الكوني وقيادة مركبة النجوم`,
      coverPrompt: `Epic cosmic space odyssey comic book cover. Front and center: ${fixedAnchor} wearing a sleek high-tech futuristic astronaut adventurer suit standing beside ${heroEn} on the flight deck of a star cruiser overlooking glowing galactic nebulas, ringed planets, and cosmic stars, cinematic sci-fi lighting, 8k render.`,

      dedicationTitle: 'رسالة فخر من محطة الفضاء الكونية',
      dedicationText: childProfile.parentDedication || `يا ${isGirl ? 'بطلتنا الغالية' : 'بطلنا الغالي'} ${name}، عقول الأبطال تتألق كالنجوم في السماء، ونحن فخورون بذكائك وواثقون أنك ستصل إلى أبعد الآفاق.`,
      dedicationPrompt: `Heartwarming family observation deck portrait. ${fixedAnchor} standing happily beside proud mother and father looking through the panoramic glass of a space station at sparkling star constellations, warm golden cabin lighting.`,

      scene1Title: 'إنذار الملاحة وسرعة الانتباه',
      scene1Text: hasParents
        ? `على متن مركبة النجوم الفضائية المتطورة كانت بطلتنا ${name} تستمتع بمشاهدة الكواكب اللامعة، بينما كان والداها في قمرة القيادة يجهزان إحداثيات المسار الكوني. لكن ${name} كانت تتكاسل عن تسجيل بيانات الملاحة ومراجعة أجهزتها، مما جعل والديها ينبهانها بحرص إلى أن دقة العمل والانضباط هما أمان الرحلة الفضائية. وفجأة ومضت أضواء الطوارئ في القمرة معلنة اقتراب حزام كويكبات غامض يتطلب تدخلا دقيقا.`
        : `على متن مركبة النجوم الفضائية المتطورة كان ${isGirl ? 'بطلتنا' : 'بطلنا'} ${name} يستمتع بمشاهدة الكواكب اللامعة والمجرات البعيدة. كان عليه مراجعة أجهزة الملاحة وتجهيز سجلات الرحلة، لكنه كان يواجه تحديا في ${behaviorDescription}. وفجأة ومضت شاشات القمرة بإشارات طوارئ معلنة اقتراب حزام كويكبات غامض يتطلب تركيزا فوريا وهدوءا شجاعا للتعامل مع هذا التحدي الكوني الكبير.`,
      scene1Dialogue: {
        speaker: name,
        text: `سأرتب حساباتي وأتحكم في مسار المركبة بكل هدوء ودقة لإنجاح المهمة الفضائية!`
      },
      scene1Prompt: `Futuristic starship control cabin: ${fixedAnchor} sits before interactive holographic screens and star-charts, preparing for a galactic journey, outside the window a distant sparkling galaxy shines brightly.`,

      scene2Title: 'حزام الكويكبات واختبار الدقة',
      scene2Text: hasParents
        ? `اقتربت الكويكبات بسرعة وتطلب الموقف حسابات رياضية دقيقة لتوجيه دروع المركبة وتفادي الاصطدام. وقفت الأم إلى جانب ${name} تشجعها على استجماع هدوئها، بينما ضبط الأب محركات الدفع. شعرت ${name} بأن التسرع أو الارتباك قد يهدد سلامة الجميع، فأخذت نفسا عميقا وركزت بصرها على الشاشات الهولوغرافية متذكرة أن الانضباط والنظام يمنحان العقل صفاء لا يقهر.`
        : `اقتربت الكويكبات بسرعة وتطلب الموقف حسابات رياضية دقيقة لتوجيه دروع المركبة وتفادي الاصطدام في المسار الضيق. شعر ${name} بضغط الوقت والمسؤولية، وتذكر أن التشتت أو التكاسل قد يضيع فرصة النجاة. وقف بطلنا الصغير أمام منصة القيادة وهو يجمع تركيزه وعزيمته، متذكرا أن الأبطال الحقيقيين يثبتون في اللحظات الحاسمة ويواجهون التحديات بتخطيط مدروس.`,
      scene2Dialogue: {
        speaker: name,
        text: `التركيز هو درعنا الأقوى! سأحسب مسار النجاة بدقة ولن أسمح لأي خطأ أن يحدث!`
      },
      scene2Prompt: `Dramatic deep space alert: cosmic asteroid belt appears outside the spacecraft viewport with flashing blue navigation emergency lights, ${fixedAnchor} analyzes the flight course on glowing holographic consoles with steady courage and focus.`,

      scene3Title: 'رسو البطل وسر القوة الكونية',
      scene3Text: hasParents
        ? `في تلك اللحظة الحرجة هبطت مركبة استكشافية سريعة والتحمت بقمرة النجوم، وانفتح الباب ليظهر ${favoriteHero} ببدلته الفضائية اللامعة وابتسامته الواثقة! حيا البطل الأسرة بحرارة وقال لـ ${name}: "يا بطلة الفضاء، الذكاء بلا نظام مثل مركبة بلا وقود! إن سر قوة فرسان المجرات الحقيقي يكمن في ${positiveAlternative}!" غمرت الثقة قلب ${name} وشعرت بحماس كبير لتخطي العقبة.`
        : `في تلك اللحظة الحرجة هبطت مركبة استكشافية سريعة والتحمت بقمرة النجوم، وانفتح الباب ليظهر ${favoriteHero} ببدلته الفضائية اللامعة وابتسامته الواثقة! ربت البطل على كتف ${name} وقال له: "يا بطل الفضاء، الذكاء بلا نظام مثل مركبة بلا وقود! إن سر قوة فرسان المجرات الحقيقي يكمن في ${positiveAlternative}!" غمرت الثقة قلب ${name} وشعر بحماس هائل لتخطي العقبة.`,
      scene3Dialogue: {
        speaker: favoriteHero,
        text: `مرحبا يا ${name}! سر قيادة سفن النجوم يكمن في ${positiveAlternative}، هيا نعبر معا!`
      },
      scene3Prompt: `Epic space hero arrival: ${heroEn} docks in a swift starfighter and steps onto the bridge in sparkling light energy, greeting ${fixedAnchor} with a confident fist-bump and revealing that order and discipline are the true navigational superpower.`,

      scene4Title: 'تدريب الملاحة على الشاشات الهولوغرافية',
      scene4Text: hasParents
        ? `جلس ${favoriteHero} مع ${name} أمام شاشات الهولوغرام وبدأ يدربها على فنون المناورة الفضائية وحساب المتجهات خطوة بخطوة. شارك الوالدان في تسجيل البيانات، بينما أظهرت ${name} براعة فائقة في تنظيم الأولويات وسرعة الاستجابة. تعلمت كيف تضبط وقت كل إجراء دون أي ارتباك، وأشاد ${favoriteHero} بذكائها وانضباطها الذي جعل منها قائدة فضاء حقيقية يعتمد عليها.`
        : `جلس ${favoriteHero} مع ${name} أمام شاشات الهولوغرام وبدأ يدربه على فنون المناورة الفضائية وحساب المتجهات خطوة بخطوة. تدرب بطلنا على توجيه الدوافع بحسابات دقيقة دون تشتت، وتعلم كيف يقسم مهمته المعقدة إلى خطوات بسيطة متتالية. أظهر ${name} براعة فائقة في سرعة الاستجابة وأشاد ${favoriteHero} بذكائه وانضباطه الذي جعل منه قائد فضاء حقيقيا يعتمد عليه في أدق المهمات.`,
      scene4Dialogue: {
        speaker: favoriteHero,
        text: `المسار مضبوط والإحداثيات واضحة! بانضباطك يا ${name} سنعبر حزام الكويكبات بسلام!`
      },
      scene4Prompt: `High-tech spacecraft helm training: ${heroEn} guides ${fixedAnchor} at the holographic navigation helm, calculating orbital vectors with blazing precision and ninja focus, glowing star-charts and flight vectors.`,

      scene5Title: 'العبور التاريخي واكتشاف السديم البلوري',
      scene5Text: hasParents
        ? `تولت ${name} مقبض القيادة بثبات وشجاعة، وبفضل تنظيمها وتركيزها العالي قادت المركبة عبر الممرات الآمنة بين الكويكبات بمهارة مذهلة أذهلت الجميع! انقشعت الغيوم الكونية لتكشف عن سديم بلوري براق مفعم بالألوان الزاهية وكوكب جديد ينبض بالحياة. عانق الوالدان ابنتهما بفخر واعتزاز، وهتف الجميع احتفالا بانتصارها الكبير على التكاسل والارتباك.`
        : `تولى ${name} مقبض القيادة بثبات وشجاعة، وبفضل تنظيمه وتركيزه العالي قاد المركبة عبر الممرات الآمنة بين الكويكبات بمهارة مذهلة أذهلت ${favoriteHero}! انقشعت الغيوم الكونية لتكشف عن سديم بلوري براق مفعم بالألوان وكوكب جديد ينبض بالحياة والجمال. هتف البطل مشيدا بشجاعة صديقه الصغير الذي انتصر على عاداته القديمة وأثبت أنه بطل حقيقي.`
        ,
      scene5Dialogue: {
        speaker: name,
        text: `لقد نجحنا في العبور! بالتركيز والنظام فتحنا آفاقا جديدة واكتشفنا كوكبا رائعا!`
      },
      scene5Prompt: `Triumphant galactic navigation victory: ${fixedAnchor} smoothly steers the star cruiser through the asteroid passage into a breathtaking crystal-clear nebula, cheering with arms raised in victory at the helm alongside ${heroEn}.`,

      scene6Title: 'وسام فارس المجرات الذهبي',
      scene6Text: hasParents
        ? `في صالة الرصد البانورامية للمركبة وأمام مشهد النجوم الساحرة، علق ${favoriteHero} على صدر ${name} وسام "فارس المجرات الذهبي" تقديرا لشجاعتها وانضباطها القيادي. وقف الوالدان يبتسمان بسعادة غامرة وهما يشاهدان بطلتهما تتوج رمزا للتفوق والأخلاق، وعلمت ${name} أن أعظم رحلة هي رحلة بناء النفس والتغلب على الصعاب بالعلم والعمل الجاد.`
        : `في صالة الرصد البانورامية للمركبة وأمام مشهد النجوم الساحرة، علق ${favoriteHero} على صدر ${name} وسام "فارس المجرات الذهبي" تقديرا لشجاعته وانضباطه القيادي. وقف الجميع يصفقون بحرارة للبطل الصغير الذي أصبح قدوة لكل الأطفال في الشجاعة والنظام، وعلم ${name} أن أعظم رحلة هي رحلة بناء النفس والتغلب على الصعاب بالعلم والعمل الجاد.`
        ,
      scene6Dialogue: {
        speaker: favoriteHero,
        text: `فخور بك يا فارس المجرات ${name}! ستبقى دائما نجما لامعا في سماء البطولة!`
      },
      scene6Prompt: `Galactic Guardian honor coronation: on the grand observation deck overlooking a golden binary sunset and cosmic stars, ${heroEn} pins a radiant golden star-shaped Galactic Guardian medal onto ${fixedAnchor}'s suit, celebration confetti and light sparks.`
    };
  } else if (storySetting === 'fantasy-magic') {
    storyData = {
      coverTitle: `مغامرات الفارس الشجاع: ${isGirl ? 'البطلة' : 'البطل'} ${name} مع ${favoriteHero}`,
      coverText: `إصدار خاص وبطولة حصرية لـ ${isGirl ? 'البطلة' : 'البطل'} ${name} في مملكة الفانتازيا وحماية جوهرة النور`,
      coverPrompt: `Epic fantasy adventure comic book cover. Front and center: ${fixedAnchor} in a royal adventurer tunic and cape standing proudly beside ${heroEn} in gleaming knight armor before a majestic enchanted castle with towering crystal spires under an aurora borealis sky, cinematic fantasy lighting, 8k render.`,

      dedicationTitle: 'رسالة شرف من قلعة الملوك',
      dedicationText: childProfile.parentDedication || `يا ${isGirl ? 'بطلتنا الغالية' : 'بطلنا الغالي'} ${name}، الشجاعة والأمانة هما أثمن تيجان الأبطال، ونحن فخورون بقلبك النقي وذكائك دائما.`,
      dedicationPrompt: `Heartwarming royal family library portrait. ${fixedAnchor} sitting cozily before an ornate stone fireplace in a grand castle room, reading an illuminated golden scroll between smiling proud parents, warm glowing candlelight.`,

      scene1Title: 'جوهرة النور وأمانة الفرسان',
      scene1Text: hasParents
        ? `في قلعة الفرسان المهيبة كانت بطلتنا ${name} تستمتع بجمال الأبراج الساحرة والحدائق المعلقة. كان الوالدان يشاركان في حراسة القلعة، وذكراها بأن جوهرة النور تحتاج إلى رعاية دائمة، لكن ${name} كانت تنشغل باللعب مع طيور القلعة وتأجيل واجباتها. فجأة بدأت أضواء الجوهرة تخفت على برجها، وأدرك الجميع أن التكاسل قد يسمح لظلال المتاهة بالاقتراب، مما جعل ${name} تشعر بضرورة المبادرة السريعة.`
        : `في قلعة الفرسان المهيبة كان ${isGirl ? 'بطلتنا' : 'بطلنا'} ${name} يستمتع بجمال الأبراج الساحرة والحدائق المعلقة. كان مؤتمنا على رعاية جوهرة النور التي تحمي المملكة، لكنه كان يواجه تحديا في ${behaviorDescription}. وفجأة بدأت أضواء الجوهرة تخفت على برجها معلنة اقتراب ظلال المتاهة الغامضة! شعر ${name} بالمسؤولية الكبيرة وأدرك أن الأمانة والشجاعة تتطلبان منه ترك التكاسل فورا والنهوض للدفاع عن المملكة.`,
      scene1Dialogue: {
        speaker: name,
        text: `أمانة القلعة مسؤوليتي! سأرتب مهامي وأحمي جوهرة النور بكل إخلاص وشجاعة!`
      },
      scene1Prompt: `Enchanted castle tower chamber: ${fixedAnchor} in adventurer tunic stands near an ancient stained-glass window beside an ornate pedestal holding the Kingdom's glowing Light Gem, preparing for a noble quest with curiosity and courage.`,

      scene2Title: 'متاهة الغابة المسحورة واختبار الصبر',
      scene2Text: hasParents
        ? `خرجت العائلة باتجاه الغابة المسحورة للبحث عن مفتاح تجديد النور، فوجدوا أنفسهم أمام متاهة من الأشواك المضيئة والأبواب الحجرية المغلقة بألغاز قديمة. شجع الأب ابنته على الهدوء، بينما ذكرتها الأم بأن الصبر والصدق يفتحان كل باب مغلق. علمت ${name} أن الغضب أو الاستعجال لن يفيدا، فوقفت بهدوء تتأمل الرموز المنقوشة لتبدأ حلها خطوة بخطوة بعزيمة واثقة.`
        : `خرج ${name} باتجاه الغابة المسحورة للبحث عن مفتاح تجديد النور، فوجد نفسه أمام متاهة من الأشواك المضيئة والأبواب الحجرية المغلقة بألغاز قديمة. شعر بطلنا الصغير بصعوبة التحدي، لكنه تذكر أن التراجع لن ينقذ القلعة. وقف بثبات على مدخل المتاهة يتأمل الرموز بحكمة وصبر، متذكرا أن الشجاعة الحقيقية تبدأ من الهدوء وترتيب الأفكار بحكمة قبل اتخاذ أي خطوة.`,
      scene2Dialogue: {
        speaker: name,
        text: `الألغاز لا تُحل بالتسرع، بل بالصبر والتفكير المنظم! سأجد المفتاح الصائب!`
      },
      scene2Prompt: `Mystical maze obstacle in the ancient forest: ${fixedAnchor} stands before a gateway of glowing enchanted brambles and riddle stones, analyzing the magical pattern with patient focus and calm wisdom as mystical mist swirls.`,

      scene3Title: 'ظهور الفارس الخارق وسر الشجاعة الحقيقية',
      scene3Text: hasParents
        ? `أضاءت الغابة ببريق ذهبي مبهر وانفتحت بوابة ضوئية سحرية خرج منها ${favoriteHero} بدرعه الفضي البراق وسيف الشجاعة وهو يبتسم بحرارة للأهل وبطلتهم! قال البطل لـ ${name}: "أيتها البطلة الصغيرة، السحر الحقيقي ليس في العصي السحرية، بل في ${positiveAlternative}!" أحست ${name} بدفء وثقة كبيرة تسري في قلبها، وعلمت أن حضور بطلها هو بداية عهد جديد من التميز.`
        : `أضاءت الغابة ببريق ذهبي مبهر وانفتحت بوابة ضوئية سحرية خرج منها ${favoriteHero} بدرعه الفضي البراق وابتسامته الدافئة! ربت البطل على كتف ${name} وقال له: "أيها الفارس الصغير، القوة الحقيقية لا تكمن في السيوف الخارقة، بل في ${positiveAlternative}!" أحس ${name} بثقة كبيرة تسري في قلبه، وعلم أن وجود بطله المفضل بجانبه هو بداية عهد جديد من الشجاعة والإنجاز.`
        ,
      scene3Dialogue: {
        speaker: favoriteHero,
        text: `مرحبا يا ${name}! سر فرسان المملكة الحقيقي يكمن في ${positiveAlternative}، هيا ننقذ القلعة معا!`
      },
      scene3Prompt: `Epic magical entrance: ${heroEn} steps through a radiant portal of shimmering golden light in gleaming heroic knight armor, saluting ${fixedAnchor} with a proud smile, teaching that true magic flows from honesty, discipline, and courage.`,

      scene4Title: 'مخطوطات الحكمة والتدريب الملكي',
      scene4Text: hasParents
        ? `في مكتبة القلعة العريقة فتح ${favoriteHero} أمام ${name} مخطوطات الفرسان القديمة، وبدأ يدربها على فنون التركيز الصارم وترتيب خطوات العمل. شارك الوالدان في إعداد جدول الفضائل اليومية، وتدربت ${name} على حل المسائل والألغاز بسرعة مدهشة وتركيز متواصل دون أي تشتت، لتثبت للجميع أنها تمتلك عقل فارس حقيقي يجمع بين الحكمة والعمل الدؤوب.`
        : `في مكتبة القلعة العريقة فتح ${favoriteHero} أمام ${name} مخطوطات الفرسان القديمة، وبدأ يدربه على فنون التركيز الصارم وترتيب خطوات العمل. تدرب بطلنا الصغير على حل الألغاز المعقدة بسرعة مدهشة وتركيز متواصل دون تشتت، وتعلم كيف يقهر رغبة المماطلة ويحول كل تحد إلى انتصار، ليثبت للجميع أنه يمتلك عقل فارس حقيقي يجمع بين الحكمة والعمل الدؤوب.`,
      scene4Dialogue: {
        speaker: favoriteHero,
        text: `المخطوطة واضحة وعزيمتك قوية يا ${name}! بالانضباط ستكسر كل الظلال وتعيد النور!`
      },
      scene4Prompt: `Enchanted library scroll study and virtue training: ${heroEn} and ${fixedAnchor} study ancient glowing wisdom scrolls together, mastering spells of focus and perseverance with floating golden glyphs and magical starlight.`,

      scene5Title: 'استعادة جوهرة النور وانتصار المملكة',
      scene5Text: hasParents
        ? `انطلقت ${name} بثقة إلى قلب المتاهة ووضعت المفتاح الذهبي في مكانه الصحيح بهدوء متقن! تفجرت موجات من الضياء الذهبي الصافي أزاحت كل الظلال وأعادت لجوهرة النور بريقها الأسطوري لتضيء سماء المملكة بأسرها. احتضن الوالدان بطلتهما بفرحة غامرة، وهتف أهل القلعة معبرين عن فخرهم بشجاعة وإخلاص الفتاة الصغيرة التي أنقذت الجميع بذكائها.`
        : `انطلق ${name} بثقة إلى قلب المتاهة ووضع المفتاح الذهبي في مكانه الصحيح بهدوء متقن! تفجرت موجات من الضياء الذهبي الصافي أزاحت كل الظلال وأعادت لجوهرة النور بريقها الأسطوري لتضيء سماء المملكة بأسرها. هتف ${favoriteHero} وكل فرسان القلعة معبرين عن فخرهم بشجاعة وإخلاص البطل الصغير الذي أنقذ المملكة بذكائه وتنظيمه المتقن.`
        ,
      scene5Dialogue: {
        speaker: name,
        text: `لقد عاد النور للمملكة! بالصبر والاجتهاد والأمانة انتصرنا على كل الظلال!`
      },
      scene5Prompt: `Triumphant restoration of the Light Gem: ${fixedAnchor} places the restored radiant crystal on the central altar, sending brilliant waves of golden light dispelling darkness across the fantasy kingdom, joyful victory stance alongside ${heroEn}.`,

      scene6Title: 'تتويج فارس الشرف الملكي',
      scene6Text: hasParents
        ? `في بهو العرش العظيم وتحت الرايات الملكية الفاخرة، تقدم الملك و${favoriteHero} وتوجا ${name} بوشاح الشرف ووسام "فارس القلعة الذهبي". وقف الوالدان يمسكان بيد ابنتهما البطلة بفخر واعتزاز لا يوصف، وعلمت ${name} أن أعظم وسام يحمله الإنسان هو وسام الخلق الرفيع والانضباط الصادق الذي ينير كل دروب الحياة.`
        : `في بهو العرش العظيم وتحت الرايات الملكية الفاخرة، تقدم الملك و${favoriteHero} وتوجا ${name} بوشاح الشرف ووسام "فارس القلعة الذهبي". وقف الجميع ينحنون احتراما للبطل الصغير الذي قاد المملكة نحو النصر بأخلاقه وانضباطه، وعلم ${name} أن أعظم وسام يحمله الإنسان هو وسام الخلق الرفيع والانضباط الصادق الذي ينير كل دروب الحياة.`
        ,
      scene6Dialogue: {
        speaker: favoriteHero,
        text: `فخور بك يا فارس الشرف ${name}! ستبقى دائما قدوة في الأمانة والإقدام!`
      },
      scene6Prompt: `Grand royal throne room coronation: amidst majestic velvet banners and royal fanfare, ${heroEn} places a radiant golden Knight of Honor medal and laurel around ${fixedAnchor}'s neck, proud cheering parents and royal courtiers celebrating.`
    };
  } else {
    // realistic-daily (القصة الواقعية اليومية في المنزل والمدرسة)
    storyData = {
      coverTitle: `مغامرات ${isGirl ? 'البطلة' : 'البطل'} ${name} مع ${favoriteHero}`,
      coverText: `إصدار خاص وبطولة حصرية لـ ${isGirl ? 'البطلة' : 'البطل'} ${name} برفقة ${favoriteHero}`,
      coverPrompt: `Epic superhero comic book cover. Front center: ${fixedAnchor} wearing modern smart adventurer clothes with cape beside ${heroEn} in an iconic dynamic hero pose giving a proud thumbs-up. ${hasParents ? 'In the background: loving father and mother cheering with beaming pride. ' : ''}Golden starbursts, comic title banner space, vibrant heroic city background, dramatic cinematic lighting, masterpiece.`,

      dedicationTitle: 'رسالة حب وإهداء من الوالدين',
      dedicationText: childProfile.parentDedication || `يا ${isGirl ? 'بطلتنا الغالية' : 'بطلنا الغالي'} ${name} نحن فخورون بك وبذكائك في كل خطوة تخطوها وواثقون أنك ستكون ${isGirl ? 'بطلة متميزة' : 'بطلا متميزا'} دائما.`,
      dedicationPrompt: `Heartwarming family comic portrait. Front center: ${fixedAnchor} warmly surrounded by loving parents, cozy warm golden lighting, joyful home environment, comic illustration.`,

      scene1Title: 'بداية المغامرة في منزل الأبطال',
      scene1Text: hasParents
        ? `في صباح يوم مشرق استيقظت بطلتنا الصغيرة ${name} وهي تشعر بحماس كبير لبدء مغامرة جديدة في منزلها الجميل. دخلت والدتها إلى الغرفة وهي تبتسم بحنان لتطمئن عليها بينما كان والدها في الصالة يجهز الفطور ويناديها برفق لتبدأ يومها بنشاط. لكن ${name} كانت منشغلة بالتفكير في ألعابها ومحاولة تأجيل واجباتها ومهامها المدرسية، مما جعل والديها يتحدثان معها بحرص واهتمام حول أهمية استثمار الوقت والتخطيط لكل عمل حتى تصبح مستعدة دائما للمهمات الكبيرة.`
        : `في صباح يوم جميل استيقظ ${isGirl ? 'بطلتنا الذكية' : 'بطلنا الذكي'} ${name} وهو يمتلك طاقة هائلة وابتسامة واثقة تملأ وجهه الصغير. جلس في غرفته المليئة بالقصص المصورة والألعاب وهو يفكر كيف يقضي وقته، لكنه كان يغفل عن شيء أساسي يتعلق بـ ${behaviorDescription}. كانت المهام المدرسية والواجبات تتراكم أمامه على المكتب بينما هو يفضل الاستمرار في اللعب وتأجيل كل شيء لآخر لحظة.`,
      scene1Dialogue: {
        speaker: hasParents ? 'الأب' : name,
        text: hasParents
          ? `يا ${isGirl ? 'بطلتنا' : 'بطلنا'} تنظيم الوقت وإنجاز الواجبات أولا هو سر قوة الأبطال الحقيقية!`
          : `سأرتب ألعابي وكتبي لأكون ${isGirl ? 'مستعدة' : 'مستعدا'} لكل التحديات القادمة!`
      },
      scene1Prompt: `Dynamic action comic panel. Morning bedroom scene: ${fixedAnchor} sits on a colorful rug playfully distracted by buildable robot toys and games, with an open backpack and scattered textbooks nearby. ${hasParents ? 'Mother in modern pastel outfit stands at doorway holding school schedule with a warm encouraging smile, while father waves supportively from breakfast table in hallway. ' : ''}Sunlight streams through window, playful tension between fun and school duties, rich dynamic storytelling environment.`,

      scene2Title: 'لحظة التحدي غير المتوقعة',
      scene2Text: hasParents
        ? `مع مرور ساعات النهار واقتراب موعد تسليم المهمة المدرسية بدأت الأمور تتعقد ووجدت ${name} نفسها أمام كومة من الكتب والأدوات المبعثرة. جلس الأب بجانبها في المكتب ووضع يده على كتفها بهدوء وقال لها إن كل دقيقة تضيع تجعل التحدي أصعب، بينما دخلت الأم وهي تحمل حقيبتها المدرسية وتذكرها بأن الفريق الناجح يتعاون وينظم وقته معا. وفجأة سمع الجميع صوتا غامضا يتردد خارج النافذة مع وميض أزرق لامع.`
        : `في منتصف اليوم وجد ${name} نفسه في ورطة غير متوقعة كادت تفقده فرصة المشاركة في مسابقة مدرسية كان يحلم بها منذ أسابيع. الوقت أصبح ضيقا والدروس بحاجة إلى تركيز عميق، وشعر بطلنا بالضغط والتوتر وبأن التراخي جعله يتأخر عن زملائه. وفي تلك اللحظة الحرجة التي كاد فيها يفقد الأمل، أضاءت الغرفة ببريق ساطع وظهرت شارة بطولية عملاقة على جدار الغرفة تعلن عن وصول شخصية أسطورية.`,
      scene2Dialogue: {
        speaker: name,
        text: 'لن أستسلم أبدا، وسأتعلم كيف أواجه هذا التحدي بشجاعة وإصرار كبير!'
      },
      scene2Prompt: `High drama comic book panel. Afternoon deadline obstacle: ${fixedAnchor} sits at study desk facing steep stack of homework and notebooks, looking determined yet pressured as wall clock ticks. ${hasParents ? 'Supportive father sits beside placing encouraging hand on child shoulder, while mother holds schoolbag offering reassurance. ' : ''}Suddenly outside window, a brilliant glowing blue superhero emblem and heroic lightning flash illuminate room, building thrilling suspense, dynamic comic angles, deep cinematic shadows.`,

      scene3Title: 'وصول البطل الخارق وسر القوة',
      scene3Text: hasParents
        ? `انفتحت شرفة المنزل بحركة سينمائية مبهرة وهبط ${favoriteHero} بكل هيبته وابتسامته البطولية المشرقة وسط دهشة الأب والأم وتشجيعهما! تقدم البطل الخارق بخطوات واثقة وصافح والد ${name} بحرارة، ثم انحنى أمام بطلتنا الصغيرة وقال لها إنه يعلم ذكاءها الفطري، وشرح للأسرة كاملة أن الأبطال الخارقين يتعاونون دائما وأن سر القوة الحقيقي يكمن في ${positiveAlternative}.`
        : `هبط ${favoriteHero} من نافذة الغرفة في حركة بهلوانية خارقة جعلت عيني ${name} تلمعان من شدة الفرح والانبهار! اقترب البطل من صديقه الصغير وربت على كتفه بقوة وهو يقول له بصوت دافئ إنه جاء خصيصا لمساعدته في مهمة خاصة جدا. أوضح البطل لـ ${name} أن الشجاعة الحقيقية تظهر عندما نتخذ القرار الصائب ونغير سلوكنا فورا نحو ${positiveAlternative}.`,
      scene3Dialogue: {
        speaker: favoriteHero,
        text: `مرحبا يا ${isGirl ? 'بطلتنا' : 'بطلنا'} ${name}! أنا هنا لأنني أعلم أنك تملك قوة خارقة ستنطلق اليوم!`
      },
      scene3Prompt: `Epic superhero arrival splash panel. ${heroEn} leaps dynamically through glowing balcony into living room in a breathtaking superhero three-point landing pose, surrounded by sparkling comic energy trails and heroic wind. Front center: ${fixedAnchor} looks up with wide ecstatic eyes and inspired smile. ${hasParents ? 'Father and mother cheer happily with proud expressions beside their child. ' : ''}${heroEn} extends a fist-bump to the child, revealing secret of true hero power through discipline, vibrant comic lighting.`,

      scene4Title: 'التدريب المشترك وسر البطولة',
      scene4Text: hasParents
        ? `بدأت جلسة التدريب الخارقة في جو مليء بالنشاط والضحك حيث شارك الأب في ترتيب طاولة المهام بينما جهزت الأم قائمة الإنجازات اليومية لتنظيم الخطوات. وقف ${favoriteHero} ليشرح لـ ${name} كيف تقسم وقتها إلى فترات تركيز عالية مثل تدريبات النينجا. تدربت ${name} برفقة والدها وبطلها على كتابة دروسها بتركيز شديد وحل المسائل خطوة بخطوة دون استعجال.`
        : `انطلقت مرحلة التدريب والتنفيذ الحماسي حيث وضع ${favoriteHero} أمام ${name} خطة عمل بطولية محكمة تشبه خطط إنقاذ العالم. جلس الاثنان معا أمام المكتب، وبدأ البطل يعلم ${name} أسرار التركيز الخارق وكيف ينجز واجباته المدرسية بمثالية وسرعة قبل اللعب. تعلم ${name} كيف يتحدى رغبته في المماطلة ويحول كل واجب إلى مرحلة شيقة ينتصر فيها.`,
      scene4Dialogue: {
        speaker: favoriteHero,
        text: 'البطل الحقيقي يبدأ دائما بترتيب أولوياته والالتزام، هيا بنا نحقق النصر معا!'
      },
      scene4Prompt: `Intense collaborative superhero training comic panel. Side-by-side at study desk working like focused ninja superhero team: ${fixedAnchor} and ${heroEn}. ${heroEn} enthusiastically points at colorful organized mission schedule, while child writes with blazing speed and laser focus in notebook, surrounded by comic action motion lines, glowing spark effects, and stars of achievement. ${hasParents ? 'Father helps organize workspace while mother smiles proudly checking off completed tasks. ' : ''}Inspiring collaborative comic action.`,

      scene5Title: 'الانتصار الكبير والشجاعة الباهرة',
      scene5Text: hasParents
        ? `جاء وقت الاختبار الحقيقي في اليوم التالي عندما وجدت ${name} نفسها أمام مهمة معقدة تتطلب الاعتماد الكامل على النفس. تذكرت كلمات بطلها ونصائح والديها، فأنهت واجباتها ونظمت أغراضها بدقة مبهرة أذهلت معلميها. عمت الفرحة أرجاء البيت واحتضنت الأم بطلتها فخورة بها، بينما رفع الأب يد ${name} عاليا معلنا أنها حققت انتصارا حقيقيا على كل العادات السابقة.`
        : `جاء موعد التحدي الكبير وحان الوقت ليثبت ${name} لنفسه وللجميع أنه تغير وأصبح بطلا حقيقيا يعتمد عليه في كل المواقف. جلس بمفرده ورتب أولوياته بدقة متناهية وأنهى كل مهامه وواجباته المدرسية بأعلى درجات الإتقان والجمال. شعر بشلال من السعادة والاعتزاز يتدفق في صدره وهو يرى نتائجه الممتازة وإعجاب زملائه ومدرسيه بشجاعته وتنظيمه المذهل.`,
      scene5Dialogue: {
        speaker: name,
        text: `لقد نجحت في التحدي! الآن أشعر بأنني ${isGirl ? 'بطلة حقيقية أعتمد' : 'بطل حقيقي أعتمد'} على نفسي في كل شيء!`
      },
      scene5Prompt: `Triumphant comic book victory panel. Center of room in proud superhero winner stance: ${fixedAnchor}, holding up completed assignments with high grades and neatly packed schoolbag. Golden rays of victory sunlight burst through window. ${hasParents ? 'Mother embraces child with joy and proud tears, while father proudly raises child arm high in celebration of defeating procrastination. ' : ''}Tearful happiness, pure accomplishment, dynamic comic celebration.`,

      scene6Title: 'وسام الشرف للبطل الحقيقي',
      scene6Text: hasParents
        ? `في المساء تجمع الجميع في احتفال مهيب حيث ظهر ${favoriteHero} مرة أخرى وهو يحمل وسام الشرف والبطولة المذهب ليتوج به صديقته المتميزة. تقدم البطل الخارق أمام الوالدين وقال لهما إن ${name} أصبحت رمزا للأخلاق والتفوق والاجتهاد، وأنها تستحق لقب بطلة الأسرة الخارقة بجدارة. ارتدت ${name} وسامها الذهبي وهي تقف بين والديها وبطلها المفضل ويلتقطون معا صورة تذكارية خالدة.`
        : `في ختام المغامرة هبط ${favoriteHero} ليشارك بطلنا لحظة التتويج التاريخية ويقدم له وسام الشجاعة الذهبي تقديرا لتفوقه وانتصاره الساحق. صافحه البطل بحرارة وفخر وقال له أمام الجميع إنك اليوم لست بطلا عاديا، بل أنت قدوة لكل الأطفال ومصدر إلهام في كل مكان. رفع ${name} رأسه بكرامة واعتزاز وهو يشعر بأن العالم كله يبتسم له.`,
      scene6Dialogue: {
        speaker: favoriteHero,
        text: `فخور بك يا ${name}! لقد أثبت للجميع أنك ${isGirl ? 'بطلة' : 'بطل'} الأخلاق والتفوق والاجتهاد!`
      },
      scene6Prompt: `Grand finale award celebration comic panel. Grand heroic stage: ${heroEn} stands proudly beside ${fixedAnchor}, placing radiant gleaming golden medal of honor around child neck. The child beams with joyful royal confidence and pride. ${hasParents ? 'Loving parents stand on both sides smiling warmly, sharing this historic crowning moment with champion child. ' : ''}Glittering confetti bursts, golden stars, superhero thumbs-up, joyful cinematic children comic magazine finale.`
    };
  }

  // بناء الصفحات الـ 12 المتكاملة مع الأوامر
  return [
    {
      pageNumber: 1,
      type: 'cover',
      title: storyData.coverTitle,
      textArabic: storyData.coverText,
      imageUrl: null,
      imagePromptEnglish: storyData.coverPrompt,
      flowPromptEnglish: storyData.coverPrompt
    },
    {
      pageNumber: 2,
      type: 'dedication',
      title: storyData.dedicationTitle,
      textArabic: storyData.dedicationText,
      imageUrl: null,
      imagePromptEnglish: storyData.dedicationPrompt,
      flowPromptEnglish: storyData.dedicationPrompt
    },
    {
      pageNumber: 3,
      type: 'story',
      title: storyData.scene1Title,
      textArabic: storyData.scene1Text,
      dialogueBubble: storyData.scene1Dialogue,
      imageUrl: null,
      imagePromptEnglish: storyData.scene1Prompt,
      flowPromptEnglish: storyData.scene1Prompt
    },
    {
      pageNumber: 4,
      type: 'story',
      title: storyData.scene2Title,
      textArabic: storyData.scene2Text,
      dialogueBubble: storyData.scene2Dialogue,
      imageUrl: null,
      imagePromptEnglish: storyData.scene2Prompt,
      flowPromptEnglish: storyData.scene2Prompt
    },
    {
      pageNumber: 5,
      type: 'story',
      title: storyData.scene3Title,
      textArabic: storyData.scene3Text,
      dialogueBubble: storyData.scene3Dialogue,
      imageUrl: null,
      imagePromptEnglish: storyData.scene3Prompt,
      flowPromptEnglish: storyData.scene3Prompt
    },
    {
      pageNumber: 6,
      type: 'story',
      title: storyData.scene4Title,
      textArabic: storyData.scene4Text,
      dialogueBubble: storyData.scene4Dialogue,
      imageUrl: null,
      imagePromptEnglish: storyData.scene4Prompt,
      flowPromptEnglish: storyData.scene4Prompt
    },
    {
      pageNumber: 7,
      type: 'story',
      title: storyData.scene5Title,
      textArabic: storyData.scene5Text,
      dialogueBubble: storyData.scene5Dialogue,
      imageUrl: null,
      imagePromptEnglish: storyData.scene5Prompt,
      flowPromptEnglish: storyData.scene5Prompt
    },
    {
      pageNumber: 8,
      type: 'story',
      title: storyData.scene6Title,
      textArabic: storyData.scene6Text,
      dialogueBubble: storyData.scene6Dialogue,
      imageUrl: null,
      imagePromptEnglish: storyData.scene6Prompt,
      flowPromptEnglish: storyData.scene6Prompt
    },
    {
      pageNumber: 9,
      type: 'coloring',
      title: `لوّن ${isGirl ? 'البطلة' : 'البطل'} ${name} مع ${favoriteHero}`,
      textArabic: `صفحة تلوين تفاعلية: ${isGirl ? 'البطلة' : 'البطل'} ${name} مع ${favoriteHero} في وضعية استعراض القوة والبطولة في ${storySetting}.`,
      imageUrl: null,
      coloringImageUrl: null,
      imagePromptEnglish: `Children coloring book line art drawing. Clean black and white vector line art of a young 7-year-old Arab ${isGirl ? 'girl' : 'boy'} named ${childNameEn} standing side-by-side with ${heroEn} in an iconic superhero power pose, pure white background, crisp bold black contour outlines, no color, no grayscale, no shading, printable children coloring page.`,
      flowPromptEnglish: `Children coloring book line art drawing. Clean black and white vector line art of a young 7-year-old Arab ${isGirl ? 'girl' : 'boy'} named ${childNameEn} standing side-by-side with ${heroEn} in an iconic superhero power pose, pure white background, crisp bold black contour outlines, no color, no grayscale, no shading, printable children coloring page.`
    },
    {
      pageNumber: 10,
      type: 'coloring',
      title: 'مشهد التحدي والانتصار للتلوين',
      textArabic: `صفحة تلوين تفاعلية: ${isGirl ? 'البطلة تنجز المهمة' : 'البطل ينجز المهمة'} بنجاح وتفوق ويحتفل مع بطله في ${storySetting}.`,
      imageUrl: null,
      coloringImageUrl: null,
      imagePromptEnglish: `Children interactive coloring page. Clean black and white line art of a young Arab ${isGirl ? 'girl' : 'boy'} named ${childNameEn} celebrating victory and accomplishment alongside ${heroEn} with victory stars, crisp clean black vector outlines on pure white background, zero color, zero shading, high-contrast coloring book page for children.`,
      flowPromptEnglish: `Children interactive coloring page. Clean black and white line art of a young Arab ${isGirl ? 'girl' : 'boy'} named ${childNameEn} celebrating victory and accomplishment alongside ${heroEn} with victory stars, crisp clean black vector outlines on pure white background, zero color, zero shading, high-contrast coloring book page for children.`
    },
    {
      pageNumber: 11,
      type: 'coloring',
      title: `درع ووسام ${isGirl ? 'البطلة' : 'البطل'} ${name}`,
      textArabic: `صفحة تلوين تفاعلية: درع الشجاعة والتميز يحمل اسم ${isGirl ? 'البطلة' : 'البطل'} ${name} ليزينه بألوانه المفضلة.`,
      imageUrl: null,
      coloringImageUrl: null,
      imagePromptEnglish: `Children coloring book heraldic crest. A heroic knight shield and crest featuring a clean bold banner with the name ${childNameEn} in clear English block letters, flanked by victory wings, laurels, and stars, clean bold black vector line art on pure white background, zero shading, ready for kids coloring.`,
      flowPromptEnglish: `Children coloring book heraldic crest. A heroic knight shield and crest featuring a clean bold banner with the name ${childNameEn} in clear English block letters, flanked by victory wings, laurels, and stars, clean bold black vector line art on pure white background, zero shading, ready for kids coloring.`
    },
    {
      pageNumber: 12,
      type: 'certificate',
      title: `شهادة ${isGirl ? 'بطلة' : 'بطل'} السلوك الإيجابي والتفوق`,
      textArabic: `شهادة رسمية صادرة من مكتبة الشعلة بتوقيع الوالدين لتكريم ${isGirl ? 'البطلة' : 'البطل'} ${name}.`,
      imageUrl: null,
      imagePromptEnglish: 'Pixar 3D animated film style, 8k render. Ornate golden achievement certificate frame with glossy royal red ribbon, golden starbursts, sparkling heroic trophy, elegant decorative border, vibrant festive lighting, celebration atmosphere.',
      flowPromptEnglish: 'Pixar 3D animated film style, 8k render. Ornate golden achievement certificate frame with glossy royal red ribbon, golden starbursts, sparkling heroic trophy, elegant decorative border, vibrant festive lighting, celebration atmosphere.'
    }
  ];
}

// 9. تخزين المشروع النشط في الذاكرة وملف project-data.json
const PROJECT_FILE = path.join(__dirname, 'project-data.json');

let activeProject = {
  child: {
    name: 'عمر',
    age: 7,
    gender: 'boy',
    favoriteHero: 'سبايدرمان',
    artStyle: '3d-pixar',
    storySetting: 'crime-fighting',
    customStorySetting: '',
    photoUrl: fs.existsSync(path.join(PUBLIC_DIR, 'sample-child.jpg')) ? '/sample-child.jpg' : null,
    fatherPhotoUrl: null,
    motherPhotoUrl: null,
    visualTraits: {
      hairStyle: 'شعر قصير كيرلي مموج داكن من الأعلى مع تدريج ناعم على الجانبين (Curly Fade)',
      faceFeatures: 'عيون لوزية داكنة واسعة، حواجب مقوسة، وجه بيضاوي ناعم، بشرة حنطية عربية، وابتسامة هادئة واثقة',
      clothingStyle: 'قميص أسود أنيق مع كنزة صوفية مخططة أفقياً بالأبيض والأسود معقودة فوق الكتفين وبنطال جينز أزرق'
    },
    includeParentsInStory: false,
    behaviorDescription: 'يقضي وقتا طويلا في اللعب ويهمل أداء واجباته المدرسية وتجهيز حقيبته.',
    positiveAlternative: 'العلم والاجتهاد سر قوة الأبطال وتنظيم الوقت',
    parentName: 'أبو عمر وأم عمر',
    parentDedication: 'يا بطلنا الغالي عمر نحن فخورون بذكائك دائما وواثقون أنك ستكون بطلا متفوقا يحبه الجميع.'
  },
  pages: []
};

function saveProjectToFile() {
  try {
    fs.writeFileSync(PROJECT_FILE, JSON.stringify(activeProject, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Project Save Warn]:', err.message);
  }
}

function loadProjectFromFile() {
  if (fs.existsSync(PROJECT_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(PROJECT_FILE, 'utf8'));
      if (data && data.child && Array.isArray(data.pages) && data.pages.length === 12) {
        // فحص وتحديث الأوامر القديمة المشوهة التي تحتوي على نصوص عربية داخل الأوامر الإنجليزية
        const freshPages = generateRichStoryScenes(data.child);
        data.pages = data.pages.map((p, idx) => {
          const fresh = freshPages[idx];
          const hasArabicPollution = (p.flowPromptEnglish && /[\u0600-\u06FF]/.test(p.flowPromptEnglish)) || 
                                     (p.imagePromptEnglish && /[\u0600-\u06FF]/.test(p.imagePromptEnglish)) ||
                                     (p.flowPromptEnglish && p.flowPromptEnglish.includes('FaceID IP-Adapter'));
          if (hasArabicPollution || !p.flowPromptEnglish) {
            p.flowPromptEnglish = fresh.flowPromptEnglish;
            p.imagePromptEnglish = fresh.imagePromptEnglish;
          }
          return p;
        });
        activeProject = data;
        saveProjectToFile();
        console.log('[Project] تم تحميل المشروع وتطهير وتحديث أوامر التوليد بنجاح من project-data.json');
        return true;
      }
    } catch (err) {
      console.warn('[Project Load Warn]:', err.message);
    }
  }
  return false;
}

// دالة بناء مصفوفة JSON Array المعيارية الكاملة لأوامر Google Flow
function generatePromptsJsonArray(project) {
  if (!project || !project.pages) return [];
  const child = project.child || {};
  const isGirl = String(child.gender).toLowerCase() === 'girl';
  const childName = formatChildNameForModel(child.name, isGirl);
  const heroEn = getEnglishHeroName(child.favoriteHero);
  const artStyle = child.artStyle || '3D Pixar';

  return project.pages.map(page => {
    let aspectRatio = '3:4';
    if (page.type === 'cover' || page.type === 'certificate' || page.type === 'coloring') {
      aspectRatio = '3:4';
    } else {
      aspectRatio = '4:3';
    }

    const flowPrompt = (page.flowPromptEnglish || page.imagePromptEnglish || '').trim();

    return {
      pageNumber: page.pageNumber,
      type: page.type,
      title: page.title,
      aspectRatio: aspectRatio,
      artStyle: artStyle,
      characterAnchor: `Authentic Arab ${isGirl ? 'girl' : 'boy'} named ${childName}`,
      hero: heroEn,
      cameraComposition: page.type === 'cover' 
        ? 'Dynamic low-angle heroic splash page composition' 
        : (page.type === 'coloring' ? 'Clean vector contour coloring book outlines' : 'Cinematic storytelling scene composition'),
      detailedFlowPrompt: flowPrompt,
      negativePrompt: page.type === 'coloring' 
        ? 'color, shading, gradients, photorealism, 3d render, shadows, dark background, gray, blurry, watermark'
        : 'blurry, low quality, distorted anatomy, text, watermark, bad hands, deformed faces, ugly, oversaturated',
      targetEngine: 'Google Flow / Imagen 3'
    };
  });
}

// دالة تصدير كتيب المجلة A5 إلى ملف PDF جاهز للطباعة والتدبيس عبر Playwright أو Chrome Headless
async function exportBookletPdfHeadless(port = 3000) {
  const pdfFileName = 'maktaba-booklet-a5.pdf';
  const pdfFilePath = path.join(PUBLIC_DIR, pdfFileName);
  const targetUrl = `http://localhost:${port}/api/print-booklet`;

  // 1. المسار الأساسي: التوليد المباشر عبر Playwright Core
  try {
    const { chromium } = require('playwright-core');
    const browser = await chromium.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 35000 });
    await page.addStyleTag({ content: '@media print { .no-print { display: none !important; } }' });
    await page.pdf({
      path: pdfFilePath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' }
    });
    await browser.close();
    console.log('[PDF Engine] تم تصدير كتيب المجلة A5 بنجاح عبر Playwright:', pdfFilePath);
    return { success: true, pdfUrl: `/${pdfFileName}`, filePath: pdfFilePath, engine: 'playwright' };
  } catch (pwErr) {
    console.warn('[PDF Engine Warn] تعذر التصدير عبر Playwright، جاري التوليد عبر Chrome CLI المباشر:', pwErr.message);
  }

  // 2. خط الدفاع البديل: التوليد عبر متصفح Chrome المثبت بنظام التشغيل مباشرة
  return new Promise((resolve) => {
    const { execFile } = require('child_process');
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const tempProfile = path.join(__dirname, '.temp-print-profile');
    if (!fs.existsSync(tempProfile)) fs.mkdirSync(tempProfile, { recursive: true });

    const args = [
      '--headless=new',
      '--disable-gpu',
      `--user-data-dir=${tempProfile}`,
      `--print-to-pdf=${pdfFilePath}`,
      targetUrl
    ];

    execFile(chromePath, args, { timeout: 40000 }, (err) => {
      if (err) {
        console.error('[PDF Engine Error] فشل التوليد عبر Chrome CLI:', err);
        return resolve({ success: false, error: err.message });
      }
      if (fs.existsSync(pdfFilePath) && fs.statSync(pdfFilePath).size > 1000) {
        console.log('[PDF Engine] تم تصدير كتيب المجلة A5 بنجاح عبر Chrome CLI:', pdfFilePath);
        resolve({ success: true, pdfUrl: `/${pdfFileName}`, filePath: pdfFilePath, engine: 'chrome-cli' });
      } else {
        resolve({ success: false, error: 'الملف الناتج غير صالح أو فارغ' });
      }
    });
  });
}

if (!loadProjectFromFile()) {
  activeProject.pages = generateRichStoryScenes(activeProject.child);
  saveProjectToFile();
}

// 10. دالة تصيير صفحة فردية لطباعة A5 Booklet بأسلوب لوحات الكوميكس الكبرى
function renderPage(page, project) {
  const { child } = project;

  function getValidCartoonImageUrl(url) {
    if (!url) return null;
    if (child.photoUrl && url === child.photoUrl) return null;
    if (child.fatherPhotoUrl && url === child.fatherPhotoUrl) return null;
    if (child.motherPhotoUrl && url === child.motherPhotoUrl) return null;
    return url;
  }

  const validImg = getValidCartoonImageUrl(page.imageUrl);
  const validColoringImg = getValidCartoonImageUrl(page.coloringImageUrl || page.imageUrl);

  if (page.type === 'cover') {
    return `
      <div style="background:linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%); color:white; height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:12px; box-sizing:border-box; page-break-inside:avoid !important; break-inside:avoid !important; font-family:'Changa', 'Cairo', sans-serif;">
        <!-- شريط علوي كوميكس للغلاف -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid rgba(255,255,255,0.25); padding-bottom:4px;">
          <span style="background:#ef4444; color:white; padding:2px 8px; border-radius:6px; font-weight:900; font-size:10.5px; box-shadow:2px 2px 0px #000;">🔥 إصدار بطولة حصري</span>
          <span style="color:#fde047; font-weight:900; font-size:11.5px; text-shadow:1px 1px 0px #000;">مكتبة الشعلة للقصص المصورة</span>
          <span style="background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px; font-size:9.5px; font-weight:bold;">2026</span>
        </div>

        <!-- عنوان المجلة الكرتوني العريض -->
        <div style="text-align:center; margin:3px 0;">
          <h1 style="font-size:23px; font-weight:900; margin:0; color:#fde047; text-shadow:2px 2px 0px #000; font-family:'Changa', sans-serif; letter-spacing:0.5px;">مغامرات ${child.gender === 'girl' ? 'البطلة' : 'البطل'} ${child.name}</h1>
          <h2 style="font-size:15px; font-weight:800; margin:2px 0 0; color:white; text-shadow:1px 1px 0px #000;">مع ${child.favoriteHero}</h2>
        </div>

        <!-- لوحة الغلاف الكبرى (Comic Cover Bleed Panel) تشغل 70% من الصفحة -->
        <div style="height:70%; border:3.5px solid #fde047; border-radius:14px; overflow:hidden; background:#0f172a; box-shadow:4px 4px 0px #000000; position:relative;">
          ${validImg ? `
            <img src="${validImg}" alt="${page.title}" style="width:100%; height:100%; object-fit:cover; display:block;" />
            <div style="position:absolute; top:8px; right:8px; background:#fde047; color:#0f172a; font-family:'Changa', sans-serif; font-weight:900; font-size:11px; padding:2px 8px; border-radius:6px; border:2px solid #000; box-shadow:2px 2px 0px #000;">
              ⭐ ${page.title}
            </div>
          ` : (page.status === 'error' || page.error) ? `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fca5a5; text-align:center; padding:15px; box-sizing:border-box; background:#1e1b4b;">
              <div style="font-size:36px; margin-bottom:6px;">⚠️</div>
              <div style="font-size:15px; font-weight:900; color:#fde047; font-family:'Changa', sans-serif;">تعذر رسم غلاف المجلة</div>
              <div style="font-size:10px; color:#fecaca; margin-top:4px; max-width:90%; font-family:'Cairo', sans-serif; line-height:1.4;">${page.error || 'فشل الاتصال بخادم التوليد الخارجي'}</div>
              <div style="font-size:9.5px; color:#94a3b8; margin-top:8px;">يرجى إعادة المحاولة من لوحة التحكم الرئيسية</div>
            </div>
          ` : `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fde047; text-align:center; padding:15px; box-sizing:border-box;">
              <div style="font-size:36px; margin-bottom:6px;">🎨</div>
              <div style="font-size:15px; font-weight:900; font-family:'Changa', sans-serif;">جاري رسم غلاف المجلة الكرتوني...</div>
              <div style="font-size:10.5px; color:#94a3b8; margin-top:4px; font-family:'Cairo', sans-serif;">في انتظار استلام اللوحة من الـ API الخارجي</div>
            </div>
          `}
        </div>

        <!-- شريط ترسيخ السلوك بالأسفل -->
        <div style="background:rgba(0,0,0,0.65); border:1.5px solid rgba(253,224,71,0.5); padding:5px 8px; border-radius:8px; font-size:10.5px; text-align:center; color:#fed7aa; font-weight:700;">
          🎯 قصة مخصصة لترسيخ: ${child.positiveAlternative}
        </div>
      </div>
    `;
  }

  if (page.type === 'dedication') {
    return `
      <div style="background:#fffbeb; height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:14px; box-sizing:border-box; color:#1e293b; page-break-inside:avoid !important; break-inside:avoid !important; font-family:'Changa', 'Cairo', sans-serif;">
        <div style="text-align:center; border-bottom:2px dashed #f59e0b; padding-bottom:4px;">
          <h2 style="font-size:17px; font-weight:900; color:#b45309; margin:2px 0;">💌 رسالة فخر ومحبة من الوالدين</h2>
          <div style="font-size:11px; color:#78350f; font-weight:700;">إلى ${child.gender === 'girl' ? 'بطلتنا الشجاعة' : 'بطلنا الشجاع'}: <strong>${child.name}</strong></div>
        </div>
        ${validImg ? `
        <div style="height:48%; border:2.5px solid #0f172a; border-radius:10px; overflow:hidden; box-shadow:3px 3px 0px #f59e0b; margin:4px 0;">
          <img src="${validImg}" alt="إهداء الأسرة" style="width:100%; height:100%; object-fit:cover; display:block;" />
        </div>
        ` : ''}
        <div style="background:white; border-radius:10px; padding:10px; font-size:12.5px; line-height:1.55; text-align:center; border:2px solid #0f172a; box-shadow:2px 2px 0px #f59e0b;">
          <div style="color:#334155; font-family:'Cairo', sans-serif; font-weight:700;">
            ${child.parentDedication}
          </div>
          <div style="margin-top:6px; font-weight:900; color:#b45309; font-size:12px;">
            ${child.parentName} ❤️
          </div>
        </div>
        <div style="text-align:center; font-size:9.5px; color:#94a3b8; font-weight:bold;">صفحة 2 • مجلة الأبطال التربوية المخصصة</div>
      </div>
    `;
  }

  if (page.type === 'story') {
    return `
      <div style="background:white; height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:10px 12px; box-sizing:border-box; color:#0f172a; page-break-inside:avoid !important; break-inside:avoid !important; font-family:'Changa', 'Cairo', sans-serif;">
        <!-- شريط علوي بارز لعنوان المشهد ورقم الصفحة -->
        <div style="display:flex; justify-content:space-between; align-items:center; height:24px; margin-bottom:5px;">
          <span style="background:#0f172a; color:#fde047; font-family:'Changa', sans-serif; font-weight:800; font-size:11.5px; padding:2px 10px; border-radius:6px; box-shadow:2px 2px 0px #3b82f6;">💥 المشهد ${page.pageNumber - 2}: ${page.title}</span>
          <span style="font-family:'Changa', sans-serif; font-weight:800; font-size:11px; color:#475569; background:#f1f5f9; padding:2px 8px; border-radius:4px; border:1px solid #cbd5e1;">صفحة ${page.pageNumber}</span>
        </div>

        <!-- لوحة الكوميكس الكبرى (Comic Panel) تشغل 71% من مساحة الصفحة -->
        <div style="height:71%; border:3.5px solid #0f172a; border-radius:12px; overflow:hidden; background:#0f172a; position:relative; box-shadow:4px 4px 0px #0f172a; margin-bottom:6px;">
          ${validImg ? `
            <img src="${validImg}" alt="${page.title}" style="width:100%; height:100%; object-fit:cover; display:block;" />
            ${page.dialogueBubble ? `
              <div style="position:absolute; bottom:8px; right:8px; left:8px; background:rgba(255,255,255,0.96); border:2.5px solid #0f172a; border-radius:10px; padding:4px 10px; box-shadow:2px 2px 0px #0f172a; display:flex; align-items:center; gap:6px;">
                <span style="background:#ef4444; color:white; font-family:'Changa', sans-serif; font-size:10px; font-weight:900; padding:1px 6px; border-radius:4px; white-space:nowrap;">💬 ${page.dialogueBubble.speaker}</span>
                <span style="font-family:'Changa', sans-serif; font-size:11.5px; font-weight:700; color:#0f172a; line-height:1.35;">"${page.dialogueBubble.text}"</span>
              </div>
            ` : ''}
          ` : (page.status === 'error' || page.error) ? `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fca5a5; text-align:center; padding:15px; box-sizing:border-box; background:#1e1b4b;">
              <div style="font-size:36px; margin-bottom:6px;">⚠️</div>
              <div style="font-size:14px; font-weight:900; color:#fde047; font-family:'Changa', sans-serif;">تعذر رسم المشهد الكرتوني</div>
              <div style="font-size:10px; color:#fecaca; margin-top:4px; max-width:90%; font-family:'Cairo', sans-serif; line-height:1.4;">${page.error || 'فشل الاتصال بخادم التوليد الخارجي'}</div>
              <div style="font-size:9.5px; color:#94a3b8; margin-top:8px;">يرجى إعادة المحاولة من لوحة التحكم الرئيسية</div>
            </div>
          ` : `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fde047; text-align:center; padding:15px; box-sizing:border-box;">
              <div style="font-size:36px; margin-bottom:6px;">🎨</div>
              <div style="font-size:14px; font-weight:900; font-family:'Changa', sans-serif;">جاري رسم المشهد الكرتوني...</div>
              <div style="font-size:10.5px; color:#94a3b8; margin-top:4px; font-family:'Cairo', sans-serif;">مطابقة ملامح البطل وأحداث المشهد بواسطة الذكاء الاصطناعي</div>
            </div>
          `}
        </div>

        <!-- صندوق النص السردي بأسلوب الكوميكس -->
        <div style="flex:1; background:#fffdf5; border:2.5px solid #0f172a; border-radius:10px; padding:7px 11px; box-shadow:3px 3px 0px #f59e0b; display:flex; flex-direction:column; justify-content:center;">
          <p style="margin:0; font-family:'Cairo', 'Changa', sans-serif; font-size:12px; font-weight:700; line-height:1.5; text-align:justify; color:#1e293b;">
            ${page.textArabic}
          </p>
        </div>
      </div>
    `;
  }

  if (page.type === 'coloring') {
    return `
      <div style="background:white; height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:10px 12px; box-sizing:border-box; page-break-inside:avoid !important; break-inside:avoid !important; font-family:'Changa', 'Cairo', sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px dashed #94a3b8; padding-bottom:4px; font-size:11.5px; font-weight:800;">
          <span style="background:#f1f5f9; padding:2px 8px; border-radius:6px; border:1px solid #cbd5e1;">🖍️ صفحة تلوين الأبطال: ${page.title}</span>
          <span style="color:#64748b;">صفحة ${page.pageNumber}</span>
        </div>
        <div style="height:73%; border:3px dashed #64748b; border-radius:12px; margin:5px 0; overflow:hidden; background:#ffffff; display:flex; align-items:center; justify-content:center; padding:6px; box-sizing:border-box;">
          ${validColoringImg ? `
            <img src="${validColoringImg}" alt="${page.title}" style="width:100%; height:100%; object-fit:contain; display:block;" />
          ` : (page.status === 'error' || page.error) ? `
            <div style="text-align:center; color:#ef4444; font-family:'Changa', sans-serif; padding:15px;">
              <div style="font-size:32px; margin-bottom:4px;">⚠️</div>
              <div style="font-size:13px; font-weight:800; color:#dc2626;">تعذر تجهيز صفحة التلوين</div>
              <div style="font-size:10px; color:#64748b; margin-top:4px;">${page.error || 'فشل الاتصال بالـ API الخارجي'}</div>
              <div style="font-size:9px; color:#94a3b8; margin-top:6px;">يرجى إعادة المحاولة من لوحة التحكم</div>
            </div>
          ` : `
            <div style="text-align:center; color:#64748b; font-family:'Changa', sans-serif;">
              <div style="font-size:32px; margin-bottom:4px;">🖍️</div>
              <div style="font-size:13px; font-weight:800;">جاري تجهيز صفحة التلوين...</div>
            </div>
          `}
        </div>
        <div style="text-align:center; font-size:10.5px; font-weight:800; color:#1e293b; background:#fef3c7; border:2px solid #f59e0b; padding:4px 8px; border-radius:8px; box-shadow:2px 2px 0px #f59e0b;">
          🎨 أطلق لخيالك العنان واستخدم ألوانك المفضلة لتلوين بطلك الخارق!
        </div>
      </div>
    `;
  }

  if (page.type === 'certificate') {
    return `
      <div style="background:#fffbeb; height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:12px; box-sizing:border-box; page-break-inside:avoid !important; break-inside:avoid !important; font-family:'Changa', 'Cairo', sans-serif;">
        <div style="border:4.5px double #d97706; border-radius:12px; background:white; height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:12px; text-align:center; box-sizing:border-box; box-shadow:3px 3px 0px #f59e0b;">
          <div>
            <div style="font-size:26px;">🏆 ⭐ 🏆</div>
            <h2 style="font-size:17px; font-weight:900; color:#b45309; margin:2px 0; font-family:'Changa', sans-serif;">شهادة ${child.gender === 'girl' ? 'بطلة' : 'بطل'} السلوك الإيجابي والتفوق</h2>
            <div style="width:45px; height:2px; background:#d97706; margin:3px auto;"></div>
          </div>
          <div>
            <div style="font-size:11.5px; color:#64748b; font-weight:bold;">تمنح بكل فخر واعتزاز لـ ${child.gender === 'girl' ? 'البطلة الشجاعة' : 'البطل الشجاع'}:</div>
            <div style="font-size:24px; font-weight:900; color:#1e3a8a; margin:3px 0; font-family:'Changa', sans-serif; text-decoration:underline; text-decoration-color:#f59e0b;">${child.name}</div>
            <div style="font-size:12px; color:#334155; line-height:1.55; max-width:88%; margin:auto; font-family:'Cairo', sans-serif; font-weight:700;">
              تقديرا لشجاعته وتميزه ونجاحه في التحلي بـ <strong>${child.positiveAlternative}</strong> ليصبح قدوة حسنة وبطلا حقيقيا يفتخر به الجميع.
            </div>
          </div>
          <div style="display:flex; justify-content:space-around; border-top:1px solid #fed7aa; padding-top:8px; font-size:10.5px;">
            <div>
              <div style="font-weight:900; color:#78350f;">توقيع ولي الأمر</div>
              <div style="margin-top:6px; font-weight:bold;">${child.parentName}</div>
            </div>
            <div>
              <div style="font-weight:900; color:#78350f;">ختم وتوقيع المكتبة</div>
              <div style="margin-top:6px; font-weight:bold;">مكتبة الشعلة</div>
            </div>
          </div>
          <div style="font-size:9px; color:#94a3b8; font-weight:bold;">صفحة 12 (الغلاف الخلفي) • شهادة الأبطال المعتمدة</div>
        </div>
      </div>
    `;
  }
  return '';
}

// 11. خادم HTTP والـ Endpoints البرمجية
const server = http.createServer(async (req, res) => {
  req.on('error', (err) => {
    console.error('[Req Stream Error]:', err.message);
  });
  res.on('error', (err) => {
    console.error('[Res Stream Error]:', err.message);
  });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // 1. API: قراءة وتحديث إعدادات خادم التوليد الخارجي
  if (pathname === '/api/config') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, config: API_CONFIG }));
      return;
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 10 * 1024 * 1024) req.destroy();
      });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          if (payload.endpointUrl !== undefined) API_CONFIG.endpointUrl = payload.endpointUrl;
          if (payload.apiType !== undefined) API_CONFIG.apiType = payload.apiType;
          if (payload.customApiUrl !== undefined) API_CONFIG.customApiUrl = payload.customApiUrl;
          if (payload.apiKey !== undefined) API_CONFIG.apiKey = payload.apiKey;
          if (payload.customWorkflowJson !== undefined) API_CONFIG.customWorkflowJson = payload.customWorkflowJson;
          if (payload.timeoutMs !== undefined) API_CONFIG.timeoutMs = payload.timeoutMs;
          if (payload.maxRetries !== undefined) API_CONFIG.maxRetries = payload.maxRetries;

          saveConfigToFile();
          console.log(`[Config Update] تم حفظ الإعدادات: نوع المحرك=${API_CONFIG.apiType}, الرابط=${API_CONFIG.customApiUrl || API_CONFIG.endpointUrl}, مفتاح API=${API_CONFIG.apiKey ? 'مفعل' : 'غير محدد'}`);

          if (!res.headersSent) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true, message: 'تم تحديث الإعدادات وحفظها بنجاح', config: API_CONFIG }));
          }
        } catch (e) {
          if (!res.headersSent) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        }
      });
      return;
    }
  }

  // 1.5. API: اختبار الاتصال بالخادم الخارجي فوراً مع دعم ترويسات API Key
  if (pathname === '/api/test-connection') {
    const targetUrl = parsedUrl.searchParams.get('url') || API_CONFIG.customApiUrl || API_CONFIG.endpointUrl;
    const testApiKey = parsedUrl.searchParams.get('apiKey') || API_CONFIG.apiKey;
    const queryApiType = parsedUrl.searchParams.get('apiType') || API_CONFIG.apiType;
    const isGoogle = queryApiType === 'google-imagen' || queryApiType === 'flow-api' || targetUrl.includes('generativelanguage.googleapis.com');
    const isFal = queryApiType === 'fal-ai' || targetUrl.includes('fal.run');
    const isCloudAi = !isGoogle && !isFal && (targetUrl.includes('pollinations.ai') || queryApiType === 'cloud-ai');

    // اختبار قوقل فلو / Google AI Studio Imagen 3
    if (isGoogle) {
      if (!testApiKey || !testApiKey.trim()) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: false,
          error: 'يرجى إدخال مفتاح Google AI Studio API Key أولاً (احصل عليه مجاناً بدون بطاقة من aistudio.google.com).',
          endpointUrl: targetUrl
        }));
        return;
      }
      const testController = new AbortController();
      const testTimeout = setTimeout(() => testController.abort(), 12000);
      try {
        const googleTestUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${testApiKey.trim()}`;
        console.log(`[Test Connection] فحص مفتاح Google AI Studio...`);
        const googleRes = await fetch(googleTestUrl, { signal: testController.signal });
        clearTimeout(testTimeout);
        if (googleRes.ok) {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: true,
            status: googleRes.status,
            message: '🎉 الاتصال بمحرك Google Flow / Imagen 3 الرسمي ناجح 100%! مفتاح Google AI Studio مصرح ومستعد لتوليد صور المجلة بأعلى جودة سينمائية.',
            endpointUrl: targetUrl
          }));
        } else {
          const errData = await googleRes.json().catch(() => ({}));
          const errMsg = errData.error?.message || `رمز الاستجابة: ${googleRes.status}`;
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: false,
            error: `مفتاح Google API غير صالح أو غير مفعل: ${errMsg}`,
            endpointUrl: targetUrl
          }));
        }
      } catch (err) {
        clearTimeout(testTimeout);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: false,
          error: `فشل الاتصال بخوادم Google: ${err.message}`,
          endpointUrl: targetUrl
        }));
      }
      return;
    }

    // اختبار Fal.ai InstantID
    if (isFal) {
      if (!testApiKey || !testApiKey.trim()) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: false,
          error: 'يرجى إدخال مفتاح Fal.ai API Key لفحص خادم InstantID.',
          endpointUrl: targetUrl
        }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        success: true,
        message: 'مفتاح Fal.ai جاهز وسيتم إرسال صور الوجه الحقيقية إلى خادم InstantID.',
        endpointUrl: targetUrl
      }));
      return;
    }

    const probeUrl = isCloudAi ? 'https://image.pollinations.ai/prompt/test?width=100&height=100' : targetUrl;

    const testController = new AbortController();
    const testTimeout = setTimeout(() => testController.abort(), 10000);

    const probeHeaders = { 'User-Agent': 'Maktaba-Shula-StoryEngine/1.0' };
    if (testApiKey && testApiKey.trim()) {
      const key = testApiKey.trim();
      probeHeaders['Authorization'] = key.startsWith('Bearer ') ? key : `Bearer ${key}`;
      probeHeaders['X-API-Key'] = key;
    }

    try {
      console.log(`[Test Connection] فحص الاتصال بالرابط: ${probeUrl}`);
      const testRes = await fetch(probeUrl, {
        method: isCloudAi ? 'HEAD' : 'GET',
        headers: probeHeaders,
        signal: testController.signal
      });
      clearTimeout(testTimeout);

      if (!res.headersSent) {
        if (testRes.status < 500) {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: true,
            status: testRes.status,
            message: isCloudAi
              ? 'الاتصال السحابي الذكي متصل وجاهز لرسم مشاهد المجلة فوراً مع التخزين المحلي والـ Retries التلقائية.'
              : `الاتصال ناجح ومستقر! استجاب خادم التوليد بنجاح (كود: ${testRes.status} ${testRes.statusText || 'OK'}). محرك FaceID و IP-Adapter جاهزان لاستقبال صور الطفل المرجعية.`,
            endpointUrl: targetUrl
          }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: false,
            error: `استجاب الخادم برمز خطأ (${testRes.status} ${testRes.statusText}). يرجى مراجعة تشغيل السيرفر أو صلاحية مفتاح الـ API.`,
            endpointUrl: targetUrl
          }));
        }
      }
    } catch (err) {
      clearTimeout(testTimeout);
      let errMsg = '';
      if (err.name === 'AbortError') {
        errMsg = `انتهت مهلة الفحص (10 ثوانٍ) دون استجابة من (${targetUrl}).`;
      } else if (err.message && (err.message.includes('ECONNREFUSED') || err.message.includes('fetch failed'))) {
        errMsg = `تعذر الاتصال بـ (${targetUrl}). تأكد من تشغيل خادم ComfyUI أو الـ API المخصص ونفق ngrok/Colab وفتح المنفذ.`;
      } else {
        errMsg = `فشل الاتصال: ${err.message}`;
      }
      if (!res.headersSent) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: false,
          error: errMsg,
          rawError: err.message,
          endpointUrl: targetUrl
        }));
      }
    }
    return;
  }

  // 2. API: توليد صورة مشهد فردي عبر طابور المعالجة المتسلسلة مع Timeout و Retry
  if (pathname === '/api/generate-image' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50 * 1024 * 1024) req.destroy();
    });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const pageNum = parseInt(payload.pageNumber) || 1;
        const pageIdx = pageNum - 1;

        // إدراج المهمة في طابور المعالجة المتسلسلة لضمان التنفيذ المتعاقب
        const result = await generationQueue.enqueue(() => callExternalImageApiWithRetry(payload));

        if (activeProject.pages && activeProject.pages[pageIdx]) {
          if (result.success && result.imageUrl) {
            activeProject.pages[pageIdx].imageUrl = result.imageUrl;
            activeProject.pages[pageIdx].status = 'completed';
            delete activeProject.pages[pageIdx].error;
          } else {
            activeProject.pages[pageIdx].imageUrl = null;
            activeProject.pages[pageIdx].status = 'error';
            activeProject.pages[pageIdx].error = result.error;
          }
          saveProjectToFile();
        }

        if (!res.headersSent) {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: result.success,
            imageUrl: result.imageUrl,
            status: result.status,
            error: result.error,
            pageNumber: pageNum,
            apiTarget: result.apiTarget || API_CONFIG.customApiUrl || API_CONFIG.endpointUrl,
            source: result.source
          }));
        }
      } catch (err) {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: false,
            status: 'error',
            error: `خطأ أثناء توليد الصورة: ${err.message}`
          }));
        }
      }
    });
    return;
  }

  // 2.5. API: جلب بيانات المشروع النشط الحالي مع صوره
  if (pathname === '/api/project' && req.method === 'GET') {
    loadProjectFromFile();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      success: true,
      child: activeProject.child,
      pages: activeProject.pages
    }));
    return;
  }

  // 3. API: توليد نصوص ومشاهد القصة التربوية
  if (pathname === '/api/generate-story-end-to-end' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50 * 1024 * 1024) req.destroy();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const child = {
          name: payload.childName || 'عمر',
          age: parseInt(payload.childAge) || 7,
          gender: payload.childGender || 'boy',
          favoriteHero: payload.favoriteHero || 'سبايدرمان',
          artStyle: payload.artStyle || '3d-pixar',
          storySetting: payload.storySetting || 'crime-fighting',
          customStorySetting: payload.customStorySetting || '',
          photoUrl: payload.childPhotoUrl || (fs.existsSync(path.join(PUBLIC_DIR, 'sample-child.jpg')) ? '/sample-child.jpg' : null),
          fatherPhotoUrl: payload.fatherPhotoUrl || null,
          motherPhotoUrl: payload.motherPhotoUrl || null,
          visualTraits: payload.visualTraits || {
            hairStyle: payload.childHairStyle || 'شعر قصير كيرلي مموج داكن من الأعلى مع تدريج ناعم على الجانبين (Curly Fade)',
            faceFeatures: payload.childFaceFeatures || 'عيون لوزية داكنة واسعة، حواجب مقوسة، وجه بيضاوي ناعم، بشرة حنطية عربية، وابتسامة هادئة واثقة',
            clothingStyle: payload.childClothingStyle || 'قميص أسود أنيق مع كنزة صوفية مخططة أفقياً بالأبيض والأسود معقودة فوق الكتفين وبنطال جينز أزرق'
          },
          includeParentsInStory: !!(payload.includeParentsInStory && (payload.fatherPhotoUrl || payload.motherPhotoUrl)),
          behaviorDescription: payload.behaviorDescription || 'يقضي وقتا طويلا في اللعب ويهمل أداء واجباته المدرسية.',
          positiveAlternative: payload.positiveAlternative || 'العلم والاجتهاد سر قوة الأبطال وتنظيم الوقت',
          parentName: payload.parentName || 'الأب والأم',
          parentDedication: payload.parentDedication || 'يا بطلنا الغالي، فخورون بذكائك دائما.'
        };

        const pages = generateRichStoryScenes(child);

        // الحفاظ على أي صور تم توليدها مسبقاً إذا كان نفس العالم، أو البدء بتوليد جديد إذا تغير عالم القصة
        const settingChanged = activeProject?.child?.storySetting && activeProject.child.storySetting !== child.storySetting;
        if (!settingChanged && activeProject && Array.isArray(activeProject.pages)) {
          pages.forEach(p => {
            const existing = activeProject.pages.find(ep => ep.pageNumber === p.pageNumber);
            if (existing && existing.imageUrl) {
              p.imageUrl = existing.imageUrl;
              p.status = 'completed';
              if (existing.coloringImageUrl) p.coloringImageUrl = existing.coloringImageUrl;
            }
          });
        }

        activeProject = { child, pages };
        saveProjectToFile();

        if (!res.headersSent) {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: true,
            message: 'تم توليد نصوص ومشاهد القصة بنجاح',
            project: activeProject
          }));
        }
      } catch (err) {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      }
    });
    return;
  }

  // 4. API: حفظ التعديلات على المشروع
  if (pathname === '/api/save-project' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50 * 1024 * 1024) req.destroy();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        if (payload.child) activeProject.child = payload.child;
        if (payload.pages) activeProject.pages = payload.pages;
        saveProjectToFile();
        if (!res.headersSent) {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, message: 'تم حفظ المشروع بنجاح' }));
        }
      } catch (e) {
        console.error('[Save Project Error]:', e.message);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
      }
    });
    return;
  }

  // 4.5. API: رفع واستيراد صورة مخصصة لصفحة معينة (من Google Flow أو من الجهاز مباشرة)
  if (pathname === '/api/upload-page-image' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50 * 1024 * 1024) req.destroy();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const pageNum = parseInt(payload.pageNumber);
        const dataUrl = payload.imageData;
        if (!pageNum || !dataUrl) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: 'بيانات غير مكتملة (رقم الصفحة أو بيانات الصورة مفقودة).' }));
          return;
        }

        const extracted = extractBase64Buffer(dataUrl);
        if (!extracted) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: 'صيغة الصورة غير صالحة.' }));
          return;
        }

        const fileName = `page-${pageNum}-flow-${Date.now()}.${extracted.type || 'png'}`;
        const filePath = path.join(IMAGES_DIR, fileName);
        fs.writeFileSync(filePath, extracted.buffer);

        const relativeUrl = `/generated-images/${fileName}`;
        const page = activeProject.pages.find(p => p.pageNumber === pageNum);
        if (page) {
          page.imageUrl = relativeUrl;
          page.status = 'completed';
          delete page.error;
          if (page.type === 'coloring') {
            page.coloringImageUrl = relativeUrl;
          }
          saveProjectToFile();
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: true,
          imageUrl: relativeUrl,
          pageNumber: pageNum,
          message: `تم استيراد وحفظ صورة الصفحة ${pageNum} بنجاح!`
        }));
      } catch (err) {
        console.error('[Upload Page Image Error]:', err.message);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      }
    });
    return;
  }

  // 4.6. API: بيانات المشروع المهندسة لروبوت Google Flow الآلي
  if (pathname === '/api/flow-project') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      success: true,
      child: activeProject.child,
      pages: activeProject.pages.map(p => ({
        pageNumber: p.pageNumber,
        title: p.title,
        type: p.type,
        textArabic: p.textArabic,
        imageUrl: p.imageUrl,
        flowPrompt: p.flowPromptEnglish || p.imagePromptEnglish
      }))
    }));
    return;
  }

  // 4.7. API: فتح موقع Google Flow في متصفح النظام
  if (pathname === '/api/open-flow') {
    const { spawn } = require('child_process');
    try {
      spawn('cmd.exe', ['/c', 'start', 'https://labs.google/flow'], { detached: true, stdio: 'ignore' }).unref();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, message: 'تم فتح موقع Google Flow في المتصفح بنجاح!' }));
    } catch (e) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: e.message }));
    }
    return;
  }

  // 4.8. API: مصفوفة JSON Array المعيارية الموجهة لـ Google Flow
  if (pathname === '/api/prompts/json') {
    loadProjectFromFile();
    const promptsArray = generatePromptsJsonArray(activeProject);
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(promptsArray, null, 2));
    return;
  }

  // 4.9. API: نقطة نهاية استخبارات الوكلاء الذكيين (AI Agent Hub Prompts)
  if (pathname === '/api/agent/prompts') {
    loadProjectFromFile();
    const promptsArray = generatePromptsJsonArray(activeProject);
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
      success: true,
      projectTitle: `مغامرات ${activeProject.child?.name || 'البطل'} مع ${activeProject.child?.favoriteHero || 'سبايدرمان'}`,
      child: activeProject.child,
      totalPages: activeProject.pages?.length || 12,
      referencePhotoUrl: activeProject.child?.photoUrl || '/sample-child.jpg',
      prompts: promptsArray
    }, null, 2));
    return;
  }

  // 4.10. API: تحديث وحقن صورة صفحة محددة برمجياً للوكلاء الذكيين (Agent Image Upload)
  if (pathname === '/api/agent/page-image' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const pageNum = parseInt(payload.pageNumber, 10);
        if (!pageNum || pageNum < 1 || pageNum > 12) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: 'رقم الصفحة غير صالح (1 إلى 12)' }));
          return;
        }

        let savedUrl = '';
        if (payload.imageData) {
          const extracted = extractBase64Buffer(payload.imageData);
          if (extracted) {
            const fileName = `page-${pageNum}-agent-${Date.now()}.${extracted.type || 'png'}`;
            const filePath = path.join(IMAGES_DIR, fileName);
            fs.writeFileSync(filePath, extracted.buffer);
            savedUrl = `/generated-images/${fileName}`;
          }
        } else if (payload.imageUrl) {
          savedUrl = payload.imageUrl;
        }

        if (!savedUrl) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: 'لم يتم توفير imageData أو imageUrl صالح' }));
          return;
        }

        const page = activeProject.pages.find(p => p.pageNumber === pageNum);
        if (page) {
          page.imageUrl = savedUrl;
          page.status = 'completed';
          page.error = null;
          saveProjectToFile();
          console.log(`[Agent API] تم تحديث صورة صفحة ${pageNum} بنجاح: ${savedUrl}`);
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, pageNumber: pageNum, imageUrl: savedUrl }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // 4.11. API: تحديث دفعة صور متعددة للوكيل الذكي
  if (pathname === '/api/agent/batch-images' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const items = Array.isArray(payload.images) ? payload.images : [];
        let updatedCount = 0;

        items.forEach(item => {
          const pageNum = parseInt(item.pageNumber, 10);
          const page = activeProject.pages.find(p => p.pageNumber === pageNum);
          if (page && item.imageUrl) {
            page.imageUrl = item.imageUrl;
            page.status = 'completed';
            page.error = null;
            updatedCount++;
          }
        });

        if (updatedCount > 0) saveProjectToFile();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, updatedCount }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // 4.12. API: تصدير كتيب المجلة A5 إلى ملف PDF جاهز للطباعة والتدبيس
  if (pathname === '/api/agent/export-pdf' || pathname === '/api/export-pdf') {
    loadProjectFromFile();
    exportBookletPdfHeadless(PORT).then(result => {
      res.writeHead(result.success ? 200 : 500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(result));
    }).catch(err => {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    });
    return;
  }

  // 5. شاشة طباعة الملازم المزدوجة (Booklet Imposition Print)
  if (pathname === '/api/print-booklet') {
    loadProjectFromFile();
    const project = activeProject;
    const spreads = calculateSaddleStitchImposition(project.pages.length || 12);
    const pagesMap = new Map(project.pages.map(p => [p.pageNumber, p]));

    const sheetsHtml = spreads.map(spread => `
      <div class="sheet">
        <div class="info-bar">
          <span>ورقة ${spread.sheetNumber} من 3 • ${spread.side === 'front' ? 'الوجه الأمامي' : 'الوجه الخلفي'}</span>
          <span>صفحة [${spread.leftPageNumber}] ⟵ خط الطي والتدبيس ⟶ صفحة [${spread.rightPageNumber}]</span>
          <span>مكتبة الشعلة • مجلة البطل ${project.child.name} [A5 Booklet]</span>
        </div>
        <div class="spread-body">
          <div class="page-half">${renderPage(pagesMap.get(spread.leftPageNumber), project)}</div>
          <div class="fold-line">
            <span class="staple-pin staple-1">📌 دبوس 1</span>
            <span class="staple-pin staple-2">📌 دبوس 2</span>
          </div>
          <div class="page-half">${renderPage(pagesMap.get(spread.rightPageNumber), project)}</div>
        </div>
      </div>
    `).join('\n');

    const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>طباعة الملازم المزدوجة A5 - مجلة البطل ${project.child.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@600;700;800&family=Cairo:wght@400;600;700;800;900&family=Changa:wght@500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 landscape; margin: 0; }
    body { margin: 0; padding: 0; background: #1e293b; font-family: 'Changa', 'Cairo', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .sheet { width: 297mm; height: 210mm; page-break-after: always; page-break-inside: avoid !important; break-inside: avoid !important; background: white; margin: 15px auto; box-shadow: 0 4px 15px rgba(0,0,0,0.3); display: flex; flex-direction: column; overflow: hidden; }
    .info-bar { height: 6mm; background: #0f172a; color: #cbd5e1; font-size: 9px; display: flex; justify-content: space-between; align-items: center; padding: 0 10mm; box-sizing: border-box; }
    .spread-body { flex: 1; display: flex; position: relative; height: calc(210mm - 6mm); }
    .page-half { width: 50%; height: 100%; overflow: hidden; box-sizing: border-box; page-break-inside: avoid !important; break-inside: avoid !important; }
    .fold-line { position: absolute; top: 0; bottom: 0; left: 50%; width: 1px; background: #cbd5e1; transform: translateX(-50%); pointer-events: none; z-index: 10; }
    .staple-pin { position: absolute; left: 50%; transform: translateX(-50%); background: #ef4444; color: white; font-size: 8px; padding: 1px 4px; border-radius: 3px; white-space: nowrap; }
    .staple-1 { top: 35mm; }
    .staple-2 { bottom: 35mm; }
    @media print {
      body { background: transparent; }
      .sheet { margin: 0; box-shadow: none; width: 100vw; height: 100vh; }
      .info-bar { background: #f8fafc; color: #64748b; }
    }
  </style>
</head>
<body onload="window.print()">
  ${sheetsHtml}
</body>
</html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  // 6. شاشة طباعة نسخة القراءة الرقمية (Digital Reading Print)
  if (pathname === '/api/print-reading') {
    const project = activeProject;
    const pagesHtml = project.pages.map(page => `
      <div class="reading-page">
        ${renderPage(page, project)}
      </div>
    `).join('\n');

    const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>نسخة القراءة الرقمية - مجلة البطل ${project.child.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@600;700;800&family=Cairo:wght@400;600;700;800;900&family=Changa:wght@500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page { size: A5 portrait; margin: 0; }
    body { margin: 0; padding: 0; background: #e2e8f0; font-family: 'Changa', 'Cairo', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .reading-page { width: 148mm; height: 210mm; page-break-after: always; page-break-inside: avoid !important; break-inside: avoid !important; background: white; margin: 15px auto; box-shadow: 0 4px 10px rgba(0,0,0,0.15); overflow: hidden; }
    @media print {
      body { background: transparent; }
      .reading-page { margin: 0; box-shadow: none; width: 100vw; height: 100vh; }
    }
  </style>
</head>
<body onload="window.print()">
  ${pagesHtml}
</body>
</html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  // 7. خدمة الملفات الثابتة (Public Static Files)
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.ipynb': 'application/x-ipynb+json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading resource');
    } else {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`[مكتبة الشعلة] تعمل لوحة التحكم بنجاح على الرابط: http://localhost:${PORT}`);
  console.log(`[مكتبة الشعلة] محرك التوليد النشط: ${API_CONFIG.apiType} | الرابط: ${API_CONFIG.customApiUrl || API_CONFIG.endpointUrl}`);
  console.log('[مكتبة الشعلة] تم تفعيل طابور التوليد المتسلسل ودعم مسار العمل ComfyUI / Colab ودمج الوجوه FaceID بنسبة 100%');
});

process.on('uncaughtException', (err) => {
  console.error('[Server UncaughtException Handler]:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('[Server UnhandledRejection Handler]:', reason);
});
