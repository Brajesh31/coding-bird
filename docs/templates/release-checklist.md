# 🚀 Release Readiness Checklist

## Source and quality
- [ ] Target commit is reviewed and immutable.
- [ ] Lint, format, typecheck, build, and relevant tests are green.
- [ ] Dependency and security findings are reviewed.
- [ ] Changelog and user-facing documentation are updated.

## Security and configuration
- [ ] Secrets are configured through the deployment secret manager.
- [ ] OAuth callbacks and WebSocket origin allowlists match the target environment.
- [ ] Judge service and storage credentials are configured.
- [ ] No private data or credentials are included in artifacts.

## Data and deployment
- [ ] Database backup completed and restore path is known.
- [ ] Migrations are reviewed and compatible with the rollout order.
- [ ] Object storage and retention implications are reviewed.
- [ ] Health and smoke tests are prepared.

## Release record
- Commit:
- Version/tag:
- Environment:
- Deployment window:
- Migration identifiers:
- Smoke test evidence:
- Rollback owner and plan:
