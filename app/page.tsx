import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { Features } from "@/components/Features";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <Hero />
      <TrustedBy />
      <Features />
      <CTASection />
      <Footer />
    </main>
  );
}
