# ADR-0001: pnpm Workspaces and Turborepo

- **Status:** Observed current architecture
- **Scope:** Repository-wide build and package management

## Context

The repository contains multiple applications, shared domain packages, and shared tooling. Dependencies and tasks need predictable workspace resolution and task orchestration.

## Current decision

The root package configuration declares pnpm as the package manager, the workspace file includes apps, packages, and tooling, and Turborepo coordinates build, lint, formatting, typecheck, and development tasks.

## Consequences

- Internal package dependencies use the workspace protocol.
- The lockfile is central to reproducible installs.
- App and package dependency boundaries must be respected.
- Changes to workspace globs or task dependencies can affect the entire repository.

## Revisit when

The repository changes package manager, build system, workspace layout, or package compilation strategy.
