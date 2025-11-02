"use client";

import type { CSSProperties, ElementType } from "react";
import { cn } from "@/lib/utils";

interface AnimateShineProps {
  text: string;
  speed?: number;
  className?: string;
  as?: ElementType;
}

export function AnimateShine({
  text,
  speed = 5,
  className,
  as: Component = "span",
}: AnimateShineProps) {
  return (
    <Component
      className={cn(
        "relative inline-block bg-clip-text text-transparent",
        "before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(255,255,255,0),rgba(255,255,255,0.8),rgba(255,255,255,0))] before:opacity-0 before:blur-sm",
        "animate-[shine_var(--shine-speed)_linear_infinite]",
        className
      )}
      style={
        {
          backgroundImage:
            "linear-gradient(120deg, rgba(255,255,255,0.35) 20%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.35) 80%)",
          backgroundSize: "200% 100%",
          ["--shine-speed" as string]: `${speed}s`,
        } as CSSProperties
      }
    >
      {text}
    </Component>
  );
}

