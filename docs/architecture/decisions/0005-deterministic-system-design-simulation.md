# ADR-0005: Deterministic System Design Simulation

- **Status:** Observed current architecture
- **Scope:** System Design learning experience

## Context

Learners need feedback on the relative reliability, performance, and cost implications of architecture choices.

## Current decision

The system-design canvas uses typed architecture blocks and a deterministic client-side simulation engine. A calibration test suite validates reference, naive, and broken designs.

## Consequences

- The same graph and parameters should produce repeatable results for a fixed engine version.
- Units and assumptions must be explicit.
- New node types and connection rules require deterministic tests.
- Changes to level difficulty require calibration updates.

## Revisit when

The simulation becomes a distributed benchmark, external telemetry evaluator, or stochastic model.
