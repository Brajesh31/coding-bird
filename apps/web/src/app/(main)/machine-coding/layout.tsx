import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machine Coding",
  description:
    "Practice front-end and full-stack machine-coding interview challenges in a real in-browser IDE on Coding Bird.",
};

export default function MachineCodingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
