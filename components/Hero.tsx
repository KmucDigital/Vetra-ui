"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Badge } from "@/components/ui/badge";
import { GlassButton } from "@/components/GlassButton";
import { AnimateShine } from "@/components/AnimateShine";
import { LaunchCountdown } from "@/components/LaunchCountdown";
// @ts-ignore - TextType is a JSX component
import TextType from "@/components/TextType";

type PersonaId = keyof typeof siteConfig.featureSets;
type PersonaEntry = (typeof siteConfig.hero.personas)[number] & { id: PersonaId };

const personas = siteConfig.hero.personas as PersonaEntry[];
const Typewriter: any = TextType;

export function Hero() {
  const [activePersona, setActivePersona] = useState<PersonaId>(
    siteConfig.hero.defaultPersona as PersonaId
  );

  const persona = useMemo(() => {
    const fallback = personas[0];
    return personas.find((entry) => entry.id === activePersona) ?? fallback;
  }, [activePersona]);

  useEffect(() => {
    const event = new CustomEvent("vetra:persona-change", {
      detail: { persona: persona.id },
    });
    window.dispatchEvent(event);
  }, [persona.id]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(11,10,20,0.95),rgba(3,3,8,0.92))]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-16 h-[420px] bg-[radial-gradient(circle_at_top,rgba(126,34,206,0.45),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_10px)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(209,9,76,0.1),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(47,109,255,0.12),transparent_45%)] opacity-80" />
      </div>

      <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 md:px-8">
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
                active={persona.id === entry.id}
                onClick={() => setActivePersona(entry.id)}
              >
                {entry.label}
              </GlassButton>
            ))}
          </div>

          <div className="relative max-w-5xl space-y-6">
            <h1 className="relative text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="invisible">{persona.heroTitle}</span>
              <span className="sr-only">{persona.heroTitle}</span>
              <span className="pointer-events-none absolute inset-0">
                <Typewriter
                  key={persona.id}
                  text={[persona.heroTitle]}
                  typingSpeed={70}
                  pauseDuration={1200}
                  showCursor={true}
                  cursorCharacter="|"
                  loop={false}
                />
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-lg text-white/70 md:text-xl lg:text-2xl">
              {persona.heroSubtitle}
            </p>
          </div>

          <Link href={persona.ctaLink} className="group">
            <GlassButton
              accent={persona.accent}
              active
              className="gap-3 px-7 py-3 text-base font-semibold md:text-lg"
            >
              {persona.ctaText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </GlassButton>
          </Link>

          <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {persona.stats.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-xl"
              >
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    background: `radial-gradient(circle at top, ${persona.accent}33, transparent 65%)`,
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

        <LaunchCountdown />

        <div className="relative mt-16 w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(126,34,206,0.28),transparent_65%)]" />
          <div className="relative grid gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/60 p-6 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,9,76,0.4),transparent_70%)] opacity-80" />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
                    <span>Dark Deck</span>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span>Parallax Ready</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                </div>
                <p className="text-sm font-medium text-white/80">
                  Layer hero shots and glass cards into a cinematic dashboard.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={`dark-card-${item}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="mb-3 h-10 w-10 rounded-xl bg-gradient-to-br from-white/15 to-white/5" />
                      <div className="h-2 w-3/4 rounded-full bg-white/20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.85] p-6 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(47,109,255,0.35),transparent_70%)] opacity-90" />
              <div className="relative flex flex-col gap-4 text-black">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-black/60">
                    <span>Light Deck</span>
                    <span className="h-1 w-1 rounded-full bg-black/30" />
                    <span>Case Studies</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                </div>
                <p className="text-sm font-medium text-black/70">
                  Swap palettes and ship client-ready marketing in minutes.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={`light-card-${item}`}
                      className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-3 h-10 w-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100" />
                      <div className="h-2 w-3/4 rounded-full bg-black/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
