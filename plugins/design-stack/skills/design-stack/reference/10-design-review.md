# Design Review

*Read this when auditing finished UI. This is the procedure `/design-stack:review`
executes.*

This is a checklist, not an essay. Work the sections in order. Sections 1–3 are
**blocking**: a failure there is a defect, not a preference, and ships as a bug.

Report findings ordered by severity, each naming the file, the line, the rule,
and the reference file the rule comes from. List blocking findings first and
label them as blocking. If the work never chose a design system, that is itself
a finding — record it before anything else.

---

## 1. States coverage — BLOCKING

For every screen in scope, all six states from `patterns/states.md`:

- [ ] **empty** — and the right one of the three: first-run, filtered, cleared.
      Using one message for all three is the most common failure here.
- [ ] **loading** — initial, refresh, and pagination handled distinctly.
- [ ] **error** — partial vs total; every error says what happened *and* what
      to do next.
- [ ] **permission** — unauthenticated, unauthorised, and plan-gated
      distinguished; hidden vs disabled vs explained chosen deliberately.
- [ ] **overflow** — long strings, many items, deep nesting, narrow viewport.
- [ ] **offline** — degradation is visible, not silent.

"Not applicable" is acceptable only with a stated reason. An unstated omission
is a missing state.

## 2. Keyboard path — BLOCKING

- [ ] Every mouse-reachable action is keyboard-reachable.
- [ ] Focus is visible at every step — `:focus-visible`, 3:1 contrast, not
      removed.
- [ ] Tab order matches visual order; no positive `tabindex`.
- [ ] Modals trap focus, close on `Escape`, and return focus to the trigger.
- [ ] No unintentional focus trap anywhere.
- [ ] A skip link reaches `main`.

Reference: `reference/09-accessibility.md`, `reference/04-components.md`.

## 3. Contrast and non-colour signalling — BLOCKING

- [ ] Body text ≥ 4.5:1; large text ≥ 3:1.
- [ ] UI borders, icons carrying meaning, and focus indicators ≥ 3:1.
- [ ] No meaning carried by colour alone — check in greyscale.
- [ ] Disabled text still legible, even though the standard exempts it.

Reference: `reference/09-accessibility.md`.

---

## 4. Responsive behaviour

- [ ] Works at the smallest supported width — 320px unless stated otherwise.
- [ ] No horizontal page scroll; no clipped or unreachable content.
- [ ] Readable and operable at 200% zoom.
- [ ] Touch targets ≥ 44×44 with spacing between them, on touch surfaces.
- [ ] Tables have a deliberate narrow-viewport answer, not just overflow.
- [ ] Keyboard-open state checked on mobile.

Reference: `reference/02-layout.md`, `reference/07-mobile.md`,
`patterns/data-table.md`.

## 5. System consistency

- [ ] **A design system was chosen and named.** If not, that is finding one.
- [ ] If the project has its own Storybook or component library, existing
      components were reused rather than rebuilt — `systems/STORYBOOKS.md`.
- [ ] Conventions follow the chosen system; deviations are deliberate and
      stated.
- [ ] Spacing, radius, and elevation come from the scales, not ad hoc.
- [ ] Nested radii decrease inward.
- [ ] Tokens named by role, not by value.

Reference: `reference/01-foundations.md`, `systems/CHOOSING.md`.

## 6. Structure

- [ ] Section order matches the relevant playbook in `patterns/`; deviations
      are justified.
- [ ] One clear primary action per screen.
- [ ] Hierarchy survives squinting — the primary element is identifiable
      without reading.
- [ ] Grouping is carried by proximity, not only by borders.
- [ ] Content width is appropriate per content type; prose is capped.
- [ ] Numbers use tabular figures and are right-aligned in columns.

Reference: `reference/02-layout.md`, `reference/03-typography.md`.

## 7. Copy

- [ ] Buttons name their outcome — `Save changes`, not `Submit`.
- [ ] Errors say what happened and what to do next.
- [ ] Empty states say what this is for and offer the next action.
- [ ] Labels use the user's vocabulary, not the schema's.
- [ ] Destructive confirmations name the specific item.
- [ ] No placeholder or lorem text left in.

Reference: `reference/05-forms.md`, `patterns/states.md`.

---

## Reporting

```
BLOCKING  <file>:<line> — <rule>  (reference/09-accessibility.md)
          <what is wrong and what a user experiences>

<severity> <file>:<line> — <rule>  (<reference file>)
          <what is wrong and what a user experiences>
```

Order by severity, blocking first. State what the user experiences, not just
which rule was broken — a rule citation with no consequence attached invites
the reader to dismiss it as pedantry.

If a section passes cleanly, say so in one line. Silence reads as "not
checked", and a review whose coverage is unclear is worth little.

**Do not report appearance.** Palette, typeface, and visual character are the
`frontend-design` skill's territory, and craft polish is the `impeccable`
plugin's. This review covers structure, states, and access.
