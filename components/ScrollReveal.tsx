"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale" | "blur";
  duration?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * Modern scroll-triggered reveal animation component
 * Uses Intersection Observer for optimal performance
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fade",
  duration = 0.6,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold,
    triggerOnce: once,
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  // Animation variants
  const variants: Record<string, Variants> = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  };

  // Disable animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
