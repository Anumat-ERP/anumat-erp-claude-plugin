# Severity: CVSS v4.0, risk matrix, and SLAs

Sources:
- CVSS v4.0 specification: https://www.first.org/cvss/v4.0/specification-document
- CVSS v4.0 calculator: https://www.first.org/cvss/calculator/4.0

Use two tools together. CVSS gives a standard, comparable description of the
technical severity. The risk matrix adds what CVSS cannot know: how likely
this is in your system and how much it would hurt your business. The final
severity is the matrix result, with the CVSS vector recorded for reference.

## CVSS v4.0 basics

Four metric groups:

| Group | Describes | Who sets it |
|---|---|---|
| Base | Intrinsic properties of the vulnerability | The finder |
| Threat | Whether exploitation is known (Exploit Maturity) | Updated over time |
| Environmental | Your deployment: how important the system is, what controls exist | You |
| Supplemental | Extra context (automatable, recovery, etc.); does not change the score | Optional |

Scores are labelled by which groups were used: CVSS-B (base only), CVSS-BT,
CVSS-BE, CVSS-BTE. A score of 9.3 from Base only is not comparable to one that
includes your environment. Say which.

Base metrics, in plain words:

| Metric | Question | Values |
|---|---|---|
| AV Attack Vector | From where? | Network, Adjacent, Local, Physical |
| AC Attack Complexity | Must the attacker defeat a security measure? | Low, High |
| AT Attack Requirements | Must conditions outside their control line up (a race, a specific config)? | None, Present |
| PR Privileges Required | Must they be logged in, and as what? | None, Low, High |
| UI User Interaction | Must a user do something? | None, Passive, Active |
| VC / VI / VA | Impact on the vulnerable system's confidentiality, integrity, availability | High, Low, None |
| SC / SI / SA | Impact on subsequent systems beyond it | High, Low, None |

Example vector (unauthenticated read of all tenants' data over the network):

```
CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:N/VA:N/SC:N/SI:N/SA:N
```

Qualitative ratings: None 0.0 · Low 0.1–3.9 · Medium 4.0–6.9 ·
High 7.0–8.9 · Critical 9.0–10.0. Compute scores with the official calculator
rather than estimating; record the vector string, not just the number.

## Practical risk matrix

Likelihood: how easily and how probably this is triggered in your system,
given who can reach it.

| Likelihood | Meaning |
|---|---|
| High | Reachable by anyone on the internet or any signed-in user, simple to trigger |
| Medium | Needs a specific role, some knowledge, or an uncommon condition |
| Low | Needs privileged access, insider position, or an unlikely chain |

Impact: what happens to users and the business.

| Impact | Meaning |
|---|---|
| High | Cross-tenant data exposure, account takeover, payment fraud, remote code execution, loss of regulated data |
| Medium | Limited data exposure, one-user impact, partial outage |
| Low | Information leak with little value, hardening gap with no direct exploit path |

|  | Impact Low | Impact Medium | Impact High |
|---|---|---|---|
| **Likelihood High** | Medium | High | Critical |
| **Likelihood Medium** | Low | Medium | High |
| **Likelihood Low** | Info / Low | Low | Medium |

When CVSS and the matrix disagree by more than one level, write one sentence
explaining why. That sentence is usually the most useful line in the finding.

## SLA targets

Starting points. Adjust to the customer contract or policy if stricter.

| Severity | Fix or mitigate within | Notes |
|---|---|---|
| Critical | 24–72 hours (mitigate within 24h) | Stop-the-line. A leaked live secret is always Critical: rotate immediately |
| High | 7–14 days | |
| Medium | 30–60 days | |
| Low | 90 days or next planned hardening | |
| Info | No SLA | Track as backlog |

The clock starts at confirmation, not at the report date. A mitigation (a
feature flag off, a WAF rule, a revoked token) can stop the clock for the
Critical window, but the finding stays open until the real fix is verified.
Risk acceptance needs a named owner, a reason, and an expiry date.
