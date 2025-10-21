/**
 * HeroContent Component
 * 
 * Main content area of the hero section including title, subtitle, and CTA.
 * Memoized for performance with useCallback for event handlers.
 */

"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlassButton } from "@/components/GlassButton";
import { AnimateShine } from "@/components/AnimateShine";
// @ts-ignore - TextType is a JSX component
import TextType from "@/components/TextType";

const Typewriter: any = TextType;

type PersonaEntry = {
  id: string;
  label: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  accent: string;
  stats: Array<{ label: string; value: number; suffix: string }>;
};

interface HeroContentProps {
  personas: PersonaEntry[];
  activePersona: PersonaEntry;
  onPersonaChange: (id: string) => void;
}

export const HeroContent = memo(function HeroContent({
  personas,
  activePersona,
  onPersonaChange,
}: HeroContentProps) {
  const handlePersonaClick = useCallback(
    (personaId: string) => {
      onPersonaChange(personaId);
    },
    [onPersonaChange]
  );

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div className="flex flex-col items-center gap-4">
        <Badge variant="glass" className="flex items-center gap-2 px-4 py-2">
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span className="text-sm font-semibold">
            Free Open Source Template · iptpodate License
          </span>
        </Badge>

        <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-white/60">
          <span>Tailwind</span>
          <span className="text-white/20">•</span>
          <span>Next.js 14</span>
          <span className="text-white/20">•</span>
          <span>Framer Motion Ready</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.03] p-2 backdrop-blur-xl">
        {personas.map((entry) => (
          <GlassButton
            key={entry.id}
            accent={entry.accent}
            active={activePersona.id === entry.id}
            onClick={() => handlePersonaClick(entry.id)}
          >
            {entry.label}
          </GlassButton>
        ))}
      </div>

      <div className="relative max-w-5xl space-y-6">
        <h1 className="relative text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
          <span className="invisible">{activePersona.heroTitle}</span>
          <span className="sr-only">{activePersona.heroTitle}</span>
          <span
            className="pointer-events-none absolute inset-0"
            style={{ willChange: "contents" }}
          >
            <Typewriter
              key={activePersona.id}
              text={[activePersona.heroTitle]}
              typingSpeed={70}
              pauseDuration={1200}
              showCursor={true}
              cursorCharacter="|"
              loop={false}
            />
          </span>
        </h1>

        <p className="mx-auto max-w-3xl text-lg text-white/70 md:text-xl lg:text-2xl">
          {activePersona.heroSubtitle}
        </p>
      </div>

      <Link href={activePersona.ctaLink} className="group">
        <GlassButton
          accent={activePersona.accent}
          active
          className="gap-3 px-7 py-3 text-base font-semibold md:text-lg"
        >
          {activePersona.ctaText}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </GlassButton>
      </Link>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        {activePersona.stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-xl"
          >
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background: `radial-gradient(circle at top, ${activePersona.accent}33, transparent 65%)`,
                willChange: "transform",
              }}
            />
            <div className="relative space-y-2">
              <p className="text-3xl font-semibold text-white md:text-4xl">
                <AnimateShine
                  text={`${stat.value}${stat.suffix}`}
                  speed={10}
                  className="text-white"
                />
              </p>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
