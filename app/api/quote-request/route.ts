import { NextResponse } from 'next/server'
import type { QuoteRequest } from '@/types/atrellis'

export async function POST(request: Request) {
  try {
    const body: QuoteRequest = await request.json()
    const { contact, selections, estimate } = body

    if (!contact?.name || !contact?.email) {
      return NextResponse.json({ error: 'Missing required fields: name and email' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contact.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    console.log('[atrellis:quote-request]', {
      submittedAt: new Date().toISOString(),
      contact,
      estimate,
      selections,
    })

    // TODO: replace console.log with one of:
    //   • Resend — email lead summary to sales team
    //   • Supabase — persist to leads table
    //   • Slack/Telegram webhook — instant sales notification

    return NextResponse.json({ success: true, message: 'Quote request received.' })
  } catch (error) {
    console.error('[atrellis:quote-request] Error:', error)
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 })
  }
}
