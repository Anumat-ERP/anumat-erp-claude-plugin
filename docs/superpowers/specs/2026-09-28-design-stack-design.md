# design-stack — Design Spec

**Date:** 2026-09-28
**Status:** Approved for planning
**Repo:** `E:\Chamrong\Project\claude-plugins` (marketplace `chamrong`)

---

## 1. Purpose

Give Claude the **research and evidence layer** it lacks when building UI.

Claude produces generic interfaces for three reasons. It *invents* a screen
instead of recalling how shipped products structure that screen. It applies one
visual language regardless of domain. It builds only the happy path. Existing
tooling addresses none of these directly.

`design-stack` supplies canonical screen structure, a design-system choice
appropriate to the domain, and a hard gate on interface states.

### Success criteria

Given `"build a settings page"` with the plugin installed, Claude must:

1. Load the skill without being told to.
2. Read the matching screen playbook before proposing structure.
3. Name the design system it is borrowing conventions from, and why.
4. Enumerate all six interface states.

The same prompt with the plugin disabled produces none of these. That contrast
is the acceptance test.

---

## 2. Non-goals

- **No aesthetic guidance.** Palette, typography personality, and anti-generic
  calibration belong to `frontend-design`. Duplicating them creates conflicting
  instructions in the same context window.
- **No craft audit.** Polish and critique belong to `impeccable`.
- **No project-specific content.** No Fueni, no Spring Modulith, no
  `fueni-api` / `fueni-apps` paths, no one project's tokens. The plugin installs
  globally and must be correct on any codebase.
- **No stack lock-in.** Tailwind, shadcn, and React may appear as *examples*,
  never as requirements. Guidance must hold for Vue, Svelte, SwiftUI, Compose,
  and plain CSS.
- **No live scraping.** No MCP server, no runtime fetching of design galleries.

---

## 3. Positioning

Three plugins, three questions, no overlap:

| Plugin | Question it answers | Phase |
|---|---|---|
| `design-stack` (this) | What must this screen contain, in what order, in what states, following whose conventions? | Before building |
| `frontend-design` | What should it look like, and how do I avoid looking templated? | While building |
| `impeccable` | Is the built result up to craft standard? | After building |

Where guidance risks overlapping, `design-stack` defers explicitly and names the
other plugin. Each skill states this boundary in its own body so the deferral
survives being loaded alone.

---

## 4. Approach

**Distilled playbooks, not a link directory.**

The source material splits into two groups, and conflating them is the trap:

- **Agent-fetchable** — public documentation Claude can read on demand:
  Apple HIG, Material, Fluent, Carbon, Polaris, Primer, Atlassian, GOV.UK,
  Laws of UX, shadcn/ui, Radix, WAI-ARIA APG, and the public Storybooks
  (Fluent UI, Carbon, Primer, Grafana, Adobe Spectrum, Chakra, Elastic EUI).
- **Human-only** — login-walled, paywalled, or purely visual:
  Mobbin, Refero, Page Flows, Dribbble, Awwwards, SaaSFrame.

A skill that points Claude at the second group changes nothing — Claude cannot
open those pages. So what those sources *teach* is pre-written into local
reference files. The URLs themselves live in one file —
`skills/design-stack/reference/sources.md` — labelled by which group they belong
to, so the human knows which to browse and paste screenshots from, and Claude
knows which it may actually fetch.

---

## 5. Repository layout

```
claude-plugins/                          # git repo = the marketplace
├── .claude-plugin/marketplace.json      # lists all plugins
├── README.md                            # install instructions + plugin index
├── LICENSE                              # MIT
├── docs/superpowers/specs/              # design specs
└── plugins/
    └── design-stack/
        ├── .claude-plugin/plugin.json
        ├── README.md
        ├── commands/
        │   ├── brief.md
        │   ├── research.md
        │   ├── review.md
        │   └── sources.md
        └── skills/
            ├── design-stack/
            │   ├── SKILL.md
            │   └── reference/          # 10 numbered files + sources.md
            └── design-evidence/
                ├── SKILL.md
                ├── patterns/           # 10 screen-type playbooks
                └── systems/            # 8 design-system profiles + chooser
```

Adding a second plugin is: create `plugins/<name>/`, append one entry to
`marketplace.json`. No other file moves.

