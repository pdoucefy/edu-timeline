# Task 3: Verify and finish ESLint + Prettier configuration

## Goal

Ensure linting and formatting run cleanly across the codebase and are wired into a simple developer workflow, resolving the "finish ESLint/Prettier" item in the `TODOS` file.

## Context

The repo has `eslint.config.mjs`, `.prettierrc`, and the relevant devDependencies (`eslint`, `eslint-config-next`, `eslint-config-prettier`, `eslint-plugin-prettier`, `@trivago/prettier-plugin-sort-imports`, `@typescript-eslint/*`). The `TODOS` file lists "finish ESLint/Prettier" as outstanding. Getting lint/format green now prevents noise in later feature PRs.

## MVP Status

Nice-to-have. Not user-facing, but strongly recommended early because it keeps every subsequent task's diffs clean and consistent.

## Dependencies

None.

## Files / Areas Likely Affected

- `eslint.config.mjs`
- `.prettierrc`
- `package.json` (scripts)
- Possibly small formatting fixes across existing files.

## Implementation Guidance

- Run the existing `yarn lint` and see what it reports. Fix configuration gaps rather than rewriting from scratch.
- Ensure Prettier and ESLint do not conflict (that's what `eslint-config-prettier` is for — confirm it's applied last).
- Confirm `@trivago/prettier-plugin-sort-imports` is configured in `.prettierrc` with a sensible import order (external → internal `@/*` → relative).
- Add convenient scripts if missing, e.g. `format` (prettier write) and `lint:fix`. Keep the existing `lint` script working.
- Run a format pass so the current (mostly boilerplate) codebase is clean. Keep this diff isolated to formatting.

## Acceptance Criteria

- [ ] `yarn lint` exits with no errors.
- [ ] A Prettier format command exists and the codebase is fully formatted.
- [ ] Import sorting is configured and applied.
- [ ] The `TODOS` "finish ESLint/Prettier" line can be considered done (update `TODOS` accordingly).

## Testing Requirements

- `yarn lint` returns clean.
- Running the format command a second time produces no changes (idempotent).

## Out of Scope

- Adding new lint rules that would require large refactors.
- CI configuration (deployment is Task 30).

## Recommended Agent Capability

Cheap coding model. Configuration and mechanical formatting with a clear pass/fail signal.
