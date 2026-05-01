import * as admin from 'firebase-admin';
import { ConversationSession, LeadData, QualificationStage } from './types';

function getApp(): admin.app.App {
  if (admin.apps.length > 0) return admin.apps[0]!;
  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

function db(): admin.firestore.Firestore {
  return getApp().firestore();
}

// ─── Sessions ────────────────────────────────────────────────────────────────

export async function getSession(sessionId: string): Promise<ConversationSession | null> {
  const doc = await db().collection('conversations').doc(sessionId).get();
  if (!doc.exists) return null;
  return doc.data() as ConversationSession;
}

export async function createSession(sessionId: string, channel: 'web' | 'telegram', telegramChatId?: number): Promise<ConversationSession> {
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
  await db().collection('conversations').doc(sessionId).set(session);
  return session;
}

export async function updateSession(
  sessionId: string,
  updates: Partial<Pick<ConversationSession, 'stage' | 'leadData' | 'messages' | 'isEscalated'>>
): Promise<void> {
  await db()
    .collection('conversations')
    .doc(sessionId)
    .update({ ...updates, updatedAt: Date.now() });
}

// ─── Leads ───────────────────────────────────────────────────────────────────

export interface SavedLead {
  sessionId: string;
  leadData: LeadData;
  stage: QualificationStage;
  channel: 'web' | 'telegram';
  createdAt: number;
  isEscalated: boolean;
}

export async function saveLead(session: ConversationSession): Promise<string> {
  const lead: SavedLead = {
    sessionId: session.sessionId,
    leadData: session.leadData,
    stage: session.stage,
    channel: session.channel,
    createdAt: Date.now(),
    isEscalated: session.isEscalated,
  };
  const ref = await db().collection('leads').add(lead);
  return ref.id;
}

export async function markLeadEscalated(sessionId: string): Promise<void> {
  const snap = await db().collection('leads').where('sessionId', '==', sessionId).limit(1).get();
  if (!snap.empty) {
    await snap.docs[0].ref.update({ isEscalated: true, escalatedAt: Date.now() });
  }
  await updateSession(sessionId, { isEscalated: true, stage: 'escalated' });
}

// ─── Andrew's Chat ID (for Telegram escalation) ───────────────────────────────

export async function saveAndrewChatId(chatId: number): Promise<void> {
  await db().collection('config').doc('andrew').set({ telegramChatId: chatId, updatedAt: Date.now() }, { merge: true });
}

export async function getAndrewChatId(): Promise<number | null> {
  const doc = await db().collection('config').doc('andrew').get();
  if (!doc.exists) return null;
  return (doc.data() as { telegramChatId?: number }).telegramChatId ?? null;
}
