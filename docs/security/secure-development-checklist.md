# 🛡️ Secure Development Checklist

Use this checklist when changing authentication, APIs, data access, collaboration, uploads, previews, or code execution.

## Identity and authorization

- [ ] Authenticate on the server for protected operations.
- [ ] Authorize the specific resource, not only the route.
- [ ] Check ownership and membership on every read and write.
- [ ] Test anonymous, wrong-owner, wrong-role, expired, revoked, and cross-resource cases.
- [ ] Enforce viewer restrictions in the server protocol.
- [ ] Derive user identity from verified context, never from client-controlled metadata.

## Input and output

- [ ] Validate all API input with schemas.
- [ ] Enforce maximum payload and string lengths.
- [ ] Normalize filesystem paths and reject traversal.
- [ ] Treat judge output, HTML, CSS, uploaded files, and external URLs as untrusted.
- [ ] Avoid unsafe HTML interpolation and command construction.
- [ ] Redact secrets and private content from logs.

## Execution isolation

- [ ] Run user code outside the web and API processes.
- [ ] Enforce CPU, memory, wall-clock, process, file, and network limits.
- [ ] Prevent host filesystem and credential access.
- [ ] Keep hidden test data out of browser-visible responses.
- [ ] Isolate preview rendering from internal services and metadata endpoints.

## Storage and database

- [ ] Verify owner/resource before issuing signed URLs.
- [ ] Validate MIME type, extension, size, and upload policy.
- [ ] Use server-generated object keys.
- [ ] Use least-privilege credentials.
- [ ] Review cascades, nullable references, and deletion behavior.
- [ ] Test migrations and backup restoration.

## Dependencies and supply chain

- [ ] Review lockfile diffs.
- [ ] Prefer maintained versions and minimal dependency additions.
- [ ] Review lifecycle scripts and native build steps.
- [ ] Run dependency review and static analysis.
- [ ] Record unresolved advisories and compensating controls.

## Evidence

Security claims require reproducible tests or operational evidence. Checklists document review intent; they do not prove a control is effective.
