# Task 14: Unknown-route redirect to home

## Goal

Ensure that any unknown route (404) seamlessly redirects the user to the home page, per the product requirement.

## Context

Product Specification ("Routes"): "All unknown routes (ie 404s) should redirect the user seamlessly to the home page." Technical Spec section 4: `*` (unknown) → `/fr/` (home). Combined with the locale requirement, an unknown path should end up at the localized home page rather than showing a 404.

## MVP Status

Required for MVP. It's an explicit routing requirement and prevents dead ends.

## Dependencies

- Task 11 (locale routing + interception), Task 13 (home layout exists).

## Files / Areas Likely Affected

- A `not-found` handler under the app tree (e.g. `src/app/[locale]/not-found.tsx` and/or `src/app/not-found.tsx`).
- Possibly the proxy/interception file from Task 11 (for locale-less unknown paths).

## Implementation Guidance

- **Check `node_modules/next/dist/docs/` for the Next 16 `not-found` conventions** (file location, and whether `redirect()` can be called from a `not-found` boundary, or whether a client-side redirect is needed).
- Behavior required: an unknown path redirects to the localized home (`/fr`). Prefer a server-side `redirect('/fr')` from the not-found boundary if supported; otherwise use a minimal client redirect.
- Ensure interplay with Task 11's proxy: a locale-less unknown path should first gain a locale, then resolve to home. Confirm you don't create a redirect loop.
- Keep it seamless (no flash of a 404 page). If a brief fallback is unavoidable, keep it minimal and on-brand.
- Do not redirect legitimate routes (`/fr`, `/fr/select`, `/fr/play`) — only genuinely unmatched paths.

## Acceptance Criteria

- [ ] Visiting a nonexistent path (e.g. `/fr/does-not-exist` and `/nope`) lands on the home page.
- [ ] No redirect loop; valid routes are unaffected.
- [ ] The redirect is seamless (no visible raw 404).
- [ ] `yarn build`, `yarn lint` pass.

## Testing Requirements

- Manual: try several bogus paths, confirm they end at `/fr`.
- Covered again by Cypress (Task 29).

## Out of Scope

- The full-screen *error* pages (data/network failures) — that's Task 24.
- Play-route invalid-state redirect to `/select` — that's Task 21.

## Recommended Agent Capability

Strong coding model. Small, but the redirect-loop and locale-interaction edge cases need care under Next 16 semantics.
