import { NextResponse } from 'next/server';
import { enhanceBulletPoint } from '@/lib/services/ai-assist-service';

export async function POST(request: Request) {
  try {
    const { originalBullet, role, company, targetSkill } = await request.json();
    if (!originalBullet) {
      return NextResponse.json({ error: 'originalBullet required' }, { status: 400 });
    }
    const result = await enhanceBulletPoint({ originalBullet, role, company, targetSkill });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Enhancement failed' }, { status: 500 });
  }
}
