# Vendor evaluation matrix · `<layer>`

Date: `<YYYY-MM-DD>` · Stage: `<n>` · Evaluated by: `<who>`

Candidates per layer: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/layers.md`.
Record the winner in a stack decision record.

## Must-haves (pass / fail before scoring)

| Requirement | `<A>` | `<B>` | `<C>` |
|---|---|---|---|
| Region near users available | | | |
| Speaks a portable standard (Postgres, S3, OTel, OCI, OIDC) | | | |
| Plan terms allow commercial use | | | |
| Meets our data / compliance needs for this stage | | | |

## Scored criteria

Score 1 (poor) to 5 (strong). Set the weights for this layer and stage before
scoring; they must add up to 100.

| Criterion | Weight | `<A>` | `<B>` | `<C>` |
|---|---|---|---|---|
| Cost at expected volume | | | | |
| Cost at 10× volume | | | | |
| Behaviour at the free-tier limit (pause is safer than surprise bill for $0 stages) | | | | |
| Ease of exit | | | | |
| Fit with the rest of the stack | | | | |
| Team familiarity | | | | |
| Docs and community | | | | |
| Reliability history / published SLA | | | | |
| Support at our plan | | | | |
| Security features (SSO, audit logs, 2FA) | | | | |
| **Weighted total** | 100 | | | |

## Facts checked

| Vendor | Pricing page | Free tier (kind, as read) | At the limit it… | Checked on |
|---|---|---|---|---|
| | | | | |

## Recommendation

`<Vendor>`, because `<two or three reasons>`. Runner-up `<vendor>` is the
exit choice if `<trigger>`.
