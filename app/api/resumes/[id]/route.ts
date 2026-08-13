import { NextResponse } from 'next/server';
import { getResumeWithSections } from '@/lib/services/resume-service';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const resume = await getResumeWithSections(params.id);
  if (!resume) {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }
  return NextResponse.json({ resume });
}
