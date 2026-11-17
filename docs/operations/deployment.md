# 🚀 Deployment and Operations

## Documented local services

- Next.js web application, development port 3001.
- Hocuspocus realtime WebSocket server, port 5000.
- Hocuspocus health endpoint on the adjacent port, normally 5001 when the server port is 5000.
- PostgreSQL, local port 5433.
- Redis, local port 6380.
- External isolated judge service.
- S3-compatible object storage such as Cloudflare R2 or AWS S3.

Production ports, hostnames, replica counts, and network paths must come from actual deployment configuration.

## Local infrastructure

```sh
make services
docker compose ps
pnpm db:push
pnpm db:seed
pnpm dev
```

## Environment management

Use `.env.example` as the variable catalogue and runtime schema files as the authoritative validation source. Store production secrets in the deployment platform's secret manager. Never put secrets in Docker build arguments, image layers, CI logs, or `NEXT_PUBLIC_*` variables.

## Deployment sequence

1. Confirm a reviewed commit and green required checks.
2. Review dependency and container image changes.
3. Confirm required secrets, OAuth callbacks, and WebSocket origin allowlists.
4. Back up database and relevant object storage before incompatible data changes.
5. Apply backward-compatible schema changes.
6. Deploy web and realtime services in a compatible order.
7. Smoke-test authentication, private-room authorization, judging, uploads/downloads, and realtime collaboration.
8. Inspect logs and error rates.
9. Keep rollback artifacts and a data recovery plan available.

## Health and observability

Hocuspocus exposes `/health` and `/healthz` on its health listener. Health output reports process uptime and connection/document counts. Liveness alone does not prove PostgreSQL writes, storage, token verification, or judge execution are healthy. Add dependency checks and alerts in deployment infrastructure.

## Rollback

Roll back application artifacts to a known-good commit. Do not blindly reverse destructive schema changes. Use a tested forward-fix or restore strategy and re-test authorization and data integrity.
