# 📡 Observability and Service Health

Coding Bird spans the web application, API, realtime collaboration service, PostgreSQL, object storage, browser runtimes, and an external judge. A single process health check cannot establish that the full product is healthy.

## Signals to collect

| Area | Useful signals | Operational question |
|---|---|---|
| Web app | request rate, latency percentiles, server errors, route failures | Can learners reach core pages and API procedures? |
| API | procedure latency, validation failures, authorization denials, rate limits | Are requests failing safely and predictably? |
| Database | connection pool, query latency, locks, disk, replication/backup status | Is durable state available and consistent? |
| Realtime | active connections, disconnects, auth denials, document load/store errors | Can authorized users collaborate without data loss? |
| Judge | queue depth, compile/run latency, timeout rate, worker saturation | Is untrusted execution isolated and bounded? |
| Storage | upload/download errors, denied signatures, object cleanup | Are users accessing only their own objects? |
| Browser runtime | boot failures, preview errors, client crash reports | Are local editors and previews usable? |

## Logging rules

- Use structured logs with timestamp, severity, service, environment, trace/request identifier, and safe resource category.
- Never log OAuth secrets, database URLs, access tokens, session cookies, signed collaboration tokens, or complete private source documents.
- Avoid personal data where an internal identifier or aggregate is sufficient.
- Keep error details useful but redact credentials and signed URLs.
- Apply retention and access controls to logs.

## Alert design

Alerts should be actionable and tied to user impact. Examples include elevated API 5xx rate, judge queue saturation, database unavailability, realtime document persistence failures, repeated auth anomalies, and storage upload failures. Set thresholds using observed baselines rather than arbitrary values.

## Readiness checklist

- [ ] Separate liveness and dependency readiness.
- [ ] Correlate web/API/realtime/judge requests with safe trace identifiers.
- [ ] Alert on persistent document save failures.
- [ ] Alert on judge worker capacity and timeout spikes.
- [ ] Verify dashboards and alerts during a controlled failure drill.
- [ ] Document on-call escalation and alert ownership.

Do not claim monitoring or alert coverage until the target deployment has configured and tested it.
