"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  magnetStrength?: number;
}

export const MagneticButton = forwardRef<
  HTMLButtonElement,
  MagneticButtonProps
>(({ className, children, magnetStrength = 0.3, ...props }, ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const buttonRef = ref as React.RefObject<HTMLButtonElement>;
    if (buttonRef.current === null) {
      return;
    }

    const handleMouseMove = (e: MouseEvent): void => {
      if (!buttonRef.current) {
        return;
      }
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * magnetStrength;
      const deltaY = (e.clientY - centerY) * magnetStrength;

      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = (): void => {
      setPosition({ x: 0, y: 0 });
    };

    buttonRef.current.addEventListener("mousemove", handleMouseMove);
    buttonRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mousemove", handleMouseMove);
        buttonRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [magnetStrength, ref]);

  return (
    <button
      ref={ref}
      className={cn(
        "relative magnetic-button transition-transform duration-300 ease-out gpu-accelerated",
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translateZ(0)`,
      }}
      {...props}
    >
      {children}
    </button>
  );
});

MagneticButton.displayName = "MagneticButton";
