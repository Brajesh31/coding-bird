# 🚦 CI/CD, Deployment and Operations Flows

## 1. ✅ Existing GitHub Actions CI workflow

~~~mermaid
flowchart TD
  A([Push to main / pull request / merge queue]) --> B[Checkout repository]
  B --> C[Install pnpm and Node from project config]
  C --> D[Install frozen workspace lockfile]
  D --> L[Lint: pnpm lint + lint:ws]
  D --> F[Format: pnpm format]
  D --> T[Typecheck: pnpm typecheck]
  L --> R{All configured jobs pass?}
  F --> R
  T --> R
  R -->|Yes| G([CI success])
  R -->|No| H([CI failure])
~~~

**Accuracy note:** the checked-in CI workflow has lint, format, and typecheck jobs. Separate workflows now run CodeQL analysis on pushes and pull requests, and dependency review on pull requests. Build, general integration tests, and E2E tests are still not configured as required CI jobs.

## 2. 🚀 Deployment sequence

~~~mermaid
flowchart TD
  A([Reviewed commit]) --> B[Required checks pass]
  B --> C[Review dependency and secret changes]
  C --> D[Back up database and object data]
  D --> E[Apply compatible schema changes]
  E --> F[Deploy realtime and web services]
  F --> G[Health checks and smoke tests]
  G --> H{Core paths healthy?}
  H -->|Yes| I[Monitor metrics and logs]
  H -->|No| J[Rollback app or apply forward fix]
  J --> K[Verify schema and data integrity]
  K --> I
~~~

## 3. 🧯 Incident response lifecycle

~~~mermaid
flowchart TD
  A([Alert or user report]) --> B[Triage severity and affected surface]
  B --> C[Contain: disable unsafe path / revoke credentials]
  C --> D[Preserve sanitized evidence]
  D --> E[Determine root cause and blast radius]
  E --> F[Patch and add regression tests]
  F --> G[Review and deploy fix]
  G --> H[Verify recovery and monitor]
  H --> I[Write incident review and prevention actions]
~~~

## 4. 🔐 Secret rotation sequence

~~~mermaid
sequenceDiagram
  actor Maintainer
  participant Vault as Secret manager
  participant App as Application services
  participant Provider as OAuth / Judge / Storage provider
  Maintainer->>Provider: Create replacement credential
  Provider-->>Maintainer: Return new secret
  Maintainer->>Vault: Store secret securely
  Vault-->>App: Inject new value at deploy
  App->>Provider: Verify connection with new credential
  Maintainer->>Provider: Revoke old credential
  Maintainer->>Vault: Remove old value
~~~

Never rotate a credential by exposing it in a public issue, commit, build log, or chat transcript.
