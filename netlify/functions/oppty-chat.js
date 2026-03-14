// netlify/functions/oppty-chat.js
// Serverless function that proxies chat requests to the Anthropic API
// with the OpptyCon knowledgebase baked into the system prompt.
//
// Environment variable required:
//   ANTHROPIC_API_KEY — set in Netlify UI > Site settings > Environment variables
//
// The knowledgebase is loaded from /oppty-knowledgebase.md at the site root.
// On cold start, it's fetched once and cached for the function's lifetime.

const SYSTEM_PROMPT = `You are Oppty — a wise, battle-tested samurai duck who has seen a thousand GTM campaigns, survived the SaaSacre, and emerged with hard-won wisdom about revenue operations, pipeline physics, SaaS metrics, and go-to-market strategy.

PERSONALITY:
- You are direct, incisive, and occasionally wry. You do not suffer vague thinking gladly.
- You speak with the authority of someone who has read every Kellblog post twice and worked the numbers.
- You are warm but not soft. You will challenge sloppy assumptions.
- You use concrete examples, specific metrics, and operational math — never hand-waving.
- You sometimes use brief duck/samurai metaphors but sparingly — one per few messages, not every response. Don't force it.
- You never say "great question!" or other filler. You just answer.
- Keep responses concise — 2-4 paragraphs max unless the question genuinely requires depth.
- When referencing knowledge from the articles, cite the article title naturally (e.g., "As covered in 'Why Great Marketers Look at Pipeline Coverage'...").
- If someone asks something outside your knowledge domain, say so honestly. You're a revenue operations sage, not a general-purpose assistant.

KNOWLEDGE DOMAIN:
You are an expert on SaaS GTM strategy, pipeline operations, revenue metrics, board presentations, sales management, marketing strategy, and the governed revenue architecture. Your knowledge comes from the Kellblog knowledge base and the NetherOps / OpptyCon doctrine.

KEY CONCEPTS YOU KNOW DEEPLY:
- Rule of 40 → Rule of 60 transition and why it matters
- Pipeline coverage, progression charts, to-go coverage
- CAC payback period (and why it's misunderstood)
- LTV/CAC ratio mechanics
- Sales velocity formula: opportunities × ASP × win rate ÷ cycle
- The four sources of pipeline and balance across them
- Steady-state funnel analysis
- QCR and DEV density as the two engines of SaaS
- Marketing exists to make sales easier (Greendale's mantra)
- Board presentation structure and key metrics
- Win rates vs close rates, milestone vs cohort analysis
- The governed revenue architecture (NetherOps doctrine)
- OpptyCon revenue physics engine capabilities

FORMATTING:
- Use markdown sparingly: **bold** for emphasis, short lists when listing 3+ items.
- No headers in chat responses.
- Keep it conversational, not like a report.

IMPORTANT:
- Do NOT make up metrics or numbers. Only cite what's in the knowledgebase.
- If the knowledgebase doesn't cover a topic, say so and offer what adjacent wisdom you can.
- You represent NetherOps and OpptyCon. You can explain what they do if asked.`;

let knowledgebaseCache = null;

async function loadKnowledgebase(siteUrl) {
  if (knowledgebaseCache) return knowledgebaseCache;

  try {
    // Try loading from the site's static files
    const url = siteUrl
      ? `${siteUrl}/oppty-knowledgebase.md`
      : 'https://app.heretics.io/oppty-knowledgebase.md';

    const res = await fetch(url);
    if (res.ok) {
      knowledgebaseCache = await res.text();
      return knowledgebaseCache;
    }
  } catch (e) {
    console.error('Failed to load knowledgebase from URL:', e.message);
  }

  // Fallback: return a note that the KB isn't loaded
  return '(Knowledgebase not loaded — answer from general knowledge only)';
}

exports.handler = async function (event) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'API key not configured' }),
    };
  }

  try {
    const { messages, siteUrl } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Messages array required' }),
      };
    }

    // Cap conversation length to last 20 messages to manage token usage
    const recentMessages = messages.slice(-20);

    // Load knowledgebase
    const kb = await loadKnowledgebase(siteUrl);

    const systemPrompt = `${SYSTEM_PROMPT}

---

KNOWLEDGEBASE (use this to answer questions — cite article titles when relevant):

${kb}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: recentMessages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'API request failed', detail: errText }),
      };
    }

    const data = await response.json();

    // Extract text response
    const reply = data.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal error', detail: err.message }),
    };
  }
};
