# Task 28: Accessibility hardening (nice-to-have)

## Goal

Improve accessibility across the app: ARIA labels for draggable/interactive items, sensible focus management, and keyboard navigability, within the pragmatic bounds the spec sets.

## Context

Product Spec ("Accessibility") and Technical Spec section 7: the app should be built with accessibility in mind, but comprehensive WCAG compliance is **not** required — "basic ARIA + keyboard fallback only." Drag-and-drop and animations are acknowledged as hard to fully make accessible. This task does a focused hardening pass rather than a full audit.

## MVP Status

Nice-to-have. The spec explicitly allows sidelining deeper accessibility for v1, but basic ARIA/focus is called out as in-scope-when-feasible.

## Dependencies

- Core UI + gameplay in place (Tasks 13, 15, 16, 17, 18, 19, 22, 23). Best done alongside/after Task 26 (keyboard fallback).

## Files / Areas Likely Affected

- Interactive components: header link, buttons, selection controls, timeline slots, draggable event, end-screen buttons.
- Possibly `styles`/focus-visible tokens.

## Implementation Guidance

- Ensure all interactive elements are reachable and operable by keyboard with visible focus states.
- Add meaningful ARIA labels/roles to draggable items and drop targets (dnd-kit provides hooks/announcements — use them). Provide screen-reader announcements for placement outcomes where feasible.
- Verify Radix primitives (selection toggles/radios) retain their built-in a11y and are labeled in French.
- Manage focus on view transitions (e.g. when the End-of-Game screen appears, move focus to it / its heading; returning home is predictable).
- Ensure images have meaningful `alt` (event names) — already started in Task 17; confirm consistency.
- Do not attempt exhaustive WCAG AA compliance; target the "basic ARIA + keyboard" bar and prefer the Task 26 keyboard fallback as the primary a11y path for placement.

## Acceptance Criteria

- [ ] All primary flows (home → select → play → end) are operable by keyboard with visible focus.
- [ ] Draggable and drop targets have appropriate ARIA labels/roles and announce state where feasible.
- [ ] Focus is managed sensibly on the End-of-Game transition.
- [ ] Selection controls are labeled in French and keyboard-operable.
- [ ] `yarn build`, `yarn lint` pass.

## Testing Requirements

- Manual: keyboard-only walkthrough of the full flow; quick screen-reader smoke check on key screens.
- Optional automated a11y assertion (e.g. axe) if easily added.

## Out of Scope

- Full WCAG AA/AAA compliance.
- Making touch drag-and-drop fully accessible.

## Recommended Agent Capability

Strong coding model. Focus management and ARIA for drag-and-drop are nuanced and easy to do superficially; a capable model produces more genuinely useful a11y.
