import { NextRequest, NextResponse } from 'next/server';
import { processMessage } from '@/lib/didi/conversation-engine';
import { sendTelegramMessage } from '@/lib/didi/telegram';
import { saveAuthorizedChatId } from '@/lib/didi/supabase';
import type { TelegramUpdate } from '@/lib/didi/telegram';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse') as (buffer: Buffer) => Promise<{ text: string }>;

export const runtime = 'nodejs';
export const maxDuration = 60;

const AUTHORIZED_USERNAMES = ['Atrellis_555777', 'en9981'];
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

async function downloadTelegramFile(fileId: string): Promise<Buffer> {
  const infoRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
  const info = await infoRes.json() as { result: { file_path: string } };
  const fileRes = await fetch(`https://api.telegram.org/file/bot${BOT_TOKEN}/${info.result.file_path}`);
  return Buffer.from(await fileRes.arrayBuffer());
}

async function extractPdfText(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text.trim();
}

export async function POST(req: NextRequest) {
  try {
    const update = (await req.json()) as TelegramUpdate;
    const message = update.message;
    if (!message?.chat) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const username = message.from?.username ?? '';
    const text = message.text?.trim() ?? '';
    const caption = message.caption?.trim() ?? '';
    const doc = message.document;

    // Ignore messages with no text and no document
    if (!text && !doc) return NextResponse.json({ ok: true });

    // Authorized user registration
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
        `👋 Hi there! I'm *Didi*, Andrew's Digital Chief of Staff at *Atrellis*.\n\nWhether you're planning a full renovation, installing Zipblinds, or exploring design ideas — I'm here to help you get started and set you up with the right expert visit.\n\nWhat's your name? 😊`
      );
      return NextResponse.json({ ok: true });
    }

    // Build message content — handle PDF documents
    let messageContent = text || caption;

    if (doc) {
      const mime = doc.mime_type ?? '';
      const name = doc.file_name ?? 'document';

      if (mime === 'application/pdf' || name.toLowerCase().endsWith('.pdf')) {
        try {
          await sendTelegramMessage(chatId, '📄 Got the PDF! Give me a sec to read it...');
          const buffer = await downloadTelegramFile(doc.file_id);
          const extracted = await extractPdfText(buffer);
          if (!extracted) {
            await sendTelegramMessage(chatId, "Hmm, couldn't extract text from that PDF leh — might be a scanned image. Can you paste the key details as text? 🙏");
            return NextResponse.json({ ok: true });
          }
          messageContent = `[PDF: ${name}]\n\n${extracted}${caption ? `\n\nUser note: ${caption}` : ''}`;
        } catch {
          await sendTelegramMessage(chatId, "Aiyah, had trouble reading that PDF. Try sending again or paste the content directly? 😅");
          return NextResponse.json({ ok: true });
        }
      } else {
        await sendTelegramMessage(chatId, `Got a file (${name}) but I can only read PDFs for now. Send as PDF or paste the content here! 😊`);
        return NextResponse.json({ ok: true });
      }
    }

    if (!messageContent) return NextResponse.json({ ok: true });

    const sessionId = `tg_${chatId}`;
    const result = await processMessage({
      sessionId,
      message: messageContent,
      channel: 'telegram',
    });

    await sendTelegramMessage(chatId, result.reply);
    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('[Telegram Webhook] Error:', err);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Didi Telegram webhook is live', bot: 'Atrellis_Didi_bot' });
}
