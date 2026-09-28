# api-stack — Design Spec

**Date:** 2026-09-28
**Status:** Awaiting review
**Repo:** `E:\Chamrong\Project\claude-plugins` (marketplace `chamrong`), plugin #4
**Branch:** `docs/stack-plugin-specs` from `b6a7592`
**Sibling spec:** `2026-09-28-docs-stack-design.md` — designed together, built separately

---

## 1. Purpose

Scaffold and maintain a Maven multi-module Spring Boot codebase whose bounded
contexts are strictly hexagonal, and whose layering is enforced by tests rather
than by reviewer memory.

Two halves, both required:

- **Generation** — scripts and templates that create the workspace, a bounded
  context, a use case, or an outbound adapter.
- **Conventions** — reference files explaining why each boundary exists, so
  Claude extends the codebase correctly long after the templates stopped being
  read.

Generation alone rots. A hexagonal layout survives exactly as long as someone
remembers why `application` may not import `infrastructure`; the moment that
reason lives only in the template that produced context #1, context #6 is
built by hand and the boundary is gone. The ArchUnit suite is what makes the
convention executable, and it is generated per context, not centrally, so a
context carries its own proof.

### Success criteria

1. `/api-stack:init` produces a repo where `./mvnw verify` succeeds — compile,
   unit tests, and the generated `ArchitectureTest` all green.
2. `/api-stack:add-context` adds a bounded context to that repo and `./mvnw
   verify` still succeeds, including the new context's own `ArchitectureTest`.
3. `/api-stack:add-usecase` and `/api-stack:add-adapter` produce code that
   compiles and whose generated tests pass, with no manual wiring step.
4. `/api-stack:audit` reports real deviations on a multi-module Spring repo the
   plugin did not create, and modifies nothing.

Criterion 1 is the acceptance test and it is executed, not reasoned about.
Criteria 2 and 3 run inside the same generated repo, in sequence.

---

## 2. Non-goals

- **Not build-tool agnostic.** Maven only. Gradle is a different dependency
  model and a different multi-module story; supporting both would mean
  committing to neither.
- **Not framework agnostic.** Spring Boot, committed. An init command that
  refuses to choose a framework is worthless.
- **Not a CRUD generator.** It generates *structure* — layers, ports, adapters,
  tests. It does not derive endpoints, DTOs, or repositories from an entity.
  Generated business logic is a `TODO` with a passing test around it.
- **Not a migration tool.** Brownfield commands (`add-*`, `audit`) work on a
  repo that already exists; converting a layered codebase into a hexagonal one
  does not happen automatically.
- **Not deployment.** No Dockerfile, Compose, bake file, or CI pipeline in v1.
  The reference repo has all four and every one is product-specific.
- **No project-specific content.** Generic. Banned substrings, case-insensitive:
  `fueni`, `nazounki`. The reference repo informed the conventions; its names,
  its module names, and its `com.*` group id appear nowhere in this plugin.

---

## 3. The stack, pinned

| Layer | Choice | Why this and not the alternative |
|---|---|---|
| Build | Maven 3.9 + wrapper | The wrapper is added deliberately: without one the build depends on whatever Maven the machine happens to have, and the reference repo has no wrapper — a gap worth closing, not copying |
| Language | Java 21 | Records for DTOs and sealed types for domain results are load-bearing in this layout, not decoration |
| Framework | Spring Boot 4.0.8 | — |
| Cloud | Spring Cloud 2025.1.3 | The train that matches Boot 4.x. 2025.0.x is Boot 3.5 and silently mismatches |
| Mapping | MapStruct 1.6.3 | Compile-time mappers. Reflection-based mapping hides layer-crossing behind a config object that no architecture test can see |
| Boilerplate | Lombok 1.18.36, `optional` | Deliberately restricted in `domain` — see §5 |
| Architecture tests | ArchUnit 1.3.0 | The reason the layering survives contact with a deadline |
| Integration tests | Testcontainers 1.20.4 | A real Postgres. An in-memory substitute tests the substitute |
| API docs | springdoc 3.1.1 | — |

Versions are pinned in templates and managed centrally in the root pom's
`dependencyManagement`. **Module poms declare no versions** — this is a rule
`audit` checks, because a version in a module pom is how a multi-module build
starts shipping two Jackson releases.

### Boot 4 renames, which are a real trap

Boot 4 split the starters, and the old names fail in ways that look like
unrelated bugs. Templates use, and `reference/` documents:

