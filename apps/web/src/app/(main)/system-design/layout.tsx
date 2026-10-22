import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Design",
  description:
    "Master system architecture with interactive drag-and-drop puzzles and real-time traffic simulation on Coding Bird.",
};

export default function SystemDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
