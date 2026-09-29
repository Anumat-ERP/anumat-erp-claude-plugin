# Diátaxis: structuring user-facing documentation

Diátaxis (diataxis.fr, by Daniele Procida) splits documentation into four
kinds by what the reader needs at that moment. Most unclear docs mix two or
more kinds on one page. Use it for product and developer documentation that
users read: guides, docs sites, and `docs/` pages that are not design or
process records.

The templates in this plugin are mostly records (PRD, ADR, postmortem). Those
are not Diátaxis documents. The exception is the README, which should link
into all four kinds, and runbooks, which are how-to guides.

## The four kinds

| Kind | Reader is | Reader wants | Answers | Form |
|---|---|---|---|---|
| **Tutorial** | Learning, new | To gain skill by doing | "Can you teach me to…?" | A lesson with a guaranteed result |
| **How-to guide** | Working, competent | To reach a specific goal | "How do I…?" | Numbered steps toward one goal |
| **Reference** | Working, looking something up | Accurate facts | "What is…?" | Dry, complete, structured like the code |
| **Explanation** | Studying, stepping back | Understanding | "Why…?" | Discursive prose, context, alternatives |

Two axes sit behind the table. Tutorials and how-to guides are about
**action**. Reference and explanation are about **knowledge**. Tutorials and
explanation serve **study**. How-to guides and reference serve **work**.

## Rules per kind

**Tutorial.**
- One path, no choices. Choices belong in how-to guides.
- Every step produces a visible result the reader can check.
- It must work every time. Test it on a clean machine.
- Explain the minimum. Link to explanation for the why.

**How-to guide.**
- Title starts with the goal: "How to rotate the signing key".
- Assumes competence. No teaching.
- Numbered steps. One action per step.
- States prerequisites at the top and the expected end state at the bottom.

**Reference.**
- Mirrors the structure of the thing it describes: one page per module,
  endpoint, CLI command, or config key.
- Complete and consistent. Every entry has the same fields.
- No instructions, no opinions. Generate it from code where possible
  (OpenAPI, typedoc, `--help` output).

**Explanation.**
- Answers "why is it like this?"
- Can discuss history, alternatives, and trade-offs.
- Links to ADRs for the recorded decisions.
- No step-by-step instructions.

## Suggested docs site layout

```
docs/
├── tutorials/
│   └── getting-started.md
├── how-to/
│   ├── deploy-to-staging.md
│   └── rotate-signing-key.md
├── reference/
│   ├── cli.md
│   ├── configuration.md
│   └── api/                (generated from OpenAPI)
└── explanation/
    ├── architecture.md     (links to arc42 and ADRs)
    └── data-model.md
```

In a repo that also holds engineering records, put this under `docs/guide/`
and keep the records layout from
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/lifecycle.md` beside it.

## Diagnosing a bad page

| Symptom | Mixed kinds | Fix |
|---|---|---|
| A tutorial stops to explain design history | Tutorial + explanation | Move the history to an explanation page; link to it |
| A reference page has "first, do X, then Y" | Reference + how-to | Move the steps to a how-to guide |
| A how-to guide offers three alternative approaches | How-to + explanation | Pick one; explain the others elsewhere |
| A README tries to be all four | All | Keep the quick start; link out to the rest |
