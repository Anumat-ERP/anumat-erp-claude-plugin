# Which framework when

Pick one primary framework for the audit and at most two supporting ones.
Record the choice and the reason in the audit plan. More frameworks means more
mapping and less reviewing.

## Decision table

| Situation | Primary | Supporting | Why |
|---|---|---|---|
| Startup MVP, pre-revenue, no sensitive data | ASVS L1 | OWASP Top 10 | L1 covers the common, easily found attacks; the Top 10 frames the report for non-specialists |
| B2B SaaS handling PII or customer data | ASVS L2 | SOC 2 readiness mapping | L2 is the expected bar for customer data; SOC 2 is what customers will ask for |
| Multi-tenant SaaS | ASVS L2 | API Top 10, STRIDE | Tenant isolation (IDOR, BOLA) is the highest-impact failure; model it explicitly |
| Public or partner API | API Top 10 (2023) | ASVS L2 API chapter | The API list targets object- and property-level authorisation directly |
| Mobile app | MASVS (L1 or L2 profile) | API Top 10 for its backend | Most serious mobile issues are backend authorisation failures |
| Payments, health, auth provider, high-value target | ASVS L3 for the critical component, L2 elsewhere | STRIDE, CWE Top 25 | High assurance where harm is severe; threat model drives depth |
| Selling to enterprises, questionnaires arriving | ASVS L2 | SOC 2 or ISO 27001 mapping | Answers questionnaires with evidence rather than claims |
| Selling to US federal agencies | NIST SSDF | SLSA, ASVS L2 | Federal buyers ask suppliers to attest to SSDF practices |
| Open-source library or package | SLSA Build L2+ | SSDF PS/RV, CWE Top 25 | Consumers need provenance; the risk is a compromised release |
| Infrastructure / cloud estate review | CIS Controls v8 (IG1 first) | NIST CSF 2.0 | Prioritised operational controls; CSF for the board view |
| "How mature is our security programme?" | NIST CSF 2.0 | CIS IG1 | Organisation-level outcomes, not a code review |
| App with LLM features | ASVS at the app's level | OWASP Top 10 for LLM Applications, STRIDE | Prompt injection and output handling are new trust boundaries |
| Pre-release review of one feature or PR | Relevant checklist only | CWE for labels | A full framework walk is overkill for one change |

## References

| Framework | File |
|---|---|
| ASVS | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-asvs.md` |
| Top 10 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-top10.md` |
| API Top 10 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-api-top10.md` |
| MASVS | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-masvs.md` |
| CWE Top 25 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/cwe-top25.md` |
| NIST CSF | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/nist-csf.md` |
| NIST SSDF | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/nist-ssdf.md` |
| CIS Controls | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/cis-controls.md` |
| SLSA | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/slsa.md` |
| STRIDE | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/stride.md` |
| LLM | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-llm.md` |
| SOC 2 / ISO 27001 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/compliance-mapping.md` |

## Rules

- A level is a claim. Do not say "ASVS L2" in a report unless every L2
  requirement in scope was checked and the result recorded.
- If the user names a framework their customer requires, that wins over this
  table.
- If no row fits, say so, pick the nearest, and name the gap.
