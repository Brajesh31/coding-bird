# 🔐 Security Policy

Coding Bird accepts untrusted source code, stores user-created content, and provides real-time collaboration. These are security-sensitive systems.

## Reporting

Do not publish exploitable details in a public issue. Use GitHub's **Report a vulnerability** feature when enabled, or contact the repository maintainer through a private channel listed on the maintainer's GitHub profile. Include affected commit, impact, reproduction steps, and a safe proof of concept. Never attach real credentials or another user's data.

## High-risk boundaries

- **Code judge:** submissions must execute in a separate, resource-limited sandbox, never in the web/API process.
- **Collaboration:** verify signed short-lived tokens, bind them to the target room, re-check current membership, and enforce viewer read-only permissions server-side.
- **Private data:** private source documents, snapshots, messages, and metadata require authorization on every read path.
- **Presence:** derive identity from verified server context, not client-supplied IDs or names.
- **Preview rendering:** treat HTML, CSS, scripts, and URLs as hostile. Isolate preview workers and disable unnecessary browser capabilities.
- **Storage:** scope object keys to users/resources, validate content type and size, and use short-lived presigned URLs.
- **Secrets:** never commit OAuth secrets, database URLs, judge tokens, storage credentials, or signing keys.
- **Database:** use least-privilege credentials, parameterized queries, backups, and tested restore procedures.

## Release security checklist

- [ ] Unauthenticated and unauthorized requests are denied.
- [ ] Private IDs cannot retrieve private content.
- [ ] Expired, forged, revoked, and cross-room tokens are rejected.
- [ ] Viewer writes are rejected server-side.
- [ ] User preview markup cannot escape its isolation boundary.
- [ ] Judge workers have CPU, memory, time, process, filesystem, and network restrictions.
- [ ] Uploads validate size, type, ownership, and path boundaries.
- [ ] Logs exclude secrets, tokens, and unnecessary personal data.
- [ ] Dependencies and container images are scanned.
- [ ] Backup restoration and incident response have been exercised.

## Existing audit context

`DUCKLETS_AUDIT.md` records high-priority findings and acceptance criteria. Treat findings as open until implementation and regression tests demonstrate they are fixed. This policy is not proof that every listed control is already complete.
