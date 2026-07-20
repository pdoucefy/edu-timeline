# Task 20: Global game state provider (Context + useReducer)

## Goal

Implement the game state container using React Context + `useReducer` (no external state library), exposing the game state and the actions needed to drive gameplay.

## Context

Technical Spec section 2 mandates **React Context + useReducer** for state (Zustand explicitly avoided). Section 10 item 9: "Global state provider". This holds the live game: the shuffled pool, the current event to place, the placed timeline, the status (playing / won / lost), and failure details. It is the single source of truth the play route and game loop operate on.

## MVP Status

Required for MVP. Gameplay cannot function without it.

## Dependencies

- Task 5 (types), Task 8 (`combineEventPools`), Task 9 (`validatePlacement`) — the reducer will use these. Task 4 (Jest).

## Files / Areas Likely Affected

- New state module under `src/game/` or `src/state/` (context, reducer, provider, hook).
- Co-located reducer unit test.

## Implementation Guidance

- Define the state shape, e.g.:
  - `pool`: remaining events still to be drawn (shuffled).
  - `current`: the event currently being placed (date hidden), or null.
  - `timeline`: ordered array of successfully placed events (chronologically sorted).
  - `status`: `'idle' | 'playing' | 'won' | 'lost'`.
  - `failure`: on loss, `{ misplacedEvent, placedCount, remainingCount }` (or enough to derive them).
- Define actions such as: `START_GAME` (payload: full pool → seed first event onto timeline revealed, draw first `current`, shuffle), `PLACE_CURRENT` (payload: chosen insertion index → validate via Task 9; on success insert + reveal + draw next or set `won` when pool empty; on failure set `lost` and record failure details), and `RESET`.
- The reducer must be **pure** and deterministic given its inputs. Shuffling uses a seedable/injectable RNG or is done in the `START_GAME` action creator so the reducer stays testable (pass an already-shuffled pool into the action).
- Use `validatePlacement` (Task 9) inside the reducer for the `PLACE_CURRENT` transition. Keep the placement rules in Task 9 — do not reimplement.
- Compute failure stats consistently with Task 19's prop contract: `placedCount` = events on timeline minus the initial seeded one; `remainingCount` = events not yet placed.
- Provide a `GameProvider` and a `useGame()` hook. Keep the provider client-side (`'use client'`).
- Do NOT read the URL here (Task 21 does) — accept the resolved pool as input to `START_GAME`.

## Acceptance Criteria

- [ ] Context + reducer + provider + `useGame()` hook implemented, no external state lib.
- [ ] `START_GAME` seeds the first event (revealed) and draws a `current` to place.
- [ ] `PLACE_CURRENT` uses `validatePlacement`; correct → advance, incorrect → `lost` with failure details; pool exhausted → `won`.
- [ ] Reducer is pure/deterministic (shuffle injected, not done inside the reducer).
- [ ] `yarn test`, `yarn lint`, `yarn build` pass.

## Testing Requirements

Unit tests (Jest) on the reducer:

- START seeds first event + current.
- Correct placement advances and reveals; last correct placement → `won`.
- Incorrect placement → `lost` with correct `placedCount`/`remainingCount`/misplaced event.

## Out of Scope

- URL parsing / bootstrapping (Task 21).
- Drag-and-drop UI (Task 22) and DOM wiring (Task 23).

## Recommended Agent Capability

Reasoning model. The reducer is the heart of gameplay; the win/lose transitions, first-event seeding, and failure-stat accounting are subtle and must align with Tasks 9 and 19.
