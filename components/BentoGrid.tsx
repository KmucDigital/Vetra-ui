"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { use3DTilt } from "@/hooks/use3DTilt";
import { cn } from "@/lib/utils";

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "wide" | "tall";
}

/**
 * Modern bento grid item with 3D tilt effect
 */
export function BentoItem({ children, className, size = "medium" }: BentoItemProps) {
  const { ref } = use3DTilt<HTMLDivElement>({
    max: 8,
    scale: 1.02,
    glare: true,
    maxGlare: 0.3,
  });

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 md:col-span-2 row-span-1",
    large: "col-span-1 md:col-span-2 row-span-2",
    wide: "col-span-1 md:col-span-3 row-span-1",
    tall: "col-span-1 row-span-2",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl transition-all duration-300",
        "hover:border-white/20 hover:bg-white/[0.04]",
        sizeClasses[size],
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Border glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl" />
      </div>
    </motion.div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Modern bento grid layout container
 */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}
