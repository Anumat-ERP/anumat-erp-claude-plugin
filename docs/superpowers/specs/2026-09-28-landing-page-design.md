# landing-page — Design Spec

**Date:** 2026-09-28
**Status:** Approved for planning
**Repo:** `E:\Chamrong\Project\claude-plugins` (marketplace `chamrong`), plugin #3
**Branch:** `feat/landing-page` from `c06f6cc`

---

## 1. Purpose

Help Claude design a landing page that converts, rather than one that looks
finished.

A landing page is not a screen in a product. Its reader has not bought
anything, owes the page no patience, and leaves if the first ten seconds do not
land. Success is measured — CTA rate, form completion, qualified leads — not
observed as "the task completed".

That difference is why this is a separate plugin rather than a playbook in
`design-stack`:

| | A `design-stack` playbook | A landing page |
|---|---|---|
| Reader | already a user | a stranger, deciding |
| Success | task completed | measured conversion |
| Primary artifact | screen structure | the message |
| Six interface states | central | only the form has them |
| Design-system chooser | mandatory | irrelevant |
| SEO, analytics, experiments | absent | first-class |

### Success criteria

Given `"design a landing page for <product>"`, Claude must:

1. Load the skill without being told to.
2. Establish positioning — category, promise, mechanism, differentiator — and
   **one** primary CTA, before proposing any section.
3. Order sections as an argument, not a feature list, and say what each one is
   for.
4. Produce a measurement plan naming the events that would tell you it worked.
5. Refuse to write a claim it cannot point to evidence for.

Criterion 5 is the one that distinguishes this from generic marketing-copy
help, and it is the one most likely to be skipped.

---

## 2. Non-goals

- **Not code scaffolding.** A generic hero component is exactly the templated
  output this plugin exists to prevent. It writes documents — a brief, a
  measurement plan, a component checklist — and leaves the building to
  `monorepo-stack` and `frontend-design`.
- **Not general web engineering.** Performance budgets, security review,
  browser QA and launch runbooks are real work and not landing-page-specific.
  Including them would bury the parts that are.
- **Not visual design.** Palette, type and visual character belong to
  `frontend-design`.
- **Not the lead form's interface states.** That is app UI with all six states;
  `design-stack` owns it.
- **No project-specific content.** Generic. Banned substrings, case-insensitive,
  anywhere under `plugins/`: `fueni`, `nazounki`, `anumat`.

---

## 3. Positioning against the other plugins

```
landing-page      the message, the argument order, the measurement
   ├── the lead form's states        → design-stack
   ├── the component catalogue       → monorepo-stack
   └── palette, type, visual voice   → frontend-design
```

Each hand-off is named in the skill body, so the boundary survives being read
in isolation. Without them this plugin would duplicate all three.

---

## 4. The triage rule

Stated before anything else, because a process that cannot scale down is
abandoned whole — including the parts that mattered.

| Situation | Run |
|---|---|
| Validating an idea, pre-revenue | positioning · hero · lead capture |
| Funded pre-launch | everything |
| A page inside an existing marketing site | inherit positioning; run structure · copy · measurement |
| A campaign or SEO page | inherit positioning and components; run structure · SEO · measurement |

`/landing-page:brief` asks which of these it is, first, and says what it is
skipping and why.

---

## 5. Repository layout

```
plugins/landing-page/
├── .claude-plugin/plugin.json
├── README.md
├── commands/
│   ├── brief.md           /landing-page:brief
│   ├── structure.md       /landing-page:structure
│   ├── components.md      /landing-page:components
│   ├── measure.md         /landing-page:measure
│   └── review.md          /landing-page:review
└── skills/landing-page/
    ├── SKILL.md
    └── reference/
        ├── 01-positioning.md
        ├── 02-visitor-journey.md
        ├── 03-section-order.md
        ├── 04-copy.md
        ├── 05-hero.md
        ├── 06-lead-capture.md
        ├── 07-seo.md
        ├── 08-analytics.md
        ├── 09-scaling.md
        └── 10-review.md
```

No `scripts/` and no `templates/`. The plugin's output is prose written into
the user's repo, not files copied from this one.

---

## 6. The skill

**Frontmatter description** must fire on: designing or reviewing a landing
page, marketing site, homepage, product page or campaign page; positioning and
messaging work; "why is this page not converting". It must NOT fire on
in-product screens, which are `design-stack`'s.

**Body:** under 120 lines. States the triage rule, the pipeline, the
boundaries, and routes to `reference/`.

### Pipeline

```
TRIAGE     → which situation is this? what are we skipping, and why?
POSITION   → category · promise · mechanism · differentiator · one CTA
JOURNEY    → recognition → understanding → evidence → relevance → trust → decision
STRUCTURE  → sections, in the order the argument needs them
COPY       → voice, and every claim mapped to evidence
BUILD      → hand appearance to frontend-design, components to monorepo-stack
MEASURE    → events, funnel, and what each symptom would mean
REVIEW     → ten-second test, claims audit, conversion audit
```

