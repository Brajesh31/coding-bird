import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard · Coding Bird",
  description: "Track your engineering progress, solve streaks, system design simulations, and collaborative coding rooms on Coding Bird.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
