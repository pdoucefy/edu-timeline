# Task 30: Vercel deployment configuration

## Goal

Prepare the project for deployment on Vercel and document the deployment/promotion steps, so the client can access a live preview for early-June feedback.

## Context

Product Spec ("Deployment") and Technical Spec section 11: the first version is deployed on Vercel for quick feedback, with a future option to switch to static export for the school's infrastructure. Vercel auto-detects Next.js; no environment variables are required for the first release. A custom subdomain (`edu-timeline.coopcvm.com`) is a later step done in the Vercel dashboard/DNS.

## MVP Status

Required for MVP delivery (the client reviews via the Vercel preview), though it's the final step and depends on a working app.

## Dependencies

- A working, building app — ideally after Task 23 (playable) and Tasks 24/25 (polish). Can be prepared earlier but only meaningfully verified once the app runs.

## Files / Areas Likely Affected

- Possibly `vercel.json` (only if defaults need overriding — the spec says defaults should work).
- `README.md` and/or a short deployment doc under `docs/`.
- `.gitignore` sanity check (`.next/`, `node_modules/`, Cypress artifacts).

## Implementation Guidance

- Confirm `yarn build` succeeds cleanly from a fresh install — this is what Vercel runs.
- Vercel auto-detects Next.js and uses `next build`; **only add `vercel.json` if something needs overriding** (per spec, defaults should suffice). Do not add config speculatively.
- Verify `.gitignore` excludes build output (`.next/`), `node_modules/`, and Cypress video/screenshot artifacts so they aren't committed.
- Document the deployment steps from Technical Spec section 11 in the README or a `docs/deployment.md`: link GitHub repo to Vercel, enable automatic deployments on `main`, promote preview → production, and (future) configure the `edu-timeline.coopcvm.com` subdomain + DNS CNAME.
- Note the future static-export fallback (`out/`) mentioned in the spec for the school's infrastructure, without implementing it now.
- No environment variables are needed for the first release — state this explicitly in the doc.
- Do NOT perform the actual Vercel account linking / DNS changes (those require dashboard access and client involvement); prepare the repo and document the process.

## Acceptance Criteria

- [ ] `yarn build` succeeds from a clean install.
- [ ] `.gitignore` excludes build output and test artifacts.
- [ ] Deployment steps (link repo, auto-deploy on `main`, promote, future subdomain/DNS) are documented.
- [ ] `vercel.json` added only if genuinely required (otherwise deliberately omitted, with a note that defaults are used).
- [ ] The future static-export option is noted.

## Testing Requirements

- Verify a clean `yarn install && yarn build` from scratch.
- No automated tests; verification is the successful build + documented steps.

## Out of Scope

- Actually creating the Vercel project / DNS changes (require dashboard + client).
- Static export implementation.
- CI test gating (optional future improvement).

## Recommended Agent Capability

Cheap coding model. Mostly verification and documentation with minimal/no config.
