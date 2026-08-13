import { NextResponse } from 'next/server';
import { analyzeResume } from '@/lib/services/ats-service';

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const analysis = await analyzeResume(params.id);
    return NextResponse.json({ analysis });
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
