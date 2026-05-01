# Make.com → WhatsApp Escalation (Future Setup)

This documents how to wire up Make.com for WhatsApp escalation once ready.  
**Current status:** Logic scaffolded in `lib/didi/make-webhook.ts`. Telegram escalation is live instead.

---

## What this replaces / adds

| Current | Future |
|---------|--------|
| Telegram brief to Andrew | Keep (primary) |
| — | Make.com → WhatsApp message to Andrew (+6592223333) |
| — | Optional: log lead to Google Sheet / CRM |

---

## Step 1 — Create Make.com Scenario

1. Log into [make.com](https://make.com)
2. Create a new **Scenario**
3. Add a **Webhooks → Custom webhook** trigger module
4. Copy the webhook URL (looks like: `https://hook.eu2.make.com/xxxxxxxxxxxxxxxx`)
5. Paste it into `.env.local`:

```
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/your-webhook-id
```

---

## Step 2 — Wire WhatsApp Module

1. Add a **WhatsApp Business Cloud → Send a Message** module
2. Connect your WhatsApp Business API account
3. Map these fields from the webhook payload:

```json
{
  "leadName": "Client's full name",
  "contact": "Client's contact number",
  "address": "Property address",
  "propertyType": "HDB BTO / Condo / etc.",
  "projectType": "Full Renovation / Zipblinds / etc.",
  "timeline": "Key collection date",
  "occupancy": "Vacant / Occupied / etc.",
  "styleNotes": "Design preferences discussed",
  "budgetIndicator": "Budget range if mentioned",
  "sessionId": "Firebase session reference",
  "timestamp": "SG timestamp",
  "source": "web or telegram"
}
```

4. Set the **recipient** to Andrew's number: `+6592223333`
5. Use a message template approved by Meta, e.g.:

```
🏗️ NEW LEAD via Didi

Client: {{leadName}}
Contact: {{contact}}
Property: {{address}} ({{propertyType}})
Scope: {{projectType}}
Timeline: {{timeline}}
Occupancy: {{occupancy}}

Style notes: {{styleNotes}}
Budget: {{budgetIndicator}}

Captured: {{timestamp}}
```

---

## Step 3 — Optional: Log to Google Sheets

1. Add a **Google Sheets → Add a Row** module
2. Create a sheet with columns matching the payload fields
3. Wire each field to the corresponding sheet column

This gives Andrew a visual lead log without needing to check Firebase directly.

---

## Step 4 — Activate in Code

Once `MAKE_WEBHOOK_URL` is set, `lib/didi/make-webhook.ts` will automatically fire after every `book_site_visit` tool call — no code changes needed.

The function checks for the placeholder value and no-ops if not configured:

```typescript
if (!webhookUrl || webhookUrl.includes('PLACEHOLDER')) {
  console.log('[Make.com] Not configured yet');
  return false;
}
```

---

## Testing

Use Make.com's built-in webhook data inspector to verify the payload shape before wiring the WhatsApp module. Send a test lead through `/didi` and check Make.com → Scenario History for the incoming payload.
