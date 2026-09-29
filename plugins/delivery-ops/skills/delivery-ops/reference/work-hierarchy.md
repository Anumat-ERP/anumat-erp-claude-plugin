# The work hierarchy

Work is broken down in levels. Each level answers a different question and
lives on a different time horizon. Names vary between frameworks and tools
(SAFe puts "epic" *above* "feature"; Jira puts "epic" directly above
"story"), so agree the names with the team and write them down.

## Levels

| Level | Question it answers | Typical size / horizon | Owner | Done when |
|---|---|---|---|---|
| **Portfolio / theme** | Where are we investing, and why? | A year or more; strategic | Leadership, portfolio owner | Rarely "done"; reviewed yearly or at strategy changes |
| **Initiative** | Which bet will move the theme? | A quarter to several quarters; several epics, often several teams | Product lead or sponsor | Its outcome measure is met, or it is stopped |
| **Epic** | What capability are we delivering? | Weeks to about a quarter; several sprints; one team ideally | Product owner | All in-scope stories are done and the outcome is checked |
| **Story** | What can a user do now that they could not before? | Fits in one sprint; a few days of work | Product owner writes, team delivers | Acceptance criteria pass and the Definition of Done is met |
| **Task** | What non-user-facing work is needed? | A day to a few days; may stand alone | Team member | Its checklist is complete |
| **Sub-task** | What are the steps to finish this story or task? | Hours to a day | Team member | Done, by whoever picked it up |
| **Bug** | What is broken compared with the expected behaviour? | Varies; split if it grows past a sprint | Triage owner, then team | Fixed, verified, and a regression test exists |
| **Spike** | What do we need to learn before we can estimate or decide? | Time-boxed, usually one to three days | Team member | The question is answered in writing, by the time box |

If a story will not fit in a sprint, it is an epic. If an epic will take
more than about a quarter, it is an initiative or should be split.

## What each level must contain

| Level | Must contain |
|---|---|
| Theme | Strategic intent, the problem or opportunity, 1 to 3 outcome measures, investment guardrails, the initiatives under it |
| Initiative | Problem, hypothesis, outcome measure with baseline and target, scope and non-goals, epics, teams involved, risks, rough size (t-shirt), link to PRD |
| Epic | Outcome in one sentence, the requirement IDs it covers, scope and out-of-scope, success measure, story list, dependencies, t-shirt size, rough order |
| Story | User-facing statement (who, what, why), acceptance criteria, estimate, requirement ID, dependencies, design link if UI |
| Task | What and why, done-checklist, estimate or time, parent |
| Sub-task | One action, parent, assignee |
| Bug | Steps to reproduce, expected vs actual, environment, severity and priority, evidence |
| Spike | The question, the time box, what "answered" looks like, the output (write-up, prototype, decision) |

Templates for every level are listed in
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/catalogue.md`.

## Breaking down, top to bottom

1. **Read the source.** A PRD or functional spec (from the `dev-docs` plugin
   or the team's own) has goals, requirements with IDs, and non-goals.
2. **Theme or initiative.** Usually given. If not, state the outcome the PRD
   serves and create one initiative.
3. **Epics by capability or user journey stage**, not by system layer. A
   good test: could you demo this epic on its own?
4. **Stories as vertical slices** inside each epic, using
   `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/splitting.md`. Put
   the thinnest end-to-end slice first (a walking skeleton).
5. **Tasks and sub-tasks** only for work the team wants to track. Many
   teams create sub-tasks at sprint planning, not during breakdown.
6. **Spikes** wherever a story cannot be estimated. The spike comes first
   and the story is re-estimated after.
7. **Acceptance criteria, estimates, dependencies** for every story. See
   `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/quality-gates.md` and
   `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/estimation.md`.
8. **Check coverage**: every in-scope requirement ID appears on at least one
   story; every story names at least one requirement ID or says why not.

## Anti-patterns

| Anti-pattern | Why it hurts | Instead |
|---|---|---|
| **Horizontal (layer) stories**: "Build the database", "Build the API", "Build the UI" | Nothing is usable until all three are done; value and feedback come late; integration risk piles up at the end | One story per thin slice through every layer |
| **"As a developer, I want…" stories** | There is no user value to accept; it is a task in disguise | Make it a task, or find the user who benefits and write it from their side |
| **Epics that never close** | "Payments" stays open for two years, collecting stories; progress is invisible | Epics have an outcome and an end. Close it and open the next epic |
| **Tasks written as stories** | "As a user I want the logs rotated" confuses the backlog and inflates velocity | Use the task type for technical work |
| **Stories that are really epics** | Carried over sprint after sprint | Split until it fits in one sprint |
| **Sub-tasks for every hour** | Tracking overhead exceeds the work | Sub-tasks only where the team finds them useful |
| **Acceptance criteria that restate the title** | Nothing to test | Observable outcomes, including failure cases |
| **Bug as a catch-all** | "Bug: add export button" hides new scope | A missing feature is a story |

## Traceability

Keep one thread from the requirement to the test:

```
PRD / FS requirement ID (e.g. FR-012)
  → Epic (lists FR-012 in "Requirements covered")
    → Story (Requirement: FR-012; acceptance criteria)
      → Test case(s) (reference the story key and FR-012)
```

- Put the requirement ID in a dedicated field or a label (for example
  `req-FR-012`), not only in the description, so it can be queried.
- Keep a coverage table in the breakdown output
  (`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/breakdown-output.md`).
- When the PRD changes, search by requirement ID to find every ticket
  affected.
- Test plans and test cases themselves belong to the `dev-docs` plugin; this
  plugin only carries the link.
