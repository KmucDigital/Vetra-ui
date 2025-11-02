"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  gradient?: "purple" | "pink" | "blue" | "rainbow";
}

/**
 * Enhanced gradient text with animations
 */
export function GradientText({
  children,
  className,
  animate = true,
  gradient = "purple",
}: GradientTextProps) {
  const gradients = {
    purple: "from-purple-400 via-pink-500 to-purple-600",
    pink: "from-pink-400 via-rose-500 to-pink-600",
    blue: "from-blue-400 via-cyan-500 to-blue-600",
    rainbow: "from-purple-400 via-pink-500 via-red-500 via-yellow-500 to-blue-500",
  };

  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[gradient],
        animate && "animate-gradient",
        className
      )}
      style={
        animate
          ? {
              backgroundSize: "200% auto",
              animation: "gradient 8s linear infinite",
            }
          : undefined
      }
    >
      {children}
    </motion.span>
  );
}
