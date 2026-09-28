# @repo/module-\_\_MODULE_NAME\_\_

__MODULE_SUMMARY__

A **module** is a business capability. It is not a folder of related files — it
declares what it depends on, what permissions it defines, and what navigation
it contributes, so apps compose it rather than importing into it.

## Layers, and the rule for each

```
domain/          business rules, pure TypeScript. No React, no fetch, no DB.
application/     use cases + the ports they need. Orchestration, no rules.
infrastructure/  adapters implementing those ports. The only layer that knows
                 the API exists.
ui/              components and route fragments this module contributes.
security/        the permissions this module defines.
data/            migrations for the schema this module owns.
index.ts         the public surface — the only legal import path.
module.config.ts the manifest.
```

**Dependencies point one way:** `ui → application → domain`, and
`infrastructure → application` (it implements a port the application layer
declares). Nothing points back. `domain/` imports nothing from this module.

The payoff is concrete: domain rules test in milliseconds without a DOM,
swapping the transport touches one file, and the same rule answers the same
way whether it is called from a page, a route handler, or a background job.

## Import rules

```ts
// Correct — the public surface
import { archiveRecord } from '@repo/module-__MODULE_NAME__';

// Wrong — a deep import freezes this module's internals
import { transition } from '@repo/module-__MODULE_NAME__/domain/__MODULE_NAME__';
```

Cross-module dependencies must also be declared in `depends` in
`module.config.ts`. An import without a declaration is the case the tooling
can catch, and the one that quietly creates a cycle.

## Adding to this module

- A new business rule → `domain/`, with a test that does not touch the DOM.
- A new operation → `application/`, as a use case taking `ModuleContext`.
- A new external call → a port in `application/ports.ts`, an adapter in
  `infrastructure/`.
- A new screen → `ui/routes/`; shared pieces to `ui/components/`.
- A new permission → `security/permissions.ts` **and** the manifest.

If something is needed by two modules, it does not belong to either: move it
to `packages/`, which holds technical capability with no business knowledge.
