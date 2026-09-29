<!--
Template: Definition of Done
Basis: the Definition of Done concept in the Scrum Guide (2020): the shared
quality bar every increment meets. Guidance is in
${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/quality-gates.md.
Use when: agreeing when work counts as finished. Applies to every item;
acceptance criteria are per story and separate.
Rules: each item checkable; work that does not meet it is not done and not
shown as done; raise the bar over time, never lower it at sprint end.
Remove this comment in the finished document.
-->

# Definition of Done: <Team or product>

| Field | Value |
|---|---|
| Team / product | <name> |
| Agreed on | <YYYY-MM-DD> |
| Review | <every N retrospectives / quarterly> |
| Where it is enforced | <transition to Done; PR template; release checklist> |

## Story (and task) done

- [ ] Acceptance criteria pass.
- [ ] Code reviewed by at least <one> other person and merged to <main>.
- [ ] Automated tests added or updated; the pipeline is green.
- [ ] No new high or critical findings from linting or security scans.
- [ ] Deployed to <staging / production behind a flag>.
- [ ] Product owner has seen it working.
- [ ] User-facing docs, help text or release notes updated if behaviour changed.
- [ ] <Analytics or monitoring added where the story has a success measure.>
- [ ] <team-specific item>

## Epic done

- [ ] All in-scope stories are done.
- [ ] The success measure is instrumented and first reading recorded.
- [ ] Remaining ideas are logged as new items; the epic is closed.

## Release done

- [ ] <Release notes published.>
- [ ] <Support team briefed.>
- [ ] <Rollback tested or documented.>

## Not yet in our DoD (aim to add)

<Items the team wants but cannot yet meet, e.g. "automated accessibility
checks". Move them up when possible.>
