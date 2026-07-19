# Task 24: Error pages and data/network failure handling

## Goal

Implement the full-screen error experiences and the non-intrusive "some events could not be loaded" toast, per the specified edge-case handling.

## Context

Technical Spec section 6 ("Edge Cases & Fallbacks") and section 10 item 11 ("Error pages, placeholder image handling"). Required behaviors:

- **Static import fails (build-time):** full-screen error page "Failed to load game data – contact admin." (should never happen in production).
- **Network error:** full-screen error page "Unable to load resources – retry." (coverage for future external assets).
- **Invalid event data (bad date):** skip the event (already handled in Task 7) and show a non-intrusive toast "Some events could not be loaded."
- **Missing image:** placeholder + console warning (already handled in Task 17); this task ensures it's consistent app-wide.

## MVP Status

Required for MVP for the invalid-data toast and a basic error boundary; the network-error page is defensive coverage but cheap to include.

## Dependencies

- Task 7 (load warnings surface), Task 17 (placeholder image), Task 13 (layout), Task 12 (French error strings).

## Files / Areas Likely Affected

- Error boundary files under the app tree (e.g. `src/app/[locale]/error.tsx`, and/or a global error boundary). **Check `node_modules/next/dist/docs/` for Next 16 `error.tsx`/`global-error` conventions.**
- A lightweight toast component (or a minimal Radix toast) under `src/components/`.
- Wiring the Task 7 load warnings into the toast on the relevant screens.

## Implementation Guidance

- Add an `error.tsx` error boundary that renders a full-screen, on-brand error using the French catalog strings. Distinguish (where feasible) the "data load" vs "resources/network" messages, or use a single clear message if distinguishing adds undue complexity — document the choice.
- Implement the invalid-data **toast**: when the loader (Task 7) reports skipped events, show the non-intrusive "Some events could not be loaded." message (from Task 12). Prefer a small Radix Toast (installed in Task 1) or a minimal custom toast; keep it dismissible and non-blocking.
- Confirm the missing-image placeholder behavior from Task 17 is used everywhere images render; centralize the placeholder path (Task 7) rather than duplicating.
- All copy from the French catalog.
- Keep these paths defensive: they should rarely trigger in production given static data.

## Acceptance Criteria

- [ ] A full-screen error boundary renders localized error copy when a render/data error is thrown.
- [ ] When events are skipped by the loader, a non-intrusive French toast appears.
- [ ] Missing images consistently show the placeholder + console warning app-wide.
- [ ] All error/toast copy from the French catalog.
- [ ] `yarn build`, `yarn lint` pass.

## Testing Requirements

- Manual: force a thrown error and a bad-date event to verify the error page and toast.
- Optional RTL test: toast renders the localized message when given a "warnings present" prop.

## Out of Scope

- 404 → home redirect (Task 14).
- Retry logic for real external assets (none exist yet; data is static).

## Recommended Agent Capability

Strong coding model. Next 16 error-boundary conventions plus wiring the loader warning channel into UI benefit from doc-checking and care.
