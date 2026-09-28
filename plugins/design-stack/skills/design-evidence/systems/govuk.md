# GOV.UK Design System

## What it is for

Public services, forms, and anything where failure is not an option for the
user — because they have no alternative provider and the transaction matters.

It is the most rigorously user-tested design system in existence. Its patterns
have been trialled on a population spanning every ability, every device, every
level of literacy and confidence, and the research is published.

## Core conventions

- **One thing per page.** Long forms are split into short steps, each asking one
  question. This measurably reduces abandonment and makes every error trivially
  locatable. It costs more clicks, and users prefer it anyway.
- **The error summary pattern.** On failed submit: a summary at the top listing
  every error as a link to its field, *plus* inline errors at each field, with
  focus moved to the summary. This is the best-tested error pattern anywhere and
  is worth copying verbatim; see `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/05-forms.md`.
- **Labels above fields, always visible.** Never placeholders as labels.
- **Question-first pages.** The heading *is* the question, in plain language.
- **Field width signals expected input.** A postcode field is postcode-sized.
- **Plain language, ruthlessly.** Short words, short sentences, no jargon, no
  institutional voice. The style guide is as valuable as the components.
- **Progressive enhancement.** Everything works without JavaScript, on any
  device, on a bad connection. Few products need this floor, but the discipline
  produces robust interfaces regardless.
- **Accessibility as the starting requirement**, with published test results
  rather than claims.

## Where it is opinionated

Forms, error handling, language, and page structure. Extremely opinionated, and
the opinions are backed by published research — disagree only with evidence.

## Where it is silent

Rich interactive applications, dashboards, real-time interfaces, data
visualisation, and anything expressive. GOV.UK is built for transactions, and
its visual language is deliberately institutional.

## Pick it when

Building a public service, a regulated or high-stakes form (health, finance,
legal, immigration), or anything with an accessibility requirement you must be
able to demonstrate rather than assert.

**Borrow its forms and error patterns whatever else you pick.** This is the
single highest-value cross-system recommendation in this plugin: nothing else
comes close on forms, and forms are where products lose users. See
`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/CHOOSING.md`.

## Do not pick it when

Building a product with brand expression, a rich interactive application, or a
dashboard. GOV.UK's visual identity is deliberately plain and belongs to the UK
government; take the patterns and the writing discipline, not the look.

## Docs

<https://design-system.service.gov.uk> — fetchable.
Service manual: <https://www.gov.uk/service-manual> — the research behind it.

Look up: the error summary pattern, "one thing per page", the question pages
pattern, and the style guide on writing for users.
