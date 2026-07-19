# Task 23: Game loop wiring (placement → validate → reveal/advance → end)

## Goal

Connect the drag-and-drop index (Task 22) to the game state (Task 20) so a placement is validated, correct placements reveal the year and advance to the next event, and a wrong placement (or completing the pool) ends the game and shows the End-of-Game screen (Task 19) on the play route.

## Context

This is the task that makes the game actually playable end-to-end. It composes the pieces from Phases 3–4: the play route (Task 21) hosts the state provider, the timeline + draggable current event (Tasks 18, 22) produce a chosen insertion index, the reducer (Task 20) validates (via Task 9) and transitions, and on `won`/`lost` the End-of-Game screen (Task 19) is rendered in place. Product Spec Gameplay + End-of-Game describe the full loop.

## MVP Status

Required for MVP. This is the moment the MVP becomes a working game.

## Dependencies

- Task 20 (state), Task 21 (play route bootstrap), Task 22 (drag index), Task 18 (timeline), Task 17 (card), Task 19 (end screen), Task 9 (validation, via the reducer).

## Files / Areas Likely Affected

- The play route client component (`src/app/[locale]/play/...`).
- Glue between the drag callback and `useGame()` dispatch.
- Conditional rendering of `EndOfGameScreen`.

## Implementation Guidance

- On drop, call the game action (e.g. `PLACE_CURRENT` with the insertion index) from Task 20. Let the reducer do validation and transition — do not duplicate validation logic.
- On a **correct** placement: the placed event is inserted and its year revealed on the timeline, and the next `current` event appears (date hidden). When the pool is exhausted after a correct placement, status becomes `won`.
- On an **incorrect** placement: status becomes `lost` and failure details (misplaced event + counts) are captured.
- When `status` is `won` or `lost`, render the `EndOfGameScreen` (Task 19) with the correct props (success, or failure with `placedCount`, `remainingCount`, misplaced event year). Because the end screen lives on the play route (per Product Spec), render it in place rather than navigating away.
- The "Back to home" button (in Task 19) returns to `/fr`. Starting a new game happens by going through `/select` again (fresh URL) — consistent with Task 21's URL-derived state.
- Provide subtle feedback on correct/incorrect placement (Framer Motion), keeping it optional and non-blocking.
- Ensure the initial seeded event (shown revealed at game start) is excluded from `placedCount` per the Product Spec.

## Acceptance Criteria

- [ ] A full game can be played: drag → drop → validate → reveal/advance, repeating.
- [ ] Correct placement reveals the year and advances; exhausting the pool → success end screen.
- [ ] Incorrect placement → failure end screen with correct placed/remaining counts and misplaced-event year.
- [ ] End-of-Game screen renders on the play route; back-to-home returns to `/fr`.
- [ ] No validation logic duplicated outside the reducer/Task 9.
- [ ] `yarn build`, `yarn lint` pass; `yarn dev` allows completing both a winning and losing game.

## Testing Requirements

- Manual: play a full winning game and a full losing game; verify reveals, advancement, and both end screens with correct stats.
- E2E success + failure paths are formalized in Cypress (Task 29).

## Out of Scope

- Keyboard-only fallback (Task 26).
- Error pages for data/network failures (Task 24).

## Recommended Agent Capability

Reasoning model. This is the integration keystone; correct composition of state transitions, reveal timing, and end-screen stats across many modules is high-risk.
