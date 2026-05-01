# Didi — Andrew's Digital Chief of Staff
### Atrellis Pte. Ltd. · Internal Setup Guide

---

## What is Didi?

Didi is the AI-powered lead-qualification and design-consultation agent for Andrew, Director of Atrellis. She operates on two channels simultaneously:

| Channel | Entry Point | Status |
|---------|------------|--------|
| Web | `atrellis.business/didi` | Demo live |
| Telegram | `@Atrellis_Didi_bot` | Live |

**Primary LLM:** Claude Sonnet 4.6 (Anthropic)  
**Secondary LLM:** Gemini 2.0 Flash (Google) — image analysis + translation  
**Database:** Supabase Postgres (`atrellis-didi-agent` project, `ap-southeast-1`)  
**Escalation:** Telegram → Andrew (@Atrellis_555777)  
**Future:** Make.com → WhatsApp escalation (see `MAKE_WEBHOOK_FUTURE.md`)

---

## Quick Start (First Deploy)

### 1. Environment Variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
ANTHROPIC_API_KEY=         # Anthropic console → API Keys
GEMINI_API_KEY=            # Google AI Studio → aistudio.google.com/apikey

SUPABASE_URL=              https://zpbderecrcledbxggmvh.supabase.co  ← already set
SUPABASE_SERVICE_ROLE_KEY= # Supabase Dashboard → Project Settings → API → service_role

TELEGRAM_BOT_TOKEN=        # @BotFather — REGENERATE after demo setup
TELEGRAM_ANDREW_CHAT_ID=   # See Step 3 below
ANDREW_WHATSAPP=           +6592223333
MAKE_WEBHOOK_URL=          # Leave blank for now
NEXT_PUBLIC_APP_URL=       https://atrellis.business
```

### 2. Get the Supabase Service Role Key

1. Open [Supabase Dashboard](https://supabase.com/dashboard/project/zpbderecrcledbxggmvh)
2. Go to **Project Settings → API**
3. Copy the **`service_role`** secret key (not the anon key)
4. Paste it into `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`
5. Add the same value to **Vercel → Project Settings → Environment Variables**

> ⚠️ The service role key bypasses Row Level Security. It must only ever live in server-side environment variables — never in client-side code or the browser.

### 3. Register Andrew's Telegram Chat ID

1. Open Telegram → search **@Atrellis_Didi_bot**
2. Send `/start` from **Andrew's account**
3. The bot auto-saves Andrew's chat_id to Supabase `config` table
4. Didi will now route all lead briefs to Andrew's Telegram

If auto-registration fails, get the chat_id manually:
```
https://api.telegram.org/bot<TOKEN>/getUpdates
```
Look for `"chat":{"id": XXXXXXX}` and paste that into `TELEGRAM_ANDREW_CHAT_ID`.

### 4. Register the Telegram Webhook

After deploying to Vercel, call this URL once in your browser:

```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://atrellis.business/api/didi/telegram/webhook
```

Verify:
```
https://api.telegram.org/bot<TOKEN>/getWebhookInfo
```

---

## Database (Supabase)

**Project:** `atrellis-didi-agent`  
**Region:** Singapore (`ap-southeast-1`)  
**Dashboard:** https://supabase.com/dashboard/project/zpbderecrcledbxggmvh  

### Tables

| Table | Purpose |
|-------|---------|
| `conversations` | Full session state per user (messages, stage, lead_data) |
| `leads` | Qualified lead records saved on `capture_lead` / `book_site_visit` |
| `config` | Runtime settings — Andrew's Telegram chat_id, feature flags |

### Schema

```sql
-- conversations
session_id       TEXT        PK
channel          TEXT        'web' | 'telegram'
telegram_chat_id BIGINT      nullable
stage            TEXT        QualificationStage
lead_data        JSONB       collected fields
messages         JSONB       conversation history array
is_escalated     BOOLEAN
created_at       TIMESTAMPTZ
updated_at       TIMESTAMPTZ  (auto-updated by trigger)

