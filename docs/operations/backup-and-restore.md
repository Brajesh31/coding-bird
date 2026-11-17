# 🗄️ Backup and Restore Planning

Coding Bird stores relational state in PostgreSQL and may store uploads/previews in S3-compatible object storage. Realtime documents are persisted as encoded Y.js state in PostgreSQL. A database-only backup may therefore be insufficient when referenced objects are required to restore a complete user experience.

## Define before production

| Setting | Required decision |
|---|---|
| Backup frequency | Define by acceptable data-loss window |
| RPO | Set and publish the maximum tolerable data loss |
| RTO | Set and publish the maximum acceptable recovery time |
| Retention | Define daily/weekly/monthly retention and legal requirements |
| Encryption | Encrypt backups at rest and in transit |
| Access | Restrict restore credentials and audit access |
| Object storage | Define versioning, retention, and deletion policy |
| Verification | Schedule restore drills in an isolated environment |

Do not claim an RPO, RTO, retention duration, or backup guarantee until operations has set and tested it.

## Backup scope

- PostgreSQL databases, schema, indexes, and required extension configuration.
- Object storage buckets used for user uploads, previews, and snapshots.
- Environment/secret configuration stored separately in an approved secret manager.
- Container/image versions, deployment configuration, and migration history.

## Restore sequence

1. Declare the recovery event and freeze destructive writes where appropriate.
2. Identify the target recovery point and obtain approved backup artifacts.
3. Restore PostgreSQL into an isolated environment.
4. Restore or reconnect the corresponding object storage state.
5. Apply only the migration steps required to reach the intended application version.
6. Verify users, rooms, membership, documents, messages, attempts, and object references.
7. Run authorization checks and representative smoke tests.
8. Reopen traffic only after data integrity and security checks pass.
9. Record actual recovery time, data loss, and corrective actions.

## Restore drill checklist

- [ ] Database backup can be decrypted and restored.
- [ ] Object references resolve after restore.
- [ ] Y.js documents can be loaded.
- [ ] Private-room access rules remain effective.
- [ ] User deletion and retention semantics are preserved.
- [ ] Secrets can be rotated without exposing them in logs.
- [ ] Recovery timing is recorded against approved RTO/RPO targets.

Use the infrastructure-specific runbook for actual commands. This document intentionally does not invent production bucket names, database container names, backup paths, or credentials.
