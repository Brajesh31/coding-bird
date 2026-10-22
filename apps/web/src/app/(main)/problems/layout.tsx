import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Problems",
  description:
    "Browse and solve coding challenges across multiple languages with instant judging on Coding Bird.",
};

export default function ProblemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
