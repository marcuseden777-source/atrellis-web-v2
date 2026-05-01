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
**Database:** Firebase Firestore (`Atrellis_Database_Agent` project)  
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
FIREBASE_PROJECT_ID=       atrellis-database-agent
FIREBASE_CLIENT_EMAIL=     # Firebase Console → Project Settings → Service Accounts
FIREBASE_PRIVATE_KEY=      # Same — Generate New Private Key
TELEGRAM_BOT_TOKEN=        # @BotFather — REGENERATE this after demo setup
TELEGRAM_ANDREW_CHAT_ID=   # See Step 4 below
ANDREW_WHATSAPP=           +6592223333
MAKE_WEBHOOK_URL=          # Leave blank for now
NEXT_PUBLIC_APP_URL=       https://atrellis.business
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create project → name it **Atrellis_Database_Agent**
3. Enable **Firestore Database** (production mode)
4. Go to **Project Settings → Service Accounts → Generate New Private Key**
5. Copy `project_id`, `client_email`, `private_key` into `.env.local`

**Firestore Collections created automatically:**

| Collection | Purpose |
|-----------|---------|
| `conversations` | Full session history per user |
| `leads` | Qualified lead records |
| `config` | Andrew's Telegram chat_id |

### 3. Register the Telegram Webhook

After deploying to Vercel, run this once in your browser:

```
https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=https://atrellis.business/api/didi/telegram/webhook
```

Verify it's set:
```
https://api.telegram.org/bot<YOUR_TOKEN>/getWebhookInfo
```

### 4. Register Andrew's Telegram Chat ID

1. Open Telegram and search for **@Atrellis_Didi_bot**
2. Send the bot `/start` from **Andrew's account**
3. The bot will register Andrew's chat_id automatically
4. Didi will now send all lead briefs to Andrew's Telegram

If auto-registration fails, get the chat_id manually:
```
https://api.telegram.org/bot<TOKEN>/getUpdates
```
Look for `"chat":{"id": XXXXXXX}` and paste that number into `TELEGRAM_ANDREW_CHAT_ID` in `.env.local`.

---

## Folder Structure

```
atrellis-web-v2/
├── lib/
│   └── didi/
│       ├── types.ts               # All TypeScript interfaces
│       ├── system-prompt.ts       # Didi's full system instruction (builds dynamically)
│       ├── pricing-engine.ts      # 2026 Singapore pricing matrix
│       ├── design-brain.ts        # Hybrid Style framework (4 styles)
│       ├── firebase.ts            # Firestore read/write
│       ├── telegram.ts            # Bot send/receive, webhook registration
│       ├── gemini.ts              # Gemini Flash for images + translation
│       ├── make-webhook.ts        # Make.com placeholder (future)
│       └── conversation-engine.ts # Main orchestrator — Claude API + tool handling
│
├── app/
│   ├── didi/
│   │   ├── page.tsx               # /didi demo page (SSR metadata + layout)
│   │   └── components/
│   │       └── DidiChat.tsx       # Client-side chat UI
│   └── api/
│       └── didi/
│           ├── chat/
│           │   └── route.ts       # POST /api/didi/chat (web channel)
│           ├── telegram/
│           │   └── webhook/
│           │       └── route.ts   # POST /api/didi/telegram/webhook
│           └── leads/
│               └── route.ts       # GET /api/didi/leads (internal)
│
└── docs/
    └── didi/
        ├── README.md              # This file
        ├── SYSTEM_PROMPT.md       # Didi's full persona spec
        ├── ARCHITECTURE.md        # System diagram + data flow
        └── MAKE_WEBHOOK_FUTURE.md # Make.com setup guide (when ready)
```

---

## Lead Qualification Flow

Didi collects 7 mandatory fields before escalating to Andrew:

```
1. Name
2. Contact Number
3. Property Address
4. Property Type     → HDB BTO | Resale | Condo | Landed | Commercial | Shophouse
5. Project Type      → Full Reno | Zipblinds | Roofing | Carpentry | etc.
6. Key Collection /  → Target start date
   Timeline
7. Occupancy Status  → Vacant | Occupied | New hand-over
```

Once all 7 are collected → Didi pitches the **Expert Site Investigation** → Client agrees → Telegram brief fires to Andrew.

---

## Conversation Stages

| Stage | Meaning |
|-------|--------|
| `greeting` | First message |
| `collecting_*` | Actively gathering qualification fields |
| `qualified` | All 7 fields collected |
| `design_consult` | In style/design discussion |
| `site_visit_pitched` | Expert Site Investigation offered |
| `site_visit_booked` | Client agreed — escalation triggered |
| `escalated` | Brief sent to Andrew, conversation ends |

---

## Security Notes

- **Rotate the Telegram bot token** via @BotFather after the demo goes live.  
- `.env.local` is git-ignored — never commit credentials.  
- The `/api/didi/leads` endpoint has no auth yet — add Bearer token auth before public production.  
- Firebase Firestore rules: currently open for server-side admin SDK. Do not expose client SDK credentials.

---

## Future Integrations

| Feature | File | Status |
|---------|------|--------|
| Make.com → WhatsApp | `lib/didi/make-webhook.ts` | Scaffolded, needs webhook URL |
| Image analysis (banana) | `lib/didi/gemini.ts` → `analyseRoomImage()` | Built, needs UI upload trigger |
| Andrew's dashboard | `/api/didi/leads` | GET endpoint ready |
| Multi-language auto-detect | `lib/didi/gemini.ts` → `translateToMandarin()` | Built |
