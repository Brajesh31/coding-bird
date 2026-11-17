# 🏛️ Repository Governance

Coding Bird is a multi-surface developer learning platform in a pnpm/Turborepo monorepo. Its current product areas are Problems, Collaborative Rooms/Ducklets, System Design, and Machine Coding/Playground.

## Principles

1. Security boundaries take precedence over convenience, especially for user-submitted code, private collaboration documents, authentication, storage, and secrets.
2. Preserve package boundaries: apps may depend on packages; packages must not depend on apps.
3. Keep database and server-only credentials out of client bundles.
4. Commit the pnpm lockfile with dependency manifest changes.
5. Document only behavior verified in code. Label assumptions, limitations, and roadmap items.
6. Do not break persisted data, API contracts, collaboration protocols, or challenge calibration without a migration and test plan.

## Change expectations

- Feature changes identify affected apps/packages, user-visible behavior, API/schema impact, security implications, and verification steps.
- Schema changes include migration, backfill, and rollback notes where applicable.
- Auth/collaboration changes test unauthenticated, unauthorized, expired, revoked, and cross-resource access.
- Judge changes test affected language drivers and runner contracts.
- System Design changes preserve or deliberately recalibrate scoring and challenge difficulty.

## Review and release integrity

Review correctness, maintainability, privacy, accessibility, performance, dependency impact, operations, and documentation. A passing typecheck is not proof of authorization correctness. Releases identify commit, migration requirements, environment changes, external services, known limitations, and rollback procedure. Never publish unverified feature or security claims.

## Security escalation

Use the private reporting route in `SECURITY.md`. Do not publish exploit details, secrets, personal data, or private room content in public issues.
