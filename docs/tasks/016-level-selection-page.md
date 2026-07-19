# Task 16: Level-selection page

## Goal

Implement the level-selection screen: list chapters grouped by school year, allow single-chapter / summary-mode / for-fun-mode selection, let the user pick a difficulty, and start the game by navigating to `/fr/play` with the selection encoded in the URL query.

## Context

Product Spec ("Level Selection") and Technical Spec section 5 & section 10 item 3. The user picks chapter(s) and a difficulty, then starts a game. Chapters are encoded as numeric IDs in the URL (e.g. `?chapters=1,2,3&difficulty=easy`). This screen produces the exact URL contract the play route (Task 21) consumes.

## MVP Status

Required for MVP. It's a mandatory step in the user flow and defines the game's inputs.

## Dependencies

- Task 13 (layout), Task 12 (strings), Task 10 (selection resolver + ID mapping), Task 7 (loader to list years/chapters).

## Files / Areas Likely Affected

- `src/app/[locale]/select/page.tsx`
- New selection components under `src/components/` (chapter list, mode toggles, difficulty selector).
- Uses Radix primitives (radio group / toggle) installed in Task 1.

## Implementation Guidance

- Fetch the year/chapter list via the loader (Task 7). This can be a Server Component that passes data to a client component that holds selection state (`'use client'` for interactivity).
- UI must support the three selection modes from Task 10:
  - **Single chapter:** choose one chapter.
  - **Summary mode:** a toggle that, when on, means the chosen chapter includes all preceding chapters in the same year. Communicate this clearly to the user (French copy from Task 12).
  - **For-fun mode:** a toggle/option selecting all chapters from all years.
- Difficulty selector (`easy` / `hard`) using a Radix radio group or toggle group for accessibility.
- On "start", build the URL: encode the resolved chapter IDs as `chapters=` (comma-separated numeric IDs) and `difficulty=`. Use the Task 10 resolver + ID mapping so what's encoded matches what the game will load. Navigate to the localized `/play` route with those query params.
- Keep the URL contract explicit and documented in a comment (Task 21 must parse the same format).
- Use theme tokens; keep the layout clean and Wikitrivia-like. Responsiveness in mind (Task 27 does full polish).
- Use Radix primitives for the toggles/radios so keyboard/ARIA come mostly for free.

## Acceptance Criteria

- [ ] Chapters are listed grouped by school year using real data from the loader.
- [ ] User can pick single chapter, enable summary mode, or enable for-fun mode.
- [ ] User can pick `easy` or `hard`.
- [ ] "Start" navigates to `/fr/play?chapters=<ids>&difficulty=<level>` with correctly resolved IDs.
- [ ] All copy from the French catalog.
- [ ] `yarn build`, `yarn lint` pass.

## Testing Requirements

- Manual: exercise each mode + difficulty, confirm the resulting `/play` URL query.
- Optional RTL test: selecting summary mode for chapter 3 encodes chapters 1,2,3.

## Out of Scope

- Parsing/validating the URL on the play side (Task 21).
- Actual gameplay (Tasks 20–23).

## Recommended Agent Capability

Strong coding model. Multiple interacting selection modes plus a precise URL-encoding contract; correctness matters for the whole downstream flow.
