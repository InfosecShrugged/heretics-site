# UX Patterns Reference — Narrative-Driven Web Experiences

## Scroll Depth Research

Industry benchmarks for landing page scroll behavior:
- ~80% of visitors see above the fold
- ~50% scroll to 50% of the page
- ~25% make it to the bottom
- Implication: front-load the most important content; every section must earn the next scroll

## Progressive Disclosure

Show information in layers — reveal complexity only when the user signals interest:

**Layer 1 (always visible)**: The promise. Who it's for. What it does. One CTA.
**Layer 2 (scroll-triggered)**: The proof. How it works. Key differentiators.
**Layer 3 (user-initiated)**: Details, case studies, technical specs, pricing.

Never force Layer 3 on someone seeking Layer 1.

## Information Architecture for Marketing Pages

### The Inverted Pyramid (Journalism model applied to UX)
Most important → Most contextual → Supporting detail
This mirrors how users scan — they decide to engage before they read.

### The Problem-Solution Arc
1. Mirror the pain (prospect feels seen)
2. Name the enemy (what's causing the pain)
3. Introduce the guide (your product, positioned as the solution)
4. Show the path (how it works)
5. Define success (what life looks like after)
6. Call to action (the first step)

This is the Hero's Journey compressed into a landing page.

## Section Pattern Library

### Hero Patterns
- **Full-bleed centered**: Strong for brand-first, bold typography plays
- **Split (50/50)**: Copy left, visual right — good for product-forward pages
- **Super-minimal**: Just headline + CTA, white space dominant — signals confidence
- **Video background**: High impact, high risk (autoplay issues, accessibility)

### Social Proof Patterns
- **Logo bar**: Fast credibility transfer, early in page (below hero)
- **Metric callouts**: 3–4 specific numbers in a horizontal band
- **Quote + attribution**: Named person, title, company. Photo optional but adds credibility.
- **Case study card**: Before/After/Number format. Links to full case study.

### How-It-Works Patterns
- **3-step horizontal**: Most common, works for simple flows
- **Alternating feature rows**: Visual left/right with copy — for more complex products
- **Timeline/vertical steps**: For sequential processes
- **Interactive demo**: Highest engagement, highest build cost

### CTA Patterns
- **Primary + Secondary**: "Start free trial" (high intent) + "Watch demo" (lower intent)
- **Anchored CTA**: Sticky header CTA visible throughout scroll
- **Exit-intent CTA**: Final section restatement of Big Idea + ask

## Mobile-First Decisions

For every section, answer:
1. What is the *one thing* this section must communicate on mobile?
2. What content can be hidden behind a "read more" or accordion?
3. Does the visual add value or just take vertical space?
4. Is the CTA reachable with one thumb?

Mobile section compression rules:
- Hero: Headline + CTA only (drop subhead if needed)
- Logo bar: 3–4 logos max, scrolling carousel if more
- Feature grid: Stack vertically, cut to top 3
- Testimonials: Single carousel, not grid
- CTA section: Full-width button, minimal copy

## Friction Reduction

Friction is anything that increases cognitive load between interest and action:

**Copy friction**: Jargon, long sentences, passive voice, unclear benefit
**Visual friction**: Cluttered layouts, competing CTAs, unclear hierarchy
**Interaction friction**: Forms with too many fields, required account creation, unclear next steps
**Trust friction**: Missing social proof, vague claims, no privacy assurance

For each CTA, add an anxiety reducer:
- "No credit card required"
- "Set up in 5 minutes"  
- "Cancel anytime"
- "Join 500+ security teams"

## Animation / Motion Guidelines for Narrative Pages

Motion should reinforce the narrative, not decorate it:

**Entrance animations**: Fade-up on scroll for content sections (signals: "this is new information")
**Hero animation**: Subtle — type appearing, not flying. The headline is the hero, not the animation.
**Data/metric animations**: Numbers counting up on scroll-into-view. Adds drama to proof.
**Avoid**: Parallax for its own sake, animations that delay content visibility, motion that distracts from the CTA

Timing: 200–400ms for UI transitions, 600–800ms for section entrances, never over 1s for anything interactive.
