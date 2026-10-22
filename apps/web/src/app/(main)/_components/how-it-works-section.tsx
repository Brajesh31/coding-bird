"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Network, Sparkles, Terminal, Users } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Reveal, SectionLabel } from "./primitives";

interface Step {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Code2;
  actionText: string;
  actionHref: string;
  codePreview: {
    filename: string;
    lang: string;
    lines: string[];
    highlightTag?: string;
  };
}

const STEPS: Step[] = [
  {
    id: "practice",
    number: "01",
    title: "Practice Algorithmic Challenges",
    subtitle: "10 Languages · Self-Contained Driver Verification",
    description:
      "Solve algorithmic problems across Python, C++, Rust, Go, Java, and TypeScript. Coding Bird embeds test inputs and strict comparisons in self-contained driver programs with instant judge verdicts.",
    icon: Code2,
    actionText: "Browse Problems",
    actionHref: "/problems",
    codePreview: {
      filename: "solution.rs",
      lang: "rust",
      lines: [
        "impl Solution {",
        "    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {",
        "        let mut map = std::collections::HashMap::new();",
        "        for (i, &num) in nums.iter().enumerate() {",
        "            if let Some(&idx) = map.get(&(target - num)) {",
        "                return vec![idx as i32, i as i32];",
        "            }",
        "            map.insert(num, i);",
        "        }",
        "        vec![]",
        "    }",
        "}",
      ],
      highlightTag: "Verdict: Accepted (0ms, 2.1MB)",
    },
  },
  {
    id: "architect",
    number: "02",
    title: "Simulate Distributed Architectures",
    subtitle: "Visual Canvas · Client-Side Traffic Simulation",
    description:
      "Wire load balancers, Redis caches, Kafka queues, and PostgreSQL replicas. Run real-time traffic simulations to test your system against latency spikes, budget constraints, and uptime SLAs.",
    icon: Network,
    actionText: "Try System Design",
    actionHref: "/system-design",
    codePreview: {
      filename: "architecture.yaml",
      lang: "yaml",
      lines: [
        "traffic_profile: HighThroughputReadHeavy",
        "components:",
        "  - id: api-gateway",
        "    type: LoadBalancer (RoundRobin)",
        "  - id: redis-cache",
        "    type: Cache (TTL: 300s, HitRate: 94.2%)",
        "  - id: postgres-cluster",
        "    type: RelationalDB (1 Primary, 2 Read-Replicas)",
        "simulation_result:",
        "  uptime: 99.98% | latency: 18ms | cost: $142/mo",
      ],
      highlightTag: "Score: ★★★ Optimal Architecture",
    },
  },
  {
    id: "collaborate",
    number: "03",
    title: "Collaborate in Real-Time Rooms",
    subtitle: "In-Browser WebContainer IDE · Live CRDT Presence",
    description:
      "Open an instant fullstack coding room powered by WebContainer. Pair program in real time with shared cursors, terminal execution, virtual filesystem trees, and integrated audio/chat.",
    icon: Users,
    actionText: "Create a Room",
    actionHref: "/ducklets",
    codePreview: {
      filename: "src/server.ts",
      lang: "typescript",
      lines: [
        "// Connected: @brajesh (cursor L4), @alex (cursor L8)",
        "import { createServer } from 'node:http';",
        "",
        "const server = createServer((req, res) => {",
        "  res.writeHead(200, { 'Content-Type': 'application/json' });",
        "  res.end(JSON.stringify({ status: 'live', node: process.version }));",
        "});",
        "",
        "server.listen(3000, () => console.log('Listening on :3000'));",
      ],
      highlightTag: "Live: 2 peers connected · WebContainer running",
    },
  },
  {
    id: "master",
    number: "04",
    title: "Tackle Machine Coding Challenges",
    subtitle: "Production UI Components · Automated Unit Test Suites",
    description:
      "Practice real-world machine coding rounds. Build interactive components like virtualized lists, accordions, and kanban boards with live preview and automated test harnesses.",
    icon: Cpu,
    actionText: "Explore Machine Coding",
    actionHref: "/machine-coding",
    codePreview: {
      filename: "src/Accordion.test.tsx",
      lang: "typescript",
      lines: [
        "describe('Accordion Component', () => {",
        "  it('toggles collapsible section on click', async () => {",
        "    render(<Accordion items={testItems} />);",
        "    const header = screen.getByText('Section 1');",
        "    await userEvent.click(header);",
        "    expect(screen.getByText('Content 1')).toBeVisible();",
        "  });",
        "});",
      ],
      highlightTag: "Tests: 6 passed, 0 failed",
    },
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep]!;

  return (
    <section className="relative border-t border-border bg-background py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start gap-2">
            <SectionLabel>The Engineering Workflow</SectionLabel>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              From Algorithmic Precision to Distributed Scale
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              A comprehensive developer learning progression designed to prepare you for real engineering challenges.
            </p>
          </div>
        </Reveal>

        {/* Step Selector Tabs */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STEPS.map((step, idx) => {
            const isSelected = idx === activeStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "flex flex-col items-start rounded-lg border p-4 text-left transition-all duration-200",
                  isSelected
                    ? "border-primary bg-card shadow-sm ring-1 ring-primary/40"
                    : "border-border bg-card/40 hover:bg-card hover:border-border/80 text-muted-foreground",
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-xs font-bold",
                      isSelected ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {step.number}
                  </span>
                  <step.icon
                    className={cn(
                      "size-4",
                      isSelected ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                </div>
                <div
                  className={cn(
                    "mt-2 text-sm font-semibold",
                    isSelected ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title.split(" ")[0]} {step.title.split(" ")[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="mt-8 grid grid-cols-1 gap-8 rounded-xl border border-border bg-card p-6 md:grid-cols-12 md:p-8 lg:p-10 shadow-sm">
          {/* Left: Explanation */}
          <div className="flex flex-col justify-between md:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="text-primary font-mono">{current.number}</span>
                <span>{current.subtitle}</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {current.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {current.description}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link href={current.actionHref}>
                <Button className="bg-primary text-primary-foreground font-semibold">
                  {current.actionText}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Code/Architecture Preview Window */}
          <div className="overflow-hidden rounded-lg border border-border bg-neutral-950 font-mono text-xs md:col-span-7">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/90 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-amber-500/80" />
                <span className="size-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-neutral-400">{current.codePreview.filename}</span>
              </div>
              {current.codePreview.highlightTag && (
                <span className="rounded bg-primary/20 px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                  {current.codePreview.highlightTag}
                </span>
              )}
            </div>

            {/* Code Lines */}
            <div className="p-4 overflow-x-auto text-neutral-300">
              <pre className="space-y-1">
                {current.codePreview.lines.map((line, lIndex) => (
                  <div key={lIndex} className="flex leading-relaxed">
                    <span className="w-8 shrink-0 select-none text-neutral-600 text-right pr-3">
                      {lIndex + 1}
                    </span>
                    <span className="text-neutral-200">{line}</span>
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
