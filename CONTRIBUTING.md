# 🤝 Contributing

Thanks for contributing to Coding Bird. This is a pnpm/Turborepo monorepo. Changes must respect package boundaries and the platform's security model.

## Before coding

1. Read `README.md` and `AGENTS.md`.
2. Read the subsystem guide relevant to your change.
3. Identify affected apps/packages and keep scope focused.
4. For substantial changes, describe the user problem and acceptance criteria in an issue.
5. Avoid unrelated formatting or generated-file churn.

## Development setup

Requirements recorded by the repository: Node `^23`, pnpm `^10.19.0`, and Docker/Docker Compose for local PostgreSQL and Redis.

```sh
corepack enable
pnpm install
cp .env.example .env
make services
pnpm db:push
pnpm db:seed
pnpm dev
```

See `README.md` and `SETUP.md` for current environment values and callback URLs. Never commit a populated `.env`.

## Package boundaries

- Apps in `apps/*` may import shared packages.
- Shared packages in `packages/*` must not import app code.
- `packages/db` is backend-only and must never enter client bundles.
- Use the `@acme/*` workspace namespace.
- Preserve strict TypeScript. Prefer `unknown` plus narrowing over `any`.

## Validation

```sh
pnpm lint
pnpm lint:ws
pnpm format
pnpm typecheck
pnpm build
pnpm -F @acme/nextjs test:calibration
```

Run relevant package checks too. Include exact commands and outcomes in the PR. Do not claim checks passed if they were not run.

## Area-specific expectations

- **API/database:** validate inputs, authorize every procedure, document migrations and rollback, prevent private test data leakage.
- **Code judging:** preserve driver/runner contracts; test language drivers, hidden/public cases, timeout and resource handling.
- **Realtime:** test invalid, expired, cross-room, and revoked tokens; enforce editor/viewer roles server-side; derive awareness identity server-side.
- **System Design:** keep simulation deterministic and update calibration when behavior or difficulty changes.
- **UI:** test keyboard use, focus, empty/loading/error states, responsive layouts, and reduced motion.

## Pull request checklist

- [ ] Scope and rationale are clear.
- [ ] No secrets, personal data, caches, or unrelated generated files are included.
- [ ] Types, lint, formatting, and relevant tests pass.
- [ ] Authorization and negative cases are covered where relevant.
- [ ] Docs, diagrams, environment examples, and changelog are updated.
- [ ] Database and deployment impact is described.