### `marketplace.json`

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "chamrong",
  "owner": { "name": "Chamrong Thor", "email": "thorchamrong.dev@gmail.com" },
  "metadata": { "description": "Personal Claude Code plugins." },
  "plugins": [
    {
      "name": "design-stack",
      "description": "Design research and evidence layer for UI work: canonical screen playbooks, design-system selection, and a hard gate on interface states.",
      "source": "./plugins/design-stack",
      "category": "design",
      "version": "0.1.0",
      "tags": ["design", "ui", "ux", "patterns", "design-systems", "accessibility"]
    }
  ]
}
```

`source` is a repo-relative path string — the form used by locally-sourced
marketplaces. Git-hosted entries use the `git-subdir` object form instead; not
needed until this repo is published.

### `plugin.json`

```json
{
  "name": "design-stack",
  "description": "Design research and evidence layer for UI work: canonical screen playbooks, design-system selection, and a hard gate on interface states.",
  "version": "0.1.0",
  "author": { "name": "Chamrong Thor", "email": "thorchamrong.dev@gmail.com" },
  "skills": "./skills/",
  "commands": "./commands/"
}
```

### Install

```
/plugin marketplace add E:\Chamrong\Project\claude-plugins
/plugin install design-stack@chamrong
```

---

## 6. Skill: `design-stack`

The entry point and pipeline. Must trigger on UI work without being named.

**Frontmatter description** must fire on: building a screen, page, form,
dashboard, table, or admin panel; redesigning existing UI; "design a…",
"build a UI for…", "add a page that…". It must NOT fire on pure styling tweaks
(`frontend-design`'s territory) or post-build audits (`impeccable`'s).

**Body:** under ~150 lines. It states the pipeline, the deferral boundary, and
routes to reference files. Detail lives in `reference/`, read on demand —
the body must never inline what a reference file already holds.

### Pipeline

```
BRIEF     → who, what problem, what is out of scope, what success looks like
INVENTORY → what does this project already have? local Storybook, component
            library, existing tokens. The house system always outranks an
            imported one.