### Reference files

| File | Contains |
|---|---|
| `01-positioning.md` | Category, promise, mechanism, differentiator. Why one primary CTA and what two CTAs cost. The value-proposition formula and how to test it. Writing for the buyer *and* the user when they differ. |
| `02-visitor-journey.md` | The six-stage argument and why that order. What a visitor is asking at each stage, and the failure of answering a later question before an earlier one. |
| `03-section-order.md` | The canonical section set, each section's single job, and the condition that includes or drops it. Content-priority rules: strongest message above the fold, product shown early, features only after the problem, CTA repeated after each decision point. Mobile order as a separate decision. |
| `04-copy.md` | Voice. Leading with outcomes. **The claims rule: every claim maps to evidence, and unverifiable claims are cut, not softened.** Banned constructions. Localisation: 30% text expansion, no text baked into screenshots, localised numbers and dates. |
| `05-hero.md` | The three hero archetypes and how to choose between them by comprehension rather than taste. Eyebrow, headline, description, CTA pair, visual. The ten-second test as the selection instrument. Why product screenshots beat device mockups. |
| `06-lead-capture.md` | Field selection: every field costs completions, so each one justifies itself. Progressive profiling. Post-submit — never a blank success screen. Consent, separated from necessary processing and never pre-ticked. Routes the form's interface states to `design-stack`. |
| `07-seo.md` | One page per intent, and why near-duplicate keyword pages fail. Metadata, headings, canonical, structured data only where truthful. The keyword-cluster → page-template mapping. |
| `08-analytics.md` | The event plan with stable names and documented properties. What must never be sent — typed field values, personal data. Consent. **The funnel-diagnosis table: symptom → the question it raises.** Experiment priority, highest-leverage first. |
| `09-scaling.md` | Turning one page into a system: solution, industry, integration, comparison, campaign templates. The shared section spine. Per-page governance — owner, reviewer, last reviewed, target intent, conversion goal. |
| `10-review.md` | The audit `/landing-page:review` runs: ten-second comprehension, one-dominant-CTA, claims-to-evidence, section-order, copy quality, measurement coverage. Findings ordered by severity. |

---

## 7. Commands

| Command | Does |
|---|---|
| `/landing-page:brief` | Triage, then positioning: category, promise, mechanism, differentiator, audience, primary CTA, success metrics. Asks only what it cannot infer. Writes a brief and stops. |
| `/landing-page:structure` | Visitor journey → section list, each with its job and the argument step it advances. Desktop and mobile order. Read-only. |
| `/landing-page:components` | The marketing component inventory and the story states each needs. Hands off to `monorepo-stack` for where they live. |
| `/landing-page:measure` | Event plan, funnel definition, and the diagnosis table filled in for this page. |
| `/landing-page:review` | Runs `10-review.md`. Findings by severity, each naming what it costs in conversions rather than which rule it breaks. |

---

## 8. Content rules

1. **Generic.** No project names. Banned substrings as in §2.
2. **Reasoned, not asserted.** Every rule states why, including why the
   rejected alternative was rejected.
3. **Honest about evidence.** Conversion advice is full of folklore. Where
   something is a convention rather than a measured result, say so.
4. **No visual guidance.** That is `frontend-design`'s.
5. **Hand-offs named.** Form states → `design-stack`; components →
   `monorepo-stack`; appearance → `frontend-design`.
6. **Examples are invented products**, never a real client's.

---

## 9. Verification

**Structural** — `node scripts/validate.mjs` stays green with three plugins.
`manifests`, `frontmatter`, `length`, `refs`, `aesthetics`, `commands` and
`orphans` all apply. The `contrast` check is `design-stack`-specific and will
correctly not apply here.

The `aesthetics` check currently scans only skills named `design-stack`. It is
extended to scan **every** skill in every plugin, so this plugin cannot drift
into visual direction either — the same guard, applied where it now also
matters.

`anumat` is added to the banned-terms scan.

**Behavioural** — probe prompts, run with the plugin enabled and disabled:

1. `"design a landing page for a project management tool"` — must triage,
   establish positioning before sections, and name one primary CTA.
2. `"our landing page is not converting"` — must reach the funnel-diagnosis
   table rather than suggesting visual tweaks.
3. `"write a hero section"` — must ask what the product is and who it is for
   before writing, and must not invent a claim.

**Negative** — `"make the hero image bigger"` must NOT load the skill.

---

## 10. Open questions

None. Settled: new plugin rather than a `design-stack` playbook; documents
rather than code scaffolding; the source roadmap genericised with `anumat`
banned; triage rule included; general web engineering excluded.
