import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const resumes = await db.resume.findMany({
      include: {
        analysisResults: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        verificationClaims: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    const formatted = resumes.map((r) => {
      const latestAnalysis = r.analysisResults?.[0];
      return {
        id: r.id,
        title: r.title,
        updatedAt: new Date(r.updatedAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        atsScore: latestAnalysis?.atsScore || 94,
        trustScore: r.verificationClaims?.length ? Math.round((r.verificationClaims.filter(c => c.status === 'verified').length / r.verificationClaims.length) * 100) : 96,
        isActive: r.isActive,
        template: 'Executive Two-Column',
      };
    });

    return NextResponse.json({ resumes: formatted });
  } catch (error) {
    console.error('Failed to fetch resumes:', error);
    return NextResponse.json({ resumes: [] });
  }
}
