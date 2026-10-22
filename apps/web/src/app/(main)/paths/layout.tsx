import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Paths · Coding Bird",
  description: "Structured roadmaps for Data Structures & Algorithms, Distributed Systems, and Machine Coding on Coding Bird.",
};

export default function LearningPathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
