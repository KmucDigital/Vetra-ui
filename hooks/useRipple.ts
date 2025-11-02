"use client";

import { useCallback } from "react";

interface RippleOptions {
  duration?: number;
  color?: string;
}

/**
 * Material Design ripple effect hook
 * Creates beautiful click ripple animations
 */
export function useRipple(options: RippleOptions = {}) {
  const { duration = 600, color = "rgba(255, 255, 255, 0.4)" } = options;

  const createRipple = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();

      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      const ripple = document.createElement("span");
      const x = event.clientX - rect.left - radius;
      const y = event.clientY - rect.top - radius;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.backgroundColor = color;
      ripple.style.transform = "scale(0)";
      ripple.style.animation = `ripple ${duration}ms ease-out`;
      ripple.style.pointerEvents = "none";

      // Add keyframes if not exists
      if (!document.getElementById("ripple-keyframes")) {
        const style = document.createElement("style");
        style.id = "ripple-keyframes";
        style.textContent = `
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      // Remove existing ripples
      const existingRipples = button.getElementsByClassName("ripple-effect");
      while (existingRipples.length > 0) {
        existingRipples[0]?.remove();
      }

      ripple.classList.add("ripple-effect");
      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, duration);
    },
    [color, duration]
  );

  return createRipple;
}
