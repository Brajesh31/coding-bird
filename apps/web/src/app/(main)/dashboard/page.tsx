"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Code2,
  Flame,
  LayoutDashboard,
  Layers,
  Network,
  Plus,
  Radio,
  Sparkles,
  Terminal,
  Trophy,
  Users,
} from "lucide-react";

import { authClient } from "~/auth/client";
import { DIFFICULTY_COLORS } from "~/components/difficulty-badge";
import { useSignIn } from "~/components/sign-in-dialog";
import { SubmissionHeatmap } from "~/app/(main)/u/[username]/_components/submission-heatmap";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { getAvatarUrl } from "~/lib/avatar";
import { cn } from "~/lib/utils";
import { useTRPC } from "~/trpc/react";

const TOTAL_SYSTEM_DESIGN_LEVELS = 10;

export default function DashboardPage() {
  const router = useRouter();
  const trpc = useTRPC();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const { openSignIn } = useSignIn();

  const user = session?.user;
  const username = user?.username ?? "";

  // User Profile stats
  const { data: profile, isLoading: profileLoading } = useQuery(
    trpc.profile.byUsername.queryOptions(
      { username },
      { enabled: !!username },
    ),
  );

  // Recent activity / submissions
  const { data: recentActivity } = useQuery(
    trpc.profile.recentActivity.queryOptions(
      { username, limit: 5 },
      { enabled: !!username },
    ),
  );

  // System Design progress
  const { data: systemDesignProgress, isLoading: sdLoading } = useQuery(
    trpc.systemDesign.myProgress.queryOptions(undefined, { enabled: !!user }),
  );

  // Recent Rooms
  const { data: roomsData, isLoading: roomsLoading } = useQuery(
    trpc.room.list.queryOptions({ limit: 5 }, { enabled: !!user }),
  );

  // Problems catalog to recommend next unsolved
  const { data: problemsList } = useQuery(
    trpc.problem.list.queryOptions({ limit: 10 }),
  );

  // System design stats
  const sdStats = useMemo(() => {
    if (!systemDesignProgress) return { passedLevels: 0, totalStars: 0, nextLevelSlug: "level-1" };
    const passed = Object.values(systemDesignProgress).filter((a) => a.passed === 1);
    const totalStars = Object.values(systemDesignProgress).reduce((acc, a) => acc + (a.stars ?? 0), 0);

    // Find next unpassed level slug
    let nextSlug = "level-1";
    for (let i = 1; i <= TOTAL_SYSTEM_DESIGN_LEVELS; i++) {
      const slug = `level-${i}`;
      if (!systemDesignProgress[slug] || systemDesignProgress[slug].passed !== 1) {
        nextSlug = slug;
        break;
      }
    }

    return {
      passedLevels: passed.length,
      totalStars,
      nextLevelSlug: nextSlug,
    };
  }, [systemDesignProgress]);

  // First recommended problem that is not solved yet
  const nextProblem = useMemo(() => {
    return problemsList?.items?.[0] ?? {
      slug: "two-sum",
      title: "Two Sum",
      difficulty: "easy" as const,
      tags: ["Array", "Hash Table"],
    };
  }, [problemsList]);

  if (sessionLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
          <LayoutDashboard className="size-6 text-primary" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Sign in to your Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track your algorithmic solves, system design progress, streak analytics, and collaborative coding rooms.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={() => openSignIn({ source: "dashboard", callbackURL: "/dashboard" })}
            className="bg-primary text-primary-foreground font-semibold"
          >
            Sign In to Continue
          </Button>
        </div>
      </div>
    );
  }

  const streak = profile?.currentStreak ?? 0;
  const points = profile?.points ?? 0;
  const solvedCount = profile?.totalSolved ?? 0;
  const recentSubmissions = recentActivity ?? [];
  const rooms = roomsData?.items ?? [];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* 1. Header Greeting & Status */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div className="flex items-center gap-4">
          <Image
            src={getAvatarUrl(user.username, 64)}
            alt={user.name ?? "User"}
            width={56}
            height={56}
            className="size-14 rounded-full border border-border bg-card object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                Welcome back, {user.name?.split(" ")[0] ?? "Engineer"}
              </h1>
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-xs">
                Active
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              @{user.username ?? "developer"} · What would you like to engineer today?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/problems">
            <Button variant="outline" size="sm" className="border-border">
              <Code2 className="mr-1.5 size-4" />
              Practice
            </Button>
          </Link>
          <Link href="/ducklets">
            <Button size="sm" className="bg-primary text-primary-foreground font-semibold shadow-xs">
              <Plus className="mr-1.5 size-4" />
              New Room
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Band */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Solved Problems */}
        <Card className="border-border/80 bg-card/60 shadow-xs">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Problems Solved</span>
              <Code2 className="size-4 text-primary" />
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-foreground font-mono">{solvedCount}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Algorithmic Challenges</p>
            </div>
          </CardContent>
        </Card>

        {/* Current Streak */}
        <Card className="border-border/80 bg-card/60 shadow-xs">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Active Streak</span>
              <Flame className="size-4 text-amber-500" />
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-foreground font-mono flex items-center gap-1">
                {streak} <span className="text-xs font-normal text-muted-foreground">days</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Best: {profile?.longestStreak ?? streak} days
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System Design Progress */}
        <Card className="border-border/80 bg-card/60 shadow-xs">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">System Design</span>
              <Network className="size-4 text-sky-400" />
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-foreground font-mono flex items-center gap-1">
                {sdStats.passedLevels} <span className="text-xs font-normal text-muted-foreground">/ {TOTAL_SYSTEM_DESIGN_LEVELS}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                ★ {sdStats.totalStars} Stars Earned
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Engineering Score / Points */}
        <Card className="border-border/80 bg-card/60 shadow-xs">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Engineering XP</span>
              <Trophy className="size-4 text-amber-400" />
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-foreground font-mono">{points}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Points on Coding Bird</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Heatmap */}
      {user.username && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Flame className="size-4 text-amber-500" />
              Activity Heatmap
            </h2>
            <span className="text-xs text-muted-foreground font-mono">Daily engineering submissions</span>
          </div>
          <SubmissionHeatmap username={user.username} />
        </div>
      )}

      {/* 3. Recommended Intelligent Next Steps (What should I do next?) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Recommended Next Actions
          </h2>
          <span className="text-xs text-muted-foreground">Based on your activity</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Action 1: Next Algorithmic Challenge */}
          <Card className="border-border hover:border-primary/50 transition-colors bg-card/70 flex flex-col justify-between">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Practice</span>
                <Badge
                  variant="outline"
                  className={cn("text-[10px] font-mono capitalize", DIFFICULTY_COLORS[nextProblem.difficulty])}
                >
                  {nextProblem.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-base font-semibold mt-1">
                {nextProblem.title}
              </CardTitle>
              <CardDescription className="text-xs line-clamp-2">
                Continue your algorithmic practice. Run your solution against strict driver test suites.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <Link href={`/problems/${nextProblem.slug}`} className="w-full">
                <Button size="sm" className="w-full justify-between bg-accent text-foreground hover:bg-primary hover:text-primary-foreground font-medium transition-colors">
                  <span>Solve Problem</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Action 2: Next System Design Level */}
          <Card className="border-border hover:border-primary/50 transition-colors bg-card/70 flex flex-col justify-between">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Architecture</span>
                <span className="text-xs font-mono text-sky-400">Simulation</span>
              </div>
              <CardTitle className="text-base font-semibold mt-1">
                System Design {sdStats.nextLevelSlug.replace("-", " ").toUpperCase()}
              </CardTitle>
              <CardDescription className="text-xs line-clamp-2">
                Architect caches, load balancers, and databases under traffic loads to earn up to 3 stars.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <Link href={`/system-design/${sdStats.nextLevelSlug}`} className="w-full">
                <Button size="sm" className="w-full justify-between bg-accent text-foreground hover:bg-primary hover:text-primary-foreground font-medium transition-colors">
                  <span>Open Simulation</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Action 3: Live Coding Room */}
          <Card className="border-border hover:border-primary/50 transition-colors bg-card/70 flex flex-col justify-between">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Collaboration</span>
                <span className="text-xs font-mono text-emerald-400">WebContainer</span>
              </div>
              <CardTitle className="text-base font-semibold mt-1">
                Collaborative Coding Room
              </CardTitle>
              <CardDescription className="text-xs line-clamp-2">
                Launch a multi-file Node/React in-browser IDE with real-time shared cursors and instant terminal.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <Link href="/ducklets" className="w-full">
                <Button size="sm" className="w-full justify-between bg-accent text-foreground hover:bg-primary hover:text-primary-foreground font-medium transition-colors">
                  <span>Start New Room</span>
                  <Plus className="size-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. Active Rooms & Recent Activity Split Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Collaborative Rooms */}
        <Card className="border-border bg-card/60">
          <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Your Coding Rooms</CardTitle>
              <CardDescription className="text-xs">
                In-browser workspaces with live collaboration
              </CardDescription>
            </div>
            <Link href="/ducklets" className="text-xs text-primary hover:underline">
              View all ({rooms.length})
            </Link>
          </CardHeader>
          <CardContent className="p-5 pt-2">
            {rooms.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-6 text-center">
                <Users className="mx-auto size-8 text-muted-foreground/60" />
                <p className="mt-2 text-xs font-medium text-foreground">No active rooms yet</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Create a collaborative room to code with colleagues or friends in real time.
                </p>
                <Link href="/ducklets" className="mt-4 inline-block">
                  <Button size="sm" variant="outline" className="text-xs">
                    Create First Room
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {rooms.map((room) => (
                  <Link
                    key={room.id}
                    href={`/ducklets/${room.id}`}
                    className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Terminal className="size-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{room.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {room.description ?? "Collaborative workspace"} · Room #{room.id}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card className="border-border bg-card/60">
          <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
              <CardDescription className="text-xs">
                Your latest accepted algorithmic submissions
              </CardDescription>
            </div>
            <Link href="/problems" className="text-xs text-primary hover:underline">
              Browse Problems
            </Link>
          </CardHeader>
          <CardContent className="p-5 pt-2">
            {recentSubmissions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-6 text-center">
                <CheckCircle2 className="mx-auto size-8 text-muted-foreground/60" />
                <p className="mt-2 text-xs font-medium text-foreground">No recent submissions</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Pick a problem and submit your solution to build your engineering history.
                </p>
                <Link href="/problems" className="mt-4 inline-block">
                  <Button size="sm" variant="outline" className="text-xs">
                    Start Solving
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {recentSubmissions.slice(0, 5).map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-mono",
                          sub.status === "accepted"
                            ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                            : "border-red-500/30 text-red-400 bg-red-500/10",
                        )}
                      >
                        {sub.status === "accepted" ? "Accepted" : sub.status}
                      </Badge>
                      <div>
                        <div className="text-sm font-medium text-foreground">{sub.problemTitle}</div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {sub.lang.toUpperCase()} · {sub.difficulty} · {new Date(sub.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Link href={`/problems/${sub.problemSlug}`}>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
