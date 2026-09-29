# Template catalogue

Every template in this plugin, its basis, and when to use it. "Based on" and
"adapted from" mean the structure follows the named source, in paraphrase.
No template reproduces standard text, and none makes a process conformant to
or certified against any standard.

Each template starts with an HTML comment naming its basis and use. Remove
that comment in the finished document.

## Procedures

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sop.md` | Common quality-management practice; document control adapted from the "documented information" idea in ISO 9001:2015 | A repeatable process with several roles, decisions or records |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/work-instruction.md` | Common quality-management practice | One role doing one task, step by step, inside a larger SOP |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/process-map.md` | Cross-functional (swimlane) flowchart practice, drawn in Mermaid | Showing who does what, in what order, across roles |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/checklist.md` | Checklist practice as described in Atul Gawande's *The Checklist Manifesto* (read-do and do-confirm) | A trained person needs a memory aid, not instructions |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sop-register.md` | Document-control practice | Keeping the list of all SOPs, owners, versions and review dates |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/training-log.md` | Training-record practice common in quality systems | Recording who has read and been trained on which SOP version |

## Responsibility

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/raci-matrix.md` | Responsibility assignment matrix (RACI) practice; variants RASCI and RACI-VS | Several roles share activities and it is unclear who does, owns or is told |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/daci-decision.md` | DACI framework (originated at Intuit, popularised by Atlassian's team playbook) | One decision that needs a clear driver and a single approver |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/roles-responsibilities.md` | Common organisational-design practice | Describing each role's purpose, duties and decision rights |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/escalation-matrix.md` | Common service-management practice (severity levels, tiered escalation) | Defining who to contact, when, and how fast, when something goes wrong |

## Work hierarchy

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/theme-brief.md` | Portfolio-management practice; OKR-style outcomes | A strategic theme of a year or more that groups initiatives |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/initiative-brief.md` | Common product-portfolio practice; lean business case ideas | A quarter-to-several-quarters bet that groups epics |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/epic.md` | Common agile practice | Weeks to about a quarter of work with one outcome |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/story.md` | Connextra story format; INVEST (Bill Wake); Given/When/Then from BDD | A vertical slice that fits in one sprint |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/task.md` | Common agile practice | Technical or operational work with no direct user-visible value |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sub-task.md` | Common agile practice | Hours to a day of work inside a story or task |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/bug.md` | Common defect-report practice | Behaviour differs from what was specified or reasonably expected |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/spike.md` | Spike concept from Extreme Programming | Time-boxed research to answer a question before estimating |

## Quality gates

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/definition-of-ready.md` | Common agile practice (not part of the Scrum Guide) | Agreeing when a ticket may enter a sprint |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/definition-of-done.md` | Based on the Definition of Done concept in the Scrum Guide (2020) | Agreeing when work counts as finished |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/estimation-guide.md` | Planning poker (James Grenning; popularised by Mike Cohn); relative sizing | Teaching a team how it estimates |

## Planning and tools

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/breakdown-output.md` | This plugin's own format | Presenting a breakdown as a tree plus a table |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/jira-import-csv.md` | Jira's CSV importer conventions (check your version) | Bulk-creating a breakdown in Jira |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/jira-setup.md` | Common Jira administration practice | Designing issue types, fields, workflow and board for a team |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/roadmap-now-next-later.md` | Now/Next/Later roadmap (popularised by Janna Bastow, ProdPad) | Showing priorities without committing to dates |
| `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sprint-plan.md` | Based on Sprint Planning in the Scrum Guide (2020) | Planning one sprint or iteration |
