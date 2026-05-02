import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from './system-prompt';
import { getSession, createSession, updateSession, saveLead, markLeadEscalated, getAllEscalationChatIds } from './supabase';
import { sendAndrewBrief } from './telegram';
import { sendToMakeWebhook } from './make-webhook';
import { getPriceEstimate, formatPriceRange } from './pricing-engine';
import { ChatRequest, ChatResponse, ConversationSession, ConversationMessage, LeadData, PropertyType, QualificationStage, TelegramBrief } from './types';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Tool definitions ─────────────────────────────────────────────────────────

const DIDI_TOOLS: Anthropic.Tool[] = [
  {
    name: 'capture_lead',
    description: 'Call this whenever a new lead field value is obtained from the conversation. Can be called multiple times as fields are collected.',
    input_schema: {
      type: 'object' as const,
      properties: {
        field: {
          type: 'string',
          enum: ['name', 'contactNumber', 'propertyAddress', 'propertyType', 'projectType', 'keyCollectionDate', 'occupancyStatus', 'stylePreferences', 'budgetIndicator', 'additionalNotes'],
          description: 'The lead field being captured',
        },
        value: { type: 'string', description: 'The value extracted from the conversation' },
      },
      required: ['field', 'value'],
    },
  },
  {
    name: 'book_site_visit',
    description: 'Call this when the client explicitly agrees to an Expert Site Investigation. This triggers the full escalation flow: saves lead to Firebase and sends brief to Andrew via Telegram.',
    input_schema: {
      type: 'object' as const,
      properties: {
        preferredDate: { type: 'string', description: 'Client\'s preferred date/time for the site visit, if mentioned' },
        additionalNotes: { type: 'string', description: 'Any final notes or special instructions from the client' },
      },
      required: [],
    },
  },
  {
    name: 'get_price_estimate',
    description: 'Retrieve the 2026 Singapore pricing benchmark for a given property type.',
    input_schema: {
      type: 'object' as const,
      properties: {
        propertyType: {
          type: 'string',
          enum: ['HDB BTO', 'HDB Resale', 'Condo', 'Landed', 'Commercial', 'Shophouse'],
        },
      },
      required: ['propertyType'],
    },
  },
];

// ─── Main engine entry point ──────────────────────────────────────────────────

export async function processMessage(req: ChatRequest): Promise<ChatResponse> {
  const { sessionId, message, channel = 'web' } = req;

  // Load or create session
  let session = await getSession(sessionId);
  if (!session) {
    session = await createSession(sessionId, channel);
  }

  // Append the user message
  const userMessage: ConversationMessage = { role: 'user', content: message, timestamp: Date.now() };
  const updatedMessages = [...session.messages, userMessage];

  // Build Claude message history
  const claudeMessages: Anthropic.MessageParam[] = updatedMessages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  // Call Claude Sonnet with tools
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: buildSystemPrompt(session.stage, session.leadData, channel),
    messages: claudeMessages,
    tools: DIDI_TOOLS,
  });

  // Process tool calls and build final reply
  let leadData: LeadData = { ...session.leadData };
  let stage: QualificationStage = session.stage;
  let actionTriggered: ChatResponse['actionTriggered'];
  let toolResults: Anthropic.MessageParam[] = [];

  // Handle tool use blocks
  const toolUseBlocks = response.content.filter((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use');

  for (const tool of toolUseBlocks) {
    let toolResult = '';

    if (tool.name === 'capture_lead') {
      const input = tool.input as { field: keyof LeadData; value: string };
      leadData = { ...leadData, [input.field]: input.value };
      toolResult = `Captured: ${input.field} = "${input.value}"`;

      // Update stage based on completeness
      const newStage = computeStage(leadData, stage);
      if (newStage !== stage) stage = newStage;
      actionTriggered = 'lead_captured';

    } else if (tool.name === 'book_site_visit') {
      const input = tool.input as { preferredDate?: string; additionalNotes?: string };
      if (input.additionalNotes) leadData.additionalNotes = input.additionalNotes;
      stage = 'site_visit_booked';

      // Save to Firebase
      await saveLead({ ...session, leadData, stage, isEscalated: false });

      // Send Telegram brief to all authorized users
      const chatIds = await getAllEscalationChatIds();
      const fallback = process.env.TELEGRAM_ANDREW_CHAT_ID;
      const targets = chatIds.length > 0 ? chatIds : (fallback ? [fallback] : []);
      if (targets.length > 0) {
        const brief: TelegramBrief = {
          leadName: leadData.name ?? 'Unknown',
          contact: leadData.contactNumber ?? 'Not provided',
          address: leadData.propertyAddress ?? 'Not provided',
          propertyType: leadData.propertyType ?? 'Not specified',
          projectType: leadData.projectType ?? 'Not specified',
          timeline: leadData.keyCollectionDate ?? 'Not specified',
          occupancy: leadData.occupancyStatus ?? 'Not specified',
          styleNotes: leadData.stylePreferences?.join(', ') ?? 'Not discussed',
          budgetIndicator: leadData.budgetIndicator ?? 'To assess',
          sessionId,
          timestamp: new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' }),
        };
        await Promise.all(targets.map((id) => sendAndrewBrief(brief, id as number | string)));
        await markLeadEscalated(sessionId);

        // Fire Make.com webhook (no-op if not configured)
        await sendToMakeWebhook({ ...brief, source: channel });
      }

      actionTriggered = 'site_visit_booked';
      toolResult = 'Site visit booked. Brief sent to Andrew.';

    } else if (tool.name === 'get_price_estimate') {
      const input = tool.input as { propertyType: PropertyType };
      const estimate = getPriceEstimate(input.propertyType);
      toolResult = formatPriceRange(estimate);
    }

    toolResults.push({
      role: 'user',
      content: [{ type: 'tool_result', tool_use_id: tool.id, content: toolResult }],
    });
  }

  // If there were tool calls, get Claude's final text response
  let finalReply = '';

  if (toolUseBlocks.length > 0) {
    const followUp = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: buildSystemPrompt(stage, leadData, channel),
      messages: [...claudeMessages, { role: 'assistant', content: response.content }, ...toolResults],
      tools: DIDI_TOOLS,
    });
    finalReply = extractTextContent(followUp.content);
  } else {
    finalReply = extractTextContent(response.content);
  }

  // Save updated session
  const assistantMessage: ConversationMessage = { role: 'assistant', content: finalReply, timestamp: Date.now() };
  await updateSession(sessionId, {
    stage,
    leadData,
    messages: [...updatedMessages, assistantMessage],
    isEscalated: stage === 'escalated',
  });

  return { reply: finalReply, stage, leadData, actionTriggered };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractTextContent(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join(' ')
    .trim();
}

function computeStage(lead: LeadData, current: QualificationStage): QualificationStage {
  if (current === 'site_visit_booked' || current === 'escalated') return current;

  const mandatoryFields: (keyof LeadData)[] = [
    'name', 'contactNumber', 'propertyAddress', 'propertyType',
    'projectType', 'keyCollectionDate', 'occupancyStatus',
  ];
  const allCollected = mandatoryFields.every((f) => !!lead[f]);
  if (allCollected && current !== 'site_visit_pitched') return 'qualified';
  return current;
}
