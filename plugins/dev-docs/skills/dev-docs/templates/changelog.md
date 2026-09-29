<!--
Template: CHANGELOG.md
Basis: Keep a Changelog 1.1.0 (keepachangelog.com) and Semantic Versioning
2.0.0 (semver.org).
Use when: any versioned package, library, service, or app.
Rules:
- Written for humans. Not a git log dump.
- Newest version first. Every version has a date in YYYY-MM-DD.
- Keep an "Unreleased" section at the top; move its entries into a version
  heading at release time.
- Group changes by type: Added, Changed, Deprecated, Removed, Fixed, Security.
  Omit empty groups.
- SemVer: MAJOR for incompatible API changes, MINOR for backward-compatible
  new functionality, PATCH for backward-compatible fixes. Any Removed entry
  or incompatible Changed entry means a MAJOR bump (or MINOR before 1.0.0).
- Link each version heading to a diff at the bottom.
Lives at: CHANGELOG.md in the repo root (or per package in a monorepo).
If the changelog is generated from Conventional Commits (release-please,
changesets, semantic-release), keep this structure and edit the output.
Remove this comment in the finished document.
-->

# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- <New feature, described from the user's point of view. (#PR)>

### Changed

- <Change in existing functionality.>

### Deprecated

- <Feature that will be removed in a future version, and what replaces it.>

### Removed

- <Feature removed in this version.>

### Fixed

- <Bug fix, described by the symptom the user saw.>

### Security

- <Vulnerability fix. Reference the advisory or CVE.>

## [<1.1.0>] - <YYYY-MM-DD>

### Added

- <Example: Export orders to CSV from the orders list. (#142)>

### Fixed

- <Example: Order totals no longer round incorrectly for JPY. (#150)>

## [<1.0.0>] - <YYYY-MM-DD>

### Added

- <Initial stable release.>

[Unreleased]: https://github.com/<owner>/<repo>/compare/v<1.1.0>...HEAD
[<1.1.0>]: https://github.com/<owner>/<repo>/compare/v<1.0.0>...v<1.1.0>
[<1.0.0>]: https://github.com/<owner>/<repo>/releases/tag/v<1.0.0>
