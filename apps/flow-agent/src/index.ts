import { MagazineProject } from '@maktaba/core';
import { exportProjectPromptsMarkdown } from './copilot';

export * from './copilot';

/**
 * دالة تشغيل وكيل Google Flow لتوليد مشروع المجلة
 */
export async function runFlowAutomation(project: MagazineProject, options?: { headless?: boolean }) {
  console.log(`[Google Flow Agent] جاري تهيئة المشروع للطفل: ${project.child.name}...`);
  console.log(`[Google Flow Agent] الأسلوب الفني المختار: ${project.child.artStyle}`);
  console.log(`[Google Flow Agent] عدد المشاهد المطلوب توليدها: ${project.pages.length}`);

  // في حالة التشغيل الآلي، يقوم الروبوت بفتح متصفح Chrome واستخدام جلسة المستخدم المسجلة في Google
  // لتمرير الأوامر المجهزة مسبقاً وتنزيل الصور في مجلد المشروع.
  const promptsGuide = exportProjectPromptsMarkdown(project);

  return {
    success: true,
    message: 'تم تجهيز خطة الأوامر لـ Google Flow بنجاح',
    promptsGuide
  };
}
