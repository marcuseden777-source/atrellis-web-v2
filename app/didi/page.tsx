import type { Metadata } from 'next';
import SiteNav from '@/app/components/SiteNav';
import SiteFooter from '@/app/components/SiteFooter';
import DidiChat from './components/DidiChat';

export const metadata: Metadata = {
  title: 'Didi — Andrew\'s Digital Assistant | Atrellis',
  description: 'Chat with Didi, the AI-powered Digital Chief of Staff for Atrellis. Get design ideas, renovation quotes, and book a free Expert Site Investigation.',
  robots: { index: false }, // Demo page — hide from search until production
};

export default function DidiPage() {
  return (
    <>
      <SiteNav />
      <main className="didi-page">

        {/* ── Hero intro ── */}
        <section className="didi-hero">
          <div className="didi-hero-label">DEMO · LIVE AGENT</div>
          <h1 className="didi-hero-title">
            Meet <span className="didi-name-highlight">Didi</span>
          </h1>
          <p className="didi-hero-sub">
            Andrew&apos;s Digital Chief of Staff — bilingual, always on, and ready to consult on your next renovation or design project.
          </p>

          <div className="didi-capabilities">
            {[
              { icon: '🏗️', label: 'Qualifies your brief' },
              { icon: '🎨', label: '2026 Hybrid Style consult' },
              { icon: '💰', label: 'Ballpark estimates' },
              { icon: '📅', label: 'Books site visits' },
            ].map((cap) => (
              <div key={cap.label} className="didi-cap-pill">
                <span>{cap.icon}</span>
                <span>{cap.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Chat interface ── */}
        <section className="didi-chat-section">
          <DidiChat />
        </section>

        {/* ── Telegram CTA ── */}
        <section className="didi-telegram-cta">
          <div className="didi-telegram-card">
            <div className="didi-telegram-icon">
              <TelegramIcon />
            </div>
            <div>
              <h3>Prefer Telegram?</h3>
              <p>Chat with Didi directly on Telegram — same intelligence, your favourite app.</p>
            </div>
            <a
              href="https://t.me/Atrellis_Didi_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="didi-telegram-btn"
            >
              Open on Telegram
            </a>
          </div>

          <div className="didi-whatsapp-card">
            <div className="didi-whatsapp-icon">
              <WhatsAppIcon />
            </div>
            <div>
              <h3>Prefer WhatsApp?</h3>
              <p>Speak directly to Andrew&apos;s team for urgent or complex enquiries.</p>
            </div>
            <a
              href="https://wa.me/6592223333?text=Hi%20Atrellis!%20I'd%20like%20to%20enquire%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="didi-whatsapp-btn"
            >
              WhatsApp Us
            </a>
          </div>
        </section>

        {/* ── Demo disclaimer ── */}
        <div className="didi-disclaimer">
          <span>🔒</span>
          <span>This is a live demo. All conversations are saved to the Atrellis lead database. Pricing ranges are 2026 market benchmarks — not final quotes.</span>
        </div>

      </main>
      <SiteFooter />

      <style>{`
        /* ═══════════════════════════════════════════════════════════
           DIDI PAGE STYLES — matches Atrellis Liquid Glass system
        ═══════════════════════════════════════════════════════════ */

        .didi-page {
          background: #050505;
          min-height: 100vh;
          padding-top: 80px;
          color: rgba(255,255,255,0.95);
          font-family: var(--font-main, 'Outfit', sans-serif);
        }

        /* ── Hero ── */
        .didi-hero {
          text-align: center;
          padding: 4rem 1.5rem 2rem;
          max-width: 720px;
          margin: 0 auto;
        }
        .didi-hero-label {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #007AFF;
          border: 1px solid rgba(0,122,255,0.35);
          border-radius: 999px;
          padding: 0.3rem 1rem;
          margin-bottom: 1.5rem;
          background: rgba(0,122,255,0.08);
        }
        .didi-hero-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          line-height: 1.1;
        }
        .didi-name-highlight {
          background: linear-gradient(135deg, #007AFF, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .didi-hero-sub {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.55);
          max-width: 540px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }
        .didi-capabilities {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        .didi-cap-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 0.4rem 0.9rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
        }

        /* ── Chat section ── */
        .didi-chat-section {
          max-width: 760px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        /* ── Chat wrapper ── */
        .didi-chat-wrapper {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 600px;
          position: relative;
        }

        /* ── Chat header ── */
        .didi-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.3);
          flex-shrink: 0;
        }
        .didi-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #007AFF, #34d399);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.1rem;
          color: white;
          position: relative;
          flex-shrink: 0;
        }
        .didi-online-dot {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #34d399;
          border: 2px solid #050505;
        }
        .didi-header-info h3 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
          color: rgba(255,255,255,0.95);
        }
        .didi-header-info p {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }
        .didi-stage-badge {
          margin-left: auto;
          font-size: 0.68rem;
          color: #34d399;
          background: rgba(52,211,153,0.1);
          border: 1px solid rgba(52,211,153,0.25);
          border-radius: 999px;
          padding: 0.2rem 0.7rem;
          white-space: nowrap;
        }

        /* ── Messages ── */
        .didi-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          scroll-behavior: smooth;
        }
        .didi-messages::-webkit-scrollbar { width: 4px; }
        .didi-messages::-webkit-scrollbar-track { background: transparent; }
        .didi-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        .didi-bubble-row {
          display: flex;
          align-items: flex-end;
          gap: 0.6rem;
        }
        .didi-bubble-row.user { flex-direction: row-reverse; }

        .didi-bubble-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #007AFF, #34d399);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
        }

        .didi-bubble {
          max-width: 78%;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          font-size: 0.88rem;
          line-height: 1.6;
        }
        .didi-bubble.assistant {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.9);
          border-bottom-left-radius: 4px;
        }
        .didi-bubble.user {
          background: #007AFF;
          color: white;
          border-bottom-right-radius: 4px;
        }
        .didi-action-tag {
          margin-top: 0.5rem;
          font-size: 0.7rem;
          color: #34d399;
          font-weight: 600;
        }

        /* Typing indicator */
        .didi-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0.9rem 1.1rem;
        }
        .didi-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          animation: didiBounce 1.2s infinite ease-in-out;
        }
        .didi-typing span:nth-child(2) { animation-delay: 0.15s; }
        .didi-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes didiBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        /* ── Input area ── */
        .didi-input-area {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          padding: 0.9rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.2);
          flex-shrink: 0;
        }
        .didi-textarea {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 0.65rem 1rem;
          color: rgba(255,255,255,0.9);
          font-family: inherit;
          font-size: 0.88rem;
          resize: none;
          outline: none;
          min-height: 42px;
          max-height: 120px;
          transition: border-color 0.2s;
          line-height: 1.5;
        }
        .didi-textarea:focus { border-color: rgba(0,122,255,0.5); }
        .didi-textarea::placeholder { color: rgba(255,255,255,0.25); }
        .didi-textarea:disabled { opacity: 0.4; cursor: not-allowed; }
        .didi-send-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #007AFF;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.1s;
        }
        .didi-send-btn:hover:not(:disabled) { opacity: 0.85; }
        .didi-send-btn:active:not(:disabled) { transform: scale(0.95); }
        .didi-send-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        /* Escalated banner */
        .didi-escalated-banner {
          text-align: center;
          padding: 0.75rem;
          background: rgba(52,211,153,0.08);
          border-top: 1px solid rgba(52,211,153,0.2);
          font-size: 0.82rem;
          color: #34d399;
          flex-shrink: 0;
        }

        /* Toast */
        .didi-toast {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(52,211,153,0.15);
          border: 1px solid rgba(52,211,153,0.35);
          color: #34d399;
          padding: 0.5rem 1.2rem;
          border-radius: 999px;
          font-size: 0.8rem;
          white-space: nowrap;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.3s ease;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* ── Telegram / WhatsApp CTA ── */
        .didi-telegram-cta {
          max-width: 760px;
          margin: 1.5rem auto 0;
          padding: 0 1rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 640px) {
          .didi-telegram-cta { grid-template-columns: 1fr; }
        }
        .didi-telegram-card, .didi-whatsapp-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .didi-telegram-card h3, .didi-whatsapp-card h3 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
        }
        .didi-telegram-card p, .didi-whatsapp-card p {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
          margin: 0;
          line-height: 1.5;
        }
        .didi-telegram-icon, .didi-whatsapp-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .didi-telegram-icon { background: rgba(0,136,204,0.15); }
        .didi-whatsapp-icon { background: rgba(37,211,102,0.15); }
        .didi-telegram-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.55rem 1.2rem;
          border-radius: 10px;
          background: #0088CC;
          color: white;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s;
          align-self: flex-start;
        }
        .didi-telegram-btn:hover { opacity: 0.85; }
        .didi-whatsapp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.55rem 1.2rem;
          border-radius: 10px;
          background: #25D366;
          color: white;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s;
          align-self: flex-start;
        }
        .didi-whatsapp-btn:hover { opacity: 0.85; }

        /* ── Disclaimer ── */
        .didi-disclaimer {
          max-width: 760px;
          margin: 1.5rem auto 3rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          line-height: 1.5;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .didi-hero { padding: 3rem 1.25rem 1.5rem; }
          .didi-chat-wrapper { height: 520px; border-radius: 16px; }
          .didi-bubble { max-width: 88%; }
        }
      `}</style>
    </>
  );
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0088CC">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.288 13.99l-2.99-.937c-.648-.204-.657-.648.136-.961l11.67-4.504c.537-.194 1.006.131.79.633z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.843L0 24l6.335-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.032-1.384l-.36-.214-3.732.884.938-3.63-.236-.374A9.818 9.818 0 012.182 12c0-5.425 4.393-9.818 9.818-9.818S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
    </svg>
  );
}
