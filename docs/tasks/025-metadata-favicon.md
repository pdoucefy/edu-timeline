# Task 25: Metadata, favicon, and tab titles

## Goal

Replace the default `create-next-app` metadata with proper app metadata (localized titles, description) and set an appropriate favicon, resolving the `TODOS` "favicon, tab titles, ...?" item.

## Context

The current `src/app/layout.tsx` still exports the default metadata (`title: 'Create Next App'`). The `TODOS` file lists "favicon, tab titles, ...?". Proper metadata makes the deployed preview look finished for the client's early-June review.

## MVP Status

Nice-to-have. Not gameplay-critical, but cheap and improves the client's first impression.

## Dependencies

- Task 13 (layout in place), Task 12 (French strings for titles/description).

## Files / Areas Likely Affected

- `src/app/[locale]/layout.tsx` and/or per-page metadata exports.
- `src/app/favicon.ico` and any icon assets in `public/`.

## Implementation Guidance

- **Check `node_modules/next/dist/docs/` for the Next 16 Metadata API** (static `metadata` export vs `generateMetadata`, and how it interacts with `[locale]`). Use `generateMetadata` if you want the locale/title to be dynamic.
- Set a meaningful app title (e.g. "EduTimeline") and a French description. Consider per-route titles (home, select, play) using a title template.
- Replace the default favicon with an appropriate icon. A simple placeholder is acceptable if no official asset exists — note it should be replaced with the school/product icon later.
- Ensure `<html lang>` remains locale-driven (from Task 13) and metadata `lang`/locale align.
- Keep copy in French (from the catalog where it's user-facing).

## Acceptance Criteria

- [ ] Browser tab shows a proper app title (not "Create Next App"), ideally per-route.
- [ ] A non-default favicon is set.
- [ ] Description metadata is present and in French.
- [ ] `TODOS` favicon/title item can be marked done.
- [ ] `yarn build`, `yarn lint` pass.

## Testing Requirements

- Manual: check tab title on `/fr`, `/fr/select`, `/fr/play` and confirm favicon.

## Out of Scope

- Open Graph / social preview images (not required by spec).
- SEO beyond basic metadata (app is behind a school subdomain).

## Recommended Agent Capability

Cheap coding model. Metadata configuration with a clear checklist.
