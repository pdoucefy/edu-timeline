# Task 4: Set up Jest + React Testing Library

## Goal

Install and configure Jest and React Testing Library so that unit tests for core utilities and components can be written and run.

## Context

The Technical Specification (section 9) mandates unit tests with Jest + React Testing Library, targeting ≥ 80% statement coverage on core utilities (`combineEventPools`, `validatePlacement`, selection resolver, keyboard-toggle state). None of this tooling is installed. Establishing it before the domain-logic tasks lets those tasks ship with tests in the same commit.

## MVP Status

Required for MVP. The spec makes unit testing of core logic part of the definition of done, and the riskiest logic (placement validation, pool merging) needs test coverage.

## Dependencies

None (can run in parallel with Tasks 1–3).

## Files / Areas Likely Affected

- `package.json` (devDependencies + `test` script)
- Jest config (e.g. `jest.config.ts`)
- Jest setup file for RTL (e.g. `jest.setup.ts`)
- Possibly `tsconfig` adjustments or a Babel/SWC transform config for TS/TSX + ESM.

## Implementation Guidance

- Use **Yarn** to add dev deps: `jest`, `@types/jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jest-environment-jsdom`, and a TypeScript transform. Prefer Next.js's built-in Jest support (`next/jest`) if compatible with this Next 16 version — **check `node_modules/next/dist/docs/` for the current testing guide** before choosing the transform strategy.
- Configure the `@/*` path alias in Jest's `moduleNameMapper` to match `tsconfig.json`.
- Set the test environment to `jsdom` for component tests.
- Register `@testing-library/jest-dom` matchers in the setup file.
- Add a `test` script (and optionally `test:watch`, `test:coverage`) to `package.json`.
- Include one trivial smoke test (e.g. a sanity `expect(true).toBe(true)` or a tiny render test) to prove the harness runs. Later tasks will add real tests.
- Ensure `styled-components` components can render in tests (no special config usually needed, but verify the smoke test can render a simple styled component).

## Acceptance Criteria

- [ ] `yarn test` runs and the smoke test passes.
- [ ] The `@/*` alias resolves inside tests.
- [ ] `@testing-library/jest-dom` matchers are available in tests.
- [ ] A coverage command exists.
- [ ] `yarn build` and `yarn lint` still pass.

## Testing Requirements

- `yarn test` passes with at least the smoke test.

## Out of Scope

- Cypress / E2E setup (Task 29).
- Writing real feature tests (those live in their respective tasks).

## Recommended Agent Capability

Strong coding model. Jest + TS + ESM + Next 16 transform config is a known source of friction and benefits from careful doc reading.
