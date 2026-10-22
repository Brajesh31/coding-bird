"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Code2,
  FileCode,
  LayoutDashboard,
  Moon,
  Network,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  Terminal,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";

import { DIFFICULTY_COLORS } from "~/components/difficulty-badge";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Kbd } from "~/components/ui/kbd";
import { LEVELS } from "~/data/system-design";
import { cn } from "~/lib/utils";
import { useTRPC } from "~/trpc/react";

interface PaletteItem {
  id: string;
  category: "Navigation" | "System Design" | "Problems" | "Actions";
  title: string;
  subtitle?: string;
  icon: typeof Code2;
  badge?: string;
  badgeClass?: string;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const trpc = useTRPC();
  const { theme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  // Search problems query (debounced by React state)
  const { data: problemsData } = useQuery(
    trpc.problem.list.queryOptions(
      { search: query || undefined, limit: 6 },
      { enabled: open },
    ),
  );

  // Global hotkey listener (⌘K, Ctrl+K, or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "/" && !open) {
        const target = e.target as HTMLElement | null;
        const isInput =
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.isContentEditable ||
          target?.closest(".monaco-editor") ||
          target?.closest(".cm-editor");
        if (!isInput) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const selectAndClose = useCallback(
    (action: () => void) => {
      setOpen(false);
      action();
    },
    [],
  );

  // Static navigation and action items
  const staticItems = useMemo<PaletteItem[]>(() => {
    return [
      {
        id: "nav-dashboard",
        category: "Navigation",
        title: "Developer Dashboard",
        subtitle: "View streak, progress center, and recommended actions",
        icon: LayoutDashboard,
        action: () => selectAndClose(() => router.push("/dashboard")),
      },
      {
        id: "nav-problems",
        category: "Navigation",
        title: "Algorithmic Problems",
        subtitle: "Practice coding challenges in 10 languages",
        icon: Code2,
        action: () => selectAndClose(() => router.push("/problems")),
      },
      {
        id: "nav-system-design",
        category: "Navigation",
        title: "System Design Simulator",
        subtitle: "10 calibrated levels of distributed architectures",
        icon: Network,
        action: () => selectAndClose(() => router.push("/system-design")),
      },
      {
        id: "nav-rooms",
        category: "Navigation",
        title: "Collaborative Coding Rooms",
        subtitle: "In-browser WebContainer IDE with live shared cursors",
        icon: Users,
        action: () => selectAndClose(() => router.push("/ducklets")),
      },
      {
        id: "nav-machine-coding",
        category: "Navigation",
        title: "Machine Coding Challenges",
        subtitle: "Real-world component exercises with unit test runners",
        icon: FileCode,
        action: () => selectAndClose(() => router.push("/machine-coding")),
      },
      {
        id: "nav-playground",
        category: "Navigation",
        title: "Playground Runner",
        subtitle: "Instant code execution scratchpad",
        icon: Terminal,
        action: () => selectAndClose(() => router.push("/playground")),
      },
      {
        id: "action-new-room",
        category: "Actions",
        title: "Create New Coding Room",
        subtitle: "Spin up a shared workspace",
        icon: Plus,
        badge: "Action",
        action: () => selectAndClose(() => router.push("/ducklets?new=1")),
      },
      {
        id: "action-toggle-theme",
        category: "Actions",
        title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
        subtitle: "Toggle visual color theme",
        icon: theme === "dark" ? Sun : Moon,
        badge: "Theme",
        action: () => selectAndClose(() => setTheme(theme === "dark" ? "light" : "dark")),
      },
      {
        id: "nav-settings",
        category: "Navigation",
        title: "Developer Settings",
        subtitle: "Configure editor preferences and profile details",
        icon: Settings,
        action: () => selectAndClose(() => router.push("/settings")),
      },
    ];
  }, [router, selectAndClose, theme, setTheme]);

  // System Design Level Items
  const systemDesignItems = useMemo<PaletteItem[]>(() => {
    return LEVELS.map((level, idx) => ({
      id: `sd-${level.slug}`,
      category: "System Design" as const,
      title: `${level.title}`,
      subtitle: `Level ${idx + 1} · Budget $${level.budget} · ${level.difficulty}`,
      icon: Network,
      badge: level.difficulty,
      badgeClass:
        level.difficulty === "beginner"
          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
          : level.difficulty === "intermediate"
            ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
            : "border-red-500/30 text-red-400 bg-red-500/10",
      action: () => selectAndClose(() => router.push(`/system-design/${level.slug}`)),
    }));
  }, [router, selectAndClose]);

  // Algorithmic Problems Items
  const problemItems = useMemo<PaletteItem[]>(() => {
    return (problemsData?.items ?? []).map((problem) => ({
      id: `problem-${problem.slug}`,
      category: "Problems" as const,
      title: problem.title,
      subtitle: (problem.tags ?? []).slice(0, 3).join(", ") || "Problem solving",
      icon: Code2,
      badge: problem.difficulty,
      badgeClass: cn("capitalize", DIFFICULTY_COLORS[problem.difficulty]),
      action: () => selectAndClose(() => router.push(`/problems/${problem.slug}`)),
    }));
  }, [problemsData, router, selectAndClose]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default initial view: Navigation + System Design + Actions
      return [...staticItems, ...systemDesignItems.slice(0, 4)];
    }

    const all = [...problemItems, ...systemDesignItems, ...staticItems];
    return all.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle?.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      return matchTitle || matchSubtitle || matchCategory;
    });
  }, [query, staticItems, systemDesignItems, problemItems]);

  // Handle arrow keys and Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) current.action();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl overflow-hidden p-0 gap-0 border-border bg-card/95 shadow-2xl backdrop-blur-xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Command Palette</DialogTitle>
            <DialogDescription>Quickly search problems, system designs, rooms, and developer tools</DialogDescription>
          </DialogHeader>

          {/* Search Input Bar */}
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="size-4 shrink-0 text-muted-foreground mr-3" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search problems, architectures, rooms, or actions... (Esc to close)"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground mr-2 font-mono"
              >
                Clear
              </button>
            )}
            <Kbd>ESC</Kbd>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No matching results found for <span className="text-foreground font-mono">"{query}"</span>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        isSelected
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            "flex size-7 items-center justify-center rounded-md border",
                            isSelected
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : "border-border bg-muted/40 text-muted-foreground",
                          )}
                        >
                          <item.icon className="size-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-medium text-foreground text-xs sm:text-sm">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="truncate text-[11px] text-muted-foreground">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {item.badge && (
                          <Badge
                            variant="outline"
                            className={cn("text-[10px] font-mono", item.badgeClass)}
                          >
                            {item.badge}
                          </Badge>
                        )}
                        <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider hidden sm:inline">
                          {item.category}
                        </span>
                        <ArrowRight
                          className={cn(
                            "size-3.5 transition-transform",
                            isSelected ? "text-primary translate-x-0.5" : "text-muted-foreground/40",
                          )}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Guide */}
          <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Kbd>↑</Kbd> <Kbd>↓</Kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <Kbd>↵</Kbd> Select
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>Coding Bird Command Palette</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
