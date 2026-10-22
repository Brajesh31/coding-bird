import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "~/auth/server";

export const metadata: Metadata = {
  title: "Coding Bird — Practice Coding, Build Systems, Collaborate Live",
  description:
    "Interactive developer platform: solve algorithmic challenges, practice system design architectures, and code collaboratively in real-time rooms.",
};
import { ClosingCta } from "./_components/closing-cta";
import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { SiteFooter } from "./_components/site-footer";
import { StatsBand } from "./_components/stats-band";

export default async function Home() {
  // Logged-in users skip the marketing landing and go to their workspace dashboard.
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) {
    redirect(session.user.isAdmin ? "/admin" : "/dashboard");
  }

  return (
    <main className="relative overflow-x-clip bg-black">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsBand />
      <ClosingCta />
      <SiteFooter />
    </main>
  );
}
