# Task 10: Chapter-selection resolver (single / summary / for-fun)

## Goal

Implement the pure logic that turns a user's selection intent into the concrete set of chapters that feed the event-pool resolver: single chapter, summary mode (chapter + all preceding chapters in the same year), and for-fun mode (all chapters of all years).

## Context

The Product Specification ("Level Selection") and Technical Specification (section 5) define three selection modes:

- **Single chapter** – just that chapter.
- **Summary mode** – the chapter plus all preceding chapters in the same school year (e.g. selecting chapter 3 of year 1 in summary → chapters 1, 2, 3 of year 1).
- **For-fun mode** – every chapter from every year.

This resolver is separate from `combineEventPools()` (Task 8): this one decides _which chapters_, Task 8 decides _which events_.

## MVP Status

Required for MVP. Drives what the selection screen produces and what the game loads.

## Dependencies

- Task 5 (types), Task 6 (data), Task 7 (loader), Task 4 (Jest).

## Files / Areas Likely Affected

- New logic module (e.g. `src/game/resolveSelectedChapters.ts`).
- Co-located unit test file.

## Implementation Guidance

- Keep the function(s) **pure**; take the full `SchoolYear[]` (or use the loader) plus a selection descriptor and return `Chapter[]` (or chapter IDs).
- Model the selection descriptor to cover the three modes. A practical shape: `{ mode: 'single' | 'summary'; yearId; chapterNumber }` and `{ mode: 'forFun' }`. Choose whatever cleanly maps to the URL encoding used in Tasks 16/21 (chapters encoded as numeric IDs, e.g. `?chapters=1,2,3`).
- **Summary:** given the target chapter, include all chapters in the same school year whose `chapterNumber` is `<=` the target's `chapterNumber`.
- **For-fun:** flatten all chapters across all years.
- De-duplication of chapters is not the concern here (that's event dedup in Task 8), but do not return the same chapter twice.
- Provide a companion helper to expand a `chapters=` ID list from the URL back into `Chapter[]` for the play route (Task 21), or clearly document how Task 21 should reconstruct chapters from IDs. Keep the URL contract (chapter IDs) consistent with Task 16.

## Acceptance Criteria

- [ ] Single mode returns exactly the chosen chapter.
- [ ] Summary mode returns the chosen chapter plus all lower-numbered chapters in the same year only.
- [ ] For-fun mode returns all chapters across all years.
- [ ] A helper maps between chapter IDs (URL form) and `Chapter[]`.
- [ ] `yarn test`, `yarn lint`, `yarn build` pass.

## Testing Requirements

Unit tests (Jest):

- Summary at chapter 3 of a year → chapters 1,2,3 of that year and nothing from other years.
- Summary at chapter 1 → just chapter 1.
- Single → one chapter.
- For-fun → count equals total chapters across the dataset.
- ID-list expansion round-trips.

## Out of Scope

- URL parsing/UI (Tasks 16, 21).
- Event merging (Task 8).

## Recommended Agent Capability

Strong coding model. Straightforward but the summary-scoping ("same year, preceding only") must be precise.
