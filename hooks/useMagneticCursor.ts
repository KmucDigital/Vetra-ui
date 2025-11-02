"use client";

import { useEffect, useRef, useState } from "react";

interface MagneticOptions {
  strength?: number;
  radius?: number;
  ease?: number;
}

/**
 * Advanced magnetic cursor hook
 * Makes elements follow the cursor with smooth easing
 */
export function useMagneticCursor<T extends HTMLElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.3, radius = 100, ease = 0.15 } = options;

  const ref = useRef<T>(null);
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        setIsHovering(true);
        const force = (radius - distance) / radius;
        targetRef.current = {
          x: deltaX * strength * force,
          y: deltaY * strength * force,
        };
      } else {
        setIsHovering(false);
        targetRef.current = { x: 0, y: 0 };
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      targetRef.current = { x: 0, y: 0 };
    };

    // Smooth animation loop
    const animate = () => {
      positionRef.current.x +=
        (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y +=
        (targetRef.current.y - positionRef.current.y) * ease;

      if (element) {
        element.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [strength, radius, ease]);

  return { ref, isHovering };
}
