---
description: Build a STRIDE threat model with a Mermaid data-flow diagram for a system or feature.
argument-hint: [system or feature — defaults to the current repo]
---

Threat-model: **$ARGUMENTS** (or the current repository).

Read `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/stride.md` now and
follow its four questions. Fill
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/threat-model.md`.

## Steps

1. **Draw what exists, from the code.** Read routes, handlers, database
   clients, queue producers and consumers, outbound HTTP calls, webhooks,
   auth middleware, and deploy config. Every box and arrow in the diagram
   points at something real; if you infer one, mark it "inferred".
2. **Mark trust boundaries**: internet to edge, edge to app, app to data,
   your service to third parties, user to admin, tenant to tenant.
3. **Walk STRIDE** for each element that crosses a boundary. For each
   threat, find the existing control in the code (file and line) or record
   that there is none.
4. **Rate** each gap with the likelihood × impact matrix in
   `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/severity.md`.
5. **Add feature-specific threats.** For LLM features, include the threats
   in `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-llm.md`.
   For multi-tenant data, tenant isolation gets its own rows.
6. **Decide a response** per threat: mitigate, accept (owner and expiry),
   transfer, or eliminate. Leave "accept" for the user to confirm.

## Output

The threat model document with a Mermaid diagram that renders, a STRIDE table,
assumptions, and the list of gaps that should become findings in
`/security-audit:run`. Keep it about the design; do not start fixing code.
