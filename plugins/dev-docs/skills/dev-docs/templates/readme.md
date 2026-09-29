<!--
Template: Repository README
Basis: common open-source README practice (for example the sections
suggested by GitHub's documentation and the "Standard Readme" convention).
No formal standard.
Use when: every repository, at the root. The README answers: what is this,
how do I run it, how do I use it, where do I go next.
Rule: a new person must get from clone to running using only these steps, on
a clean machine. Test that. Link out for anything long; the README is an
entry point, not the whole manual.
Lives at: README.md in the repo root.
Remove this comment in the finished document. Delete sections that do not
apply rather than leaving them empty.
-->

# <Project name>

<One sentence: what it is and who it is for.>

<Badges, optional: CI status, latest version, licence. Only badges that
carry information.>

## Overview

<One short paragraph: the problem it solves and the main capabilities. If
the project has a screenshot or a diagram that explains it faster, add it
here with alt text.>

## Status

<Maturity: experimental, beta, stable, maintenance-only, deprecated. What
is supported.>

## Quick start

```bash
git clone <repo url>
cd <repo>
<install command>
<command to run>
```

<What you should see when it works: a URL, an output line.>

## Requirements

| Tool | Version | Notes |
|---|---|---|
| <Node.js> | <22.x> | <use the version in .nvmrc> |
| <Docker> | <24+> | <for the local database> |

## Installation

<Full steps, if the quick start is not enough: environment variables,
local services, seed data.>

### Configuration

| Variable | Required | Default | Description |
|---|---|---|---|
| `<DATABASE_URL>` | Yes | | <connection string for the local database> |

<Point to `.env.example`. Never put real secrets in the README.>

## Usage

<The two or three most common tasks, with commands or code examples.>

## Development

| Task | Command |
|---|---|
| Run in dev mode | `<command>` |
| Run tests | `<command>` |
| Lint and format | `<command>` |
| Build | `<command>` |

### Project structure

```
<top-level folders and one line each>
```

## Documentation

- <Architecture: docs/architecture/>
- <Decisions: docs/adr/>
- <API reference: link>
- <Runbooks: docs/operations/runbooks/>

## Deployment

<How and where it is deployed, or a link to the deployment docs.>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Please follow the
[code of conduct](CODE_OF_CONDUCT.md).

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md). Do not open a
public issue.

## Support

<Where to ask questions: issues, discussions, chat channel, email.>

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Licence

<Licence name>. See [LICENSE](LICENSE).

## Acknowledgements

<Optional.>
