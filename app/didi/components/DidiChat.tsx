'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatResponse, QualificationStage } from '@/lib/didi/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  actionTriggered?: ChatResponse['actionTriggered'];
}

const STAGE_LABELS: Partial<Record<QualificationStage, string>> = {
  greeting: 'Getting started',
  collecting_name: 'Collecting details',
  collecting_contact: 'Collecting details',
  collecting_address: 'Collecting details',
  collecting_property_type: 'Qualifying lead',
  collecting_project_type: 'Qualifying lead',
  collecting_timeline: 'Qualifying lead',
  collecting_occupancy: 'Qualifying lead',
  qualified: 'Lead qualified ✓',
  design_consult: 'Design consultation',
  site_visit_pitched: 'Site visit offered',
  site_visit_booked: 'Site visit booked ✓',
  escalated: 'Handed to Andrew ✓',
};

function generateSessionId(): string {
  return `web_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: `👋 Hi there! I'm **Didi**, Andrew's Digital Chief of Staff at **Atrellis**.

Whether you're planning a full renovation, exploring design ideas, or looking into Zipblinds and roofing — I'm here to help you figure out the next step.

What's your name, and what kind of project are you thinking about?`,
  timestamp: Date.now(),
};

export default function DidiChat() {
  const [sessionId] = useState(generateSessionId);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<QualificationStage>('greeting');
  const [toast, setToast] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: 'user', content: text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/didi/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      });

      if (!res.ok) throw new Error('Network error');

      const data: ChatResponse = await res.json();

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: Date.now(),
        actionTriggered: data.actionTriggered,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setStage(data.stage);

      if (data.actionTriggered === 'site_visit_booked') {
        showToast('🗓️ Site visit request sent to Andrew!');
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Aiya, something went wrong on my end. Give it a moment and try again ah! If it persists, WhatsApp us directly.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const stageLabel = STAGE_LABELS[stage];

  return (
    <div className="didi-chat-wrapper">
      {/* Header */}
      <div className="didi-header">
        <div className="didi-avatar">
          <span>D</span>
          <span className="didi-online-dot" />
        </div>
        <div className="didi-header-info">
          <h3>Didi</h3>
          <p>Digital Chief of Staff · Atrellis</p>
        </div>
        {stageLabel && (
          <div className="didi-stage-badge">
            {stageLabel}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="didi-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`didi-bubble-row ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="didi-bubble-avatar">D</div>
            )}
            <div className={`didi-bubble ${msg.role}`}>
              <FormattedContent content={msg.content} />
              {msg.actionTriggered === 'site_visit_booked' && (
                <div className="didi-action-tag">✓ Site visit confirmed</div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="didi-bubble-row assistant">
            <div className="didi-bubble-avatar">D</div>
            <div className="didi-bubble assistant didi-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="didi-input-area">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message… (Enter to send)"
          rows={1}
          disabled={isLoading || stage === 'escalated'}
          className="didi-textarea"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim() || stage === 'escalated'}
          className="didi-send-btn"
          aria-label="Send"
        >
          <SendIcon />
        </button>
      </div>

      {stage === 'escalated' && (
        <div className="didi-escalated-banner">
          ✅ Andrew has been briefed. His team will contact you shortly!
        </div>
      )}

      {/* Toast */}
      {toast && <div className="didi-toast">{toast}</div>}
    </div>
  );
}

// Render **bold** markdown inline
function FormattedContent({ content }: { content: string }) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : part
      )}
    </p>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
