"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

/**
 * Modern parallax scrolling component
 * Creates depth and visual interest with scroll-based transforms
 */
export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate parallax transform based on direction
  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, multiplier * 100 * speed]
  );

  // Disable parallax if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
