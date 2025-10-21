import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";

// Lazy load non-critical components for better performance
// These components are below the fold and don't need to block initial render
const TrustedBy = dynamic(
  () =>
    import("@/components/TrustedBy").then((mod) => ({
      default: mod.TrustedBy,
    })),
  {
    loading: () => <div className="py-20 border-t border-zinc-800/50" />,
  }
);

const Features = dynamic(
  () =>
    import("@/components/Features").then((mod) => ({ default: mod.Features })),
  {
    loading: () => <div className="py-24 md:py-32" />,
  }
);

const CTASection = dynamic(
  () =>
    import("@/components/CTASection").then((mod) => ({
      default: mod.CTASection,
    })),
  {
    loading: () => <div className="py-24 md:py-32" />,
  }
);

const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => ({ default: mod.Footer })),
  {
    loading: () => (
      <div className="border-t border-zinc-800/50 bg-black py-16 md:py-20" />
    ),
  }
);

const AIChatLauncher = dynamic(
  () =>
    import("@/components/AIChatLauncher").then((mod) => ({
      default: mod.AIChatLauncher,
    })),
  { ssr: false }
);

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen">
      <Navigation />
      <Hero />
      <TrustedBy />
      <Features />
      <CTASection />
      <Footer />
      <AIChatLauncher />
    </main>
  );
}
