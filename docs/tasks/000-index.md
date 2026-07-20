# EduTimeline — Implementation Task Index

This directory contains the ordered implementation backlog for EduTimeline, derived from `docs/Product Specs.md` and `docs/Technical Specs.md`. Each task is a self-contained brief for a coding agent.

> **Global rule (from `AGENTS.md`):** This is Next.js **16.2.4** — APIs differ from older versions (e.g. `middleware.ts` → `proxy.ts`, async `params`/`searchParams`, `PageProps`/`LayoutProps` helpers). **Read the relevant guide in `node_modules/next/dist/docs/` before writing routing/i18n/metadata/error code.** The repo uses **Yarn** and a `@/*` → `./src/*` path alias.

## Existing scaffolding (do NOT recreate)

Directory skeleton (`src/app`, `components`, `data`, `i18n`, `styles`, `types`); `next-intl` dependency + partial `src/i18n/request.ts` + `messages.ts` + empty `fr.json`; `styled-components` dependency + `compiler.styledComponents: true`; ESLint/Prettier config. Everything else (types, data, theme, components, locale routing, gameplay) is empty/missing.

---

## 1. Complete ordered task list

### Phase 0 — Foundation & tooling

- `001-install-dependencies.md` — Radix UI, Framer Motion, dnd-kit
- `002-styled-components-registry-theme.md` — SSR registry + ThemeProvider + theme
- `003-eslint-prettier.md` — finish lint/format
- `004-jest-rtl-setup.md` — Jest + React Testing Library

### Phase 1 — Data model & domain logic

- `005-domain-types.md` — ID, SchoolYear, Chapter, Event, DifficultyLevel
- `006-static-data-placeholder-content.md` — static data + placeholder sample content
- `007-data-loader-validation.md` — loader, date hydration, invalid-data + image handling
- `008-combine-event-pools.md` — pool merge + dedup (+ unit tests)
- `009-validate-placement.md` — chronological placement validation (+ unit tests)
- `010-chapter-selection-resolver.md` — single / summary / for-fun (+ unit tests)

### Phase 2 — Routing, i18n, layout

- `011-locale-routing-proxy.md` — `[locale]` segment + proxy + next-intl plugin
- `012-i18n-messages.md` — French catalog + typed access
- `013-root-layout-header.md` — locale layout, providers, school-logo header
- `014-unknown-route-redirect.md` — 404 → home

### Phase 3 — Pages & presentational components

- `015-home-page.md` — hero + start button
- `016-level-selection-page.md` — chapter list, modes, difficulty, URL encoding
- `017-event-card.md` — image, name, hidden/visible year
- `018-timeline-component.md` — horizontal axis + insertion slots (static)
- `019-end-of-game-screen.md` — success & failure variants

### Phase 4 — State & gameplay integration

- `020-game-state-provider.md` — Context + useReducer game state
- `021-play-route-bootstrap.md` — parse/validate URL, bootstrap or redirect
- `022-dnd-kit-integration.md` — drag-and-drop → insertion index
- `023-game-loop-wiring.md` — placement → validate → advance → end

### Phase 5 — Edge cases, nice-to-haves, testing, deploy

- `024-error-pages.md` — full-screen errors + invalid-data toast
- `025-metadata-favicon.md` — titles, description, favicon
- `026-keyboard-fallback.md` — keyboard-only dropdown placement _(nice-to-have)_
- `027-responsiveness-pass.md` — responsive polish _(nice-to-have)_
- `028-accessibility-hardening.md` — ARIA + focus _(nice-to-have)_
- `029-cypress-e2e.md` — Cypress setup + core E2E flows
- `030-vercel-deployment.md` — Vercel config + deployment docs

---

## 2. Implementation phases summary

| Phase | Theme                        | Outcome                                          |
| ----- | ---------------------------- | ------------------------------------------------ |
| 0     | Foundation & tooling         | Deps installed, styling/SSR + test harness ready |
| 1     | Data & domain logic          | Types, data, and pure game logic (tested)        |
| 2     | Routing, i18n, layout        | Locale-mandatory routing + app shell renders     |
| 3     | Pages & components           | All screens/components exist (static)            |
| 4     | State & gameplay             | End-to-end playable game                         |
| 5     | Edges, extras, tests, deploy | Hardened, tested, deployable                     |

---

## 3. Dependency graph

