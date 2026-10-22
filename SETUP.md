# Local Setup Guide

A complete, step-by-step guide to running **Coding Bird** on your machine. If you
just want the short version, the [README Quick Start](README.md#local-development-setup)
covers the happy path — come back here when something doesn't work.

## What you'll be running

| Process            | Where it runs              | Port | Started by                |
| ------------------ | -------------------------- | ---- | ------------------------- |
| Next.js web app    | host (`pnpm dev`)          | 3001 | `pnpm dev` / `dev:next`   |
| Hocuspocus server  | host (`pnpm dev`)          | 5000 | `pnpm dev`                |
| PostgreSQL 15      | Docker                     | 5433 | `make services` / `docker compose up -d` |
| Redis 7            | Docker                     | 6380 | `make services` / `docker compose up -d` |

Two things people trip on immediately:

- **The web app runs on port 3001**, not 3000. Auth callbacks and `BASE_URL`
  must use 3001.
- **Postgres is exposed on host port 5433**, not the default 5432, so it
  doesn't collide with a Postgres you may already have running locally.

> Redis is started by docker-compose but no app code currently depends on it —
> if the Redis container is unhealthy, nothing breaks.

## 1. Prerequisites

- **Node.js `^22.12.0` or `^23`** — check with `node --version`.
- **pnpm `^10.19.x`** — easiest via corepack, which reads the version pinned in
  `package.json`:

  ```bash
  corepack enable
  corepack prepare --activate
  ```

- **Docker** with the compose plugin (`docker compose version` should work).

## 2. Clone and install

```bash
git clone <repo-url> coding-bird
cd coding-bird
pnpm install
```

`pnpm install` runs [`sherif`](https://github.com/QuiiBz/sherif) as a
postinstall workspace lint. If it warns about private root dependencies, the install still succeeded.

## 3. Configure `.env`

Copy the example file:

```bash
cp .env.example .env
```

The defaults work out of the box with the local Docker services.

## 4. Start local services

```bash
docker compose up -d
# or via Makefile:
make services
```

This starts:
- `codingbird-db` on `localhost:5433`
- `codingbird-redis` on `localhost:6380`

## 5. Prepare the database

Apply the Drizzle schema and seed example problems:

```bash
pnpm --filter @acme/db push
pnpm --filter @acme/db seed
```

## 6. Run the development server

```bash
pnpm dev        # full stack: web (3001) + hocuspocus (5000) via turbo watch
# or
pnpm dev:next   # only the web app (collaborative room realtime sync won't connect)
```

The first compile of a page compiles on demand via Turbopack; subsequent loads are fast.

## 7. Verify it works

1. Open <http://localhost:3001> — landing page renders.
2. Sign in with the OAuth provider configured in `.env`.
3. **Problems**: open a problem, view the editor, and run test cases.
4. **Collaborative Rooms**: create a room — the in-browser WebContainer boots and files sync in real time. Open the same room in another window to test live pair programming.
5. **System Design**: open a level, connect architecture blocks, and run the traffic simulator.

### Credentials Summary

| Feature | Needs |
| --- | --- |
| Browsing, auth, profiles, dashboard | nothing extra |
| Collaborative Rooms (editing, WebContainer, chat) | nothing extra |
| System Design simulation game | nothing extra |
| Running code submissions | real `JUDGE_API_TOKEN` |
| File uploads & persistent snapshots | real `R2_*` credentials |
| AI ghost-text completion | `MISTRAL_API_KEY` |

## Day-to-day commands

```bash
pnpm dev                                # full stack dev server
pnpm --filter @acme/db studio           # browse the database (Drizzle Studio)
pnpm lint:fix                           # ESLint autofix
pnpm format:fix                         # Prettier format
pnpm typecheck                          # TypeScript across all packages
pnpm -F @acme/nextjs exec node --test --import ./src/lib/system-design/__tests__/_loader.mjs src/lib/system-design/__tests__/calibration.test.ts # System Design tests
make down                               # stop containers (data preserved)
```

## Troubleshooting

**"Invalid environment variables" on startup**
Check `.env` for valid formatting. In `apps/web/src/env.ts`, `emptyStringAsUndefined: true` is enabled to gracefully handle unset optional variables.

**`ECONNREFUSED` / can't reach Postgres**
Ensure containers are running (`docker compose ps`) and `POSTGRES_URL` targets port **5433**.

**OAuth error / `redirect_uri_mismatch`**
`BASE_URL` must match `http://localhost:3001`, and the callback URL in your OAuth app must match `http://localhost:3001/api/auth/callback/<provider>`.

**Hocuspocus crashes immediately / Rooms won't sync**
Ensure `pnpm dev` is running (which starts the Hocuspocus server on port 5000 alongside the web app) and that port 5000/5001 is not held by another process.

**Room preview/terminal never boots**
WebContainers require `SharedArrayBuffer` with `COOP/COEP` headers. Use a modern Chromium-based browser or Firefox and access via `http://localhost:3001`.
