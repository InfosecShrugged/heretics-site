/**
 * Oppty — The Wise Duck Chat Widget (v2 — BIG DUCK)
 * NetherOps / OpptyCon Knowledge Bot
 *
 * Usage: <script src="/oppty-widget.js" defer></script>
 *
 * Optional config:
 *   window.OPPTY_CONFIG = {
 *     endpoint: '/api/oppty-chat',
 *     avatar: '/assets/oppty-avatar.png',
 *     position: 'right',
 *   };
 */
(function () {
  'use strict';

  const cfg = Object.assign(
    {
      endpoint: '/api/oppty-chat',
      avatar: '/assets/oppty-avatar.png',
      greeting:
        'I\'m Oppty — your governed revenue advisor. Ask me about pipeline coverage, CAC payback, the Rule of 60, board metrics, or anything GTM. I\'ve read every Kellblog post so you don\'t have to.',
      position: 'right',
    },
    window.OPPTY_CONFIG || {}
  );

  const posR = cfg.position === 'right';

  // --- INJECT STYLES ---
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Chivo+Mono:ital,wght@0,100..900;1,100..900&display=swap');

    #oppty-widget, #oppty-widget * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* ============================
       THE BIG DUCK — Resting State
       ============================ */
    #oppty-duck {
      position: fixed;
      bottom: -8px;
      ${posR ? 'right' : 'left'}: 16px;
      z-index: 99999;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s;
      filter: drop-shadow(0 8px 24px rgba(0,0,0,0.3));
      /* No clipping — let the duck breathe */
    }

    #oppty-duck:hover {
      transform: translateY(-8px) scale(1.03);
      filter: drop-shadow(0 12px 32px rgba(0,0,0,0.35));
    }

    #oppty-duck:active {
      transform: translateY(-4px) scale(0.98);
    }

    #oppty-duck img {
      width: 160px;
      height: auto;
      display: block;
      pointer-events: none;
    }

    /* Pulsing ring behind the duck */
    #oppty-duck-ring {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(214,64,116,0.15) 0%, transparent 70%);
      animation: oppty-ring-pulse 2.5s ease-in-out infinite;
      pointer-events: none;
      z-index: -1;
    }

    @keyframes oppty-ring-pulse {
      0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
      50% { transform: translateX(-50%) scale(1.4); opacity: 0; }
    }

    /* Speech hint bubble */
    #oppty-hint {
      position: absolute;
      top: -8px;
      ${posR ? 'right' : 'left'}: 100%;
      ${posR ? 'margin-right' : 'margin-left'}: -20px;
      background: #1a1918;
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 14px;
      border-radius: 10px;
      white-space: nowrap;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      opacity: 0;
      transform: translateY(4px);
      transition: opacity 0.3s, transform 0.3s;
      pointer-events: none;
    }

    #oppty-hint::after {
      content: '';
      position: absolute;
      top: 50%;
      ${posR ? 'right' : 'left'}: -6px;
      transform: translateY(-50%) rotate(45deg);
      width: 12px;
      height: 12px;
      background: #1a1918;
      border-radius: 2px;
    }

    #oppty-duck:hover #oppty-hint {
      opacity: 1;
      transform: translateY(0);
    }

    /* Name tag under the duck */
    #oppty-nametag {
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      background: #D64074;
      color: #fff;
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 3px 12px;
      border-radius: 10px;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(214,64,116,0.4);
      pointer-events: none;
    }

    /* Hide duck when chat is open */
    #oppty-widget.open #oppty-duck {
      transform: translateY(200px) scale(0.5);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.3s ease-in, opacity 0.2s;
    }

    /* ============================
       CHAT PANEL
       ============================ */
    #oppty-panel {
      position: fixed;
      bottom: 24px;
      ${posR ? 'right' : 'left'}: 24px;
      z-index: 99998;
      width: 420px;
      max-width: calc(100vw - 48px);
      height: 600px;
      max-height: calc(100vh - 48px);
      background: #fff;
      border: 1px solid rgba(0,0,0,0.13);
      border-radius: 0;
      box-shadow: 0 16px 64px rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(40px) scale(0.92);
      transition: opacity 0.3s, visibility 0.3s, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform-origin: bottom ${cfg.position};
    }

    #oppty-widget.open #oppty-panel {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    /* --- Header --- */
    #oppty-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 20px;
      background: #1a1918;
      flex-shrink: 0;
    }

    #oppty-header-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 2px solid #D64074;
      overflow: hidden;
      flex-shrink: 0;
      background: #2a2928;
    }

    #oppty-header-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    #oppty-header-text h3 {
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      font-size: 17px;
      font-weight: 400;
      color: #fff;
      letter-spacing: -0.02em;
    }

    #oppty-header-text span {
      font-size: 12px;
      color: rgba(255,255,255,0.45);
      font-family: 'Chivo Mono', 'Space Mono', monospace;
    }

    /* Close button */
    #oppty-close-btn {
      margin-left: auto;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.5);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
    }

    #oppty-close-btn:hover {
      background: rgba(255,255,255,0.15);
      color: #fff;
    }

    /* --- Messages --- */
    #oppty-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #F4F4F2;
    }

    #oppty-messages::-webkit-scrollbar { width: 4px; }
    #oppty-messages::-webkit-scrollbar-track { background: transparent; }
    #oppty-messages::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.13); border-radius: 2px; }

    .oppty-msg {
      max-width: 85%;
      padding: 12px 16px;
      border-radius: 0;
      font-size: 14px;
      line-height: 1.65;
      animation: oppty-msg-in 0.3s ease-out;
    }

    @keyframes oppty-msg-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .oppty-msg.bot {
      align-self: flex-start;
      background: #fff;
      color: #1a1918;
      border: 1px solid rgba(0,0,0,0.07);
      border-bottom-left-radius: 4px;
    }

    .oppty-msg.user {
      align-self: flex-end;
      background: #1a1918;
      color: #fff;
      border-bottom-right-radius: 4px;
    }

    .oppty-msg.bot p { margin-bottom: 8px; }
    .oppty-msg.bot p:last-child { margin-bottom: 0; }
    .oppty-msg.bot strong { color: #1a1918; font-weight: 600; }
    .oppty-msg.bot em { color: #D64074; font-style: italic; }
    .oppty-msg.bot code {
      font-family: 'Chivo Mono', 'Space Mono', monospace;
      font-size: 13px;
      background: #EBEBEB;
      padding: 1px 5px;
      border-radius: 3px;
    }
    .oppty-msg.bot ul, .oppty-msg.bot ol { padding-left: 18px; margin: 6px 0; }
    .oppty-msg.bot li { margin-bottom: 3px; }

    /* Greeting */
    .oppty-msg.greeting {
      background: linear-gradient(135deg, #fff 0%, rgba(214,64,116,0.06) 100%);
      border: 1px solid rgba(214,64,116,0.25);
      max-width: 92%;
    }

    .oppty-msg.greeting .g-title {
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      font-weight: 400;
      font-size: 15px;
      color: #D64074;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Suggestions */
    .oppty-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }

    .oppty-suggestion {
      padding: 7px 14px;
      font-size: 12px;
      font-weight: 500;
      color: #D64074;
      background: rgba(214,64,116,0.06);
      border: 1px solid rgba(214,64,116,0.25);
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }

    .oppty-suggestion:hover {
      background: #D64074;
      color: #fff;
      border-color: #D64074;
    }

    /* Thinking dots */
    .oppty-thinking {
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 14px 20px;
      background: #fff;
      border: 1px solid rgba(0,0,0,0.07);
      border-radius: 0;
      border-bottom-left-radius: 4px;
      animation: oppty-msg-in 0.2s ease-out;
    }

    .oppty-thinking .dot {
      width: 7px;
      height: 7px;
      background: #c0c0c0;
      border-radius: 50%;
      animation: oppty-bounce 1.2s infinite;
    }

    .oppty-thinking .dot:nth-child(2) { animation-delay: 0.15s; }
    .oppty-thinking .dot:nth-child(3) { animation-delay: 0.3s; }

    @keyframes oppty-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
      30% { transform: translateY(-8px); opacity: 1; }
    }

    /* --- Input --- */
    #oppty-input-area {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid rgba(0,0,0,0.07);
      background: #fff;
      flex-shrink: 0;
    }

    #oppty-input {
      flex: 1;
      border: 1px solid rgba(0,0,0,0.13);
      border-radius: 0;
      padding: 10px 14px;
      font-size: 14px;
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      color: #1a1918;
      resize: none;
      max-height: 100px;
      min-height: 42px;
      line-height: 1.4;
      outline: none;
      background: #F4F4F2;
      transition: border-color 0.15s, background 0.15s;
    }

    #oppty-input:focus {
      border-color: #D64074;
      background: #fff;
    }

    #oppty-input::placeholder { color: #909090; }

    #oppty-send {
      width: 42px;
      height: 42px;
      border: none;
      border-radius: 0;
      background: #D64074;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, transform 0.1s;
      flex-shrink: 0;
    }

    #oppty-send:hover { background: #C23668; }
    #oppty-send:active { transform: scale(0.94); }
    #oppty-send:disabled { background: rgba(0,0,0,0.13); cursor: not-allowed; }
    #oppty-send svg { width: 18px; height: 18px; }

    /* --- Footer --- */
    #oppty-footer {
      padding: 6px 16px 10px;
      text-align: center;
      font-size: 11px;
      color: #909090;
      background: #fff;
      flex-shrink: 0;
    }

    #oppty-footer a { color: #D64074; font-weight: 500; text-decoration: none; }

    /* --- Mobile --- */
    @media (max-width: 520px) {
      #oppty-duck img { width: 120px; }
      #oppty-nametag { font-size: 10px; padding: 2px 10px; }

      #oppty-panel {
        bottom: 0;
        ${posR ? 'right' : 'left'}: 0;
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
        border: none;
      }
    }
  `;
  document.head.appendChild(style);

  // --- BUILD DOM ---
  const widget = document.createElement('div');
  widget.id = 'oppty-widget';

  widget.innerHTML = `
    <!-- THE BIG DUCK -->
    <div id="oppty-duck">
      <div id="oppty-duck-ring"></div>
      <img src="${cfg.avatar}" alt="Oppty the Wise Duck" onerror="this.style.fontSize='100px';this.style.width='160px';this.style.textAlign='center';this.outerHTML='<div style=\\'font-size:120px;width:160px;text-align:center;pointer-events:none\\'>🦆</div>'">
      <div id="oppty-nametag">Ask Oppty</div>
      <div id="oppty-hint">Got a GTM question?</div>
    </div>

    <!-- CHAT PANEL -->
    <div id="oppty-panel">
      <div id="oppty-header">
        <div id="oppty-header-avatar">
          <img src="${cfg.avatar}" alt="Oppty" onerror="this.parentElement.innerHTML='<span style=\\'font-size:28px;display:flex;align-items:center;justify-content:center;width:100%;height:100%\\'>🦆</span>'">
        </div>
        <div id="oppty-header-text">
          <h3>Oppty</h3>
          <span>Governed Revenue Advisor</span>
        </div>
        <button id="oppty-close-btn" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div id="oppty-messages"></div>
      <div id="oppty-input-area">
        <textarea id="oppty-input" placeholder="Ask about pipeline, metrics, GTM…" rows="1"></textarea>
        <button id="oppty-send" aria-label="Send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <div id="oppty-footer">Powered by <a href="/opptycon/">OpptyCon</a> · NetherOps</div>
    </div>
  `;
  document.body.appendChild(widget);

  // --- STATE ---
  const messages = [];
  let isLoading = false;

  // --- REFS ---
  const duck = document.getElementById('oppty-duck');
  const panel = document.getElementById('oppty-panel');
  const closeBtn = document.getElementById('oppty-close-btn');
  const msgContainer = document.getElementById('oppty-messages');
  const input = document.getElementById('oppty-input');
  const sendBtn = document.getElementById('oppty-send');

  // --- GREETING ---
  function showGreeting() {
    const suggestions = [
      'What is pipeline coverage?',
      'Explain the Rule of 60',
      'How do I fix a broken funnel?',
      'Board deck metrics?',
    ];

    msgContainer.innerHTML = \`
      <div class="oppty-msg bot greeting">
        <div class="g-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D64074" stroke-width="2" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          Quack. I mean — greetings.
        </div>
        <p>\${cfg.greeting}</p>
        <div class="oppty-suggestions">
          \${suggestions.map(s => \`<button class="oppty-suggestion">\${s}</button>\`).join('')}
        </div>
      </div>
    \`;

    msgContainer.querySelectorAll('.oppty-suggestion').forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.textContent;
        sendMessage();
      });
    });
  }

  showGreeting();

  // --- OPEN / CLOSE ---
  function openChat() {
    widget.classList.add('open');
    setTimeout(() => input.focus(), 350);
  }

  function closeChat() {
    widget.classList.remove('open');
  }

  duck.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && widget.classList.contains('open')) closeChat();
  });

  // --- RENDER ---
  function renderMessage(role, content) {
    const div = document.createElement('div');
    div.className = \`oppty-msg \${role === 'user' ? 'user' : 'bot'}\`;
    div.innerHTML = role === 'assistant' ? markdownToHTML(content) : escapeHTML(content);
    msgContainer.appendChild(div);
    scrollToBottom();
  }

  function showThinking() {
    const div = document.createElement('div');
    div.className = 'oppty-thinking';
    div.id = 'oppty-thinking';
    div.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    msgContainer.appendChild(div);
    scrollToBottom();
  }

  function hideThinking() {
    const el = document.getElementById('oppty-thinking');
    if (el) el.remove();
  }

  function scrollToBottom() {
    requestAnimationFrame(() => { msgContainer.scrollTop = msgContainer.scrollHeight; });
  }

  function escapeHTML(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // --- MARKDOWN ---
  function markdownToHTML(text) {
    return text
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^[\s]*[-•]\s+(.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, m => \`<ul>\${m}</ul>\`)
      .split('\\n\\n')
      .map(p => {
        p = p.trim();
        if (!p) return '';
        if (p.startsWith('<ul>') || p.startsWith('<ol>') || p.startsWith('<li>')) return p;
        return \`<p>\${p.replace(/\\n/g, '<br>')}</p>\`;
      })
      .join('');
  }

  // --- SEND ---
  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isLoading) return;

    const suggestions = msgContainer.querySelector('.oppty-suggestions');
    if (suggestions) suggestions.remove();

    messages.push({ role: 'user', content: text });
    renderMessage('user', text);
    input.value = '';
    autoResize();

    isLoading = true;
    sendBtn.disabled = true;
    showThinking();

    try {
      const res = await fetch(cfg.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, siteUrl: window.location.origin }),
      });

      hideThinking();

      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

      const data = await res.json();
      const reply = data.reply || 'Lost my train of thought. Try again?';
      messages.push({ role: 'assistant', content: reply });
      renderMessage('assistant', reply);
    } catch (err) {
      hideThinking();
      console.error('Oppty error:', err);
      renderMessage('assistant', 'Something went sideways. Even a samurai duck has off moments — try again.');
    }

    isLoading = false;
    sendBtn.disabled = false;
    input.focus();
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  function autoResize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  }
  input.addEventListener('input', autoResize);

})();
