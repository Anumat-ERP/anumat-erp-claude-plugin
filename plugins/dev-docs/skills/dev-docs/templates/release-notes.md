<!--
Template: Release notes (one release, for users)
Basis: common release-notes practice. No formal standard.
Use when: announcing a release to users, customers, or other teams. Release
notes are curated and written in the reader's terms. The CHANGELOG is the
complete list; draft release notes from it, not the other way round.
Lives at: the GitHub release body, the docs site, or
docs/releases/<version>.md
Remove this comment in the finished document.
-->

# <Product> <version> release notes

Released <YYYY-MM-DD>.

<One or two sentences: the main point of this release for the reader.>

## Action required

<Anything users must do: breaking changes, config changes, migrations,
deprecated features they rely on. Put this first. If nothing, write "No
action required." and keep the heading.>

- **<Change>:** <what changed, who is affected, what to do, by when>.
  <Link to migration guide.>

## Highlights

### <Feature name>

<What it lets the user do and why it matters, in two or three sentences.
Screenshot with alt text, if it helps. Link to docs.>

## Improvements

- <Improvement, in the user's words. (#PR)>

## Fixes

- <Symptom that is fixed: "Exported CSV files now open correctly in Excel
  when they contain accented characters." (#PR)>

## Deprecations

- <Feature> is deprecated and will be removed in <version or date>. Use
  <replacement> instead.

## Known issues

- <Issue, its impact, and any workaround. Link to tracking issue.>

## Security

- <Fixed vulnerability, severity, advisory link. Or omit the section.>

## Upgrade

<How to upgrade, or link to the upgrade guide. Minimum versions of
dependencies.>

## Full changelog

<Link to the CHANGELOG section or the compare view.>

## Thanks

<Optional: contributors to this release.>
