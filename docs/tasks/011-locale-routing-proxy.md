# Task 11: Locale routing — `[locale]` segment, proxy, and next-intl plugin

## Goal

Make every route locale-prefixed (`/fr/...`) by introducing a `[locale]` dynamic segment, wiring next-intl (plugin + request config), and adding the request-interception layer that redirects locale-less URLs to their French counterpart.

## Context

The Product Specification ("Routes") and Technical Specification (section 4) require **locale-mandatory** routing: even the home page is `/fr/`. Visiting a non-prefixed URL must redirect to the French version. Today the repo has `next-intl` installed and a partial `src/i18n/request.ts`, but: no `[locale]` folder, no request interception, and `next.config.ts` does not apply the next-intl plugin. The existing routes (`src/app/play`, `src/app/select`, `src/app/page.tsx`) are NOT under a locale segment. The `TODOS` file explicitly lists "Test I18n works and the language is in the url".

> **CRITICAL — Next.js 16 breaking change:** In this Next version, `middleware.ts` has been renamed. The internationalization guide at `node_modules/next/dist/docs/01-app/02-guides/internationalization.md` references a **`proxy.ts`** file exporting a `proxy` function (with a `config.matcher`) instead of the old `middleware`. **Read that doc and the proxy/file-conventions doc under `node_modules/next/dist/docs/` before writing any code.** Also note `params` is now async (`await params`) and `PageProps`/`LayoutProps` global helpers exist.

## MVP Status

Required for MVP. Nothing renders at the correct URLs without this, and it is a hard product requirement.

## Dependencies

- Task 1 recommended (deps). Independent of Phase 1 logic.

## Files / Areas Likely Affected

- `next.config.ts` (apply the next-intl plugin, e.g. `createNextIntlPlugin`).
- New request-interception file at the repo/src root — **use the Next 16 name** the docs specify (`proxy.ts`, not `middleware.ts`). Prefer next-intl's own middleware/proxy helper if it is compatible with this Next version; otherwise implement the locale-detection/redirect per the internationalization doc.
- Restructure `src/app/` so pages live under `src/app/[locale]/` — move `page.tsx`, `play/page.tsx`, `select/page.tsx` under the new segment (their contents may still be stubs; do not implement page bodies here).
- `src/i18n/request.ts` — align with the plugin (locale coming from the route param; keep `fr` default).
- Possibly `src/i18n/routing.ts` (locales list `['fr']`, default `fr`) if using next-intl's routing helpers.

## Implementation Guidance

- Define supported locales as `['fr']` with default `fr` in a single source of truth.
- Apply the next-intl plugin in `next.config.ts` and preserve the existing `reactStrictMode` and `compiler.styledComponents` options.
- Create the `[locale]` segment and move the three existing route files under it. Keep page bodies as minimal stubs — full implementations are Tasks 13/15/16/21. The goal here is that `/fr`, `/fr/select`, `/fr/play` resolve and locale-less URLs redirect to the `/fr` equivalents.
- Reconcile `src/i18n/request.ts` with next-intl v4's expected API for the App Router (it may need `requestLocale`/`hasLocale` handling). Verify against next-intl v4 usage and the Next 16 docs.
- Ensure the proxy `config.matcher` excludes `_next` and static assets (including `/events/...` images and `favicon.ico`).
- Verify: navigating to `/` redirects to `/fr`; `/select` → `/fr/select`; unknown deep paths still resolve to a locale (Task 14 handles true 404 → home).

## Acceptance Criteria

- [ ] All app routes live under `src/app/[locale]/`.
- [ ] Visiting `/`, `/select`, `/play` redirects to the `/fr/...` equivalents.
- [ ] `/fr`, `/fr/select`, `/fr/play` all resolve (even if stub content).
- [ ] next-intl plugin applied; `useTranslations`/`getTranslations` work in a page (can be validated in Task 13).
- [ ] The interception file uses the correct Next 16 filename/API (per local docs), not the legacy `middleware` if renamed.
- [ ] `yarn build`, `yarn lint` pass; `yarn dev` serves the redirects.

## Testing Requirements

- Manual: hit `/`, `/select`, `/play` and confirm redirect to `/fr/...`.
- This behavior is also covered later by Cypress (Task 29); no unit test required here.

## Out of Scope

- Message content beyond a minimal smoke key (Task 12).
- 404 → home redirect for truly unknown routes (Task 14).
- Page/layout implementations (Tasks 13, 15, 16, 21).

## Recommended Agent Capability

Reasoning model. This is the highest-risk infra task: Next 16 renamed middleware→proxy, async params, and next-intl v4 App Router wiring all diverge from common training data. Must read local docs and reason carefully.
