/**
 * مساعد وروبوت قوقل فلو الآلي بنقرة واحدة - مكتبة الشعلة
 * Google Flow 1-Click Copilot & Automation Bridge
 */
(function() {
  if (window.__MaktabaFlowCopilotLoaded) {
    const existing = document.getElementById('maktaba-flow-copilot-widget');
    if (existing) {
      existing.style.display = 'block';
      alert('مساعد مكتبة الشعلة يعمل بالفعل في هذه الصفحة! انظر في أسفل الشاشة.');
      return;
    }
  }
  window.__MaktabaFlowCopilotLoaded = true;

  const SERVER_URL = 'http://localhost:3000';
  let projectData = null;
  let currentPageIndex = 0;
  let isAutoRunning = false;

  // 1. حقن خط Cairo وتنسيقات الـ Widget
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Changa:wght@700;900&display=swap');
    #maktaba-flow-copilot-widget {
      position: fixed;
      bottom: 24px;
      left: 24px;
      width: 380px;
      max-width: 90vw;
      background: #0f172a;
      color: #f8fafc;
      border: 2px solid #8b5cf6;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(139, 92, 246, 0.3);
      z-index: 999999;
      font-family: 'Cairo', system-ui, sans-serif;
      direction: rtl;
      text-align: right;
      padding: 16px;
      box-sizing: border-box;
      transition: transform 0.2s, opacity 0.2s;
    }
    #maktaba-flow-copilot-widget.minimized {
      height: 52px;
      overflow: hidden;
      width: 240px;
      padding: 10px 14px;
    }
    .mfc-btn {
      cursor: pointer;
      border: none;
      border-radius: 12px;
      font-family: 'Changa', 'Cairo', sans-serif;
      font-weight: 700;
      font-size: 12px;
      padding: 8px 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .mfc-btn:active { transform: scale(0.96); }
    .mfc-btn-primary {
      background: linear-gradient(135deg, #7c3aed, #4f46e5);
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
    }
    .mfc-btn-primary:hover { background: linear-gradient(135deg, #6d28d9, #4338ca); }
    .mfc-btn-success {
      background: #059669;
      color: #ffffff;
    }
    .mfc-btn-success:hover { background: #047857; }
    .mfc-btn-secondary {
      background: #1e293b;
      color: #cbd5e1;
      border: 1px solid #334155;
    }
    .mfc-btn-secondary:hover { background: #334155; color: #fff; }
  `;
  document.head.appendChild(styleEl);

  // 2. إنشاء هيكل الواجهة العائمة
  const widget = document.createElement('div');
  widget.id = 'maktaba-flow-copilot-widget';
  widget.innerHTML = `
    <!-- الترويسة -->
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:8px; margin-bottom:10px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:20px;">🤖</span>
        <div>
          <div style="font-family:'Changa',sans-serif; font-size:13px; font-weight:900; color:#c084fc;">روبوت مكتبة الشعلة لـ Flow</div>
          <div id="mfc-child-badge" style="font-size:10px; color:#94a3b8;">جاري الاتصال بالمشروع...</div>
        </div>
      </div>
      <div style="display:flex; gap:4px;">
        <button id="mfc-btn-min" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:16px;">_</button>
        <button id="mfc-btn-close" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:16px;">✕</button>
      </div>
    </div>

    <!-- محتوى الروبوت -->
    <div id="mfc-body">
      <!-- اختيار الصفحة الحالية -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <button id="mfc-prev-page" class="mfc-btn mfc-btn-secondary" style="padding:4px 8px; font-size:11px;">⟵ السابقة</button>
        <span id="mfc-page-indicator" style="font-size:11px; font-weight:700; color:#e2e8f0;">صفحة 1 من 12</span>
        <button id="mfc-next-page" class="mfc-btn mfc-btn-secondary" style="padding:4px 8px; font-size:11px;">التالية ⟶</button>
      </div>

      <div id="mfc-page-title" style="font-size:11px; font-weight:700; color:#a78bfa; margin-bottom:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
        الغلاف الخارجي الرئيسي
      </div>

      <!-- مربع استعراض الأمر -->
      <div style="background:#090d16; border:1px solid #1e293b; border-radius:10px; padding:8px; font-family:monospace; font-size:10px; color:#cbd5e1; direction:ltr; text-align:left; max-height:60px; overflow-y:auto; margin-bottom:12px; line-height:1.4;" id="mfc-prompt-box">
        Loading prompt...
      </div>

      <!-- الأزرار الرئيسية بنقرة واحدة -->
      <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px;">
        <!-- الزر السحري بنقرة واحدة: يكتب الأمر ويضغط توليد -->
        <button id="mfc-btn-inject-generate" class="mfc-btn mfc-btn-primary" style="width:100%; font-size:13px; padding:10px;">
          <span>⚡</span> 1-Click: إرسال الأمر وبدء التوليد
        </button>

        <!-- زر نقل الصورة المولدة مباشرة إلى موقع مكتبة الشعلة -->
        <button id="mfc-btn-capture-upload" class="mfc-btn mfc-btn-success" style="width:100%; font-size:12px;">
          <span>📥</span> 1-Click: سحب الصورة الناتجة ونقلها للمكتبة
        </button>
      </div>

      <!-- زر الأتمتة الشاملة للـ 12 صفحة -->
      <button id="mfc-btn-auto-all" class="mfc-btn mfc-btn-secondary" style="width:100%; font-size:11px; border-color:#7c3aed; color:#c084fc;">
        <span>🚀</span> أتمتة كاملة متتالية لجميع الصفحات (12 صفحة)
      </button>

      <!-- شريط الحالة -->
      <div id="mfc-status-bar" style="margin-top:10px; font-size:10px; color:#94a3b8; text-align:center; padding:4px; border-radius:6px; background:#1e293b;">
        جاهز لإرسال الأوامر بنقرة واحدة ✅
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  // 3. عناصر التحكم بالواجهة
  const bodyEl = document.getElementById('mfc-body');
  document.getElementById('mfc-btn-min').onclick = () => {
    widget.classList.toggle('minimized');
  };
  document.getElementById('mfc-btn-close').onclick = () => {
    widget.style.display = 'none';
  };

  function updateStatus(text, color = '#94a3b8') {
    const el = document.getElementById('mfc-status-bar');
    if (el) {
      el.innerText = text;
      el.style.color = color;
    }
  }

  // 4. جلب المشروع ومصفوفة الأوامر JSON Array من موقع مكتبة الشعلة
  async function fetchProject() {
    updateStatus('جاري الاتصال بمكتبة الشعلة...');
    try {
      const res = await fetch(`${SERVER_URL}/api/agent/prompts`);
      const data = await res.json();
      if (data.success && data.prompts && data.prompts.length > 0) {
        projectData = {
          child: data.child,
          pages: data.prompts
        };
        document.getElementById('mfc-child-badge').innerText = `البطل: ${data.child?.name || 'عمر'} (${data.child?.age || 7} سنوات)`;
        renderCurrentPage();
        updateStatus('متصل بنجاح مع مصفوفة أوامر JSON Array! جاهز للتوليد في Flow ✅', '#34d399');
      } else {
        updateStatus('تعذر جلب الأوامر، تأكد من فتح موقع مكتبة الشعلة على 3000', '#f87171');
      }
    } catch (e) {
      updateStatus('تأكد من تشغيل موقع الشعلة على http://localhost:3000', '#f87171');
    }
  }

  function renderCurrentPage() {
    if (!projectData || !projectData.pages) return;
    const page = projectData.pages[currentPageIndex];
    if (!page) return;

    document.getElementById('mfc-page-indicator').innerText = `صفحة ${page.pageNumber} من ${projectData.pages.length}`;
    document.getElementById('mfc-page-title').innerText = `[${page.title}] - ${page.type}`;
    document.getElementById('mfc-prompt-box').innerText = page.detailedFlowPrompt || page.flowPrompt || '';
  }

  document.getElementById('mfc-prev-page').onclick = () => {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      renderCurrentPage();
    }
  };
  document.getElementById('mfc-next-page').onclick = () => {
    if (projectData && currentPageIndex < projectData.pages.length - 1) {
      currentPageIndex++;
      renderCurrentPage();
    }
  };

  // 5. محرك التفاعل مع واجهة Google Flow (DOM Automation)
  function findFlowPromptInput() {
    return document.querySelector('textarea, [contenteditable="true"], input[placeholder*="prompt" i], input[placeholder*="describe" i], input[type="text"]');
  }

  function findFlowGenerateButton() {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => {
      const text = (b.innerText || b.getAttribute('aria-label') || '').toLowerCase();
      return text.includes('generate') || text.includes('create') || text.includes('run') || text.includes('submit') || text.includes('توليد');
    }) || document.querySelector('button[type="submit"], [aria-label*="Generate" i], button.send-button');
  }

  function injectPrompt(promptText) {
    const input = findFlowPromptInput();
    if (!input) {
      alert('لم يتم العثور على مربع كتابة الأوامر في صفحة Google Flow! يرجى النقر داخل المربع أولاً.');
      return false;
    }

    if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
      input.focus();
      input.value = promptText;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      input.focus();
      input.innerText = promptText;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    return true;
  }

  // 6. حقن الأمر وبدء التوليد بنقرة واحدة
  document.getElementById('mfc-btn-inject-generate').onclick = async () => {
    if (!projectData) return;
    const page = projectData.pages[currentPageIndex];
    const promptText = page.flowPrompt || page.imagePromptEnglish;
    updateStatus(`جاري إرسال أمر صفحة ${page.pageNumber} إلى Google Flow...`);

    const injected = injectPrompt(promptText);
    if (!injected) return;

    await new Promise(r => setTimeout(r, 400));
    const btn = findFlowGenerateButton();
    if (btn && !btn.disabled) {
      btn.click();
      updateStatus(`🚀 تم إرسال أمر صفحة ${page.pageNumber} وبدء التوليد في قوقل فلو!`, '#c084fc');
    } else {
      updateStatus(`تم حقن الأمر في المربع! اضغط زر Generate في قوقل فلو إذا لم يبدأ تلقائياً.`, '#fbbf24');
    }
  };

  // 7. تحويل صورة من DOM إلى Data URL ونقلها للمكتبة
  async function grabLatestImageAsDataUrl() {
    const images = Array.from(document.querySelectorAll('img')).filter(img => {
      const src = img.src || '';
      return !src.includes('avatar') && !src.includes('google_logo') && !src.includes('icon') && (img.naturalWidth > 150 || img.width > 150);
    });

    if (images.length === 0) return null;
    const targetImg = images[images.length - 1]; // أحدث صورة ظهرت

    try {
      const canvas = document.createElement('canvas');
      canvas.width = targetImg.naturalWidth || targetImg.width || 1024;
      canvas.height = targetImg.naturalHeight || targetImg.height || 768;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(targetImg, 0, 0);
      return canvas.toDataURL('image/png');
    } catch (e) {
      // إذا كان هناك قيود CORS على Canvas، نجلب الصورة عبر Fetch
      const res = await fetch(targetImg.src);
      const blob = await res.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }
  }

  document.getElementById('mfc-btn-capture-upload').onclick = async () => {
    if (!projectData) return;
    const page = projectData.pages[currentPageIndex];
    updateStatus(`جاري التقاط الصورة الناتجة ونقلها للمكتبة... ⏳`);

    try {
      const dataUrl = await grabLatestImageAsDataUrl();
      if (!dataUrl) {
        alert('لم يتم العثور على صورة مولدة جديدة في الصفحة بعد! انتظر حتى ينتهي قوقل فلو من الرسم.');
        updateStatus('لم يتم العثور على صورة بعد.', '#f87171');
        return;
      }

      const res = await fetch(`${SERVER_URL}/api/agent/page-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageNumber: page.pageNumber,
          imageData: dataUrl
        })
      });
      const resJson = await res.json();
      if (resJson.success) {
        updateStatus(`🎉 تم استيراد صورة صفحة ${page.pageNumber} بنجاح لموقع مكتبة الشعلة!`, '#34d399');
        // الانتقال تلقائياً للصفحة التالية إن وجدت
        if (currentPageIndex < projectData.pages.length - 1) {
          currentPageIndex++;
          renderCurrentPage();
        }
      } else {
        updateStatus(`فشل الرفع: ${resJson.error}`, '#f87171');
      }
    } catch (err) {
      updateStatus(`خطأ في النقل: ${err.message}`, '#f87171');
    }
  };

  // 8. تشغيل الأتمتة الشاملة لجميع الصفحات
  document.getElementById('mfc-btn-auto-all').onclick = async () => {
    if (isAutoRunning) {
      isAutoRunning = false;
      document.getElementById('mfc-btn-auto-all').innerText = '🚀 أتمتة كاملة متتالية لجميع الصفحات (12 صفحة)';
      updateStatus('تم إيقاف الأتمتة.');
      return;
    }

    if (!confirm('سيقوم الروبوت بتوليد الصفحات بالتتابع صفحة تلو الأخرى. هل تريد البدء الآن؟')) return;

    isAutoRunning = true;
    document.getElementById('mfc-btn-auto-all').innerText = '⏸️ إيقاف الأتمتة التلقائية مؤقتاً';

    for (let i = currentPageIndex; i < projectData.pages.length; i++) {
      if (!isAutoRunning) break;
      currentPageIndex = i;
      renderCurrentPage();
      const page = projectData.pages[i];

      updateStatus(`[أتمتة ${i+1}/${projectData.pages.length}] إرسال أمر صفحة ${page.pageNumber}...`);
      injectPrompt(page.detailedFlowPrompt || page.flowPrompt || page.imagePromptEnglish);
      await new Promise(r => setTimeout(r, 600));

      const btn = findFlowGenerateButton();
      if (btn) btn.click();

      updateStatus(`[أتمتة ${i+1}/${projectData.pages.length}] في انتظار انتهاء التوليد في قوقل فلو (18 ثانية)...`);
      await new Promise(r => setTimeout(r, 18000));

      // محاولة سحب الصورة
      try {
        const dataUrl = await grabLatestImageAsDataUrl();
        if (dataUrl) {
          await fetch(`${SERVER_URL}/api/agent/page-image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pageNumber: page.pageNumber, imageData: dataUrl })
          });
          updateStatus(`✅ تم حفظ صفحة ${page.pageNumber} بنجاح من Google Flow!`, '#34d399');
        }
      } catch (e) {
        console.warn('Auto capture error:', e);
      }
      await new Promise(r => setTimeout(r, 3000));
    }

    isAutoRunning = false;
    document.getElementById('mfc-btn-auto-all').innerText = '🚀 أتمتة كاملة متتالية لجميع الصفحات (12 صفحة)';
    updateStatus('🎉 اكتمل توليد الصور من Google Flow! جاري تصدير كتيب A5 PDF...', '#34d399');
    
    // تصدير الـ PDF تلقائياً
    try {
      await fetch(`${SERVER_URL}/api/agent/export-pdf`);
      updateStatus('🎉 تم الانتهاء بنجاح! تم تصدير كتيب المجلة A5 PDF بالصور الأصلية من Google Flow!', '#34d399');
    } catch (e) {
      console.warn('PDF export error:', e);
    }
  };

  // تشغيل أولي
  fetchProject();
})();
