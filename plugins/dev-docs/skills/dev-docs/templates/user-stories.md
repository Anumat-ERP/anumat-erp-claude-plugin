<!--
Template: User stories with acceptance criteria
Basis: the "As a / I want / So that" story format (commonly attributed to
Connextra), the INVEST criteria (Bill Wake, 2003), and Given/When/Then
scenarios from Behaviour-Driven Development (Gherkin syntax).
Use when: breaking a feature or PRD into deliverable, testable slices.
Lives at: docs/product/stories-<slug>.md, or one story per issue in the tracker.
Remove this comment in the finished document.
-->

# User stories: <Feature name>

| Status | Draft |
|---|---|
| Owner | <product owner> |
| Created | <YYYY-MM-DD> |
| Related | <PRD link, epic link> |

## Personas

| Persona | Description |
|---|---|
| <Store manager> | <who they are, what they need, what they know> |

## Story map

<Optional. The user's journey left to right, stories under each step, top
row is the MVP.>

| Step | <Step 1> | <Step 2> | <Step 3> |
|---|---|---|---|
| MVP | US-1 | US-2 | US-3 |
| Later | US-4 | | US-5 |

---

## US-<n>: <short title in the user's words>

**As a** <persona>,
**I want** <capability>,
**so that** <benefit or outcome>.

| Field | Value |
|---|---|
| Priority | <Must / Should / Could / Won't (MoSCoW)> |
| Estimate | <points or size> |
| Depends on | <US-x, or none> |
| Issue | <tracker link> |

### Acceptance criteria

```gherkin
Scenario: <happy path, named by outcome>
  Given <initial context>
    And <more context>
  When <the user does something>
  Then <observable outcome>
    And <another observable outcome>

Scenario: <failure or edge case>
  Given <context>
  When <action>
  Then <what the user sees, and what does not happen>
```

<Cover at least: the main success path, one invalid-input or failure case,
and one permission case if roles exist. Each Then must be something a tester
can observe.>

### Notes

<Design links, open questions, out-of-scope clarifications for this story.>

### INVEST check

- [ ] **Independent**: can be built and released without another story in progress.
- [ ] **Negotiable**: states the need, not a fixed implementation.
- [ ] **Valuable**: a user or the business gets something from it alone.
- [ ] **Estimable**: the team knows enough to size it.
- [ ] **Small**: fits in one sprint, ideally a few days.
- [ ] **Testable**: the acceptance criteria can pass or fail.

<If a box cannot be ticked, split or rework the story. Common splits: by
workflow step, by business rule, by data variation, by happy path vs
exceptions, by role.>

---

<Repeat the story block for each story.>

## Definition of done

<Team-wide criteria every story meets, for example:>

- [ ] Acceptance criteria pass, with automated tests where practical.
- [ ] Code reviewed and merged.
- [ ] Docs and CHANGELOG updated if user-visible.
- [ ] Deployed to staging and checked by the product owner.
