# 🧩 UML, Component and Data Models

These models are derived from the current source layout and Drizzle schema. The ER diagram is a selected subset, not a replacement for the complete schema.

## 1. 🧱 Component diagram

~~~mermaid
flowchart TB
  subgraph Applications
    Web[apps/web · Next.js 16 / React 19]
    Realtime[apps/hocuspocus-server · Hocuspocus]
  end
  subgraph SharedPackages
    Api[packages/api · tRPC routers]
    Auth[packages/auth · Better Auth + collab tokens]
    Db[packages/db · Drizzle schema]
    Storage[packages/storage · S3 / R2]
    Fs[packages/ducklet-fs · filesystem model]
    Validators[packages/validators · Zod schemas]
    Content[packages/machine-coding-content]
  end
  Web --> Api
  Web --> Auth
  Web --> Fs
  Web --> Content
  Web --> Validators
  Api --> Auth
  Api --> Db
  Api --> Storage
  Api --> Validators
  Realtime --> Auth
  Realtime --> Db
  Realtime --> Fs
~~~

## 2. 🗃️ Selected entity relationship diagram

~~~mermaid
erDiagram
  USER ||--|| USER_PROFILE : has
  USER ||--o{ SUBMISSION : creates
  PROBLEM ||--o{ SUBMISSION : receives
  USER ||--o{ BOOKMARK : saves
  PROBLEM ||--o{ BOOKMARK : bookmarked
  USER ||--o{ DUCKLET : owns
  DUCKLET ||--o{ DUCKLET_MEMBER : has
  USER ||--o{ DUCKLET_MEMBER : joins
  DUCKLET ||--o{ DUCKLET_MESSAGE : contains
  USER o|--o{ DUCKLET_MESSAGE : authors
  DUCKLET ||--o{ DUCKLET_SNAPSHOT : snapshots
  USER o|--o{ DUCKLET_SNAPSHOT : creates
  USER ||--o{ SYSTEM_DESIGN_ATTEMPT : records
  USER ||--o{ CHALLENGE_ATTEMPT : makes
  CHALLENGE ||--o{ CHALLENGE_ATTEMPT : receives
  USER ||--o{ MACHINE_CODING_ATTEMPT : practices
  DUCKLET o|--o{ MACHINE_CODING_ATTEMPT : interview_room

  USER {
    text id PK
  }
  USER_PROFILE {
    text user_id PK,FK
    varchar username UK
    varchar fullname
    integer points
    integer current_streak
  }
  PROBLEM {
    integer id PK
    varchar slug UK
    varchar title
    varchar difficulty
    jsonb test_cases
  }
  SUBMISSION {
    integer id PK
    text user_id FK
    integer problem_id FK
    varchar kind
    varchar lang
    varchar status
  }
  BOOKMARK {
    integer id PK
    text user_id FK
    integer problem_id FK
  }
  DUCKLET {
    integer id PK
    text owner_id FK
    boolean is_public
    varchar kind
    text yjs_data
  }
  DUCKLET_MEMBER {
    integer ducklet_id PK,FK
    text user_id PK,FK
    varchar role
    varchar status
  }
  DUCKLET_MESSAGE {
    varchar id PK
    integer ducklet_id FK
    text user_id FK
    text content
  }
  DUCKLET_SNAPSHOT {
    integer id PK
    integer ducklet_id FK
    text created_by FK
    text yjs_data
  }
  SYSTEM_DESIGN_ATTEMPT {
    integer id PK
    text user_id FK
    varchar level_slug
    jsonb graph
    integer stars
  }
  CHALLENGE {
    integer id PK
    varchar slug UK
    text creator_id FK
  }
  CHALLENGE_ATTEMPT {
    integer id PK
    integer challenge_id FK
    text user_id FK
    integer score
    varchar status
  }
  MACHINE_CODING_ATTEMPT {
    integer id PK
    text user_id FK
    varchar problem_slug
    integer ducklet_id FK
    varchar status
  }
~~~

**Schema notes:** DUCKLET is the SQL table name used by the generalized room code-level model. Machine-coding problem content is code-defined and referenced by slug, not stored in a machine-coding problem table. Some relationships are optional and some deletes set foreign keys to null. Consult packages/db/src/schema for exact constraints and delete behavior.

## 3. 🧬 Domain class model

~~~mermaid
classDiagram
  class AppRouter {
    +auth
    +problem
    +submission
    +codeDraft
    +playground
    +storage
    +ducklet
    +profile
    +bookmark
    +comment
    +systemDesign
  }
  class TRPCContext {
    +authApi
    +session
    +db
  }
  class SubmissionDriver {
    +language
    +source
    +testCases
    +generate()
  }
  class JudgeService {
    +execute(driver)
    +returnReport()
  }
  class CollaborationToken {
    +userId
    +username
    +roomId
    +role
    +exp
  }
  class HocuspocusServer {
    +authenticate(token)
    +loadDocument()
    +storeDocument()
    +sanitizeAwareness()
  }
  AppRouter --> TRPCContext
  AppRouter --> SubmissionDriver
  SubmissionDriver --> JudgeService
  CollaborationToken --> HocuspocusServer
~~~

## 4. 🔁 Submission state model

~~~mermaid
stateDiagram-v2
  [*] --> pending
  pending --> running
  running --> accepted
  running --> wrong_answer
  running --> runtime_error
  running --> time_limit
  running --> compile_error
  running --> judge_error
  accepted --> [*]
  wrong_answer --> [*]
  runtime_error --> [*]
  time_limit --> [*]
  compile_error --> [*]
  judge_error --> [*]
~~~

These statuses match the declared submission enum. Exact transition timing is controlled by the API and judge implementation.

## 5. 🧪 Machine coding attempt state

~~~mermaid
stateDiagram-v2
  [*] --> in_progress
  in_progress --> completed
  completed --> revealed
  revealed --> [*]
~~~

The database enum contains **in-progress**, **completed**, and **revealed**. Do not assume anonymous client-side attempts create database rows.
