---
description: Audit existing UI against the design-stack review checklist.
argument-hint: [files, component, or screen to review — defaults to the current diff]
---

Audit: **$ARGUMENTS** — or, if no argument was given, the UI touched by the
current diff.

Execute `skills/design-stack/reference/10-design-review.md` in its section
order. Read it now; do not work from memory of it.

## Scope

Read the actual code. This is not a review of a description — open the files,
find the states, trace the keyboard path, check the values against the scales.
A finding you cannot point at a line for is not a finding.

If the work never chose a design system, record that first, before anything
else. It is finding one.

## Order

Sections 1–3 are **blocking**: states coverage, keyboard path, contrast. A
failure there is a defect, not a preference. Sections 4–7 are responsive
behaviour, system consistency, structure, and copy.

## Output

```
BLOCKING  <file>:<line> — <rule>  (<reference file>)
          <what is wrong, and what a user experiences>

<severity> <file>:<line> — <rule>  (<reference file>)
          <what is wrong, and what a user experiences>
```

Ordered by severity, blocking first. Every finding names the file, the line,
the rule, and the reference file the rule comes from.

**State the consequence, not just the rule.** "Missing focus indicator" invites
a shrug; "a keyboard user cannot tell which control they are on, so the form
cannot be completed without a mouse" does not.

If a section passes cleanly, say so in one line. Silence reads as "not
checked", and a review whose coverage is unclear is worth little.

## Out of scope

**Do not report appearance.** Palette, typeface, visual character, and
templated-looking output belong to the `frontend-design` skill. Craft polish
and micro-interaction critique belong to the `impeccable` plugin. If you notice
something in those categories, mention it in one line at the end under
"Outside this review" and name which tool covers it.

This review covers structure, states, and access.
