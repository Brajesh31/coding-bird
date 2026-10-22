import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaborative Rooms",
  description:
    "Real-time collaborative coding rooms for pair programming and technical interviews on Coding Bird.",
};

export default function DuckletsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
