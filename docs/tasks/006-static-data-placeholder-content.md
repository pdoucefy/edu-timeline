# Task 6: Static data layer with placeholder sample content

## Goal

Create the static data structure under `src/data/` that exports the school years, chapters, and events as typed constants, populated with a small set of **placeholder sample content** so the game is fully playable during development.

## Context

The Technical Specification (section 2, "Data storage") requires data to be stored as TypeScript modules under `data/` exporting typed constants — no database, static compile-time import. The repo has an empty `src/data/events.ts`. Real curriculum content (French history events, dates, images) will be supplied later by the client/teachers; for now we scaffold with realistic placeholder data so downstream logic and UI can be built and demoed.

## MVP Status

Required for MVP (as a scaffold). The **structure** is required; the **placeholder content** is a stand-in that will be replaced by real content later. The plan treats real content authoring as an external, non-agent dependency.

## Dependencies

- Task 5 (domain types).

## Files / Areas Likely Affected

- `src/data/` (e.g. `src/data/years.ts` or per-year files, plus an aggregating `src/data/index.ts`).
- `src/data/events.ts` (currently empty — replace or repurpose).
- `public/events/` (add a few placeholder images or reuse one placeholder).

## Implementation Guidance

- Model the data as `SchoolYear[]` using the Task 5 types. Provide at least **2 school years**, each with at least **3 chapters**, and each chapter with a `Record<DifficultyLevel, Event[]>`:
  - `easy` = a handful of base events (aim for ~5–8 per chapter).
  - `hard` = additional/extra events layered on top (a few more).
- Ensure enough events per selectable combination that a game is actually playable (a game needs several events).
- IDs must be unique across the whole dataset (events, chapters, years). Include at least one event that is intentionally duplicated across two chapters (same `id`) so the dedup logic (Task 8) has something to exercise.
- Include at least two events sharing the **same full date** and at least two sharing the **same year but different full dates**, so placement-validation tests (Task 9) have realistic fixtures.
- `Event.date`: pick a representation and be consistent. Recommended: store as an ISO date string in the raw data and convert to `Date` in the loader (Task 7), OR construct `Date` objects directly here. Document the choice in a comment. If you construct `Date` directly here, remember months are 0-indexed.
- `fileName` should reference files that exist in `public/events/`. Add one or more placeholder images (a simple neutral placeholder is fine) and point sample events at them. It is acceptable for many events to share one placeholder image during development.
- Mark clearly (comment at top of the data file) that this is **placeholder content to be replaced with real curriculum data**.

## Acceptance Criteria

- [x] `src/data/` exports a typed `SchoolYear[]` (or equivalent) that type-checks against Task 5 types.
- [x] At least 2 years × 3 chapters, each with `easy` and `hard` event arrays.
- [x] At least one cross-chapter duplicate event (same `id`), plus same-date and same-year fixtures exist.
- [x] Referenced image files exist under `public/events/`.
- [x] A top-of-file comment flags the content as placeholder.
- [x] `yarn build` and `yarn lint` pass.

## Testing Requirements

- Compilation must pass.
- No dedicated unit tests (this is data), but the fixtures here are consumed by Tasks 8 and 9 tests.

## Out of Scope

- Loading/validation logic (Task 7).
- Real historical content and final images.

## Recommended Agent Capability

Cheap coding model. Content scaffolding against a fixed schema; just needs care with unique IDs and the required fixtures.
