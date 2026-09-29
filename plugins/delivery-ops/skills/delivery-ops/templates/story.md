<!--
Template: User story
Basis: the "As a / I want / So that" format (commonly attributed to
Connextra), INVEST criteria (Bill Wake, 2003), and Given/When/Then scenarios
from Behaviour-Driven Development (Gherkin). Splitting help is in
${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/splitting.md.
Use when: a vertical slice of user value that fits in one sprint.
Rules: a real user, not "a developer"; observable acceptance criteria;
requirement ID carried from the PRD.
Remove this comment in the finished document.
-->

# <Short title in the user's words, e.g. "Export this month's invoices as CSV">

| Field | Value |
|---|---|
| Key | <PROJ-124 or TBD> |
| Type | Story |
| Epic / parent | <PROJ-123> |
| Requirement | <FR-012> |
| Estimate | <story points> |
| Priority | <Highest / High / Medium / Low> |
| Labels | <req-FR-012, component> |
| Depends on | <keys, or none> |
| Design | <link, if UI> |

## Story

**As a** <persona or role>,
**I want** <capability>,
**so that** <benefit or outcome>.

## Acceptance criteria

```gherkin
Scenario: <happy path, named by outcome>
  Given <context>
  When <action>
  Then <observable outcome>

Scenario: <failure or invalid input>
  Given <context>
  When <action>
  Then <what the user sees, and what does not happen>

Scenario: <permission case, if roles exist>
  Given <a user without <role>>
  When <action>
  Then <denied outcome>
```

<Or a rule list, if the behaviour is a set of rules:>

- <rule>
- <rule>

## Notes

<Out-of-scope clarifications, open questions, links. No implementation
instructions unless they are real constraints.>

## INVEST check

- [ ] Independent  - [ ] Negotiable  - [ ] Valuable
- [ ] Estimable    - [ ] Small       - [ ] Testable
