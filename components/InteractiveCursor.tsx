"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface CursorPosition {
  x: number;
  y: number;
}

export const InteractiveCursor = (): React.JSX.Element => {
  const [position, setPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (): void => {
      setIsClicking(true);
    };
    const handleMouseUp = (): void => {
      setIsClicking(false);
    };

    const handleMouseEnter = (): void => {
      setIsHovering(true);
    };
    const handleMouseLeave = (): void => {
      setIsHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, input, textarea, [role="button"]'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${position.x - 16}px, ${position.y - 16}px)`;
    }
  }, [position]);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.classList.toggle("scale-150", isClicking);
      cursorRef.current.classList.toggle("scale-125", isHovering);
    }
  }, [isHovering, isClicking]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] transition-transform duration-100 ease-out gpu-accelerated",
        "mix-blend-difference rounded-full border-2 border-white/50",
        isClicking && "scale-150",
        isHovering && "scale-125"
      )}
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 100%)",
      }}
    >
      <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
    </div>
  );
};
