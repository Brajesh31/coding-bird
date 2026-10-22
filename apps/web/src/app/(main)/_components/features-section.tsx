"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Network, Palette, Users } from "lucide-react";

import { Reveal, SectionLabel } from "./primitives";
import { SpotlightCard } from "./spotlight-card";

interface Feature {
  icon: typeof Code2;
  name: string;
  description: string;
  href: string;
  cta: string;
  className: string;
  glow: string;
}

const FEATURES: Feature[] = [
  {
    icon: Code2,
    name: "Algorithmic Challenges",
    description:
      "Solve algorithmic problems in 10 languages (Python, TypeScript, C++, Rust, Go, Java, C, Ruby, PHP). Self-contained drivers run your code against strict test suites.",
    href: "/problems",
    cta: "Browse problems",
    className: "lg:col-span-2",
    glow: "rgba(56,189,248,0.18)",
  },
  {
    icon: Network,
    name: "System Design Simulator",
    description:
      "Wire up distributed architectures on a visual canvas with load balancers, caches, and queues. Run deterministic client-side simulations to measure latency, uptime, and cost.",
    href: "/system-design",
    cta: "Simulate architectures",
    className: "lg:col-span-1",
    glow: "rgba(99,102,241,0.20)",
  },
  {
    icon: Users,
    name: "Collaborative Coding Rooms",
    description:
      "Spin up in-browser IDE rooms powered by WebContainer. Pair program with real-time shared cursors, live terminal execution, and built-in team chat.",
    href: "/ducklets",
    cta: "Launch a room",
    className: "lg:col-span-1",
    glow: "rgba(14,165,233,0.18)",
  },
  {
    icon: Palette,
    name: "Machine Coding Challenges",
    description:
      "Build production-grade components and real-world frontend challenges (React, TypeScript) with live in-browser preview and automated unit test runners.",
    href: "/machine-coding",
    cta: "Practice machine coding",
    className: "lg:col-span-2",
    glow: "rgba(56,189,248,0.18)",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative border-t border-white/5 bg-black py-28">
      {/* faint grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(157,78,221,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(157,78,221,0.06)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] [background-size:48px_48px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionLabel>Everything in one place</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl">
            One platform to practice,
            <br />
            compete, and collaborate.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal
              key={feature.name}
              delay={i * 0.08}
              className={feature.className}
            >
              <SpotlightCard glow={feature.glow} className="h-full">
                <Link href={feature.href} className="flex h-full flex-col p-7">
                  <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-fuchsia-300 transition-colors duration-300 group-hover:border-fuchsia-400/40 group-hover:text-fuchsia-200">
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {feature.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-neutral-300 transition-colors group-hover:text-fuchsia-200">
                    {feature.cta}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
