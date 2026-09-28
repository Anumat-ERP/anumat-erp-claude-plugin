# Modules

*Read this when adding a business capability, or deciding whether something is
a module or a package.*

## What a module is

A **business capability**: inventory, billing, CRM, scheduling, payroll. It
knows what your domain objects are.

The idea is Odoo's, and it is a good one: the unit of modularity is the
business capability, not the technical layer. An Odoo module ships its own
models, views, security rules and menu entries, and declares what it depends
on — so an installation is a composition of capabilities rather than a
monolith with folders.

What makes it a module rather than a directory is the **manifest**. Without
one you have grouped some files; with one, something can discover what the
capability needs, what it offers, and where it belongs.

## The three layers, and the rule

```
apps/       deployable. Compose modules; own routing, layout, data loading.
modules/    business capability. Own domain rules, permissions, data.
packages/   technical capability. No business knowledge.
```

**Dependencies point one way: `apps → modules → packages`.** A package that
knows what an invoice is has become a module. A module importing from an app
has inverted the dependency and can never be reused. Nothing points back.

Module → module is allowed, and must be **declared** in `depends`.

## Deciding: module or package?

Ask what breaks if the business changes.

- A date formatter does not care that you sell furniture. → **package**
- A stock-reservation rule is meaningless without the business. → **module**

If you cannot answer, ask whether the thing has *policy* in it. Policy —
rules that could plausibly be decided differently by a different company — is
business. Mechanism is technical.

## Internal layers

```
domain/          business rules, pure TypeScript
application/     use cases + the ports they need
infrastructure/  adapters implementing those ports
ui/              components and route fragments
security/        permissions this module defines
data/            migrations for the schema it owns
index.ts         the only legal import path
module.config.ts the manifest
```

**`domain/` imports nothing from the rest of the module.** No React, no fetch,
no database driver. That is not purism; it is what makes those rules testable
in milliseconds, callable identically from a page, a route handler and a
background job, and readable by someone who does not know the framework.

The test: if a rule needs the network to run, it is not a domain rule. Move it
to `application/` and give it a port.

**Ports are defined by the module, implemented by infrastructure.** The
direction is what matters — the module never imports a concrete client, and a
test supplies an in-memory double directly with no mocking framework.

## The manifest

```ts
export const manifest: ModuleManifest = {
  name: 'inventory',
  depends: ['catalog'],
  permissions: ['inventory:read', 'inventory:write'],
  navigation: [{ id: 'inventory', label: 'Inventory', path: '/inventory',
                 requires: 'inventory:read' }],
  enabledByDefault: false,
};
```

**`depends` is load-bearing.** Load order derives from it, cycles are detected
from it by name rather than as a stack overflow, and an import without a
declaration is a bug tooling can catch. `/monorepo-stack:audit` reports a
`depends` entry that is not installed.

**Permissions live with the module** because only the module knows what
actions exist on its capability. A central permission list in a repo with
twenty modules goes stale at the first change nobody propagates — and stale
permissions fail open far more often than closed.

**Navigation is contributed, not hardcoded.** The app composes entries from
manifests and filters by permission, so adding a module does not mean editing
a menu somewhere else. Entries the viewer cannot use are removed rather than
disabled: a menu is a map of where you can go.

`enabledByDefault: false` lets half-built work merge without being reachable.

## The public surface

`index.ts` is the only legal import path.

```ts
import { archiveRecord } from '@repo/module-inventory';              // yes
import { transition } from '@repo/module-inventory/domain/record';   // no
```

A deep import freezes the other module's internals: it can no longer move a
file without breaking a consumer it does not know about. One deep import turns
a module back into a folder.

Export use cases, domain types, ports, the manifest and the UI entry points.
Do **not** export repositories or anything under `infrastructure/` — those are
the parts you want to be able to replace.

`./ui` is a separate entry point so a route handler or a job can use the
module's logic without pulling React into its bundle.

## Composing modules in an app

1. Add `"@repo/module-<name>": "workspace:*"`.
2. Register the manifest with `@repo/module-kit` — `resolveOrder` gives load
   order and names any cycle, `collectPermissions` gives the full permission
   set, `collectNavigation` gives the menu for the current viewer.
3. Provide a `ModuleContext`: the repository implementations and a `can()`.

The app decides *which* modules exist and *what* backs their ports. The module
decides what it does.

## When a module is too big

Split when two parts have different reasons to change, or when the manifest's
`permissions` list stops reading as one capability. `sales` that has grown
quoting, invoicing and dunning is three capabilities sharing a directory.

Do not split by layer. `inventory-domain` and `inventory-ui` as separate
modules gives you two things that must always change together and can never be
installed apart — all the cost of a boundary with none of the benefit.

## Common failures

- **Business logic in `packages/`.** Cannot declare dependencies, permissions
  or navigation; cannot be composed.
- **Deep imports across modules.** Freezes internals; the boundary stops
  existing.
- **Importing another module without declaring it.** How cycles appear.
- **`domain/` importing React or a fetch client.** Loses fast tests and
  reuse outside the UI.
- **Permissions in a central file.** Goes stale; stale permissions fail open.
- **Hardcoded navigation.** Adding a module means editing an unrelated file.
- **Splitting by layer instead of capability.** Two things that always change
  together.
- **A module named after a screen or a technology.** Won't hold a boundary;
  name it after the capability.
