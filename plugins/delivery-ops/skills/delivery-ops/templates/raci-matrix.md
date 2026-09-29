<!--
Template: RACI matrix (with RASCI and RACI-VS options)
Basis: responsibility assignment matrix practice. Rules, variants and the
analysis checklist are in
${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/raci.md.
Use when: several roles share activities in a project or process and it is
unclear who does the work, who owns it, who is asked and who is told. For a
single decision, use the DACI decision record instead.
Rules: exactly one A per row; at least one R; few Cs; roles not names;
activities are verb + object.
Remove this comment in the finished document.
-->

# RACI: <Project or process name>

| Field | Value |
|---|---|
| Owner | <role> |
| Version | <0.1> |
| Status | <Draft / Agreed> |
| Last reviewed | <YYYY-MM-DD> |
| Next review | <YYYY-MM-DD, or "at next reorganisation"> |
| Related | <SOP, project charter, org chart> |

## Legend

| Letter | Meaning |
|---|---|
| R | Responsible: does the work |
| A | Accountable: owns the outcome and signs off. Exactly one per row |
| C | Consulted: asked for input before; two-way |
| I | Informed: told after; one-way |
| <S> | <RASCI only: Support, provides resources to the R> |
| <V / S> | <RACI-VS only: Verify checks the output; Sign approves it> |

Convention: `A/R` means the accountable role also does the work.

## Matrix

| # | Activity | <Role 1> | <Role 2> | <Role 3> | <Role 4> | <Role 5> |
|---|---|---|---|---|---|---|
| 1 | <verb + object> | | | | | |
| 2 | | | | | | |

## Role → person

| Role | Current person | Deputy |
|---|---|---|
| <role> | <name> | <name> |

## Worked example: release a new version of a web app

| # | Activity | Product owner | Eng. lead | Developer | QA | Support lead | Head of product |
|---|---|---|---|---|---|---|---|
| 1 | Decide release scope | A/R | C | | C | I | I |
| 2 | Finish and merge changes | C | A | R | | | |
| 3 | Run regression tests | I | C | C | A/R | | |
| 4 | Write release notes | A/R | C | C | | C | |
| 5 | Approve go / no-go | A | R | | C | C | I |
| 6 | Deploy to production | I | A | R | | I | |
| 7 | Brief support team | C | | | | A/R | |
| 8 | Monitor for 24 hours | I | A | R | | C | |

**Check of the example.** Horizontal: every row has exactly one A and at
least one R (`A/R` counts). No row has more than three Cs. Vertical: the
product owner and the eng. lead hold three As each, and QA and the
support lead one each, so no single role dominates. The head of product has only Is, so
it is a stakeholder and could move to the communication plan. The developer
holds three Rs, realistic for a release. QA is A/R for testing, so nobody
else can sign off the regression run.

## Validation checklist

**Per activity (rows)**

- [ ] Exactly one A.
- [ ] At least one R, or `A/R`.
- [ ] No row with only C and I.
- [ ] Three or fewer Cs.
- [ ] Activity is a verb + object with a clear output.

**Per role (columns)**

- [ ] Every role has at least one letter.
- [ ] No role holds most of the As without a stated reason.
- [ ] Rs are realistic for the role's capacity.
- [ ] A role with only Is is moved to the communication plan, or kept on purpose.
- [ ] Each person has seen and agreed their column.

## Open disputes

| Activity | Options | Who decides | By |
|---|---|---|---|
| | | | |
