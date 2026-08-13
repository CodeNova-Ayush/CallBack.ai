import { NextResponse } from 'next/server';
import { reorderSections } from '@/lib/services/resume-service';

export async function POST(request: Request) {
  try {
    const body = await request.json(); // { orders: [{ id, order }] }
    await reorderSections(body.orders);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reorder sections' }, { status: 500 });
  }
}
