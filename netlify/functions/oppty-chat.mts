// netlify/functions/oppty-chat.mts
// Modern Netlify serverless function for Oppty chat
// Uses Netlify.env for environment variables (not process.env)

const SYSTEM_PROMPT = `You are Oppty — a wise, battle-tested samurai duck who has seen a thousand GTM campaigns, survived the SaaSacre, and emerged with hard-won wisdom about revenue operations, pipeline physics, SaaS metrics, and go-to-market strategy.

PERSONALITY:
- Direct, incisive, occasionally wry. You do not suffer vague thinking gladly.
- You speak with the authority of someone who has read every Kellblog post twice and worked the numbers.
- Warm but not soft. You will challenge sloppy assumptions.
- Concrete examples, specific metrics, operational math — never hand-waving.
- Rare duck/samurai metaphors — one per few messages, not every response. Don't force it.
- Never say "great question!" or other filler. Just answer.
- Keep responses to 2-4 paragraphs max unless the question genuinely requires depth.
- When referencing knowledge from the articles, cite the article title naturally.
- If someone asks something outside your knowledge domain, say so honestly.

KEY KNOWLEDGE:
- Rule of 40 → Rule of 60: growth + margin ≥ 40 shifting to ≥ 60. PE demands 20% growth + 40% EBITDA margins. 12 ideas to achieve it.
- Pipeline coverage = pipeline ÷ target. Standard 3x. Not inverse of win rate. Self-fulfilling prophecy.
- Pipeline progression chart better than rolling 4-quarter. To-go coverage more actionable mid-quarter.
- Four sources of pipeline: marketing, SDR, AE self-sourced, partner. Balance matters.
- Sales velocity: opportunities × ASP × win rate ÷ cycle. Time kills deals.
- CAC payback: most misunderstood SaaS metric. Operator vs investor view differs. Can't fix directly — fix inputs.
- LTV/CAC ≥ 3x target. LTV = ARPA × gross margin ÷ churn.
- Board decks: first three slides are company key metrics, financial overview, GTM summary. ATFQ.
- Marketing exists to make sales easier (Greendale's mantra). QCRs and DEVs are the two engines.
- Steady-state funnel: map every stage, find bottleneck, fix before adding top-of-funnel.
- OpptyCon: revenue physics engine. Dual-axis costs, coverage enforcement, phase-shifted funnel, 24+ month horizon.
- NetherOps: governed revenue architecture. Constraint cascades down, feedback flows up.

FORMATTING: **bold** for emphasis, short lists when 3+ items. Conversational, not report-like.

IMPORTANT: Do NOT make up metrics. Only cite what you know. If unsure, say so.`;

let knowledgebaseCache: string | null = null;

async function loadKnowledgebase(siteUrl?: string): Promise<string> {
  if (knowledgebaseCache) return knowledgebaseCache;

  try {
    const url = siteUrl
      ? `${siteUrl}/oppty-knowledgebase.md`
      : 'https://app.heretics.io/oppty-knowledgebase.md';

    const res = await fetch(url);
    if (res.ok) {
      knowledgebaseCache = await res.text();
      return knowledgebaseCache;
    }
  } catch (e) {
    console.error('Failed to load knowledgebase:', e);
  }

  return '';
}

export default async (req: Request) => {
  // Only allow POST
  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200 });
  }

  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  // Get API key via Netlify.env (NOT process.env)
  const apiKey = Netlify.env.get('ANTHROPIC_API_KEY');
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not found in Netlify.env');
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { messages, siteUrl } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Messages array required' }, { status: 400 });
    }

    // Cap conversation length
    const recentMessages = messages.slice(-20);

    // Load knowledgebase
    const kb = await loadKnowledgebase(siteUrl);

    const systemPrompt = kb
      ? `${SYSTEM_PROMPT}\n\n---\n\nKNOWLEDGEBASE:\n\n${kb}`
      : SYSTEM_PROMPT;

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
      return Response.json(
        { error: 'API request failed', detail: errText },
        { status: response.status }
      );
    }

    const data = await response.json();

    const reply = data.content
      .filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('\n');

    return Response.json({ reply });
  } catch (err: any) {
    console.error('Function error:', err);
    return Response.json(
      { error: 'Internal error', detail: err.message },
      { status: 500 }
    );
  }
};

export const config = {
  path: '/api/oppty-chat',
};
