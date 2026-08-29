import { NextResponse } from 'next/server';
import { matchResumeWithJD } from '@/lib/services/jd-match-service';
import { extractTextFromPdf, extractTextFromDocx } from '@/lib/services/document-parser';
import { parseAndImportOldResume } from '@/lib/services/resume-importer';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let resumeId = '';
    let jdText = '';
    let uploadedFileName = '';

    let candidateContext: any = null;

    // Handle Multipart Form Data (Direct File Upload + Match)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      jdText = (formData.get('jdText') as string) || '';
      const existingResumeId = (formData.get('resumeId') as string) || '';

      if (file && file.size > 0) {
        uploadedFileName = file.name;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let rawResumeText = '';
        if (file.name.toLowerCase().endsWith('.pdf')) {
          rawResumeText = await extractTextFromPdf(buffer);
        } else if (file.name.toLowerCase().endsWith('.docx')) {
          rawResumeText = await extractTextFromDocx(buffer);
        } else {
          rawResumeText = buffer.toString('utf-8');
        }

        if (!rawResumeText || rawResumeText.trim().length === 0) {
          return NextResponse.json(
            { error: 'Uploaded file could not be parsed. Please check the file format.' },
            { status: 400 }
          );
        }

        // Import parsed resume to database
        const imported = await parseAndImportOldResume(rawResumeText, undefined, file.name);
        resumeId = imported.resumeId;
      } else if (existingResumeId) {
        resumeId = existingResumeId;
      }
    } else {
      // Standard JSON Request
      const body = await request.json();
      resumeId = body.resumeId;
      jdText = body.jdText;
      candidateContext = body.candidateContext;
    }

    if (!jdText || jdText.trim().length === 0) {
      return NextResponse.json({ error: 'Please provide a target job description.' }, { status: 400 });
    }

    // If no resumeId specified, find the latest active resume in DB
    if (!resumeId) {
      const latestResume = await db.resume.findFirst({
        orderBy: { updatedAt: 'desc' },
      });
      resumeId = latestResume?.id || 'demo-resume-alex-1';
    }

    // Run Real Semantic / LLM JD Match
    const match = await matchResumeWithJD(resumeId, jdText, candidateContext);

    return NextResponse.json({
      success: true,
      resumeId,
      uploadedFileName,
      match,
    });
  } catch (error: any) {
    console.error('Match error in api/match:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to calculate job description match.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const resumeId = searchParams.get('resumeId');

    // Fetch all user resumes for quick switching
    const resumes = await db.resume.findMany({
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: 10,
    }).catch(() => []);

    const resumeMap = new Map<string, any>();
    for (const r of resumes) {
      resumeMap.set(r.id, r);
    }

    // Merge in-memory resumes
    const { memoryResumesCache, defaultCandidateResume } = await import('@/lib/services/resume-service');
    for (const [id, r] of memoryResumesCache.entries()) {
      if (!resumeMap.has(id)) {
        resumeMap.set(id, {
          id: r.id,
          title: r.title,
          updatedAt: new Date(),
        });
      }
    }

    if (resumeMap.size === 0) {
      resumeMap.set(defaultCandidateResume.id, {
        id: defaultCandidateResume.id,
        title: defaultCandidateResume.title,
        updatedAt: new Date(),
      });
    }

    const mergedResumes = Array.from(resumeMap.values());

    let latestMatch = null;
    if (resumeId) {
      latestMatch = await db.matchResult.findFirst({
        where: { resumeId },
        orderBy: { createdAt: 'desc' },
        include: { jobDescription: true },
      });
    }

    return NextResponse.json({
      resumes: mergedResumes,
      latestMatch,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch match context' }, { status: 500 });
  }
}
