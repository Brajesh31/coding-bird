# ADR-0002: tRPC Domain API

- **Status:** Observed current architecture
- **Scope:** Application API surface

## Context

The platform needs typed domain procedures shared between server and client code.

## Current decision

The API uses tRPC v11, SuperJSON, Zod validation, and a composed application router in packages/api. The Next.js app mounts the API and wires client/server query helpers.

## Consequences

- Procedures should be organized by domain router.
- Input schemas should be validated at the boundary.
- Authorization belongs in procedures and domain services, not just UI visibility.
- API and shared type changes must consider both server and client consumers.

## Revisit when

A separately versioned public API, external integrations, or multi-service boundary makes a different API contract necessary.
