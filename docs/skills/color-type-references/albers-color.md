# Albers — Interaction of Color (Web Translation)
Source: Josef Albers, Interaction of Color (1963), filtered for screen/UX

## Core Principle
Color is the most relative medium. The same color looks different depending entirely on context.
Never design a color in isolation. Always design the relationship.

## The Seven Interaction Effects (Web-Relevant)

### 1. Simultaneous Contrast
Adjacent colors push each other toward their complements.
- Grey next to orange → reads as blue-grey
- Grey next to blue → reads as orange-grey
**UI application**: Border colors, dividers, and neutral elements will shift depending on adjacent content colors. Always test in context, not in isolation.

### 2. Successive Contrast (Afterimage)
Looking at a saturated color then shifting to a neutral surface — the complement appears.
**UI application**: Navigation flows, modal transitions, onboarding sequences. If you shift from a highly saturated screen to a neutral one, users will briefly see the complement. Plan transition colors accordingly.

### 3. Color Quantity / Proportion
The same two colors create completely different effects depending on which dominates.
**UI application**: An accent color at 5% vs. 50% of screen area is not just "less accent" — it's a fundamentally different color experience. The accent at 5% appears more saturated and vibrant than at 50%. Keep accents scarce to maximize their perceptual impact.

### 4. Transparency / Layering
Colors layered with transparency create a new perceived color — not an average of the two.
**UI application**: Overlays, modals, tooltips, focus rings. An orange accent at 15% opacity on a dark surface does not read as light orange — it reads as the specific mixture created by that dark surface + that orange. Test layered colors in context.

### 5. Vibrating / Disturbing Boundaries
Two highly saturated complements placed directly adjacent create visual vibration — the edge appears unstable.
**UI application**: Never place full-saturation red and full-saturation green adjacent. Never full-saturation blue and orange without a neutral separator. This is why warning/danger UI uses muted versions of semantic colors, not pure hues.

### 6. Fluting Effect
A single color moving from light to dark ground appears to change value even without changing hue.
**UI application**: Gradient backgrounds behind text must be tested at multiple points along the gradient for contrast — the text appears to lighten or darken as the background shifts.

### 7. Film Color vs. Surface Color
The same hue appears different when it looks like a light source (film) vs. an opaque surface.
**UI application**: Glows, halos, and luminous UI effects create film color perception — they appear more saturated and lighter than the same hex on a matte surface. Used in glass morphism, neon effects, active state glows.

## Practical Checklist (Run Before Finalizing Any Color Decision)
- [ ] Tested this color on every background surface in the system?
- [ ] Tested at every UI state (default/hover/active/disabled)?
- [ ] Checked WCAG contrast ratios in context (not just on white)?
- [ ] Tested transparency/opacity variants in actual layering context?
- [ ] No saturated complements placed directly adjacent without a neutral separator?
- [ ] Gradient backgrounds tested for contrast at every point along the gradient?