EVIDENCE  → read patterns/<screen-type>.md; structure is recalled, not invented
SYSTEM    → pick one design system and name why
STATES    → all six enumerated; this is a gate, not advice
BUILD     → hand aesthetics to frontend-design; structure comes from above
REVIEW    → 10-design-review.md
```

The INVENTORY stage exists because the most common failure of a design skill is
importing conventions a project has already decided against. A repo with a
Storybook has published its component inventory, its real prop surface, and its
usage rules; reading it costs one directory listing and outranks every external
reference in this plugin.

### Reference files

| File | Contains |
|---|---|
| `01-foundations.md` | Spacing scale, radius hierarchy, elevation/depth, surface layering, density modes, the token vocabulary a system needs. Stack-agnostic; Tailwind shown as one expression. |
| `02-layout.md` | Grid and column systems, responsive breakpoint strategy, app shell archetypes (sidebar / topbar / split / canvas), content width limits, whitespace rhythm. |
| `03-typography.md` | Type scale construction, hierarchy by role not size alone, line length and line height, numeric and tabular figures, truncation and overflow. Defers personality choices to `frontend-design`. |
| `04-components.md` | Anatomy and required parts of the core set: button, input, select, modal, toast, tooltip, tabs, card, badge, menu. Every interactive state: default, hover, active, focus-visible, disabled, loading, error. |
| `05-forms.md` | Field grouping and order, label placement, required vs optional marking, validation timing, inline vs summary errors, destructive confirmation, multi-step and save/autosave patterns. Draws on GOV.UK. |
| `06-dashboard.md` | Metric hierarchy, KPI tile anatomy, chart-vs-table decision, filter and date-range placement, drill-down, refresh and staleness signalling. Defers chart colour and encoding to the `dataviz` skill. |
| `07-mobile.md` | Touch targets, thumb zones, navigation patterns (tab bar vs drawer vs stack), gestures and their discoverability, safe areas, platform divergence between iOS and Android. |
| `08-motion.md` | Duration and easing scales, what earns motion and what does not, enter/exit and shared-element transitions, loading choreography, `prefers-reduced-motion` as a requirement. |
| `09-accessibility.md` | Semantic structure, keyboard path and focus order, focus-visible, contrast thresholds, ARIA only where semantics fall short, screen-reader announcement of async change, form labelling, testing checklist. |
| `10-design-review.md` | The audit run by `/design-stack:review`: states coverage, responsive behaviour, keyboard path, contrast, consistency against the chosen system, copy quality. Findings ordered by severity. |
| `sources.md` | The curated source stack, split into agent-fetchable and human-only, grouped by category (principles, real-product evidence, design systems, components, motion, accessibility, colour/type/icons). Backs `/design-stack:sources`. |

---

## 7. Skill: `design-evidence`

The playbook library. Triggers when a specific screen type or design-system
question is in play.

**Body:** under ~80 lines. It is a router: how to choose a playbook, how to
choose a system, and what to do when no playbook matches (fall back to the
nearest structural analogue and say so, rather than inventing silently).

### `patterns/` — screen-type playbooks

`settings` · `onboarding` · `auth` · `data-table` · `dashboard` · `states` ·
`navigation` · `search-filter` · `billing` · `desktop-app`

Each playbook follows one fixed shape, so they are predictable to read:

1. **What this screen is for** — the user's actual job.
2. **Canonical structure** — the section order shipped products converge on,
   with the reasoning. This is the distilled Mobbin/Refero content.
3. **Variants** — and the condition that selects each.
4. **The six states** — what each one concretely looks like *for this screen*.
5. **Common failures** — what AI-generated versions get wrong.
6. **Reference products** — named, with what specifically to study. Named as
   study targets for the human, not as URLs for Claude to fetch.

`patterns/states.md` is the shared definition the gate refers to:
**empty · loading · error · permission · overflow · offline**, each with
sub-cases (first-run empty vs filtered-empty vs cleared-empty; partial vs total
failure; retryable vs terminal).

`patterns/desktop-app.md` covers timeline / canvas / inspector tool UIs —
a distinct discipline from web SaaS, poorly served by web component defaults.

### `systems/` — design-system profiles

`apple-hig` · `material` · `fluent` · `carbon` · `polaris` · `primer` ·
`atlassian` · `govuk`, plus `CHOOSING.md` and `STORYBOOKS.md`.

Each profile: what the system is for, its core conventions, where it is
opinionated, where it stays silent, when to pick it, when not to, and the
canonical docs URL (these are fetchable — the profile is the summary, the URL is
for depth).

`CHOOSING.md` maps domain to system:

| Domain | System |
|---|---|
| Native Apple platforms | Apple HIG |
| Cross-platform mobile | Material |
| Desktop tools, productivity | Fluent |
| Enterprise, data-dense | Carbon |
| SaaS admin, merchant-facing | Polaris |
| Developer tools | Primer |
| Project and issue tracking | Atlassian |
| Public services, forms, accessibility-critical | GOV.UK |

Picking one is mandatory. Borrowing *conventions* is the point; visual identity
still comes from `frontend-design`.

`STORYBOOKS.md` covers component inventories, and is the INVENTORY stage's
reference. Two halves:

**The project's own Storybook, checked first.** How to detect one
(`.storybook/`, `*.stories.*`, a `storybook` script in `package.json`), and what
to extract: the component list is the available inventory, `args` and prop types
are the real API, the docs pages carry usage rules and the do/don't pairs. A
component that exists must be reused, not rebuilt — and a gap in the inventory
is worth naming out loud before filling it.

**Public Storybooks, for studying decomposition.** Fluent UI, Carbon, Primer,
Grafana, Adobe Spectrum, Chakra, Elastic EUI, catalogued with what each is
strong at. These are fetchable. Their value is showing how mature teams split a
product into primitives and compose upward — `Button → Field → Form → Modal →
Table → Page` — which is exactly the decomposition Claude otherwise guesses at.

---

## 8. Commands

| Command | Does |
|---|---|
| `/design-stack:brief` | Runs strategy and UX architecture before any pixels: problem, user, out-of-scope, success measure, IA, task flow with success and error paths, and the six-state matrix. Output is a written brief. |
| `/design-stack:research <screen type>` | Loads the matching playbook, selects a design system with justification, and reports canonical structure plus known failure modes. Read-only — proposes, does not build. |
| `/design-stack:review` | Runs `10-design-review.md` against current UI code. Findings ordered by severity, each naming the file and the rule. |
| `/design-stack:sources` | Prints the curated source stack, split into agent-fetchable and human-only, grouped by category. |

---

## 9. Content rules

Binding on every file written:

1. **Generic.** No project names, no employer-specific conventions, no paths
   from any one repo.
2. **Stack-agnostic.** Principle first; framework syntax only as illustration,
   labelled as such.
3. **Progressive disclosure.** `SKILL.md` bodies stay short and route outward.
   A reference file is read when its moment arrives, not preloaded.
4. **No aesthetic instructions.** If a sentence is about beauty rather than
   structure, it belongs to `frontend-design` — cut it and say where it went.
5. **Reasoned, not asserted.** Every convention states why it exists. A rule
   without a reason cannot be applied to a case it did not anticipate, and
   invites cargo-culting.
6. **Honest about sources.** Never imply Claude can read a login-walled site.

---

## 10. Verification

Not a code project, so verification is behavioural.

**Structural checks** — every `SKILL.md` has valid frontmatter with `name` and
`description`; both JSON manifests parse; every referenced file exists; no
orphan files; `/plugin marketplace add` and `/plugin install` succeed.

**Behavioural checks** — three probe prompts, each run with the plugin enabled
and disabled, comparing against the Section 1 success criteria:

1. `"build a settings page for a team workspace"`
2. `"build an admin table of customer orders"`
3. `"build a timeline panel for a video editor"`

Probe 3 also confirms `desktop-app.md` is reached rather than a web-SaaS
playbook being misapplied.

**Negative check** — `"make this button slightly rounder"` must NOT trigger the
skill. Over-triggering burns context on every trivial styling request and is a
real failure, not a harmless one.

---

## 11. Future plugins

The repo is a marketplace from the first commit so later plugins need no
restructuring. `README.md` carries a plugin index table, and each new plugin
adds one row plus one `marketplace.json` entry.

---

## 12. Open questions

None. Decisions settled during brainstorming: marketplace named `chamrong`;
repo at `E:\Chamrong\Project\claude-plugins`; git-initialised for later
publication; `desktop-app.md` retained; MIT licence.
