# 📦 Release Process

## Before release

- [ ] Confirm release scope and target commit.
- [ ] Run lint, workspace checks, format, typecheck, build, and relevant tests.
- [ ] Review dependency and security findings.
- [ ] Review schema/data compatibility and backup status.
- [ ] Confirm environment variables, OAuth callbacks, WebSocket origins, judge and storage settings.
- [ ] Update changelog and subsystem docs.
- [ ] Verify no credentials or user data enter release artifacts.

## Release execution

1. Tag the verified commit using the agreed versioning convention.
2. Deploy schema changes in a compatibility-safe order.
3. Deploy services and verify health endpoints.
4. Smoke-test all four product pillars.
5. Monitor errors, resource use, judge latency, WebSocket disconnects, and database health.

## Rollback

Rollback when core paths fail, private data boundaries are violated, or resource exhaustion is uncontrolled. Prefer app rollback when schema compatibility allows it. Destructive migrations require a rehearsed restore or forward-fix plan.

## Release record

Record commit, tag, deploy time, migration identifiers, environment changes, smoke-test evidence, known issues, and rollback instructions. A successful build alone does not prove deployment.
