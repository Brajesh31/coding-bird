# 🔀 Product and User Journey Flowcharts

These flows represent the current product concepts and key server-side decision points. Confirm implementation details before treating them as contractual API documentation.

## 1. 🧭 Learner entry and feature selection

~~~mermaid
flowchart TD
  Start([🐦 Open Coding Bird]) --> Auth{🔐 Session available?}
  Auth -->|Yes| Dashboard[🧭 Dashboard]
  Auth -->|No| Explore[🌱 Browse public learning surfaces]
  Explore --> SignIn[🔑 GitHub / Google sign-in when protected action requires it]
  SignIn --> Dashboard
  Dashboard --> Pick{🎯 Choose a learning surface}
  Pick --> Problems[🧩 Problems]
  Pick --> Rooms[🤝 Collaborative Rooms]
  Pick --> Design[🏗️ System Design]
  Pick --> Machine[💻 Machine Coding]
  Problems --> ProblemFlow
  Rooms --> RoomFlow
  Design --> DesignFlow
  Machine --> MachineFlow
~~~

## 2. 🧩 Algorithmic problem submission and verdict

~~~mermaid
flowchart TD
  A([Select a problem]) --> B[Read statement, constraints and examples]
  B --> C[Choose language and edit solution]
  C --> D{Action}
  D -->|Run| E[Public test cases]
  D -->|Submit| F[Full test suite]
  E --> G[Generate language driver]
  F --> G
  G --> H[External judge service]
  H --> I{Execution result}
  I -->|Compile error| J[Show compiler feedback]
  I -->|Runtime error / timeout| K[Show execution failure]
  I -->|Wrong answer| L[Show allowed result details]
  I -->|Accepted| M[Show accepted verdict and metrics]
  J --> C
  K --> C
  L --> C
  M --> N([Review, improve, or continue])
~~~

The database distinguishes submission kind values **run** and **submit**. Runs use public tests; submissions evaluate the full suite. User code is expected to execute in the external judge boundary, not in the web process.

## 3. 🤝 Collaborative room access and connection

~~~mermaid
flowchart TD
  A([Open or create a room]) --> B{Room visibility}
  B -->|Public| C[Read-only public access may be available]
  B -->|Private| D{Owner or active member?}
  D -->|Yes| E[Resolve member role]
  D -->|No| F[Request access / wait for invitation]
  F --> G{Request or invite accepted?}
  G -->|No| H([Remain outside private room])
  G -->|Yes| E
  E -->|Owner / editor| I[Issue short-lived room-scoped token]
  E -->|Viewer| I
  C --> I
  I --> J[Hocuspocus verifies origin, signature, room and current access]
  J --> K{Authorized?}
  K -->|No| H
  K -->|Yes| L{Role}
  L -->|Editor| M[Editable Y.js session]
  L -->|Viewer| N[Read-only Y.js session]
  M --> O[Persist document state]
  N --> O
~~~

A disabled UI control is not an authorization boundary. Viewer restrictions must be enforced by the realtime server.

## 4. 🔄 Room membership state model

~~~mermaid
stateDiagram-v2
  [*] --> Requested: requestAccess
  [*] --> Invited: inviteUser
  Requested --> Active: owner accepts request
  Invited --> Active: user accepts invite
  Requested --> [*]: request removed / rejected
  Invited --> [*]: invite removed / declined
  Active --> [*]: member removed
~~~

The enum currently contains **active**, **invited**, and **requested**. Role is separate: **editor** or **viewer**.

## 5. 💻 Machine-coding attempt lifecycle

~~~mermaid
flowchart TD
  A([Open challenge catalogue]) --> B[Choose challenge slug]
  B --> C[Load HTML / CSS / JS starter]
  C --> D[Edit in workspace]
  D --> E[Run challenge tests]
  E --> F{Tests and status}
  F -->|Needs work| D
  F -->|Ready| G[Persist signed-in user's attempt]
  G --> H{Create collaborative interview room?}
  H -->|No| I([Continue solo practice])
  H -->|Yes| J[Create room and associate attempt]
  J --> K([Collaborative interview session])
~~~

Anonymous machine-coding state is described in the code as client-side. The database attempt record is for signed-in users, and a room association is added when an attempt is promoted to an interview room.

## 6. 🏗️ System Design level flow

~~~mermaid
flowchart TD
  A([Choose a system-design level]) --> B[Load challenge requirements]
  B --> C[Assemble typed blocks on canvas]
  C --> D[Connect components]
  D --> E[Validate topology]
  E -->|Invalid| C
  E -->|Valid| F[Run deterministic simulation]
  F --> G[Compute latency, reliability and cost metrics]
  G --> H[Score design]
  H --> I[Show feedback and trade-offs]
  I --> J{Improve design?}
  J -->|Yes| C
  J -->|No| K([Save / finish attempt])
~~~

The simulation engine is documented as client-side and deterministic. This flow does not imply a remote distributed load test.
