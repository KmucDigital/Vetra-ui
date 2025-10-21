"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { LaunchCountdown } from "@/components/LaunchCountdown";
import { AnimatedGradients } from "@/components/hero/AnimatedGradients";
import { HeroContent } from "@/components/hero/HeroContent";
import { BrowserMockup } from "@/components/hero/BrowserMockup";

type PersonaId = keyof typeof siteConfig.featureSets;
type PersonaEntry = (typeof siteConfig.hero.personas)[number] & {
  id: PersonaId;
};

const personas = siteConfig.hero.personas as PersonaEntry[];

export function Hero() {
  const [activePersona, setActivePersona] = useState<PersonaId>(
    siteConfig.hero.defaultPersona as PersonaId
  );

  const persona = useMemo(() => {
    const fallback = personas[0];
    if (!fallback) {
      throw new Error("No personas configured in siteConfig");
    }
    return personas.find((entry) => entry.id === activePersona) ?? fallback;
  }, [activePersona]);

  useEffect(() => {
    const event = new CustomEvent("vetra:persona-change", {
      detail: { persona: persona.id },
    });
    window.dispatchEvent(event);
  }, [persona]);

  const handlePersonaChange = useCallback((personaId: string) => {
    setActivePersona(personaId as PersonaId);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 md:pt-36">
      <AnimatedGradients />

      <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 md:px-8">
        <HeroContent
          personas={personas}
          activePersona={persona}
          onPersonaChange={handlePersonaChange}
        />

        <LaunchCountdown />

        <BrowserMockup />
      </div>
    </section>
  );
}
