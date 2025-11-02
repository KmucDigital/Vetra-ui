"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Lazy load heavy components only on desktop for better mobile performance
const CursorBackground = dynamic(() => import("@/components/backroundeffect"), {
  ssr: false,
});

const AnimatedGradientMesh = dynamic(
  () => import("@/components/AnimatedGradientMesh").then((mod) => ({ default: mod.AnimatedGradientMesh })),
  { ssr: false }
);

const ParticleField = dynamic(
  () => import("@/components/ParticleField").then((mod) => ({ default: mod.ParticleField })),
  { ssr: false }
);

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Disable heavy animations on mobile and for users who prefer reduced motion
  const shouldShowEffects = isDesktop && !prefersReducedMotion;

  return (
    <>
      {/* Background layers - only on desktop for performance */}
      {shouldShowEffects && (
        <>
          <AnimatedGradientMesh />
          <ParticleField />
          <CursorBackground />
        </>
      )}

      {/* Main content */}
      {children}

      {/* Theme switcher - always visible */}
      <ThemeSwitcher />
    </>
  );
}
