import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings · Coding Bird",
  description: "Configure your editor preferences, keybindings, profile details, and account settings on Coding Bird.",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
