import { NextRequest, NextResponse } from 'next/server';
import { processMessage } from '@/lib/didi/conversation-engine';
import { sendTelegramMessage } from '@/lib/didi/telegram';
import { saveAuthorizedChatId } from '@/lib/didi/supabase';
import type { TelegramUpdate } from '@/lib/didi/telegram';

export const runtime = 'nodejs';
export const maxDuration = 30;

const AUTHORIZED_USERNAMES = ['Atrellis_555777', 'en9981'];

export async function POST(req: NextRequest) {
  try {
    const update = (await req.json()) as TelegramUpdate;
    const message = update.message;
    if (!message?.text || !message.chat) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const username = message.from?.username ?? '';
    const text = message.text.trim();

    // If an authorized user messages the bot, save their chat_id for escalation
    if (AUTHORIZED_USERNAMES.includes(username)) {
      await saveAuthorizedChatId(username, chatId);
      if (text === '/start') {
        await sendTelegramMessage(chatId, '✅ Registered! Didi will send all lead briefs here.');
        return NextResponse.json({ ok: true });
      }
    }

    // /start greeting for clients
    if (text === '/start') {
      await sendTelegramMessage(
        chatId,
        `👋 Hi there! I'm *Didi*, Andrew's Digital Chief of Staff at *Atrellis*.

Whether you're planning a full renovation, installing Zipblinds, or exploring design ideas — I'm here to help you get started and set you up with the right expert visit.

What's your name? 😊`
      );
      return NextResponse.json({ ok: true });
    }

    // Process through the conversation engine (same logic as web chat)
    const sessionId = `tg_${chatId}`;
    const result = await processMessage({
      sessionId,
      message: text,
      channel: 'telegram',
    });

    await sendTelegramMessage(chatId, result.reply);
    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('[Telegram Webhook] Error:', err);
    // Always return 200 to Telegram — prevents repeated retries
    return NextResponse.json({ ok: true });
  }
}

// GET: For verifying the webhook is live
export async function GET() {
  return NextResponse.json({ status: 'Didi Telegram webhook is live', bot: 'Atrellis_Didi_bot' });
}
