"use client";

import { siteConfig } from "@/lib/siteConfig";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GradientText } from "@/components/GradientText";
import { use3DTilt } from "@/hooks/use3DTilt";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface CompanyCardProps {
  company: { name: string; logo?: string };
  index: number;
}

function CompanyCard({ company, index }: CompanyCardProps) {
  const { ref } = use3DTilt<HTMLDivElement>({
    max: 10,
    perspective: 1000,
    scale: 1.08,
    speed: 400,
    glare: true,
    maxGlare: 0.25,
  });

  return (
    <ScrollReveal
      variant="scale"
      delay={index * 0.1}
      duration={0.5}
      className="w-full"
    >
      <div ref={ref} className="w-full">
        <div className="flex items-center justify-center w-full h-20 rounded-xl bg-adaptive-card backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 dark:hover:bg-zinc-900/60 light:hover:bg-white/90 hover:shadow-lg hover:shadow-purple-500/20">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl dark:bg-gradient-to-br dark:from-zinc-800/60 dark:to-zinc-900/60 light:bg-gradient-to-br light:from-purple-50 light:to-blue-50 text-xl font-bold text-adaptive-primary transition-colors duration-300 overflow-hidden">
            {company.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={company.logo}
                alt={company.name}
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <span className="transition-all duration-300 group-hover:text-white group-hover:scale-110">
                {getInitials(company.name)}
              </span>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function TrustedBy() {
  // Use companies from siteConfig so logos from `public/` are honored
  const companies = siteConfig.trustedBy?.companies ?? [];

  return (
    <section className="py-20 border-t dark:border-zinc-800/50 light:border-purple-200/30">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <ScrollReveal variant="fade" duration={0.6}>
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-semibold">
              <GradientText gradient="rainbow" animate={true}>
                {siteConfig.trustedBy.title}
              </GradientText>
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 items-center justify-items-center text-zinc-300">
          {companies.map((company, index) => (
            <CompanyCard key={company.name} company={company} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
