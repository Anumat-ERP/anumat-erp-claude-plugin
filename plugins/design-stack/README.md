# design-stack

Generated UI reads as generated for three reasons, and only one of them is
about looks. It **invents** a screen instead of recalling how shipped products
already structure that screen. It applies one visual language whether the user
is a financial analyst or a video editor. And it builds the happy path only.

This plugin fixes the first and the third: structure gets recalled from
evidence, and the six interface states become a gate rather than advice.

## Where it sits

Three plugins, three questions, no overlap.

| Plugin | Question | Phase |
|---|---|---|
| **design-stack** | What must this screen contain, in what order, in what states, following whose conventions? | Before building |
| `frontend-design` | What should it look like, and how do I avoid looking templated? | While building |
| `impeccable` | Is the built result up to craft standard? | After building |

Where the boundary is close, design-stack defers by name. The `aesthetics`
validator check backs that up by failing the build on a list of appearance
terms across every skill and command file — a tripwire for the obvious cases,
not a proof. Prose that gives visual direction without using a listed word will
pass, so the boundary still depends on the writing.

## The pipeline

```
BRIEF     → who, what problem, what is out of scope, what success looks like
INVENTORY → what does this project already have? Storybook, components, tokens
EVIDENCE  → read the playbook; structure is recalled, not invented
SYSTEM    → pick one design system and name why
STATES    → all six enumerated; this is a gate, not advice
BUILD     → hand appearance to frontend-design; structure comes from above
REVIEW    → the design review checklist
```

**INVENTORY comes before EVIDENCE deliberately.** If the project has its own
Storybook or component library, that outranks every external reference here. An
imported convention that contradicts the house system is worse than none.

## The six states

```
empty · loading · error · permission · overflow · offline
```

A screen is not designed until all six are answered. "Not applicable" is valid
only with a stated reason.

This is the gate because shipping only the happy path is the largest gap
between generated UI and shipped UI — it is 20% of the work and 100% of what
looks finished in a screenshot. `empty` alone has three distinct forms needing
three different messages, and collapsing them is the most common state failure
in shipped software.

## What ships

**2 skills, 30 content files, 4 commands.**

- `design-stack` — the pipeline, plus 11 reference files: foundations, layout,
  typography, components, forms, dashboard, mobile, motion, accessibility, the
  review checklist, and the source stack.
- `design-evidence` — 10 screen playbooks (states, settings, onboarding, auth,
  data table, dashboard, navigation, search and filtering, billing, desktop
  tools) and 10 system files (8 design-system profiles, a chooser, and the
  Storybook guide).

## Commands

| Command | Does |
|---|---|
| `/design-stack:brief <feature>` | Strategy and UX architecture before any pixels: problem, user, out of scope, success measure, inventory, IA, task flow with both paths, and the six-state matrix. Writes no code. |
| `/design-stack:research <screen type>` | Canonical structure, variant, design system, existing components, the six states, and known failure modes. Read-only. |
| `/design-stack:review [target]` | Audits UI against the checklist. Findings ordered by severity, blocking first, each naming file, line, rule, and source. |
| `/design-stack:sources` | The curated source stack, split by what Claude can fetch and what only a human can browse. |

## On sources

The plugin distinguishes two kinds of reference, and the distinction is load-bearing.

**Agent-fetchable** — Apple HIG, Material, Fluent, Carbon, Polaris, Primer,
Atlassian, GOV.UK, the public Storybooks, WAI-ARIA APG, shadcn, Radix. Claude
reads these on demand.

**Human-only** — Mobbin, Refero, Page Flows, Dribbble, Awwwards. These are
login-walled, paywalled, or purely visual, and **Claude cannot open them**. A
plugin that pointed Claude at them would be a bookmark file. What they teach is
pre-written into the playbooks instead; the URLs are kept so you know what to
browse and paste screenshots from.

No file in this plugin cites a source it cannot read.

## Extending it

**A new playbook:** add `skills/design-evidence/patterns/<name>.md` following
the six-section shape, and add a row to the routing table in
`skills/design-evidence/SKILL.md`.

**A new system profile:** add `skills/design-evidence/systems/<name>.md`
following the six-section shape, and add a row to `systems/CHOOSING.md`.

Both must be routed from somewhere, or the `orphans` check fails — an
unroutable file is invisible at runtime, which looks exactly like the plugin
working while having nothing to read.

Run `node scripts/validate.mjs` from the repo root before committing.

## Licence

MIT.
