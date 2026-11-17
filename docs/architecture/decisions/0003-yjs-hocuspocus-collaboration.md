# ADR-0003: Y.js and Hocuspocus Collaboration

- **Status:** Observed current architecture
- **Scope:** Collaborative coding rooms

## Context

Multiple users need concurrent editing, presence, and durable shared document state.

## Current decision

The browser uses Y.js documents and the Hocuspocus provider. A standalone Hocuspocus server handles WebSocket collaboration and persists encoded document state using the database package.

## Consequences

- Authorization must be performed at WebSocket authentication and resource boundaries.
- Tokens must be signed, short-lived, scoped to one room, and revalidated against current membership.
- Viewer access must be read-only at the protocol boundary.
- Persistence and reconnect behavior need operational tests.
- Horizontal scaling needs shared coordination beyond a single in-process event bus.

## Revisit when

Collaboration transport, persistence backend, multi-region needs, or consistency requirements materially change.
