# Task 12: French message catalog and typed access

## Goal

Populate the French translation catalog (`src/i18n/messages/fr.json`) with all user-facing strings the app needs, organized by feature, and ensure typed access via the existing `Messages` type.

## Context

The Product/Technical Specs require the app to be fully in French with i18n scaffolded for future locales. The repo has `src/i18n/messages/fr.json` (currently `{}`), `src/i18n/messages.ts` (exports `Messages = typeof fr`), and `src/i18n/request.ts`. All UI text must come from the catalog rather than being hardcoded, so components stay locale-driven.

## MVP Status

Required for MVP. French-only is a hard requirement and every screen shows text.

## Dependencies

- Task 11 (i18n wired) so keys can be validated in a running page.

## Files / Areas Likely Affected

- `src/i18n/messages/fr.json`
- `src/i18n/messages.ts` (only if the type needs adjustment)
- Possibly a short doc/comment describing the key structure for other tasks.

## Implementation Guidance

- Structure keys by feature namespace so component tasks know where to look, e.g.:
  - `common` (app name, back-to-home, loading, generic errors)
  - `home` (hero title/subtitle, start button)
  - `select` (title, chapter labels, summary toggle, for-fun toggle, difficulty labels easy/hard, start-game button)
  - `game` (place-this-event prompt, year label)
  - `endGame` (success message, failure headings, "events placed", "events remaining", "misplaced event year", back-to-home)
  - `errors` (data load failure, network error, "Some events could not be loaded", missing-image alt/placeholder)
- Write natural, correct **French** copy. Keep placeholders/interpolation values (e.g. counts) as ICU/next-intl message arguments (e.g. `"placed": "{count} événements placés"`).
- Do not hardcode these strings in components — later UI tasks will reference these keys. It's fine to add keys now that later tasks consume.
- Ensure `Messages = typeof fr` still type-checks and that the JSON is valid.
- Keep the file the single source of truth; do not create a second locale (French only), but keep structure clean so `en.json` could be added later.

## Acceptance Criteria

- [ ] `fr.json` contains organized namespaces covering home, select, game, end-game, common, and errors.
- [ ] All copy is in French and interpolation uses next-intl message arguments where counts/values appear.
- [ ] JSON is valid and `Messages` type compiles.
- [ ] A page using `useTranslations`/`getTranslations` can render at least one key (smoke check).
- [ ] `yarn build`, `yarn lint` pass.

## Testing Requirements

- Manual: render one translated string on a page to confirm the pipeline works.
- No unit test required.

## Out of Scope

- Consuming every key in components (done in the respective UI tasks).
- Additional languages.

## Recommended Agent Capability

Cheap coding model. Content authoring against a known structure; the risky wiring was done in Task 11.
