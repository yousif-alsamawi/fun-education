---
name: playwright-cli
description: Playwright browser automation and headless CLI engine for Web automation, Google Flow interaction, screenshot capturing, and high-resolution A4/A5 PDF booklet generation.
---

# Playwright Browser Automation & PDF Generation Skill (Project Scope)

This skill provides direct guidelines and patterns for utilizing Playwright in automated workflows within the Maktaba Shula project.

## Capabilities & Workflows

1. **Persistent Browser Session (Google Flow Automation)**:
   - Uses `launchPersistentContext` with local user data directory `.chrome-flow-profile` to maintain Google login sessions across executions.
   - Leverages installed Google Chrome executable (`C:\Program Files\Google\Chrome\Application\chrome.exe`).
   - Supports passing image reference assets and automated typing of prompts.

2. **High-Resolution Saddle-Stitch PDF Booklet Generation**:
   - Renders the imposition printing layout (`http://localhost:3000/api/print-booklet`) headlessly.
   - Exports pixel-perfect, double-sided A4/A5 PDF with standard print specifications:
     ```typescript
     await page.pdf({
       path: 'maktaba-booklet-a5.pdf',
       format: 'A4',
       landscape: true,
       printBackground: true,
       margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' }
     });
     ```

3. **REST API Integration**:
   - Communicates with `/api/agent/prompts` to obtain the prompt JSON array.
   - Pushes generated image assets back to the engine via `/api/agent/page-image`.
   - Triggers the compilation pipeline via `/api/agent/export-pdf`.
