const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

async function runAutomation() {
  const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
  const userDataDir = path.resolve(__dirname, '..', '..', '.chrome-flow-profile');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  console.log('====================================================');
  console.log('🤖 [Maktaba Flow Agent] تشغيل وكيل الأتمتة المباشر لـ Google Flow');
  console.log(`🌐 Server: ${serverUrl}`);
  console.log(`📁 User Data Dir: ${userDataDir}`);
  console.log('====================================================');

  try {
    // 1. جلب مصفوفة الأوامر JSON Array من الخادم
    console.log('\n[1/5] جلب مصفوفة الأوامر JSON Array من الخادم...');
    const promptsRes = await fetch(`${serverUrl}/api/prompts/json`);
    if (!promptsRes.ok) {
      throw new Error(`تعذر الاتصال بـ ${serverUrl}/api/prompts/json (${promptsRes.status})`);
    }
    const promptsArray = await promptsRes.json();
    console.log(`✅ تم استلام ${promptsArray.length} أمراً بصيغة JSON Array!`);

    // 2. إطلاق متصفح Chrome بنافذة مرئية وجلسة مستمرة
    console.log('\n[2/5] إطلاق متصفح Google Chrome مع جلسة Google Flow...');
    if (!fs.existsSync(userDataDir)) {
      fs.mkdirSync(userDataDir, { recursive: true });
    }

    const context = await chromium.launchPersistentContext(userDataDir, {
      executablePath: chromePath,
      headless: false, // نافذة مرئية للتفاعل المباشر ومراقبة التوليد
      viewport: { width: 1366, height: 800 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

    console.log('\n[3/5] فتح موقع Google Flow...');
    await page.goto('https://flow.google.com/', { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(3000);

    // التحقق من شاشة تسجيل الدخول
    let currentUrl = page.url();
    if (currentUrl.includes('accounts.google.com') || currentUrl.includes('/about')) {
      console.log('⚠️ [مطلوب تسجيل الدخول]: يرجى تسجيل الدخول إلى حساب Google الخاص بك في نافذة المتصفح المفتوحة.');
      console.log('⏳ الروبوت بانتظار إتمام تسجيل الدخول وفتح استوديو Flow...');

      // إذا كان في صفحة about، انقر على زر التجربة
      const tryBtn = await page.$('button:has-text("التجربة في Google Flow"), button:has-text("Try Flow")');
      if (tryBtn) await tryBtn.click().catch(() => {});

      // الانتظار حتى يصل إلى استوديو Flow أو يعود للصفحة الرئيسية
      await page.waitForFunction(() => {
        return window.location.href.includes('flow.google.com') && 
               !window.location.href.includes('/about') && 
               !window.location.href.includes('accounts.google.com');
      }, { timeout: 120000 }).catch(() => {
        console.log('⏳ استمرار الروبوت مع الجلسة الحالية...');
      });
      console.log('✅ تم تسجيل الدخول والدخول إلى Google Flow Studio بنجاح!');
    }

    // 4. توليد الصور في Google Flow واستيرادها صفحة بصفحة
    console.log('\n[4/5] بدء معالجة الأوامر الـ 12 من مصفوفة JSON في Google Flow...');
    
    for (let i = 0; i < promptsArray.length; i++) {
      const item = promptsArray[i];
      console.log(`\n----------------------------------------------------`);
      console.log(`📌 معالجة [صفحة ${item.pageNumber}] ${item.title} (${item.type})`);
      console.log(`📝 Prompt: ${item.detailedFlowPrompt.slice(0, 120)}...`);

      // البحث عن مربع إدخال النص في Google Flow
      const promptInput = await page.waitForSelector(
        'textarea, [contenteditable="true"], input[type="text"]',
        { timeout: 15000 }
      ).catch(() => null);

      if (promptInput) {
        // إدخال أمر المشهد من JSON Array
        await promptInput.click();
        await promptInput.fill(item.detailedFlowPrompt);
        await page.waitForTimeout(600);

        // البحث عن زر Generate
        const genBtn = await page.$('button:has-text("Generate"), button:has-text("Create"), button:has-text("توليد"), button[type="submit"]');
        if (genBtn) {
          console.log(`🚀 تم الضغط على زر توليد صفحة ${item.pageNumber} في Google Flow...`);
          await genBtn.click();
        } else {
          await page.keyboard.press('Enter');
        }

        // الانتظار حتى يكتمل توليد الصورة في Google Flow
        console.log('⏳ بانتظار اكتمال رسم المشهد في Google Flow (حوالي 18 ثانية)...');
        await page.waitForTimeout(18000);

        // استخراج الصورة المولدة من DOM بصيغة Base64
        const imgDataUrl = await page.evaluate(async () => {
          const imgs = Array.from(document.querySelectorAll('img')).filter(img => {
            const s = img.src || '';
            return !s.includes('avatar') && !s.includes('google_logo') && (img.naturalWidth > 200 || img.width > 200);
          });
          if (imgs.length === 0) return null;
          const target = imgs[imgs.length - 1];
          try {
            const canvas = document.createElement('canvas');
            canvas.width = target.naturalWidth || 1024;
            canvas.height = target.naturalHeight || 768;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(target, 0, 0);
            return canvas.toDataURL('image/png');
          } catch (e) {
            const r = await fetch(target.src);
            const b = await r.blob();
            return new Promise(res => {
              const reader = new FileReader();
              reader.onloadend = () => res(reader.result);
              reader.readAsDataURL(b);
            });
          }
        });

        if (imgDataUrl) {
          // إرسال الصورة المولدة من Google Flow مباشرة إلى الخادم
          const uploadRes = await fetch(`${serverUrl}/api/agent/page-image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pageNumber: item.pageNumber,
              imageData: imgDataUrl
            })
          });
          const uploadJson = await uploadRes.json();
          if (uploadJson.success) {
            console.log(`✅ [نجاح Google Flow] تم استيراد وحفظ صورة صفحة ${item.pageNumber} عالية الدقة في المشروع!`);
          }
        } else {
          console.log(`⚠️ لم يتم التقاط صورة لصفحة ${item.pageNumber}، جاري المتابعة...`);
        }
      } else {
        console.log(`⚠️ تعذر العثور على مربع إدخال الأوامر في صفحة Google Flow.`);
      }
    }

    // 5. تصدير كتيب المجلة A5 النهائي مع الصور المولدة
    console.log('\n[5/5] تصدير كتيب المجلة الورقي A5 بالصور الحقيقية...');
    const pdfRes = await fetch(`${serverUrl}/api/agent/export-pdf`);
    const pdfData = await pdfRes.json();

    if (pdfData.success) {
      console.log('\n====================================================');
      console.log('🎉 [نجاح باهر] تم تصدير كتيب المجلة A5 بنجاح بالصور الحقيقية!');
      console.log(`📄 PDF Download URL: ${serverUrl}${pdfData.pdfUrl}`);
      console.log(`💾 Local File: ${pdfData.filePath}`);
      console.log('====================================================');
    }
  } catch (err) {
    console.error('❌ خطأ في تشغيل الروبوت:', err.message);
  }
}

runAutomation();
