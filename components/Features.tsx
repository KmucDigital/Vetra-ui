"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeDollarSign,
  Bot,
  BriefcaseBusiness,
  CalendarClock,
  ClipboardCheck,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  ListChecks,
  Milestone,
  PanelsTopLeft,
  PlugZap,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { AnimateShine } from "@/components/AnimateShine";
import { GlassButton } from "@/components/GlassButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { use3DTilt } from "@/hooks/use3DTilt";
import { cn } from "@/lib/utils";

type PersonaId = keyof typeof siteConfig.featureSets;

type FeatureEntry = {
  id: string;
  title: string;
  description: string;
  highlight: string;
  icon: string;
  badge?: string;
};

type FeatureCatalog = Record<PersonaId, FeatureEntry[]>;

const personaCatalog = siteConfig.hero.personas as Array<
  (typeof siteConfig.hero.personas)[number] & { id: PersonaId }
>;
const featureCatalog = siteConfig.featureSets as FeatureCatalog;

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  layout: LayoutDashboard,
  sparkles: Sparkles,
  glass: PanelsTopLeft,
  bot: Bot,
  insight: LineChart,
  pricing: BadgeDollarSign,
  timeline: Milestone,
  integration: PlugZap,
  onboarding: ListChecks,
  support: LifeBuoy,
  briefcase: BriefcaseBusiness,
  workflow: Workflow,
  handoff: ClipboardCheck,
  palette: Rocket,
  calendar: CalendarClock,
};

const layoutClasses = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-1",
];

const defaultPersona = siteConfig.hero.defaultPersona as PersonaId;

interface FeatureCardProps {
  feature: FeatureEntry;
  accent: string;
  index: number;
  layoutClass: string;
}

function FeatureCard({ feature, accent, index, layoutClass }: FeatureCardProps) {
  const { ref } = use3DTilt<HTMLDivElement>({
    max: 6,
    perspective: 1500,
    scale: 1.02,
    speed: 450,
    glare: true,
    maxGlare: 0.2,
  });

  const Icon = iconMap[feature.icon] ?? Sparkles;

  return (
    <ScrollReveal
      variant="slide-up"
      delay={index * 0.1}
      duration={0.7}
      className={cn(
        "relative overflow-hidden rounded-[28px] bg-adaptive-card backdrop-blur-2xl transition-all duration-500",
        layoutClass
      )}
    >
      <div
        ref={ref}
        className="relative h-full overflow-hidden rounded-[28px] p-6"
      >
        <div
          className="absolute inset-0 rounded-[28px]"
          style={{
            boxShadow: `0 30px 80px ${accent}22`,
          }}
        />
        <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_70%)] light:bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${accent}22, transparent 60%)`,
          }}
        />
        <div className="relative flex h-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-adaptive-glass text-adaptive-primary">
              <Icon className="h-5 w-5" />
            </div>
            {feature.badge && (
              <span className="rounded-full bg-adaptive-glass px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-adaptive-muted">
                {feature.badge}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-adaptive-primary">
              {feature.title}
            </h3>
            <p className="text-sm text-adaptive-secondary">{feature.description}</p>
          </div>
          <div className="mt-auto rounded-2xl bg-adaptive-glass p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-adaptive-muted">
              Highlight
            </p>
            <p className="mt-2 text-sm text-adaptive-secondary">
              <AnimateShine text={feature.highlight} speed={16} />
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function Features() {
  const [persona, setPersona] = useState<PersonaId>(defaultPersona);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const personaConfig = useMemo(() => {
    const fallback = personaCatalog[0]!;
    return personaCatalog.find((entry) => entry.id === persona) ?? fallback;
  }, [persona]);

  const items = useMemo<FeatureEntry[]>(() => {
    const key = personaConfig!.id;
    return featureCatalog[key] ?? [];
  }, [personaConfig]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ persona?: string }>).detail;
      if (!detail?.persona) return;
      if (detail.persona in featureCatalog) {
        setPersona(detail.persona as PersonaId);
      }
    };

    window.addEventListener("vetra:persona-change", handler);
    return () => window.removeEventListener("vetra:persona-change", handler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      setSpotlight({
        x: Math.min(100, Math.max(0, x)),
        y: Math.min(100, Math.max(0, y)),
        opacity: 1,
      });
    };

    const handlePointerLeave = () => {
      setSpotlight((prev) => ({ ...prev, opacity: 0 }));
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <section
      id="features"
      className="relative overflow-hidden border-t dark:border-white/5 light:border-purple-200/30 py-24 md:py-32"
      aria-labelledby="features-heading"
    >
      <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top,rgba(8,10,20,0.95),rgba(2,2,5,0.98))] light:bg-[linear-gradient(180deg,rgba(250,245,255,0.6),rgba(240,249,255,0.7))]" />
      <div className="absolute inset-0 gradient-adaptive-radial opacity-70" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-adaptive-muted">
            Persona aware components
          </p>
          <h2
            id="features-heading"
            className="text-3xl font-bold text-adaptive-primary md:text-4xl lg:text-5xl"
          >
            {personaConfig!.label} get{" "}
            <AnimateShine
              text="conversion-ready sections"
              className="text-adaptive-primary"
              speed={14}
            />
          </h2>
          <p className="text-lg text-adaptive-secondary">
            Swap personas to preview how Vetra reshapes feature highlights,
            proof points, and CTAs. Every block respects your brand accents and
            launches with accessible defaults.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.02] p-2 backdrop-blur-xl">
            {personaCatalog.map((entry) => (
              <GlassButton
                key={entry.id}
                accent={entry.accent}
                active={entry.id === personaConfig!.id}
                onClick={() => setPersona(entry.id)}
              >
                {entry.label}
              </GlassButton>
            ))}
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative mt-16 grid auto-rows-[minmax(180px,1fr)] gap-5 md:grid-cols-3"
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-700"
            style={{
              background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, ${personaConfig!.accent}33, transparent 65%)`,
              opacity: spotlight.opacity,
            }}
          />

          {items.map((feature: FeatureEntry, index: number) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              accent={personaConfig!.accent}
              index={index}
              layoutClass={layoutClasses[index] ?? "md:col-span-1"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
