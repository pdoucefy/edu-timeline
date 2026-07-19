# Task 26: Keyboard-only dropdown fallback (nice-to-have)

## Goal

Provide a keyboard-accessible alternative to drag-and-drop: a toggle that, when enabled, lets the user place the current event by choosing an insertion point from a dropdown instead of dragging.

## Context

Technical Spec section 6 (Edge Cases) and section 10 item 7 explicitly mark this **nice-to-have**: "When enabled, replace drag-and-drop with a dropdown of possible insertion points. Can be added after core gameplay is stable." Section 9 also lists testing the "keyboard-only toggle state changes." This improves accessibility for keyboard-only users without making the whole drag layer accessible.

## MVP Status

Nice-to-have. The spec explicitly defers it until core gameplay is stable. Do not implement before Task 23 is done.

## Dependencies

- Task 23 (working game loop), Task 20 (state), Task 18 (timeline slot indices), Task 12 (strings), Task 4 (Jest).

## Files / Areas Likely Affected

- A toggle control (Radix toggle, installed Task 1) in the play surface.
- A dropdown/select (Radix Select or native `<select>`) listing insertion points 0..N.
- Small state slice or local state for the toggle.

## Implementation Guidance

- Add a clearly-labeled toggle (French copy) that switches placement mode between drag-and-drop and keyboard/dropdown.
- When keyboard mode is on: render a dropdown whose options correspond to the timeline's insertion indices (0..N), described meaningfully (e.g. "before X", "between X and Y", "after Z" using placed event years). Selecting an option + a confirm action dispatches the same `PLACE_CURRENT` action (with the chosen index) used by drag-and-drop — reuse Task 23's placement path, do not fork the game logic.
- The toggle state and the dropdown must be fully keyboard-operable and focus-managed.
- Keep the two modes mutually exclusive and preserve game state when toggling.

## Acceptance Criteria

- [ ] A toggle switches between drag-and-drop and keyboard/dropdown placement.
- [ ] In keyboard mode, the user can select an insertion index and place the current event using only the keyboard.
- [ ] Placement uses the same reducer action/path as drag-and-drop (no duplicated game logic).
- [ ] Toggling preserves the current game state.
- [ ] `yarn build`, `yarn lint`, `yarn test` pass.

## Testing Requirements

- Unit test (per spec §9): the keyboard-only toggle state change works.
- Manual: complete a placement (and a full game) using keyboard-only mode.

## Out of Scope

- Making the drag layer itself fully accessible (Task 28 covers ARIA hardening).

## Recommended Agent Capability

Strong coding model. Must integrate cleanly with the existing game loop and keep a single placement code path.
