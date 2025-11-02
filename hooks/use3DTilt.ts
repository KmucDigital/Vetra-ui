"use client";

import { useEffect, useRef, useState } from "react";

interface TiltOptions {
  max?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

/**
 * Advanced 3D tilt effect hook
 * Creates interactive 3D card tilting on mouse move
 */
export function use3DTilt<T extends HTMLElement>(
  options: TiltOptions = {}
) {
  const {
    max = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 400,
    glare = true,
    maxGlare = 0.5,
  } = options;

  const ref = useRef<T>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const tiltX = percentY * max;
      const tiltY = -percentX * max;

      element.style.transform = `
        perspective(${perspective}px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(${scale}, ${scale}, ${scale})
      `;

      if (glare) {
        const glareElement = element.querySelector(
          ".tilt-glare"
        ) as HTMLElement;
        if (glareElement) {
          const glareX = (percentX + 1) * 50;
          const glareY = (percentY + 1) * 50;
          glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${maxGlare}) 0%, transparent 60%)`;
        }
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      element.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      element.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
      element.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;

      if (glare) {
        const glareElement = element.querySelector(
          ".tilt-glare"
        ) as HTMLElement;
        if (glareElement) {
          glareElement.style.background = "transparent";
        }
      }
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Add glare element if enabled
    if (glare && !element.querySelector(".tilt-glare")) {
      const glareElement = document.createElement("div");
      glareElement.className = "tilt-glare";
      glareElement.style.position = "absolute";
      glareElement.style.top = "0";
      glareElement.style.left = "0";
      glareElement.style.width = "100%";
      glareElement.style.height = "100%";
      glareElement.style.borderRadius = "inherit";
      glareElement.style.pointerEvents = "none";
      glareElement.style.transition = `background ${speed}ms ease`;
      element.style.position = "relative";
      element.appendChild(glareElement);
    }

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [max, perspective, scale, speed, glare, maxGlare]);

  return { ref, isHovering };
}
