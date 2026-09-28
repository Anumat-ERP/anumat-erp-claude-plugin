# Conventions

*Read this for naming, versioning, ports, and what belongs in `docs/`.*

## Naming

| Thing | Convention | Example |
|---|---|---|
| Internal package | `@repo/<name>` | `@repo/logger` |
| Module package | `@repo/module-<name>` | `@repo/module-inventory` |
| App | bare name, kebab-case | `admin` |
| Directory | kebab-case | `stock-control` |
| Permission | `<module>:<action>` | `inventory:write` |

A module's name becomes a directory, a package name, a permission prefix and a
route segment. `add-module` enforces lowercase kebab-case so there is exactly
one spelling rather than four that drift.

`@repo/` scoping prevents collisions with registry packages and makes an
internal import obvious on sight.

## Versioning

Everything is `private: true` with version `0.0.0` until something is actually
published. Maintaining per-package versions nobody consumes is bookkeeping
with no reader — the git SHA is the version of a private monorepo.

Start versioning a package the day it is published, not before.

## Ports

Apps take sequential dev ports from 3000. `add-app` allocates the lowest free
one by reading every existing `dev` script, filling gaps before extending.

Record the allocation in `docs/standards/` past about three apps, so someone
adding one by hand does not have to grep. `/monorepo-stack:audit` reports
collisions as critical, because the symptom — the second app appearing to
start and serving the first one's pages — is confusing enough to lose real
time to.

## Commits and branches

Conventional Commits, scoped to the workspace member:

```
feat(module-inventory): reserve stock on order confirmation
fix(ui): keep button size stable while loading
chore(deps): bump vitest to 3.2.4
```

The scope is what makes a monorepo history readable — without it, `git log`
is a single undifferentiated stream across a dozen packages.

Branch names carry the same scope: `feat/module-inventory-reservations`.

A pull request should be reviewable in one sitting. In a monorepo the
temptation is to touch six packages at once because you can; the cost lands on
the reviewer, who now needs context on all six.

## Per-app agent files

Each app gets a `CLAUDE.md`: what the app is, its port, where code goes,
how shared code is imported.

Keep it short. Its value is being present in context when something is edited,
not being comprehensive — and a long one does not get read, by a person or a
model. If it grows past a screen, the detail belongs in `docs/`.

## What goes in `docs/`

```
docs/
├── adr/           decisions that constrain what others can do
├── architecture/  how the pieces fit, and the dependency rules
├── standards/     conventions not enforced by tooling
└── security/      threat model, secret handling, review requirements
```

**ADRs are the important one.** An architecturally significant decision —
hard to reverse, or constraining others — gets a short record: the context,
the decision, and the alternatives rejected and why.

The rejected alternatives are the part that matters. A decision without them
is an assertion, and nobody can later tell whether the tradeoff still holds or
whether the situation that justified it has gone.

ADRs are immutable. Superseding one means writing a new ADR referencing it,
not editing the original — the record of what the team used to believe is part
of the value.

## Standards are enforced by tooling where possible

A standard that exists only in a document is followed until the first
deadline. Formatting goes in Prettier, import rules and architectural
constraints go in ESLint, structural rules go in the audit.

Write it down only where it cannot be checked — and treat anything written
down and repeatedly violated as a candidate for automation rather than for a
reminder.

## Common failures

- **Per-package versions on private packages.** Bookkeeping with no reader.
- **Unscoped commit messages.** History becomes unreadable at a dozen
  packages.
- **A pull request touching six packages.** The cost lands on the reviewer.
- **Four spellings of one module name.** Directory, package, permission and
  route drift apart.
- **A long per-app `CLAUDE.md`.** Not read, by anyone.
- **ADRs without rejected alternatives.** Assertions, not decisions.
- **Edited ADRs.** Destroys the record of what changed and when.
- **Standards documented but not enforced.** Followed until the first
  deadline.
- **Unrecorded port allocation.** Collisions found by running two apps.
