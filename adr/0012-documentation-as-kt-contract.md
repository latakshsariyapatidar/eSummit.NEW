# ADR 0012: Documentation Is the KT Contract

Status: Accepted

## Context

The project will be handed to juniors who need to understand feature flow, file ownership, imports, and contribution rules.

## Decision

Maintain:

- Root `README.md` as the beginner entry point.
- `docs/features/*_readme.md` for feature-level KT.
- `docs/file_inventory.md` for file-by-file purpose.
- `docs/architecture_overview.md` for system-level flow.
- `adr/` for decisions future developers must preserve or deliberately replace.

## Consequences

- Code changes that alter feature flow should update docs.
- Architecture changes should add or update ADRs.
- KT can be repeated consistently for new juniors.

## Notes

Documentation drift should be treated as a project bug.
