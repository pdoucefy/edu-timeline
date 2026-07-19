# Task 8: Implement `combineEventPools()` resolver

## Goal

Implement the pure function that merges the event pools of the selected chapters at the requested difficulty tier(s) and deduplicates by `event.id`, returning the final playable pool.

## Context

The Technical Specification (section 6, "Game Event Pool Resolving") describes a resolver that receives which difficulty tier(s) to pull per selected chapter, merges the corresponding `events` arrays across all selected chapters, deduplicates by `event.id`, and returns the final pool. The Product Specification confirms: combined pools remove duplicate events. This is core game logic and is explicitly called out for unit testing (spec section 9).

## MVP Status

Required for MVP. Without a correct combined pool, gameplay cannot start.

## Dependencies

- Task 5 (types), Task 6 (fixtures incl. a cross-chapter duplicate), Task 4 (Jest).

## Files / Areas Likely Affected

- New logic module (e.g. `src/game/combineEventPools.ts` or `src/lib/combineEventPools.ts`).
- Co-located unit test file.

## Implementation Guidance

- Keep the function **pure** (inputs → output, no side effects, no React).
- Input: the selected chapters plus a description of which difficulty tier(s) to include. Follow the spec's intent: `easy` selects base events; `hard` should include base **plus** extra (per the Product Spec, "harder difficulty has additional events on top of the base events"). Decide the exact input signature to match how Task 10/21 will call it and document it clearly (e.g. accept selected chapters and a `DifficultyLevel`, expanding `hard` → `['easy','hard']` internally, OR accept an explicit tier list). Whatever you choose, the resulting pool for `hard` must contain base + extra events.
- Merge the relevant `events` arrays from all selected chapters.
- Deduplicate by `event.id` (silently — spec says "Deduplicate silently by id").
- Return the merged, deduplicated array. Do not shuffle here (shuffling belongs to game setup, Task 20/23) unless you keep shuffle as a separate composable function — prefer keeping this function deterministic for testability.

## Acceptance Criteria

- [ ] Pure function merges selected chapters' events for the requested difficulty.
- [ ] `hard` yields base + extra events; `easy` yields base only.
- [ ] Duplicates across chapters are removed by `id`.
- [ ] Output order is deterministic (no shuffle inside this function).
- [ ] `yarn test`, `yarn lint`, `yarn build` pass.

## Testing Requirements

Unit tests (Jest) covering, per spec section 9:
- Single chapter, easy vs hard tier sizes differ correctly.
- Multiple chapters merged.
- Cross-chapter duplicate removed (uses the Task 6 fixture).
- Empty selection returns empty pool.

## Out of Scope

- Shuffling / game setup.
- Placement validation (Task 9).

## Recommended Agent Capability

Strong coding model. Small but correctness-critical; the difficulty-tier semantics and dedup must be exactly right.
