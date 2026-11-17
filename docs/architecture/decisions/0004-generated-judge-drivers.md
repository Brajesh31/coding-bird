# ADR-0004: Generated Drivers for Code Judging

- **Status:** Observed current architecture
- **Scope:** Algorithmic problem submissions

## Context

The application supports multiple programming languages and needs to run user solutions against public and hidden test cases.

## Current decision

The API generates self-contained language driver programs containing the candidate solution and test harness, then delegates compilation/execution to an external judge service.

## Consequences

- Driver generation is language-specific and requires regression coverage.
- Test definitions and expected values must not be exposed through browser APIs.
- The external judge must provide a genuine isolation boundary and enforce resource limits.
- Output parsing must be defensive and treat runner output as untrusted.

## Revisit when

A new execution provider, client-side WASM mode, or materially different judge contract is introduced.
