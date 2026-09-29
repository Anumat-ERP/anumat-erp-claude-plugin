<!--
Template: Pull request template
Basis: GitHub pull request template convention. GitLab uses the same idea
with merge request templates.
Use when: setting up a repository, so every PR description answers the
same questions.
Lives at: .github/pull_request_template.md (GitHub), or
.gitlab/merge_request_templates/Default.md (GitLab).
Keep it short. A long template gets deleted rather than filled in.
Copy everything below the line into the file; the HTML comments inside it
are guidance for PR authors and stay hidden when the PR renders.
Remove this header comment in the finished file.
-->

---

## What

<!-- One or two sentences: what this PR changes. -->

## Why

<!-- The problem it solves. Link the issue: "Closes #123". -->

## How

<!-- Approach, and anything a reviewer should look at first. Delete if obvious from the diff. -->

## Testing

<!-- How you checked it works: tests added, manual steps, screenshots for UI changes. -->

## Risk and rollback

<!-- What could break, and how to undo it. "Low: revert the commit" is a valid answer. -->

## Checklist

- [ ] Tests added or updated, and passing
- [ ] Docs updated (README, `docs/`, API spec) if behaviour changed
- [ ] CHANGELOG `Unreleased` entry added if users will notice
- [ ] ADR added if this makes an architecture decision
- [ ] No secrets, credentials, or personal data in the diff
- [ ] Migrations are backward compatible, or the release plan covers them
