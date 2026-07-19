# Task 22: dnd-kit drag-and-drop integration on the timeline

## Goal

Wire dnd-kit so the user can drag the current event card and drop it into one of the timeline's insertion slots, producing the chosen insertion index. Add Framer Motion feedback for a Wikitrivia-like feel.

## Context

Technical Spec section 2 (dnd-kit for timeline placement), section 6 (user places the event via drag-and-drop), and section 10 item 6: "Drag-and-drop integration (dnd-kit)". The Timeline (Task 18) already exposes insertion slots with stable indices; the EventCard (Task 17) is the draggable content. This task connects a drag from the current event to a drop slot and reports the target index to the game loop (Task 23).

## MVP Status

Required for MVP. Drag-and-drop is the primary interaction (keyboard fallback is a separate nice-to-have, Task 26).

## Dependencies

- Task 18 (timeline + slots), Task 17 (EventCard), Task 1 (dnd-kit + framer-motion), Task 20 (state — to know the current event).

## Files / Areas Likely Affected

- The Timeline component / a new `DragDropTimeline` wrapper under `src/components/`.
- The current-event draggable wrapper.
- Uses `@dnd-kit/core` (DndContext, useDraggable/useDroppable) and Framer Motion.

## Implementation Guidance

- **Check `node_modules/next/dist/docs/` only for the `'use client'` / component boundary rules**; dnd-kit itself follows its own API.
- Wrap the play surface in a `DndContext`. Make the current event a draggable; make each timeline insertion slot (from Task 18's identifiers) a droppable mapped to its insertion index.
- On drop, resolve which slot received the event and surface the chosen **insertion index** via a callback (e.g. `onPlace(index)`). Do NOT validate here — validation and state transition are Task 20/23. This task only produces the index from the drag interaction.
- Provide clear drag feedback: highlight the active/hovered slot, and use Framer Motion for smooth movement/settling. Keep animations non-blocking and cheap.
- Handle drag cancel (dropped outside any slot) gracefully — no state change.
- Add basic ARIA/labels dnd-kit provides out of the box; deeper accessibility and the keyboard dropdown fallback are Task 26/28. (dnd-kit has keyboard sensors — enabling them is fine and encouraged, but the dedicated dropdown fallback is separate.)
- Keep the drag layer decoupled from validation so Task 23 can own the game-loop decision.

## Acceptance Criteria

- [ ] The current event can be dragged and dropped into any timeline insertion slot.
- [ ] Dropping reports the correct insertion index (0..N) to a callback.
- [ ] Active slot is visually highlighted during drag; motion feedback is smooth.
- [ ] Dropping outside a slot cancels with no state change.
- [ ] No validation/state logic embedded here (delegated to Task 23).
- [ ] `yarn build`, `yarn lint` pass.

## Testing Requirements

- Manual: drag the current event into various slots and confirm the reported index matches the visual slot.
- Full success/failure behavior is verified once wired in Task 23 and by Cypress (Task 29). dnd-kit interactions are hard to unit-test reliably; prioritize E2E coverage.

## Out of Scope

- Placement validation and win/lose transitions (Task 23).
- Keyboard-only dropdown fallback (Task 26).

## Recommended Agent Capability

Reasoning model. dnd-kit + Framer Motion + the slot-index mapping under an App Router client boundary is the trickiest UI integration in the project.
