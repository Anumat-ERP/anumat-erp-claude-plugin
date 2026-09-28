---
name: design-stack
description: Use when designing or building any screen, page, form, dashboard, data table, admin panel, or app flow, and when restructuring existing UI — supplies canonical screen structure from shipped products, selects the right design system for the domain, and requires every interface state to be handled. Not for pure styling tweaks or post-build polish.
---

# Design Stack

Generated UI reads as generated for three reasons, and only one of them is
about looks. It **invents** a screen instead of recalling how shipped products
already structure that screen. It applies one visual language to every domain,
whether the user is a financial analyst or a video editor. And it builds the
happy path only — no empty state, no failure, no permission boundary.

This skill fixes the first and the third. Structure gets recalled from
evidence, and the states become a gate you cannot walk past.

## What this skill does not do

| Not this | Whose job |
|---|---|
| Palette, typeface, visual personality, avoiding a templated look | the `frontend-design` skill |
| Craft audit, polish, micro-interaction critique | the `impeccable` plugin |
| Chart type, colour encoding, axis treatment | the `dataviz` skill |

When `frontend-design` is loaded too, **it wins on every question of
appearance**. This skill constrains structure, content order, and states —
nothing about how any of it looks.

## The pipeline

```
BRIEF     → who, what problem, what is out of scope, what success looks like
INVENTORY → what does this project already have? Storybook, components, tokens
EVIDENCE  → read patterns/<screen-type>.md; structure is recalled, not invented
SYSTEM    → pick one design system and name why
STATES    → all six enumerated; this is a gate, not advice
BUILD     → hand appearance to frontend-design; structure comes from above
REVIEW    → reference/10-design-review.md
```

**BRIEF.** Four questions: who is this for, what problem does it solve, what is
explicitly out of scope, and what observable change means it worked. For
anything larger than a single component, run `/design-stack:brief` rather than
improvising the answers.

**INVENTORY.** Check what the project already has before importing anything.
Look for `.storybook/`, `*.stories.*`, a `storybook` script in `package.json`,
an existing component directory, or a token file. If a Storybook exists, read
its component tree: that is the available inventory and the real prop surface.
A component that exists gets reused, not rebuilt. The house system outranks
every external reference in this plugin — an imported convention that
contradicts it is worse than no convention. Procedure in
`systems/STORYBOOKS.md`.

**EVIDENCE.** Read the matching playbook in `patterns/` *before* proposing
structure. If no playbook matches, say so out loud, name the nearest structural
analogue, and use that — never invent silently, because silent invention is
indistinguishable from knowledge in the output.

**SYSTEM.** Pick exactly one from `systems/CHOOSING.md` and give one sentence
of justification. You are borrowing conventions — interaction patterns,
terminology, component behaviour — not visual identity.

**STATES.** The gate. See below.

**BUILD.** Structure from the stages above; appearance from `frontend-design`.

**REVIEW.** Run `reference/10-design-review.md`, or `/design-stack:review`.

## The states gate

Every screen answers all six, in this order:

```
empty · loading · error · permission · overflow · offline
```

**A screen is not designed until all six are answered.** "Not applicable" is a
valid answer only with a stated reason.

This is the gate because shipping only the happy path is the single largest
gap between generated UI and shipped UI. The happy path is the easy 20% of the
work and the part that looks finished in a screenshot; the other five states
are where real users spend their worst minutes. Definitions and sub-cases are
in `patterns/states.md` — note that "empty" alone has three distinct forms that
need three different messages.

## Reference index

| Read this when | File |
|---|---|
| Setting up spacing, radius, elevation, density, or tokens | `reference/01-foundations.md` |
| Choosing a grid, breakpoints, or an app shell | `reference/02-layout.md` |
| Building a type scale or handling numbers and overflow | `reference/03-typography.md` |
| Building or composing any interactive component | `reference/04-components.md` |
| Any form: fields, validation, errors, saving | `reference/05-forms.md` |
| Laying out metrics, KPIs, or analytics | `reference/06-dashboard.md` |
| Designing for touch, small screens, or native mobile | `reference/07-mobile.md` |
| Adding transitions, loading choreography, or animation | `reference/08-motion.md` |
| Always, before calling anything done | `reference/09-accessibility.md` |
| Auditing finished UI | `reference/10-design-review.md` |
| Looking for an external reference to study | `reference/sources.md` |

## When not to use this skill

Skip it for a styling tweak to an existing component, a copy change, or a bug
fix that does not alter structure. Loading the full pipeline to round a corner
wastes the context the actual work needs.

The test: **does this change what the screen contains, or only how it looks?**
Contents, order, or states — this skill. Appearance only — `frontend-design`.
