# RACI and its variants

A responsibility assignment matrix lists activities (or deliverables, or
decisions) as rows and roles as columns. Each cell holds a letter, or is
empty.

## Definitions

| Letter | Role | In practice |
|---|---|---|
| **R** | Responsible | Does the work. Can be several people, though one is better |
| **A** | Accountable | Owns the outcome. Signs off, answers for it, can say no. Exactly one |
| **C** | Consulted | Asked for input *before* the work or decision. Two-way |
| **I** | Informed | Told *after*. One-way |

A may also be R for the same activity. Write it as `A/R` or just `A`, and say
which convention you use in the legend.

## Rules

1. **Exactly one A per activity.** Two As means nobody is accountable.
2. **At least one R per activity.** An A with no R means the owner is
   expected to do it; make that explicit with `A/R`.
3. **No row without an R or an A.** A row with only C and I is a task nobody
   will do.
4. **Limit the Cs.** Each C is a meeting or a wait. If more than two or three
   roles are consulted, ask which of them could be I instead.
5. **Nobody overloaded with As.** One role holding the A for most rows is a
   bottleneck and usually a sign the matrix is describing hierarchy, not work.
6. **Roles, not people.** Map roles to names in a separate table.
7. **Activities are verbs.** "Approve budget", not "Budget".
8. **Push the A down** to the lowest level that has the knowledge and the
   authority.

## Variants

| Variant | Adds or changes | Use when |
|---|---|---|
| **RASCI** | **S** = Support: provides resources or help to the R, without owning the work | Shared services (IT, legal, design) help but should not be mistaken for the doer |
| **RACI-VS** | **V** = Verify: checks the output against criteria. **S** = Sign: approves the verified output (often the A) | Regulated or quality-critical work where checking and signing are distinct, named steps |
| **DACI** | **D** = Driver: runs the decision process. **A** = Approver: makes the call, one person. **C** = Contributors: have input. **I** = Informed | A single *decision*, not an ongoing activity. Use the DACI decision record |

Note that the S in RASCI and the S in RACI-VS mean different things. State
the legend on every matrix.

Pick RACI for an ongoing process, RASCI when support teams keep being
confused with owners, RACI-VS when a check-and-sign step is required, and DACI
for a one-off decision. Templates:
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/raci-matrix.md` and
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/daci-decision.md`.

## Common smells

| Smell | What it means | Fix |
|---|---|---|
| Two As on a row | Shared ownership, so nobody owns it | Pick one; make the other C |
| No A on a row | Nobody can say no or sign off | Name the role that would be blamed if it failed |
| Row full of Cs | Consensus culture; slow | Keep the Cs whose input changes the result |
| Column full of Rs | That role is overloaded | Redistribute, or the plan is unrealistic |
| Column with no letters | Role has no part; why is it on the matrix? | Remove it, or add the missing activity |
| Column of only Is | Probably a stakeholder, not a participant | Move to a comms plan |
| Senior leader is A everywhere | Matrix mirrors the org chart | Push As down |
| A and R always the same role | Maybe fine for small teams; check it is deliberate | — |
| Activities are nouns or phases | Too vague to act on | Rewrite as verb + object |

## Running a RACI workshop

1. **Before:** draft the activity list (from the SOP steps, the project
   plan, or a process map) and the role list. 10 to 25 rows is workable.
2. **Invite** one person per role who can speak for it.
3. **Agree the legend** and the rules above in the first five minutes.
4. **Fill the A column first**, row by row. Most arguments are about A;
   settle them before anything else.
5. **Then R, then C, then I.**
6. **Park disputes** you cannot settle in two minutes. Note the options and
   who will decide (usually the sponsor).
7. **Run the analysis checklist** below, in the room.
8. **After:** publish, link from the SOP or project charter, and set a review
   date (at every reorganisation, or yearly).

## Analysis checklist

**Horizontal, per activity (row):**

- [ ] Exactly one A.
- [ ] At least one R (or `A/R`).
- [ ] Three or fewer Cs.
- [ ] Everyone who must know the result is an I.
- [ ] The activity is a verb + object and has a clear output.

**Vertical, per role (column):**

- [ ] The role has at least one letter.
- [ ] The number of Rs is realistic for the role's capacity.
- [ ] The number of As is not concentrated in one role; no role holds more
      than roughly a third of the As without a stated reason.
- [ ] A role with many Cs has time to be consulted.
- [ ] The person in this role has seen and agreed their column.