-- leads
id               UUID        PK (auto)
session_id       TEXT        FK → conversations
lead_data        JSONB
stage            TEXT
channel          TEXT
is_escalated     BOOLEAN
escalated_at     TIMESTAMPTZ nullable
created_at       TIMESTAMPTZ

-- config
key              TEXT        PK  (e.g. 'andrew_telegram_chat_id')
value            JSONB
updated_at       TIMESTAMPTZ
```

### Row Level Security

All tables have RLS enabled. Only the `service_role` key can read/write — the anon key is blocked. All database access runs server-side in Next.js API routes.

---

## Folder Structure

```
atrellis-web-v2/
├── lib/
│   └── didi/
│       ├── types.ts               # All TypeScript interfaces
│       ├── system-prompt.ts       # Didi's system prompt (context-aware, built per turn)
│       ├── pricing-engine.ts      # 2026 Singapore pricing matrix
│       ├── design-brain.ts        # Hybrid Style framework (4 styles)
│       ├── supabase.ts            # Supabase Postgres CRUD (sessions, leads, config)
│       ├── telegram.ts            # Bot send/receive, webhook registration
│       ├── gemini.ts              # Gemini Flash for images + translation
│       ├── make-webhook.ts        # Make.com placeholder (future)
│       └── conversation-engine.ts # Claude Sonnet 4.6 orchestrator + tool handling
│
├── app/
│   ├── didi/
│   │   ├── page.tsx               # /didi demo page
│   │   └── components/
│   │       └── DidiChat.tsx       # Client-side chat UI
│   └── api/
│       └── didi/
│           ├── chat/route.ts          # POST /api/didi/chat
│           ├── telegram/webhook/      # POST /api/didi/telegram/webhook
│           │   └── route.ts
│           └── leads/route.ts         # GET /api/didi/leads
│
└── docs/
    └── didi/
        ├── README.md              # This file
        ├── SYSTEM_PROMPT.md       # Didi's full persona spec
        ├── ARCHITECTURE.md        # System diagram + data flow
        └── MAKE_WEBHOOK_FUTURE.md # Make.com → WhatsApp setup guide
```

---

## Lead Qualification Flow

Didi collects 7 mandatory fields before escalating to Andrew:

| # | Field | Examples |
|---|-------|---------|
| 1 | Name | — |
| 2 | Contact Number | WhatsApp-reachable |
| 3 | Property Address | Area / district |
| 4 | Property Type | HDB BTO · Resale · Condo · Landed · Commercial · Shophouse |
| 5 | Project Type | Full Reno · Zipblinds · Roofing · Carpentry · Balcony · Fit-Out |
| 6 | Timeline | Key collection date / target start |
| 7 | Occupancy | Vacant · Occupied · New hand-over |

Once all 7 are collected → Didi pitches the **Expert Site Investigation** → Client agrees → Telegram brief fires to Andrew + lead saved to Supabase.

---

## Security Notes

- **Rotate the Telegram bot token** via @BotFather after the demo goes live.
- `.env.local` is git-ignored — never commit credentials.
- `SUPABASE_SERVICE_ROLE_KEY` is server-side only. The `SUPABASE_URL` is the only value safe to prefix with `NEXT_PUBLIC_`.
- The `/api/didi/leads` endpoint has no auth yet — add Bearer token auth before exposing publicly.

---

## Future Integrations

| Feature | File | Status |
|---------|------|--------|
| Make.com → WhatsApp | `lib/didi/make-webhook.ts` | Scaffolded, needs webhook URL |
| Image analysis (banana) | `lib/didi/gemini.ts` → `analyseRoomImage()` | Built, needs UI upload trigger |
| Andrew's lead dashboard | `/api/didi/leads` | GET endpoint ready |
| Multi-language auto-detect | `lib/didi/gemini.ts` → `translateToMandarin()` | Built |
