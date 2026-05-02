import { TelegramBrief } from './types';

const BASE_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

// ─── Send a message via the bot ───────────────────────────────────────────────

export async function sendTelegramMessage(chatId: number | string, text: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    });
    const json = await res.json() as { ok: boolean; description?: string };
    if (!json.ok) console.error('[Telegram] sendMessage failed:', json.description);
    return json.ok;
  } catch (err) {
    console.error('[Telegram] sendMessage error:', err);
    return false;
  }
}

// ─── Register the webhook with Telegram ──────────────────────────────────────

export async function setWebhook(webhookUrl: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: webhookUrl, allowed_updates: ['message'] }),
  });
  const json = await res.json() as { ok: boolean };
  return json.ok;
}

export async function deleteWebhook(): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/deleteWebhook`, { method: 'POST' });
  const json = await res.json() as { ok: boolean };
  return json.ok;
}

// ─── Build and send the structured brief to Andrew ────────────────────────────

export async function sendAndrewBrief(brief: TelegramBrief, andrewChatId: number | string): Promise<boolean> {
  const message = formatBrief(brief);
  return sendTelegramMessage(andrewChatId, message);
}

function formatBrief(b: TelegramBrief): string {
  return `🏗️ *NEW LEAD — EXPERT SITE VISIT BOOKED*

━━━━━━━━━━━━━━━━━━━━━
👤 *Client:* ${b.leadName}
📞 *Contact:* ${b.contact}
📍 *Address:* ${b.address}
🏠 *Property:* ${b.propertyType}
🔨 *Scope:* ${b.projectType}
📅 *Timeline:* ${b.timeline}
🏠 *Occupancy:* ${b.occupancy}
━━━━━━━━━━━━━━━━━━━━━
🎨 *Style Notes:* ${b.styleNotes || 'Not discussed yet'}
💰 *Budget Indicator:* ${b.budgetIndicator || 'To assess on-site'}
━━━━━━━━━━━━━━━━━━━━━
🤖 *Captured via:* Didi (Web/Telegram)
🕐 *Time:* ${b.timestamp}
🔑 *Session ID:* \`${b.sessionId}\`

_Didi has qualified this lead. Ready for your call, Boss._`;
}

// ─── Telegram Update types (incoming webhook payload) ─────────────────────────

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

export interface TelegramMessage {
  message_id: number;
  from: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
  caption?: string;
  photo?: TelegramPhotoSize[];
  document?: TelegramDocument;
}

export interface TelegramDocument {
  file_id: string;
  file_unique_id: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface TelegramUser {
  id: number;
  username?: string;
  first_name?: string;
}

export interface TelegramChat {
  id: number;
  username?: string;
  type: 'private' | 'group' | 'supergroup' | 'channel';
}

export interface TelegramPhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}
