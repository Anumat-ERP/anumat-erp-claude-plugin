<!--
Template: CONTRIBUTING.md
Basis: GitHub community health file conventions (GitHub shows this file when
someone opens an issue or pull request). No formal standard.
Use when: anyone other than the author will send changes: open source, or
an internal repo with several teams.
Lives at: CONTRIBUTING.md in the root, or .github/CONTRIBUTING.md
Remove this comment in the finished document.
-->

# Contributing to <project name>

Thank you for helping. This guide explains how to propose a change and what
we check before merging it.

By taking part you agree to follow our [code of conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug:** open an issue with the bug report form.
- **Suggest a feature:** open an issue with the feature request form. For
  large changes, discuss in an issue before writing code.
- **Improve docs:** docs changes are welcome and follow the same process.
- **Fix an issue:** issues labelled `good first issue` are a good start.
  Comment on the issue so others know you are working on it.

**Security issues** go through [SECURITY.md](SECURITY.md), never a public issue.

## Set up your environment

```bash
git clone <repo url>
cd <repo>
<install command>
<command to verify setup, e.g. run tests>
```

See the [README](README.md) for requirements.

## Make a change

1. Create a branch from `<main>`: `<type>/<short-description>`, for example
   `fix/order-total-rounding`.
2. Make the change, with tests.
3. Run the checks locally:

   ```bash
   <lint command>
   <test command>
   ```

4. Update documentation affected by the change, and add an entry to the
   `Unreleased` section of [CHANGELOG.md](CHANGELOG.md) if users will notice.
5. Commit using <Conventional Commits / the project's convention>:

   ```
   fix(orders): round totals to currency minor unit

   Closes #123
   ```

6. Open a pull request and fill in the template.

## Pull request expectations

- One logical change per pull request. Keep it small enough to review in
  under 30 minutes where possible.
- CI must pass.
- At least <one> approving review from a maintainer <or CODEOWNER>.
- Architecture decisions get an ADR in `docs/adr/`.
- Reviewers aim to respond within <2 working days>.

## Coding standards

<Language style, formatter, lint rules, naming, test conventions. Link to
config files rather than restating them.>

## Documentation standards

Docs live in `docs/` and change in the same PR as the code. Markdown is
linted with markdownlint. <Vale if configured.>

## Releases

<Who releases, how often, and how versions are chosen (SemVer).>

## Getting help

<Where to ask: discussions, chat channel, maintainers' handles.>

## Licence

By contributing, you agree that your contributions are licensed under the
<licence name> licence of this project. <If a CLA or DCO sign-off is
required, say so and explain how.>
