# Task 13: Root locale layout, providers, and school-logo header

## Goal

Implement the locale-aware root layout that wraps the app with the i18n provider, styled-components registry, and theme, and renders the shared header containing the school's logo (linking to the school site).

## Context

Product Spec ("Styling and Layout"): the layout must include the school's logo, and clicking it redirects to the school's main website (https://coopcvm.com/). Technical Spec section 10 item 1: "Layout wrapper (header with school logo, locale prefix)". The current `src/app/layout.tsx` is default boilerplate (`lang="en"`, Geist fonts, default metadata) and is not locale-aware. This task turns it into the real app shell now living under the `[locale]` segment.

## MVP Status

Required for MVP. Every screen renders inside this layout; it's the first point where the app looks like the product.

## Dependencies

- Task 2 (styled-components registry + theme), Task 11 (locale segment + i18n), Task 12 (messages).

## Files / Areas Likely Affected

- `src/app/[locale]/layout.tsx` (the locale root layout).
- Possibly the top-level `src/app/layout.tsx` if a minimal outer layout is still required by Next 16 (check docs).
- New `Header` component (e.g. `src/components/Header.tsx` or `src/components/layout/Header.tsx`).
- `src/app/globals.css` (trim default boilerplate styles that conflict with the theme).
- A school logo asset in `public/`.

## Implementation Guidance

- **Read `node_modules/next/dist/docs/` for Next 16 layout conventions** — `params` is async (`const { locale } = await params`), and `generateStaticParams` can emit the locale(s). Set `<html lang={locale}>`.
- Wrap children with, in a sensible order: the styled-components registry (Task 2), `ThemeProvider` with the theme (Task 2), and the next-intl provider (`NextIntlClientProvider` with messages for client components, per next-intl v4 App Router usage).
- Build a `Header` styled component containing the school logo. The logo links to `https://coopcvm.com/` (open in a new tab is acceptable; use appropriate `rel`). Use a translated `alt` text from the catalog.
- Add a placeholder logo asset if a real one isn't available; note in a comment it should be replaced with the official school logo.
- Clean up the default `create-next-app` boilerplate: remove/repurpose the default `globals.css` rules that fight the theme, and drop unused Geist font wiring if not desired (or keep a deliberate font choice). Keep it minimal and consistent with the Wikitrivia-inspired theme.
- Keep the layout a Server Component where possible; mark only the pieces that need client interactivity as `'use client'`.

## Acceptance Criteria

- [ ] `src/app/[locale]/layout.tsx` renders with `<html lang={locale}>` and wraps children in registry + ThemeProvider + i18n provider.
- [ ] A header with the school logo renders on every route; clicking the logo navigates to `https://coopcvm.com/`.
- [ ] Header text (e.g. logo alt) comes from the French catalog, not hardcoded.
- [ ] styled-components render server-side without FOUC/hydration warnings.
- [ ] Default boilerplate styling that conflicts with the theme is removed.
- [ ] `yarn build`, `yarn lint` pass; `yarn dev` shows the header on `/fr`.

## Testing Requirements

- Manual: load `/fr`, confirm header + logo render, logo link points to the school site, no hydration/console errors.
- Optional RTL test: header renders the logo link with the correct href.

## Out of Scope

- Home page hero/content (Task 15).
- Metadata/favicon polish (Task 25) beyond what's needed to render.
- Responsiveness polish (Task 27).

## Recommended Agent Capability

Strong coding model. Provider composition order (registry + theme + intl) under Next 16 async layouts is fiddly and a common source of hydration bugs.
