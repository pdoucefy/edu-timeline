# Task 9: Implement `validatePlacement()` chronological logic

## Goal

Implement the pure function that determines whether an event was placed in a chronologically valid position on the timeline, using full `Date` comparison (even though the UI shows only years) and treating identical dates as interchangeable.

## Context

This is the single most correctness-critical piece of the game. Per the Product Specification (Gameplay + note) and Technical Specification (section 6 "Validation rules"):

- The user inserts an event between existing timeline events.
- Validation always compares the **full `Date`** objects, even though the UI displays only years.
- If two events share the same full date, placing them in either order relative to each other is valid.
- Placement is valid if the inserted event's date is `>=` the neighbor to its left and `<=` the neighbor to its right (with open ends at the start/end of the timeline).

## MVP Status

Required for MVP. This defines win/lose for every move.

## Dependencies

- Task 5 (types), Task 4 (Jest), Task 6 (same-date / same-year fixtures).

## Files / Areas Likely Affected

- New logic module (e.g. `src/game/validatePlacement.ts`).
- Co-located unit test file.

## Implementation Guidance

- Keep the function **pure**.
- Suggested signature: given the current ordered timeline (array of placed events, sorted chronologically) and the event being inserted plus the chosen insertion index (0..N, where N = number of placed events), return whether the placement is chronologically correct.
- Rule: let `left` = event at `index-1` (or none) and `right` = event at `index` (or none). Placement is valid when `left.date <= inserted.date` (if left exists) AND `inserted.date <= right.date` (if right exists). Comparisons use `Date.getTime()`.
- **Tied dates:** because comparisons use `<=`/`>=`, an event with a date equal to a neighbor is valid on either side — this satisfies the "same full date can be placed in any order" requirement. Add explicit tests for this.
- **Year display vs full-date ordering:** the function must NOT round to year. Two events in the same year but different full dates have a strict correct order. Add explicit tests using the Task 6 same-year-different-date fixture.
- Decide and document behavior when the timeline is empty or has one element (edge indices 0 and N should always be considered relative to whatever neighbors exist).
- Do not mutate inputs.

## Acceptance Criteria

- [x] Pure function returns a correct boolean for a given timeline, inserted event, and index.
- [x] Uses full-date comparison, not year rounding.
- [x] Same-date neighbors accepted in either order.
- [x] Same-year/different-date ordering enforced strictly.
- [x] Start/end insertions handled.
- [x] `yarn test`, `yarn lint`, `yarn build` pass.

## Testing Requirements

Unit tests (Jest) covering spec section 9 scenarios:

- Correct middle insertion; incorrect middle insertion.
- Insertion at start and end (valid + invalid).
- Same full date placed either side → valid.
- Same year, different months/days → order enforced.
- Single-element and (if applicable) empty timeline edge cases.

## Out of Scope

- Any UI, drag-and-drop, or state mutation (Tasks 22, 23).
- Deciding what happens on failure (Task 23 / end screen).

## Recommended Agent Capability

Reasoning model. The tied-date and year-display-vs-full-date subtleties are exactly where off-by-one and rounding bugs hide; careful reasoning and exhaustive tests are worth the extra capability.
