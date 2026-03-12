# Atomic Design Methodology — Reference Summary
Source: https://atomicdesign.bradfrost.com/chapter-2/

## The Five Stages

Atomic design is NOT a linear process — it's a mental model for thinking about interfaces as both a cohesive whole and a collection of parts simultaneously.

### 1. Atoms
- The basic, indivisible building blocks of UI
- HTML elements: buttons, inputs, labels, headings, icons
- Each has unique properties (font size, color, dimensions) that influence broader use
- Cannot be broken down further without losing meaning
- In a pattern library: show all base styles at a glance

### 2. Molecules
- Simple groups of atoms functioning together as a unit
- Example: Label + Input + Button = Search Form molecule
- Key principle: **single responsibility** — do one thing well
- Benefits: easier to test, encourages reuse, promotes consistency
- Molecules give atoms *purpose* (a label defines an input; a button submits a form)

### 3. Organisms
- Relatively complex components composed of molecules and/or atoms
- Form distinct, standalone sections of an interface
- Can consist of similar molecules (product grid) or dissimilar ones (header with logo + nav + search)
- Provide context — show smaller components in action
- Reusable across different pages (header, footer, product grid, data table)

### 4. Templates
- Page-level objects that place components into a layout
- Focus on **content structure**, not final content (use placeholder text/images)
- Articulate important properties: image sizes, character length limits, responsive behavior
- Critical for demonstrating how components work together as a whole
- Language shifts from chemistry metaphor to client-friendly terminology

### 5. Pages
- Specific instances of templates with real, representative content
- Most concrete stage — what users actually see
- Essential for **testing the design system**: does everything hold up with real content?
- Articulates template variations (empty states, long content, user roles, data density)
- Real content influences how underlying patterns must be constructed

## Core Principles

**Part and Whole**: Atomic design allows simultaneous focus on individual components and the overall experience. Like a painter stepping back from the canvas — you need both the close-up stroke and the full-composition view.

**Structure vs. Content**: Clean separation between content skeleton (templates) and real content (pages), while acknowledging they deeply influence each other. "Content needs to be structured and structuring alters your content." — Mark Boulton

**Not Linear**: Don't treat it as Step 1 → Step 5. Design atoms while thinking about how they'll compose into pages. Adjust atoms based on what breaks at the page stage.

**Shared Vocabulary**: Atoms/molecules/organisms gives designers and developers a common language for discussing UI at different levels of abstraction.

## Why It Matters for AI-Assisted Design

When Claude builds UI using atomic design:
- Components are consistent because they share atoms
- Changes to an atom (color, radius, font) propagate correctly
- New pages can be assembled from existing organisms without re-inventing
- The design system is auditable — you can inspect every level
- Edge cases surface at the page stage before they become production bugs
