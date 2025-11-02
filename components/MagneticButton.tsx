"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagneticCursor } from "@/hooks/useMagneticCursor";
import { useRipple } from "@/hooks/useRipple";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

/**
 * Ultra-modern button with magnetic cursor and ripple effects
 */
export function MagneticButton({
  children,
  className,
  onClick,
  variant = "primary",
  size = "md",
}: MagneticButtonProps) {
  const { ref, isHovering } = useMagneticCursor<HTMLButtonElement>({
    strength: 0.4,
    radius: 120,
  });

  const createRipple = useRipple({
    duration: 600,
    color: variant === "primary" ? "rgba(255, 255, 255, 0.3)" : "rgba(126, 34, 206, 0.3)",
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    onClick?.();
  };

  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500",
    secondary: "bg-white/10 text-white backdrop-blur-xl hover:bg-white/20",
    ghost: "bg-transparent text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden rounded-2xl font-semibold transition-all duration-300",
        "border border-white/10 shadow-lg",
        "will-change-transform",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        boxShadow: isHovering
          ? "0 20px 40px rgba(126, 34, 206, 0.4)"
          : "0 10px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Shine effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: isHovering ? ["-100%", "100%"] : "-100%",
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
