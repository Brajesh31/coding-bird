# 🧭 Product Roadmap

This is a planning aid, not a delivery promise. Code and the issue tracker remain authoritative for shipped behavior.

## Product pillars

- **Problems:** algorithmic challenges, language drivers, and external isolated judging.
- **Collaborative Rooms / Ducklets:** shared workspaces, presence, messaging, and browser execution.
- **System Design:** architecture canvas, deterministic simulation, and calibrated levels.
- **Machine Coding / Playground:** front-end challenges and scratchpad workflows.

## Prioritized direction

### P0: Trust and launch readiness
- Close and regression-test any still-open P0 findings in `DUCKLETS_AUDIT.md`.
- Verify authorization on every private-resource read and write path.
- Confirm judge isolation and resource/network limits in the actual deployment.
- Exercise backup restoration, incident response, and graceful service shutdown.

### P1: Reliability and usability
- Improve realtime reconnect/offline visibility and operational telemetry.
- Expand automated tests beyond the System Design calibration suite.
- Improve mobile editor workflows and keyboard/screen-reader accessibility.
- Add explicit failure states for storage, preview generation, and judge outages.

### P2: Scale and learning depth
- Replace single-process event delivery when multi-instance deployment is required.
- Add controlled benchmark and observability workflows.
- Expand learning content with maintainable authoring and validation processes.

Every roadmap item should have an issue with owner, acceptance criteria, dependencies, and test strategy. Mark an item complete only after code and tests support the claim.
