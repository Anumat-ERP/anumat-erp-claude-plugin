# Security review checklist for pull requests

Copy into `.github/pull_request_template.md` or use as a reviewer guide.
Tick what applies; write "n/a" with a word of reason for the rest.

```markdown
## Security checklist

**Access**
- [ ] New or changed endpoints/server actions check authentication and
      authorisation on the server
- [ ] Records loaded by ID are checked for ownership / tenant
- [ ] Responses return only allowed fields; updates accept only allowed fields

**Input and output**
- [ ] External input validated with a schema at the boundary
- [ ] No string-built SQL, shell commands, or `eval`
- [ ] No new `dangerouslySetInnerHTML` / `innerHTML` without sanitising
- [ ] User-supplied URLs fetched server-side are checked against SSRF rules
- [ ] File uploads: size, type, storage location, and download authorisation

**Secrets and config**
- [ ] No secrets, tokens, or real customer data in code, tests, fixtures, or logs
- [ ] New env vars added to the example file (names only) and the secret store
- [ ] Only public values use a client-exposed prefix

**Dependencies and CI**
- [ ] New dependencies are maintained, needed, and scanned clean
- [ ] Workflow changes: actions pinned to SHA, minimal `permissions:`

**Data**
- [ ] Migrations reviewed for data exposure and reversibility
- [ ] Personal data: minimised, logged nowhere it should not be

**Tests**
- [ ] Security-relevant behaviour has a test (including a denied case)
- [ ] No existing test weakened or skipped

**Needs security review?** <yes/no: auth, crypto, payments, tenancy, file
handling, LLM tool use>
```

Full checklists behind each line:
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-identity.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-input.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-platform.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-cloud-cicd.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-llm.md`
