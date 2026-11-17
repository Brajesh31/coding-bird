# 🗺️ Diagram and Flowchart Library

This library contains editable Mermaid sources and original SVG artwork for onboarding, code reviews, architecture discussions, and release planning.

| Diagram | Format | Scope |
|---|---|---|
| [Product and user journeys](product-user-flows.md) | Mermaid flowcharts / state diagrams | Learner, judge, rooms, machine coding, system design |
| [UML and data models](uml-and-data-models.md) | Component, class, ER diagrams | Package boundaries and schema |
| [Operations flows](operations-flows.md) | Flowcharts / sequences | CI, deploy, rollback, incidents |
| [System architecture](../architecture/README.md) | Mermaid | Runtime components |
| [Threat model](../security/threat-model.md) | Mermaid | Assets and trust boundaries |
| [Architecture SVG](../assets/architecture-overview.svg) | SVG | Architecture poster |
| [Trust boundaries SVG](../assets/trust-boundaries.svg) | SVG | Security poster |
| [Coding Bird banner](../assets/coding-bird-banner.svg) | SVG | README banner |
| [Social preview artwork](../assets/social-preview.svg) | SVG | Social preview concept |
| [Platform pillars](../assets/platform-pillars.svg) | SVG | Four product areas |
| [Database overview](../assets/database-overview.svg) | SVG | Selected relational relationships |
| [CI/CD pipeline](../assets/ci-cd-pipeline.svg) | SVG | Existing CI and proposed release gates |

## 🧭 Maintenance rules

- Keep Mermaid diagrams close to implementation and update them with behavior changes.
- Label conceptual, proposed, and verified architecture distinctly.
- Do not add tables, relationships, services, or states unsupported by code.
- Keep SVG source readable and accessible with title and description elements.
- Do not use architecture visuals as fake product screenshots.
