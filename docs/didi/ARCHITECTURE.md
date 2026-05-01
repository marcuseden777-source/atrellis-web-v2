# Didi — System Architecture

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT CHANNELS                              │
│                                                                      │
│   Browser (/didi page)           Telegram (@Atrellis_Didi_bot)      │
│        │                                    │                        │
│  DidiChat.tsx (React)          Telegram Bot API (webhook)            │
│        │                                    │                        │
└────────┼────────────────────────────────────┼────────────────────────┘
         │                                    │
         ▼                                    ▼
┌────────────────────────────────────────────────────────┐
│                    NEXT.JS API ROUTES                    │
│                                                          │
│  POST /api/didi/chat      POST /api/didi/telegram/       │
│  (web channel)            webhook (telegram channel)     │
│         │                          │                     │
│         └──────────┬───────────────┘                     │
│                    ▼                                     │
│         lib/didi/conversation-engine.ts                  │
│              (Single orchestrator for both channels)     │
└────────────────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────────────┐
        ▼            ▼                    ▼
┌──────────────┐ ┌───────────┐ ┌──────────────────────┐
│  Anthropic   │ │  Firebase │ │  Escalation Engine   │
│  Claude      │ │  Firestore│ │                      │
│  Sonnet 4.6  │ │           │ │  Telegram → Andrew   │
│              │ │  leads/   │ │  (@Atrellis_555777)  │
│  Tools:      │ │  convers- │ │                      │
│ - capture    │ │  ations/  │ │  Make.com webhook    │
│   _lead      │ │  config/  │ │  (future → WhatsApp) │
│ - book_site  │ │           │ │                      │
│   _visit     │ │           │ │  Gemini Flash        │
│ - get_price  │ │           │ │  (image analysis)    │
│   _estimate  │ │           │ │                      │
└──────────────┘ └───────────┘ └──────────────────────┘
```

## Component Responsibilities

### `lib/didi/conversation-engine.ts` — The Brain
- Loads or creates a session from Firebase
- Builds the dynamic system prompt (includes current lead data + stage)
- Calls Claude Sonnet 4.6 with tool definitions
- Handles tool calls: `capture_lead`, `book_site_visit`, `get_price_estimate`
- Triggers escalation flow when `book_site_visit` is invoked
- Saves updated session back to Firebase
- Returns `ChatResponse` to the calling route

### `lib/didi/system-prompt.ts` — The Persona
- Builds a context-aware system prompt on every turn
- Injects current lead data (shows Claude what's been collected vs. what's missing)
- Contains all business rules: qualification logic, design brain, pricing, escalation
- Single source of truth for Didi's personality and operational logic

### `lib/didi/supabase.ts` — Memory
- Singleton Supabase client using `service_role` key (bypasses RLS, server-side only)
- Session CRUD: `conversations` table (JSONB for `lead_data` + `messages`)
- Lead storage: `leads` table with FK to `conversations`
- Andrew's chat_id: `config` table, key `andrew_telegram_chat_id`
- `updated_at` auto-maintained by Postgres trigger

### `lib/didi/telegram.ts` — Escalation Messenger
- `sendTelegramMessage()` — raw message to any chat
- `sendAndrewBrief()` — formats and sends the structured lead brief
- `setWebhook()` / `deleteWebhook()` — webhook registration helpers
- Telegram Update type definitions

### `lib/didi/pricing-engine.ts` — Price Logic
- 2026 Singapore residential and commercial pricing matrix
- Carpentry PFR (per foot run) guide
- Structural material specifications
- Formats pricing ranges for client-facing output

### `lib/didi/design-brain.ts` — Style Consultation
- 4 Hybrid Style definitions: Soft Brutalism, Modern Heritage, Boho-Industrial, Usonian Integration
- Keyword routing (e.g., "industrial" → Soft Brutalism)
- `formatStylePitch()` — generates the consultant pitch for each style

## Session State Machine

```
greeting
    │
    ▼ (user sends first message)
collecting_name
    │
    ▼ (name captured via capture_lead tool)
collecting_contact → collecting_address → collecting_property_type
    │
    ▼ (all 7 fields collected)
qualified
    │
    ├─── (design questions)──→ design_consult
    │                              │
    └──────────────────────────────▼
                           site_visit_pitched
                                   │
                           (client agrees)
                                   │
                                   ▼
                           site_visit_booked ──→ [Firebase save]
                                   │              [Telegram brief]
                                   │              [Make.com webhook]
                                   ▼
                               escalated
                          (conversation ends)
```

## Telegram Escalation Brief Format

When `book_site_visit` is triggered, Andrew receives:

```
🏗️ NEW LEAD — EXPERT SITE VISIT BOOKED

👤 Client: [Name]
📞 Contact: [WhatsApp number]
📍 Address: [Property address]
🏠 Property: [Type]
🔨 Scope: [Project type]
📅 Timeline: [Key collection / start date]
🏠 Occupancy: [Status]
━━━━━━━━━━━━━━━━━━━━━
🎨 Style Notes: [Any style preferences discussed]
💰 Budget Indicator: [If mentioned]
━━━━━━━━━━━━━━━━━━━━━
🤖 Captured via: Didi (Web/Telegram)
🕐 Time: [SG timestamp]
🔑 Session ID: [For Firebase lookup]
```

## Image Analysis Pipeline (Future)

When a user uploads a room photo on `/didi`:
1. Frontend base64-encodes the image
2. Sent to `/api/didi/chat` as `imageBase64`
3. `conversation-engine.ts` passes it to `lib/didi/gemini.ts` → `analyseRoomImage()`
4. Gemini Flash returns: style classification, renovation opportunities, material suggestions
5. Result is injected into Claude's context for the next turn
6. Claude uses it to give a specific, visual-based design recommendation

This is the `/banana` integration pathway — same vision capability, wrapped in Didi's persona.
