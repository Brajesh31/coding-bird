export interface PathModule {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  itemCount: number;
  type: "problem" | "system-design" | "machine-coding";
  items: {
    title: string;
    slug: string;
    type: "problem" | "system-design" | "machine-coding";
    difficulty: "easy" | "medium" | "hard" | "beginner" | "intermediate" | "advanced";
  }[];
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  badge: string;
  description: string;
  totalModules: number;
  totalHours: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  modules: PathModule[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "dsa-foundations",
    slug: "dsa-foundations",
    title: "Data Structures & Algorithms Foundations",
    badge: "Core Engineering",
    description:
      "Master the fundamental algorithmic patterns required for technical interviews and efficient software engineering across arrays, trees, graphs, and dynamic programming.",
    totalModules: 5,
    totalHours: 24,
    difficulty: "Intermediate",
    modules: [
      {
        id: "mod-arrays-hashing",
        title: "Arrays & Hash Tables",
        description: "Constant-time lookups, frequency maps, prefix sums, and two-sum patterns.",
        estimatedHours: 4,
        itemCount: 4,
        type: "problem",
        items: [
          { title: "Two Sum", slug: "two-sum", type: "problem", difficulty: "easy" },
          { title: "Contains Duplicate", slug: "two-sum", type: "problem", difficulty: "easy" },
          { title: "Valid Anagram", slug: "two-sum", type: "problem", difficulty: "easy" },
          { title: "Group Anagrams", slug: "two-sum", type: "problem", difficulty: "medium" },
        ],
      },
      {
        id: "mod-two-pointers",
        title: "Two Pointers & Sliding Window",
        description: "Optimizing O(n²) loops down to O(n) using pointer convergence and variable-width windows.",
        estimatedHours: 5,
        itemCount: 3,
        type: "problem",
        items: [
          { title: "Valid Palindrome", slug: "two-sum", type: "problem", difficulty: "easy" },
          { title: "3Sum", slug: "two-sum", type: "problem", difficulty: "medium" },
          { title: "Container With Most Water", slug: "two-sum", type: "problem", difficulty: "medium" },
        ],
      },
      {
        id: "mod-stacks-queues",
        title: "Stacks, Queues & Monotonic Structures",
        description: "LIFO execution, matching parentheticals, and monotonic stack tracking for next-greater element.",
        estimatedHours: 4,
        itemCount: 3,
        type: "problem",
        items: [
          { title: "Valid Parentheses", slug: "two-sum", type: "problem", difficulty: "easy" },
          { title: "Min Stack", slug: "two-sum", type: "problem", difficulty: "medium" },
          { title: "Daily Temperatures", slug: "two-sum", type: "problem", difficulty: "medium" },
        ],
      },
      {
        id: "mod-trees-graphs",
        title: "Binary Trees & Graph Traversals",
        description: "DFS recursion, BFS queue exploration, topological sorting, and shortest path algorithms.",
        estimatedHours: 6,
        itemCount: 4,
        type: "problem",
        items: [
          { title: "Invert Binary Tree", slug: "two-sum", type: "problem", difficulty: "easy" },
          { title: "Maximum Depth of Binary Tree", slug: "two-sum", type: "problem", difficulty: "easy" },
          { title: "Number of Islands", slug: "two-sum", type: "problem", difficulty: "medium" },
          { title: "Course Schedule", slug: "two-sum", type: "problem", difficulty: "medium" },
        ],
      },
      {
        id: "mod-dp",
        title: "Dynamic Programming & Memoization",
        description: "Optimal substructure, overlapping subproblems, 1D and 2D tabular states.",
        estimatedHours: 5,
        itemCount: 3,
        type: "problem",
        items: [
          { title: "Climbing Stairs", slug: "two-sum", type: "problem", difficulty: "easy" },
          { title: "Coin Change", slug: "two-sum", type: "problem", difficulty: "medium" },
          { title: "Longest Increasing Subsequence", slug: "two-sum", type: "problem", difficulty: "medium" },
        ],
      },
    ],
  },
  {
    id: "system-design-foundations",
    slug: "system-design-foundations",
    title: "System Design & Distributed Architectures",
    badge: "Scale & Reliability",
    description:
      "Learn how to design scalable, highly available systems by experimenting with real traffic simulations across CDNs, load balancers, caching tiers, event queues, and database replicas.",
    totalModules: 4,
    totalHours: 18,
    difficulty: "Advanced",
    modules: [
      {
        id: "sd-mod-edge-caching",
        title: "Edge Networks & Static Caching",
        description: "Minimizing latency via CDN edge points of presence and origin shielding.",
        estimatedHours: 3,
        itemCount: 2,
        type: "system-design",
        items: [
          { title: "Static Content Delivery", slug: "cdn-static-site", type: "system-design", difficulty: "beginner" },
          { title: "High-Availability Web App", slug: "simple-web-app", type: "system-design", difficulty: "beginner" },
        ],
      },
      {
        id: "sd-mod-data-tier",
        title: "Caching Tiers & Database Replication",
        description: "Read replicas, Redis cache-aside invalidation strategies, and connection pooling under load.",
        estimatedHours: 4,
        itemCount: 2,
        type: "system-design",
        items: [
          { title: "API with Redis Caching", slug: "api-with-cache", type: "system-design", difficulty: "intermediate" },
          { title: "E-Commerce Checkout Flow", slug: "e-commerce-checkout", type: "system-design", difficulty: "intermediate" },
        ],
      },
      {
        id: "sd-mod-async-queues",
        title: "Asynchronous Workers & Event Streaming",
        description: "Decoupling synchronous request paths with message brokers, Kafka queues, and background processors.",
        estimatedHours: 5,
        itemCount: 2,
        type: "system-design",
        items: [
          { title: "Background Processing Pipeline", slug: "async-processing", type: "system-design", difficulty: "intermediate" },
          { title: "Distributed Search Platform", slug: "search-platform", type: "system-design", difficulty: "advanced" },
        ],
      },
      {
        id: "sd-mod-global-scale",
        title: "Real-Time State & Multi-Region Scale",
        description: "WebSocket stateful connections, time-series ingest, and multi-region routing under budget limits.",
        estimatedHours: 6,
        itemCount: 4,
        type: "system-design",
        items: [
          { title: "Real-Time WebSocket Chat", slug: "realtime-chat", type: "system-design", difficulty: "advanced" },
          { title: "High-Volume IoT Telemetry", slug: "iot-telemetry", type: "system-design", difficulty: "advanced" },
          { title: "Social Media Feed Ingest", slug: "social-media-feed", type: "system-design", difficulty: "advanced" },
          { title: "Global Multi-Region API", slug: "global-api", type: "system-design", difficulty: "advanced" },
        ],
      },
    ],
  },
  {
    id: "machine-coding-foundations",
    slug: "machine-coding-foundations",
    title: "Production Machine Coding & Components",
    badge: "Frontend Architecture",
    description:
      "Practice building robust, accessible UI components from scratch in React & TypeScript. Test your implementations against automated in-browser unit test suites.",
    totalModules: 3,
    totalHours: 12,
    difficulty: "Intermediate",
    modules: [
      {
        id: "mc-mod-interactive-ui",
        title: "Interactive State & Collapsible Panels",
        description: "Accordion patterns, accessible keyboard triggers, and multiple open modes.",
        estimatedHours: 4,
        itemCount: 1,
        type: "machine-coding",
        items: [
          { title: "Accessible Accordion", slug: "accordion", type: "machine-coding", difficulty: "intermediate" },
        ],
      },
      {
        id: "mc-mod-data-grids",
        title: "Data Grids & Asynchronous Pagination",
        description: "Sorting, filtering, debounced search, and virtualized list viewport renders.",
        estimatedHours: 4,
        itemCount: 1,
        type: "machine-coding",
        items: [
          { title: "Data Table with Sorting", slug: "accordion", type: "machine-coding", difficulty: "intermediate" },
        ],
      },
      {
        id: "mc-mod-drag-drop",
        title: "Complex State & Drag-and-Drop",
        description: "Kanban board state manipulation, optimistic updates, and cross-column item reordering.",
        estimatedHours: 4,
        itemCount: 1,
        type: "machine-coding",
        items: [
          { title: "Kanban Board Workflow", slug: "accordion", type: "machine-coding", difficulty: "advanced" },
        ],
      },
    ],
  },
];