| Boot 4 | Not |
|---|---|
| `spring-boot-starter-webmvc` | `spring-boot-starter-web` |
| `spring-boot-starter-webmvc-test` | `spring-boot-starter-test` alone for slices |
| `spring-boot-starter-data-jpa-test` | — |
| `spring-boot-starter-security-test` | — the one that puts `SecurityAutoConfiguration` into a `@WebMvcTest` slice. Without it, either no `HttpSecurity` bean exists or nothing enforces the chain that does |

That last row is the difference between a security test that passes because
security works and one that passes because security is absent.

---

## 4. Repository layout

Three tiers, because grouping bounded contexts under an aggregator is what
keeps a root pom readable past roughly six contexts.

```
<repo>/
├── pom.xml                  root aggregator · packaging=pom · dependencyManagement
├── mvnw · mvnw.cmd · .mvn/  wrapper
├── docs/
│   └── adr/0001-record-architecture-decisions.md
├── shared/
│   ├── common/              cross-cutting: error codes, result types, job queue
│   └── auth-context/        the authenticated-subject contract
├── platform/
│   ├── pom.xml              aggregator for bounded contexts
│   └── <context>/           one bounded context — shape below
└── app/                     the runnable @SpringBootApplication that composes all
```

`shared/` holds technical capability with no business meaning. `platform/*`
holds business capability. `app/` holds no logic at all — it wires and starts.
Dependencies point one way: `app` → `platform/*` → `shared/*`.

### Generated bounded context shape

```
platform/<context>/
├── pom.xml                                  compact · no versions
├── docs/
│   ├── architecture.md                      9 sections, templated
│   └── diagrams/module-architecture.puml
└── src/
    ├── main/java/<group>/<context>/
    │   ├── api/rest/v1/{,dto/}               inbound adapter — transport only
    │   ├── application/
    │   │   ├── usecase/                      the behaviour
    │   │   └── dto/{command,query,result}/
    │   ├── domain/
    │   │   ├── model/                        aggregates, value objects
    │   │   ├── event/
    │   │   └── port/{in,out}/                interfaces only
    │   └── infrastructure/
    │       └── persistence/{adapter,entity,repository}/
    └── test/java/<group>/<context>/
        ├── architecture/<Context>ArchitectureTest.java
        ├── application/usecase/
        └── domain/model/
```

The `entity` / `model` split is not duplication for its own sake: the JPA
entity is an infrastructure detail with an identity lifecycle, the aggregate is
a domain object with invariants. Collapsing them is what drags
`jakarta.persistence` into `domain` and breaks rule 1.

---

## 5. The rules

Six ArchUnit rules, generated into every context:

| Rule | Forbids |
|---|---|
| `domainMustBePureJava` | Spring stereotype/web/security/session, `jakarta.servlet`, `jakarta.persistence`, Hibernate anywhere in `..domain..` |
| `applicationMustNotUseInfrastructureOrWeb` | `..application..` importing `..infrastructure..`, Spring web/security/session, servlet |
| `controllersMustOnlyCallUseCasePorts` | Controllers depending on anything but `api.rest`, `domain.port.in`, `domain.model`, `application.dto`, shared modules, and framework packages |
| `transactionsMustNotLiveInAdapters` | `@Transactional` on any method in `..infrastructure..` — the boundary belongs to the use case |
| `portsMustBeInterfaces` | A top-level `*Repository` or `*Port` in `domain.port` that is not an interface |
| `domainMustNotImportLombokExceptGetter` | Heavy Lombok in `domain.model`, where generated `equals`/`builder` quietly break invariants |

### The carve-out convention

A rule that gets weakened to accommodate one legacy class protects nothing.
The convention, carried from the reference repo and documented in
`reference/04-archunit.md`: an exemption is a **narrow, named, Javadoc'd
carve-out on the rule** — `resideOutsideOfPackage("..domain.collision..")` —
stating what is exempt and why. Intent is to catch new violations, not to force
an unplanned refactor of working code.

`audit` reports carve-outs it finds. It never adds one.

### Two rules ArchUnit cannot see

Checked by `audit` instead, because both are pom-level and cross-module:

- **A context depends on another context's `port/in` only**, bridged through a
  local `port/out` adapter. Reaching into a sibling's `application` or
  `infrastructure` is the failure this prevents.
