"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

/**
 * Floating element with smooth up-down animation
 */
export function FloatingElement({
  children,
  delay = 0,
  duration = 3,
  yOffset = 10,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-yOffset, yOffset, -yOffset],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
