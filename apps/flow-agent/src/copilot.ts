import { MagazineProject } from '@maktaba/core';

/**
 * دالة توليد دليل الأوامر السريع (Copilot Cheat-sheet)
 * تتيح لموظف المكتبة نسخ الأوامر الجاهزة بضغطة زر واحدة ولصقها في موقع Google Flow
 */
export function exportProjectPromptsMarkdown(project: MagazineProject): string {
  const { child, pages } = project;

  let markdown = `# أوامر توليد صور مجلة البطل: ${child.name} (${child.favoriteHero})\n\n`;
  markdown += `> **الأسلوب الفني**: ${child.artStyle} | **المشكلة التربوية**: ${child.behaviorDescription}\n\n`;
  markdown += `### 📌 خطة التوليد السريعة في Google Flow:\n`;
  markdown += `1. افتح مشروعك في **Google Flow**.\n`;
  markdown += `2. أرفق صورة الطفل كـ (Reference Face / Character Asset).\n`;
  markdown += `3. انسخ أمر كل صفحة أدناه والصقه لتوليد الصورة فوراً.\n\n`;
  markdown += `---\n\n`;

  pages.forEach(page => {
    markdown += `### [صفحة ${page.pageNumber}] - ${page.title} (${page.type})\n`;
    markdown += `- **الأمر الإنجليزي الموجه لـ Google Flow**:\n`;
    markdown += `\`\`\`text\n${page.imagePromptEnglish}\n\`\`\`\n`;
    if (page.type === 'story') {
      markdown += `- **النص العربي المعروض في المجلة**: ${page.textArabic}\n`;
      if (page.dialogueBubble) {
        markdown += `- **حوار البطل**: "${page.dialogueBubble.text}" (${page.dialogueBubble.speaker})\n`;
      }
    }
    markdown += `\n`;
  });

  return markdown;
}
