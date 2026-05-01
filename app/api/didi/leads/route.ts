import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Lazy-init Firebase
function db() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return admin.firestore();
}

export const runtime = 'nodejs';

// GET /api/didi/leads — list all leads (internal use, Andrew's dashboard future)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') ?? '20');

  try {
    const snap = await db()
      .collection('leads')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    const leads = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ leads, count: leads.length });
  } catch (err) {
    console.error('[/api/didi/leads GET]', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