```text
Phase 0 (parallelizable):
  001 ── 002
  003 (independent)
  004 (independent)

Phase 1:
  005 → 006 → 007 ─┬→ 008
                   ├→ 009
                   └→ 010
  (008/009/010 need 004 for tests)

Phase 2:
  011 → 012 → 013         (013 also needs 002)
  011 → 014               (014 needs 013)

Phase 3 (each needs 013 + 012):
  015
  016  (also needs 010, 007)
  017  (also needs 007)
  018  (needs 017)
  019

Phase 4:
  008,009 → 020
  020,016,010,008,007,011 → 021
  018,017,020 → 022
  020,021,022,018,017,019,009 → 023

Phase 5:
  007,017,013,012 → 024
  013,012 → 025
  023 → 026 → (informs) 029
  013/15/16/17/18/19/23 → 027
  022/023/26 → 028
  14,21,23,16 → 029
  (working app) → 030
```

Critical path to a playable game:
`001 → 002 → 011 → 012 → 013` and `005 → 006 → 007 → {008,009,010}` converge into `020 → 021 → 022 → 023`.

---

## 4. First usable milestone

- **First renders as a real app:** after **013 + 015** — locale-aware `/fr` home page with the school-logo header and theme. Deployable as a "coming soon" style preview.
- **First fully playable MVP:** after **023** — start → select → drag-and-drop play → win/lose end screen, French, static placeholder data. This is the milestone to show the client.

---

## 5. Highest-risk areas (extra review)

1. **`009-validate-placement`** — year-display-vs-full-date ordering and tied-date rules; correctness of every move depends on it.
2. **`020-game-state-provider` + `023-game-loop-wiring`** — win/lose transitions, first-event seeding, failure-stat accounting.
3. **`011-locale-routing-proxy`** — Next 16 `proxy.ts` (renamed from middleware), async params, next-intl v4 App Router wiring; diverges heavily from common knowledge.
4. **`022-dnd-kit-integration`** — dnd-kit + Framer Motion + slot-index mapping under a client boundary.
5. **`021-play-route-bootstrap`** — async `searchParams`, valid/invalid redirect contract.
6. **`029-cypress-e2e`** — deterministic, non-flaky drag-and-drop E2E.

---

## 6. Where to use a stronger model

- **Reasoning model:** `009`, `011`, `020`, `021`, `022`, `023`, `029`.
- **Strong coding model:** `002`, `004`, `007`, `008`, `010`, `013`, `014`, `016`, `018`, `024`, `026`, `028`.
- **Cheap coding model:** `001`, `003`, `005`, `006`, `012`, `015`, `017`, `019`, `025`, `027`, `030`.

### Models to use

- **Cheap coding model:** DeepSeek V4 Flash
- **Strong coding model:** Kimi K2.6
- **Reasoning model:** Claude Opus 4.8

---

## 7. Assumptions made during task creation

1. **Placeholder content:** real curriculum events/images don't exist in the repo; data tasks scaffold placeholder sample content (2 years × 3 chapters, easy/hard) sufficient to play. Real content authoring is an external, non-agent dependency. _(Confirmed with stakeholder.)_
2. **Full testing in scope:** Jest+RTL (unit) and Cypress (E2E) are both set up and used, matching the Technical Spec. _(Confirmed.)_
3. **Nice-to-haves are separate tasks after MVP:** keyboard fallback (026), responsiveness (027), accessibility hardening (028). _(Confirmed.)_
4. **File layout uses `src/`** (the repo's actual layout), even though the spec's code snippets show top-level `types/`/`data/`. Types/data/logic live under `src/`.
5. **Yarn** is the package manager (a `yarn.lock` is present).
6. **Next 16 conventions** apply: `proxy.ts` instead of `middleware.ts`, async `params`/`searchParams`, Metadata API, `error.tsx`/`not-found.tsx` boundaries — agents must verify against `node_modules/next/dist/docs/`.
7. **French only**, but i18n is fully wired for future locales (single source of truth for `['fr']`).
8. **Game state is URL-derived, not persisted:** refresh/external access starts a fresh game; "new game" means going back through `/select`.
9. **`hard` difficulty = base + extra events** (Product Spec: extra events "on top of" base), so the `hard` pool is a superset of `easy`.
10. **`placedCount` excludes the initially-seeded first event** (per Product Spec End-of-Game wording).
11. **No `vercel.json` unless required** — Vercel's Next.js auto-detection is assumed sufficient for v1.
12. **Deployment is prepared and documented, not executed** — actual Vercel linking and DNS require dashboard access and client involvement.
