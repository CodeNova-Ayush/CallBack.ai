import { NextResponse } from 'next/server';
import { getVerificationSummary } from '@/lib/services/verification-service';

export async function GET(request: Request, props: { params: Promise<{ resumeId: string }> }) {
  const params = await props.params;
  try {
    const summary = await getVerificationSummary(params.resumeId);
    return NextResponse.json({ summary });
  } catch (error) {
    return NextResponse.json({ error: 'Verification summary failed' }, { status: 500 });
  }
}
