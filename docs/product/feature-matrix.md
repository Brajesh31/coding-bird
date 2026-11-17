# 🧩 Product Feature Matrix

This matrix maps product areas to their verified implementation surfaces. It is an orientation aid, not a release checklist or a guarantee that every path is production-ready.

| Product area | Implementation surface | Main capabilities described by the repository | Key dependencies / boundaries |
|---|---|---|---|
| 🧩 Problems | Next.js problem pages, API problem/submission routers, driver generators | Multi-language editor, public runs, full submissions, verdicts and history | tRPC, PostgreSQL, generated drivers, external judge |
| 🤝 Collaborative Rooms / Ducklets | Ducklet pages, collaboration editor, Hocuspocus server | Shared editor, presence, chat, membership roles, Y.js persistence | Better Auth, room-scoped tokens, Hocuspocus, PostgreSQL |
| 🏗️ System Design | React Flow canvas, typed block registry, simulation engine | Architecture graph editing, topology validation, deterministic metrics and scoring | Client-side simulation, calibration suite |
| 💻 Machine Coding | Machine-coding catalogue, shared code workspace, challenge content | HTML/CSS/JS challenges, tests, attempt tracking, optional interview room | Code-defined challenge content, browser test runtime, room package |
| 🧪 Playground | Playground routes and API | Scratchpad coding workflows | Browser editor/runtime and judge integration as configured |
| 👤 Profiles / progress | Dashboard, profile and bookmark routers | User profile, progress points/streaks, saved problems | Better Auth and PostgreSQL |

## Cross-cutting capabilities

- Authentication uses Better Auth with GitHub and Google OAuth configuration.
- API procedures use tRPC and schema validation.
- PostgreSQL access is centralized in packages/db using Drizzle.
- Object storage uses an S3-compatible adapter.
- The monorepo is managed with pnpm and Turborepo.

## Important readiness distinction

A code path existing in the repository does not establish production readiness. Deployment credentials, isolated judge controls, private-room authorization, storage permissions, monitoring, backups, accessibility, and failure recovery must be validated in the target environment.
