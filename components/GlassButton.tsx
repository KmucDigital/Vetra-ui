"use client";

import * as React from "react";

import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  accent?: string;
  active?: boolean;
};

const defaultStyles = siteConfig.glassButton;

export const GlassButton = React.forwardRef<
  HTMLButtonElement,
  GlassButtonProps
>(({ className, accent = "#7E22CE", active = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "backdrop-blur-xl shadow-[0_18px_40px_rgba(7,7,12,0.35)] border gpu-accelerated hover-lift touch-target",
        active
          ? "text-white saturate-150"
          : "text-zinc-200 hover:text-white hover:saturate-125",
        className
      )}
      style={{
        background: defaultStyles.gradient,
        borderColor: active ? accent : defaultStyles.border,
        boxShadow: active
          ? `0 0 0 1px ${accent}40, ${defaultStyles.glow}`
          : "0 12px 32px rgba(7, 7, 12, 0.35)",
      }}
      {...props}
    />
  );
});

GlassButton.displayName = "GlassButton";
