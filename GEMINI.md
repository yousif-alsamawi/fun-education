# 🧠 موجهات الذكاء الاصطناعي (GEMINI.md)
## قواعد وهندسة الأوامر لنماذج Google Gemini و OpenCode و Antigravity
### AI Prompt Engineering & Pedagogical Guidelines

---

## 1. الغرض وسياق الاستخدام (Context & Scope)

هذا الملف مخصص ليكون المرجع الأساسي لأي نموذج ذكاء اصطناعي (سواء كان **Google Gemini Flash / Pro**، أو النماذج المفتوحة مثل **Nemotron Ultra** في بيئات OpenCode أو Antigravity) يعمل داخل منصة قصص ومجلات الأطفال التربوية بمكتبة الشعلة.

---

## 2. المبادئ التربوية الإلزامية للنموذج (Pedagogical Guardrails)

عند تأليف أو مراجعة أي قصة للطفل، يجب على النموذج اللغوي الالتزام التام بالقواعد التالية:

1. **التعزيز الإيجابي غير المباشر (Positive Reinforcement)**:
   - ❌ **ممنوع قطعا**: وصف الطفل بالسلبية أو الإهمال أو الغباء أو الكذب بشكل مباشر.
   - ✅ **المطلوب**: إظهار السلوك كـ "تحدٍ خارجي" أو "لغز" يحتاج بطلنا إلى كشف سره بمساعدة بطله الخارق.
2. **الطفل هو بطل الحل (Child-Centric Empowerment)**:
   - البطل الخارق يقدم الحكمة وسر القوة، لكن الطفل هو من يتخذ القرار الشجاع ويغير تصرفه بنفسه.
3. **اللغة والأسلوب (Arabic Language Guidelines)**:
   - لغة عربية فصحى مبسطة، دافئة، ومشوقة ومناسبة للأطفال من سن 4 إلى 10 سنوات.
   - **تشكيل الكلمات الأساسية (Tashkeel)** لتمكين الطفل من القراءة السلسة أو استمتاع الوالدين بقراءتها له بصوت مرتفع.
   - جمل قصيرة متتابعة تنبض بالحركة والمشاعر الإيجابية.

---

## 3. هندسة أوامر الصور لـ Google Flow (Google Flow Prompt Engine)

لضمان مطابقة وجه الطفل وثبات الشخصية، يجب أن يتبع النموذج الصيغة القياسية التالية عند توليد الأوامر الإنجليزية:

### معادلة الأمر وحقن أسلوب الكوميكس (Comic Prompt Injection Formula):
```text
[Comic Masterpiece Prefix] + [Literal Story Scene Action] + [Child Visual Anchor] + [Hero Interaction] + [Art Style Modifier] + [Comic Panel & Octane Suffix]
```

### البادئة واللاحقة الثابتة لحقن الأسلوب الحركي:
- **Prefix**: `(Masterpiece, high quality, children's comic book illustration style, dynamic action scene, vibrant colors, expressive characters, storytelling art, detailed background, dynamic comic panel angle, cinematic lighting)`
- **Suffix**: `(children educational comic magazine page, bold clean ink lines, emotional facial expressions, rich storytelling environment, action-packed narrative, 8k resolution, octane render, Disney Pixar comic aesthetic)`

### معرّف الشخصية الثابت (Character Anchor Example):
```text
A handsome 7-year-old Arab boy named Omar with curly dark hair, expressive warm brown eyes, joyful confident smile, wearing a modern blue adventurer jacket
```

### الأساليب الأربعة المعتمدة:
1. **3D Pixar**: `vibrant 3D animated film render, Pixar and Disney aesthetic, highly detailed character styling, octane render 8k`
2. **Anime**: `Japanese anime cinematic aesthetic, clean lines, Studio Ghibli style, expressive eyes, colorful and bright`
3. **Comic Book**: `dynamic superhero comic book page, Marvel DC comic style, bold ink lines, dramatic heroic lighting`
4. **Storybook**: `delightful children book illustration, soft painterly textures, warm joyful palette`

---

## 4. مخطط المخرجات الموحد (JSON Schema)

عند طلب تأليف قصة، يجب أن يكون الخرج بتنسيق JSON مطابق للهيكل التالي:

```json
{
  "projectTitle": "مغامرات البطل [اسم الطفل] مع [البطل المفضل]",
  "moralTarget": "السلوك الإيجابي المراد ترسيخه",
  "scenes": [
    {
      "pageNumber": 3,
      "sceneType": "story",
      "title": "عنوان المشهد",
      "textArabic": "النص السردي المشكول المخصص للصفحة...",
      "dialogue": {
        "speaker": "اسم المتحدث",
        "text": "نص الحوار في البالون"
      },
      "flowPromptEnglish": "Vibrant children magazine illustration... [Character Anchor]... [Scene details]... [Style Modifier]"
    }
  ]
}
```
