# Task 5: Define core domain types

## Goal

Create the TypeScript type definitions for the domain model: `ID`, `SchoolYear`, `Chapter`, `DifficultyLevel`, and `Event`, matching the Technical Specification exactly.

## Context

The Technical Specification (section 3) defines the data model. The repo currently only has an empty `src/types/event.ts`. Every data, logic, and UI task depends on these types. Getting them right and centralized prevents divergence later.

## MVP Status

Required for MVP. All game logic and data are built on these types.

## Dependencies

None.

## Files / Areas Likely Affected

- `src/types/id.ts`
- `src/types/year.ts`
- `src/types/chapter.ts`
- `src/types/difficultyLevel.ts`
- `src/types/event.ts` (currently empty)
- Optionally a `src/types/index.ts` barrel for convenient imports.

## Implementation Guidance

Implement the types exactly as specified in the Technical Specification section 3:

- `ID = number` (aliased so it can change to UUID later).
- `DifficultyLevel = 'easy' | 'hard'`.
- `Event = { id: ID; name: string; date: Date; fileName: string }` — `fileName` is the image file name only; images live in `public/events/`.
- `Chapter = { id: ID; chapterNumber: number; events: Record<DifficultyLevel, Event[]> }`.
- `SchoolYear = { id: ID; year: number; chapters: Chapter[] }`.

Notes:

- Keep each type in its own file per the spec's file layout, but under `src/types/` (the repo uses `src/`), and re-export via a barrel if helpful.
- Do not add runtime code, only types. Do not add validation logic here (that's Task 7).
- Keep JSDoc comments from the spec for `ID` and `DifficultyLevel`.
- Be mindful that `Event.date` is a JS `Date`. Note for downstream tasks: raw data files may store dates as ISO strings and hydrate to `Date` in the loader — but the **type** here is `Date`.

## Acceptance Criteria

- [x] All five types exist and match the spec's shapes and names.
- [x] Types compile with `strict` mode (no `any`).
- [x] A barrel export (if added) re-exports every type.
- [x] `yarn build` and `yarn lint` pass.

## Testing Requirements

- Type-only task: verify compilation. No unit tests required (types have no runtime).

## Out of Scope

- Data content (Task 6).
- Validation / loading logic (Task 7).

## Recommended Agent Capability

Cheap coding model. Direct transcription of a precisely specified type model.
