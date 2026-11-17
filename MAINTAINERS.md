# 👥 Maintainers and Responsibilities

- **Repository:** `Brajesh31/coding-bird`
- **Default branch:** `main`
- **Primary maintainer:** Brajesh Kumar (`@Brajesh31`)

GitHub permissions remain controlled by repository settings. This file records responsibility, not technical access grants.

## Area ownership map

| Area | Primary paths | Review focus |
|---|---|---|
| Web experience | `apps/web/` | UI, accessibility, client/server boundaries |
| API and judging | `packages/api/` | tRPC, validation, driver safety, hidden tests |
| Authentication | `packages/auth/` | sessions, OAuth, token signing, authorization |
| Data layer | `packages/db/` | schema integrity, migrations, backups |
| Realtime collaboration | `apps/hocuspocus-server/` | tokens, room access, awareness, persistence |
| Virtual filesystem | `packages/ducklet-fs/` | path normalization, starter templates |
| Storage | `packages/storage/` | presigned URLs, ownership, MIME validation |
| System Design | `apps/web/src/lib/system-design/` | deterministic simulation and calibration |
| Shared tooling | `tooling/`, root config | workspace consistency, lint, type safety, CI |

Cross-cutting changes should list all affected areas. Security-sensitive changes require focused maintainer review and negative-path test evidence. Where a second reviewer is unavailable, record a self-review checklist.

Maintainer responsibilities include keeping `main` buildable, triaging security reports privately, reviewing dependency changes, and keeping documentation aligned with implementation.
