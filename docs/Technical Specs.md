# EduTimeline Technical Specification

## 1. Overview

EduTimeline is a French‑only web app that lets secondary‑school students practice historical dates by placing events on a timeline.
It is a functional clone of [Wikitrivia](https://wikitrivia.tomjwatson.com/) and will be delivered as a sub‑domain of the school’s coop website.
The first version will be deployed on Vercel for quick feedback, then discussed for future hosting on the school’s infrastructure.

## 2. Architecture

| Layer                    | Technology                                                 | Reason                                                        |
| ------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------- |
| **Frontend framework**   | **Next.js (app router)**                                   | Modern routing, server‑side rendering, static optimization.   |
| **State management**     | **React Context + useReducer** (no external library)       | Keeps the bundle light; Zustand is avoided per requirement.   |
| **Styling**              | Styled‑Components + Radix UI primitives                    | Component‑level theming, accessibility primitives.            |
| **Animations**           | Framer Motion                                              | Simple, declarative animations for drag‑and‑drop feedback.    |
| **Drag‑and‑Drop**        | dnd‑kit                                                    | Handles timeline placement and fallback keyboard mode.        |
| **Internationalization** | next-intl (or Next.js built‑in i18n)                       | French‑only locale, but scaffolded for future languages.      |
| **Data storage**         | TypeScript modules under `data/` exporting typed constants | Compile‑time static import, type safety, no runtime parsing.  |
| **Images**               | Stored in `public/events/` (original ≤ 800 px)             | No CDN, lightweight repo (≈ 10 MB total).                     |
| **Testing**              | Jest + React Testing Library (unit); Cypress (E2E)         | Core logic coverage, full‑flow verification.                  |
| **Deployment**           | Vercel (automatic builds) → optional static export later   | Quick preview URLs, easy switch to static if school requires. |

## 3. Data Model

```ts
// types/id.ts
/**
 * Generic identifier used throughout the data model. Currently a simple numeric value,
 * but the alias makes it easy to switch to another representation (e.g., UUID) later.
 */
export type ID = number;

// types/year.ts
export type SchoolYear = {
  id: ID;
  year: number; // e.g., 1
  chapters: Chapter[];
};

// types/chapter.ts
export type Chapter = {
  id: ID;
  chapterNumber: number;
  events: Record<DifficultyLevel, Event[]>;
};

// types/difficultyLevel.ts
/**
 * Difficulty levels for a chapter.
 * "easy" – base events only.
 * "hard" – base events plus extra events.
 */
export type DifficultyLevel = 'easy' | 'hard';

// types/event.ts
export type Event = {
  id: ID;
  name: string;
  date: Date; // JavaScript Date object for easier manipulation
  fileName: string; // File name only (images live in /public/events/)
};
```

## 4. Routes & Navigation

| Path (locale‑prefixed) | Description                                                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/fr/` (home)          | Landing page with school logo (link → school site).                                                                                                                                                       |
| `/fr/select`           | Level selection: chapter picker, summary mode, “for‑fun” toggle, difficulty selector.                                                                                                                     |
| `/fr/play`             | Game screen. Stores the selected `chapters` and `difficulty` in the URL query parameters (e.g., `?chapters=1,2&difficulty=easy`). If they are missing or invalid, the user is redirected to `/fr/select`. |
| `*` (unknown)          | Redirects to `/fr/` (home).                                                                                                                                                                               |

All routes are **locale‑mandatory**; visiting a non‑prefixed URL automatically redirects to its French counterpart.

## 5. Level Selection

The level‑selection screen allows the user to choose one or more chapters and a difficulty:

- **Single chapter** – pick a specific chapter.
- **Summary mode** – pick a chapter and automatically include all preceding chapters in the same school year.
- **For‑fun mode** – include every chapter from every year.
  After chapter(s) are chosen, the user selects a difficulty (`easy` or `hard`). The chosen chapters are encoded as short numeric IDs in the URL (e.g., `?chapters=1,2,3`).

## 6. Gameplay Flow

1. **Setup**
   - Load selected chapters, compute the event pool, shuffle.
   - First event is shown with its full date.
2. **Iteration**
   - Pull next random event (date hidden).
   - User places it on the timeline via drag‑and‑drop (or keyboard‑only dropdown when the toggle is on).
   - **Validation rules**:
     - Event must be placed _chronologically_ on the timeline below (i.e., between the two nearest events or at the start/end if no neighbors exist).
     - Only years are displayed in the UI, but the validation always compares the full `Date` objects for ordering.
     - If 2 events share the same date, they can be placed in either order relative to each other without penalty.
3. **Success** → reveal year, add to timeline, continue.
4. **Failure** → transition to **End‑of‑Game** screen.
5. **End‑of‑Game**
   - **Success**: congratulatory message, “Back to home” button.
   - **Failure**: show number of correctly placed events, remaining events, and the year of the misplaced event.

### Game Event Pool Resolving

The resolver receives a `DifficultyLevel[]` map that indicates which difficulty tier(s) to pull from each selected chapter (e.g., `["easy"]` for base events only or `["easy","hard"]` to include extra events). It merges the corresponding `events` arrays from all selected chapters, deduplicates by `event.id`, and returns the final pool.

### Edge Cases & Fallbacks

| Situation                            | Handling                                                                                                                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Duplicate events across chapters     | Deduplicate silently by `id`.                                                                                                                                          |
| Missing image file                   | Render a placeholder image; log warning to console.                                                                                                                    |
| Invalid event data (bad date)        | Skip the offending event, show a non‑intrusive toast “Some events could not be loaded.”                                                                                |
| Static TS import fails (build‑time)  | Full‑screen error page with “Failed to load game data – contact admin.” (should never happen in production).                                                           |
| Network error (unlikely)             | Full‑screen error page with “Unable to load resources – retry.” (coverage for future external assets).                                                                 |
| User accesses a route without locale | Immediate redirect to the French version (`/fr/...`).                                                                                                                  |
| Very small viewport (mobile)         | Layout should be responsive; UI components will be implemented with responsive design in mind, and the corresponding tasks will include responsiveness considerations. |
| Keyboard‑only mode toggle            | When enabled, replace drag‑and‑drop with a dropdown of possible insertion points. Marked **nice‑to‑have**; can be added after core gameplay is stable.                 |
| Image sizing                         | Images stored at ≤ 800 px width; no automatic resizing in‑app. Developers should resize before committing (simple script can be added later if needed).                |

## 7. Non‑Functional Requirements

- **Performance**: All data is statically imported; no runtime fetches → instant load.
- **Responsiveness**: Primary target desktop; mobile layout degrades gracefully.
- **Accessibility**: ARIA labels for draggable items, focus management, keyboard‑only fallback (nice‑to‑have).
- **Internationalization**: French strings only; scaffold ready for future locales.
- **Scalability**: Adding new chapters/events is as simple as creating a new TS file under `data/`.

## 8. What Is **Not** Included

- **Authentication / user accounts**
- **Content Management System** – static files serve as the source of truth.
- **Database** – no server‑side persistence.
- **Multilingual support** – French only, but i18n scaffold present.
- **Full mobile‑first design** – mobile support is optional and may be limited.
- **Comprehensive WCAG compliance** – basic ARIA + keyboard fallback only.
- **Storybook** – not required for this project size.

## 9. Testing Strategy

- **Unit tests (Jest + React Testing Library)**
  - `combineEventPools()` – verifies correct merging and deduplication.
  - `validatePlacement()` – covers year‑only, full‑date, identical‑date scenarios.
  - Keyboard‑only toggle state changes.
- **End‑to‑End tests (Cypress)**
  - Full game flow: start → success path, start → failure path.
  - Route redirects for invalid parameters and unknown URLs.
  - Responsive layout switch (desktop vs. forced mobile).
- **Coverage goal**: ≥ 80 % statements on core utilities; UI component coverage can be lower.

## 10. Component & Layout Tasks (for the downstream LLM)

The task‑breakdown agent should create **one task per UI element** (manual implementation, not auto‑generated):

1. Layout wrapper (header with school logo, locale prefix)
2. Home page hero + start button
3. Level‑selection page (chapter list, summary toggle, for‑fun toggle, difficulty selector)
4. Timeline component (horizontal axis, drop zones)
5. Event card (image, name, hidden/visible date)
6. Drag‑and‑drop integration (dnd‑kit)
7. Keyboard‑only dropdown fallback (nice‑to‑have)
8. End‑of‑Game screen (success & failure variants)
9. Global state provider (React Context + reducer)
10. Data loader (static TS imports, type definitions)
11. Error pages (full‑screen error, placeholder image handling)
12. Route guard / redirect logic for locale & invalid state
13. i18n scaffolding (French strings)
14. Vercel CI/CD configuration (vercel.json if needed)

Each task should include:

- **Description** – concise summary of what the task delivers.
- **Expected inputs/outputs** – props, state slices, or files produced.
- **Dependencies** – other tasks that must be completed first (e.g., the timeline component must exist before the drag‑and‑drop integration).
- **Estimated complexity** – low / medium / high.
- **Responsiveness** – indicate whether the component must be responsive; for UI tasks this should be marked **yes** (the task will include responsive design considerations).
- **Accessibility** – note any ARIA or keyboard‑navigation requirements (optional for MVP, but include when relevant).
- **Testing** – specify which tests are needed (unit, integration, E2E) and the expected outcomes (e.g., drag‑and‑drop success/failure, keyboard navigation).
- **Acceptance criteria** – concrete conditions that define “done” (e.g., component renders without errors, passes all tests, matches design mockup).
- **Priority** – **essential** for the MVP or **nice‑to‑have**.

## 11. Deployment on Vercel

1. **Create a Vercel project** and link the GitHub repository.
2. Vercel auto‑detects a Next.js app; default build command `npm run build`.
3. No environment variables are required for the first release.
4. Enable **Automatic Deployments** on the `main` branch to get preview URLs after each push.
5. After the first preview is approved, promote it to production.
6. When the school is ready, configure a custom sub‑domain (e.g., `edu-timeline.coopcvm.com`) in Vercel’s dashboard and point the DNS CNAME to Vercel.

_Future note_: If the school’s infrastructure cannot run Node.js, the repo can be switched to a **static export** (`next export`) and the generated `out/` folder can be served from any static web server.

---

_This document is intended for the downstream LLM that will generate a detailed task breakdown._
