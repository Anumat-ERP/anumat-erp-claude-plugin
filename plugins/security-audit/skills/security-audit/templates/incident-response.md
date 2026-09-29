# Incident response plan: <organisation / system>

Owner: <name> · Last reviewed: <date> · Last exercised (tabletop): <date>

Keep this short enough to read during an incident. Detailed runbooks link
from section 7.

## 1. Roles

| Role | Primary | Backup | Responsibility |
|---|---|---|---|
| Incident lead | | | Runs the response, makes the calls, owns the timeline |
| Technical lead | | | Investigation and containment |
| Communications | | | Customers, status page, internal updates |
| Legal / privacy | | | Regulatory and contractual notification decisions |
| Scribe | | | Timestamped log of actions and decisions |

## 2. Severity levels

| Level | Examples | Response |
|---|---|---|
| SEV1 | Confirmed breach of customer data, active compromise, leaked production secret in public | All hands, immediately; leadership informed within 1 hour |
| SEV2 | Suspected compromise, critical vulnerability exposed on the internet | Lead + technical within business day or on-call |
| SEV3 | Contained issue, no evidence of data access | Normal working hours |

## 3. Phases

1. **Detect and report.** Anyone can declare an incident in <channel> or by
   calling <number>. When in doubt, declare.
2. **Triage.** Assign a lead and a severity. Open the incident log.
3. **Contain.** Stop the harm: revoke tokens, rotate secrets, disable the
   feature, block the source. Preserve evidence before wiping anything
   (snapshots, logs).
4. **Investigate.** What happened, when, what data and which customers were
   affected. Work from logs; write down every finding with a timestamp.
5. **Eradicate and recover.** Remove the cause, fix the vulnerability with a
   test, restore from known-good state, monitor for recurrence.
6. **Notify.** Legal/privacy decides on notification to regulators (for
   example GDPR's 72-hour rule), customers, and partners per contract.
7. **Review.** Blameless post-incident review within <5 business days>.
   Actions go into the findings register with owners and due dates.

## 4. Contacts

| Who | How |
|---|---|
| Cloud provider support | |
| Hosting / edge provider | |
| Legal counsel | |
| Cyber insurance | |
| Law enforcement (if needed) | |

## 5. Evidence handling

- Snapshot affected systems before changing them where possible.
- Export relevant logs to a restricted location; record hashes.
- Record who accessed evidence and when.

## 6. Communication templates

- Internal status update: <what we know, what we are doing, next update at>
- Customer notice: <what happened, what data, what we have done, what they
  should do, contact>

## 7. Runbooks

| Scenario | Runbook link |
|---|---|
| Leaked secret or API key | <rotate at provider → redeploy → scan history → purge → verify> |
| Compromised staff account | |
| Cross-tenant data exposure | |
| Malicious dependency | <SBOM lookup, pin to safe version, rotate secrets CI could reach> |
| Ransomware / destructive attack | |

## 8. Exercises

Run a tabletop at least yearly. Record the date, scenario, gaps found, and
actions.
