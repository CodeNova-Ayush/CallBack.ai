import { NextResponse } from 'next/server';
import { askLivingResumeAgent } from '@/lib/services/rag-agent-service';

export async function POST(request: Request, props: { params: Promise<{ resumeId: string }> }) {
  const params = await props.params;
  try {
    const { question } = await request.json();
    if (!question) {
      return NextResponse.json({ error: 'Question string is required' }, { status: 400 });
    }
    const answer = await askLivingResumeAgent(params.resumeId, question);
    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json({ error: 'Agent chat failed' }, { status: 500 });
  }
}
