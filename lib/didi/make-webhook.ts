/**
 * Make.com Webhook Integration — FUTURE / PLACEHOLDER
 *
 * When ready, wire up a Make.com scenario that:
 * 1. Receives the lead brief via this webhook
 * 2. Sends a formatted WhatsApp message to Andrew (+6592223333) via WhatsApp Business API
 * 3. Optionally logs the lead to a Google Sheet or CRM
 *
 * Setup steps (documented in docs/didi/MAKE_WEBHOOK_FUTURE.md):
 * 1. Create a Make.com scenario with a "Webhooks > Custom webhook" trigger
 * 2. Copy the webhook URL into MAKE_WEBHOOK_URL in .env.local
 * 3. Add a WhatsApp Business > Send Message module
 * 4. Map the fields from the payload below
 */

export interface MakeLeadPayload {
  leadName: string;
  contact: string;
  address: string;
  propertyType: string;
  projectType: string;
  timeline: string;
  occupancy: string;
  styleNotes: string;
  budgetIndicator: string;
  sessionId: string;
  timestamp: string;
  source: 'web' | 'telegram';
}

export async function sendToMakeWebhook(payload: MakeLeadPayload): Promise<boolean> {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl.includes('PLACEHOLDER')) {
    console.log('[Make.com] Webhook not configured yet. Payload logged:', payload);
    return false;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (err) {
    console.error('[Make.com] Webhook send failed:', err);
    return false;
  }
}
