import { NextResponse } from 'next/server';
import { matchResumeWithJD } from '@/lib/services/jd-match-service';

export async function POST(request: Request) {
  try {
    const { resumeId, jdText } = await request.json();
    if (!resumeId || !jdText) {
      return NextResponse.json({ error: 'resumeId and jdText required' }, { status: 400 });
    }
    const match = await matchResumeWithJD(resumeId, jdText);
    return NextResponse.json({ match });
  } catch (error) {
    return NextResponse.json({ error: 'Matching failed' }, { status: 500 });
  }
}
