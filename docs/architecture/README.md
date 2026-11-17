# 🏗️ Coding Bird Architecture

## System context

```mermaid
flowchart TB
  U[Developer / Learner] --> W[Next.js Web App]
  W --> API[tRPC API]
  API --> AUTH[Better Auth]
  API --> DB[(PostgreSQL / Drizzle)]
  API --> OBJ[Object Storage: R2 / S3]
  API --> J[External Judge Service]
  W <-->|Y.js over WebSocket| HP[Hocuspocus Server]
  HP <--> DB
  W --> WC[Browser WebContainer]
  W --> SD[System Design Simulation]
```

## Monorepo boundaries

```mermaid
flowchart LR
  subgraph Apps
    WEB[apps/web]
    REAL[apps/hocuspocus-server]
  end
  subgraph SharedPackages
    API[packages/api]
    AUTH[packages/auth]
    DB[packages/db]
    FS[packages/ducklet-fs]
    STORE[packages/storage]
    VAL[packages/validators]
    CONTENT[packages/machine-coding-content]
  end
  WEB --> API
  WEB --> AUTH
  WEB --> DB
  WEB --> FS
  WEB --> STORE
  REAL --> AUTH
  REAL --> DB
  REAL --> FS
  API --> AUTH
  API --> DB
  API --> STORE
  API --> VAL
```

Apps may depend on packages; packages must not depend on apps. Database code and credentials remain server-only. Internal workspace names use `@acme/*`.

## Runtime responsibilities

| Component | Responsibility | Trust boundary |
|---|---|---|
| Browser | UI, local editor runtime, client interactions | Untrusted |
| Next.js app | SSR, route handlers, tRPC mount | Server |
| tRPC/API | Domain procedures, validation, authorization | Server |
| PostgreSQL | Durable relational state and Y.js snapshots | Private infrastructure |
| Hocuspocus | Authenticated Y.js collaboration transport | Separate network service |
| Judge service | Compile/execute user code in isolated workers | Separate execution boundary |
| R2/S3 | Object persistence and delivery | External storage boundary |

These are conceptual architecture guides. Confirm deployment topology, scaling, and firewall rules from infrastructure configuration before operating production.
