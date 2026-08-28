import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const INPUT_HTML = path.resolve('scratch/presentation_script.html');
const OUTPUT_PDF = path.resolve('CallBack_ai_10_Minute_Presentation_Script.pdf');

async function generatePdf() {
  console.log('🚀 Launching Puppeteer to generate high-resolution PDF...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const html = fs.readFileSync(INPUT_HTML, 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      bottom: '12mm',
      left: '12mm',
      right: '12mm',
    },
  });

  await browser.close();
  console.log(`✅ PDF successfully generated at: ${OUTPUT_PDF}`);
}

generatePdf().catch((err) => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
