# Writing style

Engineering documents are read under time pressure: in review, during an
incident, by someone new. Write for the tired reader with the least context.
These rules draw on widely used guides: the Google developer documentation
style guide, the Microsoft Writing Style Guide, and plain-language guidance
such as plainlanguage.gov. They are summarised here, not copied.

## Sentences

- **Short sentences.** One idea each. Aim for under 25 words.
- **Active voice.** "The job retries three times", not "Retries are
  performed three times by the job".
- **Present tense** for how the system works. Future tense only for plans.
- **Second person** in instructions: "Run the migration", not "The user
  should run the migration".
- **Say who does what.** "The API gateway rejects the request", not "The
  request is rejected".
- **Lead with the point.** The first sentence of a section says what the
  section concludes.

## Words

- **Use the plain word.** "Use", not "utilise". "Start", not "initiate".
  "Help", not "facilitate".
- **Define each term once** and use it the same way throughout. If the PRD
  says "workspace", the design doc does not say "tenant" for the same thing.
  Put domain terms in a glossary section.
- **Spell out an acronym** the first time: "service level objective (SLO)".
- **No marketing tone.** Drop "powerful", "seamless", "robust", "best-in-class",
  "cutting-edge". State what the thing does and let the reader judge.
- **No hedging stacks.** "It may possibly be the case that" becomes "It may".
- **Avoid "simply", "just", "easy", "obviously".** If it were obvious, the
  reader would not be reading.

## Requirements language

Requirements documents use a fixed vocabulary, following the common
convention (as in RFC 2119 and ISO/IEC/IEEE 29148):

| Word | Means |
|---|---|
| **shall** / **must** | Mandatory. Failing it means the product fails. |
| **should** | Recommended. Deviation needs a stated reason. |
| **may** | Optional. |
| **will** | A statement of fact or intent, not a requirement. |

Pick "shall" or "must" per document and do not mix them. Every mandatory
requirement must be verifiable: "The page shall load in under 2 seconds at
the 95th percentile on a 4G connection", not "The page shall load quickly".

Words that make a requirement untestable: fast, easy, user-friendly,
flexible, robust, efficient, adequate, as appropriate, etc., and/or, minimal,
support (without saying what supporting means). Replace each with a number
or a behaviour.

## Structure

- **Headings are signposts.** Make each one say what the section is about.
  "Rollback", not "Other considerations".
- **One topic per section.** If a section needs "also", it may be two.
- **Lists for parallel items**, tables for items with several attributes,
  prose for reasoning. Do not bullet an argument.
- **Numbered lists only for sequences** where order matters.
- **Front-load lists.** Put the key word first in each item.
- **Keep paragraphs to 3 to 5 sentences.**

## Numbers, dates, and names

- ISO dates: `2026-09-28`. Say the time zone for times: `14:05 UTC`.
- Units every time: `200 ms`, `5 GB`, `99.9 %` or `99.9%` (pick one).
- Name people by role in long-lived docs ("the payments on-call"), by name
  in records (meeting notes, postmortems' timeline), and never by blame.
- Code, commands, paths, and config keys in backticks.

## Diagrams

- A diagram supports the text. It does not replace it. Say in words what
  the diagram shows.
- Every diagram has a title, a legend if it uses shapes or colours with
  meaning, and labelled arrows.
- Use Mermaid in Markdown so diagrams are versioned and diffable. See
  `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/docs-as-code.md`.

## Accessibility

- Alt text for every image, describing what it shows, not "diagram".
- Do not rely on colour alone to carry meaning in diagrams or tables.
- Descriptive link text: "see the rollback procedure", not "click here".
- Heading levels in order, without skipping (`##` then `###`).

## Blameless language

In postmortems, retros, and handovers, describe what the system and the
process allowed, not who failed. "The deploy script did not check for pending
migrations" leads to a fix. "Alex forgot to run migrations" leads to people
hiding mistakes.
