---
name: narrative-ux
description: "Transform any narrative — positioning doc, raw idea, pitch, messaging brief, or verbal description — into a complete web experience. Applies Ogilvy persuasion principles (The Big Idea, benefit-led copy, headline primacy) to UX flow logic (information architecture, progressive disclosure, friction reduction) to produce UX flow maps, wireframe-level section specs, copy briefs, and full HTML/React implementation. This skill is the FIRST skill to activate whenever the user wants to build a landing page, marketing site, or any narrative-driven web experience. It hands off to atomic-design-system for tokens/components and frontend-design for visual execution. Use for BigFilter, heretics.io, Governed Revenue Architecture, or any project where a story needs to become a page. Activate when the user says things like build a page for, turn this into a landing page, make a site for, or shares positioning and wants it made real."
---

# Narrative UX Skill
## Ogilvy Persuasion × Atomic UX × Design System Execution

---

## The Stack

This skill is **Stage 1** of a three-skill pipeline. Understand the full flow before starting:

```
[narrative-ux]  ←  YOU ARE HERE
  Extract Big Idea
  Map persuasion arc
  Define UX flow
  Write section copy briefs
        ↓
[atomic-design-system]
  Select aesthetic profile
  Define design tokens
  Map sections → atomic components
        ↓
[frontend-design]
  Execute with visual polish
  Add motion, atmosphere, micro-interactions
        ↓
  SHIPPED PAGE
```

**Always complete Stage 1 fully before handing to Stage 2.** The narrative structure must be locked before aesthetic decisions are made — otherwise design masks a weak story.

---

## Stage 1A: Narrative Intake

Accept input in any form. Figure out what you have:

| Input type | How to handle |
|---|---|
| Raw positioning/messaging doc | Extract directly |
| Verbal description | Run the interview (below) |
| Existing deck or document | Fetch/read it, extract narrative |
| URL to existing page | Fetch, reverse-engineer the story |
| "Just a vibe" / product name only | Run full interview |

### Narrative Interview (use when input is thin)

Ask these — not all at once, work conversationally:

1. **The customer**: Who is this page for? What is their job title, and what keeps them up at night?
2. **The moment**: What triggered them to look for a solution like this? What just happened in their world?
3. **The claim**: If this page could say only ONE thing, what would it be? (Push for a complete sentence, not a tagline.)
4. **The proof**: What is the single most credible fact, number, or proof point you have?
5. **The enemy**: What are they currently doing instead, and why is that wrong/painful?
6. **The ask**: What do you want them to do when they hit the bottom of the page?

---

## Stage 1B: Extract The Big Idea

Ogilvy: *"Unless your advertising contains a Big Idea, it will pass like a ship in the night."*

The Big Idea is NOT:
- A tagline
- A feature description
- A category claim ("the leading platform for...")
- A value proposition statement

The Big Idea IS:
- A single, memorable, benefit-soaked claim that reframes how the prospect sees their problem or the solution
- Specific enough to be owned, broad enough to anchor the whole page
- Something a competitor could not truthfully say

**Big Idea extraction process:**
1. List every benefit the product delivers (not features — benefits)
2. Identify which benefit is most *urgent* to the target buyer right now
3. Find the most *surprising* or *counterintuitive* way to express that benefit
4. Test it: "Can a competitor say this?" → If yes, make it more specific
5. Test it: "Does this promise something the buyer actually wants?" → If no, go back to benefits

**Output**: One sentence. The Big Idea. Everything else on the page serves this.

---

## Stage 1C: Map the Persuasion Arc

Ogilvy's hierarchy applied to web UX. Every section has a job in the persuasion sequence:

```
ATTENTION    →   INTEREST    →   DESIRE    →   ACTION
(Hero)           (Problem/      (Proof/        (CTA)
                  Stakes)        Solution)
```

### The 7-Section Persuasion Architecture

Map the narrative to these sections. Not every page needs all seven — cut ruthlessly.