- **No dependency cycles between contexts.** Maven will build a cycle happily
  until it cannot.

Both are conventions in the reference repo today, enforced only by pom comments
and review. `audit` makes them mechanical.

---

## 6. Commands

| Command | Does | Existing repo |
|---|---|---|
| `/api-stack:init <dir> --group <g> --name <n>` | The layout in §4: root + wrapper + `shared/*` + `platform/` + one starter context + `app/` | no — refuses a non-empty directory |
| `/api-stack:add-context <name>` | A full bounded context: pom, all layer packages, `ArchitectureTest`, `docs/architecture.md`, `.puml`. Registers it in the aggregator and in `app/` | yes |
| `/api-stack:add-usecase <context> <name> --kind command\|query` | DTO + `port/in` + use case + unit test. The daily operation, and where drift starts | yes |
| `/api-stack:add-adapter <context> <name> --kind persistence\|http\|cache` | `port/out` + adapter, and for persistence the entity/repository pair | yes |
| `/api-stack:audit` | Read-only drift report. Never writes | yes |

`init` refuses a non-empty directory and there is no `--force`. Commands that
edit an existing pom do so by targeted insertion, never by rewriting the file,
so hand-written comments and formatting survive.

---

## 7. The skill

`skills/api-stack/SKILL.md` carries the layout, the layer test, the command
table, the boundary statement, and a "when not to use this skill" section —
feature work inside a context that already exists is ordinary development.

### Reference files

| Read this when | File |
|---|---|
| Setting up the repo, aggregators, or `dependencyManagement` | `01-layout.md` |
| Placing a class — which layer, and why that one | `02-hexagonal.md` |
| Designing a port, or naming one | `03-ports.md` |
| Writing or debugging an architecture rule; adding a carve-out | `04-archunit.md` |
| One context needing another's behaviour | `05-cross-context.md` |
| Entity vs aggregate, and where the transaction boundary sits | `06-persistence.md` |
| Deciding what to test and at which layer | `07-testing.md` |
| Naming, versioning, module docs, ADRs | `08-conventions.md` |
| Adopting any of this in a repo that already exists | `09-brownfield.md` |
| **Implementing inside a context** — records, sealed results, validation | `10-code-quality.md` |

Roughly 100 lines each, matching `monorepo-stack`.

---

## 8. Content rules

- Node `.mjs` scripts, `scripts/lib/` shared with no external dependencies,
  `scripts/test.mjs` driving `*.test.mjs`. One implementation pattern in this
  repo, not three.
- Templates are real files. Placeholders are `__CONTEXT_NAME__`-style tokens in
  both names and bodies, as `monorepo-stack/templates/module` already does.
- No network access in any script. Versions are pinned rather than resolved, so
  `init`, `add-*` and `audit` are pure filesystem operations. The generated
  build itself of course downloads dependencies — that is Maven's business, and
  it is why the acceptance check in §9 is opt-in.
- Banned substrings enforced by a test over the whole plugin directory:
  `fueni`, `nazounki`, case-insensitive.
- Every generated Java file compiles as emitted. A template that needs a manual
  edit before `javac` accepts it is a bug, not a starting point.

---

## 9. Verification

| # | Check | How |
|---|---|---|
| 1 | Template expansion, token substitution, path safety | Unit tests, fixtures, no network |
| 2 | Cycle detection and in-port-only checks | Unit tests over synthetic pom graphs, including a known cycle |
| 3 | Every audit check | Fixture repo with planted violations — one per rule |
| 4 | Pom insertion preserves comments and formatting | Golden-file tests |
| 5 | Banned substrings | Directory scan |
| 6 | **`init` then `add-context` then `add-usecase`, then `./mvnw verify`** | Acceptance script — **opt-in, skipped when Maven or a JDK is absent** |

Check 6 is the one that matters and the one that is slow. A real Spring Boot
build cannot sit in the default test run; it is a separate script, run
deliberately, and its result is reported rather than asserted in CI.

---

## 10. Open questions

1. **Command surface.** Five commands as specified. `add-adapter` is the
   most cuttable if v1 should be smaller — its output is the most mechanical
   and the easiest to write by hand from `reference/03-ports.md`.
   *Proceeding with five; flagged at design review and unanswered.*
2. **`shared/auth-context`.** Generated as a module in its own right. It may be
   better as a package inside `shared/common` until a second consumer exists.
   *Proceeding with a separate module, matching the reference repo.*
