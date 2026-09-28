# Choosing a Design System

Pick exactly one, and say in one sentence why. This is mandatory.

"Modern best practices" is not a choice; it is the absence of one, and it is
how an enterprise tool ends up shaped like a consumer app. A named system gives
you decided answers to a hundred questions you would otherwise answer
inconsistently — density, terminology, what a destructive action looks like,
how errors are worded, what a table row does on click.

**You are borrowing conventions, not visual identity.** The palette, typeface,
and character come from the `frontend-design` skill. What you take from a
design system is how things behave and what they are called.

**If the project already has a system, use it.** These profiles then serve as a
cross-check: where the house system is silent, they tell you what a mature team
decided. See `systems/STORYBOOKS.md`.

## The map

| Domain | System |
|---|---|
| Native Apple platforms | `systems/apple-hig.md` |
| Cross-platform mobile | `systems/material.md` |
| Desktop tools, productivity software | `systems/fluent.md` |
| Enterprise, data-dense applications | `systems/carbon.md` |
| SaaS admin, merchant-facing tools | `systems/polaris.md` |
| Developer tools | `systems/primer.md` |
| Project and issue tracking | `systems/atlassian.md` |
| Public services, forms, accessibility-critical | `systems/govuk.md` |

## Why each pairing holds

**Apple HIG for native Apple platforms.** Users' expectations on iOS and macOS
are set by the system apps and by every other app on the device. Deviating
costs you familiarity you did not have to pay for, and Apple's own controls
carry accessibility support you would otherwise rebuild.

**Material for cross-platform mobile.** It is the only major system designed
from the start to span platforms with one vocabulary, and its guidance on
elevation, theming, and touch is the most complete available. It is also the
default users on Android already know.

**Fluent for desktop tools.** Desktop productivity software has conventions the
web does not: higher density, command surfaces and ribbons, window chrome,
persistent panels, keyboard-first operation. Fluent is the only major system
that treats these as first-class rather than as edge cases.

**Carbon for enterprise and data-dense work.** Carbon is built around tables,
long sessions, and the density that professional users demand. Its data table
is the most thoroughly considered in any public system, and it assumes a user
who is expert in the domain and impatient with hand-holding.

**Polaris for SaaS admin and merchant tools.** Polaris is built for people
running a business inside your product: resource lists, bulk actions, settings
at scale, and content guidance written for a user who is competent but not
technical. Its writing guidelines are unusually good.

**Primer for developer tools.** Developer users expect keyboard-first
operation, dense information, code surfaces that behave correctly, and a
tolerance for complexity that would be wrong elsewhere. Primer encodes GitHub's
long experience with exactly that audience.

**Atlassian for project and issue tracking.** Deeply nested hierarchies —
portfolio, project, epic, issue, subtask — plus heavy filtering, saved views,
and cross-object linking. Atlassian has solved wayfinding through that
structure more thoroughly than anyone.

**GOV.UK for public services and anything accessibility-critical.** GOV.UK is
the most rigorously user-tested system in existence, built for a population
that includes every ability, every device, and every level of confidence. Its
form and error patterns are the best available anywhere, and worth borrowing
even when the rest of your product follows a different system.

## Tie-breakers

**Two systems apply.** Pick the one matching the user's daily environment. An
analytics tool used inside a Windows enterprise leans Fluent; the same tool
sold to startups leans Primer or Polaris. The user's surrounding software sets
their expectations more than your category does.

**The project already has a system.** Use it. Do not import a second — two
systems in one product is worse than either alone, because the user cannot
build a single model of how anything behaves.

**The product spans platforms.** Choose per surface — Apple HIG on iOS,
Material on Android, Fluent on desktop — but keep terminology, information
architecture, and content voice shared across all of them. Users tolerate
platform-appropriate controls; they do not tolerate the same thing being called
two different names.

**Nothing fits.** Default to Carbon for data-heavy work and Polaris for
task-heavy work, and say that is what you did and why. A stated imperfect
choice is reviewable; an unstated one is not.

**Forms, whatever you picked.** Borrow GOV.UK's form and error patterns
regardless of the rest. Nothing else comes close, and forms are where products
lose users. See `reference/05-forms.md`.
