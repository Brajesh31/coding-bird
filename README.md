# Coding Bird

> An interactive developer learning and collaboration platform for solving algorithmic problems, simulating real-world architectures, and coding together in real time.

Coding Bird integrates four primary engineering experiences into a cohesive Turborepo monorepo:
1. **Algorithmic Problem Judging**: LeetCode-style challenges across 10 programming languages with an isolated code-driver execution engine.
2. **Collaborative Coding Rooms**: Real-time multi-file workspaces powered by Y.js CRDTs, Hocuspocus WebSockets, and in-browser WebContainer runtimes.
3. **Interactive System Design Simulation**: A drag-and-drop architectural canvas powered by React Flow with deterministic client-side traffic and failure simulation.
4. **Machine Coding & Playground**: In-browser front-end and full-stack component challenges and scratchpad evaluation.

---

## Table of Contents

- [Motivation & Target Audience](#motivation--target-audience)
- [Core Features](#core-features)
- [Architecture & Monorepo Layout](#architecture--monorepo-layout)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Configuration](#environment-configuration)
- [Database Management](#database-management)
- [Real-Time Collaboration Infrastructure](#real-time-collaboration-infrastructure)
- [Code Execution Architecture](#code-execution-architecture)
- [Testing & Quality Assurance](#testing--quality-assurance)
- [Deployment](#deployment)
- [Security Model](#security-model)
- [Known Limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Contributing & License](#contributing--license)

---

## Motivation & Target Audience

Preparing for software engineering interviews and real-world systems work is often fragmented:
- Algorithmic platforms only test isolated functions without practical project structure.
- Collaborative code scratchpads rarely provide real execution terminals or reliable multi-file sync.
- System design preparation typically relies on static whiteboard drawing without immediate feedback on whether an architecture survives traffic spikes, node failures, or latency budgets.

**Coding Bird** bridges these domains for:
- **Software Engineers** preparing for algorithmic, machine-coding, and distributed systems interviews.
- **Engineering Teams & Interviewers** conducting structured technical interviews with live shared workspaces.
- **Students & Self-Learners** learning how caching, queues, load balancing, and replication behave under load.

---

## Core Features

### 1. Multi-Language Problem Judging
- **10 Supported Languages**: Python (`py`), JavaScript (`js`), TypeScript (`ts`), Java (`java`), C++ (`cpp`), C (`c`), Rust (`rs`), Go (`go`), Ruby (`rb`), and PHP (`php`).
- **Self-Contained Driver Generation**: Test suites and inputs are converted into language-native driver harnesses executed inside an isolated judge runtime.
- **CodeMirror 6 Editor**: Includes full syntax highlighting, bracket matching, indentation guides, and optional Vim mode.

### 2. Collaborative Coding Rooms
- **Real-Time CRDT Document Sync**: Fast, conflict-free synchronization powered by Y.js and a dedicated Hocuspocus WebSocket daemon.
- **In-Browser WebContainer Runtime**: Executes Node.js environments directly in modern browsers (using WebAssembly and Cross-Origin Isolation).
- **Access Control & Roles**: Room creators can toggle public/private visibility, invite collaborators with explicit `editor` or `viewer` roles, and audit member lists.
- **AI-Assisted Ghost Completion**: Optional fill-in-the-middle code completions via Codestral / Mistral API.

### 3. System Design Simulation Engine
- **Typed Architectural Blocks**: Clients, Load Balancers, API Servers, Microservices, Redis Caches, Message Queues, Relational & NoSQL Databases, and CDNs.
- **Deterministic Traffic Simulation**: Evaluates configurations against request rates, read/write distributions, payload sizes, compute latencies, and regional boundaries.
- **Three-Star Empirical Scoring**: Evaluates designs based on Reliability (uptime, error rate), Performance (p95/p99 latency), and Cost Efficiency.
- **Calibration-Locked Test Suite**: All built-in levels are tested and asserted via Node's native test runner to guarantee fairness and solvability.

### 4. Machine Coding
- Pre-configured front-end challenges (e.g., Star Rating, Promise Pool, Tabs, Throttle, Tic-Tac-Toe, Todo List) across Vanilla JS, TypeScript, React, Vue, and Svelte.
- Automated in-browser test runners that verify component behavior against requirements.

---

## Architecture & Monorepo Layout

Coding Bird is structured as a Turborepo monorepo with pnpm workspaces:

```
coding-bird/
├── apps/
│   ├── web/               # Next.js 16 (App Router) + React 19 UI, tRPC v11 mount (@acme/nextjs)
│   └── hocuspocus-server/ # Standalone Node.js Y.js / Hocuspocus realtime server (Port 5000)
├── packages/
│   ├── api/               # tRPC v11 routers, procedures, and code-driver generators
│   ├── auth/              # Better Auth configuration, OAuth handlers, session middleware, collab tokens
│   ├── db/                # Drizzle ORM schema, migrations, and PostgreSQL client (Backend only)
│   ├── ducklet-fs/        # Shared virtual filesystem models, path normalization, and starter templates
│   ├── machine-coding-content/ # Challenge descriptions, starter files, solutions, and tests
│   ├── storage/           # S3-compatible storage client (Cloudflare R2 / AWS S3)
│   └── validators/        # Shared Zod v4 validation schemas
└── tooling/               # Shared configs for ESLint, Prettier, Tailwind CSS v4, and TypeScript
```

### Dependency Rules
- Applications (`apps/*`) depend on internal packages (`packages/*`).
- Internal packages never import from applications.
- `packages/db` is backend-only and is strictly forbidden from frontend bundles to prevent leaking database credentials.
- All internal packages use the `@acme/*` workspace prefix.

---

## Technology Stack

- **Framework**: Next.js 16 (App Router) with Turbopack & React 19
- **API**: tRPC v11 (SuperJSON transformer, Zod v4, Server-Sent Events subscriptions)
- **Database**: PostgreSQL 15+ managed via Drizzle ORM
- **Cache & Ephemeral State**: Redis 7
- **Authentication**: Better Auth (GitHub and Google OAuth providers, secure session cookies)
- **Real-Time Collaboration**: Y.js CRDTs + Hocuspocus server
- **Styling**: Tailwind CSS v4, shadcn/ui primitives, Lucide icons, Motion
- **Editor**: CodeMirror 6 with legacy language support & Monaco Editor in IDE shell
- **Canvas**: React Flow (`@xyflow/react`)
- **Package Manager & Monorepo Tools**: pnpm v10.19+, Turborepo v2.6+

---

## Prerequisites

- **Node.js**: `^22.12.0` or `^23.0.0`
- **pnpm**: `^10.19.0` (install via `corepack enable`)
- **Docker & Docker Compose**: For local PostgreSQL and Redis services

---

## Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url> coding-bird
   cd coding-bird
   ```

2. **Install workspace dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   *Note: Defaults in `.env.example` allow booting the application locally immediately.*

4. **Start infrastructure services**:
   ```bash
   docker compose up -d
   # Launches Postgres on :5433 and Redis on :6380
   ```

5. **Apply database schema & seed initial problems**:
   ```bash
   pnpm --filter @acme/db push
   pnpm --filter @acme/db seed
   ```

6. **Run the development stack**:
   ```bash
   pnpm dev
   ```
   - **Web Application**: `http://localhost:3001`
   - **Hocuspocus Server**: `http://localhost:5000` (Healthcheck on `:5001`)

---

## Environment Configuration

Key configuration parameters defined in `.env`:

| Variable | Required | Description |
| :--- | :---: | :--- |
| `POSTGRES_URL` | Yes | PostgreSQL connection string (e.g. `postgres://dev:dev@localhost:5433/codingbird`). |
| `BETTER_AUTH_SECRET` | Yes | 32+ character root secret for session encryption and collaboration tokens. |
| `BETTER_AUTH_GITHUB_ID` | Yes | GitHub OAuth Application Client ID. |
| `BETTER_AUTH_GITHUB_SECRET` | Yes | GitHub OAuth Application Client Secret. |
| `BETTER_AUTH_GOOGLE_ID` | Yes | Google OAuth Client ID. |
| `BETTER_AUTH_GOOGLE_SECRET` | Yes | Google OAuth Client Secret. |
| `BASE_URL` | Yes | Local web URL (`http://localhost:3001` in dev). |
| `PRODUCTION_URL` | Yes | Production canonical URL used for OAuth callbacks. |
| `JUDGE_API_URL` | No | External code execution API endpoint (defaults to hosted judge runner). |
| `JUDGE_API_TOKEN` | Yes | Authentication token for judge runner service. |
| `R2_BUCKET` | Yes | Object storage bucket name for user uploads and room snapshots. |
| `R2_ENDPOINT` | Yes | S3-compatible API endpoint (e.g., Cloudflare R2). |
| `R2_ACCESS_KEY_ID` | Yes | S3/R2 access key ID. |
| `R2_SECRET_ACCESS_KEY` | Yes | S3/R2 secret key. |
| `R2_PUBLIC_URL` | No | Optional public CDN URL for serving uploads. |
| `NEXT_PUBLIC_SOCKET_URL` | Yes | Hocuspocus WebSocket URL (`http://localhost:5000` in dev). |
| `ALLOWED_WS_ORIGINS` | No | Comma-separated list of allowed WebSocket origins (empty allows all in dev). |
| `MISTRAL_API_KEY` | No | Optional Mistral API key for Codestral inline code completions. |

---

## Database Management

Coding Bird uses **Drizzle ORM** with PostgreSQL. Schema definitions live in [`packages/db/src/schema/`](packages/db/src/schema/).

- **Push Schema Changes**: `pnpm --filter @acme/db push`
- **Seed Problems**: `pnpm --filter @acme/db seed`
- **Launch Drizzle Studio GUI**: `pnpm --filter @acme/db studio`

---

## Real-Time Collaboration Infrastructure

1. **Authentication Handshake**:
   - The web app requests a cryptographically signed collaboration token via tRPC (`room.getCollabToken`).
   - The token is signed using HMAC-SHA256 with a domain-separated key derived from `BETTER_AUTH_SECRET`.
   - The token embeds `{ userId, username, roomId, role, exp }` with a 1-hour expiration.

2. **Hocuspocus Verification**:
   - On WebSocket connection, the Hocuspocus daemon verifies the signature with `timingSafeEqual`.
   - The server queries PostgreSQL to confirm room membership and active status.
   - For viewers, `connection.readOnly = true` is enforced at the protocol level.
   - Awareness states (cursors/presence) are sanitised: the server overwrites user identity in memory using verified token context to prevent client impersonation.

3. **Persistence**:
   - Document changes are broadcast to connected peers and periodically compressed as binary Y.js state updates into PostgreSQL.

---

## Code Execution Architecture

```
User Code + Language
        │
        ▼
tRPC submission.create
        │
        ▼
Self-Contained Driver Generator (`packages/api/src/drivers/`)
  - Inlines user solution
  - Inlines all test cases (hidden & public)
  - Inlines test harness and comparison logic
        │
        ▼
External Judge Runner (`JUDGE_API_URL`)
  - Compiles / executes in isolated sandbox
  - Enforces time limit and memory limit
  - Returns stdout / stderr JSON report
        │
        ▼
tRPC Server Parses Verdict & Persists Result in PostgreSQL
```

Test cases and assertions are compiled into the driver executable server-side. Raw test inputs and expected outputs are never transmitted separately to the user's browser.

---

## Testing & Quality Assurance

### 1. System Design Calibration Suite
Validates that each of the 10 system design levels is beatable-but-challenging (asserting optimal designs score 3★, naive designs score ≤2★, and broken designs fail):

```bash
pnpm -F @acme/nextjs exec node --test --import ./src/lib/system-design/__tests__/_loader.mjs src/lib/system-design/__tests__/calibration.test.ts
```

### 2. Static Analysis & Type Checking
```bash
pnpm lint       # ESLint across all apps and packages
pnpm typecheck  # TypeScript check across all packages
pnpm format     # Prettier formatting verification
```

---

## Security Model

- **Session Authentication**: Handled via Better Auth with HTTP-only cookies and CSRF protection.
- **Route Authorization**: Next.js proxy middleware guards `/admin` and private surfaces.
- **Collab Token Verification**: Cryptographically verified HMAC-SHA256 tokens prevent forged WebSocket room access.
- **Storage Protection**: Presigned upload URLs enforce a strict MIME-type allowlist and user-scoped path sandboxing (`uploads/${userId}/${timestamp}-${cleanFilename}`) to eliminate directory traversal.
- **Sandboxed Execution**: User-submitted code executes in remote isolated worker sandboxes with resource constraints (cgroups, time limits, memory caps, network restrictions).

---

## Known Limitations

- **OAuth-First Auth**: Local email/password login is not configured by default; local development uses GitHub or Google OAuth or session testing helpers.
- **Single-Node Realtime Bus**: In-process event subscriptions use an `EventEmitter` bus. Multi-node clustering requires swapping this for Redis PUB/SUB or Postgres `LISTEN/NOTIFY`.
- **Safari WebContainers**: Apple Safari does not fully support `COEP: credentialless`. In Safari, the multi-file IDE defaults to read/edit collaboration mode rather than booting a local WebContainer.

---

## Roadmap

1. **Redis PUB/SUB Realtime Scaling**: Replace single-instance EventEmitter with Redis adapter for multi-instance deployments.
2. **WebAssembly Local Judge**: Optional client-side WebAssembly execution for basic Python and JavaScript scratchpads.
3. **Automated Submission Benchmarks**: Performance profiling histograms comparing user solution runtime against global submissions.
4. **Custom Room Templates**: Allow users to export and publish custom starter repository templates for collaborative coding rooms.

---

## Contributing & License

Contributions are welcome. Please ensure that:
1. `pnpm typecheck` and `pnpm lint` pass without errors.
2. Calibration tests pass for any changes impacting the simulation engine.
3. Code strictly adheres to TypeScript without `any`.

Distributed under the MIT License.
