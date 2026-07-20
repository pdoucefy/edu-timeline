# Task 1: Install and pin missing runtime dependencies

## Goal

Add the frontend libraries required by the Technical Specification that are not yet installed: Radix UI primitives, Framer Motion, and dnd-kit.

## Context

`package.json` already includes `next`, `react`, `next-intl`, and `styled-components`. The Technical Specification (section 2) also requires Radix UI, Framer Motion, and dnd-kit for the UI, animations, and drag-and-drop. None of these are installed yet. Installing them up front unblocks all later UI and gameplay tasks and produces a single clean "dependencies" commit.

## MVP Status

Required for MVP. Radix, Framer Motion, and dnd-kit are all used by core MVP features (selection UI, timeline animations, drag-and-drop gameplay).

## Dependencies

None. This is a foundational task.

## Files / Areas Likely Affected

- `package.json`
- `yarn.lock`

## Implementation Guidance

- This repo uses **Yarn** (a `yarn.lock` is present). Use `yarn add` so the lockfile stays consistent.
- Install:
  - dnd-kit: the core package plus the sortable/modifiers helpers as needed (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/modifiers`, `@dnd-kit/utilities`).
  - Framer Motion (`framer-motion`).
  - Radix UI primitives. Radix is distributed as many small packages; install only what the selection/end-game UI will plausibly need (e.g. a radio group, toggle/toggle-group, and slot/visually-hidden). Do not install every Radix package — prefer the individual primitive packages the later UI tasks reference.
- Verify versions are compatible with React 19 / Next 16. If a package has a React 19 peer-dependency warning, note it in the commit message rather than downgrading React.
- Do not add Zustand or any other state library — the spec mandates React Context + useReducer instead.

## Acceptance Criteria

- [x] `framer-motion`, `@dnd-kit/core` (and needed dnd-kit helpers), and the chosen Radix primitive packages appear in `package.json` dependencies.
- [x] `yarn install` completes without errors.
- [x] `yarn build` still succeeds (no code changes should break the build).
- [x] No new state-management library added.

## Testing Requirements

- Run `yarn install` and `yarn build`; both must succeed.
- No automated tests required for this task.

## Out of Scope

- Writing any components or using the libraries.
- Test tooling (covered in Task 4).

## Recommended Agent Capability

Cheap coding model. This is a mechanical dependency-management task with clear boundaries.