#### 1. HERO — The Promise
**Job**: Stop the scroll. Deliver the Big Idea immediately.
**Ogilvy rule**: 5× more people read headlines than body copy. The hero headline IS the ad.
**Elements**:
- Headline: The Big Idea, stated as a direct benefit or provocative claim. No puns. No cleverness for its own sake.
- Subhead: Expand the promise with one specific, factual sentence. Who it's for + what it does.
- Primary CTA: One action only. Verb-led. ("See how it works" > "Learn more")
- Supporting visual: Shows the product in context, or the customer's transformed state

**Copy brief format**:
```
HERO
Headline: [Big Idea, ≤10 words]
Subhead: [For [persona] who [pain], [product] [specific benefit]. ≤25 words]
CTA: [Verb + outcome]
Visual direction: [What should the image/illustration communicate]
```

#### 2. PROBLEM — The Enemy
**Job**: Name the pain so precisely the prospect feels seen.
**Ogilvy rule**: "Every headline should appeal to the reader's self-interest or contain news."
**Elements**:
- Agitate the current state (what they're living with today)
- Name the enemy (the old approach, the incumbent solution, the status quo)
- Raise the stakes (what it costs them to stay where they are)
- Do NOT introduce the solution yet — tension must build

**Copy brief format**:
```
PROBLEM
Opening line: [Name the pain in the prospect's own language]
Stakes: [What this costs them — time, money, risk, reputation]
Enemy: [What they're currently doing that isn't working]
Transition: [One sentence that opens the door to a different way]
```

#### 3. SOLUTION — The Reframe
**Job**: Introduce the product as the logical answer to the named problem. Not a feature dump — a perspective shift.
**Ogilvy rule**: "Promise the consumer a benefit. Make your promise specific."
**Elements**:
- Lead with the transformation, not the product
- One primary benefit, clearly stated
- 2–3 supporting benefits (use "so that" structure: feature → benefit → outcome)
- Product name appears prominently here for the first time if not in hero

**Copy brief format**:
```
SOLUTION
Reframe line: [The new way of thinking about this problem]
Primary benefit: [The one thing]
Supporting benefits (max 3):
  - [Feature] so that [benefit] which means [outcome for them]
  - [Feature] so that [benefit] which means [outcome for them]
  - [Feature] so that [benefit] which means [outcome for them]
```

#### 4. PROOF — Credibility Architecture
**Job**: Earn the right to the claims made above.
**Ogilvy rule**: "Make your promise specific. Use percentages, time elapsed, dollars saved."
**Proof types (use in order of credibility)**:
1. Specific metrics ("Detects social engineering attempts 4× faster than rule-based systems")
2. Customer testimonials (named, titled, from recognizable companies)
3. Customer logos (brand recognition transfer)
4. Case study summaries (before/after with numbers)
5. Awards, certifications, analyst recognition
6. Press mentions

**Avoid**: Vague claims ("industry-leading", "best-in-class"), anonymous testimonials, generic satisfaction quotes.

#### 5. HOW IT WORKS — Mechanism
**Job**: Reduce anxiety about complexity. Show the path from today to outcome.
**Elements**:
- 3-step process (compress even complex products into 3 steps)
- Each step: what the user does + what the product does + what changes
- Visualize the journey, not just the product

#### 6. OBJECTION HANDLING — The Preempt
**Job**: Address the top 2–3 reasons a qualified prospect wouldn't buy.
**Format**: FAQ, feature comparison, "But what about..." section, or integrated into proof section.
**Common objections to anticipate**:
- "Is this for companies our size?"
- "How long does it take to implement?"
- "What about [incumbent/competitor]?"
- "Is our data secure?"

#### 7. CTA — The Ask
**Job**: Make the next step obvious, low-friction, and benefit-stated.
**Ogilvy rule**: "Tell the reader what to do."
**Elements**:
- Re-state the Big Idea in compressed form (headline)
- One CTA, verb-led, outcome-oriented
- Remove anxiety: note what happens after clicking (no credit card, 5-min setup, etc.)
- Optional: secondary CTA for lower-commitment path ("Watch demo" vs. "Start free trial")

---

## Stage 1D: UX Flow Map

After mapping the persuasion arc, define the UX behavior:

### Scroll Depth Planning
```
0–20%   ATTENTION ZONE    Hero + immediate value signal
        → If they leave here: headline failed
        
20–50%  INTEREST ZONE     Problem + Solution
        → If they leave here: Big Idea not relevant to their pain
        
50–75%  DESIRE ZONE       Proof + How it works
        → If they leave here: credibility gap or complexity fear
        
75–90%  CONVERSION ZONE   Objection handling + first CTA
        → If they leave here: friction in the ask
        
90–100% EXIT INTENT ZONE  Final CTA + social proof repeat
        → Last chance
```

### Interaction Decisions
For each section, specify:
- **Entry behavior**: Does this section animate in? Fade? Slide?
- **Sticky elements**: What stays visible as they scroll? (Nav CTA, progress indicator)
- **Expandable content**: What is hidden behind clicks? (FAQ accordions, testimonial carousels)
- **Mobile priority**: What gets cut or collapsed on mobile?

---

## Stage 1E: Section Specs Output

Deliver a complete **Page Brief** before handing to atomic-design-system. Format:

```markdown
# Page Brief: [Project Name]

## Big Idea
[One sentence]

## Target Persona
[Who + their moment of pain]

## Desired Action
[What we want them to do]

## Sections

### Section 1: Hero
Type: hero-full-bleed / hero-split / hero-centered
Headline: [text]
Subhead: [text]
CTA: [text + destination]
Visual: [description]
Notes: [anything unusual about layout or behavior]

### Section 2: Problem
Type: problem-statement / pain-agitation
[copy brief]
Notes:

### Section 3: Solution
...

## Mobile Notes
[What collapses, what reorders, what gets cut]

## Handoff to atomic-design-system
Aesthetic profile: [clean-different / dark-technical / editorial-bold / enterprise-neutral / TBD]
Project: [name — triggers project-specific overrides if registered]
```

---

## Ogilvy Principles Reference Card

Apply these as a checklist before finalizing any copy brief:

| Principle | Test |
|---|---|
| **The Big Idea** | Can I state the entire promise in one memorable sentence? |
| **Headline primacy** | If someone reads ONLY the headline, do they know the benefit? |
| **Benefit-led** | Every claim answers "so what does that mean for me?" |
| **Specificity over puffery** | Replace "industry-leading" with a number or proof |
| **No tricks** | No puns, no double meanings, no cleverness that obscures the promise |
| **One claim** | The page doesn't try to say 5 things. It says one thing, thoroughly. |
| **Research foundation** | Copy uses the language the prospect uses, not internal jargon |
| **Respect intelligence** | The prospect is smart. Inform, don't manipulate. |
| **Repeat the benefit** | The Big Idea appears in hero, proof section, and final CTA |

---

## Handoff Protocol

When Stage 1 is complete, explicitly trigger the next skill:

> "Page brief is complete. Handing off to **atomic-design-system** to select aesthetic profile and map sections to components. Project: [name]."

The atomic-design-system skill will:
1. Load the appropriate aesthetic profile (or derive one)
2. Map each section type to organism components
3. Define the token set
4. Hand off to frontend-design for implementation

---

## Project Registry

| Project | Big Idea (draft) | Persona | Aesthetic |
|---|---|---|---|
| BigFilter | TBD — pending narrative intake | CISO / Security team lead | clean-different |
| heretics.io / GRA | Governed Revenue Architecture: constraint before autonomy | VP Sales / RevOps / CEO | dark-technical |

---

## Reference Files
- `references/ogilvy-principles.md` — Full Ogilvy principle set with examples
- `references/ux-patterns.md` — UX flow patterns, scroll depth research, mobile-first rules
