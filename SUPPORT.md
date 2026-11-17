# 🆘 Support

## Where to ask

- **Bug reports:** open a GitHub issue with a minimal reproduction and environment details.
- **Feature proposals:** open an issue describing the user problem and expected behavior.
- **Setup problems:** include Node/pnpm versions, exact command, sanitized logs, and service health.
- **Security concerns:** follow `SECURITY.md`; do not post exploit details publicly.

## Useful diagnostics

```sh
node --version
pnpm --version
pnpm lint
pnpm typecheck
pnpm build
docker compose ps
```

For database issues, include the migration/schema command and sanitized error. For realtime issues, include connection state, room role, origin configuration, and Hocuspocus logs without tokens. For judging issues, include language, problem identifier, sanitized input, and judge response metadata, never credentials or hidden test data.

Never share `.env` contents, OAuth secrets, session cookies, signed collaboration tokens, judge API tokens, private source documents, or personal data.
