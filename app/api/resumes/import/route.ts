import { NextResponse } from 'next/server';
import { parseAndImportOldResume } from '@/lib/services/resume-importer';
import { extractTextFromPdf, extractTextFromDocx } from '@/lib/services/document-parser';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let rawText = '';
    let customTitle: string | undefined;
    let fileName: string | undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      customTitle = (formData.get('customTitle') as string) || undefined;
      const directText = (formData.get('rawText') as string) || '';

      if (file) {
        fileName = file.name;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (file.name.toLowerCase().endsWith('.pdf')) {
          rawText = await extractTextFromPdf(buffer);
        } else if (file.name.toLowerCase().endsWith('.docx')) {
          rawText = await extractTextFromDocx(buffer);
        } else {
          rawText = buffer.toString('utf-8');
        }
      }

      if (!rawText && directText) {
        rawText = directText;
      }
    } else {
      const body = await request.json();
      rawText = body.rawText || '';
      customTitle = body.customTitle;
      fileName = body.fileName;
    }

    if (!rawText || typeof rawText !== 'string' || rawText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide valid resume text or upload a readable PDF/DOCX/TXT file.' },
        { status: 400 }
      );
    }

    const result = await parseAndImportOldResume(rawText, customTitle, fileName);

    return NextResponse.json({
      success: true,
      ...result,
      flagshipUrls: {
        builder: `/builder/${result.resumeId}`,
        atsAudit: `/analyzer/${result.resumeId}`,
        agentChat: `/agent/${result.resumeId}`,
        jdMatcher: `/jd-match/${result.resumeId}`,
        trustScore: `/trust-score/${result.resumeId}`,
        skillGraph: `/skill-graph`,
        opportunities: `/opportunities`,
      },
    });
  } catch (error: any) {
    console.error('Failed to import old resume:', error);
    return NextResponse.json({ error: error.message || 'Failed to parse and import resume.' }, { status: 500 });
  }
}
