"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { AnimateShine } from "@/components/AnimateShine";
import { GlassButton } from "@/components/GlassButton";
import { GradientText } from "@/components/GradientText";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FloatingElement } from "@/components/FloatingElement";
import { use3DTilt } from "@/hooks/use3DTilt";

function CTACard() {
  const { ref } = use3DTilt<HTMLDivElement>({
    max: 3,
    perspective: 2000,
    scale: 1.01,
    speed: 500,
    glare: true,
    maxGlare: 0.15,
  });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[36px] border border-white/8 bg-white/[0.04] px-6 py-12 backdrop-blur-2xl md:px-12 md:py-16"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_60%)] opacity-80" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <ScrollReveal variant="slide-up" duration={0.7}>
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Launch faster than ever
            </p>
            <h2
              id="cta-heading"
              className="text-3xl font-bold md:text-4xl lg:text-5xl"
            >
              <GradientText gradient="rainbow" animate={true}>
                {siteConfig.cta.headline}
              </GradientText>
            </h2>
            <p className="text-lg text-white/70 md:text-xl">
              {siteConfig.cta.subheadline}
            </p>
            <div className="text-base font-medium text-white">
              <AnimateShine text={siteConfig.cta.shimmer} speed={10} />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={0.2} duration={0.6}>
          <Link href={siteConfig.cta.buttonHref} className="group">
            <GlassButton active accent="#6B1F87" className="gap-3 px-7 py-3 text-base">
              {siteConfig.cta.buttonText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </GlassButton>
          </Link>
        </ScrollReveal>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 md:flex-nowrap">
          {siteConfig.cta.bullets.map((bullet, index) => (
            <FloatingElement
              key={bullet.label}
              delay={index * 0.3}
              duration={3 + index * 0.4}
              yOffset={6}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:scale-105">
                <Check className="h-4 w-4 text-emerald-300" />
                <span>{bullet.label}</span>
              </div>
            </FloatingElement>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/5 py-24 md:py-32"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(8,10,20,0.96),rgba(1,1,4,0.98))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(126,34,206,0.25),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(47,109,255,0.28),transparent_60%)] opacity-80" />
      <div className="absolute inset-x-0 top-1/2 h-[520px] -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <CTACard />
      </div>
    </section>
  );
}

