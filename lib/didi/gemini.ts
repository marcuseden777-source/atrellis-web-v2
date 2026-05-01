import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

let _client: GoogleGenerativeAI | null = null;

function client(): GoogleGenerativeAI {
  if (!_client) _client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  return _client;
}

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

// ─── Lightweight text tasks (FAQ lookups, translations, summaries) ─────────────

export async function geminiChat(prompt: string): Promise<string> {
  const model = client().getGenerativeModel({
    model: 'gemini-2.0-flash',
    safetySettings: SAFETY_SETTINGS,
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ─── Image analysis — future: banana integration ──────────────────────────────
// Used when a client uploads a photo of their space for design consultation.
// Didi will describe what she sees and map it to Atrellis' Hybrid Style framework.

export async function analyseRoomImage(base64Image: string, mimeType: string = 'image/jpeg'): Promise<string> {
  const model = client().getGenerativeModel({
    model: 'gemini-2.0-flash',
    safetySettings: SAFETY_SETTINGS,
  });

  const result = await model.generateContent([
    {
      inlineData: {
        data: base64Image,
        mimeType,
      },
    },
    `You are an interior design analyst for Atrellis, a premium Singapore contractor.
Analyse this room image and provide:
1. Current style classification (be specific — e.g., "dated HDB-standard laminate finish")
2. Key renovation opportunities you can spot (structural, aesthetic, functional)
3. Which Atrellis Hybrid Style would best transform this space: Soft Brutalism | Modern Heritage | Boho-Industrial | Usonian Integration
4. 2–3 specific material suggestions using Atrellis' palette (Galvanized Steel, ACP panels, Zipblinds, composite roofing)
Keep the response warm and consultative, as if briefing a senior contractor. Under 200 words.`,
  ]);

  return result.response.text();
}

// ─── Translate to Mandarin (for bilingual responses) ──────────────────────────

export async function translateToMandarin(text: string): Promise<string> {
  return geminiChat(
    `Translate the following to Simplified Chinese (Mandarin), maintaining a warm, professional tone suitable for a Singapore interior design consultation:\n\n${text}`
  );
}
