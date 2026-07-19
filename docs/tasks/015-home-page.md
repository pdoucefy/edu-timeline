# Task 15: Home page (hero + start button)

## Goal

Implement the home page: a hero section with the app's title/intro and a primary button that navigates the user to the level-selection screen.

## Context

Product Spec ("User Flow"): the user lands on a home page, then proceeds to select a level. Technical Spec section 10 item 2: "Home page hero + start button". Route: `/fr/`. This is the first real screen and the app's entry point.

## MVP Status

Required for MVP. It's the entry point of the user flow.

## Dependencies

- Task 13 (layout + header + providers), Task 12 (French strings).

## Files / Areas Likely Affected

- `src/app/[locale]/page.tsx`
- Possibly a `Hero` component under `src/components/`.

## Implementation Guidance

- Replace the boilerplate home page content with a hero: app name/title, a short intro line describing the practice game, and a prominent call-to-action button.
- All copy comes from the `home`/`common` namespaces in `fr.json` (Task 12) — no hardcoded strings.
- The CTA navigates to the localized `/select` route. Use Next's locale-aware navigation (next-intl's `Link` or Next `Link` with the locale-prefixed path) — **verify the correct approach in the next-intl v4 docs / `node_modules/next/dist/docs/`**.
- Style with styled-components and theme tokens; take visual cues from Wikitrivia (clean, centered, high-contrast) since the client likes that look.
- Keep it a Server Component if it needs no interactivity beyond a link; only use `'use client'` if required.
- Keep responsiveness in mind (readable on small screens) but full mobile polish is Task 27.

## Acceptance Criteria

- [ ] `/fr` shows a hero with title, intro, and a start button.
- [ ] The start button navigates to `/fr/select`.
- [ ] All text is from the French catalog.
- [ ] Renders within the shared layout/header with no console errors.
- [ ] `yarn build`, `yarn lint` pass.

## Testing Requirements

- Manual: load `/fr`, click start, land on `/fr/select`.
- Optional RTL test: renders the title and a link to `/fr/select`.

## Out of Scope

- Level-selection UI (Task 16).
- Metadata/favicon (Task 25).

## Recommended Agent Capability

Cheap coding model. Simple presentational page with one navigation action.
