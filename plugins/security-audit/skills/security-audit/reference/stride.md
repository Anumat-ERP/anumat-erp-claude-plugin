# STRIDE threat modelling

Sources:
- Microsoft threat modelling overview: https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats
- OWASP Threat Modeling Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html

STRIDE is a checklist of six threat types, each the opposite of a security
property. Apply it to each element of a data-flow diagram to find design
flaws that no scanner will report.

| Threat | Violates | Question | Typical control |
|---|---|---|---|
| **S**poofing | Authentication | Can someone pretend to be another user or service? | Strong auth, MFA, mutual TLS, signed webhooks |
| **T**ampering | Integrity | Can data or code be changed in transit or at rest? | TLS, signatures, integrity checks, access control on writes |
| **R**epudiation | Non-repudiation | Can someone deny doing something, with no record to disprove it? | Audit logs with actor, time, action, and target, stored out of reach of the actor |
| **I**nformation disclosure | Confidentiality | Can data reach someone who should not see it? | Authorisation, encryption, minimal responses, safe errors |
| **D**enial of service | Availability | Can someone exhaust a resource or block others? | Rate limits, quotas, timeouts, size limits |
| **E**levation of privilege | Authorisation | Can someone gain rights they were not given? | Server-side checks on every request, least privilege |

## Method: four questions

1. **What are we building?** Draw the data-flow diagram: external actors,
   processes, data stores, data flows, and trust boundaries (where the level
   of trust changes: browser to API, API to database, your service to a
   third party).
2. **What can go wrong?** For each element crossing a trust boundary, walk
   the six STRIDE letters. Processes can suffer all six; data stores mainly
   T, R, I, D; data flows mainly T, I, D; external actors mainly S and R.
3. **What are we doing about it?** For each threat: mitigate, accept (with an
   owner), transfer, or eliminate the feature.
4. **Did we do a good job?** Review the model with someone who did not write
   it, and revisit it when the architecture changes.

## Output

Use `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/threat-model.md`.
Unmitigated threats that are real today become findings in the register.
Design-level threats map to OWASP Top 10 A04 (Insecure Design).

For LLM features, add the threats in
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-llm.md`:
the model is a process whose input includes untrusted text.
