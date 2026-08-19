import { NextResponse } from 'next/server';
import { enhanceBulletPoint } from '@/lib/services/ai-assist-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const originalBullet = body.originalBullet || body.bullet || body.text || '';
    if (!originalBullet || typeof originalBullet !== 'string') {
      return NextResponse.json({ error: 'Valid bullet or speech text string is required' }, { status: 400 });
    }
    const result = await enhanceBulletPoint({
      originalBullet,
      role: body.role,
      company: body.company,
      targetSkill: body.targetSkill,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Enhancement API route error:', error);
    return NextResponse.json({ error: 'Enhancement failed' }, { status: 500 });
  }
}
