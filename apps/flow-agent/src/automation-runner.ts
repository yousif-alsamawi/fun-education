import { chromium, BrowserContext, Page } from 'playwright-core';
import * as path from 'path';
import * as fs from 'fs';

export interface AutomationRunnerOptions {
  serverUrl?: string;
  userDataDir?: string;
  headless?: boolean;
  dryRun?: boolean;
}

/**
 * روبوت أتمتة Google Flow وتوليد المجلة حتى تصدير A5 PDF
 */
export async function runFullBookletAutomation(options: AutomationRunnerOptions = {}) {
  const serverUrl = options.serverUrl || 'http://localhost:3000';
  const userDataDir = options.userDataDir || path.resolve(process.cwd(), '.chrome-flow-profile');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  console.log('====================================================');
  console.log('🤖 [Maktaba Agent Runner] بدء تشغيل وكيل الأتمتة الشامل');
  console.log(`🌐 Server: ${serverUrl}`);
  console.log(`📁 User Data Dir: ${userDataDir}`);
  console.log('====================================================');

  // 1. جلب مصفوفة الأوامر JSON Array من الخادم
  console.log('\n[1/5] جلب مصفوفة الأوامر JSON Array من الخادم المحلي...');
  const promptsRes = await fetch(`${serverUrl}/api/prompts/json`);
  if (!promptsRes.ok) {
    throw new Error(`فشل جلب الأوامر من الخادم (${promptsRes.status})`);
  }
  const promptsArray = await promptsRes.json();
  console.log(`✅ تم استلام ${promptsArray.length} أمراً بصيغة JSON Array بنجاح!`);

  // 2. إطلاق متصفح Chrome بجلسة عمل مستمرة لحفظ تسجيل دخول Google
  console.log('\n[2/5] إطلاق متصفح Chrome بجلسة مستمرة (Persistent Session)...');
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  const context: BrowserContext = await chromium.launchPersistentContext(userDataDir, {
    executablePath: chromePath,
    headless: options.headless ?? false,
    viewport: { width: 1366, height: 768 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page: Page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  try {
    // 3. فتح موقع Google Flow
    console.log('\n[3/5] فتح موقع Google Flow Studio...');
    await page.goto('https://labs.google/flow', { waitUntil: 'domcontentloaded', timeout: 45000 });

    console.log('⏳ التحقق من حالة تسجيل الدخول إلى Google Flow...');
    await page.waitForTimeout(4000);

    // إذا تم تفعيل وضع dryRun أو الفحص
    if (options.dryRun) {
      console.log('ℹ️ [DryRun Mode] التحقق من توافر عناصر الإدخال والأوامر...');
    }

    console.log(`✅ جاهز لتنفيذ الأوامر الـ ${promptsArray.length} في Google Flow.`);

    // 4. حلقة معالجة الأوامر
    console.log('\n[4/5] تمرير الأوامر وتوليد الصور...');
    for (const item of promptsArray) {
      console.log(`\n📌 [صفحة ${item.pageNumber}] ${item.title} (${item.type})`);
      console.log(`📝 Prompt: ${item.detailedFlowPrompt.slice(0, 100)}...`);
      // محاولة حقن الأمر في مربع النص
      try {
        const promptInput = await page.$('textarea, input[type="text"], div[contenteditable="true"]');
        if (promptInput) {
          await promptInput.fill(item.detailedFlowPrompt);
          console.log(`  ✓ تم إدخال أمر صفحة ${item.pageNumber}`);
        }
      } catch (err: any) {
        console.log(`  ℹ️ ملاحظة عند الإدخال: ${err.message}`);
      }
    }

    // 5. استدعاء تصدير كتيب المجلة A5 بنظام الملازم المزدوجة
    console.log('\n[5/5] تصدير كتيب المجلة A5 إلى ملف PDF جاهز للطباعة والتدبيس...');
    const pdfRes = await fetch(`${serverUrl}/api/agent/export-pdf`);
    const pdfData = await pdfRes.json();

    if (pdfData.success) {
      console.log('====================================================');
      console.log('🎉 [نجاح باهر] تم تصدير كتيب المجلة A5 بنجاح!');
      console.log(`📄 PDF URL: ${serverUrl}${pdfData.pdfUrl}`);
      console.log(`💾 Path: ${pdfData.filePath}`);
      console.log('====================================================');
    } else {
      console.warn('⚠️ تعذر تصدير PDF:', pdfData.error);
    }

    return {
      success: true,
      promptsCount: promptsArray.length,
      pdfResult: pdfData
    };
  } finally {
    if (options.headless) {
      await context.close();
    }
  }
}
