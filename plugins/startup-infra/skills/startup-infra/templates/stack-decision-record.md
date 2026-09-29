# Stack decision record · `<layer>`

- ID: `SDR-<nnn>`
- Status: Proposed | Accepted | Superseded by SDR-`<nnn>`
- Date: `<YYYY-MM-DD>`
- Stage at decision: `<n>`
- Deciders: `<names>`

Options per layer: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/layers.md`.

## Context

What this layer must do for the product, at this stage. Constraints: region,
budget, team skills, compliance, existing providers.

## Options considered

| Option | Fit | Free tier (kind) | At the limit it… | Portability (standard) | Pricing page | Checked on |
|---|---|---|---|---|---|---|
| `<A>` | | | pause / throttle / bill / block | | | |
| `<B>` | | | | | | |
| `<C>` | | | | | | |

Free-tier details come from the provider's pricing page on the date shown,
not from memory. Re-check at every stage review.

## Decision

We use `<A>` because `<reasons>`.

## Consequences

- Good: …
- Bad / trade-offs: …
- The first bill arrives when: `<volume or event>`, roughly `<cost from pricing page>`.

## Exit plan

- **Leave if:** `<trigger: cost, limit, feature, contract>`
- **Most likely next choice:** `<B>`
- **How:** `<standard or tool: pg_dump, S3 copy, OIDC, container>`
- **Provider-specific features we depend on:** `<list; each behind an interface in code at path …>`
- **Estimated effort to leave:** `<days>`

## Review

| Date | Still right? | Notes |
|---|---|---|
| | | |
