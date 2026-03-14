/**
 * Oppty — The Wise Duck Chat Widget
 * NetherOps / OpptyCon Knowledge Bot
 *
 * Usage: Add to any page:
 *   <script src="/oppty-widget.js" defer></script>
 *
 * Optional config (before the script tag):
 *   <script>
 *     window.OPPTY_CONFIG = {
 *       endpoint: '/.netlify/functions/oppty-chat',  // API endpoint
 *       avatar: '/assets/oppty-avatar.png',           // Duck avatar image
 *       greeting: 'Ask me anything about revenue operations, pipeline physics, or GTM strategy.',
 *       position: 'right',                            // 'right' or 'left'
 *     };
 *   </script>
 */
(function () {
  'use strict';

  // --- CONFIG ---
  const cfg = Object.assign(
    {
      endpoint: '/.netlify/functions/oppty-chat',
      avatar: '/assets/oppty-avatar.png',
      greeting:
        'I\'m Oppty — your governed revenue advisor. Ask me about pipeline coverage, CAC payback, the Rule of 60, board metrics, or anything GTM. I\'ve read every Kellblog post so you don\'t have to.',
      position: 'right',
    },
    window.OPPTY_CONFIG || {}
  );

  // --- INJECT STYLES ---
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Chivo+Mono:ital,wght@0,100..900;1,100..900&display=swap');

    /* Reset for widget */
    #oppty-widget, #oppty-widget * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* --- Floating Bubble --- */
    #oppty-bubble {
      position: fixed;
      bottom: 24px;
      ${cfg.position}: 24px;
      z-index: 99999;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #1a1918;
      border: 2px solid #D64074;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 0 rgba(214,64,116,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #oppty-bubble:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(0,0,0,0.3), 0 0 0 4px rgba(214,64,116,0.15);
    }

    #oppty-bubble.has-pulse {
      animation: oppty-pulse 2s ease-in-out infinite;
    }

    @keyframes oppty-pulse {
      0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 0 rgba(214,64,116,0.4); }
      50% { box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 8px rgba(214,64,116,0); }
    }

    #oppty-bubble img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    /* Fallback SVG icon if no image */
    #oppty-bubble .oppty-icon-fallback {
      width: 32px;
      height: 32px;
      color: #D64074;
    }

    /* Close X when open */
    #oppty-bubble .oppty-close-icon {
      display: none;
      width: 24px;
      height: 24px;
      color: #fff;
    }

    #oppty-widget.open #oppty-bubble .oppty-close-icon { display: block; }
    #oppty-widget.open #oppty-bubble img,
    #oppty-widget.open #oppty-bubble .oppty-icon-fallback { display: none; }
    #oppty-widget.open #oppty-bubble { background: #D64074; border-color: #D64074; }
    #oppty-widget.open #oppty-bubble.has-pulse { animation: none; }

    /* --- Chat Panel --- */
    #oppty-panel {
      position: fixed;
      bottom: 104px;
      ${cfg.position}: 24px;
      z-index: 99998;
      width: 400px;
      max-width: calc(100vw - 48px);
      height: 560px;
      max-height: calc(100vh - 140px);
      background: #fff;
      border: 1px solid rgba(0,0,0,0.13);
      border-radius: 0;
      box-shadow: 0 12px 48px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(12px) scale(0.96);
      transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
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
      gap: 12px;
      padding: 16px 20px;
      background: #1a1918;
      color: #fff;
      flex-shrink: 0;
    }

    #oppty-header-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #2a2928;
      border: 2px solid #D64074;
      overflow: hidden;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #oppty-header-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    #oppty-header-info h3 {
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: -0.02em;
      color: #fff;
    }

    #oppty-header-info span {
      font-size: 12px;
      color: rgba(255,255,255,0.5);
      font-family: 'Chivo Mono', 'Space Mono', monospace;
    }

    /* --- Messages Area --- */
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
      line-height: 1.6;
      animation: oppty-msg-in 0.25s ease-out;
    }

    @keyframes oppty-msg-in {
      from { opacity: 0; transform: translateY(8px); }
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
      border-radius: 0;
    }
    .oppty-msg.bot ul, .oppty-msg.bot ol {
      padding-left: 20px;
      margin: 8px 0;
    }
    .oppty-msg.bot li { margin-bottom: 4px; }

    /* Greeting message */
    .oppty-msg.greeting {
      background: linear-gradient(135deg, #FFFFFF 0%, rgba(214,64,116,0.06) 100%);
      border: 1px solid rgba(214,64,116,0.25);
    }

    .oppty-msg.greeting .greeting-title {
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      font-weight: 400;
      font-size: 15px;
      color: #D64074;
      margin-bottom: 6px;
    }

    /* Thinking dots */
    .oppty-thinking {
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 14px 20px;
      background: #fff;
      border: 1px solid rgba(0,0,0,0.07);
      border-radius: 0;
      border-bottom-left-radius: 4px;
      animation: oppty-msg-in 0.2s ease-out;
    }

    .oppty-thinking .dot {
      width: 6px;
      height: 6px;
      background: #909090;
      border-radius: 50%;
      animation: oppty-bounce 1.2s infinite;
    }

    .oppty-thinking .dot:nth-child(2) { animation-delay: 0.15s; }
    .oppty-thinking .dot:nth-child(3) { animation-delay: 0.3s; }

    @keyframes oppty-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }

    /* --- Suggested Prompts --- */
    .oppty-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }

    .oppty-suggestion {
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      color: #D64074;
      background: rgba(214,64,116,0.06);
      border: 1px solid rgba(214,64,116,0.25);
      border-radius: 20px;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
      white-space: nowrap;
    }

    .oppty-suggestion:hover {
      background: #D64074;
      color: #fff;
      border-color: #D64074;
    }

    /* --- Input Area --- */
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
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 14px;
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      color: #1a1918;
      resize: none;
      max-height: 100px;
      min-height: 40px;
      line-height: 1.4;
      outline: none;
      transition: border-color 0.15s;
      background: #F4F4F2;
    }

    #oppty-input:focus {
      border-color: #D64074;
      background: #fff;
    }

    #oppty-input::placeholder {
      color: #909090;
    }

    #oppty-send {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 10px;
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
    #oppty-send:active { transform: scale(0.95); }
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

    #oppty-footer a { color: #D64074; font-weight: 500; }

    /* --- Mobile --- */
    @media (max-width: 480px) {
      #oppty-panel {
        bottom: 0;
        ${cfg.position}: 0;
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
        border: none;
      }

      #oppty-bubble {
        bottom: 16px;
        ${cfg.position}: 16px;
        width: 56px;
        height: 56px;
      }

      #oppty-widget.open #oppty-bubble { display: none; }
    }
  `;
  document.head.appendChild(style);

  // --- BUILD DOM ---
  const widget = document.createElement('div');
  widget.id = 'oppty-widget';

  widget.innerHTML = `
    <div id="oppty-panel">
      <div id="oppty-header">
        <div id="oppty-header-avatar">
          <img src="${cfg.avatar}" alt="Oppty" onerror="this.parentElement.innerHTML='🦆'">
        </div>
        <div id="oppty-header-info">
          <h3>Oppty</h3>
          <span>Governed Revenue Advisor</span>
        </div>
      </div>
      <div id="oppty-messages"></div>
      <div id="oppty-input-area">
        <textarea id="oppty-input" placeholder="Ask about pipeline, metrics, GTM…" rows="1"></textarea>
        <button id="oppty-send" aria-label="Send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <div id="oppty-footer">Powered by <a href="/opptycon/">OpptyCon</a> · NetherOps</div>
    </div>
    <div id="oppty-bubble" class="has-pulse">
      <img src="${cfg.avatar}" alt="Oppty" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
      <svg class="oppty-icon-fallback" style="display:none" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      <svg class="oppty-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </div>
  `;
  document.body.appendChild(widget);

  // --- STATE ---
  const messages = []; // { role: 'user'|'assistant', content: string }
  let isLoading = false;

  // --- REFS ---
  const bubble = document.getElementById('oppty-bubble');
  const panel = document.getElementById('oppty-panel');
  const msgContainer = document.getElementById('oppty-messages');
  const input = document.getElementById('oppty-input');
  const sendBtn = document.getElementById('oppty-send');

  // --- GREETING ---
  function showGreeting() {
    const suggestions = [
      'What is pipeline coverage?',
      'Explain the Rule of 60',
      'How do I fix a broken funnel?',
      'What metrics matter for a board deck?',
    ];

    const greetingHTML = `
      <div class="oppty-msg bot greeting">
        <div class="greeting-title">🦆 Quack. I mean — greetings.</div>
        <p>${cfg.greeting}</p>
        <div class="oppty-suggestions">
          ${suggestions.map((s) => `<button class="oppty-suggestion">${s}</button>`).join('')}
        </div>
      </div>
    `;
    msgContainer.innerHTML = greetingHTML;

    // Suggestion click handlers
    msgContainer.querySelectorAll('.oppty-suggestion').forEach((btn) => {
      btn.addEventListener('click', () => {
        input.value = btn.textContent;
        sendMessage();
      });
    });
  }

  showGreeting();

  // --- TOGGLE ---
  bubble.addEventListener('click', () => {
    widget.classList.toggle('open');
    if (widget.classList.contains('open')) {
      bubble.classList.remove('has-pulse');
      setTimeout(() => input.focus(), 300);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('open')) {
      widget.classList.remove('open');
    }
  });

  // --- RENDER MESSAGE ---
  function renderMessage(role, content) {
    const div = document.createElement('div');
    div.className = `oppty-msg ${role === 'user' ? 'user' : 'bot'}`;

    if (role === 'assistant') {
      div.innerHTML = markdownToHTML(content);
    } else {
      div.textContent = content;
    }

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
    requestAnimationFrame(() => {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    });
  }

  // --- MARKDOWN (minimal) ---
  function markdownToHTML(text) {
    return text
      // Code blocks
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Unordered lists
      .replace(/^[\s]*[-•]\s+(.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
      // Numbered lists
      .replace(/^[\s]*\d+\.\s+(.+)$/gm, '<li>$1</li>')
      // Paragraphs
      .split('\n\n')
      .map((p) => {
        p = p.trim();
        if (!p) return '';
        if (p.startsWith('<ul>') || p.startsWith('<ol>') || p.startsWith('<li>')) return p;
        return `<p>${p.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');
  }

  // --- SEND MESSAGE ---
  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isLoading) return;

    // Clear suggestions on first message
    const suggestions = msgContainer.querySelector('.oppty-suggestions');
    if (suggestions) suggestions.remove();

    // Add user message
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
        body: JSON.stringify({
          messages: messages,
          siteUrl: window.location.origin,
        }),
      });

      hideThinking();

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || 'I seem to have lost my train of thought. Try again?';

      messages.push({ role: 'assistant', content: reply });
      renderMessage('assistant', reply);
    } catch (err) {
      hideThinking();
      console.error('Oppty error:', err);

      const errorMsg =
        err.message === 'API key not configured'
          ? 'My knowledge connection isn\'t configured yet. Ask your administrator to set the ANTHROPIC_API_KEY environment variable in Netlify.'
          : 'Something went sideways. Even a samurai duck has off moments. Try again in a second.';

      renderMessage('assistant', errorMsg);
    }

    isLoading = false;
    sendBtn.disabled = false;
    input.focus();
  }

  // --- INPUT HANDLERS ---
  sendBtn.addEventListener('click', sendMessage);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  function autoResize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  }
  input.addEventListener('input', autoResize);
})();
