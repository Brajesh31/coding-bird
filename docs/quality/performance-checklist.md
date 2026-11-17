# ⚡ Performance Engineering Checklist

Use this checklist for changes to Next.js routes, editors, simulations, realtime synchronization, database queries, storage, and judge orchestration.

## Web and client rendering

- [ ] Avoid unnecessary client components and large client-side dependency bundles.
- [ ] Lazy-load expensive editors, diagrams, and optional experiences when appropriate.
- [ ] Measure route performance with representative content and authenticated state.
- [ ] Avoid repeated state updates and expensive derived calculations during typing.
- [ ] Respect reduced-motion preferences and avoid animation that harms interaction latency.

## Editors and realtime

- [ ] Measure editor startup and large-document behavior.
- [ ] Avoid broadcasting transient state that does not need synchronization.
- [ ] Test reconnect and resync under unstable network conditions.
- [ ] Bound document, message, and awareness payload sizes.
- [ ] Avoid excessive snapshot or persistence writes.

## API and database

- [ ] Check query plans for high-volume list and detail queries.
- [ ] Add indexes only when supported by measured query patterns.
- [ ] Paginate unbounded collections.
- [ ] Avoid N+1 queries and unnecessary full-row selection.
- [ ] Define request and payload limits.
- [ ] Use timeouts and cancellation where appropriate.

## Judge and preview services

- [ ] Bound queue size and concurrent workers.
- [ ] Enforce CPU, memory, wall time, process, file, and network limits.
- [ ] Avoid unbounded stdout/stderr capture.
- [ ] Apply safe timeouts and cleanup to browser preview jobs.
- [ ] Measure compile/run and screenshot latency separately.

## Evidence

Record baseline, test dataset, hardware/runtime, percentile measurements, and before/after results. Avoid claims based on a single local run. Do not add arbitrary performance badges or invented benchmark numbers.
