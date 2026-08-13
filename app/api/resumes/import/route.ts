import { NextResponse } from 'next/server';
import { parseAndImportOldResume } from '@/lib/services/resume-importer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rawText, customTitle, fileName } = body;

    if (!rawText || typeof rawText !== 'string') {
      return NextResponse.json({ error: 'Please provide valid resume text or content to analyze.' }, { status: 400 });
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
