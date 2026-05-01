import { NextRequest, NextResponse } from 'next/server';
import { processMessage } from '@/lib/didi/conversation-engine';
import { ChatRequest } from '@/lib/didi/types';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ChatRequest>;

    if (!body.sessionId || !body.message) {
      return NextResponse.json({ error: 'sessionId and message are required' }, { status: 400 });
    }

    const result = await processMessage({
      sessionId: body.sessionId,
      message: body.message.trim(),
      channel: 'web',
      imageBase64: body.imageBase64,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error('[/api/didi/chat] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
