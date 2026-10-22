import { MagazineProject, MagazinePage } from '@maktaba/core';

/**
 * دالة توليد تصميم صفحة مفردة من المجلة للطباعة المباشرة (A5 Booklet)
 * الصورة بالأعلى (50-55%) والنص السردي بالأسفل (4-6 أسطر بدون تشكيل)
 */
export function renderSinglePageHtml(page: MagazinePage, project: MagazineProject, shopName: string = 'مكتبة الشعلة'): string {
  const { child } = project;

  if (page.type === 'cover') {
    return `
    <div class="magazine-page cover-page" style="page-break-inside: avoid; break-inside: avoid; width:100%; height:100%; overflow:hidden; background: linear-gradient(135deg, #1e3a8a, #3b82f6); color:white; display:flex; flex-direction:column; justify-content:space-between; padding:20px; box-sizing:border-box; font-family:'Cairo', sans-serif;">
      <!-- شريط علوي للغلاف -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid rgba(255,255,255,0.4); padding-bottom:8px;">
        <span style="background:#ef4444; color:white; font-weight:bold; padding:3px 10px; border-radius:15px; font-size:12px;">إصدار خاص وحصري</span>
        <span style="font-weight:bold; font-size:14px; color:#fde047;">${shopName} للقصص التربوية</span>
        <span style="font-size:11px; color:#e0e7ff;">العدد 1 • 2026</span>
      </div>

      <!-- العنوان الرئيسي المخصص -->
      <div style="text-align:center; margin:10px 0;">
        <h1 style="font-size:26px; font-weight:900; margin:0; color:#fef08a; line-height:1.2;">مغامرات البطل ${child.name}</h1>
        <h2 style="font-size:18px; font-weight:700; margin:4px 0 0; color:#ffffff;">مع ${child.favoriteHero}</h2>
        <div style="display:inline-block; margin-top:6px; background:rgba(0,0,0,0.3); padding:3px 14px; border-radius:12px; font-size:12px; border:1px solid #fde047; color:#fde047;">
          ${page.title || 'سر قوة الأبطال الحقيقية'}
        </div>
      </div>

      <!-- الصورة الرئيسية للغلاف (بدون مربعات ملونة عند توفر الصورة) -->
      <div style="flex:1; display:flex; justify-content:center; align-items:center; margin:8px 0; overflow:hidden;">
        <div style="width:100%; height:100%; border-radius:14px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.4); border:3px solid #fde047; background:#0f172a; display:flex; align-items:center; justify-content:center;">
          ${page.imageUrl ? `<img src="${page.imageUrl}" alt="صورة الغلاف" style="width:100%; height:100%; object-fit:cover; display:block;" />` : `
            <div style="text-align:center; padding:15px; color:#94a3b8;">
              <div style="font-size:45px; margin-bottom:8px;">🦸‍♂️</div>
              <p style="font-size:14px; font-weight:bold; color:#e2e8f0; margin:0;">البطل ${child.name} برفقة ${child.favoriteHero}</p>
              ${child.includeParentsInStory ? `<p style="font-size:11px; color:#fde047; margin-top:4px;">✨ مع دمج الوالدين في المشهد (Multi-Subject FaceID)</p>` : ''}
            </div>
          `}
        </div>
      </div>

      <!-- شريط سفلي للغلاف -->
      <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.4); padding:8px 12px; border-radius:10px; font-size:11px;">
        <div style="color:#fed7aa; font-weight:bold;">⭐ قصة لترسيخ: ${child.positiveAlternative}</div>
        <div style="color:#cbd5e1;">بطلنا: ${child.name} (${child.age} سنوات)</div>
      </div>
    </div>
    `;
  }

  if (page.type === 'dedication') {
    return `
    <div class="magazine-page dedication-page" style="page-break-inside: avoid; break-inside: avoid; width:100%; height:100%; background:#fffbeb; color:#1e293b; display:flex; flex-direction:column; justify-content:space-between; padding:25px 20px; box-sizing:border-box; font-family:'Cairo', sans-serif;">
      <div style="text-align:center; border-bottom:2px dashed #f59e0b; padding-bottom:10px;">
        <span style="font-size:32px;">💌</span>
        <h2 style="font-size:22px; font-weight:bold; color:#b45309; margin:4px 0;">رسالة حب وفخر من الوالدين</h2>
        <p style="font-size:13px; color:#78350f; margin:0;">إلى بطلنا الغالي قرة أعيننا: <strong>${child.name}</strong></p>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:20px; background:white; border-radius:14px; margin:15px 0; box-shadow:0 4px 15px rgba(245, 158, 11, 0.1); border:1px solid #fde68a;">
        <!-- صور العائلة إذا توفرت -->
        ${(child.photoUrl || child.fatherPhotoUrl || child.motherPhotoUrl) ? `
        <div style="display:flex; justify-content:center; gap:10px; margin-bottom:15px;">
          ${child.photoUrl ? `<img src="${child.photoUrl}" title="${child.name}" style="width:65px; height:65px; border-radius:50%; object-fit:cover; border:2px solid #3b82f6;" />` : ''}
          ${child.fatherPhotoUrl ? `<img src="${child.fatherPhotoUrl}" title="الأب" style="width:65px; height:65px; border-radius:50%; object-fit:cover; border:2px solid #10b981;" />` : ''}
          ${child.motherPhotoUrl ? `<img src="${child.motherPhotoUrl}" title="الأم" style="width:65px; height:65px; border-radius:50%; object-fit:cover; border:2px solid #ec4899;" />` : ''}
        </div>
        ` : ''}

        <div style="font-size:16px; line-height:1.8; color:#334155; text-align:center; max-width:90%;">
          ${child.parentDedication || `يا بطلنا الغالي ${child.name}، نحن فخورون بك وبذكائك في كل خطوة تخطوها. هذه القصة صنعت لك خصيصا لأنك بطل حقيقي في قلوبنا تستحق كل التميز والنجاح.`}
        </div>
        <div style="margin-top:20px; text-align:center; font-weight:bold; color:#b45309; font-size:15px;">
          بكل الحب،<br><span style="font-size:17px;">${child.parentName || 'والداك المحبان'} ❤️</span>
        </div>
      </div>

      <div style="text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #fef3c7; padding-top:8px;">
        صفحة 2 • مجلة الأبطال التربوية
      </div>
    </div>
    `;
  }

  if (page.type === 'story') {
    return `
    <div class="magazine-page story-page" style="page-break-inside: avoid; break-inside: avoid; width:100%; height:100%; background:#ffffff; color:#0f172a; display:flex; flex-direction:column; padding:16px; box-sizing:border-box; font-family:'Cairo', sans-serif; position:relative;">
      <!-- شريط العنوان ورقم الصفحة -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="background:#dbeafe; color:#1d4ed8; font-weight:bold; font-size:12px; padding:3px 10px; border-radius:6px;">
          المشهد ${page.pageNumber - 2}: ${page.title}
        </span>
        <span style="color:#64748b; font-size:12px; font-weight:bold;">صفحة ${page.pageNumber}</span>
      </div>

      <!-- المنطقة العلوية: الصورة عالية الدقة (حوالي 52% من الصفحة) -->
      <div style="height:52%; border-radius:12px; overflow:hidden; border:2px solid #e2e8f0; position:relative; background:#0f172a; display:flex; align-items:center; justify-content:center;">
        ${page.imageUrl ? `<img src="${page.imageUrl}" alt="${page.title}" style="width:100%; height:100%; object-fit:cover; display:block;" />` : `
          <div style="text-align:center; padding:15px; color:#94a3b8;">
            <div style="font-size:36px; margin-bottom:5px;">🎨</div>
            <p style="font-size:13px; font-weight:bold; color:#e2e8f0; margin:0;">${page.title}</p>
            <p style="font-size:10px; color:#cbd5e1; direction:ltr; margin-top:5px; max-width:85%;">${page.imagePromptEnglish || ''}</p>
          </div>
        `}
      </div>

      <!-- المنطقة السفلية: النص السردي (4 إلى 6 أسطر بدون تشكيل) وبالون الحوار -->
      <div style="flex:1; display:flex; flex-direction:column; justify-content:space-between; margin-top:10px;">
        <!-- النص السردي المليء بالأحداث -->
        <div style="font-size:14px; line-height:1.65; color:#1e293b; background:#f8fafc; padding:10px 14px; border-radius:10px; border-right:4px solid #3b82f6; text-align:justify;">
          ${page.textArabic}
        </div>

        <!-- بالون حوار البطل أو الوالدين -->
        ${page.dialogueBubble ? `
        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:7px 12px; display:flex; align-items:center; gap:8px; margin-top:6px;">
          <span style="font-weight:bold; color:#1d4ed8; font-size:12px; white-space:nowrap;">💬 ${page.dialogueBubble.speaker}:</span>
          <span style="font-size:13px; color:#1e3a8a; font-weight:bold;">"${page.dialogueBubble.text}"</span>
        </div>
        ` : ''}
      </div>
    </div>
    `;
  }

  if (page.type === 'coloring') {
    return `
    <div class="magazine-page coloring-page" style="page-break-inside: avoid; break-inside: avoid; width:100%; height:100%; background:#ffffff; color:#0f172a; display:flex; flex-direction:column; justify-content:space-between; padding:16px; box-sizing:border-box; font-family:'Cairo', sans-serif;">
      <!-- شريط علوي -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px dashed #94a3b8; padding-bottom:6px;">
        <div style="display:flex; align-items:center; gap:6px;">
          <span style="font-size:20px;">🖍️</span>
          <span style="font-size:14px; font-weight:bold; color:#475569;">صفحة التلوين الإبداعية: ${page.title}</span>
        </div>
        <span style="color:#64748b; font-size:12px; font-weight:bold;">صفحة ${page.pageNumber}</span>
      </div>

      <!-- إطار رسمة التلوين المفرغة (بدون مربعات ملونة عند التوليد) -->
      <div style="flex:1; border:3px solid #cbd5e1; border-radius:12px; margin:10px 0; display:flex; justify-content:center; align-items:center; overflow:hidden; background:#ffffff; position:relative;">
        ${(page.coloringImageUrl || page.imageUrl) ? `<img src="${page.coloringImageUrl || page.imageUrl}" alt="رسمة التلوين" style="width:100%; height:100%; object-fit:contain; display:block;" />` : `
          <div style="text-align:center; padding:15px;">
            <div style="font-size:40px; margin-bottom:8px;">✏️</div>
            <p style="font-size:15px; font-weight:bold; color:#334155; margin:0;">لوّن بطلنا ${child.name}!</p>
            <p style="font-size:11px; color:#64748b; margin-top:4px;">رسمة خطية نقية مفرغة للتلوين بالأقلام</p>
          </div>
        `}
      </div>

      <!-- توجيه للطفل -->
      <div style="text-align:center; font-size:12px; font-weight:bold; color:#64748b; background:#f8fafc; padding:6px; border-radius:6px;">
        🎨 استخدم ألوانك المفضلة لتجعل المشهد يضيء بالجمال والبطولة!
      </div>
    </div>
    `;
  }

  if (page.type === 'certificate') {
    return `
    <div class="magazine-page certificate-page" style="page-break-inside: avoid; break-inside: avoid; width:100%; height:100%; background:#fffbeb; color:#0f172a; display:flex; flex-direction:column; justify-content:space-between; padding:20px; box-sizing:border-box; font-family:'Cairo', sans-serif;">
      <!-- إطار ملكي ذهبي للشهادة -->
      <div style="width:100%; height:100%; border:5px double #d97706; border-radius:14px; padding:16px; box-sizing:border-box; background:white; display:flex; flex-direction:column; justify-content:space-between; text-align:center; box-shadow:0 6px 20px rgba(217, 119, 6, 0.12);">
        
        <!-- الترويسة -->
        <div>
          <div style="font-size:35px; margin-bottom:4px;">🏆 ⭐ 🏆</div>
          <h2 style="font-size:22px; font-weight:900; color:#b45309; margin:0;">شهادة بطل السلوك الإيجابي والتفوق</h2>
          <div style="width:70px; height:3px; background:#d97706; margin:6px auto;"></div>
        </div>

        <!-- نص التكريم المخصص بدون تشكيل -->
        <div style="margin:8px 0;">
          <p style="font-size:13px; color:#475569; margin:0;">بكل فخر واعتزاز تمنح هذه الشهادة للبطل الرائع:</p>
          <div style="font-size:28px; font-weight:900; color:#1e3a8a; margin:8px 0; text-decoration:underline; text-decoration-color:#f59e0b;">
            ${child.name}
          </div>
          <p style="font-size:14px; color:#334155; line-height:1.7; max-width:85%; margin:auto;">
            تقديرا لشجاعته وتميزه ونجاحه في التحلي بـ <strong>${child.positiveAlternative}</strong> ليصبح قدوة حسنة وبطلا حقيقيا يفتخر به الجميع.
          </p>
        </div>

        <!-- أختام وتوقيعات -->
        <div style="display:flex; justify-content:space-around; align-items:flex-end; border-top:1px solid #fed7aa; padding-top:12px;">
          <div>
            <div style="font-size:12px; font-weight:bold; color:#78350f;">توقيع ولي الأمر</div>
            <div style="margin-top:12px; font-size:14px; color:#b45309; font-weight:bold;">${child.parentName || 'الأب والأم'}</div>
          </div>
          <div>
            <div style="border:2px dashed #d97706; border-radius:50%; width:60px; height:60px; display:flex; align-items:center; justify-content:center; color:#d97706; font-size:10px; font-weight:bold; transform:rotate(-10deg);">
              ختم التميز<br>2026
            </div>
          </div>
          <div>
            <div style="font-size:12px; font-weight:bold; color:#78350f;">ختم وتوقيع المكتبة</div>
            <div style="margin-top:12px; font-size:14px; color:#b45309; font-weight:bold;">${shopName}</div>
          </div>
        </div>

        <div style="font-size:10px; color:#94a3b8;">
          صفحة 12 (الغلاف الخلفي) • شهادة معتمدة لتكريم الأبطال
        </div>
      </div>
    </div>
    `;
  }

  return `<div>صفحة غير محددة</div>`;
}

/**
 * دالة توليد ملف HTML الكامل لنسخة القراءة الرقمية (1 إلى 12 صفحة متتالية)
 */
export function generateDigitalReadingHtml(project: MagazineProject, shopName: string = 'مكتبة الشعلة'): string {
  const pagesHtml = project.pages.map(page => `
    <div class="sheet-container">
      ${renderSinglePageHtml(page, project, shopName)}
    </div>
  `).join('\n');

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>مجلة البطل ${project.child.name} - نسخة القراءة</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A5 portrait;
      margin: 0;
    }
    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: 'Cairo', sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .sheet-container {
      width: 148mm;
      height: 210mm;
      page-break-after: always;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      position: relative;
      margin: 10px auto;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      background: white;
      overflow: hidden;
    }
    @media print {
      body {
        background: transparent;
      }
      .sheet-container {
        margin: 0;
        box-shadow: none;
        width: 100vw;
        height: 100vh;
      }
    }
  </style>
</head>
<body onload="window.print()">
  ${pagesHtml}
</body>
</html>
  `;
}
