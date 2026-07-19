# Task 2: styled-components SSR registry, ThemeProvider, and theme tokens

## Goal

Set up styled-components correctly for the Next.js App Router (SSR style registry) and populate the currently-empty `src/styles/theme.ts` with a shared theme, exposed to the app via a `ThemeProvider`.

## Context

`next.config.ts` already sets `compiler.styledComponents: true`, and `styled-components@^6` is installed. However, the App Router requires a **style registry** component so server-rendered styles are collected and injected without hydration flicker. `src/styles/theme.ts` exists but is empty. Establishing the theme and registry now gives every later UI task a consistent styling foundation and avoids FOUC.

## MVP Status

Required for MVP. Every UI component depends on styled-components rendering correctly under SSR and on shared theme tokens.

## Dependencies

- Task 1 (dependencies installed) — not strictly required for styled-components itself, but recommended to keep foundation commits ordered.

## Files / Areas Likely Affected

- New styled-components registry component (e.g. `src/styles/StyledComponentsRegistry.tsx` or `src/components/StyledComponentsRegistry.tsx`).
- `src/styles/theme.ts`
- Optionally a typed theme declaration (e.g. `src/styles/styled.d.ts`) to type `DefaultTheme`.
- The registry will later be consumed by the root layout (Task 13); this task only creates it.

## Implementation Guidance

- **Read `node_modules/next/dist/docs/` first.** This is Next.js 16, which differs from older versions. Confirm the current recommended pattern for a styled-components registry using `useServerInsertedHTML` and a client component (`'use client'`).
- Create a client-component registry that collects styles with `ServerStyleSheet` and flushes them via `useServerInsertedHTML`.
- Define a theme in `src/styles/theme.ts`. Draw inspiration from Wikitrivia's look (the client likes it): a clean, high-contrast palette, spacing scale, radii, and typography tokens. Keep it small and practical — colors, spacing, font sizes, border radii, z-index layers.
- Add TypeScript augmentation so `DefaultTheme` matches the theme shape (developers get autocomplete in styled templates).
- Export the theme object as the default or a named export the layout can import.
- Do NOT wire it into the layout here (that is Task 13). Just make the registry and theme importable and self-contained.

## Acceptance Criteria

- [ ] A styled-components registry client component exists and compiles.
- [ ] `src/styles/theme.ts` exports a typed theme object with at least colors, spacing, typography, and radii.
- [ ] `DefaultTheme` is augmented so `props.theme` is typed in styled templates.
- [ ] `yarn build` succeeds.

## Testing Requirements

- `yarn build` must succeed.
- Manual: confirm no TypeScript errors when referencing `props.theme` fields in a styled component.

## Out of Scope

- Applying the theme/registry in the layout (Task 13).
- Global CSS reset changes beyond what the theme needs.

## Recommended Agent Capability

Strong coding model. The SSR registry pattern is version-sensitive and easy to get subtly wrong (hydration/FOUC), so it benefits from careful reading of the Next 16 docs.
