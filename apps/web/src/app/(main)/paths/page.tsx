"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Code2,
  Compass,
  FileCode,
  Layers,
  Network,
  Sparkles,
  Trophy,
} from "lucide-react";

import { authClient } from "~/auth/client";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { LEARNING_PATHS, type LearningPath, type PathModule } from "~/data/learning-paths";
import { cn } from "~/lib/utils";
import { useTRPC } from "~/trpc/react";

export default function LearningPathsPage() {
  const { data: session } = authClient.useSession();
  const trpc = useTRPC();
  const [selectedPathSlug, setSelectedPathSlug] = useState<string>("dsa-foundations");
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "mod-arrays-hashing": true,
    "sd-mod-edge-caching": true,
    "mc-mod-interactive-ui": true,
  });

  const selectedPath = useMemo(() => {
    return LEARNING_PATHS.find((p) => p.slug === selectedPathSlug) ?? LEARNING_PATHS[0]!;
  }, [selectedPathSlug]);

  // System Design progress
  const { data: sdProgress } = useQuery(
    trpc.systemDesign.myProgress.queryOptions(undefined, { enabled: !!session?.user }),
  );

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
          <Compass className="size-4" />
          <span>Curated Roadmaps</span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Structured Learning Paths
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Follow step-by-step engineering curriculums designed to take you from foundational syntax to multi-region distributed system architectures.
        </p>
      </div>

      {/* Path Selector Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {LEARNING_PATHS.map((path) => {
          const isSelected = path.slug === selectedPathSlug;
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => setSelectedPathSlug(path.slug)}
              className={cn(
                "flex flex-col justify-between rounded-xl border p-5 text-left transition-all duration-200",
                isSelected
                  ? "border-primary bg-card ring-1 ring-primary/40 shadow-sm"
                  : "border-border bg-card/40 hover:bg-card hover:border-border/80 text-muted-foreground",
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary bg-primary/5">
                    {path.badge}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">{path.difficulty}</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-foreground">{path.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {path.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground font-mono">
                <span>{path.totalModules} Modules</span>
                <span>~{path.totalHours} Hours</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Path Details & Module Breakdown */}
      <div className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-mono text-muted-foreground">
              <span>Path Progress</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-foreground">{selectedPath.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
              {selectedPath.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1">
              <Layers className="size-3.5 text-primary" /> {selectedPath.modules.length} Modules
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-primary" /> ~{selectedPath.totalHours} Hours
            </span>
          </div>
        </div>

        {/* Modules Accordion */}
        <div className="space-y-4">
          {selectedPath.modules.map((mod, modIdx) => {
            const isExpanded = expandedModules[mod.id] ?? false;
            return (
              <div
                key={mod.id}
                className="overflow-hidden rounded-lg border border-border bg-card/60 transition-colors"
              >
                {/* Module Header Bar */}
                <button
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-accent/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded-md border border-border bg-muted/40 font-mono text-xs font-bold text-primary">
                      {modIdx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{mod.title}</div>
                      <div className="text-xs text-muted-foreground">{mod.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline font-mono text-xs text-muted-foreground">
                      {mod.items.length} {mod.items.length === 1 ? "Challenge" : "Challenges"} · ~{mod.estimatedHours}h
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="size-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="size-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Module Items List */}
                {isExpanded && (
                  <div className="border-t border-border/80 bg-background/50 divide-y divide-border/60 p-2">
                    {mod.items.map((item, itemIdx) => {
                      const isSd = item.type === "system-design";
                      const href = isSd
                        ? `/system-design/${item.slug}`
                        : item.type === "machine-coding"
                          ? `/machine-coding`
                          : `/problems/${item.slug}`;

                      const isPassed = isSd && sdProgress?.[item.slug]?.passed === 1;

                      return (
                        <div
                          key={itemIdx}
                          className="flex items-center justify-between p-3 rounded-md hover:bg-accent/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-muted-foreground">
                              {isPassed ? (
                                <CheckCircle2 className="size-4 text-emerald-400" />
                              ) : isSd ? (
                                <Network className="size-4 text-primary" />
                              ) : (
                                <Code2 className="size-4 text-primary" />
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">{item.title}</div>
                              <div className="text-[11px] text-muted-foreground font-mono">
                                {item.type === "system-design"
                                  ? "Architecture Simulation"
                                  : item.type === "machine-coding"
                                    ? "UI Component Harness"
                                    : "Algorithmic Code Verdict"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-mono capitalize"
                            >
                              {item.difficulty}
                            </Badge>
                            <Link href={href}>
                              <Button size="sm" variant="ghost" className="h-8 gap-1 text-xs">
                                <span>Start</span>
                                <ArrowRight className="size-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
