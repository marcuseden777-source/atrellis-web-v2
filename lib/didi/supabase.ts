import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConversationSession, ConversationMessage, LeadData, QualificationStage } from './types';

// ── Singleton client (service_role — server-side only, never expose to browser) ──

let _client: SupabaseClient | null = null;

function db(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
    _client = createClient(url, key, {
      auth: { persistSession: false },
    });
  }
  return _client;
}

// ── Sessions ──────────────────────────────────────────────────────────────────

export async function getSession(sessionId: string): Promise<ConversationSession | null> {
  const { data, error } = await db()
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  if (error || !data) return null;
  return rowToSession(data);
}

export async function createSession(
  sessionId: string,
  channel: 'web' | 'telegram',
  telegramChatId?: number
): Promise<ConversationSession> {
  const session: ConversationSession = {
    sessionId,
    channel,
    telegramChatId,
    stage: 'greeting',
    leadData: {},
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isEscalated: false,
  };

  const { error } = await db().from('conversations').insert({
    session_id: sessionId,
    channel,
    telegram_chat_id: telegramChatId ?? null,
    stage: 'greeting',
    lead_data: {},
    messages: [],
    is_escalated: false,
  });

  if (error) throw new Error(`createSession failed: ${error.message}`);
  return session;
}

export async function updateSession(
  sessionId: string,
  updates: Partial<Pick<ConversationSession, 'stage' | 'leadData' | 'messages' | 'isEscalated'>>
): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (updates.stage !== undefined) patch.stage = updates.stage;
  if (updates.leadData !== undefined) patch.lead_data = updates.leadData;
  if (updates.messages !== undefined) patch.messages = updates.messages;
  if (updates.isEscalated !== undefined) patch.is_escalated = updates.isEscalated;

  const { error } = await db()
    .from('conversations')
    .update(patch)
    .eq('session_id', sessionId);

  if (error) throw new Error(`updateSession failed: ${error.message}`);
}

// ── Leads ─────────────────────────────────────────────────────────────────────

export async function saveLead(session: ConversationSession): Promise<string> {
  const { data, error } = await db()
    .from('leads')
    .insert({
      session_id: session.sessionId,
      lead_data: session.leadData,
      stage: session.stage,
      channel: session.channel,
      is_escalated: session.isEscalated,
    })
    .select('id')
    .single();

  if (error) throw new Error(`saveLead failed: ${error.message}`);
  return data.id as string;
}

export async function markLeadEscalated(sessionId: string): Promise<void> {
  const now = new Date().toISOString();

  await Promise.all([
    db()
      .from('leads')
      .update({ is_escalated: true, escalated_at: now })
      .eq('session_id', sessionId),
    db()
      .from('conversations')
      .update({ is_escalated: true, stage: 'escalated' })
      .eq('session_id', sessionId),
  ]);
}

// ── Config (Andrew's Telegram chat_id + any runtime settings) ─────────────────

export async function saveAndrewChatId(chatId: number): Promise<void> {
  const { error } = await db()
    .from('config')
    .upsert({ key: 'andrew_telegram_chat_id', value: { chatId } });

  if (error) throw new Error(`saveAndrewChatId failed: ${error.message}`);
}

export async function getAndrewChatId(): Promise<number | null> {
  const { data, error } = await db()
    .from('config')
    .select('value')
    .eq('key', 'andrew_telegram_chat_id')
    .single();

  if (error || !data) return null;
  return (data.value as { chatId: number }).chatId ?? null;
}

// ── Row mapper ────────────────────────────────────────────────────────────────

function rowToSession(row: Record<string, unknown>): ConversationSession {
  return {
    sessionId: row.session_id as string,
    channel: row.channel as 'web' | 'telegram',
    telegramChatId: row.telegram_chat_id as number | undefined,
    stage: row.stage as QualificationStage,
    leadData: (row.lead_data as LeadData) ?? {},
    messages: (row.messages as ConversationMessage[]) ?? [],
    createdAt: new Date(row.created_at as string).getTime(),
    updatedAt: new Date(row.updated_at as string).getTime(),
    isEscalated: row.is_escalated as boolean,
  };
}
