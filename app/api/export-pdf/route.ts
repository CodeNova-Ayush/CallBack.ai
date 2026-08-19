import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
  try {
    const { html, title = 'Resume' } = await req.json();

    if (!html) {
      return NextResponse.json({ error: 'HTML content required' }, { status: 400 });
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 portrait;
              margin: 0mm;
            }
            body {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #111827;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            #resume-print-sheet {
              width: 210mm !important;
              min-height: 297mm !important;
              box-sizing: border-box !important;
              padding: 10mm 14mm !important;
              margin: 0 auto !important;
              box-shadow: none !important;
              border: none !important;
            }
          </style>
        </head>
        <body class="bg-white">
          <div style="width: 210mm; margin: 0 auto;">
            ${html}
          </div>
        </body>
      </html>
    `;

    await page.setContent(fullHtml, { waitUntil: 'domcontentloaded', timeout: 15000 });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    });

    await browser.close();

    const cleanTitle = title.replace(/[^a-zA-Z0-9_\s-]/g, '').trim().replace(/\s+/g, '_');
    const filename = `${cleanTitle}_Resume_ATS.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: any) {
    console.error('Server PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF on server', details: error.message },
      { status: 500 }
    );
  }
}
