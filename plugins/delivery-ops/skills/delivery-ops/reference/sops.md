# SOPs and process documentation

## Which document?

Pick the smallest document that does the job.

| Document | Answers | Audience | Example |
|---|---|---|---|
| **Policy** | *What* must be true and *why*. Rules, not steps | Everyone affected | "All refunds over 500 require a second approver." |
| **SOP** | *Who* does *what*, in *what order*, across roles, to run a repeatable process | Every role in the process | "Refund approval": support, finance and a manager, with decisions and records |
| **Work instruction** | *How* one role does one task, click by click | One trained role | "Issue a refund in the billing system" |
| **Checklist** | *Did I do everything?* A memory aid for someone already trained | One person, at the moment of doing | "End-of-day cash-up" |
| **Runbook** (dev-docs) | *How to operate a system*, usually during an incident or maintenance | On-call engineers | "Database failover" |

Rules of thumb:

- A policy without an SOP is a wish. An SOP without a policy may be fine.
- If only one role is involved and there are no decisions, write a work
  instruction, not an SOP.
- If the reader already knows how and just must not forget, write a checklist.
- If the trigger is an alert or outage, it is a runbook: send the user to
  the `dev-docs` plugin.
- An SOP can link to several work instructions and checklists. It should not
  contain them inline.

## Documented information (ISO 9001:2015, briefly)

ISO 9001:2015 replaced "documents and records" with the single term
*documented information* (clause 7.5). In our own words, it asks that
controlled documents:

- **Are identified**: title, ID, version, owner, date.
- **Are reviewed and approved** before use, by someone with authority.
- **Are available** where and when needed, and **protected** from misuse or
  unintended change.
- **Have controlled changes**: version history, what changed and why.
- **Are retained and disposed of** on purpose: how long records are kept, and
  obsolete versions are withdrawn so nobody follows them by mistake.

The SOP template's document-control block and revision history cover these.
This is guidance based on the standard, not a conformity claim. A team that
must be certified should check against the standard itself.

## Writing rules

1. **One procedure per document.** If the title needs "and", split it.
2. **Numbered, imperative steps.** "Check the invoice total", not "The
   invoice total should be checked".
3. **One action per step.** If a step has two verbs, it is probably two steps.
4. **Roles, not names.** "Finance approver", not "Maria". Keep the role → person
   mapping in the roles table or the RACI.
5. **Decision points are explicit branches.** "If the amount is over 500, go
   to step 7. Otherwise go to step 9." Never "use judgement" without criteria.
6. **Warnings before the step** they apply to, not after. The reader acts on
   each step as they read it.
7. **Say what each step produces**: a record, a status change, a message. The
   steps table has an Output column for this.
8. **Screenshots sparingly.** They go stale with every UI change. Prefer
   naming the screen and field; put click-level detail in a work instruction.
9. **Define terms** once, in the definitions section.
10. **Write for the newest trained person**, not the author.
11. **Test it**: have someone who did not write it follow it once, and fix
    every place they hesitate.

## Lifecycle

```
DRAFT → REVIEW → APPROVED → TRAINED → EFFECTIVE → (periodic review) → REVISED or RETIRED
```

| Stage | What happens | Who |
|---|---|---|
| Draft | Author writes from the template, walks the process with people who do it | Author (usually the process owner's delegate) |
| Review | Every role in the process reads it; a dry run is done | Performers, subject experts |
| Approve | Process owner signs; version and effective date set | Process owner (the A in the RACI) |
| Train | Everyone who performs it reads and acknowledges; hands-on training if risky | Process owner, trainers |
| Effective | Takes effect on the effective date, not on approval, so training can finish first | — |
| Periodic review | At a fixed interval (yearly is common; more often for high-risk steps), or after a trigger: incident, audit finding, tool change, reorganisation | Process owner |
| Retire | Marked obsolete, removed from the register's active list, archived for the retention period | Process owner |

Record every stage in the SOP register
(`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sop-register.md`) and
the training log
(`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/training-log.md`).

## Measuring whether an SOP works

An SOP works if people follow it and the outcome is right. Pick two or three:

| Measure | What it tells you |
|---|---|
| Adherence (spot checks, audit sample) | Are people following it? |
| Error or rework rate on the process output | Does following it produce the right result? |
| Cycle time, start to finish | Is it efficient, and stable? |
| Exceptions and deviations logged | Which cases the SOP does not cover |
| Questions asked by performers | Which steps are unclear |
| Time for a new person to perform unaided | Is it learnable? |
| Training completion for the current version | Is everyone on the same version? |

A spike in exceptions or questions after a change is the signal to revise.
An SOP nobody has opened in a year is either perfect or ignored; check which.

## Process maps

Draw a process map when there are three or more roles, or any decision
branch. Patterns are in
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/process-maps.md`.
