import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export const runtime = 'nodejs';

// GET /api/didi/leads — list leads with optional ?limit= and ?escalated= filters
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
  const escalatedOnly = searchParams.get('escalated') === 'true';

  try {
    let query = db()
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (escalatedOnly) query = query.eq('is_escalated', true);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ leads: data, count: data.length });
  } catch (err) {
    console.error('[/api/didi/leads GET]', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
